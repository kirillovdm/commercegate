(function (THREE) {
    'use strict';

    var container = document.getElementById('head-block');

    if (!container || !THREE) return;

    var mouseX = 0,
        mouseY = 0,
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000),
        group = new THREE.Group(),
        scene = new THREE.Scene();

    camera.position.z = 1200;

    group.position.x = 600;
    group.position.y = -150;

    scene.add(group);

    // earth
    var loader = new THREE.TextureLoader();

    loader.load('images/map-lines.png', function (texture) {
        var geometry = new THREE.SphereGeometry(500, 40, 40);

        var material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: 0.15
        });

        var mesh = new THREE.Mesh(geometry, material);

        group.add(mesh);
    });

    // shadow
    var canvas = document.createElement('canvas');

    canvas.width = 128;
    canvas.height = 128;

    // var context = canvas.getContext('2d');
    // var gradient = context.createRadialGradient(
    //     canvas.width / 2,
    //     canvas.height / 2,
    //     0,
    //     canvas.width / 2,
    //     canvas.height / 2,
    //     canvas.width / 2
    // );
    // gradient.addColorStop( 0.1, 'rgba(210,210,210,1)' );
    // gradient.addColorStop( 1, 'rgba(255,255,255,1)' );

    // context.fillStyle = gradient;
    // context.fillRect( 0, 0, canvas.width, canvas.height );

    var texture = new THREE.CanvasTexture(canvas);

    var geometry = new THREE.PlaneBufferGeometry(300, 300, 3, 3);
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5
    });

    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = -450;
    mesh.rotation.x = -(Math.PI / 2);
    group.add(mesh);

    var renderer = new THREE.CanvasRenderer();

    renderer.setClearColor(0xfcfdfd);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // onMouseMove
    document.addEventListener('mousemove', function (event) {
        mouseX = (event.clientX - (window.innerWidth / 2));
        mouseY = (event.clientY - (window.innerHeight / 2));
    }, false);

    // onResize
    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // Render function
    var render = function () {
        camera.position.x += (mouseX - camera.position.x) * 0.025;
        camera.position.y += (-mouseY - camera.position.y) * 0.025;
        camera.lookAt(scene.position);

        group.rotation.y -= 0.005;

        renderer.render(scene, camera);
    };

    // Animate function
    var animate = function () {
        requestAnimationFrame(animate);
        render();
    };

    animate();
})(window.THREE);
