import { describe, expect, it } from 'vitest';
import { formatSeconds } from './format-seconds';

describe(formatSeconds.name, () => {
  const cases: [number, string][] = [
    [0, '00:00'],
    [0.1, '00:00'],
    [59, '00:59'],
    [61, '01:01'],
    [90, '01:30'],
    [700, '11:40'],
  ];
  it.each(cases)('works with %i', (seconds, expected) => {
    const str = formatSeconds(seconds);
    expect(str).toBe(expected);
  });
});
