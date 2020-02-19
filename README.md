# 自用Surge Scripts
MITM
```
Hostname = app.bilibili.com, api.bilibili.com, api.live.bilibili.com, www.zhihu.com, api.zhihu.com, buy.itunes.apple.com, api.rr.tv, account.wps.com, account.wps.cn, webapi.115.com
```
B站知乎去广告 by onewayticket255
```
//ZhiHu
USER-AGENT,AVOS*,REJECT-TINYGIF
URL-REGEX,https://www.zhihu.com/api/v4/mcn/,REJECT-TINYGIF
URL-REGEX,https://api.zhihu.com/(ab|adx|drama|fringe|zst|commercial|ad-style-service|market/popover|search/(top|tab|preset)|.*(guide|recommendations|extended|featured-comment-ad)),REJECT-TINYGIF
AND,((USER-AGENT,osee2*), (NOT,((DOMAIN-SUFFIX,zhihu.com))), (NOT,((DOMAIN-SUFFIX,zhimg.com)))),REJECT-TINYGIF

//BiliBili
URL-REGEX,https://app.bilibili.com/x/v2/(splash|search/(defaultword|square)),REJECT-TINYGIF
URL-REGEX,https://api.bilibili.com/x/v2/dm/advert,REJECT-TINYGIF
AND,((USER-AGENT,bili*), (NOT,((DOMAIN-SUFFIX,bilibili.com))),(NOT,((DOMAIN-SUFFIX,hdslb.com)))),REJECT-TINYGIF
```
哔哩哔哩APP去广告简化 by onewayticket255 & primovist
```
http-response ^https?:\/\/ap(i|p).(live.)?bilibili.com\/x(live)?\/(resource\/show\/tab|v2\/(reply\/main|view\/material|account\/(mine|teenagers\/status)|view|feed\/index|show\/popular\/index|rank)|app-room/v1/index/getInfoByRoom)\?access_key requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bilibili.js,script-update-interval=0
```
知乎APP去广告简化 by onewayticket255 & primovist
```
http-response ^https?:\/\/api\.zhihu\.com\/(moments\?(action|feed_type)|topstory\/recommend|.*\/questions|market\/header|people) requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Zhihu.js,script-update-interval=0
```
Manly修图工具Unlock by 越南老哥
```
http-response ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Manly.js,script-update-interval=0
```
Bear笔记本Pro by 越南老哥
```
http-response ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bear.js,script-update-interval=0
```
人人视频解锁原画
```
http-response ^https?:\/\/api\.rr\.tv(\/user\/privilege\/list|\/ad\/getAll) requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Rrtv.js,script-update-interval=0
```
WPS国内版/国际版 by eHpo1
```
http-response ^https?:\/\/account\.wps\.(cn|com)\/api\/users requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Wps.js,script-update-interval=0
```
新版115的App添加创建离线任务
```
[URL Rewrite]
^http:\/\/115\.com\/\?ct=sign$ http://115.com/lx?taskdg=1 header

[MITM]
hostname = *.115.com

[Script]
http-response ^http:\/\/115\.com\/lx.*$ requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115lx.js,script-update-interval=0
http-response ^https?:\/\/webapi\.115\.com\/user\/check_sign.*$ requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115lx.js,script-update-interval=0

快速创建下载任务的快捷指令: https://www.icloud.com/shortcuts/31e3a877cec340a48192aa081e25c05e
```
