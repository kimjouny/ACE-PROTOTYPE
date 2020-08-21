var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index.html');
});

router.get('/gauge', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('gauge.html');
});

router.get('/graph', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('graph.html');
});

router.get('/layout', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('layout.html');
});
module.exports = router;
