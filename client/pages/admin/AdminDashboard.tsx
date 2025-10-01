import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getSubmissions,
  updateSubmissionStatus,
  isAuthed,
  logout,
  Submission,
  InquiryType,
} from "@/lib/submissions";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type FilterValue = "all" | InquiryType;

const FILTERS: Array<{ value: FilterValue; label: string }> = [
  { value: "all", label: "All" },
  { value: "service", label: "Request Service" },
  { value: "consultation", label: "Book Consultation" },
  { value: "general", label: "General Inquiry" },
];

function TypeBadge({ submission }: { submission: Submission }) {
  const map: Record<InquiryType, { className: string; label: string }> = {
    service: {
      className: "bg-blue-100 text-blue-700",
      label: "Request Service",
    },
    consultation: {
      className: "bg-green-100 text-green-700",
      label: "Book Consultation",
    },
    general: {
      className: "bg-gray-100 text-gray-700",
      label: "General Inquiry",
    },
  };

  const config = map[submission.normalizedType as InquiryType];

  if (!config) {
    return (
      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
        {submission.type || "Other"}
      </span>
    );
  }

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSubmissions();
      setItems(data);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to fetch submissions from the server.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthed()) {
      navigate("/admin-rank", { replace: true });
      return;
    }
    loadSubmissions();
  }, [navigate, loadSubmissions]);

  const totals = useMemo(() => {
    const base = {
      total: items.length,
      service: 0,
      consultation: 0,
      general: 0,
      reviewed: 0,
      new: 0,
    };

    for (const item of items) {
      if (item.normalizedType === "service") base.service += 1;
      else if (item.normalizedType === "consultation") base.consultation += 1;
      else if (item.normalizedType === "general") base.general += 1;

      if (item.reviewed) base.reviewed += 1;
      else base.new += 1;
    }

    return base;
  }, [items]);

  const visible = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((s) => s.normalizedType === filter);
  }, [items, filter]);

  const toggleReviewed = async (submission: Submission, next: boolean) => {
    try {
      const status = next ? "reviewed" : "new";
      const updated = await updateSubmissionStatus(submission.id, status);
      setItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
      toast.success(`Marked as ${next ? "reviewed" : "new"}`);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Unable to update status.",
      );
    }
  };

  return (
    <section className="section">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Admin Dashboard</h1>
          <p className="section-subtitle">Tracking quotes and consultations</p>
        </div>
        <button
          className="btn-secondary"
          onClick={async () => {
            await logout();
            navigate("/admin-rank", { replace: true });
          }}
        >
          Log out
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <StatCard title="Total" value={totals.total} />
        <StatCard title="Request Service" value={totals.service} />
        <StatCard title="Book Consultation" value={totals.consultation} />
        <StatCard title="General" value={totals.general} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="text-sm" htmlFor="filter-select">
          Filter:
        </label>
        <select
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterValue)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          {FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <button
          className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
          onClick={loadSubmissions}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <Th>When</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Type</Th>
              <Th>Service</Th>
              <Th>Message</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="p-6 text-center text-foreground/60">
                  Loading submissions...
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-6 text-center text-foreground/60">
                  No submissions yet. Share your{" "}
                  <Link to="/contact" className="text-primary underline">
                    Contact page
                  </Link>{" "}
                  to start collecting.
                </td>
              </tr>
            ) : (
              visible.map((s) => (
                <tr key={s.id} className="border-t">
                  <Td>{new Date(s.createdAt).toLocaleString()}</Td>
                  <Td>{s.name}</Td>
                  <Td>{s.email}</Td>
                  <Td>{s.phone || "—"}</Td>
                  <Td>
                    <TypeBadge submission={s} />
                  </Td>
                  <Td>{s.service ? prettyService(s.service) : "—"}</Td>
                  <Td className="max-w-[24rem] truncate" title={s.message}>
                    {s.message}
                  </Td>
                  <Td>
                    {s.reviewed ? (
                      <Badge>Reviewed</Badge>
                    ) : (
                      <Badge variant="outline">{s.status}</Badge>
                    )}
                  </Td>
                  <Td>
                    <button
                      className="rounded-md border px-3 py-1 text-xs hover:bg-accent disabled:opacity-50"
                      onClick={() => toggleReviewed(s, !s.reviewed)}
                      disabled={loading}
                    >
                      Mark {s.reviewed ? "as New" : "Reviewed"}
                    </button>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 font-semibold text-foreground/80">{children}</th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-foreground/60">
        {title}
      </div>
      <div className="mt-1 font-display text-2xl font-extrabold text-primary">
        {value}
      </div>
    </div>
  );
}

function prettyService(s: string) {
  switch (s) {
    case "hydropower":
      return "Hydropower";
    case "mv":
      return "Large Power & MV";
    case "sollatek":
      return "Sollatek Protection";
    default:
      return s;
  }
}
