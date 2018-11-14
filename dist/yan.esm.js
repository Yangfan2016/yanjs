var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var axios_min = createCommonjsModule(function (module, exports) {
/* axios v0.18.0 | (c) 2018 by Matt Zabriskie */
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1);},function(e,t,n){function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a;},function(e,t,n){function r(e){return "[object Array]"===R.call(e)}function o(e){return "[object ArrayBuffer]"===R.call(e)}function i(e){return "undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return "string"==typeof e}function a(e){return "number"==typeof e}function c(e){return "undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return "[object Date]"===R.call(e)}function d(e){return "[object File]"===R.call(e)}function l(e){return "[object Blob]"===R.call(e)}function h(e){return "[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return "undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return ("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function v(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e);}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e;}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function b(e,t,n){return v(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t;}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:v,merge:x,extend:b,trim:w};},function(e,t){e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}};},function(e,t){function n(e){return !!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return "function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)};},function(e,t,n){function r(e){this.defaults=e,this.interceptors={request:new s,response:new s};}var o=n(6),i=n(2),s=n(17),u=n(18);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected);}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected);});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))};}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))};}),e.exports=r;},function(e,t,n){function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t);}function o(){var e;return "undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e);}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={};}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u);}),e.exports=a;},function(e,t,n){var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r]);});};},function(e,t,n){var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w);}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null;}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null;},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null;},r.isStandardBrowserEnv()){var g=n(16),v=(e.withCredentials||u(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v);}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e);}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType;}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null);}),void 0===p&&(p=null),l.send(p);})};},function(e,t,n){var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n);};},function(e,t,n){var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)};},function(e,t){e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e};},function(e,t,n){function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e));}));}),i=s.join("&");}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e};},function(e,t,n){var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n;}}),s):s};},function(e,t,n){var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return !0}}();},function(e,t){function n(){this.message="String contains an invalid character";}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r;}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r;},function(e,t,n){var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return {write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ");},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5);}}}():function(){return {write:function(){},read:function(){return null},remove:function(){}}}();},function(e,t,n){function r(){this.handlers=[];}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null);},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t);});},e.exports=r;},function(e,t,n){function r(e){e.cancelToken&&e.cancelToken.throwIfRequested();}var o=n(2),i=n(19),s=n(20),u=n(6),a=n(21),c=n(22);e.exports=function(e){r(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t];});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})};},function(e,t,n){var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t);}),e};},function(e,t){e.exports=function(e){return !(!e||!e.__CANCEL__)};},function(e,t){e.exports=function(e){return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)};},function(e,t){e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e};},function(e,t){function n(e){this.message=e;}n.prototype.toString=function(){return "Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n;},function(e,t,n){function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e;});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason));});}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t;});return {token:t,cancel:e}},e.exports=r;},function(e,t){e.exports=function(e){return function(t){return e.apply(null,t)}};}])});

});
var axios_min_1 = axios_min.axios;

// helpers
let _toString = Object.prototype.toString;
// get type of variable
function _getVarType(obj) {
    return _toString.call(obj).split(" ")[1].slice(0, -1);
}
function _isUndef(obj) {
    return typeof obj === "undefined";
}
function _isFunc(obj) {
    return typeof obj === "function";
}
function _isArray(obj) {
    return obj instanceof Array;
}
// except 'NaN'
function _isNumber(obj) {
    return obj === +obj;
}
// Object.defineProperty
function _defineProp(o, key, val) {
    if (o.hasOwnProperty(key)) {
        _throwError(`${o} already exists as ${key} property`);
    }
    Object.defineProperty(o, key, {
        value: val
    });
}
// throw error
function _throwError(msg) {
    throw new Error(msg);
}

