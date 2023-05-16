/* 参考 */
/* https://raw.githubusercontent.com/fishingworld/something/main/PanelScripts/surgepro_reloadprofile.js */
/* https://raw.githubusercontent.com/smartmimi/conf/master/surge/functionstatus.js */

!(async () => {
/* 定义图标 */
let params = getParams($argument)
/* 时间获取 */
let traffic = (await httpAPI("/v1/traffic","GET"))
let dateNow = new Date()
let dateTime = Math.floor(traffic.startTime*1000)
let startTime = timeTransform(dateNow,dateTime)
/* MitM+Rewrite+Scripting状态获取 */
let mitm_status = (await httpAPI("/v1/features/mitm","GET"));
let rewrite_status = (await httpAPI("/v1/features/rewrite","GET"));
let scripting_status = (await httpAPI("/v1/features/scripting","GET"));

if ($trigger == "button") await httpAPI("/v1/profiles/reload");

  $done({
      title:"𝗦𝗨𝗥𝗚𝗘 𝗣𝗥𝗢",
      content:
	  `已持续运行: ${startTime}\n`+
	  `--------------\n`+
	  `MitM:`+icon_status(mitm_status.enabled)+`  Rewrite:`+icon_status(rewrite_status.enabled)+`  Scripting:`+icon_status(scripting_status.enabled),
		icon: params.icon,
		"icon-color":params.color
    });

})();

function timeTransform(dateNow,dateTime) {
let dateDiff = dateNow - dateTime;
let days = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
let hours=Math.floor(leave1/(3600*1000))//计算出小时数
//计算相差分钟数
let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
//计算相差秒数
let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
let seconds=Math.round(leave3/1000)

if(days==0){

	if(hours==0){
	if(minutes==0)return(`${seconds}秒`);
	return(`${minutes}分${seconds}秒`)
	}
	return(`${hours}时${minutes}分${seconds}秒`)
	}else {
	return(`${days}天${hours}时${minutes}分`)
	}

}

function icon_status(status){
  if (status){
    return "\u2611";
  } else {
      return "\u2612"
    }
}

function httpAPI(path = "", method = "POST", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
