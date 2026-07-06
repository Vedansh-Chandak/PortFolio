import { NavLink } from "react-router-dom";

export default function NavItem({
  icon: Icon,
  title,
  href,
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
        }`
      }
    >
      <Icon size={18} />
      <span>{title}</span>
    </NavLink>
  );
}