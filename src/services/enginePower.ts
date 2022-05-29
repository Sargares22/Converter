import Utils from './common/utils';

import { Ratio } from '../types/ratio';

const ratios: Array<Ratio> = [
  {
    key: 'hp',
    labels: ['hp', 'horsepower'],
    ratio: 1,
  },
  {
    key: 'kw',
    labels: ['kw', 'kilowatts'],
    ratio: 1.341,
  },
];

const getRate = (number: string, ratio1: number, ratio2: number): number => Utils.toNumber(number) * (ratio1 / ratio2);

export default {
  getRate,
  ratios,
};
