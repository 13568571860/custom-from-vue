<template>
  <component :is='renderAttrMenu()'></component>
</template>

<script setup lang="ts">
import { ref, computed, h, type RendererElement, type RendererNode, type VNode } from 'vue'
import type { AttrMenu, Menu } from './type'
import { ElButton, ElCol, ElInput, ElInputNumber, ElRadio, ElRadioGroup, ElRow, ElTooltip } from 'element-plus'

const props = defineProps<{
  data: Menu,
  modelValue: { [key:string]:any }[]
}>()
const emit = defineEmits(['update:modelValue'])

const writeData = computed({
  get() {
    return props.modelValue
  },
  set(value: { [key: string]: any }[]) {
    if(value.length === 0) return emit('update:modelValue', [{}])
    return value
  }
})

function renderAttrMenu() {
  const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
  vnodes.push(...renderAttrItem(props.data.props?.for as AttrMenu[], writeData.value))
  return h('div', { class: 'attr_menu' }, vnodes)
}
// 渲染属性栏表单
function renderAttrItem(data: AttrMenu[], values: { [key:string]: any }[]) {
  const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
  if(!Array.isArray(data)) return []
  values.forEach((value) => {
    const group: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
    data.forEach((item) => {
      const children: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
      item.input.forEach(r => {
        if(r.show) {
          const exp = r.show?.replace(/\{[^\}]+\}/g, function(reg, i, str) {
            const key = reg.replace(/\{([^\}]+)\}/, '$1')
            return typeof value[key] === 'string' ? `'${value[key]}'` : value[key]
          })
          if(!eval(exp)) return
        }
        if(r.component === 'ElRadio') children.push(renderRadio(r, value))
        else if(r.component === 'ElInputNumber') children.push(renderInputNumber(r, value))
        else if(r.component === 'ElInput') children.push(renderInput(r, value))
      })
      children.unshift(h('h4', {}, { default: () => {
        const label: any[] = [item.label + '：']
        if(item.tip) {
          if(typeof item.tip === 'string') {
            label.push(h(ElTooltip, { placement: 'top', effect: 'light', content: item.tip, rawContent: item.rawContent }, { default: () => {
              return h('i', { class: 'iconfont icon-tip' })
            }}))
          } else {
            // @ts-ignore
            label.push(h(ElTooltip, { placement: 'top', effect: 'light', ...item.tip }, { default: () => {
              return h('i', { class: 'iconfont icon-tip' })
            }}))
          }
        }
        return label
      }}))
      group.push(h(ElRow, { class: 'attrRow' }, { default: () => {
        return [h(ElCol, { span: 2 }), h(ElCol, { span:22 }, { default: () => children })]
      }}))
    })
    group.push(h(ElRow, { class: 'controls' }, { default: () => {
      return [
        h(ElButton, { text: true, type: 'primary', onClick() {
          writeData.value.splice(writeData.value.indexOf(value) + 1, 0, getDefault(data))
          emit('update:modelValue', writeData.value)
        }}, { default: () => '添加' }),
        h(ElButton, { text: true, type: 'danger', onClick() {
          const arr = writeData.value.filter(r => r !== value)
          emit('update:modelValue', arr)
        }}, { default: () => '删除' })
      ]
    }}))
    vnodes.push(h(ElRow, { class: 'group' }, { default: () => group }))
  })
  return vnodes
}
function renderRadio(data: Menu, values: { [key:string]: any }) {
  return h(ElRadioGroup, { modelValue: values[data.key], 'onUpdate:modelValue': (value) => values[data.key] = value }, {default: () => {
    const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
    data.select?.forEach(item => {
      vnodes.push(h(ElRadio, { label: item.key }, {default: () => item.label}))
    })
    return vnodes
  }})
}
function renderInputNumber(data: Menu, values: { [key:string]: any }) {
  return h(ElInputNumber, { modelValue: values[data.key], 'onUpdate:modelValue': (value) => values[data.key] = value, ...data.props })
}
function renderInput(data: Menu, values: { [key:string]: any }) {
  return h(ElInput, { modelValue: values[data.key], 'onUpdate:modelValue': (value) => values[data.key] = value, ...data.props })
}
function getDefault(data: AttrMenu[]) {
  const def: { [key:string]: any } = {}
  data.forEach(item => {
    item.input.forEach(r => {
      def[r.key] = r.default
    })
  })
  return def
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  width: 100%;
  h4 {
    margin-bottom: 4px;
    font-weight: 400;
  }
}
.tip {
  font-size: 12px;
  color: $minor;
}
.group {
  border-left: 1px solid $border;
}
.controls {
  flex: 1;
  margin-bottom: 0;
  justify-content: flex-end;
}
</style>