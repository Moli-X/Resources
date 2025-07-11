/***********************************************
> 应用名称：墨鱼自用小红书去广告脚本
> 脚本作者：@blackmatrix7,@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-08-12
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/


const version = 'V1.0.6';

let body=$response.body;if(body){try{let t=$request.url,a=JSON.parse(body);switch(!0){case/util\/loading/.test(t):a.data.forEach(t=>{t.start_date="2030-12-24 00:00:00",t.end_date="2030-12-24 23:59:59",t.unix_start_date="1924272000",t.unix_end_date="1924358399",t.is_show_ad="0"});break;case/advert_distribution\/get_all_advertise/.test(t):a.data.start_date="2030-12-24 00:00:00",a.data.end_date="2030-12-24 23:59:59",a.data.unix_start_date="1924272000",a.data.unix_end_date="1924358399",a.data.is_show_ad="0";break;case/^https?:\/\/homepage-api\.smzdm\.com\/v3\/home/.test(t):a.data.component=a.data.component.filter(t=>("banner"===t.zz_type?t.zz_content=t.zz_content.filter(t=>"广告"!==t.tag):"list"===t.zz_type?t.zz_content=t.zz_content.filter(t=>"ads"!==t.zz_content.model_type):"circular_banner"===t.zz_type&&(t.zz_content.circular_banner_option.background="1",t.zz_content.circular_banner_option.color_card="#ffffff",t.zz_content.circular_banner_option.img=""),"top_banner"!==t.zz_type&&"hongbao"!==t.zz_type));break;case/^https?:\/\/haojia-api\.smzdm\.com\/home\/list/.test(t):a.data.banner_v2=a.data.banner_v2.filter(t=>"21028"===t.cell_type),a.data.rows=a.data.rows.filter(t=>!t.hasOwnProperty("ad_banner_id"));break;case/^https?:\/\/haojia\.m\.smzdm\.com\/detail_modul\/article_releated_modul/.test(t):a.data.lanmu_qikan={};break;case/^https?:\/\/s-api.smzdm\.com\/sou\/search_default_keyword/.test(t):a.data={home:[{keyword:"",show_search_word:"",source:"发现"}]};break;case/^https?:\/\/baike-api\.smzdm\.com\/home_v3\/list/.test(t):a.data.rows=a.data.rows.filter(t=>!t.hasOwnProperty("ad_banner_id")||""===t.ad_banner_id);break;case/^https?:\/\/s-api\.smzdm\.com\/sou\/filter\/tags\/hot_tags/.test(t):a.data.hongbao={};break;case/^https?:\/\/s-api\.smzdm\.com\/sou\/list_v10/.test(t):a.data.rows=a.data.rows.filter(t=>"广告"!==t.article_tag);break;case/^https?:\/\/zhiyou\.m\.smzdm\.com\/user\/vip\/ajax_get_banner/.test(t):a.data.big_banner=a.data.big_banner.filter(t=>"广告"!==t.logo_title);break;default:$done({})}body=JSON.stringify(a)}catch(e){console.log(`Error processing URL: ${$request.url}, Error: ${e}`)}$done({body})}else $done({});
