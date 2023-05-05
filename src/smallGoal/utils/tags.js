//封装的一个函数，用来批量生成html标签和CSS2D模型。

import {
  CSS3DObject,
  CSS3DRenderer,
} from "three/addons/renderers/CSS3DRenderer.js";

function tags(name) {
  //创建一个div标签
  let dom = document.createElement("div");
  dom.innerHTML = name;
  dom.classList.add("tag");
  //div标签包装为css2dobject label模型
  let label1 = new CSS3DObject(dom);
  dom.style.pointerEvents = "none";
  // label1.rotateY(Math.PI / 2);
  label1.scale.set(900, 900, 900);
  return label1; //返回label模型
}

//2.创建CSS2D渲染器,想象为一个画布
let labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

export { tags, labelRenderer };
