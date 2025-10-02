import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Submission } from "@/lib/submissions";
import { formatDistanceToNow } from "date-fns";

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

export default function LatestLeadCard({ submission, loading }: { submission: Submission | null; loading: boolean }) {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Latest lead</CardTitle>
        <CardDescription>
          {submission ? "Most recent inbound inquiry." : "New leads appear here."}
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
              <p className="text-lg font-semibold text-slate-900">{submission.name}</p>
              <p className="text-sm text-muted-foreground">{submission.email}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary">{labelForType(submission)}</Badge>
              {submission.service && <Badge variant="outline">{formatService(submission.service)}</Badge>}
            </div>
            <Separator />
            <p className="text-sm leading-relaxed text-muted-foreground">{submission.message}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
            </p>
          </div>
        ) : (
          <p className="py-8 text-sm text-muted-foreground">
            You are all caught up. Invite prospects to reach out via the contact page to see their messages here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
