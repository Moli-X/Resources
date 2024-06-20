/*
参考chavyleung和NobyDa的写法

//饿了么签到
//原链接:https://github.com/songyangzz/QuantumultX/blob/master/elem/elemSign.js
> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可


## 配置 (Surge)

```properties
[MITM]
h5.ele.me

[Script]
http-request ^https:\/\/h5\.ele\.me\/restapi\/eus\/v\d\/current_user$ script-path=https://github.com/Moli-X/Resources/raw/main/Script/Elem/elemGetCookies.js
cron "0 5 0 * * *" script-path=elemSign.js
```

## 配置 (QuanX)

```properties
[MITM]
h5.ele.me

[rewrite_local]

^https:\/\/h5\.ele\.me\/restapi\/eus\/v\d\/current_user$ url script-request-header https://github.com/Moli-X/Resources/raw/main/Script/Elem/elemGetCookies.js



[task_local]
5 0 * * * https://github.com/Moli-X/Resources/raw/main/Script/Elem/elemSign.js
```

## 说明

1. 先把h5.ele.me`加到`[MITM]`
2. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`elemGetCookies.js`和`elemSign.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
3. 打开 APP, 访问下`我的`>`签到领红包`(左上角)
4. 系统提示: `获取Cookie: 成功` （如果不提示获取成功, 尝试杀进程再进`个人`>`每日签到`）
5. 最后就可以把第 1 条脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`00:05:00`执行一次.

脚本之前会运行3秒，为了保证两次翻盘成功，建议定时任务配置运行两次
*/


const delay=3000;
const cookieName = '饿了么'
const cookieKey = 'cookie_elem'
const UserId = 'user_id_elem'
const sy = init()
var cookieVal = sy.getdata(cookieKey);
var regx = /USERID=\d+/;

var userid = cookieVal.match(regx)[0];
userid = userid.replace('USERID=', '');


var headerscommon = {
  'Content-Type': 'application/json',
  'Cookie': cookieVal,
  'f-refer': 'wv_h5',
  'Origin': 'https://tb.ele.me',
  'Referer': 'https://tb.ele.me/wow/zele/act/qiandao?wh_biz=tm&source=main',
  'User-Agent': 'Rajax/1 Apple/iPhone11,8 iOS/13.3 Eleme/8.29.6 ID/BFA5A018-7070-4341-9DEF-763E3B23EA282; IsJailbroken/1 Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/8.29.6) UT4Aplus/0.0.4 WindVane/8.6.0 828x1792 WK'
}

//签到结果
var signresult = '';

//翻牌结果
var turnstr = '翻牌结果: ';
//翻牌奖励
var turnresult = new Array;

//签到奖励
var sign_result = new Array;

var hisresult;
sign()

function sign() {

  dosignhis().then((data) => {
    if (hisresult) {
     if (hisresult.has_signed_in_today) {
        signresult = `签到结果: 重复❗ 已连续签到${hisresult.current_day+1}天`;
        turnstr=turnstr+'无';
        doNotify();
        sy.done()
      }
      else {
        dosign().then((data) => {
            doturnover(1,200).then((data) => {
              doshare().then((data) => {

                doturnover(2,delay).then((data) => {
      
                  doNotify();
                  sy.done()
                })
              })
          })
        })
      }
    }
  });
}

function dosign() {

  return new Promise(resolve => {
    setTimeout(() => {

      try {
        var endurl = '/sign_in'
        url = { url: `https://h5.ele.me/restapi/member/v2/users/`, headers: headerscommon }
        if (cookieVal == undefined || cookieVal == "0" || cookieVal == null) {
          sy.msg(cookieName, "未获取Cookie", '');
          return;
        }

        url.url += userid;
        url.url += endurl;

        sy.post(url, (error, response, data) => {
          var obj = JSON.parse(data);
          if (response.status == 200) {
            signresult = `签到结果: 成功🎉 已连续签到${hisresult.current_day+1}天`
            sign_result = obj;

          } else if (response.status == 400) {
            signresult = `签到结果: 重复❗ 已连续签到${hisresult.current_day}天`

          }
          else {
            signresult = `签到结果: 未知❗ 已连续签到${hisresult.current_day}天`
          }
          resolve('done');
        })
      }
      catch (erre) {
        resolve('done')
      }
    })
  })
}

