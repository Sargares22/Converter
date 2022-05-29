import Utils from '../services/common/utils';
import Currency from '../services/currency';

import { Currency as CurrencyType } from '../types/currency';
import { Answer } from '../types/answer';
import { Action } from '../types/action';
import { RegExpConfig } from '../types/regExpConfig';

const reg: RegExpConfig = {
  float: '\\d+\\.?\\d*',
  terms: Currency.regExp,
};

const handler = async (number: string, from: string, to: string): Promise<Answer> => {
  const currencyFrom: CurrencyType | undefined = Currency.currencies
    .find(({ labels }) => labels.some((label) => from.toUpperCase()
      .startsWith(label.toUpperCase())));
  const currencyTo: CurrencyType | undefined = Currency.currencies
    .find(({ labels }) => labels.some((label) => to.toUpperCase()
      .startsWith(label.toUpperCase())));

  const data = await Currency.getRate(number, currencyFrom?.key || '', currencyTo?.key || '');

  return {
    value: String(Utils.setToFixed(data.result, 2)),
    suffix: (currencyTo?.symbol || '$'),
  };
};

const regExps: Array<string> = [
  `^(${reg.float})\\s+(${reg.terms})\\s+in\\s+(${reg.terms})$`,
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Currency converter',
  description: 'Check current values of currencies',
  hints: [
    '100 euros in dollars',
    '73 rubles in pounds',
    '10 yuan in dollar',
    '1 euro in ruble',
    '1 usd in rub',
  ],
};
