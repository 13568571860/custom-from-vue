import { h } from 'vue'
import type { Component, ComponentAttr } from "./type"
import { ElDatePicker, type ElTooltipProps } from 'element-plus'
import { computedUserData, formatDateShow } from '@/utils/utils'
import icons from '@/icon/element_icon'

class DatePickerForm implements Component {
  readonly type = 'dataPicker'
  static type = 'dataPicker'
  readonly title = '日期选择器'
  readonly icon = '&#xe9ab;'
  static title = '日期选择器'
  static icon = '&#xe9ab;'
  readonly componentType = '表单组件'
  static componentType = '表单组件'
  isDarg = false
  children = []
  props = {}
  value: string | number = ''
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
            select: [
              {
                label: '年',
                key: 'year'
              },
              {
                label: '年/月',
                key: 'month'
              },
              {
                label: '日期',
                key: 'date'
              },
              {
                label: '日期(多选)',
                key: 'dates'
              },
              {
                label: '日期时间',
                key: 'datetime'
              },
              {
                label: '周',
                key: 'week'
              },
              {
                label: '日期时间范围',
                key: 'datetimerange'
              },
              {
                label: '日期范围',
                key: 'daterange'
              },
              {
                label: '年/月范围',
                key: 'monthrange'
              }
            ],
            default: 'date',
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
            default: '日期',
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
        label: '日期格式化',
        tip: {
          content: '<table><tr><th>格式</th><th>含义</th></tr><tr><td>YY</td><td>两位数年份</td></tr><tr><td>M</td><td>月份(不补零)</td></tr><tr><td>MM</td><td>月份</td></tr><tr><td>MMM</td><td>月份英文缩写</td></tr><tr><td>MMMM</td><td>月份完整英文名</td></tr><tr><td>D</td><td>某日(不补零)</td></tr><tr><td>DD</td><td>某日</td></tr><tr><td>d</td><td>星期几(0为星期天)</td></tr><tr><td>dd</td><td>星期几最小缩写</td></tr><tr><td>ddd</td><td>星期几的简称</td></tr><tr><td>dddd</td><td>星期几的完整英文名</td></tr><tr><td>H</td><td>小时(0-24，不补零)</td></tr><tr><td>HH</td><td>小时(0-24)</td></tr><tr><td>h</td><td>小时(12小时制)</td></tr><tr><td>hh</td><td>小时(12小时制)</td></tr><tr><td>m</td><td>分钟(不补零)</td></tr><tr><td>mm</td><td>分钟</td></tr><tr><td>s</td><td>秒(不补零)</td></tr><tr><td>ss</td><td>秒</td></tr><tr><td>SSS</td><td>毫秒(000-999)</td></tr><tr><td>Z</td><td>与UTC的偏移，±HH:mm</td></tr><tr><td>ZZ</td><td>与UTC的偏移，±HHmm</td></tr><tr><td>A</td><td>12小时制大写</td></tr><tr><td>a</td><td>12小时制小写</td></tr><tr><td>Q</td><td>一刻钟(1-4)</td></tr><tr><td>Do</td><td>月份的第几天(带序数)</td></tr><tr><td>k</td><td>小时(1-24,从1开始，不补零)</td></tr><tr><td>kk</td><td>小时(1-24,从1开始)</td></tr><tr><td>X</td><td>时间戳(秒)</td></tr><tr><td>x</td><td>时间戳(毫秒)</td></tr><tr><td>w</td><td>一年中第几周(不补零)</td></tr><tr><td>ww</td><td>一年中第几周</td></tr><tr><td>W</td><td>IOS时间一年中第几周(不补零)</td></tr><tr><td>WW</td><td>IOS时间一年中第几周</td></tr><tr><td>wo</td><td>带有序号的一年中第几周</td></tr><tr><td>gggg</td><td>周年</td></tr><tr><td>GGGG</td><td>IOS周年</td></tr></table>',
          rawContent: true,
          placement: 'left'
        } as ElTooltipProps,
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {},
            select: [
              {
                label: 'yyyy-mm-dd hh:mm:ss',
                key: 'YYYY-MM-DD HH:mm:ss'
              },
              {
                label: 'yyyy-m-d h:m:s',
                key: 'YYYY-M-D H:m:s'
              },
              {
                label: 'yyyy-mm-dd hh:mm:ss(12小时制)',
                key: 'YYYY-MM-DD hh:mm:ss'
              },
              {
                label: 'yyyy-m-d h:m:s(12小时制)',
                key: 'YYYY-M-D h:m:s'
              },
              {
                label: 'yyyy-mm-dd',
                key: 'YYYY-MM-DD'
              },
              {
                label: 'yyyy-m-d',
                key: 'YYYY-M-D'
              },
              {
                label: 'yyyy-m-d',
                key: 'YYYY-M-D'
              },
              {
                label: '时间戳',
                key: 'timestamp'
              },
              {
                label: '自定义',
                key: 'custom'
              }
            ],
            default: 'YYYY-MM-DD',
            key: 'format'
          },
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入日期格式',
              style: 'margin-top: 4px;'
            },
            default: 'YYYY-MM-DD',
            key: 'format_str',
            show: '{format} === "custom"'
          }
        ]
      },
      {
        label: '绑定值的格式',
        tip: {
          content: '<table><tr><th>格式</th><th>含义</th></tr><tr><td>YY</td><td>两位数年份</td></tr><tr><td>M</td><td>月份(不补零)</td></tr><tr><td>MM</td><td>月份</td></tr><tr><td>MMM</td><td>月份英文缩写</td></tr><tr><td>MMMM</td><td>月份完整英文名</td></tr><tr><td>D</td><td>某日(不补零)</td></tr><tr><td>DD</td><td>某日</td></tr><tr><td>d</td><td>星期几(0为星期天)</td></tr><tr><td>dd</td><td>星期几最小缩写</td></tr><tr><td>ddd</td><td>星期几的简称</td></tr><tr><td>dddd</td><td>星期几的完整英文名</td></tr><tr><td>H</td><td>小时(0-24，不补零)</td></tr><tr><td>HH</td><td>小时(0-24)</td></tr><tr><td>h</td><td>小时(12小时制)</td></tr><tr><td>hh</td><td>小时(12小时制)</td></tr><tr><td>m</td><td>分钟(不补零)</td></tr><tr><td>mm</td><td>分钟</td></tr><tr><td>s</td><td>秒(不补零)</td></tr><tr><td>ss</td><td>秒</td></tr><tr><td>SSS</td><td>毫秒(000-999)</td></tr><tr><td>Z</td><td>与UTC的偏移，±HH:mm</td></tr><tr><td>ZZ</td><td>与UTC的偏移，±HHmm</td></tr><tr><td>A</td><td>12小时制大写</td></tr><tr><td>a</td><td>12小时制小写</td></tr><tr><td>Q</td><td>一刻钟(1-4)</td></tr><tr><td>Do</td><td>月份的第几天(带序数)</td></tr><tr><td>k</td><td>小时(1-24,从1开始，不补零)</td></tr><tr><td>kk</td><td>小时(1-24,从1开始)</td></tr><tr><td>X</td><td>时间戳(秒)</td></tr><tr><td>x</td><td>时间戳(毫秒)</td></tr><tr><td>w</td><td>一年中第几周(不补零)</td></tr><tr><td>ww</td><td>一年中第几周</td></tr><tr><td>W</td><td>IOS时间一年中第几周(不补零)</td></tr><tr><td>WW</td><td>IOS时间一年中第几周</td></tr><tr><td>wo</td><td>带有序号的一年中第几周</td></tr><tr><td>gggg</td><td>周年</td></tr><tr><td>GGGG</td><td>IOS周年</td></tr></table>',
          rawContent: true,
          placement: 'left'
        } as ElTooltipProps,
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {},
            select: [
              {
                label: 'yyyy-mm-dd hh:mm:ss',
                key: 'YYYY-MM-DD HH:mm:ss'
              },
              {
                label: 'yyyy-m-d h:m:s',
                key: 'YYYY-M-D H:m:s'
              },
              {
                label: 'yyyy-mm-dd hh:mm:ss(12小时制)',
                key: 'YYYY-MM-DD hh:mm:ss'
              },
              {
                label: 'yyyy-m-d h:m:s(12小时制)',
                key: 'YYYY-M-D h:m:s'
              },
              {
                label: 'yyyy-mm-dd',
                key: 'YYYY-MM-DD'
              },
              {
                label: 'yyyy-m-d',
                key: 'YYYY-M-D'
              },
              {
                label: 'yyyy-m-d',
                key: 'YYYY-M-D'
              },
              {
                label: '时间戳',
                key: 'timestamp'
              },
              {
                label: '自定义',
                key: 'custom'
              }
            ],
            default: 'YYYY-MM-DD',
            key: 'valueFormat'
          },
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入日期格式',
              style: 'margin-top: 4px;'
            },
            default: 'YYYY-MM-DD',
            key: 'value_format_str',
            show: '{valueFormat} === "custom"'
          }
        ]
      },
      {
        label: '只读',
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
        label: '文本框可输入',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: true,
            key: 'editable'
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
            default: true,
            key: 'clearable'
          }
        ]
      },
      {
        label: '非范围选择时的占位内容',
        input: [
          {
            component: 'ElInput',
            type: 'boolean',
            props: {
              placeholder: '请输入'
            },
            default: '请选择',
            key: 'placeholder'
          }
        ]
      },
      {
        label: '范围选择时开始日期的占位内容',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入'
            },
            default: '请选择开始时间',
            key: 'startPlaceholder'
          }
        ]
      },
      {
        label: '范围选择时结束日期的占位内容',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入'
            },
            default: '请选择结束时间',
            key: 'endPlaceholder'
          }
        ]
      },
      {
        label: '选择范围时的分隔符',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入'
            },
            default: '-',
            key: 'rangeSeparator'
          }
        ]
      },
      {
        label: '选择器打开时默认显示的时间',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入'
            },
            default: formatDateShow(new Date()),
            key: 'defaultValue'
          }
        ]
      },
      {
        label: '范围选择时选中日期所使用的当日内具体时刻',
        input: [
          {
            component: 'ElInput',
            type: 'string',
            props: {
              placeholder: '请输入'
            },
            default: '2022-01-01 00:00:00',
            key: 'defaultTime'
          }
        ]
      },
      {
        label: '在范围选择器里取消两个日期面板之间的联动',
        input: [
          {
            component: 'ElRadio',
            type: 'boolean',
            props: {},
            select: [{ label: '是', key: true }, { label: '否', key: false }],
            default: false,
            key: 'unlinkPanels'
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
            default: 'Calendar',
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
        label: '自定义清除图标',
        input: [
          {
            component: 'ElSelect',
            type: 'string',
            props: {
              filterable: true
            },
            select: icons,
            default: 'CircleClose',
            key: 'clearIcon'
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
    let {
      readonly,
      disabled,
      editable,
      clearable,
      placeholder,
      startPlaceholder,
      endPlaceholder,
      type,
      format,
      valueFormat,
      rangeSeparator,
      defaultValue,
      defaultTime,
      unlinkPanels,
      prefixIcon,
      prefixIconOther,
      clearIcon,
      clearIconOther
    } = component.values
    format = this.getFormat(format)
    valueFormat = this.getValueFormat(valueFormat)
    if(component.values.modelValue && data[component.values.modelValue]) this.value = data[component.values.modelValue]
    return h(ElDatePicker, {
      modelValue: this.value,
      'onUpdate:modelValue': value => {
        this.value = value
        if(component.values.modelValue) {
          data[component.values.modelValue] = this.value
        }
      },
      onChange(val: string) {
        const { attribute, values } = component
        if(values.for && Array.isArray(values.for) && attribute.计算属性 && Array.isArray(attribute.计算属性)) {
          values.for.forEach(item => {
            if(item.bindKey) data[attribute.计算属性[0].input[0].key] = computedUserData(data, item)
          })
        }
      },
      readonly,
      disabled,
      editable,
      clearable,
      placeholder,
      startPlaceholder,
      endPlaceholder,
      type,
      format,
      valueFormat,
      rangeSeparator,
      defaultValue: new Date(defaultValue),
      defaultTime: new Date(defaultTime),
      unlinkPanels,
      prefixIcon: (prefixIcon && (icons.find(r => r.key === prefixIcon) ? icons.find(r => r.key === prefixIcon)?.icon : prefixIconOther)),
      clearIcon: (clearIcon && (icons.find(r => r.key === clearIcon) ? icons.find(r => r.key === clearIcon)?.icon : clearIconOther)),
    })
  }
  toggleDrag(val?: boolean) {
    if(typeof val === 'boolean') this.isDarg = val
    else this.isDarg = !this.isDarg
  }
  setData(val: any, key: string) {
    this.values[key] = val
  }
  getFormat(date: string) {
    if(date === 'custom') return this.values.format_str
    else return date
  }
  getValueFormat(date: string) {
    if(date === 'custom') return this.values.value_format_str
    else return date
  }
}

export default DatePickerForm