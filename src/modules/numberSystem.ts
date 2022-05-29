import NumberSystem from '../services/numberSystem';

import { Action, ActionSignature } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';

const reg: RegExpConfig & {
  binary: string
  octal: string
  hex: string
} = {
  float: '\\d+',
  terms: 'binary|octal|decimal|hex|hexadecimal',
  binary: '[0-1]+',
  octal: '0[1-7][0-7]*',
  hex: '[0-9a-fA-F]+',
};

const binaryConverterHandler = (number: string, to: string): Answer => variousConverterHandler(number, 'binary', to);

const octalConverterHandler = (number: string, to: string): Answer => variousConverterHandler(number, 'octal', to);

const hexConverterHandler = (number: string, to: string): Answer => variousConverterHandler(number, 'hex', to);

const variousConverterHandler = (number: string, from: string, to: string): Answer => {
  return {
    value: NumberSystem.convertNumber(number, from, to),
  };
};

const actionsByRegs: Array<ActionSignature> = [
  {
    regs: [
      `(${reg.binary})\\s+(?:in|to)\\s+(${reg.terms})$`,
    ],
    handler: binaryConverterHandler,
  },
  {
    regs: [
      `(${reg.octal})\\s+(?:in|to)\\s+(${reg.terms})$`,
    ],
    handler: octalConverterHandler,
  },
  {
    regs: [
      `(${reg.hex})\\s+(?:in|to)\\s+(${reg.terms})$`,
    ],
    handler: hexConverterHandler,
  },
  {
    regs: [
      `(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
    ],
    handler: variousConverterHandler,
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
  name: 'Number system converter',
  description: 'Convert from one number system to another',
  hints: [
    'convert 100 to hex',
    '10 decimal to binary',
    '3def to decimal',
    '144 octal to decimal',
    '640 hex to decimal',
  ],
};
