import * as THREE from "three";
import { camera } from "../RenderCamera.js";
import { meshgroup } from "../scene/mesh.js";

let chooseMesh = null;
function choose(event) {
  if (chooseMesh) {
    chooseMesh.material[0].color.set(0x00fff); //当选A模型后，再选择B模型，此时需要将A模型的颜色设为本身的颜色
  }
  //1.获取当前鼠标的坐标
  let Sx = event.clientX;
  let Sy = event.clientY;
  //2.转换屏幕坐标系为webgl坐标系
  let x = (Sx / window.innerWidth) * 2 - 1;
  let y = -(Sy / window.innerHeight) * 2 + 1;
  console.log("x", x);
  //3.引入射线类
  let raycaster = new THREE.Raycaster();
  //4.根据摄像机生成射线向量
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //5.计算和射线相交的网格模型,若有相交则返回一个数组对象，否则返回一个空数组
  let intersetc = raycaster.intersectObjects(meshgroup.children);
  //6.如果intersetc的大于零，说明有模型被选中，可以对该模型进行后续操作
  console.log("intersetc", intersetc);
  if (intersetc.length > 0) {
    //1.取出被选中的模型
    chooseMesh = intersetc[0].object;
    //射线与网格的交点坐标
    // console.log("intersetc[0]", intersetc[0]);
    chooseMesh.material[0].color.set(0xff0000);
  } else {
    chooseMesh = 0;
  }
}

export { choose };
