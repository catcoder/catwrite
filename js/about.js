(function($) {
	jQuery.fn.aboutcat = function() {
			defaulthtml = '<div class="sbox_main" id="about_catwrite" style="height:350px;"><div class="sbox_head"><span>关于CatWrite</span><a href="javascript:void(0)" onclick="close_sbox_about()">x</a></div><div class="sbox_content" style="height:300px;"><span style="left:20px">感谢你的使用，catwrite是一个完全免费的旨在方便写作和保存的项目，你的任何建议和回馈对我们都是最大的支持。<br/><br/>联系邮箱：mn@catcoder.com<br/><br/>参与者（按加入时间排序）：<br/><a href="http://www.catcoder.com" target="_block">CatCoder</a></span><div class="sbox_foot"><a href="javascript:void(0)" onclick="close_sbox_about()">确 定</a></div></div></div>';	
			
		if($("#about_catwrite").length <= 0){
			$(document.body).append(defaulthtml);
		}
		
		$("#about_catwrite").show(500);
	};
	
})(jQuery);
function close_sbox_about(){
	$("#about_catwrite").hide(500);
}