import Layout from "@/components/layout/Layout";
import ProfileForm from "@/features/profile/components/ProfileForm";

export default function Profile() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Profile
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your portfolio profile.
        </p>
      </div>

      <ProfileForm />
    </Layout>
  );
}