(function($) {
	jQuery.fn.wordbox = function(options) {
			var eleid = options,			
			defaultcss = '<style type="text/css">.sbox_main{display:none;width:300px;height:250px;background-color:#333333;opacity:0.8;position:absolute;top:50%;left:50%;margin-top:-200px;margin-left:-150px;}.sbox_head{width:100%;height:30px;background-color:#333;position:relative;}.sbox_head span{margin-left:10px;line-height:25px;color:#fff;font-size:16px;font-family:"隶书";}.sbox_head a{font-size:22px;line-height:25px;font-family:Arial,Helvetica,sans-serif;text-decoration:none;position:absolute;right:0px;color:#fff;width:35px;height:30px;background-color:#F25331;text-align:center;}.sbox_head a:hover{background-color:red;color:#000;font-size:26px;}.sbox_content{width:280px;height:200px;margin-left:5px;margin-top:5px;background-color:#FFF;position:relative;font-family:Verdana,Geneva,sans-serif,"宋体","隶书";font-size:14px;line-height:25px;padding:5px 5px;}.sbox_content span{position:absolute;text-align:left;top:20px;width:200px;left:80px;}.sbox_foot{position:absolute;right:5px;bottom:10px;width:70px;height:30px;}.sbox_foot a{position:absolute;width:70px;height:25px;border:1px solid #333;font-size:16px;text-decoration:none;color:#000;font-family:"隶书";text-align:center;}.sbox_foot a:hover{border-color:#F00;font-size:18px;}</style>',
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
			$(document.body).append(defaultcss);
			$(document.body).append(defaulthtml);
		}
		
		set_num();
		$("#sbox_main").show(500);
	};
	
})(jQuery);
function close_sbox(){
	$("#sbox_main").hide(500);
}