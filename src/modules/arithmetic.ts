import { CONSTANTS } from '../services/common/constants';
import Arithmetic from '../services/arithmetic';
import Utils from '../services/common/utils';

import { Action } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';

const reg: RegExpConfig = {
  float: '\\d+',
  terms: Object.values(CONSTANTS.arithmeticOperations)
    .flat()
    .join('|')
    .replace(/(\+|\*|\/)\|/g, '')
    .concat('|\\+|\\*|\\/'),
};

const handler = (number1: string, operation: string, number2: string): Answer => {
  const result: number = Arithmetic.calculate(operation, number1, number2);

  return { value: String(Utils.setToFixed(result, 2)) };
};

const regExps: Array<string> = [
  `^(${reg.float})\\s+(${reg.terms})\\s+(${reg.float})$`,
  `^(?:how much|how much is|calculate)\\s+(${reg.float})\\s+(${reg.terms})\\s+(${reg.float})$`,
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Arithmetic operations',
  description: 'Simple arithmetic operations',
  hints: [
    '155 + 100',
    '365 / 12',
    'how much is 115 * 2',
    'calculate 135 - 35',
  ],
};
