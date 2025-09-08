<script setup lang="ts">
import ColorTile from '@/components/ColorExplorer/ColorTile.vue';
import { storeToRefs } from 'pinia';
import { useColorNamesStore } from '@/stores/colorNamesStore';

const { colors } = storeToRefs(useColorNamesStore());
</script>
<template>
  <ul class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 2xl:grid-cols-12 gap-4">
    <ColorTile v-for="color of colors" :key="color.name.value" :color class="w-full" />
  </ul>
</template>

<style scoped></style>
