<script setup lang="ts">
import { ref } from 'vue'
import SymbolDrawer from './SymbolDrawer.vue'
import { ESymbolEvents } from './definitions/CanvasSymbol.const'
import { I18nKeysDrawerABS } from '../../plugins/i18n/i18n.const'

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
      <span v-if="!symbolExists">{{ $translate(I18nKeysDrawerABS.EnterCode) }}</span>
      <span v-if="symbolExists">{{ $translate(I18nKeysDrawerABS.CodeExists) }}</span>
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
