import type { Client, Project, Deal, Task, Meeting, KnowledgeItem, ContentAsset, CompanyMetrics } from "@/lib/types"

export const mockMetrics: CompanyMetrics = {
  mrr: 4500,
  oneTimeRevenue: 8750,
  pipeline: 47500,
  activeClients: 3,
  leadsGenerated: 28,
  meetingsScheduled: 6,
  proposalsSent: 4,
  projectsInProgress: 7,
}

export const mockClients: Client[] = [
  {
    id: "big-money-realty",
    name: "Big Money Realty",
    industry: "Real Estate",
    status: "active",
    contractValue: 2500,
    renewalDate: "2026-12-01",
    primaryContact: "Damien",
    email: "damien@bigmoneyrealty.com",
    website: "https://bigmoneyrealty.com",
    systems: [
      { name: "Website", status: "live" },
      { name: "CRM Dashboard", status: "live" },
      { name: "Lead Engine", status: "in_progress" },
      { name: "AI Assistant", status: "planned" },
    ],
    metrics: { leadsGenerated: 47, appointmentsBooked: 12, revenueAttributed: 18500 },
  },
  {
    id: "crypto-mondays-lv",
    name: "Crypto Mondays LV",
    industry: "Events / Web3",
    status: "active",
    contractValue: 1500,
    renewalDate: "2026-09-01",
    primaryContact: "Alberto",
    email: "powerfullape.eth@gmail.com",
    website: "https://cryptomondays.vegas",
    systems: [
      { name: "Website", status: "live" },
      { name: "Admin Dashboard", status: "live" },
      { name: "Event Management", status: "live" },
      { name: "Lead Engine", status: "planned" },
    ],
    metrics: { leadsGenerated: 18, appointmentsBooked: 0, revenueAttributed: 0 },
  },
  {
    id: "aigentic-systems",
    name: "Aigentic Systems (Internal)",
    industry: "AI / Automation",
    status: "active",
    contractValue: 0,
    renewalDate: "2027-01-01",
    primaryContact: "Jonathan Cardona",
    email: "hello@aigenticsystems.com",
    website: "https://aigenticsystems.com",
    systems: [
      { name: "Website", status: "live" },
      { name: "OS Dashboard", status: "in_progress" },
      { name: "Lead Engine", status: "live" },
      { name: "Knowledge Base", status: "in_progress" },
    ],
    metrics: { leadsGenerated: 28, appointmentsBooked: 6, revenueAttributed: 13250 },
  },
]

export const mockProjects: Project[] = [
  { id: "p1", name: "BMR Lead Engine", clientId: "big-money-realty", clientName: "Big Money Realty", status: "in_progress", type: "Lead Generation", dueDate: "2026-06-30", description: "AI-powered lead capture and routing for real estate agents." },
  { id: "p2", name: "BMR AI Assistant", clientId: "big-money-realty", clientName: "Big Money Realty", status: "planned", type: "AI Agent", description: "Conversational AI for lead qualification and property questions." },
  { id: "p3", name: "CM Event Management", clientId: "crypto-mondays-lv", clientName: "Crypto Mondays LV", status: "live", type: "Dashboard", description: "CRUD admin for events, speakers, sponsors, and recaps." },
  { id: "p4", name: "Aigentic OS Dashboard", clientId: "aigentic-systems", clientName: "Aigentic Systems", status: "in_progress", type: "Internal Tool", dueDate: "2026-06-20", description: "Founder command center and company OS." },
  { id: "p5", name: "Aigentic Knowledge Base", clientId: "aigentic-systems", clientName: "Aigentic Systems", status: "in_progress", type: "Knowledge Management", description: "Internal SOPs, prompts, case studies, and training resources." },
]

