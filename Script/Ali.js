
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://api.aliyundrive.com/adrive/v1/user_config/get`;
const method = `POST`;
const headers = {
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'x-signature' : `93725b4c7b898d42140e5896807749746ceacbd264e0671c3ba9ad3ae19e67a520e047cf4d8ace3540297808f432e1a7310483193aad8bb2abd86de66acbdb4a01`,
'x-umt' : `58YB2PZLPC8C8RKHR1u9Yzg4XNwg8r0D`,
'x-sign' : `izK9q4002xAALzhoKIxEhVovEEviDzhvNxZLOQKm/S+MJyh8OZuLolczyUdf3zDtxk6jTCSujqsrPfwDaF58KOpY6s8oLzhvOC84bz`,
'Content-Type' : `application/json; charset=UTF-8`,
'X-Canary' : `client=iOS,app=adrive,version=v4.3.0`,
'x-sgext' : `JAfG8EdZqaJlZp58Pmb+p/DzwPfT88DwwvbT98bw0+XB8Mj2xfTJ8sf30/bA9sb2wPbA9sD2wPbA9sDlwOXA5cD20/bA9sDlwOXA5cDlwOXA5cDlwOXA5cD2wPbA`,
'User-Agent' : `AliApp(AYSD/4.3.0) com.alicloud.smartdrive/4.3.0 Version/16.3 Channel/201200 Language/zh-Hans-US /iOS Mobile/iPhone10,3`,
'Authorization' : `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZmMwMWI2OTI4ZjE0YmY4YjAwZWFlM2IxNzgxOGNjNiIsImN1c3RvbUpzb24iOiJ7XCJjbGllbnRJZFwiOlwicEpaSW5OSE4yZFpXazhxZ1wiLFwiZG9tYWluSWRcIjpcImJqMjlcIixcInNjb3BlXCI6W1wiRFJJVkUuQUxMXCIsXCJGSUxFLkFMTFwiLFwiVklFVy5BTExcIixcIlNIQVJFLkFMTFwiLFwiU1RPUkFHRS5BTExcIixcIlNUT1JBR0VGSUxFLkxJU1RcIixcIlVTRVIuQUxMXCIsXCJCQVRDSFwiLFwiQUNDT1VOVC5BTExcIixcIklNQUdFLkFMTFwiLFwiSU5WSVRFLkFMTFwiLFwiU1lOQ01BUFBJTkcuTElTVFwiXSxcInJvbGVcIjpcInVzZXJcIixcInJlZlwiOlwiXCIsXCJkZXZpY2VfaWRcIjpcIjg4ZjQ0ZmZlOTU3YTRmZGQ4ZWJhN2VjMGZjMTkyMzEzXCJ9IiwiZXhwIjoxNjgwNTM2Njc5LCJpYXQiOjE2ODA1Mjk0MTl9.GPtSzIYP63wG_WX_wIFWrbsnks9Mnd5l7a7VOKzKhLf-62wMoLJqgv2QMw_Oay-YmNgXwD-ktouyz5kINvXcKw7LPZlDErD89ub5QepZ4b1_mgl0iLDkEt8_vuafPMYLJBMHtDr9LOHeoLLU8vLasXmOx7Z4sg4PfkNMPq6UjXw`,
'x-mini-wua' : `idQR9jBv90dP6thDe6BmP0ps+a/otrKxQxh6TgOAp+MinixiPzFK+ej6nNMyP6F60conrCz9+vwdBdR4A/CF35xB4H6SfKcWX+L2rKHNqbKt8lrMeehRTZTYPEgU6drS2KZJ+wMOihoCH8bIAAY2lawhXHQStlkUHtVcAMOc2wT1Dbg==`,
'Cookie' : `isg=BFhY9xi5iBEWz6OK2g_-U-LeI4LqQbzLgXV2JZJJsRNOLe0XOlC3WswfY-MdJnSj; _nk_=t-2212513637759-52; _tb_token_=e59ae7b7380ee; cookie2=1f3f399d91e15d738c3f458037fcf0b6; csg=fb0f2d6f; munb=2212513637759; t=947458db76dac44c6a77dd8d29f7bcb7; l=AoaGatl6q/eEuwETdJ1BrCyp1mcI5Mqh; cna=N4a8G7lWAnsCAXWIQ9BWOjdE`,
'Host' : `api.aliyundrive.com`,
'x-device-id' : `f01d40a8c3aa6d598449acc68512599c661938e5d85df8cc45314608b56d37ef`,
'Referer' : `https://aliyundrive.com/`,
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
