const { userSchema } = require('../schema/index');

userSchema.methods.getIfAdult = function () {
  return this.age > 18;
};

userSchema.statics.findByAge = function (age, callback) {
  this.find({ age: age }, callback);
};

userSchema.static('findByLastName', function (lastname, callback) {
  this.find({ lastname: lastname }, callback);
});

userSchema.virtual('fullName').get(function() {
  return this.firstname + ' ' + this.lastname;
});
