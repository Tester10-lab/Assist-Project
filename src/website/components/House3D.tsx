import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const House3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 10, 12);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(8, 15, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    const house = new THREE.Group();

    // Materials
    const wallMat = new THREE.MeshPhongMaterial({ color: 0xf5f0e8 });
    const roofMat = new THREE.MeshPhongMaterial({ color: 0x10b981 });
    const windowMat = new THREE.MeshPhongMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.6, emissive: 0x87ceeb, emissiveIntensity: 0.15 });
    const windowFrameMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const doorMat = new THREE.MeshPhongMaterial({ color: 0x4a3728 });
    const grassMat = new THREE.MeshPhongMaterial({ color: 0x2d5a3d });
    const foundationMat = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const chimneyMat = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const pathMat = new THREE.MeshPhongMaterial({ color: 0x999999 });
    const fenceMat = new THREE.MeshPhongMaterial({ color: 0xddd5c5 });

    // Ground / Garden
    const groundGeo = new THREE.BoxGeometry(14, 0.15, 14);
    const ground = new THREE.Mesh(groundGeo, grassMat);
    ground.position.y = -0.075;
    ground.receiveShadow = true;
    scene.add(ground);

    // Foundation
    const foundGeo = new THREE.BoxGeometry(5.2, 0.4, 5.2);
    const foundation = new THREE.Mesh(foundGeo, foundationMat);
    foundation.position.y = 0.2;
    foundation.castShadow = true;
    house.add(foundation);

    // Main Body
    const bodyGeo = new THREE.BoxGeometry(5, 3.2, 5);
    const body = new THREE.Mesh(bodyGeo, wallMat);
    body.position.y = 2;
    body.castShadow = true;
    body.receiveShadow = true;
    house.add(body);

    // Roof (gabled)
    const roofGeo = new THREE.ConeGeometry(4.2, 2.2, 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 4.7;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    house.add(roof);

    // Chimney
    const chimneyGeo = new THREE.BoxGeometry(0.6, 2, 0.6);
    const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
    chimney.position.set(1.5, 5.2, -0.8);
    chimney.castShadow = true;
    house.add(chimney);

    // Windows - Front
    const addWindow = (x: number, y: number, z: number, rotY = 0) => {
      const frameGeo = new THREE.BoxGeometry(0.95, 0.95, 0.08);
      const frame = new THREE.Mesh(frameGeo, windowFrameMat);
      frame.position.set(x, y, z);
      frame.rotation.y = rotY;
      house.add(frame);
      
      const glassGeo = new THREE.BoxGeometry(0.75, 0.75, 0.06);
      const glass = new THREE.Mesh(glassGeo, windowMat);
      glass.position.set(x, y, z + (rotY ? 0 : 0.02));
      glass.rotation.y = rotY;
      house.add(glass);
    };

    // Front windows
    addWindow(-1.2, 2.4, 2.52);
    addWindow(1.2, 2.4, 2.52);
    // Side windows
    addWindow(2.52, 2.4, -1, Math.PI / 2);
    addWindow(2.52, 2.4, 1, Math.PI / 2);
    // Back windows
    addWindow(-1.2, 2.4, -2.52);
    addWindow(1.2, 2.4, -2.52);

    // Front Door
    const doorGeo = new THREE.BoxGeometry(0.9, 1.8, 0.1);
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 1.3, 2.52);
    door.castShadow = true;
    house.add(door);

    // Door handle
    const handleGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const handleMat = new THREE.MeshPhongMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 0.2 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0.3, 1.3, 2.6);
    house.add(handle);

    // Front Path
    const pathGeo = new THREE.BoxGeometry(1.2, 0.05, 3.5);
    const path = new THREE.Mesh(pathGeo, pathMat);
    path.position.set(0, 0.05, 4.8);
    path.receiveShadow = true;
    scene.add(path);

    // Steps
    for (let i = 0; i < 2; i++) {
      const stepGeo = new THREE.BoxGeometry(1.4, 0.15, 0.5);
      const step = new THREE.Mesh(stepGeo, foundationMat);
      step.position.set(0, 0.08 + i * 0.15, 2.8 + i * 0.5);
      step.receiveShadow = true;
      house.add(step);
    }

    // Fence posts on front
    for (let i = -5; i <= 5; i += 2) {
      if (Math.abs(i) < 1) continue; // gap for path
      const postGeo = new THREE.BoxGeometry(0.12, 0.8, 0.12);
      const post = new THREE.Mesh(postGeo, fenceMat);
      post.position.set(i, 0.4, 6.5);
      post.castShadow = true;
      scene.add(post);
    }
    // Fence rail
    const railGeo = new THREE.BoxGeometry(10, 0.08, 0.08);
    const rail = new THREE.Mesh(railGeo, fenceMat);
    rail.position.set(0, 0.6, 6.5);
    scene.add(rail);
    const railLow = new THREE.Mesh(railGeo, fenceMat);
    railLow.position.set(0, 0.25, 6.5);
    scene.add(railLow);

    // Simple bushes (spheres)
    const bushMat = new THREE.MeshPhongMaterial({ color: 0x228b22 });
    const bushPositions = [[-2.8, 0.35, 3.5], [2.8, 0.35, 3.5], [-3.5, 0.3, -2], [3.5, 0.3, -2]];
    bushPositions.forEach(([x, y, z]) => {
      const bushGeo = new THREE.SphereGeometry(0.5 + Math.random() * 0.2, 8, 8);
      const bush = new THREE.Mesh(bushGeo, bushMat);
      bush.position.set(x, y, z);
      bush.castShadow = true;
      scene.add(bush);
    });

    // Tree
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.2, 2, 8);
    const trunkMat = new THREE.MeshPhongMaterial({ color: 0x5c4033 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(-5, 1, -4);
    trunk.castShadow = true;
    scene.add(trunk);
    const leavesGeo = new THREE.SphereGeometry(1.2, 8, 8);
    const leavesMat = new THREE.MeshPhongMaterial({ color: 0x1a7a3a });
    const leaves = new THREE.Mesh(leavesGeo, leavesMat);
    leaves.position.set(-5, 2.8, -4);
    leaves.castShadow = true;
    scene.add(leaves);

    scene.add(house);

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      house.rotation.y += 0.003;
      // Subtle camera bob
      camera.position.y = 10 + Math.sin(Date.now() * 0.0005) * 0.3;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};
