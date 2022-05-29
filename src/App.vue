<!--
  todo:
  - create unique service for repeatable calculators services
  - create service for collecting actions
  - create api composable
-->

<template>
  <div
    ref="appRef"
    class="container"
  >
    <header>
      <h1 class="title">
        Informator
      </h1>

      <p class="description">
        This is the set of helpful and information services for everyday use.
        Convert, calculate, request to external services, get information from
        different sources and much more.
      </p>
    </header>

    <main>
      <section class="converter form-container">
        <Textarea
          :placeholder="`Example: ${hint}`"
          :text="getInput()"
          @input="onInput"
        />

        <Loading v-if="loading"/>

        <Answer
          v-if="!loading && getAnswer()?.value"
          :answer="getAnswer()"
          @copy="onCopy"
          @recalculate="onRecalculate"
        />
      </section>

      <section>
        <Guide
          :modules="modules"
          @hint="onHintClick"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import useStore from './composables/store';

import modules from './services/common/modules';
import Utils from './services/common/utils';
import createParser from './services/common/parser';

import Guide from './components/Guide.vue';
import Answer from './components/Answer.vue';
import Loading from './components/common/Loading.vue';

import { Answer as AnswerType } from './types/answer';
import Textarea from './components/common/Textarea.vue';

const appRef = ref<HTMLInputElement | null>(null);

const {
  getInput,
  setInput,
  getAnswer,
  setAnswer,
} = useStore();

const { process } = createParser();

const hints: Array<string> = modules
  .map(({ hints }) => hints)
  .flat();

const loading = ref<boolean>(false);
const hint = ref<string>('');

onMounted(() => {
  setRandomHint();

  setInterval(setRandomHint, 15000);
});

const setRandomHint = (): void => {
  const index: number = Utils.getRandomIndex(hints);

  hint.value = hints[index];
};

const onInput = async (input: string): Promise<void> => {
  loading.value = true;

  setInput(input);
  setAnswer((input ? (await process(input.trim())) : null) as AnswerType);

  loading.value = false;
};

const onHintClick = (input: string): void => {
  onInput(input);

  Utils.scrollToItem(appRef.value);
};

const onRecalculate = async (): Promise<void> => {
  setAnswer(await process(getInput()) as AnswerType);
};

const onCopy = (): Promise<void> => Utils.copyToClipboard(getAnswer()?.value);
</script>

<style>
@import "./styles/base.css";

.converter {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  min-height: calc(var(--line-height) * 4);

  gap: var(--spacing-1);

  color: var(--col-neutral-2);
  background-color: var(--col-neutral-7);
}

header .description {
  text-align: center;
}
</style>
