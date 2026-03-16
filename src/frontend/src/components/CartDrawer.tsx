import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Banknote,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
  QrCode,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/useQueries";

type PaymentMethod = "online" | "cod" | null;

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const placeOrder = usePlaceOrder();

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    const paymentNote =
      paymentMethod === "online"
        ? "\n[Payment: PhonePe/UPI - 9303526637@ybl]"
        : "\n[Payment: Cash on Delivery]";

    const fullMessage = (message.trim() || "") + paymentNote;

    try {
      await placeOrder.mutateAsync({
        items: items.map((i) => ({
          menuItemId: i.menuItem.id,
          quantity: BigInt(i.quantity),
        })),
        message: fullMessage || null,
      });
      toast.success("Order placed! We'll get it ready for you 🎉");
      clearCart();
      setMessage("");
      setConfirming(false);
      setPaymentMethod(null);
      setIsOpen(false);
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleBack = () => {
    setConfirming(false);
    setPaymentMethod(null);
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
                  {/* Special instructions */}
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

                  {/* Payment method selection */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      Choose Payment Method
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("online")}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 px-2 transition-all text-sm font-semibold ${
                          paymentMethod === "online"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                        data-ocid="cart.payment_online.button"
                      >
                        <QrCode className="w-5 h-5" />
                        Pay Online
                        <span className="text-xs font-normal text-muted-foreground">
                          PhonePe / UPI
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 px-2 transition-all text-sm font-semibold ${
                          paymentMethod === "cod"
                            ? "border-secondary bg-secondary/10 text-secondary-foreground"
                            : "border-border bg-card text-foreground hover:border-secondary/50"
                        }`}
                        data-ocid="cart.payment_cod.button"
                      >
                        <Banknote className="w-5 h-5" />
                        Cash on Delivery
                        <span className="text-xs font-normal text-muted-foreground">
                          Pay at door
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Online payment QR */}
                  {paymentMethod === "online" && (
                    <div
                      className="bg-muted/40 rounded-xl p-4 flex flex-col items-center gap-2"
                      data-ocid="cart.qr.card"
                    >
                      <p className="text-xs font-semibold text-muted-foreground">
                        Scan to Pay
                      </p>
                      <img
                        src="/assets/uploads/Screenshot_2025-09-24-13-57-36-20-1.jpg"
                        alt="PhonePe QR Code"
                        className="w-40 h-40 object-contain rounded-lg border border-border"
                      />
                      <p className="text-sm font-bold text-foreground">
                        9303526637@ybl
                      </p>
                      <p className="text-xs text-muted-foreground text-center">
                        Scan with PhonePe, GPay, or any UPI app
                      </p>
                    </div>
                  )}

                  {/* COD confirmation */}
                  {paymentMethod === "cod" && (
                    <div className="bg-muted/40 rounded-xl p-3 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        You will pay{" "}
                        <span className="font-bold">
                          ₹{totalPrice.toLocaleString()}
                        </span>{" "}
                        when your order is delivered.
                      </p>
                    </div>
                  )}

                  {/* Total + actions */}
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-muted-foreground">Grand Total</span>
                    <span className="font-display font-800 text-xl text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      data-ocid="cart.cancel_button"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={placeOrder.isPending || !paymentMethod}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                      data-ocid="cart.confirm_button"
                    >
                      {placeOrder.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Placing...
                        </>
                      ) : paymentMethod === "online" ? (
                        "I've Paid — Confirm"
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
