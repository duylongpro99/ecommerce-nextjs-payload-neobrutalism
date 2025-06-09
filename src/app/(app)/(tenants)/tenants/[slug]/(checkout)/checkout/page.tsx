import { CheckoutView } from "@/modules/checkout/views/checkout.view";

interface Props {
  params: Promise<{ slug: string }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params;
  return <CheckoutView tenantSlug={slug} />;
};

export default Page;
