/*
提取115中的视频使用nPlayer进行播放

[Script]
http-request ^http:\/\/.*\.115\.com\/.*\.m3u8.*$ requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/115tonplayer.js,script-update-interval=0
*/
$notification.post('播放地址提取成功, 长按(重按)通知查看', '',  'nplayer-' + $request.url);
$done({}); 
