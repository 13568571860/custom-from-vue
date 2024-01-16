import { type RendererElement, type RendererNode, type VNode } from 'vue';
import type { Component, AttrMenu } from "./type";
declare class SpanLayout implements Component {
    readonly type = "spanLayout";
    static type: string;
    static title: string;
    static icon: string;
    readonly title = "\u6805\u683C\u5E03\u5C40";
    readonly icon = "&#xe60e;";
    readonly componentType = "\u5E03\u5C40\u7EC4\u4EF6";
    static componentType: string;
    value: string;
    isDarg: boolean;
    children: Component[];
    props: {};
    id?: string | undefined;
    container?: VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>[] | undefined;
    values: {
        [key: string]: any;
    };
    readonly attribute: {
        组件属性: AttrMenu[];
    };
    constructor();
    __init__(): void;
    getDefault(data: AttrMenu[]): {
        [key: string]: any;
    };
    render(component: Component, data: {
        [key: string]: any;
    }, renderFormComponent: Function, renderLayoutComponent: Function, props: any): VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    viewRender(component: Component, data: {
        [key: string]: any;
    }, renderFormComponent: Function, renderLayoutComponent: Function, props: any): VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    editRender(component: Component, data: {
        [key: string]: any;
    }, renderFormComponent: Function, renderLayoutComponent: Function, props: any): VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    toggleDrag(val?: boolean): void;
    setData(val: any, key: string): void;
}
export default SpanLayout;
