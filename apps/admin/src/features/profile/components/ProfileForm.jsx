import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { profileSchema } from "../schema/profile.schema";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function ProfileForm() {
  const { data, isLoading } = useProfile();

  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      title: "",
      tagline: "",
      bio: "",
      email: "",
      github: "",
      linkedin: "",
      twitter: "",
      avatar_url: "",
      avatar_public_id: "",
      resume_url: "",
      resume_public_id: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        title: data.title ?? "",
        tagline: data.tagline ?? "",
        bio: data.bio ?? "",
        email: data.email ?? "",
        github: data.github ?? "",
        linkedin: data.linkedin ?? "",
        twitter: data.twitter ?? "",
        avatar_url: data.avatar_url ?? "",
        avatar_public_id: data.avatar_public_id ?? "",
        resume_url: data.resume_url ?? "",
        resume_public_id: data.resume_public_id ?? "",
      });
    }
  }, [data, reset]);

  const onSubmit = (values) => {
    updateProfile.mutate(values);
  };

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <Input
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Tagline"
              {...register("tagline")}
            />
            {errors.tagline && (
              <p className="mt-1 text-sm text-red-500">
                {errors.tagline.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Bio"
              rows={5}
              {...register("bio")}
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bio.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              {...register("email")}
            />
          </div>

          <div>
            <Input
              placeholder="GitHub URL"
              {...register("github")}
            />
          </div>

          <div>
            <Input
              placeholder="LinkedIn URL"
              {...register("linkedin")}
            />
          </div>

          <div>
            <Input
              placeholder="Twitter URL"
              {...register("twitter")}
            />
          </div>

          <div>
            <Input
              placeholder="Avatar URL"
              {...register("avatar_url")}
            />
            {errors.avatar_url && (
              <p className="mt-1 text-sm text-red-500">
                {errors.avatar_url.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Avatar Public ID"
              {...register("avatar_public_id")}
            />
          </div>

          <div>
            <Input
              placeholder="Resume URL"
              {...register("resume_url")}
            />
            {errors.resume_url && (
              <p className="mt-1 text-sm text-red-500">
                {errors.resume_url.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Resume Public ID"
              {...register("resume_public_id")}
            />
          </div>

          <Button
            type="submit"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}