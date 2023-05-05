import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//1.相机
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  200000000
);
camera.position.set(13032420.413, 3927491.364, 657462.181);
// camera.lookAt(13524351.5, 3662942.75, 0);

//2.渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb9d3ff, 1);
renderer.outputEncoding = THREE.sRGBEncoding;
//3.轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.target.set(13054020, 3771289, -20000);

export { camera, renderer, controls };
