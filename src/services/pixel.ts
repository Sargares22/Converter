import Utils from './common/utils';

import { Ratio } from '../types/ratio';

const ratios: Array<Ratio> = [
  {
    key: 'px',
    labels: ['px', 'pixel'],
    ratio: 1,
  },
  {
    key: 'rem',
    labels: ['rm', 'rem'],
    ratio: 16,
  },
  {
    key: 'units',
    labels: ['unit'],
    ratio: 8,
  },
  {
    key: '%',
    labels: ['%', 'percent', 'percentage'],
    ratio: 0.16,
  },
];

const getRate = (number: string, ratio1: number, ratio2: number): number => Utils.toNumber(number) * (ratio1 / ratio2);

export default {
  getRate,
  ratios,
};
