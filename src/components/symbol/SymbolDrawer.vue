<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import SymbolCell from './SymbolCell.vue'
import SymbolRow from './SymbolRow.vue'
import { CanvasSymbolDrawer } from './definitions/CanvasSymbolDrawer'
import { LSSymbolsKey, ESymbolEvents } from './definitions/CanvasSymbol.const'

const props = defineProps<{
  isPreview?: boolean
  symbolJson?: string
  smaller?: boolean
}>()

const emit = defineEmits([ESymbolEvents.SymbolAdded, ESymbolEvents.SymbolExists])

const canvasClassName = 'symbol__drawer'
const canvasWrapperClassName = 'symbol__drawer-wrapper'
const symbolExists = ref(false)
let drawer: CanvasSymbolDrawer

const canvasElement = useTemplateRef<HTMLCanvasElement>('canvasDrawer')
const size = props.smaller ? 90 : 390
const width = size
const height = size

onMounted(() => {
  const ctx = canvasElement.value?.getContext('2d')!
  const drawer = new CanvasSymbolDrawer(canvasElement.value, ctx, props.isPreview)

  if (props.isPreview && props.symbolJson) {
    drawer.render()
    drawer.renderStaticPreview(props.symbolJson)
    return
  }

  drawer.render()
  drawer.onNewSymbol = onNewSymbolAddHandler
})

const onNewSymbolAddHandler = (symbol: string) => {
  updateSymbolExists(false)
  let currentSymbols: string[] | string | null = localStorage.getItem(LSSymbolsKey)

  if (currentSymbols) {
    currentSymbols = JSON.parse(currentSymbols)
  } else {
    currentSymbols = []
  }

  if (currentSymbols!.includes(symbol)) {
    updateSymbolExists(true)
    return
  }

  ;(currentSymbols as string[])!.push(symbol)

  localStorage.setItem(LSSymbolsKey, JSON.stringify(currentSymbols))
  emit(ESymbolEvents.SymbolAdded, true)
}

function updateSymbolExists(value: boolean) {
  symbolExists.value = value
  emit(ESymbolEvents.SymbolExists, symbolExists.value)
}
</script>

<template>
  <div :class="canvasWrapperClassName">
    <SymbolRow v-for="(y, yi) in 3" :key="y">
      <SymbolCell
        v-for="(x, xi) in 3"
        :key="x"
        :x
        :y
        :symbolExists
        :smaller="props.smaller"
        :class="`${x}${y}`"
      />
    </SymbolRow>
    <canvas
      ref="canvasDrawer"
      :width
      :height
      :class="{ [canvasClassName]: true, 'symbol__drawer--smaller': smaller }"
    ></canvas>
  </div>
</template>

<style scoped lang="scss">
.symbol {
  &__title {
    margin-bottom: 2rem;
    text-align: center;
    text-transform: uppercase;
    color: #222;

    &--error {
      color: red;
    }
  }

  &__drawer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 390px;
    height: 390px;
    scale: 0.95;

    &--smaller {
      width: 90px;
      height: 90px;
    }

    &-wrapper {
      position: relative;
    }
  }
}
</style>
