/*
iBoy1069.org论坛签到

[Header Rewrite]
iboy1069.org header-replace Cookie "自己获取的签到的Cookie"

[MITM]
hostname = iboy1069.org

[Script]
http-request ^https?:\/\/iboy1069\.org script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Checkin/iBoy1069cookie.js,script-update-interval=0
cron "0 0 1 * * *" script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Checkin/iBoy1069.js

首先需要当日未签到账户，Surge开启抓取流量，打开iboy1069.org登入，然后进行签到，关闭流量抓取后在已保存的请求查找"qiandao"关键词，找到后选择响应内容为已签到的请求，复制其Cookie添加到header rewrite里，非此签到请求的cookie皆不可，且只能用签到来获取，如果出错就是你Cookie填错了。Header重写之后打开iboy1069.org提示获取Cookie成功就可以删掉重写，并禁用此HTTP-REQUEST script。
当然你也可以跳过rewrite直接使用本地Cron脚本 将Cookie直接替换为你获取到的。
*/

if ($request.headers['Cookie']) {
  var headerIB = $request.headers['Cookie'];
  $persistentStore.write(headerIB, "CookieIB");
  $notification.post("成功获取Cookie🎉", "", "请在Surge中禁用本脚本")
  }
 $done({})
