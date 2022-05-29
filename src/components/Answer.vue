<template>
  <div class="answer">
    <div class="value">
      {{
        isAnswerLong
          ? collapsed
            ? shortValue
            : answer?.value
          : answer?.value
      }}
    </div>

    <span
      v-if="answer?.suffix"
      class="suffix"
    >
      {{ answer?.suffix }}
    </span>

    <div
      v-if="(answer?.buttons || isAnswerLong)"
      class="controls"
    >
      <i
        v-if="isAnswerLong"
        class="icon bright ri-more-line"
        @click="onCollapse(!collapsed)"
      />

      <i
        v-if="answer?.buttons.includes('copy')"
        class="icon ri-file-copy-line"
        @click="onCopy"
      />

      <i
        v-if="answer?.buttons.includes('refresh')"
        class="icon ri-restart-line"
        @click="onRecalculate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { Answer } from '../types/answer';

type Emits = {
  (e: 'copy'): void
  (e: 'recalculate'): void
};

type Props = {
  answer: Answer
};

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const answerLengthLimit = 26;

const collapsed = ref<boolean>(true);

const isAnswerLong = computed(() => {
  return (props.answer.value.length > answerLengthLimit);
});

const shortValue = computed(() => props.answer.value.slice(0, answerLengthLimit));

const onCollapse = (state: boolean): boolean => (collapsed.value = state);

const onCopy = (): void => emit('copy');

const onRecalculate = (): void => emit('recalculate');
</script>

<style>
.answer {
  display: flex;
  gap: var(--spacing-1);

  justify-content: flex-end;
  text-align: left;

  color: var(--col-green-6);
}

.answer .value {
  display: inline-flex;
  align-items: center;

  font-weight: bold;
}

.answer .value .icon.bright {
  color: var(--col-green-4);
}

.answer .icon {
  color: var(--col-green-6);
}

.controls {
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
  .answer {
    width: 100%;
  }
}
</style>
