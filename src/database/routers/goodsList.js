const express = require('express');

const Router = express.Router();

const {find} = require('../db/mongodb');

const {formatData} = require('../utils');

// 获取分类页列表 -- 商品列表
Router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let result = await find('goodsList');
    let data = []
    result.map(item => {
        if(item.parentId === id) {
            data.push(item)
        }
    })
    res.send(data)
})

// 获取商品详情
Router.get('/goodsDetail/:id', async (req, res) => {
    let { id } = req.params;
    let result = await find('goodsDetail');
    let data = []
    result.map(item => {
        if(item.signId === id) {
            data.push(item)
        }
    })
    res.send(data)
})

// 获取卖家详情
Router.get('/personDetail/:id', async (req, res) => {
    let { id } = req.params;
    let result = await find('personDetail');
    let data = []
    result.map(item => {
        if(item.sellPeapleId === id) {
            data.push(item)
        }
    })
    res.send(data)
})

module.exports=Router;