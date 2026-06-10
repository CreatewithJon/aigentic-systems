"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SidebarNav from "@/components/dashboard/SidebarNav"

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("dashboard_auth") !== "true") {
      router.push("/dashboard")
    } else {
      setReady(true)
    }
  }, [router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#080c12] flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-[#080c12] text-white">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
