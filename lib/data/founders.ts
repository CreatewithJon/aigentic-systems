export type Founder = {
  slug: string;
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  focus: string[];
  linkedIn?: string;
  twitter?: string;
  accentColor: string;
  accentHex: string;
  photo?: string;
};

export const founders: Founder[] = [
  {
    slug: "alberto-de-pablo",
    name: "Alberto De Pablo",
    title: "Co-Founder & Chief Executive Officer",
    shortBio:
      "Business strategist and systems thinker helping companies find where AI creates the most leverage.",
    fullBio:
      "Alberto brings deep expertise in business strategy and operational design. He specializes in identifying where AI-native processes replace legacy workflows — and how to implement them without disrupting what already works. His background spans international markets, business development, and go-to-market execution.",
    focus: ["Business Strategy", "AI Workflow Design", "Go-To-Market", "Operations"],
    accentColor: "violet",
    accentHex: "#8b5cf6",
    photo: "/alberto-de-pablo.png",
  },
  {
    slug: "jonathan-cardona",
    name: "Jonathan Cardona",
    title: "Co-Founder & Chief AI Officer",
    shortBio:
      "Sales, automation, and AI implementation specialist. Builds the systems that turn traffic into revenue.",
    fullBio:
      "Jonathan's background in sales, banking, crypto education, and digital business gives him a unique lens on what it takes to grow a modern business. He specializes in AI-powered lead generation, automation pipelines, and turning complex technology into systems that non-technical business owners can actually use.",
    focus: ["Lead Generation", "AI Automation", "Sales Systems", "Digital Strategy"],
    linkedIn: "https://linkedin.com/in/jonathancardona",
    accentColor: "blue",
    accentHex: "#3b82f6",
  },
  {
    slug: "dr-kenneth-cottrell",
    name: "Dr. Kenneth A. Cottrell",
    title: "Co-Founder & Chief Business Officer",
    shortBio:
      "AI researcher and engineer building the technical infrastructure that powers Aigentic's client solutions.",
    fullBio:
      "Dr. Cottrell brings academic and applied AI research to the team, grounding every solution in what the technology can actually deliver — not what the hype promises. His expertise spans machine learning, intelligent systems, and enterprise AI architecture. He ensures every solution Aigentic deploys is production-grade and built to last.",
    focus: ["AI Research", "Enterprise Architecture", "Machine Learning", "Technical Leadership"],
    accentColor: "emerald",
    accentHex: "#10b981",
  },
];

export function getFounderBySlug(slug: string): Founder | undefined {
  return founders.find((f) => f.slug === slug);
}
