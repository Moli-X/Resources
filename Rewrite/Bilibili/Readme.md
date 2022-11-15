
###### 我的频道：https://t.me/QuantX

# 哔哩哔哩自动换区教程

## ❶ 添加重写：
https://github.com/Moli-X/Resources/raw/main/Rewrite/Bilibili/AutoBilibili.conf

## ❷ 添加规则集：

### 在[filter_remote]添加规则

https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/StreamingSE.list, tag=StreamingSE, force-policy=换区服务, update-interval=172800, opt-parser=true, enabled=true

### 在[policy]下添加策略组

static=换区服务, direct, proxy,img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/Available.png

### [filter_local]

可选, 由于qx纯tun特性, 不添加规则可能会导致脚本失效. https://github.com/NobyDa/Script/issues/382

ip-cidr, 203.107.1.1/24, reject

## ❸ BOXJS设置：添加哔哩哔哩自动换区

BoxJs订阅地址: https://raw.githubusercontent.com/NobyDa/Script/master/NobyDa_BoxJs.json
<p align="left">
<img src="https://github.com/Moli-X/Resources/raw/main/Icon/Other/bo.png" width="250" height="500" />
</p>


在哔哩哔哩自动换区下面填写策略组名：换区服务 
<p align="left">
<img src="https://github.com/Moli-X/Resources/raw/main/Icon/Other/CZ.png" width="250" height="500" />
</p>
    
## ❹ 温和策略机制处于关闭状态

使用切换地区功能请确保您的QX=>其他设置=>温和策略机制处于关闭状态
<p align="left">
<img src="https://github.com/Moli-X/Resources/raw/main/Icon/Other/mp.png" width="250" height="500" />
</p>



### 最后 
*  感谢：[NobyDa](https://github.com/NobyDa/Script)
*  感谢：[DivineEngine](https://github.com/DivineEngine)


