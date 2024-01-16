import { h, type RendererElement, type RendererNode, type VNode } from 'vue'
import type { Component, ComponentAttr } from './type'
import { ElCheckbox, ElCheckboxGroup, type CheckboxGroupValueType } from 'element-plus'

class CheckboxForm implements Component {
  readonly type = 'checkbox'
  static type = 'checkbox'
  readonly title = '复选框'
  readonly icon = '&#xee34;'
  static title = '复选框'
  static icon = '&#xee34;'
  readonly componentType = '表单组件'
  static componentType = '表单组件'
  isDarg = false
  children = []
  props = {}
  value: CheckboxGroupValueType = []
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
            default: '复选框',
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
        label: '可被勾选的 checkbox 的最小数量',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {},
            default: undefined,
            key: 'min'
          }
        ]
      },
      {
        label: '可被勾选的 checkbox 的最大数量',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {},
            default: undefined,
            key: 'max'
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
      },
    ],
    子项属性: [
      {
        label: 'checkbox',
        input: [
          {
            component: 'listInput',
            type: 'any',
            props: {
              for: [
                {
                  label: '选项名',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入选项名'
                      },
                      default: 'default',
                      key: 'label'
                    }
                  ]
                },
                {
                  label: '选中的值',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入选中的值'
                      },
                      default: 'default',
                      key: 'value'
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
                  label: '默认是否勾选',
                  input: [
                    {
                      component: 'ElRadio',
                      type: 'boolean',
                      props: {},
                      select: [{ label: '是', key: true }, { label: '否', key: false }],
                      default: false,
                      key: 'checked'
                    }
                  ]
                },
                {
                  label: '是否显示边框',
                  input: [
                    {
                      component: 'ElRadio',
                      type: 'boolean',
                      props: {},
                      select: [{ label: '是', key: true }, { label: '否', key: false }],
                      default: false,
                      key: 'border'
                    }
                  ]
                },
                {
                  label: '设置不确定状态',
                  input: [
                    {
                      component: 'ElRadio',
                      type: 'boolean',
                      props: {},
                      select: [{ label: '是', key: true }, { label: '否', key: false }],
                      default: false,
                      key: 'indeterminate'
                    }
                  ]
                },
              ]
            },
            default: [
              {
                label: '选项1',
                value: '选项2',
                disabed: false
              }
            ],
            key: 'checkList'
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
      disabled,
      validateEvent
    } = component.values
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    return h(ElCheckboxGroup, {
      modelValue: this.value,
      'onUpdate:modelValue': value => {
        this.value = value
        if(component.values.modelValue) {
          data[component.values.modelValue] = this.value
        }
      },
      disabled,
      validateEvent
    }, { default: () => {
      const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
      component.values.checkList.forEach((item: any) => {
        vnodes.push(h(ElCheckbox, {
          label: item.value,
          disabled: item.disabled,
          checked: item.checked,
          border: item.border,
          indeterminate: item.indeterminate
        }, { default: () => item.label }))
      })
      return vnodes
    }})
  }
  toggleDrag(val?: boolean) {
    if(typeof val === 'boolean') this.isDarg = val
    else this.isDarg = !this.isDarg
  }
  setData(val: any, key: string) {
    this.values[key] = val
  }
}

export default CheckboxForm