<template>
  <div class="content-edit-page">
    <header>
      <div class="left"></div>
      <div class="right"></div>
    </header>
    <main @dragover="dragover" @drop="drop" @click="emit('selected', {})" :style="computedStyle">
      <component :is='render()'></component>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed, type RendererElement, type RendererNode, type VNode } from 'vue'
import type { Component } from './components/type'
import { delObjectFromArray } from '@/utils/utils'
import { ElCol, ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'

const props = defineProps<{
  dragData: Component
  data: Component | null,
  config: {[key:string]: any}
  userData: {[key:string]: any}
}>()
const emit = defineEmits(['dragstart', 'selected'])
let stop: number | undefined

const forms = ref([] as Component[])

const computedStyle = computed(() => {
  const padding = props.config.padding.split(',')
  const paddingTop = padding[0]
  const paddingBottom = padding[2] || padding[0]
  return {
    paddingTop: paddingTop + 'px',
    paddingBottom: paddingBottom + 'px'
  }
})
const rules = computed(() => {
  return getRules(forms.value)
})

defineExpose({
  forms,
  handleDragend,
  setData
})

function setData(data: Component[]) {
  forms.value = data
}
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
function handleDragend() {
  setTimeout(() => {
    if(props.dragData) {
      forms.value = delObjectFromArray(forms.value, props.dragData, 'children', 'id')
      emit('dragstart', null)
    }
  })
}
function dragover(e: DragEvent) {
  e.preventDefault()
  if(stop) return
  forms.value = delObjectFromArray(forms.value, props.dragData, 'children', 'id')
  forms.value.push(props.dragData)
}
function rowDragover(data: Component, e: DragEvent) {
  e.stopPropagation()
  e.preventDefault()
  if(stop) return
  if(data.id === props.dragData.id) return
  stop = setTimeout(() => {
    stop = undefined
  }, 100)
  forms.value = delObjectFromArray(forms.value, props.dragData, 'children', 'id')
  const target = e.target as Element
  if(target?.getAttribute('drop')) {
    const index = data.container?.findIndex(r => {
      return r.el === target
    }) as number
    if(index > -1) {
      if(data.children[index] !== props.dragData) data.children[index] = props.dragData
    }
    return
  }
  const height = (e.target as HTMLElement).offsetHeight
  const offsetY = e.offsetY
  const index  = forms.value.indexOf(data)
  if(offsetY / height >= 0.5) forms.value.splice(index + 1, 0, props.dragData)
  else forms.value.splice(index, 0, props.dragData)
  forms.value = Array.from(forms.value)
}
function drop(e: DragEvent) {
  props.dragData.toggleDrag(false)
  forms.value = delObjectFromArray(forms.value, props.dragData, 'children', 'id')
  emit('dragstart', null)
  forms.value.push(props.dragData)
}
function rowDrop(data: Component, e: DragEvent) {
  e.stopPropagation()
  props.dragData.toggleDrag(false)
  emit('dragstart', null)
}
function render() {
  const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
  forms.value.forEach(item => {
    if(item.isDarg) return vnodes.push(renderDragPoint(item))
    else if(item.componentType === '表单组件') return vnodes.push(renderFormComponent(item))
    else if(item.componentType === '布局组件') return vnodes.push(renderLayoutComponent(item))
  })
  // @ts-ignore
  return h(ElForm, {
    model: props.userData,
    rules: rules.value,
    size: props.config.size,
    labelWidth: props.config.labelWidthModel === 'auto' ? 'auto' : props.config.labelWidth,
    labelPosition: props.config.labelPosition,
    labelSuffix: '：'
  }, { default: () => vnodes })
}
function renderFormComponent(data: Component) {
  const padding = props.config.padding.split(',')
  const paddingRight = padding[1] || padding[0]
  const paddingLeft = padding[3] || padding[1] || padding[0]
  return h(ElRow, {
    key: data.id + data.type,
    class: 'form-row',
    style: {
      paddingLeft: paddingLeft + 'px',
      paddingRight: paddingRight + 'px',
      paddingBottom: props.config.componentMargin + 'px',
      width: '100%'
    },
    ondragover: rowDragover.bind(null, data),
    ondrop: rowDrop.bind(null, data),
    draggable: 'true',
    ondragstart(e: Event) {
      e.stopPropagation()
      emit('dragstart', data)
      setTimeout(() => {
        data.toggleDrag(true)
      })
    },
    ondragend: handleDragend,
    onclick(e: Event) {
      e.stopPropagation()
      if(props.data?.id === data.id) emit('selected', {})
      else emit('selected', data)
    }
  }, { default: () => h(ElCol, {}, { default: () => [
    h(ElFormItem, {
      label: data.values.label,
      style: 'position: relative;',
      prop: data.values.modelValue
    }, { default: () => data.render(data, props.userData, renderFormComponent, renderLayoutComponent, props) }),
    h('div', {
      class: ['mark', data.id === props.data?.id ? 'selected' : '']
    })
  ]})})
}
function renderLayoutComponent(data: Component) {
  const padding = props.config.padding.split(',')
  const paddingRight = padding[1] || padding[0]
  const paddingLeft = padding[3] || padding[1] || padding[0]
  return h(ElRow, {
    key: data.id + data.type,
    class: 'form-row',
    style: {
      paddingLeft: paddingLeft + 'px',
      paddingRight: paddingRight + 'px',
      paddingBottom: props.config.componentMargin + 'px'
    },
    ondragover: rowDragover.bind(null, data),
    ondrop: rowDrop.bind(null, data),
    draggable: 'true',
    ondragstart() {
      emit('dragstart', data)
      setTimeout(() => {
        data.toggleDrag(true)
      })
    },
    ondragend: handleDragend,
    onclick(e: Event) {
      e.stopPropagation()
      if(props.data?.id === data.id) emit('selected', {})
      else emit('selected', data)
    }
  }, { default: () => [
    data.render(data, props.userData, renderFormComponent, renderLayoutComponent, props),
    h('div', {
      class: ['mark', data.id === props.data?.id ? 'selected' : '', 'group']
    })
  ]})
}
function renderDragPoint(data: Component) {
  return h('div', { class: 'point', ondragover: rowDragover.bind(null, data), ondrop: rowDrop.bind(null, data) })
}
</script>

<style lang="scss" scoped>
.content-edit-page {
  header {
    height: 46px;
    box-sizing: border-box;
  }
  main {
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    .el-form-item {
      margin-bottom: 0;
    }
    .mark {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid $theme;
      border-style: dotted;
      box-sizing: border-box;
      cursor: pointer;
      z-index: 99;
    }
    .mark.group {
      pointer-events: none;
    }
    .selected {
      border: 2px solid $theme;
    }
    .point {
      width: 100%;
      height: 10px;
      border-radius: 5px;
      background: $theme;
    }
  }
}
</style>