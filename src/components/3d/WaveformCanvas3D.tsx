import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WaveformCanvas3DProps {
  isPlaying?: boolean;
}

export const WaveformCanvas3D: React.FC<WaveformCanvas3DProps> = ({ isPlaying = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x161514, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 8, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    // Optimized 3D Waveform Plane Grid (20x12 segments for smooth 60fps)
    const width = 28;
    const height = 18;
    const widthSegments = isMobile ? 14 : 20;
    const heightSegments = isMobile ? 10 : 12;

    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    geometry.rotateX(-Math.PI / 2.5);

    const count = geometry.attributes.position.count;
    const posAttribute = geometry.attributes.position;

    const material = new THREE.MeshBasicMaterial({
      color: 0xC5A059,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Floating ambient audio particles
    const particleCount = isMobile ? 12 : 24;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 24;
      particlePos[i * 3 + 1] = Math.random() * 6 - 2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xF0C870,
      size: 0.2,
      transparent: true,
      opacity: 0.4,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause rendering when section is off-screen
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip rendering if section is not visible in viewport!

      const time = clock.getElapsedTime();
      const speed = isPlaying ? 2.5 : 1.0;
      const amplitude = isPlaying ? 1.2 : 0.6;

      if (!prefersReducedMotion) {
        for (let i = 0; i < count; i++) {
          const x = posAttribute.getX(i);
          const z = posAttribute.getZ(i);

          const distance = Math.sqrt(x * x + z * z);
          const y = Math.sin(distance * 0.5 - time * speed) * Math.cos(x * 0.3 + time) * amplitude;

          posAttribute.setY(i, y);
        }

        posAttribute.needsUpdate = true;
        mesh.rotation.z = Math.sin(time * 0.2) * 0.05;
        particleSystem.rotation.y = time * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80 overflow-hidden"
      aria-hidden="true"
    />
  );
};
