<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { LSSymbolsKey } from './definitions/CanvasSymbol.const'
import SymbolDrawer from './SymbolDrawer.vue'

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
  const confirmed = confirm('This action will delete symbol. Are you sure?')

  if (!confirmed) {
    return
  }

  const tempSymbols = [...userSymbols.value]
  tempSymbols.splice(index, 1)
  userSymbols.value = [...tempSymbols]
  updateSymbolsLS(userSymbols.value)
}

onMounted(() => {
  console.log(userSymbols.value)
})
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
    &-drawer {
    }
  }
}
</style>
