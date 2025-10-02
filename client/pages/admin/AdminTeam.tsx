import UsersCard from "./components/UsersCard";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "@/lib/submissions";

export default function AdminTeam() {
  const usersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: getAdminUsers,
  });

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Admin team
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Manage accounts with console access.
        </p>
      </div>
      <UsersCard
        users={usersQuery.data ?? []}
        loading={usersQuery.isLoading}
        fetching={usersQuery.isFetching}
      />
    </section>
  );
}
