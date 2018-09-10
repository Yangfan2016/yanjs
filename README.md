## yanjs ![NPM version](https://img.shields.io/npm/v/yanjs.svg?style=flat)

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
- 提示框
  - alert
```js
Yan.$alert("提示的内容",function () {
  return "点击确定按钮的回调函数（可选）";
});
```
  - tip
```js
Yan.$tip("普通提示信息","info");
Yan.$tip("成功提示信息","ok");
Yan.$tip("失败提示信息","error");
Yan.$tip("警告提示信息","warn");
```
  - load
```js
// 全屏loading
var lay1=Yan.$layer.load(0);
// 指定区域loading
var lay2=Yan.$layer.load("#div1");
// 关闭指定loading
Yan.$layer.close(lay2);
// 关闭所有loading
Yan.$layer.closeAll();
```

- 文件上传
```js
Yan.$file.upload({
    el:"#f2", // <input type="file" id="#f2" />
    accept:['img*'], // 文件名后缀
    maxSize:'2M', // 2B 2K 2M 2G,
    onFileChange:function (file) {
        // file为所选文件的信息
    },
    acceptError:function () { // 文件类型不符
      alert('文件类型不符合！');
    },
    sizeError:function (flag) { // 文件大小不符
      var message=flag==1?"文件超限":"文件为空";
      alert(message);
    },
}).submit(function (context) { // context.file 为需要上传文件的文件信息
    // 下面写ajax请求
});
```

- base64转换
```js
Yan.$base64.encode("中文abc123"); // "JUU0JUI4JUFEJUU2JTk2JTg3YWJjMTIz"
Yan.$base64.decode("JUU0JUI4JUFEJUU2JTk2JTg3YWJjMTIz"); // "中文abc123"
```
- 格式转换
```js
Yan.$toThousands("123456789"); // 123,456,789
Yan.$toFormatDate("YYYY-MM-DD hh:ii:ss.ms WWW qq"); // "2018-01-08 03:50:39.02 星期一 01"
Yan.$toFormatDate("YYYY-MM-DD hh:ii:ss.ms WWWW qqqq",new Date(2018,00,02)); // "2018-01-02 12:00:00.00 星期二 01"
```

- Url解析
```js
Yan.$urlParse("http://yanfan.com:83/home/disc/test.html#query?name=yan&age=100"); // {protocol: "http", username: "", password: "", host: "yanfan.com:83", port: "83", …}
```

- 获取、设置、删除cookie
```js
// 判断是否存在此cookie
Yan.$cookie.hasItem("user_id");
// 设置
Yan.$cookie.setItem("user_id", "12fdsa4f4a", new Date(2018,12,31), "/blog", ".yangfan.com", true);
// 获取
Yan.$cookie.getItem("user_id");
// 删除
Yan.$cookie.removeItem("user_id","/blog",".yangfan.com");
// 返回一个这个路径所有可读的cookie的数组
Yan.$cookie.keys();

```

- Ajax
```js
// ajax
Yan.$http({
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
Yan.$http.getJSON("yangfan.com/get",{
  name:"jobs",
  age:100
},success:function (data) {},
error:function (err) {});
```

#### 完整配置

> `Yan.$alert(content[ ,callback])`
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
      <td>content</td>
      <td>String</td>
      <td>提示内容</td>
    </tr>
    <tr>
      <td>callback</td>
      <td>Function</td>
      <td>点击确定的回调函数</td>
    </tr>
  </tbody>
<table>  


> `Yan.$tip(content[ ,type])`
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
      <td>content</td>
      <td>String</td>
      <td>提示内容</td>
    </tr>
    <tr>
      <td>type</td>
      <td>String("info"|"ok"|"error"|"warn")</td>
      <td>提示内容的类型，默认为 "info"</td>
    </tr>
  </tbody>
<table>


> `Yan.$layer.load(el[ ,{shade[ ,time]}])`
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
      <td>el</td>
      <td>String</td>
      <td>DOMSelector(dom选择器)</td>
    </tr>
    <tr>
      <td>shade</td>
      <td>Number|String(0-1)</td>
      <td>遮罩层透明度</td>
    </tr>
    <tr>
      <td>time</td>
      <td>Number(ms)</td>
      <td>超时关闭（单位毫秒）</td>
    </tr>
  </tbody>
<table>


> `Yan.$file.upload({el [,accept[ ,maxSize[ ,previewBox[ ,previewCallBack[ ,onFileChange[ ,acceptError[ ,sizeError]]]]]]]})`
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
      <td>el</td>
      <td>String</td>
      <td>DOMSelector(dom选择器)</td>
    </tr>
    <tr>
      <td>accept</td>
      <td>Array</td>
      <td>文件接受类型 e.g. ["png","jpg"]</td>
    </tr>
    <tr>
      <td>maxSize</td>
      <td>String("B"|"K"|"M"|"G")</td>
      <td>文件大小 e.g. "2M"</td>
    </tr>
    <tr>
      <td>previewBox</td>
      <td>String</td>
      <td>DOMSelector(dom选择器),存放预览图片的容器</td>
    </tr>
    <tr>
      <td>previewCallBack</td>
      <td>Function</td>
      <td>预览图片的回调函数，接受两个参数 （img,data）</td>
    </tr>
    <tr>
      <td>onFileChange</td>
      <td>Function</td>
      <td>文件选择改变时的回调函数，接受一个参数 （file）</td>
    </tr>
    <tr>
      <td>acceptError</td>
      <td>Function</td>
      <td>文件类型错误的回调</td>
    </tr>
    <tr>
      <td>sizeError</td>
      <td>Function</td>
      <td>文件大小错误的回调，接受一个参数 （0：”文件为空“|1：”文件超限“）</td>
    </tr>
  </tbody>
<table>


> `Yan.$cookie.keys()`  
`Yan.$cookie.hasItem(name)`  
`Yan.$cookie.getItem(name)`  
`Yan.$cookie.setItem(name, value[, end[, path[, domain[, secure]]]])`  
`Yan.$cookie.removeItem(name[, path], domain)`  
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


`Yan.$http({url[ ,method[ ,data[ ,responseType[ ,success[ ,error[ ,isAuth[ ,cancelToken[ ,timeout]]]]]]]]})`
`Yan.$http.getJSON(url,data,success,error);`
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

`Yan.$toFormatDate(fmt[ ,date])`
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
      <td>自定义格式（注意大小写） （“Y”：年，“M”：月，“D”：日，“h”：时，“i”：分，“s”：秒，“ms”：毫秒，“W”：星期，“q”：季度）</td>
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
![docor]()
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
