自用Surge Scripts😶
```
Hostname = app.bilibili.com, api.bilibili.com, api.live.bilibili.com, api.zhihu.com, buy.itunes.apple.com, api.rr.tv
```
哔哩哔哩APP去广告简化
```
http-response ^https?:\/\/ap(i|p).(live.)?bilibili.com\/x(live)?\/(resource\/show\/tab|v2\/(reply\/main|view\/material|account\/(mine|teenagers\/status)|view|feed\/index|show\/popular\/index|rank)|app-room/v1/index/getInfoByRoom)\?access_key requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bilibili.js,script-update-interval=0
```
知乎APP去广告简化
```
http-response ^https?:\/\/api\.zhihu\.com\/(moments\?(action|feed_type)|topstory\/recommend|.*\/questions|market\/header|people) requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Zhuhu.js,script-update-interval=0
```
Manly修图工具Unlock
```
http-response ^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Manly.js,script-update-interval=0
```
Bears笔记本Pro
```
http-response ^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bear.js,script-update-interval=0
```
人人视频解锁原画
```
^https?:\/\/api\.rr\.tv(\/user\/privilege\/list|\/ad\/getAll) requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Rrtv.js,script-update-interval=0
```
