import { Activity, Dumbbell, House, MapPinned } from "lucide-react";
import { NavLink, Outlet } from "react-router";

const navigation = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/participate", label: "KiaStops", icon: MapPinned },
  { to: "/ippt", label: "IPPT", icon: Activity },
  { to: "/coach", label: "Coach", icon: Dumbbell }
] as const;

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="KiaFIT home">
          <span className="brand-mark">K</span>
          <span>KiaFIT</span>
        </NavLink>
        <span className="mvp-badge">MVP</span>
      </header>

      <main className="page-container">
        <Outlet />
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navigation.map(({ to, label, icon: Icon, ...linkProps }) => (
          <NavLink
            key={to}
            to={to}
            {...linkProps}
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <Icon aria-hidden="true" size={21} strokeWidth={2.2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
