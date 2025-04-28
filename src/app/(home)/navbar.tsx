"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white",
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
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
  const pathName = usePathname();

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathName === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
    </nav>
  );
};
