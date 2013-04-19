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
	
	create_file_title("默认文件");
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
function create_file_title(title){
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