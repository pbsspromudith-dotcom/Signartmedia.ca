import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { BillboardLocation } from '../types/billboard';
import { SAMPLE_AD_TEMPLATES } from '../data/billboards';
import { Eye, Sun, Moon, Sunset, Camera, Sparkles, ChevronDown, ChevronUp, Image, Type } from 'lucide-react';

interface Billboard3DViewerProps {
  billboard: BillboardLocation;
  onBookNow?: (billboard: BillboardLocation) => void;
}

type TimeOfDay = 'day' | 'sunset' | 'night';
type CameraView = 'highway' | 'pedestrian' | 'drone' | 'detail';

export const Billboard3DViewer: React.FC<Billboard3DViewerProps> = ({ billboard, onBookNow }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [currentCameraView, setCurrentCameraView] = useState<CameraView>('highway');
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [customText, setCustomText] = useState('YOUR AD HERE • SIGN ART MEDIA');
  const [customSubtext, setCustomSubtext] = useState('Premium Canadian Billboard Locations • Call (416) 555-SIGN');
  const [customBgColor, setCustomBgColor] = useState('#0f172a');
  const [customAccentColor, setCustomAccentColor] = useState('#f59e0b');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // References to keep Three.js scene instances across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const adTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const lightsRef = useRef<{
    dirKey: THREE.DirectionalLight;
    hemi: THREE.HemisphereLight;
    spot1: THREE.SpotLight;
    spot2: THREE.SpotLight;
    spot3: THREE.SpotLight;
    screenGlow: THREE.PointLight;
  } | null>(null);

  // Function to draw procedural canvas texture for the billboard ad face
  const updateAdCanvas = () => {
    let canvas = canvasElementRef.current;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = 1536;
      canvas.height = 512;
      canvasElementRef.current = canvas;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (uploadedImage) {
      const img = new window.Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas!.width, canvas!.height);
        // Watermark subtle SAM verified tag
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(canvas!.width - 240, canvas!.height - 40, 240, 40);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 16px "Space Grotesk", sans-serif';
        ctx.fillText('SIGN ART MEDIA • VERIFIED', canvas!.width - 225, canvas!.height - 16);
        if (adTextureRef.current) {
          adTextureRef.current.needsUpdate = true;
        }
      };
      img.src = uploadedImage;
      return;
    }

    const tpl = SAMPLE_AD_TEMPLATES[selectedTemplateIndex] || SAMPLE_AD_TEMPLATES[0];
    const bg = customBgColor || tpl.bgColor;
    const accent = customAccentColor || tpl.accentColor;
    const headline = customText || tpl.headline;
    const sub = customSubtext || tpl.subtext;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, bg);
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative geometric accents
    ctx.strokeStyle = accent;
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

    ctx.fillStyle = accent;
    ctx.fillRect(24, 24, 18, 18);
    ctx.fillRect(canvas.width - 42, 24, 18, 18);
    ctx.fillRect(24, canvas.height - 42, 18, 18);
    ctx.fillRect(canvas.width - 42, canvas.height - 42, 18, 18);

    // Subtle modern grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 60; x < canvas.width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 24);
      ctx.lineTo(x, canvas.height - 24);
      ctx.stroke();
    }

    // Top Category / Brand Pill
    ctx.fillStyle = accent;
    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.fillText(tpl.badge.toUpperCase(), 70, 95);

    // Sign Art Media location code
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 20px "Space Grotesk", sans-serif';
    ctx.fillText(`${billboard.code} • ${billboard.city.toUpperCase()}`, canvas.width - 340, 95);

    // Main Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 64px "Space Grotesk", sans-serif';
    ctx.fillText(headline.slice(0, 36), 70, 210);

    // Subtext
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(sub.slice(0, 54), 70, 290);

    // Bottom Action / CTA Bar
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.roundRect(70, 350, 320, 72, 8);
    ctx.fill();

    ctx.fillStyle = '#030712';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.fillText(tpl.cta.slice(0, 24).toUpperCase(), 95, 396);

    // Impressions badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(canvas.width - 420, 350, 350, 72, 8);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${billboard.dailyTraffic.toLocaleString()} DAILY AUDIENCE`, canvas.width - 395, 396);

    if (adTextureRef.current) {
      adTextureRef.current.needsUpdate = true;
    }
  };

  // Set up Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Detect Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Initialize Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.Fog(0x0f172a, 30, 160);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 300);
    camera.position.set(-22, 14, 38);
    cameraRef.current = camera;

    // 4. Studio Environment via PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 90;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below ground
    controls.target.set(0, 15, 0);
    controlsRef.current = controls;

    // 6. Lighting Rig
    const dirKey = new THREE.DirectionalLight(0xfff3d6, 2.8);
    dirKey.position.set(35, 45, 25);
    dirKey.castShadow = !isSoftwareGl;
    if (dirKey.castShadow) {
      dirKey.shadow.mapSize.width = 1024;
      dirKey.shadow.mapSize.height = 1024;
      dirKey.shadow.camera.near = 10;
      dirKey.shadow.camera.far = 120;
      const d = 30;
      dirKey.shadow.camera.left = -d;
      dirKey.shadow.camera.right = d;
      dirKey.shadow.camera.top = d;
      dirKey.shadow.camera.bottom = -d;
      dirKey.shadow.bias = -0.0005;
      dirKey.shadow.normalBias = 0.02;
    }
    scene.add(dirKey);

    const hemi = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 1.2);
    scene.add(hemi);

    // Billboard overhead luminaire spot lights
    const spot1 = new THREE.SpotLight(0xfffbeb, 4.5, 35, Math.PI / 4, 0.3, 1.5);
    spot1.position.set(-10, 26, 4.5);
    spot1.target.position.set(-10, 19, 0);
    scene.add(spot1);
    scene.add(spot1.target);

    const spot2 = new THREE.SpotLight(0xfffbeb, 5.0, 35, Math.PI / 4, 0.3, 1.5);
    spot2.position.set(0, 26, 4.5);
    spot2.target.position.set(0, 19, 0);
    scene.add(spot2);
    scene.add(spot2.target);

    const spot3 = new THREE.SpotLight(0xfffbeb, 4.5, 35, Math.PI / 4, 0.3, 1.5);
    spot3.position.set(10, 26, 4.5);
    spot3.target.position.set(10, 19, 0);
    scene.add(spot3);
    scene.add(spot3.target);

    // Front ad face gentle ambient glow
    const screenGlow = new THREE.PointLight(0x38bdf8, 1.2, 25);
    screenGlow.position.set(0, 19, 2);
    scene.add(screenGlow);

    lightsRef.current = { dirKey, hemi, spot1, spot2, spot3, screenGlow };

    // 7. COMPOSITE 10-PART PROCEDURAL BILLBOARD STRUCTURE (THREE.Group)
    const billboardGroup = new THREE.Group();

    // Material library with varied roughness / metalness
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.9,
      metalness: 0.05,
    });

    const steelPylonMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.35,
      metalness: 0.75,
    });

    const steelTrimMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.85,
    });

    const trussMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.4,
      metalness: 0.65,
    });

    const yellowSafetyMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.45,
      metalness: 0.2,
    });

    const lampMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.8,
    });

    const lensMat = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
    });

    // Part 1: Concrete Pedestal Footing (flush with ground)
    const footingGeo = new THREE.CylinderGeometry(3.6, 4.2, 2.0, 16);
    const footingMesh = new THREE.Mesh(footingGeo, concreteMat);
    footingMesh.position.y = 1.0;
    footingMesh.receiveShadow = !isSoftwareGl;
    footingMesh.castShadow = !isSoftwareGl;
    billboardGroup.add(footingMesh);

    // Part 2: Steel Base Flange Plate & Bolts ring
    const flangeGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.4, 20);
    const flangeMesh = new THREE.Mesh(flangeGeo, steelPylonMat);
    flangeMesh.position.y = 2.2;
    flangeMesh.castShadow = !isSoftwareGl;
    billboardGroup.add(flangeMesh);

    // Decorative bolt ring on base plate
    const boltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 8);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const bolt = new THREE.Mesh(boltGeo, steelTrimMat);
      bolt.position.set(Math.cos(angle) * 2.2, 2.45, Math.sin(angle) * 2.2);
      billboardGroup.add(bolt);
    }

    // Part 3: Heavy Monopole Tubular Column
    const pylonGeo = new THREE.CylinderGeometry(1.4, 1.8, 16.5, 24);
    const pylonMesh = new THREE.Mesh(pylonGeo, steelPylonMat);
    pylonMesh.position.y = 10.5;
    pylonMesh.castShadow = !isSoftwareGl;
    pylonMesh.receiveShadow = !isSoftwareGl;
    billboardGroup.add(pylonMesh);

    // Part 4: Service Access Ladder with Safety Cage
    const ladderGroup = new THREE.Group();
    const rungMat = steelPylonMat;
    const ladderSideGeo = new THREE.CylinderGeometry(0.04, 0.04, 15, 8);
    const side1 = new THREE.Mesh(ladderSideGeo, rungMat);
    side1.position.set(1.5, 9.5, -0.3);
    const side2 = new THREE.Mesh(ladderSideGeo, rungMat);
    side2.position.set(1.5, 9.5, 0.3);
    ladderGroup.add(side1, side2);

    const rungGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8);
    for (let r = 0; r < 24; r++) {
      const rung = new THREE.Mesh(rungGeo, rungMat);
      rung.rotation.x = Math.PI / 2;
      rung.position.set(1.5, 2.8 + r * 0.6, 0);
      ladderGroup.add(rung);
    }
    // Safety hoops
    const hoopGeo = new THREE.TorusGeometry(0.45, 0.025, 8, 16, Math.PI * 1.5);
    for (let h = 0; h < 10; h++) {
      const hoop = new THREE.Mesh(hoopGeo, yellowSafetyMat);
      hoop.rotation.x = Math.PI / 2;
      hoop.rotation.z = Math.PI * 0.25;
      hoop.position.set(1.9, 7 + h * 1.1, 0);
      ladderGroup.add(hoop);
    }
    billboardGroup.add(ladderGroup);

    // Part 5: Maintenance Catwalk Platform & Safety Railings
    const catwalkGroup = new THREE.Group();
    const catwalkGeo = new THREE.BoxGeometry(26, 0.25, 2.2);
    const catwalkMesh = new THREE.Mesh(catwalkGeo, trussMat);
    catwalkMesh.position.set(0, 13.8, 1.2);
    catwalkMesh.castShadow = !isSoftwareGl;
    catwalkGroup.add(catwalkMesh);

    // Catwalk safety handrails (yellow)
    const railGeo = new THREE.CylinderGeometry(0.04, 0.04, 26, 12);
    const topRail = new THREE.Mesh(railGeo, yellowSafetyMat);
    topRail.rotation.z = Math.PI / 2;
    topRail.position.set(0, 15.0, 2.2);
    catwalkGroup.add(topRail);

    for (let p = -12; p <= 12; p += 4) {
      const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
      const post = new THREE.Mesh(postGeo, yellowSafetyMat);
      post.position.set(p, 14.4, 2.2);
      catwalkGroup.add(post);
    }
    billboardGroup.add(catwalkGroup);

    // Part 6: Rear Structural I-Beam Cross Trusses
    const trussGroup = new THREE.Group();
    const mainBeamGeo = new THREE.BoxGeometry(26, 0.8, 0.8);
    const topBeam = new THREE.Mesh(mainBeamGeo, trussMat);
    topBeam.position.set(0, 23.5, -0.6);
    const midBeam = new THREE.Mesh(mainBeamGeo, trussMat);
    midBeam.position.set(0, 18.8, -0.6);
    const botBeam = new THREE.Mesh(mainBeamGeo, trussMat);
    botBeam.position.set(0, 14.2, -0.6);
    trussGroup.add(topBeam, midBeam, botBeam);

    // Cross braces
    for (let b = -10; b <= 10; b += 5) {
      const diagGeo = new THREE.CylinderGeometry(0.12, 0.12, 10.2, 8);
      const diag1 = new THREE.Mesh(diagGeo, trussMat);
      diag1.rotation.z = Math.PI / 4;
      diag1.position.set(b, 18.8, -0.6);
      trussGroup.add(diag1);
    }
    billboardGroup.add(trussGroup);

    // Part 7: Billboard Outer Display Housing & Beveled Border
    const frameGeo = new THREE.BoxGeometry(26.6, 9.8, 0.7);
    const frameMesh = new THREE.Mesh(frameGeo, steelTrimMat);
    frameMesh.position.set(0, 19.0, -0.15);
    frameMesh.castShadow = !isSoftwareGl;
    frameMesh.receiveShadow = !isSoftwareGl;
    billboardGroup.add(frameMesh);

    // Part 8: Front Ad Display Face (Dynamic CanvasTexture)
    updateAdCanvas();
    const adTexture = new THREE.CanvasTexture(canvasElementRef.current!);
    adTexture.colorSpace = THREE.SRGBColorSpace;
    adTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    adTextureRef.current = adTexture;

    const screenGeo = new THREE.PlaneGeometry(25.6, 8.8);
    const screenMat = new THREE.MeshStandardMaterial({
      map: adTexture,
      roughness: 0.25,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 19.0, 0.22);
    billboardGroup.add(screenMesh);

    // Part 9: Overhead Cantilevered Light Boom Arms & Fixtures
    const lightsRig = new THREE.Group();
    const armXPositions = [-10, -3.5, 3.5, 10];
    armXPositions.forEach((xPos) => {
      // Extended cantilever pipe
      const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 5.2, 8);
      const arm = new THREE.Mesh(armGeo, lampMat);
      arm.rotation.x = Math.PI / 2.3;
      arm.position.set(xPos, 24.2, 1.8);
      lightsRig.add(arm);

      // Lamp housing
      const lampGeo = new THREE.BoxGeometry(1.2, 0.4, 0.8);
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(xPos, 25.2, 3.9);
      lamp.rotation.x = -Math.PI / 6;

      // Glow lens
      const lensGeo = new THREE.PlaneGeometry(1.1, 0.7);
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.set(0, -0.21, 0);
      lens.rotation.x = Math.PI / 2;
      lamp.add(lens);

      lightsRig.add(lamp);
    });
    billboardGroup.add(lightsRig);

    // Part 10: Ground Environment: Multi-Lane Highway & Contact Shadow
    const groundGroup = new THREE.Group();

    // Soft radial contact shadow directly under billboard
    const contactShadowGeo = new THREE.PlaneGeometry(18, 18);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const radGrad = sCtx.createRadialGradient(64, 64, 5, 64, 64, 60);
    radGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
    radGrad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const contactShadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadowMesh.rotation.x = -Math.PI / 2;
    contactShadowMesh.position.set(0, 0.02, 0);
    groundGroup.add(contactShadowMesh);

    // Road terrain (Highway with lanes)
    const roadGeo = new THREE.PlaneGeometry(160, 24);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.85,
      metalness: 0.1,
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(0, 0.0, 16);
    roadMesh.receiveShadow = !isSoftwareGl;
    groundGroup.add(roadMesh);

    // Highway Shoulder & Grass
    const grassGeo = new THREE.PlaneGeometry(180, 80);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.95,
      metalness: 0.0,
    });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.rotation.x = -Math.PI / 2;
    grassMesh.position.set(0, -0.05, 0);
    groundGroup.add(grassMesh);

    // Road lane markings
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const dashYellowMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

    // Center dividing double yellow
    const yellowLineGeo = new THREE.PlaneGeometry(160, 0.3);
    const yellowLine = new THREE.Mesh(yellowLineGeo, dashYellowMat);
    yellowLine.rotation.x = -Math.PI / 2;
    yellowLine.position.set(0, 0.03, 16);
    groundGroup.add(yellowLine);

    // White dashed markings
    for (let d = -75; d < 75; d += 6) {
      const dashGeo = new THREE.PlaneGeometry(3, 0.25);
      const dash1 = new THREE.Mesh(dashGeo, dashMat);
      dash1.rotation.x = -Math.PI / 2;
      dash1.position.set(d, 0.03, 11);
      const dash2 = new THREE.Mesh(dashGeo, dashMat);
      dash2.rotation.x = -Math.PI / 2;
      dash2.position.set(d, 0.03, 21);
      groundGroup.add(dash1, dash2);
    }

    // Animated traffic light trails / highway vehicle markers
    const trafficCars: { mesh: THREE.Group; speed: number; dir: number }[] = [];
    const carColors = [0xef4444, 0x3b82f6, 0xffffff, 0x94a3b8];

    for (let c = 0; c < 6; c++) {
      const carGroup = new THREE.Group();
      const carBodyGeo = new THREE.BoxGeometry(4.0, 1.2, 1.9);
      const carMat = new THREE.MeshStandardMaterial({
        color: carColors[c % carColors.length],
        roughness: 0.3,
        metalness: 0.7,
      });
      const carBody = new THREE.Mesh(carBodyGeo, carMat);
      carBody.position.y = 0.8;
      carGroup.add(carBody);

      // Headlights & Taillights
      const headGeo = new THREE.PlaneGeometry(0.3, 0.3);
      const headMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
      const hl1 = new THREE.Mesh(headGeo, headMat);
      hl1.position.set(2.01, 0.7, 0.6);
      hl1.rotation.y = Math.PI / 2;
      const hl2 = new THREE.Mesh(headGeo, headMat);
      hl2.position.set(2.01, 0.7, -0.6);
      hl2.rotation.y = Math.PI / 2;
      carGroup.add(hl1, hl2);

      const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tl1 = new THREE.Mesh(headGeo, tailMat);
      tl1.position.set(-2.01, 0.7, 0.6);
      tl1.rotation.y = -Math.PI / 2;
      const tl2 = new THREE.Mesh(headGeo, tailMat);
      tl2.position.set(-2.01, 0.7, -0.6);
      tl2.rotation.y = -Math.PI / 2;
      carGroup.add(tl1, tl2);

      const laneZ = c < 3 ? 12 : 20;
      const dir = c < 3 ? 1 : -1;
      carGroup.position.set((c - 3) * 25, 0, laneZ);
      if (dir === -1) carGroup.rotation.y = Math.PI;
      groundGroup.add(carGroup);
      trafficCars.push({ mesh: carGroup, speed: 0.25 + (c % 3) * 0.1, dir });
    }

    billboardGroup.add(groundGroup);
    scene.add(billboardGroup);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 8. Animation & Render Loop
    let animId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          animId = window.setTimeout(cb, 80);
        }
      };
      animId = window.setTimeout(poll, 5);
    }

    const targetCameraPos = new THREE.Vector3().copy(camera.position);
    const targetControlsTarget = new THREE.Vector3().copy(controls.target);

    const tick = () => {
      const delta = clock.getDelta();

      // Highway traffic movement
      trafficCars.forEach((item) => {
        item.mesh.position.x += item.speed * item.dir;
        if (item.mesh.position.x > 75) item.mesh.position.x = -75;
        if (item.mesh.position.x < -75) item.mesh.position.x = 75;
      });

      // Smooth camera position damping towards target
      camera.position.lerp(targetCameraPos, 0.05);
      controls.target.lerp(targetControlsTarget, 0.05);
      controls.update();

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      animId = requestAnimationFrame(tick);
    }

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      clearTimeout(animId);
      renderer.dispose();
    };
  }, [billboard.id]);

  // Lighting environment updates when timeOfDay changes
  useEffect(() => {
    if (!sceneRef.current || !lightsRef.current) return;
    const { dirKey, hemi, spot1, spot2, spot3, screenGlow } = lightsRef.current;
    const scene = sceneRef.current;

    if (timeOfDay === 'day') {
      scene.background = new THREE.Color(0x38bdf8);
      scene.fog = new THREE.Fog(0x38bdf8, 40, 180);
      dirKey.color.setHex(0xfff3d6);
      dirKey.intensity = 2.8;
      dirKey.position.set(35, 45, 25);
      hemi.color.setHex(0x93c5fd);
      hemi.groundColor.setHex(0x1e293b);
      hemi.intensity = 1.2;

      spot1.intensity = 0.5;
      spot2.intensity = 0.5;
      spot3.intensity = 0.5;
      screenGlow.intensity = 0.2;
    } else if (timeOfDay === 'sunset') {
      scene.background = new THREE.Color(0x4c1d95);
      scene.fog = new THREE.Fog(0x7c2d12, 35, 170);
      dirKey.color.setHex(0xf97316);
      dirKey.intensity = 2.2;
      dirKey.position.set(50, 15, 30);
      hemi.color.setHex(0xfb923c);
      hemi.groundColor.setHex(0x2e1065);
      hemi.intensity = 0.9;

      spot1.intensity = 3.5;
      spot2.intensity = 4.0;
      spot3.intensity = 3.5;
      screenGlow.intensity = 0.8;
    } else {
      // Night mode
      scene.background = new THREE.Color(0x030712);
      scene.fog = new THREE.Fog(0x030712, 30, 150);
      dirKey.color.setHex(0x1e293b);
      dirKey.intensity = 0.3;
      dirKey.position.set(10, 30, 20);
      hemi.color.setHex(0x1e1b4b);
      hemi.groundColor.setHex(0x020617);
      hemi.intensity = 0.3;

      spot1.intensity = 6.0;
      spot2.intensity = 6.5;
      spot3.intensity = 6.0;
      screenGlow.intensity = 1.8;
    }
  }, [timeOfDay]);

  // Redraw canvas texture when ad parameters change
  useEffect(() => {
    updateAdCanvas();
  }, [selectedTemplateIndex, customText, customSubtext, customBgColor, customAccentColor, uploadedImage]);

  // Camera presets
  const applyCameraView = (view: CameraView) => {
    setCurrentCameraView(view);
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (view === 'highway') {
      // Driver's perspective on highway looking up at the billboard
      camera.position.set(-18, 4.5, 34);
      controls.target.set(0, 17.5, 0);
    } else if (view === 'pedestrian') {
      // Pedestrian looking up from near the foundation
      camera.position.set(6, 2.5, 14);
      controls.target.set(0, 18, 0);
    } else if (view === 'drone') {
      // Cinematic overhead orbit
      camera.position.set(28, 28, 42);
      controls.target.set(0, 16, 0);
    } else if (view === 'detail') {
      // Close inspection of billboard ad screen and catwalk
      camera.position.set(0, 19.5, 15);
      controls.target.set(0, 19.0, 0);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-[620px] overflow-hidden border-2 border-[#111111] bg-[#111111] shadow-xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Minimal Spec Badge (Non-occluding) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-white/20 text-xs shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#eb3b14] inline-block" />
          <span className="font-bold text-white tracking-wider font-display uppercase">3D LIVE SIMULATOR</span>
          <span className="text-white/40">|</span>
          <span className="text-[#eb3b14] font-mono font-bold">{billboard.code}</span>
        </div>
        <div className="px-3 py-1 bg-[#111111]/80 text-[11px] text-white/80 font-mono">
          Drag to rotate • Scroll to zoom • {billboard.dimensions}
        </div>
      </div>

      {/* Top Right Quick Action Pill */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {onBookNow && (
          <button
            onClick={() => onBookNow(billboard)}
            className="px-4 py-2 bg-[#eb3b14] hover:bg-[#d4320e] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Book This Board (${billboard.weeklyRate}/wk)
          </button>
        )}
      </div>

      {/* Unified Bottom Control Dock (<=15% Viewport footprint, Collapsible) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl transition-all duration-300">
        {/* Toggle Collapse Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="px-3 py-1 bg-[#111111] border-t border-x border-[#333333] text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
            aria-label={isControlsCollapsed ? 'Show 3D Simulator Controls' : 'Hide Controls (Zen Mode)'}
          >
            {isControlsCollapsed ? <ChevronUp className="w-3.5 h-3.5 text-[#eb3b14]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#eb3b14]" />}
            {isControlsCollapsed ? 'Show 3D Controls' : 'Hide Controls (Zen Mode)'}
          </button>
        </div>

        {/* Floating Dock Surface */}
        {!isControlsCollapsed && (
          <div className="bg-[#111111] border border-[#333333] p-3 shadow-2xl space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              {/* Lighting / Environment Presets */}
              <div className="flex items-center gap-1 bg-black/60 p-1 border border-[#222222]">
                <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider px-2">Light</span>
                <button
                  onClick={() => setTimeOfDay('day')}
                  className={`flex-1 py-1 px-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    timeOfDay === 'day' ? 'bg-[#eb3b14] text-white font-bold' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Day
                </button>
                <button
                  onClick={() => setTimeOfDay('sunset')}
                  className={`flex-1 py-1 px-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    timeOfDay === 'sunset' ? 'bg-[#eb3b14] text-white font-bold' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5" /> Sunset
                </button>
                <button
                  onClick={() => setTimeOfDay('night')}
                  className={`flex-1 py-1 px-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    timeOfDay === 'night' ? 'bg-[#eb3b14] text-white font-bold' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Night
                </button>
              </div>

              {/* Camera Angle Presets */}
              <div className="flex items-center gap-1 bg-black/60 p-1 border border-[#222222]">
                <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider px-2">Angle</span>
                <button
                  onClick={() => applyCameraView('highway')}
                  className={`flex-1 py-1 px-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentCameraView === 'highway' ? 'bg-white text-[#111111]' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  Highway
                </button>
                <button
                  onClick={() => applyCameraView('pedestrian')}
                  className={`flex-1 py-1 px-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentCameraView === 'pedestrian' ? 'bg-white text-[#111111]' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  Street
                </button>
                <button
                  onClick={() => applyCameraView('drone')}
                  className={`flex-1 py-1 px-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentCameraView === 'drone' ? 'bg-white text-[#111111]' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  Drone
                </button>
                <button
                  onClick={() => applyCameraView('detail')}
                  className={`flex-1 py-1 px-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    currentCameraView === 'detail' ? 'bg-white text-[#111111]' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  Detail
                </button>
              </div>

              {/* Ad Preset / Upload Selector */}
              <div className="flex items-center gap-2">
                <div className="flex-1 flex gap-1">
                  {SAMPLE_AD_TEMPLATES.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedTemplateIndex(idx);
                        setUploadedImage(null);
                      }}
                      className={`flex-1 py-1 text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                        selectedTemplateIndex === idx && !uploadedImage
                          ? 'border-[#eb3b14] bg-[#eb3b14] text-white'
                          : 'border-[#333333] bg-black text-[#888888] hover:text-white'
                      }`}
                    >
                      {t.badge.split('/')[0].trim()}
                    </button>
                  ))}
                </div>

                {/* Custom Artwork Upload */}
                <label className="cursor-pointer px-2.5 py-1 bg-[#222222] hover:bg-[#333333] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-[#444444] shrink-0">
                  <Image className="w-3.5 h-3.5 text-[#eb3b14]" />
                  <span>{uploadedImage ? 'Custom' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    aria-label="Upload custom billboard ad design"
                  />
                </label>
              </div>
            </div>

            {/* Quick Live Text Customizer on the 3D billboard */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#262626] text-xs">
              <span className="text-[#888888] font-bold uppercase tracking-wider flex items-center gap-1 text-[10px]">
                <Type className="w-3.5 h-3.5 text-[#eb3b14]" /> Headline:
              </span>
              <input
                type="text"
                value={customText}
                onChange={(e) => {
                  setCustomText(e.target.value);
                  setUploadedImage(null);
                }}
                maxLength={40}
                placeholder="Type your billboard headline..."
                className="flex-1 min-w-[200px] bg-black border border-[#333333] px-2.5 py-1 text-white text-xs focus:outline-none focus:border-[#eb3b14]"
              />
              <div className="flex items-center gap-2 text-[10px] text-[#888888] font-bold uppercase tracking-wider">
                <span>Color:</span>
                <input
                  type="color"
                  value={customAccentColor}
                  onChange={(e) => {
                    setCustomAccentColor(e.target.value);
                    setUploadedImage(null);
                  }}
                  className="w-5 h-5 cursor-pointer border-0 bg-transparent"
                  title="Pick Brand Color"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
