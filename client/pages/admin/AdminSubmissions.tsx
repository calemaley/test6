import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { toast } from "sonner";
import {
  Submission,
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "@/lib/submissions";
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
import { Separator } from "@/components/ui/separator";
import { Loader2, Mail, Search, Trash2 } from "lucide-react";
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
import { cn } from "@/lib/utils";

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

function SubmissionStatusBadge({ submission }: { submission: Submission }) {
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

export default function AdminSubmissions() {
  const [params] = useSearchParams();
  const statusParam = params.get("status");
  const dateParam = params.get("date");

  const queryClient = useQueryClient();
  const submissionsQuery = useQuery({
    queryKey: ["admin", "submissions"],
    queryFn: getSubmissions,
  });
  const submissions = submissionsQuery.data ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    return (submissions ?? []).filter((submission) => {
      if (statusParam === "reviewed" && !submission.reviewed) return false;
      if (statusParam === "new" && submission.reviewed) return false;
      if (dateParam === "today") {
        if (!isToday(new Date(submission.createdAt))) return false;
      }
      if (!normalizedQuery) return true;
      const haystack = `${submission.name} ${submission.email} ${
        submission.message
      } ${submission.service ?? ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [submissions, statusParam, dateParam, searchTerm]);

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
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update submission status.",
      );
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
        (current) =>
          current ? current.filter((item) => item.id !== submission.id) : [],
      );
      toast.success("Submission deleted");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete submission.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Recent submissions
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Search, filter, review and manage inbound inquiries.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => submissionsQuery.refetch()}
          disabled={submissionsQuery.isFetching}
        >
          {submissionsQuery.isFetching && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <span className="ml-2">Sync now</span>
        </Button>
      </header>

      <Card className="border-none bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>All submissions</CardTitle>
              <CardDescription>
                Showing {filtered.length} of {submissions.length} total
                submissions.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, email, or message"
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsZoomed((prev) => !prev)}
              >
                {isZoomed ? "Standard text" : "Zoom text"}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <div className="hidden max-h-[620px] overflow-auto md:block">
              <table className="min-w-full divide-y divide-border text-sm">
                <thead className="bg-muted/60 text-left text-xs uppercase text-muted-foreground">
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
                  {submissionsQuery.isLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-16 text-center text-muted-foreground"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <span>Loading submissions...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-muted-foreground"
                      >
                        No submissions match the current filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((submission) => {
                      const createdAt = new Date(submission.createdAt);
                      const submittedLabel = format(
                        createdAt,
                        "MMM d, yyyy HH:mm",
                      );
                      const relativeLabel = formatDistanceToNow(createdAt, {
                        addSuffix: true,
                      });

                      return (
                        <tr key={submission.id} className="align-top">
                          <td className="px-4 py-4 text-sm text-muted-foreground">
                            <div className="font-medium text-slate-900">
                              {submittedLabel}
                            </div>
                            <div className="text-xs">{relativeLabel}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-medium text-slate-900">
                              {submission.name}
                            </div>
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
                              <Badge variant="secondary">
                                {labelForType(submission)}
                              </Badge>
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
                            <SubmissionStatusBadge submission={submission} />
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleReviewed(submission)}
                                disabled={updatingId === submission.id}
                              >
                                {updatingId === submission.id && (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                <span className="ml-2">
                                  Mark as{" "}
                                  {submission.reviewed ? "new" : "reviewed"}
                                </span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={updatingId === submission.id}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="ml-2">Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete this submission?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently remove the selected
                                      submission.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(submission)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <SubmissionListMobile
              submissions={filtered}
              loading={submissionsQuery.isLoading}
              updatingId={updatingId}
              onToggleReviewed={handleToggleReviewed}
              onDelete={handleDelete}
              isZoomed={isZoomed}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

type SubmissionListMobileProps = {
  submissions: Submission[];
  loading: boolean;
  updatingId: number | null;
  onToggleReviewed: (submission: Submission) => void;
  onDelete: (submission: Submission) => void;
  isZoomed: boolean;
};

function SubmissionListMobile({
  submissions,
  loading,
  updatingId,
  onToggleReviewed,
  onDelete,
  isZoomed,
}: SubmissionListMobileProps) {
  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center bg-white p-6 text-muted-foreground md:hidden">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Loading submissions...</span>
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-white p-6 text-center text-sm text-muted-foreground md:hidden">
        No submissions match the current filters.
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <div className="divide-y divide-border bg-white">
        {submissions.map((submission) => {
          const createdAt = new Date(submission.createdAt);
          const submittedLabel = format(createdAt, "MMM d, yyyy HH:mm");
          const relativeLabel = formatDistanceToNow(createdAt, {
            addSuffix: true,
          });

          return (
            <article
              key={submission.id}
              className={cn(
                "flex flex-col gap-3",
                isZoomed
                  ? "p-5 text-sm leading-6"
                  : "p-4 text-[13px] leading-5",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    {submission.name}
                  </p>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                    <span className="break-all">{submission.email}</span>
                  </div>
                  {submission.phone && (
                    <p className="text-muted-foreground/80">
                      {submission.phone}
                    </p>
                  )}
                </div>
                <SubmissionStatusBadge submission={submission} />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{labelForType(submission)}</Badge>
                {submission.service && (
                  <span className="text-muted-foreground">
                    {formatService(submission.service)}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "rounded-md bg-muted/40 px-3 py-2 text-muted-foreground",
                  isZoomed ? "max-h-none" : "max-h-32 overflow-y-auto",
                )}
              >
                <p className="whitespace-pre-line">{submission.message}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <span className="text-[0.75em] uppercase tracking-wide text-muted-foreground/70">
                  Submitted
                </span>
                <span className="font-medium text-slate-900">
                  {submittedLabel}
                </span>
                <span className="text-muted-foreground/70">
                  {relativeLabel}
                </span>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onToggleReviewed(submission)}
                  disabled={updatingId === submission.id}
                >
                  {updatingId === submission.id && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Mark as {submission.reviewed ? "new" : "reviewed"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      disabled={updatingId === submission.id}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete this submission?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove the selected submission.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(submission)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
