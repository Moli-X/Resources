/***********************************

            
[rewrite_local]

^https?:\/\/api\.gotokeep\.com\/kprime\/v\d\/popups\/primeGuide url reject
^https?:\/\/kad\.gotokeep\.com\/op-engine-webapp\/v\d\/ad url reject
^https?:\/\/api.gotokeep.com/cauchy/growth/init url reject
^https?:\/\/api\.gotokeep\.com\/search\/v\d\/default\/keyword\/list url reject
^https?:\/\/api\.gotokeep\.com\/search\/v\d\/hotword\/list url reject
^https?:\/\/api\.gotokeep\.com\/search\/v\d\/hotCourse\/list url reject
^https?:\/\/api\.gotokeep\.com\/op-engine-webapp\/v\d\/ad url reject
^https?:\/\/api\.gotokeep\.com\/ads\/v\d\/ads\/preload url reject
^https?:\/\/api\.gotokeep\.com\/training\/box\/config url reject
^https?:\/\/api\.gotokeep\.com\/anno\/v\d\/upgrade\/check url reject

^https?:\/\/api\.gotokeep\.com\/athena\/v\d\/people\/my url script-response-body https://codeberg.org/ddgksf2013/Cuttlefish/raw/branch/master/Script/keepStyle.js
^https?:\/\/api\.gotokeep\.com\/config\/v\d\/basic url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Keep.js
https://api.gotokeep.com/homepage/v7/tab/find url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Keep.js
https://api.gotokeep.com/nuocha/course/v2/\w+/preview url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Keep.js
https://api.gotokeep.com/sportpage/sport/v3/mysport url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Keep.js
[mitm]

hostname=api.gotokeep.com, kad.gotokeep.com

***********************************/





if(-1!=$request.url.indexOf("athena/v5/people/my")){let e=JSON.parse($response.body);e.data.floatingInfo={},$done({body:JSON.stringify(e)})}else if(-1!=$request.url.indexOf("config/v3/basic")){let e=JSON.parse($response.body);e.data.bottomBarControl.defaultTab="home",e.data.bottomBarControl.tabs=Object.values(e.data.bottomBarControl.tabs).filter(e=>!("entry"==e.tabType||"mall"==e.tabType||"prime"==e.tabType)),e.data.homeTabs=Object.values(e.data.homeTabs).filter(e=>!("uni_web_activity"==e.type)),2<e.data.homeTabs.length&&(e.data.homeTabs[0].schema="keep://homepage/homePrime",e.data.homeTabs[0].name="會員",e.data.homeTabs[0].type="homePrime"),$done({body:JSON.stringify(e)})}else if(-1!=$request.url.indexOf("homepage/v7/tab/find")){let e=JSON.parse($response.body);e.data.sections=Object.values(e.data.sections).filter(e=>"quickEntranceV3"==e.contentStyle),e.data.sections[0].quickEntrances=e.data.sections[0].quickEntrances.filter(e=>0==e.itemTrackProps.itemPosition||1==e.itemTrackProps.itemPosition||2==e.itemTrackProps.itemPosition||3==e.itemTrackProps.itemPosition),$done({body:JSON.stringify(e)})}else if(-1!=$request.url.indexOf("preview")){let e=JSON.parse($response.body);e.data.detailSections=Object.values(e.data.detailSections).filter(e=>!("recommendation"==e.sectionType)),$done({body:JSON.stringify(e)})}else if(-1!=$request.url.indexOf("sportpage/sport/v3/mysport")){let e=JSON.parse($response.body);e.data.sections&&delete e.data.sections,$done({body:JSON.stringify(e)})}

