import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const linkBase = "px-4 py-2 text-sm font-semibold transition-colors";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent",
        scrolled
          ? "bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-border"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto container-padding flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-md overflow-hidden shadow shadow-primary/30 group-hover:scale-105 transition">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F3bf22d05ba0448ba84dcc33dbdacf26e%2F4c350b19b54540f2905c5c8ee1e18122?format=webp&width=128" alt="Company logo" className="h-full w-full object-contain bg-transparent" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold tracking-tight text-primary text-lg">
              JBRANKY LTD
            </div>
            <div className="text-[11px] uppercase tracking-widest text-foreground/60">
              Premium Energy Solutions
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            ["/about", "Who We Are"],
            ["/services", "What We Do"],
            ["/projects", "Gallery"],
            ["/blog", "Blog"],
            ["/contact", "Contact"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  linkBase,
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild size="lg">
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="rounded-md border p-2">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-2">
                {[
                  ["/about", "Who We Are"],
                  ["/services", "What We Do"],
                  ["/projects", "Gallery"],
                  ["/blog", "Blog"],
                  ["/contact", "Contact"],
                ].map(([to, label]) => (
                  <Link
                    key={to}
                    to={to}
                    className="rounded-md px-3 py-2 hover:bg-accent text-left"
                  >
                    {label}
                  </Link>
                ))}
                <Link to="/contact" className="btn-primary mt-2">
                  Request a Quote
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
