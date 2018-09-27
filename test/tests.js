var expect = chai.expect;


describe("urlParse", function () {
    var url = 'https://abc.com:8080/user/info?name=yangfan&id=123456#top';
    var res = yan.$urlParse(url);


    it("eg: Location" + location, function () {
        expect(yan.$urlParse(location))
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
    // TEMP
    return;
    it("number: 1537942141038", function () {
        expect(yan.$toFormatDate('YYYY-MM-DD HH:ii:ss', 1537942141038))
            .to
            .be
            .equal("2018-09-26 14:09:01")
    });
    it("string: '1537942141038'", function () {
        expect(yan.$toFormatDate('YYYY-MM-DD HH:ii:ss', '1537942141038'))
            .to
            .be
            .equal("2018-09-26 14:09:01")
    });
    it("string: '/Date(1537942141038)/'", function () {
        expect(yan.$toFormatDate('YYYY-MM-DD HH:ii:ss', '/Date(1537942141038)/'))
            .to
            .be
            .equal("2018-09-26 14:09:01")
    });
    var now = new Date;
    it("Date: new Date", function () {
        expect(Date.parse(yan.$toFormatDate('YYYY-MM-DD HH:ii:ss:mss', now)))
            .to
            .be
            .equal(now.getTime())
    });
});

describe("toCamelCase", function () {
    it("eg: background-color", function () {
        expect('background-color'.toCamelCase())
            .to
            .be
            .equal("backgroundColor");
    });
    it("eg: -webkit-background-image", function () {
        expect('-webkit-background-image'.toCamelCase())
            .to
            .be
            .equal("WebkitBackgroundImage");
    });
});

describe("toPascalCase", function () {
    it("eg: background-color", function () {
        expect('background-color'.toPascalCase())
            .to
            .be
            .equal("BackgroundColor");
    });
    it("eg: -webkit-background-image", function () {
        expect('-webkit-background-image'.toPascalCase())
            .to
            .be
            .equal("WebkitBackgroundImage");
    });
});

describe("toUnicode", function () {
    it("eg: 你好", function () {
        expect("你好".toUnicode())
            .to
            .be
            .equal("\\u4f60\\u597d"); // '\u4f60\u597d'
    });
});

describe("toThousands", function () {
    // TEST
    return
    it("eg: 123456789", function () {
        expect(yan.$toThousands(123456789))
            .to
            .be
            .equal("123,456,789");
    });
});

describe("toByte", function () {
    it("eg: 2k", function () {
        expect(yan.$toByte('2k'))
            .to
            .be
            .equal(2048);
    });
});

describe("toBase64", function () {
    it("eg: 你好123abc", function () {
        expect(yan.$base64.encode('你好123abc'))
            .to
            .be
            .equal('JUU0JUJEJUEwJUU1JUE1JUJEMTIzYWJj');
    });
});

describe("fromBase64", function () {
    it("eg: JUU0JUJEJUEwJUU1JUE1JUJEMTIzYWJj", function () {
        expect(yan.$base64.decode('JUU0JUJEJUEwJUU1JUE1JUJEMTIzYWJj'))
            .to
            .be
            .equal('你好123abc');
    });
});

describe("format", function () {
    it("eg: My name is {0}", function () {
        expect('My name is {0}'.format('Yangfan'))
            .to
            .be
            .equal('My name is Yangfan');
    });

    it("eg: My name is {0}, and I'm {1} years old", function () {
        expect("My name is {0}, and I'm {1} years old".format(['Yangfan', 24]))
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
            expect(yan.$params.serialize(data))
                .to
                .include("name");
        });

        it('traditional: {"name":"Yangfan","fruits":["apple","banana"]}', function () {
            expect(yan.$params.serialize(data2, true))
                .to
                .include("fruits")
        });
    });

    describe("reSerialize", function () {
        it('name=Yangfan&age=24', function () {
            expect(yan.$params.reSerialize(str))
                .to
                .have
                .ownProperty("name")
        });
    });
});

describe("browser", function () {
    it("isIE", function () {
        expect(yan.$isIE)
            .to
            .be
            .an("boolean")
    });
    // TEST
    return;
    it("browserDetail", function () {
        expect(yan.$browserDetail)
            .to
            .have
            .ownProperty("name")
    });
});
