'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type ImpactNetworkCanvasProps = {
  describedBy: string;
};

type Ray = {
  angle: number;
  direction: 1 | -1;
  endpointSize: number;
  length: number;
  opacity: number;
  phase: number;
  pulseCount: 1 | 2;
  startRadius: number;
  speed: number;
  tail: number;
};

type NetworkColors = {
  accent: THREE.Color;
  endpoint: THREE.Color;
  line: THREE.Color;
  muted: THREE.Color;
  spark: THREE.Color;
};

type SceneState = {
  accentRayGeometry: THREE.BufferGeometry;
  baseRayGeometry: THREE.BufferGeometry;
  camera: THREE.OrthographicCamera;
  endpointGeometry: THREE.BufferGeometry;
  endpointMaterial: THREE.PointsMaterial;
  headGeometry: THREE.BufferGeometry;
  headMaterial: THREE.PointsMaterial;
  heads: THREE.Points;
  rays: Ray[];
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  sparkGeometry: THREE.BufferGeometry;
  sparkMaterial: THREE.LineBasicMaterial;
  sparks: THREE.LineSegments;
};

const density = {
  desktop: 390,
  tablet: 248,
  mobile: 148,
};

export function ImpactNetworkCanvas({ describedBy }: ImpactNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<(() => void) | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const sceneRef = useRef<SceneState | null>(null);
  const visibleRef = useRef(false);
  const hiddenRef = useRef(false);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasMotion, setHasMotion] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;

    if (!canvas || !wrapper) {
      return;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = reducedMotionQuery.matches;
    setHasMotion(!reducedMotionQuery.matches);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -10, 10);
    camera.position.z = 1;

    let size = { width: 1, height: 1 };

    const renderFrame = (time: number) => {
      const state = sceneRef.current;

      if (!state) {
        return;
      }

      updateSparks(state, size, time, reducedMotionRef.current);
      state.renderer.render(state.scene, state.camera);
    };

    const stop = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const loop = (time: number) => {
      renderFrame(time);

      if (
        visibleRef.current &&
        !hiddenRef.current &&
        !pausedRef.current &&
        !reducedMotionRef.current
      ) {
        frameRef.current = requestAnimationFrame(loop);
      } else {
        frameRef.current = null;
      }
    };

    const start = () => {
      if (frameRef.current === null && !reducedMotionRef.current) {
        frameRef.current = requestAnimationFrame(loop);
      }
    };

    startRef.current = start;
    stopRef.current = stop;

    const rebuildScene = () => {
      const bounds = wrapper.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));

      size = { width, height };
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.left = 0;
      camera.right = width;
      camera.top = 0;
      camera.bottom = height;
      camera.updateProjectionMatrix();

      disposeSceneState(sceneRef.current);
      scene.clear();
      sceneRef.current = createSceneState(scene, camera, renderer, wrapper, width, height);
      renderFrame(0);
    };

    const resizeObserver = new ResizeObserver(rebuildScene);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = Boolean(entry?.isIntersecting);

        if (visibleRef.current) {
          start();
        } else {
          stop();
        }
      },
      {
        rootMargin: '160px 0px',
        threshold: 0.04,
      },
    );

    const handleVisibilityChange = () => {
      hiddenRef.current = document.hidden;

      if (hiddenRef.current) {
        stop();
      } else if (visibleRef.current) {
        start();
      }
    };

    const handleMotionChange = () => {
      reducedMotionRef.current = reducedMotionQuery.matches;
      setHasMotion(!reducedMotionQuery.matches);

      if (reducedMotionQuery.matches) {
        stop();
        renderFrame(0);
      } else if (visibleRef.current) {
        start();
      }
    };

    rebuildScene();
    resizeObserver.observe(wrapper);
    intersectionObserver.observe(wrapper);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotionQuery.addEventListener('change', handleMotionChange);

    return () => {
      stop();
      startRef.current = null;
      stopRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      disposeSceneState(sceneRef.current);
      sceneRef.current = null;
      renderer.dispose();
    };
  }, []);

  const togglePaused = () => {
    const nextPaused = !pausedRef.current;
    pausedRef.current = nextPaused;
    setIsPaused(nextPaused);

    if (nextPaused) {
      stopRef.current?.();
    } else if (visibleRef.current && !hiddenRef.current) {
      startRef.current?.();
    }
  };

  return (
    <div className="impact-network" aria-describedby={describedBy}>
      <canvas className="impact-network__canvas" ref={canvasRef} aria-hidden="true" />
      {hasMotion ? (
        <button
          className="impact-network__control"
          type="button"
          aria-pressed={isPaused}
          aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
          onClick={togglePaused}
        >
          {isPaused ? (
            <Play aria-hidden="true" size={16} />
          ) : (
            <Pause aria-hidden="true" size={16} />
          )}
          <span className="sr-only">{isPaused ? 'Resume animation' : 'Pause animation'}</span>
        </button>
      ) : null}
    </div>
  );
}