function doturnover(count,time) {

  return new Promise(resolve => {
    setTimeout(() => {

      try {
        var endurl = '/sign_in/daily/prize'
        let body = { "channel": "app", "index": random(0, 3), "longitude": 116.334716796875, "latitude": 59.73897171020508 };
        url = {
          url: `https://h5.ele.me/restapi/member/v2/users/`,
          headers: headerscommon,
          body: JSON.stringify(body)
        }
        if (cookieVal == undefined || cookieVal == "0" || cookieVal == null) {
          sy.msg(cookieName, "未获取Cookie", '');
          return;
        }
        url.url += userid;
        url.url += endurl;
        sy.post(url, (error, response, data) => {
          var obj = JSON.parse(data);
          sy.log(count);
          if (response.status == 200) {
            turnstr = turnstr + `成功(${count})🎉 `
            for (var i in obj) {
              turnresult.push(obj[i]);
            }

          } else if (response.status == 400) {
            turnstr = turnstr + `重复(${count})❗ `

          }
          else {
            turnstr = turnstr + `未知(${count})❗ `
          }


          resolve('done');
        })
      }
      catch (erre) {
        resolve('done')
      }
    },time)
  })
}

function doshare() {

  return new Promise(resolve => {
    setTimeout(() => {

      try {
        var endurl = '/sign_in/wechat'
        let body = { "channel": "app" };
        url = {
          url: `https://h5.ele.me/restapi/member/v1/users/`,
          headers: headerscommon,
          body: JSON.stringify(body)
        }
        if (cookieVal == undefined || cookieVal == "0" || cookieVal == null) {
          sy.msg(cookieName, "未获取Cookie", '');
          return;
        }
        url.url += userid;
        url.url += endurl;
        sy.post(url, (error, response, data) => {
          if (response.status == 200) {

            sy.log("分享微信成功");
          }
          else {
            sy.log("分享微信失败");
          }


          resolve('done');
        })
      }
      catch (erre) {
        resolve('done')
      }
    })
  })
}

function dosignhis() {

  return new Promise(resolve => {
    setTimeout(() => {

      try {
        var endurl = '/sign_in/info'
        url = { url: `https://h5.ele.me/restapi/member/v1/users/`, headers: headerscommon }
        if (cookieVal == undefined || cookieVal == "0" || cookieVal == null) {
          sy.msg(cookieName, "未获取Cookie", '');
          return;
        }
        url.url += userid;
        url.url += endurl;
        sy.get(url, (error, response, data) => {

          var obj = JSON.parse(data);

          hisresult = obj;


          resolve('done');
        })
      }
      catch (erre) {
        resolve('done')
      }
    })
  })
}

function doNotify() {
  var ret = signresult+'\n';
  for (var i = 0; i < sign_result.length; i++) {
    ret = ret + '***获得：' + sign_result[i].name + '(' + sign_result[i].amount + ')元🧧\n';
  }
  ret = ret + turnstr + '\n';
  for (var i = 0; i < turnresult.length; i++) {
    if (turnresult[i].status == 1) {
      ret = ret + '***获得：' + turnresult[i].prizes[0].name + '(' + turnresult[i].prizes[0].amount + ')元🧧\n';
    }
  }
  
  ret = ret + '签到3天得3元红包，7天抽10-200元🧧';
  

  sy.msg('饿了么', '', ret);
}



function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == "string") options = { url: options }
      options["method"] = "POST"
      $task.fetch(options).then(response => {
        response["status"] = response.statusCode
        callback(null, response, response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge()) $httpClient.post(options, callback)
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}



function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
