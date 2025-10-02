import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      await login(username.trim(), password);
      toast.success("Welcome back, Admin");
      navigate("/admin-rank/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Invalid credentials",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <Card className="border-white/10 bg-white/95 shadow-xl backdrop-blur">
        <CardHeader className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-base">
              Sign in to access the JBRANKY operations console and manage new
              leads in real-time.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin username"
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-xs text-muted-foreground">
                  Minimum 8 characters
                </span>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing you in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-sm text-muted-foreground">
            Need an account?{" "}
            <Link
              to="signup"
              className="font-medium text-primary hover:underline"
            >
              Create one now
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
