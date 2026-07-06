import Layout from "@/components/layout/Layout";
import StatsCard from "@/components/dashboard/StatsCard";

import {
  FolderKanban,
  Briefcase,
  Cpu,
  Mail,
} from "lucide-react";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <Layout>
        <h1 className="text-white text-2xl">Loading...</h1>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1 className="text-red-500 text-2xl">
          Failed to load dashboard
        </h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Welcome back 👋
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Projects"
          value={data.projects}
          icon={FolderKanban}
        />

        <StatsCard
          title="Experiences"
          value={data.experiences}
          icon={Briefcase}
        />

        <StatsCard
          title="Tech Categories"
          value={data.techCategories}
          icon={Cpu}
        />

        <StatsCard
          title="Unread Messages"
          value={data.unreadMessages}
          icon={Mail}
        />
      </div>
    </Layout>
  );
}