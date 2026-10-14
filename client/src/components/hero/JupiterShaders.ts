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