// browser
let browser = {
    isIE: !!window.ActiveXObject || "ActiveXObject" in window,
    detail(userAgent) {
        let ua = window.navigator.userAgent.toLowerCase();
        if (userAgent) {
            ua = userAgent.toLowerCase();
        }
        let browser = { name: "unknown", version: "0.0" };
        let strageMode = {
            "IE": /msie ([\d\.]+)/,
            "Edge": /edge\/([0-9\._]+)/,
            "Opera": /opr\/([\d\.]+)/,
            "Firefox": /firefox\/([\d\.]+)/,
            "Safari": /version\/([\d\.]+).*safari/,
            "Chrome": /chrome\/([\d\.]+)/,
            "Phantomjs": /phantomjs\/([\d\.]+)/,
            "jsdom": /jsdom\/([\d\.]+)/,
        };
        // IE11
        if (!~ua.indexOf("msie") && ("ActiveXObject" in window)) {
            return { name: 'IE', version: '11' };
        }
        for (let name in strageMode) {
            let res = ua.match(strageMode[name]);
            if (res !== null) {
                return { name, version: res[1] };
            }
        }
        return browser;
    },
    isSupportCss: function (prop) {
        // convert str to camelCase
        if (!prop)
            return false;
        let str = prop.toCamelCase();
        let ele = document.getElementsByTagName("div")[0];
        return str in ele.style;
    },
    isSupportCalc: function () {
        let cache;
        let ele = document.createElement("div");
        ele.style["width"] = "calc(1px + 1px)";
        cache = ele.style["width"];
        ele = null;
        return cache == "calc(2px)";
    },
    isSupportVWVH: function () {
        let cache;
        let ele = document.createElement("div");
        ele.style["width"] = "1vw";
        cache = ele.style["width"];
        ele = null;
        return cache == "1vw";
    }
};
// docCookie
let docCookie = {
    has(key) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    get(key) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    set(key, val, { expires, path, domain, isSecure }) {
        if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
            return false;
        }
        let sExpires = "";
        if (expires) {
            switch (expires.constructor) {
                case Number:
                    sExpires = expires === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + expires;
                    break;
                case String:
                    sExpires = "; expires=" + expires;
                    break;
                case Date:
                    sExpires = "; expires=" + expires.toUTCString();
                    break;
            }
        }
        // json
        if (typeof val === 'object' && val !== null) {
            val = JSON.stringify(val);
        }
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val) + sExpires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (isSecure ? "; secure" : "");
        return true;
    },
    remove(key, options = {
        path: "",
        domain: "",
    }) {
        let { path, domain } = options;
        if (!key || !this.has(key)) {
            return false;
        }
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + "; domain=" + domain + "; path=" + path;
        return true;
    },
};

// serialize data  e.g. {a:"abc",b:"123"} -> "a=abc&b=123"
function _serialize(data, isTraditional = false) {
    let arr = [];
    if (typeof data == "object") {
        for (let key in data) {
            if (data[key] != null) {
                let item = data[key];
                if (isTraditional && item instanceof Array) {
                    arr.push(item.map(function (field) {
                        return encodeURIComponent(key) + "=" + encodeURIComponent(field);
                    }).join("&"));
                }
                else {
                    arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(item));
                }
            }
        }
        return arr.join("&");
    }
    return '';
}
/**
 * reverse serialize data  e.g. "a=abc&b=123" -> {"a":"abc","b":"123"}
 * @param {string} str
 * @param {boolean} isTraditional if true e.g. "a=abc&b=123&b=456" -> {"a":"abc","b":["123","456"]}
 */
