<template>
  <main class="customForm_view">
    <component :is="render()"></component>
  </main>
</template>

<script setup lang="ts">
import type { Component, ComponentClass, ComponnetsData } from '@/components/type'
import { computed, ref, h, type Ref, type RendererElement, type RendererNode, type VNode } from 'vue'
import components from '@/components'
import * as uuid from 'uuid'
import { ElCol, ElForm, ElFormItem, ElRow } from 'element-plus'

const forms = ref([] as Component[])
const config: Ref<{[key:string]: any}> = ref({})
const componentList = ([] as ComponentClass[]).concat(...Object.values(components))
const userData = ref({})

defineExpose({
  setData,
  setUserData,
  userData
})

const rules = computed(() => {
  return getRules(forms.value)
})

function getRules(data: Component[], rules: any[] = []) {
  data.forEach(item => {
    const rule = []
    if(item.values.isRequired) rule.push({ required: true, trigger: 'change' })
    else if(item.values.vaild) rule.push({ validator(rule: any, value: string, callback: Function) {
      const reg = new RegExp(item.values.vaild)
      try {
        if(reg.test(value) || eval(item.values.vaild)) {
          callback()
        } else {
          callback(new Error())
        }
      } catch(err) {
        callback(new Error(''))
      }
    }, trigger: 'change' })
    if(item.children) getRules(item.children, rules)
    rules[item.values.modelValue] = rule
  })
  return rules
  // if(data.values.isRequired)
}
function setUserData(data: {[key:string]: any}) {
  userData.value = data
}
function setData(data: { common: {[key:string]: any}, components: ComponnetsData[] }) {
  config.value = data.common
  const formsData = handleUserData(data.components)
  forms.value = formsData
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
function render() {
  const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
  forms.value.forEach(item => {
    if(item.componentType === '表单组件') return vnodes.push(renderFormComponent(item))
    else if(item.componentType === '布局组件') return vnodes.push(renderLayoutComponent(item))
  })
  // @ts-ignore
  return h(ElForm, {
    model: userData.value,
    rules: rules.value,
    size: config.value.size,
    labelWidth: config.value.labelWidthModel === 'auto' ? 'auto' : config.value.labelWidth,
    labelPosition: config.value.labelPosition,
    labelSuffix: '：'
  }, { default: () => vnodes })
}
function renderFormComponent(data: Component) {
  const padding = config.value.padding.split(',')
  const paddingRight = padding[1] || padding[0]
  const paddingLeft = padding[3] || padding[1] || padding[0]
  return h(ElRow, {
    key: data.id + data.type,
    class: 'form-row',
    style: {
      paddingLeft: paddingLeft + 'px',
      paddingRight: paddingRight + 'px',
      paddingBottom: config.value.componentMargin + 'px',
      width: '100%'
    },
  }, { default: () => h(ElCol, {}, { default: () => [
    h(ElFormItem, {
      label: data.values.label,
      style: 'position: relative;',
      prop: data.values.modelValue
    }, { default: () => data.render(data, userData.value, renderFormComponent, renderLayoutComponent, { readonly: true, config: config.value }) })
  ]})})
}
function renderLayoutComponent(data: Component) {
  const padding = config.value.padding.split(',')
  const paddingRight = padding[1] || padding[0]
  const paddingLeft = padding[3] || padding[1] || padding[0]
  return h(ElRow, {
    key: data.id + data.type,
    class: 'form-row',
    // style: {
    //   paddingLeft: paddingLeft + 'px',
    //   paddingRight: paddingRight + 'px',
    //   paddingBottom: config.value.componentMargin + 'px'
    // },
  }, { default: () => [
    data.render(data, userData.value, renderFormComponent, renderLayoutComponent, { readonly: true })
  ]})
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0;
}
</style>