<script setup lang="ts">
import UiLink from "../ui/link/ui-link.vue";
import MapIcon from "../icons/map-icon.vue";

defineProps<{
  point : GeoJSON.Point;
  location : string;
  link : string;
}>();

</script>

<template>
  <ui-link v-bind:to="link" class='flex items-end'>
    <map-icon class='*:stroke-blue-500'/>
    <span>Місце знаходження : {{location}}</span>
  </ui-link>
</template>

<style scoped>

</style>