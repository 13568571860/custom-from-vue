import { type RendererElement, type RendererNode, type VNode } from 'vue';
import type { Component } from "./type";
declare class ColorPicherForm implements Component {
    readonly type = "colorPicher";
    static type: string;
    readonly title = "\u53D6\u8272\u5668";
    readonly icon = "&#xe63d;";
    static title: string;
    static icon: string;
    readonly componentType = "\u8868\u5355\u7EC4\u4EF6";
    static componentType: string;
    isDarg: boolean;
    children: never[];
    props: {};
    value: string;
    id?: string | undefined;
    values: {
        [key: string]: any;
    };
    readonly attribute: {
        组件属性: ({
            label: string;
            input: {
                component: string;
                type: string;
                props: {
                    placeholder: string;
                };
                default: string;
                key: string;
            }[];
            tip?: undefined;
        } | {
            label: string;
            input: {
                component: string;
                type: string;
                props: {};
                select: {
                    label: string;
                    key: boolean;
                }[];
                default: boolean;
                key: string;
            }[];
            tip?: undefined;
        } | {
            label: string;
            tip: string;
            input: {
                component: string;
                type: string;
                props: {};
                default: string;
                key: string;
            }[];
        } | {
            label: string;
            input: {
                component: string;
                type: string;
                props: {};
                select: {
                    label: string;
                    key: string;
                }[];
                default: string;
                key: string;
            }[];
            tip?: undefined;
        })[];
    };
    constructor();
    __init__(): void;
    render(component: Component, data: {
        [key: string]: any;
    }): VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    toggleDrag(val?: boolean): void;
    setData(val: any, key: string): void;
}
export default ColorPicherForm;
