import { Button } from "@/components/ui/button";
import { useCart } from "../hooks/use-cart";
import { cn, generateTenantUrl } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

interface Props {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export const CheckoutButton: React.FC<Props> = ({
  className,
  hideIfEmpty = false,
  tenantSlug,
}) => {
  const { totalItems } = useCart({ tenantSlug });

  if (hideIfEmpty && totalItems === 0) return <></>;

  return (
    <Button variant={"elevated"} className={cn("bg-white", className)} asChild>
      <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};
