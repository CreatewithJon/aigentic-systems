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
      "Business development and AI automation expert designing production-ready agentic systems for Web3, fintech, and enterprise clients.",
    fullBio:
      "Alberto De Pablo is a business development and AI automation expert experienced in designing agentic systems at Web3, fintech, and enterprise levels. He was previously BD Manager at Allora Labs and Subject Matter Expert at Zero Labs, focusing on AI automation for on-chain payments, GTM strategy, and partner integrations.\n\nAlberto has developed robust, production-ready workflows that automate lead research, CRM updates, outreach sequencing, and blockchain data pipelines. He has secured more than $1 million in blockchain grants, led the Coinbase ↔ Oracle NetSuite payments integration, and created NASBA-accredited blockchain education for CPAs.\n\nHe holds FINRA Series 7, 63, and 66 licenses, a CA Life & Health Insurance License, and a B.S. in Business Administration with a focus in Contract Law from Cal Poly Pomona.",
    focus: ["AI Automation", "Business Development", "Web3 & Fintech", "GTM Strategy"],
    linkedIn: "https://www.linkedin.com/in/albertod91",
    accentColor: "violet",
    accentHex: "#8b5cf6",
    photo: "/alberto-de-pablo.png",
  },
  {
    slug: "jonathan-cardona",
    name: "Jonathan Cardona",
    title: "Co-Founder & Chief AI Officer",
    shortBio:
      "Technology entrepreneur and AI systems architect making advanced AI accessible to businesses of all sizes — bridging complex technology and real-world outcomes.",
    fullBio:
      "Jonathan Cardona is a technology entrepreneur, AI systems architect, and emerging technology advocate dedicated to helping businesses harness the power of artificial intelligence, automation, and digital transformation. As Co-Founder and Chief AI Officer of Aigentic Systems, he leads the company's AI strategy, product development, and implementation of intelligent systems designed to increase efficiency, improve decision-making, and drive business growth.\n\nComing from a non-traditional background, Jonathan is a self-taught technologist who built his expertise through hands-on experience developing AI-powered applications, automation workflows, agentic systems, and business solutions. His work focuses on bridging the gap between complex technology and practical business outcomes, making advanced AI accessible to organizations of all sizes.\n\nPrior to founding Aigentic Systems, Jonathan gained experience across financial services, banking, sales, customer support, and technology, developing a deep understanding of business operations and customer needs. This unique perspective enables him to design solutions that combine technical innovation with real-world impact.\n\nJonathan is passionate about empowering entrepreneurs, professionals, and organizations to thrive in the AI-powered digital economy through education, innovation, and responsible technology adoption.",
    focus: ["AI Strategy", "Agentic Systems", "Automation Workflows", "Digital Transformation"],
    linkedIn: "https://www.linkedin.com/in/jonathan-cardona-1089291b9",
    accentColor: "blue",
    accentHex: "#3b82f6",
    photo: "/jonathan-cardona.png",
  },
  {
    slug: "dr-kenneth-cottrell",
    name: "Dr. Kenneth A. Cottrell, D.P.P., M.A.",
    title: "Co-Founder & Chief Business Officer",
    shortBio:
      "Policy strategist, business executive, and energy industry expert bridging innovation and implementation at the intersection of technology, infrastructure, and public policy.",
    fullBio:
      "Dr. Kenneth Cottrell is a policy strategist, business executive, and energy industry expert with extensive experience at the intersection of technology, infrastructure, public policy, and organizational growth. As Co-Founder and Chief Business Officer of Aigentic Systems, he leads business strategy, partnerships, operations, and market development, helping organizations navigate the opportunities and challenges created by emerging technologies.\n\nDr. Cottrell holds a Bachelor of Science in Urban Studies, a Master of Arts in Urban Leadership, and a Doctorate of Public Policy from the University of Nevada, Las Vegas. His professional and academic work has focused on grid modernization, energy management, demand-side management programs, and the impact of large-scale digital infrastructure on regional energy systems.\n\nA published academic scholar and recognized subject matter expert, Dr. Cottrell has provided testimony before state and federal legislative committees on energy infrastructure, grid reliability, and technology-driven economic development. His expertise in policy, strategic planning, and systems thinking helps bridge the gap between innovation and implementation.\n\nAt Aigentic Systems, Kenneth focuses on building strategic partnerships and guiding business growth while ensuring the company's solutions deliver measurable value to clients, communities, and industries adapting to the AI-driven economy.",
    focus: ["Business Strategy", "Public Policy", "Strategic Partnerships", "Energy & Infrastructure"],
    linkedIn: "https://www.linkedin.com/in/akennycottrell",
    accentColor: "emerald",
    accentHex: "#10b981",
    photo: "/dr-kenneth-cottrell.png",
  },
];

export function getFounderBySlug(slug: string): Founder | undefined {
  return founders.find((f) => f.slug === slug);
}
