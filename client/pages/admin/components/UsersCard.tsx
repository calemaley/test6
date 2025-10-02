import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminUser } from "@/lib/submissions";
import { cn } from "@/lib/utils";

function UserRow({ user }: { user: AdminUser }) {
  const lastLoginLabel = user.last_login
    ? new Date(user.last_login).toLocaleString()
    : "No activity recorded";

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{user.username}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <Badge
          variant={user.is_active === false ? "outline" : "secondary"}
          className={cn(
            user.is_active === false ? "border-amber-300 text-amber-600" : "bg-emerald-100 text-emerald-700",
          )}
        >
          {user.is_active === false ? "Inactive" : "Active"}
        </Badge>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Last login: {lastLoginLabel}</p>
    </div>
  );
}

export default function UsersCard({ users, loading, fetching }: { users: AdminUser[]; loading: boolean; fetching: boolean }) {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Admin team</CardTitle>
          <CardDescription>Accounts with access to this console.</CardDescription>
        </div>
        {fetching && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <p className="py-8 text-sm text-muted-foreground">No admins found. Share the signup link to onboard your team.</p>
        ) : (
          <ScrollArea className="max-h-[420px] pr-2">
            <div className="space-y-4">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
