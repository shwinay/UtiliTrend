var express = require('express');
var router = express.Router();
let analytics = require('./scripts/analytics');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Info', function(req, res, next) {
  res.render('Info', { title: 'Utility Analytics' });
});

router.get('/user/:username', function(req, res, next) {
  let username = req.params.username;
  res.json(analytics.analyzeUser(username));
});
module.exports = router;