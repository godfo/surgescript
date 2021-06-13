 /*
 author https://github.com/fw-carl
 训记app
 训记 = type=http-response,pattern=^https?:\/\/xunji\.implements\.io\/whole_user_info,requires-body=1,max-size=0,script-path= https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Xunji.js,script-update-interval=0
 hostname = xunji.implements.io
 */

var body = $response.body.replace(/"vipDay":\d/, '"vipDay":10000')
$done({ body });
