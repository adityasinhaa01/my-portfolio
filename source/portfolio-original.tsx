import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  X, 
  Send, 
  CornerDownLeft, 
  Check, 
  Copy, 
  Menu,
  Globe,
  Code2,
  BookOpen,
  Compass,
  Mail
} from 'lucide-react';

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
      status: "Live Link Placeholder — Configure with your deployment URL",
      description: "A civic issue reporting platform that enables citizens to report local problems and supports municipal authorities in tracking and resolving them. Built a Flutter mobile app with GPS and image uploads, implemented AI/ML verification using Python and TensorFlow for authenticity checks and duplicate detection, developed interactive Leaflet.js issue maps with community upvoting and gamification, and created a Node.js, Express.js, and PostgreSQL municipal dashboard.",
      tech: ["Flutter", "Python", "TensorFlow", "Leaflet.js", "Node.js", "Express.js", "PostgreSQL"],
      year: "2025",
      featuredVisual: "architecture",
      link: "#contact"
    },
    {
      id: "02",
      title: "ChotuLink",
      category: "URL Shortening & Link Management Platform",
      status: "Live Link Placeholder — Configure with your deployment URL",
      description: "A responsive URL shortening and link management platform for generating short URLs and redirecting users through unique links. Built a responsive HTML, CSS, and JavaScript interface with dark and light themes, developed Node.js and Express.js REST APIs for URL generation and redirection, integrated MongoDB for storing URL mappings and secure unique identifiers, and deployed the backend on Render Cloud.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Render"],
      year: "2024",
      featuredVisual: "editorial",
      link: "#contact"
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["C++", "JavaScript", "Python"]
    },
    {
      category: "Frontend Development",
      items: ["HTML5", "CSS3", "JavaScript"]
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "FastAPI", "REST APIs"]
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB", "PostgreSQL"]
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
    statusNote: "Direct contact links below include verified email and clearly marked profile placeholders ready for your personal URLs.",
    email: "adityasinhaa001@gmail.com",
    github: "https://github.com/ (Placeholder — Configure your GitHub URL)",
    linkedin: "https://linkedin.com/ (Placeholder — Configure your LinkedIn URL)"
  }
};

