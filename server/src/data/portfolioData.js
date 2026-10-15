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
      items: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Operating Systems",
        "Database Management Systems"
      ]
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
  personal: {
    age: 21,
    background: "Born in Ranchi, Jharkhand. Aditya completed his primary schooling in Koderma, where his family home is also located. He is currently in Kolkata for his college education.",
    currentStatus: ["Freelancer", "Independent Developer", "Founder in Progress"],
    openToWork: true,
    opportunities: [
      "Software Engineering roles",
      "AI integration roles",
      "Management roles",
      "Freelance projects",
      "Internships",
      "Remote opportunities"
    ],
    careerGoals: [
      "Initially secure a software engineering role",
      "Build a startup over time",
      "Achieve financial independence"
    ],
    personality: [
      "Ambitious and interested in building something substantial of his own.",
      "Analytical and comfortable taking calculated risks.",
      "Not generally introverted, but prefers speaking where his contributions are valued."
    ],
    codingJourney: "Aditya started learning programming in 2021 during Class XII, beginning with Python and then learning MySQL. That initial experience sparked a lasting interest in technology and software development.",
    motivation: [
      "Financial success",
      "Authority",
      "Building something of his own"
    ],
    hobbies: [
      "Cooking",
      "Music",
      "Drone technology",
      "Electronics"
    ],
    favouriteThings: {
      subjects: ["Physics", "Electronics"],
      interests: ["Arduino", "Electronics projects"],
      programmingLanguage: "C++",
      currentFavouriteMovie: "Dhurandhar"
    },
    privacy: "Do not include or infer personal-life details beyond the explicitly approved information in this portfolio data."
  },
  freelanceServices: {
    currentlyAcceptingWork: true,
    businessName: null,
    currentAudience: "Services are currently being provided primarily to college students, while Aditya is open to working with a broader range of customers.",
    services: [
      {
        name: "Resume creation",
        priceINR: 500,
        pricingNote: "Confirm scope before quoting additional work."
      },
      {
        name: "PPT / Presentation creation",
        priceINR: 500,
        pricingNote: "Confirm slide count and scope before quoting."
      },
      {
        name: "Project development",
        minimumPriceINR: 2500,
        typicalRangeINR: "₹2,500–₹20,000+",
        pricingNote: "Final price depends on project type, scope, complexity, and requirements."
      }
    ],
    generalPriceRangeINR: "₹500–₹20,000+ depending on the selected service and scope.",
    paymentPolicy: "Payment is split into installments. A small advance/security payment is taken at the start. For development work, the described milestones are one-third during frontend development, one-third during backend development, and the remaining balance after final touch-ups. The exact advance amount is agreed with the client before work begins.",
    availabilityNote: "Aditya is currently accepting freelance work.",
    enquiryFlow: "Explain the listed price or range, ask for requirements such as deliverables, scope, deadline, and complexity, clarify that the final quote depends on those details, and direct the client to the existing website contact options. Do not invent extra services, prices, deadlines, guarantees, or payment terms."
  },
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
- Personal details: ${JSON.stringify(VERIFIED_PORTFOLIO_DATA.personal)}.
- Freelance services and pricing: ${JSON.stringify(VERIFIED_PORTFOLIO_DATA.freelanceServices)}.
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
  3. Class XII boards (AISSCE): 95.2% aggregate from Delhi Public School, Ranchi.
  4. Class X boards (AISSE): 98.6% aggregate & District Topper rank from Grizzly Vidyalaya, Koderma.
- Contact: Email: adityasinhaa001@gmail.com | GitHub: https://github.com/adityasinhaa01 | LinkedIn: https://www.linkedin.com/in/adityasinha001

