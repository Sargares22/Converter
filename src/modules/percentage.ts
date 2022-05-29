import Utils from '../services/common/utils';

import { Answer } from '../types/answer';
import { Action } from '../types/action';

const handler = (number1: string, number2: string): Answer => {
  const numberParts: Array<string> = number1.split('%');
  const isPercent = Boolean(numberParts.length > 1);

  const result = isPercent
    ? Utils.getPercentageOf(numberParts[0], number2)
    : Utils.getPercents(numberParts[0], number2);

  return {
    value: result ? String(Utils.setToFixed(result, 2)) : '',
    suffix: isPercent ? '' : '%',
  };
};

const regExps: Array<string> = [
  '^(\\d+\\.?\\d*)\\s+of\\s+(\\d+\\.?\\d*)\\s+in\\s+(percent|percentage|%)$',
  '(\\d+.?\\d*%)\\s+of\\s+(\\d+.?\\d*)$',
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Percent converter',
  description: 'Convert value to percent or vice versa',
  hints: [
    '125 of 15 in %',
    '15% of 100',
    '100 of 100 in %',
  ],
};
