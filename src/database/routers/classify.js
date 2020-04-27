const express = require('express');

const Router = express.Router();

const {find} = require('../db/mongodb');

const {formatData} = require('../utils');

// 获取分类页列表
Router.get('/', async (req, res) => {
    console.log(2234);
    
    let result = await find('classify');
    res.send(result)
})

module.exports=Router;