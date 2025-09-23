import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
        scrolled ? "bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto container-padding flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-md bg-primary grid place-items-center text-white font-bold shadow shadow-primary/30 group-hover:scale-105 transition">
            JB
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold tracking-tight text-primary text-lg">JBRANKY LTD</div>
            <div className="text-[11px] uppercase tracking-widest text-foreground/60">Premium Energy Solutions</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            ["/about", "Who We Are"],
            ["/services", "Services"],
            ["/projects", "Projects"],
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

        <div className="hidden md:block">
          <Button asChild size="lg">
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button asChild variant="secondary">
            <Link to="/contact">Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
