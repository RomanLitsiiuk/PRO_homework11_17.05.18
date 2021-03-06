var UserString = 'firstName = John, email=example@gmail.com, balance=300; firstName=Test, lastName=Test, email=admin@gmail.com, balance=1000';

var Validator = function (validationSchema) {
  this.validationSchema = validationSchema;
  Validator.prototype.isValid = function (attributes) {
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
  return !isEmpty(value) && value.indexOf('@') !== -1;
};

var userValidationSchema = {
  firstName: isRequired,
  lastName: isRequired,
  email: isEmail,
  balance: isFinite
};

var User = function(attributes, validationSchema) {
  this.attributes = attributes || {};
  User.prototype.validator = new Validator(validationSchema);
  User.prototype.isValid = function () {
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

var UsersCollection = function (initialUsers) {
  if (initialUsers) {
    this.users = [].concat(initialUsers);
  } else {
    this.users = [];
  }
};

UsersCollection.prototype = {
  add: function(payload) {
    this.users.push(payload);
    return this;
  },

  remove: function(payload) {
    if(this.users.indexOf(payload) >= 0) {
      this.users.splice(this.users.indexOf(payload), 1);
      return this;
    }
  },

  addAll: function(payload) {
    this.users = this.users.concat(payload);
    return this;
  },

  clear: function() {
    this.users = [];
    return this;
  },

  findBy: function(propertyName, propertyValue) {
    this.users = this.users.filter(function(object) {
      if (object.attributes[propertyName] === propertyValue) {
        return true;
      }
    });
    return this;
  },
  
  sortBy: function(propertyName, order){
    var compareFn = function(firstValue, secondValue){
      if (isFinite(firstValue.attributes[propertyName]) && isFinite(secondValue.attributes[propertyName])) {
        firstValue = +firstValue.attributes[propertyName];
        secondValue = +secondValue.attributes[propertyName];
      } else {
        firstValue = firstValue.attributes[propertyName];
        secondValue = secondValue.attributes[propertyName];
      }
      
      if(firstValue < secondValue){
        return -1;
      }
      else if(firstValue > secondValue){
        return 1;
      }
      else return 0;
    };
    
    if(order === "asc"){
      this.users.sort(compareFn);
    } else if(order === "desc"){
      this.users.sort(compareFn).reverse();
    }
    return this
  }
};

var NewCollection = new UsersCollection(user1);
console.log(NewCollection.users);
/*NewCollection.add(user2);
console.log(NewCollection.users);
NewCollection.remove(user1);
console.log(NewCollection.users);
NewCollection.addAll(CheckedArray);
console.log(NewCollection.users);
NewCollection.clear();
console.log(NewCollection.users);*/
NewCollection.add(user1).add(user2).add(user2).addAll(CheckedArray).add(user1).add(user2);
console.log(NewCollection.users);
/*NewCollection.findBy('lastName', 'Sahno');
console.log(NewCollection.users);
NewCollection.sortBy('balance', 'asc');
console.log(NewCollection.users);*/
NewCollection.sortBy('balance', 'asc');
console.log(NewCollection.users);
