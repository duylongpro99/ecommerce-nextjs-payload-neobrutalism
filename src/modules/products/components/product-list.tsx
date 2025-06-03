"use client";

interface Props {
  category?: string;
}

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const ProductList: React.FC<Props> = ({ category }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
    }),
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
