//原链接:https://raw.githubusercontent.com/xishang0128/rules/main/clash%20or%20stash/prevent_dns_leak/prevent_dns_leak_domain.list

function main(config) {
  // 填充rule-provider
  if (!config['rule-providers']) {
    config['rule-providers'] = {};
  }
  const newProvider = {
    type: "http",
    interval: 86400,
    behavior: "domain",
    format: "text",
    url: "https://github.com/Moli-X/Resources/raw/main/Filter/DNSLeaks.list"
  };
  config['rule-providers']['DNSLeaks'] = newProvider;

  // 填充规则
  const matchRule = config.rules.find(rule => rule.startsWith("MATCH"));
  const name = matchRule ? matchRule.split(",").pop() : null;
  const newRule = `RULE-SET,DNSLeaks,${name}`;
  if (name) {
    config.rules.unshift(newRule);
  }

  // 修改dns为fakeip
  const dnsConfig = config.dns;
  if (!dnsConfig['enhanced-mode'] || dnsConfig['enhanced-mode'] !== "fake-ip") {
    dnsConfig['enhanced-mode'] = "fake-ip";
  }

  return config;
}
