import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    try {
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, //Categogry & image - depth 0 just return the id of relation
      });

      // Ensure we always return a defined value
      return data?.docs || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      // Return empty array instead of undefined
      return [];
    }
  }),
});
