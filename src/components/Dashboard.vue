<script setup lang="ts">
import { ref } from 'vue'
import SymbolDrawerWrapper from './symbol/SymbolDrawerWrapper.vue'
import SymbolList from './symbol/SymbolList.vue'

const reload = ref(false)

function onSymbolAdded(value: boolean) {
  reload.value = !reload.value
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__symbol-drawer">
      <SymbolDrawerWrapper @symbolAdded="onSymbolAdded" />
    </div>
    <div class="dashboard__list">
      <SymbolList :reload />
    </div>
  </div>
</template>

<style lang="scss">
.dashboard {
  display: inline-grid;
}

.dashboard {
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  &__list {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }

  &__symbol-drawer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    @media (min-width: 1024px) {
      margin-bottom: 0rem;
      grid-area: 1 / 1 / 2 / 2;
    }
  }
}
</style>
