export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export interface Project {
  slug: string;
  title: string;
  category: string;
  filterCategory: string;
  year: string;
  desc: string;
  longDesc: string;
  tech: string[];
  accentColor: string;
  preview: ProjectMedia;
  gallery?: ProjectMedia[];
  highlights: string[];
  results: { label: string; value: string }[];
  /** Real client work shown without the client's identity */
  confidential?: boolean;
  client?: { country: string; code?: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "uae-visa-consultancy-website",
    title: "Multilingual Website for a UAE Visa & Residency Consultancy",
    category: "Client Project · Web",
    filterCategory: "Web",
    year: "2026",
    desc: "Rebuilt a consultancy's WordPress site as a fast Next.js platform in 8 languages, with an admin panel for publishing articles and automatic translation.",
    longDesc:
      "A complete rebuild of a UAE visa and residency consultancy's website, moving it from WordPress to a custom Next.js codebase. The new site serves visitors in 8 languages including Arabic (right-to-left), lets the client publish articles without a developer, and a GitHub Actions workflow automatically translates every new article into all site languages and redeploys on Vercel. Client details are kept confidential.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "Framer Motion", "GitHub Actions", "Vercel"],
    accentColor: "#38BDF8",
    preview: { type: "image", src: "/projects/uae-visa-cover.webp", alt: "UAE visa consultancy website" },
    gallery: [
      { type: "image", src: "/projects/uae-visa-home.webp", alt: "Home page with animated hero (client details removed)" },
      { type: "image", src: "/projects/uae-visa-golden-visa.webp", alt: "Golden Visa page built from a shared service template" },
      { type: "image", src: "/projects/uae-visa-mainland.webp", alt: "Business setup page with pricing and licence details" },
    ],
    highlights: [
      "8 languages with a language switcher, including Arabic right-to-left",
      "Admin panel for publishing articles without a developer",
      "Automatic translation of new articles via GitHub Actions",
      "Golden Visa hub and route pages built from one shared template",
      "Animated sections, live counters and a daily-updating licence section",
      "All company details kept in a single typed data file",
    ],
    results: [
      { label: "Languages", value: "8" },
      { label: "Delivered", value: "Sep to Oct 2026" },
      { label: "Status", value: "Live & handed over" },
    ],
    confidential: true,
    client: { country: "UAE", code: "ae" },
  },
  {
    slug: "tyre-ecommerce-platform",
    title: "E-commerce Store & Admin Panel for an Online Tyre Retailer",
    category: "Client Project · E-commerce",
    filterCategory: "Web",
    year: "2026",
    desc: "An online tyre store for a company based in France, with a Next.js storefront, Django backend and an admin panel the team uses to run the business.",
    longDesc:
      "An e-commerce platform for a company based in France that sells tyres online. The customer-facing storefront is built with Next.js, the business logic and data live in a Django backend, and an admin panel connected to the website lets the company's team manage products, prices, news and orders, and every change appears on the storefront immediately. Client details are kept confidential.",
    tech: ["Next.js", "React", "Django", "Python", "REST API"],
    accentColor: "#FCD34D",
    preview: { type: "image", src: "/projects/tyre-cover.webp", alt: "Online tyre store" },
    gallery: [
      { type: "image", src: "/projects/tyre-shop-home.webp", alt: "Home page: shop by tyre category (client details removed)" },
      { type: "image", src: "/projects/tyre-shop-catalog.webp", alt: "Tyre catalogue with filters and add-to-cart" },
      { type: "image", src: "/projects/tyre-shop-news.webp", alt: "News and promotions managed from the admin panel" },
    ],
    highlights: [
      "Next.js storefront for browsing a large tyre catalogue",
      "Django backend serving products and orders through an API",
      "Admin panel connected to the website for day-to-day management",
      "Changes in the admin panel appear on the storefront instantly",
      "French-language storefront for the client's customers",
    ],
    results: [
      { label: "Stack", value: "Next.js + Django" },
      { label: "Delivered", value: "Nov 2025 to Feb 2026" },
      { label: "Scope", value: "Store + backend + admin" },
    ],
    confidential: true,
    client: { country: "France", code: "fr" },
  },
  {
    slug: "shopify-email-marketing-automation",
    title: "Shopify Email Marketing Automation",
    category: "Client Project · Automation",
    filterCategory: "AI & Automation",
    year: "2025",
    desc: "Zapier + Klaviyo lifecycle emails triggered by Shopify store events, built for a Shopify store owner in the USA.",
    longDesc:
      "A lifecycle email marketing automation for a US-based Shopify store owner. Shopify webhook events (cart creation, orders, customer inactivity) flow through Zapier and a Python transformation layer into Klaviyo, triggering personalised sequences for abandoned carts, post-purchase follow-ups, win-backs and browse abandonment within minutes of each customer action. Client details are kept confidential.",
    tech: ["Zapier", "Klaviyo", "Shopify API", "Python", "HTML email"],
    accentColor: "#34D399",
    preview: { type: "image", src: "/projects/shopify-automation-cover.webp", alt: "Shopify → Zapier → Klaviyo automation flow" },
    highlights: [
      "Real-time, event-driven email triggers via Shopify webhooks",
      "Abandoned cart sequence with product reminders",
      "Post-purchase follow-ups with cross-sell recommendations",
      "Win-back campaigns at 30 / 60 / 90 days of inactivity",
      "Python layer that normalises Shopify payloads and buffers events during flash sales",
      "A/B-testable subject lines and send timing in Klaviyo",
    ],
    results: [
      { label: "Abandoned carts recovered", value: "12%" },
      { label: "Repeat purchase rate", value: "18%" },
      { label: "Manual work", value: "Zero · runs 24/7" },
    ],
    confidential: true,
    client: { country: "USA", code: "us" },
  },
  {
    slug: "financial-model-kpi-dashboard",
    title: "Financial Model & KPI Dashboard for a Steel Fabrication Company",
    category: "Client Project · Data & Analytics",
    filterCategory: "Custom",
    year: "2025",
    desc: "A “Financial X-Ray” model that turns a fabrication company's monthly P&L into margins, cash flow, a weighted sales pipeline, a what-if simulator and a 7-chart dashboard.",
    longDesc:
      "A financial decision-support model for an international steel fabrication and installation company with three divisions. From the company's Profit & Loss data across six cost categories, the model calculates monthly performance, forecasts the next 12 months, values the sales pipeline by win probability, and lets management test what-if changes to labor efficiency, material costs and headcount, all summarised on one KPI dashboard, with a data table ready for Power BI. Client details are kept confidential.",
    tech: ["Excel", "Financial Modeling", "What-If Analysis", "Named Ranges", "Excel Charts", "Power BI-ready data"],
    accentColor: "#FB923C",
    preview: { type: "image", src: "/projects/financial-model-cover.webp", alt: "Financial X-Ray KPI dashboard (sample data)" },
    highlights: [
      "Monthly revenue and cost breakdown across six cost categories",
      "Gross profit, margin %, breakeven revenue, cash flow and labor efficiency per month",
      "Sales pipeline weighted by win probability, rolled up by quarter",
      "What-if simulator for labor efficiency, material cost and headcount",
      "Dashboard with 7 charts including a 12-month forecast",
      "Long-format data table prepared for Power BI",
    ],
    results: [
      { label: "Dashboard charts", value: "7" },
      { label: "Forecast horizon", value: "12 months" },
      { label: "Scenario testing", value: "Live what-if" },
    ],
    confidential: true,
    client: { country: "International" },
  },
  {
    slug: "ai-research-automation-platform",
    title: "AI Research Automation Platform",
    category: "Artificial Intelligence",
    filterCategory: "AI",
    year: "2026",
    desc: "Multi-agent AI platform that automates research, analysis, and report generation with human approval workflows.",
    longDesc:
      "An enterprise-grade research automation platform powered by LangGraph and FastAPI. The system coordinates multiple AI agents to plan research tasks, gather information from the web, analyze findings, identify knowledge gaps, and generate structured reports with citations. A human-in-the-loop workflow ensures quality and control before final report delivery.",
    tech: ["Python", "LangGraph", "FastAPI", "Groq", "Tavily", "PostgreSQL"],
    accentColor: "#8B5CF6",
    preview: {
      type: "image",
      src: "/projects/r.png",
      alt: "AI Research Automation Platform",
    },
    gallery: [
      { type: "image", src: "/projects/r1.png", alt: "Planner workflow" },
      { type: "image", src: "/projects/r2.png", alt: "Generated report" },
      { type: "image", src: "/projects/r3.png", alt: "Generated report" },
      { type: "image", src: "/projects/r4.png", alt: "Generated report" },
    ],
    highlights: [
      "Multi-agent orchestration",
      "Human-in-the-loop approval",
      "Automated web research",
      "AI-generated reports with citations",
    ],
    results: [
      { label: "AI Agents", value: "4" },
      { label: "Research Workflow", value: "Automated" },
      { label: "Report Quality", value: "Citation-Based" },
    ],
  },
  {
    slug: "enterprise-knowledge-platform",
    title: "Enterprise Knowledge Platform",
    category: "Artificial Intelligence",
    filterCategory: "AI",
    year: "2026",
    desc: "Enterprise document intelligence platform using Retrieval-Augmented Generation for accurate AI-powered knowledge retrieval.",
    longDesc:
      "A Retrieval-Augmented Generation platform enabling organizations to search and interact with internal documents through natural language. Documents are processed, embedded, and stored in a vector database, allowing AI to provide accurate answers with source citations while reducing hallucinations.",
    tech: ["Python", "FastAPI", "LangChain", "Qdrant", "Groq", "PostgreSQL"],
    accentColor: "#3B82F6",
    preview: {
      type: "image",
      src: "/projects/rag.png",
      alt: "Enterprise Knowledge Platform",
    },
    highlights: [
      "Document ingestion pipeline",
      "Vector search with Qdrant",
      "AI-powered question answering",
      "Source citations for every response",
    ],
    results: [
      { label: "Vector Search", value: "Semantic" },
      { label: "Document Support", value: "PDF" },
      { label: "Response Accuracy", value: "Citation-Based" },
    ],
  },
  {
    slug: "resume-screener",
    title: "Infra - AI Resume Screener for Recruiters",
    category: "Web Development",
    filterCategory: "Web",
    year: "2025",
    desc: "AI-powered recruitment platform that automatically analyzes resumes, matches candidates to job descriptions, and explains hiring decisions using LLMs.",

    longDesc:
      "Infra is an intelligent AI Resume Screener built to streamline the recruitment process. Recruiters can upload resumes individually or in bulk along with a job description. The system extracts structured candidate information, evaluates skills and experience against job requirements using Large Language Models, generates match scores with detailed reasoning, and ranks applicants automatically. The platform significantly reduces manual screening time while providing transparent AI-generated hiring insights.",

    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "OpenAI",
      "LangChain",
      "PostgreSQL",
      "Docker",
      "Redis",
      "TailwindCSS"
    ],

    accentColor: "#2563EB",

    preview: {
      type: "video",
      src: "/projects/infra.mp4",
    },



    highlights: [
      "AI-powered resume parsing",
      "Job description matching",
      "Candidate ranking & scoring",
      "Explainable AI hiring insights",
      "Bulk resume processing",
      "Skill gap analysis",
      "Recruiter dashboard",
      "FastAPI REST APIs",
      "Structured candidate extraction",
      "Production-ready architecture"
    ],

    results: [
      {
        label: "Candidate ranking",
        value: "Automated"
      },
      {
        label: "Resume processing",
        value: "<10 sec"
      },
      {
        label: "Supported resumes",
        value: "1000+"
      }
    ]
  },
  {
    slug: "deepfake-detection",
    title: "AI Deepfake Detection System",
    category: "Web Development",
    filterCategory: "Web",
    year: "2025",

    desc: "AI-powered deepfake detection system that identifies manipulated videos using ConvNeXt-Tiny and provides visual explanations through Grad-CAM.",

    longDesc:
      "DeepFake detector is an AI-based deepfake detection system designed to identify manipulated facial videos using deep learning. The system extracts representative video frames, preprocesses facial regions, and classifies videos as real or fake using a fine-tuned ConvNeXt-Tiny model. To improve transparency and trust, Grad-CAM visualizations highlight the regions that influenced the model's prediction, enabling users to understand why a video was classified as manipulated. The project focuses entirely on visual analysis without relying on audio or lip-sync features.",

    tech: [
      "Python",
      "PyTorch",
      "ConvNeXt-Tiny",
      "OpenCV",
      "Grad-CAM",
      "NumPy",
      "Pandas",
      "Matplotlib"
    ],

    accentColor: "#7C3AED",

    preview: {
      type: "image",
      src: "/projects/deepfake-detection.png",
      alt: "Deepfake Detection Dashboard"
    },

    gallery: [
      {
        type: "image",
        src: "/projects/deepfake-upload.png",
        alt: "Video Upload Interface"
      },
      {
        type: "image",
        src: "/projects/deepfake-prediction.png",
        alt: "Prediction Result"
      },
      {
        type: "image",
        src: "/projects/gradcam-result.png",
        alt: "Grad-CAM Visualization"
      }
    ],

    highlights: [
      "Visual-only deepfake detection",
      "ConvNeXt-Tiny transfer learning",
      "Frame extraction using OpenCV",
      "Video classification (Real/Fake)",
      "Grad-CAM explainability",
      "Automated preprocessing pipeline",
      "Face-focused visual analysis",
      "Model evaluation with standard metrics",
      "GPU-accelerated inference",
      "Research-oriented architecture"
    ],

    results: [
      {
        label: "Detection",
        value: "Real / Fake"
      },
      {
        label: "Explainability",
        value: "Grad-CAM"
      },
      {
        label: "Input",
        value: "Video Frames"
      }
    ]
  },
  {
    slug: "operations-automation-dashboard",
    title: "Operations Automation Dashboard",
    category: "AI & Automation",
    filterCategory: "AI & Automation",
    year: "2025",
    desc: "Automated lead qualification and reporting pipeline built with n8n, Python and Gmail.",
    longDesc:
      "An intelligent operations hub that connects Gmail, CRM data, and reporting tools via n8n. Leads are scored automatically and weekly reports are generated without manual effort.",
    tech: ["n8n", "Python", "React", "Gmail API"],
    accentColor: "#2DD4BF",
    preview: {
      type: "image",
      src: "/projects/automation1.png",
      alt: "Automation dashboard preview",
    },
    highlights: [
      "n8n workflow automation",
      "AI lead scoring",
      "Automated weekly reports",
      "Real-time ops metrics",
    ],
    results: [
      { label: "Lead qualification", value: "Automated" },
      { label: "Reporting", value: "Scheduled" },
      { label: "Built with", value: "n8n + Python" },
    ],
  },
  {
    slug: "ai-fitness-app",
    title: "FitAI - AI Fitness & Gym Assistant",
    category: "Mobile Development",
    filterCategory: "Mobile",
    year: "2025",

    desc: "AI-powered Flutter fitness app that creates personalized workout plans, tracks progress, and helps users achieve their fitness goals.",

    longDesc:
      "FitAI is a cross-platform fitness application built with Flutter for Android and iOS. The app uses AI to generate personalized workout recommendations based on user goals, fitness level, and available equipment. Users can track workouts, monitor progress, view exercise demonstrations, and receive intelligent suggestions to improve consistency and performance. Firebase powers authentication, cloud storage, and real-time synchronization across devices.",

    tech: [
      "Flutter",
      "Dart",
      "Firebase",
      "REST API",
      "Provider",
      "SQLite"
    ],

    accentColor: "#22C55E",

    preview: {
      type: "image",
      src: "/projects/fitai-preview.png",
      alt: "FitAI Mobile App Dashboard"
    },

    gallery: [
      {
        type: "image",
        src: "/projects/nutrition.png",
        alt: "Workout Dashboard"
      },
      {
        type: "image",
        src: "/projects/fitai-workout.png",
        alt: "Personalized Workout Plan"
      },
      {
        type: "image",
        src: "/projects/fitai-progress.png",
        alt: "Fitness Progress Tracking"
      },
      {
        type: "image",
        src: "/projects/community.png",
        alt: "Fitness Community"
      }
    ],

    highlights: [
      "AI-generated workout plans",
      "Personalized fitness recommendations",
      "Exercise library with demonstrations",
      "Workout progress tracking",
      "BMI & fitness goal management",
      "Daily activity dashboard",
      "Firebase authentication",
      "Cloud data synchronization",
      "Cross-platform Flutter application",
      "Responsive mobile UI"
    ],

    results: [
      {
        label: "Platforms",
        value: "Android + iOS"
      },
      {
        label: "Workout Plans",
        value: "AI Personalized"
      },
      {
        label: "Progress",
        value: "Real-time Tracking"
      }
    ]
  },
  {
    slug: "wanderblaze",
    title: "WanderBlaze - AI Travel Planning Platform",
    category: "Web Development",
    filterCategory: "Web",
    year: "2025",

    desc: "Modern travel platform that helps users discover destinations, plan trips, and explore curated travel experiences.",

    longDesc:
      "WanderBlaze is a modern travel planning platform designed to simplify trip discovery and itinerary planning. Users can explore destinations, browse curated travel packages, view detailed information about attractions, and organize personalized trips through an intuitive interface. Built with a responsive, performance-focused architecture, the platform delivers a seamless experience across desktop and mobile devices.",

    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "React",
      "Framer Motion",
      "Supabase"
    ],

    accentColor: "#0EA5E9",

    preview: {
      type: "video",
      src: "/projects/wanderblaze.mp4",
    },

    highlights: [
      "Destination discovery",
      "Interactive travel packages",
      "Personalized itinerary planning",
      "Responsive UI/UX",
      "Advanced destination search",
      "Modern animations with Framer Motion",
      "SEO-optimized pages",
      "Performance-focused architecture",
      "Mobile-friendly design",
      "Scalable component architecture"
    ],

    results: [
      {
        label: "Platform",
        value: "Responsive"
      },
      {
        label: "Experience",
        value: "Interactive"
      },
      {
        label: "Performance",
        value: "Optimized"
      }
    ]
  },

  {
    slug: "business-intelligence-dashboard",
    title: "Business Intelligence Dashboards",
    category: "Data Analytics",
    filterCategory: "Custom",
    year: "2025",
    desc: "Real-time KPI dashboard pulling from multiple data sources with automated weekly reports.",
    longDesc:
      "A Metabase-powered BI dashboard aggregating sales, marketing, and operations data. Automated ETL pipelines and scheduled email reports keep stakeholders informed.",
    tech: ["Python", "Metabase", "PostgreSQL", "Power BI", "Looker Studio"],
    accentColor: "#34D399",
    preview: {
      type: "image",
      src: "/projects/3.jpg",
      alt: "BI dashboard preview",
    },
    gallery: [
      { type: "image", src: "/projects/2.jpg", alt: "retailsails view" },
      { type: "image", src: "/projects/1.jpg", alt: "supplychain dashboard" },
    ],
    highlights: [
      "Multi-source ETL pipelines",
      "Interactive KPI dashboards",
      "Automated weekly reports",
      "Real-time data sync",
    ],
    results: [
      { label: "Dashboards", value: "Retail & supply chain" },
      { label: "Reporting", value: "Automated weekly" },
      { label: "Built with", value: "Power BI + SQL" },
    ],
  },

];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
