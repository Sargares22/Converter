import Utils from './common/utils';

import { PasswordConfig, PasswordConstants, PasswordSymbols } from '../types/password';

type configKey = keyof PasswordSymbols & keyof PasswordConstants;

const passwordConstants: PasswordConstants = {
  numbers: '0123456789',
  letters: 'abcdefghijklmnopqrstuywxyz',
  symbols: '!@#$%^&*_+|{}[]()/\'"`~,;:.<>',

  similarCharacters: 'il1Lo0O',

  includes: ['numbers', 'lowercase', 'uppercase', 'symbols'],
  excludes: ['similarCharacters', 'ambigiousCharacters', 'homoglyphs'],
};

const configs: Array<PasswordConfig> = [
  {
    labels: ['weak', 'low', 'simple', 'light'],
    config: {
      length: 6,
      numbers: true,
      lowercase: true,
      uppercase: true,
    },
  },
  {
    labels: ['normal', 'standard', 'common', 'regular', 'usual', 'ordinary'],
    config: {
      length: 8,
      numbers: true,
      lowercase: true,
      uppercase: true,
      symbols: true,
    },
  },
  {
    labels: ['strong', 'powerful', 'solid', 'hard', 'serious'],
    config: {
      length: 12,
      numbers: true,
      lowercase: true,
      uppercase: true,
      symbols: true,
    },
  },
];

const generate = (config: PasswordSymbols): string => {
  const canGenerate = config?.length && Object.values({
    ...config,
    length: 0,
  })
    .some((setting) => Boolean(setting));

  return canGenerate
    ? Array.from({ length: config.length })
      .map(() => generateCharacter(config))
      .join('')
    : '';
};

const generateCharacter = (config: PasswordSymbols): string => {
  const allowedCharacters = getAllowedCharacters(config);
  const filteredCharacters = filterCharacters(allowedCharacters, config);
  const index = Utils.getRandomIndex(filteredCharacters);

  return filteredCharacters.split('')[index];
};

const getAllowedCharacters = (config: PasswordSymbols): string => {
  return passwordConstants.includes
    .map((key) => ((config[key as configKey]
      && ['uppercase', 'lowercase'].includes(key))
      ? getAllowedLetters(key)
      : passwordConstants[key as configKey]))
    .filter(Boolean)
    .join('');
};

const filterCharacters = (characters: string, config: PasswordSymbols): string => {
  return characters.split('')
    .filter((char) => checkChar({
      char,
      config,
    }))
    .join('');
};

const getAllowedLetters = (key: string): string => {
  return ((key === 'uppercase')
    ? passwordConstants.letters.toUpperCase()
    : passwordConstants.letters.toLowerCase());
};

const checkChar = ({
  char,
  config,
}: { char: string, config: PasswordSymbols }): boolean => passwordConstants.excludes
  .some((key) => (config[key as configKey] ? !passwordConstants[key as configKey].includes(char) : true));

export default {
  generate,
  configs,
};
