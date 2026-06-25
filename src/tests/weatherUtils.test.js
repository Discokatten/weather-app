import { getWeatherCondition, getSeason } from '../app/utils/weatherUtils';
import { describe, it, expect } from 'vitest';

describe('weatherUtils.getWeatherCondition', () => {
  it.each([
    { precipitation: 51, rain: 8, expected: 'rain' },
    { precipitation: 31, rain: 5, expected: undefined },
    { precipitation: 61, rain: 0, expected: 'snow' },
  ])(
    'returns correct weather based on precipitation and rainMM: $precipitation, $rain == $expected',
    (precipitation, rain, expected) => {
      expect(getWeatherCondition(precipitation, rain)).toBe(expected);
    },
  );

  it('handles empty values', () => {
    expect(getWeatherCondition()).toBe();
  });
});

describe('weatherUtils.getSeason', () => {
  it.each([
    { temp: -7, expected: 'winter' },
    { temp: 9, expected: 'autumn' },
    { temp: 19, expected: 'spring' },
    { temp: 25, expected: 'summer' },
  ])(`returns $expected if temp $temp`, ({ temp, expected }) => {
    expect(getSeason(temp)).toBe(expected);
  });

  it.each([
    { temp: 20, expected: 'summer' },
    { temp: 10, expected: 'spring' },
    { temp: 1, expected: 'autumn' },
    { temp: 0, expected: 'winter' },
  ])(
    'returns correct season at boundarie: $temp => $expected',
    ({ temp, expected }) => {
      expect(getSeason(temp)).toBe(expected);
    },
  );
});
