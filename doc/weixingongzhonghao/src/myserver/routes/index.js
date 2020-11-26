var express = require('express');
var router = express.Router();
var UserModel = require('../db/models/userModel')
var sha1 = require('sha1');
var sign = require('../utils/sign');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/reg', function(req,res){
  console.log(req.body);
  let {user, pwd} = req.body;
  // 使用mongoose提供的方法，将user与pwd存储至数据库
  new UserModel({
    user: user,
    pwd: pwd
  }).save().then(()=> {
    res.send({
      code: 1,
      msg: '注册成功'
    })
  })  
})

router.get('/auth', function(req, res){
  let { signature,timestamp,nonce,echostr } = req.query;
  let token = 'testweixin';
  let array = [timestamp, nonce, token];
  array.sort(); // 字典排序
  let str = array.join('');
  let resultStr = sha1(str); // 对字符串进行sha1加密
  if(resultStr === signature) {
    res.set('Content-Type','text/plain')
    res.send(echostr);
  } else {
    res.send('Error!!!')
  }
})

router.post('/jsapi', async function(req, res) {
  let url = decodeURIComponent(req.query.url); // req.query
  let conf = await sign(url);
  res.send(conf)
})


module.exports = router;
