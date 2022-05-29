import Utils from '../services/common/utils';
import Speed from '../services/speed';

import { Answer } from '../types/answer';
import { RegExpConfig } from '../types/regExpConfig';
import { Ratio } from '../types/ratio';
import { Action } from '../types/action';

const reg: RegExpConfig = {
  float: '\\d+\\.?\\d*',
  terms: 'kmh|kmph|khm|kph|klicks?|kilometers?|mph|miles? per hour'
    + '|mps|meters per second|fps|ftps?|ft per sec|ft per second'
    + '|feet per second|kts|knots?',
};

const handler = (number: string, from: string, to: string): Answer => {
  const ratio1: (Ratio | undefined) = Speed.ratios
    .find(({ labels }) => labels.some((label) => from.toUpperCase()
      .startsWith(label.toUpperCase())));
  const ratio2: (Ratio | undefined) = Speed.ratios
    .find(({ labels }) => labels.some((label) => to.toUpperCase()
      .startsWith(label.toUpperCase())));
  const result: number = Speed.getRate(number, ratio1?.ratio || 0, ratio2?.ratio || 0);

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
  name: 'Speed converter',
  description: 'Convert one speed value to another',
  hints: [
    '125 kmh in mph',
    'convert 50 kmh to mph',
    'calculate 100 miles per hour in meters per second',
  ],
};
