<script setup lang="ts">
import UiCard from "../ui/card/ui-card.vue";
import type {Property} from "../../type/property.ts";
import {computed} from "vue";
import router from "../../routes";
import MapLink from "../map-link/map-link.vue";
import UiLink from "../ui/link/ui-link.vue";

export type PropertyCardProps = {
  property: Property;
}
const props = defineProps<PropertyCardProps>();

const previewUrl = computed(() => {
  return `http://localhost:5173/images/${props.property.previewImage}`;
});
const onClick = ()=>{
  router.push(`/property/${props.property.id}`);
}
</script>

<template>
  <div  class='flex flex-col cursor-pointer'>
    <div class='w-full aspect-ratio overflow-hidden'>
      <img
          @click="onClick"
          class='transition duration-75 w-full hover:scale-105'
          v-bind:src="previewUrl"
          loading="lazy"
          alt=""
      />
    </div>

    <ui-card class='rounded-t-none' size='lg'>
      <ui-link v-bind:to="`/property/${property.id}`" class='text-lg'>{{props.property.name}}</ui-link>
      <span class='mt-2  text-lg text-neutral-800'>{{props.property.price}} грн</span>
      <map-link
          class='mt-4'
          v-bind:location="property.location"
          v-bind:link="`/map/?query=${property.name}`"
          v-bind:point="props.property.geometry"/>
    </ui-card>
  </div>

</template>

<style scoped>

</style>