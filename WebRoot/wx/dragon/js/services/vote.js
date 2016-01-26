/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.factory("voteService",["user","$http",function(user,$http){
		return {
				vote:function(id,username){
					if(user.getOpenid()){
						return $http({
							method:"POST",
							url:"api/vote/save.jsp",
							data:"id="+id+"&openid="+user.getOpenid()+"&access_token="+user.getAccessToken()+"&username="+username
						});
					}
					return null;
				}
		}
	}])
});
