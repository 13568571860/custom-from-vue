import { h } from 'vue'
import type { Component, ComponentAttr } from "./type"
import { ElButton, ElIcon, ElMessage, ElUpload } from 'element-plus'
import httpMethod from '@/config/httpMethod'
import { Plus } from '@element-plus/icons-vue'

class UploadForm implements Component {
  readonly type = 'upload'
  static type = 'upload'
  readonly title = '上传按钮'
  readonly icon = '&#xe600;'
  static title = '上传按钮'
  static icon = '&#xe600;'
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
            default: '上传',
            key: 'label',
          }
        ]
      },
      {
        label: '按钮名',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入按钮名'
            },
            default: '上传',
            key: 'buttonLabel',
          }
        ]
      },
      {
        label: '上传提示',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入上传提示'
            },
            default: '上传',
            key: 'tip',
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
        label: '文件列表的类型',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {},
            select: [
              {
                label: 'text',
                key: 'text'
              },
              {
                label: 'picture',
                key: 'picture'
              },
              {
                label: 'picture-card',
                key: 'picture-card'
              }
            ],
            default: 'text',
            key: 'listType'
          }
        ]
      },
      {
        label: '请求url',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {},
            default: '',
            key: 'action'
          }
        ]
      },
      {
        label: '请求方法',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {
              placeholder: '请选择请求方法'
            },
            select: httpMethod,
            default: 'POST',
            key: 'method',
          }
        ]
      },
      {
        label: '上传的文件字段名',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {},
            default: 'file',
            key: 'name'
          }
        ]
      },
      {
        label: '取值字段',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '取值字段，点号分隔',
            },
            default: '',
            key: 'http_value'
          }
        ]
      },
      {
        label: '请求头参数',
        input: [
          {
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
            key: 'http_header_list'
          }
        ]
      },
      {
        label: '上传时附带的额外参数',
        input: [
          {
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
            key: 'http_data_list'
          }
        ]
      },
      {
        label: '是否支持多选文件',
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
        label: '允许上传文件的最大数量',
        input: [
          {
            component: 'ElInputNumber',
            type: 'string',
            props: {
              placeholder: '请输入数量'
            },
            default: null,
            key: 'limit',
          }
        ]
      },
      {
        label: '是否发送cookie凭证',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'withCredentials'
          }
        ]
      },
      {
        label: '是否显示已上传文件列表',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: true,
            key: 'showFileList'
          }
        ]
      },
      {
        label: '是否启用拖拽上传',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'drag'
          }
        ]
      },
      {
        label: '接受上传的文件类型',
        tip: '文件后缀名，以英文逗号分隔',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {},
            default: null,
            key: 'accept'
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
      disabled,
      validateEvent,
      listType,
      action,
      method,
      name,
      http_header_list,
      http_data_list,
      multiple,
      limit,
      withCredentials,
      showFileList,
      drag,
      accept
    } = component.values
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    const headers = this.getHeaders(http_header_list)
    const datas = this.getDatas(http_data_list)
    const that = this
    return h(ElUpload, {
      disabled,
      validateEvent,
      listType,
      action,
      method,
      name,
      headers,
      data: datas,
      multiple,
      limit,
      withCredentials,
      showFileList,
      drag,
      accept,
      onError(error: Error) {
        ElMessage.error(error.message)
      },
      onSuccess(response) {
        const value = that.getValue(response)
        that.value = value
        data[component.values.modelValue] = that.value
      },
    }, { default: () => {
      if(listType === 'picture-card') return h(ElIcon, {}, { default: () => h(Plus) })
      else return h(ElButton, { type: 'primary', size: props.config.size }, { default: () => component.values.buttonLabel })
    }, tip: () => h('div', { class: 'el-upload__tip' }, component.values.tip)})
  }
  toggleDrag(val?: boolean) {
    if(typeof val === 'boolean') this.isDarg = val
    else this.isDarg = !this.isDarg
  }
  setData(val: any, key: string) {
    this.values[key] = val
  }
  getHeaders(headers: ({ http_header_key: string, http_header_value: string })[]) {
    headers = headers.filter(item => item.http_header_key)
    const h: {[key:string]: string} = {}
    headers.forEach(item => h[item.http_header_key] = item.http_header_value)
    return h
  }
  getDatas(headers: ({ http_data_key: string, http_data_value: string })[]) {
    headers = headers.filter(item => item.http_data_key)
    const h: {[key:string]: string} = {}
    headers.forEach(item => h[item.http_data_key] = item.http_data_value)
    return h
  }
  getValue(val: string | any) {
    if(typeof val === 'string') return val
    else {
      const key_path: string[] = this.values.http_value.split('.').filter((r: string) => r)
      let list = val
      key_path.forEach(r => list = val[r])
      return list as string
    }
  }
}

export default UploadForm