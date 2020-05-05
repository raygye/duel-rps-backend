const express = require('express');
const router = express.Router();

router.get('/:user', function(req, res) {
    res.send('User: ' + req.params.user);
});
module.exports = router;
