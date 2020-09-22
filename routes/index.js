var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/v1.0', (req, res, next)=> {
  res.render('graph.html');
});

router.get('/v1.1', (req,res,next)=>{
  res.render('carousel.html');
})

router.get('/v1.2',(req,res,next)=>{
  res.render('last.html');
})

router.get('/apitest', (req,res,next)=>{
  res.render('apitest.html');
})


module.exports = router;
