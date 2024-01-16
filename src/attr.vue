<template>
  <div class="attribute">
    <h3>表单配置</h3>
    <component :is='renderAttrMenu()'></component>
  </div>
</template>

<script setup lang="ts">
import commonConfig from './common'
import { ref, h, computed, type VNode, type RendererNode, type RendererElement, type Ref } from 'vue'
import type { AttrMenu, Component, Menu } from './components/type'
import { ElInput, ElRow, ElRadio, ElInputNumber, ElRadioGroup, ElTabs, ElTabPane, type TabPaneName, ElSelect, ElOption, ElTooltip, ElColorPicker } from 'element-plus'
import type { ComponentAttr } from './components/type'
import listInput from '@/components/listInput.vue'

const props = defineProps<{
  data: Component
  config: {[key:string]: any}
}>()

// 右侧属性栏对象
const configMenu = computed(() => {
  if(props.data.id) return props.data.attribute
  else return commonConfig
})

// 渲染右侧属性栏
function renderAttrMenu() {
  const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
  if(Array.isArray(configMenu.value)) {
    vnodes.push(...renderAttrItem(configMenu.value, props.config))
  } else {
    vnodes.push(renderTabs())
  }
  return h('div', { class: 'attr_menu' }, vnodes)
}
// 渲染tab标签
function renderTabs() {
  let tabPisition = Object.keys(configMenu.value)[0] as TabPaneName
  return h(ElTabs, { type: 'card', modelValue: tabPisition, 'onUpdate:modelValue': (value) => tabPisition = value}, { default: () => {
    const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
      for(let i in configMenu.value) {
        vnodes.push(h(ElTabPane, { label: i, name: i }, { default: () => renderAttrItem((configMenu.value as ComponentAttr)[i], props.data.values) }))
      }
      return vnodes
  }})
}
// 渲染属性栏表单
function renderAttrItem(data: AttrMenu[], values: { [key:string]: any }) {
  const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
  if(!Array.isArray(data)) return[]
  data.forEach(item => {
    const children: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
    item.input.forEach(r => {
      if(r.show) {
        const exp = r.show?.replace(/\{[^\}]+\}/g, function(reg, i, str) {
          const key = reg.replace(/\{([^\}]+)\}/, '$1')
          return typeof values[key] === 'string' ? `'${values[key]}'` : values[key]
        })
        if(!eval(exp)) return
      }
      if(r.component === 'ElRadio') children.push(renderRadio(r, values))
      else if(r.component === 'ElInputNumber') children.push(renderInputNumber(r, values))
      else if(r.component === 'ElInput') children.push(renderInput(r, values))
      else if(r.component === 'listInput') children.push(renderListInput(r, values))
      else if(r.component === 'ElSelect') children.push(renderElSelect(r, values))
      else if(r.component === 'ElColorPicker') children.push(renderElColorPicker(r, values))
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
    } }))
    vnodes.push(h(ElRow, { class: 'attrRow' }, { default: () => children }))
  })
  return vnodes
}
function renderRadio(data: Menu, values: { [key:string]: any }) {
  return h(ElRadioGroup, { modelValue: values[data.key], 'onUpdate:modelValue': (value) => values[data.key] = value, ...data.props }, {default: () => {
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
function renderListInput(data: Menu, values: { [key:string]: any }) {
  if(!Array.isArray(values[data.key])) values[data.key] = [getDefault(data.props?.for)]
  else if(values[data.key].length === 0) values[data.key] = [getDefault(data.props?.for)]
  return h(listInput, { data, modelValue: values[data.key], 'onUpdate:modelValue': (value: any) => values[data.key] = value })
}
function renderElSelect(data: Menu, values: { [key:string]: any }) {
  return h(ElSelect, { modelValue: values[data.key], 'onUpdate:modelValue': (value) => values[data.key] = value, ...data.props }, { default: () => {
    const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
    data.select?.forEach(item => {
      vnodes.push(h(ElOption, { label: item.label, value: item.key, key: item.label }))
    })
    return vnodes
  }})
}
function renderElColorPicker(data: Menu, values: { [key:string]: any }) {
  return h(ElColorPicker, { modelValue: values[data.key], 'onUpdate:modelValue': (value) => values[data.key] = value, ...data.props })
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
.attribute {
  width: 300px;
  h3 {
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid $border;
  }
  .el-tabs {
    height: 100%;
  }
  .el-tab-pane {
    overflow-y: auto;
  }
  .attr_menu {
    padding: 10px;
    height: calc(100% - 40px);
    box-sizing: border-box;
    h4 {
      width: 100%;
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 4px;
    }
    .tip {
      font-size: 12px;
      color: $minor;
    }
    .attrRow {
      margin-bottom: 10px;
      font-size: 14px;
      border-bottom: 1px solid $border;
      padding-bottom: 4px;
    }
  }
}
</style>

<style lang="scss">
.attribute {
  .el-tabs {
    .el-tabs__content {
      height: calc(100% - 55px);
      overflow-y: auto;
    }
  }
  .textLeft {
    input {
      text-align: left;
    }
  }
}
</style>