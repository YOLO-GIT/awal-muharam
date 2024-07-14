import * as THREE from 'three';
import {
    FontLoader
} from 'three/examples/jsm/loaders/FontLoader.js';
import {
    TextGeometry
} from 'three/examples/jsm/geometries/TextGeometry.js';
import {
    TextureLoader
} from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

// Start background music
const bgMusic = document.getElementById('bg-music');
bgMusic.play();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(50, 50, 50);
// scene.add(pointLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// Load textures
const textureLoader = new TextureLoader();
const galaxyTexture = textureLoader.load('image/galaxy-texture.jpg'); // Replace with the correct path to your galaxy texture
const EarthTexture = textureLoader.load('image/earth-texture.jpg'); // Replace with the correct path to your Earth texture
const moonTexture = textureLoader.load('image/moon-texture.jpg'); // Replace with the correct path to your Moon texture

// Create rotating galaxy background
const galaxyGeometry = new THREE.SphereGeometry(500, 32, 32);
const galaxyMaterial = new THREE.MeshBasicMaterial({
    map: galaxyTexture,
    side: THREE.BackSide
});
const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

// Create Earth
const earthMaterial = new THREE.MeshStandardMaterial({
    map: EarthTexture
});
const earthGeometry = new THREE.SphereGeometry(10, 32, 32);
const Earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(Earth);

// Create Moon
const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture
});
const moonGeometry = new THREE.SphereGeometry(2.5, 32, 32);
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

// Create pivot for Moon's orbit
const moonPivot = new THREE.Object3D();
moonPivot.add(moonMesh);
moonMesh.position.set(15, 0, 0); // Adjust distance from Earth
scene.add(moonPivot);

// Create stars
const starGeometry = new THREE.SphereGeometry(0.5, 24, 24);
const starMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff
});

function addStar() {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

let textMesh;
const textColor = new THREE.Color(0xffffff); // Initial text color

// Load the font and create text
const fontLoader = new FontLoader();
fontLoader.load(
    'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
    (droidFont) => {
        const textGeometry = new TextGeometry('Happy Islamic New Year', {
            size: 5,
            height: 2,
            font: droidFont,
        });
        const textMaterial = new THREE.MeshStandardMaterial({
            color: textColor
        });
        textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = -40;
        textMesh.position.y = -25;
        scene.add(textMesh);
    }
);

let textHue = 0;

const eyebollTexture = new THREE.TextureLoader().load('image/eye.gif');

const Eyeboll = new THREE.Mesh(
    new THREE.SphereGeometry(100, 500, 500),
    new THREE.MeshStandardMaterial({
        map: eyebollTexture
    })
);

Eyeboll.position.z = 30;
Eyeboll.position.y = 300;
Eyeboll.position.x = 50;

scene.add(Eyeboll);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    if (textMesh) {
        // Update text color hue
        textHue += 0.01;
        if (textHue > 1) textHue = 0;
        textMesh.material.color.setHSL(textHue, 1, 0.5);

        // Optionally, you can add rotation
        const time = Date.now() * 0.001;
        textMesh.rotation.x = Math.sin(time) * 0.1;
        textMesh.rotation.y = Math.cos(time) * 0.1;
    }

    Earth.rotation.x += 0.005;

    moonPivot.rotation.x = 0;
    moonPivot.rotation.y -= 0.005;
    moonPivot.rotation.z = 0;

    moonPivot.rotation.x += 0.005;

    galaxy.rotation.y += 0.001; // Rotate the galaxy background

    controls.update();

    renderer.render(scene, camera);
}

animate();

// Mouse movement interaction
document.addEventListener('mousemove', (event) => {
    if (textMesh) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        textMesh.rotation.x = mouseY * Math.PI * 0.1;
        textMesh.rotation.y = mouseX * Math.PI * 0.1;
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});