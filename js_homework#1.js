function deepCopy(obj) {
  if(obj === null) return null;
  if(typeof obj != 'object') return obj;
  var temp = {};
  for (var key in obj){
    if (obj.hasOwnProperty(key) && typeof obj[key] == 'object' && obj[key] !== null) {
        temp[key] = deepCopy(obj[key]);
    }else{
      temp[key]=obj[key];
    }
  }
  return temp;
}
