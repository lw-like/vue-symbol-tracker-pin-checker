<script setup lang="ts">
defineProps<{
  x: number
  y: number
  smaller: boolean
}>()
</script>

<template>
  <div class="symbol__cell" :class="{ 'symbol__cell--smaller': smaller }">
    <span class="symbol__dot"></span>
  </div>
</template>

<style scoped lang="scss">
.symbol {
  &__cell {
    width: 130px;
    height: 130px;

    display: flex;
    align-items: center;
    justify-content: center;

    &--smaller {
      width: 30px;
      height: 30px;

      .symbol__dot {
        width: 10px;
        height: 10px;
      }
    }
  }

  &__dot {
    position: absolute;
    display: flex;
    background-color: rgba(255, 255, 255, 0.2);
    width: 20px;
    height: 20px;
    border-radius: 100%;
  }

  &__dev {
    position: absolute;
    display: bottom;
  }
}
</style>
