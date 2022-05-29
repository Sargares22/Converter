import Utils from './common/utils';
import { Ratio } from '../types/ratio';

const ratios: Array<Ratio> = [
  {
    key: 'km/h',
    labels: ['kmh', 'kmph', 'khm', 'kph', 'klicks', 'kilometers per hour'],
    ratio: 1,
  },
  {
    key: 'mp/h',
    labels: ['mph', 'miles per hour'],
    ratio: 1.609344,
  },
  {
    key: 'm/s',
    labels: ['mps', 'meters per second'],
    ratio: 3.6,
  },
  {
    key: 'ft/s',
    labels: ['fps', 'ftps', 'ft per sec', 'ft per second', 'feet per second'],
    ratio: 1.097,
  },
  {
    key: 'kt',
    labels: ['kts', 'knots'],
    ratio: 1.852,
  },
];

const getRate = (number: string, ratio1: number, ratio2: number): number => {
  return Utils.toNumber(number) * (ratio1 / ratio2);
};
export default {
  getRate,
  ratios,
};
