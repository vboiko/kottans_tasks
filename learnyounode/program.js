// console.log("HELLO WORLD")

// var num = 0
// for (var i = 2; i < process.argv.length; i++) {
// 	num += parseInt(process.argv[i]) 
// }
// console.log(num);

 // var fs = require('fs')
 // var buf = fs.readFileSync(process.argv[2])
 // var str = buf.toString().split('\n').length - 1;
 // console.log(str)

 // var fs = require('fs')
 // fs.readFile(process.argv[2],
 // function callback (err, data) {
 // 	if(err){
 // 		return err;
 // 	}
 // 	console.log(data.toString().split('\n').length - 1);
 // })

// var filter = require('./filter.js')

// filter(process.argv[2], process.argv[3], function (err, list) {
//   if (err)
//     return console.error('There was an error:', err)
//     console.log(list.join('\n'))
// })

// var http = require('http');
// http.get(process.argv[2], function callback (response) {
// 	response.setEncoding('utf8')
// 	response.on('data', console.log)
// 	response.on('error', console.error)
// });

// var http = require('http');
// var bl = require('bl');
// http.get(process.argv[2], function callback (response) {
// 	response.pipe(bl(function (err, data) {
// 		if (err) return console.error(err)
//     	data = data.toString()
// 		console.log(data.length);
// 		console.log(data);
// 	}))
// });

// var http = require('http');
// var bl = require('bl');
// var result = []
// http.get(process.argv[2], function callback (response) {
// 	response.pipe(bl(function (err, data) {
// 		if (err) return console.error(err)
//     	data = data.toString()
//     	result.push(data)

//     	http.get(process.argv[3], function callback (response) {
// 			response.pipe(bl(function (err, data) {
// 				if (err) return console.error(err)
// 		    	data = data.toString()
// 		    	result.push(data)

// 		    	http.get(process.argv[4], function callback (response) {
// 					response.pipe(bl(function (err, data) {
// 						if (err) return console.error(err)
// 				    	data = data.toString()
// 				    	result.push(data)
// 				    	console.log(result.join('\n'))
// 					}))
// 				});
// 			}))
// 		});
// 	}))
// });

// var net = require('net')

// function zeroFill(i) {
//   return (i < 10 ? '0' : '') + i
// }

// function now () {
//   var d = new Date()
//   return d.getFullYear() + '-'
//     + zeroFill(d.getMonth() + 1) + '-'
//     + zeroFill(d.getDate()) + ' '
//     + zeroFill(d.getHours()) + ':'
//     + zeroFill(d.getMinutes())
// }

// var server = net.createServer(function (socket) {
//   socket.end(now() + '\n')
// })

// server.listen(Number(process.argv[2]))

// var http = require('http')
// var fs = require('fs')

// var server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain' })

//   fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))

// var http = require('http')
// var map = require('through2-map')

// var server = http.createServer(function (req, res) {
//   if (req.method != 'POST')
//     return res.end('send me a POST\n')

//   req.pipe(map(function (chunk) {
//     return chunk.toString().toUpperCase()
//   })).pipe(res)
// })

// server.listen(Number(process.argv[2]))

var http = require('http')
var url = require('url')

function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime : time.getTime() }
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)
  var result

  if (/^\/api\/parsetime/.test(req.url))
    result = parsetime(time)
  else if (/^\/api\/unixtime/.test(req.url))
    result = unixtime(time)

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))