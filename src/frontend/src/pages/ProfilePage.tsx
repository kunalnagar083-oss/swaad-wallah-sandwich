import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Package, ShoppingBag, User } from "lucide-react";
import { motion } from "motion/react";
import type { OrderEntity } from "../backend.d";
import { OrderStatus } from "../backend.d";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCustomerProfile, useGetMyOrders } from "../hooks/useQueries";

function statusBadge(status: OrderStatus) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    [OrderStatus.pending]: {
      label: "Pending",
      className: "bg-amber-100 text-amber-800 border-amber-300",
    },
    [OrderStatus.preparing]: {
      label: "Preparing",
      className: "bg-blue-100 text-blue-800 border-blue-300",
    },
    [OrderStatus.ready]: {
      label: "Ready!",
      className: "bg-green-100 text-green-800 border-green-300",
    },
    [OrderStatus.delivered]: {
      label: "Delivered",
      className: "bg-gray-100 text-gray-600 border-gray-300",
    },
  };
  const s = map[status] ?? {
    label: String(status),
    className: "bg-muted text-muted-foreground",
  };
  return (
    <Badge className={`text-xs font-semibold border ${s.className}`}>
      {s.label}
    </Badge>
  );
}

function OrderCard({ order, index }: { order: OrderEntity; index: number }) {
  const date = new Date(Number(order.id) / 1_000_000);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-card rounded-2xl shadow-card p-5 space-y-3"
      data-ocid={`profile.orders.item.${index + 1}`}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="w-4.5 h-4.5 text-primary" />
          </div>
          <div>
            <p className="font-display font-700 text-sm">
              Order #{order.id.toString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {Number.isNaN(date.getTime())
                ? ""
                : date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
            </p>
          </div>
        </div>
        {statusBadge(order.status)}
      </div>
      <div className="border-t border-border pt-3">
        <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wide">
          Items
        </p>
        <div className="space-y-1">
          {order.items.map((item, i) => (
            <div
              key={`${item.menuItemId.toString()}-${i}`}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {Number(item.quantity)}
              </span>
              <span className="text-foreground">
                Menu Item #{item.menuItemId.toString()}
              </span>
            </div>
          ))}
        </div>
      </div>
      {order.message && (
        <div className="bg-muted/60 rounded-lg px-3 py-2">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Note:</span> {order.message}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function ProfilePage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const { data: profile, isLoading: profileLoading } = useGetCustomerProfile();
  const { data: orders, isLoading: ordersLoading } = useGetMyOrders();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {!isLoggedIn ? (
          <div className="min-h-[70vh] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-sm w-full"
              data-ocid="profile.panel"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.22 48), oklch(0.55 0.20 35))",
                }}
              >
                <User className="w-10 h-10 text-white" />
              </div>
              <h1
                className="font-display text-3xl font-800 mb-1"
                style={{ color: "oklch(0.22 0.06 45)" }}
              >
                Welcome Back!
              </h1>
              <p className="text-base font-semibold text-primary mb-1">
                Swaad Wallah Sandwich
              </p>
              <p className="text-muted-foreground mb-8 text-sm">
                Login to view your profile and track your orders
              </p>
              <Button
                onClick={() => login()}
                disabled={loginStatus === "logging-in"}
                className="w-full h-12 font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg"
                data-ocid="profile.primary_button"
              >
                {loginStatus === "logging-in"
                  ? "Connecting..."
                  : "Login to Your Account"}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Don't have an account? Login to create one automatically.
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-6 mb-8 flex items-center justify-between gap-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 48), oklch(0.55 0.20 35))",
                boxShadow: "0 8px 30px oklch(0.60 0.22 48 / 0.30)",
              }}
              data-ocid="profile.card"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shadow">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  {profileLoading ? (
                    <Skeleton className="h-6 w-32 mb-1 bg-white/30" />
                  ) : (
                    <h2 className="font-display text-xl font-800 text-white">
                      {profile?.name ?? "My Account"}
                    </h2>
                  )}
                  {profile?.phone && (
                    <p className="text-white/80 text-sm">{profile.phone}</p>
                  )}
                </div>
              </div>
              <Button
                onClick={() => clear()}
                variant="outline"
                size="sm"
                className="border-white/40 text-white hover:bg-white/20 bg-transparent"
                data-ocid="profile.secondary_button"
              >
                <LogOut className="w-4 h-4 mr-1.5" /> Logout
              </Button>
            </motion.div>

            {/* Orders Section */}
            <h3
              className="font-display text-xl font-700 mb-4"
              style={{ color: "oklch(0.22 0.06 45)" }}
            >
              My Orders
            </h3>
            {ordersLoading ? (
              <div className="space-y-4" data-ocid="profile.loading_state">
                {[1, 2].map((k) => (
                  <div key={k} className="bg-card rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-9 w-40" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                  </div>
                ))}
              </div>
            ) : !orders || orders.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="profile.orders.empty_state"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary/60" />
                </div>
                <h4 className="font-display text-lg font-700 mb-2">
                  No orders yet
                </h4>
                <p className="text-muted-foreground mb-6">
                  Place your first order from the menu!
                </p>
                <a href="/menu">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    data-ocid="profile.primary_button"
                  >
                    Browse Menu
                  </Button>
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {orders.length} order{orders.length !== 1 ? "s" : ""} found
                </p>
                {[...orders].reverse().map((order, i) => (
                  <OrderCard
                    key={order.id.toString()}
                    order={order}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
