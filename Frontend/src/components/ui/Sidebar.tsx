"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const navItems = [
    { name: "🏠 Home", path: "/" },
    { name: "📂 Upload Resume", path: "/upload" },
    { name: "📊 Analysis", path: "/analysis" },
    { name: "⚙️ Settings", path: "/settings" },
  ];

  return (
    <nav className="w-64  bg-gray-900 p-5 fixed top-0 left-0 h-full">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className={`block p-3 rounded-lg text-white text-lg font-medium transition-all duration-300 cursor-pointer
              ${
                active === item.path
                  ? "bg-gradient-to-r from-blue-500 via-purple-600 via-purple-700 to-purple-900"
                  : "hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-600 hover:to-purple-900"
              }`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
