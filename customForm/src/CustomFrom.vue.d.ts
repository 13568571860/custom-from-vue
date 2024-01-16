import type { PropType as __PropType } from 'vue';
import type { ComponnetsData } from './components/type';
declare const _sfc_main: import("vue").DefineComponent<{
    readonly: {
        type: __PropType<boolean>;
        required: true;
        default: () => boolean;
    };
}, {
    exportJSON: () => {};
    setData: (data: {
        common: {
            [key: string]: any;
        };
        components: ComponnetsData[];
    }) => void;
    setUserData: (data: {
        [key: string]: any;
    }) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "load"[], "load", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly: {
        type: __PropType<boolean>;
        required: true;
        default: () => boolean;
    };
}>> & {
    onLoad?: ((...args: any[]) => any) | undefined;
}, {
    readonly: boolean;
}>;
export default _sfc_main;
