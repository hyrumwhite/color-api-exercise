<script setup lang="ts">
interface SliderInputProps {
  id: string;
  label: string;
  min?: number;
  max?: number;
}
defineProps<SliderInputProps>();
const model = defineModel({ default: 0 });
</script>

<template>
  <div class="flex flex-col gap-0">
    <label :for="`${id}-text`">{{ label }}</label>
    <div class="flex flex-row gap-2 items-center">
      <input
        v-model="model"
        :id="`${id}-slider`"
        type="range"
        role="presentation"
        :min
        :max
        class="flex-1"
      />
      <input v-model="model" :id="`${id}-text`" type="number" class="w-16 px-2 py-1" :min :max />
      <slot name="append"></slot>
    </div>
  </div>
</template>
<style scoped></style>
