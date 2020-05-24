const express = require('express');

const Router = express.Router();

const {find} = require('../db/mongodb');

const {formatData} = require('../utils');

const collectionName = 'user'

// 获取分类页列表
Router.post('/', async (req, res) => {
    console.log(111,req.body);
    
    let {username, password} = req.body;
    let data = false;
    let result = await find(collectionName,{},{username:Number(username),password});
    // console.log(result.password,password);
    
    if(result) {
        data = true
    } else {
        data = false
    }
    console.log('登录',result,data);
    
    res.send(data)
})

// 获取列表页title
Router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let result = await find(collectionName);
    let data = [];
    result.map(item => {
        if(item.signId === id) {
            data.push(item)
        }
    })
    res.send(data[0].text)
})


module.exports=Router;