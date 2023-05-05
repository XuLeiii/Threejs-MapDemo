<template>
  <div></div>
</template>

<script>
import { renderer } from "@/smallGoal/RenderLoop.js";
export default {
  mounted() {
    document.body.appendChild(renderer.domElement);
  },
};
</script>

<style scoped></style>
