import { getNamedColors } from '@/api/getNamedColors';
import type { ColorResponse } from '@/types/ColorResponse';
import { defineStore } from 'pinia';
import { ref, shallowRef, triggerRef } from 'vue';

export const useColorNamesStore = defineStore('color-name-store', () => {
  const colors = shallowRef<ColorResponse[]>([]);
  const hasFetchColorsError = ref(false);
  const isLoadingColors = ref(false);
  const loadingColorsProgress = ref(0);

  const selectedSaturation = ref(0);
  const selectedLightness = ref(0);

  /**
   * Uses the Color API to search for all named hues for the user selected saturation and lightness values
   */
  const getColors = async (saturation: number, lightness: number) => {
    //prevent kicking off the same search for the same values
    if (saturation === selectedSaturation.value && lightness === selectedLightness.value) {
      return;
    }
    colors.value = [];
    selectedSaturation.value = saturation;
    selectedLightness.value = lightness;

    isLoadingColors.value = true;
    hasFetchColorsError.value = false;
    loadingColorsProgress.value = 0;
    for await (const { color, progressPercent, error } of getNamedColors({
      saturation: selectedSaturation.value,
      lightness: selectedLightness.value,
    })) {
      if (error) {
        hasFetchColorsError.value = true;
        selectedLightness.value = -1;
        selectedSaturation.value = -1;
        break;
      }
      if (color) {
        colors.value?.push(color);
        triggerRef(colors);
      }
      loadingColorsProgress.value = progressPercent;
    }
    loadingColorsProgress.value = 100;
    isLoadingColors.value = false;
  };

  return {
    getColors,
    selectedLightness,
    selectedSaturation,
    colors,
    hasFetchColorsError,
    isLoadingColors,
    loadingColorsProgress,
  };
});
