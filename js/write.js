// JavaScript Document
var isChrome = true;

$(document).ready(function(e) {
	//判断浏览器
	if(navigator.userAgent.toLowerCase().indexOf("chrome") <= 0){
		if(confirm("你使用的是非Chrome浏览器，无法使用本机保存功能。请注意备份！\r\n\n强烈建议你使用Chrome浏览器，可在Google中搜索Chrome！\r\n\n点击确定将跳转至Chrome页面，点击取消直接关闭。")){
			window.location = "http://www.google.com/chrome/";
		}
		isChrome = false;
	}
	
	window.onbeforeunload = function()
	{
		   return ('离开页面可能造成数据的丢失！');
	}
	
    change_left_list_height();
	
	//显示隐藏左侧列表
	$("#oneline").click(function(){
		change_left_show();
	});
	
	$(document).keydown(function(event){
		dokey(event);
	});
	$(document).keypress(function(event){
		dokey_press(event);
	});
	$("#sendto").mouseover(function(){
		$("#sendto ul").css({
			"left":$("#sendto").position().left,
			"display":"block"
		});
	});
	
	$("#sendto").mouseleave(function(){
		$("#sendto ul").css("display","none");
	});
	
	$("#title_list li").mouseover(function(){
		show_edit(this);
	});
	
	$("#title_list li").mouseleave(function(){
		hide_edit(this);
	});
	
	if(isChrome){
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem; //文件系统请求标识
		window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL;
		
		loadfiles();
	}else{
		create_file_title("默认文件","");
	}
});

$(window).resize(function(){
	change_left_list_height();
});

function change_left_list_height(){
	$("#l_list").css("height",$(window).height() - 48);
	$("#edit_area").css("height",$("#l_list").height() - 65);
	$("#edit_control").css("height",$("#edit_area").height() - 35);
	$($("#txtid").val()).css("width",$("#edit_area").width() - 20);
}

function change_left_show(){
	if($("#l_list").css("display") == "block"){
		$("#l_list").css("display","none");
		$("#oneline").css("left","2px");
		$("#oneline").css("background","url(img/br.png) 0px 50% no-repeat");
		$("#r_edit").css("margin-left","12px");
	}else{
		$("#l_list").css("display","block");
		$("#oneline").css("left","213px");
		$("#oneline").css("background","url(img/bl.png) 0px 50% no-repeat");
		$("#r_edit").css("margin-left","225px");
	}
	$($("#txtid").val()).css("width",$("#edit_area").width() - 20);
}

//全屏编辑
function fullscreen(){
	if($("#r_edit").attr("class") == "core"){
		$("#r_edit").removeClass("core");
		$("#r_edit").addClass("core_fs");
		$("#r_edit").css({
			"width":$(window).width(),
			"height":$(window).height()	
		});
		$("#edit_area").removeClass("edit_area");
		$("#edit_area").addClass("edit_area_fs");
		$($("#txtid").val()).css("width",$("#edit_area").width() - 20);
		$("#edit_control").css("margin-top","20px");		
		$("#header").css("display","none");
		$("#toolbar").css("display","none");
	}else{
		$("#r_edit").removeClass("core_fs");
		$("#r_edit").addClass("core");
		$("#r_edit").css({
			"width":"auto",
			"height":"100%"	
		});
		$("#edit_area").removeClass("edit_area_fs");
		$("#edit_area").addClass("edit_area");
		$($("#txtid").val()).css("width",$("#edit_area").width() - 20);
		$("#edit_control").css("margin-top","0px");
		$("#header").css("display","block");
		$("#toolbar").css("display","block");
	}
}
//按键事件
function dokey(event){
	event = event ? event : ((window.event) ? window.event : "");
	var src = event.srcElement || event.target;
	
	var src_id = src.getAttribute("id");
	
	
	if(event.keyCode == 27){
		fullscreen();
	}else if(event.keyCode == 116){
		alert("为了防止数据丢失，本页面屏蔽了F5的刷新。");
		event.keyCode=0;
		event.cancelBubble = true;
		if ( event && event.preventDefault ) 
			event.preventDefault(); 
		else
			window.event.returnValue = false;

		return false;
	}else if(event.keyCode == 120){ //F9
		//详细统计
		if($("#sbox_main").length > 0){
			if($("#sbox_main").css("display") == "block"){
				close_sbox();
			}else{
				show_word_count();
			}
		}else{
			show_word_count();
		}
	}else if(event.keyCode == 121){  //F10快速排序
		fast_typesetting();
	}	
}
//按键后事件
function dokey_press(event){
	event = event ? event : ((window.event) ? window.event : "");
	var src = event.srcElement || event.target;
	
	var src_id = src.getAttribute("id");
	if(src_id.indexOf("txtname_") == 0 && event.keyCode == 13){
		$("#" + src_id).attr("disabled", "disabled");
		$($("#txtid").val()).focus();
		var obj = document.getElementById($("#txtid").val().substr(1));
		
		obj.scrollTop = obj.scrollHeight;
		obj.selectionStart = obj.value.length;
		return false;
	}
}
function sendto_sub(){
	return false;
}

