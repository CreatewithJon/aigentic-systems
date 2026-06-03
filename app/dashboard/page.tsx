"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { founders } from "@/lib/data/founders";

const DASHBOARD_PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD ?? "aigentic2024";

export default function DashboardLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [selectedFounder, setSelectedFounder] = useState(founders[0].slug);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      sessionStorage.setItem("dashboard_auth", "true");
      sessionStorage.setItem("dashboard_founder", selectedFounder);
      router.push(`/dashboard/${selectedFounder}`);
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="min-h-screen bg-[#080c12] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <span className="text-white font-semibold tracking-tight">Aigentic <span className="text-white/40">Portal</span></span>
        </div>

        <div className="p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
          <h1 className="text-xl font-bold mb-1">Co-Founder Portal</h1>
          <p className="text-xs text-white/40 mb-8">Select your profile and enter the access password.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-2">
                Sign in as
              </label>
              <div className="space-y-2">
                {founders.map((f) => (
                  <button
                    key={f.slug}
                    type="button"
                    onClick={() => setSelectedFounder(f.slug)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selectedFounder === f.slug
                        ? "border-violet-500/50 bg-violet-500/8"
                        : "border-white/6 bg-white/[0.02] hover:border-white/12"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: `${f.accentHex}20`, color: f.accentHex }}
                    >
                      {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{f.name}</div>
                      <div className="text-[10px] text-white/35">{f.title.split("&")[1]?.trim() ?? f.title}</div>
                    </div>
                    {selectedFounder === f.slug && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-violet-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50"
                required
              />
              {error && <p className="text-xs text-rose-400 mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Enter Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
