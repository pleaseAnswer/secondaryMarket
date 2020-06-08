const express = require('express');

const Router = express.Router();

const { find, create, update } = require('../db/mongodb');

const { formatData, token } = require('../utils');

const collectionName = 'user'

// 检验学号
Router.get('/checkXh', async (req, res) => {
    let { xuehao } = req.query;
    let result = await find(collectionName, { xuehao });
    if (result.length) { //用户已存在
        res.send(formatData({
            status: 0
        }));
    } else {
        res.send(formatData());
    }
})
// 检验手机号
Router.get('/checkSj', async (req, res) => {
    let { mobile } = req.query;
    let result = await find(collectionName, { mobile });
    if (result.length) { //用户已存在
        res.send(formatData({
            status: 0
        }));
    } else {
        res.send(formatData());
    }
})
//注册
Router.post('/reg', async (req, res) => {
    let ruleForm = req.body;
    let result = await create(collectionName, ruleForm)
    if (result.insertedCount > 0) {
        res.send(formatData());
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})
//注册
Router.post('/submitMsg', async (req, res) => {
    let sellForm = req.body;
    let result = await create('personDetail', sellForm)
    if (result.insertedCount > 0) {
        res.send(formatData());
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

//修改密码
Router.post('/resetPassword', async (req, res) => {
    let { mobile, psw } = req.body;
    let result = await update(collectionName, { mobile }, { password: psw })
    if (result.result.ok == 1) {
        res.send(formatData());
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

// 登录
Router.post('/', async (req, res) => {
    let {username, password} = req.body;
    console.log(username, password);
    
    let result = await find(collectionName,{},{username:username,password});
    console.log('result',result);
    
    if (result.length > 0) {
        let result2 = await find('personDetail',{sellPeapleId:result[0].id});
    console.log('result2',result2);
    if(result2.length > 0) {
            //登录成功创建一个token
            let Authorization = token.create({
                username
            });
            res.set({
                // 让浏览器运行获取自定义响应头（必须设置Access-Control-Expose-Headers响应头，才能在前端js中获取自定义的响应头）
                'Access-Control-Expose-Headers': 'Authorization',
                'Authorization': Authorization
            });
            res.send(formatData({
                data: {
                    Authorization,
                    id: result[0].id,
                    sellPeaple: result2[0].sellPeaple,
                }
            }));
        }
    } else {
        res.send(formatData({
            status: 0
        }));
    }
    // res.send(data)
})

// 收藏 -> 
Router.get('/collect', async (req, res) => {
    let { id, signId } = req.query;
    let result = await find(collectionName, { id: Number(id) });
    if (result.length > 0) { 
        // 判断数组中是否存在该商品id，存在则删除，不存在则添加
        let arr = result[0].collect ? result[0].collect : [];
        let flage = true;
        for(let i = arr.length; i >= 0; i--) {
            if(arr[i] == signId) {
                arr.splice(i, 1);
                flage = false;
            }
        }
        if(flage) {
            arr.push(signId)
        }
        let result2 = await update(collectionName, { id: Number(id) }, {collect: arr});
        if(result2.result.ok == 1) {
            res.send(formatData());
        }
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

// 收藏页
Router.get('/collectList', async (req, res) => {
    let { signId } = req.query;
    let result = await find(collectionName, { id: Number(signId) });
    if (result.length > 0) {
        let res1 = result[0].collect ? result[0].collect : [];
        let data = [];
        if(res1.length > 0) {
            for(let i = 0; i < res1.length; i++) {
                let result = await find('goodsDetail', { signId: res1[i] });
                data.push(result[0])
            }
        }
        res.send(formatData({data}));
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

// 获取个人信息
Router.get('/getMsg', async (req, res) => {
    let { id } = req.query;
    let result = await find('personDetail', { sellPeapleId: Number(id) });
    if (result.length > 0) {
        res.send(formatData({data: result}));
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

// 获取正在转手数据
Router.get('/changeList', async (req, res) => {
    let { id } = req.query;
    let result = await find(collectionName, { id: Number(id) });
    if (result.length > 0) {
        let res1 = result[0].changeNow ? result[0].changeNow : {zhuanshou: [], mairu: []};
        let zhuanshou = res1.zhuanshou;
        let mairu = res1.mairu;
        let changeSellGoodsList = [];
        let changeBuyGoodsList = [];
        if(zhuanshou.length > 0) {
            for(let i = 0; i < zhuanshou.length; i++) {
                let result = await find('goodsDetail', { signId: zhuanshou[i] });
                let peaple = await find('personDetail', { sellPeapleId: Number(result[0].sellers[0]) });
                result = result[0]
                result.buyPeaple = peaple[0].sellPeaple
                changeSellGoodsList.push(result)
            }
        }
        if(mairu.length > 0) {
            for(let i = 0; i < mairu.length; i++) {
                let result = await find('goodsDetail', { signId: mairu[i] });
                changeBuyGoodsList.push(result[0])
            }
        }
        res.send(formatData({data: {changeSellGoodsList, changeBuyGoodsList}}));
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

// 添加聊天信息
Router.get('/sendMsg', async (req, res) => {
    let { iAmSay, sellPeapleId, id } = req.query;
    let result = await find('chatList', { $and:[{ "id":Number(id) },{ "sellPeapleId":Number(sellPeapleId) }] });
    if (result.length > 0) {
        // 存在则添加
        let list = result[0].list
        let item = {code: 'id', text: iAmSay}
        list.push(item)
        let result2 = await update('chatList', {$and:[{"id":Number(id)},{"sellPeapleId":Number(sellPeapleId)}]},{list});
        if(result2.result.ok == 1) {
            res.send(formatData());
        } else {
            res.send(formatData({
                status: 0
            }));
        }
    } else {
        // 不存在则创建
        let item = {
            sellPeapleId: Number(sellPeapleId),
            id: Number(id),
            list: [{
                code: 'id',
                text: iAmSay
            }]
        }
        let result3 = await create('chatList', item)
        if (result3.insertedCount > 0) {
            res.send(formatData());
        } else {
            res.send(formatData({
                status: 0
            }));
        }
    }
})

// 获取聊天信息
Router.get('/getSay', async (req, res) => {
    let { sellPeapleId, id } = req.query;
    let result = await find('chatList', {$and:[{"id":Number(id)},{"sellPeapleId":Number(sellPeapleId)}]});
//  $or:
//         [
//             {$and:[{"id":Number(id)},{"sellPeapleId":Number(sellPeapleId)}]},
//             {$and:[{"sellPeapleId":Number(id)},{"id":Number(sellPeapleId)}]}
//         ]
    if (result.length > 0) {
        res.send(formatData({data: result[0]}));
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})
module.exports=Router;