const JUPITER_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  varying vec3 vObjectPos;

  void main() {
    vUv = uv;
    vObjectPos = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 mvPosition = viewMatrix * worldPosition;
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const JUPITER_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  varying vec3 vObjectPos;

  uniform vec3 uSunDirection;
  uniform float uTime;

  float sq(float x) { return x * x; }

  float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(
        mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x),
        f.y
      ),
      mix(
        mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x),
        f.y
      ),
      f.z
    );
  }

  // 6-octave fractal Brownian motion for cloud filaments
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = p * 2.05 + shift;
      a *= 0.5;
    }
    return v;
  }

  // Ridged multifractal for violent storm eddies and festoons
  float ridgedFbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      float n = noise(p);
      n = 1.0 - abs(n * 2.0 - 1.0);
      v += a * n * n;
      p = p * 2.12 + vec3(31.7, 17.3, 53.1);
      a *= 0.48;
    }
    return v;
  }

  // Zonal palette: high-contrast cream zones against rust / burnt-orange belts
  vec3 getJupiterBandColor(float y, float detail, float eddy) {
    vec3 cream       = vec3(0.97, 0.90, 0.78);
    vec3 ivory       = vec3(0.89, 0.79, 0.66);
    vec3 slateZone   = vec3(0.72, 0.67, 0.63);
    vec3 amber       = vec3(0.86, 0.54, 0.26);
    vec3 burntOrange = vec3(0.78, 0.35, 0.12);
    vec3 rust        = vec3(0.56, 0.23, 0.09);
    vec3 darkBrown   = vec3(0.26, 0.12, 0.06);
    vec3 polarTint   = vec3(0.34, 0.30, 0.29);

    float lat = y;

    float zoneWave1 = sin(lat * 18.0);
    float zoneWave2 = cos(lat * 37.0 + 0.6);
    float zoneWave3 = sin(lat * 75.0 - 1.2);
    float microBands = sin(lat * 160.0 + detail * 6.0) * 0.17;

    float bandSignal = zoneWave1 * 0.52 + zoneWave2 * 0.28 + zoneWave3 * 0.20 + microBands;

    float neb = exp(-sq((lat - 0.19) * 11.5));
    float seb = exp(-sq((lat + 0.21) * 10.5));
    float eqZone = exp(-sq(lat * 13.0));
    float ntb = exp(-sq((lat - 0.44) * 16.0));
    float stb = exp(-sq((lat + 0.46) * 15.0));

    vec3 col = mix(ivory, cream, smoothstep(-0.4, 0.6, bandSignal));
    col = mix(col, amber, smoothstep(-0.1, 0.45, -bandSignal + detail * 0.35));
    col = mix(col, slateZone, smoothstep(0.2, 0.8, zoneWave2) * 0.4);

    col = mix(col, rust, neb * (0.8 + 0.2 * eddy));
    col = mix(col, darkBrown, neb * smoothstep(0.42, 0.78, detail) * 0.78);
    col = mix(col, burntOrange, seb * (0.85 + 0.15 * detail));
    col = mix(col, cream, eqZone * 0.85);

    float festoonLat = exp(-sq((lat - 0.08) * 24.0));
    col = mix(col, vec3(0.50, 0.52, 0.55), festoonLat * smoothstep(0.52, 0.75, eddy) * 0.65);

    col = mix(col, rust, (ntb + stb) * 0.7);

    col = mix(col, darkBrown, smoothstep(0.60, 0.86, eddy) * 0.5);
    col = mix(col, cream * 1.05, smoothstep(0.64, 0.90, detail) * 0.4);

    float polarMask = smoothstep(0.58, 0.96, abs(lat));
    col = mix(col, polarTint, polarMask * 0.72);

    return col;
  }

  void main() {
    vec3 pos = normalize(vObjectPos);
    float lat = pos.y;
    float lon = atan(pos.z, pos.x);
    float T = uTime;

    // Differential rotation: every latitude slides at its own speed, which shears the
    // clouds into long violent streaks. Sampling on the sphere keeps it seamless.
    float jet = sin(lat * 26.0) * 0.55 + cos(lat * 54.0) * 0.25 + sin(lat * 9.0) * 0.35;
    float drift = jet * T * 0.012 + jet * 0.35;
    float cs = cos(drift);
    float sn = sin(drift);
    vec2 xz = vec2(pos.x * cs - pos.z * sn, pos.x * sn + pos.z * cs);
    vec3 sp = vec3(xz.x * 2.4, lat * 6.5, xz.y * 2.4);

    // Multi-stage domain warp, slowly boiling over time
    float warp1 = fbm(sp * 1.35 + vec3(12.3, 4.5, 8.1 + T * 0.010));
    float warp2 = fbm(sp * 2.7 + vec3(warp1 * 2.2, -warp1 * 1.7, 3.3 + T * 0.014));
    float eddy = ridgedFbm(sp * 3.2 + vec3(warp2 * 1.8, warp1 * 1.1, T * 0.020));
    float microDetail = fbm(sp * 9.5 + vec3(eddy * 1.4));

    float wavyLat = lat + (warp1 - 0.5) * 0.085 + (warp2 - 0.5) * 0.050 + (eddy - 0.5) * 0.030;

    vec3 surfaceColor = getJupiterBandColor(wavyLat, warp2 * 0.65 + microDetail * 0.35, eddy);

    // Convective storm towers (bright) and dark barges inside the belts
    float tower = smoothstep(0.80, 0.93, eddy) * smoothstep(0.35, 0.55, microDetail);
    surfaceColor = mix(surfaceColor, vec3(1.0, 0.96, 0.88), tower * 0.6);
    float barge = smoothstep(0.62, 0.80, warp1) * exp(-sq((lat - 0.19) * 8.0));
    surfaceColor = mix(surfaceColor, vec3(0.20, 0.09, 0.05), barge * 0.6);

    // === GREAT RED SPOT ===
    float grsLatCenter = -0.38;
    float grsLonCenter = 0.42;
    float dLon = atan(sin(lon - grsLonCenter), cos(lon - grsLonCenter));
    float dLat = lat - grsLatCenter;

    vec2 grsCoord = vec2(dLon / 0.38, dLat / 0.145);
    float grsDist = length(grsCoord);

    if (grsDist < 1.9) {
      float angle = atan(grsCoord.y, grsCoord.x);
      // The anticyclone keeps turning
      float swirl = angle + grsDist * 5.6 - pow(max(0.0, 1.3 - grsDist), 1.6) * 4.8 - T * 0.16;
      vec3 swirlPos = vec3(cos(swirl) * grsDist * 3.5, sin(swirl) * grsDist * 3.5, grsDist * 4.0 + T * 0.02);
      float grsNoise = fbm(swirlPos * 2.2);
      float grsRidge = ridgedFbm(swirlPos * 3.4);

      float collarMask = smoothstep(1.75, 1.05, grsDist) * smoothstep(0.65, 1.08, grsDist);
      float coreMask = smoothstep(1.02, 0.15, grsDist);
      float eyeMask = smoothstep(0.42, 0.0, grsDist);

      vec3 grsOuterCream = vec3(0.93, 0.84, 0.72);
      vec3 grsTerracotta = vec3(0.80, 0.30, 0.12);
      vec3 grsDeepRust   = vec3(0.52, 0.15, 0.06);
      vec3 grsCoreOrange = vec3(0.90, 0.40, 0.17);

      vec3 spotCol = mix(grsTerracotta, grsCoreOrange, grsNoise);
      spotCol = mix(spotCol, grsDeepRust, grsRidge * 0.8);
      spotCol = mix(spotCol, grsDeepRust * 0.8, eyeMask * 0.55);

      surfaceColor = mix(surfaceColor, grsOuterCream * (0.85 + 0.25 * grsNoise), collarMask * 0.8);
      surfaceColor = mix(surfaceColor, spotCol, coreMask);
    }

    // Smaller storms: white ovals plus a second dark cyclone in the north
    float ovalLat = lat + 0.68;
    float ovalLon = atan(sin(lon - 0.70), cos(lon - 0.70));
    float ovalDist = length(vec2(ovalLon / 0.11, ovalLat / 0.055));
    if (ovalDist < 1.2) {
      float ovalMask = smoothstep(1.1, 0.2, ovalDist);
      surfaceColor = mix(surfaceColor, vec3(0.97, 0.92, 0.85), ovalMask * 0.88);
    }
    float cycLat = lat - 0.37;
    float cycLon = atan(sin(lon + 0.95), cos(lon + 0.95));
    float cycDist = length(vec2(cycLon / 0.16, cycLat / 0.07));
    if (cycDist < 1.4) {
      float cycMask = smoothstep(1.3, 0.2, cycDist);
      surfaceColor = mix(surfaceColor, vec3(0.30, 0.13, 0.07), cycMask * 0.7);
    }

    // === CLOUD-TOP RELIEF ===
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPosition);
    vec3 L = normalize(uSunDirection);

    float cloudHeight = (warp2 * 0.5 + eddy * 0.35 + microDetail * 0.15);
    vec3 perturbedN = normalize(N + vec3(dFdx(cloudHeight), dFdy(cloudHeight), 0.0) * 1.7);

    // === LIGHTING ===
    float NdotL = dot(perturbedN, L);
    float smoothNdotL = dot(N, L);

    float diffuse = smoothstep(-0.18, 0.88, NdotL);
    float NdotV = max(0.0, dot(N, V));
    float limbDarkening = pow(NdotV, 0.22);

    vec3 sunColor = vec3(1.10, 0.97, 0.85);
    vec3 twilightTint = vec3(0.50, 0.22, 0.09);
    float terminatorBand = smoothstep(-0.22, 0.12, smoothNdotL) * smoothstep(0.45, 0.02, smoothNdotL);

    vec3 litColor = surfaceColor * sunColor * diffuse * limbDarkening;
    litColor += surfaceColor * twilightTint * terminatorBand * 0.45;

    float fresnel = pow(1.0 - NdotV, 3.4);
    float sunwardLimb = smoothstep(-0.05, 0.75, smoothNdotL);
    vec3 atmosphereGlow = vec3(1.0, 0.84, 0.62) * fresnel * sunwardLimb * 1.0;

    vec3 H = normalize(L + V);
    float spec = pow(max(0.0, dot(perturbedN, H)), 28.0) * smoothstep(0.0, 0.5, smoothNdotL);
    litColor += vec3(1.0, 0.90, 0.75) * spec * 0.10;

    // Faint ember glow on the shadow limb: the storm planet radiates heat
    float darkSide = 1.0 - smoothstep(-0.10, 0.30, smoothNdotL);
    vec3 ember = vec3(0.95, 0.30, 0.07) * pow(1.0 - NdotV, 2.6) * darkSide * (0.35 + 0.65 * eddy) * 0.20;

    // Lightning inside the clouds: flashes only show where the sun doesn't reach
    float flash = 0.0;
    for (int k = 0; k < 6; k++) {
      float fk = float(k);
      float tt = T * 0.8 + fk * 7.31;
      float id = floor(tt);
      float ph = fract(tt);
      vec3 c = vec3(hash(vec3(id, fk, 1.7)), hash(vec3(id, fk, 5.1)), hash(vec3(id, fk, 9.3))) * 2.0 - 1.0;
      c.y *= 0.6;
      c = normalize(c);
      float d = distance(pos, c);
      float pulse = exp(-ph * 5.0) * (0.6 + 0.4 * sin(ph * 50.0));
      flash += pulse * exp(-d * d * 260.0);
    }
    vec3 lightning = vec3(1.0, 0.80, 0.55) * flash * darkSide * 2.8 * (0.4 + 0.6 * smoothstep(0.3, 0.7, eddy));

    vec3 nightAmbient = surfaceColor * vec3(0.020, 0.017, 0.021);
    vec3 finalColor = max(litColor + atmosphereGlow, nightAmbient) + ember + lightning;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const RING_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vLocalPos;

  void main() {
    vUv = uv;
    vLocalPos = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const RING_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vLocalPos;

  uniform vec3 uPlanetCenter;
  uniform float uPlanetRadius;
  uniform vec3 uSunDirection;
  uniform float uInner;
  uniform float uOuter;
  uniform float uTime;

  float sq(float x) { return x * x; }

  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    float r = length(vLocalPos.xy);
    float t = (r - uInner) / (uOuter - uInner);
    if (t < 0.0 || t > 1.0) discard;

    float angle = atan(vLocalPos.y, vLocalPos.x);
    float ringlet1 = sin(t * 95.0) * 0.5 + 0.5;
    float ringlet2 = cos(t * 240.0 + 1.4) * 0.5 + 0.5;
    float fineLines = sin(t * 620.0) * 0.5 + 0.5;

    float envelope = smoothstep(0.0, 0.10, t) * smoothstep(1.0, 0.86, t);
    float gap1 = 1.0 - 0.65 * exp(-sq((t - 0.42) * 45.0));
    float gap2 = 1.0 - 0.55 * exp(-sq((t - 0.71) * 60.0));

    float density = envelope * gap1 * gap2 * (0.38 + 0.36 * ringlet1 + 0.20 * ringlet2 + 0.10 * fineLines);

    // Debris: fine dust grains plus a few bright rock fragments, drifting slowly
    float a = angle + 3.14159 + uTime * 0.004;
    float grain = step(0.982, hash2(vec2(floor(t * 360.0), floor(a * 240.0)))) * 0.6;
    float rock  = step(0.9965, hash2(vec2(floor(t * 120.0) + 7.0, floor(a * 90.0)))) * 0.95;
    float pebble = grain + rock;

    vec3 relPos = vWorldPos - uPlanetCenter;
    vec3 L = normalize(uSunDirection);
    float projOnSun = dot(relPos, L);
    vec3 perpVec = relPos - projOnSun * L;
    float distFromShadowAxis = length(perpVec);

    float planetShadow = 1.0;
    if (projOnSun < 0.0) {
      planetShadow = smoothstep(uPlanetRadius * 0.94, uPlanetRadius * 1.05, distFromShadowAxis);
    }

    vec3 dustBase = mix(vec3(0.70, 0.55, 0.40), vec3(0.93, 0.78, 0.60), ringlet1);
    dustBase += vec3(0.95, 0.85, 0.70) * pebble;

    float sunIllum = smoothstep(-1.5, 1.2, dot(normalize(relPos), L)) * 0.7 + 0.35;
    vec3 finalRingColor = dustBase * sunIllum * (0.08 + 0.92 * planetShadow);

    float alpha = clamp((density * 0.62 + pebble * 0.4) * (0.18 + 0.82 * planetShadow), 0.0, 0.85);
    gl_FragColor = vec4(finalRingColor, alpha);
  }
