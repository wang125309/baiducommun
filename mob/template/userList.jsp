<%@ page contentType="text/html;charset=UTF-8" language="java" %><!DOCTYPE html><html lang="en" ng-app="baidu"><head><meta name="viewport" content="width=device-width,user-scalable=no,user-scalable=0,inital-scale=1.0"><meta http-equiv="Content-Type" content="text/html" charset="utf-8"><meta name="format-detection" content="telephone=no"><script language="javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script></head></html><link href="/static/public/css/userList.css" rel="stylesheet" type="text/css"><script src="/static/public/js/userList.min.js" language="javascript"></script><body ng-controller="userListCtrl" ng-cloak><section id="header" class="clearfix"><div id="head" class="clearfix"><div id="part" class="head-tab"><div class="text-area-wrap"><div ng-click="tabMember()" class="text-pos active">社团成员</div></div></div><div id="person" ng-if="relType==1||relType==3" class="head-tab"><div class="text-area-wrap"><div ng-click="tabNew()" class="text-pos {{ new }}">新的成员</div><div ng-if="applyments!=0" class="new-member"> </div></div></div></div></section><section id="body" ng-show="show_members==true" class="base"><div id="user-list" class="clearfix"><div ng-repeat="u in communMembers.data" class="user"><div ng-if="isNewMember(u.id)" class="red-dot"></div><div ng-if="relType!=0&amp;&amp;relType!=2&amp;&amp;u.position_id!=1" ng-click="delete_user(u.id,u.nickname)" class="close-icon"></div><div style="background:url({{ u.image }}) no-repeat;background-position:center;background-size:cover;" class="avatar-img"></div><div class="user-name">{{ u.nickname }}</div></div></div></section><div ng-show="alert.show==true" class="alert-menu base {{ alert.alertClass }}"><div class="message clearfix"><div class="alert-text-left">{{ alert.alerttextLeft }}</div><div class="alert-text-center">{{ alert.alerttextCenter }}</div><div class="alert-text-right">{{ alert.alerttextRight }}</div></div><div class="btn-line clearfix"><div ng-click="alert.sure()" class="left-btn">确定</div><div ng-click="alert.cancel()" class="right-btn">取消</div></div></div><section id="body-new" ng-show="show_members==false&amp;&amp;(relType==1||relType==3)" class="base"><div id="apply-list"><div ng-repeat="i in applyList.data" class="apply clearfix"><div class="avatar"><div style="background:url({{ i.image }}) no-repeat;background-position:center;background-size:cover;" class="avatar-img"></div></div><div class="detail"><div class="name-line">{{ i.nickname }}</div><div class="score-line">{{ i.score }} &nbsp;积分</div></div><div class="button-area"><button ng-click="receiveMember(i.id)" class="baidu-btn">接受</button></div><div class="button-area"><button ng-click="refuseApply(i.id)" class="baidu-btn">拒绝</button></div></div></div></section><div ng-show="show_members==false&amp;&amp;show_pass==true&amp;&amp;(relType==1||relType==3)" ng-click="pass_all_member()" class="baidu-btn pass">一键通过所有成员</div></body>