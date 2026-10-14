import { useState, useEffect, useRef, type FC } from 'react';
import * as THREE from 'three';
import {
  JUPITER_VERTEX_SHADER,
  JUPITER_FRAGMENT_SHADER,
  HALO_FRAGMENT_SHADER,
  RING_VERTEX_SHADER,
  RING_FRAGMENT_SHADER,
  MOON_FRAGMENT_SHADER
} from './JupiterShaders';

interface HeroJupiterSceneProps {
  prefersReducedMotion: boolean;
}

const CAMERA_FOV = 10;
const CAMERA_DISTANCE = 21.77;
const JUPITER_RADIUS = 1.65;
const JUPITER_AXIAL_PERIOD_SECONDS = 180;

interface BreakpointLayout {
  radius: number;
  cx: number;
  cy: number;
  moons: [number, number, number, number][];
}

const JUPITER_LAYOUTS: Record<'desktop' | 'tablet' | 'mobile', BreakpointLayout> = {
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

export const HeroJupiterScene: FC<HeroJupiterSceneProps> = ({ prefersReducedMotion }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglSupported(false);
      return;
    }

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

    const sunDirection = new THREE.Vector3(-1.15, 0.42, 0.48).normalize();

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

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
      }
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.rotation.y = -1.495;
    tiltGroup.add(jupiterMesh);

    // 2. Sunlit atmospheric halo
    const haloGeo = new THREE.SphereGeometry(JUPITER_RADIUS * 1.02, 96, 96);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: JUPITER_VERTEX_SHADER,
      fragmentShader: HALO_FRAGMENT_SHADER,
      uniforms: { uSunDirection: { value: sunDirection } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide
    });
    tiltGroup.add(new THREE.Mesh(haloGeo, haloMat));

    // 3. Rings
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

    // 4. Moons
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

    const view = { width: 1, height: 1, worldWidth: 1, base: new THREE.Vector3(), scale: 1 };
    const worldCenter = new THREE.Vector3();

    const placeMoon = (
      m: { mesh: THREE.Mesh; fx: number; fy: number; fr: number; depth: number; phase: number },
      elapsed: number,
      px: number,
      py: number
    ) => {
      const fx = m.fx + Math.sin(elapsed * 0.05 + m.phase) * 0.006 + px * 0.010 * m.depth;
      const fy = m.fy + Math.cos(elapsed * 0.04 + m.phase) * 0.005 - py * 0.008 * m.depth;
      const sx = (fx - 0.5) * view.worldWidth;
      const sy = (0.5 - fy) * worldHeight;
      const k = (CAMERA_DISTANCE - m.depth) / CAMERA_DISTANCE;
      m.mesh.position.set(sx * k, sy * k, m.depth);
      m.mesh.scale.setScalar(m.fr * worldHeight * k);
    };

    const applyPositions = (elapsed: number, px: number, py: number) => {
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

    const mouse = { tx: 0, ty: 0, px: 0, py: 0 };
    const handlePointerMove = (e: PointerEvent) => {
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

    let isHeroVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { isHeroVisible = entry.isIntersecting; }),
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    let animationFrameId = 0;
    let lastTime = performance.now();
    const angularVelocity = (Math.PI * 2) / JUPITER_AXIAL_PERIOD_SECONDS;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!isHeroVisible) return;

      clockElapsed += dt;

      jupiterMesh.rotation.y += angularVelocity * dt;
      jupiterMat.uniforms.uTime.value = clockElapsed;
      ringMat.uniforms.uTime.value = clockElapsed;

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
