var jQuery = function(selector,context){
    return new $.fn.init(selector,context);
}

jQuery.fn = jQuery.prototype = {
    jquery:"0.0.1",
    constructor:jQuery,
    init:function(selector,context){
        context = context || document;
        if(typeof selector === "string"){
            if(/(^\<[^\>]*\/?\>$|^\<[^\>]*\>[^\<]+\<\/[^\>]*\>$)/.test(selector)){
                var div = document.createElement("div");
                div.innerHTML = selector;
                var children = div.childNodes,
                    len = children.length;
                for(var i = 0;i < len;i++){
                    this[i] = children[i];
                }
                this.length = len;
            }else{
                if(selector.indexOf(":") > -1){
                    var filter = selector.split(":")[1];
                    selector = selector.split(":")[0];
                }
                if(context.length && context.length > 1){
                    var n = 0;
                    for(var i = 0,len = context.length;i < len;i++){
                        var doms = context[i].querySelectorAll(selector);
                        for(var j = 0;j < doms.length;j++){
                            this[n++] = doms[j];
                        }
                    }
                    this.length = n;
                }else{
                    var doms = context.querySelectorAll(selector),
                        len = doms.length;
                    for(var i = 0;i < len;i++){
                        this[i] = doms[i];
                    }
                    this.length = len;
                }
                this.context = document;
                this.prevObject = context;
                if(filter){
                    return this[filter]();
                }
            }
        }else if(typeof selector === "function"){
            selector();
        }else if(selector.constructor === $){
            return selector;
        }else{
            if(selector.length && selector.length > 0){
                for(var i = 0;i < selector.length;i++){
                    this[i] = selector[i];
                }
                this.length = selector;
            }else{
                this[0] = selector;
                this.length = 1;
            }
            this.context = selector;
        }
    },
    addClass:function(className){
        if(typeof className === "function"){
            for(var i = 0;i < this.length;i++){
                var cn = className(i,this[i].className);
                if(typeof cn === "string"){
                    this[i].className += " " + cn;
                }
            }
        }else if(typeof className === "string"){
            for(var i = 0;i < this.length;i++){
                this[i].className += " " + className;
            }
        }
        return this;
    },
    animate:function(opt,time,callback){

    },
    attr:function(key,value){
        if(key && this.length > 0){
            if(value){
                for(var i = 0;i < this.length;i++){
                    this[i].setAttribute(key,value);
                }
                return this;
            }else{
                return this[0].getAttribute(key);
            }
        }else{
            return this;
        }
    },
    css:function(key,value){
        if(typeof key === "object"){
            for(var k in key){
                for(var i = 0;i < this.length;i++){
                    this[i].style[k] = key[k];
                }
            }
            return this;
        }else{
            if(value){
                for(var i = 0;i < this.length;i++){
                    this[i].style[key] = value;
                }
                return this;
            }else if(this.length > 0){
                return this[0].style[key];
            }else{
                return this;
            }
        }
    },
    eq:function(index){
        if(!isNaN(parseInt(index))){
            return $(this[index]);
        }else{
            return this;
        }
    },
    filter:function(selector){

    },
    find:function(selector){
        return $(selector,this);
    },
    first:function(){
        return this.length > 0 ? this.eq(0) : this;
    },
    hasClass:function(className){
        for(var i = 0;i < this.length;i++){
            if((" " + this[i].className + " ").indexOf(" " + className + " ") > -1){
                return true;
            }
        }
        return false;
    },
    is:function(selector){
        return this.filter(selector).length > 0;
    },
    last:function(){
        return this.length > 0 ? this.eq(this.length - 1) : this;
    },
    map:function(callback){
        var arr = [];
        for(var i = 0;i < this.length;i++){
            arr.push(callback(this[i]));
        }
        return arr;
    },
    removeClass:function(className){
        if(typeof className === "function"){
            for(var i = 0;i < this.length;i++){
                var cn = className(i,this[i].className);
                if(typeof cn === "string"){
                    this[i].className = (" " + this[i].className + " ").replace(" " + cn + " "," ");
                    this[i].className = this[i].className.trim();
                }
            }
        }else if(typeof className === "string"){
            for(var i = 0;i < this.length;i++){
                this[i].className = (" " + this[i].className + " ").replace(" " + className + " "," ");
                this[i].className = this[i].className.trim();
            }
        }
        return this;
    }
}
jQuery.fn.init.prototype = jQuery.fn;
var $ = jQuery;
Array.prototype.map = Array.prototype.map || function(fn){
    var arr = [];
    for(var i = 0;i < this.length;i++){
        arr.push(fn(this[i]));
    }
    return arr;
}
Array.prototype.filter = Array.prototype.filter || function(fn){
    var arr = [];
    for(var i = 0;i < this.length;i++){
        if(fn(this[i])){
            arr.push(this[i]);
        }
    }
    return arr;
}
Array.prototype.every = Array.prototype.every || function(fn){
    for(var i = 0;i < this.length;i++){
        if(!fn(this[i])){
            return false;
        }
    }
    return true;
}
Array.prototype.some = Array.prototype.some || function(fn){
    for(var i = 0;i < this.length;i++){
        if(fn(this[i])){
            return true;
        }
    }
    return false;
}
Array.prototype.forEach = Array.prototype.forEach || function(fn){
    for(var i = 0;i < this.length;i++){
        fn(this[i]);
    }
}
Array.prototype.reduce = Array.prototype.reduce || function(fn,initialValue){
    initialValue = initialValue || 0;
    for(var i = 0;i < this.length;i++){
        initialValue = fn(initialValue,this[i]);
    }
    return initialValue;
}
Array.prototype.reduceRight = Array.prototype.reduceRight || function(fn,initialValue){
    initialValue = initialValue || 0;
    for(var i = this.length - 1;i >= 0;i--){
        initialValue = fn(initialValue,this[i]);
    }
    return initialValue;
}
String.prototype.trim = String.prototype.trim || function(){
    var str = this;
    if(str.length > 0){
        while(str.length > 0 && str[0] === " "){
            str = str.substring(1,str.length);
        }
        while(str.length > 0 && str[str.length - 1] === " "){
            str = str.substring(0,str.length - 1);
        }
    }
    return str;
}
// var Promise = function(fn){
//     this.statue = "pending";
//     this.resolveList = [];
//     this.rejectList = [];
//     var promise = this;
//     function resolve(value){
//         setTimeout(function() {
//             promise.status = "fulfilled";
//             promise.resolveList.forEach(function(callback){
//                 callback(value);
//             });
//         },0)
//     }
//     function reject(value){
//         setTimeout(function() {
//             promise.status = "rejected";
//             promise.rejectList.forEach(function(callback){
//                 callback(value);
//             });
//         },0)
//     }
//     fn(resolve,reject);
// }
// Promise.prototype.then = function(callback){
//     if(this.statue === "pending"){
//         this.resolveList.push(callback);
//     }else if(this.statue === "fulfilled"){
//         callback(value);
//     }
//     return this;
// }
// Promise.prototype.catch = function(callback){
//     if(this.statue === "pending"){
//         this.rejectList.push(callback);
//     }else if(this.statue === "rejected"){
//         callback(value);
//     }
//     return this;
// }