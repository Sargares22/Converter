import Pixel from '../../modules/pixel';

import createParser from '../../services/common/parser';

import { ParsersAction } from '../../types/action';
import { Answer } from '../../types/answer';

const { findAction } = createParser();

const correctHints: Array<string> = Pixel.hints;
const incorrectHints: Array<string> = ['1pixel in %', '185 pixels', '123 units in dpi'];

describe('Pixel module', () => {
  describe('Check actions workability with CORRECT hints', () => {
    correctHints.forEach((hint: string) => {
      it(`works correctly with hint: ${hint}`, () => {
        const action: ParsersAction = findAction(hint, Pixel.actions);

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
        }
      });
    });
  });

  describe('Check actions workability with INCORRECT hints', () => {
    incorrectHints.forEach((hint: string) => {
      it(`doesn't work with hint: ${hint}`, () => {
        const action: ParsersAction = findAction(hint, Pixel.actions);

        expect(action)
          .not
          .toBeTruthy();
      });
    });
  });
});
