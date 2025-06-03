import z from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

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
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategorySlugs],
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, //Categogry & image - depth 0 just return the id of relation
        where,
      });

      // Ensure we always return a defined value
      return data;
    }),
});
