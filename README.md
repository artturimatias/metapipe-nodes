# metapipe-nodes


## Scripts
Metapipe nodes are JavaScript objects that contain scripts. 

### hello
Script is called *before* node is inserted to database. Therefore it is possible to set for example node's title in this stage .

    var sizes = ['','','','small','', 'medium','', 'original'];
    context.node.title = sizes[context.node.params.size] + ' ' + context.node.title;
    out.say('news', 'You added a node');

###bye
This is called when node is deleted. Chanche say by to the user.

    out.say('news', 'Deleted node. Bye!'); 

###login
Upload nodes must provide login script. It will pass required login information to Metapipe (usually username, passwd and url).

###url
Lookup nodes must provide request url by setting **out.url**.

    var base_url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes';
    var format = '&format=json&nojsoncallback=?';
    out.url = base_url + '&photo_id=' + context.doc[context.node.params.field] + format + '&api_key=' + context.node.settings.apikey

###init
Init script is called once when running node.

    out.say('progress', 'Starting replacing..');
    /* set output field */
    out.field = context.node.params.out_field; 

###run
Run script is executed once per record (excluding source nodes). By setting **out.value** node can save the result of its operation.

Flickr lookup node:

    out.say('progress', context.data.photo.title._content); 
    if(context.data.stat != 'fail') {
        out.value = context.data.photo;
    } else {
        out.say('error', 'request failed!');
    }

### finish
This is called when every record has been processed. 

    out.say('finish', 'Replace done!');


## In what context scripts operate?


When node scripts are executed (via vm.runInNewContext), an context object is passed to a node. Here is what it contains:



* **context.doc**

    Contains current record. Properties of the record can be accessed normally. 

    For example, the title of the record: 


        var title = context.doc.title;

* **context.data**

    For API nodes (API source and API lookup) context.data holds the request response. 

* **context.node**

    Contains node object itself (params and settings).

* **context.doc_count**

    Contains total record count.

* **context.count**

    Contains loop counter (i.e. how many records have been processed).


----
## How about output?

Nodes communicate with outer world via "out" object.

* **out.url**

    Some nodes (like API lookup) must provide URL.

* **out.value**

    This is what is stored to database. It can be an object
    
* **out.say**

    This allows node to communicate directly to the user via websocket. Following styles are available:
 
    * hello

    * news

    * progress

    * error

    * finish


    out.say("progress", "processed 200 of 234");

    

## views
Nodes have three different kind of views. View consists of HTML and possible javascript.

* **params**

    params view is displayed to the user when s/he *creates* a node. Values user inserts are then strored to the node in a form params.input_name.

    So, if you have an input named "prefix" in params view, the value is then later accessible in node scripts via context object like this:

        var pre = context.node.params.prefix;

* **settings**

    settings view is displayed to user when the node is selected in a project view. 

    If node has input named "separator" in settings view, the value is then later accessible in node scripts via context object like this:

        var sep = context.node.settings.separator;

* **data_static**

    data_static allows node to set a static data view. This is useful when the structure of the data is known. For example, data queried from API has certain kind of structure.
