import { Answer } from './answer';

export interface Action {
  reg: RegExp,
  handler: (...args: Array<string>) => Promise<Answer> | Answer,
}

export type ActionSignature = { regs: Array<string>, handler: (...args: Array<string>) => Answer };

export type ParsersAction = (Action & { parts: Array<string> }) | null;
