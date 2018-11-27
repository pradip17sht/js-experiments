var arr = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock']

var result = arr.reduce(function(obj, val, index){
  if(!obj[val]){
    obj[val] = 1;
  } else {
    obj[val]++;
  }
  return obj;
},{});

console.log(result);