var renderer, scene, camera, circle, skelet, particle;

// Array of colors for the big rotating circle
var circleColors = [0x00ff00, 0xff0000, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

window.onload = function () {
  init();
  animate();
};

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  circle = new THREE.Object3D();
  skelet = new THREE.Object3D();
  particle = new THREE.Object3D();

  scene.add(circle);
  scene.add(skelet);
  scene.add(particle);

  var geometry = new THREE.TetrahedronGeometry(2, 0);
  var geom = new THREE.IcosahedronGeometry(7, 1);
  var geom2 = new THREE.IcosahedronGeometry(15, 1);

  for (var i = 0; i < 1000; i++) {
    var randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());

    var material = new THREE.MeshPhongMaterial({
      color: randomColor,
      emissive: randomColor,
      shininess: 50,
      specular: randomColor,
      shading: THREE.FlatShading,
      map: createGradientTexture(),
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + Math.random() * 700);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var darkColor = new THREE.Color(0x222222); // Dark color for the big rotating circle

  var mat = new THREE.MeshPhongMaterial({
    color: darkColor,
    emissive: new THREE.Color(0x11e8bb),
    shininess: 30,
    specular: new THREE.Color(0x11e8bb),
    shading: THREE.FlatShading,
  });

  var mat2 = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xffffff),
    emissive: new THREE.Color(0x8200c9),
    wireframe: true,
    side: THREE.DoubleSide,
  });

  var planet = new THREE.Mesh(geom, mat);
  planet.scale.x = planet.scale.y = planet.scale.z = 16;
  circle.add(planet);

  var planet2 = new THREE.Mesh(geom2, mat2);
  planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
  skelet.add(planet2);

  var ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight(0xffffff, 1);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  window.addEventListener('resize', onWindowResize, false);
}

function createGradientTexture() {
  var canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  var context = canvas.getContext('2d');
  var gradient = context.createLinearGradient(0, 0, 256, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Cycle through colors for the big rotating circle
  var currentColor = circleColors[Math.floor(Date.now() / 1000) % circleColors.length];
  circle.children[0].material.color.set(currentColor);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  circle.rotation.x -= 0.0020;
  circle.rotation.y -= 0.0030;
  skelet.rotation.x -= 0.0010;
  skelet.rotation.y += 0.0020;
  renderer.clear();

  renderer.render(scene, camera);
}


 