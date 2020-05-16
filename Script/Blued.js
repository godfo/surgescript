/*
[MITM]
hostname = *burn-chatfiles.bldimg.com

[Script]
Blued.js = type=http-request,pattern=https:\/\/.*burn-chatfiles\.bldimg\.com\/,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Blued.js,script-update-interval=0
*/

var url =$request.url;
let headers = $request.headers;
async function launch (){
    if(headers['User-Agent'].indexOf("Blued")!=-1){
        $notification.post('捕获到闪照','点击👇URL',url);
    }
    $done();
}
launch()
