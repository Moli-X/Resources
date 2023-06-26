const $ = new Env('清空购物车');
const JD_API_HOST = 'https://api.m.jd.com';
const notify = require('./sendNotify');
const jdCookieNode = require('./jdCookie.js');
let cookiesArr = [];
let cookie = '';
Object.keys(jdCookieNode).forEach(item => {
    cookiesArr.push(jdCookieNode[item]);
});

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号的cookie');
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.errorMsg = '';
            $.message = '';
            $.cartsTotalNum = 0;
            $.cartArr = { ThePacks: [], TheSkus: [] };
            await TotalBean();
            console.log(`\n****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请更新cookie`);
                await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请更新cookie`);
                continue;
            }
            await getCarts();
            await $.wait(Math.floor(Math.random() * 1000 + 3000));
            if ($.cartsTotalNum > 0) {
                await unsubscribeCartsFun();
            }
            await $.wait(Math.floor(Math.random() * 1000 + 20000));
        }
    }
})()
    .catch(e => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '');
    })
    .finally(() => {
        $.done();
    });

async function unsubscribeCartsFun() {
    let body = {
        operations: [{ ThePacks: [...$.cartArr.ThePacks], TheSkus: [...$.cartArr.TheSkus], carttype: '4' }],
        showPlusEntry: '2',
        syntype: '1',
        userType: '1'
    };
    let data = await GetSign('cartRemove', body);
    if (data.success) {
        url = data.msg.url;
        body = data.msg.body;
    } else {
        console.log('⚠️ JDSign解密出错, 请检查程序');
        return;
    }
    return new Promise(resolve => {
        const options = {
            url,
            body,
            headers: {
                Cookie: cookie,
                Host: 'api.m.jd.com',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': require('./USER_AGENTS').USER_AGENT
            }
        };
        $.post(options, (err, resp, data) => {
            try {
                data = $.toObj(data);
                if (data.resultCode === 0 && data.code === '0') {
                    $.cartsTotalNum = data.cartInfo?.cartNum || 0;
                    console.log(`当前购物车商品数: ${$.cartsTotalNum}个`);
                    if ($.cartsTotalNum > 0) {
                        console.log('清空购物车失败');
                    } else {
                        console.log('清空购物车成功');
                    }
                }
            } catch (e) {
                console.log('清空购物车出错');
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        });
    });
}

async function getCarts() {
    let body = { hdid: '', ts: +new Date(), ridx: -1, cipher: { body: '' }, ciphertype: 5, version: '1.2.0', appname: 'com.jingdong.app.mall' };
    let data = await GetSign('cart', body);
    if (data.success) {
        url = data.msg.url;
        body = data.msg.body;
    } else {
        console.log('⚠️ JDSign解密出错, 请检查程序');
        return;
    }
    $.shopsTotalNum = 0;
    return new Promise(resolve => {
        const option = {
            url,
            body,
            headers: {
                Cookie: cookie,
                Host: 'api.m.jd.com',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': require('./USER_AGENTS').USER_AGENT
            },
            timeout: 10000
        };
        $.post(option, (err, resp, data) => {
            try {
                data = $.toObj(data);
                if (data.resultCode === 0 && data.code === '0') {
                    $.cartsTotalNum = data.cartInfo?.cartNum || 0;
                    console.log(`当前购物车商品数: ${$.cartsTotalNum}个\n`);
                    for (let i = 0; i < data.cartInfo?.vendors.length; i++) {
                        const vender = data.cartInfo.vendors[i];
                        for (let s = 0; s < vender.sorted.length; s++) {
                            const sorted = vender.sorted[s];
                            if (sorted.item.items) {
                                packId = sorted.item.Id;
                                packNum = sorted.item.Num;
                                let skuArr = [];
                                for (let j = 0; j < sorted.item.items.length; j++) {
                                    skuId = sorted.item.items[j].item.Id;
                                    skuName = sorted.item.items && sorted.item.items[j].item.Name;
                                    skuNum = sorted.item.items[j].item.Num;
                                    skuArr.push({ Id: skuId, num: skuNum });
                                }
                                $.cartArr.ThePacks.push({ Id: packId, TheSkus: [...skuArr], num: packNum, sType: '11' });
                            } else {
                                skuId = sorted.item.Id;
                                skuName = sorted.item.Name;
                                skuNum = sorted.item.Num;
                                $.cartArr.TheSkus.push({ Id: skuId, num: skuNum });
                            }

                            console.log(`准备删除${skuNum}个-[${skuName}](${skuId})`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        });
    });
}
// prettier-ignore
Date.prototype.Format=function(fmt){var n=this,d=fmt,l={'M+':n.getMonth()+1,'d+':n.getDate(),'D+':n.getDate(),'h+':n.getHours(),'H+':n.getHours(),'m+':n.getMinutes(),'s+':n.getSeconds(),'w+':n.getDay(),'q+':Math.floor((n.getMonth()+3)/3),'S+':n.getMilliseconds()};/(y+)/i.test(d)&&(d=d.replace(RegExp.$1,''.concat(n.getFullYear()).slice(4-RegExp.$1.length)));for(var k in l){if(new RegExp('('.concat(k,')')).test(d)){var a='S+'===k?'000':'00';d=d.replace(RegExp.$1,1==RegExp.$1.length?l[k]:(''.concat(a)+l[k]).slice(''.concat(l[k]).length))}}return d};
// prettier-ignore
function timeFormat(time){let date;if(time){date=new Date(time)}else{date=new Date()}return date.getFullYear()+'-'+(date.getMonth()+1>=10?date.getMonth()+1:'0'+(date.getMonth()+1))+'-'+(date.getDate()>=10?date.getDate():'0'+date.getDate())}
// prettier-ignore
function showMsg(){return new Promise(resolve=>{if($.message)$.msg($.name,'',`【京东账号${$.index}】${$.nickName}\n${$.message}`);resolve()})}
// prettier-ignore
function GetSign(functionId,body={}){return new Promise(async resolve=>{const options={url:'http://localhost:3141/getsign',body:`${decodeURI($.toStr({functionId,body:$.toStr(body)}))}`};$.post(options,async(err,res)=>{try{if(err){$.logErr(err)}}catch(e){$.logErr(e)}finally{resolve(JSON.parse(res.body))}})})}
// prettier-ignore
function GetCookie(){return new Promise(async resolve=>{const options={url:'http://localhost:3141/getcookie',body:$.toStr({index:$.index})};$.post(options,async(err,resp,data)=>{try{if(err){$.logErr(err)}else if($.safeGet(data)){data=$.toObj(data);cookie=data.msg;if(typeof cookie==='undefined'){$.isLogin=false;console.log(`京东账号${$.index}${$.nickName||$.UserName}更新cookie失败`);return}else{console.log(`京东账号${$.index}${$.nickName||$.UserName}更新cookie成功`)}}}catch(e){$.logErr(e,resp);$.isLogin=false}finally{resolve(data)}})})}
// prettier-ignore
function TotalBean(){return new Promise(async resolve=>{const options={url:'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',headers:{Cookie:cookie,'Content-Type':'application/x-www-form-urlencoded',Referer:'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','User-Agent':require('./USER_AGENTS').USER_AGENT},timeout:10000};$.get(options,async(err,resp,data)=>{try{if(err){$.logErr(err)}else{if($.safeGet(data)){data=$.toObj(data);if(data.retcode===13){console.log(`京东账号${$.index}${$.nickName||$.UserName}的cookie已失效,准备更新...`);await GetCookie()}if(data.retcode===0){$.nickName=(data.base&&data.base.nickname)||$.UserName;$.beanCount=(data.base&&data.base.jdNum)||0}}else{$.nickName=$.UserName;console.log('TotalBean 京东服务器返回空数据')}}}catch(e){$.logErr(e);$.isLogin=false}finally{resolve()}})})}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e='GET'){t='string'==typeof t?{url:t}:t;let s=this.get;return('POST'===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})}))}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,'POST')}}return new(class{constructor(t,e){(this.name=t),(this.http=new s(this)),(this.data=null),(this.dataFile='box.dat'),(this.logs=[]),(this.isMute=!1),(this.isNeedRewrite=!1),(this.logSeparator='\n'),(this.startTime=+new Date()),Object.assign(this,e),this.log('',`🔔${this.name},开始!`)}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}loaddata(){(this.fs=this.fs?this.fs:require('fs')),(this.path=this.path?this.path:require('path'));const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}writedata(){(this.fs=this.fs?this.fs:require('fs')),(this.path=this.path?this.path:require('path'));const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,'.$1').split('.');let r=t;for(const t of i)if(((r=Object(r)[t]),void 0===r))return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),(e.slice(0,-1).reduce((t,s,i)=>(Object(t[s])===t[s]?t[s]:(t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{})),t)[e[e.length-1]]=s),t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):'';if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,''):e}catch(t){e=''}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?('null'===o?null:o||'{}'):'{}';try{const e=JSON.parse(h);this.lodash_set(e,r,t),(s=this.setval(JSON.stringify(e),i))}catch(e){const o={};this.lodash_set(o,r,t),(s=this.setval(JSON.stringify(o),i))}}else s=this.setval(t,e);return s}safeGet(data){try{if(typeof JSON.parse(data)=='object'){return true}}catch(e){return false}}getval(t){return(this.data=this.loaddata()),this.data[t]}setval(t,e){return(this.data=this.loaddata()),(this.data[e]=t),this.writedata(),!0}initGotEnv(t){(this.got=this.got?this.got:require('got')),(this.cktough=this.cktough?this.cktough:require('tough-cookie')),(this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar()),t&&((t.headers=t.headers?t.headers:{}),void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=()=>{}){t.headers&&(delete t.headers['Content-Type'],delete t.headers['Content-Length']),(this.initGotEnv(t),this.got(t).on('redirect',(t,e)=>{try{if(t.headers['set-cookie']){const s=t.headers['set-cookie'].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),(e.cookieJar=this.ckjar)}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=()=>{}){t.body&&t.headers&&!t.headers['Content-Type']&&(t.headers['Content-Type']='application/x-www-form-urlencoded'),t.headers&&delete t.headers['Content-Length'];this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}time(t,e=null){const s=e?new Date(e):new Date();let i={'M+':s.getMonth()+1,'d+':s.getDate(),'H+':s.getHours(),'m+':s.getMinutes(),'s+':s.getSeconds(),'q+':Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+'').slice(4-RegExp.$1.length)));for(let e in i)new RegExp('('+e+')').test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:('00'+i[e]).slice((''+i[e]).length)));return t}msg(e=t,s='',i='',r){const o=t=>{if(!t)return t;if('string'==typeof t)return this.isLoon()?t:this.isQuanX()?{'open-url':t}:this.isSurge()?{url:t}:void 0;if('object'==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t['open-url'],s=t.mediaUrl||t['media-url'];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t['open-url']||t.url||t.openUrl,s=t['media-url']||t.mediaUrl;return{'open-url':e,'media-url':s}}if(this.isSurge()){let e=t.url||t.openUrl||t['open-url'];return{url:e}}}};if((this.isMute,!this.isMuteLog)){let t=['','==============📣系统通知📣=============='];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join('\n')),(this.logs=this.logs.concat(t))}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){this.log('',`❗️${this.name},错误!`,t.stack)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=new Date().getTime(),s=(e-this.startTime)/1e3;this.log('',`🔔${this.name},结束!🕛${s}秒`),this.log()}})(t,e)}
