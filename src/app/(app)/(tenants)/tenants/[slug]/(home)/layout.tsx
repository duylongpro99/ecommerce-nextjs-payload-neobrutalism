import { Footer } from "@/modules/tenants/components/footer";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void (await queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    }),
  ));

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
