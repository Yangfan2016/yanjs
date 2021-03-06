var yan = require("../dist/yan.min.js");
var expect = require("chai").expect;

describe("urlParse", function () {
    var url = 'https://abc.com:8080/user/info?name=yangfan&id=123456#top';
    var res = yan.urlParse(url);

    it("eg: Location" + location, function () {
        expect(yan.urlParse(location))
            .to
            .have
            .ownProperty("query")
    });

    it("eg: string " + url, function () {
        expect(res)
            .to
            .an("object")
    });

    it("protocol", function () {
        expect(res.protocol)
            .to
            .be
            .equal('https')
    });

    it("port", function () {
        expect(res.port)
            .to
            .be
            .equal(8080)
    });

    it("host", function () {
        expect(res.host)
            .to
            .be
            .equal('abc.com:8080')
    });

    it("hostname", function () {
        expect(res.hostname)
            .to
            .be
            .equal('abc.com')
    });

    it("pathname", function () {
        expect(res.pathname)
            .to
            .be
            .equal('/user/info')
    });

    it("hash", function () {
        expect(res.hash)
            .to
            .be
            .equal('top')
    });

    it("query", function () {
        expect(res.query)
            .to
            .have
            .ownProperty("name")
    });
});

describe("toFormatDate", function () {
    it("number: 1537942141038", function () {
        expect(yan.toFormatDate('YYYY-MM-DD HH:ii:ss', 1537942141038))
            .to
            .match(/2018-09-26 14:09:01/);
    });
    it("string: '1537942141038'", function () {
        expect(yan.toFormatDate('YYYY-MM-DD HH:ii:ss', '1537942141038'))
            .to
            .match(/2018-09-26 14:09:01/);
    });
    it("string: '/Date(1537942141038)/'", function () {
        expect(yan.toFormatDate('YYYY-MM-DD HH:ii:ss', '/Date(1537942141038)/'))
            .to
            .match(/2018-09-26 14:09:01/);
    });
    var now = new Date();
    it("Date: new Date", function () {
        expect(yan.toFormatDate('YYYY-MM-DD HH:ii:ss:mss', now))
            .to
            .be
            .contain(now.getFullYear() + "")
    });
});

describe("toCamelCase", function () {
    it("eg: background-color", function () {
        expect(yan.toCamelCase('background-color'))
            .to
            .be
            .equal("backgroundColor");
    });
    it("eg: -webkit-background-image", function () {
        expect(yan.toCamelCase('-webkit-background-image'))
            .to
            .be
            .equal("WebkitBackgroundImage");
    });
});

describe("toPascalCase", function () {
    it("eg: background-color", function () {
        expect(yan.toPascalCase('background-color'))
            .to
            .be
            .equal("BackgroundColor");
    });
    it("eg: -webkit-background-image", function () {
        expect(yan.toPascalCase('-webkit-background-image'))
            .to
            .be
            .equal("WebkitBackgroundImage");
    });
});

describe("toUnicode", function () {
    it("eg: 你好", function () {
        expect(yan.toUnicode("你好"))
            .to
            .be
            .equal("\\u4f60\\u597d"); // '\u4f60\u597d'
    });
});

describe("toThousands", function () {
    it("eg: 123456789", function () {
        expect(yan.toThousands(123456789))
            .to
            .be
            .equal("123,456,789");
    });
});

describe("toByte", function () {
    it("eg: 2k", function () {
        expect(yan.toByte('2k'))
            .to
            .be
            .equal(2048);
    });
});

describe("toBase64", function () {
    it("eg: 你好123abc", function () {
        expect(yan.toBase64('你好123abc'))
            .to
            .be
            .equal('JUU0JUJEJUEwJUU1JUE1JUJEMTIzYWJj');
    });
});

describe("fromBase64", function () {
    it("eg: JUU0JUJEJUEwJUU1JUE1JUJEMTIzYWJj", function () {
        expect(yan.fromBase64('JUU0JUJEJUEwJUU1JUE1JUJEMTIzYWJj'))
            .to
            .be
            .equal('你好123abc');
    });
});

describe("formatStr", function () {
    it("eg: My name is {0}", function () {
        expect(yan.formatStr('My name is {0}', 'Yangfan'))
            .to
            .be
            .equal('My name is Yangfan');
    });

    it("eg: My name is {0}, and I'm {1} years old", function () {
        expect(yan.formatStr("My name is {0}, and I'm {1} years old", ['Yangfan', 24]))
            .to
            .be
            .equal("My name is Yangfan, and I'm 24 years old");
    });
});

