import Utils from '../services/common/utils';
import Distance from '../services/distance';

import { Ratio } from '../types/ratio';
import { Action } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';

const reg: RegExpConfig = {
  float: '\\d+\\.?\\d*',
  terms: 'km|kilometers?|mt|meters?|cm|centimeters?|mi|miles?',
};

const handler = (number: string, from: string, to: string): Answer => {
  const ratio1: (Ratio | undefined) = Distance.ratios
    .find(({ labels }) => labels.some((label) => from.toUpperCase()
      .startsWith(label.toUpperCase())));
  const ratio2: (Ratio | undefined) = Distance.ratios
    .find(({ labels }) => labels.some((label) => to.toUpperCase()
      .startsWith(label.toUpperCase())));
  const result: number = Distance.getRate(number, ratio1?.ratio || 0, ratio2?.ratio || 0);

  return {
    value: String(Utils.setToFixed(result, 2)),
    suffix: (ratio2?.key || ''),
  };
};

const regExps: Array<string> = [
  `^(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
  `^.+\\s+(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Distance converter',
  description: 'Convert one distance value to another',
  hints: [
    '1 km in mile',
    '1000 cm in mt',
    '100 mt in kilometers',
    '100 kilometers in miles',
    '100 miles in km',
  ],
};
