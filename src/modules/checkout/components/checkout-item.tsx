import { cn, currency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  imageUrl?: string | null;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  isLast?: boolean;
  onRemove: () => void;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  imageUrl,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  isLast = false,
  onRemove,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0",
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between ">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium ">{currency(price)}</p>
        <button
          className="underline font-medium cursor-pointer"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
