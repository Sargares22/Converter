import { CONSTANTS } from './common/constants';
import Utils from './common/utils';
import Arithmetic from './arithmetic';

const dateOperations: {
  [key: string]: (number: number, operation: string) => Date
} = {
  day: (number: number, operation: string): Date => {
    const result: number = Arithmetic.calculate(operation, (new Date().getTime()), (number * CONSTANTS.timeTerms.day));

    return new Date(result);
  },
  week: (number: number, operation: string): Date => {
    const result: number = Arithmetic.calculate(operation, (new Date().getTime()), (number * CONSTANTS.timeTerms.week));

    return new Date(result);
  },
  month: (number: number, operation: string): Date => {
    return new Date(new Date().setMonth(Arithmetic.calculate(operation, new Date().getMonth(), number)));
  },
  year: (number: number, operation: string): Date => {
    return new Date(new Date().setFullYear(Arithmetic.calculate(operation, new Date().getFullYear(), number)));
  },
};

const getCurrentDate = (): string => Utils.formatDate(new Date());

const getTomorrow = (): string => {
  const result = Arithmetic.calculate('sum', (new Date().getTime()), CONSTANTS.timeTerms.day);

  return Utils.formatDate(new Date(result));
};

const getYesterday = (): string => {
  const result = Arithmetic.calculate('subtract', (new Date().getTime()), CONSTANTS.timeTerms.day);

  return Utils.formatDate(new Date(result));
};

const getNextDayOfWeek = (day: string): string => {
  const dayIndex: number = CONSTANTS.date.dayOfWeek.findIndex((d) => (d.toLowerCase() === day.toLowerCase()));
  const date = (new Date().setDate(new Date().getDate() - new Date().getDay() + 7 + dayIndex));

  return Utils.formatDate(new Date(date));
};

const getDateOperation = (operation: string, number: number, term: keyof typeof CONSTANTS.date.terms): string => {
  const resultTime: Date = dateOperations[term as string](number, operation);

  return resultTime ? Utils.formatDate(resultTime) : '';
};

export default {
  getCurrentDate,
  getTomorrow,
  getYesterday,
  getNextDayOfWeek,
  getDateOperation,
};
