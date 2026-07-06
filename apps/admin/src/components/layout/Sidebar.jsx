import { LogOut } from "lucide-react";

import { navigation } from "@/constants/navigation";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col">
      {/* Logo */}
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-xl font-bold text-white">
          Portfolio CMS
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <NavItem
            key={item.href}
            {...item}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-zinc-800 p-4">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}