import RandomQuote from '../../services/random/randomQuote';

import { Answer } from '../../types/answer';
import { Action } from '../../types/action';

const handler = async (): Promise<Answer> => {
  const data = await RandomQuote.getQuote();

  return {
    value: data?.length ? `${data[0].q} - "${data[0].a}"` : '',
    buttons: ['copy', 'refresh'],
  };
};

const regExps: Array<string> = [
  '^give\\s+me\\s+(?:quote|random quote)$',
  '^give\\s+me\\s+a\\s+(?:quote|random quote)$',
  '^random quote$',
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Random quote',
  description: 'Generate a random quote',
  hints: [
    'give me a quote',
    'give me a random quote',
    'random quote',
  ],
};
