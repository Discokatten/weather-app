import { baseLayers, extraLayers } from '@/app/lib/consts'
export const getLayers = (temp: number): string[] => {
  return temp >= 20
    ? baseLayers.NONE
    : temp >= 15
      ? baseLayers.LIGHT
      : temp >= 10
        ? baseLayers.MID
        : temp >= 5
          ? baseLayers.BASELAYER
          : temp >= 0
            ? extraLayers.WITHWOOL
            : temp > -5
              ? baseLayers.WINTERLAYER
              : extraLayers.COLDWINTER
}
