import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavbarItem = ({ children, isActive, href }: NavbarItemProps) => {
  return <Button>{children}</Button>;
};

const navbarItems = [
  {
    href: "/",
    isActive: true,
    children: "Home",
  },
  {
    href: "/about",
    isActive: false,
    children: "About",
  },
  {
    href: "/features",
    isActive: false,
    children: "Features",
  },
  {
    href: "/pricing",
    isActive: false,
    children: "Pricing",
  },
  {
    href: "/contact",
    isActive: false,
    children: "Contact",
  },
];

export const Navbar = () => {
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem key={item.href} {...item}>
            {item.children}
          </NavbarItem>
        ))}
      </div>
    </nav>
  );
};
