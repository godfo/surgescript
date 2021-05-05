/*
Gyroscope unlock pro (Script author: @Maasea )

[MITM]
hostname = api.gyrosco.pe

[Script]
Gyroscope = type=http-response,pattern=^https:\/\/api\.gyrosco\.pe\/v1\/account\/$,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Gyroscope.js,script-update-interval=0
*/

let obj = JSON.parse($response.body);
obj.user["active_until_time"] = "2099-01-01T00:00:00Z";
$done({body: JSON.stringify(obj)});
