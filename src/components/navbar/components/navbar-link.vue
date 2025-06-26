<script setup lang="ts">
import UiLink from "../../ui/link/ui-link.vue";

export type NavbarLinkProps = {
  title : string;
  href : string;
}
const props = defineProps<NavbarLinkProps>();

</script>

<template>
  <ui-link
      class='pl-3 pr-3 flex flex-col items-center justify-center text-lg router-link-active:text-red-600'
      v-bind:to="props.href">
    <span>
      {{props.title}}
    </span>
  </ui-link>
</template>

<style scoped>
@import "tailwindcss";
.router-link-active {
  @apply text-blue-500 font-bold;
}

</style>