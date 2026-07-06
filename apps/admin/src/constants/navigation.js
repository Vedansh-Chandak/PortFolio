import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  Cpu,
  Mail,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Experience",
    icon: Briefcase,
    href: "/experience",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    title: "Tech Stack",
    icon: Cpu,
    href: "/tech-stack",
  },
  {
    title: "Messages",
    icon: Mail,
    href: "/messages",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];