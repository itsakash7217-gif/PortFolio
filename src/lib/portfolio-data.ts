/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — Akash Kushwaha's personal data.
 *  Edit this single file to update the site content.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Akash Kushwaha",
  firstName: "Akash",
  initials: "AK",
  roles: [
    "Full-Stack Developer",
    "AI Enthusiast",
    "DSA Problem Solver",
    "B.Tech CSE (AI) · Class of 2027",
  ],
  tagline:
    "Computer Science undergrad specializing in Artificial Intelligence — I build full-stack web apps, solve DSA problems in Java, and train deep learning models.",
  location: "Meerut, India",
  email: "its.akash.k7217@gmail.com",
  resumeUrl: "/resume.pdf",
  resumeName: "Akash-Kushwaha-Resume.pdf",
  bio: [
    "I'm Akash Kushwaha, a Computer Science undergraduate at Noida Institute of Engineering and Technology (NIET), Greater Noida, specializing in Artificial Intelligence. I love the full journey of software — from designing REST APIs to crafting responsive interfaces — and I sharpen my problem-solving daily with 400+ LeetCode problems solved in Java.",
    "I've built AI-powered tools like a Resume Analyzer with ATS scoring (Gemini 2.5 API), a full-stack bike rental platform (MERN), a sales analytics dashboard, and a deep learning voice-emotion detector. I took part in Smart India Hackathon project activities and I'm currently deepening my MERN stack and Generative AI skills, eager to contribute to real-world products.",
  ],
  stats: [
    { label: "LeetCode Problems", value: 400, suffix: "+" },
    { label: "Projects Built", value: 4, suffix: "" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Hackathons", value: 1, suffix: "" },
  ],
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/itsakash7217-gif",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/akash-kushwaha-2a11b6323/",
      icon: "linkedin",
    },
  ],
} as const;

export type SkillCategory = "Frontend" | "Backend & Database" | "AI, Data & Tools";

export const skills: {
  category: SkillCategory;
  blurb: string;
  items: { name: string; level: number; note: string }[];
}[] = [
  {
    category: "Frontend",
    blurb: "Interfaces that feel fast, fluid and responsive.",
    items: [
      { name: "React.js", level: 80, note: "Hooks, components, SPA patterns" },
      { name: "JavaScript / TypeScript", level: 82, note: "ES6+, async, typed code" },
      { name: "Tailwind CSS", level: 85, note: "Utility-first responsive UI" },
      { name: "Next.js", level: 65, note: "App Router & SSR (learning)" },
    ],
  },
  {
    category: "Backend & Database",
    blurb: "APIs and data layers that hold up in real projects.",
    items: [
      { name: "Node.js & Express.js", level: 75, note: "REST APIs, middleware, routing" },
      { name: "MongoDB", level: 72, note: "Schemas, Mongoose, CRUD" },
      { name: "Java (OOP)", level: 85, note: "Collections, clean class design" },
      { name: "REST API Design", level: 78, note: "Validation & error handling" },
    ],
  },
  {
    category: "AI, Data & Tools",
    blurb: "Turning models and data into working products.",
    items: [
      { name: "Python", level: 78, note: "Pandas, Plotly, scripting" },
      { name: "TensorFlow / LSTM", level: 70, note: "Deep learning on audio signals" },
      { name: "Gemini API / GenAI", level: 75, note: "LLM features (ATS scoring)" },
      { name: "Git & GitHub", level: 80, note: "Version control, collaboration" },
    ],
  },
];

export const marqueeTech = [
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "TensorFlow",
  "Pandas",
  "Streamlit",
  "Plotly",
  "Git & GitHub",
  "Gemini API",
];

export type ProjectCategory =
  | "Web App"
  | "AI / ML"
  | "Data & Analytics"
  | "Deep Learning";

