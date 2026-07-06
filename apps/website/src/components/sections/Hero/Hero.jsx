import { useProfile } from "@/features/profile/hooks/useProfile";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroActions from "./HeroActions";
import HeroSkeleton from "./HeroSkeleton";

export default function Hero() {
  const { data, isLoading, error } = useProfile();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Failed to load profile.
        </p>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen"
    >
      <HeroBackground />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="max-w-4xl">
          <HeroContent profile={data} />
          <HeroActions profile={data} />
        </div>
      </div>
    </section>
  );
}