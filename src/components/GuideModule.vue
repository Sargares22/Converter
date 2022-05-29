<template>
  <li
    :class="[
      'guide-module',
      {
        'collapsed': collapsed
      }
    ]"
  >
    <span
      class="name"
      @click="onCollapse(!collapsed)"
    >
      {{ module.name }}
    </span>

    <transition name="fade">
      <div
        v-if="!collapsed"
        class="content"
      >
        <div class="description">
          {{ module.description }}
        </div>

        <div class="hints">
          <span
            v-for="(hint, idx) in module.hints"
            :key="`module-${idx}`"
            class="hint"
            @click="onHint(hint)"
          >
            "{{ hint }}"
          </span>
        </div>
      </div>
    </transition>
  </li>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Module } from '../types/module';

type Props = {
  module: Module,
};

type Emits = {
  (e: 'hint', hint: string): void
};

const emit = defineEmits<Emits>();

defineProps<Props>();

const collapsed = ref<boolean>(true);

const onCollapse = (state: boolean): boolean => (collapsed.value = state);

const onHint = (hint: string): void => emit('hint', hint);
</script>

<style>
.guide-module {
  display: flex;
  flex-direction: column;

  gap: var(--spacing-1);
}

.guide-module .name {
  width: fit-content;
  font-size: var(--font-size-3);
  font-weight: bold;

  cursor: pointer;

  border-bottom: 2px dashed var(--col-neutral-4);
}

.guide-module.collapsed {
  opacity: .5;
}

.guide-module .description {
  margin-bottom: var(--spacing-1);

  color: var(--col-neutral-7);
}

.guide-module .hint {
  font-size: var(--font-size-1);

  color: var(--col-neutral-6);
  cursor: pointer;
}

.guide-module .hint:hover,
.guide-module .hint:focus {
  color: var(--col-neutral-7);
}

.guide-module .hint:not(:last-child)::after {
  content: ",";
  color: var(--col-neutral-5);
}
</style>