function createSceneState(
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera,
  renderer: THREE.WebGLRenderer,
  element: HTMLElement,
  width: number,
  height: number,
): SceneState {
  const rays = createRays(pathCountForWidth(width));
  const colors = readNetworkColors(element);
  const baseRayGeometry = new THREE.BufferGeometry();
  const accentRayGeometry = new THREE.BufferGeometry();
  const endpointGeometry = new THREE.BufferGeometry();
  const sparkGeometry = new THREE.BufferGeometry();
  const headGeometry = new THREE.BufferGeometry();
  const pulseTotal = rays.reduce((total, ray) => total + ray.pulseCount, 0);

  baseRayGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(createRayPositions(rays, width, height, false), 3),
  );
  accentRayGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(createRayPositions(rays, width, height, true), 3),
  );
  endpointGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(createEndpointPositions(rays, width, height), 3),
  );
  sparkGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(pulseTotal * 2 * 3), 3),
  );
  headGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(pulseTotal * 3), 3),
  );

  const baseRays = new THREE.LineSegments(
    baseRayGeometry,
    new THREE.LineBasicMaterial({
      color: colors.line,
      depthWrite: false,
      opacity: 0.3,
      transparent: true,
    }),
  );
  const accentRays = new THREE.LineSegments(
    accentRayGeometry,
    new THREE.LineBasicMaterial({
      color: colors.accent,
      depthWrite: false,
      opacity: 0.5,
      transparent: true,
    }),
  );
  const endpoints = new THREE.Points(
    endpointGeometry,
    new THREE.PointsMaterial({
      color: colors.muted,
      depthWrite: false,
      opacity: 0.5,
      size: 1.7,
      sizeAttenuation: false,
      transparent: true,
    }),
  );
  const sparkMaterial = new THREE.LineBasicMaterial({
    color: colors.spark,
    depthWrite: false,
    opacity: 0.72,
    transparent: true,
  });
  const sparks = new THREE.LineSegments(sparkGeometry, sparkMaterial);
  const headMaterial = new THREE.PointsMaterial({
    color: colors.endpoint,
    depthWrite: false,
    opacity: 0.84,
    size: 2,
    sizeAttenuation: false,
    transparent: true,
  });
  const heads = new THREE.Points(headGeometry, headMaterial);

  scene.add(baseRays, accentRays, endpoints, sparks, heads);

  return {
    accentRayGeometry,
    baseRayGeometry,
    camera,
    endpointGeometry,
    endpointMaterial: endpoints.material,
    headGeometry,
    headMaterial,
    heads,
    rays,
    renderer,
    scene,
    sparkGeometry,
    sparkMaterial,
    sparks,
  };
}

function updateSparks(
  state: SceneState,
  size: { width: number; height: number },
  time: number,
  reducedMotion: boolean,
) {
  const sparkPositions = state.sparkGeometry.getAttribute('position') as THREE.BufferAttribute;
  const headPositions = state.headGeometry.getAttribute('position') as THREE.BufferAttribute;
  const sparkArray = sparkPositions.array as Float32Array;
  const headArray = headPositions.array as Float32Array;
  let sparkIndex = 0;
  let headIndex = 0;

  state.rays.forEach((ray) => {
    for (let pulseIndex = 0; pulseIndex < ray.pulseCount; pulseIndex += 1) {
      const offset = pulseIndex / ray.pulseCount;
      const rawProgress = reducedMotion ? 0.72 : (time * ray.speed + ray.phase + offset) % 1;
      const progress = ray.direction === 1 ? rawProgress : 1 - rawProgress;
      const tailProgress =
        ray.direction === 1 ? Math.max(0, progress - ray.tail) : Math.min(1, progress + ray.tail);
      const tailPoint = pointOnRay(ray, size.width, size.height, tailProgress);
      const headPoint = pointOnRay(ray, size.width, size.height, progress);

      sparkArray[sparkIndex++] = tailPoint.x;
      sparkArray[sparkIndex++] = tailPoint.y;
      sparkArray[sparkIndex++] = 0;
      sparkArray[sparkIndex++] = headPoint.x;
      sparkArray[sparkIndex++] = headPoint.y;
      sparkArray[sparkIndex++] = 0;

      headArray[headIndex++] = headPoint.x;
      headArray[headIndex++] = headPoint.y;
      headArray[headIndex++] = 0;
    }
  });

  sparkPositions.needsUpdate = true;
  headPositions.needsUpdate = true;
}

