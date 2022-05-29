import Utils from '../services/common/utils';
import Pixel from '../services/pixel';

import { Ratio } from '../types/ratio';
import { Action } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';
import { Answer } from '../types/answer';

const reg: RegExpConfig = {
  float: '\\d+\\.?\\d*',
  terms: 'px|pixels?|rm|rems?|units?|percents?|percentage|%',
};

const handler = (number: string, from: string, to: string): Answer => {
  const ratio1: (Ratio | undefined) = Pixel.ratios
    .find(({ labels }) => labels.some((label) => from.toUpperCase()
      .startsWith(label.toUpperCase())));
  const ratio2: (Ratio | undefined) = Pixel.ratios
    .find(({ labels }) => labels.some((label) => to.toUpperCase()
      .startsWith(label.toUpperCase())));
  const result: number = Pixel.getRate(number, ratio1?.ratio || 0, ratio2?.ratio || 0);

  return {
    value: String(Utils.setToFixed(result, 2)),
    suffix: (ratio2?.key || ''),
  };
};

const regExps: Array<string> = [
  `^.+\\s+(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
  `^(${reg.float})\\s+(${reg.terms})\\s+(?:in|to)\\s+(${reg.terms})$`,
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Pixel converter',
  description: 'Convert pixels to rem, units, percent or vice versa',
  hints: [
    '15 px to rem',
    '2 rem in px',
    '100 px to unit',
    '18 pixels to %',
    '28 pixels in percents',
  ],
};
