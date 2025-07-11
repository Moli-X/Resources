/***********************************************
> 应用名称：墨鱼自用微信小程序去广告脚本
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2023-03-19
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/


re('"excitationAd":"\\d"@Ad":"\d"@ad":true@AdId":"[^"]*"@adid":"[^"]*"@fr_videp_if":"1@adunit[^"]*"','"excitationAd":"0"@Ad":"0"@ad":false@AdId":""@adid":""@fr_videp_if":"0@"')

function re(){var e=$response.body;if(arguments[0].includes("@")){var r=arguments[0].split("@"),l=arguments[1].split("@");for(i=0;i<r.length;i++){var a=RegExp(r[i],"g");e=e.replace(a,l[i])}}else{var a=RegExp(arguments[0],"g");e=e.replace(a,arguments[1])}$done(e)}
