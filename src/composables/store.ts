import { ref } from 'vue';

import { Answer } from '../types/answer';

export default function useStore() {
  const input = ref('');
  const answer = ref<Answer | null>(null);

  const getInput = (): string => input.value;
  const setInput = (value: string) => (input.value = value);

  const getAnswer = (): Answer | null => answer.value;
  const setAnswer = (value: Answer) => (answer.value = value);

  return {
    getInput,
    setInput,
    getAnswer,
    setAnswer,
  };
}
