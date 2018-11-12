interface iBrowser {
    name: string,
    version: string,
}

export function filterHTML(str: string): string {
    return (str + "").replace(/<\/?([^>]\s?)+>/g, "").trim().replace(/\n|\r|\t/g, "");
}

// browser
export let browser = {
    isIE: !!(window as any).ActiveXObject || "ActiveXObject" in window,
    detail(userAgent?: string): iBrowser {
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

// docCookie
export let docCookie = {
    has(key) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    get(key) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    set(key, val, { expires, path, domain, isSecure }) {
        if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) { return false; }
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
        if (!key || !this.has(key)) { return false; }
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + "; domain=" + domain + "; path=" + path;
        return true;
    },
}
