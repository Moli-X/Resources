[rewrite_local]

# 直连模式
^https?:\/\/app\.bilibili\.com\/x\/resource\/domain url script-response-body https://raw.githubusercontent.com/Moli-X/Resources/main/Script/Bilibili/ZLBilibili.js 

[mitm] 

hostname=api.bilibili.com

***********************************/




const Group = $prefs.valueForKey('BiliArea_Policy') || '港台番剧';

const message = {
    action: "set_policy_state",
    content: {[Group]: "direct"}
};
$configuration.sendMessage(message).then(resolve => {
    if (resolve.error) {
        console.log(resolve.error);
    }
    if (resolve.ret) {
        let output=JSON.stringify(resolve.ret);
        //console.log(output);
    }
    $done();
}, reject => {
    // Normally will never happen.
    $done();
});
