import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChefHat,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCustomerProfile } from "../hooks/useQueries";
import ProfileSetupModal from "./ProfileSetupModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Order", href: "/order" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { clear, identity } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const { data: profile, isLoading: profileLoading } = useGetCustomerProfile();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const { totalCount, setIsOpen: openCart } = useCart();

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  // When newly logged in and no profile exists, show setup modal
  useEffect(() => {
    if (isLoggedIn && !profileLoading && profile === null) {
      setShowProfileSetup(true);
    }
  }, [isLoggedIn, profile, profileLoading]);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-card"
            : "bg-background/90 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-warm">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-700 text-lg leading-tight">
              <span className="text-foreground">Swaad Wallah </span>
              <span className="text-primary">Sandwich</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "text-primary bg-primary/12 font-bold"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/8"
                    }`}
                    data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Cart button */}
            {isLoggedIn && (
              <button
                type="button"
                onClick={() => openCart(true)}
                className="relative p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                data-ocid="nav.toggle"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {totalCount > 9 ? "9+" : totalCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth button */}
            {!isLoggedIn ? (
              <a href="/profile">
                <Button
                  size="sm"
                  className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold"
                  data-ocid="nav.primary_button"
                >
                  <User className="w-3.5 h-3.5 mr-1.5" />
                  Login
                </Button>
              </a>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm font-semibold"
                    data-ocid="nav.dropdown_menu"
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-24 truncate">
                      {profile?.name ?? "My Account"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <a
                      href="/order"
                      className="flex items-center gap-2"
                      data-ocid="nav.link"
                    >
                      <Package className="w-4 h-4" /> My Orders
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="/profile"
                      className="flex items-center gap-2"
                      data-ocid="nav.link"
                    >
                      <User className="w-4 h-4" /> Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => clear()}
                    className="text-destructive flex items-center gap-2"
                    data-ocid="nav.button"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <a href="/admin" className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Admin
              </Button>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-background/98 backdrop-blur-md border-b border-border px-4 pb-4"
            >
              <ul className="flex flex-col gap-1 pt-2">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          active
                            ? "text-primary bg-primary/12 font-bold"
                            : "text-foreground hover:text-primary hover:bg-primary/8"
                        }`}
                        data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
                {isLoggedIn && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-destructive"
                      data-ocid="nav.mobile.button"
                    >
                      Logout
                    </button>
                  </li>
                )}
                <li>
                  <a
                    href="/admin"
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground"
                    data-ocid="nav.mobile.admin.link"
                  >
                    Admin Panel
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ProfileSetupModal
        open={showProfileSetup}
        onComplete={() => setShowProfileSetup(false)}
      />
    </>
  );
}
