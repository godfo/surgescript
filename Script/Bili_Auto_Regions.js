/*
Bilibli番剧，自动切换地区

Author: @NobyDa

[Script]
Bilibili番剧区域 = type=http-response,pattern=^https:\/\/ap(p|i)\.bilibili\.com\/(pgc\/view\/(v\d\/)?app|x(\/v\d)?\/view\/video)\/(season|online)\?access_key,requires-body=1,max-size=0,control-api=1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bili_Auto_Regions.js

[MITM]
hostname = app.bilibili.com, api.bilibili.com
****************************
*/

const Group = '🍻Bilibili'; //Your blibli policy group name.
const CN = 'DIRECT'; //Your China sub-policy name.
const TW = '🇹🇼TW'; //Your Taiwan sub-policy name.
const HK = '🇭🇰HK'; //Your HongKong sub-policy name.

var obj = JSON.parse($response.body),
	obj = (obj.result || obj.data || {}).title || '';
const current = $surge.selectGroupDetails().decisions[Group] || 'Policy error ⚠️'
const str = (() => {
	if (obj.match(/\u50c5[\u4e00-\u9fa5]+\u6e2f/)) {
		if (current != HK) return HK;
	} else if (obj.match(/\u50c5[\u4e00-\u9fa5]+\u53f0/)) {
		if (current != TW) return TW;
	} else if (current != CN) return CN;
})()

if (str) {
	const change = $surge.setSelectGroupPolicy(Group, str);
	const notify = $persistentStore.read('BiliAreaNotify') === 'true';
	if (!notify) $notification.post(obj, ``, `${current}  =>  ${str}  =>  ${change?`🟢`:`🔴`}`);
	if (change) {
		$done(); //Kill the connection. Due to the characteristics of Surge, it will auto reconnect with the new policy.
	} else {
		$done({});
	}
} else {
	$done({});
}
