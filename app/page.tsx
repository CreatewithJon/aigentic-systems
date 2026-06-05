import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { founders } from "@/lib/data/founders";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080c12] text-white">
      <Nav />

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              AI-Native Business Modernization
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-6">
            Build your business
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              on intelligence.
            </span>
          </h1>

          <p className="text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            Aigentic Systems helps forward-thinking businesses replace legacy
            operations with AI-native workflows — from lead generation to
            customer engagement to back-office automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Get a Free AI Audit
            </Link>
            <Link
              href="#services"
              className="px-8 py-3.5 rounded-xl border border-white/10 text-white/70 font-semibold text-sm hover:border-white/20 hover:text-white transition-all"
            >
              See What We Build
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM / VALUE PROP */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              label: "The Problem",
              text: "Most businesses are running on systems built for 2010. Manual follow-up, scattered data, missed leads — while AI-native competitors move faster.",
              color: "text-rose-400",
            },
            {
              label: "Our Approach",
              text: "We don't bolt AI onto broken processes. We redesign your workflows from the ground up — so intelligence is built in, not added on.",
              color: "text-violet-400",
            },
            {
              label: "The Outcome",
              text: "Businesses that capture more leads, qualify them automatically, engage faster, and convert more — with less manual effort.",
              color: "text-emerald-400",
            },
          ].map((item) => (
            <div key={item.label} className="p-6 rounded-2xl border border-white/6 bg-white/[0.02]">
              <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 ${item.color}`}>
                {item.label}
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3">
              What We Build
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              AI systems that produce results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "AI Lead Generation",
                desc: "Intelligent funnels, chatbots, and capture systems that turn traffic into qualified pipeline — 24/7.",
                tags: ["Chatbots", "Landing Pages", "Lead Scoring"],
                border: "border-violet-500/20",
                glow: "bg-violet-500/[0.04]",
                tagColor: "bg-violet-500/10 text-violet-300",
              },
              {
                title: "Automated Outreach",
                desc: "Multi-channel follow-up sequences that engage leads at the right moment with the right message — without a human lifting a finger.",
                tags: ["Email Sequences", "SMS Automation", "CRM Integration"],
                border: "border-blue-500/20",
                glow: "bg-blue-500/[0.04]",
                tagColor: "bg-blue-500/10 text-blue-300",
              },
              {
                title: "Workflow Modernization",
                desc: "Replace manual, error-prone back-office tasks with AI-powered workflows that scale without adding headcount.",
                tags: ["Process Mapping", "AI Agents", "Integration"],
                border: "border-emerald-500/20",
                glow: "bg-emerald-500/[0.04]",
                tagColor: "bg-emerald-500/10 text-emerald-300",
              },
              {
                title: "AI Strategy & Audit",
                desc: "A full assessment of your current operations — identifying exactly where AI creates the most leverage for your business.",
                tags: ["Free Audit", "Roadmap", "ROI Analysis"],
                border: "border-amber-500/20",
                glow: "bg-amber-500/[0.04]",
                tagColor: "bg-amber-500/10 text-amber-300",
              },
            ].map((s) => (
              <div
                key={s.title}
                className={`p-7 rounded-2xl border ${s.border} ${s.glow} hover:border-white/15 transition-colors`}
              >
                <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md ${s.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3">
              The Process
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Simple. Fast. Built to last.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Audit", desc: "We map your current ops and find where AI creates maximum leverage." },
              { step: "02", title: "Design", desc: "We architect the AI-native system tailored to your business model." },
              { step: "03", title: "Build", desc: "We implement, integrate, and test — you stay focused on your business." },
              { step: "04", title: "Optimize", desc: "We monitor performance and continuously improve your systems." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-3xl font-bold text-white/[0.07] mb-3">{item.step}</div>
                <div className="text-sm font-semibold mb-2">{item.title}</div>
                <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-3">
              The Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built by practitioners,
              <br />
              not theorists.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder) => (
              <Link
                key={founder.slug}
                href={`/team/${founder.slug}`}
                className="group p-7 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.04] transition-all"
              >
                {founder.photo ? (
                  <div className="w-14 h-14 rounded-2xl mb-5 overflow-hidden">
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center text-xl font-bold"
                    style={{ backgroundColor: `${founder.accentHex}18`, color: founder.accentHex }}
                  >
                    {founder.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                )}

                <div
                  className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1"
                  style={{ color: founder.accentHex }}
                >
                  {founder.title.split("&")[1]?.trim() ?? founder.title}
                </div>
                <h3 className="text-base font-semibold mb-3">{founder.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-5">{founder.shortBio}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {founder.focus.slice(0, 2).map((f) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/40">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] font-semibold uppercase tracking-wide text-white/25 group-hover:text-white/50 transition-colors">
                  View Profile →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3">
              Get Started
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Get your free AI audit
            </h2>
            <p className="text-sm text-white/50">
              Tell us about your business and we&apos;ll show you exactly where AI creates the most leverage.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-2">
                Business Name
              </label>
              <input
                type="text"
                placeholder="Your company"
                className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-2">
                What&apos;s your biggest challenge right now?
              </label>
              <textarea
                rows={4}
                placeholder="e.g. We're losing leads because we can't follow up fast enough..."
                className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Request My Free AI Audit
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">A</span>
            </div>
            <span className="text-sm text-white/40">Aigentic Systems</span>
          </div>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Aigentic Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/#services" className="text-xs text-white/30 hover:text-white/60 transition-colors">Services</Link>
            <Link href="/#team" className="text-xs text-white/30 hover:text-white/60 transition-colors">Team</Link>
            <Link href="/dashboard" className="text-xs text-white/30 hover:text-white/60 transition-colors">Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
