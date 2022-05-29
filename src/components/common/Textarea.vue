<template>
  <textarea
    ref="textareaRef"
    :placeholder="placeholder"
    :value="text"
    class="input textarea"
    rows="1"
    @focus="resize"
    @input="onInput($event.target.value)"
    @keyup="resize"
    @keyup.enter.prevent
  />
</template>

<script lang="ts" setup>
import {
  nextTick, onMounted, ref, toRefs, watch,
} from 'vue';

type Emits = {
  (e: 'input', string: string): void
  (e: 'modelValue:update', string: string): void
};

type Props = {
  text: string,
  placeholder?: string,
};

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const { text } = toRefs(props);

const textareaRef = ref();

onMounted(() => {
  resize();
});

watch(text, () => resize());

const onInput = (text: string) => {
  emit('input', text);
  emit('modelValue:update', text);
};

const resize = () => {
  nextTick(() => {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  });
};
</script>

<style>
.input.textarea {
  padding: 0;

  font-size: var(--font-size-3);
  background-color: transparent;

  width: fit-content;
  resize: none;
  overflow: hidden;
}
</style>
