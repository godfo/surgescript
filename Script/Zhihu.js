/*
知乎简化去广告

[Rule]
USER-AGENT,AVOS*,REJECT-TINYGIF
URL-REGEX,https://www.zhihu.com/api/v4/mcn/,REJECT-TINYGIF
URL-REGEX,https://api.zhihu.com/(ab|adx|drama|fringe|zst|commercial|ad-style-service|market/popover|search/(top|tab|preset)|.*(guide|recommendations|extended|featured-comment-ad)),REJECT-TINYGIF
AND,((USER-AGENT,osee2*), (NOT,((DOMAIN-SUFFIX,zhihu.com))), (NOT,((DOMAIN-SUFFIX,zhimg.com)))),REJECT-TINYGIF

[MITM]
hostname = www.zhihu.com, api.zhihu.com

[Script]
http-response ^https?:\/\/api\.zhihu\.com\/(moments\?(action|feed_type)|topstory\/recommend|.*\/questions|market\/header|people) requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/wubulaba/surgescript/master/Script/Zhihu.js,script-update-interval=0
*/

const path1 = "/moments?";
const path2 = "/topstory/recommend";
const path3 = "/questions/";
const path4 = "/market/header";
const path5 = "/people";

let url = $request.url;
let body = JSON.parse($response.body);

if (url.indexOf(path1) != -1) {
  body['data'].forEach((element, index) => {
    if (element.hasOwnProperty('adjson')) {
      body['data'].splice(index, 1);
    }
  })
}

if (url.indexOf(path2) != -1) {
  body['data'].forEach((element, index) => {
    if (element['card_type'] == "slot_event_card" || element.hasOwnProperty('ad')) {
      body['data'].splice(index, 1);
    }
  })
}

if (url.indexOf(path3) != -1) {
  delete body['ad_info'];
  body['data'].forEach((element, index) => {
    if(element['author']['name']=="盐选推荐"||element['author']['name']=="盐选科普"){
      body['data'].splice(index, 1);
    }
  })
}

if (url.indexOf(path4) != -1) {
  body['sub_webs'].splice(0, 1);
  body['sub_webs'].splice(1, 1);
}

if (url.indexOf(path5) != -1) {
  delete body['mcn_user_info'];
}

$done({
  body: JSON.stringify(body)
})
