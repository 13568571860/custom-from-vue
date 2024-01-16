import type InpurFrom from "./input"
import type RadioFrom from "./radio"
import type CheckboxFrom from "./checkbox"
import type { RendererElement, RendererNode, VNode } from "vue"
import type { ElTooltipProps } from "element-plus"

export type ComponentClass = InpurFrom | RadioFrom | CheckboxFrom

export default interface Components {
  [key:string]: ComponentClass[]
}

export interface Component {
  id?: string
  type: string
  render(component: Component, data: {[key:string]: any}, renderFormComponent: Function, renderLayoutComponent: Function, props?: any): any
  toggleDrag(val?: boolean): void
  setData(val: any, key: string): void
  getDefault?(data: AttrMenu[]): { [key:string]: any }
  __init__(): void
  title: string
  icon: string
  componentType: string
  isDarg: boolean
  props: any
  children: Component[]
  readonly attribute: ComponentAttr
  values: { [key:string]: any }
  value: any
  container?: VNode<RendererNode, RendererElement, { [key: string]: any }>[]
}

export interface ComponnetsData {
  type: string
  componentType: string
  [key:string]: any
  children: ComponnetsData[]
}

export interface ComponentAttr {
  [key:string]: AttrMenu[]
}

export interface AttrMenu {
  label?: string
  tip?: string | ElTooltipProps
  rawContent?: boolean
  input: Menu[]
}

export interface Menu {
  label?: string
  component: string
  type: string
  props?: {
    [key:string]: any
  }
  default?: any
  key: string
  show?: string
  select?: ({ label: string, key: string | number | boolean })[]
}
