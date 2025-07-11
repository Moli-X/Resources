/***********************************************
> 应用名称：墨鱼自用彩云天气去广告脚本
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-09-01
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/




const version = 'V1.0.8';

let responseBody={};$request.url.includes("/v2/user")?((responseBody=JSON.parse($response.body)).result.is_vip=1,responseBody.result.svip_expired_at=1892260800,responseBody.result.wt.vip.expired_at=1892260800,responseBody.result.svip_take_effect=1,responseBody.result.vip_type="s"):$request.url.includes("user_detail")?(responseBody=JSON.parse($response.body),["svip","vip"].forEach(e=>{responseBody.vip_info[e]&&(responseBody.vip_info[e]={expires_time:"1892260800",is_auto_renewal:!0})})):$request.url.includes("activity")?responseBody=$request.url.includes("type_id=A03")?{status:"ok",activities:[{type:"tabbar",name:"aichat",feature:!1}]}:{status:"ok",activities:[{items:[{}]}]}:$request.url.includes("operation/homefeatures")?responseBody={data:[]}:$request.url.includes("operation/feeds")?(responseBody=JSON.parse($response.body)).data=responseBody.data.filter(e=>-1!=e.category_times_text.indexOf("人查看")):$request.url.includes("operation/banners")?responseBody={data:[{avatar:"https://cdn-w.caiyunapp.com/p/app/operation/prod/banner/668502d5c3a2362582a2a5da/d9f198473e7f387d13ea892719959ddb.jpg",url:"https://cdn-w.caiyunapp.com/p/app/operation/prod/article/66850143c3a2362582a2a5d9/index.html",title:"暴雨来袭，这些避险“秘籍”你学会了吗？",banner_type:"article"}]}:$request.url.includes("operation/features")?(responseBody=JSON.parse($response.body)).data=responseBody.data.filter(e=>-1!=e.url.indexOf("cy://")):$request.url.includes("campaigns")?responseBody={campaigns:[{name:"driveweather",title:"驾驶天气新功能",url:"cy://page_driving_weather",cover:"https://cdn-w.caiyunapp.com/p/banner/test/668d442c4fe75aca7251c161.png"}]}:$request.url.includes("notification/message_center")?responseBody={messages:[]}:$request.url.includes("config/cypage")?responseBody={popups:[],actions:[]}:$done({}),$done({body:JSON.stringify(responseBody)});
