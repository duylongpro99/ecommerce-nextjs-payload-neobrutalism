import { cn } from "@/lib/utils";
import { DM_Sans } from "next/font/google";
import Link from "next/link";

const dmSans = DM_Sans({ subsets: ["latin"], weight: "700" });

export const Footer: React.FC = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 py-6 lg:px-12">
        <p className="text-xl">Powered by</p>
        <Link
          href={process.env.NEXT_PUBLIC_APP_URL!}
          className={cn("text-2xl font-semibold", dmSans.className)}
        >
          Flexible Store
        </Link>
      </div>
    </footer>
  );
};
