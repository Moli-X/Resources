
// 转换时间: 2024/6/4 22:20:56
var setInterval = () => {}
var clearInterval = () => {}
var $task = {
  fetch: url => {
    return new Promise((resolve, reject) => {
      if (url.method == 'POST') {
        $httpClient.post(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      } else {
        $httpClient.get(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      }
    })
  },
}

var $prefs = {
  valueForKey: key => {
    return $persistentStore.read(key)
  },
  setValueForKey: (val, key) => {
    return $persistentStore.write(val, key)
  },
}

var $notify = (title = '', subt = '', desc = '', opts) => {
  const toEnvOpts = (rawopts) => {
    if (!rawopts) return rawopts 
    if (typeof rawopts === 'string') {
      if ('undefined' !== typeof $loon) return rawopts
      else if('undefined' !== typeof $rocket) return rawopts
      else return { url: rawopts }
    } else if (typeof rawopts === 'object') {
      if ('undefined' !== typeof $loon) {
        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
        return { openUrl, mediaUrl }
      } else {
        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
        if('undefined' !== typeof $rocket) return openUrl
        return { url: openUrl }
      }
    } else {
      return undefined
    }
  }
  console.log(title, subt, desc, toEnvOpts(opts))
  $notification.post(title, subt, desc, toEnvOpts(opts))
}
var _scriptSonverterDone = (val = {}) => {
  let result
  if (
    (typeof $request !== 'undefined' &&
    typeof val === 'object' &&
    typeof val.status !== 'undefined' &&
    typeof val.headers !== 'undefined' &&
    typeof val.body !== 'undefined') || false
  ) {
    result = { response: val }
  } else {
    result = val
  }
  console.log('$done')
  try {
    console.log(JSON.stringify(result))
  } catch (e) {
    console.log(result)
  }
  $done(result)
}

/******************************

脚本功能：PDF Viewer Pro+解锁订阅
下载地址：https://is.gd/PAWYmn
软件版本：6.1.9
脚本作者：彭于晏💞
更新时间：2022-10-13
问题反馈：QQ+89996462
QQ会员群：779392027💞
TG反馈群：https://t.me/plus8889
TG频道群：https://t.me/py996
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/api\.revenuecat\.com\/v1\/subscribers.+ url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/PDFViewer.js

[mitm] 
hostname = api.revenuecat.com


*******************************/


var _0x51e3=['\x77\x35\x4c\x43\x76\x42\x76\x43\x72\x41\x4e\x72\x47\x67\x50\x44\x6c\x63\x4b\x65\x77\x71\x46\x53\x43\x47\x48\x43\x6b\x6b\x56\x76\x42\x73\x4b\x30\x47\x6a\x59\x48\x66\x30\x6f\x3d','\x4f\x77\x73\x43\x4e\x38\x4f\x37\x77\x6f\x63\x4a\x77\x71\x62\x43\x70\x51\x4d\x66\x77\x35\x42\x56\x62\x33\x50\x44\x67\x73\x4b\x50\x77\x36\x66\x44\x6b\x53\x55\x3d','\x77\x71\x58\x44\x74\x38\x4f\x66\x45\x63\x4b\x56\x77\x37\x4c\x44\x72\x73\x4f\x74\x77\x6f\x2f\x44\x71\x56\x39\x35\x77\x35\x42\x71\x46\x63\x4b\x55\x77\x37\x63\x6a\x77\x36\x6e\x43\x74\x41\x3d\x3d','\x77\x37\x38\x45\x77\x72\x31\x53\x64\x42\x66\x44\x6a\x44\x72\x44\x75\x73\x4f\x75\x49\x63\x4b\x4d\x77\x35\x63\x67\x77\x34\x63\x6b\x77\x35\x6e\x44\x68\x38\x4b\x68\x47\x6d\x51\x3d','\x77\x72\x78\x39\x77\x37\x77\x47','\x50\x33\x42\x65\x77\x37\x62\x44\x6a\x51\x3d\x3d','\x59\x68\x37\x43\x67\x32\x37\x44\x75\x4d\x4b\x54\x45\x31\x33\x43\x6e\x63\x4f\x68\x64\x33\x54\x43\x6e\x4d\x4f\x72\x77\x72\x41\x6d\x4a\x51\x59\x68\x77\x37\x6f\x3d','\x77\x71\x58\x44\x74\x38\x4f\x66\x45\x63\x4b\x56\x77\x37\x4c\x44\x72\x73\x4f\x74\x77\x6f\x2f\x44\x71\x56\x39\x35\x77\x35\x42\x71\x46\x63\x4b\x56\x77\x37\x63\x67\x77\x36\x37\x43\x74\x41\x3d\x3d','\x77\x36\x64\x4a\x77\x37\x72\x44\x74\x38\x4b\x2f\x77\x37\x5a\x66\x4e\x4d\x4b\x6b\x62\x45\x45\x43\x77\x72\x37\x43\x6d\x54\x76\x43\x72\x4d\x4f\x54\x77\x36\x44\x43\x6b\x63\x4b\x75','\x51\x52\x66\x43\x71\x4d\x4b\x51\x47\x32\x52\x37\x41\x54\x6a\x44\x6d\x63\x4f\x36\x5a\x33\x6b\x79\x59\x73\x4b\x71\x56\x38\x4b\x79\x43\x63\x4b\x2f','\x77\x34\x30\x31\x77\x35\x72\x43\x67\x47\x49\x3d','\x51\x52\x66\x43\x71\x4d\x4b\x51\x47\x32\x52\x37\x41\x54\x6a\x44\x6c\x73\x4f\x36\x5a\x6e\x73\x79\x59\x73\x4b\x72\x56\x38\x4b\x32\x43\x63\x4b\x2f','\x77\x35\x48\x44\x74\x6a\x42\x2b\x77\x6f\x49\x69\x77\x35\x66\x44\x69\x73\x4b\x54\x52\x6b\x78\x61\x77\x37\x37\x43\x6d\x46\x68\x41\x77\x36\x54\x43\x73\x56\x52\x72','\x56\x63\x4f\x76\x77\x72\x4d\x36\x42\x38\x4b\x73\x77\x36\x76\x43\x6f\x69\x33\x44\x72\x55\x74\x51\x54\x47\x59\x34\x77\x36\x7a\x43\x75\x4d\x4b\x35\x77\x37\x44\x43\x72\x6d\x76\x44\x6e\x73\x4b\x41\x46\x68\x44\x44\x6b\x63\x4f\x33\x4c\x51\x7a\x43\x72\x38\x4b\x55\x63\x4d\x4b\x71\x4d\x78\x76\x44\x6a\x53\x58\x44\x6d\x6e\x50\x43\x6a\x73\x4f\x55\x48\x63\x4f\x52\x4e\x51\x3d\x3d','\x77\x35\x44\x43\x71\x44\x58\x44\x76\x4d\x4f\x31\x4f\x63\x4f\x72\x77\x37\x2f\x44\x69\x67\x3d\x3d','\x77\x71\x34\x77\x61\x6c\x56\x44\x46\x73\x4f\x4a'];(function(_0x34f0e7,_0x51e335){var _0x5b0e2a=function(_0x426ca3){while(--_0x426ca3){_0x34f0e7['push'](_0x34f0e7['shift']());}};var _0x2d70ef=function(){var _0x27ad74={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x36a6c6,_0x1d02b4,_0x31d16e,_0x228473){_0x228473=_0x228473||{};var _0xe4c6c2=_0x1d02b4+'='+_0x31d16e;var _0x5f0233=0x0;for(var _0x3306bd=0x0,_0x566028=_0x36a6c6['length'];_0x3306bd<_0x566028;_0x3306bd++){var _0x1904c=_0x36a6c6[_0x3306bd];_0xe4c6c2+=';\x20'+_0x1904c;var _0xc361e0=_0x36a6c6[_0x1904c];_0x36a6c6['push'](_0xc361e0);_0x566028=_0x36a6c6['length'];if(_0xc361e0!==!![]){_0xe4c6c2+='='+_0xc361e0;}}_0x228473['cookie']=_0xe4c6c2;},'removeCookie':function(){return'dev';},'getCookie':function(_0x527709,_0x2cb8e5){_0x527709=_0x527709||function(_0x5bcbe4){return _0x5bcbe4;};var _0x441c98=_0x527709(new RegExp('(?:^|;\x20)'+_0x2cb8e5['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x86cd9a=function(_0x1dc1c8,_0x505c9b){_0x1dc1c8(++_0x505c9b);};_0x86cd9a(_0x5b0e2a,_0x51e335);return _0x441c98?decodeURIComponent(_0x441c98[0x1]):undefined;}};var _0x42b96c=function(){var _0x1e99f8=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x1e99f8['test'](_0x27ad74['removeCookie']['toString']());};_0x27ad74['updateCookie']=_0x42b96c;var _0x3a34a1='';var _0x5ddeb1=_0x27ad74['updateCookie']();if(!_0x5ddeb1){_0x27ad74['setCookie'](['*'],'counter',0x1);}else if(_0x5ddeb1){_0x3a34a1=_0x27ad74['getCookie'](null,'counter');}else{_0x27ad74['removeCookie']();}};_0x2d70ef();}(_0x51e3,0x142));var _0x5b0e=function(_0x34f0e7,_0x51e335){_0x34f0e7=_0x34f0e7-0x0;var _0x5b0e2a=_0x51e3[_0x34f0e7];if(_0x5b0e['HGyKzt']===undefined){(function(){var _0x27ad74;try{var _0x3a34a1=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x27ad74=_0x3a34a1();}catch(_0x5ddeb1){_0x27ad74=window;}var _0x42b96c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x27ad74['atob']||(_0x27ad74['atob']=function(_0x36a6c6){var _0x1d02b4=String(_0x36a6c6)['replace'](/=+$/,'');var _0x31d16e='';for(var _0x228473=0x0,_0xe4c6c2,_0x5f0233,_0x3306bd=0x0;_0x5f0233=_0x1d02b4['charAt'](_0x3306bd++);~_0x5f0233&&(_0xe4c6c2=_0x228473%0x4?_0xe4c6c2*0x40+_0x5f0233:_0x5f0233,_0x228473++%0x4)?_0x31d16e+=String['fromCharCode'](0xff&_0xe4c6c2>>(-0x2*_0x228473&0x6)):0x0){_0x5f0233=_0x42b96c['indexOf'](_0x5f0233);}return _0x31d16e;});}());var _0x426ca3=function(_0x566028,_0x1904c){var _0xc361e0=[],_0x527709=0x0,_0x2cb8e5,_0x441c98='',_0x86cd9a='';_0x566028=atob(_0x566028);for(var _0x1dc1c8=0x0,_0x505c9b=_0x566028['length'];_0x1dc1c8<_0x505c9b;_0x1dc1c8++){_0x86cd9a+='%'+('00'+_0x566028['charCodeAt'](_0x1dc1c8)['toString'](0x10))['slice'](-0x2);}_0x566028=decodeURIComponent(_0x86cd9a);var _0x5bcbe4;for(_0x5bcbe4=0x0;_0x5bcbe4<0x100;_0x5bcbe4++){_0xc361e0[_0x5bcbe4]=_0x5bcbe4;}for(_0x5bcbe4=0x0;_0x5bcbe4<0x100;_0x5bcbe4++){_0x527709=(_0x527709+_0xc361e0[_0x5bcbe4]+_0x1904c['charCodeAt'](_0x5bcbe4%_0x1904c['length']))%0x100;_0x2cb8e5=_0xc361e0[_0x5bcbe4];_0xc361e0[_0x5bcbe4]=_0xc361e0[_0x527709];_0xc361e0[_0x527709]=_0x2cb8e5;}_0x5bcbe4=0x0;_0x527709=0x0;for(var _0x1e99f8=0x0;_0x1e99f8<_0x566028['length'];_0x1e99f8++){_0x5bcbe4=(_0x5bcbe4+0x1)%0x100;_0x527709=(_0x527709+_0xc361e0[_0x5bcbe4])%0x100;_0x2cb8e5=_0xc361e0[_0x5bcbe4];_0xc361e0[_0x5bcbe4]=_0xc361e0[_0x527709];_0xc361e0[_0x527709]=_0x2cb8e5;_0x441c98+=String['fromCharCode'](_0x566028['charCodeAt'](_0x1e99f8)^_0xc361e0[(_0xc361e0[_0x5bcbe4]+_0xc361e0[_0x527709])%0x100]);}return _0x441c98;};_0x5b0e['zbfJhJ']=_0x426ca3;_0x5b0e['DzshCv']={};_0x5b0e['HGyKzt']=!![];}var _0x2d70ef=_0x5b0e['DzshCv'][_0x34f0e7];if(_0x2d70ef===undefined){if(_0x5b0e['VIlxHu']===undefined){var _0x4580e2=function(_0x210bd9){this['vagIOr']=_0x210bd9;this['kazEjR']=[0x1,0x0,0x0];this['aIXFrG']=function(){return'newState';};this['kGtHON']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['ohuVMk']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x4580e2['prototype']['jNlFiT']=function(){var _0x2454c5=new RegExp(this['kGtHON']+this['ohuVMk']);var _0x50d74d=_0x2454c5['test'](this['aIXFrG']['toString']())?--this['kazEjR'][0x1]:--this['kazEjR'][0x0];return this['yzjQko'](_0x50d74d);};_0x4580e2['prototype']['yzjQko']=function(_0x110d6c){if(!Boolean(~_0x110d6c)){return _0x110d6c;}return this['KrWtix'](this['vagIOr']);};_0x4580e2['prototype']['KrWtix']=function(_0x10d7e2){for(var _0x4ccdae=0x0,_0x3983fa=this['kazEjR']['length'];_0x4ccdae<_0x3983fa;_0x4ccdae++){this['kazEjR']['push'](Math['round'](Math['random']()));_0x3983fa=this['kazEjR']['length'];}return _0x10d7e2(this['kazEjR'][0x0]);};new _0x4580e2(_0x5b0e)['jNlFiT']();_0x5b0e['VIlxHu']=!![];}_0x5b0e2a=_0x5b0e['zbfJhJ'](_0x5b0e2a,_0x51e335);_0x5b0e['DzshCv'][_0x34f0e7]=_0x5b0e2a;}else{_0x5b0e2a=_0x2d70ef;}return _0x5b0e2a;};var _0x59ce22=function(){var _0x1b8726=!![];return function(_0x16fc6c,_0x1c0555){var _0x581f16=_0x1b8726?function(){if(_0x1c0555){var _0x64b8c7=_0x1c0555[_0x5b0e('\x30\x78\x38','\x44\x6a\x79\x72')](_0x16fc6c,arguments);_0x1c0555=null;return _0x64b8c7;}}:function(){};_0x1b8726=![];return _0x581f16;};}();var _0x20bd81=_0x59ce22(this,function(){var _0x1cc0f4=function(){var _0x2a15ac=_0x1cc0f4['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72'](_0x5b0e('\x30\x78\x31','\x63\x50\x73\x63'))()[_0x5b0e('\x30\x78\x64','\x2a\x70\x6d\x59')](_0x5b0e('\x30\x78\x65','\x5e\x44\x77\x6a'));return!_0x2a15ac[_0x5b0e('\x30\x78\x32','\x78\x6d\x31\x67')](_0x20bd81);};return _0x1cc0f4();});_0x20bd81();var _0x18f431=JSON[_0x5b0e('\x30\x78\x33','\x24\x76\x59\x70')]($response['\x62\x6f\x64\x79']);_0x18f431={'\x72\x65\x71\x75\x65\x73\x74\x5f\x64\x61\x74\x65\x5f\x6d\x73':0x1831aa14578,'\x72\x65\x71\x75\x65\x73\x74\x5f\x64\x61\x74\x65':_0x5b0e('\x30\x78\x30','\x4f\x38\x78\x68'),'\x73\x75\x62\x73\x63\x72\x69\x62\x65\x72':{'\x6c\x61\x73\x74\x5f\x73\x65\x65\x6e':_0x5b0e('\x30\x78\x37','\x56\x34\x25\x6c'),'\x66\x69\x72\x73\x74\x5f\x73\x65\x65\x6e':_0x5b0e('\x30\x78\x66','\x37\x55\x38\x62'),'\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x5f\x76\x65\x72\x73\x69\x6f\x6e':'\x38','\x6f\x74\x68\x65\x72\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x73':{},'\x6d\x61\x6e\x61\x67\x65\x6d\x65\x6e\x74\x5f\x75\x72\x6c':_0x5b0e('\x30\x78\x62','\x78\x56\x38\x31'),'\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x73':{'\x63\x6f\x6d\x2e\x64\x64\x67\x6b\x73\x66\x32\x30\x31\x33\x2e\x70\x72\x65\x6d\x69\x75\x6d\x2e\x79\x65\x61\x72\x6c\x79':{'\x69\x73\x5f\x73\x61\x6e\x64\x62\x6f\x78':![],'\x6f\x77\x6e\x65\x72\x73\x68\x69\x70\x5f\x74\x79\x70\x65':_0x5b0e('\x30\x78\x63','\x62\x32\x21\x34'),'\x62\x69\x6c\x6c\x69\x6e\x67\x5f\x69\x73\x73\x75\x65\x73\x5f\x64\x65\x74\x65\x63\x74\x65\x64\x5f\x61\x74':null,'\x70\x65\x72\x69\x6f\x64\x5f\x74\x79\x70\x65':'\x6e\x6f\x72\x6d\x61\x6c','\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':_0x5b0e('\x30\x78\x61','\x4c\x7a\x6c\x53'),'\x67\x72\x61\x63\x65\x5f\x70\x65\x72\x69\x6f\x64\x5f\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':null,'\x75\x6e\x73\x75\x62\x73\x63\x72\x69\x62\x65\x5f\x64\x65\x74\x65\x63\x74\x65\x64\x5f\x61\x74':null,'\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':'\x32\x30\x32\x32\x2d\x30\x39\x2d\x30\x38\x54\x30\x31\x3a\x30\x34\x3a\x31\x38\x5a','\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':_0x5b0e('\x30\x78\x34','\x4c\x5a\x34\x23'),'\x73\x74\x6f\x72\x65':'\x61\x70\x70\x5f\x73\x74\x6f\x72\x65'}},'\x65\x6e\x74\x69\x74\x6c\x65\x6d\x65\x6e\x74\x73':{'\x73\x75\x62\x2e\x70\x72\x6f':{'\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':_0x5b0e('\x30\x78\x36','\x34\x43\x31\x5d'),'\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':_0x5b0e('\x30\x78\x35','\x4f\x38\x78\x68'),'\x70\x72\x6f\x64\x75\x63\x74\x5f\x69\x64\x65\x6e\x74\x69\x66\x69\x65\x72':'\x63\x6f\x6d\x2e\x64\x64\x67\x6b\x73\x66\x32\x30\x31\x33\x2e\x70\x72\x65\x6d\x69\x75\x6d\x2e\x79\x65\x61\x72\x6c\x79','\x67\x72\x61\x63\x65\x5f\x70\x65\x72\x69\x6f\x64\x5f\x65\x78\x70\x69\x72\x65\x73\x5f\x64\x61\x74\x65':null}},'\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x70\x75\x72\x63\x68\x61\x73\x65\x5f\x64\x61\x74\x65':_0x5b0e('\x30\x78\x39','\x56\x34\x25\x6c'),'\x6f\x72\x69\x67\x69\x6e\x61\x6c\x5f\x61\x70\x70\x5f\x75\x73\x65\x72\x5f\x69\x64':'\x24\x52\x43\x41\x6e\x6f\x6e\x79\x6d\x6f\x75\x73\x49\x44\x3a\x64\x64\x67\x6b\x73\x66\x32\x30\x31\x33','\x6e\x6f\x6e\x5f\x73\x75\x62\x73\x63\x72\x69\x70\x74\x69\x6f\x6e\x73':{}}};_scriptSonverterDone({'\x62\x6f\x64\x79':JSON['\x73\x74\x72\x69\x6e\x67\x69\x66\x79'](_0x18f431)});
