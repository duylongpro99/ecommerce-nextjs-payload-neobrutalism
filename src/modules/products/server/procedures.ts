import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import z from "zod";
import { sortValues } from "../search-params";
import { headers } from "next/headers";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_PAGE_SIZE),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort === "interested") {
        sort = "-createdAt";
      }

      if (input.sort === "interested") {
        sort = "+createdAt";
      }

      if (input.sort === "trending") {
        sort = "-createdAt";
      }

      if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      }

      if (input.maxPrice) {
        where.price = {
          ...(where.price ?? {}),
          less_than_equal: input.maxPrice,
        };
      }

      if (input.maxPrice) {
        where.price = {
          ...(where.price ?? {}),
          less_than_equal: input.maxPrice,
        };
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

      if (input.category) {
        const categoryData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoryData.docs.map((category) => ({
          ...category,
          subcategories: (category.subcategories?.docs || []).map(
            (subcategory) => ({
              ...(subcategory as Category),
              subcategories: undefined,
            }),
          ),
        }));

        const subcategorySlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategorySlugs.push(
            ...parentCategory.subcategories.map((item) => item.slug),
          );

          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategorySlugs],
          };
        }
      }

      if (!!input.tags?.length) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 2, //Categogry & image - depth 0 just return the id of relation
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      // Ensure we always return a defined value
      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image?: Media },
        })),
      };
    }),
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const h = await headers();
      const session = await ctx.db.auth({ headers: h });

      const data = await ctx.db.findByID({
        collection: "products",
        id: input.id,
        depth: 2,
      });

      let isPurchased = false;
      if (session.user) {
        const ordersData = await ctx.db.find({
          collection: "orders",
          where: {
            user: {
              equals: session.user.id,
            },
            product: {
              equals: input.id,
            },
          },
          pagination: false,
          limit: 1,
        });

        isPurchased = ordersData.totalDocs > 0;
      }

      return {
        ...data,
        isPurchased,
        image: data.image as Media | null,
        tenant: data.tenant as (Tenant & { image: Media | null }) | null,
      };
    }),
});
