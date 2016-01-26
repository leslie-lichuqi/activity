/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.factory("user",["$cookieStore","$rootScope",function($cookieStore,$rootScope){
		var _user = null;
		var _code = null;
		
		return {
				setUser:function(user){
					_user = user;
					$rootScope.user = user;
					$cookieStore.put("user",user);
				},
				getUser:function(){
					if(!_user){
						return $cookieStore.get("user");
					}
					return _user;
				},
				setCode:function(code){
					_code = code;
				},
				getCode:function(){
					return code;
				},
				getOpenid:function(){
					if(_code){
						return _code.openid;
					}
					return null;
				},
				getAccessToken:function(){
					if(_code){
						return _code.access_token;
					}
					return null;
				},
				logout:function(){
					$rootScope.user = null;
					$cookieStore.put("user",null);
				}
		}
	}])
});
