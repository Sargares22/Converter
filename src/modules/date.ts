import Utils from '../services/common/utils';
import { CONSTANTS } from '../services/common/constants';
import Date from '../services/date';

import { Action, ActionSignature } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';

const reg: RegExpConfig & {
  operation: string
  dayOfWeek: string
} = {
  float: '\\d+',
  terms: 'days?|weeks?|months?|years?',
  operation: [...CONSTANTS.arithmeticOperations.sum, ...CONSTANTS.arithmeticOperations.subtract]
    .join('|')
    .replace(/(\+)\|/g, '')
    .concat('|\\+'),
  dayOfWeek: CONSTANTS.date.dayOfWeek.join('|'),
};

const currentDateHandler = (): Answer => ({ value: Date.getCurrentDate() });

const nextDateHandler = (): Answer => ({ value: Date.getTomorrow() });

const previousDateHandler = (): Answer => ({ value: Date.getYesterday() });

const dateOperationHandler = (operation: string, number: string, term: string): Answer => {
  const date = Date.getDateOperation(
    operation,
    Utils.toNumber(number),
    Utils.removeCharInTheEndOfString(term, 's') as keyof typeof CONSTANTS.date.terms,
  );

  return { value: date };
};

const nextDayOfWeekHandler = (day: string): Answer => {
  const date = Date.getNextDayOfWeek(day);

  return { value: date };
};

const actionsByRegs: Array<ActionSignature> = [
  {
    regs: [
      '^today$',
      '^today\\s+is$',
      '^current date$',
    ],
    handler: currentDateHandler,
  },
  {
    regs: [
      '^tomorrow$',
      '^tomorrow\\s+is$',
      '^next\\s+day$',
    ],
    handler: nextDateHandler,
  },
  {
    regs: [
      '^yesterday$',
      '^yesterday\\s+was$',
      '^previous\\s+day$',
    ],
    handler: previousDateHandler,
  },
  {
    regs: [
      `^next\\s+(${reg.dayOfWeek})$`,
    ],
    handler: nextDayOfWeekHandler,
  },
  // {
  //   regs: [
  //     `^last\\s+(${reg.dayOfWeek})`,
  //   ],
  //   handler: currentTimeHandler,
  // },
  {
    regs: [
      `^(?:today|current date)\\s+(${reg.operation})\\s+(${reg.float})\\s+(${reg.terms})$`,
    ],
    handler: dateOperationHandler,
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
  name: 'Date service',
  description: 'Get current date or do operation with it',
  hints: [
    'today is',
    'tomorrow',
    'yesterday',
    'next monday',
    'today minus 3 week',
    'today plus 15 days',
    'current date plus 2 months',
  ],
};
