<script setup lang="ts">
import { ref } from 'vue'
import SymbolDrawer from './SymbolDrawer.vue'
import { ESymbolEvents } from './definitions/CanvasSymbol.const'

const SymbolEvents = ESymbolEvents
const symbolExists = ref(false)
const emit = defineEmits([ESymbolEvents.SymbolAdded])

function onSymbolExists(value: boolean) {
  symbolExists.value = value
}

function onSymbolAdded(value: boolean) {
  emit(SymbolEvents.SymbolAdded, value)
}
</script>

<template>
  <div>
    <h1 class="symbol__title" :class="{ 'symbol__title--error': symbolExists }">
      <span v-if="!symbolExists">Narysuj symbol</span>
      <span v-if="symbolExists">Symbol istnieje</span>
    </h1>
    <SymbolDrawer @symbolExists="onSymbolExists" @symbolAdded="onSymbolAdded" />
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
}
</style>
