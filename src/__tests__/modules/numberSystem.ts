import NumberSystem from '../../modules/numberSystem';

import createParser from '../../services/common/parser';

import { ParsersAction } from '../../types/action';
import { Answer } from '../../types/answer';

const { findAction } = createParser();

const correctHints: Array<string> = NumberSystem.hints;
const incorrectHints: Array<string> = ['100 hex to base-3', '100 to base64', '100 decimal under base 2'];

describe('Number system module', () => {
  describe('Check actions workability with CORRECT hints', () => {
    correctHints.forEach((hint: string) => {
      it(`works correctly with hint: ${hint}`, () => {
        const action: ParsersAction = findAction(hint, NumberSystem.actions);

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
            });
        }
      });
    });
  });

  describe('Check actions workability with INCORRECT hints', () => {
    incorrectHints.forEach((hint: string) => {
      it(`doesn't work with hint: ${hint}`, () => {
        const action: ParsersAction = findAction(hint, NumberSystem.actions);

        expect(action)
          .not
          .toBeTruthy();
      });
    });
  });
});
