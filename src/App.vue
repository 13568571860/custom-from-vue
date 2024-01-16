<template>
  <div id="customForm">
    <forms @dragstart="dragstart" @dragend="dragend"></forms>
    <main class="container">
      <page ref="pageRef" :config="config" @dragstart="dragstart" :dragData="dragData" :data="selectedInfo" :userData="userData" @selected="selected"></page>
    </main>
    <attr :data="selectedInfo" :config="config"></attr>
  </div>
</template>

<script setup lang="ts">
import type { Component } from './components/type'
import forms from './forms.vue'
import page from './page.vue'
import attr from './attr.vue'
import commonConfig from './common'
import { ref } from 'vue'

const dragData = ref({} as Component)
const selectedInfo = ref({} as Component)
const pageRef = ref<InstanceType<typeof page> | null>(null)
const config = ref(getConfigData())
const userData = ref({} as {[key:string]: any})

function dragstart(data: Component) {
  dragData.value = data
}
function dragend() {
  pageRef.value?.handleDragend()
}
function selected(data: Component) {
  selectedInfo.value = data
}
function getConfigData() {
  const obj: { [key:string]: any } = {}
  commonConfig.forEach(item => {
    item.input.forEach(r => {
      obj[r.key] = r.default || null
    })
  })
  return obj
}
function exportJSON() {
  console.log(pageRef.value?.forms)
  return pageRef.value?.forms
}

</script>

<style lang="scss" scoped>
#customForm {
  height: 100%;
  display: flex;
  main.container {
    flex: 1;
    background: $background;
  }
}
</style>

<style>#app{height:100%;}</style>