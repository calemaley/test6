export interface ServiceInfo {
  id: string;
  title: string;
  shortDescription: string;
  highlights: string[];
  route: string;
}

export interface KnowledgeArticle {
  question: string;
  answer: string;
  tags: string[];
}

export interface TutorialStep {
  title: string;
  description: string;
}

export const companyInfo = {
  companyName: "JBRANKY LTD",
  botName: "JBRANKY Bot",
  tagline:
    "Powering a sustainable future with hydropower, large power systems, and Sollatek protection.",
  contact: {
    phone: "0726502349",
    email: "Jbrankyltd8@gmail.com",
    hq: "Nairobi, Kenya",
    responseTime: "We respond within 1 business day.",
  },
  services: [
    {
      id: "hydropower",
      title: "Hydropower Plant Solutions",
      shortDescription:
        "Feasibility, EPC delivery, and lifetime O&M support for small to mid-scale plants.",
      highlights: [
        "Hydrological feasibility studies and environmental impact assessments",
        "Engineering, procurement, and construction covering civil and electro-mechanical works",
        "Operations and maintenance with performance optimization and critical spares",
      ],
      route: "/services/hydropower",
    },
    {
      id: "medium-voltage",
      title: "Large Power & Medium-Voltage",
      shortDescription:
        "Design, build, commission, and safeguard substations and grid interconnections from 11kV to 132kV.",
      highlights: [
        "Design and build 11kV–132kV substations, cabling, grounding, and protection schemes",
        "Primary and secondary injection testing, relay programming, FAT/SAT, and commissioning",
        "Arc-flash studies, thermography, IEC compliance audits, and safety upgrades",
      ],
      route: "/services/medium-voltage",
    },
    {
      id: "sollatek",
      title: "Sollatek Protection & Power Quality",
      shortDescription:
        "Authorised Sollatek partner supplying AVS, stabilizers, and surge protection with 5-year warranty.",
      highlights: [
        "AVS 30 automatic voltage switchers and TV Guard surge protection",
        "Single and three-phase automatic voltage regulators and stabilizers",
        "Accessories such as MV cable terminations, testers, and turbine components",
      ],
      route: "/services/sollatek",
    },
  ] satisfies ServiceInfo[],
  tutorial: [
    {
      title: "Welcome",
      description:
        "Discover our key services, request a call back, or ask anything about JBRANKY LTD.",
    },
    {
      title: "Quick actions",
      description:
        "Use the quick buttons to request service details, book consultations, or ask for pricing guidance.",
    },
    {
      title: "Talk to a human",
      description:
        "Share your contact details and we will arrange a call back from the right specialist.",
    },
  ] satisfies TutorialStep[],
  knowledgeBase: [
    {
      question: "What services does JBRANKY LTD provide?",
      answer:
        "We deliver hydropower plant solutions end-to-end, large power and medium-voltage projects up to 132kV, and we are an authorised Sollatek partner supplying protection and power quality products.",
      tags: ["service", "overview"],
    },
    {
      question: "Tell me more about hydropower projects",
      answer:
        "Our hydropower team handles feasibility studies, yield forecasts, environmental assessments, full EPC delivery, and ongoing operations and maintenance to keep your plant performing reliably.",
      tags: ["service", "hydropower"],
    },
    {
      question: "Do you handle medium-voltage installations?",
      answer:
        "Yes. We design, build, and commission substations and grid interconnections from 11kV to 132kV, including protection studies, relay programming, and compliance audits.",
      tags: ["service", "medium-voltage"],
    },
    {
      question: "Which Sollatek products can I source?",
      answer:
        "We supply the full Sollatek range including AVS 30, TV Guard, SVS stabilizers, three-phase VoltRight AVR, and accessories such as MV cable terminations and ground resistance testers.",
      tags: ["service", "sollatek"],
    },
    {
      question: "How can I request a call back?",
      answer:
        "Click the call-back option, share your project context, and our team will reach you on 0726502349 or via email within one business day.",
      tags: ["contact", "callback"],
    },
    {
      question: "Where are you located?",
      answer:
        "Our head office is in Nairobi, Kenya, with teams supporting projects across the region.",
      tags: ["contact", "location"],
    },
    {
      question: "How fast do you respond?",
      answer:
        "We respond to new inquiries within one business day and provide project-specific timelines after the initial consultation.",
      tags: ["contact", "sla"],
    },
  ] satisfies KnowledgeArticle[],
} as const;
