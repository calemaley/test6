import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

function StatusBadge({ submission }: { submission: Submission }) {
  if (submission.reviewed) {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Reviewed</Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-amber-300 text-amber-600">Awaiting review</Badge>
  );
}

export default function AdminSubmissions() {
  const [params] = useSearchParams();
  const statusParam = params.get("status");
  const dateParam = params.get("date");

  const queryClient = useQueryClient();
  const submissionsQuery = useQuery({ queryKey: ["admin", "submissions"], queryFn: getSubmissions });
  const submissions = submissionsQuery.data ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    return (submissions ?? []).filter((s) => {
      if (statusParam === "reviewed" && !s.reviewed) return false;
      if (statusParam === "new" && s.reviewed) return false;
      if (dateParam === "today") {
        if (!isToday(new Date(s.createdAt))) return false;
      }
      if (!normalizedQuery) return true;
      const hay = `${s.name} ${s.email} ${s.message} ${s.service ?? ""}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [submissions, statusParam, dateParam, searchTerm]);

  const handleToggleReviewed = async (submission: Submission) => {
    if (updatingId) return;
    const nextStatus = submission.reviewed ? "new" : "reviewed";
    setUpdatingId(submission.id);
    try {
      const updated = await updateSubmissionStatus(submission.id, nextStatus);
      queryClient.setQueryData<Submission[] | undefined>(["admin", "submissions"], (current) => {
        if (!current) return [updated];
        return current.map((item) => (item.id === updated.id ? updated : item));
      });
      toast.success(nextStatus === "reviewed" ? "Submission marked as reviewed" : "Submission marked as new");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to update submission status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (submission: Submission) => {
    if (updatingId) return;
    setUpdatingId(submission.id);
    try {
      await deleteSubmission(submission.id);
      queryClient.setQueryData<Submission[] | undefined>(["admin", "submissions"], (current) =>
        current ? current.filter((s) => s.id !== submission.id) : [],
      );
      toast.success("Submission deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to delete submission.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Recent submissions</h1>
          <p className="text-sm text-muted-foreground md:text-base">Search, filter, review and manage inbound inquiries.</p>
        </div>
        <Button type="button" variant="outline" onClick={() => submissionsQuery.refetch()} disabled={submissionsQuery.isFetching}>
          {submissionsQuery.isFetching && <Loader2 className="h-4 w-4 animate-spin" />} Sync now
        </Button>
      </header>

      <Card className="border-none bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>All submissions</CardTitle>
              <CardDescription>Showing {filtered.length} of {submissions.length} total submissions.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, email, or message" className="pl-9" />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border">
            <div className="max-h-[620px] overflow-auto">
              <table className="min-w-full divide-y divide-border text-sm">
                <thead className="bg-muted/60 text-left uppercase text-xs text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Inquiry</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {submissionsQuery.isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <span>Loading submissions...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">No submissions match the current filters.</td>
                    </tr>
                  ) : (
                    filtered.map((submission) => {
                      const createdAt = new Date(submission.createdAt);
                      const submittedLabel = `${format(createdAt, "MMM d, yyyy HH:mm")}`;
                      const relativeLabel = formatDistanceToNow(createdAt, { addSuffix: true });
                      return (
                        <tr key={submission.id} className="align-top">
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
                                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70">Tel</span>
                                  {submission.phone}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{labelForType(submission)}</Badge>
                              {submission.service && (
                                <span className="text-xs text-muted-foreground">{formatService(submission.service)}</span>
                              )}
                            </div>
                            <p className="mt-2 max-w-xs truncate text-sm text-muted-foreground" title={submission.message}>
                              {submission.message}
                            </p>
                          </td>
                          <td className="px-4 py-4"><StatusBadge submission={submission} /></td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button type="button" variant="outline" size="sm" onClick={() => handleToggleReviewed(submission)} disabled={updatingId === submission.id}>
                                {updatingId === submission.id && <Loader2 className="h-4 w-4 animate-spin" />}
                                Mark as {submission.reviewed ? "new" : "reviewed"}
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm" disabled={updatingId === submission.id}>
                                    <Trash2 className="h-4 w-4" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone. This will permanently remove the selected submission.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(submission)}>Delete</AlertDialogAction>
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
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
