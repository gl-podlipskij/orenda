<script setup lang="ts">
import useLocationStore from "../../../store/location-store.ts";
import {computed, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {CITY_QUERY, REGION_QUERY} from "../../../services/search-params/constant.ts";

const locationStore = useLocationStore();
const routerStore = useRoute();

watchEffect(() => {
  if (locationStore.loadingStatus === 'non-started'){
    locationStore.load();
  }
});
const cities = computed(() => {
  return locationStore.getAllCities;
});
const regions = computed(() => {
  return locationStore.getAllRegions(city?.value ?? '');
});

const city = ref<string>(routerStore.query[CITY_QUERY] ? decodeURI(routerStore.query[CITY_QUERY] as string) : '');
const region = ref<string>(routerStore.query[REGION_QUERY] ? decodeURI(routerStore.query[REGION_QUERY] as  string) : '');


</script>

<template>
  <form class='flex flex-col'>
    <p>
      За місцем
    </p>
    <div class='mt-2 flex gap-2 flex-col sm:flex-row'>
      <select name='city' class='p-2 border-1 border-neutral-400' v-model="city" v-if="cities != undefined">
        <option v-for="city in cities" class='text'>
          {{city}}
        </option>
      </select>
      <select name='region' v-if="regions !== undefined" v-model="region" class='p-2 border-1 border-neutral-400'>
        <option v-for="region in regions" class='text'>
          {{region}}
        </option>
      </select>
      <button class='cursor-pointer p-1.5 pl-3 pr-3 text-white rounded-md bg-emerald-500 transition duration-75 hover:bg-emerald-600'>Знайти</button>
    </div>
  </form>

</template>

<style scoped>

</style>