CRITICAL RULES:
1. Never fabricate personal details, internships, professional employment history, clients, or unverified URLs.
2. State honestly and politely when asked about details not found in the verified portfolio facts.
3. Keep your tone articulate, concise, editorial, and helpful.
4. For personal questions, use only the approved details in VERIFIED_PORTFOLIO_DATA.personal.
5. Do not disclose or invent personal-life details; the user explicitly asked to leave personal-life information out.
6. Aditya is open to software engineering, AI integration, and management roles, internships, remote opportunities, and freelance projects. Do not imply he already holds a job or founded an established company.
7. For freelance enquiries, use only VERIFIED_PORTFOLIO_DATA.freelanceServices. Treat listed prices as the stated price or range, not a guaranteed final quote. Ask clarifying questions about scope before estimating a final price.
8. Never invent an exact advance amount, turnaround time, revision count, guarantee, or additional fee.
9. For enquiries, direct people to the existing website contact options. Do not provide a WhatsApp number or invent additional contact methods.
10. The business name is intentionally not provided; do not guess or invent one.
11. Do not wrap words or headers in markdown bold asterisks (**). Output clean, readable text using simple bullet points (•) and plain headers without asterisks.`;

function generateGroundedFallback(query) {
  const q = (query || "").toLowerCase();

  if (
    q.includes("price") ||
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("how much") ||
    q.includes("rate") ||
    q.includes("resume") ||
    q.includes("ppt") ||
    q.includes("presentation") ||
    q.includes("freelanc") ||
    q.includes("hire") ||
    q.includes("quotation") ||
    q.includes("quote")
  ) {
    return `Aditya is currently accepting freelance work. Current service pricing is:

• Resume creation: ₹500
• PPT / presentation creation: ₹500
• Project development: ₹2,500–₹20,000+ depending on scope and complexity
• General service range: ₹500–₹20,000+ depending on the selected service.

Payments are split into installments, beginning with a small advance/security payment. For development work, the described milestones are one-third during frontend development, one-third during backend development, and the remaining balance after final touch-ups. The exact advance and final quote are agreed after requirements are discussed.

