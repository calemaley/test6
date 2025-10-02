import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow, isThisWeek, isToday } from "date-fns";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  AdminUser,
  Submission,
  getAdminUsers,
  getSubmissions,
  isAuthed,
  updateSubmissionStatus,
  deleteSubmission,
} from "@/lib/submissions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type InquiryFilter = "all" | "service" | "consultation" | "general";
type StatusFilter = "all" | "new" | "reviewed";

const TYPE_FILTERS: Array<{ value: InquiryFilter; label: string }> = [
  { value: "all", label: "All inquiries" },
  { value: "service", label: "Service requests" },
  { value: "consultation", label: "Consultations" },
  { value: "general", label: "General" },
];

const STATUS_FILTERS: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "Any status" },
  { value: "new", label: "Awaiting review" },
  { value: "reviewed", label: "Reviewed" },
];

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
  const queryClient = useQueryClient();
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

  const [typeFilter, setTypeFilter] = useState<InquiryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

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
      };
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
    };
  }, [sortedSubmissions]);

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return sortedSubmissions.filter((submission) => {
      if (typeFilter !== "all" && submission.normalizedType !== typeFilter) {
        return false;
      }

      if (statusFilter === "new" && submission.reviewed) {
        return false;
      }

      if (statusFilter === "reviewed" && !submission.reviewed) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack =
        `${submission.name} ${submission.email} ${submission.message} ${submission.service ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [sortedSubmissions, typeFilter, statusFilter, searchTerm]);

  const reviewRate = metrics.total
    ? Math.round((metrics.reviewed / metrics.total) * 100)
    : 0;
  const activeAdmins = adminUsers.filter(
    (user) => user.is_active ?? true,
  ).length;
  const latestSubmission = sortedSubmissions[0] ?? null;

  const handleToggleReviewed = async (submission: Submission) => {
    if (updatingId) return;

    const nextStatus = submission.reviewed ? "new" : "reviewed";
    setUpdatingId(submission.id);
    try {
      const updated = await updateSubmissionStatus(submission.id, nextStatus);
      queryClient.setQueryData<Submission[] | undefined>(
        ["admin", "submissions"],
        (current) => {
          if (!current) return [updated];
          return current.map((item) =>
            item.id === updated.id ? updated : item,
          );
        },
      );
      toast.success(
        nextStatus === "reviewed"
          ? "Submission marked as reviewed"
          : "Submission marked as new",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to update submission status.";
      toast.error(message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (submission: Submission) => {
    if (updatingId) return;
    setUpdatingId(submission.id);
    try {
      await deleteSubmission(submission.id);
      queryClient.setQueryData<Submission[] | undefined>(
        ["admin", "submissions"],
        (current) => (current ? current.filter((s) => s.id !== submission.id) : []),
      );
      toast.success("Submission deleted");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to delete submission.";
      toast.error(message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
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

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <SubmissionsPanel
          items={filteredSubmissions}
          totalItems={sortedSubmissions.length}
          onRefresh={() => submissionsQuery.refetch()}
          loading={submissionsQuery.isLoading}
          fetching={submissionsQuery.isFetching}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleReviewed={handleToggleReviewed}
          onDelete={handleDelete}
          updatingId={updatingId}
        />

        <aside className="space-y-6">
          <LatestLeadCard
            submission={latestSubmission}
            loading={submissionsQuery.isLoading}
          />
          <UsersCard
            users={adminUsers}
            loading={adminUsersQuery.isLoading}
            fetching={adminUsersQuery.isFetching}
          />
        </aside>
      </div>
    </section>
  );
}

function OverviewMetrics({
  metrics,
  reviewRate,
  activeAdmins,
  totalAdmins,
  loading,
}: {
  metrics: DashboardMetrics;
  reviewRate: number;
  activeAdmins: number;
  totalAdmins: number;
  loading: boolean;
}) {
  const cards = [
    {
      label: "Total inquiries",
      helper:
        metrics.week > 0
          ? `${metrics.week} received this week`
          : "No new inquiries this week",
      value: metrics.total.toLocaleString(),
      icon: Activity,
    },
    {
      label: "Review rate",
      helper: `${metrics.reviewed} marked as reviewed`,
      value: `${reviewRate}%`,
      icon: CheckCircle2,
    },
    {
      label: "New today",
      helper:
        metrics.pending > 0
          ? `${metrics.pending} awaiting follow-up`
          : "All submissions are reviewed",
      value: metrics.today.toLocaleString(),
      icon: Clock3,
    },
    {
      label: "Active admins",
      helper: `${totalAdmins} team member${totalAdmins === 1 ? "" : "s"}`,
      value: activeAdmins.toString(),
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} loading={loading} />
      ))}
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string;
  helper: string;
  icon: typeof Activity;
  loading: boolean;
}) {
  return (
    <Card className="border-none bg-white shadow-sm">
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
        <p className="mt-2 text-xs text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  );
}

function SubmissionsPanel({
  items,
  totalItems,
  onRefresh,
  loading,
  fetching,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  searchTerm,
  onSearchChange,
  onToggleReviewed,
  updatingId,
}: {
  items: Submission[];
  totalItems: number;
  onRefresh: () => void;
  loading: boolean;
  fetching: boolean;
  typeFilter: InquiryFilter;
  onTypeFilterChange: (value: InquiryFilter) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleReviewed: (submission: Submission) => void;
  updatingId: number | null;
}) {
  const showEmptyState = !loading && items.length === 0;

  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle>Recent submissions</CardTitle>
            <CardDescription>
              Showing {items.length} of {totalItems} total submissions.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={onRefresh}
            disabled={fetching}
          >
            {fetching && <Loader2 className="h-4 w-4 animate-spin" />}
            Sync now
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {TYPE_FILTERS.map((filter) => (
              <FilterPill
                key={filter.value}
                label={filter.label}
                active={typeFilter === filter.value}
                onClick={() => onTypeFilterChange(filter.value)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {STATUS_FILTERS.map((filter) => (
              <FilterPill
                key={filter.value}
                label={filter.label}
                active={statusFilter === filter.value}
                onClick={() => onStatusFilterChange(filter.value)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by name, email, or message"
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="max-h-[520px] overflow-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-muted/60 text-left uppercase text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Inquiry</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {loading ? (
                  <TableLoadingState />
                ) : showEmptyState ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-muted-foreground"
                    >
                      No submissions match the current filters.
                    </td>
                  </tr>
                ) : (
                  items.map((submission) => (
                    <SubmissionRow
                      key={submission.id}
                      submission={submission}
                      onToggleReviewed={onToggleReviewed}
                      updating={updatingId === submission.id}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SubmissionRow({
  submission,
  onToggleReviewed,
  updating,
}: {
  submission: Submission;
  onToggleReviewed: (submission: Submission) => void;
  updating: boolean;
}) {
  const createdAt = new Date(submission.createdAt);
  const submittedLabel = `${format(createdAt, "MMM d, yyyy HH:mm")}`;
  const relativeLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <tr className="align-top">
      <td className="px-4 py-4 text-sm text-muted-foreground">
        <div className="font-medium text-slate-900">{submittedLabel}</div>
        <div className="text-xs">{relativeLabel}</div>
      </td>
      <td className="px-4 py-4">
        <div className="font-medium text-slate-900">{submission.name}</div>
        <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Mail className="h-3.5 w-3.5" />
            {submission.email}
          </span>
          {submission.phone && (
            <span className="flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70">
                Tel
              </span>
              {submission.phone}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{labelForType(submission)}</Badge>
          {submission.service && (
            <span className="text-xs text-muted-foreground">
              {formatService(submission.service)}
            </span>
          )}
        </div>
        <p
          className="mt-2 max-w-xs truncate text-sm text-muted-foreground"
          title={submission.message}
        >
          {submission.message}
        </p>
      </td>
      <td className="px-4 py-4">
        <StatusBadge submission={submission} />
      </td>
      <td className="px-4 py-4 text-right">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onToggleReviewed(submission)}
          disabled={updating}
        >
          {updating && <Loader2 className="h-4 w-4 animate-spin" />}
          Mark as {submission.reviewed ? "new" : "reviewed"}
        </Button>
      </td>
    </tr>
  );
}

function StatusBadge({ submission }: { submission: Submission }) {
  if (submission.reviewed) {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
        Reviewed
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-amber-300 text-amber-600">
      Awaiting review
    </Badge>
  );
}

function TableLoadingState() {
  return (
    <tr>
      <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span>Loading submissions...</span>
        </div>
      </td>
    </tr>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-transparent bg-muted text-muted-foreground hover:border-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function LatestLeadCard({
  submission,
  loading,
}: {
  submission: Submission | null;
  loading: boolean;
}) {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Latest lead</CardTitle>
        <CardDescription>
          {submission
            ? "Most recent inbound inquiry."
            : "New leads appear here."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : submission ? (
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {submission.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {submission.email}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary">{labelForType(submission)}</Badge>
              {submission.service && (
                <Badge variant="outline">
                  {formatService(submission.service)}
                </Badge>
              )}
            </div>
            <Separator />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {submission.message}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(submission.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        ) : (
          <p className="py-8 text-sm text-muted-foreground">
            You are all caught up. Invite prospects to reach out via the contact
            page to see their messages here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function UsersCard({
  users,
  loading,
  fetching,
}: {
  users: AdminUser[];
  loading: boolean;
  fetching: boolean;
}) {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Admin team</CardTitle>
          <CardDescription>
            Accounts with access to this console.
          </CardDescription>
        </div>
        {fetching && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <p className="py-8 text-sm text-muted-foreground">
            No admins found. Share the signup link to onboard your team.
          </p>
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

function UserRow({ user }: { user: AdminUser }) {
  const lastLoginLabel = user.last_login
    ? formatDistanceToNow(new Date(user.last_login), { addSuffix: true })
    : "No activity recorded";

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {user.username}
          </p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <Badge
          variant={user.is_active === false ? "outline" : "secondary"}
          className={cn(
            user.is_active === false
              ? "border-amber-300 text-amber-600"
              : "bg-emerald-100 text-emerald-700",
          )}
        >
          {user.is_active === false ? "Inactive" : "Active"}
        </Badge>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Last login: {lastLoginLabel}
      </p>
    </div>
  );
}

function labelForType(submission: Submission) {
  switch (submission.normalizedType) {
    case "service":
      return "Service request";
    case "consultation":
      return "Consultation";
    case "general":
      return "General inquiry";
    default:
      return submission.type || "Other";
  }
}

function formatService(value: string) {
  switch (value) {
    case "hydropower":
      return "Hydropower";
    case "mv":
      return "Large Power & MV";
    case "sollatek":
      return "Sollatek Protection";
    default:
      return value;
  }
}
