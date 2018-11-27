var fruits = [
  {id: 1, name: 'Banana', color: 'Yellow'},
  {id: 2, name: 'Apple', color: 'Red'}
]

function searchByName(arr, searchName) {
  var result;
  arr.forEach(function (val) {
    if (val.name == searchName) {
      result = val;
    }
  });
  return result;
}

function searchByKey(arr, searchKey, searchItem) {
  var result;
  arr.forEach(function (val) {
    if (val[searchKey] == searchItem) {
      result = val;
    }
  });
  return result;
}

console.log(searchByName(fruits, 'Apple'));

console.log(searchByKey(fruits, 'color', 'Orange'));