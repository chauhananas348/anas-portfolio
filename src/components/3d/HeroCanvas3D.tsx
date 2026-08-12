import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f2ed, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x1a1a1a, 1.5);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x8a8172, 2, 30);
    pointLight.position.set(-8, -5, 5);
    scene.add(pointLight);

    // Group for 3D elements
    const group = new THREE.Group();
    scene.add(group);

    // 1. Code Polyhedron (Octahedron Wireframe + Solid Core)
    const octaGeo = new THREE.OctahedronGeometry(2.2, 0);
    const octaMatWire = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const octaMeshWire = new THREE.Mesh(octaGeo, octaMatWire);

    const octaMatSolid = new THREE.MeshPhongMaterial({
      color: 0xd5d0c5,
      shininess: 30,
      transparent: true,
      opacity: 0.4,
    });
    const octaMeshSolid = new THREE.Mesh(octaGeo, octaMatSolid);
    octaMeshSolid.scale.set(0.9, 0.9, 0.9);

    const codeGroup = new THREE.Group();
    codeGroup.add(octaMeshWire);
    codeGroup.add(octaMeshSolid);
    codeGroup.position.set(-6, 2, -2);
    group.add(codeGroup);

    // 2. Sound Torus (Ring Wave)
    const torusGeo = new THREE.TorusGeometry(2.5, 0.1, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x8a8172,
      metalness: 0.2,
      roughness: 0.4,
      transparent: true,
      opacity: 0.5,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);

    const torusGeoInner = new THREE.TorusGeometry(1.8, 0.04, 12, 80);
    const torusMatInner = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torusMeshInner = new THREE.Mesh(torusGeoInner, torusMatInner);

    const soundGroup = new THREE.Group();
    soundGroup.add(torusMesh);
    soundGroup.add(torusMeshInner);
    soundGroup.position.set(6.5, -2.5, -1);
    soundGroup.rotation.x = Math.PI / 3;
    group.add(soundGroup);

    // 3. Floating 3D Code/Sound Particles (Floating Cubes & Points)
    const particleCount = prefersReducedMotion ? 20 : 65;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      scales[i] = Math.random() * 0.12 + 0.03;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x1a1a1a,
      size: 0.15,
      transparent: true,
      opacity: 0.3,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    group.add(particleSystem);

    // Floating 3D Small Cubes
    const smallCubes: THREE.Mesh[] = [];
    const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const cubeMat = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    for (let i = 0; i < 8; i++) {
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(cube);
      smallCubes.push(cube);
    }

    // Mouse movement parallax state
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetMouseX = (e.clientX - windowHalfX) * 0.0008;
      targetMouseY = (e.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates for smooth parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Rotate objects gently
        codeGroup.rotation.x = elapsedTime * 0.2;
        codeGroup.rotation.y = elapsedTime * 0.3;
        codeGroup.position.y = 2 + Math.sin(elapsedTime * 0.8) * 0.4;

        soundGroup.rotation.z = elapsedTime * 0.25;
        soundGroup.rotation.y = elapsedTime * 0.15;
        soundGroup.position.y = -2.5 + Math.cos(elapsedTime * 0.7) * 0.3;

        smallCubes.forEach((cube, idx) => {
          cube.rotation.x += 0.005;
          cube.rotation.y += 0.008;
          cube.position.y += Math.sin(elapsedTime + idx) * 0.003;
        });

        particleSystem.rotation.y = elapsedTime * 0.02;
      }

      // Camera parallax shift
      camera.position.x = currentMouseX * 12;
      camera.position.y = -currentMouseY * 12;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
