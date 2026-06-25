export type ClothesSize = number | ValidAlphaSizes;
export type ValidAlphaSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type ValidSizeSystem = 'alpha' | 'numeric' | null;

// Display labels from backend enums
export const LAYER_LABELS: Record<string, string> = {
  none: 'Inget',
  wool: 'Ull',
  light: 'Lätt',
  mid: 'Mellanlager',
  shell: 'Skal',
  hat: 'Mössa',
  scarf: 'Halsduk',
  shoe: 'Skor',
  mittens: 'Vantar',
};

export const TYPE_LABELS: Record<string, string> = {
  jacket: 'Jacka',
  pants: 'Byxor',
  shoe: 'Skor',
  hat: 'Mössa',
  tshirt: 'T-shirt',
  mittens: 'Vantar',
  socks: 'Strumpor',
  scarf: 'Halsduk',
};

export const SEASON_LABELS = {
  spring: 'Vår',
  summer: 'Sommar',
  autumn: 'Höst',
  winter: 'Vinter',
} as const;

export const WEATHER_LABELS = {
  rain: 'Regn',
  snow: 'Snö',
  wind: 'Vind',
  storm: 'Storm',
} as const;

// Derive types from label keys
export type ValidSeasons = keyof typeof SEASON_LABELS;
export type ValidWeather = keyof typeof WEATHER_LABELS;
export type ValidTypes = keyof typeof TYPE_LABELS;
export type ValidLayers = keyof typeof LAYER_LABELS;

export interface Clothes {
  name: string;
  weather: ValidWeather[] | [];
  id: number;
  type: ValidTypes;
  layer: ValidLayers;
  season: ValidSeasons[] | [];
  warmth: number | string;
  size: ClothesSize | null;
  size_system: ValidSizeSystem | null;
}
export interface Filters {
  all?: string;
  size?: ClothesSize;
  season?: ValidSeasons;
  weather?: ValidWeather;
}
