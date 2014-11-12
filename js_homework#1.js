var a = {b: 'c', d: {e: 'f'}},
    b = deepCopy(a);
a.d = 12;
console.log(b.d); //{e: 'f'}

function deepCopy(obj) {
  var temp = {};
  for (var key in obj){
    if(obj.hasOwnProperty(key)){
      temp[key] = obj[key];
    }
  }
  return temp;
}
