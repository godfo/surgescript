/*
第一弹App解锁VIP去广告

[MITM]
hostname = api.diyidan.net

[Script]
^https:\/\/api\.diyidan\.net\/v0\.3\/(user\/personal_homepage|vip_user\/info|tv_series\/index\?appChanne) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Diyidan.js,script-update-interval=0
*/

let url = $request.url;
const path1 = "user/personal_homepage";
const path2 = "vip_user/info";
const path3 = "tv_series/index?appChannel";
let obj = JSON.parse($response.body);

if (url.indexOf(path1) != -1) {
  // 去广告
  delete obj["data"]["vipArticle"];
  delete obj["data"]["bannerList"];
  obj["data"]["iconList"] = obj["data"]["iconList"].filter(i => {
    return ![5, 25, 27].includes(i.functionId);
  });
}
if (url.indexOf(path2) != -1) {
  obj["data"]["isMember"] = true;
}
if (url.indexOf(path3) != -1) {
  delete obj["data"]["advertisement"];
}

$done({
  body: JSON.stringify(obj)
});
