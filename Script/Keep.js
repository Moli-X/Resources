/***********************************      
[rewrite_local]
^https?:\/\/api\.gotokeep\.com\/(athena\/v\d\/people\/my|config\/v\d\/basic) url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Keep.js
[mitm]
hostname=api.gotokeep.com
***********************************/


if ($request.url.indexOf('athena/v5/people/my') != -1) {
    let obj = JSON.parse($response.body);
    obj.data.floatingInfo = {}
    $done({ body: JSON.stringify(obj) });
}
else if( $request.url.indexOf('config/v3/basic') != -1 ){
    let obj = JSON.parse($response.body);
    obj.data.bottomBarControl.defaultTab = "home";
    //obj.data.bottomBarControl.tabs.forEach((e, i) => {if (e.tabType == "entry" || e.tabType == "mall") bottomBarTabs.splice(i--, 1);});
    obj.data.bottomBarControl.tabs = Object.values(obj.data.bottomBarControl.tabs).filter(item => !(item["tabType"]=="entry"||item["tabType"]=="mall"));
    obj.data.homeTabs = Object.values(obj.data.homeTabs).filter(item => !(item["type"]=="uni_web_activity"));
    $done({ body: JSON.stringify(obj) });
}

