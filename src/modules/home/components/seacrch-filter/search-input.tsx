import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoriesSidebar } from "./categories-sidebar";

interface Props {
  disabled?: boolean;
  value?: string;
  onSearch?: (searchValue: string) => void;
}

export const SearchInput: React.FC<Props> = ({ disabled, value, onSearch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string | undefined>(value);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch?.(searchValue ?? "");
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, onSearch]);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>

      <Button
        variant={"elevated"}
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {session?.data?.user ? (
        <>
          <Button variant="elevated" asChild>
            <Link prefetch href="/library">
              <BookmarkCheckIcon />
              Library
            </Link>
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
