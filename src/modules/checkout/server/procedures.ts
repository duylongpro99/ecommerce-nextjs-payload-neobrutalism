import { stripe } from "@/lib/stripe";
import { PLATFORM_PERCENT } from "@/modules/home/constant";
import { Media, Tenant } from "@/payload-types";
import {
  baseProcedure,
  createTRPCRouter,
  protectedBaseProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import z from "zod";
import { CheckoutMetadata, ProductMetadata } from "../types";

export const checkoutRouter = createTRPCRouter({
  verify: protectedBaseProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.findByID({
      collection: "users",
      id: ctx.session.user.id,
      depth: 0,
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const tenantId = user.tenants?.[0]?.tenant as string;
    const tenant = await ctx.db.findByID({
      collection: "tenants",
      id: tenantId,
    });

    if (!tenant) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tenant not found",
      });
    }

    const accountLink = ""; //connect to Stripe
    return { url: accountLink };
  }),

  purchase: protectedBaseProcedure
    .input(
      z.object({
        productIds: z
          .array(z.string())
          .min(1, "At least one product ID is required"),
        tenantSlug: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        select: {
          content: false,
        },
        depth: 2, //Categogry & image - depth 0 just return the id of relation
        where: {
          and: [
            {
              id: {
                in: input.productIds,
              },
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              },
            },
            {
              isArchived: {
                not_equals: true,
              },
            },
          ],
        },
      });

      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Some products not found for the given tenant",
        });
      }

      const tenantData = await ctx.db.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.tenantSlug,
          },
        },
      });

      const tenant = tenantData.docs[0];
      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      //TODO: abstract payment method
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              metadata: {
                stripeAccountId: tenant.paymentAccountId || "",
                id: product.id,
                name: product.name,
                price: product.price,
              } as ProductMetadata,
            },
            unit_amount: product.price * 100, // Convert to cents
          },
        }));

      const totalAmount = products.docs.reduce(
        (acc, item) => acc + item.price * 100,
        0,
      );

      const platformFreeAmount = Math.round(
        totalAmount * (PLATFORM_PERCENT / 100),
      );

      const checkout = await stripe.checkout.sessions.create(
        {
          customer_email: ctx.session.user.email,
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`,
          mode: "payment",
          line_items: lineItems,
          invoice_creation: {
            enabled: true,
          },
          metadata: {
            userId: ctx.session.user.id,
          } as CheckoutMetadata,
          // payment_intent_data: {
          //   application_fee_amount: platformFreeAmount,
          // },
        },
        // {
        //   stripeAccount: tenant.paymentAccountId,
        // },
      );

      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Checkout creation failed",
        });
      }

      return { url: checkout.url };
    }),
  //
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "products",
        depth: 2, //Categogry & image - depth 0 just return the id of relation
        where: {
          and: [
            {
              id: {
                in: input.ids,
              },
            },
            {
              isArchived: {
                not_equals: true,
              },
            },
          ],
        },
      });

      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }

      // Ensure we always return a defined value
      return {
        ...data,
        totalPrice: data.docs.reduce((sum, item) => (sum += item.price), 0),
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image?: Media },
        })),
      };
    }),
});
