import Utils from '../../services/common/utils';
import RandomNumber from '../../services/random/randomNumber';

import { Answer } from '../../types/answer';
import { Action, ActionSignature } from '../../types/action';
import { RegExpConfig } from '../../types/regExpConfig';

const reg: RegExpConfig & {
  from: string,
  to: string
} = {
  float: '\\d+\\.?\\d*',
  from: 'from|beginning',
  to: 'to|until',
};

const randomNumberHandler = (from: string, to: string): Answer => {
  const number = RandomNumber.getRandomNumber(Utils.toNumber(from) || 0, Utils.toNumber(to) || 100);

  return {
    value: String(number),
    buttons: ['refresh', 'copy'],
  };
};

const randomNumberFromHandler = (from: string): Answer => randomNumberHandler(from, '999999');

const randomNumberToHandler = (to: string): Answer => randomNumberHandler('', to);

const actionsByRegs: Array<ActionSignature> = [
  {
    regs: [
      '^.+\\s+random\\s+number$',
      '^random\\s+number$',
    ],
    handler: randomNumberHandler,
  },
  {
    regs: [
      `^random\\s+number\\s+(?:${reg.from})\\s+(${reg.float})\\s+(?:${reg.to})\\s+(${reg.float})$`,
    ],
    handler: randomNumberHandler,
  },
  {
    regs: [
      `^random\\s+number\\s+(?:${reg.from})\\s+(${reg.float})$`,
    ],
    handler: randomNumberFromHandler,
  },
  {
    regs: [
      `^random\\s+number\\s+(?:${reg.to})\\s+(${reg.float})$`,
    ],
    handler: randomNumberToHandler,
  },
];

const actions: Array<Action> = actionsByRegs.map(({
  regs,
  handler,
}: ActionSignature): Array<Action> => {
  return regs.map((reg) => ({
    reg: new RegExp(reg, 'i'),
    handler,
  }));
})
  .flat();

export default {
  actions,
  name: 'Random number generator',
  description: 'Service for generating random number with or without range',
  hints: [
    'random number',
    'random number from 10 to 15000',
    'random number from 5',
    'random number until 55',
  ],
};
