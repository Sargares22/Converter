export const CONSTANTS = {
  timeTerms: {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
  },
  date: {
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    terms: ['day', 'week', 'month', 'year'],
  },
  numberSystem: {
    binary: 2,
    octal: 8,
    decimal: 10,
    hex: 16,
  },
  arithmeticOperations: {
    sum: ['+', 'plus', 'sum', 'add'],
    subtract: ['-', 'minus', 'subtract'],
    multiply: ['*', 'multiply'],
    divide: ['/', 'divide'],
  },
} as const;
