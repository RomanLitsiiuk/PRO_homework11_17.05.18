var UserString = 'firstName=John, lastName=Doe, email=example@gmail.com, balance=300; ' +
  'firstName=Test, lastName=Test, email=admin@gmail.com, balance=1000';

var stringToObjects = function(inputString) {
  var DirtyObject;
  var ObjectsArray = [];
  var ResultArray = [];
  var UserObject;
  var i;
  inputString.split(';').map(function(userAtrributesString){
    DirtyObject = {};
    userAtrributesString.split(',').reduce(function (result, keyValueString) {
      var keyAndValue = keyValueString.split('=');
      for (i = 0; i < keyAndValue.length; i++) {
        keyAndValue[i] = keyAndValue[i].trim();
      }
      DirtyObject[keyAndValue[0]] = keyAndValue[1];
    }, {});
    ObjectsArray.push(DirtyObject);
  });
  for (i = 0; i < ObjectsArray.length; i++) {
    UserObject = new User(ObjectsArray[i]);
    if (UserObject.isValid() === true) {
      ResultArray.push(UserObject);
    }
  }
  return ResultArray;
};

var User = function(object) {
  this.firstName = object.firstName;
  this.lastName = object.lastName;
  this.email = object.email;
  this.balance = object.balance;
  this.isValid = function () {
    var validValue = true;
    if(this.firstName === '' || this.firstName === undefined) {
      validValue = false;
    }
    if (this.lastName === '' || this.lastName === undefined){
      validValue = false;
    }
    if (this.email === undefined || (this.email.search('@')) === -1) {
      validValue = false;
    }
    if (isNaN(this.balance) || this.balance === 'undefined') {
      validValue = false;
    }
    return validValue;
  };
};

console.log(stringToObjects(UserString));

var UsersCollection = function(user) {
  this.users = [].concat(user);

  this.add = function(payload) {
    this.users.push(payload);
    return this.users;
  };
  this.remove = function(payload) {
    this.users.splice(this.users.indexOf(payload), 1);
    return this.users;
  };
  this.addAll = function(payload) {
    for (i = 0; i < payload.length; i++) {
      this.users.push(payload[i]);
    }
    return this.users;
  };
  this.clear = function() {
    this.users = [];
    return this.users;
  };
  this.findBy = function(propertyName, propertyValue) {

  };
  this.sortBy = function (propertyName, order) {

  };
};

user1 = new User({
  firstName: 'Volodya',
  lastName: 'Pistolet',
  email: 'vova@gmail.com',
  balance: '100'
});

user2 = new User({
  firstName: 'Valera',
  lastName: 'Raketa',
  email: 'valet@gmail.com',
  balance: '503'
});

var NewCollection = new UsersCollection(user1);
console.log(NewCollection.add(user2));
console.log(NewCollection.remove(user1));
console.log(NewCollection.addAll(stringToObjects(UserString)));
console.log(NewCollection.clear());
NewCollection.add(user1);
NewCollection.add(user2);
NewCollection.addAll(stringToObjects(UserString));
console.log(NewCollection.add(user2));
//console.log(NewCollection.findBy('lastName', 'Raketa'));
