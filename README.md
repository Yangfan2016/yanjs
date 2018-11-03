## yanjs 
![NPM version](https://img.shields.io/npm/v/yanjs.svg?style=flat) 
[![Build Status](https://travis-ci.org/Yangfan2016/yanjs.svg?branch=master)](https://travis-ci.org/Yangfan2016/yanjs)
[![Coverage Status](https://coveralls.io/repos/github/Yangfan2016/yanjs/badge.svg?branch=master)](https://coveralls.io/github/Yangfan2016/yanjs?branch=master)

> This is just a common toolkit for the Front End  
此库仅仅是聚合了一些常用的前端公共方法

### Installation
```bash
$ npm install yanjs
```

### Example
```js
var yanjs = require('yanjs');
```

### API

#### 快速使用
- base64转换
```js
yan.toBase64("中文abc123"); // "JUU0JUI4JUFEJUU2JTk2JTg3YWJjMTIz"
yan.fromBase64("JUU0JUI4JUFEJUU2JTk2JTg3YWJjMTIz"); // "中文abc123"
```
- 格式转换
```js
yan.toThousands(123456789); // 123,456,789

yan.toFormatDate("YYYY-MM-DD hh:ii:ss.mss WWW qq"); // "2018-01-08 03:50:39.102 星期一 01"
yan.toFormatDate("YYYY-MM-DD hh:ii:ss.mss WWWW qqqq",new Date(2018,00,02)); // "2018-01-02 12:00:00.000 星期二 01"

yan.toCamelCase('background-color'); // "backgroundColor"
yan.toCamelCase('-webkit-background-image'); // "WebkitBackgroundImage"
yan.toPascalCase('background-color'); // "BackgroundColor"
yan.toPascalCase('-webkit-background-image'); // "WebkitBackgroundImage"

yan.toUnicode("你好"); // '\u4f60\u597d'

yan.toByte('2k'); // 2048

yan.formatStr('My name is {0}', 'Yangfan'); // 'My name is Yangfan'
yan.formatStr("My name is {0}, and I'm {1} years old", ['Yangfan', 24]); // "My name is Yangfan, and I'm 24 years old"

```
- 数据序列化

```js
yan.params.serialize({"name": "Yangfan","age": 24}); // 'name=Yangfan&age=24'
yan.params.serialize({"name":"Yangfan","fruits":["apple","banana"]}, true); // 'name=Yangfan&fruits=apple&fruits=banana'
yan.params.reSerialize('name=Yangfan&age=24'); // {"name": "Yangfan","age": "24"}
yan.params.reSerialize('name=Yangfan&fruits=apple&fruits=banana'); // {"name": "Yangfan","fruits": ["apple", "banana"]}
```


- Url解析
```js
yan.urlParse("http://yanfan.com:83/home/disc/test.html#query?name=yan&age=100"); // {protocol: "http", username: "", password: "", host: "yanfan.com:83", port: "83", …}
```

- 获取、设置、删除cookie
```js
// 判断是否存在此cookie
yan.docCookie.hasItem("user_id");
// 设置
yan.docCookie.setItem("user_id", "12fdsa4f4a", new Date(2018,12,31), "/blog", ".yangfan.com", true);
// 获取
yan.docCookie.getItem("user_id");
// 删除
yan.docCookie.removeItem("user_id","/blog",".yangfan.com");
// 返回一个这个路径所有可读的cookie的数组
yan.docCookie.keys();

```

- Ajax
```js
// ajax
yan.http2({
  url:"yangfan.com/post",
  method:"post",
  data:{
    name:"jobs",
    age:100
  },
  success:function (data) {},
  error:function (err) {}
});
// jsonp
yan.http2.getJSON("yangfan.com/get",{
  name:"jobs",
  age:100
},success:function (data) {},
error:function (err) {});
```

- 浏览器
```js
yan.isIE; // true | false
yan.browserDetail; // {name: "chrome", version: "69.0.3497.100"}
```



#### 完整配置

> `yan.docCookie.keys()`  
`yan.docCookie.hasItem(name)`  
`yan.docCookie.getItem(name)`  
`yan.docCookie.setItem(name, value[, end[, path[, domain[, secure]]]])`  
`yan.docCookie.removeItem(name[, path], domain)`  
<table style="width:100%">
  <thead>
    <tr>
      <th>prop</th>
      <th>value</th>
      <th>ps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>cookie名</td>
    </tr>
    <tr>
      <td>value</td>
      <td>String</td>
      <td>cookie值</td>
    </tr>
    <tr>
      <td>end</td>
      <td>Date|String</td>
      <td>过期时间</td>
    </tr>
    <tr>
      <td>path</td>
      <td>String</td>
      <td>默认为当前文档位置的路径,路径必须为绝对路径</td>
    </tr>
    <tr>
      <td>domain</td>
      <td>String</td>
      <td>默认为当前文档位置的路径的域名部分</td>
    </tr>
    <tr>
      <td>secure</td>
      <td>Boolean</td>
      <td>cookie只会被https传输</td>
    </tr>
  </tbody>
<table>


`yan.http2({url[ ,method[ ,data[ ,responseType[ ,success[ ,error[ ,isAuth[ ,cancelToken[ ,timeout]]]]]]]]})`
`yan.$http.getJSON(url,data,success,error);`
<table style="width:100%">
  <thead>
    <tr>
      <th>prop</th>
      <th>value</th>
      <th>ps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>请求地址</td>
    </tr>
    <tr>
      <td>method</td>
      <td>String</td>
      <td>请求方法，默认“GET”</td>
    </tr>
    <tr>
      <td>headers</td>
      <td>Object</td>
      <td>请求头信息</td>
    </tr>
    <tr>
      <td>responseType</td>
      <td>String('arraybuffer','blob','document','json','text','stream')</td>
      <td>请求返回数据的类型，默认“json”</td>
    </tr>
    <tr>
      <td>data</td>
      <td>Object|String</td>
      <td>请求数据</td>
    </tr>
    <tr>
      <td>success</td>
      <td>Function</td>
      <td>请求成功的回调，接受一个参数（data）</td>
    </tr>
    <tr>
      <td>error</td>
      <td>Function</td>
      <td>请求失败的回调，接受一个参数（err）</td>
    </tr>
    <tr>
      <td>complete</td>
      <td>Function</td>
      <td>无论成功失败，都会调用次函数，并且在success或error之前执行</td>
    </tr>
    <tr>
      <td>isAuth</td>
      <td>Boolean</td>
      <td>是否添加验证头信息，默认不添加</td>
    </tr>
    <tr>
      <td>cancelAllRequest</td>
      <td>Boolean</td>
      <td>是否取消其他进行中的请求</td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>Number(ms)</td>
      <td>超时（单位毫秒）</td>
    </tr>
  </tbody>
<table>

`yan.toFormatDate(fmt[ ,date])`
<table style="width:100%">
  <thead>
    <tr>
      <th>prop</th>
      <th>value</th>
      <th>ps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fmt</td>
      <td>String</td>
      <td>自定义格式（注意大小写） （“Y”：年，“M”：月，“D”：日，“h”：时，“i”：分，“s”：秒，“mss”：毫秒，“W”：星期，“q”：季度）</td>
    </tr>
    <tr>
      <td>date</td>
      <td>Date</td>
      <td>指定日期</td>
    </tr>
  </tbody>
<table>

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT license
Copyright (c) 2018 Yangfan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
