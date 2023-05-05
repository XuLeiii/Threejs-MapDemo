import * as THREE from "three";
import { lon2xy } from "../utils/math.js"; //经纬坐标转换墨卡托坐标
import { box3Compute } from "../utils/box3Compute.js"; //包围盒函数
import { tags } from "../utils/tags.js";
//中国GeoJson边框线和立体图
const linegroup = new THREE.Group();
const meshgroup = new THREE.Group();
const labelgroup = new THREE.Group();
const sidegroup = new THREE.Group();
const group = new THREE.Group();
const loaderfile = new THREE.FileLoader();
loaderfile.setResponseType("json");
// loaderfile.load("/smallGoal/GeoJson/china详细.json", async (data) => {
//   //边框线的生成、每个item是一个省份的边框数据
//   data.features.forEach(async (item) => {
//     let pointArr = [];
//     if (item.geometry.type === "Polygon") {
//       item.geometry.coordinates = [item.geometry.coordinates];
//     }
//     //一个coordinatesArr是一个省份坐标点的集合
//     const coordinatesArr = item.geometry.coordinates[0][0];
//     await coordinatesArr.forEach((item) => {
//       let xy = lon2xy(item[0], item[1]);
//       pointArr.push(xy.x, xy.y, 0);
//     });
//     const geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
//     const vertices = new Float32Array(pointArr);
//     const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
//     geometry.attributes.position = attribue;
//     const material = new THREE.LineBasicMaterial({
//       color: 0x000000, //线条颜色
//     });
//     const line = new THREE.LineLoop(geometry, material); //首尾顶点连线，轮廓闭合
//     group.add(line);
//   });
//   box3Compute(group);

//   // //立体图的生成、每个item是一个省份的边框数据
//   // data.features.forEach(async (item) => {
//   //   let vector2Arr = [];
//   //   let shapeArr = [];
//   //   if (item.geometry.type === "Polygon") {
//   //     item.geometry.coordinates = [item.geometry.coordinates];
//   //   }
//   //   //一个coordinatesArr是一个省份坐标点的集合
//   //   const coordinatesArr = item.geometry.coordinates[0][0];
//   //   await coordinatesArr.forEach((item) => {
//   //     let xy = lon2xy(item[0], item[1]);
//   //     vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
//   //   });
//   //   const shape = new THREE.Shape(vector2Arr);
//   //   shapeArr.push(shape);
//   //   var material1 = new THREE.MeshPhongMaterial({
//   //     color: 0x00fff,
//   //     specular: 0x00ffff,
//   //   });
//   //   var material2 = new THREE.MeshBasicMaterial({
//   //     color: 0x008bfb,
//   //   });
//   //   const ShapeGeometry = new THREE.ExtrudeBufferGeometry(shapeArr, {
//   //     depth: -80000,
//   //     bevelEnabled: false,
//   //   });
//   //   const shapeMesh = new THREE.Mesh(ShapeGeometry, [material1, material2]);
//   //   group.add(shapeMesh);
//   // });

// });

//1.线框图/文字
loaderfile.load("/smallGoal/GeoJson/安徽省线框.json", async (data) => {
  //边框
  data.features.forEach(async (item) => {
    let pointArr = [];
    if (item.geometry.type === "Polygon") {
      item.geometry.coordinates = [item.geometry.coordinates];
    }
    //线框图
    const coordinatesArr = item.geometry.coordinates[0][0];
    await coordinatesArr.forEach((item) => {
      let xy = lon2xy(item[0], item[1]);
      pointArr.push(xy.x, xy.y, 900);
    });
    const geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
    const vertices = new Float32Array(pointArr);
    const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
    geometry.attributes.position = attribue;
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff, //线条颜色
    });
    const line = new THREE.LineLoop(geometry, material); //首尾顶点连线，轮廓闭合
    linegroup.add(line);
    //文字图
    const label = tags(item.properties.name);
    let xy = lon2xy(item.properties.centroid[0], item.properties.centroid[1]);
    let pos = new THREE.Vector3(xy.x, xy.y, 900);
    label.position.copy(pos);
    labelgroup.add(label);
  });
  group.add(linegroup, labelgroup);
});
//2.立体图
loaderfile.load("/smallGoal/GeoJson/安徽省线框.json", async (data) => {
  data.features.forEach(async (item) => {
    let vector2Arr = [];
    let shapeArr = [];
    //立体图
    const coordinatesArr = item.geometry.coordinates[0][0];
    // console.log("coordinatesArr", coordinatesArr);
    await coordinatesArr.forEach((item) => {
      let xy = lon2xy(item[0], item[1]);
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    // console.log("c", c);
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
    const material1 = new THREE.MeshPhongMaterial({
      color: 0x00fff,
      specular: 0x00ffff,
      side: THREE.DoubleSide,
    });
    const material2 = new THREE.MeshLambertMaterial({
      color: 0x00fff,
      side: THREE.DoubleSide,
    });
    const ShapeGeometry = new THREE.ExtrudeBufferGeometry(shapeArr, {
      depth: -40000,
      bevelEnabled: false,
    });
    const shapeMesh = new THREE.Mesh(ShapeGeometry, [material1, material2]);
    meshgroup.add(shapeMesh);
  });
  box3Compute(meshgroup);
  group.add(meshgroup);
});
//边缘特效图
loaderfile.load("/smallGoal/GeoJson/安徽省立体.json", async (data) => {
  data.features.forEach(async (item) => {
    let c = [];
    if (item.geometry.type === "Polygon") {
      item.geometry.coordinates = [item.geometry.coordinates];
    }
    const coordinatesArr = item.geometry.coordinates[0][0];
    await coordinatesArr.forEach((item) => {
      let xy = lon2xy(item[0], item[1]);
      c.push(xy.x, xy.y);
    });
    //轮廓图
    var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
    var posArr = [];
    var uvrr = [];
    var h = 15000; //围墙拉伸高度
    for (var i = 0; i < c.length - 2; i += 2) {
      // 三角形1  三个顶点坐标
      posArr.push(
        c[i],
        c[i + 1],
        0,
        c[i + 2],
        c[i + 3],
        0,
        c[i + 2],
        c[i + 3],
        h
      );
      // 三角形2  三个顶点坐标
      posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);
      // 注意顺序问题，和顶点位置坐标对应
      uvrr.push(
        i / c.length,
        0,
        i / c.length + 2 / c.length,
        0,
        i / c.length + 2 / c.length,
        1
      );
      uvrr.push(
        i / c.length,
        0,
        i / c.length + 2 / c.length,
        1,
        i / c.length,
        1
      );
    }
    geometry.attributes.position = new THREE.BufferAttribute(
      new Float32Array(posArr),
      3
    );
    //设置几何体attributes属性的位置uv属性
    geometry.attributes.uv = new THREE.BufferAttribute(
      new Float32Array(uvrr),
      2
    );
    geometry.computeVertexNormals();
    //流光材质
    const texture = new THREE.TextureLoader().load(
      "/smallgoal/texture/流光.png"
    );
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff, //三角面颜色
      side: THREE.DoubleSide, //两面可见
      map: texture,
      transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
      opacity: 0.5, //整体改变透明度
      depthTest: false,
      // wireframe: true, //查看三角形结构
    });
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.y = 3;
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    sidegroup.add(mesh);
    // function flowAnimation() {
    //   requestAnimationFrame(flowAnimation);
    //   texture.offset.y -= 0.3;
    // }
    // flowAnimation();
  });
  group.add(sidegroup);
});
console.log("meshgroup", meshgroup);
// console.log("group", group);
export { group, meshgroup };
