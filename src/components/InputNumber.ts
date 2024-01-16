import { h } from 'vue'
import type { Component, AttrMenu, ComponentAttr } from "./type"
import { ElInputNumber } from 'element-plus'
import { computedUserData } from '@/utils/utils'
import icons from '@/icon/element_icon'
import formatList from '@/config/format'

class InputNumberForm implements Component {
  readonly type = 'inputNumber'
  static type = 'inputNumber'
  static title = '数字输入'
  static icon = '&#xe69c;'
  readonly title = '数字输入'
  readonly icon = '&#xe69c;'
  readonly componentType = '表单组件'
  static componentType = '表单组件'
  value: number | undefined
  isDarg = false
  children = []
  props = {}
  id?: string | undefined
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
            default: '输入框',
            key: 'label',
          }
        ]
      },
      {
        label: '输入框占位文本',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {},
            default: '请输入',
            key: 'placeholder'
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
        label: '设置计数器允许的最小值',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {},
            default: -Infinity,
            key: 'min'
          }
        ]
      },
      {
        label: '设置计数器允许的最大值',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {},
            default: Infinity,
            key: 'max'
          }
        ]
      },
      {
        label: '计数器步长',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {},
            default: 1,
            key: 'step'
          }
        ]
      },
      {
        label: '是否只能输入步长的倍数',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'stepStrictly'
          }
        ]
      },
      {
        label: '数值精度',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {},
            default: Infinity,
            key: 'precision'
          }
        ]
      },
      {
        label: '是否只读',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'readonly'
          }
        ]
      },
      {
        label: '是否禁用状态',
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
        label: '是否使用控制按钮',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: true,
            key: 'controls'
          }
        ]
      },
      {
        label: '输入时是否触发表单的校验',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'validateEvent'
          }
        ]
      }
    ] as AttrMenu[],
    计算属性: [
      {
        label: '数据计算',
        input: [
          {
            component: 'listInput',
            type: 'any',
            props: {
              for: [
                {
                  label: '绑定id',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入绑定id'
                      },
                      default: '',
                      key: 'bindKey'
                    }
                  ]
                },
                {
                  label: '计算公式',
                  tip: '变量以大括号{变量名}形式填充',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入简单计算式'
                      },
                      default: '',
                      key: 'formula'
                    }
                  ]
                }
              ]
            },
            default: [],
            key: 'for'
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
      min,
      max,
      step,
      stepStrictly,
      precision,
      readonly,
      disabled,
      controls,
      validateEvent,
      placeholder
    } = component.values
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    return h(ElInputNumber, {
      modelValue: this.value,
      'onUpdate:modelValue': value => {
        this.value = value
        if(component.values.modelValue) {
          data[component.values.modelValue] = this.value
        }
      },
      onInput(val) {
        const { attribute, values } = component
        if(values.for && Array.isArray(values.for) && attribute.计算属性 && Array.isArray(attribute.计算属性)) {
          values.for.forEach(item => {
            if(item.bindKey) data[attribute.计算属性[0].input[0].key] = computedUserData(data, item)
          })
        }
      },
      min: isNaN(min) || min == null ? -Infinity : min,
      max: isNaN(max) || max == null ? Infinity : max,
      step,
      stepStrictly,
      precision,
      readonly,
      disabled,
      controls,
      validateEvent,
      placeholder
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

export default InputNumberForm
