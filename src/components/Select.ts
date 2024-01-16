import { h, type RendererElement, type RendererNode, type VNode } from 'vue'
import type { Component, ComponentAttr } from "./type"
import { ElOption, ElSelect } from 'element-plus'
import httpMethod from '@/config/httpMethod'
import axios from 'axios'

class SelectForm implements Component {
  readonly type = 'select'
  static type = 'select'
  readonly title = '下拉框'
  readonly icon = '&#xe611;'
  static title = '下拉框'
  static icon = '&#xe611;'
  readonly componentType = '表单组件'
  static componentType = '表单组件'
  private isHttp = false
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
      // {
      //   label: '组件类型',
      //   input: [
      //     {
      //       component: 'ElSelect',
      //       type: 'string',
      //       props: {},
      //       select: [{ label: '标签', key: 'ElRadio' }, { label: '按钮', key: 'ElRadioButton' }],
      //       default: 'ElRadio',
      //       key: 'type'
      //     }
      //   ],
      // },
      {
        label: '标签名',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入标签名'
            },
            default: '下拉框',
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
        label: '是否多选',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'multiple'
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
        label: '是否可以清空选项',
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
        label: '多选时是否将选中值按文字的形式展示',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'collapseTags'
          }
        ]
      },
      {
        label: '是否显示所有选中的标签。',
        tip: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'collapseTagsTooltip'
          }
        ]
      },
      {
        label: '多选数量限制',
        tip: 'multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {},
            default: 0,
            key: 'multipleLimit'
          }
        ]
      },
      {
        label: 'Tooltip 主题',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: 'light', key: 'light' }, { label: 'dark', key: 'dark' }],
            default: 'light',
            key: 'effect'
          }
        ]
      },
      {
        label: '占位文字',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {},
            default: 'Select',
            key: 'placeholder'
          }
        ]
      },
      {
        label: 'Select 组件是否可筛选',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'filterable'
          }
        ]
      },
      {
        label: '是否允许用户创建新条目',
        tip: '只有当可筛选设置为 true 时才会生效。',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'allowCreate'
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
        label: '远程请求',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'http'

          },
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
            show: '!{http}',
            key: 'selectList'
          },
          {
            label: 'url',
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入请求远程地址',
              style: 'margin-top: 4px;'
            },
            default: '',
            key: 'url',
            show: '{http}'
          },
          {
            label: '请求方法',
            component: 'ElSelect',
            type: 'string',
            props: {
              placeholder: '请选择请求方法',
              style: 'margin-top: 4px;'
            },
            select: httpMethod,
            default: 'GET',
            key: 'method',
            show: '{http}'
          },
          {
            label: '取值字段',
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '取值字段，点号分隔',
              style: 'margin-top: 4px;'
            },
            default: '',
            key: 'http_value',
            show: '{http}'
          },
          {
            label: 'label字段',
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: 'label字段',
              style: 'margin-top: 4px;'
            },
            default: 'label',
            key: 'http_label',
            show: '{http}'
          },
          {
            label: 'key字段',
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: 'key字段',
              style: 'margin-top: 4px;'
            },
            default: 'key',
            key: 'http_key',
            show: '{http}'
          },
          {
            label: '请求头参数',
            component: 'listInput',
            type: 'any',
            props: {
              for: [
                {
                  label: 'key',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入key'
                      },
                      default: '',
                      key: 'http_header_key'
                    }
                  ]
                },
                {
                  label: 'value',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入value'
                      },
                      default: '',
                      key: 'http_header_value'
                    }
                  ]
                },
              ]
            },
            default: [
              {
                http_header_key: '',
                http_header_value: ''
              }
            ],
            show: '{http}',
            key: 'http_header_list'
          },
          {
            label: '请求体参数',
            component: 'listInput',
            type: 'any',
            props: {
              for: [
                {
                  label: 'key',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入key'
                      },
                      default: '',
                      key: 'http_data_key'
                    }
                  ]
                },
                {
                  label: 'value',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入value'
                      },
                      default: '',
                      key: 'http_data_value'
                    }
                  ]
                },
              ]
            },
            default: [
              {
                http_data_key: '',
                http_data_value: ''
              }
            ],
            show: '{http}',
            key: 'http_data_list'
          },
          {
            label: 'url参数',
            component: 'listInput',
            type: 'any',
            props: {
              for: [
                {
                  label: 'key',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入key'
                      },
                      default: '',
                      key: 'http_url_key'
                    }
                  ]
                },
                {
                  label: 'value',
                  input: [
                    {
                      component: 'ElInput',
                      type: 'string',
                      props: {
                        placeholder: '请输入value'
                      },
                      default: '',
                      key: 'http_url_value'
                    }
                  ]
                },
              ]
            },
            default: [
              {
                http_url_key: '',
                http_url_value: ''
              }
            ],
            show: '{http}',
            key: 'http_url_list'
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
  render(component: Component, data: {[key:string]: any}, renderFormComponent: Function, renderLayoutComponent: Function, props: any) {
    const {
      multiple,
      clearable,
      disabled,
      collapseTags,
      collapseTagsTooltip,
      multipleLimit,
      effect,
      placeholder,
      filterable,
      allowCreate,
      validateEvent
    } = component.values
    if(this.values.http) this.getHttp()
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    return h(ElSelect, {
      modelValue: this.value,
      'onUpdate:modelValue': value => {
        this.value = value
        if(component.values.modelValue) {
          data[component.values.modelValue] = this.value
        }
      },
      multiple,
      clearable,
      disabled,
      collapseTags,
      collapseTagsTooltip,
      multipleLimit,
      effect,
      placeholder,
      filterable,
      allowCreate,
      validateEvent
    }, { default: () => {
      const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
      component.values.selectList.forEach((item: any) => {
        vnodes.push(h(ElOption, {
          label: item.label,
          value: item.value,
          disabled: item.disabled,
        }))
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
  getListData() {
    this.isHttp = false
    if(this.values.http) this.getHttp()
  }
  private getHttp() {
    if(this.isHttp) return
    this.isHttp = true
    const headers: {[key:string]: string} = {}
    this.values.http_header_list.forEach((item: { http_header_key: string, http_header_value: string }) => {
      if(item.http_header_key && item.http_header_value) {
        headers[item.http_header_key] = item.http_header_value
      }
    })
    const datas: {[key:string]: string} = {}
    this.values.http_data_list.forEach((item: { http_data_key: string, http_data_value: string }) => {
      if(item.http_data_key && item.http_data_value) {
        datas[item.http_data_key] = item.http_data_value
      }
    })
    const urls: {[key:string]: string} = {}
    this.values.http_url_list.forEach((item: { http_url_key: string, http_url_value: string }) => {
      if(item.http_url_key && item.http_url_value) {
        urls[item.http_url_key] = item.http_url_value
      }
    })
    axios({
      url: this.values.url,
      method: this.values.method,
      headers,
      data: datas,
      params: urls
    }).then((res: any) => {
      res = res.data
      const key_path: string[] = this.values.http_value.split('.').filter((r: string) => r)
      let list = res as {[key:string]: any}
      key_path.forEach(r => list = res[r])
      this.values.selectList = []
      if(Array.isArray(list)) {
        list.forEach(item => {
          this.values.selectList.push({
            label: item[this.values.http_label],
            value: item[this.values.http_key]
          })
        })
      }
    })
  }
}

export default SelectForm