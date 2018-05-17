/**
 *  @Name: Yan.js
 *  @Author: Yangfan
 *  @Ctime: 2017-11-27
 *  @Ptime: 2018-05-10
 *  @Update: 2018-05-17
 *  @Ref: 1. docCookie (https://developer.mozilla.org/en-US/docs/DOM/document.cookie LICENSE:GPL3.0+)
 *        2. axios (https://github.com/axios/axios LICENSE:MIT)
 *  @License: Released under the MIT License.
 *  @Github: https://github.com/Yangfan2016
 */

import axios from "axios"

const factory=function () {

    //*******************GLOBAL_VAR*********************
    var MIMETYPE = {
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'pdf': 'application/pdf',
        'zip': 'application/zip',
        'xml': 'application/xml',
        'js': 'application/javascript',
        'json': 'application/json',
        'txt': 'text/plain',
        'html': 'text/html',
        'css': 'text/css',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'bmp': 'image/bmp',
        'webp': 'image/webp',
        'ico': 'image/x-icon',
        'img*': 'image/*'
    };

    //********************polyfill*******************
    /**
     * 添加下面方法到DOM原型上（目的：兼容和扩展）
     */
    // Node.remove()
    _extendDOMPrototype("remove", function () {
        this.parentNode.removeChild(this);
    });
    // CSS getter and setter TOTHINK
    _extendDOMPrototype("getCss", function (prop) {
        return getCssStyle(this, prop);
    });
    _extendDOMPrototype("setCss", function (obj) {
        setCssStyle(this, obj);
    });

    // *****************private function************************
    var _toString = Object.prototype.toString,
        STRING_OBJECT = "[object Object]";

    /**
     * extend dom function
     * PS: TOLEARN
     * @param {String} key 
     * @param {any} val 
     */
    function _extendDOMPrototype(key, val) {
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

    /**
     * get type of variable
     * 
     * @param {any} obj 
     * @returns {String}
     */
    function _getVarType(obj) {
        return _toString.call(obj).split(" ")[1].slice(0, -1);
    }

    /**
     * is undefined
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isUndef(obj) {
        return typeof obj === "undefined";
    }

    /**
     * is plain object  e.g. {}
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isPlainObject(obj) {
        return _toString.call(obj) === STRING_OBJECT;
    }

    /**
     * is Function
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isFunc(obj) {
        return typeof obj === "function";
    }

    /**
     * is Array
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isArray(obj) {
        return obj instanceof Array;
    }

    /**
     * is Number except NaN and Infinity
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isNumber(obj) {
        return obj === +obj;
    }

    /**
     * is String
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isString(obj) {
        return obj === "" + obj;
    }

    /**
     * is Boolean
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isBoo(obj) {
        return obj === !!obj;
    }

    /**
     * is HTMLElement
     * 
     * @param {any} obj 
     * @returns {Boolean}
     */
    function _isHTMLElement(obj) {
        return typeof HTMLElement === "object" ? (obj instanceof HTMLElement) : (typeof obj === "object" && obj.nodeType == 1 && typeof obj.nodeName === "string");
    }

    /**
     * Object.defineProperty
     * 
     * @param {Object} o 
     * @param {String} key 
     * @param {any} val 
     */
    function _defineProp(o, key, val) {
        Object.defineProperty(o, key, {
            value: val
        });
    }

    /**
     * throw error
     * 
     * @param {String} msg 
     */
    function _throwError(msg) {
        throw new Error(msg);
    }

    /**
     * create stylesheet 
     * ps: 第三方的创建css样式表函数 TOLEARN
     * ps: please use '_insertStyle' instance of this function
     * @param {String} selector 
     * @param {String} style 
     * @returns 
     */
    function _createCSSStyle(selector, style) {
        // 判断支持 styleSheets
        if (!document.styleSheets) {
            return;
        }
        // 判断是否有head
        if (document.getElementsByTagName("head").length == 0) {
            return;
        }

        var stylesheet;
        var mediaType;
        // 判断dom中的样式表存在
        if (document.styleSheets.length > 0) {
            for (i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].disabled) {
                    continue;
                }

                var media = document.styleSheets[i].media;
                mediaType = typeof media;

                if (mediaType == "string") {
                    if (media == "" || (media.indexOf("screen") != -1)) {
                        styleSheet = document.styleSheets[i];
                    }
                } else if (mediaType == "object") {
                    if (media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
                        styleSheet = document.styleSheets[i];
                    }
                }

                if (typeof styleSheet != "undefined") {
                    break;
                }
            }
        }
        // 创建新的style
        if (typeof styleSheet == "undefined") {
            var styleSheetElement = document.createElement("style");
            styleSheetElement.type = "text/css";

            document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

            for (i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].disabled) {
                    continue;
                }
                styleSheet = document.styleSheets[i];
            }

            var media = styleSheet.media;
            mediaType = typeof media;
        }

        if (mediaType == "string") {
            for (i = 0; i < styleSheet.rules.length; i++) {
                if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                    styleSheet.rules[i].style.cssText = style;
                    return;
                }
            }
            // 插入style规则
            styleSheet.addRule(selector, style);
        } else if (mediaType == "object") {
            var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
            for (i = 0; i < styleSheetLength; i++) {
                if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                    styleSheet.cssRules[i].style.cssText = style;
                    return;
                }
            }
            // 插入style规则
            styleSheet.insertRule(selector + "{" + style + "}", styleSheetLength);
        }
    }

    /**
     * insert style
     * 
     * @param {Object} style 
     */
    function _insertStyle(style) {
        for (var selector in style) {
            _createCSSStyle(selector, style[selector]);
        }
    }

    /**
     * serialize data  e.g. {a:"abc",b:"123"} -> "a=abc&b=123"
     * 
     * @param {Object} data 
     * @returns {String}
     */
    function _serialize(data) {
        var arr = [];
        if (typeof data == "object") {
            for (var key in data) {
                if (data[key]!=null) {
                    arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
                }
            }
        }
        // add random param and don't cache
        arr.push("t=" + Math.floor(Math.random() * 1000 + 1));
        return data = arr.join("&");
    }

    /**
     * reverse serialize data  e.g. "a=abc%20%&b=123" -> {"a":"abc","b":"123"}
     * 
     * @param {String} str 
     * @returns {Object}
     */
    function _reSerialize(str) {
        if (str.trim().length == 0) { return "" }
        var arr = str.split("&");
        var data = {};
        arr.forEach(function (item, index) {
            var brr = item.split("=");
            data[brr[0]] = decodeURIComponent(brr[1]);
        });
        return data;
    }

    /**
     * get attribute of dom
     * 
     * @param {HTMLElement} ele 
     * @param {String} attr 
     * @returns 
     */
    function _getAttr(ele, attr) {
        return ele.getAttribute(attr);
    }

    /**
     * set attribute of dom
     * 
     * @param {HTMLElement} ele 
     * @param {Object} obj
     */
    function _setAttr(ele, obj) {
        var key;
        for (key in obj) {
            ele.setAttribute(key, obj[key]);
        }
    }

    /**
     * extend forEach for not only Array
     * 
     * @param {Obejct} context 
     * @param {Function} callback 
     * @returns 
     */
    function _forEach(context, callback) {
        return [].forEach.call(context, callback);
    }

    // ******************public function**************************
    // extend 
    // camel-case -> camelCase
    String.prototype.toCamelCase = function () {
        return this.replace(/-(\w{1})/g, function (all, $1) { return $1.toUpperCase() });
    };
    // "中文" -> "\u4e2d\u6587"
    String.prototype.toUnicode = function () {
        return this.split("").map(function (char, n) {
            return "\\u" + (char.charCodeAt().toString(16));
        }).join("");
    };
    // browser
    var browser = {
        isIE: !!window.ActiveXObject || "ActiveXObject" in window,
        detail: (function () {
            var ua = window.navigator.userAgent.toLowerCase();
            var browser = {};
            var arrMatch = [];
            (arrMatch = ua.match(/msie ([\d\.]+)/)) ? (browser = { name: 'ie', version: arrMatch[1] }) :
                (arrMatch = ua.match(/opr\/([\d\.]+)/)) ? (browser = { name: 'opera', version: arrMatch[1] }) :
                    (arrMatch = ua.match(/firefox\/([\d\.]+)/)) ? (browser = { name: 'firefox', version: arrMatch[1] }) :
                        (arrMatch = ua.match(/version\/([\d\.]+).*safari/)) ? (browser = { name: 'safari', version: arrMatch[1] }) :
                            (arrMatch = ua.match(/chrome\/([\d\.]+)/)) ? (browser = { name: 'chrome', version: arrMatch[1] }) : 0;
            return browser;
        }()),
        isSupportCss: function (prop) {
            // convert str to camelCase
            if (!prop) return false;
            var str = prop.toCamelCase();
            var ele = document.getElementsByTagName("div")[0];
            return str in ele.style;
        },
        isSupportCalc: function () {
            var cache;
            var ele = document.createElement("div");
            ele.style["width"] = "calc(1px + 1px)";
            cache = ele.style["width"];
            ele = null;
            return cache == "calc(2px)";
        },
        isSupportVWVH: function () {
            var cache;
            var ele = document.createElement("div");
            ele.style["width"] = "1vw";
            cache = ele.style["width"];
            ele = null;
            return cache == "1vw";
        }
    };
    // base64
    var base64 = {
        encode: function (str) {
            if (_isUndef(window.btoa)) {
                _throwError("window.btoa is not defined");
            }
            return window.btoa(window.encodeURIComponent(str));
        },
        decode: function (BASE64) {
            if (_isUndef(window.atob)) {
                _throwError("window.atob is not defined");
            }
            return window.decodeURIComponent(window.atob(BASE64));
        },
    };

    /**
     * 千分位转换法
     * 
     * @param {any} num 
     * @returns {String}
     */
    function toThousands(num) {
        return (num || 0).toLocaleString("en-US"); // 123456->123,456
    }

    /**
     * 格式化日期 三方
     * 
     * @param {String} fmt 
     * @param {Date} date  1519700193000 "1519700193000" "/Date(1519700193000)/" "2018-2-27"
     * @returns {String}
     */
    function toFormatDate(fmt, date) { // "YYYY-MM-DD hh:ii:ss.ms W q" | "timestamp"
        var now;

        // 容错处理
        if (date instanceof Date) { // Date
            now = date;
        } else {
            // string || number && !NaN
            if (typeof date == "string") {
                date = date.trim();
                date = date.replace(/\/Date\((\d+)\)\//g, "$1"); // "/Date(1519700193000)/"
                // "1519700193000" -> 1519700193000
                date = +date == date ? +date : date;
            } else if (typeof date == "number") {
                date = isNaN(date) ? 0 : date;
            } else {
                date = 0;
            }
            // 兼容ie
            if (typeof date == "string" && date != (date + "")) {
                var arr = date.split(/[- : \/]/);
                now = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
            } else {
                now = new Date(date);
            }
            now = now == "Invalid Date" ? new Date(0) : now;
        }
        // 时间戳
        if (fmt == "timestamp") return Date.parse(now);

        var o = {
            "M+": now.getMonth() + 1, //月份         
            "D+": now.getDate(), //日         
            "h+": now.getHours() % 12 == 0 ? 12 : now.getHours() % 12, //小时  12h   
            "H+": now.getHours(), //小时  24H       
            "i+": now.getMinutes(), //分         
            "s+": now.getSeconds(), //秒         
            "q+": Math.floor((now.getMonth() + 3) / 3), //季度         
            "ms": now.getMilliseconds() //毫秒         
        };
        var week = {
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
            fmt = fmt.replace(RegExp.$1, (now.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(W+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[now.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
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
        str = str + "";
        if (/^\d+$/g.test(str)) {
            return str;
        } else {
            var unit = {
                'B': 1,
                'K': 1024,
                'M': 1048576,
                'G': 1073741824,
                'T': 1099511627776
            };
            return str.toUpperCase().replace(/^(\d+)([B|K|M|G|T]){1}$/g, function (all, s1, s2) {
                return s1 * unit[s2];
            })-0;
        }
    }

    //=======================DOM=============================
    /**
     * getDOM by querySelectorAll
     * PS:BUG
     * @param {String} selector 
     * @returns 
     */
    function getDOM(selector, context) {
        var ctx = _isUndef(context) ? document : context;
        if (!!ctx.querySelectorAll) {
            var doms = ctx.querySelectorAll(selector);
            var res = (doms.length == 0 ? null : doms);
            return res;
        } else {
            _throwError("The querySelectorAll of '" + ctx + "' is not function");
        }
    }

    /**
     * parse html str to DOM
     * ps: TODO
     * @param {HTMLElement} parent 
     * @param {String} str 
     */
    function parseHTML(parent, str) {
        // ============parse script=============
        parent.innerHTML += str;

        var doms = parent.getElementsByTagName("SCRIPT"),
            domArr = [];

        // create
        [].forEach.call(doms, function (dom, index) {
            var s = document.createElement("script");
            if (dom.type) s.type = dom.type;
            if (dom.src) s.src = dom.src;
            if (dom.innerHTML) s.innerHTML = dom.innerHTML;
            domArr.push(s);
        });
        // replace
        domArr.forEach(function (item, index) {
            doms[index].remove();
            parent.appendChild(item);
        });

        // =========parse style===============
        var styles = parent.getElementsByTagName("STYLE"),
            styleArr = [],
            styleRule = "";

        // justify scoped
        var css = styles[0];
        var isScoped = false;
        var version = Date.parse(new Date());
        if (css.dataset.hasOwnProperty("scoped")) {
            isScoped = true;
        }

        // create
        [].forEach.call(styles, function (style, index) {
            var s = document.createElement("style");
            styleRule += style.innerText.replace(/(\n|\t|\r)/g, "");
            style.remove();
        });
        // insert
        var styleRuleArr = styleRule.split("}");
        styleRuleArr.forEach(function (rule, eq) {
            var r = rule && rule.split("{");

            if (rule) {
                if (isScoped) {
                    var tpl = parent.getElementsByTagName("template")[0];
                    [].forEach.call(tpl.content.querySelectorAll(r[0]), function (dom, m) {
                        dom.dataset["v-" + version] = "";
                    });
                    _createCSSStyle(r[0] + "[data-v-" + version + "]", r[1]);
                } else {
                    _createCSSStyle(r[0], r[1]);
                }
            }
        });
    }

    /**
     * filter html element tag
     * 
     * @param {String} str 
     * @returns {String}
     */
    function filterHTML(str) {
        return (str + "").replace(/<\/?([^>]\s?)+>/g, "").trim().replace(/\n|\r|\t/g, "");
    }

    /**
     * get style of css
     * 
     * @param {HTMLElement} ele 
     * @param {String} prop 
     * @returns
     */
    function getCssStyle(ele, prop) {
        if (!!window.getComputedStyle) {
            return window.getComputedStyle(ele, null)[prop];
        } else {
            return ele.currentStyle[prop];
        }
    }

    /**
     * set style of css
     * 
     * @param {HTMLElement} ele 
     * @param {Object} obj
     */
    function setCssStyle(ele, obj) {
        var key;
        for (key in obj) {
            ele.style[key] = obj[key];
        }
    }

    // **********************Events********************************
    var Events = {};
    /**
     * emit custom event
     * ps:TODO one
     * @param {String} type 
     * @param {any} data 
     */
    function emit(type, data) {
        var that = _isHTMLElement(this) ? this : document;
        var customEvent = new CustomEvent(type, {
            detail: data
        });
        that.dispatchEvent(customEvent);
    }

    /**
     * listen custom event
     * 
     * @param {String} type 
     * @param {Function} fn 
     * @param {Boolean} boo
     */
    function on(type, fn, n) {
        var that = _isHTMLElement(this) ? this : document;
        !_isArray(Events[type]) && (Events[type] = []);
        if (n == 1) {
            var fn2 = function (ev) {
                fn(ev);
                that.off(type);
            };
            Events[type].push(fn2);
            that.addEventListener(type, fn2, false);
        }
        else {
            Events[type].push(fn);
            that.addEventListener(type, fn, false);
        }
    }

    /**
     * listen custom event only emit one
     * 
     * @param {String} type 
     * @param {Function} fn 
     */
    function one(type, fn) {
        var that = _isHTMLElement(this) ? this : document;
        that.on(type, fn, 1);
    }

    /**
     * remove custom event
     * 
     * @param {String} type 
     * @param {Function} fn 
     */
    function off(type, fn) {
        var that = _isHTMLElement(this) ? this : document;
        var index = Events[type].indexOf(fn);
        if (_isFunc(fn) && index != -1) {
            var index = Events[type].indexOf(fn);
            index >= 0 && Events[type].splice(index, 1);
            that.removeEventListener(type, fn, false);
        } else {
            Events[type].forEach(function (fn, n) {
                that.removeEventListener(type, fn, false);
            });
        }
        delete Events[type];
    }

    //************************layer**********************************
    var layerStyle = {
        tip: {
            ".k_tipbox": '\
                position:fixed;\
                top:0;\
                right:20px;\
                max-height:100%;\
                overflow-y:auto;\
                overflow-x:hidden;\
            ',
            ".k_tip": '\
                width:300px;\
                min-height:40px;\
                margin: 5px 0;\
                padding:20px 15px;\
                border-radius:2px;\
                box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);\
                font-size:12px; \
                color:#fff;\
                opacity:0;\
                animation:opacityA 0.5s ease,opacityB 0.5s ease 5s;\
                animation-fill-mode:forwards;\
            ',
            ".info": '\
                background-color:rgb(79, 138, 255);\
            ',
            ".ok": '\
                background-color:rgb(57, 169, 36);\
            ',
            ".warn": '\
                background-color:rgb(247, 194, 45);\
            ',
            ".error": '\
                background-color:rgb(216, 11, 11);\
            ',
            "@keyframes opacityA": '\
                0%{\
                    opacity:0;\
                }\
                100%{\
                    opacity:1;\
                }\
            ',
            "@keyframes opacityB": '\
                0%{\
                    opacity:1;\
                }\
                100%{\
                    opacity:0;\
                }\
            '
        },
        alert: {
            ".k_mask": '\
                position:fixed;\
                top:0;\
                left:0;\
                width:100%;\
                height:100%;\
                background-color:rgba(0,0,0,0.5);\
                z-index:9;\
            ',
            ".k_alert": '\
                position:fixed;\
                top:5%;left:50%;\
                width:500px;\
                padding:15px;\
                transform:translate(-50%,0);\
                border-radius:3px;\
                background-color:#fff;\
                color:#333;\
                z-index:10;\
                opacity:0;\
                animation:slideDown 0.3s ease-in-out;\
                animation-fill-mode:forwards;\
            ',
            ".k_alert.hide": '\
                animation:slideUp 0.3s ease-in-out;\
                animation-fill-mode:forwards;\
            ',
            ".k_alert>.main_closebtn": '\
                position:absolute;\
                top:10px;right:20px;\
                font-size:2rem;\
                color:#7d7979;\
                cursor:pointer;\
                -webkit-transition:all ease 0.3s;\
                transition:all ease 0.3s;\
            ',
            ".k_alert>.main_closebtn:hover": '\
                -webkit-transform:scale(1.2);\
                transform:scale(1.2);\
            ',
            ".k_alert>.main_head": '\
                margin:10px 0;\
                font-size:1rem;\
            ',
            ".k_alert>.main_body": '\
                margin:20px 0;\
                font-size:0.7rem;\
            ',
            ".k_alert>.main_foot": '\
                text-align:right;\
            ',
            ".k_alert>.main_foot>.foot_btn": '\
                display:inline-block;\
                margin:10px;\
                padding:5px 15px;\
                border:1px solid #538BDB;\
                border-radius:3px;\
                text-align:center;\
                color:#538BDB;\
                -webkit-transition:all ease 0.3s;\
                transition:all ease 0.3s;\
                cursor:pointer;\
            ',
            ".k_alert>.main_foot>.foot_btn.yes:hover": '\
                background-color:#1f74ec;\
                color:#fff;\
            ',
            "@keyframes slideDown": '\
                0%{\
                    top:0;\
                    opacity:0;\
                }\
                100%{\
                    top:5%;\
                    opacity:1;\
                }\
            ',
            "@keyframes slideUp": '\
                0%{\
                    top:5%;\
                    opacity:1;\
                }\
                100%{\
                    top:0;\
                    opacity:0;\
                }\
            '
        },
        lay: {
            ".k_container": '\
                position: fixed;\
                top: 50%;\
                left: 50%;\
                -webkit-transform: translate(-50%,-50%);\
                transform: translate(-50%,-50%);\
            ',
            ".k_backscreen": '\
                position: absolute;\
                top: 0;\
                left: 0;\
                right: 0;\
                bottom: 0;\
                width: 100%;\
                height: 100%;\
                background-color: rgba(0,0,0,0);\
                z-index: 99\
            ',
            ".k_loadpic": '\
                position: absolute;\
                top: 50%;\
                left: 50%;\
                -webkit-transform: translate(-50%,-50%);\
                transform: translate(-50%,-50%);\
            ',
            ".k_message": '\
                padding:10px 15px;\
                text-align:center;\
                background-color:rgba(0,0,0,0.15);\
                color:#fff;\
                border-radius: 2px;\
            ',
        }
    };
    var layerCommon = {
        tip: {
            isCanCreate: true,
            limit: 10,
            isInsertedStyle: false
        },
        alert: {
            eq: 0,
            isInsertedStyle: false
        },
        lay: {
            isInsertedStyle: false,
            index: -1,
            targetDOMArr: [],
            loadElemObj: {},
            imgSrc: "data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=",
            getDOMById: function (id) {
                return document.getElementById(id);
            },
            close: function (flag) {
                // remove all add dom
                var deleDOM = layerCommon.lay.getDOMById(flag);
                if (!!deleDOM) {
                    deleDOM.remove();
                    delete layerCommon.lay.loadElemObj[flag];
                }
                // reset dom style info
                if (layerCommon.lay.targetDOMArr.length > 0) {
                    layerCommon.lay.targetDOMArr.forEach(function (dom, index) {
                        dom.setCss({
                            "position": dom.dataset.stylePos
                        });
                    });
                }
            },
            closeAll: function () {
                var that = this;
                for (var flag in layerCommon.lay.loadElemObj) {
                    that.close(flag);
                }
                layerCommon.lay.index = -1;
            },
        }
    };

    /**
     * tip
     * 
     * @param {String} content 
     * @param {String} type 
     */
    function tip(content, type) {
        if (!layerCommon.tip.isCanCreate) return;

        var tipType = ["info", "ok", "error", "warn"],
            containerEle = document.body,
            hasTipBox = getDOM("#kTipBox"),
            tipBoxEle = (hasTipBox && hasTipBox[0]) || document.createElement("div"),
            tipEle = document.createElement("div");

        // type default "info"
        tipType.indexOf(type) == -1 ? type = "info" : 0;
        // insert style once
        !layerCommon.tip.isInsertedStyle && _insertStyle(layerStyle.tip);
        layerCommon.tip.isInsertedStyle = true;

        tipBoxEle.id = "kTipBox";
        tipBoxEle.className = "k_tipbox";
        tipEle.className = "k_tip " + type;
        tipEle.innerText = content;

        tipBoxEle.appendChild(tipEle);
        // append kMsgBox once
        !hasTipBox && containerEle.appendChild(tipBoxEle);

        tipEle.addEventListener("animationend", function () {
            var opacity = getComputedStyle(this, null)["opacity"];
            if (opacity == 0) {
                this.remove();
                if (!tipBoxEle.hasChildNodes()) {
                    tipBoxEle.remove();
                    layerCommon.tip.isCanCreate = true;
                }
            }
        });
        // limit the length of tip
        var len = tipBoxEle.childElementCount;
        layerCommon.tip.isCanCreate = len >= layerCommon.tip.limit ? false : true;
    }

    /**
     * alert
     * 
     * @param {String} content 
     * @param {Function} callback 
     */
    function blert(content, callback) {
        var containerEle = document.body,
            hasMask = getDOM("#kMask"),
            maskEle = document.createElement("div"),
            alertEle = document.createElement("div");

        // insert style once
        !layerCommon.alert.isInsertedStyle && _insertStyle(layerStyle.alert);
        layerCommon.alert.isInsertedStyle = true;

        maskEle.id = "kMask";
        maskEle.className = "k_mask";
        alertEle.className = "k_alert";
        alertEle.innerHTML = '\
            <div class="main_closebtn">&times;</div>\
            <div class="main_head">\
                <p class="head_title">'+ (location.host || "此网页") + '} 显示：</p>\
            </div>\
            <div class="main_body">${content}</div>\
            <div class="main_foot">\
                <div class="foot_btn yes">确定</div>\
            </div>';

        containerEle.appendChild(alertEle);
        // append mask once
        !hasMask && containerEle.appendChild(maskEle);

        var btnClose = getDOM(".main_closebtn")[layerCommon.alert.eq],
            btnOk = getDOM(".foot_btn.yes")[layerCommon.alert.eq];

        btnClose.addEventListener("click", function () {
            alertEle.classList.add("hide");
        });
        btnOk.addEventListener("click", function () {
            alertEle.classList.add("hide");
            callback && callback();
        });
        alertEle.addEventListener("animationend", function () {
            if (alertEle.classList.contains("hide")) {
                maskEle.remove();
                alertEle.remove();
                layerCommon.alert.eq--;
            }
        });

        layerCommon.alert.eq++;
    }

    /**
     * MyLayer
     * 
     * @param {String} el 
     * @param {Object} config 
     */
    function MyLayer(el, config) {
        this.el = el || 0;
        this.config = config || {};
        this.elem = (this.el === 0) ? document.body : document.querySelectorAll(el)[0];
        // insert style once
        !layerCommon.lay.isInsertedStyle && _insertStyle(layerStyle.lay);
        layerCommon.lay.isInsertedStyle = true;
    }
    MyLayer.prototype.open = function (setting) { // {type:0,content:"",title:""}
        var that = this;
        // flag
        layerCommon.lay.index++;
        that.flag = "L" + layerCommon.lay.index;
        // create container element
        var containerElem = document.createElement("div");
        containerElem.id = that.flag;
        containerElem.className = "k_container";

        // 0（信息框 alert，默认）1（页面层）2（iframe层）3（加载层 load）4（tips层 msg）
        switch (setting.type) {
            case 3: // load
                var loadElem = document.createElement("img");
                containerElem.className = "k_backscreen";
                loadElem.className = "k_loadpic";
                loadElem.src = layerCommon.lay.imgSrc;
                loadElem.alt = "loading-pic";
                loadElem.title = "loading";
                // 全屏 load
                if (that.el === 0) {
                    containerElem.setCss({
                        "position": "fixed"
                    });
                } else {
                    var s = that.elem.getCss("position");
                    if (!s || s == "static") {
                        that.elem.dataset.stylePos = s; // 存储原始样式信息
                        that.elem.setCss({
                            "position": "relative"
                        }); // bug 改变父元素的position
                    }
                }
                if (that.config.shade) {
                    containerElem.setCss({
                        "backgroundColor": "rgba(0,0,0," + that.config.shade + ")"
                    });
                }
                containerElem.appendChild(loadElem);
                break;
            case 4: // msg
                var msgElem = document.createElement("p");
                msgElem.className = "k_message";
                msgElem.innerHTML = setting.content || " ";
                if (that.config.shade) {
                    msgElem.setCss({
                        "backgroundColor": "rgba(0,0,0," + that.config.shade + ")"
                    });
                }
                containerElem.appendChild(msgElem);
                break;
            default:
                return 0;
                break;
        }

        // append DOM  
        that.elem.appendChild(containerElem);
        // save data
        layerCommon.lay.loadElemObj[that.flag] = containerElem;
        // timeout close
        clearTimeout(that.timer);
        if (that.config.time > 0) {
            that.timer = setTimeout(function () {
                layerCommon.lay.close(that.flag);
                clearTimeout(that.timer);
            }, that.config.time);
        }
        layerCommon.lay.targetDOMArr.push(that.elem);
        return that.flag;
    };
    // export
    var layer = {
        load: function (el, config) {
            return new MyLayer(el, config).open({ type: 3 });
        },
        msg: function (content) {
            return new MyLayer(0, {
                time: 2000,
                shade: 0.6
            }).open({ type: 4, content: content });
        },
        close: function (flag) {
            var timer = setTimeout(function () {
                layerCommon.lay.close(flag);
                clearTimeout(timer);
            }, 100);
        },
        closeAll: layerCommon.lay.closeAll
    };

    // **********************ajax*********************************
    var ajaxCommon = {
        common: {
            AJAX_NATIVE: false, // 默认使用axios三方ajax库
            // ============AUTHENTICATE======================
            makeAuth: function () {
                // private
                return {};
            },
        },
        http2: {
            requestArr: [],
        },
        setting: {
            isDoErrorCallback: true, // 默认执行失败回调
        }
    };

    /**
     * class Url for parse url
     * 
     */
    function Url() {

    }

    Url.prototype.parse = function (str) {
        var that = this;

        var _str = str + "", // cache
            _host = "",  // cache
            protocol = "",
            auth = "",  // auth
            username = "",
            password = "",
            host = "",
            port = "",
            hostname = "",
            pathname = "",
            search = "",
            query = {},
            hash = "";

        // 简单判断是否合法url
        //if (!/^https?:\/\//.test(_str)) {
        //    console.warn("This string is invalid url, the result of return maybe is wrong");
        //}

        // 协议
        protocol = /^(https?):/g.exec(_str);
        protocol = !!protocol ? protocol[1] : ""; // http|https
        // 去除
        _str = _str.replace(protocol, "");
        // 域名(:端口)?
        host = /(([^\s\/\?#]+\.)+([^#\?\/]+))/g.exec(_str); // nodejs.org:81 | user:pass@qq.com
        host = !!host ? host[1] : "";
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
        port = /:(\d+)/g.exec(host);
        port = !!port ? port[1] :({
            http:80,
            https:443
        })[protocol] || ""; // 81
        // 域名
        hostname = host.replace(":" + port, ""); // nodejs.org
        // 去除
        _str = _str.replace(_host, "");
        // 路径
        pathname = /((\/[^\/\?#]+)+)/g.exec(_str);
        pathname = !!pathname ? pathname[1] : ""; // /dist/latest-v8.x/docs/api/url.html
        // 去除
        _str = _str.replace(pathname, "");
        // 查询参数
        search = /\?([^#]+)/g.exec(_str);
        search = !!search ? search[1] : ""; // q=123&name=jobs&age=100
        // 去除
        _str = _str.replace("?" + search, "");
        // 哈希值
        hash = /#([^#]+)$/g.exec(_str);
        hash = !!hash ? hash[1] : "";
        // 查询参数 反序列化
        query = _reSerialize(search);

        // 12/8 TODO

        return {
            protocol: protocol,
            username: username,
            password: password,
            host: host,
            port: port,
            hostname: hostname,
            pathname: pathname,
            search: search,
            query: query,
            hash: hash,
        };
    }

    /**
     *  jsonp
     * 
     * @param {String} url 
     * @param {String | Object} data 
     * @param {Function} success 
     * @param {Function} error 
     */
    function getJSON(url, data, success, error) {
        if (_isFunc(data)) { // url,success
            success = arguments[1];
            error = arguments[2];
        } else { // url,data,success
            if (data) {
                url += "?" + _serialize(data);
            }
        }
        var cb = "jsonpCallback" + Math.floor(Math.random() * 100 + 1);
        var jsonp = document.createElement("script");
        jsonp.type = "text/javascript";
        document.body.appendChild(jsonp);

        window[cb] = function (d) {
            success && success(d);
        };

        jsonp.addEventListener("load", function (d) {
            jsonp.remove();
        });
        jsonp.addEventListener("error", function (ev) {
            error && error("JSONP is failed");
            jsonp.remove();
        });
        jsonp.src = url + '&callback=' + cb;
    }
    /**
     * ajax by native js
     * DEMO: test no auth
     * PS:TODO
     * @param {Object} config 
     * @returns 
     */
    function http(config) {
        if (_isUndef(Promise)) {
            _throwError("Your browser didn't support 'Promise'");
            return;
        }
        // 1
        var xhr = !_isUndef(XMLHttpRequest) ? (new XMLHttpRequest()) : (new ActiveXObjcet('Microsoft.XMLHTTP')),
            data = config.data || null;
        // async
        new Promise(function (resolve, reject) {

            // init config and default
            config.url = config.url || "/";
            config.method = config.method || "GET";
            config.data = config.data || null;
            config.user = config.user || null;
            config.password = config.password || null;
            config.responseType = config.responseType || "json";
            config.timeout = config.timeout || 0;

            !_isBoo(config.processData) ? config.processData = true : 0; // 是否序列化数据
            !_isBoo(config.contentType) ? config.contentType = true : 0; // 是否设置contentType

            // judge data is formdata
            if (data instanceof FormData) {
                config.processData = false; // don't serialize
                config.contentType = false; // don't set contenttype
            }

            // serialize
            if (config.processData) data = _serialize(data);

            // judge jsonp or ajax
            if (config.responseType.toLowerCase() == "jsonp") {
                getJSON(config.url, config.data, resolve, reject);
                return false;
            }

            // if method is 'get', add data to url and let data is null
            if (config.method.toUpperCase() == "GET") {
                config.url += "?" + data;
                data = null;
            }

            // 2
            xhr.open(config.method, config.url, true, config.user, config.password);
            // set responseType
            xhr.responseType = config.responseType;

            config.isAuth = _isUndef(config.isAuth) ? false : !!config.isAuth;
            config.isAuth && (config.headers["common"] = ajaxCommon.common.makeAuth());

            // set headers
            if (config.headers) {
                for (var key in config.headers) {
                    xhr.setRequestHeader(key, config.headers[key]);
                }
            }
            // post set header
            if (config.contentType && config.method && config.method.toUpperCase() == "POST") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            // set timeout
            xhr.timeout = config.timeout;

            // 3
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        config.complete && config.complete();
                        config.success && config.success(this.response);
                        resolve(this.response);
                    } else {
                        config.complete && config.complete();
                        config.error && config.error(this.status + " " + this.statusText);
                        reject(this.status + " " + this.statusText);
                    }
                }
            });

            // 4
            xhr.send(data);

            // cancel request of xhr
            xhr.cancel = xhr.abort;
        });
        return xhr;
    }

    http.get = function (config) {
        config.method = "GET";
        return http(config);
    };
    http.post = function (config) {
        config.method = "POST";
        return http(config);
    };

    /**
     * 改造过的 axios
     * 
     * @param {Object} config 
     * @returns 
     */
    function http2(config) {
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
        // URL
        config.url = config.url || "/";
        // GET data->params
        if (!config.method || config.method.toUpperCase() === "GET") {
            config.params = config.data;
            delete config.data;
        }
        // AUTH
        config.headers = config.headers || {};
        config.isAuth = _isUndef(config.isAuth) ? false : !!config.isAuth;
        config.isAuth && (config.headers["common"] = ajaxCommon.common.makeAuth());

        // CANCEL REQUEST
        var source2 = axios.CancelToken.source();
        config.cancelToken = source2.token;
        ajaxCommon.http2.requestArr.push(source2);
        window.cancelAllXHR = ajaxCommon.http2.requestArr;

        if (config.cancelAllRequest && config.cancelAllRequest == true) {
            // 清空之前所有请求
            if (ajaxCommon.http2.requestArr.length > 0) {
                ajaxCommon.http2.requestArr.pop(); // 删除当前
                ajaxCommon.http2.requestArr.forEach(function (item, index) {
                    item.cancel();
                });
                ajaxCommon.http2.requestArr = [];
            }
        }
        // OTHERS setting
        config.timeout = config.timeout || 30 * 1000; // 超时放弃请求

        // default set responseType to 'json'
        config.responseType = config.responseType || 'json';

        // judge jsonp or ajax
        if (config.responseType && config.responseType.toLowerCase() == "jsonp") {
            getJSON(config.url, config.data, config.success, config.error);
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
                    if (_isFunc(config.error) && ajaxCommon.setting.isDoErrorCallback) {
                        config.error(err);
                    } else {
                        console.error(err);
                    }
                }
            });
        return source2;
    }
    http2.getJSON = http.getJSON = getJSON;

    // ajax降级处理 TEMP
    // 是否使用备用ajax函数
    if (!ajaxCommon.common.AJAX_NATIVE) {
        if (_isUndef(axios)) {
            console.warn("This lib need axios.js\nDownload: https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js");
        } else {
            http = http2;
            // 增加标识
            http._source = "axios";
            // console.log("%cThank 'axios.js' for providing the XMLHTTPRequest service \nAbout: https://github.com/axios/axios", "color:#666;");
        }
    }

    //***********************upload******************************
    var formCommon = {
        fileData: {},
        verifyRule: {
            number: [/^\d+$/, "请输入数字，旁友！"],
            email: [/^([a-zA-Z0-9_\-])+\@(([a-zA-Z0-9_\-])+\.)+([a-zA-Z0-9_\-]){2,4}$/, "请输入合法格式的邮箱！"],
            phone: [/^1[3|5|7|8]\d{9}$/, "请输入合法格式的手机号！"], // 1|3,5,7,8\d{9}
            tellphone: [/^\d{3}\d?\-\d{7}\d?(\-\d{4})?$/, "请输入电话号码"], // 3|4-7|8(-4)? 区号-直播号（-分机号）
            year: [/^\d{4}$/, "旁友，不是合法格式的年份，好伐！"],
            date: [/^\d{4}([\-\/])([1-9]|0[1-9]|1[0-2])\1(\d|0\d|[1-2][0-9]|3[0-1])$/, "请输入合法格式的日期！"], // 2017-12-07 2017/1/31
            url: [/(^#)|(^http(s?)\:\/\/([^\s\.]+\.)+([^\s\.])+$)/, "请输入合法url地址！"],
            idcard: [/(^\d{15}$)|(^\d{17}[x|X|\d]$)/, "请输入合法身份证！"] // 15|(17[x|X|\d])
        },
        verifyMaxLen: [] // cache
    };
    /**
     * 图片预览  IE10+ 
     * 
     * @param {HTMLInputElement} input_file 
     * @param {HTMLDocument} picBox 
     * @param {Function} callback 
     */
    function previewImage(input_file, picBox, callback) {
        var path,
            id = 'imgTmp',
            img;

        var createImg = function (src) {
            img = new Image();
            img.src = path;
            img.id = id;
            img.onload = function () {
                callback && callback(img); // 图片加载完成，回调
            };
        };

        if (typeof FileReader !== 'undefined') { //  FileReader    IE10+
            var reader = new FileReader();
            reader.onload = function (e) {
                var ev = e || window.event,
                    target = ev.target || ev.srcElement;

                path = target.result;
                createImg(path);
            };
            reader.readAsDataURL(input_file); // 该方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成（DONE），并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容
        } else if (typeof URL !== 'undefined') { //  createObjectURL   IE10+
            path = window.URL.createObjectURL(input_file.files[0]);
            createImg(path);
        } else {  //  IE  滤镜
            input_file.select();
            path = document.selection.createRange().text;
            picBox.innerHTML = "";
            picBox.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"; // 使用滤镜效果
            callback && callback(picBox);
        }
    }
    // class MyFile of upload file
    function MyFile() {

    }
    MyFile.prototype.upload = function (config) {
        var that = this,
            data = {}, // 额外数据
            isCanSend = false; // 默认禁止上传 

        that.setting = config;
        that.ele = getDOM(config.el)[0]; // input[type="file"] 
        that.file = null; // 文件数据

        // Init 初始化 accept='image/jpg,image/gif'
        if (config.accept && config.accept.length > 0) {
            that.ele.accept = (config.accept).map(function (item, index) {
                return MIMETYPE[item] || '';
            }).join(',');
        }

        // Event change 选择文件
        that.ele.addEventListener('change', function (e) {
            var ev = e || window.event,
                target = ev.target || ev.srcElement;
            that.file = target.files[0];

            // cache file data
            formCommon.fileData[config.el] = that.file;


            // onFileChange 暴露出文件信息
            if (typeof (config.onFileChange) === 'function') {
                config.onFileChange(that.file);
            }
            // 判断是否选择文件
            if (that.file) {
                isCanSend = true;
                // 1. 判断文件类型 后缀
                if (!!config.accept) {
                    // jpg,jpeg=>jpg  img*=>image
                    config.accept = config.accept.map(function (item, index, array) {
                        if (item === "img*") {
                            item = "image";
                        }
                        return item == "jpeg" ? "jpg" : item;
                    });

                    var reg = new RegExp('\\.(' + config.accept.join('|') + ')$', 'g'); // Reg /\.(jpg|gif|png)$/g
                    // 判断文件后缀
                    if (!reg.test(that.file.name)) {
                        isCanSend = false;
                        // 判断是否是图片文件 image/*
                        if (that.file.type.indexOf("image") !== -1) {
                            if (config.accept.indexOf("image") !== -1) {
                                isCanSend = true;
                            }
                        }
                        if (!isCanSend) {
                            config.acceptError && config.acceptError();
                            return false;
                        }
                    } else {
                        isCanSend = true;
                    }

                }
                // 2. 判断文件大小
                if (that.file.size == 0) {
                    config.sizeError && config.sizeError(0);
                    isCanSend = false;
                    return false;
                } else {
                    if (!!config.maxSize) {
                        if (that.file.size > toByte(config.maxSize)) {
                            config.sizeError && config.sizeError(1);
                            isCanSend = false;
                            return false;
                        } else {
                            isCanSend = true;
                        }
                    }
                }
                // 3. 预览图片?
                if (isCanSend && config.previewBox) {
                    var previewBoxEle = getDOM(config.previewBox)[0];
                    var preivewFunc = function (img) {
                        // 加载图片，进行预览
                        previewBoxEle.innerHTML = "";
                        previewBoxEle.appendChild(img);
                        // 执行预览图片后的回调
                        config.previewCallBack && config.previewCallBack(img, data);
                    };
                    previewImage(that.file, previewBoxEle, function (img) {
                        // 判断图片比例
                        if (config.scale && config.scale.length == 2) {
                            if (img.width >= config.scale[0] && img.height >= config.scale[1] && img.height <= window.innerHeight) {
                                isCanSend = true;
                                preivewFunc(img);
                            } else {
                                config.scaleError && config.scaleError();
                                isCanSend = false;
                                return false;
                            }
                        } else {
                            preivewFunc(img);
                        }
                    });
                }
            } else {
                that.file = null;
                isCanSend = false;
            }
        });

        // Event upload 提交 可选项（如果没有url和btn参数，就认为手动ajax发送数据）
        if (config.btn && config.url) {
            var submitBtn = getDOM(config.btn)[0];
            submitBtn.addEventListener('click', function () {
                // 没有选择文件，或文件为空
                if (!(that.file)) console.log("%c没有选择文件哦", "font-size:18px;color:#f00;");

                var isCanDoAjax = true;
                var formData = new FormData(); // 表单数据
                // 额外的回调
                if (typeof (config.onBeforeSend) === 'function') {
                    isCanDoAjax = config.onBeforeSend(data);
                }
                // 是否中断发送
                if (isCanDoAjax) {
                    // 发送普通数据
                    // 额外发送的数据 例如 appid
                    if (_isPlainObject(config.data) && Object.keys(config.data).length > 0) {
                        for (key in config.data) {
                            formData.append(key, config.data[key]);
                        }
                    } else {
                        formData.append("data_" + Date.parse(new Date()), config.data);
                    }
                    // 额外发送的数据 例如裁剪
                    if (_isPlainObject(data) && Object.keys(data).length > 0) {
                        for (key in data) {
                            formData.append(key, data[key]);
                        }
                    }
                    // 将文件信息填入表单
                    if (isCanSend) {
                        formData.append('file', that.file);
                    } else {
                        if (typeof config.sendNull === 'function') {
                            return config.sendNull(); // 是否中断ajax发送
                        }
                    }
                    // 发送
                    http({
                        url: config.url,
                        method: 'POST',
                        data: formData, // 表单数据
                        processData: false, // 不要对data参数进行序列化处理，默认为true
                        contentType: false, // 不要设置Content-Type请求头，因文件数据是以 multipart/form-data 来编
                        success: function (data) {
                            isCanSend = false; // 禁止重复上传
                            config.success && config.success(data);
                        },
                        error: function (err) {
                            config.error && config.error(err);
                        },
                        isAuth: false
                    });
                }
            });
        }
        return that;
    };

    MyFile.prototype.submit = function (contextArr, callback) {
        var that = this;
        var context = null;
        if (_isFunc(contextArr)) { // 只有一个参数时
            callback = contextArr;
            context = that;
        } else if (_isArray(contextArr)) {
            context = contextArr;
        } else {
            _throwError("参数类型错误");
            return false;
        }
        // 执行回调
        callback && callback(context);
        return that;
    };
    // class MyForm of form
    function MyForm(el) {
        this.form = getDOM(el)[0];
        this.verifyELes;
        this.isHTMLForm = _getVarType(this.form) == "HTMLFormElement";
    }

    MyForm.prototype.submit = function (callback) {
        var that = this,
            submitBtn = getDOM("[k-submit]", that.form)[0],
            eles = !(that.isHTMLForm) ? getDOM("[name]", that.form) : [], // form下的所有带name属性的元素
            formData = null, // 存储表单数据
            isCanSubmitData = {}, // 验证结果数据
            data = {}, // 表单数据
            errArr = [], // 储存错误的数组
            maxLen = 0, // 输入字数限制
            maxLenKey = ""; // 字数限制的key

        // 获取所有验证元素
        that.verifyELes = getDOM("[k-verify]", that.form);
        // 点击提交按钮进行验证
        submitBtn.addEventListener("click", function () {
            errArr = []; // clear
            // 逐个元素验证
            _forEach(that.verifyELes, function (dom, eq) {
                // 获取延证项
                var str = dom.value.trim(),
                    verifyArr = _getAttr(dom, "k-verify").split("|"),
                    indexReq = verifyArr.indexOf("required"),
                    indexMaxLen = verifyArr.join(",").indexOf("len["),
                    isRequired = indexReq != -1 ? true : false,
                    isLimitLen = indexMaxLen != -1 ? true : false;

                // 判断是否必填
                if (isRequired) {
                    verifyArr.splice(indexReq, 1); // 删除 required
                }
                // 判断限制字数的条件
                if (isLimitLen) {
                    maxLen = verifyArr[indexMaxLen].replace(/len\[(\d+)\]/, "$1"); // len[2]
                    maxLenKey = "len_" + maxLen;
                    verifyArr[indexMaxLen] = maxLenKey;
                    // 防止重复添加规则
                    if (formCommon.verifyMaxLen.indexOf(maxLen) == -1) {
                        formCommon.verifyMaxLen.push(maxLen);
                        // 加入规则
                        var d = {};
                        d[maxLenKey] = function (val, dom) {
                            if (val.length > maxLen) {
                                return "最多输入" + maxLen + "个字符！";
                            }
                        };
                        form.verify(d);
                    }
                }
                // 逐个条件判断
                verifyArr.forEach(function (r, n) {
                    var rule = formCommon.verifyRule[r];
                    _isUndef(rule) ? _throwError("没有找到 '" + r + "' 这个验证规则") : 0;
                    if (str.length == 0) {
                        if (isRequired) {
                            tip("这个字段必填，不要闹啊！", "info");
                            dom.focus();
                            isCanSubmitData[r] = false;
                        }
                    } else {
                        if (_isArray(rule)) {
                            if (!rule[0].test(str)) {
                                tip(rule[1], "error");
                                isCanSubmitData[r] = false;
                            } else {
                                isCanSubmitData[r] = true;
                            }
                        } else if (_isFunc(rule)) {
                            var res = rule(str, dom);
                            if (_isString(res)) {
                                tip(res, "error");
                                isCanSubmitData[r] = false;
                            } else {
                                isCanSubmitData[r] = true;
                            }
                        }
                    }
                });
            });
            // 存储验证结果
            for (var k in isCanSubmitData) {
                errArr.push(isCanSubmitData[k]);
            }
            // 验证成功的回调
            if (errArr.indexOf(false) == -1) {
                // 存储表单数据
                formData = null; // clear
                if (that.isHTMLForm) {
                    formData = new FormData(that.form);
                } else {
                    formData = new FormData();
                    _forEach(eles, function (el, n) {
                        // radio checkbox 单独设置
                        if (el.type !== "radio" && el.type !== "checkbox") {
                            formData.append(el.name, el.value.trim());
                        } else {
                            el.checked && formData.append(el.name, el.value.trim());
                        }
                    });
                }
                callback && callback(formData, isCanSubmitData);
            }
        });
    }

    var file = {
        upload: function (config) {
            return new MyFile().upload(config);
        },
        submit: MyFile.prototype.submit
    };

    var form = function (el) {
        return new MyForm(el);
    };
    // 增加验证规则
    form.verify = function (obj) {
        // 去重
        var key;
        for (key in obj) {
            if (key in formCommon.verifyRule && key != "len") {
                blert("此 '" + key + "' 验证规则已存在，请换个名字！");
                _throwError("此 '" + key + "' 验证规则已存在！");
            } else {
                formCommon.verifyRule[key] = obj[key];
            }
        }
    };

    // =====================docCookies===三方=================================
    /*\
    |*|
    |*|  :: cookies.js ::
    |*|
    |*|  A complete cookies reader/writer framework with full unicode support.
    |*|
    |*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
    |*|
    |*|  This framework is released under the GNU Public License, version 3 or later.
    |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
    |*|
    |*|  Syntaxes:
    |*|
    |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
    |*|  * docCookies.getItem(name)
    |*|  * docCookies.removeItem(name[, path], domain)
    |*|  * docCookies.hasItem(name)
    |*|  * docCookies.keys()
    |*|
    \*/

    var docCookies = {
        getItem: function (sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!sKey || !this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: /* optional method: you can safely remove it! */ function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };
    _defineProp(window, "docCookies", docCookies);

    // =====================The part of Vue.js==========================================
    // ********************Vue comp import and export*********************
    var compLoadEv = document.createEvent("CustomEvent"); // 为了兼容IE11 tmd
    _defineProp(window, "_export", function (data) {
        compLoadEv.initCustomEvent("comploaded", true, true, data);
        document.dispatchEvent(compLoadEv);
    });
    _defineProp(window, "_import", function (callback) {
        document.addEventListener("comploaded", function (e) {
            callback && callback(e.detail);
            this.removeEventListener("comploaded", arguments.callee);
        }, false);
    });
    // ========================= END Vue.js===========================================

    // ******************exports*******************************
    // class
    var K = function (selector) {
        // main class
        if (!(this in K)) {
            return new K.fn.init(selector);
        }
    };
    // class method of K.fn.init and  K
    K.fn = K.prototype = {
        constructor: K
    };
    // constructor
    K.fn.init = function (selector) {
        var that = this;
        this.eles = [];
        if (!_isString(selector)) return;
        // temp why is it that more and more like as 'jQuery' ?
        var domArr = getDOM(selector);
        if (domArr && domArr.length > 1) {
            [].forEach.call(domArr, function (dom, n) {
                that.eles.push(dom);
            });
        } else {
            domArr.length == 1 && that.eles.push(domArr);
        }
        // return
        for (var k in this.eles) {
            K.fn[k] = this.eles[k];
        }
    }
    // Give the K.fn.init the K prototype for later instantiation
    K.fn.init.prototype = K.fn;
    // extend class static method
    K.$extend = K.fn.extend = function (obj) {
        var that = this;
        if (_isPlainObject(obj)) {
            var key;
            for (key in obj) {
                // prevent repeat define
                if (!(key in that)) {
                    _defineProp(that, key, obj[key]);
                } else {
                    _throwError("This method or property is existed");
                }
            }
        }
    }

    // extend class static method 
    K.$extend({
        // common
        $base64: base64,
        $toThousands: toThousands,
        $toFormatDate: toFormatDate,
        $toByte: toByte,
        $browser: browser,
        $isIE: browser.isIE,
        $urlParse: function (str) {
            if (!window._Url) {
                window._Url = new Url();
            }
            return window._Url.parse(str);
        },
        $params: {
            serialize: _serialize,
            reSerialize: _reSerialize
        },
        // dom
        $getDOM: getDOM, // temp
        $parseHTML: parseHTML,
        $filterHTML: filterHTML,
        $getCssStyle: getCssStyle,
        $setCssStyle: setCssStyle,
        // custom event
        $emit: emit,
        $on: on,
        $one: one,
        $off: off,
        // tip and alert
        $tip: tip,
        $alert: blert,
        // layer
        $layer: layer,
        // ajax
        $http: http2, // axios first
        $ajaxSetting: ajaxCommon.setting,
        // upload file
        $file: file,
        $mime: MIMETYPE,
        // form
        $form: form,
        // cookie
        $cookie: docCookies
    });

    return K;
}

export default factory();
