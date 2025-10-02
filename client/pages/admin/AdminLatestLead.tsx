import { useMemo } from "react";
import LatestLeadCard from "./components/LatestLeadCard";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "@/lib/submissions";

export default function AdminLatestLead() {
  const submissionsQuery = useQuery({ queryKey: ["admin", "submissions"], queryFn: getSubmissions });
  const latest = useMemo(() => (submissionsQuery.data ?? [])[0] ?? null, [submissionsQuery.data]);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Latest lead</h1>
        <p className="text-sm text-muted-foreground md:text-base">Most recent inbound inquiry details.</p>
      </div>
      <LatestLeadCard submission={latest} loading={submissionsQuery.isLoading} />
    </section>
  );
}
