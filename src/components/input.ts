import { h } from 'vue'
import type { Component, AttrMenu, ComponentAttr } from "./type"
import { ElInput } from 'element-plus'
import { computedUserData, formatDateShow } from '@/utils/utils'
import icons from '@/icon/element_icon'
import formatList from '@/config/format'

class InpurForm implements Component {
  readonly type = 'input'
  static type = 'input'
  static title = '输入框'
  static icon = '&#xe60e;'
  readonly title = '输入框'
  readonly icon = '&#xe60e;'
  readonly componentType = '表单组件'
  static componentType = '表单组件'
  value = ''
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
        label: '组件类型',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {},
            select: [{ label: '输入框', key: 'text' }, { label: '文本域', key: 'textarea' }, { label: '密码', key: 'password' }, { label: '邮箱', key: 'email' }, { label: 'url', key: 'url' }],
            default: 'text',
            key: 'type',
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
        label: '最大输入长度',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {
              controls: false,
              class: 'textLeft',
              placeholder: '请输入最大输入长度'
            },
            default: -1,
            key: 'maxlength'
          }
        ]
      },
      {
        label: '最小输入长度',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {
              controls: false,
              class: 'textLeft',
              placeholder: '请输入最小输入长度'
            },
            default: -1,
            key: 'minlength'
          }
        ]
      },
      {
        label: '是否显示统计字数',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'showWordLimit'
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
        label: '是否显示清除按钮',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'clearable'
          }
        ]
      },
      {
        label: '指定输入值的格式',
        tip: '只有当type是"输入框"时才能工作',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {},
            select: formatList,
            default: '',
            key: 'formatter'
          },
          {
            component: 'ElInput',
            type: 'string',
            props: {
              type: 'textarea',
              placeholder: '(row: any) => string\n示例：\nconst value = Number(row.value)\nreturn value',
              autosize: { minRow: 4 },
              style: 'margin-top: 4px;'
            },
            default: '',
            key: 'customInput',
            show: '{formatter} === "custom"'
          }
        ]
      },
      {
        label: '指定从格式化器输入中提取的值',
        tip: '只有当type是"输入框"时才能工作',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {},
            select: [
              {
                label: '日期转时间戳',
                key: 'date'
              },
              {
                label: '自定义',
                key: 'custom'
              }
            ],
            default: '',
            key: 'parser'
          },
          {
            component: 'ElInput',
            type: 'string',
            props: {
              type: 'textarea',
              placeholder: '(row: any) => string\n示例：\nconst value = Number(row.value)\nreturn value',
              autosize: { minRow: 4 },
              style: 'margin-top: 4px;'
            },
            default: '',
            key: 'customParser',
            show: '{parser} === "custom"'
          }
        ]
      },
      {
        label: '是否显示切换密码图标',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'showPassword'
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
        label: '自定义前缀图标',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {
              filterable: true
            },
            select: icons,
            default: '',
            key: 'prefixIcon'
          },
          {
            component: 'ElInput',
            type: 'string',
            props: {
              style: 'margin-top: 10px;'
            },
            default: 'other',
            key: 'prefixIconOther',
            show: '{prefixIcon} === "other"'
          }
        ]
      },
      {
        label: '	自定义后缀图标',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {
              filterable: true
            },
            select: icons,
            default: '',
            key: 'suffixIcon'
          },
          {
            component: 'ElInput',
            type: 'string',
            props: {
              style: 'margin-top: 10px;'
            },
            default: 'other',
            key: 'suffixIconOhter',
            show: '{suffixIcon} === "other"'
          }
        ]
      },
      {
        label: '输入框行数',
        tip: '仅type为\'textarea\'时有效',
        input: [
          {
            component: 'ElInputNumber',
            type: 'string',
            props: {
              placeholder: '请输入行数',
              style: 'width: 100%;'
            },
            default: null,
            key: 'rows'
          }
        ]
      },
      {
        label: 'textarea高度是否自适应',
        tip: '仅type为 \'textarea\'时生效。填写输入框行数后是否选项失效',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {
              style: 'width: 100%;'
            },
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'autosize'
          },
          {
            component: 'ElInputNumber',
            type: 'string',
            props: {
              placeholder: '请输入最小行数',
              style: 'width: 100%;'
            },
            default: null,
            key: 'minRows'
          },
          {
            component: 'ElInputNumber',
            type: 'string',
            props: {
              placeholder: '请输入最大行数',
              style: 'margin-top: 4px; width: 100%;'
            },
            default: null,
            key: 'maxRows'
          }
        ]
      },
      {
        label: '是否提供输入建议',
        tip: '由浏览器根据输入习惯提供参考建议',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: 'on' }, { label: '否', key: 'off' }],
            default: 'off',
            key: 'autocomplete'
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
        label: '是否自动获取焦点',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'autofocus'
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
      maxlength,
      minlength,
      type,
      showWordLimit,
      placeholder,
      clearable,
      formatter,
      customInput,
      parser,
      customParser,
      showPassword,
      disabled,
      prefixIcon,
      prefixIconOther,
      suffixIcon,
      suffixIconOther,
      rows,
      autosize,
      minRows,
      maxRows,
      autocomplete,
      readonly,
      autofocus,
      validateEvent
    } = component.values
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    return h(ElInput, {
      modelValue: this.value,
      'onUpdate:modelValue': (value: string) => {
        this.value = value
        if(component.values.modelValue) {
          data[component.values.modelValue] = this.value
        }
      },
      onInput(val: string) {
        const { attribute, values } = component
        if(values.for && Array.isArray(values.for) && attribute.计算属性 && Array.isArray(attribute.计算属性)) {
          values.for.forEach(item => {
            if(item.bindKey) data[attribute.计算属性[0].input[0].key] = computedUserData(data, item)
          })
        }
      },
      type,
      maxlength,
      minlength,
      showWordLimit,
      placeholder,
      clearable,
      disabled,
      prefixIcon: (prefixIcon && (icons.find(r => r.key === prefixIcon) ? icons.find(r => r.key === prefixIcon)?.icon : prefixIconOther)),
      suffixIcon: (suffixIcon && (icons.find(r => r.key === suffixIcon) ? icons.find(r => r.key === suffixIcon)?.icon : suffixIconOther)),
      rows,
      autosize: minRows || maxRows ? { minRows, maxRows } : autosize,
      autocomplete,
      readonly,
      autofocus,
      validateEvent,
      showPassword,
      formatter(value: string) {
        if(formatter === 'date') return formatDateShow(value)
        else if(formatter === 'datatime') return formatDateShow(value, true)
        else if(formatter === 'upper') return value.toLocaleUpperCase()
        else if(formatter === 'lower') return value.toLocaleLowerCase()
        else if(formatter === 'trimStart') return value.trimStart()
        else if(formatter === 'trimEnd') return value.trimEnd()
        else if(formatter === 'trim') return value.trim()
        else if(formatter === 'A_') return value.replace(/[A-Z]/g, (e: string) => '_' + e.toLocaleLowerCase()).replace(/^_/, '')
        else if(formatter === '_A') return value.replace(/_[a-z]/g, (e: string) => e.replace('_', '').toLocaleUpperCase())
        else if(formatter === 'custom') return eval(customInput)
        else return value
      },
      parser(value: string) {
        if(parser === 'date') return +new Date(value)
        else if(parser === 'customParser') return eval(customInput)
        else return value
      }
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

export default InpurForm
