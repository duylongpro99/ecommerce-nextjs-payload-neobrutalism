interface Props {
  params: Promise<{
    category: string;
    subCategory: string;
  }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const { subCategory, category } = await params;
  return (
    <div>
      Cat: {category} - Sub Category: {subCategory}
    </div>
  );
};

export default Page;
