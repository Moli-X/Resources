/* 
[rewrite_local]
# 会员相关 API 修改
https:\/\/(dd38dkt7dfvyr|d2x03a61ogs2x5|d3lijns9322mkl)\.cloudfront\.net\/api\/(video\/getVideoById|user\/base\/info|community\/dynamic\/dynamicInfo) url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/ydm.js

# 广告过滤
^https:\/\/(?:dd38dkt7dfvyr|d2x03a61ogs2x5|d3lijns9322mkl)\.cloudfront\.net\/api\/(?:sys\/partner\/list|activity\/indexActs|sys\/advertisement\/list|sys\/getImgAndVideoCdnList|aibox\/entranceConfig) url reject

[mitm]
hostname = *.cloudfront.net
*/



// 初始化环境类，用于兼容不同代理工具（Quantumult X、Surge 等）
class Env {
    constructor(name) {
        this.name = name;
        this.logs = [];
        this.logLevel = "info";
    }

    // 日志输出
    log(message) {
        if (this.logLevel === "info") {
            console.log(message);
            this.logs.push(message);
        }
    }

    // 获取响应体
    getResponseBody() {
        return $response.body;
    }

    // 设置最终输出
    done(data) {
        $done(data);
    }
}

// 初始化环境
const env = new Env("VideoAuthKey");

// 主函数：处理请求和响应
function main() {
    const url = $request.url; // 获取当前请求的 URL
    let body = env.getResponseBody(); // 获取响应体
    let responseData = JSON.parse(body); // 解析为 JSON 对象

    // 处理会员相关 API
    if (/\/user\/base\/info/.test(url)) {
        env.log("检测到用户信息请求，正在修改为会员状态...");
        responseData.data = responseData.data || {};
        responseData.data.vipType = "1"; // 设置会员类型为 1（假设 1 表示会员）
        responseData.data.score = 9999;  // 设置积分
        responseData.data.vipLevel = 9.9; // 设置会员等级
        responseData.data.vipExpireTime = 4102415999; // 设置会员到期时间（未来某个时间戳）
        responseData.data.isLogin = true; // 设置登录状态
    }

    // 处理视频信息 API
    if (/\/video\/getVideoById/.test(url)) {
        env.log("检测到视频请求，解锁视频权限...");
        responseData.data = responseData.data || {};
        responseData.data.canWatch = true; // 允许观看视频
        responseData.data.vipRequired = false; // 移除会员限制
    }

    // 处理动态信息 API
    if (/\/community\/dynamic\/dynamicInfo/.test(url)) {
        env.log("检测到动态请求，增强数据...");
        responseData.data = responseData.data || {};
        responseData.data.isPremium = true; // 设置为高级内容
    }

    // 输出修改后的响应
    env.done({ body: JSON.stringify(responseData) });
}

// 执行主函数
main();
