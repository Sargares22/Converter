import Crypto from '../../services/crypto';

const examples = [['usd', 'btc'], ['eur', 'eth'], ['ruble', 'busd']];

describe('Crypto service', () => {
  describe('Check up of returning crypto rates', () => {
    examples.forEach(([currency, crypto]) => {
      it(`works correctly with crypto ${crypto} currency ${currency}`, async () => {
        expect.hasAssertions();

        const result = await Crypto.getRate(crypto, currency);

        expect(result)
          .toBeTruthy();
        expect(result)
          .toHaveReturned();
        expect(Object.keys(result))
          .toHaveLength(1);
      });
    });
  });
});
