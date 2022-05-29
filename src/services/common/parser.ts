import modules from './modules';

import { Action, ParsersAction } from '../../types/action';
import { Module } from '../../types/module';
import { Answer } from '../../types/answer';

export default function createParser() {
  const actions: Array<Action> = modules
    .reduce((actions: Array<Action>, module: Module) => [...actions, ...module.actions], []);

  const process = async (input: string): Promise<Answer | null> => {
    const action: ParsersAction = findAction(input, actions);

    return action ? (await action.handler(...action.parts)) : null;
  };

  const findAction = (input: string, actions: Array<Action>): ParsersAction => {
    const action: Action | undefined = actions.find(({ reg }) => reg.test(input));

    return action ? {
      ...action,
      parts: input.match(action?.reg)
        ?.slice(1) as Array<string>,
    } : null;
  };

  return {
    process,
    findAction,
  };
}
