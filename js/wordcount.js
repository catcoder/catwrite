(function($) {
	jQuery.fn.wordbox = function(options) {
			var eleid = options,
			defaulthtml = '<div class="sbox_main" id="sbox_main"><div class="sbox_head"><span>字数统计</span><a href="javascript:void(0)" onclick="close_sbox()">x</a></div><div class="sbox_content"><span>字数：<label id="zishu"></label><br />汉字：<label id="hanzi"></label><br />字母：<label id="zimu"></label><br />数字：<label id="shuzi"></label><br />字符：<label id="zifu"></label><br /></span><div class="sbox_foot"><a href="javascript:void(0)" onclick="close_sbox()">确 定</a></div></div></div>',		
			set_num = function(){
				var Words = $(eleid).val();
				var hanzi = 0;
				var zifu = 0;
				var biaodian = 0;
				var zimu = 0;
				var shuzi = 0;
				for (var i = 0; i < Words.length; i++) {
					var c = Words.charAt(i);
					if (c.match(/[\u4e00-\u9fa5]/) == null) {
						if (c.match(/[0-9]/) != null) {
							shuzi++;
						}else if(c.match(/[,，.。!@#$%^&*()-=_+￥~·`;':"<>/?]/) != null){
							zifu++;
						}else if (c.match(/[a-zA-Z]/) != null) {
							zimu++;
						}
					}else{
						hanzi++;
					}
				}
				$("#zishu").text(Words.length);
				$("#hanzi").text(hanzi);
				$("#zimu").text(zimu);
				$("#shuzi").text(shuzi);
				$("#zifu").text(zifu);
				
		};
		
		if($("#sbox_main").length <= 0){
			$(document.body).append(defaulthtml);
		}
		
		set_num();
		$("#sbox_main").show(500);
	};
	
})(jQuery);
function close_sbox(){
	$("#sbox_main").hide(500);
}