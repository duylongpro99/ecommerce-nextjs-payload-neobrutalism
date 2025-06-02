"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CATEGORY_ALL, DEFAULT_BG_COLOR } from "../../constant";
import { BreadcrumbNav } from "./breadcrumb-nav";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

export const SearchFilter: React.FC = (): React.ReactNode => {
  const tprc = useTRPC();
  const params = useParams();

  const { data = [] } = useQuery(tprc.categories.getMany.queryOptions());

  const categoryParam = params.category as string;
  const activeCategory = categoryParam || CATEGORY_ALL;
  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory,
  );
  const activeColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeName = activeCategoryData?.name ?? "";

  const activeSubCategory = params.subCategory;
  const activeSubCategoryData = activeCategoryData?.subcategories?.find(
    (s) => s.slug === activeSubCategory,
  );
  const activeSubName = activeSubCategoryData?.name ?? "";

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: activeColor,
      }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNav
        activeCategory={activeCategory}
        activeName={activeName}
        activeSubName={activeSubName}
      />
    </div>
  );
};

export const SearchFilterLoading = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <div className="h-11"></div>
      </div>
    </div>
  );
};
