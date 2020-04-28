/*
AdGuard Pro

[MITM]
hostname = mobile-api.adguard.com

[Script]
AdGuard.js = type=http-response,pattern=^https:\/\/mobile-api\.adguard\.com\/api\/1\.0\/ios_validate_receipt$,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/AdGuard.js,script-update-interval=0
*/

let obj = JSON.parse($response.body);
obj={"products":[{"product_id":"com.adguard.lifetimePurchase","premium_status":"ACTIVE"}]};
$done({body: JSON.stringify(obj)});
