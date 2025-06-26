<script setup lang="ts">
import type {Property} from "../../type/property.ts";
import PropertyCard from "./property-card.vue";

export type PropertyListProps = {
  properties : Property[];
}
const props = defineProps<PropertyListProps>();
</script>

<template>
  <div
       class='mt-5 grid grid-cols-1  gap-4 sm:grid-cols-2 sm:ml-0 sm:mr-0 md:grid-cols-3'>
    <property-card
        v-for="property in props.properties"
        v-bind:property="property"
        v-bind:key="property.id"
    />
  </div>
</template>

<style scoped>

</style>