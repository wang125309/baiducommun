<%@ page contentType="text/html;charset=UTF-8" language="java" %><!DOCTYPE html><html lang="en" ng-app="baidu"><head><meta name="viewport" content="width=device-width,user-scalable=no,user-scalable=0,inital-scale=1.0"><meta http-equiv="Content-Type" content="text/html" charset="utf-8"><meta name="format-detection" content="telephone=no"><script language="javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script></head></html><link href="/static/public/css/index.css" rel="stylesheet" type="text/css"><script src="/static/public/js/index.min.js" language="javascript"></script><title>任务中心</title><body ng-controller="MainCtrl" ng-cloak ng-init="showMenu=false;"><div ng-show="tip.show" ng-click="clickTipFrame()" ng-if="inputQQ!=true" class="tip-frame"><div ng-if="inputQQ!=true" class="tip-menu"><div class="message clearfix"><div class="tip-text-left"></div><div class="tip-text-center">{{ tip.message }}</div><div class="tip-text-right"></div></div><div ng-show="tip.btnline==true" class="btn-line clearfix"><div ng-click="tip.sure()" ng-if="tip.mine!=true" class="left-btn">确定</div><div ng-click="tip.sure()" ng-if="tip.mine==true" class="left-btn">{{ tip.sure_btn }}</div><div ng-click="tip.cancel()" class="right-btn">取消</div></div></div><div ng-if="inputQQ==true" class="tip-menu qq-menu"><div class="message clearfix"><div class="tip-text-left"></div><div ng-if="inputQQ!=true" class="tip-text-center">{{ tip.message }}</div><div ng-if="inputQQ==true" class="tip-text-center"> <div style="margin-left:5vw;" class="qqname">新QQ</div><input type="text" class="qq"></div><div class="tip-text-right"></div></div><div ng-show="tip.btnline==true" class="btn-line clearfix"><div ng-click="tip.sure()" ng-if="tip.mine!=true" class="left-btn">确定</div><div ng-click="tip.sure()" ng-if="tip.mine==true" class="left-btn">{{ tip.sure_btn }}</div><div ng-click="tip.cancel()" class="right-btn">取消</div></div></div></div><div ng-show="tip.show" ng-if="inputQQ==true" class="tip-frame"><div ng-if="inputQQ!=true" class="tip-menu"><div class="message clearfix"><div class="tip-text-left"></div><div class="tip-text-center">{{ tip.message }}</div><div class="tip-text-right"></div></div><div ng-show="tip.btnline==true" class="btn-line clearfix"><div ng-click="tip.sure()" ng-if="tip.mine!=true" class="left-btn">确定</div><div ng-click="tip.sure()" ng-if="tip.mine==true" class="left-btn">{{ tip.sure_btn }}</div><div ng-click="tip.cancel()" class="right-btn">取消</div></div></div><div ng-if="inputQQ==true" class="tip-menu qq-menu"><div class="message clearfix"><div class="tip-text-left"></div><div ng-if="inputQQ!=true" class="tip-text-center">{{ tip.message }}</div><div ng-if="inputQQ==true" class="tip-text-center"> <div class="qqname">新QQ</div><input type="text" class="qq"></div><div class="tip-text-right"></div></div><div ng-show="tip.btnline==true" class="btn-line clearfix"><div ng-click="tip.sure()" ng-if="tip.mine!=true" class="left-btn">确定</div><div ng-click="tip.sure()" ng-if="tip.mine==true" class="left-btn">{{ tip.sure_btn }}</div><div ng-click="tip.cancel()" class="right-btn">取消</div></div></div></div><section id="header" class="clearfix"><div id="head" class="clearfix"><div id="part" class="head-tab"><div class="text-area-wrap"><div ng-click="changeCommun($event)" class="text-pos commun-tab">社团任务</div></div></div><div id="person" class="head-tab"><div class="text-area-wrap"><div ng-click="changePerson($event)" class="text-pos person-tab">个人任务</div></div></div><div is-open="status.isopen"><div id="pull-down-filter" ng-click="toggleDropdown()"></div><div id="pull-down-filter-menu" role="menu" ng-show="status.isopen==true" class="base"><div class="arrow"></div><div id="time" ng-click="order_by_time()" class="clearfix"><div id="time-icon"></div><div id="time-text">时间</div></div><div id="hot" ng-click="order_by_hot()" class="clearfix"><div id="hot-icon"></div><div id="hot-text">热度</div></div></div></div></div></section><section id="work"><div infinite-scroll="loadMore()" scroll-threshold="200" time-threshold="600" class="work"><div ng-if="task_empty==true" class="work-wrap-empty"></div><div ng-repeat="t in task.data | orderBy:order_by" ng-click="getTaskInfo(t.id)" class="work-wrap"><div style="background:url({{t.resourceUrl}})" class="work-image"></div><div class="bar"><div class="title clearfix"><div class="task_name">{{ t.name }}</div><div ng-if="t.score" class="total_score">{{ t.score }}&nbsp;积分</div></div><div class="desc">{{ t.description | noHtmltag }}</div></div><div ng-if="t.type==1" class="line-end clearfix"><div class="type">个人线上</div><div class="finish-text">{{ t.finishNum }}</div><div class="icon-finish"></div><div class="hot-text">{{ t.likeNum }}</div><div class="icon-hot"></div></div><div ng-if="t.type==2" class="line-end clearfix"><div class="type">个人线下</div><div class="finish-text">{{ t.finishNum }}</div><div class="icon-finish"></div><div class="hot-text">{{ t.likeNum }}</div><div class="icon-hot"></div></div><div ng-if="t.type==3" class="line-end clearfix"><div class="type">团队线上</div><div class="finish-text">{{ t.finishNum }}</div><div class="icon-finish"></div><div class="hot-text">{{ t.likeNum }}</div><div class="icon-hot"></div></div><div ng-if="t.type==4" class="line-end clearfix"><div class="type">团队线下</div><div class="finish-text">{{ t.finishNum }}</div><div class="icon-finish"></div><div class="hot-text">{{ t.likeNum }}</div><div class="icon-hot"></div></div></div></div></section></body><div class="placehold-footer"></div><section id="footer"><div ng-if="activeTab=='task'" style="background:url('/static/public/image/task-select.png') no-repeat;" ng-click="goIndex()" class="task-btn footer-div"></div><div ng-if="activeTab!='task'" ng-click="goIndex()" class="task-btn footer-div"></div><div ng-click="toggleFooterMenuDropDown()" ng-if="activeTab=='commun'" style="background:url('/static/public/image/commun-select.png') no-repeat;" class="commun-btn footer-div"><div is-open="footerMenu.isopen" ng-show="footerMenu.isopen==true" class="plat-form-menu base"><div class="arrow"></div><div ng-repeat="c in communs.data" class="menu-line"><div ng-click="goCommunDetail($event,{{ c.id }})">{{ c.name }}</div></div><div class="menu-line"><div ng-click="goCommunField($event)">创建/加入社团</div></div></div></div><div ng-if="activeTab!='commun'" ng-click="toggleFooterMenuDropDown()" class="commun-btn footer-div"><div is-open="footerMenu.isopen" ng-show="footerMenu.isopen==true" class="plat-form-menu base"><div class="arrow"></div><div ng-repeat="c in communs.data" class="menu-line"><div ng-click="goCommunDetail($event,{{ c.id }})">{{ c.name }}</div></div><div class="menu-line"><div ng-click="goCommunField($event)">创建/加入社团</div></div></div></div><div ng-click="goMy()" ng-if="activeTab=='my'" style="background:url('/static/public/image/my-select.png') no-repeat" class="my-btn footer-div"></div><div ng-click="goMy()" ng-if="activeTab!='my'" class="my-btn footer-div"></div></section>