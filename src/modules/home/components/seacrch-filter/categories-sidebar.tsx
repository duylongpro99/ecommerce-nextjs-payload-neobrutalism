import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CategoriesGetManyOutput,
  CategoriesGetManyOutputSingle,
} from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar: React.FC<Props> = ({ open, onOpenChange }) => {
  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>(null);

  const tprc = useTRPC();
  const { data } = useQuery(tprc.categories.getMany.queryOptions());

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesGetManyOutputSingle | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const onClickCat = (cat: CategoriesGetManyOutputSingle) => {
    if (cat.subcategories?.length) {
      setParentCategories(cat.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(cat);
    } else {
      if (parentCategories && selectedCategory) {
        //sub category
        router.push(`/${selectedCategory.slug}/${cat.slug}`);
      } else {
        //main cat
        router.push(cat.slug === "all" ? `/` : `/${cat.slug}`);
      }

      handleOpenChange(false);
    }
  };

  const onBack = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const bgColor = selectedCategory?.color ?? "white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={onBack}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}

          {currentCategories.map((cat) => {
            return (
              <button
                key={cat.slug}
                onClick={() => onClickCat(cat)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between text-base font-medium cursor-pointer"
              >
                {cat.name}
                {cat.subcategories?.length > 0 && (
                  <ChevronRightIcon className="size-4" />
                )}
              </button>
            );
          })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
