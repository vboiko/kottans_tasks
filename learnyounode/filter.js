 var fs = require('fs')

 module.exports = function filter(path, ext, callback){
	fs.readdir(path, function(err, list) {
		if(err){ return callback(err); }
		var result = [];
		list.forEach(function(el, i){
			if(el.split('.')[1] == ext) {
				result.push(el);
			}
		})
		callback(null, result);

	});
}