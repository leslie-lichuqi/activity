define(['jquery'],function ($) {
	function Share(data,wxCallbacks){
		this._init();
	}
	
	Share.prototype = {
		_init:function(){
			$.get("/ywtx/res/WXShare/getInitData.jsp",function(r){
				console.log(r);
			})
		}
	}
	
	return {
        Share:Share
    }
});
