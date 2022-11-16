var body = $response.body
    .replace(/<head>/, '<head><link rel="stylesheet" href="https://github.com/Moli-X/Resources/raw/main/Script/Cupbox/Cupbox.css" type="text/css">');
$done({ body });
