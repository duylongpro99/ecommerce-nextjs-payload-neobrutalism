import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedBaseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const libraryRouter = createTRPCRouter({
  getMany: protectedBaseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_PAGE_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "orders",
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
        depth: 0,
        page: input.cursor,
        limit: input.limit,
      });

      const productIds = data.docs.map((doc) => doc.product);
      const productsData = await ctx.db.find({
        collection: "products",
        pagination: false,
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const dataWithSummariedReviews = await Promise.all(
        productsData.docs.map(async (doc) => {
          const reviewData = await ctx.db.find({
            collection: "reviews",
            pagination: false,
            where: {
              product: {
                equals: doc.id,
              },
            },
          });

          return {
            ...doc,
            reviewCount: reviewData.totalDocs,
            reviewRating:
              reviewData.docs.length === 0
                ? 0
                : reviewData.docs.reduce(
                    (acc, review) => acc + (review.ratings ?? 0),
                    0,
                  ) / reviewData?.totalDocs,
          };
        }),
      );

      return {
        ...data,
        docs: dataWithSummariedReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image?: Media },
        })),
      };
    }),

  getOne: protectedBaseProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "orders",
        where: {
          and: [
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
            {
              product: {
                equals: input.productId,
              },
            },
          ],
        },
        pagination: false,
        limit: 1,
      });

      const order = data.docs[0];
      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      const product = await ctx.db.findByID({
        collection: "products",
        id: input.productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      return product;
    }),
});
