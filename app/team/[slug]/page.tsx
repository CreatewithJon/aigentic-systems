import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { founders, getFounderBySlug } from "@/lib/data/founders";

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export default async function TeamMemberPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const founder = getFounderBySlug(slug);
  if (!founder) notFound();

  const others = founders.filter((f) => f.slug !== slug);

  return (
    <div className="min-h-screen bg-[#080c12] text-white">
      <Nav />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            href="/#team"
            className="inline-flex items-center gap-2 text-xs text-white/35 hover:text-white/65 transition-colors mb-12"
          >
            ← Back to team
          </Link>

          {/* Profile header */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            {founder.photo ? (
              <div className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div
                className="w-32 h-32 rounded-3xl flex items-center justify-center text-3xl font-bold flex-shrink-0"
                style={{ backgroundColor: `${founder.accentHex}18`, color: founder.accentHex }}
              >
                {founder.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
            )}

            <div className="flex-1">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
                style={{ color: founder.accentHex }}
              >
                {founder.title}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{founder.name}</h1>
              <p className="text-base text-white/55 leading-relaxed max-w-xl">{founder.shortBio}</p>

              {founder.linkedIn && (
                <a
                  href={founder.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-xs px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            <div className="md:col-span-2">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: founder.accentHex }}
              >
                About
              </div>
              <p className="text-sm text-white/65 leading-relaxed">{founder.fullBio}</p>
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">
                Areas of Focus
              </div>
              <div className="flex flex-col gap-2">
                {founder.focus.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: founder.accentHex }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="p-8 rounded-2xl border mb-16"
            style={{ borderColor: `${founder.accentHex}30`, backgroundColor: `${founder.accentHex}06` }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: founder.accentHex }}>
              Work Together
            </div>
            <h3 className="text-xl font-bold mb-2">Ready to modernize your business with AI?</h3>
            <p className="text-sm text-white/50 mb-6">
              Start with a free audit — we&apos;ll show you exactly where AI creates the most leverage for your operation.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${founder.accentHex}, #3b82f6)` }}
            >
              Request a Free Audit
            </Link>
          </div>

          {/* Other team members */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6">
              Also on the team
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/team/${other.slug}`}
                  className="group flex gap-4 p-5 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: `${other.accentHex}18`, color: other.accentHex }}
                  >
                    {other.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-0.5">{other.name}</div>
                    <div className="text-xs text-white/40">{other.title.split("&")[1]?.trim() ?? other.title}</div>
                  </div>
                  <div className="ml-auto text-white/20 group-hover:text-white/50 transition-colors text-sm self-center">→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
