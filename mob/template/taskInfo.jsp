<%@ page contentType="text/html;charset=UTF-8" language="java" %><!DOCTYPE html><html lang="en" ng-app="baidu"><head><meta name="viewport" content="width=device-width,user-scalable=no,user-scalable=0,inital-scale=1.0"><meta http-equiv="Content-Type" content="text/html" charset="utf-8"><meta name="format-detection" content="telephone=no"><script language="javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script></head></html><title>任务详情</title><link href="/static/public/css/taskInfo.css" rel="stylesheet" type="text/css"><script src="/static/public/js/taskInfo.min.js" language="javascript"></script><body ng-controller="TaskInfoCtrl" ng-cloak><section id="header" ng-show="submitView==false"><div ng-if="(commun_count&gt;1&amp;&amp;task.data.type==3)||(commun_count&gt;1&amp;&amp;task.data.type==4)" class="check_tab clearfix"><!--div.first(class="{{tab1_active}}",ng-click="showOther()") {{ tab1 }}--><!--div.second(class="{{tab2_active}}",ng-click="showOther()") {{ tab2 }}--><!--div.more(ng-if="commun_count > 2")--><div ng-repeat="i in tab track by $index" class="more-menu"><div ng-if="active==i.num" ng-click="show_other( i.num )" class="commun_names active"> <div ng-if="i.rel==1" class="name"> <span class="tuan">团 </span><span class="name">{{ i.name }}</span></div><div ng-if="i.rel!=1" class="name">{{ i.name }}</div></div><div ng-if="active!=i.num" ng-click="show_other( i.num )" class="commun_names"><div ng-if="i.rel==1" class="name"> <span class="tuan">团 </span><span class="name">{{ i.name }}</span></div><div ng-if="i.rel!=1" class="name">{{ i.name }}</div></div></div></div><div class="right-coner-div"></div><div ng-if="taskState=='已领取'" class="right-coner"><div style="background:url(&quot;/static/public/image/already-receive.png&quot;)" class="stamp"></div></div><div ng-if="taskState=='已提交'" class="right-coner"><div style="background:url(&quot;/static/public/image/already-submit.png&quot;)" class="stamp"></div></div><div ng-if="taskState=='已驳回'" class="right-coner"><div style="background:url(&quot;/static/public/image/already-confuse.png&quot;)" class="stamp"></div></div><div ng-if="taskState=='已评奖'" class="right-coner"><div src="/static/public/image/already-prize.png" class="stamp"></div><div style="background:url(&quot;/static/public/image/already-prize.png&quot;)" class="stamp"></div></div><div ng-if="taskState=='已过期'" class="right-coner"><div style="background:url(&quot;/static/public/image/already-expire.png&quot;)" class="stamp"></div></div><div ng-if="taskState=='已通过'" class="right-coner"><div style="background:url(&quot;/static/public/image/already-pass.png&quot;)" class="stamp"></div></div><div class="title">{{ task.data.name }}</div><div class="task-info clearfix"><div class="end-time">{{ task.data.endDate }}</div><div ng-if="task.data.type==1" class="line-type clearfix">线上</div><div ng-if="task.data.type==3" class="line-type clearfix">线上</div><div ng-if="task.data.type==2" class="line-type clearfix">线下</div><div ng-if="task.data.type==4" class="line-type clearfix">线下</div><div ng-if="task.data.type==3" class="type clearfix">社团</div><div ng-if="task.data.type==4" class="type clearfix">社团</div><div ng-if="task.data.type==1" class="type clearfix">个人</div><div ng-if="task.data.type==2" class="type clearfix">个人</div></div><!--div.banner//img(ng-src="{{ task.data.resourceUrl }}",onerror="this.src='http://placehold.it/375x170'")--><div ng-bind-html="trustHtml()" class="desc"></div><section class="price-bar"><div ng-click="add_fans()" class="right-text clearfix"><div ng-show="like==0" style="background:url('/static/public/image/hot-up-icon.png')" class="hot-icon clearfix"></div><div ng-show="like==1" style="background:url('/static/public/image/hot-up-icon-active.png')" class="hot-icon clearfix"></div><div class="hot-text clearfix">赞({{ likeNum }})</div></div></section></section><section id="task" ng-if="task.data.prizeData"><span class="green"></span><span>奖励详情</span><div class="prize-data"><div ng-repeat="p in task.data.prizeData" class="prize-data-detail clearfix"><div ng-if="p.prizeType==1" class="prize-line">{{ p.prizeLevel }} {{ p.prize }}</div><div ng-if="p.prizeType==2" class="prize-line">{{ p.prizeLevel }} {{ p.prize }}&nbsp;积分</div></div></div></section><section class="task-condition"><span class="green"></span><span>任务条件</span><div ng-if="task.data.condition" class="task-text">{{ task.data.condition }}</div><div ng-if="!task.data.condition" class="task-text">恭迎各路神仙鬼怪😊，只要你敢来，我们就敢给 </div></section><section ng-if="taskState=='已评奖'&amp;&amp;show_task_prize_list" class="score"><div class="prize-icon"></div><span>获奖列表</span><div class="score-sheet"><div ng-repeat="m in taskPrizeList.data.list track by $index" class="score-list clearfix"><div class="line clearfix"><div class="prize-icon"></div><div ng-if="m.communityName&amp;&amp;m.prizeScore" class="name">{{ m.communityName }}获得{{ m.prizeScore }}&nbsp;积分</div><div ng-if="m.communityName&amp;&amp;m.prizeName" class="name">{{ m.communityName }}获得{{ m.prizeName }}</div><div ng-if="m.userName&amp;&amp;m.prizeScore" class="name">{{ m.userName }}获得{{ m.prizeScore }}&nbsp;积分</div><div ng-if="m.userName&amp;&amp;m.prizeName" class="name">{{ m.userName }}获得{{ m.prizeName }}&nbsp;积分</div></div></div></div><div ng-click="prize_show_more()" ng-show="prize_more_show==true" class="show_more">查看更多</div></section><section ng-if="taskState!='已评奖'&amp;&amp;show_scoreRanking" class="score-apply clearfix"><div class="apply-icon"></div><span>申请列表</span><div class="score-list clearfix"><div ng-repeat="m in scoreRanking.data.list track by $index" class="line clearfix"><div ng-if="m.communityName" class="name clearfix">{{ m.communityName }}</div><div ng-if="m.userName" class="name clearfix">{{ m.userName}}</div></div></div><div ng-click="apply_show_more()" ng-show="apply_more_show==true" class="show_more">查看更多</div></section><div class="placehold-footer"></div><div class="bottom-bar"><button ng-show="taskState=='已领取'" class="baidu-btn submit-task grey"><span>任务已领取，请耐心等候审核</span></button><button ng-click="getTask()" ng-if="taskState=='未领取'" class="baidu-btn submit-task"><span>领取任务</span></button><button ng-if="(isWxTask==1&amp;&amp;taskState=='已通过')||(isWxTask==1&amp;&amp;taskState=='已通过'&amp;&amp;reltype!=0&amp;&amp;reltype!=4)" ng-click="wxForward();" class="baidu-btn submit-task"><span>点击转发任务</span></button><button ng-if="isWxTask==2&amp;&amp;((task.data.type==1&amp;&amp;taskState=='已通过')||(task.data.type==3&amp;&amp;taskState=='已通过'&amp;&amp;reltype!=0))" ng-click="submitTask();" class="baidu-btn submit-task"><span>{{ submitTextOnline }}</span></button><button ng-click="getQrcode()" ng-if="((task.data.type==4&amp;&amp;taskState=='已通过'&amp;&amp;reltype!=0&amp;&amp;reltype!=4)||(task.data.type==2&amp;&amp;taskState=='已通过'))&amp;&amp;isWxTask==2" class="baidu-btn submit-task"><span>点击获取二维码</span></button></div><div ng-show="alert==true" class="alert-menu base {{ alertClass }}"><div class="message">{{ taskMessage }}</div><div ng-click="iknow()" class="know"><a href="javascript:;">我知道了</a></div></div><div ng-show="submitView==true" class="submit-task-view base pull-up"><div class="add-file"><div class="add-title">添加文件</div><div href="javascript:;" ng-click="backTask()" class="pull-right clear back-link">返回</div><form method="post" id="form" role="form" enctype="multipart/form-data"><div class="add-area"><div ng-repeat="i in previews" style="{{ i.image }}" class="preview"></div><div ng-click="fileAdd()" class="file-add"></div><input hidden name="taskStatusId" value="{{ taskStatusId }}"><input ng-repeat="i in image_files" name="file" type="file" file-upload id="add-image-{{ i }}" class="add-image"></div></form></div><div ng-click="form_submit()" class="submit-btn">{{ submitText }}</div></div></body>