import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CodeSoundCoreCanvasProps {
  onCoreClick?: () => void;
}

export const CodeSoundCoreCanvas: React.FC<CodeSoundCoreCanvasProps> = ({
  onCoreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const pulseRef = useRef(0); // Click shockwave pulse

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const isMobile = window.innerWidth < 768;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF4EFE6, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Capped pixel ratio to prevent rendering millions of pixels on Retina displays
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25);
    renderer.setPixelRatio(dpr);
    renderer.shadowMap.enabled = false; // Disabled expensive shadow maps for 60fps performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // --- 2. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xfffaee, 1.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFF5E1, 1.8);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const goldPointLight = new THREE.PointLight(0xF0C870, 2.8, 12);
    goldPointLight.position.set(0, 0, 0);
    scene.add(goldPointLight);

    const rimLight = new THREE.DirectionalLight(0x7C836B, 1.0);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // --- 3. OPTIMIZED PROCEDURAL TEXTURES ---
    // A) Laptop Screen Code Snippet Texture (512x320 optimized size)
    const createScreenTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext('2d')!;

      // IDE Background
      ctx.fillStyle = '#181715';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Window Header Bar
      ctx.fillStyle = '#232220';
      ctx.fillRect(0, 0, canvas.width, 24);
      
      // Window Dots
      const dots = ['#FF5F56', '#FFBD2E', '#27C93F'];
      dots.forEach((color, i) => {
        ctx.beginPath();
        ctx.arc(15 + i * 14, 12, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '11px monospace';
      ctx.fillText('main.ts — Code × Sound Core', 70, 16);

      // Code Lines
      ctx.font = 'bold 13px Consolas, Monaco, "Courier New", monospace';
      const lines = [
        { text: '// ANTSHAIL Architecture v2.5', color: '#8A8E76' },
        { text: 'function createCore() {', color: '#D4AF37' },
        { text: '  const code = "IT Engineering";', color: '#E8E2D5' },
        { text: '  const sound = "Music Production";', color: '#E8E2D5' },
        { text: '  let x = 0, y = 1;', color: '#C5A059' },
        { text: '  return combine(code, sound);', color: '#F0C870' },
        { text: '}', color: '#D4AF37' },
        { text: 'createCore(); // Live Active', color: '#27C93F' },
      ];

      lines.forEach((line, index) => {
        ctx.fillStyle = line.color || '#E8E2D5';
        ctx.fillText(line.text, 25, 48 + index * 26);
      });

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    // B) Code Badge Texture (128x64 optimized size)
    const createBadgeTexture = (text: string, bgColor = '#181715', fgColor = '#D4AF37') => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(4, 4, 120, 56, 12);
      ctx.fill();
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = fgColor;
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 64, 32);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    // --- 4. 3D OBJECT GROUPS ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Shared Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x232220,
      metalness: 0.8,
      roughness: 0.3,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      metalness: 0.85,
      roughness: 0.25,
    });

    const oliveMat = new THREE.MeshStandardMaterial({
      color: 0x5C614D,
      metalness: 0.5,
      roughness: 0.4,
    });

    // A) LAPTOP
    const laptopGroup = new THREE.Group();
    
    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(2.6, 0.08, 1.8);
    const laptopBase = new THREE.Mesh(baseGeo, darkMetalMat);
    laptopGroup.add(laptopBase);

    // Keyboard recess
    const kbGeo = new THREE.BoxGeometry(2.2, 0.02, 1.1);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x141312, roughness: 0.8 });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, 0.045, -0.15);
    laptopGroup.add(kbMesh);

    // Trackpad
    const padGeo = new THREE.BoxGeometry(0.7, 0.01, 0.45);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x2A2927, roughness: 0.4 });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.position.set(0, 0.045, 0.55);
    laptopGroup.add(padMesh);

    // Laptop Lid & Screen
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.04, -0.88);

    const lidBackGeo = new THREE.BoxGeometry(2.6, 1.6, 0.05);
    const lidBack = new THREE.Mesh(lidBackGeo, darkMetalMat);
    lidBack.position.set(0, 0.8, 0);
    lidGroup.add(lidBack);

    const screenGeo = new THREE.PlaneGeometry(2.44, 1.46);
    const screenMat = new THREE.MeshBasicMaterial({
      map: createScreenTexture(),
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.8, 0.03);
    lidGroup.add(screenMesh);

    lidGroup.rotation.x = THREE.MathUtils.degToRad(-15);
    laptopGroup.add(lidGroup);
    laptopGroup.position.set(0.6, -0.2, 0);
    coreGroup.add(laptopGroup);

    // B) HEADPHONES
    const headphoneGroup = new THREE.Group();
    
    // Headband arc (optimized segment count)
    const bandGeo = new THREE.TorusGeometry(1.8, 0.07, 10, 28, Math.PI * 1.15);
    const headband = new THREE.Mesh(bandGeo, goldMat);
    headband.rotation.z = -Math.PI / 2 + 0.1;
    headphoneGroup.add(headband);

    // Earcups
    const cupGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.28, 18);
    const earcupMat = new THREE.MeshStandardMaterial({ color: 0x1C1B1A, roughness: 0.3, metalness: 0.7 });
    
    const leftCup = new THREE.Mesh(cupGeo, earcupMat);
    leftCup.rotation.z = Math.PI / 2;
    leftCup.position.set(-1.8, -0.5, 0);
    headphoneGroup.add(leftCup);

    const rightCup = new THREE.Mesh(cupGeo, earcupMat);
    rightCup.rotation.z = Math.PI / 2;
    rightCup.position.set(1.8, -0.5, 0);
    headphoneGroup.add(rightCup);

    // Gold rings on earcups
    const cupRingGeo = new THREE.TorusGeometry(0.53, 0.025, 10, 20);
    const ringL = new THREE.Mesh(cupRingGeo, goldMat);
    ringL.rotation.y = Math.PI / 2;
    ringL.position.set(-1.95, -0.5, 0);
    headphoneGroup.add(ringL);

    const ringR = new THREE.Mesh(cupRingGeo, goldMat);
    ringR.rotation.y = Math.PI / 2;
    ringR.position.set(1.95, -0.5, 0);
    headphoneGroup.add(ringR);

    headphoneGroup.position.set(0, 0.3, 0.2);
    coreGroup.add(headphoneGroup);

    // C) CENTRAL GLOWING ORB
    const orbGroup = new THREE.Group();
    const orbGeo = new THREE.SphereGeometry(0.85, 20, 20);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      emissive: 0xB8934A,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.85,
    });
    const centralOrb = new THREE.Mesh(orbGeo, orbMat);
    orbGroup.add(centralOrb);

    // Outer Wireframe Glass Aura
    const auraGeo = new THREE.SphereGeometry(1.05, 16, 16);
    const auraMat = new THREE.MeshStandardMaterial({
      color: 0xF0C870,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    orbGroup.add(auraMesh);

    orbGroup.position.set(-0.2, 0.4, -0.3);
    coreGroup.add(orbGroup);

    // D) WAVEFORM & ORBITAL RINGS
    const ringGroup = new THREE.Group();
    
    // Ring 1: Metallic Gold
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.02, 12, 40);
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2: Sage Green / Olive
    const ring2Geo = new THREE.TorusGeometry(3.1, 0.018, 12, 40);
    const ring2 = new THREE.Mesh(ring2Geo, oliveMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // Procedural Sine-Wave Ring (Optimized Tube geometry segment count)
    const wavePoints: THREE.Vector3[] = [];
    const waveSegments = 40;
    for (let i = 0; i <= waveSegments; i++) {
      const theta = (i / waveSegments) * Math.PI * 2;
      const radius = 2.8 + Math.sin(theta * 8) * 0.18;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const z = Math.cos(theta * 4) * 0.2;
      wavePoints.push(new THREE.Vector3(x, y, z));
    }
    const waveCurve = new THREE.CatmullRomCurve3(wavePoints, true);
    const waveGeo = new THREE.TubeGeometry(waveCurve, 40, 0.02, 5, true);
    const waveMesh = new THREE.Mesh(waveGeo, goldMat);
    ringGroup.add(waveMesh);

    coreGroup.add(ringGroup);

    // E) FLOATING BADGES & SYMBOLS
    const badgeGroup = new THREE.Group();
    
    // Code Badge </ >
    const badgeGeo = new THREE.PlaneGeometry(0.8, 0.4);
    const badgeMat = new THREE.MeshBasicMaterial({
      map: createBadgeTexture('</>'),
      transparent: true,
    });
    const codeBadge = new THREE.Mesh(badgeGeo, badgeMat);
    codeBadge.position.set(-2.2, -0.6, 1.2);
    badgeGroup.add(codeBadge);

    // Music Note Symbol Sprite
    const noteTexture = createBadgeTexture('🎵', '#1C1B1A', '#F0C870');
    const noteMat = new THREE.MeshBasicMaterial({ map: noteTexture, transparent: true });
    const noteMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), noteMat);
    noteMesh.position.set(2.4, 1.2, 0.8);
    badgeGroup.add(noteMesh);

    coreGroup.add(badgeGroup);

    // F) OPTIMIZED DISPERSION PARTICLES (Reduced to 40 on desktop, 22 on mobile for 60fps)
    const particleCount = isMobile ? 22 : 40;
    const particlesGroup = new THREE.Group();
    const particleData: Array<{
      mesh: THREE.Mesh;
      initialPos: THREE.Vector3;
      scatterDir: THREE.Vector3;
      rotSpeed: THREE.Vector3;
    }> = [];

    const geomTypes = [
      new THREE.SphereGeometry(0.08, 6, 6),
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.OctahedronGeometry(0.09),
      new THREE.TetrahedronGeometry(0.09),
    ];

    const particleMats = [goldMat, oliveMat, darkMetalMat];

    for (let i = 0; i < particleCount; i++) {
      const geo = geomTypes[i % geomTypes.length];
      const mat = particleMats[i % particleMats.length];
      const mesh = new THREE.Mesh(geo, mat);

      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 2.5;
      const initialPos = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3,
        Math.sin(angle) * radius
      );
      mesh.position.copy(initialPos);

      const scatterDir = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 14
      );

      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04
      );

      particlesGroup.add(mesh);
      particleData.push({ mesh, initialPos, scatterDir, rotSpeed });
    }

    scene.add(particlesGroup);

    // G) TECH ORBIT NODES (For Technical Arsenal Section)
    const techNodesGroup = new THREE.Group();
    const techList = ['Python', 'HTML', 'CSS', 'JS', 'SQL', 'Git', 'GitHub', 'Vercel'];
    const techMeshes: THREE.Mesh[] = [];

    techList.forEach((techName, index) => {
      const techTex = createBadgeTexture(techName, '#232220', '#E8E2D5');
      const techMat = new THREE.MeshBasicMaterial({ map: techTex, transparent: true });
      const techMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.45), techMat);

      const angle = (index / techList.length) * Math.PI * 2;
      const radius = 3.6;
      techMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, 0);
      techMeshes.push(techMesh);
      techNodesGroup.add(techMesh);
    });

    techNodesGroup.visible = false;
    scene.add(techNodesGroup);

    // --- 5. MOUSE & VISIBILITY HANDLERS ---
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleClick = () => {
      pulseRef.current = 1.0;
      if (onCoreClick) onCoreClick();
    };

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- 6. CONTINUOUS SMOOTH SCROLL & ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentScrollP = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause rendering when tab is hidden to conserve GPU/CPU
      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Read window scroll directly inside RAF and smooth with lerp (0.12)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetScrollP = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;
      currentScrollP += (targetScrollP - currentScrollP) * 0.12;
      const scrollP = currentScrollP;

      // Smooth Mouse Inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Handle Click Shockwave Decay
      if (pulseRef.current > 0.01) {
        pulseRef.current *= 0.92;
      } else {
        pulseRef.current = 0;
      }
      const pulseVal = pulseRef.current;

      // Base idle rotations
      coreGroup.rotation.y = elapsedTime * 0.2 + mouseRef.current.x * 0.3;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08 + mouseRef.current.y * 0.2;

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.3;
      waveMesh.rotation.z = elapsedTime * 0.5;

      // Pulse reaction on central orb & light
      centralOrb.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.05 + pulseVal * 0.4);
      auraMesh.scale.setScalar(1.05 + pulseVal * 0.6);
      goldPointLight.intensity = 2.5 + Math.sin(elapsedTime * 3) * 0.8 + pulseVal * 4.0;

      // SCROLL TIMELINE STAGES
      if (scrollP <= 0.18) {
        // STAGE 0: HERO (0 - 0.18)
        camera.position.x = mouseRef.current.x * 0.4;
        camera.position.y = mouseRef.current.y * 0.3;
        camera.position.z = THREE.MathUtils.lerp(7.5, 6.2, scrollP / 0.18);

        laptopGroup.position.set(0.6, -0.2, 0);
        laptopGroup.rotation.set(0, 0, 0);

        headphoneGroup.position.set(0, 0.3, 0.2);
        headphoneGroup.rotation.set(0, 0, 0);

        orbGroup.position.set(-0.2, 0.4, -0.3);
        techNodesGroup.visible = false;

        particleData.forEach((p) => {
          p.mesh.position.copy(p.initialPos);
          p.mesh.rotation.x += p.rotSpeed.x;
          p.mesh.rotation.y += p.rotSpeed.y;
        });

      } else if (scrollP > 0.18 && scrollP <= 0.38) {
        // STAGE 1: BREAK APART / DIGITAL VOID (0.18 - 0.38) [About Section]
        const stageProgress = (scrollP - 0.18) / (0.38 - 0.18);

        camera.position.z = THREE.MathUtils.lerp(6.2, 4.5, stageProgress);
        camera.position.x = Math.sin(stageProgress * Math.PI) * 1.2 + mouseRef.current.x * 0.5;

        laptopGroup.position.x = 0.6 + stageProgress * 3.5;
        laptopGroup.position.y = -0.2 + Math.sin(stageProgress * Math.PI) * 1.5;
        laptopGroup.rotation.y = stageProgress * Math.PI * 0.8;

        headphoneGroup.position.y = 0.3 + stageProgress * 2.8;
        headphoneGroup.rotation.z = stageProgress * Math.PI;

        orbGroup.scale.setScalar(1 + stageProgress * 0.8);
        techNodesGroup.visible = false;

        particleData.forEach((p) => {
          p.mesh.position.x = p.initialPos.x + p.scatterDir.x * stageProgress * (1 + pulseVal);
          p.mesh.position.y = p.initialPos.y + p.scatterDir.y * stageProgress * (1 + pulseVal);
          p.mesh.position.z = p.initialPos.z + p.scatterDir.z * stageProgress * (1 + pulseVal);
          p.mesh.rotation.x += p.rotSpeed.x;
          p.mesh.rotation.y += p.rotSpeed.y;
        });

      } else if (scrollP > 0.38 && scrollP <= 0.58) {
        // STAGE 2: REASSEMBLE INTO TECH ORBIT (0.38 - 0.58) [Technical Arsenal]
        const stageProgress = (scrollP - 0.38) / (0.58 - 0.38);

        camera.position.z = THREE.MathUtils.lerp(4.5, 6.8, stageProgress);
        camera.position.x = mouseRef.current.x * 0.5;
        camera.position.y = mouseRef.current.y * 0.3;

        techNodesGroup.visible = true;
        techNodesGroup.rotation.z = elapsedTime * 0.2;
        techNodesGroup.position.set(0, 0, 0);

        techMeshes.forEach((mesh) => {
          mesh.scale.setScalar(THREE.MathUtils.lerp(0.1, 1.0, stageProgress));
        });

        laptopGroup.position.set(-3.2, 1.2, -2.0);
        headphoneGroup.position.set(3.2, -1.2, -2.0);

        particleData.forEach((p, idx) => {
          const gridAngle = (idx / particleCount) * Math.PI * 2 * 3;
          const targetX = Math.cos(gridAngle) * 4.5;
          const targetY = Math.sin(gridAngle) * 2.5;
          const targetZ = (idx % 5) - 2;

          p.mesh.position.x = THREE.MathUtils.lerp(p.initialPos.x + p.scatterDir.x, targetX, stageProgress);
          p.mesh.position.y = THREE.MathUtils.lerp(p.initialPos.y + p.scatterDir.y, targetY, stageProgress);
          p.mesh.position.z = THREE.MathUtils.lerp(p.initialPos.z + p.scatterDir.z, targetZ, stageProgress);
        });

      } else if (scrollP > 0.58 && scrollP <= 0.78) {
        // STAGE 3: ORB BURST & PROJECT EMERGENCE (0.58 - 0.78) [Featured Work]
        const stageProgress = (scrollP - 0.58) / (0.78 - 0.58);
        techNodesGroup.visible = false;

        if (stageProgress < 0.3) {
          const zoomP = stageProgress / 0.3;
          camera.position.z = THREE.MathUtils.lerp(6.8, 2.5, zoomP);
          auraMesh.scale.setScalar(1 + zoomP * 1.5);
        } else {
          const burstP = (stageProgress - 0.3) / 0.7;
          camera.position.z = THREE.MathUtils.lerp(2.5, 7.2, burstP);
          orbGroup.scale.setScalar(THREE.MathUtils.lerp(2.5, 1.0, burstP));
          ringGroup.scale.setScalar(1 + Math.sin(burstP * Math.PI) * 1.2);
        }

      } else if (scrollP > 0.78 && scrollP <= 0.92) {
        // STAGE 4: AUDIO-REACTIVE ENVIRONMENT (0.78 - 0.92) [Music Section]
        const stageProgress = (scrollP - 0.78) / (0.92 - 0.78);

        camera.position.z = 6.5;
        camera.position.x = mouseRef.current.x * 0.4;

        orbGroup.position.set(0, 0, 0);
        orbGroup.scale.setScalar(1.2 + Math.sin(elapsedTime * 5) * 0.12);

        ringGroup.position.set(0, 0, 0);
        ring1.scale.setScalar(1 + (elapsedTime % 2) * 0.5);
        ring2.scale.setScalar(1 + ((elapsedTime + 0.5) % 2) * 0.5);

        headphoneGroup.position.set(0, 0, 0.4);
        headphoneGroup.rotation.set(0, Math.sin(elapsedTime) * 0.15, 0);
        laptopGroup.position.set(-4, 0, -3);

        particleData.forEach((p, idx) => {
          const freq = Math.sin(elapsedTime * 3 + idx) * 1.2;
          p.mesh.position.y = p.initialPos.y + freq;
        });

      } else {
        // STAGE 5: FINAL REASSEMBLY (0.92 - 1.0) [Contact Section]
        const stageProgress = (scrollP - 0.92) / (1.0 - 0.92);

        camera.position.z = THREE.MathUtils.lerp(6.5, 8.5, stageProgress);
        camera.position.x = mouseRef.current.x * 0.3;
        camera.position.y = mouseRef.current.y * 0.3;

        laptopGroup.position.x = THREE.MathUtils.lerp(-4, 0.6, stageProgress);
        laptopGroup.position.y = THREE.MathUtils.lerp(0, -0.2, stageProgress);
        laptopGroup.rotation.set(0, 0, 0);

        headphoneGroup.position.set(0, 0.3, 0.2);
        headphoneGroup.rotation.set(0, 0, 0);

        orbGroup.position.set(-0.2, 0.4, -0.3);
        orbGroup.scale.setScalar(1.0);

        particleData.forEach((p) => {
          p.mesh.position.x = THREE.MathUtils.lerp(p.mesh.position.x, p.initialPos.x, 0.1);
          p.mesh.position.y = THREE.MathUtils.lerp(p.mesh.position.y, p.initialPos.y, 0.1);
          p.mesh.position.z = THREE.MathUtils.lerp(p.mesh.position.z, p.initialPos.z, 0.1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onCoreClick]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-auto z-0 cursor-pointer overflow-hidden"
      title="Click the Code × Sound Core to trigger an energy shockwave!"
    />
  );
};
