 import * as THREE from 'three';
 import {
     FontLoader
 } from 'three/examples/jsm/loaders/FontLoader.js';
 import {
     TextGeometry
 } from 'three/examples/jsm/geometries/TextGeometry.js';

 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer({
     canvas: document.querySelector('#bg')
 });
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize(window.innerWidth, window.innerHeight);
 camera.position.setZ(30);

 // Commented out the box geometry
 // const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
 // const boxMaterial = new THREE.MeshNormalMaterial();
 // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
 // scene.add(boxMesh);

 // Load the font
 const fontLoader = new FontLoader();
 fontLoader.load(
     'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
     (droidFont) => {
         const textGeometry = new TextGeometry('three.js', {
             size: 5,
             height: 2,
             font: droidFont,
         });
         const textMaterial = new THREE.MeshNormalMaterial();
         const textMesh = new THREE.Mesh(textGeometry, textMaterial);
         textMesh.position.x = -15;
         textMesh.position.y = 0;
         scene.add(textMesh);
     }
 );

 function animate() {
     requestAnimationFrame(animate);
     renderer.render(scene, camera);
 }

 animate();