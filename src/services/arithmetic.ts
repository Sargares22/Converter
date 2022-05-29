import Utils from './common/utils';
import { CONSTANTS } from './common/constants';

type operationHandler = (...args: Array<unknown>) => number;

const operations: {
  [key: string]: operationHandler,
} = {
  sum: (...args: Array<unknown>): number => {
    return args.reduce((acc: number, curr) => (acc + Utils.toNumber(curr)), 0);
  },
  subtract: (...args: Array<unknown>): number => {
    return args.reduce((acc: number, curr, index: number) => {
      return !index ? Utils.toNumber(curr) : (acc - Utils.toNumber(curr));
    }, 0);
  },
  multiply: (...args: Array<unknown>): number => {
    return args.reduce((acc: number, curr) => (acc * Utils.toNumber(curr, 1)), 1);
  },
  divide: (...args: Array<unknown>): number => {
    return args.reduce((acc: number, curr) => (acc / Utils.toNumber(curr, 1)), 1);
  },
};

const calculate = (operation: string, ...args: Array<unknown>): number => {
  const operationValue: string = Object.entries(CONSTANTS.arithmeticOperations)
    .find(([, array]) => array.includes(operation as never))?.[0] || '';
  const operationHandler: operationHandler = operations[operationValue as keyof typeof CONSTANTS.arithmeticOperations];

  return operationHandler(...args);
};

export default {
  calculate,
};
