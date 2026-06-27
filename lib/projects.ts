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
}

export const PROJECTS: Project[] = [
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
        label: "Resume screening time",
        value: "-90%"
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
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    category: "Web Development",
    filterCategory: "Web",
    year: "2025",
    desc: "Full-featured online store with product management, Stripe payments, and custom admin dashboard.",
    longDesc:
      "A production-ready e-commerce platform built for a retail client in Pakistan. Includes inventory management, Stripe checkout, order tracking, and a custom admin dashboard for day-to-day operations.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "TailwindCSS"],
    accentColor: "#38BDF8",
    preview: {
      type: "image",
      src: "/projects/ecommerce.png",
      alt: "E-Commerce Platform dashboard preview",
    },
    gallery: [
      { type: "image", src: "/projects/ecommerce-preview.svg", alt: "Storefront view" },
      { type: "image", src: "/projects/ecommerce-admin.svg", alt: "Admin dashboard" },
    ],
    highlights: [
      "Stripe payment integration",
      "Custom admin dashboard",
      "SEO-optimized product pages",
      "Mobile-first checkout flow",
    ],
    results: [
      { label: "Page load", value: "<1.2s" },
      { label: "Checkout conversion", value: "+34%" },
      { label: "Admin tasks automated", value: "60%" },
    ],
  },
  {
    slug: "operations-automation-dashboard",
    title: "Operations Automation Dashboard",
    category: "AI & Automation",
    filterCategory: "AI & Automation",
    year: "2025",
    desc: "Automated lead qualification and reporting pipeline, reducing manual work by 60%.",
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
      { label: "Manual work reduced", value: "60%" },
      { label: "Report generation", value: "Automated" },
      { label: "Lead response time", value: "<2h" },
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
      { label: "Data sources", value: "5+" },
      { label: "Report time saved", value: "8h/week" },
      { label: "Decision speed", value: "+40%" },
    ],
  },
  
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
