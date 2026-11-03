/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — Akash Kushwaha's personal data.
 *
 *  This file holds the DEFAULT content. Changes made in the /admin panel
 *  are stored in the database and override these defaults at runtime
 *  (see src/lib/site-content.ts). Edit this file to change the baseline.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Stat = { label: string; value: number; suffix: string }
export type Social = { label: string; url: string; icon: string }

export type Profile = {
  name: string
  firstName: string
  initials: string
  roles: string[]
  tagline: string
  location: string
  address: string
  phone: string
  email: string
  resumeUrl: string
  resumeName: string
  bio: string[]
  stats: Stat[]
  socials: Social[]
}

export type SkillItem = { name: string; level: number; note: string }
export type SkillGroup = { category: string; blurb: string; items: SkillItem[] }

export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  category: string
  emoji: string
  gradient: string
  tech: string[]
  initialLikes: number
  demoUrl: string
  repoUrl: string
  highlight: string
}

export type TimelineItem = {
  period: string
  title: string
  place: string
  description: string
  tags: string[]
  current?: boolean
}

export type LearningItem = { name: string; progress: number; icon: string }

export type SiteContent = {
  profile: Profile
  skills: SkillGroup[]
  marqueeTech: string[]
  projects: Project[]
  timeline: TimelineItem[]
  currentlyLearning: LearningItem[]
}

