export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  imageType: 'workspace' | 'genai';
  images?: string[];
  imageCaptions?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  award: string;
  issuer: string;
  date: string;
  description: string;
  highlight: string;
  imageType: 'trophy' | 'code' | 'scholar';
  articleUrl?: string;
  image?: string;
  images?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
  category: 'Web Dev' | 'AI & Data' | 'Cloud & AI' | 'Computer Science';
  imageUrl?: string;
  certificateUrl?: string;
}


export interface CompactSkill {
  name: string;
  shortName: string;
  icon: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Soutrik Dutta',
    email: '2006soutrik@gmail.com',
    phone: '+91 89022 81688',
    location: 'India',
    role: 'B.Tech Student (TIU)',
    focus: 'Web Dev and Software Development',
    interests: 'Web Dev, Coding, Gen AI',
    tagline: 'I turn ideas into modern, functional digital experiences.',
    about: [
      "I’m a B.Tech student at Techno India University, exploring technology through web development, coding, and hands-on projects.",
      "I enjoy turning ideas into websites and applications using clean, efficient code and modern tools like generative AI.",
      "Currently, I’m focused on learning, experimenting with new technologies, and building things that genuinely interest me."
    ],
    social: {
      github: 'https://github.com/soutrikdutta',
      linkedin: 'https://www.linkedin.com/in/soutrik-dutta-245b93372/',
      email: 'mailto:2006soutrik@gmail.com',
      phone: 'tel:+918902281688'
    }
  },

  // Max 5-6 words per milestone as explicitly instructed
  journey: [
    {
      year: '2025',
      title: "St. Stephen's School, Dum Dum",
      shortLine: 'Finished 12th grade in 2025.',
      isActive: false
    },
    {
      year: '2026',
      title: 'Techno India University',
      shortLine: 'Pursuing B.Tech in Computer Science (2026–2029).',
      isActive: true
    },
    {
      year: '2026 — Present',
      title: 'Hands-on Projects',
      shortLine: 'Practicing coding, exploring new tools, and building projects.',
      isActive: true
    }
  ],

  projects: [
    {
      id: 'project-1',
      title: 'SkillGrad',
      subtitle: 'Paid industry projects & student internship platform',
      description: 'High-performance web platform connecting students with paid industry projects and real-world internship opportunities.',
      longDescription: 'SkillGrad connects aspiring student developers to paid real-world projects. Features automated application routing, talent profiles, and portfolio verification workflows.',
      tags: ['React', 'Firebase', 'Cloud Firestore', 'Tailwind CSS', 'Vite'],
      features: [
        'Curated paid student micro-internship listings',
        'Direct recruiter dispatch and application tracking',
        'Live talent verification and rating telemetry',
        'Optimized client cache with real-time Firestore sync'
      ],
      liveUrl: 'https://skillgrad.vercel.app',
      githubUrl: 'https://github.com/soutrikdutta/skillgrad',
      imageType: 'workspace',
      images: [
        '/projects/skillgrad/slide-1.png',
        '/projects/skillgrad/slide-2.png',
        '/projects/skillgrad/slide-3.png',
        '/projects/skillgrad/slide-4.png',
        '/projects/skillgrad/slide-5.png',
        '/projects/skillgrad/slide-6.png'
      ],
      imageCaptions: [
        'Turn Your Skills Into Paid Experience (Landing Hero)',
        'Candidate Profile Registration & Student Talent Pool',
        'Cryptographic Certificate Verification System',
        'Recruiter & Employer Workspace (Openings)',
        'Official Credential Minting & Serial Generator',
        'Verified Certificate of Completion Export (Rahul Mishra)'
      ]
    },
    {
      id: 'project-2',
      title: 'SHARODSHAV',
      subtitle: 'Smart Durga Puja pandal planner & Kolkata route HUD',
      description: 'A smart Durga Puja planning platform that helps users discover pandals, plan visits, explore nearby places, and navigate the festivities more efficiently.',
      longDescription: 'Built during the HackRIT 24-Hour Hackathon under DEVx 2.0 at TIU. Integrates interactive map coordinate clustering, crowd density indicators, and nearby metro station routing.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Geolocation API', 'Vite'],
      features: [
        'Interactive Kolkata pandal radar HUD with route timing',
        'Crowd surge alerts and optimal transit recommendations',
        'Curated heritage pandal architectural guides',
        'Offline pandal bookmarking and itinerary sharing'
      ],
      liveUrl: 'https://sharodshav-two.vercel.app',
      githubUrl: 'https://github.com/soutrikdutta/sharodshava-pujo-planner',
      imageType: 'genai',
      images: [
        '/projects/sharodshav/slide-1.png',
        '/projects/sharodshav/slide-2.png',
        '/projects/sharodshav/slide-3.png',
        '/projects/sharodshav/slide-4.png',
        '/projects/sharodshav/slide-5.png'
      ],
      imageCaptions: [
        'Aagomoni Live Countdown HUD & Nearest Pandal Radar',
        'Saptami Pandal Trail & Regional Zone Selection',
        'Live Pujo Squad // Google-Authenticated Friend Sync',
        'Confirmed Route & Hopping Sequence with Dining Spots',
        'Real-Time Google Maps Navigation with Live Traffic'
      ]
    }
  ] as Project[],

  // Compact skills: just name & logo as requested
  compactSkills: [
    { name: 'HTML5', shortName: 'HTML', icon: 'html' },
    { name: 'CSS3', shortName: 'CSS', icon: 'css' },
    { name: 'JavaScript', shortName: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', shortName: 'TypeScript', icon: 'typescript' },
    { name: 'React', shortName: 'React', icon: 'react' },
    { name: 'Next.js', shortName: 'Next.js', icon: 'nextjs' },
    { name: 'Tailwind CSS', shortName: 'Tailwind', icon: 'tailwind' },
    { name: 'Node.js', shortName: 'Node.js', icon: 'nodejs' },
    { name: 'Python', shortName: 'Python', icon: 'python' },
    { name: 'Gen AI', shortName: 'Gen AI', icon: 'ai' },
    { name: 'Git & GitHub', shortName: 'Git', icon: 'git' },
    { name: 'SQL', shortName: 'SQL', icon: 'database' }
  ] as CompactSkill[],

  achievements: [
    {
      id: 'ach-1',
      title: 'SHARODSHAV — HackRIT 24-Hour Hackathon',
      award: '2nd Prize Winner',
      issuer: 'DEVX 2.0 x GDG on campus TIU',
      date: '2026',
      description: 'Developed SHARODSHAV, a smart Durga Puja planning platform that helps users discover pandals, plan their visits, explore nearby places, and navigate the festivities more efficiently. Built during HackRIT, a 24-hour hackathon under DEVx 2.0 at Techno India University.',
      highlight: 'Team Tristack Overflow · 2nd Prize',
      imageType: 'trophy',
      articleUrl: 'https://technotimes.info/index.php/2026/09/17/devx-2-0-techno-india-university',
      image: '/achievements/hackrit-trophy.jpg',
      images: [
        '/achievements/hackrit-trophy.jpg',
        '/achievements/hackrit-stage.jpg'
      ]
    },
    {
      id: 'ach-2',
      title: 'Smart Bus — Sandbox CCU 2025',
      award: 'Certificate of Excellence',
      issuer: 'Sandbox CCU · Techno India University',
      date: '2025',
      description: 'Worked with the Techno India University team on a smart public-transportation concept designed to make city travel more efficient, accessible, and sustainable. The project was developed as part of Sandbox CCU, focused on reimagining everyday challenges through practical innovation.',
      highlight: 'XEN Club · Top Performing Team',
      imageType: 'scholar',
      articleUrl: 'https://technotimes.info/index.php/2025/09/12/smart-bus-by-xen-club-at-sandbox-ccu-a-new-era-of-city-travel',
      image: '/achievements/sandbox-certificate.png',
      images: [
        '/achievements/sandbox-certificate.png',
        '/achievements/sandbox-stage.jpg'
      ]
    },
    {
      id: 'ach-3',
      title: 'SkillGrad — Hult Prize 2026',
      award: 'Second Runner-Up',
      issuer: 'Techno India University',
      date: '2026',
      description: 'Second Runner-Up at the Hult Prize 2026 at Techno India University. SkillGrad is an AI-powered platform connecting students with paid, real-world micro-internships, helping them gain practical experience, build professional portfolios, and improve job readiness.',
      highlight: 'Hult Prize · 2nd Runners Up',
      imageType: 'trophy',
      articleUrl: 'https://technotimes.info/index.php/2026/03/05/hult-prize-2025-at-techno-india-university-student-startups-driving-sustainable-innovation/',
      image: '/achievements/hult-certificate.png',
      images: [
        '/achievements/hult-certificate.png',
        '/achievements/hult-stage.jpg'
      ]
    }
  ] as Achievement[],

  certifications: [
    {
      id: 'cert-1',
      title: 'Build a Secure Google Cloud Network',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: '6a694a24-d6c0-4423-9271-fcff2dc46187',
      verifyUrl: 'https://www.credly.com/badges/6a694a24-d6c0-4423-9271-fcff2dc46187/public_url',
      imageUrl: '/certifications/google-cloud-badge.png',
      certificateUrl: '/certifications/google-cloud-network-cert.png',
      skills: ['Cloud Networking', 'VPC', 'Cloud Security', 'Google Cloud'],
      category: 'Cloud & AI'
    },
    {
      id: 'cert-2',
      title: 'Implement Load Balancing on Compute Engine',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: '4d85a1f3-b393-47ac-84bf-21eec6469a29',
      verifyUrl: 'https://www.credly.com/badges/4d85a1f3-b393-47ac-84bf-21eec6469a29/public_url',
      imageUrl: '/certifications/google-cloud-load-balancing.png',
      certificateUrl: '/certifications/google-cloud-load-balancing-cert.png',
      skills: ['Compute Engine', 'Load Balancing', 'Traffic Management', 'Google Cloud'],
      category: 'Cloud & AI'
    },
    {
      id: 'cert-3',
      title: 'Prepare Data for ML APIs on Google Cloud',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: '8f8f81da-729e-4fb9-bb62-01cdbce57c06',
      verifyUrl: 'https://www.credly.com/badges/8f8f81da-729e-4fb9-bb62-01cdbce57c06/public_url',
      imageUrl: '/certifications/google-cloud-ml-apis.png',
      certificateUrl: '/certifications/google-cloud-ml-apis-cert.png',
      skills: ['Machine Learning', 'Cloud ML APIs', 'Data Processing', 'Google Cloud'],
      category: 'AI & Data'
    },
    {
      id: 'cert-4',
      title: 'Set Up an App Dev Environment on Google Cloud',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: 'af945efe-dddb-47f8-9dea-de62b43b9748',
      verifyUrl: 'https://www.credly.com/badges/af945efe-dddb-47f8-9dea-de62b43b9748/public_url',
      imageUrl: '/certifications/google-cloud-app-dev.png',
      certificateUrl: '/certifications/google-cloud-app-dev-cert.png',
      skills: ['App Development', 'Cloud Run', 'DevOps', 'Google Cloud'],
      category: 'Web Dev'
    },
    {
      id: 'cert-5',
      title: 'Gemini Certified Student (University)',
      issuer: 'Google for Education',
      issueDate: '2026',
      credentialId: '191821849',
      verifyUrl: 'https://edu.google.accredible.com/bc85c8d6-8c35-4f7d-bc51-5db15dca90d6',
      imageUrl: '/certifications/gemini-certified-student-badge.png',
      certificateUrl: '/certifications/gemini-certified-student-cert.png',
      skills: ['Gemini', 'Generative AI', 'Prompt Engineering', 'AI Literacy'],
      category: 'AI & Data'
    },
    {
      id: 'cert-6',
      title: 'Ultimate Web Development Course 2025 - Build Modern Websites',
      issuer: 'Udemy · Haris Ali Khan',
      issueDate: '2025',
      credentialId: 'UC-f67b060d-d1fc-424d-a902-5f555fe23cc8',
      verifyUrl: 'https://www.udemy.com/certificate/UC-f67b060d-d1fc-424d-a902-5f555fe23cc8',
      imageUrl: '/certifications/udemy-badge.svg',
      certificateUrl: '/certifications/udemy-web-dev-cert.jpg',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
      category: 'Web Dev'
    },
    {
      id: 'cert-7',
      title: 'Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: '24845481',
      verifyUrl: 'https://www.skills.google/public_profiles/48e37d2b-91ed-47b9-82ab-806d65d237c2/badges/24845481',
      imageUrl: '/certifications/google-cloud-foundations-data-ml-ai.png',
      certificateUrl: '/certifications/google-cloud-foundations-data-ml-ai.png',
      skills: ['Cloud Computing', 'Big Data', 'Machine Learning', 'AI', 'Google Cloud'],
      category: 'Cloud & AI'
    },
    {
      id: 'cert-8',
      title: 'Google Cloud Computing Foundations: Networking and Security in Google Cloud',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: '24838467',
      verifyUrl: 'https://www.skills.google/public_profiles/48e37d2b-91ed-47b9-82ab-806d65d237c2/badges/24838467',
      imageUrl: '/certifications/google-cloud-foundations-networking-security.png',
      certificateUrl: '/certifications/google-cloud-foundations-networking-security.png',
      skills: ['Cloud Networking', 'Cloud Security', 'VPC', 'IAM', 'Google Cloud'],
      category: 'Cloud & AI'
    },
    {
      id: 'cert-9',
      title: 'Google Cloud Computing Foundations: Infrastructure in Google Cloud',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: '24829882',
      verifyUrl: 'https://www.skills.google/public_profiles/48e37d2b-91ed-47b9-82ab-806d65d237c2/badges/24829882',
      imageUrl: '/certifications/google-cloud-foundations-infrastructure.png',
      certificateUrl: '/certifications/google-cloud-foundations-infrastructure.png',
      skills: ['Cloud Infrastructure', 'Compute Engine', 'Cloud Storage', 'VPC', 'Google Cloud'],
      category: 'Cloud & AI'
    },
    {
      id: 'cert-10',
      title: 'Google Cloud Computing Foundations: Cloud Computing Fundamentals',
      issuer: 'Google Cloud',
      issueDate: '2026',
      credentialId: '24825336',
      verifyUrl: 'https://www.skills.google/public_profiles/48e37d2b-91ed-47b9-82ab-806d65d237c2/badges/24825336',
      imageUrl: '/certifications/google-cloud-foundations-cloud-computing-fundamentals.png',
      certificateUrl: '/certifications/google-cloud-foundations-cloud-computing-fundamentals.png',
      skills: ['Cloud Computing', 'Google Cloud Architecture', 'Core Infrastructure', 'Cloud Storage'],
      category: 'Cloud & AI'
    }
  ] as Certification[]
};
