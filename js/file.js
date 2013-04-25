//加载本机保存的文件
function loadfiles(){
	window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.PERSISTENT, //the type can be either TEMPORARY or PERSISTENT
		function(used, remaining) {
			if(remaining == ""){
				window.webkitStorageInfo.requestQuota(PERSISTENT, 5*1024*1024, function(grantedBytes) {
					window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
				}, function(e) {
					console.log('Error', e);
				});
				create_file_title("默认文件", "");
			}else{
				console.log("Used quota: " + used + ", remaining quota: " + remaining);
				var url = "filesystem:http://" + window.location.host + "/persistent/catwrite_documents/";
				window.resolveLocalFileSystemURL(url,function(fileEntry){					
					console.log(fileEntry);
					var dirReader = fileEntry.createReader();
					
					var readEntries = function(){
						dirReader.readEntries(function(results){
							if(!results.length){
								create_file_title("默认文件", "");
								console.log("没有文件！");
							}else{
								console.log("读取到" + results.length + "个文件");
								for(var i = 0; i < results.length; i++){
									console.log(results[i].name);
									getFileContentByName(fileEntry, results[i].name);
									
								}
							}
						},errorHandler);
					};
					readEntries();
				},errorHandler);
			}
		}, function(e) {
			console.log('Error', e); 
		} );
}

function  getFileContentByName(fe,name){	
	fe.getFile("/catwrite_documents/" + name,{}, function(fileEntry){
		
		fileEntry.file(function(file){
			var reader = new FileReader();
			
			reader.onloadend = function(e){
				name = name.substring(0, name.lastIndexOf("."));
				console.log("nameStr", name);
				create_file_title(name, this.result);
			};
			
			reader.readAsText(file);
		});
		
	},errorHandler)
}
//保存文件
function saveas(){	
	var url = "filesystem:http://" + window.location.host + "/persistent/catwrite_documents/";
	window.resolveLocalFileSystemURL(url,function(fileEntry){					
		fileEntry.getFile(getSelectTitle() + ".txt", {create:true,exclusive:false}, function(fn){
			fn.createWriter(function(fileWriter){
				fileWriter.onwriteend = function(e){
					console.log("写入文件完毕");
					show_msg("保存成功！", "#0F3");
				};
				
				fileWriter.onerror = function(e){
					console.log("wirte failed:" + e);
					show_msg("保存失败！", "red");
				};
				
				var content = [$($("#txtid").val()).val()];
				var bb = new Blob(content, {"type" : 'text/plain'});
				fileWriter.write(bb);
			},errorHandler);
		},function(e){
			console.log("error", e);
		});
		console.log(fs.fullPath);
	},function(e){
		console.log("error", e);
	});
}
//初始化时创建文件夹
function onInitFs(fs){
  fs.root.getDirectory('catwrite_documents', {create: true}, function(dirEntry) {
 	 console.log('You have just created the ' + dirEntry.name + ' directory.');
}, errorHandler); 
}

//错误回调
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
 console.log(msg + err);
} 
//获取正在编辑的文章的标题
function getSelectTitle(){
	return $("#txtname_" + $("#txtid").val().substr(10)).val();
}

//删除文件
function removeFile(name){
	var url = "filesystem:http://" + window.location.host + "/persistent/catwrite_documents/" + name;
	window.resolveLocalFileSystemURL(url,function(fileEntry){					
		console.log("获得文件", fileEntry);
		fileEntry.remove(function(){
			console.log("删除文件", name);
		},errorHandler);
	},function(e){
		console.log("error", e);
	});
}

//导出文件到本地
function lead_out(){
	var filename = getSelectTitle() + ".txt";
	var URL = URL || webkitURL || window;
		
	var content = [$($("#txtid").val()).val()];
	var bb = new Blob(content, {"type" : 'text/plain'});
		
	var url = URL.createObjectURL(bb);
	var savelink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	savelink.href = url;
	savelink.download = filename;
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	savelink.dispatchEvent(event);
		
	console.log(savelink);
	URL.revokeObjectURL(url);
}