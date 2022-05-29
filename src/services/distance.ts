import Utils from './common/utils';

import { Ratio } from '../types/ratio';

const ratios: Array<Ratio> = [
  {
    key: 'km',
    labels: ['km', 'kilometer'],
    ratio: 1,
  },
  {
    key: 'mt',
    labels: ['mt', 'meter'],
    ratio: 0.001,
  },
  {
    key: 'cm',
    labels: ['cm', 'centimeter'],
    ratio: 0.00001,
  },
  {
    key: 'mi',
    labels: ['mi', 'mile'],
    ratio: 1.60934,
  },
];

const getRate = (number: string, ratio1: number, ratio2: number): number => Utils.toNumber(number) * (ratio1 / ratio2);

export default {
  getRate,
  ratios,
};
