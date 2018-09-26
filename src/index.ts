import axios from "../node_modules/axios/index.js";

// helpers
const STRING_OBJECT = "[object Object]";
let _toString = Object.prototype.toString;

// extend dom function
function _extendDOMPrototype(key: string, val: any): void {
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
function _getVarType(obj: any): string {
    return _toString.call(obj).split(" ")[1].slice(0, -1);
}

function _isUndef(obj: any): boolean {
    return typeof obj === "undefined";
}

function _isPlainObject(obj: any): boolean {
    return _toString.call(obj) === STRING_OBJECT;
}

function _isFunc(obj: any): boolean {
    return typeof obj === "function";
}

function _isArray(obj: any): boolean {
    return obj instanceof Array;
}
// except 'NaN'
function _isNumber(obj: any): boolean {
    return obj === +obj;
}

function _isString(obj: any): boolean {
    return obj === "" + obj;
}

function _isBoo(obj: any): boolean {
    return obj === !!obj;
}

function _isHTMLElement(obj: any): boolean {
    return typeof HTMLElement === "object" ? (obj instanceof HTMLElement) : (typeof obj === "object" && obj.nodeType == 1 && typeof obj.nodeName === "string");
}

// Object.defineProperty
function _defineProp(o: object, key: string, val: any): void {
    if (o.hasOwnProperty(key)) {
        _throwError(`${o} already exists as ${key} property`);
    }
    Object.defineProperty(o, key, {
        value: val
    });
}
// Object.prototype
function _extendPrototype(o: any, key: string, val: any): void {
    if (o[key]) {
        _throwError(`${o} already exists as ${key} property`);
    }
    o.prototype[key] = val;
}

// throw error
function _throwError(msg: string): never {
    throw new Error(msg);
}

// serialize data  e.g. {a:"abc",b:"123"} -> "a=abc&b=123"

function _serialize(data: any, isTraditional: boolean = false): string {
    let arr = [];
    if (typeof data == "object") {
        for (let key in data) {
            if (data[key] != null) {
                let item = data[key];
                if (isTraditional && item instanceof Array) {
                    arr.push(item.map(function (field) {
                        return encodeURIComponent(key) + "=" + encodeURIComponent(field);
                    }).join("&"));
                } else {
                    arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(item));
                }
            }
        }
        return arr.join("&");
    }
    return '';
}

// reverse serialize data  e.g. "a=abc%20%&b=123" -> {"a":"abc","b":"123"}
function _reSerialize(str: string): object {
    if (str.trim().length == 0) return {};
    let arr = str.split("&");
    let data: any = {};
    arr.forEach(function (item) {
        let brr = item.split("=");
        data[brr[0]] = decodeURIComponent(brr[1]);
    });
    return data;
}

function _forEach(context: object, callback: Function): Function {
    return [].forEach.call(context, callback);
}

// extends
// camel-case -> camelCase
function toCamelCase(str:string):string {
    return str.toLowerCase().replace(/-(\w{1})/g, function (all, $1) {
        return $1.toUpperCase();
    });
}
// pascal-case -> PascalCase
function toPascalCase(str:string):string {
    let rep = toCamelCase(str);
    return rep[0].toUpperCase() + rep.slice(1);
}
// "中文" -> "\u4e2d\u6587"
function toUnicode(str: string):string {
    return str.split("").map(function (char: string) {
        return "\\u" + (char.charCodeAt(0).toString(16));
    }).join("");
}
// {0}-{1},"A","B" -> "A-B"
function formatStr(str: string, strlist: any):string {
    let strArr = _isArray(strlist) ? strlist : [strlist];
    return str.replace(/\{(-?\d+)\}/g, function (str1: string, num1: number) {
        if (num1 < 0 || num1 > strArr.length) return "";
        return strArr[num1];
    });
}
// encode base64
function toBase64(str: string):string {
    if (_isUndef(window.btoa)) {
        _throwError("window.btoa is not defined");
    }
    return window.btoa((window as any).encodeURIComponent(str));
}
// decode base64
function fromBase64(str: string):string {
    if (_isUndef(window.atob)) {
        _throwError("window.atob is not defined");
    }
    return (window as any).decodeURIComponent(window.atob(str));
}
// 千分位转换法 123456->123,456
function toThousands(num: number):string {
    return num.toLocaleString("en-US");
};

// ********************Vue comp import and export*********************
let compLoadEv = document.createEvent("CustomEvent"); // 为了兼容IE11
_defineProp(window, "_export", function (data: any) {
    (window as any).vueComponent = data; // 为了兼容IE11
    compLoadEv.initCustomEvent("comploaded", true, true, data);
    document.dispatchEvent(compLoadEv);
});
_defineProp(window, "_import", function (callback: any) {
    document.addEventListener("comploaded", function (this: any) {
        callback && callback((window as any).vueComponent); // 为了兼容IE11
        (window as any).vueComponent = null; // 为了兼容IE11
        this.removeEventListener("comploaded", arguments.callee);
    }, false);
});

