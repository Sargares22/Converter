// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as Buffer from 'buffer';

import { CONSTANTS } from './common/constants';

type parseValuesKeys = keyof typeof CONSTANTS.numberSystem;

const convertNumber = (number: string, from: string, to: string): string => {
  const fromValue = parseInt(number, CONSTANTS.numberSystem[from as parseValuesKeys]);

  return (from === to)
    ? number
    : (fromValue as Buffer).toString(CONSTANTS.numberSystem[to as parseValuesKeys]);
};

export default {
  convertNumber,
};
