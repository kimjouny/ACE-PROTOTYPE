var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index.html');
});

router.get('/decumulation', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('graph.html');
});
module.exports = router;
