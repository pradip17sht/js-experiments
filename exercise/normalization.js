var people = [{
  id: 1,
  name: "Aegon Targaryen",
  children: [{
      id: 2,
      name: "Jaehaerys Targaryen",
      children: [{
          id: 4,
          name: "Daenerys Targaryen"
      }, {
          id: 5,
          name: "Rhaegar Targaryen",
          children: [{
              id: 6,
              name: "Aegon Targaryen"
          }]
      }]
  }, {
      id: 3,
      name: "Rhaelle Targaryen"
  }],
}];


var normalizedData = {};
// this variable is for indexing the entries inside the result object
let dataCounter = 1;

var findChildren = function (people) {
    let childArray = [];
    for (let i = 0; i < people.length; i++) {
        childArray.push(people[i].id)
    }
    return childArray;
}

var normalizedata = function (people) {

    for (let x = 0; x < people.length; x++) {

        var obj = {};
        if (people[x].hasOwnProperty('children')) {
            obj['id'] = people[x].id;
            obj['name'] = people[x].name;
            obj['children'] = findChildren(people[x].children);
            normalizedData[dataCounter] = obj;
            dataCounter++;

            //running a recursive function for the nested elements
            normalizedata(people[x].children);
        } else {
            people[x]['children'] = [];
            normalizedData[dataCounter] = people[x];
            dataCounter++;
        }
    }

}

normalizedata(people);
console.log(normalizedData);