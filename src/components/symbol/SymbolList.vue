<script setup lang="ts">
import { onMounted, ref, watch, inject } from 'vue'
import { LSSymbolsKey } from './definitions/CanvasSymbol.const'
import SymbolDrawer from './SymbolDrawer.vue'
import { I18nKeysDrawerABS } from '../../plugins/i18n/i18n.const'
import { I18nKeys, I18nKeysAlert } from '../../plugins/i18n/i18n.definition'

const i18n = inject('i18n')
const props = defineProps<{
  reload: boolean
}>()

const userSymbols = ref<string[]>(getSavedSymbols())

watch(
  () => props.reload,
  (value) => {
    console.log(value)
    userSymbols.value = getSavedSymbols()
  }
)

function getSavedSymbols(): string[] {
  const data = localStorage.getItem(LSSymbolsKey)
  return data ? JSON.parse(data) : data
}

function updateSymbolsLS(data: string[]): void {
  localStorage.setItem(LSSymbolsKey, JSON.stringify(data))
}

function onSymbolAdd() {
  console.log('test')
}

function onSymbolClick(index: number) {
  deleteSymbol()
}

function deleteSymbol(index: number) {
  const confirmed = confirm(i18n[I18nKeys.Alert][I18nKeysAlert.Delete])

  if (!confirmed) {
    return
  }

  const tempSymbols = [...userSymbols.value]
  tempSymbols.splice(index, 1)
  userSymbols.value = [...tempSymbols]
  updateSymbolsLS(userSymbols.value)
}

onMounted(() => {})
</script>

<template>
  <div class="symbol__list">
    <div class="symbol__list-element" v-for="(symbol, index) in userSymbols" :key="symbol">
      {{ index }}
      <SymbolDrawer
        class="symbol__list-element-drawer"
        @click="onSymbolClick(index)"
        :symbol-json="symbol"
        :is-preview="true"
        :smaller="true"
      ></SymbolDrawer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.symbol__list {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: row;

  &-element {
    margin: 0.6rem;
  }
}
</style>
