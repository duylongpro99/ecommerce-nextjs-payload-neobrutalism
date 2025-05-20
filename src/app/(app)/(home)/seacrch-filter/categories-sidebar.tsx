import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CustomCategory } from "./types";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  data: CustomCategory[];
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar: React.FC<Props> = ({
  open,
  data,
  onOpenChange,
}) => {
  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const onClickCat = (cat: CustomCategory) => {
    if (cat.subcategories?.length) {
      setParentCategories(cat.subcategories as CustomCategory[]);
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

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{
          backgroundColor: "white",
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {}}
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
