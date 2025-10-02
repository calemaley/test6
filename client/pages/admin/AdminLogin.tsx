import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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
import { isAuthed, login } from "@/lib/submissions";

function parseAuthError(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof error === "string" && error.length > 0) {
    return error;
  }
  return fallback;
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthed()) {
      navigate("/admin-rank/dashboard", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedUsername = username.trim();
    setFormError(null);

    if (!trimmedUsername || password.trim().length === 0) {
      const message = "Please provide both your username and password.";
      setFormError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    try {
      await login(trimmedUsername, password);
      toast.success("Welcome back, Admin");
      navigate("/admin-rank/dashboard", { replace: true });
    } catch (error) {
      const message = parseAuthError(
        error,
        "Invalid credentials. Please try again.",
      );
      setFormError(message);
      toast.error(message);
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
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin username"
                autoComplete="username"
                disabled={loading}
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
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
                required
              />
            </div>
            {formError && (
              <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing you in...
                </span>
              ) : (
                "Sign in"
              )}
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
