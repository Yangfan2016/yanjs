export interface IBrowser {
    name: string,
    version: string,
}

export interface IYanStatic {
    docCookie: {
        has(key: any): boolean;
        get(key: any): string;
        set(key: any, val: any, { expires, path, domain, isSecure }: {
            expires: any;
            path: any;
            domain: any;
            isSecure: any;
        }): boolean;
        remove(key: any, options?: {
            path: string;
            domain: string;
        }): boolean;
    },
    toFormatDate: (fmt: string, date: string | number | Date) => string,
    toCamelCase: (str: string) => string,
    toPascalCase: (str: string) => string,
    toUnicode: (str: string) => string,
    toThousands: (num: number) => string,
    toByte: (str: string) => number,
    toBase64: (str: string) => string,
    fromBase64: (str: string) => string,
    formatStr: (str: string, strlist: any) => string,
    params: {
        serialize: (data: any, isTraditional?: boolean) => string;
        reSerialize: (str: string, isTraditional?: boolean) => object;
    },
    isIE: boolean,
    browserDetail: (userAgent?: string) => IBrowser
}

declare const Yan: IYanStatic;

export default Yan;