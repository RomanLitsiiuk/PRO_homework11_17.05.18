var UserString = 'firstName=John, lastName=Doe, email=example@gmail.com, balance=300; ' +
  'firstName=Test, lastName=Test, email=admin@gmail.com, balance=1000';

var stringToObjects = function(inputString) {
  var ResultArray = [];
  var UserObject;
  var ObjectsArray = inputString.split(';').map(function(userAtrributesString){
    return userAtrributesString.split(',').reduce(function (result, keyValueString) {
      var keyAndValue = keyValueString.split('=');
      result[keyAndValue[0].trim()] = keyAndValue[1].trim();
      return result;
    }, {});
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

var UsersCollection = function(initialUsers) {
  if(initialUsers) {
    this.users = [].concat(initialUsers);
  } else {
    this.users = [];
  }

  this.add = function(payload) {
    this.users.push(payload);
    return this;
  };

  this.remove = function(payload) {
    if(this.users.indexOf(payload) >= 0) {
      this.users.splice(this.users.indexOf(payload), 1);
      return this;
    }
  };

  this.addAll = function(payload) {
    for (var i = 0; i < payload.length; i++) {
      this.users.push(payload[i]);
    }
    return this;
  };

  this.clear = function() {
    this.users = [];
    return this;
  };

  this.findBy = function(propertyName, propertyValue) {
    this.users = this.users.filter(function(object) {
      for (propertyName in object) {
        if (object[propertyName] === propertyValue) {
          return true;
        }
      }
    });
    return this;
  };

  this.sortBy = function (propertyName, order) {
    var minObject;
    var maxObject;
    if (order === 'desc') {
      for (var i = 0; i < this.users.length - 1; i++) {
        for (var j = 0; j < this.users.length - i - 1; j++) {
          if (+(this.users[j][propertyName]) < +(this.users[j + 1][propertyName])) {
            maxObject = this.users[j + 1];
            this.users[j + 1] = this.users[j];
            this.users[j] = maxObject;
          }
        }
      }
    } else if (order === 'asc') {
      for (i = 0; i < this.users.length - 1; i++) {
        for (j = 0; j < this.users.length - i - 1; j++) {
          if (+(this.users[j][propertyName]) > +(this.users[j + 1][propertyName])) {
            minObject = this.users[j + 1];
            this.users[j + 1] = this.users[j];
            this.users[j] = minObject;
          }
        }
      }
    }
    return this;
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

//console.log(stringToObjects(UserString));
var NewCollection = new UsersCollection();
/*console.log(NewCollection.users);
NewCollection.add(user2);
console.log(NewCollection.users);
NewCollection.remove(user1);
console.log(NewCollection.users);
NewCollection.addAll(stringToObjects(UserString));
console.log(NewCollection.users);
NewCollection.clear();
console.log(NewCollection.users);*/
NewCollection.add(user1).add(user2).add(user2).addAll(stringToObjects(UserString)).add(user1).add(user2);
console.log(NewCollection.users);
/*NewCollection.findBy('firstName', 'Volodya');
console.log(NewCollection.users);*/
//NewCollection.sortBy('balance', 'asc');
//console.log(NewCollection.users);
NewCollection.sortBy('balance', 'desc');
console.log(NewCollection.users);
