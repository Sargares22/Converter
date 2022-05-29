import Crypto from '../services/crypto';
import Currency from '../services/currency';

const cryptoCurrencies = Crypto.currencies.map(({ labels }) => labels)
  .flat();
const currencies = Currency.currencies.map(({ labels }) => labels)
  .flat();

interface cryptoAnswer {
  [key: string]: {
    [key: string]: number
  };
}

export default function cryptoMock(cryptoFrom: string, currencyTo = 'USD'): Promise<cryptoAnswer | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isCorrect = cryptoCurrencies.includes(cryptoFrom.toLowerCase())
        && currencies.includes(currencyTo.toLowerCase());

      isCorrect ? resolve({ [cryptoFrom]: { [currencyTo]: 5 } }) : reject(null);
    }, 10);
  });
}
