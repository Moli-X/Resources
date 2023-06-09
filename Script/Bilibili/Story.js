/***********************************
         
[rewrite_local]

^https?:\/\/app\.bilibili\.com\/x\/v\d\/feed\/index\? url script-request-header https://github.com/Moli-X/Resources/raw/main/Script/Bilibili/Story.js

[mitm]
 
hostname = app.bilibili.com

***********************************/
























//video_mode=2 首页信息流全是短视频，即每个点进去都是Story模式
var modifiedPath = $request.path.replace(/video_mode=\d/g,'video_mode=1');
$done({path: modifiedPath});
