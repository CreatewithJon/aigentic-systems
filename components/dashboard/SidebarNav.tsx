"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const NAV_ITEMS = [
  {
    group: "Dashboards",
    items: [
      { href: "/dashboard/executive", label: "Executive", icon: "◆", accent: "#f59e0b" },
      { href: "/dashboard/jonathan", label: "Jonathan — CAO", icon: "◉", accent: "#3b82f6" },
      { href: "/dashboard/kenneth", label: "Kenneth — CBO", icon: "◉", accent: "#10b981" },
      { href: "/dashboard/alberto", label: "Alberto — CEO", icon: "◉", accent: "#8b5cf6" },
    ],
  },
  {
    group: "Operations",
    items: [
      { href: "/dashboard/clients", label: "Clients", icon: "⬡", accent: "#ffffff" },
      { href: "/dashboard/knowledge", label: "Knowledge Base", icon: "⬡", accent: "#ffffff" },
      { href: "/dashboard/content", label: "Content Center", icon: "⬡", accent: "#ffffff" },
      { href: "/dashboard/command-center", label: "Command Center", icon: "⬡", accent: "#ffffff" },
    ],
  },
  {
    group: "System",
    items: [
      { href: "/dashboard/settings", label: "Settings", icon: "⬡", accent: "#ffffff" },
    ],
  },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()

  function handleSignOut() {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("dashboard_auth")
      sessionStorage.removeItem("dashboard_founder")
    }
    router.push("/dashboard")
  }

  const founderName =
    typeof window !== "undefined"
      ? sessionStorage.getItem("dashboard_founder") ?? ""
      : ""

  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col border-r h-screen sticky top-0"
      style={{ backgroundColor: "#0a0f1a", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href="/dashboard/executive" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight leading-none">Aigentic</div>
            <div className="text-[10px] text-white/35 tracking-wide mt-0.5">OS</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/20 px-2 mb-2">
              {group.group}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: `${item.accent}15`,
                            color: item.accent,
                          }
                        : {}
                    }
                  >
                    <span
                      className="text-[10px] flex-shrink-0"
                      style={isActive ? { color: item.accent } : { color: "rgba(255,255,255,0.2)" }}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {founderName && (
          <div className="text-[10px] text-white/30 mb-2 capitalize">
            Signed in as {founderName.replace(/-/g, " ").split(" ").slice(0, 1).join(" ")}
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="text-[10px] text-white/20 hover:text-white/50 transition-colors"
        >
          Sign out →
        </button>
      </div>
    </aside>
  )
}
