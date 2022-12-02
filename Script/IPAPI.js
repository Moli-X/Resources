/*
原链接：https://raw.githubusercontent.com/Orz-3/Orz-3/master/QuantumultX/IP.js
其他：#======================================
# geo_location_checker=http://ip-api.com/json/?lang=zh-CN, https://raw.githubusercontent.com/limbopro/QuantumultX/master/Scripts/IP_API.js
# geo_location_checker=http://ip-api.com/json/?lang=zh-CN, https://raw.githubusercontent.com/CenBoMin/QuantumultX/master/IP.js
# geo_location_checker=http://ip-api.com/json/?lang=zh-CN,https://raw.githubusercontent.com/I-am-R-E/Functional-Store-Hub/Master/GeoLocationChecker/QuantumultX/IP-API.js
# geo_location_checker=http://ip-api.com/json/?lang=zh-CN, https://raw.githubusercontent.com/Orz-3/Orz-3/master/QuantumultX/IP.js
#======================================
*/




if ($response.statusCode != 200) {
  $done(Null);
}

var body = $response.body;
var obj = JSON.parse(body);
var title = obj['country'];
var subtitle = obj['city'] + ' ' + obj['isp'];
var ip = obj['query'];
var description = "国家" + ":" + obj['country'] + '\n' + "城市" + ":" + obj['city'] + '\n' + "运营商" + ":" + obj['isp'] + '\n' + "数据中心" + ":" + obj['org'];


$done({title, subtitle, ip, description});
