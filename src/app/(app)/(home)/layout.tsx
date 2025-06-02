import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Footer } from "@/modules/home/components/footer";
import { Navbar } from "@/modules/home/components/navbar";
import {
  SearchFilter,
  SearchFilterLoading,
} from "@/modules/home/components/seacrch-filter";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = async ({ children }) => {
  const clientQuery = getQueryClient();
  void clientQuery.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(clientQuery)}>
        <Suspense fallback={<SearchFilterLoading />}>
          <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
