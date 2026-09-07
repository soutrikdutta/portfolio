/**
 * Portfolio Configuration
 * 
 * Central place for all personal information, links, projects, skills, and journey items.
 * Edit this file to update any text or add real experiences anytime.
 */

export interface JourneyItem {
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface ProjectItem {
  id: string; // e.g. "01"
  title: string;
  tagline: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface AchievementItem {
  title: string;
  category: string;
  date: string;
  description: string;
  highlight?: string;
  link?: string;
  linkLabel?: string;
  imageUrl?: string;
  images?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  skills?: string[];
  imageUrl?: string;
  certificateUrl?: string;
}


export const portfolioConfig = {
  personal: {
    name: "Soutrik Dutta",
    eyebrow: "ENGINEERING STUDENT · DEVELOPER",
    headline: "Hi, I'm Soutrik Dutta",
    intro: "Engineering student building websites, apps, and software with clean code.",
    location: "Kolkata, India",
    currentStatus: "Open for opportunities & collaborations",
    timezone: "Asia/Kolkata",
    avatarUrl: "/profile.jpg",
  },

  about: {
    bio: [
      "I’m a B.Tech student at Techno India University, exploring technology through web development, coding, and hands-on projects.",
      "I enjoy turning ideas into websites and applications using clean, efficient code and modern tools like generative AI.",
      "Currently, I’m focused on learning, experimenting with new technologies, and building things that genuinely interest me."
    ],
    metadata: [
      { label: "Based in", value: "India" },
      { label: "Currently", value: "B.Tech Student (TIU)" },
      { label: "Focus", value: "Web & Software Development" },
      { label: "Interests", value: "Web Dev, Coding, Generative AI" }
    ]
  },

  journey: [
    {
      year: "2025",
      title: "Completed Schooling",
      institution: "St. Stephen's School, Dum Dum",
      description: "Finished 12th grade in 2025."
    },
    {
      year: "2026",
      title: "Started B.Tech",
      institution: "Techno India University",
      description: "Pursuing B.Tech in Computer Science (2026–2029)."
    },
    {
      year: "2026 — Present",
      title: "Learning & Building",
      institution: "Hands-on Projects",
      description: "Practicing coding, exploring new tools, and building projects."
    }
  ] as JourneyItem[],

  projects: [
    {
      id: "01",
      title: "SkillGrad",
      tagline: "High-performance web platform connecting students with paid industry projects and real-world internship opportunities.",
      technologies: ["React", "Firebase", "Cloud Firestore", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/soutrikdutta/skillgrad",
      liveUrl: "https://skillgrad.vercel.app",
      featured: true
    }
  ] as ProjectItem[],

  skills: [
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
    "Firebase",
    "Supabase",
    "Node.js"
  ],

  achievements: [
    {
      title: "Smart Bus — Sandbox CCU 2025",
      category: "Innovation & Smart Transit",
      date: "2025",
      description: "Worked with the Techno India University team on a smart public-transportation concept designed to make city travel more efficient, accessible, and sustainable. The project was developed as part of Sandbox CCU, focused on reimagining everyday challenges through practical innovation.",
      highlight: "Sandbox CCU · Techno India University",
      link: "https://technotimes.info/index.php/2025/09/12/smart-bus-by-xen-club-at-sandbox-ccu-a-new-era-of-city-travel/",
      linkLabel: "Read Article",
      imageUrl: "/achievements/smart-bus-1.jpg",
      images: [
        "/achievements/smart-bus-1.jpg",
        "/achievements/smart-bus-2.jpg"
      ]
    },
    {
      title: "SkillGrad — Hult Prize 2026",
      category: "Competition & Innovation",
      date: "2026",
      description: "Second Runner-Up at the Hult Prize 2026 at Techno India University. SkillGrad is an AI-powered platform connecting students with paid, real-world micro-internships, helping them gain practical experience, build professional portfolios, and improve job readiness.",
      highlight: "Second Runner-Up · Techno India University",
      link: "https://technotimes.info/index.php/2026/03/05/hult-prize-2025-at-techno-india-university-student-startups-driving-sustainable-innovation/",
      linkLabel: "Read Article",
      imageUrl: "/achievements/hult-prize-1.jpg",
      images: [
        "/achievements/hult-prize-1.jpg",
        "/achievements/hult-prize-2.jpg"
      ]
    }
  ] as AchievementItem[],

  certifications: [
    {
      title: "Build a Secure Google Cloud Network",
      issuer: "Google Cloud",
      date: "2026",
      credentialId: "6a694a24-d6c0-4423-9271-fcff2dc46187",
      link: "https://www.credly.com/badges/6a694a24-d6c0-4423-9271-fcff2dc46187/public_url",
      imageUrl: "/certifications/google-cloud-badge.png"
    },
    {
      title: "Implement Load Balancing on Compute Engine",
      issuer: "Google Cloud",
      date: "2026",
      credentialId: "4d85a1f3-b393-47ac-84bf-21eec6469a29",
      link: "https://www.credly.com/badges/4d85a1f3-b393-47ac-84bf-21eec6469a29/public_url",
      imageUrl: "/certifications/google-cloud-load-balancing.png"
    },
    {
      title: "Prepare Data for ML APIs on Google Cloud",
      issuer: "Google Cloud",
      date: "2026",
      credentialId: "8f8f81da-729e-4fb9-bb62-01cdbce57c06",
      link: "https://www.credly.com/badges/8f8f81da-729e-4fb9-bb62-01cdbce57c06/public_url",
      imageUrl: "/certifications/google-cloud-ml-apis.png"
    },
    {
      title: "Set Up an App Dev Environment on Google Cloud",
      issuer: "Google Cloud",
      date: "2026",
      credentialId: "af945efe-dddb-47f8-9dea-de62b43b9748",
      link: "https://www.credly.com/badges/af945efe-dddb-47f8-9dea-de62b43b9748/public_url",
      imageUrl: "/certifications/google-cloud-app-dev.png"
    },
    {
      title: "Gemini Certified Student (University)",
      issuer: "Google for Education",
      date: "2026",
      credentialId: "191821849",
      link: "https://edu.google.accredible.com/bc85c8d6-8c35-4f7d-bc51-5db15dca90d6",
      imageUrl: "/certifications/gemini-certified-student-badge.png",
      certificateUrl: "/certifications/gemini-certified-student-cert.png"
    }
  ] as CertificationItem[],

  certificationsUrl: "https://www.linkedin.com/in/soutrik-dutta-245b93372/details/certifications/",

  contact: {
    heading: "Let's build something.",
    subtext: "Have an idea, opportunity, or just want to say hello?",
    email: "2006soutrik@gmail.com",
    phone: "+918902281688", // Direct mobile dialer link
    phoneDisplay: "+91 89022 81688",
    socialLinks: {
      github: "https://github.com/soutrikdutta",
      linkedin: "https://www.linkedin.com/in/soutrik-dutta-245b93372/",
      emailLink: "mailto:2006soutrik@gmail.com"
    },
    // Optional Web3Forms or Formspree access key from env or fallback
    formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "https://api.web3forms.com/submit",
    web3FormsKey: import.meta.env.VITE_WEB3FORMS_KEY || ""
  },

  footer: {
    year: 2026,
    author: "Soutrik Dutta",
  }
};
