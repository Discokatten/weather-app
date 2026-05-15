// Times for showing temp during the day
export const TIMEOFDAY = [
  { title: 'Morgon', time: 8 },
  { title: 'Mitt på dagen', time: 12 },
  { title: 'Kväll', time: 18 },
]

// ClothingLayers
export const baseLayers = {
  NONE: ['none', 'shoe'],
  LIGHT: ['light', 'shoe'],
  MID: ['mid', 'shoe'],
  BASELAYER: ['shell', 'mid', 'hat', 'mittens', 'shoe'],
  WINTERLAYER: ['mid', 'shell', 'hat', 'mittens', 'shoe'],
}
export const extraLayers = {
  WITHWOOL: [...baseLayers.BASELAYER, 'wool'],
  COLDWINTER: ['wool', ...baseLayers.WINTERLAYER],
}
