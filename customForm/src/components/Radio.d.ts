import { type RendererElement, type RendererNode, type VNode } from 'vue';
import type { Component } from "./type";
declare class RadioForm implements Component {
    readonly type = "radio";
    static type: string;
    readonly title = "\u5355\u9009\u6846";
    readonly icon = "&#xe640;";
    static title: string;
    static icon: string;
    readonly componentType = "\u8868\u5355\u7EC4\u4EF6";
    static componentType: string;
    isDarg: boolean;
    children: never[];
    props: {};
    value: string | number | boolean;
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
                    key: string;
                }[];
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
                default: string;
                key: string;
            }[];
            tip?: undefined;
        })[];
        子项属性: {
            label: string;
            input: {
                component: string;
                type: string;
                props: {
                    for: ({
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
                    })[];
                };
                default: {
                    label: string;
                    value: string;
                    disabed: boolean;
                }[];
                key: string;
            }[];
        }[];
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
export default RadioForm;
