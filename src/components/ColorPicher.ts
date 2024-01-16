import { h, type RendererElement, type RendererNode, type VNode } from 'vue'
import type { Component, ComponentAttr } from "./type"
import { ElColorPicker } from 'element-plus'

class ColorPicherForm implements Component {
  readonly type = 'colorPicher'
  static type = 'colorPicher'
  readonly title = '取色器'
  readonly icon = '&#xe63d;'
  static title = '取色器'
  static icon = '&#xe63d;'
  readonly componentType = '表单组件'
  static componentType = '表单组件'
  isDarg = false
  children = []
  props = {}
  value: string = ''
  id?: string | undefined;
  values: { [key:string]: any } = {}
  readonly attribute = {
    组件属性: [
      {
        label: '绑定id',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入绑定字段id'
            },
            default: '',
            key: 'modelValue',
          }
        ]
      },
      {
        label: '标签名',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入标签名'
            },
            default: '取色器',
            key: 'label',
          }
        ]
      },
      {
        label: '是否必填',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'isRequired'
          }
        ]
      },
      {
        label: '表单验证',
        tip: '支持正则表达式验证或表达式，表达式变量为{value}',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {},
            default: '',
            key: 'vaild'
          }
        ]
      },
      {
        label: '是否禁用',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'disabled'
          }
        ]
      },
      {
        label: '是否支持透明度选择',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'showAlpha'
          }
        ]
      },
      {
        label: '颜色的格式',
        input: [
          {
            component: 'ElSelect',
            type: 'boolean',
            props: {},
            select: [{ label: 'hsl', key: 'hsl' }, { label: 'hsv', key: 'hsv' }, { label: 'hex', key: 'hex' }, { label: 'rgb', key: 'rgb' }],
            default: 'hex',
            key: 'colorFormat'
          }
        ]
      },
      // {
      //   label: '预定义颜色',
      //   input: [
      //     {
      //       component: 'ElColorPicher',
      //       type: 'string',
      //       props: {},
      //       default: '',
      //       key: 'predefine'
      //     }
      //   ]
      // },
      {
        label: '输入时是否触发表单的校验',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: true,
            key: 'validateEvent'
          }
        ]
      }
    ]
  }
  constructor() {
    this.__init__()
  }
  __init__() {
    for(let i in this.attribute) {
      (this.attribute as ComponentAttr)[i].forEach(item => {
        item.input.forEach(r => {
          this.setData(r.default, r.key)
        })
      })
    }
  }
  render(component: Component, data: {[key:string]: any}) {
    const {
      showAlpha,
      colorFormat,
      disabled,
      // predefine,
      validateEvent
    } = component.values
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    return h(ElColorPicker, {
      modelValue: this.value,
      'onUpdate:modelValue': value => {
        this.value = value as string
        console.log(this.value)
        if(component.values.modelValue) {
          data[component.values.modelValue] = this.value
        }
      },
      showAlpha,
      colorFormat,
      disabled,
      // predefine,
      validateEvent,
      key: component.id + colorFormat
    })
  }
  toggleDrag(val?: boolean) {
    if(typeof val === 'boolean') this.isDarg = val
    else this.isDarg = !this.isDarg
  }
  setData(val: any, key: string) {
    this.values[key] = val
  }
}

export default ColorPicherForm