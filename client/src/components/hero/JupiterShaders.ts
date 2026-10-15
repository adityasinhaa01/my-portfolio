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

  float sq(float x) { return x * x; }

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
    // Quintic Hermite curve: smooth 1st and 2nd derivatives, no grid creases
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

  // 6-octave Fractal Brownian Motion for rich atmospheric cloud formations
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.50;
    vec3 shift = vec3(100.0, 43.1, 67.8);
    for (int i = 0; i < 6; i++) {
      v += a * gradNoise(p);
      p = p * 2.06 + shift;
      a *= 0.49;
    }
    return v;
  }

  // Ridged multifractal for crisp atmospheric shear boundaries, festoons, and curling vortices
  float ridgedFbm(vec3 p) {
    float v = 0.0;
    float a = 0.50;
    for (int i = 0; i < 5; i++) {
      float n = gradNoise(p);
      n = 1.0 - abs(n * 1.8);
      n = max(0.0, n);
      v += a * n * n;
      p = p * 2.14 + vec3(31.7, 17.3, 53.1);
      a *= 0.48;
    }
    return v;
  }

  // Fine, horizontally stretched cloud filaments running along the zonal jet streams
  float fbmFilaments(vec3 p) {
    float v = 0.0;
    float a = 0.50;
    vec3 shift = vec3(17.4, 38.2, 59.1);
    for (int i = 0; i < 4; i++) {
      v += a * gradNoise(p);
      p = p * vec3(1.80, 2.20, 1.80) + shift;
      a *= 0.48;
    }
    return v * 0.5 + 0.5;
  }

  // Zonal palette: authentic cream/ivory zones against terracotta, caramel and burnt-orange belts
  vec3 getJupiterBandColor(float lat, float detail, float eddy, float microDetail) {
    vec3 cream       = vec3(0.97, 0.91, 0.81); // Luminous ivory/cream zone
    vec3 ivory       = vec3(0.91, 0.83, 0.70); // Warm ivory intermediate
    vec3 beigeZone   = vec3(0.82, 0.72, 0.58); // Muted beige intermediate
    vec3 amber       = vec3(0.85, 0.56, 0.28); // Golden amber
    vec3 burntOrange = vec3(0.76, 0.38, 0.15); // Rich burnt orange
    vec3 rust        = vec3(0.56, 0.24, 0.10); // Deep rust / mahogany
    vec3 darkBrown   = vec3(0.25, 0.11, 0.05); // Dark barges & deep troughs
    vec3 polarTint   = vec3(0.36, 0.33, 0.32); // High-latitude polar hood
    vec3 festoonBlue = vec3(0.46, 0.50, 0.54); // Equatorial festoons

    // Zonal harmonic waves: primary planetary bands
    float zoneWave1 = sin(lat * 18.0);
    float zoneWave2 = cos(lat * 37.0 + 0.6);
    float zoneWave3 = sin(lat * 75.0 - 1.2);
    float microBands = sin(lat * 86.0 + detail * 3.2) * 0.10;

    float bandSignal = zoneWave1 * 0.50 + zoneWave2 * 0.28 + zoneWave3 * 0.18 + microBands + (microDetail - 0.5) * 0.18;

    // Distinct planetary belts
    float neb = exp(-sq((lat - 0.19) * 11.5));
    float seb = exp(-sq((lat + 0.21) * 10.5));
    float eqZone = exp(-sq(lat * 13.0));
    float ntb = exp(-sq((lat - 0.44) * 16.0));
    float stb = exp(-sq((lat + 0.46) * 15.0));
    float beltMask = clamp(neb * 1.1 + seb * 1.1 + (ntb + stb) * 0.8, 0.0, 1.0);

    // Base atmospheric tone: luminous ivory zones vs warm golden tan / amber bands
    vec3 col = mix(ivory, cream, smoothstep(-0.35, 0.55, bandSignal));
    col = mix(col, amber, smoothstep(-0.10, 0.45, -bandSignal + detail * 0.35));
    col = mix(col, beigeZone, smoothstep(0.20, 0.80, zoneWave2) * 0.35);

    // North Equatorial Belt (NEB) with rich rust, dark mahogany rifts and churning eddies
    vec3 nebCol = mix(rust, burntOrange, smoothstep(0.30, 0.70, microDetail));
    nebCol = mix(nebCol, darkBrown, smoothstep(0.45, 0.80, detail) * 0.75);
    col = mix(col, nebCol, neb * (0.80 + 0.20 * eddy));

    // South Equatorial Belt (SEB) with burnt orange and amber wisps
    vec3 sebCol = mix(burntOrange, amber, smoothstep(0.35, 0.75, microDetail));
    col = mix(col, sebCol, seb * (0.85 + 0.15 * detail));

    // Equatorial Zone (EZ): pure luminous cream with subtle warm streaks
    col = mix(col, cream * 1.02, eqZone * 0.88);

    // Equatorial Festoons: bluish-slate veils looping into the southern EZ from the NEB
    float festoonLat = exp(-sq((lat - 0.08) * 22.0));
    col = mix(col, festoonBlue, festoonLat * smoothstep(0.46, 0.76, eddy) * 0.68);

    // Temperate belts
    col = mix(col, rust, (ntb + stb) * 0.70);

    // Fine, razor-sharp filaments and vortex streaks:
    // Dark rifts occur inside the belts, while bright white/cream filaments highlight all zones!
    col = mix(col, darkBrown, beltMask * smoothstep(0.60, 0.86, eddy) * 0.48);
    col = mix(col, cream * 1.06, smoothstep(0.58, 0.85, microDetail) * 0.38);

    // Polar hoods: soft muted gradient towards poles
    float polarMask = smoothstep(0.56, 0.94, abs(lat));
    col = mix(col, polarTint, polarMask * 0.72);
    // Subtle circumpolar swirls in polar hoods
    col = mix(col, vec3(0.25, 0.29, 0.32), polarMask * smoothstep(0.52, 0.82, eddy) * 0.30);

    return col;
  }

  void main() {
    vec3 pos = normalize(vObjectPos);
    float lat = pos.y;
    float lon = atan(pos.z, pos.x);
    float T = uTime;
    // Zonal jet displacement: subtle organic wave displacement across latitude
    // CRITICAL: Must be time-independent or strictly bounded! 
    // Unbounded jet * T caused differential shear d(drift)/d(lat) to explode over time,
    // stretching coordinates and blurring fine filaments. Keeping drift bounded guarantees
    // the crisp, high-definition atmospheric structures remain razor-sharp forever.
    float jet = sin(lat * 26.0) * 0.55 + cos(lat * 54.0) * 0.25 + sin(lat * 9.0) * 0.35;
    float drift = jet * 0.35;
    float cs = cos(drift);
    float sn = sin(drift);
    vec2 xz = vec2(pos.x * cs - pos.z * sn, pos.x * sn + pos.z * cs);

    // Multiscale spatial sampling vector: horizontally stretched to mirror Jupiter's high zonal wind shear
    vec3 sp = vec3(xz.x * 2.2, lat * 6.8, xz.y * 2.2);

    // Multi-stage domain warp:
    // Stable 3D coordinate offsets ensure cloud structures rotate solidly with the planet
    float warp1 = fbm(sp * 1.35 + vec3(12.3, 4.5, 8.1));
    float warp2 = fbm(sp * 2.70 + vec3(warp1 * 2.2, -warp1 * 1.7, 3.3));
    float eddy = ridgedFbm(sp * 3.20 + vec3(warp2 * 1.8, warp1 * 1.1, 5.7));

    // microDetail: fine, horizontally elongated cloud filaments running along the belts
    vec3 filamentCoord = vec3(xz.x * 2.4 + warp2 * 0.35, lat * 20.0 + (warp1 * 0.5 + eddy * 0.35) * 2.2, xz.y * 2.4 - warp1 * 0.35);
    float microDetail = fbmFilaments(filamentCoord);

    // Organic wavy latitude: undulates the belt boundaries according to planetary wave turbulence
    float wavyLat = lat + (warp1 - 0.5) * 0.078 + (warp2 - 0.5) * 0.044 + (eddy - 0.5) * 0.026;
    wavyLat = clamp(wavyLat, -0.98, 0.98);

    // Compute base multiscale cloud deck color
    vec3 surfaceColor = getJupiterBandColor(wavyLat, warp2 * 0.65 + microDetail * 0.35, eddy, microDetail);

    // Convective storm towers (bright pearl-white ammonia heads with trailing wisps)
    float tower = smoothstep(0.78, 0.93, eddy) * smoothstep(0.35, 0.60, microDetail);
    surfaceColor = mix(surfaceColor, vec3(1.0, 0.97, 0.92), tower * 0.60);

    // Elongated dark barges in the North Equatorial Belt
    float barge = smoothstep(0.60, 0.80, warp1) * smoothstep(0.40, 0.72, eddy) * exp(-sq((lat - 0.19) * 10.0));
    surfaceColor = mix(surfaceColor, vec3(0.20, 0.09, 0.05), barge * 0.65);

    // === GREAT RED SPOT ===
    float grsLatCenter = -0.38;
    float grsLonCenter = 0.42;
    float dLon = atan(sin(lon - grsLonCenter), cos(lon - grsLonCenter));
    float dLat = lat - grsLatCenter;

    // GRS elliptical coordinate space (~2.5:1 aspect ratio)
    vec2 grsCoord = vec2(dLon / 0.38, dLat / 0.145);
    float grsDist = length(grsCoord);

    if (grsDist < 2.2) {
      float angle = atan(grsCoord.y, grsCoord.x);

      // Swirling logarithmic spiral vortex: anticyclonic counter-clockwise flow
      float swirl = angle + grsDist * 5.6 - pow(max(0.0, 1.25 - grsDist), 1.6) * 4.8;
      vec3 swirlPos = vec3(cos(swirl) * grsDist * 3.6, sin(swirl) * grsDist * 3.6, grsDist * 3.2);

      float grsNoise = fbm(swirlPos * 2.2);
      float grsRidge = ridgedFbm(swirlPos * 3.5);
      float grsFilaments = fbmFilaments(vec3(swirlPos.xy * 4.8, swirlPos.z * 1.8));

      // Multi-layer structure of the Great Red Spot:
      // 1. Red Spot Hollow: pale cradle carved into the surrounding SEB
      float hollowMask = smoothstep(2.0, 1.25, grsDist);
      // 2. High-speed outer collar ring
      float collarMask = smoothstep(1.65, 1.05, grsDist) * smoothstep(0.65, 1.10, grsDist);
      // 3. Deep terracotta/orange core
      float coreMask = smoothstep(1.05, 0.18, grsDist);
      // 4. Inner brick-red nucleus / eye
      float eyeMask = smoothstep(0.38, 0.0, grsDist);

      vec3 grsHollowCream = vec3(0.95, 0.88, 0.78);
      vec3 grsOuterCollar = vec3(0.92, 0.82, 0.70);
      vec3 grsTerracotta  = vec3(0.84, 0.32, 0.12);
      vec3 grsCoreOrange  = vec3(0.92, 0.44, 0.17);
      vec3 grsDeepRust    = vec3(0.50, 0.14, 0.05);
      vec3 grsWhiteWisps  = vec3(0.97, 0.92, 0.86);

      // Rich swirling core with internal filamentary streaks
      vec3 spotCol = mix(grsTerracotta, grsCoreOrange, grsNoise * 0.5 + 0.5);
      spotCol = mix(spotCol, grsDeepRust, grsRidge * 0.72);
      spotCol = mix(spotCol, grsWhiteWisps, smoothstep(0.58, 0.84, grsFilaments) * 0.35);
      spotCol = mix(spotCol, grsDeepRust * 0.75, eyeMask * 0.50);

      // Blend layers into the surrounding atmosphere
      surfaceColor = mix(surfaceColor, grsHollowCream * (0.85 + 0.25 * grsNoise), hollowMask * 0.45);
      surfaceColor = mix(surfaceColor, grsOuterCollar * (0.88 + 0.22 * grsNoise), collarMask * 0.78);
      surfaceColor = mix(surfaceColor, spotCol, coreMask);

      // Turbulent wake extending downstream (westward) of the spot
      float wakeMask = smoothstep(-0.02, 0.32, dLon) * smoothstep(0.82, 0.32, dLon) * smoothstep(0.16, 0.03, abs(dLat));
      surfaceColor = mix(surfaceColor, mix(vec3(0.94, 0.90, 0.82), vec3(0.34, 0.15, 0.06), grsNoise), wakeMask * 0.52 * smoothstep(0.32, 0.68, eddy));
    }

    // Smaller storms: White Oval in South Temperate Zone + Northern Cyclone
    float ovalLat = lat + 0.68;
    float ovalLon = atan(sin(lon - 0.70), cos(lon - 0.70));
    float ovalDist = length(vec2(ovalLon / 0.11, ovalLat / 0.055));
    if (ovalDist < 1.3) {
      float ovalMask = smoothstep(1.2, 0.15, ovalDist);
      surfaceColor = mix(surfaceColor, vec3(0.98, 0.94, 0.88), ovalMask * 0.85);
    }

    float cycLat = lat - 0.37;
    float cycLon = atan(sin(lon + 0.95), cos(lon + 0.95));
    float cycDist = length(vec2(cycLon / 0.16, cycLat / 0.07));
    if (cycDist < 1.4) {
      float cycMask = smoothstep(1.3, 0.2, cycDist);
      surfaceColor = mix(surfaceColor, vec3(0.28, 0.12, 0.06), cycMask * 0.70);
    }

    // === CLOUD-TOP 3D RELIEF & PHOTOMETRIC LIGHTING ===
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPosition);
    vec3 L = normalize(uSunDirection);

    // Volumetric cloud height function:
    // Higher in ammonia zones, GRS core, and convective plumes; lower in dark rifts and barges
    float cloudHeight = (warp2 * 0.45 + eddy * 0.35 + (microDetail - 0.5) * 0.15);
    if (grsDist < 1.6) {
      cloudHeight += smoothstep(1.4, 0.1, grsDist) * 0.24;
    }
    cloudHeight += tower * 0.16 - barge * 0.14;

    // Controlled normal perturbation from cloud-height relief without noisy derivative spikes
    vec2 dH = vec2(dFdx(cloudHeight), dFdy(cloudHeight));
    dH = clamp(dH, -0.038, 0.038);
    vec3 perturbedN = normalize(N + vec3(dH.x, dH.y, 0.0) * 0.48);

    float NdotL = dot(perturbedN, L);
    float smoothNdotL = dot(N, L);
    float NdotV = max(0.0, dot(N, V));

    // Gas giant diffuse illumination with subtle cloud-height modulation
    float heightRelief = 0.90 + 0.20 * cloudHeight;
    float diffuse = smoothstep(-0.16, 0.88, NdotL) * heightRelief;

    // Minnaert photometric limb darkening (preserves deep spherical atmosphere)
    float limbDarkening = pow(NdotV, 0.24);

    // Warm sunlight illumination
    vec3 sunColor = vec3(1.08, 0.98, 0.88);

    // Atmospheric terminator twilight band (long optical path through methane/haze)
    vec3 twilightTint = vec3(0.52, 0.23, 0.09);
    float terminatorBand = smoothstep(-0.20, 0.10, smoothNdotL) * smoothstep(0.42, 0.00, smoothNdotL);

    vec3 litColor = surfaceColor * sunColor * diffuse * limbDarkening;
    litColor += surfaceColor * twilightTint * terminatorBand * 0.42;

    // Atmospheric forward scattering on the sunlit limb (soft golden-ivory rim)
    float fresnel = pow(1.0 - NdotV, 3.2);
    float sunwardLimb = smoothstep(-0.05, 0.72, smoothNdotL);
    vec3 atmosphereGlow = vec3(1.0, 0.85, 0.65) * fresnel * sunwardLimb * 0.88;

    // Atmospheric specular haze sheen (broad, subtle gas giant haze)
    vec3 H = normalize(L + V);
    float spec = pow(max(0.0, dot(perturbedN, H)), 18.0) * smoothstep(0.05, 0.55, smoothNdotL);
    litColor += vec3(0.96, 0.88, 0.78) * spec * 0.06;

    // Shadow hemisphere: dark cinematic cosmic atmosphere with faint thermal infrared glow & night lightning
    float darkSide = 1.0 - smoothstep(-0.10, 0.25, smoothNdotL);
    vec3 ember = vec3(0.92, 0.28, 0.08) * pow(1.0 - NdotV, 2.5) * darkSide * (0.35 + 0.65 * eddy) * 0.16;

    // Atmospheric night lightning deep within the cloud deck
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
    vec3 lightning = vec3(1.0, 0.80, 0.55) * flash * darkSide * 2.6 * (0.4 + 0.6 * smoothstep(0.3, 0.7, eddy));

    vec3 nightAmbient = surfaceColor * vec3(0.020, 0.017, 0.022);
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
