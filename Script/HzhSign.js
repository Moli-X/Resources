/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://hweb-mbf.huazhu.com/api/taskList?benefitCode=P&isRecommend=false&taskTypeList=%5B-1%2C0%2C4%5D&pageSize=10&pageIndex=1`;
const method = `GET`;
const headers = {
'Sec-Fetch-Dest' : `empty`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Client-Platform' : `APP-IOS`,
'Content-Type' : `application/x-www-form-urlencoded`,
'Sec-Fetch-Site' : `same-site`,
'Origin' : `https://campaign.huazhu.com`,
'User-Agent' : `HUAZHU/ios/iPhone10,3/16.4/9.9.2/Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
'Sec-Fetch-Mode' : `cors`,
'User-Token' : `null`,
'Host' : `hweb-mbf.huazhu.com`,
'Referer' : `https://campaign.huazhu.com/`,
'Cookie' : `_efmdata=migpAon3622ZzZgzt0Cmv%2FwO2A%2BStH4OGy466ebM4Xx3YFy320BcsVCW%2BweRDQo17RNvKeXtZ21TFHMiG4%2FZaW3euo5qFma5OP9YwyXOBM8%3D; _exid=ZiDLs9znyLQNt4i%2BmXOc4d9xjUbdfOuRlInoyOGcFwm123lDF%2BUk3ahb7JtYlBMHt5gK948GksZ0OGk5EyevcQ%3D%3D; CSRF-NWACT=890842cf-c038-49bf-983a-d8bbfea0a834; SK=7077619e276e44ab995be0cd13daaaf6299269406; ec=Q6jM4UpH-1683250015603-d5b9aece0c1ee-1934755505; gr_session_id_8f6e3e7f89d647cab9784afa81ea87bd_f5005133-4b50-424d-9ae0-0f9d854382af=true; _hudPVID=35; _hudSID=1684736731561_5; _hudSID_TS=1684736731561; _hudSource=; gr_session_id_8f6e3e7f89d647cab9784afa81ea87bd=f5005133-4b50-424d-9ae0-0f9d854382af; gr_user_id=d9df3b48-566b-42aa-8f62-2fba695556e6; userToken=7077619e276e44ab995be0cd13daaaf6299269406; install_id=7034071676727888142; ttreq=1$a4c9819b356a7e01bdee9f851bd5773f8afb0f03; _fmdata=HywG19A7dH97YZJekxFNu5aMFqkgp0lRTvljXgdvJhGzLiI9BO3B9%2BDUWY9HGUPffIsQ25kjytAVHQB05YISsQ%3D%3D; _xid=opPtk5kCBVGdxSYL1pDOVcFqAyFw85uFyS454BiivDc%3D; c=Q6jM4UpH-1683250015603-d5b9aece0c1ee-1934755505; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2240067392%22%2C%22first_id%22%3A%22187ffaa48114f2-0e3347cf0fb6b18-3740740-304500-187ffaa4812a19%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%22187ffaa48114f2-0e3347cf0fb6b18-3740740-304500-187ffaa4812a19%22%7D; _ga=GA1.2.1168859464.1683249998; _hudVID=7c45f7be-09de-10b9-5055-cab85015bc2d`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
'Accept' : `application/json, text/plain, */*`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
