export interface PasswordSymbols {
  length: number,
  numbers: boolean,
  lowercase: boolean,
  uppercase: boolean,

  symbols?: boolean,
}

export interface PasswordConstants {
  numbers: string,
  letters: string,
  symbols: string,
  similarCharacters: string,
  includes: Array<string>,
  excludes: Array<string>,
}

export interface PasswordConfig {
  labels: Array<string>,
  config: PasswordSymbols,
}
