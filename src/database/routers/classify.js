const express = require('express');

const Router = express.Router();

const {find} = require('../db/mongodb');

const {formatData} = require('../utils');

// 获取分类页列表
Router.get('/', async (req, res) => {
    let result = await find('classify');
    let data = []
    result.map(item => {
        if(item.parentId === '1') {
            item.children = []
            data.push(item)
        }
    })
    for(let i = 0;i < data.length;i++) {
        for(let j = 0;j < result.length;j++) {
            if(result[j].parentId === data[i].signId) {
                data[i].children.push(result[j])
            }
        }
    }
    res.send(data)
})


module.exports=Router;