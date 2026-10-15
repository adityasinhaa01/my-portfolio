export const JUPITER_VERTEX_SHADER = `
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

export const JUPITER_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  varying vec3 vObjectPos;

  uniform vec3 uSunDirection;
  uniform float uTime;

  // --- Smooth Quintic Hermite Gradient Noise (C2-continuous, zero-grid artifacts) ---
  vec3 hash3(vec3 p) {
    p = vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gradNoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    // Quintic Hermite curve (C2 continuous: smooth 1st and 2nd derivatives, no grid creases)
    vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    return mix(
      mix(
        mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
            dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
        mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
            dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x),
        u.y
      ),
      mix(
        mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
            dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
        mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
            dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x),
        u.y
      ),
      u.z
    );
  }

  // Multi-scale Fractional Brownian Motion with smooth amplitude falloff
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.52;
    vec3 shift = vec3(23.41, 14.23, 31.78);
    for (int i = 0; i < 5; i++) {
      v += a * gradNoise(p);
      p = p * 2.08 + shift;
      a *= 0.46;
    }
    return v;
  }

  // Smooth, billowing atmospheric turbulence without harsh cusps
  float smoothTurbulence(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      float n = gradNoise(p);
      v += a * (1.0 - abs(n));
      p = p * 2.04 + vec3(17.1, 31.5, 12.8);
      a *= 0.48;
    }
    return v;
  }

  // --- Photorealistic NASA Juno/Cassini Atmospheric Zonal Color Profile ---
  vec3 getJupiterBandColor(float lat, float flow1, float flow2) {
    // Calibrated natural gas giant palette
    vec3 cBrightWhite  = vec3(0.97, 0.94, 0.88); // High-altitude ammonia ice clouds
    vec3 cCreamZone    = vec3(0.93, 0.88, 0.79); // Luminous ivory zones
    vec3 cPaleTan      = vec3(0.85, 0.76, 0.65); // Warm tan intermediate bands
    vec3 cGoldenAmber  = vec3(0.82, 0.58, 0.32); // Warm golden amber
    vec3 cCaramelBelt  = vec3(0.74, 0.46, 0.22); // Rich caramel cloud belt
    vec3 cBurntOrange  = vec3(0.68, 0.36, 0.16); // Deep burnt orange / terracotta
    vec3 cMahogany     = vec3(0.48, 0.22, 0.10); // Dark mahogany (deep belt roots)
    vec3 cDarkBrown    = vec3(0.30, 0.14, 0.07); // Dark barges & storm troughs
    vec3 cFestoonBlue  = vec3(0.50, 0.53, 0.56); // Subtle bluish-grey equatorial festoon veils
    vec3 cPolarHaze    = vec3(0.36, 0.38, 0.42); // High-latitude slate polar hood

    // Zonal harmonic waves: primary planetary bands
    float w1 = sin(lat * 18.0);
    float w2 = cos(lat * 36.0 + 0.4);
    float w3 = sin(lat * 64.0 - 0.8);

    // Continuous primary band signal with gentle atmospheric harmonics
    float bandSignal = w1 * 0.54 + w2 * 0.28 + w3 * 0.18;

    // Distinct planetary belts (Gaussian-damped latitude zones)
    // 1. Equatorial Zone (EZ): lat ~ 0.0 (wide, luminous ivory)
    float ez = exp(-((lat) * (lat)) * 140.0);
    
    // 2. North Equatorial Belt (NEB): lat ~ +0.18 (broad, rich mahogany/terracotta)
    float neb = exp(-((lat - 0.18) * (lat - 0.18)) * 110.0);
    
    // 3. South Equatorial Belt (SEB): lat ~ -0.22 (active caramel/burnt orange)
    float seb = exp(-((lat + 0.22) * (lat + 0.22)) * 95.0);
    
    // 4. North Temperate Belt (NTB): lat ~ +0.42
    float ntb = exp(-((lat - 0.42) * (lat - 0.42)) * 180.0);
    
    // 5. South Temperate Belt (STB): lat ~ -0.46
    float stb = exp(-((lat + 0.46) * (lat + 0.46)) * 170.0);

    // 6. Tropical Zones (NTrZ / STrZ)
    float ntrz = exp(-((lat - 0.32) * (lat - 0.32)) * 220.0);
    float strz = exp(-((lat + 0.33) * (lat + 0.33)) * 200.0);

    // Base atmospheric tone: smooth gradient between ivory zones and golden tan bands
    vec3 col = mix(cPaleTan, cCreamZone, smoothstep(-0.35, 0.45, bandSignal));
    col = mix(col, cGoldenAmber, smoothstep(-0.15, 0.50, -bandSignal + flow1 * 0.25));

    // Deepen the North Equatorial Belt (NEB) with mahogany, caramel and dark barges
    vec3 nebColor = mix(cBurntOrange, cMahogany, smoothstep(-0.1, 0.3, flow1));
    nebColor = mix(nebColor, cDarkBrown, smoothstep(0.35, 0.65, flow2) * 0.45);
    col = mix(col, nebColor, neb * 0.88);

    // South Equatorial Belt (SEB) with rich caramel, burnt orange and turbulent wisps
    vec3 sebColor = mix(cCaramelBelt, cBurntOrange, smoothstep(-0.2, 0.4, flow1));
    col = mix(col, sebColor, seb * 0.85);

    // Equatorial Zone (EZ): luminous cream with delicate warm ivory center
    col = mix(col, cBrightWhite, ez * 0.72);
    // Subtle blue-grey festoons along northern/southern margins of EZ
    float festoon = exp(-((lat - 0.08) * (lat - 0.08)) * 320.0);
    col = mix(col, cFestoonBlue, festoon * smoothstep(0.15, 0.55, flow2) * 0.50);

    // Temperate belts
    col = mix(col, cCaramelBelt, ntb * 0.75);
    col = mix(col, cBurntOrange, stb * 0.70);

    // Bright tropical zones (pure ammonia ice reflections)
    col = mix(col, cBrightWhite, (ntrz + strz) * 0.55);

    // Fine organic cloud streamers (subtle, non-stippled filaments)
    col = mix(col, cBrightWhite, smoothstep(0.40, 0.75, flow1) * 0.18);
    col = mix(col, cDarkBrown, smoothstep(0.55, 0.85, flow2) * 0.15);

    // Polar hoods: soft blue-grey / slate gradient towards poles
    float polar = smoothstep(0.56, 0.92, abs(lat));
    col = mix(col, cPolarHaze, polar * 0.68);

    return col;
  }

  void main() {
    vec3 pos = normalize(vObjectPos);
    float lat = pos.y;
    float lon = atan(pos.z, pos.x);
    float T = uTime;

    // Differential rotation: equatorial jets flow eastward (faster), higher latitudes flow westward
    float jet = sin(lat * 24.0) * 0.42 + cos(lat * 48.0) * 0.20 + sin(lat * 8.0) * 0.38;
    float drift = jet * T * 0.010 + jet * 0.30;
    float cs = cos(drift);
    float sn = sin(drift);
    vec2 xz = vec2(pos.x * cs - pos.z * sn, pos.x * sn + pos.z * cs);

    // Anisotropic spatial sampling:
    // Stretched horizontally (X and Z at 1.8, Y at 14.0) to reflect Jupiter's 8:1 zonal jet shear ratio!
    vec3 sp = vec3(xz.x * 1.8, lat * 14.0, xz.y * 1.8);

    // Smooth 2-stage domain warp creating fluid atmospheric vortices and festoons
    // Moderate sampling frequencies prevent high-frequency speckling or aliasing
    float warp1 = fbm(sp * 0.95 + vec3(12.3, 4.5, 8.1 + T * 0.008));
    float warp2 = fbm(sp * 2.10 + vec3(warp1 * 1.8, -warp1 * 1.4, 3.3 + T * 0.012));
    float eddy = smoothTurbulence(sp * 2.60 + vec3(warp2 * 1.4, warp1 * 0.9, T * 0.016));

    // Wavy latitude: creates organic planetary wave ripples along the cloud band borders
    float wavyLat = lat + warp1 * 0.040 + warp2 * 0.022 + eddy * 0.012;
    wavyLat = clamp(wavyLat, -0.98, 0.98);

    // Compute base cloud deck color
    vec3 surfaceColor = getJupiterBandColor(wavyLat, warp2, eddy);

    // Smooth convective cloud plumes (soft white puffs, not harsh dots)
    float tower = smoothstep(0.72, 0.92, eddy) * smoothstep(0.20, 0.50, warp2);
    surfaceColor = mix(surfaceColor, vec3(0.98, 0.96, 0.92), tower * 0.42);

    // Elongated dark barges inside the North Equatorial Belt
    float barge = smoothstep(0.55, 0.78, warp1) * exp(-((lat - 0.18) * (lat - 0.18)) * 160.0);
    surfaceColor = mix(surfaceColor, vec3(0.26, 0.12, 0.06), barge * 0.52);

    // === GREAT RED SPOT ===
    float grsLatCenter = -0.38;
    float grsLonCenter = 0.42;
    float dLon = atan(sin(lon - grsLonCenter), cos(lon - grsLonCenter));
    float dLat = lat - grsLatCenter;

    // GRS elliptical coordinate space (Jupiter's spot is ~2.5:1 ellipse)
    vec2 grsCoord = vec2(dLon / 0.38, dLat / 0.15);
    float grsDist = length(grsCoord);

    if (grsDist < 2.2) {
      float angle = atan(grsCoord.y, grsCoord.x);
      
      // Smooth anticyclonic counter-clockwise vortex rotation
      float swirl = angle + grsDist * 4.6 - pow(max(0.0, 1.25 - grsDist), 1.5) * 3.8 - T * 0.14;
      vec3 swirlPos = vec3(cos(swirl) * grsDist * 3.2, sin(swirl) * grsDist * 3.2, grsDist * 2.8 + T * 0.015);

      float grsNoise = fbm(swirlPos * 1.8);
      float grsEddy = smoothTurbulence(swirlPos * 2.4);

      // Multi-layer masks for the GRS structure:
      // Outer cradle / hollow in the surrounding SEB
      float hollowMask = smoothstep(2.1, 1.3, grsDist);
      // Pale outer collar ring (seen in JunoCam high-res photos)
      float collarMask = smoothstep(1.55, 1.05, grsDist) * smoothstep(0.65, 1.10, grsDist);
      // Deep terracotta core
      float coreMask = smoothstep(1.10, 0.30, grsDist);
      // Inner brick-red eye / nucleus
      float eyeMask = smoothstep(0.40, 0.05, grsDist);

      vec3 grsHollowCream = vec3(0.95, 0.90, 0.82);
      vec3 grsOuterCollar = vec3(0.92, 0.84, 0.72);
      vec3 grsTerracotta  = vec3(0.82, 0.34, 0.14);
      vec3 grsCoreOrange  = vec3(0.90, 0.44, 0.18);
      vec3 grsDeepCrimson = vec3(0.60, 0.18, 0.07);

      // Rich swirling core
      vec3 spotCol = mix(grsTerracotta, grsCoreOrange, grsNoise * 0.7 + 0.3);
      spotCol = mix(spotCol, grsDeepCrimson, grsEddy * 0.5);
      spotCol = mix(spotCol, grsDeepCrimson * 0.85, eyeMask * 0.6);

      // Seamlessly integrate with the surrounding atmosphere:
      // 1. Pale GRS hollow in the SEB
      surfaceColor = mix(surfaceColor, grsHollowCream, hollowMask * 0.45);
      // 2. Collar ring
      surfaceColor = mix(surfaceColor, grsOuterCollar * (0.90 + 0.20 * grsNoise), collarMask * 0.75);
      // 3. Iconic red storm core
      surfaceColor = mix(surfaceColor, spotCol, coreMask);
    }

    // Smaller storms: white oval in South Temperate Zone + dark cyclone in the north
    float ovalLat = lat + 0.68;
    float ovalLon = atan(sin(lon - 0.70), cos(lon - 0.70));
    float ovalDist = length(vec2(ovalLon / 0.11, ovalLat / 0.055));
    if (ovalDist < 1.3) {
      float ovalMask = smoothstep(1.2, 0.15, ovalDist);
      surfaceColor = mix(surfaceColor, vec3(0.97, 0.93, 0.86), ovalMask * 0.82);
    }

    float cycLat = lat - 0.37;
    float cycLon = atan(sin(lon + 0.95), cos(lon + 0.95));
    float cycDist = length(vec2(cycLon / 0.16, cycLat / 0.07));
    if (cycDist < 1.4) {
      float cycMask = smoothstep(1.3, 0.2, cycDist);
      surfaceColor = mix(surfaceColor, vec3(0.28, 0.13, 0.07), cycMask * 0.65);
    }

    // === ATMOSPHERIC LIGHTING & LIMB PHOTOMETRY ===
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPosition);
    vec3 L = normalize(uSunDirection);

    float NdotL = dot(N, L);
    float NdotV = max(0.0, dot(N, V));

    // Gas giant diffuse illumination:
    // Soft, realistic multi-scattering with gentle shadow transition
    float diffuse = smoothstep(-0.20, 0.85, NdotL);

    // Subtle cloud-deck depth shading (gentle self-shadowing between high zones & deep belts)
    // Uses smooth low-frequency flow rather than high-frequency screen derivatives!
    float cloudShade = 0.92 + 0.08 * (warp1 * 0.6 + warp2 * 0.4);
    diffuse *= cloudShade;

    // Minnaert / Lommel-Seeliger Gas Giant Limb Darkening:
    // Soft power curve gives thick, deep atmospheric volume
    float limbDarkening = pow(NdotV, 0.24);

    // Sunlight color: warm, crisp sunlight
    vec3 sunColor = vec3(1.08, 0.98, 0.88);

    // Terminator twilight reddening: sunlight passes through deep atmospheric path
    vec3 twilightTint = vec3(0.55, 0.25, 0.10);
    float terminatorBand = smoothstep(-0.20, 0.08, NdotL) * smoothstep(0.40, 0.00, NdotL);

    vec3 litColor = surfaceColor * sunColor * diffuse * limbDarkening;
    litColor += surfaceColor * twilightTint * terminatorBand * 0.40;

    // Atmospheric forward scattering on the sunlit limb (soft golden-ivory rim)
    float fresnel = pow(1.0 - NdotV, 3.2);
    float sunwardLimb = smoothstep(-0.05, 0.75, NdotL);
    vec3 atmosphereGlow = vec3(1.0, 0.85, 0.65) * fresnel * sunwardLimb * 0.90;

    // Soft specular sheen: very gentle, broad highlight (gas giant haze, not shiny plastic)
    vec3 H = normalize(L + V);
    float spec = pow(max(0.0, dot(N, H)), 18.0) * smoothstep(0.1, 0.6, NdotL);
    litColor += vec3(0.95, 0.88, 0.78) * spec * 0.06;

    // Nightside / shadow hemisphere:
    // Retain dark cinematic atmosphere with subtle internal thermal glow and night ambient
    float darkSide = 1.0 - smoothstep(-0.10, 0.25, NdotL);
    vec3 ember = vec3(0.92, 0.28, 0.08) * pow(1.0 - NdotV, 2.5) * darkSide * 0.14;

    // Faint atmospheric night lightning flashes (preserved from existing shader)
    float flash = 0.0;
    for (int k = 0; k < 6; k++) {
      float fk = float(k);
      float tt = T * 0.8 + fk * 7.31;
      float id = floor(tt);
      float ph = fract(tt);
      vec3 c = vec3(hash3(vec3(id, fk, 1.7))) * 2.0 - 1.0;
      c.y *= 0.6;
      c = normalize(c);
      float d = distance(pos, c);
      float pulse = exp(-ph * 5.0) * (0.6 + 0.4 * sin(ph * 50.0));
      flash += pulse * exp(-d * d * 260.0);
    }
    vec3 lightning = vec3(1.0, 0.80, 0.55) * flash * darkSide * 2.5;

    vec3 nightAmbient = surfaceColor * vec3(0.022, 0.018, 0.024);
    vec3 finalColor = max(litColor + atmosphereGlow, nightAmbient) + ember + lightning;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const HALO_FRAGMENT_SHADER = `
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
`;

export const RING_VERTEX_SHADER = `
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

export const RING_FRAGMENT_SHADER = `
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

export const MOON_FRAGMENT_SHADER = `
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
