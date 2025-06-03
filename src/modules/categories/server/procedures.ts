import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    try {
      const data = await ctx.db.find({
        collection: "categories",
        depth: 1, // Subcategories
        where: {
          parent: {
            exists: false,
          },
        },
        sort: "name",
      });

      if (!data?.docs) {
        return [];
      }

      const formattedData = data.docs.map((category) => ({
        ...category,
        subcategories: (category.subcategories?.docs || []).map(
          (subcategory) => ({
            ...(subcategory as Category),
          }),
        ),
      }));

      return formattedData;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }),
});
