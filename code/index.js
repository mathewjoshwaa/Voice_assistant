let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('orreryCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 50;

let sunGeometry = new THREE.SphereGeometry(5, 32, 32);
let sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
let sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

let planets = [];
let planetData = [
    { name: 'Mercury', size: 0.5, color: 0xaaaaaa, distance: 10, speed: 0.04 },
    { name: 'Venus', size: 1, color: 0xffc400, distance: 15, speed: 0.03 },
    { name: 'Earth', size: 1.2, color: 0x00aaff, distance: 20, speed: 0.02 },
    { name: 'Mars', size: 0.8, color: 0xff4500, distance: 25, speed: 0.015 }
];

planetData.forEach((planetInfo) => {
    let planetGeometry = new THREE.SphereGeometry(planetInfo.size, 32, 32);
    let planetMaterial = new THREE.MeshBasicMaterial({ color: planetInfo.color });
    let planet = new THREE.Mesh(planetGeometry, planetMaterial);

    planet.userData = { distance: planetInfo.distance, speed: planetInfo.speed, angle: 0, name: planetInfo.name };
    planets.push(planet);
    scene.add(planet);
});

function animate() {
    requestAnimationFrame(animate);

    planets.forEach(planet => {
        planet.userData.angle += planet.userData.speed;
        planet.position.x = planet.userData.distance * Math.cos(planet.userData.angle);
        planet.position.z = planet.userData.distance * Math.sin(planet.userData.angle);
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

document.getElementById('planetModal').style.display = 'none';

function zoomIn() {
    camera.position.z -= 5;
}

function zoomOut() {
    camera.position.z += 5;
}

function rotateLeft() {
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1;
}

function rotateRight() {
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
}

function resetView() {
    camera.position.set(0, 0, 50);
    controls.autoRotate = false;
}
