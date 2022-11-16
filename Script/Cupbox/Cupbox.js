
/***********************************
[rewrite_local]
# 茶杯狐
^https?:/\/cupfox\.app(\/?$|\/([?]|search).*$) url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Cupbox/Cupbox.js

[mitm]
hostname= cupfox.app
***********************************/











var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://github.com/Moli-X/Resources/raw/main/Script/Cupbox/Cupbox.css" type="text/css">');
$done({ body });
