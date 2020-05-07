const express = require('express');

const Router = express.Router();

const {find} = require('../db/mongodb');

const {formatData} = require('../utils');

// 获取分类页列表 -- 商品列表
Router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let result = await find('goodsList');
    console.log('id',result);
    let data = []
    result.map(item => {
        if(item.parentId === id) {
            data.push(item)
        }
    })
    res.send(data)
})

module.exports=Router;