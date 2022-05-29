<template>
  <div class="loading">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  duration: {
    type: Number,
    default: 0.5,
  },
});
</script>

<style>
.loading {
  display: flex;
  flex-direction: row;
  align-items: center;

  --duration: calc(v-bind(duration) * 1s);
}

.loading div {
  width: 10px;
  height: 10px;
  margin: calc(var(--spacing-1) / 3);
  background: var(--col-green-5);
  border-radius: 50%;
  animation: var(--duration) smooth infinite alternate;
}

.loading div:nth-child(2) {
  animation-delay: calc(var(--duration) / 2.5);
}

.loading div:nth-child(3) {
  animation-delay: calc(var(--duration) * 0.8);
}

@keyframes smooth {
  to {
    opacity: 0.3;
  }
}
</style>
