/**************************

哔哩哔哩, 港澳台番剧自动切换地区


Update: 2021.05.02
Author: @NobyDa
Use: Surge, QuanX, Loon

****************************
港澳台自动切换地区说明 :
****************************

地区自动切换功能仅适用于Surge4.7+(iOS)，Loon2.1.10(286)+，QuanX1.0.22(543)+
低于以上版本仅显示豆瓣评分.

Surge 4.7+ 远程脚本配置 :
****************************
[Script]
Bili Region = type=http-response,pattern=^https:\/\/ap(p|i)\.bilibili\.com\/(pgc\/view\/(v\d\/)?app|x(\/v\d)?\/view\/video)\/(season|online)\?access_key,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bili_Auto_Regions.js
Bili Search = type=http-request,pattern=^https:\/\/app\.bilibili\.com\/x\/v\d\/search(\/type)?\?.+?%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)&,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Bili_Auto_Regions.js

[MITM]
hostname = ap?.bilibili.com

***************************/

let $ = nobyda();
let run = EnvInfo();

async function SwitchRegion(play) {
	const Group = '🍻Bilibili'; //Your blibli policy group name.
        const CN = '🚀Direct'; //Your China sub-policy name.
        const TW = '🇹🇼TW'; //Your Taiwan sub-policy name.
        const HK = '🇭🇰HK'; //Your HongKong sub-policy name.
	const current = await $.getPolicy(Group) || 'Policy error ⚠️';
	const area = (() => {
		if (/\u50c5[\u4e00-\u9fa5]+\u6e2f|%20%E6%B8%AF&/.test(play)) {
			if (current != HK) return HK;
		} else if (/\u50c5[\u4e00-\u9fa5]+\u53f0|%20%E5%8F%B0&/.test(play)) {
			if (current != TW) return TW;
		} else if (current != CN) return CN;
	})()

	if (area) {
		const change = await $.setPolicy(Group, area);
		const notify = 'false';
		const msg = `${current}  =>  ${change?area:'sub-policy error ⚠️'}  =>  ${change?`🟢`:`🔴`}`;
		if (!notify) $.notify(/^http/.test(play) || !play ? `` : play, ``, msg);
		else console.log(`${/^http/.test(play)||!play?``:play}\n${msg}`);
		if (change) return true;
	}
	return false;
}

function EnvInfo() {
	if (typeof($response) !== 'undefined') {
		const raw = JSON.parse($response.body);
		const data = raw.data || raw.result || {};
		//if surge or loon, $done() will auto reconnect with the new policy
		SwitchRegion(data.title)
			.then(s => s && !$.isQuanX ? $done() : QueryRating(raw, data));
	} else {
		const raw = $request.url;
		const res = {
			url: raw.replace(/%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)&/g, '&')
		};
		SwitchRegion(raw).then(() => $done(res));
	}
}

function nobyda() {
	const isHTTP = typeof $httpClient != "undefined";
	const isLoon = typeof $loon != "undefined";
	const isQuanX = typeof $task != "undefined";
	const isSurge = typeof $network != "undefined" && typeof $script != "undefined";
	const notify = (title, subtitle, message) => {
		console.log(`${title}\n${subtitle}\n${message}`);
		if (isQuanX) $notify(title, subtitle, message);
		if (isHTTP) $notification.post(title, subtitle, message);
	}
	const read = (key) => {
		if (isQuanX) return $prefs.valueForKey(key);
		if (isHTTP) return $persistentStore.read(key);
	}
	const adapterStatus = (response) => {
		if (!response) return null;
		if (response.status) {
			response["statusCode"] = response.status;
		} else if (response.statusCode) {
			response["status"] = response.statusCode;
		}
		return response;
	}
	const getPolicy = (groupName) => {
		const m = `Version error ⚠️`
		if (isSurge) {
			if (typeof($httpAPI) === 'undefined') return m;
			return new Promise((resolve) => {
				$httpAPI("GET", "v1/policy_groups/select", {
					group_name: encodeURIComponent(groupName)
				}, (b) => resolve(b.policy))
			})
		}
		if (isLoon) {
			if (typeof($config.getPolicy) === 'undefined') return m;
			const getName = $config.getPolicy(groupName);
			return getName;
		}
		if (isQuanX) {
			if (typeof($configuration) === 'undefined') return m;
			return new Promise((resolve) => {
				$configuration.sendMessage({
					action: "get_policy_state"
				}).then(b => {
					if (b.ret && b.ret[groupName]) {
						resolve(b.ret[groupName][1]);
					} else resolve();
				}, () => resolve());
			})
		}
	}
	const setPolicy = (group, policy) => {
		if (isSurge && typeof($httpAPI) !== 'undefined') {
			return new Promise((resolve) => {
				$httpAPI("POST", "v1/policy_groups/select", {
					group_name: group,
					policy: policy
				}, (b) => resolve(!b.error))
			})
		}
		if (isLoon && typeof($config.getPolicy) !== 'undefined') {
			const set = $config.setSelectPolicy(group, policy);
			return set;
		}
		if (isQuanX && typeof($configuration) !== 'undefined') {
			return new Promise((resolve) => {
				$configuration.sendMessage({
					action: "set_policy_state",
					content: {
						[group]: policy
					}
				}).then((b) => resolve(!b.error), () => resolve());
			})
		}
	}
	const get = (options, callback) => {
		if (isQuanX) {
			options["method"] = "GET";
			$task.fetch(options).then(response => {
				callback(null, adapterStatus(response), response.body)
			}, reason => callback(reason.error, null, null))
		}
		if (isHTTP) {
			if (isSurge) options.headers['X-Surge-Skip-Scripting'] = false;
			$httpClient.get(options, (error, response, body) => {
				callback(error, adapterStatus(response), body)
			})
		}
	}
	return {
		getPolicy,
		setPolicy,
		isSurge,
		isQuanX,
		isLoon,
		notify,
		read,
		get
	}
}
