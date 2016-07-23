
if(context.error == null) {
	out.value = context.path.join(context.node.dir, out.file); 
	out.say('progress', 'server said: ' + context.response.statusCode); 
	out.say('progress', 'server said: ' + context.response.headers['content-type']); 
	var len = parseInt(context.response.headers['content-length'], 10); 
	var total = len / 1048576; 
	out.say('progress', 'Downloaded ' + total.toFixed(2) + ' Mt'); 
	context.node.download_counter++;
} else 
    out.say('error', context.error); 

