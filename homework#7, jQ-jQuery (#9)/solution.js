var myQuery, my_$;

(function() {

    myQuery = my_$ = function(selector) {
        return new MyQuery(selector);
    };

    var MyQuery = function(selector) {
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            this[i] = nodes[i];
        }
        this.length = nodes.length;
        return this;
    };

    myQuery.fn = MyQuery.prototype = {
        width: function(px) {
        	if(typeof px === 'undefined'){
        		var arr = [];
	        	for (var i = 0; i < this.length; i++) {
	        		arr.push(this[i].style.width ? this[i].style.width : '0px');
	        	}
	        	return arr;
        	} else {
        		for (var i = 0; i < this.length; i++) {
	        		this[i].style.width = px;
	        	} 
	        	return this;
        	}
        	
        },
        height: function(px) {
        	if(typeof px === 'undefined') {
        		var arr = [];
	        	for (var i = 0; i < this.length; i++) {
	        		arr.push(this[i].style.height ? this[i].style.height : '0px');
	        	}
	        	return arr;
        	} else {
        		for (var i = 0; i < this.length; i++) {
        			this[i].style.height = px;
        		}
        		return this;
        	}
        	
        }, 
        css: function(key, val) {
        	if(Object.prototype.toString.call(key) === '[object String]') {
        		for (var i = 0; i < this.length; i++) {
        			this[i].style[key] = val;
        		}
        		return this;
        	} else {
        		var k = Object.keys(key);
        		for(var i = 0; i < k.length; i++) {
        			for(var j = 0; j < this.length; j++) {
        				this[j].style[k[i]] = key[k[i]];
        			}
        		}
        		return this;
        	}
        }
    };

}());
