<%@page import="com.activity.DAO.ActUserDAO"%>
<%@page import="com.activity.DAO.ActUser"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.activity.DAO.ActBang"%>
<%@page import="com.activity.DAO.ActBangDAO"%>
<%@page import="com.activity.DAO.ActRedpack"%>
<%@page import="com.activity.DAO.ActRedpackDAO"%>
<%@ page language="java"
	import="java.util.*,java.io.*"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html ng-app="app">
  <head>
    <title>龙牡杯</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<!-- <meta name="viewport" content="width=device-width,user-scalable=no" /> -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<meta http-equiv="expires" content="0">
	<meta name="apple-touch-fullscreen" content="yes">
	<meta name="format-detection" content="telephone=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta http-equiv="expires" content="-1">
	<meta charset="utf-8"/>
	<link rel="stylesheet" href="/activity/res/bootstrap-3.3.4/css/bootstrap.min.css" type="text/css"></link>
  </head>
  <body ng-controller="redpackController">
	<div class="container">
		<div class="row">
			<div class="col-md-12" style="height:700px;overflow: auto;">
				<table class="table  table-bordered">
					<tr>
						<td>编号</td>
						<td>用户名</td>
						<td width="50px">金额</td>
						<td>龙牡体</td>
						<td width="200px">公司</td>
						<td width="200px">日期</td>
						<td width="100px">状态</td>
						<td width="200px">操作</td>
					</tr>
					<% 
						String index = request.getParameter("index")==null?"0":request.getParameter("index");
						ActRedpackDAO d = new ActRedpackDAO();
						ActBangDAO d2 = new ActBangDAO();
						ActUserDAO d3 = new ActUserDAO();
						List l = d.search(Integer.valueOf(index), 100, " order by id desc");
						List l2 =null;
						JSONArray ja = new JSONArray();
						for(int i=0;i<l.size();i++){
							ActRedpack b = (ActRedpack) l.get(i);
							ActUser b1 =  d3.findById(b.getUserid());
							JSONObject jo = new JSONObject();
							jo.put("redpack", b);
							jo.put("user", b1);
							l2 = d2.findByUserid(b.getUserid());
							if(!l2.isEmpty()){
								ActBang b2 = (ActBang)l2.get(0);
								jo.put("bang", b2);
							}
							ja.add(jo);
						}
					%>
					<tr ng-repeat="bean in list" ng-class="{'1':'bg-success','-1':'bg-warning','-2':'bg-danger'}[bean.redpack.state]">
						<td ng-bind="bean.redpack.id"></td>
						<td ng-bind="bean.redpack.username"></td>
						<td ng-bind="bean.redpack.prize"></td>
						<td ng-bind="bean.bang.bang"></td>
						<td ng-bind="bean.user.company"></td>
						<td ng-bind="bean.redpack.createdate.time|date: 'yyyy-MM-dd hh:mm:ss'"></td>
						<td ng-bind="getState(bean.redpack.state)"></td>
						<td ><button ng-disabled="bean.redpack.state == 1" style="margin-right: 10px;" class="btn btn-success" ng-click="sendRedpack(bean.redpack.id,bean)">发红包</button><button ng-disabled="bean.redpack.state == 1" class="btn btn-danger" ng-click="noPass(bean.redpack.id,bean)">审批不通过</button></td>
					</tr>
				</table>
			</div>
			<div class="col-md-12 text-center">
					<pagination ng-change="pageChanged()" total-items="pagination.bigTotalItems" 
					ng-model="pagination.bigCurrentPage" max-size="pagination.maxSize" 
					class="pagination-feature pagination-sm" boundary-links="true" 
					num-pages="pagination.numPages"></pagination>
			</div>
		</div>
	</div>
		
	<script type="text/javascript" src="/activity/res/framework/angular-1.4.3/angular.min.js"></script>
	<script type="text/javascript" src="/activity/res/framework/bootstrap/ui-bootstrap-tpls.js"></script>
	<script type="text/javascript">
	console.log(angular);
		angular.module("app",["ui.bootstrap"])
		.constant('paginationConfig', {
		  itemsPerPage: 100,
		  boundaryLinks: false,
		  directionLinks: true,
		  firstText: '首页',
		  previousText: '上一页',
		  nextText: '下一页',
		  lastText: '末页',
		  rotate: true
		})
		.controller("redpackController",["$scope","$http",function($scope,$http){
			$scope.id ;
			$scope.msg;
			$scope.save = function(){
				$scope.msg ="正在提交请稍等....";
				$http({
					method:"GET",
					url:"api/lottery/sendRedpack.jsp",
					params:{
						id:$scope.id
					}
				})
				.success(function(data){
					$scope.msg =data.msg;
				});
			};
			$scope.pagination = {
					maxSize:15,
					bigCurrentPage:<%=index%>,
					bigTotalItems:<%=d.RecordCount%>
			};
			$scope.list = <%=ja%>;
			console.log($scope.list);
			$scope.pageChanged = function(){
				window.location.href = "?index="+$scope.pagination.bigCurrentPage;
			};
			$scope.getState = function(state){
				var map ={
					"-2":"审批不通过",
					"-1":"发送失败（余额不足或用户拦截红包）",
					"0":"未审批",
					"1":"发送成功",
					"-3":"正在发送中，请稍后.."
				};
				return map[state]?map[state]:"未知错误";
			};
			$scope.sendRedpack = function(id,bean){
				bean.redpack.state = -3;
				doChangeState(id,"1")
				.success(function(data){
					if(data.state ==200){
						bean.redpack.state = data.bean.state;
					}else{
						
					}
				});
			};
			$scope.noPass = function(id,bean){
				bean.redpack.state = -3;
				doChangeState(id,"-2")
				.success(function(data){
					if(data.state ==200){
						bean.redpack.state = -2;
					}else{
						
					}
				})
			};
			
			var doChangeState = function(id,state){
				return $http({
					method:"GET",
					url:"api/lottery/redpackapi.jsp",
					params:{
						id:id,
						state:state
					}
				})
			}
		}]);
	</script>
  </body>
</html>
