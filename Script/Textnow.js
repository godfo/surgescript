/*
#Textnow去广告

[MITM]
hostname = api.textnow.me

[Script]
http-response ^https:\/\/api\.textnow\.me\/api2.0\/users\/.* requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/loric729/Sricpt/master/QuantumultX/textnow.js,script-update-interval=0
*/

var obj = JSON.parse($response.body); 
obj['show_ads'] = false;
obj['premium_calling'] = true;
$done({body: JSON.stringify(obj)});
