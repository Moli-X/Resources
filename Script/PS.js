/***********************************
            
#  https://t.me/QuantX  

[rewrite_local]

^https:\/\/lcs-mobile-cops\.adobe\.io\/mobile_profile url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/PS.js

[mitm] 
hostname= lcs-mobile-cops.adobe.io, photos.adobe.io

***********************************/













let obj = JSON.parse($response.body)
let pro= obj["mobileProfile"];
pro["profileStatus"] = "PROFILE_AVAILABLE";
pro["legacyProfile"] = "{}";
pro["relationshipProfile"] = "[]";
$done({body: JSON.stringify(obj)})
