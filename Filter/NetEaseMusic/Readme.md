# 开始之前

##### TG Channel：https://t.me/QuantX

给大家普及一个常识：目前网上出现的不同平台的解锁网易云变灰工具和脚本，其原理都不是破解网易云，只是将其它平台（如酷狗、QQ音乐、虾米...）能够播放的音源替换网易云音乐无版权/变灰/需会员的歌曲。

# 开始
### 1.1 IOS、iPadOS端安装并信任证书

首先获取CA证书并信任ios系统比较特殊，需要先下载并信任CA证书才可以。

首先用ios手机浏览器打开本页面，直接点击链接：https://github.com/Moli-X/Resources/raw/main/Filter/NetEaseMusic/CA.crt

在弹出的对话框中点击允许下载CA证书，然后进入设置>通用>描述文件，安装CA证书，并在设置>通用>关于本机>证书信任设置 开启对CA证书的信任。

然后打开Quantumult X，在配置文件区域-点击编辑-在打开的配置界面中对应的【xxx】项后面添加以下内容，如果没有对应的【xxx】项则手动输入。

⚠️圈X配置全部编辑（1.2-1.4）完全以后点击保存（不然会报错）

### 1.2 为网易云音乐添加策略组

[policy]


static=音乐服务, server-tag-regex=(?=.*(music|𝐌𝐮𝐬𝐢𝐜|Unbolck|网易云|云音乐|Music|Netease|🎶|解锁)), img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Netease_Music_Unlock.png


### 1.3 为网易云音乐添加订阅

[server_remote]

https://raw.githubusercontent.com/nameking77/Qx/main/music/wyy.txt, tag=音乐, update-interval=172800, opt-parser=true, enabled=true

### 1.4 为网易云音乐添加分流规则

在[filter_remote]下面添加

https://raw.githubusercontent.com/Moli-X/Resources/main/Filter/NetEaseMusic/NetEaseMusic.list, tag=音乐服务, force-policy=解锁服务,update-interval=172800, opt-parser=true, enabled=true


### 测试是否解锁

网易云灰色歌单（我的灰色歌单）

https://y.music.163.com/m/playlist?app_version=8.7.35&id=6962020176&userid=437212487&creatorId=437212487

### ⚠️这里只编辑配置规则，网易云音乐解锁订阅自行寻找。

# 订阅链接
2022年5月12日，暂时可用的节点订阅：

https://raw.githubusercontent.com/nameking77/Qx/main/music/wyy.txt

https://raw.githubusercontent.com/O7Y0/Attached/main/UnblockNeteaseMusic/UnblockNeteaseMusic.txt

https://raw.githubusercontent.com/yyn618/QuantumultX-Script/main/UnlockNetease.list 

更多信息请关注频道https://t.me/QuantX

# FAQ

最后保存配置并将全部内容更新后，选择网易云音乐节点，打开网易云音乐APP即可解锁！


注意与排查：注意所对应位置，不要全部复制后就粘贴，也不要粘贴[xxx]这个内容，提示task_local里的内容错误就升级自己的qx，配置好后在网易音乐策略选择网音检查，然后在网音检查先长按节点查看是否可用，后面的延迟是访问qx里设置的网站延迟，不代表不可用，播放音乐可能需要时间加载，目前支持商店最新版本，  
测试版未知，会员音乐提示时点x等加载。qx主界面右上角不能出现红字或不能出现问号，查看的地方在右下角小风车，然后下拉最下面的其他设置，再下拉最下面。有一些第三方网易云客户端无法使用，还有一些旧版本网易云客户端无法使用。网易云分流放在国内域名ip分流订阅之前可以避免国内域名ip分流订阅包括网易云音乐域名ip导致无法走网易云节点出现不可用情况。
网络不稳定可能导致网易云音乐打开时慢或无法使用的情况，手机卡一般在旧手机或旧处理器高版本，可能会导致时不时无法使用。必须规则模式和安装并信任qx证书及开启重写和mitm，要确定添加的已全部更新，还是不行尝试重新安装网易云音乐客户端，依然不行等一段时间后尝。
