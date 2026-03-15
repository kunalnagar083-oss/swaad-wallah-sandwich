import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChefHat,
  ClipboardList,
  Edit2,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  Save,
  Settings,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MenuItem, backendInterface } from "../backend.d";
import { OrderStatus } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddMenuItem,
  useDeleteMenuItem,
  useGetAllMenuItems,
  useGetAllOrders,
  useGetRestaurantInfo,
  useIsCallerAdmin,
  useToggleMenuItemAvailability,
  useUpdateMenuItem,
  useUpdateOrderStatus,
  useUpdateRestaurantInfo,
} from "../hooks/useQueries";

const CATEGORIES = ["Sandwich", "Burger", "Beverage", "Snack"];
const ADMIN_SKELETON_KEYS = ["as1", "as2", "as3", "as4"];

const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.pending, label: "Pending" },
  { value: OrderStatus.preparing, label: "Preparing" },
  { value: OrderStatus.ready, label: "Ready" },
  { value: OrderStatus.delivered, label: "Delivered" },
];

type ItemForm = {
  name: string;
  description: string;
  price: string;
  category: string;
};
const emptyForm: ItemForm = {
  name: "",
  description: "",
  price: "",
  category: "Sandwich",
};

function statusBadgeClass(status: OrderStatus) {
  switch (status) {
    case OrderStatus.pending:
      return "bg-amber-100 text-amber-800 border-amber-300";
    case OrderStatus.preparing:
      return "bg-blue-100 text-blue-800 border-blue-300";
    case OrderStatus.ready:
      return "bg-green-100 text-green-800 border-green-300";
    case OrderStatus.delivered:
      return "bg-gray-100 text-gray-600 border-gray-300";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ItemForm>(emptyForm);
  const addItem = useAddMenuItem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addItem.mutateAsync({
        name: form.name,
        description: form.description,
        price: BigInt(Math.round(Number.parseFloat(form.price))),
        category: form.category,
      });
      toast.success("Menu item added!");
      setForm(emptyForm);
      setOpen(false);
    } catch {
      toast.error("Failed to add item");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          data-ocid="admin.add_item.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent data-ocid="admin.add_item.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Add Menu Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="add-name">Name</Label>
            <Input
              id="add-name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              data-ocid="admin.add_item.input"
            />
          </div>
          <div>
            <Label htmlFor="add-desc">Description</Label>
            <Textarea
              id="add-desc"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              required
              data-ocid="admin.add_item.textarea"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="add-price">Price (₹)</Label>
              <Input
                id="add-price"
                type="number"
                min="1"
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: e.target.value }))
                }
                required
                data-ocid="admin.add_item.input"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
              >
                <SelectTrigger data-ocid="admin.add_item.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.add_item.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addItem.isPending}
              className="bg-primary"
              data-ocid="admin.add_item.submit_button"
            >
              {addItem.isPending ? "Adding..." : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditItemDialog({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ItemForm>({
    name: item.name,
    description: item.description,
    price: item.price.toString(),
    category: item.category,
  });
  const updateItem = useUpdateMenuItem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateItem.mutateAsync({
        id: item.id,
        name: form.name,
        description: form.description,
        price: BigInt(Math.round(Number.parseFloat(form.price))),
        category: form.category,
      });
      toast.success("Item updated!");
      setOpen(false);
    } catch {
      toast.error("Failed to update item");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          data-ocid="admin.edit_item.open_modal_button"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent data-ocid="admin.edit_item.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Menu Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              data-ocid="admin.edit_item.input"
            />
          </div>
          <div>
            <Label htmlFor="edit-desc">Description</Label>
            <Textarea
              id="edit-desc"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              required
              data-ocid="admin.edit_item.textarea"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="edit-price">Price (₹)</Label>
              <Input
                id="edit-price"
                type="number"
                min="1"
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: e.target.value }))
                }
                required
                data-ocid="admin.edit_item.input"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
              >
                <SelectTrigger data-ocid="admin.edit_item.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.edit_item.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateItem.isPending}
              className="bg-primary"
              data-ocid="admin.edit_item.save_button"
            >
              {updateItem.isPending ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function RestaurantInfoEditor() {
  const { data: info } = useGetRestaurantInfo();
  const updateInfo = useUpdateRestaurantInfo();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [initialized, setInitialized] = useState(false);

  if (info && !initialized) {
    setForm({
      name: info.name,
      address: info.address,
      phoneNumber: info.phoneNumber,
      email: info.email,
    });
    setInitialized(true);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateInfo.mutateAsync(form);
      toast.success("Restaurant info updated!");
    } catch {
      toast.error("Failed to update info");
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="font-display font-700 text-lg mb-5 flex items-center gap-2">
        <Settings className="w-5 h-5 text-primary" /> Restaurant Info
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="info-name">Restaurant Name</Label>
            <Input
              id="info-name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              data-ocid="admin.info.input"
            />
          </div>
          <div>
            <Label htmlFor="info-phone">Phone</Label>
            <Input
              id="info-phone"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, phoneNumber: e.target.value }))
              }
              data-ocid="admin.info.input"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="info-email">Email</Label>
          <Input
            id="info-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            data-ocid="admin.info.input"
          />
        </div>
        <div>
          <Label htmlFor="info-address">Address</Label>
          <Textarea
            id="info-address"
            value={form.address}
            rows={2}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
            data-ocid="admin.info.textarea"
          />
        </div>
        <Button
          type="submit"
          disabled={updateInfo.isPending}
          className="bg-primary"
          data-ocid="admin.info.submit_button"
        >
          {updateInfo.isPending ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Info
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function OrdersTab() {
  const { data: orders, isLoading } = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      toast.success("Order status updated!");
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.orders.loading_state">
        {ADMIN_SKELETON_KEYS.map((k) => (
          <Skeleton key={k} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-16" data-ocid="admin.orders.empty_state">
        <ClipboardList className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-muted-foreground">
          No orders yet. Orders will appear here when customers place them.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-ocid="admin.orders.table">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Order ID
            </th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Customer
            </th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Phone
            </th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Items
            </th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Status
            </th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">
              Update
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[...orders].reverse().map((order, i) => (
            <tr
              key={order.id.toString()}
              className="hover:bg-muted/30 transition-colors"
              data-ocid={`admin.orders.row.${i + 1}`}
            >
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                #{order.id.toString()}
              </td>
              <td className="px-4 py-3 font-semibold">{order.customerName}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {order.customerPhone}
              </td>
              <td className="px-4 py-3">
                <span className="text-xs">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </span>
                {order.message && (
                  <p className="text-xs text-muted-foreground italic mt-0.5 max-w-32 truncate">
                    {order.message}
                  </p>
                )}
              </td>
              <td className="px-4 py-3">
                <Badge
                  className={`text-xs border ${statusBadgeClass(order.status)}`}
                >
                  {ORDER_STATUSES.find((s) => s.value === order.status)
                    ?.label ?? String(order.status)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Select
                  value={String(order.status)}
                  onValueChange={(v) =>
                    handleStatusChange(order.id, v as OrderStatus)
                  }
                >
                  <SelectTrigger
                    className="h-8 w-32 text-xs"
                    data-ocid={`admin.orders.select.${i + 1}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((s) => (
                      <SelectItem key={s.value} value={String(s.value)}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function doClaimAdmin(
  u: string,
  p: string,
  actor: backendInterface,
): Promise<boolean> {
  return actor.claimAdminWithPassword(u, p);
}

export default function AdminPage() {
  const { login, clear, identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin();
  const { data: menuItems, isLoading: loadingItems } = useGetAllMenuItems();
  const deleteItem = useDeleteMenuItem();
  const toggleAvail = useToggleMenuItemAvailability();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitingForII, setWaitingForII] = useState(false);
  const [pendingCreds, setPendingCreds] = useState<{
    u: string;
    p: string;
  } | null>(null);

  const isLoggedIn = !!identity;

  // After II login completes, if we have pending credentials, claim admin
  if (waitingForII && isLoggedIn && actor && !actorFetching && pendingCreds) {
    const { u, p } = pendingCreds;
    setPendingCreds(null);
    setWaitingForII(false);
    setIsSubmitting(true);
    doClaimAdmin(u, p, actor)
      .then((success) => {
        if (success) {
          queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
          queryClient.refetchQueries({ queryKey: ["isAdmin"] });
        } else {
          setLoginError("Wrong username or password. Please try again.");
          clear();
        }
      })
      .catch(() => setLoginError("Login failed. Please try again."))
      .finally(() => setIsSubmitting(false));
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);

    if (!username.trim() || !password.trim()) {
      setLoginError("Please enter your username and password.");
      setIsSubmitting(false);
      return;
    }

    // If already logged in with II, try to claim admin directly
    if (isLoggedIn && actor && !actorFetching) {
      try {
        const success = await doClaimAdmin(username, password, actor);
        if (success) {
          await queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
          await queryClient.refetchQueries({ queryKey: ["isAdmin"] });
        } else {
          setLoginError("Wrong username or password. Please try again.");
        }
      } catch {
        setLoginError("Login failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Not logged in with II -- save credentials and trigger II login
    setPendingCreds({ u: username, p: password });
    setWaitingForII(true);
    setIsSubmitting(false);
    login();
  };

  const handleLogout = () => {
    clear();
    setUsername("");
    setPassword("");
    setLoginError("");
    setPendingCreds(null);
    setWaitingForII(false);
    queryClient.clear();
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteItem.mutateAsync(id);
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const handleToggle = async (id: bigint) => {
    try {
      await toggleAvail.mutateAsync(id);
      toast.success("Availability updated");
    } catch {
      toast.error("Failed to toggle availability");
    }
  };

  // Show loading while II initializes
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center" data-ocid="admin.loading_state">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not admin yet
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-3xl shadow-card p-10 max-w-sm w-full"
          data-ocid="admin.login.panel"
        >
          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
              <ChefHat className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-800 mb-1">Admin Login</h1>
            <p className="text-muted-foreground text-sm">
              Enter your admin credentials to continue.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                disabled={isSubmitting || waitingForII}
                data-ocid="admin.login.input"
              />
            </div>
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  disabled={isSubmitting || waitingForII}
                  className="pr-10"
                  data-ocid="admin.login.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <p
                className="text-destructive text-sm"
                data-ocid="admin.login.error_state"
              >
                {loginError}
              </p>
            )}

            {waitingForII && (
              <p
                className="text-muted-foreground text-xs text-center"
                data-ocid="admin.login.loading_state"
              >
                Please complete the verification popup to continue...
              </p>
            )}

            <Button
              type="submit"
              disabled={
                isSubmitting || waitingForII || (isLoggedIn && checkingAdmin)
              }
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold"
              data-ocid="admin.login.primary_button"
            >
              {isSubmitting || waitingForII || (isLoggedIn && checkingAdmin)
                ? "Logging in..."
                : "Login"}
            </Button>
          </form>

          <a
            href="/"
            className="mt-5 block text-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to website
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-700 text-base">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Swaad Wallah Sandwich
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            ← View Site
          </a>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-1.5"
            data-ocid="admin.logout.button"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <RestaurantInfoEditor />

        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="mb-6" data-ocid="admin.tab">
            <TabsTrigger
              value="menu"
              className="gap-2"
              data-ocid="admin.menu.tab"
            >
              <ChefHat className="w-4 h-4" /> Menu Items
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="gap-2"
              data-ocid="admin.orders.tab"
            >
              <ClipboardList className="w-4 h-4" /> Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-display font-700 text-lg">
                  Menu Items ({menuItems?.length ?? 0})
                </h2>
                <AddItemDialog />
              </div>

              {loadingItems ? (
                <div
                  className="p-6 space-y-3"
                  data-ocid="admin.menu.loading_state"
                >
                  {ADMIN_SKELETON_KEYS.map((k) => (
                    <Skeleton key={k} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : menuItems?.length === 0 ? (
                <div
                  className="p-12 text-center"
                  data-ocid="admin.menu.empty_state"
                >
                  <p className="text-muted-foreground">
                    No menu items yet. Add your first item!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {menuItems?.map((item, i) => (
                    <div
                      key={item.id.toString()}
                      className="flex items-center justify-between p-4 gap-3 hover:bg-muted/40 transition-colors"
                      data-ocid={`admin.menu.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-foreground truncate">
                            {item.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          {!item.isAvailable && (
                            <Badge variant="destructive" className="text-xs">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="font-display font-700 text-primary text-sm mr-2">
                          ₹{item.price.toString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id)}
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          title={
                            item.isAvailable
                              ? "Mark unavailable"
                              : "Mark available"
                          }
                          data-ocid={`admin.menu.toggle.${i + 1}`}
                        >
                          {item.isAvailable ? (
                            <ToggleRight className="w-5 h-5 text-secondary" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                        <EditItemDialog item={item} />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                          onClick={() => handleDelete(item.id)}
                          data-ocid={`admin.menu.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-display font-700 text-lg flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-primary" /> Customer
                  Orders
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage and update order statuses in real-time.
                </p>
              </div>
              <div className="p-4">
                <OrdersTab />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
