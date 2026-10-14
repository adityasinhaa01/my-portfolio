/**
 * Verified portfolio data extracted strictly from source/portfolio-original.tsx
 * Used to ground the AI assistant and prevent hallucination.
 */
const VERIFIED_PORTFOLIO_DATA = {
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
        description: "Selected in Smart India Hackathon (SIH) Internal Hackathon 2025 and INSPIRE Awards – MANAK 2020–21 for innovation and problem-solving."
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
      title: "AISSCE (Class XII)",
      institution: "Delhi Public School, Sail Township, Ranchi, Jharkhand",
      description: "Completed Senior Secondary Education (Class XII) with an aggregate of 95.2%.",
      isPlaceholder: false
    },
    {
      period: "2016–2021",
      title: "AISSE (Class X) & INSPIRE Awards – MANAK",
      institution: "Grizzly Vidyalaya, Koderma, Jharkhand",
      description: "Completed Secondary Education (Class X) with an aggregate of 98.6%. Selected for INSPIRE Awards – MANAK 2020–21, recognizing innovation and problem-solving skills.",
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

const SYSTEM_INSTRUCTION = `You are the official editorial portfolio assistant for ADITYA SINHA.
You must answer strictly using ONLY the verified portfolio facts below:
- Name: ADITYA SINHA (Never use any middle name or alternative name).
- Role: Computer Science Engineering Student · Full-Stack Developer · AI/ML Enthusiast.
- Tagline: Building practical digital experiences through code.
- About: Results-driven Computer Science Engineering student passionate about full-stack development and practical problem-solving. Hands-on experience building applications using the MERN stack and AI technologies. Interested in building reliable backend systems, intuitive user interfaces, and practical software solutions.
- Education:
  1. Netaji Subhas Engineering College, Kolkata, West Bengal — B.Tech in Computer Science Engineering (2024–2028), CGPA: 8.65.
  2. Delhi Public School, Sail Township, Ranchi, Jharkhand — Class XII / AISSCE (2021–2023), Aggregate: 95.2%.
  3. Grizzly Vidyalaya, Koderma, Jharkhand — Class X / AISSE (2016–2021), Aggregate: 98.6%.
- Skills: ${VERIFIED_PORTFOLIO_DATA.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join(' | ')}.
- Projects:
  1. Nagar Sudhar (Crowdsourcing Platform for Local Civic Issues): Live on Vercel at https://nagar-sudhar.vercel.app/ — Built a Flutter mobile app for civic issue reporting with GPS, image uploads, and descriptions; implemented AI/ML verification using Python & TensorFlow for authenticity and duplicate detection; developed interactive issue maps using Leaflet.js with community upvoting and gamification; created a municipal dashboard using Node.js, Express.js & PostgreSQL.
  2. ChotuLink (URL Shortening & Link Management Platform): Live on Netlify at https://chotu-link.netlify.app/ — Built a responsive interface using HTML, CSS, and JavaScript with dark/light themes; developed REST APIs using Node.js and Express.js to generate and redirect short URLs; used MongoDB for storing URL mappings and secure unique identifiers; deployed backend on Render Cloud.
  3. AetherPaste (Pastebin Clone · Text Encapsulation & Snippet Sharing): Live on Netlify at https://aetherpaste.netlify.app — Built a minimalist text snippet vault with unique short IDs and clean modular MVC architecture; developed Express.js REST APIs for snippet creation and retrieval; integrated MongoDB (Mongoose) for snippet persistence, ShortID generation, and timestamped visit history tracking.
- Achievements:
  1. Selected in Smart India Hackathon (SIH) Internal Hackathon 2025.
  2. Selected for INSPIRE Awards – MANAK 2020–21, recognizing innovation and problem-solving skills.
- Contact: Email: adityasinhaa001@gmail.com | GitHub: https://github.com/adityasinhaa01 | LinkedIn: https://www.linkedin.com/in/adityasinha001

CRITICAL RULES:
1. Never fabricate personal details, internships, professional employment history, clients, or unverified URLs.
2. State honestly and politely when asked about details not found in the verified portfolio facts.
3. Keep your tone articulate, concise, editorial, and helpful.`;

function generateGroundedFallback(query) {
  const q = (query || '').toLowerCase();
  if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('stack') || q.includes('tool') || q.includes('database') || q.includes('ai') || q.includes('rag') || q.includes('llm') || q.includes('mcp')) {
    return `Aditya's verified technical skills include:\n\n• Programming Languages: C++, JavaScript, Python\n• Frontend Development: HTML5, CSS3, JavaScript, React.js\n• Backend Development: Node.js, Express.js, FastAPI, REST APIs\n• AI Engineering & LLM Systems: LLM Integration, RAG (Retrieval-Augmented Generation), Vector Databases, Model Context Protocol (MCP), AI Agents & Tool Calling, Prompt Engineering, Embeddings & Semantic Search, TensorFlow & AI Workflows\n• Databases: MySQL, MongoDB, PostgreSQL, Vector Databases\n• Core CS: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems\n• DevOps & Tools: Git, GitHub, Linux, Shell Scripting, VS Code, Postman.`;
  }
  if (q.includes('project') || q.includes('nagar') || q.includes('chotu') || q.includes('aether') || q.includes('paste') || q.includes('work') || q.includes('build')) {
    return `Aditya's portfolio features three verified projects:\n\n1. Nagar Sudhar (Crowdsourcing Platform for Local Civic Issues) — Live at https://nagar-sudhar.vercel.app/\nFeatures a Flutter mobile app with GPS and image uploads, Python & TensorFlow AI/ML verification for authenticity and duplicate detection, interactive Leaflet.js maps with community upvoting and gamification, and a Node.js, Express.js, and PostgreSQL municipal dashboard.\n\n2. ChotuLink (URL Shortening & Link Management Platform) — Live at https://chotu-link.netlify.app/\nFeatures a responsive HTML, CSS, and JavaScript interface with dark/light themes, Node.js and Express.js REST APIs, MongoDB storage for URL mappings and unique identifiers, and Render Cloud deployment.\n\n3. AetherPaste (Pastebin Clone · Text Encapsulation & Snippet Sharing) — Live at https://aetherpaste.netlify.app\nFeatures a minimalist snippet vault with clean modular MVC architecture, Express.js REST APIs for paste creation and retrieval, MongoDB (Mongoose) schema storage, ShortID generation, and visit analytics tracking.`;
  }
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('school') || q.includes('cgpa') || q.includes('journey')) {
    return `Aditya's education record:\n\n• B.Tech in Computer Science Engineering — Netaji Subhas Engineering College, Kolkata, West Bengal (2024–2028), CGPA: 8.65\n• Class XII (AISSCE) — Delhi Public School, Sail Township, Ranchi, Jharkhand (2021–2023), Aggregate: 95.2%\n• Class X (AISSE) — Grizzly Vidyalaya, Koderma, Jharkhand (2016–2021), Aggregate: 98.6%.`;
  }
  if (q.includes('achievement') || q.includes('award') || q.includes('hackathon') || q.includes('sih') || q.includes('inspire')) {
    return `Aditya's verified academic and extracurricular achievements:\n\n• Selected in Smart India Hackathon (SIH) Internal Hackathon 2025.\n• Selected for INSPIRE Awards – MANAK 2020–21, recognizing innovation and problem-solving skills.`;
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('github') || q.includes('linkedin')) {
    return `You can reach Aditya Sinha via:\n• Email: adityasinhaa001@gmail.com\n• GitHub: https://github.com/adityasinhaa01\n• LinkedIn: https://www.linkedin.com/in/adityasinha001`;
  }
  return `Aditya Sinha is a Computer Science Engineering student at Netaji Subhas Engineering College, Kolkata (CGPA: 8.65), passionate about full-stack development, AI/ML technologies, and practical problem-solving. You can ask me about his projects (Nagar Sudhar, ChotuLink, and AetherPaste), technical skills, education, or achievements.`;
}

module.exports = {
  VERIFIED_PORTFOLIO_DATA,
  SYSTEM_INSTRUCTION,
  generateGroundedFallback
};
