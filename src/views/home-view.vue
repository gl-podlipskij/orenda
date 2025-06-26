<script setup lang="ts">
import SearchCard from "../components/search/search-card.vue";
import usePropertiesStore from "../store/properties-store.ts";
import {onUnmounted, watchEffect} from "vue";
import PaginationPanel from "../components/ui/pagination/pagination-panel.vue";
import {useRoute} from "vue-router";
import {parseQueryObject} from "../services/search-params/search-params.ts";
import router from "../routes";
import PropertyList from "../components/property/property-list.vue";
import NothingFounded from "../components/property/nothing-founded.vue";

const routeStore = useRoute();
const propertiesStore = usePropertiesStore();

onUnmounted(()=>{
  propertiesStore.reset();
});

watchEffect(()=>{
  if (propertiesStore.isReadyForLoading) {
    propertiesStore.load();
  }
});
watchEffect( ()=>{
  parseQueryObject(routeStore.query).then(searchParams => {
    propertiesStore.updateSearchParams(searchParams);
  }).catch((error) => {
    console.error(error);
    router.back();
  })
});

</script>

<template>
  <div class='flex flex-col w-full items-center'>
    <div class='mt-10 mb-5 container flex flex-col'>
      <div class='flex flex-col'>
        <search-card/>
        <property-list
            v-if="propertiesStore.properties && propertiesStore.properties.length !== 0"
            class='mt-5'
            v-bind:properties="propertiesStore.properties"
        />
        <nothing-founded class='mt-5' v-else-if="propertiesStore.properties?.length === 0"/>
        <div class='mt-5' v-if="propertiesStore.pagesCount !== undefined">
          <pagination-panel query-name="page" v-bind:count="propertiesStore.pagesCount"/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>