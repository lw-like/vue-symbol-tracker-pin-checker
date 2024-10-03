<script setup lang="ts"></script>

<template>
  <div class="symbol__row">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.symbol {
  &__row {
    display: flex;
  }
}
</style>