function createRayPositions(rays: Ray[], width: number, height: number, accentOnly: boolean) {
  const selected = rays.filter((_, index) => (accentOnly ? index % 7 === 0 : index % 7 !== 0));
  const positions = new Float32Array(selected.length * 2 * 3);
  let index = 0;

  selected.forEach((ray) => {
    const start = pointOnRay(ray, width, height, 0);
    const end = pointOnRay(ray, width, height, 1);

    positions[index++] = start.x;
    positions[index++] = start.y;
    positions[index++] = 0;
    positions[index++] = end.x;
    positions[index++] = end.y;
    positions[index++] = 0;
  });

  return positions;
}

function createEndpointPositions(rays: Ray[], width: number, height: number) {
  const positions = new Float32Array(rays.length * 3);
  let index = 0;

  rays.forEach((ray) => {
    const point = pointOnRay(ray, width, height, 1);

    positions[index++] = point.x;
    positions[index++] = point.y;
    positions[index++] = 0;
  });

  return positions;
}

function pointOnRay(ray: Ray, width: number, height: number, progress: number) {
  const originX = width * 0.5;
  const originY = height * 1.12;
  const maxRadius = Math.min(width * 0.62, height * 1.48);
  const startDistance = maxRadius * ray.startRadius;
  const distance = startDistance + maxRadius * ray.length * progress;

  return {
    x: originX + Math.cos(ray.angle) * distance,
    y: originY + Math.sin(ray.angle) * distance,
  };
}

function pathCountForWidth(width: number) {
  if (width < 640) {
    return density.mobile;
  }

  if (width < 1024) {
    return density.tablet;
  }

  return density.desktop;
}

function createRays(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const random = seededRandom(index + count * 13);
    const fanProgress = count === 1 ? 0.5 : index / (count - 1);
    const fanStart = -Math.PI + 0.28;
    const fanEnd = -0.28;
    const angle = fanStart + fanProgress * (fanEnd - fanStart) + (random() - 0.5) * 0.044;
    const centerWeight = 1 - Math.abs(fanProgress - 0.5) * 1.35;
    const direction: 1 | -1 = random() > 0.94 ? -1 : 1;
    const pulseCount: 1 | 2 = random() > 0.88 ? 2 : 1;

    return {
      angle,
      direction,
      endpointSize: 0.8 + random() * 1.4,
      length: 0.64 + random() * 0.34 + Math.max(0, centerWeight) * 0.26,
      opacity: 0.12 + random() * 0.22,
      phase: random() * Math.PI * 2,
      pulseCount,
      startRadius: random() * 0.018,
      speed: 0.000062 + random() * 0.000052,
      tail: 0.032 + random() * 0.048,
    };
  });
}

function readNetworkColors(element: HTMLElement): NetworkColors {
  const styles = getComputedStyle(element);

  return {
    accent: readColor(styles, '--impact-network-accent', '--color-accent'),
    endpoint: readColor(styles, '--impact-network-endpoint', '--color-ink'),
    line: readColor(styles, '--impact-network-line', '--color-line-strong'),
    muted: readColor(styles, '--impact-network-muted', '--color-ink-muted'),
    spark: readColor(styles, '--impact-network-spark', '--color-ink'),
  };
}

function readColor(styles: CSSStyleDeclaration, preferredToken: string, fallbackToken: string) {
  const preferred = styles.getPropertyValue(preferredToken).trim();
  const fallback = styles.getPropertyValue(fallbackToken).trim();

  return new THREE.Color(preferred || fallback);
}

function disposeSceneState(state: SceneState | null) {
  if (!state) {
    return;
  }

  state.accentRayGeometry.dispose();
  state.baseRayGeometry.dispose();
  state.endpointGeometry.dispose();
  state.endpointMaterial.dispose();
  state.headGeometry.dispose();
  state.headMaterial.dispose();
  state.sparkGeometry.dispose();
  state.sparkMaterial.dispose();
}

function seededRandom(seed: number) {
  let current = seed;

  return () => {
    current = (current * 1664525 + 1013904223) % 4294967296;
    return current / 4294967296;
  };
}
