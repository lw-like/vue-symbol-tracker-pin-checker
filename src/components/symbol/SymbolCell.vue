<script setup lang="ts">
import {
  CANVAS_SIZE_SMALL,
  CANVAS_SIZE_BIG,
  DimensionsVector
} from './definitions/CanvasSymbol.const'

defineProps<{
  x: number
  y: number
  smaller: boolean
}>()

const bigCanvasCellSize = `${CANVAS_SIZE_BIG / DimensionsVector.length}px`
const smallCanvasCellSize = `${CANVAS_SIZE_SMALL / DimensionsVector.length}px`
</script>

<template>
  <div class="symbol__cell" :class="{ 'symbol__cell--smaller': smaller }">
    <span class="symbol__dot"></span>
  </div>
</template>

<style scoped lang="scss">
.symbol {
  &__cell {
    width: v-bind(bigCanvasCellSize);
    height: v-bind(bigCanvasCellSize);

    display: flex;
    align-items: center;
    justify-content: center;

    &--smaller {
      width: v-bind(smallCanvasCellSize);
      height: v-bind(smallCanvasCellSize);

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
