// type Buttons = keyof ['copy', 'refresh'];

export interface Answer {
  value: string,
  suffix?: string,
  buttons?: Array<string>,
}
