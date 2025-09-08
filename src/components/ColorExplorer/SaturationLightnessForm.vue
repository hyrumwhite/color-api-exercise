<script setup lang="ts">
import { useColorNamesStore } from '@/stores/colorNamesStore';
import SliderInput from '@/components/shared/SliderInput.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import IconCaretDown from '../icons/IconCaretDown.vue';

const { getColors } = useColorNamesStore();
const {
  hasFetchColorsError,
  isLoadingColors,
  loadingColorsProgress,
  selectedLightness,
  selectedSaturation,
} = storeToRefs(useColorNamesStore());

const saturation = ref(100);
const lightness = ref(50);

watch([saturation, lightness], () => {
  if (saturation.value < 0) {
    saturation.value = 0;
  }
  if (saturation.value > 100) {
    saturation.value = 100;
  }
  if (lightness.value < 0) {
    lightness.value = 0;
  }
  if (lightness.value > 100) {
    lightness.value = 100;
  }
});

const needsNewValues = computed(() => {
  return (
    selectedLightness.value === lightness.value && selectedSaturation.value === saturation.value
  );
});

const buttonText = computed(() => {
  if (isLoadingColors.value) {
    return 'Finding Colors...';
  }
  if (needsNewValues.value) {
    return 'Select New Values';
  }
  return 'Find Colors';
});

const isCollapsed = ref(false);

onMounted(() => {
  getColors(saturation.value, lightness.value);
});
</script>

<template>
  <form
    class="flex flex-col md:flex-row order-2 md:order-1 items-center justify-center flex-wrap p-4 pt-2 gap-1"
    @submit.stop.prevent="getColors(saturation, lightness)"
  >
    <button
      class="flex justify-center w-full opacity-80 md:hidden transition-transform"
      :class="{ 'rotate-180': isCollapsed }"
      :aria-label="isCollapsed ? 'Show Tools' : 'Hide Tools'"
      @click="isCollapsed = !isCollapsed"
    >
      <IconCaretDown class="-scale-x-150 scal" />
    </button>
    <div
      v-if="!isCollapsed"
      class="flex flex-col md:flex-row items-center justify-center gap-4 w-full"
    >
      <SliderInput
        v-model.number="saturation"
        id="saturation-input"
        label="Saturation %"
        :min="0"
        :max="100"
        class="p-2 dark:bg-zinc-800 bg-white rounded-xl w-full md:w-fit"
      />
      <SliderInput
        v-model.number="lightness"
        id="lightness-input"
        label="Lightness %"
        :min="0"
        :max="100"
        class="p-2 dark:bg-zinc-800 bg-white rounded-xl w-full md:w-fit"
      />
      <div class="w-full md:w-fit relative rounded-lg overflow-hidden bg-transparent">
        <button
          type="submit"
          class="w-full md:w-36 h-10 bg-indigo-600 p-2 rounded-lg text-white font-semibold disabled:opacity-65"
          :class="{ 'text-sm cursor-default': needsNewValues }"
          :disabled="isLoadingColors"
        >
          {{ buttonText }}
        </button>
        <div
          v-if="isLoadingColors"
          class="w-full h-1 bg-white absolute bottom-0 left-0 rounded-full"
        >
          <div
            class="h-full bg-green-700 transition-[width]"
            :style="{ width: `${loadingColorsProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
