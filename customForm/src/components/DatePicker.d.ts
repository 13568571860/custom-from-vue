import type { Component } from "./type";
import { type ElTooltipProps } from 'element-plus';
declare class DatePickerForm implements Component {
    readonly type = "dataPicker";
    static type: string;
    readonly title = "\u65E5\u671F\u9009\u62E9\u5668";
    readonly icon = "&#xe9ab;";
    static title: string;
    static icon: string;
    readonly componentType = "\u8868\u5355\u7EC4\u4EF6";
    static componentType: string;
    isDarg: boolean;
    children: never[];
    props: {};
    value: string | number;
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
            tip: ElTooltipProps;
            input: ({
                component: string;
                type: string;
                props: {
                    placeholder?: undefined;
                    style?: undefined;
                };
                select: {
                    label: string;
                    key: string;
                }[];
                default: string;
                key: string;
                show?: undefined;
            } | {
                component: string;
                type: string;
                props: {
                    placeholder: string;
                    style: string;
                };
                default: string;
                key: string;
                show: string;
                select?: undefined;
            })[];
        } | {
            label: string;
            input: ({
                component: string;
                type: string;
                props: {
                    filterable: boolean;
                    style?: undefined;
                };
                select: {
                    icon: import("vue").Raw<import("vue").DefineComponent<{}, {}, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>>;
                    key: string;
                    label: string;
                }[];
                default: string;
                key: string;
                show?: undefined;
            } | {
                component: string;
                type: string;
                props: {
                    style: string;
                    filterable?: undefined;
                };
                default: string;
                key: string;
                show: string;
                select?: undefined;
            })[];
            tip?: undefined;
        })[];
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
    getFormat(date: string): any;
    getValueFormat(date: string): any;
}
export default DatePickerForm;
