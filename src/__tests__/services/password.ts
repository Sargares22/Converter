import Password from '../../services/password';

import { PasswordSymbols } from '../../types/password';

type IncorrectConfig = {
  explanation: string
  config: PasswordSymbols,
};

const correctConfigs: Array<PasswordSymbols> = Password.configs.map(({ config }) => config);
const incorrectConfig: Array<IncorrectConfig> = [
  {
    explanation: 'Without length',
    config: {
      length: 0,
      numbers: true,
      lowercase: true,
      uppercase: true,
    },
  },
  {
    explanation: 'Without any allowed letters',
    config: {
      length: 6,
      numbers: false,
      lowercase: false,
      uppercase: false,
      symbols: false,
    },
  },
];

describe('Password service', () => {
  describe('Check generator function with CORRECT configs', () => {
    correctConfigs.forEach((config: PasswordSymbols) => {
      it(`works correctly with config: ${config}`, () => {
        const spy: jest.SpyInstance<string, [config: PasswordSymbols]> = jest.spyOn(Password, 'generate');
        const generatedPassword: string = Password.generate(config);

        expect(spy)
          .toHaveBeenCalledTimes(1);
        expect(spy)
          .toHaveBeenCalledWith(config);

        expect(generatedPassword)
          .toEqual(expect.any(String));
        expect(generatedPassword)
          .toHaveLength(config.length);

        spy.mockRestore();
      });
    });
  });

  describe('Check actions workability with INCORRECT hints', () => {
    incorrectConfig.forEach(({
      config,
      explanation,
    }: IncorrectConfig) => {
      it(`doesn't generate password, because: "${explanation}"`, () => {
        const spy: jest.SpyInstance<string, [config: PasswordSymbols]> = jest.spyOn(Password, 'generate');
        const generatedPassword: string = Password.generate(config);

        expect(spy)
          .toHaveBeenCalled();
        expect(spy)
          .toHaveBeenCalledWith(config);

        expect(generatedPassword)
          .toBeFalsy();
        expect(generatedPassword)
          .toHaveLength(0);

        spy.mockRestore();
      });
    });
  });
});
