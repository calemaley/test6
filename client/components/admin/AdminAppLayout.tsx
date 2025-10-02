import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  X,
  Users,
  Clock3,
  ListChecks,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import SnakeCursor from "@/components/site/cursors/SnakeCursor";
import { cn } from "@/lib/utils";
import { isAuthed, logout } from "@/lib/submissions";

const NAV_LINKS: Array<{ to: string; label: string; icon: LucideIcon }> = [
  {
    to: "/admin-rank/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: "/admin-rank/dashboard/recent",
    label: "Recent submissions",
    icon: ListChecks,
  },
  {
    to: "/admin-rank/dashboard/new-today",
    label: "New today",
    icon: Clock3,
  },
  {
    to: "/admin-rank/dashboard/active-admins",
    label: "Active admins",
    icon: Users,
  },
];

export default function AdminAppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      navigate("/admin-rank", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await logout();
    navigate("/admin-rank", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <SnakeCursor />
      <aside className="hidden w-80 flex-col border-r border-slate-200 bg-slate-950 text-white lg:flex">
        <AdminSidebarContent />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 translate-x-[-100%] border-r border-slate-200 bg-slate-950 text-white transition-transform lg:hidden",
          sidebarOpen && "translate-x-0",
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/90">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Admin
              </p>
              <p className="font-semibold">Control Center</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close navigation</span>
          </Button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-8">
          {NAV_LINKS.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 shadow-sm lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation</span>
            </Button>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Admin
              </p>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-auto bg-slate-50 px-6 py-10 md:px-8 lg:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminSidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-8 py-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/90">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Admin
          </p>
          <p className="text-lg font-semibold">Control Center</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {NAV_LINKS.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
      </nav>
      <div className="px-8 pb-10 text-xs text-white/50">
        Organized operations for the JBRANKY team.
      </div>
    </div>
  );
}

function SidebarLink({ to, label, icon: Icon }: (typeof NAV_LINKS)[number]) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
          isActive
            ? "bg-white text-slate-900 shadow-sm"
            : "text-white/70 hover:bg-white/10 hover:text-white",
        )
      }
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}
