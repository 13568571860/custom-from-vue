import type { PropType as __PropType } from 'vue';
import type { Menu } from './type';
declare const _sfc_main: import("vue").DefineComponent<{
    data: {
        type: __PropType<Menu>;
        required: true;
    };
    modelValue: {
        type: __PropType<{
            [key: string]: any;
        }[]>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: __PropType<Menu>;
        required: true;
    };
    modelValue: {
        type: __PropType<{
            [key: string]: any;
        }[]>;
        required: true;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
