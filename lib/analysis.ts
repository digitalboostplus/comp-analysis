export type PrimaryGoal =
  | "increase-organic-traffic"
  | "generate-qualified-leads"
  | "drive-ecommerce-revenue"
  | "improve-brand-authority";

export interface AnalysisRequest {
  domain: string;
  competitors: string[];
  primaryGoal: PrimaryGoal;
  focusAreas: string[];
  audience?: string;
  location?: string;
  tone?: "authoritative" | "friendly" | "bold" | "balanced";
  contentFormats: string[];
  notes?: string;
}

export interface ScorecardEntry {
  area: string;
  score: number;
  status: "priority" | "on-track" | "monitor";
  insight: string;
  nextMoves: string[];
}

export interface CompetitorProfile {
  name: string;
  domainAuthority: number;
  organicTraffic: number;
  velocity: string;
  topKeywords: string[];
  standoutContent: string;
  notes: string;
}

export interface KeywordCluster {
  cluster: string;
  intent: "Informational" | "Commercial" | "Transactional" | "Navigational";
  difficulty: number;
  opportunityScore: number;
  keywords: string[];
  contentAngle: string;
  funnelStage: "Awareness" | "Consideration" | "Decision" | "Retention";
}

export interface ContentIdea {
  title: string;
  format: string;
  persona: string;
  targetKeyword: string;
  intent: string;
  outline: string[];
  optimizationTips: string[];
}

export interface BacklinkProspect {
  name: string;
  type: string;
  reason: string;
  outreachAngle: string;
  suggestedAsset: string;
}

export interface ChecklistItem {
  item: string;
  status: "pass" | "warning" | "fail";
  detail: string;
  priority: "High" | "Medium" | "Low";
}

export interface SerpOpportunity {
  feature: string;
  status: "Owned" | "Partial" | "Missing";
  recommendation: string;
  supportingActions: string[];
}

export interface ActionItem {
  name: string;
  impact: "High" | "Medium" | "Low";
  effort: "Low" | "Medium" | "High";
  description: string;
  successMetric: string;
}

export interface Roadmap {
  quickWins: ActionItem[];
  mediumTerm: ActionItem[];
  strategicBets: ActionItem[];
}

export interface ReportingFramework {
  dashboards: {
    title: string;
    frequency: string;
    metrics: string[];
  }[];
  notes: string;
}

export interface Experiment {
  name: string;
  hypothesis: string;
  metric: string;
  duration: string;
}

export interface AnalysisResult {
  id: string;
  domain: string;
  generatedAt: string;
  category: string;
  headline: string;
  summary: string;
  highlights: string[];
  baselineScore: number;
  objective: string;
  keyMetrics: {
    label: string;
    current: string;
    target: string;
  }[];
  scorecard: ScorecardEntry[];
  competitorBreakdown: CompetitorProfile[];
  keywordClusters: KeywordCluster[];
  contentPlan: ContentIdea[];
  backlinkProspects: BacklinkProspect[];
  technicalChecklist: ChecklistItem[];
  serpOpportunities: SerpOpportunity[];
  automationTips: string[];
  roadmap: Roadmap;
  reporting: ReportingFramework;
  experiments: Experiment[];
  shareableInsights: string[];
}

const GOAL_LIBRARY: Record<PrimaryGoal, { label: string; objective: string; headline: string; emphasis: string[] }> = {
  "increase-organic-traffic": {
    label: "Increase organic traffic",
    objective: "Expand keyword footprint and capture new top-of-funnel demand.",
    headline: "Build dominant visibility across awareness-stage keywords.",
    emphasis: ["Topic authority", "SERP feature acquisition", "Scalable content production"]
  },
  "generate-qualified-leads": {
    label: "Generate qualified leads",
    objective: "Connect problem-aware audiences with conversion-ready experiences.",
    headline: "Align search demand with conversion paths that nurture and qualify buyers.",
    emphasis: ["Pain-point positioning", "Conversion copy optimization", "Interactive assets"]
  },
  "drive-ecommerce-revenue": {
    label: "Drive ecommerce revenue",
    objective: "Increase product discoverability and purchase intent from organic search.",
    headline: "Turn product discovery into revenue with intent-optimized shopping journeys.",
    emphasis: ["Merchandising", "Rich results", "Conversion rate optimization"]
  },
  "improve-brand-authority": {
    label: "Improve brand authority",
    objective: "Own thought leadership and strengthen digital PR signals.",
    headline: "Become the go-to brand that sets the narrative in your category.",
    emphasis: ["Opinion leadership", "Digital PR", "Executive visibility"]
  }
};

interface CategoryConfig {
  name: string;
  keywordIdeas: {
    cluster: string;
    intent: KeywordCluster["intent"];
    contentAngle: string;
    examples: string[];
    funnelStage: KeywordCluster["funnelStage"];
  }[];
  contentThemes: {
    title: string;
    persona: string;
    outline: string[];
    optimizationTips: string[];
  }[];
  backlinkAngles: {
    name: string;
    type: string;
    angle: string;
    asset: string;
  }[];
  technicalFocus: {
    item: string;
    description: string;
    priority: ChecklistItem["priority"];
  }[];
  serpFocus: {
    feature: SerpOpportunity["feature"];
    recommendation: string;
  }[];
  experiments: {
    name: string;
    hypothesis: string;
    metric: string;
  }[];
  automationTips: string[];
  notes: string;
}

