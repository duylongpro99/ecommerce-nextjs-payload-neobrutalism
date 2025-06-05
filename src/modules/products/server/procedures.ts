import z from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import { Category } from "@/payload-types";
import { sortValues } from "../search-params";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
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
        depth: 1, //Categogry & image - depth 0 just return the id of relation
        where,
        sort,
      });

      // Ensure we always return a defined value
      return data;
    }),
});
