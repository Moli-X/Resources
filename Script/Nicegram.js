/***********************************
            

[rewrite_local]
^https?:\/\/restore-access\.indream\.app\/restoreAccess url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Nicegram.js

[mitm]
hostname = restore-access.indream.app

*************************************/


const isQX = typeof $task != "undefined";
const nicegram = {"data":{"premiumAccess": true}};
console.log('已操作成功🎉);
$done({status: isQX ? "HTTP/1.1 200 OK" : 200, headers: $response.headers, body: JSON.stringify(nicegram)});
