import Utils from '../services/common/utils';
import Crypto from '../services/crypto';
import Currency from '../services/currency';

import { Answer } from '../types/answer';
import { Action } from '../types/action';
import { CryptoCurrency } from '../types/cryptoCurrency';

const cryptoKeywords: string = Utils.formatArraysToRegexp(Crypto.currencies.map(({ labels }) => labels));
const currenciesKeywords: string = Currency.regExp;

const handler = async (from: string, to = 'usd'): Promise<Answer> => {
  const crypto: CryptoCurrency | undefined = Crypto.currencies
    .find(({ labels }) => labels.some((label) => from.toUpperCase()
      .startsWith(label.toUpperCase())));
  const currency = Currency.currencies
    .find(({ labels }) => labels.some((label) => to.toUpperCase()
      .startsWith(label.toUpperCase())));

  const cryptoKey: string = (crypto?.key || '').toUpperCase();
  const currencyKey: string = (currency?.key || '').toUpperCase();

  const result: { [p: string]: number } = await Crypto.getRate(cryptoKey, currencyKey);

  return {
    value: String(Utils.setToFixed(result[currencyKey], 2)),
    suffix: (currency?.symbol || '$'),
  };
};

const regExps: Array<string> = [
  `^(${cryptoKeywords})\\s+(?:in|to)\\s+(${currenciesKeywords})$`,
  `^.+\\s+(${cryptoKeywords})$`,
  `^.+\\s+(${cryptoKeywords})\\s+(?:in|to)\\s+(${currenciesKeywords})$`,
  `^(${cryptoKeywords})\\s+rate$`,
  `^(${cryptoKeywords})\\s+rate\\s+(?:in|to)\\s+(${currenciesKeywords})$`,
  `^.+\\s+(${cryptoKeywords})\\s+rate$`,
  `^.+\\s+(${cryptoKeywords})\\s+rate\\s+(?:in|to)\\s+(${currenciesKeywords})$`,
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Crypto currency',
  description: 'Check current values of crypto currencies',
  hints: [
    'btc rate',
    'how much is btc',
    'btc in euro',
    'how much is etherium',
    'how much is eth in usd',
  ],
};
