import { useEffect, useMemo } from "react";
import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Activity, CheckCircle2, Clock3, Loader2, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { isThisWeek, isToday } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AdminUser,
  getAdminUsers,
  getSubmissions,
  isAuthed,
} from "@/lib/submissions";

interface DashboardMetrics {
  total: number;
  reviewed: number;
  pending: number;
  today: number;
  week: number;
  service: number;
  consultation: number;
  general: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const authed = isAuthed();

  useEffect(() => {
    if (!authed) {
      navigate("/admin-rank", { replace: true });
    }
  }, [authed, navigate]);

  const submissionsQuery = useQuery({
    queryKey: ["admin", "submissions"],
    queryFn: getSubmissions,
    enabled: authed,
  });

  const adminUsersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: getAdminUsers,
    enabled: authed,
  });

  useEffect(() => {
    if (submissionsQuery.error) {
      const message =
        submissionsQuery.error instanceof Error
          ? submissionsQuery.error.message
          : "Unable to load submissions.";
      toast.error(message);
    }
  }, [submissionsQuery.error]);

  useEffect(() => {
    if (adminUsersQuery.error) {
      const message =
        adminUsersQuery.error instanceof Error
          ? adminUsersQuery.error.message
          : "Unable to load admin users.";
      toast.error(message);
    }
  }, [adminUsersQuery.error]);

  const submissions = submissionsQuery.data ?? [];
  const adminUsers = adminUsersQuery.data ?? [];

  const sortedSubmissions = useMemo(
    () =>
      [...submissions].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [submissions],
  );

  const metrics = useMemo<DashboardMetrics>(() => {
    if (sortedSubmissions.length === 0) {
      return {
        total: 0,
        reviewed: 0,
        pending: 0,
        today: 0,
        week: 0,
        service: 0,
        consultation: 0,
        general: 0,
      } satisfies DashboardMetrics;
    }

    let reviewed = 0;
    let service = 0;
    let consultation = 0;
    let general = 0;
    let today = 0;
    let week = 0;

    for (const submission of sortedSubmissions) {
      if (submission.reviewed) reviewed += 1;
      if (submission.normalizedType === "service") service += 1;
      if (submission.normalizedType === "consultation") consultation += 1;
      if (submission.normalizedType === "general") general += 1;

      const createdAt = new Date(submission.createdAt);
      if (isToday(createdAt)) today += 1;
      if (isThisWeek(createdAt, { weekStartsOn: 1 })) week += 1;
    }

    return {
      total: sortedSubmissions.length,
      reviewed,
      pending: sortedSubmissions.length - reviewed,
      today,
      week,
      service,
      consultation,
      general,
    } satisfies DashboardMetrics;
  }, [sortedSubmissions]);

  const reviewRate = metrics.total
    ? Math.round((metrics.reviewed / metrics.total) * 100)
    : 0;
  const activeAdmins = countActiveAdmins(adminUsers);

  return (
    <section className="mx-auto flex w-full max-w-none flex-col gap-10 lg:max-w-6xl">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Control Center
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Monitor inbound leads, track follow-ups, and manage your admin team.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => submissionsQuery.refetch()}
            disabled={submissionsQuery.isFetching}
          >
            {submissionsQuery.isFetching && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            Refresh data
          </Button>
        </div>
      </header>

      <OverviewMetrics
        metrics={metrics}
        reviewRate={reviewRate}
        activeAdmins={activeAdmins}
        totalAdmins={adminUsers.length}
        loading={submissionsQuery.isLoading && submissions.length === 0}
      />
    </section>
  );
}

function countActiveAdmins(adminUsers: AdminUser[]) {
  return adminUsers.filter((user) => user.is_active ?? true).length;
}

interface OverviewMetricsProps {
  metrics: DashboardMetrics;
  reviewRate: number;
  activeAdmins: number;
  totalAdmins: number;
  loading: boolean;
}

function OverviewMetrics({
  metrics,
  reviewRate,
  activeAdmins,
  totalAdmins,
  loading,
}: OverviewMetricsProps) {
  const cards: Array<MetricCardProps & { to: string }> = [
    {
      label: "Total inquiries",
      helper:
        metrics.week > 0
          ? `${metrics.week} received this week`
          : "No new inquiries this week",
      value: metrics.total.toLocaleString(),
      icon: Activity,
      to: "/admin-rank/dashboard/recent",
    },
    {
      label: "Review rate",
      helper: `${metrics.reviewed} marked as reviewed`,
      value: `${reviewRate}%`,
      icon: CheckCircle2,
      to: "/admin-rank/dashboard/recent?status=reviewed",
    },
    {
      label: "New today",
      helper:
        metrics.pending > 0
          ? `${metrics.pending} awaiting follow-up`
          : "All submissions are reviewed",
      value: metrics.today.toLocaleString(),
      icon: Clock3,
      to: "/admin-rank/dashboard/new-today",
    },
    {
      label: "Active admins",
      helper: `${totalAdmins} team member${totalAdmins === 1 ? "" : "s"}`,
      value: activeAdmins.toString(),
      icon: Users,
      to: "/admin-rank/dashboard/active-admins",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ to, ...card }) => (
        <Link key={card.label} to={to} className="block">
          <MetricCard {...card} loading={loading} />
        </Link>
      ))}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  loading: boolean;
}

function MetricCard({ label, value, helper, icon: Icon, loading }: MetricCardProps) {
  return (
    <Card className="border-none bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-slate-900">
          {loading ? "—" : value}
        </p>
        <CardDescription className="mt-2 text-xs text-muted-foreground">
          {helper}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
