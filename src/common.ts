import type { AttrMenu } from "./components/type"

const menu = [
  {
    label: '标签宽度',
    tip: '单位px',
    input: [
      {
        component: 'ElRadio',
        type: 'string',
        select: [{ label: '自动', key: 'auto' }, { label: '固定值', key: 'px' }],
        props: {},
        default: 'auto',
        key: 'labelWidthModel'
      },
      {
        component: 'ElInputNumber',
        type: 'number',
        props: {
          controls: false,
          class: 'textLeft'
        },
        default: 100,
        key: 'labelWidth',
        show: '{labelWidthModel}==="px"'
      }
    ]
  },
  {
    label: '标签位置',
    tip: '标签宽带为auto时无效',
    input: [
      {
        component: 'ElRadio',
        type: 'string',
        select: [{ label: '左侧', key: 'left' }, { label: '右侧', key: 'right' }],
        props: {},
        default: 'right',
        key: 'labelPosition'
      }
    ]
  },
  {
    label: '表单尺寸',
    input: [
      {
        component: 'ElRadio',
        type: 'string',
        select: [{ label: '大', key: 'large' }, { label: '中', key: 'default' }, { label: '小', key: 'small' }],
        default: 'default',
        key: 'size'
      }
    ]
  },
  {
    label: '页面边距',
    tip: '单位px，单独设置以英文逗号隔开,顺序为上、右、下、左',
    input: [
      {
        component: 'ElInput',
        type: 'string',
        props: {
          controls: false,
          class: 'textLeft'
        },
        default: '10',
        key: 'padding'
      }
    ]
  },
  {
    label: '组件间距',
    tip: '单位px',
    input: [
      {
        component: 'ElInputNumber',
        type: 'number',
        props: {
          controls: false,
          class: 'textLeft'
        },
        default: 10,
        key: 'componentMargin'
      }
    ]
  }
] as AttrMenu[]

export default menu