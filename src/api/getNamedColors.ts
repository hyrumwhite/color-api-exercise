const URL = import.meta.env.VITE_COLOR_API_URL ?? 'https://www.thecolorapi.com';
import type { ColorResponse } from '@/types/ColorResponse';
import { apiFetch } from '@/api/apiFetch';

const getColor = (params: URLSearchParams) => {
  return apiFetch<ColorResponse>(`${URL}/id?${params}`);
};

const getColorByHSL = async (hue: number, saturation: number, lightness: number) => {
  const saturationString = `${saturation}%`;
  const lightnessString = `${lightness}%`;
  const params = new URLSearchParams({ hsl: `${hue},${saturationString},${lightnessString}` });
  return getColor(params);
};

const getColorByHex = async (hex: string) => {
  const params = new URLSearchParams({ hex });
  return getColor(params);
};

const usedColorNames = new Set<string>();
const usedClosestNamedHexes = new Set<string>();

/**
 * An async generator function that yields colors from thecolorapi
 * @example ```
 * for await(const color of getNamedColors(100,50)) {
 *    console.log(color.name.value)
 * }
 * ```
 */
export async function* getNamedColors(params: { saturation: number; lightness: number }) {
  usedColorNames.clear();
  usedClosestNamedHexes.clear();

  try {
    for (let i = 0; i < 360; i++) {
      const color = await getColorByHSL(i, params.saturation, params.lightness);

      //ensure we don't yield names we've already yielded when searching for the next name
      if (usedColorNames.has(color.name.value)) {
        continue;
      }

      //if we the color is an exact match, yield it
      if (color.name.exact_match_name) {
        usedColorNames.add(color.name.value);
        yield { color, error: null };
      }

      //otherwise check the closestColorHex
      //the next iteration may get the same closestHex, so we track and skip the used hexes
      const closestNamedHex = color.name.closest_named_hex;
      if (usedClosestNamedHexes.has(closestNamedHex)) {
        continue;
      }
      usedClosestNamedHexes.add(closestNamedHex);

      if (!usedClosestNamedHexes.has(closestNamedHex)) {
        const color = await getColorByHex(closestNamedHex);
        //set the i to the hue value of the closest named
        i = color.hsl.h - 1; //-1 as the iteration will bump it up
        usedColorNames.add(color.name.value);
        yield { color, error: null };
      }
    }
  } catch (e) {
    console.error(e);
    yield { color: null, error: e as Response };
  }
}
