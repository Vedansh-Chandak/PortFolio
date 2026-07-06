import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Moon, Sun, Cloud, LogOut, Shield, User } from "lucide-react";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useSettings } from "@/features/settings/hooks/useSettings";
import { useUpdateSettings } from "@/features/settings/hooks/useUpdateSettings";
import { useChangePassword } from "@/features/settings/hooks/useChangePassword";
import {
  settingsSchema,
  changePasswordSchema,
} from "@/features/settings/schema/settings.schema";

const APPEARANCE_KEY = "admin-appearance-dark-mode";

function LoadingBlock() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-12 animate-pulse rounded-lg bg-zinc-900"
        />
      ))}
    </div>
  );
}

export default function Settings() {
  const { data, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();
  const changePassword = useChangePassword();
  const [darkMode, setDarkMode] = useState(true);

  const settingsForm = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem(APPEARANCE_KEY);
    const nextValue = stored === null ? true : stored === "true";

    setDarkMode(nextValue);
    document.documentElement.classList.toggle("dark", nextValue);
  }, []);

  useEffect(() => {
    if (data) {
      settingsForm.reset({
        username: data.username ?? "",
        email: data.email ?? "",
      });
    }
  }, [data, settingsForm]);

  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.message || "Failed to load settings.");
    }
  }, [error]);

  const cloudinaryConnected = Boolean(data?.cloudinaryConnected);

  const isSaving = updateSettings.isPending;
  const isChangingPassword = changePassword.isPending;

  const handleSettingsSubmit = async (values) => {
    try {
      await updateSettings.mutateAsync(values);
      toast.success("Settings updated successfully.");
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Something went wrong."
      );
    }
  };

  const handlePasswordSubmit = async (values) => {
    try {
      await changePassword.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      toast.success("Password changed successfully.");
      passwordForm.reset();
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Something went wrong."
      );
    }
  };

  const toggleAppearance = () => {
    setDarkMode((previous) => {
      const next = !previous;
      localStorage.setItem(APPEARANCE_KEY, String(next));
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    window.location.href = "/login";
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-zinc-400">
          Manage your account, password, appearance, and connected services.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white">
                <User size={18} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Account</h2>
                <p className="text-sm text-zinc-400">Update your username and email.</p>
              </div>
            </div>

            <Separator className="my-6 bg-zinc-800" />

            {isLoading ? (
              <LoadingBlock />
            ) : (
              <form onSubmit={settingsForm.handleSubmit(handleSettingsSubmit)} className="space-y-5">
                <div>
                  <Label className="mb-2 block text-zinc-200">Username</Label>
                  <Input placeholder="admin" {...settingsForm.register("username")} />
                  {settingsForm.formState.errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {settingsForm.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 block text-zinc-200">Email</Label>
                  <Input placeholder="admin@portfolio.com" {...settingsForm.register("email")} />
                  {settingsForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {settingsForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Account"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white">
                <Shield size={18} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Security</h2>
                <p className="text-sm text-zinc-400">Change your password regularly.</p>
              </div>
            </div>

            <Separator className="my-6 bg-zinc-800" />

            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-5">
              <div>
                <Label className="mb-2 block text-zinc-200">Current Password</Label>
                <Input
                  type="password"
                  {...passwordForm.register("currentPassword")}
                />
                {passwordForm.formState.errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordForm.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block text-zinc-200">New Password</Label>
                <Input type="password" {...passwordForm.register("newPassword")} />
                {passwordForm.formState.errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block text-zinc-200">Confirm Password</Label>
                <Input
                  type="password"
                  {...passwordForm.register("confirmPassword")}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? "Updating..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white">
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Appearance</h2>
                <p className="text-sm text-zinc-400">Dark mode preference is stored locally.</p>
              </div>
            </div>

            <Separator className="my-6 bg-zinc-800" />

            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div>
                <p className="text-sm font-medium text-white">Dark Mode</p>
                <p className="text-xs text-zinc-500">Optional local UI preference.</p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={darkMode}
                  onChange={toggleAppearance}
                />
                <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full" />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white">
                <Cloud size={18} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Cloudinary</h2>
                <p className="text-sm text-zinc-400">Media upload service status.</p>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div>
                <p className="text-sm font-medium text-white">Connection</p>
                <p className="text-xs text-zinc-500">Backend environment check</p>
              </div>

              <span
                className={
                  cloudinaryConnected
                    ? "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300"
                    : "rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-300"
                }
              >
                {cloudinaryConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/80 backdrop-blur-xl xl:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-red-400">
                <LogOut size={18} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Logout</h2>
                <p className="text-sm text-zinc-400">End the current admin session.</p>
              </div>
            </div>

            <Separator className="my-6 bg-zinc-800" />

            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}