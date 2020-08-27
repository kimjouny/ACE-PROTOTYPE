var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index.html');
});

router.get('/v1.0', (req, res, next)=> {
  // res.render('index', { title: 'Express' });
  res.render('graph.html');
});

router.get('/v1.1', (req,res,next)=>{
  res.render('carousel.html');
})
module.exports = router;
