import { CategoriesGetManyOutputSingle } from '@/modules/categories/types';
import { Category } from '@/payload-types';
import Link from 'next/link';

interface Props {
    category: CategoriesGetManyOutputSingle;
    isOpen: boolean;
    position: {
        top: number;
        left: number;
    };
}

export const SubCategoryDropdown: React.FC<Props> = ({ category, isOpen }) => {
    if (!isOpen || !category?.subcategories?.length) return <></>;
    const backgroundColor = category.color || '#f5f5f5';

    return (
        <div
            className="absolute z-100"
            style={{
                top: '100%',
                left: 0,
            }}
        >
            <div className="h-3 w-60"></div>
            <div
                style={{
                    backgroundColor,
                }}
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
            >
                <div>
                    {category.subcategories?.map((subcategory: Category) => (
                        <Link
                            prefetch
                            key={subcategory.slug}
                            href={`${category.slug}/${subcategory.slug}`}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
                        >
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
