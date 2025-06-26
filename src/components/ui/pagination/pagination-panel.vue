<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";
import router from "../../../routes";
import {PAGE_QUERY} from "../../../services/search-params/constant.ts";

const route = useRoute();

const props = defineProps<{
  count : number;
  queryName : string;
}>();

const currentPage = computed(() => {
  return Number(route.query[props.queryName]).valueOf();
});

const pages = computed(() => {
  return new Array(props.count).fill(0).map((_, i) => i + 1);
});
const onClick = (page: number) =>{
  router.push({
    path : route.path,
    query : Object.fromEntries([...Object.entries(route.query), [PAGE_QUERY, page]]),
  });
}

</script>

<template>
  <div class='flex gap-1'>
    <div
        v-for="page in pages"
        v-bind:key="page"
        @click="onClick(page)"
        v-bind:class='`cursor-pointer size-8 rounded-sm flex items-center justify-center flex-wrap ${currentPage == page ? "current-page-card" : ""}`'
    >
      <span>{{page}}</span>
    </div>
  </div>
</template>
<style scoped>
@import "tailwindcss";
.current-page-card {
  @apply bg-blue-700 text-white;
}
</style>