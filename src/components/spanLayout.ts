import { h, type RendererElement, type RendererNode, type VNode } from 'vue'
import type { Component, AttrMenu, ComponentAttr } from "./type"
import { ElCol, ElInput, ElRow } from 'element-plus'
import { computedUserData } from '@/utils/utils'

class SpanLayout implements Component {
  readonly type = 'spanLayout'
  static type = 'spanLayout'
  static title = '栅格布局'
  static icon = '&#xe64c;'
  readonly title = '栅格布局'
  readonly icon = '&#xe64c;'
  readonly componentType = '布局组件'
  static componentType = '布局组件'
  value = ''
  isDarg = false
  children: Component[] = []
  props = {}
  id?: string | undefined
  container?: VNode<RendererNode, RendererElement, { [key: string]: any; }>[] | undefined;
  values: { [key:string]: any } = {}
  readonly attribute = {
    组件属性: [
      {
        label: '栅格间隔',
        tip: '单位为px',
        input: [
          {
            component: 'ElInputNumber',
            type: 'number',
            props: {
              placeholder: '请输入栅格间隔'
            },
            default: 20,
            key: 'gutter',
          }
        ]
      },
      {
        label: '栅格数',
        input: [
          {
            component: 'listInput',
            type: 'any',
            props: {
              for: [
                {
                  label: '栅格占据的列数',
                  tip: '一行分为24列',
                  input: [
                    {
                      component: 'ElInputNumber',
                      type: 'number',
                      props: {
                        placeholder: '请输入列数'
                      },
                      default: 12,
                      key: 'span'
                    }
                  ]
                },
                {
                  label: '栅格左侧的间隔格数',
                  input: [
                    {
                      component: 'ElInputNumber',
                      type: 'number',
                      props: {
                        placeholder: '请输入列数'
                      },
                      default: 0,
                      key: 'offset'
                    }
                  ]
                },
                {
                  label: '栅格向右移动格数',
                  input: [
                    {
                      component: 'ElInputNumber',
                      type: 'number',
                      props: {
                        placeholder: '请输入列数'
                      },
                      default: 0,
                      key: 'push'
                    }
                  ]
                },
                {
                  label: '栅格向左移动格数',
                  input: [
                    {
                      component: 'ElInputNumber',
                      type: 'number',
                      props: {
                        placeholder: '请输入列数'
                      },
                      default: 0,
                      key: 'pull'
                    }
                  ]
                }
              ]
            },
            default: [],
            key: 'spans'
          }
        ]
      }
    ] as AttrMenu[]
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
    this.values.spans = [this.getDefault(this.attribute.组件属性[1].input[0].props?.for)]
  }
  getDefault(data: AttrMenu[]) {
    const def: { [key:string]: any } = {}
    data.forEach(item => {
      item.input.forEach(r => {
        def[r.key] = r.default
      })
    })
    return def
  }
  render(component: Component, data: {[key:string]: any}, renderFormComponent: Function, renderLayoutComponent: Function, props: any) {
    this.container = []
    if(props.readonly) {
      return this.viewRender(component, data, renderFormComponent, renderLayoutComponent, props)
    } else {
      return this.editRender(component, data, renderFormComponent, renderLayoutComponent, props)
    }
    
  }
  viewRender(component: Component, data: {[key:string]: any}, renderFormComponent: Function, renderLayoutComponent: Function, props: any) {
    return h(ElRow, { gutter: component.values.gutter, style: { width: '100%', paddingBottom: 0 } }, { default: () => {
      const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
      component.values.spans.forEach((item: any, idx: number) => {
        vnodes.push(h(ElCol, { ...item }, { default: () => {
          const vnode = h(ElRow, {}, { default: () => {
            if(this.children[idx]) {
              if(!['表单组件'].includes(this.children[idx].componentType)) return delete this.children[idx]
              return renderFormComponent(this.children[idx])
            }
          }})
            this.container?.push(vnode)
          return vnode
        }}))
      })
      return vnodes
    }})
  }
  editRender(component: Component, data: {[key:string]: any}, renderFormComponent: Function, renderLayoutComponent: Function, props: any) {
    return h(ElRow, { gutter: component.values.gutter, style: { minHeight: '60px', paddingTop: '10px', width: '100%' } }, { default: () => {
      const vnodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[] = []
      component.values.spans.forEach((item: any, idx: number) => {
        vnodes.push(h(ElCol, { ...item }, { default: () => {
          const vnode = h(ElRow, { drop: true, style: 'minHeight: 40px; border: 1px dotted #477BFE;' }, { default: () => {
            if(this.children[idx]) {
              if(!['表单组件'].includes(this.children[idx].componentType)) return delete this.children[idx]
              if(this.children[idx].isDarg) {
                return [h('div', { drop: true, style: 'background: rgba(71,123,254,0.2); flex: 1; min-height: 40px; height: 100%; pointer-events: none;' })]
              } else {
                return renderFormComponent(this.children[idx])
              }
            } else {
              return h('div', { drop: true, style: 'height: 100%; background: rgba(71,123,254,0.2); flex: 1; minHeight: 40px; pointer-events: none;' })
            }
          }})
          this.container?.push(vnode)
          return vnode
        }}))
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

export default SpanLayout
