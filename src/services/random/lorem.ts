import lorem from '../../assets/lorem.json';

const getText = (length: number): string => lorem.slice(0, length);

export default {
  getText,
};
