import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  minPrice: string | null;
  maxPrice: string | null;
  onMinPriceChange: (minPrice: string) => void;
  onMaxPriceChange: (maxPrice: string) => void;
}

export const formatPrice = (price: string) => {
  const numericPrice = price.replace(/[^0-9.]/g, "");
  const parts = numericPrice.split(".");
  const fomattedPrice =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!fomattedPrice) return "";
  const numberValue = parseFloat(fomattedPrice);
  if (isNaN(numberValue)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export const PriceFilter: React.FC<Props> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  const onChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericPrice = e.target.value.replace(/[^0-9.]/g, "");
    onMinPriceChange(numericPrice);
  };

  const onChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericPrice = e.target.value.replace(/[^0-9.]/g, "");
    onMaxPriceChange(numericPrice);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Minimum price</Label>
        <Input
          type="text"
          placeholder="$0"
          value={formatPrice(minPrice ?? " ")}
          onChange={onChangeMinPrice}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Maximum price</Label>
        <Input
          type="text"
          placeholder="your choice"
          value={formatPrice(maxPrice ?? " ")}
          onChange={onChangeMaxPrice}
        />
      </div>
    </div>
  );
};
