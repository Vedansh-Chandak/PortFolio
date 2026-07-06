import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Dashboard
        </h1>
        <p className="text-sm text-zinc-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell size={18} />
        </Button>

        <Button variant="ghost" size="icon">
          <User size={18} />
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}