/**
 * 格式化日期 三方 "YYYY-MM-DD hh:ii:ss.ms W q" | "timestamp"
 * 
 * @param {String} fmt 
 * @param {Date} date  1519700193000 "1519700193000" "/Date(1519700193000)/"
 * @returns {String}
 */
function toFormatDate(fmt: string, date: Date | number | string): string {
    let now: any;

    // 容错处理
    if (date instanceof Date) { // Date
        now = date;
    } else {
        // string || number && !NaN
        if (typeof date == "string") {
            date = date.trim();
            date = date.replace(/\/Date\((\d+)\)\//g, "$1"); // "/Date(1519700193000)/"
            // "1519700193000" -> 1519700193000
            date = _isNumber(date) ? date : +date;
        } else if (typeof date == "number") {
            date = isNaN(date) ? 0 : date;
        } else {
            date = 0;
        }
        // 兼容ie
        if (typeof date == "string" && date != (date + "")) {
            let arr: string[] = date.split(/[- : \/]/);
            now = new Date(+arr[0], +arr[1] - 1, +arr[2], +arr[3], +arr[4], +arr[5]);
        } else {
            now = new Date(date);
        }
        now = now == "Invalid Date" ? new Date(0) : now;
    }
    // 时间戳
    if (fmt == "timestamp") return Date.parse(now) + "";

    let o: any = {
        "M+": now.getMonth() + 1, //月份         
        "D+": now.getDate(), //日         
        "h+": now.getHours() % 12 == 0 ? 12 : now.getHours() % 12, //小时  12h   
        "H+": now.getHours(), //小时  24H       
        "i+": now.getMinutes(), //分         
        "s+": now.getSeconds(), //秒         
        "q+": Math.floor((now.getMonth() + 3) / 3), //季度         
        "mss": now.getMilliseconds() //毫秒         
    };
    let week: any = {
        "0": "\u65e5",  // 日    
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    // 年份和星期特殊处理      
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
            RegExp.$1.length == 4
                ? (now.getFullYear() + "")
                : RegExp.$1.length == 2
                    ? (now.getFullYear() + "").substr(2) :
                    (now.getFullYear() + ""));
    }
    if (/(W+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[now.getDay() + ""]);
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1,
                RegExp.$1.length == 2
                    ? ("" + o[k]).length > 1
                        ? o[k]
                        : "0" + o[k]
                    : o[k]);
        }
    }
    return fmt;
}
/**
 * format byte e.g. 2K -> 2048 byte
 * 
 * @param {String} str 
 * @returns {Number}
 */
function toByte(str: string): number {
    let unit: any = {
        'B': 1,
        'K': 1024,
        'M': 1048576,
        'G': 1073741824,
        'T': 1099511627776
    };
    return +str.toUpperCase().replace(/^(\d+)([B|K|M|G|T]){1}$/g, function (all, s1, s2) {
        return s1 * unit[s2] + "";
    });
}


// browser
let browser = {
    isIE: !!(window as any).ActiveXObject || "ActiveXObject" in window,
    detail: (function () {
        let ua = window.navigator.userAgent.toLowerCase();
        let browser = {};
        let arrMatch: string[] | null;
        (arrMatch = ua.match(/msie ([\d\.]+)/)) ? (browser = { name: 'ie', version: arrMatch[1] }) :
            (arrMatch = ua.match(/opr\/([\d\.]+)/)) ? (browser = { name: 'opera', version: arrMatch[1] }) :
                (arrMatch = ua.match(/firefox\/([\d\.]+)/)) ? (browser = { name: 'firefox', version: arrMatch[1] }) :
                    (arrMatch = ua.match(/version\/([\d\.]+).*safari/)) ? (browser = { name: 'safari', version: arrMatch[1] }) :
                        (arrMatch = ua.match(/chrome\/([\d\.]+)/)) ? (browser = { name: 'chrome', version: arrMatch[1] }) : 0;
        return browser;
    }()),
    isSupportCss: function (prop: any): boolean {
        // convert str to camelCase
        if (!prop) return false;
        let str = prop.toCamelCase();
        let ele = document.getElementsByTagName("div")[0];
        return str in ele.style;
    },
    isSupportCalc: function () {
        let cache;
        let ele: any = document.createElement("div");
        ele.style["width"] = "calc(1px + 1px)";
        cache = ele.style["width"];
        ele = null;
        return cache == "calc(2px)";
    },
    isSupportVWVH: function () {
        let cache;
        let ele: any = document.createElement("div");
        ele.style["width"] = "1vw";
        cache = ele.style["width"];
        ele = null;
        return cache == "1vw";
    }
};

