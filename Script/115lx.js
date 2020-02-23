/*
新版115的App添加创建离线任务

[URL Rewrite]
^http:\/\/115\.com\/\?ct=sign$ http://115.com/lx?taskdg=1 header

[MITM]
hostname = webapi.115.com

[Script]
http-response ^http:\/\/115\.com\/lx.*$ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115lx.js,script-update-interval=0
http-response ^https?:\/\/webapi\.115\.com\/user\/check_sign.*$ requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115lx.js,script-update-interval=0

快速创建下载任务的快捷指令: https://www.icloud.com/shortcuts/31e3a877cec340a48192aa081e25c05e
*/

var body = $response.body;
if ($request.url.indexOf('/user/check_sign') != -1) {
    let json = JSON.parse(body);
    json.data.is_new_sign = false;
    body = JSON.stringify(json);
} else {
    body = body.replace("UDown", 'XXXXXXXXX'); // 使重定向判断条件失效
    let clearJS = `<script type="text/javascript">
    $(function(){
        function actionSheetAction(index) {
            if (index == 4) { return; }
            $.ajax({
                url: '/web/lixian/?ct=lixian&ac=task_clear',
                dataType: 'json',
                data: {flag: index},
                type: 'POST',
                cache: false,
                success: function (r) {
                    window.location.reload();
                },
                error: function(){
                    console.log('清空失败');
                }
            });
        }
        function clearAction() { 
            OOFJS.common.actionSheet('选择清空的操作', ['清空已完成任务', '清空全部任务', '清空失败任务', '清空进行中任务'], actionSheetAction);
        }
        setTimeout(function(){OOFJS.common.addRightBarItem('清空', clearAction);}, 200);
    });
    </script>`
    body = body.replace("</body>", clearJS + '\n</body>'); // 注入清空任务相关JS
}
$done({body});