export const projects: {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  emoji: string;
  gradient: string;
  tech: string[];
  initialLikes: number;
  demoUrl: string;
  repoUrl: string;
  highlight: string;
}[] = [
  {
    id: "resume-analyzer",
    title: "Resume Analyzer",
    tagline: "AI-powered ATS scoring & resume feedback",
    description:
      "Analyzes resumes and generates ATS compatibility scores, identifies skill gaps, recommends suitable jobs and gives concrete improvement suggestions.",
    category: "AI / ML",
    emoji: "📄",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
    tech: ["React", "TypeScript", "Tailwind CSS", "Python", "Gemini 2.5 API"],
    initialLikes: 18,
    demoUrl: "https://github.com/itsakash7217-gif",
    repoUrl: "https://github.com/itsakash7217-gif",
    highlight: "Powered by Gemini 2.5",
  },
  {
    id: "bike-rental",
    title: "Bike Rental Management System",
    tagline: "Full-stack bike rental operations platform",
    description:
      "Full-stack application for managing bike bookings, inventory, customer records and rental operations end to end.",
    category: "Web App",
    emoji: "🏍️",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    initialLikes: 14,
    demoUrl: "https://github.com/itsakash7217-gif",
    repoUrl: "https://github.com/itsakash7217-gif",
    highlight: "Full MERN stack",
  },
  {
    id: "sales-dashboard",
    title: "Sales Performance Analysis Dashboard",
    tagline: "Interactive business performance dashboard",
    description:
      "Interactive dashboard for analyzing sales data, tracking business performance and visualizing insights with rich, explorable charts.",
    category: "Data & Analytics",
    emoji: "📊",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    tech: ["Python", "Streamlit", "Pandas", "Plotly"],
    initialLikes: 11,
    demoUrl: "https://github.com/itsakash7217-gif",
    repoUrl: "https://github.com/itsakash7217-gif",
    highlight: "Streamlit + Plotly",
  },
  {
    id: "voice-emotion",
    title: "Voice Emotion Detection",
    tagline: "Detecting human emotions from voice signals",
    description:
      "Deep learning project that detects human emotions from voice signals using audio processing and neural networks.",
    category: "Deep Learning",
    emoji: "🎙️",
    gradient: "from-fuchsia-600 via-purple-600 to-violet-700",
    tech: ["Python", "TensorFlow", "Librosa", "LSTM"],
    initialLikes: 9,
    demoUrl: "https://github.com/itsakash7217-gif",
    repoUrl: "https://github.com/itsakash7217-gif",
    highlight: "LSTM neural network",
  },
];

export const timeline: {
  period: string;
  title: string;
  place: string;
  description: string;
  tags: string[];
  current?: boolean;
}[] = [
  {
    period: "2023 — 2027",
    title: "B.Tech CSE (Artificial Intelligence)",
    place: "NIET, Greater Noida",
    description:
      "Undergraduate degree at Noida Institute of Engineering and Technology focused on AI — algorithms, machine learning and software engineering, with hands-on hackathon and project experience.",
    tags: ["Artificial Intelligence", "CS Core", "NIET"],
    current: true,
  },
  {
    period: "Hackathon",
    title: "Smart India Hackathon (SIH)",
    place: "Team project activities",
    description:
      "Participated in Smart India Hackathon project activities — ideation, solution design and rapid team-based development under real problem statements.",
    tags: ["Teamwork", "Problem Solving"],
  },
  {
    period: "Milestone",
    title: "400+ LeetCode Problems Solved",
    place: "LeetCode · Java",
    description:
      "Solved 400+ problems on LeetCode using Java, building a strong foundation in data structures, algorithms and pattern recognition.",
    tags: ["DSA", "Java", "LeetCode"],
  },
  {
    period: "Ongoing",
    title: "Full-Stack Developer Track",
    place: "Self-driven learning path",
    description:
      "Leveling up across the modern web stack — React.js, Next.js, Node.js, Express.js and MongoDB — building and shipping real projects along the way.",
    tags: ["MERN", "Next.js", "Projects"],
  },
  {
    period: "Foundations",
    title: "Technical Certifications",
    place: "Relevant technical areas",
    description:
      "Completed technical certifications that strengthen fundamentals across programming, development tools and AI concepts.",
    tags: ["Certifications", "Fundamentals"],
  },
];

export const currentlyLearning = [
  { name: "React.js & Next.js", progress: 60, icon: "⚛️" },
  { name: "Node.js, Express & MongoDB", progress: 55, icon: "🟢" },
  { name: "AI/ML & Generative AI", progress: 65, icon: "🧠" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
] as const;

export type SectionId = "about" | "skills" | "projects" | "learning" | "contact";
