// 参考 Verge Rev 示例 Script 配置
// 原链接:https://github.com/Repcz/Tool/raw/X/Clash/Meta/Override.js
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
//
// 最后更新时间: 2024-09-08 

// 规则集通用配置设置
const ruleProviderText = {
  "type": "http",
  "format": "text",
  "interval": 86400
};
const ruleProviderYaml = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://connectivitycheck.gstatic.com/generate_204",
  "max-failed-times": 3,
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";
  config["external-controller"] = "127.0.0.1:9090";
  config["external-ui"] = "ui";
  config["external-ui-url"] = "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip";

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
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    "asn": "https://mirror.ghproxy.com/https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "全球节点",
      "type": "url-test",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "include-all": true,
      "exclude-filter": "群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|访问|支持|教程|关注|更新|作者|加入|(\b(USE|USED|TOTAL|EXPIRE|EMAIL|Panel|Channel|Author)\b)",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Macao.png"
    },
    {
      ...groupBaseOption,
      "name": "海外服务",
      "type": "select",
      "proxies": ["全球节点", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"],
      "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"],
      "icon": "https://github.com/tugepaopao/Image-Storage/raw/master/cartoon/Cute/google.png"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram_X.png"
    },
    {
      ...groupBaseOption,
      "name": "人工智能",
      "type": "select",
      "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },
    {
      ...groupBaseOption,
      "name": "中达监控",
      "type": "select",
      "proxies": ["REJECT", "DIRECT" ,"PASS"],
      "icon": "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Icon/Image/TrendMicro.png"
    },
    {
      ...groupBaseOption,
      "name": "香港节点",
      "type": "url-test",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": false,
      "include-all": true,
      "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "美国节点",
      "type": "url-test",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": false,
      "include-all": true,
      "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "狮城节点",
      "type": "url-test",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": false,
      "include-all": true,
      "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)",
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "日本节点",
      "type": "url-test",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": false,
      "include-all": true,
      "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "台湾节点",
      "type": "url-test",
      "lazy": true,
      "interval": 300,
      "tolerance": 0,
      "hidden": false,
      "include-all": true,
      "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"
    },
    {
      ...groupBaseOption,
      "name": "全国直连",
      "type": "select",
      "proxies": ["DIRECT" ,"PASS"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png"
    },
    {
      ...groupBaseOption,
      "name": "广告拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT" ,"PASS"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Reject.png"
    },
    {
      ...groupBaseOption,
      "name": "兜底分流",
      "type": "select",
      "proxies": ["海外服务", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "DIRECT", "PASS"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png"
    }
    // 地区分组

  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "Taida": {
      ...ruleProviderYaml,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Taida.yaml",
      "path": "./Ruleset/Taida.yaml"
    },
    "Trendmicro": {
      ...ruleProviderYaml,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Trendmicro.yaml",
      "path": "./Ruleset/Trendmicro.yaml"
    },
    "Sogouinput": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/sogouinput.txt",
      "path": "./Ruleset/sogouinput.txt"
    },
      "Reject_non_ip": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
      "path": "./Ruleset/reject.txt"
    },
    "adrules": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://adrules.top/adrules.list",
      "path": "./Ruleset/adrules.list"
    },
    "Google": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Google.list",
      "path": "./Ruleset/Google.list"
    },
    "YouTube": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list",
      "path": "./Ruleset/YouTube.list"
    },
    "Telegram": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
      "path": "./Ruleset/Telegram.list"
    },
    "Steam": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Steam.list",
      "path": "./Ruleset/Steam.list"
    },
    "AI": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
      "path": "./Ruleset/AI.list"
    },
    "Spotify": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list",
      "path": "./Ruleset/Spotify.list"
    },
    "PrimeVideo": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/PrimeVideo.list",
      "path": "./Ruleset/PrimeVideo.list"
    },
    "OneDrive": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/OneDrive.list",
      "path": "./Ruleset/OneDrive.list"
    },
    "Github": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Github.list",
      "path": "./Ruleset/Github.list"
    },
    "Microsoft": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list",
      "path": "./Ruleset/Microsoft.list"
    },
    "Lan": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./Ruleset/Lan.list"
    },
    "ProxyGFW": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list",
      "path": "./Ruleset/ProxyGFW.list"
    },
    "China": {
      ...ruleProviderText,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ChinaDomain.list",
      "path": "./Ruleset/China.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,Taida,全国直连",
    "RULE-SET,Trendmicro,全国直连",
    "RULE-SET,Sogouinput,广告拦截",
    "RULE-SET,Reject_non_ip,广告拦截",
    "RULE-SET,adrules,广告拦截",
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
