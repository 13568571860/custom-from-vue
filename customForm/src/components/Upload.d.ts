import type { Component } from "./type";
declare class UploadForm implements Component {
    readonly type = "upload";
    static type: string;
    readonly title = "\u4E0A\u4F20\u6309\u94AE";
    readonly icon = "&#xe600;";
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
        } | {
            label: string;
            input: {
                component: string;
                type: string;
                props: {
                    placeholder: string;
                };
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
                };
                default: {
                    http_header_key: string;
                    http_header_value: string;
                }[];
                key: string;
            }[];
            tip?: undefined;
        } | {
            label: string;
            input: {
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
                };
                default: {
                    http_data_key: string;
                    http_data_value: string;
                }[];
                key: string;
            }[];
            tip?: undefined;
        } | {
            label: string;
            input: {
                component: string;
                type: string;
                props: {
                    placeholder: string;
                };
                default: null;
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
                default: null;
                key: string;
            }[];
        })[];
    };
    constructor();
    __init__(): void;
    render(component: Component, data: {
        [key: string]: any;
    }, renderFormComponent: Function, renderLayoutComponent: Function, props: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    toggleDrag(val?: boolean): void;
    setData(val: any, key: string): void;
    getHeaders(headers: ({
        http_header_key: string;
        http_header_value: string;
    })[]): {
        [key: string]: string;
    };
    getDatas(headers: ({
        http_data_key: string;
        http_data_value: string;
    })[]): {
        [key: string]: string;
    };
    getValue(val: string | any): string;
}
export default UploadForm;
