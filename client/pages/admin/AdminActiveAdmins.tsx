import UsersCard from "./components/UsersCard";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "@/lib/submissions";

export default function AdminActiveAdmins() {
  const usersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: getAdminUsers,
  });
  const users = (usersQuery.data ?? []).filter((u) => u.is_active ?? true);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Active admins
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Only currently active accounts are shown.
        </p>
      </div>
      <UsersCard
        users={users}
        loading={usersQuery.isLoading}
        fetching={usersQuery.isFetching}
      />
    </section>
  );
}
