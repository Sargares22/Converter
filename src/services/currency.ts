import { Currency } from '../types/currency';

const currencies: Array<Currency> = [
  {
    key: 'USD',
    labels: ['usd', 'dollar'],
    symbol: '$',
  },
  {
    key: 'EUR',
    labels: ['eur', 'euro'],
    symbol: '€',
  },
  {
    key: 'RUB',
    labels: ['rub', 'ruble'],
    symbol: '₽',
  },
  {
    key: 'CNY',
    labels: ['cny', 'yuan'],
    symbol: '¥',
  },
  {
    key: 'GBP',
    labels: ['gbp', 'pound'],
    symbol: '£',
  },
];

type PromiseResult = {
  success: boolean
  query: {
    from: string
    to: string
    amount: number
  }
  info: {
    timestamp: number
    rate: number
  }
  date: string
  result: number
};

const headers: Headers = new Headers();
headers.append('apikey', `${import.meta.env.VITE_EXCHANGE_RATES_API_KEY}`);

const requestOptions: { method: string, redirect: string, headers: Headers } = {
  method: 'GET',
  redirect: 'follow',
  headers,
};

const getRate = async (number: string, from: string, to: string): Promise<PromiseResult> => {
  const data = await fetch(
    `${import.meta.env.VITE_EXCHANGE_RATES_URL}?to=${to}&from=${from}&amount=${number}`,
    requestOptions as RequestInit,
  );

  return (await data.json());
};

export default {
  getRate,
  currencies,
  regExp: 'usd|dollars?|eur|euros?|cny|yuan|rub|rubles?|gbp|pounds?',
};
