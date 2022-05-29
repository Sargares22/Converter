import Utils from '../services/common/utils';

import Password from '../services/password';

import { Answer } from '../types/answer';
import { Action } from '../types/action';
import { PasswordConfig } from '../types/password';

const keywords = Utils.formatArraysToRegexp(Password.configs.map(({ labels }) => labels));

const handler = (keyword: string): Answer => {
  const passwordConfig: PasswordConfig | undefined = Password.configs
    .find(({ labels }) => labels.some((label) => keyword?.toUpperCase()
      .startsWith(label.toUpperCase())));

  return {
    value: passwordConfig?.config
      ? Password.generate(passwordConfig.config)
      : Password.generate(Password.configs[0].config),
    buttons: ['copy', 'refresh'],
  };
};

const regExps: Array<string> = [
  `.+\\s+(${keywords})\\s+password`,
  `.+\\s+(${keywords})\\s+pass`,
  '^password$',
  '^pass$',
];

const actions: Array<Action> = regExps.map((reg) => ({
  reg: new RegExp(reg, 'i'),
  handler,
}));

export default {
  actions,
  name: 'Password generator',
  description: 'Generate a password with the different degree of difficulty',
  hints: [
    'password',
    'give me a password',
    'generate me please a strong password',
    'generate a standard password',
    'weak pass',
  ],
};
