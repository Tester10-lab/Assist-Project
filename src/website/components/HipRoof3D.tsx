import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface LayerState {
  ridgeCaps: boolean;
  tiles: boolean;
  ventilation: boolean;
  flashing: boolean;
  underlayment: boolean;
  decking: boolean;
  framing: boolean; // OFF BY DEFAULT!
  fascia: boolean;
  penetrations: boolean;
}

export const HipRoof3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const layersGroupRef = useRef<{ [key: string]: THREE.Group }>({});
  const explodeCurRef = useRef<number>(0);
  const explodeTargetRef = useRef<number>(0); // 0 = Assembled, 1 = Exploded

  const [isExploded, setIsExploded] = useState(false);
  const [layers, setLayers] = useState<LayerState>({
    ridgeCaps: true,
    tiles: true,
    ventilation: true,
    flashing: true,
    underlayment: true,
    decking: true,
    framing: false, // CRITICAL: Framing toggle is OFF by default!
    fascia: true,
    penetrations: true,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Renderer setup with ACESFilmic Tone Mapping for photorealism
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
    camera.position.set(17, 13.5, 21);
    cameraRef.current = camera;

    const ctrl = new OrbitControls(camera, renderer.domElement);
    ctrl.target.set(0, 2.5, 0);
    ctrl.enableDamping = true;
    ctrl.dampingFactor = 0.05;
    ctrl.minDistance = 5;
    ctrl.maxDistance = 45;
    ctrl.maxPolarAngle = Math.PI * 0.48;
    ctrl.autoRotate = false;
    ctrl.update();
    controlsRef.current = ctrl;

    // Realistic Lighting setup
    const ambLight = new THREE.AmbientLight('#d8dce8', 0.55);
    scene.add(ambLight);

    const hemiLight = new THREE.HemisphereLight('#e0e8f0', '#2a3a1e', 0.5);
    scene.add(hemiLight);

    const sun = new THREE.DirectionalLight('#fff4e6', 2.3);
    sun.position.set(18, 24, 14);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 60;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);

    const fill = new THREE.DirectionalLight('#8fa4c8', 0.45);
    fill.position.set(-14, 10, -8);
    scene.add(fill);

    // Realistic Ground Shadow Plane
    const shadowPlaneG = new THREE.PlaneGeometry(50, 50);
    const shadowPlaneM = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowPlaneG, shadowPlaneM);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.05;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Layer Groups
    const layerGroups: { [key: string]: THREE.Group } = {};
    const layerNames = [
      'framing',
      'decking',
      'underlayment',
      'flashing',
      'tiles',
      'ventilation',
      'ridgeCaps',
      'fascia',
      'penetrations',
    ];

    layerNames.forEach((n) => {
      const g = new THREE.Group();
      scene.add(g);
      layerGroups[n] = g;
    });
    layersGroupRef.current = layerGroups;

    // Geometry Dimensions
    const eL = 6.45, eW = 4.45, rHf = 2, rH = 2.57, pitchR = (30 * Math.PI) / 180;
    const eFL: [number, number, number] = [-eL, 0, eW];
    const eFR: [number, number, number] = [eL, 0, eW];
    const eBL: [number, number, number] = [-eL, 0, -eW];
    const eBR: [number, number, number] = [eL, 0, -eW];
    const rL: [number, number, number] = [-rHf, rH, 0];
    const rR: [number, number, number] = [rHf, rH, 0];

    // Ultra-Realistic PBR Materials
    const mW = new THREE.MeshStandardMaterial({
      color: '#b8935f',
      roughness: 0.75,
      metalness: 0.05,
    });
    const mWD = new THREE.MeshStandardMaterial({
      color: '#9d7d5a',
      roughness: 0.72,
      metalness: 0.05,
    });
    const mDk = new THREE.MeshStandardMaterial({
      color: '#d4b896',
      roughness: 0.8,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
    const mUl = new THREE.MeshStandardMaterial({
      color: '#44d991', // ASSIST Green membrane tint
      roughness: 0.45,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const mTi = new THREE.MeshStandardMaterial({
      color: '#2d333e', // Monument Charcoal Colorbond
      roughness: 0.45,
      metalness: 0.3,
    });
    const mRc = new THREE.MeshStandardMaterial({
      color: '#1e232a',
      roughness: 0.4,
      metalness: 0.35,
    });
    const mFl = new THREE.MeshStandardMaterial({
      color: '#c0c8d4',
      roughness: 0.2,
      metalness: 0.85,
    });
    const mFa = new THREE.MeshStandardMaterial({
      color: '#f8fafc',
      roughness: 0.3,
      metalness: 0.1,
    });
    const mVn = new THREE.MeshStandardMaterial({
      color: '#334155',
      roughness: 0.3,
      metalness: 0.5,
    });
    const mCh = new THREE.MeshStandardMaterial({
      color: '#8b5a36',
      roughness: 0.85,
      metalness: 0.05,
    });
    const mGl = new THREE.MeshPhysicalMaterial({
      color: '#38bdf8',
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.7,
      ior: 1.5,
    });

    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const eps = 0.001;

    function beam(s: [number, number, number], e: [number, number, number], w = 0.05, d = 0.16, mat = mW) {
      const sv = V(...s), ev = V(...e);
      const mid = new THREE.Vector3().addVectors(sv, ev).multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(ev, sv);
      const len = Math.max(eps, dir.length());
      dir.normalize();
      const g = new THREE.BoxGeometry(w, d, len);
      const m = new THREE.Mesh(g, mat);
      m.position.copy(mid);
      m.quaternion.setFromUnitVectors(V(0, 1, 0), dir);
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    }

    function quadSrf(a: [number, number, number], b: [number, number, number], c: [number, number, number], d: [number, number, number], mat: THREE.Material, dy = 0) {
      const va = V(...a), vb = V(...b), vc = V(...c), vd = V(...d);
      va.y += dy; vb.y += dy; vc.y += dy; vd.y += dy;
      const pos = new Float32Array([...va.toArray(), ...vb.toArray(), ...vc.toArray(), ...va.toArray(), ...vc.toArray(), ...vd.toArray()]);
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.computeVertexNormals();
      const m = new THREE.Mesh(g, mat);
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    }

    // 1. Framing
    const fr = layerGroups.framing;
    fr.add(beam(rL, rR, 0.12, 0.20, mWD));
    for (let z = -3.8; z <= 3.8; z += 0.6) {
      fr.add(beam([-5.8, 0.08, z], [5.8, 0.08, z], 0.05, 0.14, mW));
    }
    fr.add(beam([-6, 0.18, 4], [6, 0.18, 4], 0.1, 0.08, mWD));
    fr.add(beam([-6, 0.18, -4], [6, 0.18, -4], 0.1, 0.08, mWD));
    fr.add(beam([-6, 0.18, -4], [-6, 0.18, 4], 0.1, 0.08, mWD));
    fr.add(beam([6, 0.18, -4], [6, 0.18, 4], 0.1, 0.08, mWD));

    for (let x = -1.8; x <= 1.8; x += 0.55) {
      fr.add(beam([x, 0, eW], [x, rH, 0]));
      fr.add(beam([x, 0, -eW], [x, rH, 0]));
    }
    fr.add(beam(eFL, rL, 0.065, 0.18, mWD));
    fr.add(beam(eFR, rR, 0.065, 0.18, mWD));
    fr.add(beam(eBL, rL, 0.065, 0.18, mWD));
    fr.add(beam(eBR, rR, 0.065, 0.18, mWD));

    for (let x = -eL + 0.4; x < -rHf - 0.1; x += 0.55) {
      const t = (x + eL) / (rL[0] - eFL[0]);
      const hy = t * rH, hz = eW * (1 - t);
      fr.add(beam([x, 0, eW], [x, hy, hz], 0.04, 0.13));
      fr.add(beam([x, 0, -eW], [x, hy, -hz], 0.04, 0.13));
    }
    for (let x = eL - 0.4; x > rHf + 0.1; x -= 0.55) {
      const t = (eL - x) / (eL - rHf);
      const hy = t * rH, hz = eW * (1 - t);
      fr.add(beam([x, 0, eW], [x, hy, hz], 0.04, 0.13));
      fr.add(beam([x, 0, -eW], [x, hy, -hz], 0.04, 0.13));
    }
    for (let x = -1.2; x <= 1.2; x += 1.4) {
      fr.add(beam([x, rH * 0.62, -1.5], [x, rH * 0.62, 1.5], 0.04, 0.10));
    }
    fr.userData = { label: 'STRUCTURAL TIMBER FRAMING', desc: 'Pressure-treated timber rafters, ridge beam, ceiling joists and hip rafters' };

    // 2. Decking
    const dkDy = 0.22;
    layerGroups.decking.add(quadSrf(eFL, eFR, rR, rL, mDk, dkDy));
    layerGroups.decking.add(quadSrf(eBL, eBR, rR, rL, mDk, dkDy));
    layerGroups.decking.add(quadSrf(eFL, eBL, rL, rL, mDk, dkDy));
    layerGroups.decking.add(quadSrf(eFR, eBR, rR, rR, mDk, dkDy));
    layerGroups.decking.userData = { label: 'ROOF DECKING', desc: '7/16" Structural OSB sheathing fastened to rafters' };

    // 3. Underlayment
    const ulDy = 0.27;
    layerGroups.underlayment.add(quadSrf(eFL, eFR, rR, rL, mUl, ulDy));
    layerGroups.underlayment.add(quadSrf(eBL, eBR, rR, rL, mUl, ulDy));
    layerGroups.underlayment.add(quadSrf(eFL, eBL, rL, rL, mUl, ulDy));
    layerGroups.underlayment.add(quadSrf(eFR, eBR, rR, rR, mUl, ulDy));
    layerGroups.underlayment.userData = { label: 'WATERPROOF SARKING', desc: 'High-performance sarking membrane provides secondary weather protection' };

    // 4. Tiles (Instanced Mesh)
    const tW = 0.33, tH = 0.42, tTh = 0.024;
    const tGeo = new THREE.BoxGeometry(tW, tTh, tH);
    const tPa = tGeo.getAttribute('position');
    for (let i = 0; i < tPa.count; i++) {
      const y = tPa.getY(i);
      if (y > 0) tPa.setY(i, y + 0.005 * Math.cos((tPa.getX(i) / tW) * Math.PI));
    }
    tPa.needsUpdate = true;
    tGeo.computeVertexNormals();

    const fq = new THREE.Quaternion().setFromEuler(new THREE.Euler(-pitchR, 0, 0));
    const bq = new THREE.Quaternion().setFromEuler(new THREE.Euler(pitchR, 0, 0));
    const lq = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, pitchR));
    const rq = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -pitchR));

    function distTrap(a: [number, number, number], b: [number, number, number], c: [number, number, number], d: [number, number, number], q: THREE.Quaternion, dy: number) {
      const ts = [], sL = V(...a).distanceTo(V(...d));
      const nR = Math.floor(sL / (tH * 0.92));
      for (let r = 0; r < nR; r++) {
        const v = (r + 0.5) / nR;
        const rL2 = V().lerpVectors(V(...a), V(...d), v);
        const rR2 = V().lerpVectors(V(...b), V(...c), v);
        const w = rL2.distanceTo(rR2);
        const nC = Math.floor(w / (tW * 0.95));
        const off = (r % 2) * tW * 0.5;
        for (let c2 = 0; c2 < nC; c2++) {
          const u = (c2 * tW * 0.95 + off + tW * 0.475) / w;
          if (u < 0 || u > 1) continue;
          const p = V().lerpVectors(rL2, rR2, Math.min(1, Math.max(0, u)));
          p.y += dy;
          ts.push({ p, q });
        }
      }
      return ts;
    }

    function distTri(a: [number, number, number], b: [number, number, number], ap: [number, number, number], q: THREE.Quaternion, dy: number) {
      const ts = [], sL = V().lerpVectors(V(...a), V(...b), 0.5).distanceTo(V(...ap));
      const nR = Math.floor(sL / (tH * 0.92));
      for (let r = 0; r < nR; r++) {
        const v = (r + 0.5) / nR;
        const rL2 = V().lerpVectors(V(...a), V(...ap), v);
        const rR2 = V().lerpVectors(V(...b), V(...ap), v);
        const w = rL2.distanceTo(rR2);
        if (w < tW * 0.5) continue;
        const nC = Math.floor(w / (tW * 0.95));
        const off = (r % 2) * tW * 0.5;
        for (let c2 = 0; c2 < nC; c2++) {
          const u = (c2 * tW * 0.95 + off + tW * 0.475) / w;
          if (u < 0 || u > 1) continue;
          const p = V().lerpVectors(rL2, rR2, Math.min(1, Math.max(0, u)));
          p.y += dy;
          ts.push({ p, q });
        }
      }
      return ts;
    }

    const tiDy = 0.31;
    const allT = [
      ...distTrap(eFL, eFR, rR, rL, fq, tiDy),
      ...distTrap(eBL, eBR, rR, rL, bq, tiDy),
      ...distTri(eFL, eBL, rL, lq, tiDy),
      ...distTri(eFR, eBR, rR, rq, tiDy),
    ];

    const tiI = new THREE.InstancedMesh(tGeo, mTi, allT.length);
    tiI.castShadow = true;
    tiI.receiveShadow = true;
    const tm = new THREE.Matrix4(), ts2 = V(1, 1, 1);
    allT.forEach((t, i) => {
      tm.compose(t.p, t.q, ts2);
      tiI.setMatrixAt(i, tm);
    });
    tiI.instanceMatrix.needsUpdate = true;
    layerGroups.tiles.add(tiI);
    layerGroups.tiles.userData = { label: 'COLORBOND / CONCRETE TILES', desc: 'Interlocking high-durability roofing tiles rated for Australian climate' };

    // 5. Ridge Caps
    const cW = 0.22, cH = 0.05, cL = 0.40;
    const cGeo = new THREE.BoxGeometry(cW, cH, cL);

    function addCaps(s: [number, number, number], e: [number, number, number], grp: THREE.Group) {
      const sv = V(...s), ev = V(...e);
      const dir = new THREE.Vector3().subVectors(ev, sv);
      const len = dir.length();
      dir.normalize();
      const n = Math.floor(len / (cL * 0.88));
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n;
        const p = V().lerpVectors(sv, ev, t);
        p.y += tiDy + 0.04;
        const c = new THREE.Mesh(cGeo, mRc);
        c.position.copy(p);
        c.quaternion.setFromUnitVectors(V(0, 0, 1), dir);
        c.castShadow = true;
        grp.add(c);
      }
    }
    addCaps(rL, rR, layerGroups.ridgeCaps);
    addCaps(eFL, rL, layerGroups.ridgeCaps);
    addCaps(eFR, rR, layerGroups.ridgeCaps);
    addCaps(eBL, rL, layerGroups.ridgeCaps);
    addCaps(eBR, rR, layerGroups.ridgeCaps);
    layerGroups.ridgeCaps.userData = { label: 'RIDGE & HIP CAPS', desc: 'Custom capping profiles sealing all ridge lines and hip intersections' };

    // 6. Ventilation
    const vn = layerGroups.ventilation;
    const vnGeo = new THREE.BoxGeometry(3.2, 0.035, 0.20);
    const vnM = new THREE.Mesh(vnGeo, mVn);
    vnM.position.set(0, rH + tiDy + 0.01, 0);
    vnM.castShadow = true;
    vn.add(vnM);
    vn.userData = { label: 'CONTINUOUS RIDGE VENT', desc: 'Promotes roof space ventilation to prevent moisture accumulation' };

    // 7. Flashing
    const fl = layerGroups.flashing;
    const chX = -2.5, chZ = -1.0;
    const chV = (eW - Math.abs(chZ)) / eW;
    const chBY = chV * rH + 0.28;

    for (let i = 0; i < 5; i++) {
      const sf = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.14, 0.28), mFl);
      sf.position.set(chX - 0.42, chBY + 0.06 + i * 0.05, chZ - 0.4 + i * 0.2);
      sf.rotation.x = -pitchR * 0.3;
      sf.castShadow = true;
      fl.add(sf);
    }
    const af = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.055, 0.38), mFl);
    af.position.set(chX, chBY + 0.02, chZ - 0.5);
    af.rotation.x = -pitchR * 0.5;
    fl.add(af);

    function addVFl(s: [number, number, number], e: [number, number, number]) {
      const sv = V(...s), ev = V(...e);
      const dir = new THREE.Vector3().subVectors(ev, sv);
      const len = dir.length();
      dir.normalize();
      const vf = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.012, len), mFl);
      const mid = V().addVectors(sv, ev).multiplyScalar(0.5);
      mid.y += 0.28;
      vf.position.copy(mid);
      vf.quaternion.setFromUnitVectors(V(0, 0, 1), dir);
      fl.add(vf);
    }
    addVFl(eFL, rL);
    addVFl(eFR, rR);
    addVFl(eBL, rL);
    addVFl(eBR, rR);
    fl.userData = { label: 'METAL FLASHINGS', desc: 'Galvanized apron and valley flashings for watertight seals' };

    // 8. Fascia
    const fa = layerGroups.fascia;
    const fH2 = 0.18;
    fa.add(beam([eFL[0], fH2 / 2, eFL[2]], [eFR[0], fH2 / 2, eFR[2]], 0.03, fH2, mFa));
    fa.add(beam([eBL[0], fH2 / 2, eBL[2]], [eBR[0], fH2 / 2, eBR[2]], 0.03, fH2, mFa));
    fa.add(beam([eFL[0], fH2 / 2, eFL[2]], [eBL[0], fH2 / 2, eBL[2]], 0.03, fH2, mFa));
    fa.add(beam([eFR[0], fH2 / 2, eFR[2]], [eBR[0], fH2 / 2, eBR[2]], 0.03, fH2, mFa));
    fa.userData = { label: 'COLORBOND FASCIA BOARD', desc: 'Durable painted fascia protecting rafter tails and holding guttering' };

    // 9. Penetrations (Chimney, Vent, Skylight)
    const pn = layerGroups.penetrations;
    const chG = new THREE.BoxGeometry(0.8, 1.4, 0.6);
    const chM = new THREE.Mesh(chG, mCh);
    chM.position.set(chX, chBY + 0.7, chZ);
    chM.castShadow = true;
    pn.add(chM);

    const skG = new THREE.BoxGeometry(0.8, 0.04, 0.6);
    const skM = new THREE.Mesh(skG, mGl);
    const skV = 0.45;
    skM.position.set(0, skV * rH + tiDy, eW * (1 - skV));
    skM.rotation.x = -pitchR;
    pn.add(skM);
    pn.userData = { label: 'PENETRATIONS & SKYLIGHT', desc: 'Brick chimney, vent pipes and double-glazed skylight assembly' };

    // CRITICAL: SET INITIAL LAYER VISIBILITY — FRAMING IS OFF BY DEFAULT!
    Object.keys(layerGroups).forEach((key) => {
      if (key === 'framing') {
        layerGroups[key].visible = false;
      } else {
        layerGroups[key].visible = true;
      }
    });

    // Explosion Animation Loop
    const explodeOffsets: { [key: string]: number } = {
      framing: 0,
      fascia: 1.8,
      decking: 2.0,
      underlayment: 3.6,
      flashing: 5.0,
      tiles: 6.2,
      ventilation: 7.4,
      ridgeCaps: 8.2,
      penetrations: 6.2,
    };

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      explodeCurRef.current += (explodeTargetRef.current - explodeCurRef.current) * 0.07;

      Object.entries(layerGroups).forEach(([name, grp]) => {
        const off = explodeOffsets[name] || 0;
        grp.position.y = explodeCurRef.current * off;
      });

      ctrl.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync Layer Visibility when state changes
  useEffect(() => {
    Object.entries(layers).forEach(([key, visible]) => {
      if (layersGroupRef.current[key]) {
        layersGroupRef.current[key].visible = visible;
      }
    });
  }, [layers]);

  const toggleExplode = () => {
    const next = !isExploded;
    setIsExploded(next);
    explodeTargetRef.current = next ? 1 : 0;
  };

  const toggleLayerState = (key: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetCam = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(17, 13.5, 21);
    controlsRef.current.target.set(0, 2.5, 0);
    controlsRef.current.update();
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-900/10 shadow-2xl bg-slate-950 ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full min-h-[450px]" />

      {/* Floating 3D Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-black/75 backdrop-blur-md p-2 rounded-xl border border-white/10 text-white shadow-lg">
          <span 
            className="text-xs uppercase font-bold px-2 py-1 tracking-wider text-cooperative-green"
            style={{ fontFamily: 'var(--font-athletics)' }}
          >
            3D Hip Roof Construction
          </span>

          <button
            onClick={toggleExplode}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              isExploded 
                ? 'bg-cooperative-green text-ink-black shadow-md font-bold' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isExploded ? 'Assembled View' : 'Explode View'}
          </button>

          <button
            onClick={resetCam}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            Reset View
          </button>
        </div>

        {/* Framing Toggle Indicator (Framing is OFF by default) */}
        <div className="pointer-events-auto bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${layers.framing ? 'bg-amber-400' : 'bg-slate-500'}`} />
          <span>Framing: <strong className={layers.framing ? 'text-amber-400' : 'text-slate-400'}>{layers.framing ? 'ON' : 'OFF'}</strong></span>
          <button 
            onClick={() => toggleLayerState('framing')}
            className="ml-2 text-[10px] uppercase font-bold text-cooperative-green hover:underline"
          >
            Toggle
          </button>
        </div>
      </div>

      {/* Layer Toggles Drawer at bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white flex overflow-x-auto gap-2 items-center text-xs scrollbar-none">
        <span className="text-[11px] uppercase font-bold text-slate-400 shrink-0 mr-1" style={{ fontFamily: 'var(--font-athletics)' }}>
          3D Layers:
        </span>
        {(Object.keys(layers) as Array<keyof LayerState>).map((layerKey) => (
          <button
            key={layerKey}
            onClick={() => toggleLayerState(layerKey)}
            className={`px-2.5 py-1 rounded-md capitalize text-[11px] font-medium transition-all shrink-0 border ${
              layers[layerKey]
                ? 'bg-white/20 border-cooperative-green/50 text-white font-semibold'
                : 'bg-black/40 border-white/5 text-slate-500 line-through'
            }`}
          >
            {layerKey.replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>
    </div>
  );
};
