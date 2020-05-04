const express = require('express');
const router = express.Router();
let User = require('../models/userSchema');
/* GET users listing. */
router.get('/', function(req, res) {
  User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error ' + err));
});
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const img = req.body.img;
  const newUser = new User({username, password, img});
  newUser.save()
      .then(() => res.json('User added.'))
      .catch(err => res.status(400).json('Error ' + err));
});
router.route('/delete').post((req, res) => {
  const delName = req.body.username;
  User.deleteOne({'username': delName})
      .then(() => res.json('User deleted'))
      .catch(err => res.status(400).json('Error ' + err));
});
module.exports = router;
