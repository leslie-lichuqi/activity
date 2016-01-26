define(['jquery','bindWidget'],function($,w){
	function Window(data){
		this.cfg = {
			title:'信息提示',
			message:'正在加载中...',
			text4alert:"确定",
			btn:'确定',
			cancel:'取消',
			calback:null,
			className:"",
			timeout:1000,
			loadingImage:null,
			cssLink:"/ywtx/res/css/jquery.loadWidget-leslie.css"
		}
		this.cfg = $.extend(this.cfg,data);
		//document.write('<link rel="prefetch" href="/ywtx/res/css/jquery.loadWidget-leslie.css">');
	}
	
	Window.prototype = $.extend({},new w.Widget(), {
		renderUI:function(){
			switch (this.cfg.winType){
				case 'alert':
					this.box = $('<div id="alertDiv" class="'+this.cfg.className+'" ><div class="wrap"><p class="alertTitle">'+this.cfg.title+'</p><p class="alertContent">'+this.cfg.message+'</p><p class="alertBtn">'+this.cfg.text4alert+'</p></div></div>');
					$("body").append(this.box);
					break;
				case 'load':
					var src = this.cfg.loadingImage ==null?"/ywtx/res/css/img/n_loading.gif":this.cfg.loadingImage;
					this.box = $('<div class="leslie-load-container"  class="'+this.cfg.className+'"><div id="loadingDiv" ><img src="'+src+'"/><p>'+this.cfg.message+'</p></div></div>');
					$("body").append(this.box);
					break;
				case 'confirm':
					this.box = $('<div id="alertDiv"  class="'+this.cfg.className+'"><div class="wrap"><p class="alertTitle">'+this.cfg.title+'</p><p class="alertContent">'+this.cfg.message+'</p><div><p class="confirmBtn">'+this.cfg.btn+'</p><p class="cancelBtn">'+this.cfg.cancel+'</p><div style="clear:both"></div></div></div></div>');
					$("body").append(this.box);
					break;
				case 'message':
					$("body").append('<div id="messageDiv"  class="'+this.cfg.className+'"><p>'+this.cfg.message+'</p></div>');
					var that = this;
					self.setTimeout(function(){
						$("#messageDiv").remove();
						if(that.cfg.calback){
							that.cfg.calback();
						}
					},that.cfg.timeout);
					break;
				case 'share':
					this.box = $('<div id="leslie-share-container"  class="'+this.cfg.className+'"></div>');
					$("body").append(this.box);
					$("#leslie-share-container").click(function(){
						$(this).remove();
					})
					break;
				default:
					break;
			}
		},
		bindUI:function(){
			var that = this;
			if(this.box){
				this.box.delegate(".alertBtn","click",function(){
					that.fire("alert");
					that.destroy();
				}).delegate(".confirmBtn","click",function(){
					that.fire("confirm",true);
					that.destroy();
				}).delegate(".cancelBtn","click",function(){
					that.fire("confirm",false);
					that.destroy();
				})
			}
		},
		alert:function(cfg){
			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;
		},
		load:function(isShow,cfg){
			$.extend(this.cfg,cfg,{winType:'load'});
			if(isShow){
				this.render();
			}else{
				this.destroy();
			}
			return this;
		},
		message:function(cfg,cal){
			$.extend(this.cfg,cfg,{winType:'message',calback:cal});
			this.render();
			return this;
		},
		share:function(isShow){
			$.extend(this.cfg,{winType:'share'});
			if(isShow){
				this.render();
			}else{
				this.destroy();
			}
			return this;
		}
	})
	
	return{
		lWindow:Window
	}
});
