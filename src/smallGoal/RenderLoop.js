import { scene } from "./scene/index.js";

import { camera, renderer, controls } from "./RenderCamera.js";
import { labelRenderer } from "./utils/tags.js";
function render() {
  // console.log("camera", camera.position);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

export { renderer };
