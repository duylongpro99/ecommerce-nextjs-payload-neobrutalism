import { Navbar } from "@/modules/checkout/components/navbar";
import { Footer } from "@/modules/tenants/components/footer";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <Navbar slug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
