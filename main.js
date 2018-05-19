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

var UsersCollection = function() {
  this.users = [];

  this.add = function () {
    this.users.push(payload);
  };
  this.remove = function(Object) {
    return User.splice[User.indexOf(Object)];
  };
  this.addAll = function(usersArray) {
    for (i = 0; i < usersArray.length; i++) {
      this.User.push(usersArray[i]);
    }
    return User;
  };
  this.clear = function() {
    for (i = 0; i < User.length; i++) {
      this.User.pop(User[i]);
    }
    return User;
  };
  this.findBy = function(propertyName, propertyValue) {

  };
  this.sortBy = function(propertyName, order) {

  };
};

var UserCollection = function([user]){
  this.users = [];

  this.add = function (payload) {
    this.users.push(payload);
  };
};

user1 = new User({
  firstName: 'Volodya',
  lastName: 'Turbo',
  email: 'robot@gmail.com',
  balance: '100'
});

user2 = new User({
  firstName: 'Valera',
  lastName: 'Raketa',
  email: 'motor@gmail.com',
  balance: '503'
});

var NewCollection = new UsersCollection.add(user1);
console.log(NewCollection);
