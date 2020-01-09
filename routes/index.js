var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getbill', function(req, res, next) {
  res.json(
  {
    "something": "something"
  }
  );
});

module.exports = router;
