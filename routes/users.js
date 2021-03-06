const express = require('express');
const router = express.Router();
let User = require('../models/userSchema');

router.get('/', function(req, res) {
  User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error ' + err));
});
router.route('/add').post((req, res) => {
  const username = req.body.username;
  User.find({username: username})
      .then((found) => {
        if (found.length > 0) {
          console.log(found);
          return res.status(400).json('Username already exists.');
        }
        else {
          const password = req.body.password;
          const img = req.body.img;
          const newUser = new User({username, password, img});
          newUser.save()
              .then(() => res.json('User added.'))
              .catch(err => res.status(400).json('Error ' + err));
        }
      });
});
router.route('/login').post((req, res) => {
    User.findOne({username: req.body.username, password: req.body.password}, (err, result) => {
        if (err) throw err;
        else if (result === null) {
            res.json('No matching username/password combination');
        }
        else {
            console.log(result);
            res.json({
                authenticated: true,
                img: result.img,
                wins: result.wins,
                games: result.games
            });
        }
    });
});

router.route('/update').post((req, res) => {
    let increment = {};
    let user = {username: req.body.username};
    if (req.body.win) {
        increment = {$inc: {wins: 1, games: 1}};
    }
    else {
        increment = {$inc: {games: 1}};
    }
    User.updateOne(user, increment, (err, result) => {
        if (err) throw err;
        else {
            res.json('updated');
        }
    });
});
router.route('/delete').post((req, res) => {
  const delName = req.body.username;
  User.deleteOne({'username': delName})
      .then(() => res.json('User deleted'))
      .catch(err => res.status(400).json('Error ' + err));
});
module.exports = router;
