<template>
  <h3
    class="guide-title"
    @click="onCollapse(!collapsed)"
  >
    List of services
  </h3>

  <transition name="fade">
    <ul
      v-if="collapsed"
      class="guide"
    >
      <GuideModule
        v-for="(module, idx) in modules"
        :key="`module-${idx}`"
        :module="module"
        @hint="onHint"
      />
    </ul>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Module } from '../types/module';
import GuideModule from './GuideModule.vue';

type Emits = {
  (e: 'hint', hint: string): void
};

type Props = {
  modules: Array<Module>,
};

const emit = defineEmits<Emits>();

defineProps<Props>();

const collapsed = ref<boolean>(false);

const onCollapse = (state: boolean): boolean => (collapsed.value = state);

const onHint = (hint: string): void => emit('hint', hint);
</script>

<style>
.guide-title {
  width: fit-content;

  border-bottom: 2px dashed var(--col-neutral-4);
  cursor: pointer;
}

.guide {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: var(--spacing-2);

  text-align: left;

  padding: var(--spacing-1);
  border-radius: var(--spacing-1);
}

.guide .module:not(:last-child) {
  padding-bottom: var(--spacing-1);
  border-bottom: 1px solid var(--col-neutral-3);
}
</style>
