import { h, type RendererElement, type RendererNode, type VNode } from 'vue'
import type { Component, ComponentAttr } from "./type"
import { ElRadio, ElRadioButton, ElRadioGroup } from 'element-plus'

class RadioForm implements Component {
  readonly type = 'radio'
  static type = 'radio'
  readonly title = '单选框'
  readonly icon = '&#xe640;'
  static title = '单选框'
  static icon = '&#xe640;'
  readonly componentType = '表单组件'
  static componentType = '表单组件'
  isDarg = false
  children = []
  props = {}
  value: string | number | boolean = ''
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
        label: '组件类型',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {},
            select: [{ label: '标签', key: 'ElRadio' }, { label: '按钮', key: 'ElRadioButton' }],
            default: 'ElRadio',
            key: 'type'
          }
        ],
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
            default: '单选框',
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
        label: '按钮形式的Radio激活时的文本颜色',
        input: [
          {
            component: 'ElColorPicker',
            type: 'string',
            props: {},
            default: '#ffffff',
            key: 'textColor'
          }
        ]
      },
      {
        label: '按钮形式的Radio激活时的填充色和边框色',
        input: [
          {
            component: 'ElColorPicker',
            type: 'string',
            props: {},
            default: '#409EFF',
            key: 'fill'
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
      }
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
                }
              ]
            },
            default: [
              {
                label: '选项1',
                value: '选项1',
                disabed: false
              }
            ],
            key: 'radioList'
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
      textColor,
      fill,
      disabled
    } = component.values
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    return h(ElRadioGroup, {
      modelValue: this.value,
      'onUpdate:modelValue': value => {
        this.value = value
        if(component.values.modelValue) {
          data[component.values.modelValue] = this.value
        }
      },
      textColor,
      fill,
      disabled
    }, { default: () => {
      const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
      component.values.radioList.forEach((item: any) => {
        vnodes.push(h(eval(component.values.type), {
          label: item.value,
          disabled: item.disabled,
          checked: item.checked,
          border: item.border
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

export default RadioForm