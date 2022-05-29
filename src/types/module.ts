import { Action } from './action';

export interface Module {
  actions: Array<Action>,
  name: string,
  description: string,
  hints: Array<string>,
}
