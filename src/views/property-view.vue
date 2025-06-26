<script setup lang="ts">
import UiCard from "../components/ui/card/ui-card.vue";
import usePropertyStore, {PARAMS_ID} from "../store/property-store.ts";
import {onUnmounted, watchEffect} from "vue";
import {useRoute} from "vue-router";
import MapLink from "../components/map-link/map-link.vue";

const routerStore = useRoute();
const propertyStore = usePropertyStore();

onUnmounted(()=>{
  propertyStore.reset();
});
watchEffect(() => {
  if (propertyStore.isReadyForLoading) {
    const id = routerStore.params[PARAMS_ID];
    if (typeof id === 'string') {
      propertyStore.load(id).then();
    }
  }
})
</script>

<template>
  <div class='w-full flex flex-col items-center'>
    <div class='m-5 mt-10 mb-5 flex flex-col container'>
      <ui-card class='w-full flex sm:flex-row sm:justify-between' v-if="propertyStore.property !== undefined" size="xl">
        <img
            class="aspect-ratio w-1/3 min-w-sm"
            v-bind:src="`http://localhost:5173/images/${propertyStore.property.previewImage}`"
            alt=""
        />
        <div class='flex flex-col gap-1 m-5'>
          <p class='text-xl'>{{propertyStore.property.name}}</p>
          <p class='text-xl'>{{propertyStore.property.price}} грн</p>
          <p class='max-w-100'>
            {{propertyStore.property.description}}
          </p>
          <map-link
              class='mt-4'
              v-bind:point="propertyStore.property.geometry"
              v-bind:link="`/map/?query=${propertyStore.property.name}`"
          />
        </div>
      </ui-card>
    </div>
  </div>
</template>

<style scoped>

</style>