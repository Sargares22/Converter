type PromiseResult = {
  q: string,
  a: string,
  c: string,
  h: string,
  i?: string,
};

const getQuote = async (): Promise<Array<PromiseResult>> => {
  const data = await fetch(`${import.meta.env.VITE_RANDOM_QUOTES_URL}`);

  return (await data.json());
};

export default {
  getQuote,
};
