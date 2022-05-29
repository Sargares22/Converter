export default abstract class Utils {
  public static clamp = (value: number, min: number, max: number): number => {
    return ((value > max) ? max : (value < min) ? min : value);
  };

  public static formatArraysToRegexp = (arrays: Array<string[]>): string => {
    return arrays.map((array) => array.join('|')
      .toUpperCase())
      .join('|');
  };

  public static getRandomIndex = (array: Array<unknown> | string): number => Math.floor((Math.random() * array.length));

  public static getPercentageOf = (number1: number | string, number2: number | string): number => {
    return (Utils.toNumber(number2) / 100) * Utils.toNumber(number1);
  };

  public static getPercents = (number1: number | string, number2: number | string): number => {
    return ((Utils.toNumber(number2) / Utils.toNumber(number1)) * 100);
  };

  public static removeCharInTheEndOfString = (string: string, char: string): string => {
    const regex = new RegExp(`${char}+$`, 'g');

    return string.replace(regex, '');
  };

  static isNumeric(value: unknown): boolean {
    return !Number.isNaN(parseFloat(String(value))) && Number.isFinite(Number(value));
  }

  public static toNumber = (value: unknown, dft = 0): number => (this.isNumeric(value) ? Number(value) : dft);

  public static copyToClipboard = (string: string | undefined): Promise<void> => {
    return navigator.clipboard.writeText(string || '');
  };

  public static pluralize = (count: number, words: Array<unknown>): string => {
    const idx = ((count % 100 > 4) && (count % 100 < 20))
      ? 2
      : [2, 0, 1, 1, 1, 2][Math.min(count % 10, 5)];

    return `${count} ${words[idx]}`;
  };

  public static formatDate = (date: Date): string => {
    const formattedDate = new Date(date);

    return `${formattedDate.getDate()}.${formattedDate.getMonth() + 1}.${formattedDate.getFullYear()}`;
  };

  public static getDateTime = (date: Date): string => date.toLocaleString()
    .split(',')[1];

  public static setToFixed = (val: number, fixedNumber = 1): string => {
    return ((val % 1) ? val.toFixed(fixedNumber) : String(val));
  };

  public static scrollToItem = (item: HTMLElement | null): void => {
    item?.scrollIntoView({ behavior: 'smooth' });
  };

  public static uuidv4 = (): string => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = (c === 'x') ? r : (r & 0x3 | 0x8);

    return v.toString(16);
  });
}
