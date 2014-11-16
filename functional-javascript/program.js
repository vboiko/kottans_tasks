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
    countMap[word] = ++countMap[word] || 1 // increment or initialize to 1
    return countMap
  }, {}) // second argument to reduce initialises countMap to {}
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
  // SOLUTION GOES HERE
}

module.exports = logger
