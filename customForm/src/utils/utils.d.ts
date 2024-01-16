export declare function delObjectFromArray(arr: any[], obj: any, children?: string, id?: string): any[];
export declare function computedUserData(data: {
    [key: string]: any;
}, values: {
    [key: string]: string;
}): any;
export declare function formatDateShow(date: string | number | Date, showTime: string): string;
export declare function formatDateShow(date: string | number | Date, showTime: boolean): string;
export declare function formatDateShow(date: string | number | Date, showTime: undefined): string;
export declare function getValue<T, K extends keyof T>(o: T, k: K): T[K];
