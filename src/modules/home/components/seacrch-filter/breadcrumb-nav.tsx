import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CATEGORY_ALL } from "../../constant";
import Link from "next/link";

interface Props {
  activeCategory: string;
  activeName: string;
  activeSubName: string;
}

export const BreadcrumbNav: React.FC<Props> = ({
  activeName,
  activeSubName,
  activeCategory,
}) => {
  if (!activeName || activeCategory === CATEGORY_ALL) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-xl font-medium underline text-primary"
              >
                <Link href={`/${activeCategory}`}>{activeName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary font-medium text-lg">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeSubName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
