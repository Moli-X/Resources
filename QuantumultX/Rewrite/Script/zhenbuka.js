/* 公众号墨鱼手记 crated by ddgksf2013 on 2023-062-17 */

var body = $response.body.replace(/<head>/, '<head><style>img#hth,img#hth616,div[style*="line-height: 21px"],div#layui-layer1,div#layui-layer-shade1,div.marquee_outer,img#ad_img,img#buka888,iframe[id^=buffer],span.more.text-muted.pull-right,ul.more-btn,a[target^="_blank"],div.jq-toast-wrap,img#tj,img[src*=".gif"]{display:none!important} </style>')
                         .replace(/'159140'/g, "'259140'")
                         .replace(/\<div  class=\"item stui-banner__item[\s\S]*html[\s\S]*?\<\/div\>/g, "")
                         .replace(/img id="ik\d+"/g, 'img id="ddgksf2013"');
$done({ body });
