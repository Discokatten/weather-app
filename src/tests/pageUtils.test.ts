import { formatDate } from '../app/utils/pageUtils';
import { describe, it, expect } from 'vitest';
const date = new Date('June 24, 2026 03:24:00');

describe('pageUtils.formatDate', () => {
  it('returns date, capitalized, in swedish and local string', () => {
    expect(formatDate(date)).toBe('Onsdag, 24 juni 2026 01:24');
  });
  it('returns weekday, capitalized and in swedish', () => {
    expect(formatDate(date, 'weekday')).toBe('Onsdag');
  });
  it('handles empty strings', () => {
    expect(formatDate('')).toBe('Invalid Date, Invalid Date');
  });
});
