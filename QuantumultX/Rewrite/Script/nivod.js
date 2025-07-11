/**********************************************

> 应用名称：泥巴网站净化
> 脚本作者：@Adblock4limbo
> 微信账号：墨鱼手记
> 更新时间：2023-09-02
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 网站地址：https://m.nivod4.tv/
> 脚本说明：去除网页推广、网页广告、视频播放前AD
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载、售卖
          ⚠️⚠️⚠️


[rewrite_local]

^https?:\/\/.*nivod.*\/($|[0-9a-zA-Z=_/-]+\.html) url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/nivod.js

[mitm]

hostname = m.nivod4.tv

**********************************************/





























var body = $response.body.replace(/<head>/, '<head><style>img[src*=gif], .video-ad, .nav-ads, #adDiv, .v-ad, .ad-text, #video-container + ul[style^=\"width:\"] > li > img {display: none !important}</style>');
$done({ body });