const CATEGORY_LIBRARY: Record<string, CategoryConfig> = {
  saas: {
    name: "B2B SaaS",
    keywordIdeas: [
      {
        cluster: "workflow automation",
        intent: "Commercial",
        contentAngle: "Comparison-driven buying guides that highlight time savings",
        funnelStage: "Consideration",
        examples: [
          "best {{domainKeyword}} automation platform",
          "{{domainKeyword}} workflow software comparison",
          "alternatives to {{primaryCompetitor}}"
        ]
      },
      {
        cluster: "roi justification",
        intent: "Informational",
        contentAngle: "Pain-point narratives backed by calculators and benchmarks",
        funnelStage: "Awareness",
        examples: [
          "how to measure {{domainKeyword}} roi",
          "{{domainKeyword}} reporting templates",
          "{{domainKeyword}} case study examples"
        ]
      },
      {
        cluster: "implementation",
        intent: "Transactional",
        contentAngle: "Launch playbooks and integrations to de-risk onboarding",
        funnelStage: "Decision",
        examples: [
          "{{domainKeyword}} implementation checklist",
          "{{domainKeyword}} integrations guide",
          "{{domainKeyword}} onboarding best practices"
        ]
      }
    ],
    contentThemes: [
      {
        title: "The Modern {{industry}} Operating Framework",
        persona: "Ops and enablement leaders",
        outline: [
          "What changed in {{industry}} in the last 12 months",
          "Benchmarks from {{primaryCompetitor}} and peers",
          "Toolkit: integrations, automations, and playbooks",
          "Change management plan and ROI checkpoints"
        ],
        optimizationTips: [
          "Embed interactive ROI calculator CTA",
          "Link to integration docs for mid-funnel journeys",
          "Use schema FAQ around implementation hurdles"
        ]
      },
      {
        title: "Zero-Drag Adoption Stories from Teams Like {{audience}}",
        persona: "Department leads championing change",
        outline: [
          "Role-specific pains and champion messaging",
          "Before/after metrics sourced from customer stories",
          "Internal pitch deck templates",
          "Quick wins in the first 30 days"
        ],
        optimizationTips: [
          "Repurpose quotes into review schema",
          "Add anchor links for fast navigation",
          "Gate interactive worksheet behind product-qualified lead form"
        ]
      }
    ],
    backlinkAngles: [
      {
        name: "RevOps Weekly",
        type: "Newsletter",
        angle: "Contribute a teardown on how teams scale {{domainKeyword}} processes",
        asset: "Charts comparing key funnel metrics pre/post implementation"
      },
      {
        name: "ProductLed Alliance",
        type: "Community",
        angle: "Host an office hours session on activation benchmarks",
        asset: "Interactive benchmark report with anonymized customer data"
      },
      {
        name: "G2 Category Leaders",
        type: "Directory",
        angle: "Leverage review velocity to unlock category highlights and badges",
        asset: "Customer proof pack with testimonials and ROI screens"
      }
    ],
    technicalFocus: [
      {
        item: "Documentation performance budget",
        description: "Audit docs subdomain for Largest Contentful Paint regressions across top APIs.",
        priority: "High"
      },
      {
        item: "Schema coverage",
        description: "Implement HowTo and Product schema on feature tutorials to capture rich results.",
        priority: "Medium"
      },
      {
        item: "Login wall crawlability",
        description: "Ensure gated assets expose teaser content and canonicalization for discovery.",
        priority: "Medium"
      }
    ],
    serpFocus: [
      {
        feature: "Product snippets",
        recommendation: "Add review markup to integration and pricing pages to qualify for SERP enhancements."
      },
      {
        feature: "People Also Ask",
        recommendation: "Publish expert Q&A using customers' onboarding questions to win PAA coverage."
      },
      {
        feature: "Video",
        recommendation: "Create 90-second feature demos and embed with VideoObject schema for blended results."
      }
    ],
    experiments: [
      {
        name: "Interactive ROI calculator",
        hypothesis: "Embedding calculator CTAs on comparison pages will lift product-qualified trials by 12%",
        metric: "Product-qualified trial signups"
      },
      {
        name: "Onboarding webinar series",
        hypothesis: "Live implementation clinics will reduce time-to-value and improve retention visibility",
        metric: "Activated accounts within 30 days"
      }
    ],
    automationTips: [
      "Push new high-intent signups into nurture workflows triggered by keyword clusters",
      "Auto-sync changelog updates to status pages and docs with XML sitemap refresh",
      "Use product usage signals to personalize retargeting copy in search snippets"
    ],
    notes: "Lean on customer proof, integration depth, and ROI calculators to outmaneuver entrenched SaaS incumbents."
  },
  ecommerce: {
    name: "Ecommerce",
    keywordIdeas: [
      {
        cluster: "comparison & style",
        intent: "Commercial",
        contentAngle: "Curated collections and buying guides based on seasonal data",
        funnelStage: "Awareness",
        examples: [
          "best {{domainKeyword}} for {{season}}",
          "{{domainKeyword}} trends {{currentYear}}",
          "what to wear for {{occasion}}"
        ]
      },
      {
        cluster: "conversion accelerators",
        intent: "Transactional",
        contentAngle: "Conversion copy that removes friction and highlights urgency",
        funnelStage: "Decision",
        examples: [
          "{{domainKeyword}} discount codes",
          "{{domainKeyword}} shipping times",
          "{{domainKeyword}} size guide"
        ]
      },
      {
        cluster: "post-purchase",
        intent: "Informational",
        contentAngle: "Care guides and loyalty-driving experiences",
        funnelStage: "Retention",
        examples: [
          "how to care for {{domainKeyword}}",
          "{{domainKeyword}} outfit ideas",
          "ways to style {{domainKeyword}}"
        ]
      }
    ],
    contentThemes: [
      {
        title: "The Definitive {{season}} {{domainKeyword}} Capsule Guide",
        persona: "Trend-driven shoppers",
        outline: [
          "Micro-trends and data-backed predictions",
          "Lookbook by occasion",
          "Styling formulas with upsell bundles",
          "Community spotlight and UGC call-to-action"
        ],
        optimizationTips: [
          "Interlink with related products and shoppable galleries",
          "Add Product schema and structured FAQ",
          "Localize section for {{location}} shoppers with inventory data"
        ]
      },
      {
        title: "{{location}} Insider's Guide to {{domainKeyword}} Gifts",
        persona: "Last-minute buyers",
        outline: [
          "Top picks under different price points",
          "Fast shipping and pickup options",
          "Customer stories and review highlights",
          "Post-purchase care + reorder reminders"
        ],
        optimizationTips: [
          "Embed CTAs tied to free shipping thresholds",
          "Use urgency copy for limited drops",
          "Repurpose into email + paid social sequences"
        ]
      }
    ],
    backlinkAngles: [
      {
        name: "Style roundup publishers",
        type: "Editorial",
        angle: "Offer data-backed trend quotes and exclusive imagery",
        asset: "Lookbook with expert commentary and retailer stats"
      },
      {
        name: "Affiliate partners",
        type: "Partnership",
        angle: "Launch tiered affiliate program with bundles and seasonal hooks",
        asset: "Partner kit with conversion data and creative"
      },
      {
        name: "Local lifestyle blogs",
        type: "PR",
        angle: "Pitch neighborhood spotlights and store events in {{location}}",
        asset: "Event calendar, community initiatives, and local testimonials"
      }
    ],
    technicalFocus: [
      {
        item: "Core Web Vitals on PDPs",
        description: "Defer third-party scripts and compress hero imagery to improve LCP.",
        priority: "High"
      },
      {
        item: "Faceted navigation crawl rules",
        description: "Review robots directives to prevent parameter bloat while preserving intent pages.",
        priority: "Medium"
      },
      {
        item: "Product feed hygiene",
        description: "Ensure structured data parity between product feed and canonical PDPs.",
        priority: "Medium"
      }
    ],
    serpFocus: [
      {
        feature: "Shopping graph",
        recommendation: "Maintain up-to-date merchant center data to secure free product listings."
      },
      {
        feature: "Image pack",
        recommendation: "Upload lifestyle imagery with descriptive alt text to target visual SERPs."
      },
      {
        feature: "Local pack",
        recommendation: "Optimize GMB with inventory attributes and local landing pages."
      }
    ],
    experiments: [
      {
        name: "Dynamic bundling tests",
        hypothesis: "Personalized bundles on high-exit PDPs will raise AOV by 8%",
        metric: "Average order value"
      },
      {
        name: "UGC snippet testing",
        hypothesis: "Showcasing UGC above the fold will improve add-to-cart rate",
        metric: "Add to cart rate"
      }
    ],
    automationTips: [
      "Sync top-selling product reviews into structured data widgets",
      "Trigger inventory-based urgency messaging when stock drops below thresholds",
      "Auto-publish UGC galleries when community hashtags trend"
    ],
    notes: "Blend performance merchandising with story-driven content to convert search demand into repeat buyers."
  },
  health: {
    name: "Healthcare & Wellness",
    keywordIdeas: [
      {
        cluster: "symptom education",
        intent: "Informational",
        contentAngle: "Medically reviewed guidance with lifestyle context",
        funnelStage: "Awareness",
        examples: [
          "what causes {{domainKeyword}}",
          "{{domainKeyword}} symptoms by age",
          "questions to ask a doctor about {{domainKeyword}}"
        ]
      },
      {
        cluster: "treatment options",
        intent: "Commercial",
        contentAngle: "Evidence-backed comparisons and candid cost breakdowns",
        funnelStage: "Consideration",
        examples: [
          "{{domainKeyword}} treatment near {{location}}",
          "best specialists for {{domainKeyword}}",
          "non-invasive alternatives to {{domainKeyword}}"
        ]
      },
      {
        cluster: "lifestyle management",
        intent: "Informational",
        contentAngle: "Holistic routines combining clinical and at-home strategies",
        funnelStage: "Retention",
        examples: [
          "daily plan for managing {{domainKeyword}}",
          "{{domainKeyword}} diet checklist",
          "telehealth follow up schedule"
        ]
      }
    ],
    contentThemes: [
      {
        title: "Clinical Playbook: Managing {{domainKeyword}} with Confidence",
        persona: "Patients and caregivers",
        outline: [
          "Latest research and guidance",
          "Decision tree comparing treatments",
          "Prep checklist for specialist visits",
          "Support community and remote care options"
        ],
        optimizationTips: [
          "Include physician quotes with author schema",
          "Add downloadable symptom tracker",
          "Surface telehealth CTA with HIPAA-safe messaging"
        ]
      },
      {
        title: "{{location}} Outcomes Report: How Local Patients Improve {{domainKeyword}}",
        persona: "Community-focused patients",
        outline: [
          "Local outcome data and testimonials",
          "Insurance and access guidance",
          "Lifestyle programming and virtual classes",
          "Next-step triage with nurse navigator contact"
        ],
        optimizationTips: [
          "Use MedicalWebPage schema",
          "Localize by ZIP clusters",
          "Add speakable markup for voice assistants"
        ]
      }
    ],
    backlinkAngles: [
      {
        name: "Clinical associations",
        type: "Organization",
        angle: "Publish co-branded research summaries and patient guides",
        asset: "Peer-reviewed whitepaper with aggregated outcomes"
      },
      {
        name: "Wellness influencers",
        type: "Partnership",
        angle: "Run myth-busting collaborations with credentialed professionals",
        asset: "Live Q&A series with transcripts and key takeaways"
      },
      {
        name: "Local health reporters",
        type: "PR",
        angle: "Share data-backed community health initiatives and screenings",
        asset: "Press kit with stats, quotes, and patient stories"
      }
    ],
    technicalFocus: [
      {
        item: "E-A-T signals",
        description: "Audit author bios, review cadence, and medical citations sitewide.",
        priority: "High"
      },
      {
        item: "Accessibility",
        description: "Ensure WCAG AA compliance with keyboard nav, ARIA labels, and contrast fixes.",
        priority: "High"
      },
      {
        item: "Local landing pages",
        description: "Deploy condition-specific location pages with structured data.",
        priority: "Medium"
      }
    ],
    serpFocus: [
      {
        feature: "FAQ",
        recommendation: "Add authoritative FAQ sections validated by medical review."
      },
      {
        feature: "Map pack",
        recommendation: "Collect reviews and manage hours to dominate local medical SERPs."
      },
      {
        feature: "Featured snippet",
        recommendation: "Structure step-by-step guidance with concise definitions and bullets."
      }
    ],
    experiments: [
      {
        name: "Virtual class series",
        hypothesis: "Hosting condition-specific webinars will increase appointment requests by 15%",
        metric: "Appointment request volume"
      },
      {
        name: "Nurse chat widget",
        hypothesis: "Real-time triage assistance will improve telehealth bookings",
        metric: "Telehealth conversions"
      }
    ],
    automationTips: [
      "Sync physician availability into schema and Google Business Profiles",
      "Trigger care plan emails after content engagement signals",
      "Auto-translate critical guides for underserved languages"
    ],
    notes: "E-A-T, community trust, and localized experiences are the levers to outrank national health publishers."
  },
  finance: {
    name: "Financial Services",
    keywordIdeas: [
      {
        cluster: "strategy roadmaps",
        intent: "Informational",
        contentAngle: "Step-by-step breakdowns with calculators and compliance tips",
        funnelStage: "Awareness",
        examples: [
          "how to build a {{domainKeyword}} portfolio",
          "{{domainKeyword}} risk checklist",
          "questions for your {{domainKeyword}} advisor"
        ]
      },
      {
        cluster: "provider selection",
        intent: "Commercial",
        contentAngle: "Trust-building comparisons and fiduciary transparency",
        funnelStage: "Consideration",
        examples: [
          "best {{domainKeyword}} advisors near {{location}}",
          "{{domainKeyword}} fees explained",
          "{{primaryCompetitor}} vs {{domain}}"
        ]
      },
      {
        cluster: "regulation updates",
        intent: "Informational",
        contentAngle: "Explain complex policy changes with executive summaries",
        funnelStage: "Retention",
        examples: [
          "new regulations impacting {{domainKeyword}}",
          "{{currentYear}} compliance checklist",
          "market outlook for {{domainKeyword}}"
        ]
      }
    ],
    contentThemes: [
      {
        title: "{{currentYear}} {{domainKeyword}} Wealth Blueprint",
        persona: "High-intent investors",
        outline: [
          "Macro trends and regulatory watch",
          "Portfolio scenarios by risk tolerance",
          "Tax optimization levers",
          "Action plan with quarterly milestones"
        ],
        optimizationTips: [
          "Integrate calculators gated by email capture",
          "Add trust badges and advisor bios",
          "Include downloadable portfolio worksheet"
        ]
      },
      {
        title: "The {{location}} Executive's Guide to {{domainKeyword}}",
        persona: "Regional decision-makers",
        outline: [
          "Local market indicators",
          "Peer benchmarks and sentiment",
          "Succession and liquidity planning",
          "Next-step consultation CTA"
        ],
        optimizationTips: [
          "Leverage Speakable schema for voice search",
          "Embed compliance disclosures and disclaimers",
          "Repurpose into webinar slides and briefing docs"
        ]
      }
    ],
    backlinkAngles: [
      {
        name: "Finance podcasts",
        type: "Media",
        angle: "Offer commentary on emerging market shifts and risk mitigation",
        asset: "Executive talking points with local market stats"
      },
      {
        name: "Chambers of commerce",
        type: "Organization",
        angle: "Host co-branded events on capital planning",
        asset: "Presentation deck + follow-up workbook"
      },
      {
        name: "Regulatory blogs",
        type: "Editorial",
        angle: "Publish compliance explainers and contribute expert roundups",
        asset: "Whitepaper summarizing new legislation impacts"
      }
    ],
    technicalFocus: [
      {
        item: "Trust & Safety signals",
        description: "Audit security badges, HTTPS coverage, and compliance statements.",
        priority: "High"
      },
      {
        item: "Content freshness",
        description: "Automate review dates and version history for financial advice pages.",
        priority: "High"
      },
      {
        item: "Lead tracking",
        description: "Tighten analytics for multi-touch attribution and form completion.",
        priority: "Medium"
      }
    ],
    serpFocus: [
      {
        feature: "Featured snippet",
        recommendation: "Structure definitions and numbered steps to own key snippet positions."
      },
      {
        feature: "Top stories",
        recommendation: "Publish timely commentary on market shifts to surface in news carousels."
      },
      {
        feature: "Video",
        recommendation: "Record weekly market outlooks optimized for YouTube chapters."
      }
    ],
    experiments: [
      {
        name: "Advisor comparison tool",
        hypothesis: "Interactive advisor matching will grow consultation requests by 10%",
        metric: "Consultation requests"
      },
      {
        name: "Client story series",
        hypothesis: "Showcasing anonymized client wins will improve conversion rate",
        metric: "Lead to opportunity rate"
      }
    ],
    automationTips: [
      "Use CRM triggers to personalize nurture sequences by asset class interest",
      "Surface compliance alerts inside CMS to enforce review cadence",
      "Integrate finance APIs for live market data snippets"
    ],
    notes: "Authority, transparency, and timely commentary unlock trust with financially-savvy audiences."
  },
  local: {
    name: "Local Services",
    keywordIdeas: [
      {
        cluster: "near me intent",
        intent: "Transactional",
        contentAngle: "Hyper-local landing pages with service guarantees",
        funnelStage: "Decision",
        examples: [
          "best {{domainKeyword}} near me",
          "{{location}} emergency {{domainKeyword}}",
          "same day {{domainKeyword}} services"
        ]
      },
      {
        cluster: "maintenance & tips",
        intent: "Informational",
        contentAngle: "Seasonal guides tied to local climate",
        funnelStage: "Awareness",
        examples: [
          "{{season}} maintenance for {{domainKeyword}}",
          "{{location}} homeowners checklist",
          "diy vs pro {{domainKeyword}}"
        ]
      },
      {
        cluster: "trust signals",
        intent: "Commercial",
        contentAngle: "Review roundups and proof-driven stories",
        funnelStage: "Consideration",
        examples: [
          "{{domainKeyword}} testimonials {{location}}",
          "licensed {{domainKeyword}} experts",
          "what {{domainKeyword}} costs in {{location}}"
        ]
      }
    ],
    contentThemes: [
      {
        title: "{{location}} Homeowner's Survival Guide to {{domainKeyword}}",
        persona: "Local homeowners",
        outline: [
          "Neighborhood-specific pain points",
          "DIY vs professional decision tree",
          "Emergency response plan",
          "Trusted partner checklist + CTA"
        ],
        optimizationTips: [
          "Embed neighborhood schema",
          "Add click-to-call CTAs",
          "Surface review snippets for trust"
        ]
      },
      {
        title: "Meet the {{domainKeyword}} Pros Keeping {{location}} Running",
        persona: "Community-focused prospects",
        outline: [
          "Team spotlight and certifications",
          "Response time dashboard",
          "Community initiatives",
          "Guarantees and financing options"
        ],
        optimizationTips: [
          "Include FAQ schema",
          "Add map embeds and driving directions",
          "Publish Spanish translation if relevant"
        ]
      }
    ],
    backlinkAngles: [
      {
        name: "Neighborhood associations",
        type: "Community",
        angle: "Sponsor community cleanups and publish recap stories",
        asset: "Photo recap + safety checklist"
      },
      {
        name: "Local news outlets",
        type: "PR",
        angle: "Share public service tips during seasonal spikes",
        asset: "Expert quotes and emergency preparedness guide"
      },
      {
        name: "Vendor partners",
        type: "Partnership",
        angle: "Create co-marketing guides with complementary businesses",
        asset: "Bundle offer sheet + shared lead form"
      }
    ],
    technicalFocus: [
      {
        item: "Local business schema",
        description: "Ensure NAP consistency, service areas, and review markup.",
        priority: "High"
      },
      {
        item: "Page speed on mobile",
        description: "Compress imagery and enable caching for service area landing pages.",
        priority: "High"
      },
      {
        item: "Reputation automation",
        description: "Trigger review requests after completed jobs.",
        priority: "Medium"
      }
    ],
    serpFocus: [
      {
        feature: "Local pack",
        recommendation: "Optimize Google Business Profile with service categories, Q&A, and local photos."
      },
      {
        feature: "Map results",
        recommendation: "Publish area-specific landing pages with driving directions and testimonials."
      },
      {
        feature: "Reviews",
        recommendation: "Highlight response time and satisfaction rates with structured data."
      }
    ],
    experiments: [
      {
        name: "Same-day appointment banner",
        hypothesis: "Urgency messaging on top landing pages will lift calls by 18%",
        metric: "Phone calls tracked via call tracking"
      },
      {
        name: "Neighborhood retargeting",
        hypothesis: "Geo-fenced display ads will improve repeat booking rate",
        metric: "Bookings in retargeted ZIP codes"
      }
    ],
    automationTips: [
      "Auto-sync service areas to GBP and local directories",
      "Send maintenance reminders by season and service type",
      "Stream customer reviews onto landing pages in real time"
    ],
    notes: "Proximity, reputation, and instant response are the winning levers for local dominance."
  }
};

