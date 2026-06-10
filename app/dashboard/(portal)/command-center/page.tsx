import Link from "next/link"

type CommandLink = {
  title: string
  description: string
  href: string
  external?: boolean
  icon: string
  accent?: string
}

type CommandGroup = {
  category: string
  links: CommandLink[]
}

const COMMAND_GROUPS: CommandGroup[] = [
  {
    category: "Company",
    links: [
      { title: "Lead Engine CRM", description: "Manage all leads and the sales pipeline", href: "/dashboard/jonathan", icon: "◎", accent: "#3b82f6" },
      { title: "Executive Dashboard", description: "Company health, metrics, and team overview", href: "/dashboard/executive", icon: "◆", accent: "#f59e0b" },
      { title: "Company Settings", description: "Dashboard config and access management", href: "/dashboard/settings", icon: "⚙", accent: "#ffffff" },
    ],
  },
  {
    category: "Development",
    links: [
      { title: "GitHub", description: "Repos and source control — CreatewithJon", href: "https://github.com/CreatewithJon", external: true, icon: "⌥", accent: "#ffffff" },
      { title: "Vercel", description: "Deployments, domains, and build logs", href: "https://vercel.com", external: true, icon: "▲", accent: "#ffffff" },
      { title: "Supabase", description: "Database, auth, and API keys", href: "https://supabase.com", external: true, icon: "⬡", accent: "#10b981" },
    ],
  },
  {
    category: "Communication",
    links: [
      { title: "Gmail", description: "Company and client email", href: "https://mail.google.com", external: true, icon: "✉", accent: "#ef4444" },
      { title: "Google Calendar", description: "Schedule, meetings, and availability", href: "https://calendar.google.com", external: true, icon: "▦", accent: "#4285f4" },
    ],
  },
  {
    category: "Client Projects",
    links: [
      { title: "Big Money Realty", description: "Multi-tenant broker CRM dashboard", href: "https://bigmoneyrealty.com", external: true, icon: "🏠", accent: "#f59e0b" },
      { title: "Crypto Mondays Admin", description: "Event management and admin panel", href: "https://cryptomondays.vegas/crypto-mondays-admin", external: true, icon: "₿", accent: "#f97316" },
      { title: "Aigentic Systems", description: "Company website and OS", href: "/dashboard", icon: "A", accent: "#8b5cf6" },
    ],
  },
  {
    category: "Knowledge",
    links: [
      { title: "Internal Knowledge Base", description: "SOPs, playbooks, prompts, and case studies", href: "/dashboard/knowledge", icon: "⬡", accent: "#8b5cf6" },
      { title: "Content Center", description: "LinkedIn, YouTube, blog posts, and assets", href: "/dashboard/content", icon: "◈", accent: "#3b82f6" },
    ],
  },
]

export default function CommandCenterPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-1.5">Operations</div>
        <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>
        <p className="text-sm text-white/45 mt-1">Quick access to all tools, dashboards, and external services.</p>
      </div>

      {/* Groups */}
      <div className="space-y-10">
        {COMMAND_GROUPS.map((group) => (
          <section key={group.category}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">
              {group.category}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.links.map((link) => {
                const content = (
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all group">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        backgroundColor: `${link.accent ?? "#ffffff"}10`,
                        color: link.accent ?? "rgba(255,255,255,0.4)",
                        border: `1px solid ${link.accent ?? "rgba(255,255,255,0.1)"}25`,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors mb-0.5">
                        {link.title}
                      </div>
                      <div className="text-xs text-white/35 leading-relaxed">{link.description}</div>
                    </div>
                    <div className="text-white/20 group-hover:text-white/45 transition-colors text-xs flex-shrink-0 mt-0.5">
                      {link.external ? "↗" : "→"}
                    </div>
                  </div>
                )

                return link.external ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href}>
                    {content}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
