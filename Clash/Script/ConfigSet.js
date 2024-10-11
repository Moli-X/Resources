/************** 参考 Verge Rev 示例 Script 配置***************************************
 * 链  接 :https://github.com/Moli-X/Resources/edit/main/Clash/Script/ConfigSet.js  
 * 原链接:https://github.com/Repcz/Tool/raw/X/Clash/Meta/Override.js                 
 * Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
 * 最后更新时间: 2024-10-10 
 **********************************************************************************/


//规则集通用配置设置 
const ruleProviderText = { "type": "http", "format": "text", "behavior": "classical", "interval": 86400 };
const ruleProviderYaml = { "type": "http", "format": "yaml", "behavior": "classical", "interval": 86400 };
// 策略组通用配置
const groupBaseOption  = { "interval": 300, "url": "http://connectivitycheck.gstatic.com/generate_204", "max-failed-times": 3, "type": "select" };
const groupBaseArea    = { "interval": 300, "url": "http://connectivitycheck.gstatic.com/generate_204", "max-failed-times": 3, "type": "url-test", "lazy": true, "interval": 300, "tolerance": 0, "hidden": false, "include-all": true };

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0; 
  const proxyProviderCount = typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0; 
  if (proxyCount === 0 && proxyProviderCount === 0) { throw new Error("配置文件中未找到任何代理"); }

// 覆盖通用配置
  config["mixed-port"]               = "7890";
  config["tcp-concurrent"]           = true;
  config["allow-lan"]                = true;
  config["ipv6"]                     = false;
  config["log-level"]                = "info";
  config["unified-delay"]            = "true";
  config["find-process-mode"]        = "strict";
  config["global-client-fingerprint"] = "chrome";
  config["external-controller"]      = "127.0.0.1:9090";
  config["external-ui"]              = "ui";
  config["external-ui-url"]          = "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip";

// 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com"],
    "default-nameserver": ["system"],
    "nameserver": ["223.5.5.5", "119.29.29.29", "180.184.1.1"],
    "nameserver-policy": {
      "geosite:cn": "system",
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]  } };

// 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    "asn": "https://mirror.ghproxy.com/https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"  };

// 覆盖 sniffer 配置
  config["sniffer"] = { 
	  "enable": true, "parse-pure-ip": true, 
      "sniff": { "TLS": { "ports": ["443", "8443"] }, 
      "HTTP": { "ports": ["80", "8080-8880"], "override-destination": true }, 
      "QUIC": { "ports": ["443", "8443"] } } };

// 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]  };

