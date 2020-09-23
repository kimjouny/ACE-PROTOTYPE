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

router.post('/kb_openAPI', (req,res,next)=>{
  var apiKey=JSON.stringify(req['headers']['apikey']);
  var hsKey=JSON.stringify(req['headers']['hskey']);
  var authorization="Bearer "+JSON.stringify(req['headers']['authorization']);
  //authorization=authorization.replaceAll('-','');
  apiKey=apiKey.replace('"','');
  apiKey=apiKey.replace('"','');
  hsKey=hsKey.replace('"','');
  hsKey=hsKey.replace('"','');
  authorization=authorization.replace('"','');
  authorization=authorization.replace('"','');

  var hsKey;
  var api_url="https://dev-openapi.kbstar.com:8443/kfg/pension/investmentproduct/getPensionAssetAccountList/ver1";
  console.log("apiKey :"+apiKey);
  console.log("hsKey :"+hsKey);
  console.log("Authorization:"+authorization);
  request.post({
    url: api_url,
    contentType: "application/json; charset=utf-8",
    headers:{'hsKey': hsKey,'Authorization': authorization, "apiKey":apiKey},
    method:"POST",
    body : {'dataHeader':{}, 'dataBody':{'custCnifNo': 'LA08ubL8CSqf8TkGBwHhKhaOXolVpzqi1lwXHIy1Km8YVCHBJcqFkzuqlXdP9kZ/WMt7oVfNQXGzrKVYYplYUw=='}},
    json:true
   },
     function(error, response, body){
       console.log("result : " +JSON.stringify(body));
       res.json(body);
     });

})

module.exports = router;
