<script setup lang="ts">
import ColorTile from '@/components/ColorExplorer/ColorTile.vue';
import { storeToRefs } from 'pinia';
import { useColorNamesStore } from '@/stores/colorNamesStore';

const { colors, hasFetchColorsError } = storeToRefs(useColorNamesStore());
</script>
<template>
  <ul
    v-if="!hasFetchColorsError"
    class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 2xl:grid-cols-12 gap-4"
  >
    <ColorTile v-for="color of colors" :key="color.name.value" :color class="w-full" />
  </ul>
  <div v-else class="flex justify-center">
    An error occurred while finding colors for your selection. Please try again.
  </div>
</template>

<style scoped></style>
