// helpers
const STRING_OBJECT = "[object Object]";
let _toString = Object.prototype.toString;

// extend dom function
export function _extendDOMPrototype(key: string, val: any): void {
    [
        HTMLDocument.prototype, // document
        Element.prototype,  // element
        CharacterData.prototype, // ? 
        DocumentType.prototype // ? DOCTYPE
    ].forEach(function (item) {
        // prevent repeat add
        if (item.hasOwnProperty(key)) {
            return;
        }
        Object.defineProperty(item, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: val
        });
    });
}

// get type of variable
export function _getVarType(obj: any): string {
    return _toString.call(obj).split(" ")[1].slice(0, -1);
}

export function _isUndef(obj: any): boolean {
    return typeof obj === "undefined";
}

export function _isPlainObject(obj: any): boolean {
    return _toString.call(obj) === STRING_OBJECT;
}

export function _isFunc(obj: any): boolean {
    return typeof obj === "function";
}

export function _isArray(obj: any): boolean {
    return obj instanceof Array;
}
// except 'NaN'
export function _isNumber(obj: any): boolean {
    return obj === +obj;
}

export function _isString(obj: any): boolean {
    return obj === "" + obj;
}

export function _isBoo(obj: any): boolean {
    return obj === !!obj;
}

export function _isHTMLElement(obj: any): boolean {
    return typeof HTMLElement === "object" ? (obj instanceof HTMLElement) : (typeof obj === "object" && obj.nodeType == 1 && typeof obj.nodeName === "string");
}

// Object.defineProperty
export function _defineProp(o: object, key: string, val: any): void {
    if (o.hasOwnProperty(key)) {
        _throwError(`${o} already exists as ${key} property`);
    }
    Object.defineProperty(o, key, {
        value: val
    });
}
// Object.prototype
export function _extendPrototype(o: any, key: string, val: any): void {
    if (o[key]) {
        _throwError(`${o} already exists as ${key} property`);
    }
    o.prototype[key] = val;
}

// throw error
export function _throwError(msg: string): never {
    throw new Error(msg);
}

export function _forEach(context: object, callback: Function): Function {
    return [].forEach.call(context, callback);
}