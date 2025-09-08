<script setup lang="ts">
import ColorTile from '@/components/ColorExplorer/ColorTile.vue';
import { storeToRefs } from 'pinia';
import { useColorNamesStore } from '@/stores/colorNamesStore';

const { colors } = storeToRefs(useColorNamesStore());
</script>
<template>
  <ul class="flex flex-wrap gap-4 justify-center md:justify-start">
    <ColorTile v-for="color of colors" :key="color.name.value" :color />
  </ul>
</template>

<style scoped></style>
