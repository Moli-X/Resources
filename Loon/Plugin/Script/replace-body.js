/*
脚本作者：mieqq
引用地址：https://raw.githubusercontent.com/mieqq/mieqq/master/replace-body.js

用Loon的脚本实现Quantumult X的response-body和request-body重写类型

如Quantumult X的重写：
https://service.ilovepdf.com/v1/user url response-body false response-body true
   
可改写为Loon的脚本复写：
[Script] 
http-response https://service.ilovepdf.com/v1/user requires-body=true, script-path = https://kelee.one/Resource/Script/CommonScript/replace-body.js, argument = false->true

argument=要匹配值=作为替换的值
支持正则：如argument=\w+->test
支持正则修饰符：如argument=/\w+/g->test
支持多参数，如：argument=匹配值1->替换值1&匹配值2->替换值2

支持改写响应体和请求体体[type=http-response或http-request]注意必须打开需要body[requires-body = true]

提示：
修改json格式的键值对可以这样：
argument=("key")\s?:\s?"(.+?)"->$1: "new_value"

s修饰符可以让.匹配换行符，如argument=/.+/s->hello
  
*/

function getRegexp(re_str) {
	let regParts = re_str.match(/^\/(.*?)\/([gims]*)$/);
	if (regParts) {
		return new RegExp(regParts[1], regParts[2]);
	} else {
		return new RegExp(re_str);
	}
}

let body;
if (typeof $argument == "undefined") {
	console.log("requires $argument");
} else {
    if (typeof $response != "undefined") {
		body = $response.body;
	} else if (typeof $request != "undefined") {
		body = $request.body;
	} else {
		console.log("script type error");
	}
}

if (body) {
	$argument.split("&").forEach((item) => {
		let [match, replace] = item.split("->");
		let re = getRegexp(match);
		body = body.replace(re, replace);
	});
	$done({ body });
} else {
	console.log("Not Modify");
	$done({});
}