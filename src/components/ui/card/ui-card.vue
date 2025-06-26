<script setup lang="ts">
import * as sizes from "./utils/size.ts";
import {getClass} from "./utils/size.ts";
import {computed} from "vue";

export type CardProps = {
  size : sizes.Size;
};
const props = defineProps<CardProps>();
const sizeClass = computed(() => {
  return getClass(props.size);
});

</script>

<template>
  <div v-bind:class="`${sizeClass} bg-white flex flex-col shadow`">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>