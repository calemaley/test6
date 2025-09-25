import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSubmissions, setReviewed, summary, isAuthed, logout, Submission } from "@/lib/submissions";
import { Badge } from "@/components/ui/badge";

function TypeBadge({ t }: { t: Submission["type"] }) {
  const map: Record<Submission["type"], string> = {
    service: "bg-blue-100 text-blue-700",
    consultation: "bg-green-100 text-green-700",
    general: "bg-gray-100 text-gray-700",
  };
  const label: Record<Submission["type"], string> = {
    service: "Request Service",
    consultation: "Book Consultation",
    general: "General Inquiry",
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${map[t]}`}>{label[t]}</span>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Submission["type"] | "all">("all");
  const [items, setItems] = useState<Submission[]>([]);

  useEffect(() => {
    if (!isAuthed()) {
      navigate("/admin-rank", { replace: true });
      return;
    }
    setItems(getSubmissions());
  }, [navigate]);

  const { totals } = useMemo(() => summary(), [items.length]);
  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((s) => s.type === filter)),
    [items, filter],
  );

  const toggleReviewed = (id: string, next: boolean) => {
    setReviewed(id, next);
    setItems(getSubmissions());
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
          onClick={() => {
            logout();
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

      <div className="mt-8 flex items-center gap-3">
        <label className="text-sm">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="service">Request Service</option>
          <option value="consultation">Book Consultation</option>
          <option value="general">General Inquiry</option>
        </select>
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
            {visible.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-6 text-center text-foreground/60">
                  No submissions yet. Share your <Link to="/contact" className="text-primary underline">Contact page</Link> to start collecting.
                </td>
              </tr>
            ) : (
              visible.map((s) => (
                <tr key={s.id} className="border-t">
                  <Td>{new Date(s.createdAt).toLocaleString()}</Td>
                  <Td>{s.name}</Td>
                  <Td>{s.email}</Td>
                  <Td>{s.phone || "—"}</Td>
                  <Td><TypeBadge t={s.type} /></Td>
                  <Td>{s.service ? prettyService(s.service) : "—"}</Td>
                  <Td className="max-w-[24rem] truncate" title={s.message}>{s.message}</Td>
                  <Td>{s.reviewed ? <Badge>Reviewed</Badge> : <Badge variant="outline">New</Badge>}</Td>
                  <Td>
                    <button
                      className="rounded-md border px-3 py-1 text-xs hover:bg-accent"
                      onClick={() => toggleReviewed(s.id, !s.reviewed)}
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
  return <th className="px-3 py-2 font-semibold text-foreground/80">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-foreground/60">{title}</div>
      <div className="mt-1 font-display text-2xl font-extrabold text-primary">{value}</div>
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