`;

const MOON_FRAGMENT_SHADER = `
  precision highp float;

  varying vec3 vNormal;
  varying vec3 vObjectPos;
  varying vec3 vViewPosition;

  uniform vec3 uSunDirection;
  uniform vec3 uBaseColor;
  uniform float uSeed;

  float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
    );
  }

  void main() {
    vec3 p = normalize(vObjectPos) * 4.5 + vec3(uSeed);
    float n = noise(p) * 0.6 + noise(p * 2.4) * 0.3 + noise(p * 6.0) * 0.1;

    vec3 N = normalize(vNormal);
    vec3 L = normalize(uSunDirection);
    vec3 V = normalize(vViewPosition);

    float diff = smoothstep(-0.12, 0.85, dot(N, L));
    float rim = pow(1.0 - max(0.0, dot(N, V)), 3.0) * max(0.0, dot(N, L));

    vec3 albedo = uBaseColor * (0.72 + 0.55 * n);
    vec3 col = albedo * vec3(1.05, 0.95, 0.84) * diff + vec3(0.95, 0.82, 0.65) * rim * 0.45;
    col = max(col, albedo * 0.015);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Camera is deliberately long and narrow: a planet this large would look stretched
// near the frame edges with a wide lens.
const CAMERA_FOV = 10;
const CAMERA_DISTANCE = 21.77;
const JUPITER_RADIUS = 1.65;
const JUPITER_AXIAL_PERIOD_SECONDS = 180;

// Composition per breakpoint. Everything is expressed in fractions of the hero frame,
// so Jupiter keeps its place at any size.
//   radius: planet radius as a fraction of the frame height (width on narrow screens)
//   cx, cy: planet centre as a fraction of the frame (0,0 = top-left)
//   moons:  [x, y, radius, depth]
const JUPITER_LAYOUTS = {
  desktop: {
    radius: 0.55,
    cx: 0.777,
    cy: 0.50,
    moons: [
      [0.345, 0.170, 0.034, 1.5],
      [0.311, 0.824, 0.030, 1.0],
      [0.953, 0.627, 0.060, 4.0]
    ]
  },
  tablet: {
    radius: 0.72,
    cx: 0.86,
    cy: 0.88,
    moons: [
      [0.30, 0.46, 0.022, 1.5],
      [0.14, 0.86, 0.019, 1.0],
      [0.94, 0.72, 0.040, 4.0]
    ]
  },
  mobile: {
    radius: 0.95,
    cx: 0.78,
    cy: 0.98,
    moons: [
      [0.16, 0.58, 0.018, 1.5],
      [0.10, 0.84, 0.016, 1.0],
      [0.93, 0.70, 0.032, 4.0]
    ]
  }
};

const HeroJupiterScene = ({ prefersReducedMotion }) => {
  const mountRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // The planet fills most of the screen, so pixel ratio is capped to keep frames smooth
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      200
    );
    camera.position.set(0, 0, CAMERA_DISTANCE);
    const worldHeight = 2 * CAMERA_DISTANCE * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));

    // Sunlight from the top-left, matching the flare in the sky
    const sunDirection = new THREE.Vector3(-1.15, 0.42, 0.48).normalize();

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Axial tilt: bands and rings sweep from lower-left to upper-right
    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.z = THREE.MathUtils.degToRad(15.5);
    tiltGroup.rotation.x = THREE.MathUtils.degToRad(7);
    systemGroup.add(tiltGroup);

    // 1. Jupiter
    const jupiterGeo = new THREE.SphereGeometry(JUPITER_RADIUS, 192, 192);
    const jupiterMat = new THREE.ShaderMaterial({
      vertexShader: JUPITER_VERTEX_SHADER,
      fragmentShader: JUPITER_FRAGMENT_SHADER,
      uniforms: {
        uSunDirection: { value: sunDirection },
        uTime: { value: prefersReducedMotion ? 14 : 0 }
      },
      extensions: { derivatives: true }
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    // Starting angle puts the Great Red Spot left of centre, below the ring
    jupiterMesh.rotation.y = -1.495;
    tiltGroup.add(jupiterMesh);

    // 2. Sunlit atmospheric halo
    const haloGeo = new THREE.SphereGeometry(JUPITER_RADIUS * 1.02, 96, 96);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: JUPITER_VERTEX_SHADER,
      fragmentShader: `
        precision highp float;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uSunDirection;
        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(vViewPosition);
          vec3 L = normalize(uSunDirection);
          float rim = pow(1.0 - max(0.0, dot(N, V)), 4.0);
          float sunSide = smoothstep(-0.15, 0.65, dot(N, L));
          vec3 glowCol = vec3(1.0, 0.83, 0.58) * rim * sunSide * 0.75;
          gl_FragColor = vec4(glowCol, rim * sunSide * 0.7);
        }
      `,
      uniforms: { uSunDirection: { value: sunDirection } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide
    });
    tiltGroup.add(new THREE.Mesh(haloGeo, haloMat));

    // 3. Rings: the front arc crosses Jupiter's face, the back arc hides behind it
    const ringInner = JUPITER_RADIUS * 1.14;
    const ringOuter = JUPITER_RADIUS * 1.78;
    const ringGeo = new THREE.RingGeometry(ringInner, ringOuter, 256, 32);
    const ringMat = new THREE.ShaderMaterial({
      vertexShader: RING_VERTEX_SHADER,
      fragmentShader: RING_FRAGMENT_SHADER,
      uniforms: {
        uPlanetCenter: { value: new THREE.Vector3() },
        uPlanetRadius: { value: JUPITER_RADIUS },
        uSunDirection: { value: sunDirection },
        uInner: { value: ringInner },
        uOuter: { value: ringOuter },
        uTime: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    tiltGroup.add(ringMesh);

    // 4. Three moons, placed in screen space so they hold their spot in the frame
    const moonSpecs = [
      { color: 0xd8c5ad, seed: 11.4 },
      { color: 0xc9b092, seed: 27.8 },
      { color: 0xbfa382, seed: 43.2 }
    ];
    const moonGeo = new THREE.SphereGeometry(1, 64, 64);
    const moons = moonSpecs.map((spec, i) => {
      const col = new THREE.Color(spec.color);
      const mat = new THREE.ShaderMaterial({
        vertexShader: JUPITER_VERTEX_SHADER,
        fragmentShader: MOON_FRAGMENT_SHADER,
        uniforms: {
          uSunDirection: { value: sunDirection },
          uBaseColor: { value: new THREE.Vector3(col.r, col.g, col.b) },
          uSeed: { value: spec.seed }
        }
      });
      const mesh = new THREE.Mesh(moonGeo, mat);
      scene.add(mesh);
      return { mesh, mat, fx: 0, fy: 0, fr: 0.02, depth: 1, phase: i * 2.1 };
    });

    // ---- Layout -------------------------------------------------------------
    const view = { width: 1, height: 1, worldWidth: 1, base: new THREE.Vector3(), scale: 1 };
    const worldCenter = new THREE.Vector3();

    const placeMoon = (m, elapsed, px, py) => {
      const fx = m.fx + Math.sin(elapsed * 0.05 + m.phase) * 0.006 + px * 0.010 * m.depth;
      const fy = m.fy + Math.cos(elapsed * 0.04 + m.phase) * 0.005 - py * 0.008 * m.depth;
      const sx = (fx - 0.5) * view.worldWidth;
      const sy = (0.5 - fy) * worldHeight;
      // Perspective compensation: the moon sits at depth z but must land at (fx, fy)
      const k = (CAMERA_DISTANCE - m.depth) / CAMERA_DISTANCE;
      m.mesh.position.set(sx * k, sy * k, m.depth);
      m.mesh.scale.setScalar(m.fr * worldHeight * k);
    };

    const applyPositions = (elapsed, px, py) => {
      systemGroup.position.set(
        view.base.x + px * 0.12,
        view.base.y - py * 0.08 + Math.sin(elapsed * 0.12) * 0.02,
        0
      );
      moons.forEach((m) => placeMoon(m, elapsed, px, py));
    };

    const updateLayout = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const aspect = width / height;
      renderer.setSize(width, height);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      view.width = width;
      view.height = height;
      view.worldWidth = worldHeight * aspect;

      const cfg = width >= 1024 ? JUPITER_LAYOUTS.desktop : width >= 768 ? JUPITER_LAYOUTS.tablet : JUPITER_LAYOUTS.mobile;
      const radiusWorld = cfg.radius * Math.min(worldHeight, view.worldWidth * 0.98);
      view.scale = radiusWorld / JUPITER_RADIUS;
      systemGroup.scale.setScalar(view.scale);
      view.base.set((cfg.cx - 0.5) * view.worldWidth, (0.5 - cfg.cy) * worldHeight, 0);

      cfg.moons.forEach((spec, i) => {
        moons[i].fx = spec[0];
        moons[i].fy = spec[1];
        moons[i].fr = spec[2];
        moons[i].depth = spec[3];
      });

      ringMat.uniforms.uPlanetRadius.value = radiusWorld;
      applyPositions(clockElapsed, mouse.px, mouse.py);
      systemGroup.updateMatrixWorld(true);
      jupiterMesh.getWorldPosition(worldCenter);
      ringMat.uniforms.uPlanetCenter.value.copy(worldCenter);
    };

    // ---- Pointer parallax: heavy, heavily damped --------------------------------
    const mouse = { tx: 0, ty: 0, px: 0, py: 0 };
    const handlePointerMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let clockElapsed = prefersReducedMotion ? 14 : 0;
    updateLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
      if (prefersReducedMotion) renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    // Reduced motion: one still frame, no loop
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return () => {
        resizeObserver.disconnect();
        jupiterGeo.dispose(); jupiterMat.dispose();
        haloGeo.dispose(); haloMat.dispose();
        ringGeo.dispose(); ringMat.dispose();
        moonGeo.dispose(); moons.forEach((m) => m.mat.dispose());
        renderer.dispose();
      };
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Pause the GPU work while the hero is off-screen
    let isHeroVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { isHeroVisible = entry.isIntersecting; }),
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    let animationFrameId = 0;
    let lastTime = performance.now();
    const angularVelocity = (Math.PI * 2) / JUPITER_AXIAL_PERIOD_SECONDS;

    const animate = (now) => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!isHeroVisible) return;

      clockElapsed += dt;

      // Slow, weighty axial rotation; the cloud flow in the shader adds the violence
      jupiterMesh.rotation.y += angularVelocity * dt;
      jupiterMat.uniforms.uTime.value = clockElapsed;
      ringMat.uniforms.uTime.value = clockElapsed;

      // Pointer parallax with inertia: the scene trails the cursor
      const follow = 1 - Math.exp(-dt * 1.6);
      mouse.px += (mouse.tx - mouse.px) * follow;
      mouse.py += (mouse.ty - mouse.py) * follow;
      applyPositions(clockElapsed, mouse.px, mouse.py);

      systemGroup.updateMatrixWorld(true);
      jupiterMesh.getWorldPosition(worldCenter);
      ringMat.uniforms.uPlanetCenter.value.copy(worldCenter);

      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      jupiterGeo.dispose(); jupiterMat.dispose();
      haloGeo.dispose(); haloMat.dispose();
      ringGeo.dispose(); ringMat.dispose();
      moonGeo.dispose(); moons.forEach((m) => m.mat.dispose());
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  if (!webglSupported) {
    // Static planetary fallback if WebGL is unavailable
    return (
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none">
        <div
          className="stage-in w-[130vh] h-[130vh] rounded-full mr-[-30vh]"
          style={{
            background: 'radial-gradient(circle at 24% 38%, #f3dec0 0%, #c87d44 32%, #7a3b1e 60%, #07080c 86%)',
            boxShadow: '-24px -8px 90px rgba(245, 208, 150, 0.3)'
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="stage-in absolute inset-0 w-full h-full pointer-events-none select-none z-10"
      aria-hidden="true"
    />
  );
};

const NightSkyBackdrop = ({ prefersReducedMotion }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let layer = null;
    let twinklers = [];
    let animId = 0;
    let isVisible = true;

    // Deterministic random so the sky is identical on every resize
    const mulberry32 = (seed) => () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // The static sky is painted once on an offscreen layer. Each frame only blits it
    // and animates a few twinkling stars and the sun flare, which keeps the page smooth.
    const build = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      layer = document.createElement('canvas');
      layer.width = canvas.width;
      layer.height = canvas.height;
      const l = layer.getContext('2d');
      l.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rnd = mulberry32(20261014);
      const unit = width / 1672;

      // Deep void
      const bg = l.createRadialGradient(width * 0.16, height * 0.12, 10, width * 0.5, height * 0.5, Math.max(width, height) * 0.95);
      bg.addColorStop(0, '#1a1410');
      bg.addColorStop(0.35, '#08090f');
      bg.addColorStop(1, '#030407');
      l.fillStyle = bg;
      l.fillRect(0, 0, width, height);

      // Milky Way: a diagonal river of warm dust cut through by dark lanes
      const p0 = { x: width * 0.06, y: -height * 0.04 };
      const p1 = { x: width * 0.47, y: height * 0.50 };
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const len = Math.hypot(dx, dy);
      const nx = -dy / len;
      const ny = dx / len;
      const gauss = () => (rnd() + rnd() + rnd() + rnd() - 2) / 2;

      const blob = (x, y, r, rgb, a) => {
        const g = l.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${rgb}, ${a})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        l.fillStyle = g;
        l.beginPath();
        l.arc(x, y, r, 0, Math.PI * 2);
        l.fill();
      };

      l.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 300; i++) {
        const t = rnd();
        const spread = gauss() * width * 0.07 * (0.6 + 0.6 * Math.sin(t * Math.PI));
        blob(p0.x + dx * t + nx * spread, p0.y + dy * t + ny * spread, (16 + rnd() * 80) * unit, '222, 150, 92', 0.035 + rnd() * 0.07);
      }
      l.globalCompositeOperation = 'source-over';
      for (let i = 0; i < 190; i++) {
        const t = rnd();
        const spread = gauss() * width * 0.05;
        blob(p0.x + dx * t + nx * spread, p0.y + dy * t + ny * spread, (10 + rnd() * 52) * unit, '5, 4, 5', 0.22 + rnd() * 0.3);
      }

      // Stars, thicker along the band
      const tones = ['#fff9f0', '#f5e6d0', '#e3e9ff', '#ffdcb5'];
      const starCount = Math.min(Math.floor((width * height) / 1500), 1100);
      twinklers = [];
      for (let i = 0; i < starCount; i++) {
        let x;
        let y;
        if (i % 3 === 0) {
          const t = rnd();
          const spread = gauss() * width * 0.09;
          x = p0.x + dx * t + nx * spread;
          y = p0.y + dy * t + ny * spread;
        } else {
          x = rnd() * width;
          y = rnd() * height;
        }
        const size = rnd() < 0.9 ? rnd() * 1.1 + 0.35 : rnd() * 1.8 + 1.0;
        const alpha = rnd() * 0.65 + 0.2;
        const color = tones[i % tones.length];
        if (rnd() < 0.14) {
          twinklers.push({ x, y, size, alpha, color, speed: rnd() * 1.2 + 0.4, phase: rnd() * Math.PI * 2 });
        } else {
          l.globalAlpha = alpha;
          l.fillStyle = color;
          l.beginPath();
          l.arc(x, y, size, 0, Math.PI * 2);
          l.fill();
        }
      }
      l.globalAlpha = 1;
    };

    const draw = (timeMs) => {
      const t = timeMs * 0.001;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (let i = 0; i < twinklers.length; i++) {
        const s = twinklers[i];
        ctx.globalAlpha = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // The sun in the corner: a slow, heavy swell of light with long streaks
      const swell = 0.88 + 0.12 * Math.sin(t * 0.45);
      const sx = 0;
      const sy = height * 0.05;
      ctx.globalCompositeOperation = 'lighter';
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, width * 0.38);
      glow.addColorStop(0, `rgba(255, 244, 224, ${0.78 * swell})`);
      glow.addColorStop(0.06, `rgba(247, 196, 132, ${0.40 * swell})`);
      glow.addColorStop(0.22, `rgba(196, 125, 68, ${0.12 * swell})`);
      glow.addColorStop(0.55, 'rgba(90, 52, 28, 0.03)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width * 0.5, height * 0.62);

      [[0, 0.30, 0.020], [38, 0.18, 0.016], [-32, 0.14, 0.016], [90, 0.12, 0.014]].forEach(([deg, reach, thin]) => {
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.scale(1, thin);
        const streak = ctx.createRadialGradient(0, 0, 0, 0, 0, width * reach);
        streak.addColorStop(0, `rgba(255, 232, 196, ${0.55 * swell})`);
        streak.addColorStop(1, 'rgba(255, 232, 196, 0)');
        ctx.fillStyle = streak;
        ctx.beginPath();
        ctx.arc(0, 0, width * reach, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.globalCompositeOperation = 'source-over';
    };

    build();
    draw(prefersReducedMotion ? 0 : performance.now());

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        draw(performance.now());
      }, 120);
    };
    window.addEventListener('resize', handleResize);

    let observer;
    if (!prefersReducedMotion) {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { isVisible = e.isIntersecting; }),
        { threshold: 0.01 }
      );
      observer.observe(canvas);
      const loop = (now) => {
        animId = requestAnimationFrame(loop);
        if (isVisible) draw(now);
      };
      animId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="sky-in absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
};

const PortfolioAssistantModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello. I am Aditya Sinha's portfolio assistant. I answer questions strictly based on verified information from his resume—covering his Computer Science Engineering studies at Netaji Subhas Engineering College, technical skills, achievements, and projects (Nagar Sudhar and ChotuLink). How can I help you?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const suggestedQuestions = [
    "Tell me about Aditya's projects, Nagar Sudhar and ChotuLink.",
    "What are Aditya's technical skills and programming languages?",
    "What is Aditya's educational background and academic record?",
    "What achievements has Aditya earned?"
  ];

  // Grounded system instruction with strict anti-hallucination guardrails
  const buildSystemInstruction = () => {
    return `You are the official editorial portfolio assistant for ADITYA SINHA.
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
  1. Nagar Sudhar (Crowdsourcing Platform for Local Civic Issues): Built a Flutter mobile app for civic issue reporting with GPS, image uploads, and descriptions; implemented AI/ML verification using Python & TensorFlow for authenticity and duplicate detection; developed interactive issue maps using Leaflet.js with community upvoting and gamification; created a municipal dashboard using Node.js, Express.js & PostgreSQL.
  2. ChotuLink (URL Shortening & Link Management Platform): Built a responsive interface using HTML, CSS, and JavaScript with dark/light themes; developed REST APIs using Node.js and Express.js to generate and redirect short URLs; used MongoDB for storing URL mappings and secure unique identifiers; deployed backend on Render Cloud.
- Achievements:
  1. Selected in Smart India Hackathon (SIH) Internal Hackathon 2025.
  2. Selected for INSPIRE Awards – MANAK 2020–21, recognizing innovation and problem-solving skills.
- Contact: Email: adityasinhaa001@gmail.com. GitHub and LinkedIn URLs are currently marked as placeholders to be configured.

CRITICAL RULES:
1. Never fabricate personal details, internships, professional employment history, clients, or unverified URLs.
2. When asked about details that are marked as placeholders or not yet provided (such as specific GitHub/LinkedIn profile URLs or work experience), state honestly and politely that those details are not configured in the verified portfolio source of truth yet.
3. Keep your tone articulate, concise, editorial, and helpful.`;
  };

  // Fallback grounded response generator if API key is not configured in environment
  const generateGroundedLocalFallback = (query) => {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('stack') || q.includes('tool') || q.includes('database')) {
      return `Aditya's verified technical skills include:\n\n• Programming Languages: C++, JavaScript, Python\n• Frontend Development: HTML5, CSS3, JavaScript\n• Backend Development: Node.js, Express.js, FastAPI, REST APIs\n• Databases: MySQL, MongoDB, PostgreSQL\n• Core CS: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems\n• DevOps & Tools: Git, GitHub, Linux, Shell Scripting, VS Code, Postman.`;
    }
    if (q.includes('project') || q.includes('nagar') || q.includes('chotu') || q.includes('work') || q.includes('build')) {
      return `Aditya's portfolio features two verified projects:\n\n1. Nagar Sudhar (Crowdsourcing Platform for Local Civic Issues) — Features a Flutter mobile app with GPS and image uploads, Python & TensorFlow AI/ML verification for authenticity and duplicate detection, interactive Leaflet.js maps with community upvoting and gamification, and a Node.js, Express.js, and PostgreSQL municipal dashboard.\n\n2. ChotuLink (URL Shortening & Link Management Platform) — Features a responsive HTML, CSS, and JavaScript interface with dark/light themes, Node.js and Express.js REST APIs, MongoDB storage for URL mappings and unique identifiers, and Render Cloud deployment.`;
    }
    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('school') || q.includes('cgpa') || q.includes('journey')) {
      return `Aditya's education record:\n\n• B.Tech in Computer Science Engineering — Netaji Subhas Engineering College, Kolkata, West Bengal (2024–2028), CGPA: 8.65\n• Class XII (AISSCE) — Delhi Public School, Sail Township, Ranchi, Jharkhand (2021–2023), Aggregate: 95.2%\n• Class X (AISSE) — Grizzly Vidyalaya, Koderma, Jharkhand (2016–2021), Aggregate: 98.6%.`;
    }
    if (q.includes('achievement') || q.includes('award') || q.includes('hackathon') || q.includes('sih') || q.includes('inspire')) {
      return `Aditya's verified academic and extracurricular achievements:\n\n• Selected in Smart India Hackathon (SIH) Internal Hackathon 2025.\n• Selected for INSPIRE Awards – MANAK 2020–21, recognizing innovation and problem-solving skills.`;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      return `You can reach Aditya Sinha via email at adityasinhaa001@gmail.com.`;
    }
    return `Aditya Sinha is a Computer Science Engineering student at Netaji Subhas Engineering College, Kolkata (CGPA: 8.65), passionate about full-stack development, AI/ML technologies, and practical problem-solving. You can ask me about his projects (Nagar Sudhar and ChotuLink), technical skills, education, or achievements.`;
  };

  const handleSend = async (promptText) => {
    const trimmed = (promptText ?? input).trim();
    if (!trimmed || isStreaming) return;

    const userMsg = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg, { role: 'assistant', content: '' }]);
    setInput('');
    setIsStreaming(true);

    try {
      // First attempt genuine SSE streaming against backend /api/assistant/stream if running alongside the Express server,
      // otherwise call Gemini API directly with progressive chunk rendering
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          ...messages.slice(1).map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: trimmed }] }
        ],
        systemInstruction: {
          parts: [{ text: buildSystemInstruction() }]
        }
      };

      let replyText = '';
      let usedApi = false;

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          const candidateText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            replyText = candidateText;
            usedApi = true;
          }
        }
      } catch (err) {
        usedApi = false;
      }

      if (!usedApi || !replyText) {
        replyText = generateGroundedLocalFallback(trimmed);
      }

      // Stream tokens cleanly into the assistant message bubble
      const words = replyText.split(' ');
      let accumulated = '';
      for (let i = 0; i < words.length; i++) {
        accumulated += (i === 0 ? '' : ' ') + words[i];
        const snapshot = accumulated;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: snapshot };
          return updated;
        });
        await new Promise((r) => setTimeout(r, 18));
      }
    } finally {
      setIsStreaming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Assistant"
    >
      <div className="relative w-full max-w-lg bg-[#0b0b0e] border-l border-[#f4ece1]/15 h-full flex flex-col justify-between text-[#f4ece1] shadow-2xl">
        {/* Editorial Header */}
        <div className="px-8 py-7 border-b border-[#f4ece1]/10 flex items-center justify-between">
          <div>
            <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] mb-1">
              Portfolio Concierge
            </p>
            <h2 className="font-display text-[32px] font-medium tracking-wide text-[#f7f2eb]">
              Ask About Aditya Sinha
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-[#f4ece1]/70 hover:text-[#f4ece1] border border-[#f4ece1]/15 rounded-full transition-colors"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="font-mono-tech text-[10px] uppercase tracking-[2px] text-[#f4ece1]/40 mb-2">
                {msg.role === 'user' ? 'You' : 'Editorial Assistant'}
              </span>
              <div
                className={`font-sans-body max-w-[90%] rounded-2xl px-5 py-4 text-[16px] leading-[1.6] whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#f4ece1] text-[#0b0b0e]'
                    : 'bg-[#141419] text-[#e8dfd3] border border-[#f4ece1]/10'
                }`}
              >
                {msg.content || (
                  <span className="inline-flex items-center gap-2 text-[#d8b48a]">
                    Composing response...
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts & Input */}
        <div className="p-6 border-t border-[#f4ece1]/10 bg-[#0e0e12]">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={isStreaming}
                className="font-sans-body text-[12px] text-left px-3.5 py-2 rounded-full border border-[#f4ece1]/15 text-[#d8cec2] hover:border-[#d8b48a] hover:text-[#f7f2eb] transition-colors disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Aditya's skills, projects, or CS focus..."
              className="font-sans-body w-full bg-[#15151b] border border-[#f4ece1]/20 rounded-full pl-5 pr-14 py-3.5 text-[16px] text-[#f7f2eb] placeholder-[#f4ece1]/40 focus:outline-none focus:border-[#d8b48a]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="absolute right-2 p-2.5 rounded-full bg-[#f4ece1] text-[#09090c] hover:bg-[#e5d5c0] disabled:opacity-30 transition-colors"
              aria-label="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProjectEditorialArtwork = ({ type }) => {
  if (type === 'architecture') {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full object-cover bg-[#0d0d11]">
        <defs>
          <radialGradient id="warmGlow1" cx="25%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#d89b64" stopOpacity="0.24" />
            <stop offset="60%" stopColor="#5e361c" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0d0d11" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#warmGlow1)" />
        {/* Architectural Orchestration Diagram */}
        <g stroke="#e8dfd3" strokeOpacity="0.22" fill="none" strokeWidth="1.2">
          <rect x="90" y="110" width="170" height="110" rx="4" />
          <rect x="315" y="80" width="180" height="140" rx="4" stroke="#d8b48a" strokeOpacity="0.55" />
          <rect x="550" y="110" width="160" height="110" rx="4" />
          <rect x="200" y="290" width="400" height="110" rx="4" />
          <path d="M260 165 L315 165" stroke="#d8b48a" strokeOpacity="0.7" />
          <path d="M495 165 L550 165" stroke="#d8b48a" strokeOpacity="0.7" />
          <path d="M405 220 L405 290" stroke="#d8b48a" strokeOpacity="0.7" />
        </g>
        <g fill="#f4ece1" fontFamily="'Cormorant Garamond', Georgia, serif">
          <text x="115" y="155" fontSize="22" fillOpacity="0.9">Producer Queue</text>
          <text x="115" y="182" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">INGESTION</text>

          <text x="342" y="138" fontSize="24">Scheduler Core</text>
          <text x="342" y="168" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">STATE MACHINE</text>

          <text x="575" y="155" fontSize="22" fillOpacity="0.9">Worker Pool</text>
          <text x="575" y="182" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">EXECUTION</text>

          <text x="235" y="340" fontSize="24" fillOpacity="0.92">Persistent Event Log &amp; Telemetry Store</text>
          <text x="235" y="368" fontSize="11" fill="#d8b48a" fontFamily="'IBM Plex Mono', monospace" letterSpacing="2">POSTGRESQL · REDIS STREAM</text>
        </g>
      </svg>
    );
  }

  if (type === 'algorithms') {
    return (
      <svg viewBox="0 0 800 500" className="w-full h-full object-cover bg-[#0d0d11]">
        <defs>
          <radialGradient id="warmGlow2" cx="70%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#c97d42" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0d0d11" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#warmGlow2)" />
        {/* Weighted Graph Traversal Composition */}
        <g stroke="#e8dfd3" strokeOpacity="0.2" strokeWidth="1.5">
          <line x1="160" y1="260" x2="310" y2="140" stroke="#d8b48a" strokeOpacity="0.75" strokeWidth="2" />
          <line x1="310" y1="140" x2="490" y2="170" stroke="#d8b48a" strokeOpacity="0.75" strokeWidth="2" />
          <line x1="490" y1="170" x2="640" y2="250" stroke="#d8b48a" strokeOpacity="0.75" strokeWidth="2" />
          <line x1="160" y1="260" x2="330" y2="350" />
          <line x1="310" y1="140" x2="330" y2="350" />
          <line x1="330" y1="350" x2="520" y2="340" />
          <line x1="490" y1="170" x2="520" y2="340" />
          <line x1="520" y1="340" x2="640" y2="250" />
        </g>
        {[
          { x: 160, y: 260, active: true, label: 'S' },
          { x: 310, y: 140, active: true, label: 'A' },
          { x: 490, y: 170, active: true, label: 'B' },
          { x: 640, y: 250, active: true, label: 'T' },
          { x: 330, y: 350, active: false, label: 'C' },
          { x: 520, y: 340, active: false, label: 'D' }
        ].map((node, idx) => (
          <g key={idx}>
            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={node.active ? '#1d1712' : '#121217'}
              stroke={node.active ? '#e0b079' : '#f4ece1'}
              strokeOpacity={node.active ? '0.9' : '0.28'}
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y + 6}
              textAnchor="middle"
              fill="#f4ece1"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="16"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full object-cover bg-[#0d0d11]">
      <defs>
        <radialGradient id="warmGlow3" cx="40%" cy="60%" r="65%">
          <stop offset="0%" stopColor="#b8733e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0d0d11" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#warmGlow3)" />
      {/* Editorial Typography & Knowledge Graph Layout */}
      <rect x="110" y="75" width="580" height="350" rx="6" fill="#121216" stroke="#f4ece1" strokeOpacity="0.16" />
      <line x1="270" y1="75" x2="270" y2="425" stroke="#f4ece1" strokeOpacity="0.12" />
      <g fill="#f4ece1">
        <text x="140" y="130" fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="#d8b48a" letterSpacing="2">INDEX</text>
        <rect x="140" y="155" width="90" height="8" rx="2" fillOpacity="0.35" />
        <rect x="140" y="180" width="75" height="8" rx="2" fillOpacity="0.2" />
        <rect x="140" y="205" width="82" height="8" rx="2" fillOpacity="0.2" />

        <text x="315" y="150" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="34" fillOpacity="0.92">
           Systems &amp; Notes
        </text>
        <rect x="315" y="180" width="310" height="10" rx="2" fillOpacity="0.3" />
        <rect x="315" y="202" width="280" height="10" rx="2" fillOpacity="0.3" />
        <rect x="315" y="224" width="240" height="10" rx="2" fillOpacity="0.2" />
        <rect x="315" y="268" width="320" height="95" rx="4" fill="#191614" stroke="#d8b48a" strokeOpacity="0.35" />
        <text x="335" y="305" fontFamily="'IBM Plex Mono', monospace" fontSize="13" fill="#e0b885">
          SELECT title, slug FROM notes WHERE indexed = 1;
        </text>
      </g>
    </svg>
  );
};

// Font stacks matching the exact specification:
// - ADITYA SINHA & Section headings: Cormorant Garamond
// - Navigation, Role / eyebrow text, Project metadata: IBM Plex Mono
// - Paragraphs & Buttons: DM Sans
const DISPLAY_FONT_STACK = "'Cormorant Garamond', Georgia, serif";
const MONO_FONT_STACK = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS_FONT_STACK = "'DM Sans', system-ui, -apple-system, sans-serif";

// Sets the animation delay used by the page-load sequence
const delay = (seconds) => ({ '--d': seconds });

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollAnimRef = useRef(0);

  // Reduced-motion preference + Cormorant Garamond, IBM Plex Mono, and DM Sans from Google Fonts
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      if (fontLink.parentNode) fontLink.parentNode.removeChild(fontLink);
    };
  }, []);

  // Scroll choreography observer for content sections (independent of Jupiter)
  useEffect(() => {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Let the person take over: any wheel or touch cancels a running scroll animation
  useEffect(() => {
    const cancel = () => cancelAnimationFrame(scrollAnimRef.current);
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    return () => {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    };
  }, []);

  // Heavy scroll: long ease-in-out, duration grows with distance
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + window.scrollY;

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    cancelAnimationFrame(scrollAnimRef.current);
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(2400, 1000 + Math.abs(distance) * 0.35);
    const startTime = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(t));
      if (t < 1) scrollAnimRef.current = requestAnimationFrame(step);
    };
    scrollAnimRef.current = requestAnimationFrame(step);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('adityasinhaa001@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div
      className="min-h-screen bg-[#050508] text-[#f5efe6] selection:bg-[#d8a974] selection:text-[#08080c] overflow-x-hidden antialiased"
      style={{ fontFamily: SANS_FONT_STACK }}
    >
      {/* Editorial typography system + heavy motion */}
      <style>{`
        .font-display {
          font-family: ${DISPLAY_FONT_STACK};
          letter-spacing: -0.01em;
        }
        :where(.font-display) { font-weight: 500; }

        .font-mono-tech {
          font-family: ${MONO_FONT_STACK};
        }

        .font-sans-body {
          font-family: ${SANS_FONT_STACK};
        }

        /* ---------- Page-load sequence: one slow, weighty entrance ---------- */
        @keyframes stageIn {
          from { opacity: 0; transform: translate3d(5%, 4%, 0) scale(1.14); }
          to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes skyIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lineUp  { from { transform: translate3d(0, 108%, 0); } to { transform: translate3d(0, 0, 0); } }
        @keyframes riseIn  {
          from { opacity: 0; transform: translate3d(0, 44px, 0); filter: blur(10px); }
          to   { opacity: 1; transform: translate3d(0, 0, 0);    filter: blur(0); }
        }
        @keyframes growX   { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes scrollDot {
          0%   { transform: translateY(-110%); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translateY(64px);  opacity: 0; }
        }

        .stage-in { animation: stageIn 3.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; transform-origin: 80% 40%; will-change: transform, opacity; }
        .sky-in   { animation: skyIn 2.6s ease-out both; }
        .mask-line { display: block; overflow: hidden; padding-bottom: 0.06em; margin-bottom: -0.06em; }
        .mask-line > span { display: block; animation: lineUp 1.9s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0s) both; will-change: transform; }
        .rise-in  { animation: riseIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0s) both; }
        .grow-x   { transform-origin: left center; animation: growX 1.7s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0s) both; }
        .scroll-dot { animation: scrollDot 3s cubic-bezier(0.45, 0, 0.2, 1) infinite; }

        /* Text that sits over the bright planet: dark halo so it never washes out */
        .on-planet { text-shadow: 0 1px 2px rgba(0,0,0,0.95), 0 0 14px rgba(0,0,0,0.8), 0 0 36px rgba(0,0,0,0.6); }

        /* ---------- Buttons and links: slow in, slow out ---------- */
        .btn-heavy {
          transition:
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-heavy:hover  { transform: translate3d(0, -3px, 0); }
        .btn-heavy:active { transform: translate3d(0, 0, 0) scale(0.98); transition-duration: 0.25s; }
        .nav-link { transition: color 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

        /* ---------- Scroll reveals: long and heavy ---------- */
        [data-reveal] {
          opacity: 0;
          transform: translate3d(0, 64px, 0);
          transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        [data-reveal="mask"] {
          clip-path: inset(14% 0 14% 0);
          transform: translate3d(0, 48px, 0) scale(0.975);
          transition: opacity 1.9s cubic-bezier(0.16, 1, 0.3, 1), transform 1.9s cubic-bezier(0.16, 1, 0.3, 1), clip-path 1.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal].is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          clip-path: inset(0% 0 0% 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .stage-in, .sky-in, .mask-line > span, .rise-in, .grow-x, .scroll-dot { animation: none !important; }
          .btn-heavy, .nav-link { transition: none !important; }
          [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* =====================================================================
          SECTION 1: HERO — GIGANTIC JUPITER (JUPITER EXISTS ONLY HERE)
         ===================================================================== */}
      <header className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#040508]">
        <NightSkyBackdrop prefersReducedMotion={prefersReducedMotion} />

        <HeroJupiterScene prefersReducedMotion={prefersReducedMotion} />

        {/* Readability vignettes: left for the type, bottom for the footer line */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(90deg, rgba(4,5,8,0.72) 0%, rgba(4,5,8,0.34) 38%, rgba(4,5,8,0) 62%), linear-gradient(180deg, rgba(4,5,8,0.62) 0%, rgba(4,5,8,0) 20%), linear-gradient(0deg, rgba(4,5,8,0.7) 0%, rgba(4,5,8,0) 28%)'
          }}
          aria-hidden="true"
        />

        {/* Top navigation */}
        <nav
          aria-label="Primary Navigation"
          className="relative z-30 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-20 pt-8 pb-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <a
              href="#top"
              className="font-mono-tech text-[11px] font-medium tracking-[2.5px] uppercase text-[#f5efe6]/80 hover:text-[#f5efe6] transition-colors lg:opacity-0 lg:pointer-events-none"
            >
              AS
            </a>
          </div>

          <div className="hidden md:flex items-center gap-10 lg:gap-14 rise-in" style={delay('1.9s')}>
            <div className="flex items-center gap-9 lg:gap-12 border-b border-[#f5efe6]/40 pb-4">
              {[
                { label: 'About', id: 'about' },
                { label: 'Projects', id: 'projects' },
                { label: 'Skills', id: 'skills' },
                { label: 'Journey', id: 'journey' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-mono-tech nav-link on-planet text-[10px] lg:text-[11px] font-normal tracking-[2.5px] uppercase text-white hover:text-[#e6c79c] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* The line and dot open the portfolio assistant; the label slides out on hover */}
            <button
              onClick={() => setAssistantOpen(true)}
              className="font-mono-tech group flex items-center gap-3 text-[10px] lg:text-[11px] font-normal tracking-[2.5px] uppercase on-planet text-[#f0d3a8] hover:text-white cursor-pointer transition-colors duration-700"
              aria-label="Ask the portfolio assistant"
              title="Ask the portfolio assistant"
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[7rem] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Ask AI
              </span>
              <span className="flex items-center">
                <span className="w-14 h-[1px] bg-[#f5efe6]/60 group-hover:w-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="w-2 h-2 rounded-full bg-[#f5efe6]" />
              </span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setAssistantOpen(true)}
              className="font-sans-body px-4 py-2.5 rounded-full border border-[#f5efe6]/25 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#dfc19b]"
            >
              Ask AI
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-[#f5efe6] border border-[#f5efe6]/25 rounded-full"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile navigation overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#050508]/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-6 p-3 text-[#f5efe6] border border-[#f5efe6]/20 rounded-full"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
            {['about', 'projects', 'skills', 'journey', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="font-display text-5xl font-medium tracking-wider uppercase text-[#f5efe6] hover:text-[#dfc19b]"
              >
                {id}
              </button>
            ))}
          </div>
        )}

        {}
        {/* Hero copy: left-aligned, large */}
        <div className="relative z-20 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-20 my-auto py-7 lg:py-5">
          <div className="max-w-[38rem]">
            {/* Welcome line — Role / eyebrow text: IBM Plex Mono, 11-12px, uppercase */}
            <div className="flex items-center gap-5 mb-4">
              <span className="grow-x block w-12 h-[1px] bg-[#d8b48a]/80" style={delay('0.6s')} />
              <p
                className="font-mono-tech rise-in text-[11px] lg:text-[12px] font-normal tracking-[2.5px] uppercase text-[#e8dfd3]/95"
                style={delay('0.7s')}
              >
                Welcome to my portfolio
              </p>
            </div>

            {/* Name — ADITYA SINHA: Cormorant Garamond, 112-128px desktop, weight 500, tight line-height */}
            <h1
              className="font-display uppercase leading-[0.88] tracking-[-0.01em] mb-5 select-text"
              style={{ fontSize: 'clamp(4.25rem, 7.8vw, 8rem)', fontWeight: 500 }}
            >
              <span className="mask-line">
                <span className="text-[#FAF6F0] drop-shadow-[0_6px_30px_rgba(0,0,0,0.65)]" style={delay('0.9s')}>
                  ADITYA
                </span>
              </span>
              <span className="mask-line">
                <span className="text-[#E6C79C] drop-shadow-[0_6px_34px_rgba(0,0,0,0.8)]" style={delay('1.1s')}>
                  SINHA
                </span>
              </span>
            </h1>

            {/* Role — IBM Plex Mono, 11-12px, uppercase */}
            <p
              className="font-mono-tech rise-in text-[11px] lg:text-[12px] font-normal uppercase tracking-[2.5px] text-[#e4dbd0]/95 leading-[1.7] mb-5"
              style={delay('1.4s')}
            >
              <span className="block">Computer Science Engineering Student</span>
              <span className="block">Full-Stack Developer · AI/ML Enthusiast</span>
            </p>

            {/* Supporting sentence — Paragraphs: DM Sans, 16-18px, line-height 1.6 */}
            <p
              className="font-sans-body rise-in text-[16px] lg:text-[18px] font-normal leading-[1.6] text-[#f5efe6]/90 max-w-[26rem] mb-8"
              style={delay('1.6s')}
            >
              Building practical digital experiences through code.
            </p>

            {/* Actions — Buttons: DM Sans, 11-12px, weight 600, uppercase */}
            <div className="rise-in flex flex-wrap items-center gap-4 sm:gap-5" style={delay('1.8s')}>
              <button
                onClick={() => scrollToSection('projects')}
                className="font-sans-body btn-heavy group inline-flex items-center gap-3 px-7 sm:px-8 py-4 rounded-full bg-[#F7F1E5] text-[#09090c] text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#ecd9bf] shadow-[0_0_44px_rgba(247,241,229,0.18)] cursor-pointer"
              >
                <span>Explore my work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="font-sans-body btn-heavy inline-flex items-center justify-center px-7 sm:px-8 py-4 rounded-full border border-[#f5efe6]/40 bg-[#08080c]/40 backdrop-blur-sm text-[#f5efe6] text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase hover:border-[#e6c79c] hover:text-[#e6c79c] cursor-pointer"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>

        {/* Hero footer: scroll cue left, Jupiter caption right */}
        <div className="relative z-20 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-20 pb-9 pt-4 flex items-end justify-between">
          <button
            onClick={() => scrollToSection('about')}
            className="rise-in group flex items-end gap-5 text-left cursor-pointer"
            style={delay('2.3s')}
            aria-label="Scroll to About section"
          >
            <div className="flex flex-col items-center">
              <span className="relative block w-[1px] h-16 overflow-hidden bg-[#f5efe6]/25">
                <span className="scroll-dot absolute left-0 top-0 block w-full h-6 bg-[#f5efe6]" />
              </span>
              <span className="w-2 h-2 rounded-full bg-[#f5efe6] group-hover:scale-150 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>
            <span className="font-mono-tech text-[11px] font-normal tracking-[2.5px] uppercase text-[#e4dbd0]/85 group-hover:text-[#f5efe6] transition-colors duration-700 pb-0.5">
              Scroll to explore
            </span>
          </button>

          <div className="rise-in hidden md:block pb-1" style={delay('2.5s')}>
            <span className="block w-12 h-[1px] bg-[#f5efe6]/60 mb-4" />
            <p className="font-mono-tech text-[11px] font-medium tracking-[2.5px] uppercase on-planet text-white">Jupiter</p>
            <p className="font-mono-tech mt-1.5 text-[10px] font-normal tracking-[2px] uppercase on-planet text-[#f5efe6]/85">A giant of persistence</p>
            <p className="font-mono-tech mt-1 text-[10px] font-normal tracking-[2px] uppercase on-planet text-[#f5efe6]/85">A reminder to keep building</p>
          </div>
        </div>
      </header>

      {}
      {/* =====================================================================
          SECTION 2: ABOUT — EDITORIAL INTRODUCTION (NO JUPITER HERE)
         ===================================================================== */}
      <section 
        id="about" 
        className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#07070a] border-t border-[#f5efe6]/10"
      >
        <div className="max-w-[1360px] mx-auto">
          <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Section Label & Number */}
            <div className="lg:col-span-4">
              <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
                01 / ABOUT
              </p>
              <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.08] text-[#FAF6F0]">
                {VERIFIED_PORTFOLIO_DATA.about.heading}
              </h2>
            </div>

            {/* Main Editorial Copy */}
            <div className="lg:col-span-8 lg:pl-8 space-y-8">
              <p className="font-display font-normal text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.3] text-[#e8dfd3]">
                {VERIFIED_PORTFOLIO_DATA.about.lead}
              </p>

              <div className="font-sans-body grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 text-[16px] lg:text-[18px] leading-[1.6] text-[#c9bfb2]">
                {VERIFIED_PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Three Pillars of Practice */}
              <div className="pt-10 border-t border-[#f5efe6]/15 grid grid-cols-1 md:grid-cols-3 gap-8">
                {VERIFIED_PORTFOLIO_DATA.about.focusAreas.map((area, idx) => (
                  <div key={idx} className="space-y-3">
                    <span className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a]">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-[28px] font-medium text-[#f5efe6]">
                      {area.title}
                    </h3>
                    <p className="font-sans-body text-[16px] leading-[1.6] text-[#b8afa2]">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: SELECTED PROJECTS — BESPOKE EDITORIAL SHOWCASE
         ===================================================================== */}
      <section 
        id="projects" 
        className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#050508] border-t border-[#f5efe6]/10"
      >
        <div className="max-w-[1360px] mx-auto">
          {/* Section Header */}
          <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-28 gap-6">
            <div>
              <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
                02 / SELECTED WORK
              </p>
              <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.06] text-[#FAF6F0]">
                Selected Projects
              </h2>
            </div>
            <p className="font-sans-body text-[16px] lg:text-[18px] text-[#b8afa2] max-w-md leading-[1.6]">
              Full-stack web, mobile, and AI/ML applications built to solve practical problems.
            </p>
          </div>

          {/* Alternating Editorial Project Spreads */}
          <div className="space-y-28 lg:space-y-36">
            {VERIFIED_PORTFOLIO_DATA.projects.map((project, index) => {
              const isEven = index % 2 === 1;
              return (
                <article
                  key={project.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-12 border-t border-[#f5efe6]/15"
                >
                  {/* Project Editorial Details */}
                  <div
                    data-reveal
                    className={`lg:col-span-5 space-y-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {/* Project metadata: IBM Plex Mono, 10-11px */}
                    <div className="font-mono-tech flex items-center justify-between text-[10px] lg:text-[11px] tracking-[2.5px] uppercase text-[#d8b48a]">
                      <span>PROJECT {project.id}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display text-[38px] sm:text-[44px] lg:text-[52px] font-medium leading-[1.08] text-[#FAF6F0]">
                      {project.title}
                    </h3>

                    {/* Project metadata: IBM Plex Mono, 10-11px */}
                    <p className="font-mono-tech text-[10px] lg:text-[11px] tracking-[2px] uppercase text-[#cfc4b6]">
                      {project.category}
                    </p>

                    {/* Paragraphs: DM Sans, 16-18px, line-height 1.6 */}
                    <p className="font-sans-body text-[16px] lg:text-[18px] leading-[1.6] text-[#c2b8ab]">
                      {project.description}
                    </p>

                    {/* Honest Editable Status Indicator — Project metadata: IBM Plex Mono, 10-11px */}
                    <div className="font-mono-tech inline-block px-3.5 py-2 rounded-md bg-[#13110f] border border-[#d8b48a]/30 text-[10px] lg:text-[11px] tracking-[1px] text-[#e6c79c]">
                      {project.status}
                    </div>

                    {/* Technology List — Project metadata: IBM Plex Mono, 10-11px */}
                    <div className="font-mono-tech flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[10px] lg:text-[11px] uppercase tracking-[1.5px] text-[#dfd5c7]">
                      {project.tech.map((t, i) => (
                        <span key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d8b48a]" />
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <a
                        href={project.link}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection('contact');
                        }}
                        className="font-sans-body inline-flex items-center gap-2.5 text-[11px] lg:text-[12px] font-semibold tracking-[0.14em] uppercase text-[#FAF6F0] hover:text-[#e6c79c] border-b border-[#FAF6F0]/40 pb-1.5 transition-colors"
                      >
                        <span>Inquire or Configure Link</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Project Visual Canvas with Mask Reveal */}
                  <div
                    data-reveal="mask"
                    className={`lg:col-span-7 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#f5efe6]/15 bg-[#0c0c10] shadow-2xl group">
                      <ProjectEditorialArtwork type={project.featuredVisual} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: SKILLS — ORGANIZED TECHNICAL CAPABILITIES
         ===================================================================== */}
      <section 
        id="skills" 
        className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#07070a] border-t border-[#f5efe6]/10"
      >
        <div className="max-w-[1360px] mx-auto">
          <div data-reveal className="mb-20">
            <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
              03 / TECHNICAL CAPABILITIES
            </p>
            <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.06] text-[#FAF6F0] max-w-3xl">
              Languages, Frameworks &amp; Engineering Tools
            </h2>
          </div>

          <div className="divide-y divide-[#f5efe6]/15 border-t border-b border-[#f5efe6]/15">
            {VERIFIED_PORTFOLIO_DATA.skills.map((group, idx) => (
              <div
                key={idx}
                data-reveal
                className="py-12 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-4">
                  <span className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-[34px] sm:text-[40px] font-medium text-[#FAF6F0]">
                    {group.category}
                  </h3>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">
                  {group.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="font-sans-body text-[16px] lg:text-[18px] leading-[1.6] text-[#e4dbd0] flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d8b48a]/80 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: JOURNEY — EDITORIAL TIMELINE
         ===================================================================== */}
      <section 
        id="journey" 
        className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#050508] border-t border-[#f5efe6]/10"
      >
        <div className="max-w-[1360px] mx-auto">
          <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
                04 / JOURNEY
              </p>
              <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.06] text-[#FAF6F0] mb-6">
                Education &amp; Growth
              </h2>
              <p className="font-sans-body text-[16px] lg:text-[18px] text-[#b8afa2] leading-[1.6]">
                A transparent record of academic study and continuous self-directed software building.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-12 border-l border-[#f5efe6]/15 pl-8 sm:pl-12">
              {VERIFIED_PORTFOLIO_DATA.journey.map((item, idx) => (
                <div key={idx} data-reveal className="relative space-y-3">
                  <span className="absolute -left-[37px] sm:-left-[53px] top-2 w-2.5 h-2.5 rounded-full bg-[#e6c79c] ring-4 ring-[#050508]" />
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a]">
                      {item.period}
                    </span>
                    {item.isPlaceholder && (
                      <span className="font-mono-tech text-[10px] lg:text-[11px] px-2.5 py-0.5 rounded bg-[#181410] border border-[#d8b48a]/30 text-[#e6c79c]">
                        Editable Institution Placeholder
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-[34px] sm:text-[42px] font-medium text-[#FAF6F0]">
                    {item.title}
                  </h3>
                  <p className="font-mono-tech text-[11px] lg:text-[12px] uppercase tracking-[2px] text-[#cfc4b6]">
                    {item.institution}
                  </p>
                  <p className="font-sans-body text-[16px] lg:text-[18px] text-[#b8afa2] leading-[1.6] max-w-2xl pt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: CONTACT — MINIMAL CLOSING COMPOSITION
         ===================================================================== */}
      <footer 
        id="contact" 
        className="relative z-20 pt-28 sm:pt-36 lg:pt-44 pb-16 px-6 sm:px-12 lg:px-16 bg-[#040407] border-t border-[#f5efe6]/15"
      >
        <div className="max-w-[1360px] mx-auto">
          <div data-reveal className="max-w-4xl">
            <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-5">
              05 / CONTACT
            </p>
            <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.04] text-[#FAF6F0] mb-8">
              Let’s build something enduring.
            </h2>
            <p className="font-sans-body text-[16px] lg:text-[18px] text-[#c2b8ab] leading-[1.6] max-w-2xl mb-12">
              Open to software engineering opportunities, collaborative computer science projects, and thoughtful conversations.
            </p>

            {/* Primary Contact Actions — Buttons: DM Sans, 11-12px, weight 600, uppercase */}
            <div className="flex flex-wrap items-center gap-5 mb-16">
              <button
                onClick={handleCopyEmail}
                className="font-sans-body inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-[#F7F1E5] text-[#09090c] text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-[#e6c79c] btn-heavy cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>EMAIL COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setAssistantOpen(true)}
                className="font-sans-body inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#f5efe6]/30 text-[#f5efe6] text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase hover:border-[#e6c79c] hover:text-[#e6c79c] btn-heavy cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#e6c79c]" />
                <span>ASK PORTFOLIO ASSISTANT</span>
              </button>
            </div>

            {/* Verified Contact Placeholders Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-[#f5efe6]/15">
              <div>
                <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] mb-2">Email</p>
                <p className="font-sans-body text-[16px] leading-[1.6] text-[#e4dbd0]">{VERIFIED_PORTFOLIO_DATA.contact.email}</p>
              </div>
              <div>
                <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] mb-2">GitHub</p>
                <p className="font-sans-body text-[16px] leading-[1.6] text-[#e4dbd0]">{VERIFIED_PORTFOLIO_DATA.contact.github}</p>
              </div>
              <div>
                <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] mb-2">LinkedIn</p>
                <p className="font-sans-body text-[16px] leading-[1.6] text-[#e4dbd0]">{VERIFIED_PORTFOLIO_DATA.contact.linkedin}</p>
              </div>
            </div>
          </div>

          {/* Bottom Colophon */}
          <div className="font-mono-tech mt-28 pt-8 border-t border-[#f5efe6]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] lg:text-[11px] tracking-[2.5px] uppercase text-[#9c9286]">
            <span>© {new Date().getFullYear()} ADITYA SINHA</span>
            <span>COMPUTER SCIENCE ENGINEERING STUDENT · FULL-STACK DEVELOPER · AI/ML ENTHUSIAST</span>
          </div>
        </div>
      </footer>

      {/* Grounded Editorial AI Assistant Drawer */}
      <PortfolioAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
      />
    </div>
  );
}