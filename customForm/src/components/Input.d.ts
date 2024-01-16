import type { Component, AttrMenu } from "./type";
declare class InpurForm implements Component {
    readonly type = "input";
    static type: string;
    static title: string;
    static icon: string;
    readonly title = "\u8F93\u5165\u6846";
    readonly icon = "&#xe60e;";
    readonly componentType = "\u8868\u5355\u7EC4\u4EF6";
    static componentType: string;
    value: string;
    isDarg: boolean;
    children: never[];
    props: {};
    id?: string | undefined;
    values: {
        [key: string]: any;
    };
    readonly attribute: {
        组件属性: AttrMenu[];
        计算属性: {
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
                        tip?: undefined;
                    } | {
                        label: string;
                        tip: string;
                        input: {
                            component: string;
                            type: string;
                            props: {
                                placeholder: string;
                            };
                            default: string;
                            key: string;
                        }[];
                    })[];
                };
                default: never[];
                key: string;
            }[];
        }[];
    };
    constructor();
    __init__(): void;
    render(component: Component, data: {
        [key: string]: any;
    }): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    toggleDrag(val?: boolean): void;
    setData(val: any, key: string): void;
}
export default InpurForm;
