const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click', activate, false);



(function () {
  var width,
    height,
    largeHeader,
    canvas,
    ctx,
    points,
    target,
    animateHeader = true;

  // Main
  initHeader();
  initAnimation();
  addListeners();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };

    largeHeader = document.getElementById("large-header");
    largeHeader.style.height = height + "px";

    canvas = document.getElementById("demo-canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    // create points
    points = [];
    for (var x = 0; x < width; x = x + width / 20) {
      for (var y = 0; y < height; y = y + height / 20) {
        var px = x + (Math.random() * width) / 20;
        var py = y + (Math.random() * height) / 20;
        var p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j];
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
      var c = new Circle(
        points[i],
        2 + Math.random() * 2,
        "rgba(255,255,255,0.3)"
      );
      points[i].circle = c;
    }
  }

  // Event handling
  function addListeners() {
    if (!("ontouchstart" in window)) {
      window.addEventListener("mousemove", mouseMove);
    }
    window.addEventListener("scroll", scrollCheck);
    window.addEventListener("resize", resize);
  }

  function mouseMove(e) {
    var posx = (posy = 0);
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    largeHeader.style.height = height + "px";
    canvas.width = width;
    canvas.height = height;
  }

  // animation
  function initAnimation() {
    animate();
    for (var i in points) {
      shiftPoint(points[i]);
    }
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: function () {
        shiftPoint(p);
      }
    });
  }

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
      ctx.stroke();
    }
  }

  function Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function () {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function () {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
      ctx.fill();
    };
  }

  // Util
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
})();


  document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('mainSection').scrollIntoView({ behavior: 'smooth' });
  });





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
  








  
