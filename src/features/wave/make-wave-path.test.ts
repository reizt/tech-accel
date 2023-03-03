import { describe, expect, it } from 'vitest';
import { makeWavePath } from './make-wave-path';

describe(makeWavePath.name, () => {
  it('works correctly', () => {
    const input: Parameters<typeof makeWavePath>[0] = {
      viewBox: {
        w: 100,
        h: 50,
      },
      wave: {
        w: 20,
        hList: [10, 30, 20, 40, 50],
      },
    };
    const path = makeWavePath(input);
    expect(path).toBe('M1 25 v10 h20 v-10 v-30 h20 v30 v20 h20 v-20 v-40 h20 v40 v50 h20 v-50 L101 25');
  });
});
