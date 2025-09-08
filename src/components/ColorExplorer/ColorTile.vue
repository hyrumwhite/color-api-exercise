<script setup lang="ts">
import type { ColorResponse } from '@/types/ColorResponse';

interface ColorTileProps {
  color: ColorResponse;
  as?: keyof HTMLElementTagNameMap;
}
const { as = 'li' } = defineProps<ColorTileProps>();
</script>

<template>
  <component class="flex flex-col items-center min-h-0 min-w-0" :is="as">
    <figure>
      <div
        class="h-56 aspect-square rounded-xl"
        :style="{ 'background-color': color.hsl.value }"
        :aria-label="`A visual representation of the color: ${color.name.value}`"
        role="img"
      />
      <figcaption class="flex flex-col text-center">
        <span aria-label="The displayed color's name">{{ color.name.value }}</span>
        <span aria-label="The displayed color's RGB values">{{ color.rgb.value }}</span>
      </figcaption>
    </figure>
  </component>
</template>

<style scoped></style>
