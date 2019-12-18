const { User } = require('../schema/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpStatus = require('http-status-codes');
require('dotenv').config();

module.exports.createUser = (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.status(HttpStatus.OK).json({ user }))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
    })
  });
}

module.exports.readUser = (req, res) => {
  res.status(HttpStatus.OK).json({ user: req.user });
};

module.exports.getByLastName = (req, res) => {
  User.findByLastName(req.body.lastname, (err, data) => {
    if(err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Lastname Mismatch'});
    res.status(HttpStatus.OK).json({ data });
  });
};

module.exports.getByAge = (req, res) => {
  User.findByAge(req.body.age, (err, data) => {
    if (err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Age Mismatch"});
    res.status(HttpStatus.OK).json({ data });
  });
};

module.exports.getName = (req, res) => {
  User.findOne({ _id: req.user.id }).exec((err, user) => {
    if(err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "User Not Defined!"});
    res.status(HttpStatus.OK).json(user.getIfAdult());
  });
}

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Cannot update the user'});
    res.status(HttpStatus.OK).json({ user });
  });
};

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err)
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Request cannot be Processed!'});
    res.status(HttpStatus.OK).json({ message: 'User Removed!'});
  });
};

module.exports.generateTokens = (req, res) => {
  const token = jwt.sign(
    { id: '' },
    process.env.JWT_SECRET
  );
  res.status(HttpStatus.OK).json({ token });
};

module.exports.loginUser = (req, res) => {
  const token = jwt.sign({ id: req.user_id}, process.env.JWT_SECRET);
  res.status(HttpStatus.OK).json({ token });
};
