/*
iBoy1069.org论坛签到

[MITM]
hostname = iboy1069.org

[Script]
http-request ^https?:\/\/iboy1069\.org script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Checkin/iBoy1069cookie.js,script-update-interval=0
cron "0 0 7 * * *" script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Checkin/iBoy1069.js


var bonus = {
  url: 'https://iboy1069.org/plugin.php?id=k_misign:sign&operation=qiandao&format=text&formhash=1b243424',
  headers: {
    Cookie: $persistentStore.read("CookieIB"),
  }
};
$httpClient.get(bonus, function(error, response, data) {
  if (error) {
    console.log(error);
    $notification.post("iBoy1069签到错误", "", "error")
    $done()
  } else {
    if (data.match(/已签到/)) {
      $notification.post("iBoy1069签到", "", "每日签到成功-已获取今日金币奖励 🎉")
      $done()
    } else {
      if (data.match(/今日已签/)) {
        $notification.post("iBoy1069签到", "", "每日签到成功-重复签到请明天再试哦 ⚠️")
        $done()
       } else {
         $notification.post("iBoy1069签到", "", "每日签到失败-重新获取Cookie ‼️‼️")
         $done()
       }
     }
   }
 })
