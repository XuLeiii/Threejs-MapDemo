import * as THREE from "three";
import { group } from "./mesh.js";

//1.场景
const scene = new THREE.Scene();

//2.灯光
// 环境光
const ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);
// 平行光  （与点光源不同 是从一个方向来 不是从一个点）
const directionalLight = new THREE.DirectionalLight(0x666666);
directionalLight.position.set(10, -50, 300);
scene.add(directionalLight);

//3.坐标系
const axies = new THREE.AxesHelper(30000000, 30000000, 30000000);
scene.add(axies);

//4.添加网格体
scene.add(group);
export { scene };
