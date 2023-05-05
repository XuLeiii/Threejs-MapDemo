<template>
  <div></div>
</template>

<script>
import { renderer } from "@/smallGoal/RenderLoop.js";
import { choose } from "@/smallGoal/utils/choose";
export default {
  mounted() {
    window.addEventListener("dblclick", (e) => {
      choose(e);
    });
    document.body.appendChild(renderer.domElement);
  },
};
</script>

<style scoped></style>
