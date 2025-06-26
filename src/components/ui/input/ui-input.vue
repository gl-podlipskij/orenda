<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  inputProps ?: any,
  alignAdornment ?: 'start' | 'end',
}>();
const model = defineModel();
const focused = ref(false);

</script>

<template>
  <div
      v-bind:class='`flex rounded-md border-solid border-1 border-neutral-300
       outline-0 ${focused ? "focused" : ""}`'
  >
    <slot v-if="alignAdornment === 'start'"></slot>
    <input
        v-model="model"
        @focus="focused = true"
        @blur="focused = false"
        ref='inputRef'
        v-bind='inputProps'
        class='grow m-2.5 outline-none border-none'
    />
    <slot v-if="alignAdornment === 'end'"></slot>
  </div>
</template>

<style scoped>
@import "tailwindcss";
.focused {
  @apply outline-2 outline-offset-1 outline-blue-500;
}
</style>