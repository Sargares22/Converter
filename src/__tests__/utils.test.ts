import Utils from '../services/common/utils';

describe('Utils', () => {
  describe('get clamped value', () => {
    it.each`
            value | min   | max   | result
            ${12} | ${5}  | ${13} | ${12}
            ${25} | ${20} | ${23} | ${23}
            ${0}  | ${1}  | ${20} | ${1}
        `('when value is $value, max is $max, min is $min', (
      {
        value,
        min,
        max,
        result,
      },
    ) => {
      expect(Utils.clamp(value, min, max))
        .toBe(result);
    });
  });

  describe('get pluralized string', () => {
    it.each`
            count | words                             | result
            ${1}  | ${['голос', 'голоса', 'голосов']} | ${'1 голос'}
            ${2}  | ${['голос', 'голоса', 'голосов']} | ${'2 голоса'}
            ${5}  | ${['голос', 'голоса', 'голосов']} | ${'5 голосов'}
        `('when count is $count', ({
      count,
      words,
      result,
    }) => {
      expect(Utils.pluralize(count, words))
        .toBe(result);
    });
  });

  describe('get formatted dat', () => {
    it.each`
            date                                  | result
            ${'2021-12-02T20:23:14.115+00:00'}    | ${'3.12.2021'}
            ${'2021-12-11T23:48:40.563Z'}         | ${'12.12.2021'}
            ${1638316800 * 1000}                  | ${'1.12.2021'}
        `('when date is $date', ({
      date,
      result,
    }) => {
      expect(Utils.formatDate(date))
        .toBe(result);
    });
  });

  describe('get correctly fixed number', () => {
    it.each`
            value | fixedNumber | result
            ${10}    | ${''}    | ${'10'}
            ${10}    | ${2}     | ${'10'}
            ${125.6} | ${null}  | ${'126'}
            ${13.1}  | ${3}     | ${'13.100'}
        `('when value is $value', ({
      value,
      fixedNumber,
      result,
    }) => {
      expect(Utils.setToFixed(value, fixedNumber))
        .toBe(result);
    });
  });

  // it('get string from object', () => {
  //   const data = { value: 'test' };
  //
  //   expect(Utils.stringifyData(data)).toEqual(expect.any(String));
  // });
});
