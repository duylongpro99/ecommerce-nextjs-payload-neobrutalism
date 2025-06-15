import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTenantUrl(slug: string) {
  const isDevelopmemt = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING! === "true";

  if (isDevelopmemt || !isSubdomainRoutingEnabled) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${slug}`;
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;
  return `${protocol}://${slug}.${domain}`;
}

export const currency = (price: string | number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price));