// 覆盖策略组
  config["proxy-groups"] = [
    { ...groupBaseArea  , "name": "全球节点",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png " ,         "exclude-filter": "群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|访问|加入|(\b(USE|Panel|Channel|Author)\b)"  },
    { ...groupBaseOption, "name": "海外服务",  "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png",  "proxies": ["全球节点", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"]                                  },
    { ...groupBaseOption, "name": "微软服务",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png" ,       "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "DIRECT"]                        },
    { ...groupBaseOption, "name": "谷歌服务",  "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png", "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"]                                  },
    { ...groupBaseOption, "name": "电报消息",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram_X.png" ,      "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"]                                  },
    { ...groupBaseOption, "name": "人工智能",  "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png" ,                 "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"]                                  },
    { ...groupBaseOption, "name": "中达监控",  "icon": "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Icon/Image/TrendMicro.png",           "proxies": ["REJECT", "DIRECT", "PASS"]                                                                     },
    { ...groupBaseArea  , "name": "香港节点",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png",        "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)"                                                                      },
    { ...groupBaseArea  , "name": "美国节点",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png",    "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)"                                                  },
    { ...groupBaseArea  , "name": "狮城节点",  "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png",     "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",                                                            },
    { ...groupBaseArea  , "name": "日本节点",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png" ,           "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",                                                                 },
    { ...groupBaseArea  , "name": "台湾节点",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png",           "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)"                                                              },
    { ...groupBaseOption, "name": "全国直连",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png" ,          "proxies": ["DIRECT", "PASS"]                                                                                },
    { ...groupBaseOption, "name": "广告拦截",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Reject.png" ,          "proxies": ["REJECT", "DIRECT", "PASS"]                                                                      },
    { ...groupBaseOption, "name": "兜底分流",  "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png" ,           "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "DIRECT", "PASS"]                 }
  ];

// 覆盖规则集
  config["rule-providers"] = {
	  "Taida":          { ...ruleProviderYaml, "url": "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Taida.yaml" ,       "path": "./Ruleset/Taida.yaml" },
	  "Trendmicro":     { ...ruleProviderYaml, "url": "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Trendmicro.yaml",   "path": "./Ruleset/Trendmicro.yaml" },
	  "Google":         { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/Google.list",                     "path": "./Ruleset/Google.list" },
	  "YouTube":        { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/YouTube.list",                    "path": "./Ruleset/YouTube.list" },
	  "Telegram":       { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/Telegram.list",                   "path": "./Ruleset/Telegram.list" },
	  "Steam":          { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/Steam.list",                      "path": "./Ruleset/Steam.list" },
	  "AI":             { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/AI.list",                         "path": "./Ruleset/AI.list" },
	  "Spotify":        { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/Spotify.list",                    "path": "./Ruleset/Spotify.list" },
	  "PrimeVideo":     { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/PrimeVideo.list",                 "path": "./Ruleset/PrimeVideo.list" },
	  "OneDrive":       { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/OneDrive.list",                   "path": "./Ruleset/OneDrive.list" },
	  "Github":         { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/Github.list",                     "path": "./Ruleset/Github.list" },
	  "Microsoft":      { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/Microsoft.list",                  "path": "./Ruleset/Microsoft.list" },
	  "Lan":            { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/Lan.list",                        "path": "./Ruleset/Lan.list" },
	  "ProxyGFW":       { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/ProxyGFW.list",                   "path": "./Ruleset/ProxyGFW.list" },
	  "China":          { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/ChinaDomain.list",                "path": "./Ruleset/China.list" }
  };

// 覆盖规则
  config["rules"] = [
    //公司分流
    "RULE-SET,Taida,全国直连",
    "PROCESS-NAME,Security Agent,中达监控",
    "RULE-SET,Trendmicro,中达监控",
    "PROCESS-NAME,PccNTMon.exe,中达监控",
    //软件分流
    "PROCESS-NAME,alisthelper.exe,海外服务",
    "PROCESS-NAME,lync.exe,全国直连",
    "PROCESS-NAME,Excel.exe,全国直连",
    "PROCESS-NAME,Winword.exe,全国直连",
    "PROCESS-NAME,DIAInstaller.exe,全国直连",
    "PROCESS-NAME,Update.exe,全国直连",
    "PROCESS-NAME,Microsoft Teams,全国直连",
    //小分流
    "RULE-SET,AI,人工智能",
    "RULE-SET,YouTube,谷歌服务",
    "RULE-SET,Google,谷歌服务",
    "RULE-SET,Telegram,电报消息",
    "RULE-SET,Spotify,海外服务",
    "RULE-SET,PrimeVideo,海外服务",
    "GEOSITE,onedrive,微软服务",
    "GEOSITE,github,香港节点",
    "GEOSITE,microsoft,微软服务",
    "GEOSITE,gfw,海外服务",
    "RULE-SET,China,全国直连",
    "GEOIP,lan,全国直连",
    "GEOIP,CN,全国直连",
    "MATCH,兜底分流"
  ];

// 返回修改后的配置
  return config;
}

//防止dns泄露
function DNSLeaksMain(settings) {
  // 填充rule-provider
  if (!settings['rule-providers']) {
    settings['rule-providers'] = {};
  }
  const newProvider = {
    type: "http",
    interval: 86400,
    behavior: "domain",
    format: "text",
    url: "https://github.com/Moli-X/Resources/raw/main/Filter/DNSLeaks.list"
  };
  settings['rule-providers']['DNSLeaks'] = newProvider;

  // 填充规则
  const matchRule = settings.rules.find(rule => rule.startsWith("MATCH"));
  const name = matchRule ? matchRule.split(",").pop() : null;
  const newRule = `RULE-SET,DNSLeaks,${name}`;
  if (name) {
    settings.rules.unshift(newRule);
  }

  // 修改dns为fakeip
  const dnssettings = settings.dns;
  if (!dnssettings['enhanced-mode'] || dnssettings['enhanced-mode'] !== "fake-ip") {
    dnssettings['enhanced-mode'] = "fake-ip";
  }

  return settings;
}
