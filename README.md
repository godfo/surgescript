# 自用Surge Scripts

哔哩哔哩APP去广告简化 by onewayticket255 & primovist
```
[Rule]
URL-REGEX,https://app.bilibili.com/x/v2/(splash|search/(defaultword|square)),REJECT-TINYGIF
URL-REGEX,https://api.bilibili.com/x/v2/dm/advert,REJECT-TINYGIF
AND,((USER-AGENT,bili*), (NOT,((DOMAIN-SUFFIX,bilibili.com))),(NOT,((DOMAIN-SUFFIX,hdslb.com)))),REJECT-TINYGIF

[MITM]
hostname = app.bilibili.com, api.bilibili.com, api.live.bilibili.com

[Script]
http-response ^https?:\/\/ap(i|p).(live.)?bilibili.com\/x(live)?\/(resource\/show\/tab|v2\/(reply\/main|view\/material|account\/(mine|teenagers\/status)|view|feed\/index|show\/popular\/index|rank)|app-room/v1/index/getInfoByRoom)\?access_key requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bilibili.js,script-update-interval=0
```
知乎APP去广告简化 by onewayticket255 & primovist
```
[Rule]
USER-AGENT,AVOS*,REJECT-TINYGIF
URL-REGEX,https://www.zhihu.com/api/v4/mcn/,REJECT-TINYGIF
URL-REGEX,https://api.zhihu.com/(ab|adx|xen|drama|fringe|zst|commercial|ad-style-service|market/popover|search/(top|tab|preset)|.*(guide|recommendations|extended|featured-comment-ad)),REJECT-TINYGIF
AND,((USER-AGENT,osee2*), (NOT,((DOMAIN-SUFFIX,zhihu.com))), (NOT,((DOMAIN-SUFFIX,zhimg.com)))),REJECT-TINYGIF

[MITM]
hostname = www.zhihu.com, api.zhihu.com

[Script]
http-response ^https?:\/\/(api|www)\.zhihu\.com\/(moments(\/recommend)?\?(action|feed_type)|topstory\/recommend|.*\/questions|market\/header|people|appview\/(v2|p)\/(answer\/)?\d{1,10}\?no\_image\=false(\&article\_fixed\_bottom\=1)?\&X\-SUGER\=) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Zhihu.js,script-update-interval=0
```
Manly修图工具 & Bear笔记本 & Picsew截图
```
[MITM]
hostname = buy.itunes.apple.com

[Script]
http-response ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Manly.js,script-update-interval=0
http-response ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bear.js,script-update-interval=0
http-response ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Picsew.js,script-update-interval=0
```
人人视频解锁原画+电影分区解锁
```
[MITM]
hostname = api.rr.tv

[Script]
http-response ^https:\/\/api\.rr\.tv(\/user\/privilege\/list|\/ad\/getAll|\/rrtv-video\/v4plus\/season\/detail) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Rrtv.js,script-update-interval=0
```
WPS国内版/国际版 by eHpo1
```
[MITM]
hostname = account.wps.co, account.wps.cn

[Script]
http-response ^https?:\/\/account\.wps\.(cn|com)\/api\/users requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Wps.js,script-update-interval=0
```
新版115的App添加创建离线任务 by ikanam
```
[URL Rewrite]
^http:\/\/115\.com\/\?ct=sign$ http://115.com/lx?taskdg=1 header

[MITM]
hostname = webapi.115.com

[Script]
http-response ^http:\/\/115\.com\/lx.*$ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115lx.js,script-update-interval=0
http-response ^https?:\/\/webapi\.115\.com\/user\/check_sign.*$ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115lx.js,script-update-interval=0

快速创建下载任务的快捷指令: https://www.icloud.com/shortcuts/31e3a877cec340a48192aa081e25c05e
```
提取115中的视频使用nPlayer进行播放 by ikanam
```
[Script]
http-request ^http:\/\/.*\.115\.com\/.*\.m3u8.*$ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115tonplayer.js,script-update-interval=0
```
Textnow去广告 by loric729
```
[MITM]
hostname = api.textnow.me

[Script]
http-response ^https:\/\/api\.textnow\.me\/api2.0\/users\/.* requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Textnow.js,script-update-interval=0
```
微博国际版去除开屏广告及时间线广告 by hancj0528
```
[Rule]
URL-REGEX,^https://weibointl.api.weibo.cn/portal.php\?a=get_coopen_ads,REJECT-TINYGIF

[MITM]
hostname = weibointl.api.weibo.cn, api.weibo.cn

[Script]
http-response ^https?:\/\/api\.weibo\.cn\/2\/(statuses|groups)\/(unread_hot_|friends_)?timeline requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/WeiboInt.js,script-update-interval=0
```
Musixmatch会员解锁
```
[MITM]
hostname = apic.musixmatch.com

[Script]
http-response ^https?:\/\/apic\.musixmatch\.com\/ws\/.*\/config\.get requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Musixmatch.js,script-update-interval=0
```