function _reSerialize(str, isTraditional = true) {
    let s = decodeURIComponent(str);
    return s.split("&").reduce(function (prev, cur) {
        let flag = cur.indexOf("=");
        let key = cur.slice(0, flag);
        let val = cur.slice(flag + 1);
        if (isTraditional) {
            if (prev[key]) {
                prev[key] instanceof Array ? prev[key].push(val) : prev[key] = [prev[key], val];
            }
            else {
                prev[key] = val;
            }
        }
        else {
            prev[key] = val;
        }
        return prev;
    }, {});
}
// extends
// camel-case -> camelCase
function toCamelCase(str) {
    return str.toLowerCase().replace(/-(\w{1})/g, function (all, $1) {
        return $1.toUpperCase();
    });
}
// pascal-case -> PascalCase
function toPascalCase(str) {
    let rep = toCamelCase(str);
    return rep[0].toUpperCase() + rep.slice(1);
}
// "中文" -> "\u4e2d\u6587"
function toUnicode(str) {
    return str.split("").map(function (char) {
        return "\\u" + (char.charCodeAt(0).toString(16));
    }).join("");
}
// {0}-{1},"A","B" -> "A-B"
function formatStr(str, strlist) {
    let strArr = _isArray(strlist) ? strlist : [strlist];
    return str.replace(/\{(-?\d+)\}/g, function (str1, num1) {
        if (num1 < 0 || num1 > strArr.length)
            return "";
        return strArr[num1];
    });
}
// encode base64
function toBase64(str) {
    if (_isUndef(window.btoa)) {
        _throwError("window.btoa is not defined");
    }
    return window.btoa(window.encodeURIComponent(str));
}
// decode base64
function fromBase64(str) {
    if (_isUndef(window.atob)) {
        _throwError("window.atob is not defined");
    }
    return window.decodeURIComponent(window.atob(str));
}
// 千分位转换法 123456->123,456
function toThousands(num) {
    if (num.length < 3)
        return num.toString();
    var res = num.toLocaleString("en-US");
    if (/(,\d{3})+/.test(res)) { // 方案1
        return res;
    }
    else { // 备用方案
        return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
}
/**
 * 格式化日期 三方 "YYYY-MM-DD hh:ii:ss.ms W q" | "timestamp"
 *
 * @param {String} fmt
 * @param {Date} date  1519700193000 "1519700193000" "/Date(1519700193000)/"
 * @returns {String}
 */
function toFormatDate(fmt, date) {
    let now;
    // 容错处理
    if (date instanceof Date) { // Date
        now = date;
    }
    else {
        // string || number && !NaN
        if (typeof date == "string") {
            date = date.trim();
            date = date.replace(/\/Date\((\d+)\)\//g, "$1"); // "/Date(1519700193000)/"
            // "1519700193000" -> 1519700193000
            date = _isNumber(date) ? date : +date;
        }
        else if (typeof date == "number") {
            date = isNaN(date) ? 0 : date;
        }
        else {
            date = 0;
        }
        // 兼容ie
        if (typeof date == "string" && date != (date + "")) {
            let arr = date.split(/[- : \/]/);
            now = new Date(+arr[0], +arr[1] - 1, +arr[2], +arr[3], +arr[4], +arr[5]);
        }
        else {
            now = new Date(date);
        }
        now = now == "Invalid Date" ? new Date(0) : now;
    }
    // 时间戳
    if (fmt == "timestamp")
        return Date.parse(now) + "";
    let o = {
        "M+": now.getMonth() + 1,
        "D+": now.getDate(),
        "h+": now.getHours() % 12 == 0 ? 12 : now.getHours() % 12,
        "H+": now.getHours(),
        "i+": now.getMinutes(),
        "s+": now.getSeconds(),
        "q+": Math.floor((now.getMonth() + 3) / 3),
        "mss": now.getMilliseconds() //毫秒         
    };
    let week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    // 年份和星期特殊处理      
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 4
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
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 2
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
function toByte(str) {
    let unit = {
        'B': 1,
        'K': 1024,
        'M': 1024 * 1024,
        'G': 1024 * 1024 * 1024,
        'T': 1024 * 1024 * 1024 * 1024,
    };
    return +str.toUpperCase().replace(/^(\d+)([B|K|M|G|T]){1}$/g, function (all, s1, s2) {
        return s1 * unit[s2] + "";
    });
}
// ********************Vue comp import and export*********************
let compLoadEv = document.createEvent("CustomEvent"); // 为了兼容IE11
_defineProp(window, "_export", function (data) {
    window.vueComponent = data; // 为了兼容IE11
    compLoadEv.initCustomEvent("comploaded", true, true, data);
    document.dispatchEvent(compLoadEv);
});
_defineProp(window, "_import", function (callback) {
    document.addEventListener("comploaded", function () {
        callback && callback(window.vueComponent); // 为了兼容IE11
        window.vueComponent = null; // 为了兼容IE11
        this.removeEventListener("comploaded", arguments.callee);
    }, false);
});
class Yan {
    constructor(options) {
        // ajax setting
        this.ajaxCommon = {
            common: {},
            http2: {
                requestArr: [],
            },
            setting: {
                isDoErrorCallback: true,
            }
        };
        // init todo
        for (let extend in options) {
            if (!this[extend]) {
                this[extend] = options[extend];
            }
        }
    }
    urlParse(str) {
        let _str = str + "", // cache
        _host = "", // cache
        protocol = "", auth, // auth
        username = "", password = "", host = "", port = "", hostname = "", pathname = "", search = "", query = {}, hash = "", matchArr;
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
        port = !!matchArr ? +matchArr[1] : {
            'http': 80,
            'https': 443
        }[protocol] || ""; // 81
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
    http({ url = '/', method = 'GET', data = {}, user = null, password = null, responseType = 'json', timeout = 0, processData = true, contentType = true, headers = {}, complete = () => { }, success = (_) => { }, error = (_) => { } }) {
        if (_isUndef(Promise)) {
            _throwError("Your browser didn't support 'Promise'");
            return;
        }
        // 1
        let xhr = !_isUndef(XMLHttpRequest) ? (new XMLHttpRequest()) : (new window.ActiveXObjcet('Microsoft.XMLHTTP'));
        // async
        return new Promise((resolve, reject) => {
            // judge data is formdata
            if (data instanceof FormData) {
                processData = false; // don't serialize
                contentType = false; // don't set contenttype
            }
            // serialize
            if (processData)
                data = _serialize(data);
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
                xhr.setRequestHeader(key, headers[key]);
            }
            // post set header
            if (contentType && method && method.toUpperCase() == "POST") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            // set timeout
            xhr.timeout = timeout;
            // 3
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        complete && complete();
                        success && success(this.response);
                        resolve(this.response);
                    }
                    else {
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
    get(config) {
        config.method = "GET";
        return this.http(config);
    }
    post(config) {
        config.method = "POST";
        return this.http(config);
    }
    // JSONP
    getJSON(url, data, success, error) {
        if (_isFunc(data)) { // url,success
            success = arguments[1];
            error = arguments[2];
        }
        else { // url,data,success
            if (data) {
                data.t = ~~(Math.random() * 1000) + 1; // don't cache
                url += "?" + _serialize(data);
            }
        }
        let cb = "jsonpCallback" + Math.floor(Math.random() * 100 + 1);
        let jsonp = document.createElement("script");
        jsonp.type = "text/javascript";
        document.body.appendChild(jsonp);
        window[cb] = function (d) {
            success && success(d);
        };
        jsonp.addEventListener("load", function () {
            jsonp.remove();
        });
        jsonp.addEventListener("error", function () {
            error && error("JSONP is failed");
            jsonp.remove();
        });
        jsonp.src = url.slice(-1) === "?" ? `${url}$callback=${cb}` : `${url}?callback=${cb}`;
    }
    http2(config) {
        // detect axios exist
        if (_isUndef(axios_min)) {
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
                config.paramsSerializer = function (params) {
                    return _serialize(params, true);
                };
            }
        }
        // AUTH
        config.headers = config.headers || {};
        // CANCEL REQUEST
        let source2 = axios_min.CancelToken.source();
        config.cancelToken = source2.token;
        this.ajaxCommon.http2.requestArr.push(source2);
        window.cancelAllXHR = this.ajaxCommon.http2.requestArr;
        if (config.cancelAllRequest && config.cancelAllRequest == true) {
            // 清空之前所有请求
            if (this.ajaxCommon.http2.requestArr.length > 0) {
                this.ajaxCommon.http2.requestArr.pop(); // 删除当前
                this.ajaxCommon.http2.requestArr.forEach(function (item) {
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
        axios_min(config)
            .then(function (res) {
            config.complete && config.complete();
            config.success && config.success(res.data);
        })
            .catch(function (err) {
            config.complete && config.complete();
            if (err != "Cancel") { // 取消请求信息不打印
                if (_isFunc(config.error) && that.ajaxCommon.setting.isDoErrorCallback) {
                    config.error(err);
                }
                else {
                    console.error(err);
                }
            }
        });
        return source2;
    }
}
var index = new Yan({
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

export default index;
