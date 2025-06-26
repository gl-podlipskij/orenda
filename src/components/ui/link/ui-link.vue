<script setup lang="ts">
import type {LinkProps} from "./types.ts";

const props = defineProps<LinkProps>();

</script>

<template>
  <router-link class='text-blue-600 hover:underline' v-bind='props'>
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>