function normalizeDomain(domain: string): string {
  return domain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "")
    .toLowerCase();
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededNumber(seed: string, min: number, max: number): number {
  const hash = hashString(seed);
  const normalized = (hash % 1000) / 1000;
  return Math.round((min + (max - min) * normalized) * 10) / 10;
}

function inferCategory(domain: string, competitors: string[]): string {
  const keyword = domain.split(".")[0] ?? "";
  const signals = [keyword, ...competitors].join(" ").toLowerCase();
  if (signals.includes("clinic") || signals.includes("health") || signals.includes("care")) {
    return "health";
  }
  if (signals.includes("invest") || signals.includes("finance") || signals.includes("capital")) {
    return "finance";
  }
  if (signals.includes("shop") || signals.includes("store") || signals.includes("boutique") || signals.includes("wear")) {
    return "ecommerce";
  }
  if (signals.includes("plumb") || signals.includes("hvac") || signals.includes("service") || signals.includes("clean")) {
    return "local";
  }
  if (signals.includes("app") || signals.includes("software") || signals.includes("platform") || signals.includes("tech")) {
    return "saas";
  }
  return "saas";
}

function extractDomainKeyword(domain: string): string {
  const base = domain.split(".")[0] ?? domain;
  return base.replace(/[^a-zA-Z]/g, " ").trim() || "digital";
}

