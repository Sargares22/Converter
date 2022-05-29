import Distance from '../../modules/distance';

import createParser from '../../services/common/parser';

import { ParsersAction } from '../../types/action';
import { Answer } from '../../types/answer';

const { findAction } = createParser();

const correctHints: Array<string> = Distance.hints;
const incorrectHints: Array<string> = ['1km in mile', '158 yards in mt', '15 foots in meters'];

describe('Distance module', () => {
  describe('Check actions workability with CORRECT hints', () => {
    correctHints.forEach((hint: string) => {
      it(`works correctly with hint: ${hint}`, () => {
        const action: ParsersAction = findAction(hint, Distance.actions);

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
              suffix: expect.any(String),
            });

          spy.mockRestore();
        }
      });
    });
  });

  describe('Check actions workability with INCORRECT hints', () => {
    incorrectHints.forEach((hint: string) => {
      it(`doesn't work with hint: ${hint}`, () => {
        const action: ParsersAction = findAction(hint, Distance.actions);

        expect(action)
          .not
          .toBeTruthy();
      });
    });
  });
});
