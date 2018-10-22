
/**
 * filter html element tag
 * 
 * @param {String} str 
 * @returns {String}
 */
export function filterHTML(str: string): string {
    return (str + "").replace(/<\/?([^>]\s?)+>/g, "").trim().replace(/\n|\r|\t/g, "");
}

// browser
export let browser = {
    isIE: !!(window as any).ActiveXObject || "ActiveXObject" in window,
    detail: (function () {
        let ua = window.navigator.userAgent.toLowerCase();
        let browser = {};
        let arrMatch: string[] | null;
        // IE11
        (!~navigator.userAgent.indexOf("MSIE") && ("ActiveXObject" in window)) ? (browser = { name: 'ie', version: '11' }) :
            // IE10-    
            (arrMatch = ua.match(/msie ([\d\.]+)/)) ? (browser = { name: 'ie', version: arrMatch[1] }) :
                // Opera        
                (arrMatch = ua.match(/opr\/([\d\.]+)/)) ? (browser = { name: 'opera', version: arrMatch[1] }) :
                    // Firefox            
                    (arrMatch = ua.match(/firefox\/([\d\.]+)/)) ? (browser = { name: 'firefox', version: arrMatch[1] }) :
                        // Safari       
                        (arrMatch = ua.match(/version\/([\d\.]+).*safari/)) ? (browser = { name: 'safari', version: arrMatch[1] }) :
                            // Chrome                    
                            (arrMatch = ua.match(/chrome\/([\d\.]+)/)) ? (browser = { name: 'chrome', version: arrMatch[1] }) :
                                // Phantomjs                        
                                (arrMatch = ua.match(/phantomjs\/([\d\.]+)/)) ? (browser = { name: 'phantomjs', version: arrMatch[1] }) :
                                    0;
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

// cookie
export let docCookie = {
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