export const mockDeals: Deal[] = [
  { id: "d1", name: "Vegas Med Spa AI System", company: "Glow Aesthetics", value: 2500, stage: "proposal", probability: 60, closeDate: "2026-06-25", notes: "Interested in appointment automation + lead capture." },
  { id: "d2", name: "Real Estate Team AI Stack", company: "Pinnacle Realty Group", value: 5000, stage: "discovery", probability: 40, closeDate: "2026-07-15" },
  { id: "d3", name: "Solar Company Lead Engine", company: "Desert Sun Solar", value: 1500, stage: "negotiation", probability: 80, closeDate: "2026-06-18", notes: "Close to signing. Needs payment terms." },
  { id: "d4", name: "Law Firm Intake Automation", company: "Castillo & Partners", value: 3000, stage: "new_lead", probability: 20, closeDate: "2026-07-30" },
  { id: "d5", name: "Insurance Agency Outreach Bot", company: "Summit Insurance", value: 2000, stage: "proposal", probability: 55, closeDate: "2026-06-28" },
]

export const mockTasks: Task[] = [
  { id: "t1", title: "Finish BMR lead engine API", assignee: "Jonathan", status: "in_progress", priority: "high", dueDate: "2026-06-15", projectId: "p1" },
  { id: "t2", title: "Send Desert Sun Solar proposal", assignee: "Kenneth", status: "todo", priority: "high", dueDate: "2026-06-12" },
  { id: "t3", title: "Discovery call with Pinnacle Realty", assignee: "Alberto", status: "todo", priority: "medium", dueDate: "2026-06-14" },
  { id: "t4", title: "Deploy Aigentic OS v1", assignee: "Jonathan", status: "in_progress", priority: "high", dueDate: "2026-06-20", projectId: "p4" },
  { id: "t5", title: "LinkedIn content batch — Week 2", assignee: "Kenneth", status: "todo", priority: "medium", dueDate: "2026-06-16" },
  { id: "t6", title: "Write BMR case study", assignee: "Alberto", status: "todo", priority: "low" },
]

export const mockMeetings: Meeting[] = [
  { id: "m1", title: "Desert Sun Solar — Close Call", with: "Maria Torres", date: "2026-06-12T14:00:00Z", type: "follow_up", notes: "Review final proposal and pricing." },
  { id: "m2", title: "Pinnacle Realty — Discovery", with: "Frank Nguyen", date: "2026-06-14T10:00:00Z", type: "discovery" },
  { id: "m3", title: "Big Money Realty — Weekly Checkin", with: "Damien", date: "2026-06-16T11:00:00Z", type: "client_checkin" },
  { id: "m4", title: "Glow Aesthetics — Proposal Walkthrough", with: "Sandra Kim", date: "2026-06-17T15:00:00Z", type: "demo" },
  { id: "m5", title: "Founders Sync", with: "Alberto, Kenneth, Jonathan", date: "2026-06-18T09:00:00Z", type: "internal" },
]