describe("params", function () {
    var data = {
        name: "Yangfan",
        age: 24
    };
    var data2 = {
        "name": "Yangfan",
        "fruits": ["apple", "banana"]
    };
    var str = 'name=Yangfan&age=24';
    var str2 = 'name=Yangfan&fruits=apple&fruits=banana';
    describe("serialize", function () {
        it('normal: {"name":"Yangfan","age":24}', function () {
            expect(yan.params.serialize(data))
                .to
                .include("name");
        });

        it('traditional: {"name":"Yangfan","fruits":["apple","banana"]}', function () {
            expect(yan.params.serialize(data2, true))
                .to
                .include("fruits")
        });
    });

    describe("reSerialize", function () {
        it('name=Yangfan&age=24', function () {
            expect(yan.params.reSerialize(str))
                .to
                .have
                .ownProperty("name")
        });
        it('name=Yangfan&fruits=apple&fruits=banana', function () {
            expect(yan.params.reSerialize(str2)["fruits"])
                .to
                .have
                .lengthOf(2)
        });
    });
});

describe("browser", function () {
    it("isIE", function () {
        expect(yan.isIE)
            .to
            .be
            .an("boolean")
    });

    it("browserDetail default", function () {
        expect(yan.browserDetail())
            .to
            .have
            .ownProperty("name")
    });
    it("browserDetail Edge", function () {
        expect(yan.browserDetail("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"))
            .to
            .deep
            .equal({ name: "Edge", version: "17.17134" })
    });
    it("browserDetail Chrome", function () {
        expect(yan.browserDetail("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"))
            .to
            .deep
            .equal({ name: "Chrome", version: "70.0.3538.77" })
    });
    it("browserDetail Firefox", function () {
        expect(yan.browserDetail("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0"))
            .to
            .deep
            .equal({ name: "Firefox", version: "63.0" })
    });
    it("browserDetail Safari Windows", function () {
        expect(yan.browserDetail("Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"))
            .to
            .deep
            .equal({ name: "Safari", version: "5.1.7" })
    });
    it("browserDetail Safari Mac OS", function () {
        expect(yan.browserDetail("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15"))
            .to
            .deep
            .equal({ name: "Safari", version: "12.0" })
    });
});

describe("ajax", function () {
    it("axios:get", function () {
        expect(yan.http2({
            url: "/api"
        }))
            .to
            .has
            .ownProperty("cancel");
    });
    it("axios:post", function () {
        expect(yan.http2({
            url: "/api",
            method: "POST",
        }))
            .to
            .has
            .ownProperty("cancel");
    });
    it("jsonp (url)", function () {
        window.jsonpCb = function (data) {
            expect(data)
                .to
                .be
                .instanceOf(Object);
        }
        yan.getJSON("http://cache.video.iqiyi.com/jp/avlist/202861101/1/?callback=jsonpCb");
    });
    it("jsonp (url,success)", function () {
        yan.getJSON("http://cache.video.iqiyi.com/jp/avlist/202861101/1/", function (data) {
            expect(data)
                .to
                .be
                .instanceOf(Object);
        });
    });
    it("jsonp (url,data,success)", function () {
        yan.getJSON("http://cache.video.iqiyi.com/jp/avlist/202861101/1/", {
            name: "jobs",
            age: 100,
        }, function (data) {
            expect(data)
                .to
                .be
                .instanceOf(Object);
        })
    });
    it("native xhr:get", function () {
        expect(yan.http({
            url: "/api"
        }))
            .to
            .be
            .an
            .instanceof(Promise);
    });
    it("native xhr:post", function () {
        expect(yan.http({
            url: "/api",
            method: "POST",
        }))
            .to
            .be
            .an
            .instanceof(Promise);
    });
});

describe("cookie", function () {
    let expiresTimeStamp = new Date(Date.now() + 865 * 5);
    it("set and get", function () {
        yan.docCookie.set("TEST", "666", {
            expires: expiresTimeStamp,
        });
        expect(yan.docCookie.get("TEST"))
            .to
            .be
            .equal("666");
    });
    it("has", function () {
        expect(yan.docCookie.has("TEST"))
            .to
            .be
            .equal(true);
    });
    it("remove", function () {
        yan.docCookie.remove("TEST");
        expect(yan.docCookie.has("TEST"))
            .to
            .be
            .equal(false);
    });
});