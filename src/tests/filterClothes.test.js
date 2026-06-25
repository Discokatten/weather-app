import { filterClothes } from '../app/@clothes/_components/filterClothes';
import { describe, it, expect } from 'vitest';

describe('filterClothes.filterClothes', () => {
  it('returns object', () => {
    expect(filterClothes(20, undefined)).toBeTypeOf('object');
  });
});
