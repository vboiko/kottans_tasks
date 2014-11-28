// var q = require('q');
// var def = q.defer();

// def.promise.then(console.log);
// setTimeout(def.resolve, 300, "RESOLVED!");

// var q = require('q');
// var def = q.defer(); 

// function error(e){
// 	console.log(e);
// }
// def.promise.then(error);
// setTimeout(def.reject, 300, error("REJECTED!"));

// var q = require('q');
// var def = q.defer();
// def.promise.then(console.log, console.log);
// def.resolve('I FIRED');
// def.reject('I DID NOT FIRE');

// var q = require('q');
// var def = q.defer();
// def.promise.then(console.log);
// def.resolve("SECOND");
// console.log("FIRST");

// var q = require('q');
// var def = q.defer();
// function attachTitle (name) {
// 	return "DR. " + name;
// }
// def.promise.then(attachTitle).then(console.log);
// def.resolve("MANHATTAN");

// var q = require('q');
// var def = q.defer();
// function parsePromised(json){
// 	var result;
// 	try {
// 		result = JSON.parse(json);
// 	} catch(e) {
// 		def.reject(e);
// 	}
// 	def.resolve(result);
// 	return def.promise;
// }
// parsePromised(process.argv[2])
// .then(null, console.log)
// var q = require('q');

// q.fcall(JSON.parse, process.argv[2])
// .then(null, console.log)
// var q = require('q');
// function throwMyGod(){
// 	throw new Error("OH NOES");
// }
// function iterate(num) {
// 	console.log(num);
// 	return ++num;
// }
// q.fcall(iterate, 1)
// .then(iterate)
// .then(iterate)
// .then(iterate)
// .then(iterate)
// .then(throwMyGod)
// .then(iterate)
// .then(iterate)
// .then(iterate)
// .then(iterate)
// .then(iterate)
// .then(null, console.log);
var q = require('q')
  , def1 = q.defer()
  , def2 = q.defer();

function all (prom1, prom2) {
  var groupDef = q.defer()
    , counter = 0
    , val1
    , val2;

  prom1
  .then(function (result) {
    val1 = result;
    ++counter;
    if (counter >=2) groupDef.resolve([val1, val2]);
  })
  .then(null, groupDef.reject)
  .done();

  prom2
  .then(function (result) {
    val2 = result;
    ++counter;
    if (counter >=2) groupDef.resolve([val1, val2]);
  })
  .then(null, groupDef.reject)
  .done();

  return groupDef.promise;
}

all(def1.promise, def2.promise)
.then(console.log)
.done();

setTimeout(function () {
  def1.resolve("PROMISES");
  def2.resolve("FTW");
}, 200);