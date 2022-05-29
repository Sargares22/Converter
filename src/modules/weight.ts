import Utils from '../services/common/utils';
import Weight from '../services/weight';

import { Ratio } from '../types/ratio';
import { Action } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';

const reg: RegExpConfig = {
  float: '\\d+\\.?\\d*',
  terms: 't|tons?|kg|kilograms?|g|grams?|mg|milligrams?|lbs|pounds?|oz|ounces?',
};

const handler = (number: string, from: string, to: string): Answer => {
  const ratio1: (Ratio | undefined) = Weight.ratios
    .find(({ labels }) => labels.some((label) => from.toUpperCase()
      .startsWith(label.toUpperCase())));
  const ratio2: (Ratio | undefined) = Weight.ratios
    .find(({ labels }) => labels.some((label) => to.toUpperCase()
      .startsWith(label.toUpperCase())));
  const result: number = Weight.getRate(number, ratio1?.ratio || 0, ratio2?.ratio || 0);

  return {
    value: String(Utils.setToFixed(result, 2)),
    suffix: (ratio2?.key || ''),
  };
};

const regExps: Array<string> = [
  `^(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Weight converter',
  description: 'Convert one weight value to another',
  hints: [
    '1 kg in grams',
    '100 lbs in kilograms',
    '10000 oz in tons',
    '260 gram in pound',
    '1000000 mg to kg',
  ],
};
