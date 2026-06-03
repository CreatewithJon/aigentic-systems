import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080c12]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">
            Aigentic <span className="text-white/40">Systems</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/#services"
            className="text-xs text-white/50 hover:text-white/90 transition-colors tracking-wide uppercase"
          >
            Services
          </Link>
          <Link
            href="/#team"
            className="text-xs text-white/50 hover:text-white/90 transition-colors tracking-wide uppercase"
          >
            Team
          </Link>
          <Link
            href="/#contact"
            className="text-xs text-white/50 hover:text-white/90 transition-colors tracking-wide uppercase"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            className="text-xs px-4 py-2 rounded-lg border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 transition-colors"
          >
            Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
