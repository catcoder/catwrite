// JavaScript Document
$(document).ready(function(e) {
    change_left_list_height();
	$("#oneline").click(function(){
		change_left_show();
	});
	
	$(document).keydown(function(event){
		dokey(event);
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
});

$(window).resize(function(){
	change_left_list_height();
});

function change_left_list_height(){
	$("#l_list").css("height",$(window).height() - 48);
	$("#edit_area").css("height",$("#l_list").height() - 65);
	$("#edit_control").css("height",$("#edit_area").height() - 35);
	$("#edittext").css("width",$("#edit_area").width() - 20);
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
	$("#edittext").css("width",$("#edit_area").width() - 20);
}

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
		$("#edittext").css("width",$("#edit_area").width() - 20);
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
		$("#edittext").css("width",$("#edit_area").width() - 20);
		$("#edit_control").css("margin-top","0px");
		$("#header").css("display","block");
		$("#toolbar").css("display","block");
	}
}
//按键事件
function dokey(event){
	event = event ? event : ((window.event) ? window.event : "");
	if(event.keyCode == 27){
		fullscreen();
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

//另存为
function saveas(){
	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem; //文件系统请求标识
	window.requestFileSystem(window.TEMPORARY, 5*1024*1024, initFS, errorHandler);
}

function initFS(fs){
  fs.root.getDirectory('Documents', {create: true}, function(dirEntry) {
 	 alert('You have just created the ' + dirEntry.name + ' directory.');
}, errorHandler); 
}

function errorHandler(err){
  var msg = 'An error occured: ';

  switch (err.code) {
    case FileError.NOT_FOUND_ERR:
      msg += 'File or directory not found';
      break;

    case FileError.NOT_READABLE_ERR:
      msg += 'File or directory not readable';
      break;

    case FileError.PATH_EXISTS_ERR:
      msg += 'File or directory already exists';
      break;

    case FileError.TYPE_MISMATCH_ERR:
      msg += 'Invalid filetype';
      break;

    default:
      msg += 'Unknown Error';
      break;
  };
alert(msg);
 console.log(msg);
} 

//统计字数
function wordnum(){
	var words = $("#edittext").val();
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
	$("#edittext").wordbox("#edittext");
}

//快速排版
function fast_typesetting(){
	var content = $("#edittext").val();	
	content = content.replace(/^\s*|([ ]{4,}|\t+)/gm,"    ");
	content = content.replace(/^([ ]{4,}|\t+)/gm, "    ");
	content = content.replace(/[\n\r]+/ig,"\n\n");	
	$("#edittext").val(content).focus();
}

function send_email(){
}

//创建标题
function create_file_title(){
	var titlenum = $("#title_list").find("li").length;
	titlenum++;
	var newtitle = '<li id="list_$"><input type="text" id="txtname_$" value=""/><a title="编辑" href="javascript:void(0)" class="rename" onclick="edit_title(this)"></a></li>';
	newtitle = newtitle.replace(/[$]/g, titlenum);
	$("#title_list").append(newtitle);
	$("#list_" + titlenum).mouseover(function(){show_edit(this);}).mouseleave(function(){hide_edit(this);});
	$("#list_" + titlenum).find("input").focus().blur(function() {
        $(this).attr("disabled", "disabled");
    });
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