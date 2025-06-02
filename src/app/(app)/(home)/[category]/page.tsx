interface Props {
  params: Promise<{
    category: string;
  }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const { category } = await params;
  console.log(category);
  return <div>Category {category}</div>;
};

export default Page;
