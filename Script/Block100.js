/*

[rewrite_local]

# > 拦截100解锁永久超级会员
^https?:\/\/tagit\.hyhuo\.com\/cypt\/block100\/get_vip_info$ url script-response-body https://raw.githubusercontent.com/yqc007/QuantumultX/master/Block100FVIPCrack.js

[mitm] 

hostname = tagit.hyhuo.com
*
*
*/


var body = $response.body;
body = "lvCQG8cCxqficLk+LttK+OvjY+kGEoGHRWop15GMRVg1TU8oQTFHsNCJIEJMEYYfDjqpfM0sxeXRILHsoullvHqzmN6X7HmMRHqOjr3G0AXp2FtlU91l2+2ZbtUpL8p2cc6Y6JdCOUiADpqc4GZktNpGoED1rMVltIjdbhLGVgO0tYaNtQ/dV52tpmn+Lcm+/3pCU8/wXdnCfkkMB0QZc6psJavFUF6dLfDRzagLuxiwgOQmNQraUG99e4YLDmoQ";
$done({ 
    body 
});


# https://raw.githubusercontent.com/yqc007/QuantumultX/master/Block100FVIPCrack.js
