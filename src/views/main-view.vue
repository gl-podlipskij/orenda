<script setup lang="ts">
import Navbar from "../components/navbar/navbar.vue";

</script>

<template>
  <div class='w-full min-h-screen flex flex-col bg-neutral-100'>
    <navbar/>
    <router-view/>
  </div>
</template>

<style scoped>

</style>