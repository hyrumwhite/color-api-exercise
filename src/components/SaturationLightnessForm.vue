<script setup lang="ts">
import SliderInput from './SliderInput.vue';
</script>

<template>
  <form
    class="flex flex-col md:flex-row order-2 md:order-1 items-center justify-center flex-wrap p-4 gap-4"
    @submit.stop.prevent
  >
    <SliderInput
      id="saturation-input"
      label="Saturation %"
      :min="0"
      :max="360"
      class="p-2 dark:bg-zinc-800 bg-zinc-300 rounded-xl"
    />
    <SliderInput
      id="lightness-input"
      label="Lightness %"
      :min="0"
      :max="360"
      class="p-2 dark:bg-zinc-800 bg-zinc-300 rounded-xl"
    />
  </form>
</template>
<style scoped></style>
