import type { ColorResponse } from '@/types/ColorResponse';
import { apiFetch } from '@/api/apiFetch';
import { URL } from './ColorAPIConsts';

const getColor = (params: URLSearchParams) => {
  return apiFetch<ColorResponse>(`${URL}/id?${params}`);
};

//Store params and responses in memory, on per SL request basis
//this is cleared when getNamedColors is called
const paramResponseMap = new Map<string, ColorResponse>();

const getColorByHSL = async (hue: number, saturation: number, lightness: number) => {
  const mapKey = `${hue},${saturation},${lightness}`;
  if (paramResponseMap.has(mapKey)) {
    //we've verified that this exists with 'has'
    return paramResponseMap.get(mapKey) as ColorResponse;
  }
  const saturationString = `${saturation}%`;
  const lightnessString = `${lightness}%`;
  const params = new URLSearchParams({ hsl: `${hue},${saturationString},${lightnessString}` });
  const color = await getColor(params);
  paramResponseMap.set(mapKey, color);
  return color;
};

const getSkipByDistance = (distance: number) => {
  if (distance > 10000) {
    return 10;
  }
  if (distance > 5000) {
    return 5;
  }
  if (distance > 2000) {
    return 3;
  }
  return 2;
};

/**
 * This method attempts to jump forward in our 1-360 iteration
 * It assumes that colors along the 360 degrees form groups and 'boundaries'
 * If we skip and land within the group, we assume we haven't missed any color names
 * If we skip and land outside the group, we need to backtrack until we get back to the group to guarantee no names are missed
 */
const skipForwardByDistance = async (
  currentHue: number,
  saturation: number,
  lightness: number,
  color: ColorResponse,
) => {
  const skip = getSkipByDistance(color.name.distance);

  const nextHue = currentHue + skip;
  const nextColor = await getColorByHSL(nextHue, saturation, lightness);
  //if we've skipped and landed on the same color name, the skip was a success.
  if (nextColor.name.value === color.name.value) {
    return nextHue;
  } else {
    //if we don't get the same name, move backwards until we do
    for (let i = nextHue; i >= currentHue; i--) {
      const backtrackColor = await getColorByHSL(i, saturation, lightness);
      if (backtrackColor.name.value === color.name.value) {
        return i;
      }
    }
  }
  return currentHue;
};

const usedColorNames = new Set<string>();

/**
 * An async generator function that yields colors from thecolorapi
 * @example ```
 * for await(const color of getNamedColors(100,50)) {
 *    console.info(color.name.value)
 * }
 * ```
 */
export async function* getNamedColors(params: { saturation: number; lightness: number }) {
  usedColorNames.clear();
  paramResponseMap.clear();

  const MAX_HUE = 360;
  try {
    for (let i = 1; i < MAX_HUE; i++) {
      const color = await getColorByHSL(i, params.saturation, params.lightness);

      //ensure we don't yield names we've already yielded when searching for the next name
      if (usedColorNames.has(color.name.value)) {
        continue;
      }
      const progressPercent = (i / MAX_HUE) * 100;
      //if we the color is an exact match, yield it
      if (color.name.value) {
        usedColorNames.add(color.name.value);
        yield { color, error: null, progressPercent };
      }
      i = await skipForwardByDistance(i, params.saturation, params.lightness, color);
    }
  } catch (e) {
    console.error(e);
    yield { color: null, error: e as Response, progressPercent: 100 };
  }
}
