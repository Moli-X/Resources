// Define the `main` function
function main(params) {
    if (!params.proxies) return params;
    overwriteRules(params);
    overwriteProxyGroups(params);
    overwriteDns(params);
    return params;
}
//覆写规则
function overwriteRules(params) {

    const ruleProviders = {
        Direct:      {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Direct/Direct.yaml"          , path: "./RuleSet/Direct.yaml"      , interval: 86400, },
        Taida:       {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Taida.yaml"                               , path: "./RuleSet/Taida.yaml"       , interval: 86400, },
        Lan:         {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Lan/Lan.yaml"                , path: "./RuleSet/Lan.yaml"         , interval: 86400, },
        Google:      {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml"          , path: "./RuleSet/Google.yaml"      , interval: 86400, },
        Unbreak:     {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/DivineEngine/Profiles@master/Clash/RuleSet/Unbreak.yaml"                    , path: "./RuleSet/Unbreak.yaml"     , interval: 86400, },
        OpenAI:      {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml"          , path: "./RuleSet/OpenAI.yaml"      , interval: 86400, },
        Bing:        {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Bing.yaml"                                , path: "./RuleSet/Bing.yaml"        , interval: 86400, },
        Microsoft:   {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Microsoft.yaml"                           , path: "./RuleSet/Microsoft.yaml"   , interval: 86400, },
        Github:      {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Clash/GitHub/GitHub.yaml"         , path: "./RuleSet/Github.yaml"      , interval: 86400, },
        GitLab:      {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitLab/GitLab.yaml"          , path: "./RuleSet/GitLab.yaml"      , interval: 86400, },
        YouTube:     {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/YouTube/YouTube.yaml"        , path: "./RuleSet/YouTube.yaml"     , interval: 86400, },
        Video:       {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Video.yaml"                               , path: "./RuleSet/Video.yaml"       , interval: 86400, },
        Telegram:    {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Clash/Telegram/Telegram.yaml"     , path: "./RuleSet/Telegram.yaml"    , interval: 86400, },
        Discord:     {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Discord.yaml"                             , path: "./RuleSet/Discord.yaml"     , interval: 86400, },
        Global:      {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Global.yaml"                              , path: "./RuleSet/Global.yaml"      , interval: 86400, },
        China:       {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Clash/China/China.yaml"           , path: "./RuleSet/China.yaml"       , interval: 86400, },
        ChinaIP:     {type: "http",behavior: "ipcidr"   , url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@release/rule/Clash/ChinaIPs/ChinaIPs_IP.yaml"  , path: "./RuleSet/ChinaIP.yaml"     , interval: 86400, },
        Advertising: {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Advertising/Advertising.yaml", path: "./RuleSet/Advertising.yaml" , interval: 86400, },
        Privacy:     {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Hijacking/Hijacking.yaml"    , path: "./RuleSet/Privacy.yaml"     , interval: 86400, },
        HKlist:      {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/HKlist.yaml"                              , path: "./RuleSet/HKlist.yaml"      , interval: 86400, },
        Trendmicro:  {type: "http",behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Clash/Rules/Trendmicro.yaml"                          , path: "./RuleSet/Trendmicro.yaml"  , interval: 86400, },
        Anti:        {type: "http",behavior: "domain"   , url: "https://anti-ad.net/clash.yaml"                                                                         , path: "./RuleSet/Anti.yaml"        , interval: 86400, },
		};
    const rules = [
        "PROCESS-NAME,lync.exe,DIRECT ",
        "PROCESS-NAME,EXCEL.EXE,DIRECT",
        "PROCESS-NAME,WINWORD.EXE,DIRECT",
        "PROCESS-NAME,DIAInstaller.EXE,DIRECT",
        "PROCESS-NAME,Update.exe,DIRECT",
        "RULE-SET,Taida,PASS",
        "RULE-SET,GitLab,香港节点",
        "RULE-SET,Google,香港节点",
        "RULE-SET,YouTube,香港节点",
        "RULE-SET,Direct,DIRECT",
        "RULE-SET,Lan,DIRECT,no-resolve",
        "RULE-SET,Unbreak,DIRECT",
        "RULE-SET,Microsoft,香港节点",
        "RULE-SET,Video,中国媒体",
        "RULE-SET,Telegram,电报消息 ",
        "RULE-SET,Github,香港节点 ",
        "RULE-SET,OpenAI,人工智能 ", 
        "RULE-SET,China,DIRECT  ",
        "RULE-SET,Global,海外服务" ,
        "RULE-SET,Anti,REJECT ",
        "RULE-SET,Advertising,REJECT",
        "RULE-SET,Privacy,REJECT",
        "RULE-SET,Trendmicro,中达监控",
        "GEOIP,CN,DIRECT,no-resolve",
        "MATCH,漏网之鱼 ",
    ];
    params["rule-providers"] = ruleProviders;
    params["rules"] = rules;
}

//覆写代理组
function overwriteProxyGroups(params) {
    // 所有代理
    const allProxies = params["proxies"].map((e) => e.name);

    // 延迟最低代理组，按地区分组选延迟最低
    const autoProxyGroupRegexs = [
        { name: "香港节点"  , regex: /香港|HK|Hong|🇭🇰/                 , icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png "     },
        { name: "台湾节点"  , regex: /台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼/         , icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"        },
        { name: "日本节点"  , regex: /日本|JP|Japan|🇯🇵/                 , icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png "        },
        { name: "美国节点"  , regex: /美国|US|United States|America|🇺🇸/ , icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png" },
        { name: "新加坡节点" , regex: /新加坡|狮城|SG|Singapore|🇸🇬/       , icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png "    },
    ];

    const autoProxyGroups = autoProxyGroupRegexs
        .map((item) => ({
            name: item.name,
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex(params, item.regex),
            icon: item.icon,
            hidden: false,
        }))
		// 过滤掉没有可用代理的组，只保留有代理的组
        .filter((item) => item.proxies.length > 0);


    const groups = [

        {
            name: "海外服务",
            type: "select",
            url: "http://www.gstatic.com/generate_204",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png",
            proxies: [ "香港节点", "台湾节点", "新加坡节点", "日本节点", "美国节点", "全球节点"],
        },

        {
            name: "电报消息",
            type: "select",
            proxies: ["海外服务", "香港节点", "台湾节点", "新加坡节点", "日本节点", "美国节点", "全球节点"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color//Telegram_X.png"
        },
        {
            name: "人工智能",
            type: "select",
            proxies: ["海外服务", "香港节点", "台湾节点", "新加坡节点", "日本节点", "美国节点", "全球节点"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png "
        },
        {
            name: "中国媒体",
            type: "select",
            proxies: ["PASS","海外服务", "DIRECT"],
            // "include-all": true,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/StreamingCN.png"
        },
        {
            name: "Spotify",
            type: "select",
            proxies: ["海外服务", "香港节点", "台湾节点", "新加坡节点", "日本节点", "美国节点", "全球节点"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png",
			hidden: true 
        },
        {
            name: "中达监控",
            type: "select",
            proxies: ["PASS","DIRECT", "REJECT"],
            icon: "https://cdn.jsdelivr.net/gh/Moli-X/Resources@main/Icon/Image/TrendMicro.png"
        },
        {
            name: "广告拦截",
            type: "select",
            proxies: ["PASS","REJECT", "DIRECT", "海外服务"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Reject.png"
        },
        {
            name: "漏网之鱼",
            type: "select",
            proxies: ["PASS","DIRECT", "海外服务"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png"
        },
        {
            name: "全球节点",
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Macao.png ",
            proxies: allProxies,
            hidden: false,
        },
    ];

    autoProxyGroups.length &&
        groups[2].proxies.unshift(...autoProxyGroups.map((item) => item.name));
    groups.push(...autoProxyGroups);
    params["proxy-groups"] = groups;

}

//防止dns泄露
function overwriteDns(params) {
    const cnDnsList = [
        "https://223.5.5.5/dns-query",
        "https://1.12.12.12/dns-query",
    ];
    const trustDnsList = [
        'quic://dns.cooluc.com',
        "https://1.0.0.1/dns-query",
        "https://1.1.1.1/dns-query",
    ];

    const dnsOptions = {
        enable: true,
        "prefer-h3": true, // 如果DNS服务器支持DoH3会优先使用h3
        "default-nameserver": cnDnsList, // 用于解析其他DNS服务器、和节点的域名, 必须为IP, 可为加密DNS。注意这个只用来解析节点和其他的dns，其他网络请求不归他管
        nameserver: trustDnsList, // 其他网络请求都归他管

        // 这个用于覆盖上面的 nameserver
        "nameserver-policy": {
            // 针对中国大陆的域名，使用 cnDnsList 的 DNS 列表
            "geosite:cn": cnDnsList,
            // 针对非中国大陆的域名，使用 trustDnsList 的 DNS 列表
            "geosite:geolocation-!cn": trustDnsList,
            // 针对 gfw 列表中的域名，将其与 fallback 解析结合，或者你可以直接在这里指定规则
            "gfw": trustDnsList,  // 使用 trustDnsList 处理 gfw 列表中的域名污染// "gfw" 代表防火墙列表中的域名，这些域名被视为污染
            // 内网的 DNS，可以定义内部域名
            // '+.公司域名.com, www.4399.com, +.baidu.com': '10.0.0.1'
        },
        
        "fallback": trustDnsList,  // 定义 fallback DNS 列表
        
        "fallback-filter": {
            geoip: true,  // 启用 GeoIP 过滤，通过地理位置识别 IP
            "geoip-code": "CN",  // 中国大陆的 IP 将直接通过 nameserver 解析
            // 不再使用 geosite，而是依赖 nameserver-policy 里的规则
            ipcidr: ["240.0.0.0/4"],  // 匹配这个 IP 地址范围的请求将视为污染
            domain: ["+.google.com", "+.facebook.com", "+.youtube.com"],  // 这些域名将被视为污染
        },
    };

    // GitHub加速前缀
    const githubPrefix = "https://fastgh.lainbo.com/";

    // GEO数据GitHub资源原始下载地址
    const rawGeoxURLs = {
        geoip:   "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
        geosite: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
        mmdb:    "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    };

    // 生成带有加速前缀的GEO数据资源对象
    const accelURLs = Object.fromEntries(
        Object.entries(rawGeoxURLs).map(([key, githubUrl]) => [
            key,
            `${githubPrefix}${githubUrl}`,
        ])
    );

    const otherOptions = {
        "unified-delay": true,
        "tcp-concurrent": true,
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        sniffer: {
            enable: true,
            sniff: {
                TLS: {
                    ports: [443, 8443],
                },
                HTTP: {
                    ports: [80, "8080-8880"],
                    "override-destination": true,
                },
            },
        },
        "geodata-mode": true,
        "geox-url": accelURLs,
    };

    params.dns = { ...params.dns, ...dnsOptions };
    Object.keys(otherOptions).forEach((key) => {
        params[key] = otherOptions[key];
    });
}

function getProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["海外服务"];
}


