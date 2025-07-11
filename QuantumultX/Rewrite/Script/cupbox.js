var body = $response.body.replace(/<head>/, '<head><style>.mobile-nav, .model, .a4-box[class^="jsx-"], .cupfox, .swiper, .adsbygoogle {display:none!important} </style>');
$done({ body });
