import { type RendererElement, type RendererNode, type VNode } from 'vue';
import type { Component } from "./type";
declare class SelectForm implements Component {
    readonly type = "select";
    static type: string;
    readonly title = "\u4E0B\u62C9\u6846";
    readonly icon = "&#xe611;";
    static title: string;
    static icon: string;
    readonly componentType = "\u8868\u5355\u7EC4\u4EF6";
    static componentType: string;
    private isHttp;
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
            tip: string;
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
        } | {
            label: string;
            tip: string;
            input: {
                component: string;
                type: string;
                props: {};
                default: number;
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
            input: ({
                component: string;
                type: string;
                props: {
                    for?: undefined;
                    placeholder?: undefined;
                    style?: undefined;
                };
                select: {
                    label: string;
                    key: boolean;
                }[];
                default: boolean;
                key: string;
                show?: undefined;
                label?: undefined;
            } | {
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
                    placeholder?: undefined;
                    style?: undefined;
                };
                default: {
                    label: string;
                    value: string;
                    disabed: boolean;
                }[];
                show: string;
                key: string;
                select?: undefined;
                label?: undefined;
            } | {
                label: string;
                component: string;
                type: string;
                props: {
                    placeholder: string;
                    style: string;
                    for?: undefined;
                };
                default: string;
                key: string;
                show: string;
                select?: undefined;
            } | {
                label: string;
                component: string;
                type: string;
                props: {
                    placeholder: string;
                    style: string;
                    for?: undefined;
                };
                select: {
                    label: string;
                    key: string;
                }[];
                default: string;
                key: string;
                show: string;
            } | {
                label: string;
                component: string;
                type: string;
                props: {
                    for: {
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
                    }[];
                    placeholder?: undefined;
                    style?: undefined;
                };
                default: {
                    http_header_key: string;
                    http_header_value: string;
                }[];
                show: string;
                key: string;
                select?: undefined;
            })[];
        }[];
    };
    constructor();
    __init__(): void;
    render(component: Component, data: {
        [key: string]: any;
    }, renderFormComponent: Function, renderLayoutComponent: Function, props: any): VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    toggleDrag(val?: boolean): void;
    setData(val: any, key: string): void;
    getListData(): void;
    private getHttp;
}
export default SelectForm;
