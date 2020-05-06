const express = require('express');
const router = express.Router();
let User = require('../models/userSchema');
let populations = {};

router.route('/:user').post((req, res) => {
    let user = req.params.user;
    if (populations.user=== undefined || populations.user <=1) {
        User.findOne({username: req.body.username}, (err, result) => {
            if (err) throw err;
            else {
                res.json({
                    'img': result.img,
                    'wins': result.wins,
                    'games': result.games
                })
            }
        });
    }
    if (populations.user === undefined || populations.user === 0) {
        populations[user] = 1;
    }

    else if (populations[user] === 1) {
        populations[user]++;
    }
    else {
        res.json('Room is full.');
    }
});
module.exports = router;
