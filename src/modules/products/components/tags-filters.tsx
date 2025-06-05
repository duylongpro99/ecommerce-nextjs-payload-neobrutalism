import { DEFAULT_PAGE_SIZE } from "@/common/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface Props {
  tags?: string[];
  onChange: (value: string[]) => void;
}

export const TagsFilters: React.FC<Props> = ({ tags, onChange }) => {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_PAGE_SIZE,
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
        },
      ),
    );

  const onClick = (tag: string) => {
    if (tags?.includes(tag)) {
      onChange(tags?.filter((t) => t !== tag) || []);
    } else {
      onChange([...(tags || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <>
          <div className="flex items-center justify-center p-4">
            <LoaderIcon className="size-4 animate-spin" />
          </div>
        </>
      ) : (
        <>
          {data?.pages.map((page) => {
            return page.docs.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => onClick(tag.name)}
                >
                  <p>{tag.name}</p>
                  <Checkbox
                    checked={tags?.includes(tag.name)}
                    onCheckedChange={() => onClick(tag.name)}
                  />
                </div>
              );
            });
          })}
        </>
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="underline font-medium justify-start text-start disabled:opacity-50 cursor-pointer"
        >
          Load more...
        </button>
      )}
    </div>
  );
};
