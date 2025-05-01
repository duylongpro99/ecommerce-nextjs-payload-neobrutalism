import { getPayload } from "payload";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilter } from "./seacrch-filter";

import { Category } from "@/payload-types";
import configPromise from "@/payload.config";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = async ({ children }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Subcategories
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((category) => ({
    ...category,
    subcategories: (category.subcategories?.docs || []).map((subcategory) => ({
      ...(subcategory as Category),
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
