<template>
  <div class="customForm_edit">
    <forms @dragstart="dragstart" @dragend="dragend"></forms>
    <main>
      <page ref="pageRef" :config="config" @dragstart="dragstart" :dragData="dragData" :data="selectedInfo" :userData="userData" @selected="selected"></page>
    </main>
    <attr :data="selectedInfo" :config="config"></attr>
  </div>
</template>

<script setup lang="ts">
import type { Component, ComponentClass, ComponnetsData } from '@/components/type'
import forms from './forms.vue'
import page from './page.vue'
import attr from './attr.vue'
import commonConfig from './common'
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import {
  getValue
} from '@/utils/utils'
import components from '@/components'
import * as uuid from 'uuid'
import { delObjectFromArray } from '@/utils/utils'

defineExpose({
  exportJSON,
  setData
})

const props = defineProps<{}>()

const dragData = ref({} as Component)
const selectedInfo = ref({} as Component)
const pageRef = ref<InstanceType<typeof page> | null>(null)
const config = ref(getConfigData())
const userData = ref({} as {[key:string]: any})
const componentList = ([] as ComponentClass[]).concat(...Object.values(components))

onBeforeMount(() => {
  window.addEventListener('keyup', handleKeys)
})
onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeys)
})

function handleKeys(e: KeyboardEvent) {
  switch(e.key) {
    case 'Delete':
      pageRef.value!.forms = delObjectFromArray(pageRef.value!.forms, selectedInfo.value)
      break
  }
  console.log(e)
}
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
  const data = {
    components: getComonentData(pageRef.value?.forms as Component[]),
    common: config.value
  }
  return data
}

function getComonentData(data: Component[]): ComponnetsData[] {
  return data.map(item => {
    const values: {[key:string]: any} = {}
    Object.keys(item.values).forEach(r => values['value_' + r] = getValue(item.values, r as never))
    return {
      type: item.type,
      componentType: item.componentType,
      children: getComonentData(item.children || [] as Component[]),
      ...values
    }
  })
}

function setData(data: { common: {[key:string]: any}, components: ComponnetsData[] }) {
  userData.value = {}
  selectedInfo.value = {} as Component
  config.value = data.common
  const forms = handleUserData(data.components)
  pageRef.value?.setData(forms)
}
function handleUserData(data: ComponnetsData[]): Component[] {
  return data.map(item => {
    const values: {[key:string]: any} = {}
    for(const i in item) {
      if(/^value_/.test(i)) {
        values[i.replace(/^value_/, '')] = item[i]
      }
    }
    const data = componentList.find(r => r.type === item.type)
    if(!data) return
    // @ts-ignore
    const component: Component = new data()
    component.id = uuid.v1()
    component.values = values
    if(item.children) component.children = handleUserData(item.children)
    return component
  }).filter(r => r) as Component[]
}
</script>

<style lang="scss" scoped>
.customForm_edit {
  height: 100%;
  display: flex;
  background: #fff;
  main {
    flex: 1;
    background: $background;
  }
}
</style>
