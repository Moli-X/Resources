/*

Nicegram 1.4.7

[rewrite_local]
https://nicegram.cloud/api/v6/user/info url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Nicegram.js

[mitm] 
hostname = nicegram.cloud

*

var Q = JSON.parse($response.body);
Q.data.user.lifetime_subscription = true;
Q.data.user.store_subscription = true;
Q.data.user.subscription = true;
$done({body : JSON.stringify(Q)});
