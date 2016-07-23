
var c = context; 
out.url = context.base_url + context.doc[context.in_field]; 
var filename = ""; 

/* create file name */ 
if (c.node.params.filename_type == "url") {  
    var split = out.url.split("/"); 
    filename = split[split.length-1]; 

} else if (c.node.params.filename_type == "record") {  
    filename = c.doc[c.node.params.filename__record]; 

} else if (c.node.params.filename_type == "own") {  
	filename = c.node.params.file__1; 
	filename += c.get(c.doc, c.node.params.file__2); 
	filename += c.node.params.file__3; 
	filename += c.get(c.doc, c.node.params.file__4); 
	filename += c.node.params.file__5; 
	filename += c.get(c.doc, c.node.params.file__6); 
	if(c.node.params.counter == "yes") 
	   filename += c.count; 
}

/* static file extension */ 
if (c.node.params.file__ext != "") {
    var ext = c.node.params.file__ext.replace(".", ""); 
    filename += "." + ext; 
}

/* fallback */ 
if (filename == "") 
    filename = c.count; 

/* remove characters that might confuse OS */ 
filename = filename.replace(/[\/]/g, "_"); 
 
out.file = filename; 


/* TODO: fix url check */ 
if(out.url == null || typeof out.url === "undefined" || out.url == "") { 
    out.say("progress", "URL not found!"); 
    out.url = "http://localhost/"; 
} else 
    out.say("progress", "starting to download:" + out.url); 

