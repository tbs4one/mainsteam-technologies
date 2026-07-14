(function (global) {
  'use strict';

  function prefersReducedMotion() {
    return global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function createLogoScene(container, options) {
    if (!global.THREE) return null;

    var THREE = global.THREE;
    var size = options.size || 48;
    var interactive = options.interactive !== false;
    var reducedMotion = prefersReducedMotion();

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.className = 'logo-3d-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.6);
    camera.lookAt(0, 0.3, 0);

    scene.add(new THREE.AmbientLight(0x64748b, 0.55));

    var keyLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    var rimLight = new THREE.DirectionalLight(0x818cf8, 0.9);
    rimLight.position.set(-3, 2, -4);
    scene.add(rimLight);

    var fillLight = new THREE.PointLight(0x0ea5e9, 0.6, 12);
    fillLight.position.set(0, -1, 2);
    scene.add(fillLight);

    var logoGroup = new THREE.Group();
    scene.add(logoGroup);

    var diskMaterial = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.72,
      roughness: 0.22,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.35
    });

    var diskTopMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.65,
      roughness: 0.18,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45
    });

    var diskHeights = [0.22, 0.2, 0.18];
    var diskRadii = [0.95, 0.82, 0.7];
    var yOffset = -0.55;

    diskHeights.forEach(function (height, index) {
      var radius = diskRadii[index];
      var geometry = new THREE.CylinderGeometry(radius, radius, height, 48, 1, false);
      var body = new THREE.Mesh(geometry, diskMaterial);
      body.position.y = yOffset + height / 2;
      logoGroup.add(body);

      var capGeometry = new THREE.CylinderGeometry(radius, radius, 0.04, 48);
      var topCap = new THREE.Mesh(capGeometry, diskTopMaterial);
      topCap.position.y = yOffset + height;
      logoGroup.add(topCap);

      yOffset += height + 0.08;
    });

    var ringGeometry = new THREE.TorusGeometry(1.15, 0.045, 12, 64);
    var ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x4338ca,
      emissiveIntensity: 0.25
    });
    var ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.15;
    logoGroup.add(ring);

    var particleCount = size >= 120 ? 140 : 80;
    var positions = new Float32Array(particleCount * 3);
    var speeds = [];

    for (var i = 0; i < particleCount; i++) {
      var angle = Math.random() * Math.PI * 2;
      var radius = 0.15 + Math.random() * 0.55;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0.2 + Math.random() * 1.4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      speeds.push(0.004 + Math.random() * 0.012);
    }

    var particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var particleMaterial = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: size >= 120 ? 0.06 : 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    var particles = new THREE.Points(particleGeometry, particleMaterial);
    logoGroup.add(particles);

    var nodeGeometry = new THREE.SphereGeometry(0.07, 16, 16);
    var nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.8,
      metalness: 0.4,
      roughness: 0.3
    });

    var nodes = [];
    for (var n = 0; n < 3; n++) {
      var node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      var nodeAngle = (n / 3) * Math.PI * 2;
      node.position.set(Math.cos(nodeAngle) * 1.15, 0.55 + n * 0.35, Math.sin(nodeAngle) * 1.15);
      logoGroup.add(node);
      nodes.push({ mesh: node, angle: nodeAngle, height: 0.55 + n * 0.35 });
    }

    logoGroup.rotation.x = -0.28;
    logoGroup.rotation.y = 0.55;

    var pointer = { x: 0, y: 0 };
    var targetRotation = { x: -0.28, y: 0.55 };

    if (interactive && !reducedMotion) {
      container.addEventListener('pointermove', function (event) {
        var rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      });

      container.addEventListener('pointerleave', function () {
        pointer.x = 0;
        pointer.y = 0;
      });
    }

    var animationId = null;
    var clock = new THREE.Clock();

    function animate() {
      animationId = global.requestAnimationFrame(animate);
      var elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        targetRotation.y = 0.55 + pointer.x * 0.35;
        targetRotation.x = -0.28 + pointer.y * 0.2;
        logoGroup.rotation.y += (targetRotation.y - logoGroup.rotation.y) * 0.06;
        logoGroup.rotation.x += (targetRotation.x - logoGroup.rotation.x) * 0.06;
        ring.rotation.z = elapsed * 0.35;
      }

      var particlePositions = particles.geometry.attributes.position.array;
      for (var p = 0; p < particleCount; p++) {
        var base = p * 3;
        particlePositions[base + 1] += speeds[p];
        if (particlePositions[base + 1] > 1.85) {
          var resetAngle = Math.random() * Math.PI * 2;
          var resetRadius = 0.15 + Math.random() * 0.55;
          particlePositions[base] = Math.cos(resetAngle) * resetRadius;
          particlePositions[base + 1] = 0.15;
          particlePositions[base + 2] = Math.sin(resetAngle) * resetRadius;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      nodes.forEach(function (nodeData, index) {
        if (!reducedMotion) {
          nodeData.mesh.position.y = nodeData.height + Math.sin(elapsed * 1.8 + index) * 0.08;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    return {
      destroy: function () {
        if (animationId !== null) {
          global.cancelAnimationFrame(animationId);
        }
        container.removeChild(renderer.domElement);
        renderer.dispose();
        diskMaterial.dispose();
        diskTopMaterial.dispose();
        ringMaterial.dispose();
        particleMaterial.dispose();
        nodeMaterial.dispose();
      }
    };
  }

  function initLogo3D(selector, options) {
    var elements = document.querySelectorAll(selector);
    var instances = [];

    elements.forEach(function (el) {
      var size = parseInt(el.getAttribute('data-size'), 10) || options.size || 48;
      var interactive = el.getAttribute('data-interactive') !== 'false';
      var instance = createLogoScene(el, {
        size: size,
        interactive: interactive
      });
      if (instance) instances.push(instance);
    });

    return instances;
  }

  global.MainSteamLogo3D = { init: initLogo3D };
})(window);
