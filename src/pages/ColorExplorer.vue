<script setup lang="ts">
import ColorTiles from '@/components/ColorExplorer/ColorTiles.vue';
import SaturationLightnessForm from '@/components/ColorExplorer/SaturationLightnessForm.vue';
</script>

<template>
  <main class="flex flex-col flex-1 basis-0 min-h-0">
    <SaturationLightnessForm />
    <div
      class="order-1 md:order-2 flex-1 basis-0 dark:bg-zinc-800 rounded-b-xl md:rounded-t-xl p-3 bg-white flex flex-col overflow-auto w-full"
    >
      <ColorTiles />
    </div>
  </main>
</template>
<style scoped></style>
