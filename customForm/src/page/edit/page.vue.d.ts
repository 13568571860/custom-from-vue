import type { PropType as __PropType } from 'vue';
import { type RendererElement, type RendererNode, type VNode } from 'vue';
import type { Component } from '../../components/type';
declare const _sfc_main: import("vue").DefineComponent<{
    dragData: {
        type: __PropType<Component>;
        required: true;
    };
    data: {
        type: __PropType<Component | null>;
        required: true;
    };
    config: {
        type: __PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
    userData: {
        type: __PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
}, {
    forms: import("vue").Ref<{
        id?: string | undefined;
        type: string;
        render: (component: Component, data: {
            [key: string]: any;
        }, renderFormComponent: Function, renderLayoutComponent: Function, props?: any) => any;
        toggleDrag: (val?: boolean | undefined) => void;
        setData: (val: any, key: string) => void;
        getDefault?: ((data: import('../../components/type').AttrMenu[]) => {
            [key: string]: any;
        }) | undefined;
        __init__: () => void;
        title: string;
        icon: string;
        componentType: string;
        isDarg: boolean;
        props: any;
        children: any[];
        readonly attribute: import('../../components/type').ComponentAttr;
        values: {
            [key: string]: any;
        };
        value: any;
        container?: VNode<RendererNode, RendererElement, {
            [key: string]: any;
        }>[] | undefined;
    }[]>;
    handleDragend: () => void;
    setData: (data: Component[]) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("dragstart" | "selected")[], "dragstart" | "selected", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    dragData: {
        type: __PropType<Component>;
        required: true;
    };
    data: {
        type: __PropType<Component | null>;
        required: true;
    };
    config: {
        type: __PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
    userData: {
        type: __PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
}>> & {
    onDragstart?: ((...args: any[]) => any) | undefined;
    onSelected?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
