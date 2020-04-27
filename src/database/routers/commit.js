const express = require('express');

const Router = express.Router();

const {find} = require('../db/mongodb');

const {formatData} = require('../utils');

// 获取分类页列表
Router.get('/', async (req, res) => {
    let result = await find('commit');
    res.send(result)
})

module.exports=Router;