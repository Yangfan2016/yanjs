var expect = window.chai.expect;


describe("URL解析测试", function () {
    var url="https://a.c:89/home#one?q=1";
    it("测试 protocol", function () {
        expect(Yan.$urlParse(url).protocol).to.be.equal("https");
    });
    it("测试 hostname", function () {
        expect(Yan.$urlParse(url).hostname).to.be.equal("a.c");
    });
    it("测试 port", function () {
        expect(Yan.$urlParse(url).port).to.be.equal(89);
    });
    it("测试 pathname", function () {
        expect(Yan.$urlParse(url).pathname).to.be.equal("/home");
    });
    it("测试 search", function () {
        expect(Yan.$urlParse(url).search).to.be.equal("q=1");
    });
});