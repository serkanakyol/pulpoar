// app/components/Layout.jsx

import { Link, useLocation } from "@remix-run/react";

export default function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/billing", label: "Abonelik" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">PulpoAR Try-On</h2>
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`p-2 rounded hover:bg-blue-100 ${
                location.pathname === to ? "bg-blue-200 font-bold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
