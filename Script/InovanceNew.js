/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://api.growingio.com/v2/a248467cf6a53819/web/action?stm=1702975023841`;
const method = `POST`;
const headers = {
'Sec-Fetch-Dest' : `empty`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Sec-Fetch-Site' : `cross-site`,
'Origin' : `https://zshc.inovance.com`,
'Cache-Control' : `max-age=0`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1`,
'Sec-Fetch-Mode' : `no-cors`,
'Referer' : `https://zshc.inovance.com/`,
'Host' : `api.growingio.com`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
'Accept' : `*/*`
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
