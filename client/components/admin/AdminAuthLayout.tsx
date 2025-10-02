import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SnakeCursor from "@/components/site/cursors/SnakeCursor";

import { isAuthed } from "@/lib/submissions";

export default function AdminAuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthed()) {
      navigate("/admin-rank/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <SnakeCursor />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-20%] h-[520px] w-[520px] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-[-24%] left-[-16%] h-[460px] w-[460px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <div className="relative flex min-h-screen flex-col justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-primary/70">
              Admin Portal
            </p>
            <h1 className="mt-4 text-3xl font-semibold">
              JBRANKY Control Center
            </h1>
            <p className="mt-3 text-sm text-white/70">
              Secure access for managing submissions, team members, and client
              communication.
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
