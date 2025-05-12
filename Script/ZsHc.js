/*
⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

【使用说明】
手动签到获取Cookie即可使用。

【Surge】
-----------------
[Script]
水滴社区获取Cookie = type=http-request, pattern=https:\/\/zshcapp\.dataserver\.cn\/login, script-path=https://github.com/Moli-X/Resources/raw/main/Script/ZsHc.js
水滴社区签到 = type=cron, cronexp="8 0 * * *", wake-system=1, script-path=https://github.com/Moli-X/Resources/raw/main/Script/ZsHc.js

【Loon】
-----------------
[Script]
http-request https:\/\/zshcapp\.dataserver\.cn\/login script-path=https://github.com/Moli-X/Resources/raw/main/Script/ZsHc.js, tag=水滴社区获取Cookie
cron "8 0 * * *" script-path=https://github.com/Moli-X/Resources/raw/main/Script/ZsHc.js, tag=水滴社区签到

【Quantumult X】
-----------------
[rewrite_local]
https:\/\/zshcapp\.dataserver\.cn\/login url script-request-header https://github.com/Moli-X/Resources/raw/main/Script/ZsHc.js

[task_local]
8 0 * * * https://github.com/Moli-X/Resources/raw/main/Script/ZsHc.js, tag=水滴社区签到

【All App MitM】
hostname = zshcapp.dataserver.cn
*/

const isLoon = typeof $loon !== "undefined";
const isSurge = typeof $httpClient !== "undefined" && !isLoon;
const isQX = typeof $task !== "undefined";

function read(key) {
    if (isLoon || isSurge) return $persistentStore.read(key);
    if (isQX) return $prefs.valueForKey(key);
}

function write(key, value) {
    if (isLoon || isSurge) return $persistentStore.write(value, key);
    if (isQX) return $prefs.setValueForKey(value, key);
}

function notify(title, subtitle, message) {
    if (isLoon) $notification.post(title, subtitle, message);
    if (isSurge) $notification.post(title, subtitle, message);
    if (isQX) $notify(title, subtitle, message);
}

function httpPost(url, headers, body) {
    if (isLoon || isSurge) {
        return new Promise((resolve, reject) => {
            $httpClient.post({ url, headers, body }, (err, resp, data) => {
                if (err) reject(err);
                else resolve({ status: resp.status, headers: resp.headers, body: data });
            });
        });
    }
    if (isQX) {
        return $task.fetch({ url, method: "POST", headers, body }).then(resp => ({
            status: resp.statusCode,
            headers: resp.headers,
            body: resp.body
        }));
    }
}

if (typeof $request !== "undefined") {
    // 捕获 Cookie 和 xAuthorization
    const cookie = $request.headers.Cookie || $request.headers.cookie;
    const xAuth = $request.headers["xAuthorization"] || $request.headers["xauthorization"];
    if (cookie && xAuth) {
        write("huichuan_cookie", cookie);
        write("huichuan_xauth", xAuth);
        notify("汇川签到", "", "Cookie 和 xAuthorization 捕获成功！");
    } else {
        notify("汇川签到", "", "捕获 Cookie 或 xAuthorization 失败。");
    }
    $done();
} else {
    // 执行签到
    const cookie = read("huichuan_cookie");
    const xAuth = read("huichuan_xauth");
    if (!cookie || !xAuth) {
        notify("汇川签到", "", "错误：缺少 Cookie 或 xAuthorization。请先登录。");
        $done();
    }

    const url = "https://zshcapp.dataserver.cn/circle/v1/sign/add";
    const headers = {
        'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
        'pSysVer': '17.3.1',
        'Connection': 'keep-alive',
        'pTime': String(Date.now()),
        'pIdCard': 'phh2a28dfd53a4d309918b081de6bf762e9ccard',
        'pVer': '1.3.8',
        'pf': 'ios',
        'Accept-Language': 'zh-Hans-US;q=1.0, en-US;q=0.9, zh-Hant-US;q=0.8',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'platform': '1',
        'currentUsageType': '0',
        'Host': 'zshcapp.dataserver.cn',
        'Cookie': cookie,
        'channelId': '2002',
        'xAuthorization': xAuth,
        'pDevName': 'iPhone16,1',
        'User-Agent': 'PalmHouse/1.3.8 (com.inovance.palmhouse; build:1.0.1; iOS 17.3.1) Alamofire/5.7.1',
        'usageRole': '2',
        'pDevId': '1def0692db5af919b1e36c928ec81a66'
    };
    const body = '{"taskId":"21"}';

    httpPost(url, headers, body).then(response => {
        if (response.status === 200) {
            const data = JSON.parse(response.body);
            if (data.success) {
                notify("汇川签到", "", "签到成功！积分：" + (data.point || "N/A"));
            } else {
                notify("汇川签到", "", "签到失败：" + data.message);
            }
        } else {
            notify("汇川签到", "", "HTTP 错误：" + response.status);
        }
        $done();
    }).catch(err => {
        notify("汇川签到", "", "错误：" + err);
        $done();
    });
}
