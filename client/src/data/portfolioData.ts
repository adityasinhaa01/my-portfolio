export interface AboutFocusArea {
  title: string;
  description: string;
}

export interface AboutData {
  heading: string;
  lead: string;
  paragraphs: string[];
  focusAreas: AboutFocusArea[];
}

export interface ProjectImage {
  title: string;
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  tech: string[];
  year: string;
  featuredVisual: string;
  image?: string;
  images?: ProjectImage[];
  link: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface JourneyItem {
  period: string;
  title: string;
  institution: string;
  description: string;
  isPlaceholder: boolean;
}

export interface ContactData {
  statusNote: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  about: AboutData;
  projects: Project[];
  skills: SkillGroup[];
  journey: JourneyItem[];
  contact: ContactData;
}

export const VERIFIED_PORTFOLIO_DATA: PortfolioData = {
  name: "ADITYA SINHA",
  role: "Computer Science Engineering Student · Full-Stack Developer · AI/ML Enthusiast",
  tagline: "Building practical digital experiences through code.",
  about: {
    heading: "Driven by curiosity, grounded in fundamentals, focused on craft.",
    lead: "Results-driven Computer Science Engineering student passionate about full-stack development and practical problem-solving.",
    paragraphs: [
      "Hands-on experience building applications using the MERN stack and AI technologies at Netaji Subhas Engineering College, Kolkata. I focus on bridging the gap between reliable backend APIs, database integration, and intuitive user interfaces to deliver practical software solutions.",
      "Grounded in core computer science fundamentals including Data Structures and Algorithms, Object-Oriented Programming, Operating Systems, and DBMS, I build user-focused applications with clean architecture."
    ],
    focusAreas: [
      {
        title: "Full-Stack & Backend Systems",
        description: "Building responsive interfaces and REST APIs using Node.js, Express.js, FastAPI, MongoDB, PostgreSQL, and MySQL."
      },
      {
        title: "AI/ML & Problem Solving",
        description: "Applying Python, TensorFlow, and strong Data Structures & Algorithms foundations to solve practical real-world challenges."
      },
      {
        title: "Achievements & Recognition",
        description: "Selected in Smart India Hackathon (SIH) Internal Hackathon 2025 and INSPIRE Awards – MANAK 2020–21. Achieved 95.2% in Class 12 boards and 98.6% with District Topper rank in Class 10 boards."
      }
    ]
  },
  projects: [
    {
      id: "01",
      title: "Nagar Sudhar",
      category: "Crowdsourcing Platform for Local Civic Issues",
      status: "Live Application · Vercel",
      description: "A civic issue reporting platform that enables citizens to report local problems and supports municipal authorities in tracking and resolving them. Built a Flutter mobile app with GPS and image uploads, implemented AI/ML verification using Python and TensorFlow for authenticity checks and duplicate detection, developed interactive Leaflet.js issue maps with community upvoting and gamification, and created a Node.js, Express.js, and PostgreSQL municipal dashboard.",
      tech: ["Flutter", "Python", "TensorFlow", "Leaflet.js", "Node.js", "Express.js", "PostgreSQL"],
      year: "2025",
      featuredVisual: "nagarsudhar",
      image: "/images/projects/nagar-sudhar-home.png",
      images: [
        {
          title: "Home",
          url: "/images/projects/nagar-sudhar-home.png",
          caption: "Impact dashboard & issue reporting trigger"
        },
        {
          title: "Live Map",
          url: "/images/projects/nagar-sudhar-map.png",
          caption: "Interactive Leaflet.js geolocation map with categorized pins"
        },
        {
          title: "Civic Reports",
          url: "/images/projects/nagar-sudhar-reports.png",
          caption: "Issue tracking feed with status tags & community upvoting"
        },
        {
          title: "Community",
          url: "/images/projects/nagar-sudhar-community.png",
          caption: "Gamified civic leaderboard & Municipal Trust Index"
        }
      ],
      link: "https://nagar-sudhar.vercel.app/"
    },
    {
      id: "02",
      title: "ChotuLink",
      category: "URL Shortening & Link Management Platform",
      status: "Live Application · Netlify",
      description: "A responsive URL shortening and link management platform for generating short URLs and redirecting users through unique links. Built a responsive HTML, CSS, and JavaScript interface with dark and light themes, developed Node.js and Express.js REST APIs for URL generation and redirection, integrated MongoDB for storing URL mappings and secure unique identifiers, and deployed the backend on Render Cloud.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Render"],
      year: "2024",
      featuredVisual: "chotulink",
      image: "/images/projects/chotulink.png",
      images: [
        {
          title: "ChotuLink Terminal",
          url: "/images/projects/chotulink.png",
          caption: "High-density MERN stack URL encapsulation console"
        }
      ],
      link: "https://chotu-link.netlify.app/"
    },
    {
      id: "03",
      title: "AetherPaste",
      category: "Pastebin Clone · Text Encapsulation & Snippet Sharing",
      status: "Live Application · Netlify",
      description: "A minimal yet powerful pastebin clone that lets users create, store, and access text snippets via unique short IDs with a clean modular MVC architecture. Built using Node.js and Express.js REST APIs, MongoDB (Mongoose) models for snippet storage, ShortID generation, and timestamped visit history tracking.",
      tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "ShortID", "REST APIs", "Netlify"],
      year: "2024",
      featuredVisual: "aetherpaste",
      image: "/images/projects/aetherpaste.png",
      images: [
        {
          title: "AetherPaste Console",
          url: "/images/projects/aetherpaste.png",
          caption: "Minimalist dark snippet vault with instant unique ID generation and visit tracking"
        }
      ],
      link: "https://aetherpaste.netlify.app"
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["C++", "JavaScript", "Python"]
    },
    {
      category: "Frontend Development",
      items: ["HTML5", "CSS3", "JavaScript", "React.js"]
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "FastAPI", "REST APIs"]
    },
    {
      category: "AI Engineering & LLM Systems",
      items: [
        "LLM Integration",
        "RAG (Retrieval-Augmented Generation)",
        "Vector Databases",
        "Model Context Protocol (MCP)",
        "AI Agents & Tool Calling",
        "Prompt Engineering",
        "Embeddings & Semantic Search",
        "TensorFlow & AI Workflows"
      ]
    },
    {
      category: "Databases & Storage",
      items: ["MySQL", "MongoDB", "PostgreSQL", "Vector Databases"]
    },
    {
      category: "Core Computer Science",
      items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems", "Database Management Systems"]
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "GitHub", "Linux", "Shell Scripting"]
    },
    {
      category: "Development Tools",
      items: ["VS Code", "Postman"]
    }
  ],
  journey: [
    {
      period: "2024–2028",
      title: "Bachelor of Technology in Computer Science Engineering",
      institution: "Netaji Subhas Engineering College, Kolkata, West Bengal",
      description: "Pursuing undergraduate coursework in Computer Science Engineering. Current CGPA: 8.65.",
      isPlaceholder: false
    },
    {
      period: "2025",
      title: "Smart India Hackathon (SIH) Internal Hackathon",
      institution: "Academic & Extracurricular Achievement",
      description: "Selected in the Smart India Hackathon (SIH) Internal Hackathon 2025.",
      isPlaceholder: false
    },
    {
      period: "2021–2023",
      title: "Class XII (AISSCE) — 95.2% Aggregate",
      institution: "Delhi Public School, Sail Township, Ranchi, Jharkhand",
      description: "Completed Senior Secondary Education (Class XII) with a top aggregate of 95.2%.",
      isPlaceholder: false
    },
    {
      period: "2016–2021",
      title: "Class X (AISSE) — 98.6% & District Topper",
      institution: "Grizzly Vidyalaya, Koderma, Jharkhand",
      description: "Completed Secondary Education (Class X) with an aggregate of 98.6%, securing the District Topper rank. Selected for INSPIRE Awards – MANAK 2020–21, recognizing innovation and problem-solving skills.",
      isPlaceholder: false
    }
  ],
  contact: {
    statusNote: "Direct contact links below connect to verified email, GitHub, and LinkedIn profiles.",
    email: "adityasinhaa001@gmail.com",
    github: "https://github.com/adityasinhaa01",
    linkedin: "https://www.linkedin.com/in/adityasinha001"
  }
};
