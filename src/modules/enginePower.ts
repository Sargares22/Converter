import Utils from '../services/common/utils';
import EnginePower from '../services/enginePower';

import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';
import { Ratio } from '../types/ratio';
import { Action } from '../types/action';

const reg: RegExpConfig = {
  float: '\\d+\\.?\\d*',
  terms: 'hp|horsepowers?|kw|kilowatts?',
};

const handler = (number: string, from: string, to: string): Answer => {
  const ratio1: (Ratio | undefined) = EnginePower.ratios
    .find(({ labels }) => labels.some((label) => from.toUpperCase()
      .startsWith(label.toUpperCase())));
  const ratio2: (Ratio | undefined) = EnginePower.ratios
    .find(({ labels }) => labels.some((label) => to.toUpperCase()
      .startsWith(label.toUpperCase())));
  const result: number = EnginePower.getRate(number, ratio1?.ratio || 0, ratio2?.ratio || 0);

  return {
    value: String(Utils.setToFixed(result, 2)),
    suffix: (ratio2?.key || ''),
  };
};

const regExps: Array<string> = [
  `.+\\s+(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
  `(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Engine powers converter',
  description: 'Convert one engine power value to another',
  hints: [
    'convert 125 hp in kw',
    '200 kilowatts to hp',
    'calculate 100 kw in hp',
    'calculate 2000 horsepower to kilowatts',
  ],
};