//统计字数
function wordnum(){
	var words = $($("#txtid").val()).val();
	var num = 0,tmp = "";
	for(i = 0;i < words.length;i++){
		tmp = words.charAt(i);
		if(tmp.match(/\s/) == null){
			num++;
		}
	}
	
	$("#editinfo").text(words.length+"/"+num);
}

function show_word_count(){
	$($("#txtid").val()).wordbox($("#txtid").val());
}

//快速排版
function fast_typesetting(){
	var content = $($("#txtid").val()).val();	
	content = content.replace(/^\s*|([ ]{4,}|\t+)/gm,"    ");
	content = content.replace(/^([ ]{4,}|\t+)/gm, "    ");
	content = content.replace(/[\n\r]+/ig,"\n\n");	
	$($("#txtid").val()).val(content).focus();
}

function send_email(){
}

//创建标题
function create_file_title(title, content){
	var titlenum = $("#title_list").find("li").length;
	titlenum++;
	var newtitle = '<li id="list_$" num="$"><input type="text" id="txtname_$" value=""/><a title="编辑" href="javascript:void(0)" class="rename" onclick="edit_title(this)"></a></li>';	
	
	newtitle = newtitle.replace(/[$]/g, titlenum);
	$("#title_list").append(newtitle);	
	
	var newlist = $("#list_" + titlenum);
	newlist.mouseover(function(){show_edit(this);}).mouseleave(function(){hide_edit(this);});
	
	//新创建的标题高亮
	$("#title_list input").each(function(index) {
        $(this).css("border-color","#333");			
    });	
	
	newlist.find("input").focus().blur(function() {
        $(this).attr("disabled", "disabled");
    }).css("border-color","#C60");
	
	//点击标题切换高亮和编辑区域
	newlist.click(function(e) {
		$("#title_list input").each(function(index) {
            $(this).css("border-color","#333");			
        });		
		
		$("#edit_control").find("textarea").each(function(index, element) {
			$(this).css("display", "none");
		});	
		
        $(this).find("input").css("border-color","#C60");
		
		$("#edittext_" + $(this).attr("num")).css("display", "block");
		$("#txtid").val("#edittext_" + $(this).attr("num"));
    });
	
	if(title != ""){
		newlist.find("input").val(title);
	}
		
	//增加编辑区
	var newedit = '<textarea wrap="virtual" onkeyup="wordnum()" id="edittext_$" class="edit_main"></textarea>';
	newedit = newedit.replace("$", titlenum);
	
	$("#edit_control").find("textarea").each(function(index, element) {
        $(this).css("display", "none");
    });
	$("#edit_control").append(newedit);	
	$("#edittext_" + titlenum).css("width",$("#edit_area").width() - 20);
	$("#edittext_" + titlenum).val(content);
	$("#txtid").val("#edittext_" + titlenum);
}

function show_edit(ele){
	if($(ele).find("input").attr("disabled") == "disabled"){
		$(ele).find("a").css("display","block");
		$(ele).css("cursor","default");
	}
}

function hide_edit(ele){
	$(ele).find("a").css("display","none");
	$(ele).css("cursor","pointer");
}
//编辑标题
function edit_title(ele){
	$(ele).prev().attr("disabled",false).focus();
	hide_edit($(ele).parent());
}

function aboutcat(){
	$(this).aboutcat();
}

function show_msg(msg, col){
	$("#show_msg").text(msg).css("color", col);
	
	$("#show_msg").show(1000);
	$("#show_msg").hide(1000);
}