export const defaultContent: SiteContent = {
  profile: {
    name: "Akash Kushwaha",
    firstName: "Akash",
    initials: "AK",
    roles: [
      "Full-Stack Developer",
      "AI Enthusiast",
      "DSA Problem Solver · 400+ LeetCode",
      "B.Tech CSE (AI) · Class of 2027",
    ],
    tagline:
      "Computer Science undergrad specializing in Artificial Intelligence — I build full-stack web apps with the MERN stack and sharpen my problem-solving daily with DSA in Java.",
    location: "Sasni, Hathras, Uttar Pradesh, India",
    address:
      "Gopal Nagar, Near New Sabji Mandi, Sasni, Hathras, Uttar Pradesh - 204216, India",
    phone: "+91 9690094788",
    email: "its.akash.k7217@gmail.com",
    resumeUrl: "/resume.pdf",
    resumeName: "Akash-Kushwaha-Resume.pdf",
    bio: [
      "I'm Akash Kushwaha, a Computer Science undergraduate at Noida Institute of Engineering and Technology (NIET), Greater Noida, specializing in Artificial Intelligence. I love the full journey of software — from designing REST APIs to crafting responsive interfaces — and I sharpen my problem-solving daily with 400+ LeetCode problems solved in Java.",
      "I've built full-stack products like an AI-powered Resume Analyzer with ATS scoring (Google Gemini API) and a complete Bike Rental Management System in MERN. I took part in Smart India Hackathon 2025, earned certifications in JavaScript Essentials (Infosys Springboard) and AI Tools (be10x), and I'm currently deepening my Advanced Java & DSA, full-stack and Generative AI skills — eager to contribute to real-world products.",
    ],
    stats: [
      { label: "LeetCode Problems (Java)", value: 400, suffix: "+" },
      { label: "Full-Stack Projects", value: 2, suffix: "+" },
      { label: "Certifications", value: 2, suffix: "" },
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
        url: "https://www.linkedin.com/in/akash_kushwaha-498a23376",
        icon: "linkedin",
      },
      {
        label: "LeetCode",
        url: "https://leetcode.com/u/Akash_Kushwhaha/",
        icon: "leetcode",
      },
    ],
  },

  skills: [
    {
      category: "Languages & DSA",
      blurb: "The fundamentals I drill every single day.",
      items: [
        { name: "Java", level: 85, note: "OOP, Collections, clean class design" },
        { name: "JavaScript / TypeScript", level: 80, note: "ES6+, async, typed code" },
        { name: "DSA & Problem Solving", level: 82, note: "400+ LeetCode problems in Java" },
        { name: "SQL", level: 72, note: "Joins, schema design, CRUD" },
      ],
    },
    {
      category: "Frontend",
      blurb: "Interfaces that feel fast, fluid and responsive.",
      items: [
        { name: "React.js", level: 80, note: "Hooks, components, SPA patterns" },
        { name: "HTML & CSS", level: 88, note: "Semantic markup, responsive layouts" },
        { name: "Tailwind CSS", level: 85, note: "Utility-first responsive UI" },
        { name: "Next.js", level: 55, note: "App Router & SSR (currently learning)" },
      ],
    },
    {
      category: "Backend & Tools",
      blurb: "APIs and data layers that hold up in real projects.",
      items: [
        { name: "Node.js & Express.js", level: 75, note: "REST APIs, middleware, routing" },
        { name: "MongoDB", level: 72, note: "Schemas, Mongoose, CRUD" },
        { name: "Git & GitHub", level: 80, note: "Version control, collaboration" },
        { name: "Gemini API / GenAI", level: 75, note: "LLM features (ATS scoring)" },
      ],
    },
  ],

  marqueeTech: [
    "Java",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "Tailwind CSS",
    "HTML & CSS",
    "Git & GitHub",
    "REST APIs",
    "DSA in Java",
    "Gemini API",
  ],

  projects: [
    {
      id: "resume-analyzer",
      title: "Resume Analyzer",
      tagline: "AI-powered ATS scoring & resume feedback",
      description:
        "Full-stack, AI-powered resume analyzer that parses resume content and generates personalized, ATS-focused feedback using the Google Gemini LLM API — with REST APIs and MongoDB persistence for structured storage and retrieval of AI-generated recommendations.",
      category: "AI / ML",
      emoji: "📄",
      gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
      tech: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Google Gemini API",
      ],
      initialLikes: 18,
      demoUrl: "https://github.com/itsakash7217-gif",
      repoUrl: "https://github.com/itsakash7217-gif",
      highlight: "Powered by Gemini API",
    },
    {
      id: "bike-rental",
      title: "Bike Rental Management System",
      tagline: "Full-stack bike rental operations platform",
      description:
        "Full-stack bike rental platform covering end-to-end booking, availability tracking and fare management — with secure user authentication, real-time bike availability and automated fare calculation built on REST APIs and MongoDB.",
      category: "Web App",
      emoji: "🏍️",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      initialLikes: 14,
      demoUrl: "https://github.com/itsakash7217-gif",
      repoUrl: "https://github.com/itsakash7217-gif",
      highlight: "Full MERN stack",
    },
  ],

  timeline: [
    {
      period: "2023 — 2027",
      title: "B.Tech CSE (Artificial Intelligence)",
      place: "NIET, Greater Noida, UP",
      description:
        "Undergraduate degree at Noida Institute of Engineering and Technology focused on AI — algorithms, DBMS, operating systems and machine learning. Current CGPA: 7.98, with hands-on hackathon and project experience.",
      tags: ["Artificial Intelligence", "CGPA 7.98", "NIET"],
      current: true,
    },
    {
      period: "2025 · Hackathon",
      title: "Smart India Hackathon (SIH)",
      place: "National-level challenge",
      description:
        "Participated in Smart India Hackathon 2025 — a national-level innovation and product-building challenge — working on ideation, solution design and rapid team-based development under real problem statements.",
      tags: ["Teamwork", "Problem Solving", "Innovation"],
    },
    {
      period: "Milestone",
      title: "400+ LeetCode Problems Solved",
      place: "LeetCode · Java",
      description:
        "Solved 400+ Data Structures & Algorithms problems in Java on LeetCode, strengthening algorithmic problem-solving and code optimization skills.",
      tags: ["DSA", "Java", "LeetCode"],
    },
    {
      period: "2025 — 2026",
      title: "Shipped full-stack projects",
      place: "Resume Analyzer · Bike Rental System",
      description:
        "Built and shipped two full-stack applications — an AI resume analyzer with Gemini-powered ATS scoring (Nov 2025 – Jan 2026) and a complete bike rental management platform (Jul – Sep 2025) — using React, Node.js, Express.js and MongoDB.",
      tags: ["MERN", "Gemini API", "Projects"],
    },
    {
      period: "2026",
      title: "Technical Certifications",
      place: "Infosys Springboard · be10x",
      description:
        "Completed JavaScript Essentials (Infosys Springboard, Apr 2026) and AI Tools (be10x, Aug 2026) certifications, strengthening fundamentals across programming and AI tooling.",
      tags: ["JavaScript", "AI Tools", "Certifications"],
    },
  ],

  currentlyLearning: [
    { name: "Advanced Java & DSA", progress: 75, icon: "☕" },
    { name: "React.js & Next.js", progress: 60, icon: "⚛️" },
    { name: "Node.js, Express & MongoDB", progress: 55, icon: "🟢" },
    { name: "AI/ML & Generative AI", progress: 65, icon: "🧠" },
  ],
}

/** Static UI links (not editable from the admin panel). */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
] as const

export type SectionId = "about" | "skills" | "projects" | "learning" | "contact"
