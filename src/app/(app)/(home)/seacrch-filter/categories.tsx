import { CategoryDropdown } from "./category-dropdown";

interface Props {
  data: any;
}

export const Categories: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex flex-nowrap items-center">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
