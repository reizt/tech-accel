type Options = {
  viewBox: {
    w: number;
    h: number;
  };
  wave: {
    w: number;
    hList: number[];
  };
};
export const makeWavePath = ({ viewBox, wave }: Options) => {
  const { w, hList } = wave;

  const cycles = hList.map((h, i) => {
    const n = i % 2 === 0 ? 1 : -1;
    return `v${h * n} h${w} v${h * -n}`;
  });

  const firstMove = `M1 ${viewBox.h / 2}`;
  const lastMove = `L${viewBox.w + 1} ${viewBox.h / 2}`;

  return `${firstMove} ${cycles.join(' ')} ${lastMove}`;
};
