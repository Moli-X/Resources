
/**************************************
[rewrite_remote]
# ✅ PornHub
^https:\/\/(cn|www)\.pornhub\.com\/_xa\/ads url reject-dict
^https?:/\/(cn|www)\.pornhub\.com(\/?$|\/([?]|view|video).*$) url script-response-body https://github.com/Moli-X/Resources/raw/main/Script/Pornhub/Pornhub.js

[mitm]
hostname = *.pornhub.com
****************************************/











var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://raw.githubusercontent.com/Moli-X/Resources/main/Script/Pornhub/Pornhub.css" type="text/css">');
$done({ body });
