<script setup lang="ts">
import UiCard from "../ui/card/ui-card.vue";
import UiInput from "../ui/input/ui-input.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import router from "../../routes";
import {SEARCH_QUERY} from "../../services/search-params/constant.ts";
import LocationInput from "./location-input/LocationInput.vue";


const route = useRoute();
const query = ref(route.query[SEARCH_QUERY]);

const onSearch = ()=>{
  router.push({
    path : route.path,
    query : {
      [SEARCH_QUERY] : query.value,
    },
  });
}

</script>

<template>
  <ui-card size='xl'>
    <div>
      <ui-input
          v-model:model-value="query"
          v-bind:input-props="{ placeholder: 'Enter query...'}"
          align-adornment="end"
      >

          <button
              @click='onSearch'
              class='bg-green-600 p-3 text-white outline-0 rounded-r-md cursor-pointer'>
            Search
          </button>
      </ui-input>
      <div class='mt-2 flex gap-1'>
        <LocationInput/>
      </div>
    </div>
  </ui-card>
</template>

<style scoped>

</style>