import Utils from './common/utils';

import { Ratio } from '../types/ratio';

const ratios: Array<Ratio> = [
  {
    key: 'kg',
    labels: ['kg', 'kilogram'],
    ratio: 1,
  },
  {
    key: 'g',
    labels: ['g', 'grams'],
    ratio: 0.001,
  },
  {
    key: 'mg',
    labels: ['mg', 'milligram'],
    ratio: 0.000001,
  },
  {
    key: 't',
    labels: ['t', 'ton'],
    ratio: 1000,
  },
  {
    key: 'lbs',
    labels: ['lbs', 'pound'],
    ratio: 0.45359237,
  },
  {
    key: 'oz',
    labels: ['oz', 'ounce'],
    ratio: 0.0283495231,
  },
];

const getRate = (number: string, ratio1: number, ratio2: number): number => Utils.toNumber(number) * (ratio1 / ratio2);

export default {
  getRate,
  ratios,
};
