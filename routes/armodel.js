var express = require('express');
var router = express.Router();

/* GET template page. */
router.get('/', function(req, res, next) {
  res.render('armodel', { title: 'AR Model' });
});

module.exports = router;
