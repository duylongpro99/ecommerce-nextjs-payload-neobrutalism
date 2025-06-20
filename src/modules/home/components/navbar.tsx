"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

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
      <Link prefetch href={href}>{children}</Link>
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
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link prefetch href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Flexible Store
        </span>
      </Link>

      <Sidebar open={isOpen} onOpenChange={setIsOpen} items={navbarItems} />

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

      {session.data?.user ? (
        <>
          <div className="hidden lg:flex">
            <Button
              asChild
              variant="secondary"
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-cyan-400 hover:text-black transition-colors text-lg"
            >
              <Link prefetch href="/admin">
                Dashboard
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="hidden lg:flex">
            <Button
              asChild
              variant="secondary"
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-cyan-400 transition-colors text-lg"
            >
              <Link prefetch href="/sign-in">
                Log in
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-cyan-400 hover:text-black transition-colors text-lg"
            >
              <Link prefetch href="/sign-up">
                Start selling
              </Link>
            </Button>
          </div>
        </>
      )}

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
