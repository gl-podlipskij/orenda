<script setup lang="ts">
import {Links} from "./constant/links.ts";
import NavbarLink from "./components/navbar-link.vue";

</script>

<template>
  <nav class='w-full flex flex-col items-center h-12 bg-white'>
    <div class='h-full container flex justify-between'>
      <div class='flex gap-1'>
        <navbar-link v-for="linkProps in Links" v-bind="linkProps"/>
      </div>
    </div>

  </nav>
</template>

<style scoped>

</style>