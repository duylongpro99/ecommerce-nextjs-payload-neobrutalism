import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import { CircleIcon } from "lucide-react";

interface Props {
  totalPrice: number;
  onCheckout: () => void;
  isCancel?: boolean;
  disabled?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalPrice,
  onCheckout,
  isCancel = false,
  disabled = false,
}) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="font-medium text-lg">Total</h4>
        <p className="fonr-medium text-lg">{currency(totalPrice)}</p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <Button
          variant={"elevated"}
          disabled={disabled}
          onClick={onCheckout}
          size={"lg"}
          className="text-base w-full text-white bg-primary hover:bg-cyan-400 hover:text-primary"
        >
          Checkout
        </Button>
      </div>
      {isCancel && (
        <div className="p-4 flex justify-center items-center border-t">
          <p className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded flex items-center w-full">
            <div className="flex items-center">
              <CircleIcon className="size-6 mr-2 fill-red-500 text-red-100" />
              <span>Checkout failed! Please try again.</span>
            </div>
          </p>
        </div>
      )}
    </div>
  );
};