To get an estimate, share the deliverables, scope, complexity, and deadline, then use the contact options already available on Aditya's portfolio.`;
  }

  if (
    q.includes("age") ||
    q.includes("hobby") ||
    q.includes("hobbies") ||
    q.includes("favourite") ||
    q.includes("favorite") ||
    q.includes("personality") ||
    q.includes("motivat") ||
    q.includes("coding journey") ||
    q.includes("started coding") ||
    q.includes("hometown") ||
    q.includes("background") ||
    q.includes("where is he from")
  ) {
    return `Here are some personal details Aditya has chosen to share:

• Age: 21
• Background: Born in Ranchi, completed primary schooling in Koderma, and is currently in Kolkata for college. His family home is in Koderma.
• Personality: Ambitious, analytical, and inclined toward calculated risks. He prefers speaking where his contributions are valued.
• Coding journey: Started learning Python in Class XII in 2021, then learned MySQL, which sparked his continuing interest in technology.
• Motivations: Financial success, authority, and building something of his own.
• Hobbies: Cooking, music, drone technology, and electronics.
• Favourite subjects: Physics and electronics; he is interested in Arduino.
• Favourite programming language: C++.
• Current favourite movie: Dhurandhar.`;
  }

  if (
    q.includes("open to work") ||
    q.includes("available") ||
    q.includes("job") ||
    q.includes("internship") ||
    q.includes("career goal") ||
    q.includes("career") ||
    q.includes("opportunit")
  ) {
    return `Aditya is currently open to opportunities, including software engineering, AI integration, and management roles, as well as internships, remote opportunities, and freelance projects. His current career plan is to begin with a software engineering role, then work toward building a startup and achieving financial independence.`;
  }

  if (
    q.includes("payment") ||
    q.includes("installment") ||
    q.includes("advance") ||
    q.includes("milestone")
  ) {
    return `Aditya's freelance work uses installment-based payments. A small advance/security payment is agreed at the beginning. For development work, the described milestones are one-third during frontend development, one-third during backend development, and the remaining balance after final touch-ups. The exact advance amount is agreed with the client before work begins.`;
  }

  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("stack") ||
    q.includes("tool") ||
    q.includes("database") ||
    q.includes("ai") ||
    q.includes("rag") ||
    q.includes("llm") ||
    q.includes("mcp")
  ) {
    return `Aditya's verified technical skills include:

• Programming Languages: C++, JavaScript, Python
• Frontend Development: HTML5, CSS3, JavaScript, React.js
• Backend Development: Node.js, Express.js, FastAPI, REST APIs
• AI Engineering & LLM Systems: LLM Integration, RAG (Retrieval-Augmented Generation), Vector Databases, Model Context Protocol (MCP), AI Agents & Tool Calling, Prompt Engineering, Embeddings & Semantic Search, TensorFlow & AI Workflows
• Databases: MySQL, MongoDB, PostgreSQL, Vector Databases
• Core CS: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems
• DevOps & Tools: Git, GitHub, Linux, Shell Scripting, VS Code, Postman.`;
  }

  if (
    q.includes("project") ||
    q.includes("nagar") ||
    q.includes("chotu") ||
    q.includes("aether") ||
    q.includes("paste") ||
    q.includes("work") ||
    q.includes("build")
  ) {
    return `Aditya's portfolio features three verified projects:

1. Nagar Sudhar (Crowdsourcing Platform for Local Civic Issues) — Live at https://nagar-sudhar.vercel.app/

Features a Flutter mobile app with GPS and image uploads, Python & TensorFlow AI/ML verification for authenticity and duplicate detection, interactive Leaflet.js maps with community upvoting and gamification, and a Node.js, Express.js, and PostgreSQL municipal dashboard.

2. ChotuLink (URL Shortening & Link Management Platform) — Live at https://chotu-link.netlify.app/

Features a responsive HTML, CSS, and JavaScript interface with dark/light themes, Node.js and Express.js REST APIs, MongoDB storage for URL mappings and unique identifiers, and Render Cloud deployment.

3. AetherPaste (Pastebin Clone · Text Encapsulation & Snippet Sharing) — Live at https://aetherpaste.netlify.app

Features a minimalist snippet vault with clean modular MVC architecture, Express.js REST APIs for paste creation and retrieval, MongoDB (Mongoose) schema storage, ShortID generation, and visit analytics tracking.`;
  }

  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("school") ||
    q.includes("cgpa") ||
    q.includes("journey")
  ) {
    return `Aditya's education record:

• B.Tech in Computer Science Engineering — Netaji Subhas Engineering College, Kolkata, West Bengal (2024–2028), CGPA: 8.65
• Class XII (AISSCE) — Delhi Public School, Sail Township, Ranchi, Jharkhand (2021–2023), Aggregate: 95.2%
• Class X (AISSE) — Grizzly Vidyalaya, Koderma, Jharkhand (2016–2021), Aggregate: 98.6%.`;
  }

  if (
    q.includes("achievement") ||
    q.includes("award") ||
    q.includes("hackathon") ||
    q.includes("sih") ||
    q.includes("inspire") ||
    q.includes("board") ||
    q.includes("10th") ||
    q.includes("12th") ||
    q.includes("topper")
  ) {
    return `Aditya's verified academic and extracurricular achievements:

• 98.6% aggregate and District Topper rank in Class 10 boards (AISSE, Grizzly Vidyalaya).
• 95.2% aggregate in Class 12 boards (AISSCE, Delhi Public School, Ranchi).
• Selected in Smart India Hackathon (SIH) Internal Hackathon 2025.
• Selected for INSPIRE Awards – MANAK 2020–21, recognizing innovation and problem-solving skills.`;
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("github") ||
    q.includes("linkedin")
  ) {
    return `You can reach Aditya Sinha via:

• Email: adityasinhaa001@gmail.com
• GitHub: https://github.com/adityasinhaa01
• LinkedIn: https://www.linkedin.com/in/adityasinha001`;
  }

  return `Aditya Sinha is a 21-year-old Computer Science Engineering student at Netaji Subhas Engineering College, Kolkata (CGPA: 8.65), a freelancer, independent developer, and founder in progress. He is interested in full-stack development, AI integration, electronics, and building practical software.

He is currently accepting freelance work, with resume creation at ₹500, PPT/presentation creation at ₹500, and project development generally ranging from ₹2,500 to ₹20,000+ depending on scope.

You can ask about his projects (Nagar Sudhar, ChotuLink, and AetherPaste), skills, education, achievements, interests, career opportunities, or freelance services.`;
}

module.exports = {
  VERIFIED_PORTFOLIO_DATA,
  SYSTEM_INSTRUCTION,
  generateGroundedFallback
};