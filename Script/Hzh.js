/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://duhu.huazhu.com/static/fm.js?ver=0.1&t=467982`;
const method = `GET`;
const headers = {
'Accept' : `*/*`,
'Accept-Encoding' : `gzip, deflate, br`,
'Cookie' : `userToken=7077619e276e44ab995be0cd13daaaf6299269406; SK=7077619e276e44ab995be0cd13daaaf6299269406; install_id=7034071676727888142; ttreq=1$a4c9819b356a7e01bdee9f851bd5773f8afb0f03; _efmdata=migpAon3622ZzZgzt0Cmv%2FwO2A%2BStH4OGy466ebM4Xx3YFy320BcsVCW%2BweRDQo1yrl9eS%2FOWnKu0BAV3tVHeaotDz35pMXQj%2F5AnTJjHl0%3D; _exid=TYWFtUXFJGq5Vd8jk%2BKMaQXI6hyMDOQIPMNXcWMObU5m%2F7yk23l%2Fdj4QuPUfvo6C5uduS%2B72Sf6%2B7tsWtUwS6g%3D%3D; _hudPVID=34; _hudSID_TS=1683636572287; ec=Q6jM4UpH-1683250015603-d5b9aece0c1ee-1934755505; gr_user_id=d9df3b48-566b-42aa-8f62-2fba695556e6; _efmdata=migpAon3622ZzZgzt0Cmv/wO2A+StH4OGy466ebM4Xx3YFy320BcsVCW+weRDQo1yrl9eS/OWnKu0BAV3tVHeaotDz35pMXQj/5AnTJjHl0=; _exid=TYWFtUXFJGq5Vd8jk+KMaQXI6hyMDOQIPMNXcWMObU5m/7yk23l/dj4QuPUfvo6C5uduS+72Sf6+7tsWtUwS6g==; _fmdata=HywG19A7dH97YZJekxFNu5aMFqkgp0lRTvljXgdvJhGzLiI9BO3B9%2BDUWY9HGUPffIsQ25kjytAVHQB05YISsQ%3D%3D; _xid=opPtk5kCBVGdxSYL1pDOVcFqAyFw85uFyS454BiivDc%3D; c=Q6jM4UpH-1683250015603-d5b9aece0c1ee-1934755505; _hudSID=1683635975718_4; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2240067392%22%2C%22first_id%22%3A%22187ffaa48114f2-0e3347cf0fb6b18-3740740-304500-187ffaa4812a19%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%22187ffaa48114f2-0e3347cf0fb6b18-3740740-304500-187ffaa4812a19%22%7D; _ga=GA1.2.1168859464.1683249998; _hudVID=7c45f7be-09de-10b9-5055-cab85015bc2d`,
'Connection' : `keep-alive`,
'Sec-Fetch-Mode' : `no-cors`,
'Host' : `duhu.huazhu.com`,
'User-Agent' : `HUAZHU/ios/iPhone10,3/16.4/9.9.2/Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
'Sec-Fetch-Site' : `same-site`,
'Referer' : `https://campaign.huazhu.com/`,
'Sec-Fetch-Dest' : `script`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
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
