function upperCaser(input) {
	return input.toUpperCase();
}

module.exports = upperCaser;

function repeat(operation, num) {
	if (num > 0) {
		operation()
		return repeat(operation, --num)
	}
}

module.exports = repeat;

function doubleAll(numbers) {
  return numbers.map(function(num) {
	  return num * 2;
	});
}

module.exports = doubleAll;

function getShortMessages(messages) {
	return messages.filter(function(item) {
	  return item.message.length < 50
	}).map(function(item) {
	  return item.message
	})
}

module.exports = getShortMessages;

function checkUsersValid(goodUsers) {
	return function(submittedUsers) {
	  return submittedUsers.every(function(submittedUser) {
	    return goodUsers.some(function(goodUser) {
	      return goodUser.id === submittedUser.id
	    })
	  })
	}
}

module.exports = checkUsersValid;

function countWords(inputWords) {
  return inputWords.reduce(function(countMap, word) {
    countMap[word] = ++countMap[word] || 1
    return countMap
  }, {})
}

module.exports = countWords;

function reduce(arr, fn, initial) {
	if(!arr.length) return initial;
	initial = fn(initial, arr[0]);
	return reduce(arr.slice(1), fn, initial)
}
    
module.exports = reduce;

function duckCount() {
	return Array.prototype.slice.call(arguments).filter(function(obj) {
		return Object.prototype.hasOwnProperty.call(obj, 'quack')
	}).length
}

module.exports = duckCount;

var slice = Array.prototype.slice
    
function logger(namespace) {
	return function() {
		console.log.apply(console, [namespace].concat(slice.call(arguments)))
	}
}

module.exports = logger;

module.exports = function(namespace) {
	return console.log.bind(console, namespace);
}

module.exports = function arrayMap(arr, fn) {
	return arr.reduce(function(initial, current, index, array){
		return initial.concat(fn(current, index, array));
	}, []);
}

function Spy(target, method) {
	var previousFunc = target[method];
	var result = {count: 0};
	target[method] = function(){
		result.count++;
		return previousFunc.apply(this, arguments);
	}
	return result;
}

module.exports = Spy;

function repeat(operation, num) {
	if (num <= 0) return
	operation()
	setTimeout(function(){
		return repeat(operation, --num)
	}, 1500)	
}

module.exports = repeat

function repeat(operation, num) {
  return function(){
  	if (num <= 0) return
  	operation()
  	return repeat(operation, --num)
  }
}

function trampoline(fn) {
	while(fn && typeof fn === 'function'){
		fn = fn();
	}
}

module.exports = function(operation, num) {
	trampoline(function(){
		return repeat(operation, num)
	})      
}

function loadUsers(userIds, load, done) {
	var completed = 0,
		users = [];
	userIds.forEach(function(id, i){
		load(id, function(user){
			users[i] = user;
			completed++
			if(completed === userIds.length) return done(users)
		})
	}); 
	return users
}

module.exports = loadUsers;

function getDependencies(tree, result) {
	result = result || [];
	var dependencies = tree.dependencies || [];
	Object.keys(dependencies).forEach(function(one_dep){
		var key = one_dep + '@' + tree.dependencies[one_dep].version;
		if(result.indexOf(key) == -1) result.push(key)
		getDependencies(tree.dependencies[one_dep], result);
	});
	return result.sort();
}
    
module.exports = getDependencies;

function curryN(fn, n) {
	if (typeof n !== 'number') n = fn.length
	function getCurriedFn(prev) {
		return function(arg) {
			var args = prev.concat(arg)
			if (args.length < n) return getCurriedFn(args)
			else return fn.apply(this, args)
		};
	}
	return getCurriedFn([])
}

module.exports = curryN;

module.exports = Function.prototype.call.bind(Array.prototype.slice);


