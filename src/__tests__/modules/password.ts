import PasswordModule from '../../modules/password';

import createParser from '../../services/common/parser';

import { ParsersAction } from '../../types/action';
import { Answer } from '../../types/answer';

const { findAction } = createParser();

const correctHints: Array<string> = PasswordModule.hints;
const incorrectHints: Array<string> = [
  'please generate password for me',
  'give me the strongest password, please',
  'generate not too long pass',
];

describe('Password module', () => {
  describe('Check generator function with CORRECT configs', () => {
    correctHints.forEach((hint: string) => {
      it(`works correctly with hint: "${hint}"`, (done) => {
        const action: ParsersAction = findAction(hint, PasswordModule.actions);

        if (action) {
          const spy: jest.SpyInstance<Answer | Promise<Answer>, Array<string>> = jest.spyOn(action, 'handler');
          const calledHandler: (Answer | Promise<Answer>) = action.handler(...action.parts);

          expect(spy)
            .toHaveBeenCalledTimes(1);
          expect(spy)
            .toHaveBeenCalledWith(...action.parts);

          expect(calledHandler)
            .toMatchObject({
              value: expect.any(String),
              buttons: expect.arrayContaining(['copy', 'refresh']),
            });

          spy.mockRestore();
        }

        done();
      });
    });
  });

  describe('Check actions workability with INCORRECT hints', () => {
    incorrectHints.forEach((hint: string) => {
      it(`doesn't work with hint: "${hint}"`, () => {
        const action: ParsersAction = findAction(hint, PasswordModule.actions);

        expect(action)
          .not
          .toBeTruthy();
      });
    });
  });
});
