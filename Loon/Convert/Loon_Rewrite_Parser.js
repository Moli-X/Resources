/****************************
支持将Loon重写解析至Loon Stash Surge Shadowrocket
说明
原脚本作者@小白脸 脚本修改@chengkongyiban
感谢@xream 提供的echo-response.js
原链接:https://raw.githubusercontent.com/chengkongyiban/stash/main/js/Loon_Rewrite_Parser.js
插件图标用的 @Keikinn 的 StickerOnScreen项目 以及 @Toperlock 的图标库项目，感谢
***************************/
const isStashiOS = 'undefined' !== typeof $environment && $environment['stash-version'];
const isSurgeiOS = 'undefined' !== typeof $environment && $environment['surge-version'];
const isShadowrocket = 'undefined' !== typeof $rocket;
const isLooniOS = 'undefined' != typeof $loon;
const iconStatus = $persistentStore.read("启用插件随机图标");
const iconReplace = $persistentStore.read("替换原始插件图标");
const iconLibrary = $persistentStore.read("插件随机图标合集") ?? "Pokemon";

var name = "";
var desc = "";
var req
var urlArg
if (isLooniOS || isSurgeiOS || isShadowrocket){
    req = $request.url.replace(/loon$|loon\?.*/,'');
    if ($request.url.indexOf("loon?") != -1){
        urlArg = "?" + $request.url.split("loon?")[1];
    }else{urlArg = ""};
    
}else if (isStashiOS){
    req = $request.url.replace(/loon\.stoverride$|loon\.stoverride\?.*/,'');
    if ($request.url.indexOf("loon.stoverride?") != -1){
        urlArg = "?" + $request.url.split("loon.stoverride?")[1];
    }else{urlArg = ""};
};
var original = [];//用于获取原文行号
var Pin0 = urlArg.search(/\?y=|&y=/) != -1 ? (urlArg.split(/\?y=|&y=/)[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var Pout0 = urlArg.search(/\?x=|&x=/) != -1 ? (urlArg.split(/\?x=|&x=/)[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var hnAdd = urlArg.search(/\?hnadd=|&hnadd=/) != -1 ? (urlArg.split(/\?hnadd=|&hnadd=/)[1].split("&")[0].replace(/%20/g,"").split(",")) : null;
var hnDel = urlArg.search(/\?hndel=|&hndel=/) != -1 ? (urlArg.split(/\?hndel=|&hndel=/)[1].split("&")[0].replace(/%20/g,"").split(",")) : null;
var delNoteSc = urlArg.indexOf("del=") != -1 ? true : false;

if (iconStatus == "禁用"){
    icon = "";
}else{
	const stickerStartNum = 1001;
const stickerSum = 100;
let randomStickerNum = parseInt(stickerStartNum + Math.random() * stickerSum).toString();
   icon = "#!icon=" + "https://github.com/Moli-X/Resources/raw/main/Icon/" + iconLibrary + "/" + iconLibrary + "-" + randomStickerNum + ".png";
};
const pluginIcon = icon;
console.log(pluginIcon);

!(async () => {
  let body = await http(req);
//判断是否断网
if(body == null){if(isStashiOS){
    console.log("Loon转换：未获取到body的链接为" + $request.url)
	$notification.post("Loon转换：未获取到body","请检查网络及节点是否畅通\n" + "源链接为" + $request.url,"认为是bug?点击通知反馈",{url:"https://t.me/zhangpeifu"})
 $done({ response: { status: 404 ,body:{} } });}else{
    console.log("Loon转换：未获取到body的链接为" + $request.url)
    $notification.post("Loon转换：未获取到body","请检查网络及节点是否畅通\n" + "源链接为" + $request.url,"认为是bug?点击通知反馈","https://t.me/zhangpeifu")
 $done({ response: { status: 404 ,body:{} } });
}//识别客户端通知
}else{//以下开始重写及脚本转换

original = body.replace(/^ *(#|;|\/\/)/g,'#').replace(/ _ reject/g,' - reject').replace(/(^[^#].+)\x20+\/\/.+/g,"$1").split(/(\r\n)/);

if (body.match(/\/\*+\n[\s\S]*\n\*+\/\n/)){
body = body.replace(/[\s\S]*(\/\*+\n[\s\S]*\n\*+\/\n)[\s\S]*/,"$1").match(/[^\r\n]+/g);
}else{
    body = body.match(/[^\r\n]+/g);};

let pluginDesc = [];
let httpFrame = "";
let General = [];
let rules = [];
let script = [];
let URLRewrite = [];
let HeaderRewrite = [];
let MapLocal = [];
let cron = [];
let providers = [];
let MITM = "";
let others = [];          //不支持的内容

body.forEach((x, y, z) => {
	x = x.replace(/^ *(#|;|\/\/)/,'#').replace(/ (_|-) reject/i,' - reject').replace(' reject',' - reject').replace(' - - reject',' - reject').replace(/(^[^#].+)\x20+\/\/.+/,"$1").replace(/(hostname|force-http-engine-hosts|skip-proxy|always-real-ip)\x20*=/,'$1=').replace(/ *, *enabled *= *false/,"");
//去掉注释
if(Pin0 != null)	{
	for (let i=0; i < Pin0.length; i++) {
  const elem = Pin0[i];
	if (x.indexOf(elem) != -1){
		x = x.replace(/^#/,"")
	}else{};
};//循环结束
}else{};//去掉注释结束

//增加注释
if(Pout0 != null){
	for (let i=0; i < Pout0.length; i++) {
  const elem = Pout0[i];
	if (x.indexOf(elem) != -1 && x.search(/^(hostname|force-http-engine-hosts|skip-proxy|always-real-ip)=/) == -1){
		x = x.replace(/(.+)/,"#$1")
	}else{};
};//循环结束
}else{};//增加注释结束

//添加主机名
if (hnAdd != null){
	if (x.search(/^hostname=/) != -1){
		x = x.replace(/\x20/g,"").replace(/(.+)/,`$1,${hnAdd}`).replace(/,{2,}/g,",");
	}else{};
}else{};//添加主机名结束

//删除主机名
if (hnDel != null && x.search(/^hostname=/) != -1){
    x = x.replace(/\x20/g,"").replace(/^hostname=/,"").replace(/%.*%/,"").replace(/,{2,}/g,",").split(",");
	for (let i=0; i < hnDel.length; i++) {
  const elem = hnDel[i];
if (x.indexOf(elem) != -1){
  let hnInNum = x.indexOf(elem);
  delete x[hnInNum];
}else{};
  };//循环结束
x = "hostname=" + x;
}else{};//删除主机名结束

if (delNoteSc === true && x.match(/^#/) && x.indexOf("#!") == -1){
		x = x.replace(/(.+)/g,'')
};

	let type = x.match(
		/http-re|\x20header-|cron |\x20-\x20reject|^hostname|^#!|^force-http-engine-hosts|^skip-proxy|^real-ip|\x20(302|307|header)($|\x20)|^#?(URL-REGEX|USER-AGENT|IP-CIDR|GEOIP|IP-ASN|DOMAIN)/
	)?.[0];
//判断注释
if (isLooniOS || isSurgeiOS || isShadowrocket){
	
	if (x.match(/^[^#]/)){
	var noteK = "";
	}else{
	var noteK = "#";
	};
}else if (isStashiOS){
	if (x.match(/^[^#]/)){
	var noteKn8 = "\n        ";
	var noteKn6 = "\n      ";
	var noteKn4 = "\n    ";
	var noteK4 = "    ";
	var noteK2 = "  ";
	}else{
	var noteKn8 = "\n#        ";
	var noteKn6 = "\n#      ";
	var noteKn4 = "\n#    ";
	var noteK4 = "#    ";
	var noteK2 = "#  ";
	};
};//判断注释结束
	
	if (type) {
		switch (type) {
			case "#!":
            if (isStashiOS){
                x = x.replace(/#![^nd].+/,"").replace(/#!/,"").replace(/(name|desc) *= *(.+)/,'$1: "$2"');
                pluginDesc.push(x);
            }else if (isLooniOS && iconReplace == "启用"){
            pluginDesc.push(x.replace(
                /^#! *icon *= *.*/,pluginIcon));
            }else{
            pluginDesc.push(x);
            };
            
            break;
            
			case "http-re":		

				if (x.match(/http-(response|request)\x20/)){
//脚本
				let ptn = x.replace(/\x20{2,}/g," ").split(" ")[1].replace(/"/gi,'');

				if (isSurgeiOS){
					ptn = ptn.replace(/(.+,.+)/,'"$1"');};
					
				let js = x.replace(/\x20/gi,"").split("script-path=")[1].split(",")[0];
					
				let sctype = x.match('http-response') ? 'response' : 'request';
					
				let scname = js.substring(js.lastIndexOf('/') + 1, js.lastIndexOf('.') );
					
				let arg = [];
				
			if (isSurgeiOS ||isShadowrocket){
					if (x.match(/,\x20*argument\x20*=.+/)){
						if (x.match(/,\x20*argument\x20*=\x20*"+.*?,.*?"+/)
	){
				arg = ', argument=' + x.match(/,\x20*argument\x20*=\x20*("+.*?,.*?"+)/)[1];
	}else{
				arg = ", argument=" +  x.replace(/,\x20*argument\x20*=/gi,",argument=").split(",argument=")[1].split(",")[0];}
				}else{};

				}else if (isStashiOS){
					if (x.match(/,\x20*argument\x20*=.+/)){
						if (x.match(/,\x20*argument\x20*=\x20*"+.*?,.*?"+/)
	){
				arg = x.match(/,\x20*argument\x20*=\x20*("+.*?,.*?"+)/)[1];
				
				if (arg.match(/^".+"$/)){
				arg = `${noteKn6}argument: |-${noteKn8}` + arg.replace(/^"(.+)"$/,'$1');};
	}else{
				arg = `${noteKn6}argument: |-${noteKn8}` + x.replace(/,\x20*argument\x20*=/gi,",argument=").split(",argument=")[1].split(",")[0];}
				
				}else{};

				};
                
				if (isLooniOS){
				
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);

				script.push(x);

				}else if (isSurgeiOS || isShadowrocket){
				
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);

				let proto = x.replace(/\x20/gi,'').match('binary-body-mode=(true|1)') ? ', binary-body-mode=true' : '';
				
				let rebody = x.replace(/\x20/gi,'').match('requires-body=(true|1)') ? ', requires-body=true' : '';
				
				let size = x.replace(/\x20/g,'').match('requires-body=(true|1)') ? ', max-size=3145728' : '';

				script.push(
					`${noteK}${scname}_${y} = type=http-${sctype}, pattern=${ptn}, script-path=${js}${rebody}${size}${proto}, timeout=30${arg}`);

				}else if (isStashiOS){

				let proto = x.replace(/\x20/g,'').match('binary-body-mode=(true|1)') ? 'binary-mode: true' : '';

				let rebody = x.replace(/\x20/g,'').match('requires-body=(true|1)') ? 'require-body: true' : '';
				
				let size = x.replace(/\x20/g,'').match('requires-body=(true|1)') ? 'max-size: 3145728' : '';

				script.push(
					`${noteKn4}- match: ${ptn}${noteKn6}name: ${scname}_${y}${noteKn6}type: ${sctype}${noteKn6}timeout: 30${noteKn6}${rebody}${noteKn6}${size}${arg}${noteKn6}${proto}`
			);
			providers.push(
					`${noteK2}${scname}_${y}:${noteKn4}url: ${js}${noteKn4}interval: 86400`
			);
				};

				}else{
let lineNum = (original.indexOf(x) + 2)/2;
others.push(lineNum + "行" + x)};//整个http-re结束
				
				break;
				
//HeaderRewrite				
			case " header-":
					
					if (isLooniOS){
				z[y - 1]?.match(/^#/) &&  URLRewrite.push(z[y - 1]);
			URLRewrite.push(x)
					
					}else if (isStashiOS){

				z[y - 1]?.match(/^#/) &&  HeaderRewrite.push("    " + z[y - 1]);
				
				HeaderRewrite.push(`${noteK4}- ` + x.replace(/\x20header-/,`\x20request-`).replace(/^#/,""))
					}else if (isSurgeiOS){

				z[y - 1]?.match(/^#/) &&  HeaderRewrite.push(z[y - 1]);
				
				HeaderRewrite.push(`${noteK}http-request ` + x.replace(/^#/,""))
					}else if (isShadowrocket){
                        let lineNum = (original.indexOf(x) + 2)/2;
others.push(lineNum + "行" + x)
                    };//HeaderRewrite结束
				
				break;

//定时任务
			case "cron ":

            let cronExp = x.split('"')[1];
            
				let croName = x.replace(/\x20/g,"").split("tag=")[1].split(",")[0];
				
				let cronJs = x.replace(/\x20/gi,"").split("script-path=")[1].split(",")[0];
                
				if (isLooniOS){
				
				script.push(x);
                
                }else if (isStashiOS){
				
				cronExp = cronExp.replace(/[^\s]+ ([^\s]+ [^\s]+ [^\s]+ [^\s]+ [^\s]+)/,'$1');
				
				cron.push(
						`${noteKn4}- name: ${croName}${noteKn6}cron: "${cronExp}"${noteKn6}timeout: 60`
				);
				providers.push(
						`${noteK2}${croName}:${noteKn4}url: ${cronJs}${noteKn4}interval: 86400`
				);
                    
                }else if (isSurgeiOS || isShadowrocket){
                    script.push(
                        `${noteK}${croName} = type=cron, cronexp="${cronExp}", script-path=${cronJs}, timeout=60`
                        )
                };
				break;

//REJECT

			case " - reject":
            
            let rejectType = x.split(" - ")[1].toLowerCase().replace(/video/,"img");
            
            if (isLooniOS){
                
				z[y - 1]?.match(/^#/) && URLRewrite.push(z[y - 1]);
                
				URLRewrite.push(x);
                
            }else if (isStashiOS){
                
				z[y - 1]?.match(/^#/) && URLRewrite.push("    " + z[y - 1]);
				
				URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.+?)\x20-\x20reject.*/, `${noteKn4}- $2 - ${rejectType}`));
                
            }else if (isShadowrocket){
                
				z[y - 1]?.match(/^#/) && URLRewrite.push(z[y - 1]);
				
				URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.+?)\x20-\x20reject.*/, `${noteK}$2 - ${rejectType}`));
                
            }else if (isSurgeiOS){
                
                if (rejectType.match("-")){
//reject-                    
                
				z[y - 1]?.match(/^#/) && MapLocal.push(z[y - 1]);
                    
				if (rejectType.match(/dict$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-dict.json"
				}else if (rejectType.match(/array$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-array.json"
				}else if (rejectType.match(/200$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-200.txt"
				}else if (rejectType.match(/img$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-img.gif"
				};
                MapLocal.push(x.replace(/(^#)?(.+?)\x20-\x20reject.*/,`$2 data="${rejectType}"`));
                    
                }else{//reject
                
				z[y - 1]?.match(/^#/) && URLRewrite.push(z[y - 1]);
				
				URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.+?)\x20-\x20reject$/, `${noteK}$2 - reject`));
                    
                }
                
            };
				break;
				
//hostname				
			case "hostname":
            
            if (isLooniOS){
                MITM = "[MITM]\n\n" + x.replace(/ *= */," = ").replace(/= ,+/,"= ");
            }else if (isSurgeiOS || isShadowrocket){
                MITM = x.replace(/%.*%/g,"").replace(/\x20/g,"").replace(/,{2,}/g,",").replace(/,*\x20*$/,"").replace(/hostname=(.*)/, `[MITM]\n\nhostname = %APPEND% $1`).replace(/%\x20,+/,"% ");
            }else if (isStashiOS){
                MITM = x.replace(/%.*%/g,"").replace(/\x20/g,"").replace(/,{2,}/g,",").replace(/,*\x20*$/,"").replace(/hostname=(.*)/, `t&2;mitm:\nt&hn;"$1"`).replace(/",+/,'"');
            };
				break;

//general          

            case "force-http-engine-hosts":
            
            if (isLooniOS){
                General.push(x);
            }else if(isSurgeiOS || isShadowrocket){
                General.push(x.replace(/\x20/g,"").replace(/=/," = %APPEND% "))
            }else if (isStashiOS){
                General.push(x.replace(/%.*%/g,"").replace(/\x20/g,"").replace(/,{2,}/g,",").replace(/,*\x20*$/,"").replace(/force-http-engine-hosts=(.*)/, `t&2;force-http-engine:\nt&hn;"$1"`).replace(/",+/,'"'))
            };
				break;
                                
            case "skip-proxy":
            
            if (isLooniOS){
                General.push(x.replace(/%.*%/g,"").replace(/ *= */," = "));
            }else if(isSurgeiOS || isShadowrocket){
                General.push(x.replace(/\x20/g,"").replace(/=/," = %APPEND% "))
            }else if (isStashiOS){};
				break;
           
            case "real-ip":
            
            if (isLooniOS){
                General.push(x.replace(/%.*%/g,"").replace(/ *= */," = "));
            }else if(isSurgeiOS || isShadowrocket){
                General.push(x.replace(/\x20/g,"").replace(/=/," = %APPEND% "));
            }else if (isStashiOS){
                General.push(x.replace(/%.*%/g,"").replace(/\x20/g,"").replace(/,{2,}/g,",").replace(/,*\x20*$/,"").replace(/always-real-ip=(.*)/, `t&2;fake-ip-filter:\nt&hn;"$1"`).replace(/",+/,'"'))
            };
				break;

			default:
//重定向
				if (type.match(/ 302|307|header/)){
                    let rewType = x.match(/302|307|header/);
                    if (isLooniOS){
                        z[y - 1]?.match(/^#/)  && URLRewrite.push(z[y - 1]);
				
					URLRewrite.push(x);
                    
                    }else if (isStashiOS){
                        
                      z[y - 1]?.match(/^#/)  && URLRewrite.push("    " + z[y - 1]);
				
					URLRewrite.push(`${noteKn4}- ` + x.replace(/^#/,"").replace(/ (302|307|header) */," ").replace(/(.+)/,`$1 ${rewType}`).replace(/\x20{2,}/g," "));
                    }else if(isSurgeiOS || isShadowrocket){
                      z[y - 1]?.match(/^#/)  && URLRewrite.push(z[y - 1]);
				
					URLRewrite.push(x.replace(/ (302|307|header) */," ").replace(/(.+)/,`$1 ${rewType}`).replace(/\x20{2,}/g," "));
                        
                    };
				
				}else{
                    
                    if (isLooniOS){
                    z[y - 1]?.match(/^#/)  && rules.push(z[y - 1]);
					rules.push(x);
                    
                    }else if (isSurgeiOS || isShadowrocket){
                    if (x.match(/^#?(DOM|USER|URL|IP|GEO)[^,]+,[^,]+$/i) || x.match(/proxy$/i)){
	x = "";}else{rules.push(x.replace(/, *REJECT.*/i,",REJECT"));};
                        
                    }else if(isStashiOS){
                        
                        if (type.match(/URL-REGEX/i) && x.match(/,\x20*REJECT/i)){
                
                    z[y - 1]?.match(/^#/) && URLRewrite.push("    " + z[y - 1]);
                x = x.replace(/\x20/,"");
                
				let Urx2Reject
                
                if (x.match(/DICT$/i)){
                    Urx2Reject = '-dict';
                }else if (x.match(/ARRAY$/i)){
                    Urx2Reject = '-array';
                }else if (x.match(/DROP$/i)){
                    Urx2Reject = '-200';
                }else if (x.match(/IMG$|VIDEO$/i)){
                    Urx2Reject = '-img';
                }else if (x.match(/REJECT$/i)){
                    Urx2Reject = '';
                };
				
				URLRewrite.push(
					x.replace(/.*URL-REGEX,([^\s]+),[^,]+/,
					`${noteKn4}- $1 - reject${Urx2Reject}`)
				);       
                        }else if (x.match(/^#?(DOM|USER|URL|IP|GEO)[^,]+,[^,]+$/i) || x.match(/proxy$/i)){ x = "";}else if(type.match(/^#?(USER-AGENT|IP-CIDR|GEOIP|IP-ASN|DOMAIN)/)){
                            z[y - 1]?.match(/^#/)  && rules.push("    " + z[y - 1]);
					
					rules.push(x.replace(/\x20/g,"").replace(/.*DOMAIN-SET.+/,"").replace(/,REJECT.+/,",REJECT").replace(/^#?(.+)/,`${noteK2}- $1`))    
                        }else{
let lineNum = (original.indexOf(x) + 2)/2;
others.push(lineNum + "行" + x)};
                    }//Stash rules处理完毕
                }//rules处理完毕
		} //switch结束
	}
}); //循环结束

if (isLooniOS){
    pluginDesc = (pluginDesc[0] || '') && `${pluginDesc.join("\n")}`;
    
    General = (General[0] || '') && `[General]\n\n${General.join("\n\n")}`;
    
    script = (script[0] || '') && `[Script]\n\n${script.join("\n\n")}`;

URLRewrite = (URLRewrite[0] || '') && `[Rewrite]\n\n${URLRewrite.join("\n")}`;

//URLRewrite = URLRewrite.replace(/"/gi,'')

rules = (rules[0] || '') && `[Rule]\n\n${rules.join("\n")}`;

others = (others[0] || '') && `${others.join("\n")}`;

body = `${pluginDesc}


${General}


${rules}


${URLRewrite}


${script}


${MITM}`
		.replace(/t&zd;/g,',')
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
}else if (isStashiOS){
    pluginDesc = (pluginDesc[0] || '') && `${pluginDesc.join("\n")}`;
    
    General = (General[0] || '') && `${General.join("\n")}`;
    
    rules = (rules[0] || '') && `rules:\n${rules.join("\n")}`;

script = (script[0] || '') && `  script:\n${script.join("\n\n")}`;

providers = (providers[0] || '') && `script-providers:\n${providers.join("\n")}`;

cron = (cron[0] || '') && `cron:\n  script:\n${cron.join("\n")}`;

URLRewrite = (URLRewrite[0] || '') && `  rewrite:\n${URLRewrite.join("\n")}`;

URLRewrite = URLRewrite.replace(/"/gi,'')

HeaderRewrite = (HeaderRewrite[0] || '') && `  header-rewrite:\n${HeaderRewrite.join("\n")}`;

HeaderRewrite = HeaderRewrite.replace(/"/gi,'')

others = (others[0] || '') && `${others.join("\n")}`;

General = General.replace(/t&2;/g,'  ')
           .replace(/t&hn;/g,'    - ')
           .replace(/\,/g,'"\n    - "')

MITM = MITM.replace(/t&2;/g,'  ')
           .replace(/t&hn;/g,'    - ')
           .replace(/\,/g,'"\n    - "')

    if (URLRewrite != "" || script != "" || HeaderRewrite != "" || MITM != "" || General != ""){
httpFrame = `http:
${General}

${HeaderRewrite}

${URLRewrite}

${script}

${MITM}`
};



body = `${pluginDesc}

${rules}

${httpFrame}

${cron}

${providers}`
		.replace(/t&zd;/g,',')
		.replace(/script-providers:\n+$/g,'')
		.replace(/#      \n/gi,'\n')
		.replace(/      \n/g,"")
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
        
}else if (isSurgeiOS || isShadowrocket){
    pluginDesc = (pluginDesc[0] || '') && `${pluginDesc.join("\n")}`;
    
    General = (General[0] || '') && `[General]\n\n${General.join("\n\n")}`;
    
    rules = (rules[0] || '') && `[Rule]\n\n${rules.join("\n")}`;
    
	script = (script[0] || '') && `[Script]\n\n${script.join("\n\n")}`;
	
	HeaderRewrite = (HeaderRewrite[0] || '') && `[Header Rewrite]\n\n${HeaderRewrite.join("\n")}`;
	
	URLRewrite = (URLRewrite[0] || '') && `[URL Rewrite]\n\n${URLRewrite.join("\n")}`;
	
	MapLocal = (MapLocal[0] || '') && `[Map Local]\n\n${MapLocal.join("\n\n")}`;
	
	others = (others[0] || '') && `${others.join("\n\n")}`;

body = `${pluginDesc}


${General}


${rules}


${HeaderRewrite}


${URLRewrite}


${script}


${MapLocal}


${MITM}`
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
}


if (isStashiOS || isSurgeiOS) {
           others !="" && $notification.post("不支持的类型已跳过","第" + others,"点击查看原文，长按可展开查看跳过行",{url:req});
        } else if (isLooniOS || isShadowrocket) {
       others !="" && $notification.post("不支持的类型已跳过","第" + others,"点击查看原文，长按可展开查看跳过行",req);};

 $done({ response: { status: 200 ,body:body ,headers: {'Content-Type': 'text/plain; charset=utf-8'} } });
}//判断是否断网的反括号


})()
.catch((e) => {
		$notification.post(`${e}`,'','');
		$done()
	})


function http(req) {
  return new Promise((resolve, reject) =>
    $httpClient.get(req, (err, resp,data) => {
  resolve(data)
  })
)
}
