/*
PDF Expert & Documents Unlock

[MITM]
hostname = license.pdfexpert.com

[Script]
Pdfexpert.js = type=http-response,pattern=^https?:\/\/license\.pdfexpert\.com\/api\/1\.0\/pdfexpert6\/subscription\/(refresh$|check$),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Pdfexpert.js,script-update-interval=0
*/

var obj = JSON.parse($response.body);

obj["isInGracePeriod"] = false;
obj["isEligibleForIntroPeriod"] = false;

obj["subscriptionState"] = "active";
obj["subscriptionExpirationDate"] = "23:59 31/12/2029";
obj["subscriptionAutoRenewStatus"] = "autoRenewOff";

$done({body: JSON.stringify(obj)});
