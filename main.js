var UserString = 'firstName = John, email=example@gmail.com, balance=300; firstName=Test, lastName=Test, email=admin@gmail.com, balance=1000';

var Validator = function (validationSchema) {
  this.validationSchema = validationSchema;
  this.isValid = function (attributes) {
    return Object.keys(this.validationSchema).every(function (key) {
      return this.validationSchema[key](attributes[key]);
    }.bind(this));
  };
};

var isEmpty = function (value) {
  return typeof value !== 'string' || value.length === 0;
};

var isRequired = function (value) {
  return !isEmpty(value);
};

var isEmail = function (value) {
  return isEmpty(value) || value.indexOf('@') !== -1;
};

var userValidationSchema = {
  firstName: isRequired,
  lastName: isRequired,
  email: isEmail,
  balance: isFinite
};

var User = function(attributes, validationSchema) {
  this.attributes = attributes || {};
  this.validator = new Validator(validationSchema);

  this.isValid = function () {
    return this.validator.isValid(this.attributes);
  };
};

user1 = new User({
  firstName: 'Vladimir',
  lastName: 'Marchenko',
  email: 'vova@gmail.com',
  balance: '100'
});

user2 = new User({
  firstName: 'Andrey',
  lastName: 'Sahno',
  email: 'andy@gmail.com',
  balance: '503'
});

var stringToObjects = function(inputString) {
  return ObjectsArray = inputString.split(';').map(function(userAtrributesString){
    var attributes = userAtrributesString.split(',').reduce(function (result, keyValueString) {
      var keyAndValue = keyValueString.split('=');
      result[keyAndValue[0].trim()] = keyAndValue[1].trim();
      return result;
    }, {});
    return new User(attributes, userValidationSchema);
  });
};

var CheckedArray = stringToObjects(UserString).filter(function (user) {
  return user.isValid();
});

console.log(CheckedArray);

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
      if (object.attributes[propertyName] === propertyValue) {
        return true;
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
          if (+(this.users[j].attributes[propertyName]) < +(this.users[j + 1].attributes[propertyName])) {
            maxObject = this.users[j + 1];
            this.users[j + 1] = this.users[j];
            this.users[j] = maxObject;
          }
        }
      }
    } else if (order === 'asc') {
      for (i = 0; i < this.users.length - 1; i++) {
        for (j = 0; j < this.users.length - i - 1; j++) {
          if (+(this.users[j].attributes[propertyName]) > +(this.users[j + 1].attributes[propertyName])) {
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

var NewCollection = new UsersCollection(user1);
console.log(NewCollection.users);
NewCollection.add(user2);
console.log(NewCollection.users);
NewCollection.remove(user1);
console.log(NewCollection.users);
NewCollection.addAll(CheckedArray);
console.log(NewCollection.users);
NewCollection.clear();
console.log(NewCollection.users);
NewCollection.add(user1).add(user2).add(user2).addAll(CheckedArray).add(user1).add(user2);
console.log(NewCollection.users);
NewCollection.findBy('lastName', 'Sahno');
console.log(NewCollection.users);
NewCollection.sortBy('balance', 'asc');
console.log(NewCollection.users);
NewCollection.sortBy('balance', 'desc');
console.log(NewCollection.users);
