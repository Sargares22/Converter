import { CONSTANTS } from './common/constants';
import Utils from './common/utils';
import Arithmetic from './arithmetic';

const getCurrentTime = (): string => Utils.getDateTime(new Date());

const getTimeOperation = (number: string, operation: string, timeKey: keyof typeof CONSTANTS.timeTerms): string => {
  const resultTime: number = Arithmetic.calculate(
    operation,
    (new Date().getTime()),
    (Utils.toNumber(number) * CONSTANTS.timeTerms[timeKey]),
  );

  return Utils.getDateTime(new Date(resultTime));
};

export default {
  getCurrentTime,
  getTimeOperation,
};
