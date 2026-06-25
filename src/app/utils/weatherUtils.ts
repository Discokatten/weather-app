export const getWeatherCondition = (
  precipitationProb: number,
  rain: number,
) => {
  return precipitationProb > 50 ? (rain > 1 ? 'rain' : 'snow') : undefined;
};

export const getSeason = (temp: number): string => {
  if (temp === undefined || temp === null || Number.isNaN(temp)) return '';
  return temp <= 0
    ? 'winter'
    : temp < 10
      ? 'autumn'
      : temp < 20
        ? 'spring'
        : 'summer';
};
