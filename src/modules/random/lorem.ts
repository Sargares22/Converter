import Utils from '../../services/common/utils';
import Lorem from '../../services/random/lorem';

import { Answer } from '../../types/answer';
import { Action } from '../../types/action';

// todo - lang and length config with: length, word, paragraph (count, value, lang)

const handler = (number: string): Answer => {
  const lorem: string = Lorem.getText(Utils.toNumber(number) || 26);

  return {
    value: lorem,
    buttons: ['copy'],
  };
};

const regExps: Array<string> = [
  '^lorem$',
  '^lorem\\s+(\\d+)$',
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Random text',
  description: 'Returns peace of random text with optional length parameter',
  hints: [
    'lorem',
    'lorem 120',
  ],
};
