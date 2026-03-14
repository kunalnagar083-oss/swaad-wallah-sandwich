import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/useQueries";

export default function CartDrawer() {
  const {
    items,
    updateQty,
    removeItem,
    clearCart,
    totalPrice,
    isOpen,
    setIsOpen,
  } = useCart();
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState(false);
  const placeOrder = usePlaceOrder();

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    try {
      await placeOrder.mutateAsync({
        items: items.map((i) => ({
          menuItemId: i.menuItem.id,
          quantity: BigInt(i.quantity),
        })),
        message: message.trim() || null,
      });
      toast.success("Order placed! We'll get it ready for you 🎉");
      clearCart();
      setMessage("");
      setConfirming(false);
      setIsOpen(false);
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border">
          <SheetTitle className="font-display text-xl font-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 p-8"
            data-ocid="cart.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-primary/60" />
            </div>
            <p className="text-muted-foreground text-center font-medium">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Add items from the menu to get started
            </p>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
              data-ocid="cart.close_button"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item, i) => (
                <div
                  key={item.menuItem.id.toString()}
                  className="flex items-center gap-3 bg-muted/40 rounded-xl p-3"
                  data-ocid={`cart.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {item.menuItem.name}
                    </p>
                    <p className="text-xs text-primary font-display font-700 mt-0.5">
                      ₹
                      {(
                        Number(item.menuItem.price) * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateQty(item.menuItem.id, -1)}
                      className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      data-ocid={`cart.item.${i + 1}`}
                    >
                      <Minus className="w-3 h-3 text-primary" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.menuItem.id, 1)}
                      className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      data-ocid={`cart.item.${i + 1}`}
                    >
                      <Plus className="w-3 h-3 text-primary" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.menuItem.id)}
                    className="w-7 h-7 rounded-full text-destructive/70 hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                    data-ocid={`cart.delete_button.${i + 1}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-border space-y-4">
              {confirming ? (
                <>
                  <div>
                    <label
                      htmlFor="cart-message"
                      className="text-xs font-semibold text-muted-foreground mb-1.5 block"
                    >
                      Special Instructions (optional)
                    </label>
                    <Textarea
                      placeholder="Any special requests? (e.g., less spicy, extra cheese)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="text-sm resize-none"
                      id="cart-message"
                      data-ocid="cart.textarea"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-muted-foreground">Grand Total</span>
                    <span className="font-display font-800 text-xl text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setConfirming(false)}
                      data-ocid="cart.cancel_button"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={placeOrder.isPending}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                      data-ocid="cart.confirm_button"
                    >
                      {placeOrder.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Placing...
                        </>
                      ) : (
                        "Confirm Order"
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">
                      {items.reduce((s, i) => s + i.quantity, 0)} items
                    </span>
                    <span className="font-display font-800 text-2xl text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    onClick={() => setConfirming(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-bold rounded-xl"
                    data-ocid="cart.primary_button"
                  >
                    Place Order
                  </Button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full text-xs text-muted-foreground hover:text-destructive flex items-center justify-center gap-1 transition-colors"
                    data-ocid="cart.delete_button.1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear cart
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
