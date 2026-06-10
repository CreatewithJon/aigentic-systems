export type ClientStatus = "active" | "onboarding" | "paused" | "churned"
export type ProjectStatus = "live" | "in_progress" | "needs_attention" | "planned"
export type DealStage = "new_lead" | "discovery" | "proposal" | "negotiation" | "won" | "lost"
export type TaskStatus = "todo" | "in_progress" | "done"
export type ContentType = "linkedin" | "youtube" | "instagram" | "blog" | "email" | "asset"
export type KBCategory = "sop" | "sales" | "technical" | "client" | "training" | "prompts"

export type Client = {
  id: string
  name: string
  industry: string
  status: ClientStatus
  contractValue: number
  renewalDate: string
  primaryContact: string
  email: string
  website?: string
  systems: ClientSystem[]
  metrics: ClientMetrics
}

export type ClientSystem = {
  name: string
  status: ProjectStatus
  url?: string
}

export type ClientMetrics = {
  leadsGenerated: number
  appointmentsBooked: number
  revenueAttributed: number
}

export type Project = {
  id: string
  name: string
  clientId: string
  clientName: string
  status: ProjectStatus
  type: string
  dueDate?: string
  description: string
}

export type Deal = {
  id: string
  name: string
  company: string
  value: number
  stage: DealStage
  probability: number
  closeDate: string
  notes?: string
}

export type Task = {
  id: string
  title: string
  assignee: string
  status: TaskStatus
  priority: "low" | "medium" | "high"
  dueDate?: string
  projectId?: string
}

export type Meeting = {
  id: string
  title: string
  with: string
  date: string
  type: "discovery" | "demo" | "follow_up" | "internal" | "client_checkin"
  notes?: string
}

export type KnowledgeItem = {
  id: string
  title: string
  category: KBCategory
  description: string
  content: string
  tags: string[]
  updatedAt: string
}

export type ContentAsset = {
  id: string
  title: string
  type: ContentType
  status: "draft" | "ready" | "published"
  platform?: string
  url?: string
  tags: string[]
  createdAt: string
}

export type CompanyMetrics = {
  mrr: number
  oneTimeRevenue: number
  pipeline: number
  activeClients: number
  leadsGenerated: number
  meetingsScheduled: number
  proposalsSent: number
  projectsInProgress: number
}
