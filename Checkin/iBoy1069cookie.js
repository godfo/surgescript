/*
iBoy1069.org论坛签到

[Header Rewrite]
iboy1069.org header-replace Cookie "自己获取的签到的Cookie"

[MITM]
hostname = iboy1069.org

[Script]
http-request https:\/\/iboy1069\.org\/k_misign-sign.html script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Checkin/iBoy1069cookie.js,script-update-interval=0
cron "0 0 7 * * *" script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Checkin/iBoy1069.js

网页签到"qiandao"关键词，Cookie添加到header rewrite里，Header重写
*/

if ($request.headers['Cookie']) {
  var headerIB = $request.headers['Cookie'];
  $persistentStore.write(headerIB, "CookieIB");
  $notification.post("成功获取Cookie🎉", "", "请在Surge中禁用本脚本")
  }
 $done({})