function template(text: string, context: Record<string, string>): string {
  return text.replace(/{{(.*?)}}/g, (_, key) => context[key.trim()] ?? "");
}

function determineStatus(score: number): ScorecardEntry["status"] {
  if (score >= 80) return "on-track";
  if (score >= 60) return "monitor";
  return "priority";
}

function generateHighlights(goal: PrimaryGoal, focusAreas: string[], category: CategoryConfig): string[] {
  const goalHighlights = GOAL_LIBRARY[goal].emphasis;
  const focusHighlights = focusAreas.map((focus) =>
    template(`Double down on ${focus} initiatives with category-leading execution.`, {})
  );
  return [...goalHighlights, ...focusHighlights, category.notes];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function computeScore(seed: string, base: number, modifier: number): number {
  const random = seededNumber(seed, 55, 92);
  return clamp(Math.round((random * (base / 100) + modifier) * 10) / 10, 40, 98);
}

export function analyzeSite(request: AnalysisRequest): AnalysisResult {
  const domain = normalizeDomain(request.domain);
  const competitors = request.competitors
    .map((competitor) => normalizeDomain(competitor))
    .filter(Boolean);
  const categoryKey = inferCategory(domain, competitors);
  const category = CATEGORY_LIBRARY[categoryKey];
  const domainKeyword = extractDomainKeyword(domain) || "growth";
  const primaryCompetitor = competitors[0] ?? "category leader";
  const context = {
    domain,
    primaryCompetitor,
    domainKeyword,
    industry: category.name,
    audience: request.audience ?? "stakeholders",
    location: request.location ?? "your region",
    currentYear: new Date().getFullYear().toString(),
    season: ["spring", "summer", "fall", "winter"][new Date().getMonth() % 4],
    occasion: request.notes?.split(/[,.;]/)[0]?.trim() || "special occasions"
  };

  const baselineScore = seededNumber(`${domain}-baseline`, 58, 82);

  const scorecardSeeds = [
    { area: "Technical foundations", focus: "technical" },
    { area: "Content depth", focus: "content" },
    { area: "Authority & backlinks", focus: "authority" },
    { area: "Conversion pathways", focus: "conversion" },
    { area: "Brand visibility", focus: "brand" },
    { area: "Analytics & measurement", focus: "analytics" }
  ];

  const scorecard: ScorecardEntry[] = scorecardSeeds.map((seed, index) => {
    const modifier = request.focusAreas.includes(seed.focus) ? 6 : 0;
    const score = computeScore(`${domain}-${seed.area}`, baselineScore + index * 3, modifier);
    const status = determineStatus(score);
    const insight =
      status === "on-track"
        ? `Leverage strong ${seed.area.toLowerCase()} to accelerate adjacent initiatives.`
        : status === "monitor"
        ? `Solid ${seed.area.toLowerCase()} foundations detected; prioritize consistent optimization cadence.`
        : `Address ${seed.area.toLowerCase()} gaps to unlock impact from downstream initiatives.`;
    const nextMoves = [
      `Set a ${seed.area.toLowerCase()} KPI tied to the ${GOAL_LIBRARY[request.primaryGoal].label.toLowerCase()}.`,
      `Assign ownership for ${seed.area.toLowerCase()} experiments with 30-day reporting intervals.`
    ];
    return { area: seed.area, score, status, insight, nextMoves };
  });

  const competitorBreakdown: CompetitorProfile[] = competitors.map((name, index) => {
    const authority = seededNumber(`${name}-authority`, 62, 94);
    const traffic = Math.round(seededNumber(`${name}-traffic`, 45, 320));
    const velocity = seededNumber(`${name}-velocity`, -8, 18);
    const topKeywords = category.keywordIdeas
      .flatMap((idea) => idea.examples.slice(0, 1))
      .map((example) => template(example, { ...context, primaryCompetitor: name }));
    return {
      name,
      domainAuthority: authority,
      organicTraffic: traffic,
      velocity: `${velocity >= 0 ? "+" : ""}${velocity}% YoY` ,
      topKeywords,
      standoutContent: template(category.contentThemes[index % category.contentThemes.length].title, {
        ...context,
        primaryCompetitor: name
      }),
      notes: `Focus on ${category.keywordIdeas[index % category.keywordIdeas.length].cluster.replace(/-/g, " ")}`
    };
  });

  if (competitorBreakdown.length === 0) {
    competitorBreakdown.push({
      name: "Industry benchmark",
      domainAuthority: seededNumber(`${domain}-industry`, 60, 85),
      organicTraffic: Math.round(seededNumber(`${domain}-industry-traffic`, 30, 150)),
      velocity: `+${seededNumber(`${domain}-industry-velocity`, 5, 14)}% YoY`,
      topKeywords: category.keywordIdeas.map((idea) => template(idea.examples[0], context)),
      standoutContent: template(category.contentThemes[0].title, context),
      notes: "Use this as a directional benchmark when selecting competitors."
    });
  }

  const keywordClusters: KeywordCluster[] = category.keywordIdeas.map((idea, index) => {
    const difficulty = seededNumber(`${domain}-${idea.cluster}-difficulty`, 28, 74);
    const opportunity = clamp(100 - difficulty + index * 5, 35, 92);
    return {
      cluster: template(idea.cluster.replace(/-/g, " "), context),
      intent: idea.intent,
      difficulty,
      opportunityScore: opportunity,
      keywords: idea.examples.map((example) => template(example, context)),
      contentAngle: template(idea.contentAngle, context),
      funnelStage: idea.funnelStage
    };
  });

  const persona = request.audience ?? "priority personas";

  const selectedFormats = request.contentFormats.length > 0 ? request.contentFormats : ["Blog guide"];
  const contentPlan: ContentIdea[] = category.contentThemes.map((theme, index) => {
    const format = selectedFormats[index % selectedFormats.length];
    const keyword = keywordClusters[index % keywordClusters.length]?.keywords[0] ?? context.domainKeyword;
    return {
      title: template(theme.title, context),
      format,
      persona,
      targetKeyword: keyword,
      intent: keywordClusters[index % keywordClusters.length]?.intent ?? "Informational",
      outline: theme.outline.map((line) => template(line, context)),
      optimizationTips: theme.optimizationTips.map((tip) => template(tip, context))
    };
  });

  const backlinkProspects: BacklinkProspect[] = category.backlinkAngles.map((angle) => ({
    name: template(angle.name, context),
    type: angle.type,
    reason: template(angle.angle, context),
    outreachAngle: template(angle.angle, context),
    suggestedAsset: template(angle.asset, context)
  }));

  const technicalChecklist: ChecklistItem[] = category.technicalFocus.map((item, index) => {
    const status: ChecklistItem["status"] = index === 0 ? "warning" : index === 1 ? "fail" : "pass";
    return {
      item: template(item.item, context),
      status,
      detail: template(item.description, context),
      priority: item.priority
    };
  });

  const serpOpportunities: SerpOpportunity[] = category.serpFocus.map((serp, index) => ({
    feature: serp.feature,
    status: index === 0 ? "Partial" : index === 1 ? "Missing" : "Owned",
    recommendation: template(serp.recommendation, context),
    supportingActions: [
      `Audit competitors' ${serp.feature.toLowerCase()} presence for positioning gaps.`,
      `Produce 3 ${serp.feature.toLowerCase()} assets aligned to ${request.primaryGoal.replace(/-/g, " ")}.`
    ]
  }));

  const roadmap: Roadmap = {
    quickWins: [
      {
        name: "SERP feature capture sprint",
        impact: "High",
        effort: "Low",
        description: "Optimize top landing pages with schema and FAQ to unlock rich result eligibility.",
        successMetric: "Increase SERP feature impressions by 20%"
      },
      {
        name: "Conversion-first content refresh",
        impact: "Medium",
        effort: "Low",
        description: "Rewrite top 5 pages with updated CTAs, trust proofs, and internal linking patterns.",
        successMetric: "Lift assisted conversions by 12%"
      }
    ],
    mediumTerm: [
      {
        name: "Authority asset program",
        impact: "High",
        effort: "Medium",
        description: "Launch data-led resources tailored to category influencers and partners.",
        successMetric: "Secure 15 new referring domains with DR 50+"
      },
      {
        name: "Topic cluster expansion",
        impact: "Medium",
        effort: "Medium",
        description: "Publish supporting articles around high-opportunity keyword clusters with structured internal linking.",
        successMetric: "Rank top 3 for 10 priority keywords"
      }
    ],
    strategicBets: [
      {
        name: "Owned audience engine",
        impact: "High",
        effort: "High",
        description: "Build a recurring multimedia series that fuels organic growth and email capture.",
        successMetric: "Grow engaged subscriber base to 10k"
      },
      {
        name: "Experience optimization roadmap",
        impact: "Medium",
        effort: "High",
        description: "Integrate CRO experiments with SEO landing pages for holistic performance lifts.",
        successMetric: "Improve organic conversion rate by 18%"
      }
    ]
  };

  const reporting: ReportingFramework = {
    dashboards: [
      {
        title: "Executive visibility pulse",
        frequency: "Weekly",
        metrics: [
          "Top keyword movement",
          "SERP feature share",
          "Organic-sourced pipeline / revenue"
        ]
      },
      {
        title: "Content impact rollup",
        frequency: "Bi-weekly",
        metrics: ["Cluster performance", "Content-assisted conversions", "Engagement depth"]
      },
      {
        title: "Authority & PR tracker",
        frequency: "Monthly",
        metrics: ["Referring domains", "Brand mentions", "Digital PR placements"]
      }
    ],
    notes: "Connect dashboards to experimentation logs and annotate releases to maintain narrative control."
  };

  const experiments: Experiment[] = category.experiments.map((experiment) => ({
    name: template(experiment.name, context),
    hypothesis: template(experiment.hypothesis, context),
    metric: experiment.metric,
    duration: "4-6 weeks"
  }));

  const automationTips = category.automationTips.map((tip) => template(tip, context));

  const keyMetrics = [
    {
      label: "Keyword universe coverage",
      current: `${baselineScore}% of priority terms indexed`,
      target: "Hit 90% coverage in 90 days"
    },
    {
      label: "Organic contribution",
      current: `${seededNumber(`${domain}-organic`, 18, 42)}% of pipeline`,
      target: "Grow to 50% with new mid-funnel content"
    },
    {
      label: "Authority delta",
      current: `-${Math.round(seededNumber(`${domain}-authority-delta`, 3, 15))} avg DR vs top competitor`,
      target: "Close gap within two quarters via digital PR"
    }
  ];

  const highlights = generateHighlights(request.primaryGoal, request.focusAreas, category).map((text) =>
    template(text, context)
  );

  const shareableInsights = [
    `Focus ${request.focusAreas.map((area) => area.replace(/-/g, " ")).join(", ")} initiatives around the ${category.name.toLowerCase()} playbook to accelerate wins.`,
    `Your ${GOAL_LIBRARY[request.primaryGoal].label.toLowerCase()} depends on owning ${keywordClusters
      .map((cluster) => cluster.cluster)
      .slice(0, 2)
      .join(" and ")}.`,
    `Translate analysis into a 30-60-90 roadmap anchored on ${roadmap.quickWins[0].name.toLowerCase()}.`
  ];

  return {
    id: `${domain}-${Date.now()}`,
    domain,
    generatedAt: new Date().toISOString(),
    category: category.name,
    headline: template(GOAL_LIBRARY[request.primaryGoal].headline, context),
    summary: template(
      `${GOAL_LIBRARY[request.primaryGoal].objective} Lean into ${category.notes}`,
      context
    ),
    highlights,
    baselineScore,
    objective: GOAL_LIBRARY[request.primaryGoal].objective,
    keyMetrics,
    scorecard,
    competitorBreakdown,
    keywordClusters,
    contentPlan,
    backlinkProspects,
    technicalChecklist,
    serpOpportunities,
    automationTips,
    roadmap,
    reporting,
    experiments,
    shareableInsights
  };
}
