"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneLink = { href: string; color: string };

export default function HeroScene({ links }: { links: SceneLink[] }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 700px)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf3f8ef, 0.065);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.15, compact ? 10.5 : 9);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !compact, alpha: true, powerPreference: "high-performance" });
    } catch {
      mount.dataset.webgl = "unavailable";
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.25 : 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.rotation.x = -0.08;
    scene.add(world);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x173624, 2.8));
    const key = new THREE.DirectionalLight(0xd8ffca, 5.5);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x7cffb1, 35, 18, 2);
    rim.position.set(-4, -2, 4);
    scene.add(rim);

    const core = new THREE.Group();
    const coreGeometry = new THREE.IcosahedronGeometry(1.08, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x153e28,
      emissive: 0x071b10,
      emissiveIntensity: 1.1,
      metalness: 0.38,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    core.add(coreMesh);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.28, 2),
      new THREE.MeshBasicMaterial({ color: 0x6ea47d, wireframe: true, transparent: true, opacity: 0.16 }),
    );
    shell.rotation.set(0.3, 0.5, 0.1);
    core.add(shell);

    const haloMaterial = new THREE.MeshBasicMaterial({ color: 0x75d59a, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.012, 8, 180), haloMaterial);
    halo.rotation.x = Math.PI / 2.65;
    core.add(halo);
    world.add(core);

    const orbitColors = [0xdd7a31, 0x27785b, 0x6558a6, 0x8db89b];
    const orbitRadii = [2.75, 3.45, 4.08, 4.62];
    const orbitMeshes: THREE.Mesh[] = [];
    const pivots: THREE.Group[] = [];
    const connectionPositions = new Float32Array(links.length * 6);
    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute("position", new THREE.BufferAttribute(connectionPositions, 3));
    const connections = new THREE.LineSegments(
      connectionGeometry,
      new THREE.LineBasicMaterial({ color: 0x3d7655, transparent: true, opacity: 0.22 }),
    );
    world.add(connections);

    links.forEach((link, index) => {
      const radius = orbitRadii[index] ?? 4.6;
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.62, 0, Math.PI * 2);
      const points = curve.getPoints(180).map((point) => new THREE.Vector3(point.x, point.y, 0));
      const orbit = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: orbitColors[index], transparent: true, opacity: 0.12 }),
      );
      orbit.rotation.x = 0.52 + index * 0.14;
      orbit.rotation.z = index * 0.75;
      world.add(orbit);

      const pivot = new THREE.Group();
      pivot.rotation.x = orbit.rotation.x;
      pivot.rotation.z = orbit.rotation.z;
      pivot.rotation.y = index * 1.8;
      const geometry = index === 0
        ? new THREE.OctahedronGeometry(0.38, 1)
        : index === 1
          ? new THREE.DodecahedronGeometry(0.37, 0)
          : index === 2
            ? new THREE.TetrahedronGeometry(0.46, 1)
            : new THREE.SphereGeometry(0.28, 20, 20);
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(link.color),
        emissive: new THREE.Color(link.color).multiplyScalar(0.16),
        metalness: 0.2,
        roughness: 0.24,
        clearcoat: 0.9,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = radius;
      mesh.userData.href = link.href;
      mesh.userData.baseScale = 1;
      pivot.add(mesh);
      world.add(pivot);
      orbitMeshes.push(mesh);
      pivots.push(pivot);
    });

    const particleCount = compact ? 180 : 420;
    const particlePositions = new Float32Array(particleCount * 3);
    let seed = 8128;
    const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.2 + random() * 5.4;
      const angle = random() * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (random() - 0.5) * 6.5;
      particlePositions[i * 3 + 2] = (random() - 0.5) * 5;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0x4e9868, size: compact ? 0.025 : 0.035, transparent: true, opacity: 0.5, depthWrite: false }),
    );
    world.add(particles);

    const pointer = new THREE.Vector2(4, 4);
    const raycaster = new THREE.Raycaster();
    let hovered: THREE.Mesh | null = null;
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const next = raycaster.intersectObjects(orbitMeshes, false)[0]?.object as THREE.Mesh | undefined;
      hovered = next ?? null;
      renderer.domElement.style.cursor = hovered ? "pointer" : "grab";
    };
    const onPointerLeave = () => { pointer.set(0, 0); hovered = null; renderer.domElement.style.cursor = "grab"; };
    const onClick = () => { const href = hovered?.userData.href as string | undefined; if (href) window.location.assign(href); };
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);
    mount.addEventListener("click", onClick);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (!reduceMotion) {
        core.rotation.y = elapsed * 0.22;
        core.rotation.x = Math.sin(elapsed * 0.35) * 0.12;
        shell.rotation.z = -elapsed * 0.12;
        particles.rotation.y = elapsed * 0.018;
        pivots.forEach((pivot, index) => { pivot.rotation.y = index * 1.8 + elapsed * (0.12 + index * 0.018); });
        world.rotation.y += ((pointer.x * 0.2) - world.rotation.y) * 0.025;
        world.rotation.x += ((-0.08 + pointer.y * 0.12) - world.rotation.x) * 0.025;
      }

      orbitMeshes.forEach((mesh, index) => {
        const target = mesh === hovered ? 1.45 : 1;
        mesh.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
        mesh.rotation.x += reduceMotion ? 0 : 0.006 + index * 0.001;
        mesh.rotation.y += reduceMotion ? 0 : 0.009;
        const position = new THREE.Vector3();
        mesh.getWorldPosition(position);
        connectionPositions[index * 6 + 3] = position.x;
        connectionPositions[index * 6 + 4] = position.y;
        connectionPositions[index * 6 + 5] = position.z;
      });
      connectionGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      if (!reduceMotion) frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      mount.removeEventListener("click", onClick);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const material = object.material as THREE.Material | THREE.Material[];
          if (Array.isArray(material)) material.forEach((item) => item.dispose()); else material?.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [links]);

  return <div ref={mountRef} className="hero-webgl" aria-hidden="true" />;
}
