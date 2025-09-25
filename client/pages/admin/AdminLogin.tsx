import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { login, isAuthed } from "@/lib/submissions";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthed()) {
      navigate("/admin-rank/dashboard", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = login(username.trim(), password);
      if (ok) {
        toast.success("Welcome back, Admin");
        navigate("/admin-rank/dashboard", { replace: true });
      } else {
        toast.error("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section max-w-md">
      <h1 className="section-title">Admin Login</h1>
      <p className="section-subtitle">Restricted access</p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            autoComplete="username"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />
        </div>
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div className="text-xs text-foreground/60">
          Hint: Username JBRANKY, Password admin@123
        </div>
      </form>
    </section>
  );
}
