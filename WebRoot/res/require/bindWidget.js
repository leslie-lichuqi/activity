define(['jquery'],function($){
	function Widget(){
		this.box = null; //属性：最外层容器
		this.handlers={};
	}
	Widget.prototype={
		on:function(type,handler){
			if (typeof this.handlers[type]=='undefined') {
				this.handlers[type]=[];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data){
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for(var i=0,len=handlers.length;i<len;i++){
					handlers[i](data);
				}
			};
		},
		render:function(container){		//方法：渲染组件
			this.renderUI();
			this.bindUI();
			$(container||document.body).append(this.box);
		},
		destroy:function(){		 //方法：渲染组件
			this.destructor();
			this.box.remove();
		},
		renderUI:function(){},	//接口：添加dom节点
		bindUI:function(){},	//接口：监听事件
		syncUI:function(){},	//接口：初始化组件属性
		destructor:function(){} //接口：销毁前的处理函数
	}
	return{
		Widget:Widget
	}
})