// dom

/**
 * filter html element tag
 * 
 * @param {String} str 
 * @returns {String}
 */
function filterHTML(str: string): string {
    return (str + "").replace(/<\/?([^>]\s?)+>/g, "").trim().replace(/\n|\r|\t/g, "");
}

// cookie
let docCookie = {
    getItem: function (sKey: string) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey: string, sValue: any, { end, path, domain, isSecure }: any) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        let sExpires = "";
        if (end) {
            switch (end.constructor) {
                case Number:
                    sExpires = end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + end;
                    break;
                case String:
                    sExpires = "; expires=" + end;
                    break;
                case Date:
                    sExpires = "; expires=" + end.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (isSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey: string, sPath: string, sDomain: string) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey: string) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};

class Yan {
    // ajax setting
    private ajaxCommon = {
        common: {},
        http2: {
            requestArr: [],
        },
        setting: {
            isDoErrorCallback: true, // 默认执行失败回调
        }
    }
    constructor(options: any) {
        // init todo
        for (let extend in options) {
            if (!(this as any)[extend]) {
                (this as any)[extend] = options[extend];
            }
        }
    }
    urlParse(str: string | Location): any {
        let _str: string = str + "", // cache
            _host: string = "",  // cache
            protocol: string = "",
            auth: string[],  // auth
            username: string = "",
            password: string = "",
            host: string = "",
            port: string = "",
            hostname: string = "",
            pathname: string = "",
            search: string = "",
            query: any = {},
            hash: string = "",
            matchArr: string[] | null;

        // 简单判断是否合法url
        if (!/^https?:\/\//.test(_str)) {
            console.warn("This string is invalid url, the result of return maybe is wrong");
        }

        // 协议
        matchArr = /^(https?):/g.exec(_str);
        protocol = !!matchArr ? matchArr[1] : ""; // http|https
        // 去除
        _str = _str.replace(protocol + "://", "");
        // 域名(:端口)?
        matchArr = /((^[^\s\/\?#]+\.)+([^#\?\/]+))/g.exec(_str); // nodejs.org:81 | user:pass@qq.com
        host = !!matchArr ? matchArr[1] : "";
        _host = host; // cache 
        // 处理特殊情况 “http://abc:zh@qq.com”
        if (host.indexOf("@") != -1) { // user:pass@qq.com
            host = host.replace(/.+\@(.+)/, "$1"); // qq.com
            // 认证
            auth = _host.replace("@" + host, "").split(":"); // user:pass
            username = auth[0]; // user
            password = auth[1]; // pass
        }
        // 端口
        matchArr = /:(\d+)/g.exec(host);
        port = !!matchArr ? +matchArr[1] : (<any>{
            'http': 80,
            'https': 443
        })[protocol] || ""; // 81
        // 域名
        hostname = host.replace(":" + port, ""); // nodejs.org
        // 去除
        _str = _str.replace(_host, "");
        // 路径
        matchArr = /((\/[^\/\?#]+)+)/g.exec(_str);
        pathname = !!matchArr ? matchArr[1] : ""; // /dist/latest-v8.x/docs/api/url.html
        // 去除
        _str = _str.replace(pathname, "");
        // 查询参数
        matchArr = /\?([^#]+)/g.exec(_str);
        search = !!matchArr ? matchArr[1] : ""; // q=123&name=jobs&age=100
        // 去除
        _str = _str.replace("?" + search, "");
        // 哈希值
        matchArr = /#([^#]+)$/g.exec(_str);
        hash = !!matchArr ? matchArr[1] : "";
        // 查询参数 反序列化
        query = _reSerialize(search);

        return {
            protocol,
            username,
            password,
            host,
            port,
            hostname,
            pathname,
            search,
            query,
            hash,
        };
    }
    http(this: any, {
        url = '/',
        method = 'GET',
        data = {},
        user = null,
        password = null,
        responseType = 'json',
        timeout = 0,
        processData = true,
        contentType = true,
        headers = {},
        complete = () => { },
        success = (_: any) => { },
        error = (_: any) => { }
    }) {

        if (_isUndef(Promise)) {
            _throwError("Your browser didn't support 'Promise'");
            return;
        }
        // 1
        let xhr = !_isUndef(XMLHttpRequest) ? (new XMLHttpRequest()) : (new (window as any).ActiveXObjcet('Microsoft.XMLHTTP'));
        // async
        return new Promise((resolve, reject) => {


            // judge data is formdata
            if (data instanceof FormData) {
                processData = false; // don't serialize
                contentType = false; // don't set contenttype
            }

            // serialize
            if (processData) data = _serialize(data);

            // judge jsonp or ajax
            if (responseType.toLowerCase() == "jsonp") {
                this.getJSON(url, data, resolve, reject);
                return false;
            }

            // if method is 'get', add data to url and let data is null
            if (method.toUpperCase() == "GET") {
                url += "?" + data;
                data = {};
            }

            // 2
            xhr.open(method, url, true, user, password);
            // set responseType
            xhr.responseType = responseType;

            // set headers
            for (let key in headers) {
                xhr.setRequestHeader(key, (headers as any)[key]);
            }
            // post set header
            if (contentType && method && method.toUpperCase() == "POST") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            // set timeout
            xhr.timeout = timeout;

            // 3
            xhr.addEventListener("readystatechange", function (this: any) {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        complete && complete();
                        success && success(this.response);
                        resolve(this.response);
                    } else {
                        complete && complete();
                        error && error(this.status + " " + this.statusText);
                        reject(this.status + " " + this.statusText);
                    }
                }
            });

            // 4
            xhr.send(data);

            // cancel request of xhr
            xhr.cancel = xhr.abort;
        });
        // return xhr;
    }
    get(config: any) {
        config.method = "GET";
        return this.http(config);
    }
    post(config: any) {
        config.method = "POST";
        return this.http(config);
    }
    // JSONP
    getJSON(url: string, data: object, success: Function, error: Function) {
        if (_isFunc(data)) { // url,success
            success = arguments[1];
            error = arguments[2];
        } else { // url,data,success
            if (data) {
                (data as any).t = ~~(Math.random() * 1000) + 1; // don't cache
                url += "?" + _serialize(data);
            }
        }
        let cb = "jsonpCallback" + Math.floor(Math.random() * 100 + 1);
        let jsonp = document.createElement("script");
        jsonp.type = "text/javascript";
        document.body.appendChild(jsonp);

        (window as any)[cb] = function (d: any) {
            success && success(d);
        };

        jsonp.addEventListener("load", function () {
            jsonp.remove();
        });
        jsonp.addEventListener("error", function () {
            error && error("JSONP is failed");
            jsonp.remove();
        });
        jsonp.src = url + '&callback=' + cb;
    }
    http2(config: any) {
        // detect axios exist
        if (_isUndef(axios)) {
            _throwError("This library relies on axios");
            return 0;
        }
        // 没有参数
        if (arguments.length == 0) {
            return 0;
        }
        // 参数类型不是对象时或参数不能为空对象
        if (_getVarType(config) != "Object" || Object.keys(config).length == 0) {
            _throwError("参数类型不是对象或为空对象");
            return 0;
        }
        let that = this;
        // URL
        config.url = config.url || "/";
        // GET 
        config.method = config.method || "GET";
        if (config.method.toUpperCase() === "GET") {
            // data -> params
            config.params = config.data;
            delete config.data;
            // GET tradtional    {a:[1,2]}  => a=1&a=2
            if (config.traditional === true) {
                config.paramsSerializer = function (params: any) {
                    return _serialize(params, true);
                };
            }
        }
        // AUTH
        config.headers = config.headers || {};

        // CANCEL REQUEST
        let source2 = axios.CancelToken.source();
        config.cancelToken = source2.token;
        (this.ajaxCommon.http2.requestArr as any).push(source2);
        (window as any).cancelAllXHR = this.ajaxCommon.http2.requestArr;

        if (config.cancelAllRequest && config.cancelAllRequest == true) {
            // 清空之前所有请求
            if (this.ajaxCommon.http2.requestArr.length > 0) {
                this.ajaxCommon.http2.requestArr.pop(); // 删除当前
                this.ajaxCommon.http2.requestArr.forEach(function (item: any) {
                    item.cancel();
                });
                this.ajaxCommon.http2.requestArr = [];
            }
        }
        // OTHERS setting
        config.timeout = config.timeout || 30 * 1000; // 超时放弃请求

        // default set responseType to 'json'
        config.responseType = config.responseType || 'json';

        // judge jsonp or ajax
        if (config.responseType && config.responseType.toLowerCase() == "jsonp") {
            this.getJSON(config.url, config.data, config.success, config.error);
            return false;
        }

        // request
        axios(config)
            .then(function (res) {
                config.complete && config.complete();
                config.success && config.success(res.data);
            })
            .catch(function (err) {
                config.complete && config.complete();
                if (err != "Cancel") { // 取消请求信息不打印
                    if (_isFunc(config.error) && that.ajaxCommon.setting.isDoErrorCallback) {
                        config.error(err);
                    } else {
                        console.error(err);
                    }
                }
            });
        return source2;
    }
}

export let yan = new Yan({
    docCookie,
    toFormatDate,
    toCamelCase,
    toPascalCase,
    toUnicode,
    toThousands,
    toByte,
    toBase64,
    fromBase64,
    formatStr,
    params: {
        serialize: _serialize,
        reSerialize: _reSerialize,
    },
    isIE: browser.isIE,
    browserDetail: browser.detail
});