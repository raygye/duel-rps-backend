const express = require('express');
const router = express.Router();
let User = require('../models/userSchema');
let populations = {};

router.route('/:user').post((req, res) => {
    User.findOne({username: req.body.username}, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.json({
                'img': result.img,
                'wins': result.wins,
                'games': result.games
            })
        }
    });

});
module.exports = router;
