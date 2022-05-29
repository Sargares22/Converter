import { CryptoCurrency, CryptoResult } from '../types/cryptoCurrency';

const currencies: Array<CryptoCurrency> = [
  {
    key: 'BTC',
    labels: ['btc', 'bitcoin'],
  },
  {
    key: 'ETH',
    labels: ['eth', 'Etherium'],
  },
  {
    key: 'BUSD',
    labels: ['busd', 'binance usd'],
  },
  {
    key: 'SOL',
    labels: ['sol', 'solana'],
  },
  {
    key: 'USDT',
    labels: ['usdt', 'tether'],
  },
  {
    key: 'BNB',
    labels: ['bnb', 'binance coin'],
  },
];

const getRate = async (cryptoFrom: string, currencyTo = 'USD'): Promise<CryptoResult> => {
  const data = await fetch(
    `${import.meta.env.VITE_CRYPTO_URL}
    ?fsym=${cryptoFrom}
    &tsyms=${currencyTo}
    &api_key=${import.meta.env.VITE_CRYPTO_API_KEY}`,
  );

  return (await data.json());
};

export default {
  getRate,
  currencies,
};
