import createParser from '../../services/common/parser';
import modules from '../../services/common/modules';

const { process } = createParser();
const hints = modules
  .map(({ hints }) => hints)
  .flat();

describe('Parser service', () => {
  describe('Check workability of "process"', () => {
    hints.forEach((hint) => {
      it(`works correctly with hint: ${hint}`, async () => {
        expect.hasAssertions();

        const answer = await process(hint);

        expect(answer)
          .toBeTruthy();
        expect(answer)
          .toHaveProperty('value');
      });
    });
  });
});
