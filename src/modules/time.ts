import Time from '../services/time';
import { CONSTANTS } from '../services/common/constants';

import { Action, ActionSignature } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';
import Utils from '../services/common/utils';

const reg: RegExpConfig & {
  operation: string
  timeTerms: string
} = {
  float: '\\d+\\.?\\d*',
  terms: 'now|current time',
  operation: [...CONSTANTS.arithmeticOperations.sum, ...CONSTANTS.arithmeticOperations.subtract]
    .join('|')
    .replace(/(\+)\|/g, '')
    .concat('|\\+'),
  timeTerms: 'seconds?|minutes?|hours?',
};

const currentTimeHandler = (): Answer => ({ value: Time.getCurrentTime() });

const timeOperationHandler = (operation: string, number: string, timeKey: string): Answer => {
  const time: string = Time.getTimeOperation(
    number,
    operation,
    Utils.removeCharInTheEndOfString(timeKey, 's') as keyof typeof CONSTANTS.timeTerms,
  );

  return {
    value: time,
  };
};

const actionsByRegs: Array<ActionSignature> = [
  {
    regs: [
      '^.+\\s+time\\s+is\\s+now$',
      '^.+\\s+time\\s+is\\s+it\\s+now$',
      '^current time$',
    ],
    handler: currentTimeHandler,
  },
  {
    regs: [
      `^(?:${reg.terms})\\s+(${reg.operation})\\s+(${reg.float})\\s+(${reg.timeTerms})$`,
    ],
    handler: timeOperationHandler,
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
  name: 'Time service',
  description: 'Get current time or do an operation with it',
  hints: [
    'what time is now',
    'current time',
    'now + 500 seconds',
    'now plus 15 minutes',
    'now minus 5 hours',
  ],
};
