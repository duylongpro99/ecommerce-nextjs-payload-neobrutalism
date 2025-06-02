import { CATEGORY_ALL } from "../../constant";

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
  console.log(activeSubName);
  return <div></div>;
};
