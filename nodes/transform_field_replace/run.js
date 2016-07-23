
if(context.doc[context.node.params.in_field]) {
   var value = context.doc[context.node.params.in_field]; 
   if(value.constructor.name != "Array") { 
      for (var i=0; i < context.node.settings.search.length; i++) { 
         var reg = new RegExp(context.node.settings.search[i], "g"); 
         if(value !== null) {
             if( typeof value === "string") {
                 value = value.replace(reg, context.node.settings.replace[i]);
             } else if (value.constructor.name === "Array") {
                 for (j = 0; j < value.length; j++) { 
                     value[j] = value[j].replace(reg, context.node.settings.replace[i]); 
                 }
             }
         }
      }
   out.value = value;
   } else { 
        out.say("error", "Sorry, can not process arrays..."); 
    }
} else { 
   out.say("error", "Field not found"); 
}