export const mockKnowledge: KnowledgeItem[] = [
  { id: "k1", title: "Client Onboarding SOP", category: "sop", description: "Step-by-step process for onboarding new clients from signed contract to first delivery.", content: "Step 1: Send welcome email with portal access and project timeline.\nStep 2: Schedule kick-off call within 48 hours of contract signing.\nStep 3: Collect brand assets, credentials, and access requirements.\nStep 4: Set up project tracking in Notion + Supabase.\nStep 5: Deliver first milestone within 7 days.", tags: ["onboarding", "process", "client"], updatedAt: "2026-06-01" },
  { id: "k2", title: "Dashboard Build Process", category: "technical", description: "How we architect and deploy client dashboards using Next.js + Supabase + Vercel.", content: "1. Create repo from aigentic-dashboard template.\n2. Set up Supabase project and run schema.sql.\n3. Configure environment variables in Vercel.\n4. Build UI components using our design system.\n5. Deploy to Vercel with auto-deploy on main branch.\n6. Set up custom domain via Vercel DNS.", tags: ["development", "dashboard", "deployment"], updatedAt: "2026-06-05" },
  { id: "k3", title: "Sales Discovery Questions", category: "sales", description: "The 15 questions we ask on every discovery call to qualify prospects.", content: "1. What does your current lead process look like?\n2. How many leads do you get per month?\n3. What percentage convert to paying clients?\n4. What's your average deal value?\n5. Where are your biggest bottlenecks?\n6. Have you tried automation before?\n7. What's your tech stack?\n8. Who handles follow-up currently?\n9. What's your timeline for implementation?\n10. What does success look like in 90 days?", tags: ["sales", "discovery", "questions"], updatedAt: "2026-05-28" },
  { id: "k4", title: "Claude Prompt Library — Lead Gen", category: "prompts", description: "Tested Claude prompts for building AI lead generation systems.", content: "Prompt 1: Lead qualification bot\nSystem: You are a lead qualification assistant for [Business Name]. Your job is to qualify leads by asking about their budget, timeline, and specific needs. Be conversational and friendly.\n\nPrompt 2: Follow-up email generator\nGiven this lead info: [NAME, BUSINESS, INTEREST], write a personalized follow-up email that references their specific pain points and proposes a 15-minute discovery call.", tags: ["claude", "ai", "prompts", "lead-gen"], updatedAt: "2026-06-03" },
  { id: "k5", title: "Big Money Realty Case Study", category: "client", description: "Full case study: multi-tenant broker CRM built in 48 hours.", content: "Client: Big Money Realty\nIndustry: Real Estate\nChallenge: No centralized system for broker lead management.\nSolution: Built multi-tenant CRM dashboard with Supabase RLS, agent portals, and lead pipeline.\nTimeline: 48 hours from concept to deployment.\nResults: 47 leads tracked, 12 appointments booked in first 30 days.", tags: ["case-study", "real-estate", "crm"], updatedAt: "2026-06-08" },
  { id: "k6", title: "Crypto Mondays Case Study", category: "client", description: "Community website + admin dashboard for Las Vegas Web3 event.", content: "Client: Crypto Mondays LV\nIndustry: Events / Web3\nChallenge: Needed a professional web presence + event management system.\nSolution: Built community site with event listings, sponsor pages, photo gallery, and admin dashboard.\nTimeline: 1 week.\nResults: Live community portal managing 10+ events, full admin control.", tags: ["case-study", "events", "web3"], updatedAt: "2026-06-08" },
  { id: "k7", title: "AI Agent Design Framework", category: "technical", description: "How we design, prompt, and deploy AI agents for clients.", content: "Phase 1: Define the agent's role and scope.\nPhase 2: Identify data sources and integrations needed.\nPhase 3: Write the system prompt with clear instructions and constraints.\nPhase 4: Test with real scenarios and edge cases.\nPhase 5: Deploy via API and connect to client's workflow.\nPhase 6: Monitor performance and iterate.", tags: ["ai-agents", "design", "framework"], updatedAt: "2026-06-02" },
  { id: "k8", title: "Vercel Deployment Checklist", category: "technical", description: "Pre-deploy checklist for all client projects.", content: "1. Run npx tsc --noEmit — fix all TypeScript errors.\n2. Run npm run build — verify clean build.\n3. Check environment variables are set in Vercel dashboard.\n4. Verify Supabase RLS policies are correct.\n5. Test all forms and API routes.\n6. Check mobile responsiveness.\n7. Set up custom domain.\n8. Configure deployment notifications.", tags: ["deployment", "vercel", "checklist"], updatedAt: "2026-05-30" },
]

export const mockContent: ContentAsset[] = [
  { id: "c1", title: "5 AI Systems Every Business Needs in 2026", type: "linkedin", status: "published", platform: "LinkedIn", tags: ["ai", "automation", "business"], createdAt: "2026-06-08" },
  { id: "c2", title: "How We Built a Full CRM in 48 Hours", type: "youtube", status: "draft", platform: "YouTube", tags: ["build", "crm", "case-study"], createdAt: "2026-06-07" },
  { id: "c3", title: "Crypto Mondays LV Event Recap — June", type: "blog", status: "draft", platform: "Blog", tags: ["crypto-mondays", "event", "recap"], createdAt: "2026-06-09" },
  { id: "c4", title: "AI Lead Engine Demo Reel", type: "instagram", status: "ready", platform: "Instagram", tags: ["demo", "lead-gen", "reel"], createdAt: "2026-06-06" },
  { id: "c5", title: "Aigentic Systems Brand Kit", type: "asset", status: "published", tags: ["brand", "logos", "assets"], createdAt: "2026-05-20" },
  { id: "c6", title: "The Aigentic OS — What We Run Our Company On", type: "linkedin", status: "draft", platform: "LinkedIn", tags: ["os", "internal", "thought-leadership"], createdAt: "2026-06-09" },
]
