import {
  LAYER_LABELS,
  SEASON_LABELS,
  TYPE_LABELS,
  WEATHER_LABELS,
} from '../interfaces/clothesInterfaces';

// Times for showing temp during the day
export const TIMEOFDAY = [
  { title: 'Morgon', time: 8 },
  { title: 'Mitt på dagen', time: 12 },
  { title: 'Kväll', time: 18 },
];

// Convert labels to array of obj
export const TYPES = Object.entries(TYPE_LABELS).map(([id, name]) => ({
  id,
  name,
}));
export const LAYERS = Object.entries(LAYER_LABELS).map(([id, name]) => ({
  id,
  name,
}));
export const SEASONS = Object.entries(SEASON_LABELS).map(([id, name]) => ({
  id,
  name,
}));
export const WEATHER = Object.entries(WEATHER_LABELS).map(([id, name]) => ({
  id,
  name,
}));
export const WARMTH = [1, 2, 3, 4];

export const baseLayers = {
  NONE: ['none', 'shoe'],
  LIGHT: ['light', 'shoe'],
  MID: ['mid', 'shoe'],
  BASELAYER: ['shell', 'mid', 'hat', 'mittens', 'shoe'],
  WINTERLAYER: ['mid', 'shell', 'hat', 'mittens', 'shoe'],
};

export const extraLayers = {
  WITHWOOL: [...baseLayers.BASELAYER, 'wool'],
  COLDWINTER: ['wool', ...baseLayers.WINTERLAYER],
};

export const BASE_LAYERS = {
  NONE: ['shoe'],
  LIGHT: ['light', 'shoe'],
  MID: ['mid', 'shoe'],
  BASELAYER: ['shell', 'mid', 'hat', 'mittens', 'shoe', 'scarf'],
  WINTERLAYER: ['mid', 'shell', 'hat', 'mittens', 'shoe', 'scarf'],
};
export const EXTRA_LAYERS = {
  WITHWOOL: [BASE_LAYERS['BASELAYER'], 'wool'],
  COLDWINTER: ['wool', BASE_LAYERS['WINTERLAYER']],
};
