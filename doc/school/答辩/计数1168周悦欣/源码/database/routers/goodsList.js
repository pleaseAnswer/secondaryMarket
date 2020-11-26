const express = require('express');

const Router = express.Router();

const fs = require('fs');

const path = require('path');

const { find, create, update } = require('../db/mongodb');

const {formatData} = require('../utils');

// 正在交易
Router.get('/changselled', async (req, res) => {
    let { signId ,sellPeapleId, id } = req.query;
    //sellPeapleId 卖家
    //id 买家  -> 写入商品
    let result1 = await find('goodsDetail', { signId });
    let sellers = result1.sellers ? result1.sellers : [];
    let flage0 = true;
    for(let i = sellers.length-1; i >= 0; i--) {
        if(sellers[i] == id) {
            flage0 = false;
        }
    }
    if(flage0) {
        sellers.push(id)
    }
    let result = await update('goodsDetail', { signId }, { selled: 1, sellers });
    if(result.result.ok == 1) {
        // 向买家卖家添加signId
        let result2 = await find('user', { id: Number(sellPeapleId) });
        if(result2.length > 0) {
            let changeNow2 = result2[0].changeNow ? result2[0].changeNow : {zhuanshou: [], mairu: []}
            let arr2 = changeNow2.zhuanshou;
            let arr22 =  changeNow2.mairu;
            let flage2 = true;
            for(let i = arr2.length-1; i >= 0; i--) {
                if(arr2[i] == signId) {
                    flage2 = false;
                }
            }
            if(flage2) {
                arr2.push(signId)
            }
            let result4 = await update('user', { id: Number(sellPeapleId) }, {changeNow:{zhuanshou: arr2, mairu: arr22 }});
            if(result4.result.ok == 1) {
                let result3 = await find('user', { id: Number(id) });
                if(result3.length > 0) {
                    // 判断数组中是否存在该商品id，存在则删除，不存在则添加
                    let changeNow3 = result3[0].changeNow ? result3[0].changeNow : {zhuanshou: [], mairu: []}
                    let arr3 = changeNow3.mairu;
                    let arr33 = changeNow3.zhuanshou;
                    let flage3 = true;
                    for(let i = arr3.length-1; i >= 0; i--) {
                        if(arr3[i] == signId) {
                            flage3 = false;
                        }
                    }
                    if(flage3) {
                        arr3.push(signId)
                    }
                    let result5 = await update('user', { id: Number(id) }, {changeNow:{zhuanshou: arr33, mairu: arr3 }});
                    if(result5.result.ok == 1) {
                        res.send(formatData())
                    }
                }
            }
        }
        
    } else {
        res.send(formatData({
            status: 0
        }));
    }
    
})

// 取消交易
Router.get('/cancelChange', async (req, res) => {
    let { signId ,sellPeapleId, id } = req.query;
    //id 买家  -> 移除商品
    let result = await update('goodsDetail', { signId }, { selled: 0, sellers : [] });
    if(result.result.ok == 1) {
        // 卖家的转手-1
        let result2 = await find('user', { id: Number(sellPeapleId) });
        if(result2.length > 0) {
            let changeNow2 = result2[0].changeNow ? result2[0].changeNow : {zhuanshou: [], mairu: []}
            let arr2 = changeNow2.zhuanshou;
            let arr22 =  changeNow2.mairu;
            for(let i = arr2.length-1; i >= 0; i--) {
                if(arr2[i] == signId) {
                    arr2.splice(i,1)
                }
            }
            let result4 = await update('user', { id: Number(sellPeapleId) }, {changeNow:{zhuanshou: arr2, mairu: arr22 }});
            if(result4.result.ok == 1) {
                // 买家的买入-1
                let result3 = await find('user', { id: Number(id) });
                if(result3.length > 0) {
                    // 判断数组中是否存在该商品id，存在则删除，不存在则添加
                    let changeNow3 = result3[0].changeNow ? result3[0].changeNow : {zhuanshou: [], mairu: []}
                    let arr3 = changeNow3.mairu;
                    let arr33 = changeNow3.zhuanshou;
                    for(let i = arr3.length-1; i >= 0; i--) {
                        if(arr3[i] == signId) {
                            arr3.splice(i,1)
                        }
                    }
                    let result5 = await update('user', { id: Number(id) }, {changeNow:{zhuanshou: arr33, mairu: arr3 }});
                    if(result5.result.ok == 1) {
                        res.send(formatData())
                    }
                }
            }
        } 
    } else {
        res.send(formatData({
            status: 0
        }));
    }    
})

// 交易成功
Router.get('/confirmChange', async (req, res) => {
    let { signId ,sellPeapleId, id } = req.query;
    //id 买家  -> 移除商品
    let result = await update('goodsDetail', { signId }, { selled: 2 });
    if(result.result.ok == 1) {
        // 卖家的转手-1
        let result2 = await find('user', { id: Number(sellPeapleId) });
        if(result2.length > 0) {
            let changeNow2 = result2[0].changeNow ? result2[0].changeNow : {zhuanshou: [], mairu: []}
            let arr2 = changeNow2.zhuanshou;
            let arr22 =  changeNow2.mairu;
            for(let i = arr2.length-1; i >= 0; i--) {
                if(arr2[i] == signId) {
                    arr2.splice(i,1)
                }
            }
            let result4 = await update('user', { id: Number(sellPeapleId) }, {changeNow:{zhuanshou: arr2, mairu: arr22 }});
            if(result4.result.ok == 1) {
                // 卖家的已卖+1
                let result6 = await find('user', { id: Number(sellPeapleId) });
                if(result6.length > 0) {
                    let isSelled = result6[0].isSelled ? result6[0].isSelled : [];
                    isSelled.push(signId)
                    let result7 = await update('user', { id: Number(sellPeapleId) }, { isSelled });
                    if(result7.result.ok == 1) {
                        // 买家的买入-1
                        let result3 = await find('user', { id: Number(id) });
                        if(result3.length > 0) {
                            // 判断数组中是否存在该商品id，存在则删除，不存在则添加
                            let changeNow3 = result3[0].changeNow ? result3[0].changeNow : {zhuanshou: [], mairu: []}
                            let arr3 = changeNow3.mairu;
                            let arr33 = changeNow3.zhuanshou;
                            for(let i = arr3.length-1; i >= 0; i--) {
                                if(arr3[i] == signId) {
                                    arr3.splice(i,1)
                                }
                            }
                            let result5 = await update('user', { id: Number(id) }, {changeNow:{zhuanshou: arr33, mairu: arr3 }});
                            if(result5.result.ok == 1) {
                                // 买家的已买 + 1
                                let result8 = await find('user', { id: Number(id) });
                                let isBuyed = result8[0].isBuyed ? result8[0].isBuyed : [];
                                isBuyed.push(signId)
                                let result9 = await update('user', { id: Number(id) }, { isBuyed });
                                if(result9.result.ok == 1) {
                                    res.send(formatData())
                                }
                            }
                        }
                    }
                }
            }
        } 
    } else {
        res.send(formatData({
            status: 0
        }));
    }    
})

// 获取正在售卖
Router.get('/sellList', async (req, res) => {
    let { id } = req.query;
    let data = await find('goodsDetail', { sellPeapleId: Number(id) });
    for(let i= data.length-1; i >= 0; i--) {
        if(data[i].selled == 1 || data[i].selled == 2) {
            data.splice(i,1)
        }
    }
    
    res.send(formatData({data}))
})



// 删除已经售卖
Router.get('/deletedGoods', async (req, res) => {
    let { id, signId } = req.query;
    let result = await find('user', { id: Number(id) });
    let selledList = result[0].isSelled;
    for(let i = selledList.length-1; i >= 0; i--) {
        if(selledList[i] == signId) {
            selledList.splice(i,1)
        }
    }
    let result2 = await update('user', { id: Number(id) }, { isSelled: selledList });
    if(result2.result.ok == 1) {
        res.send(formatData());
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

// 删除已经买入
Router.get('/deleteBuyed', async (req, res) => {
    let { id, signId } = req.query;
    let result = await find('user', { id: Number(id) });
    let buyedList = result[0].isBuyed;
    for(let i = buyedList.length-1; i >= 0; i--) {
        if(buyedList[i] == signId) {
            buyedList.splice(i,1)
        }
    }
    let result2 = await update('user', { id: Number(id) }, { isBuyed: buyedList });
    if(result2.result.ok == 1) {
        res.send(formatData());
    } else {
        res.send(formatData({
            status: 0
        }));
    }
})

// 获取已经售卖
Router.get('/selledList', async (req, res) => {
    let { id } = req.query;
    let result = await find('user', { id: Number(id) });
    let isSelled = result[0].isSelled ? result[0].isSelled : [];
    let data = [];
    for(let i = 0; i < isSelled.length; i++) {
        let result1 = await find('goodsDetail', { signId: isSelled[i] });
        data.push(result1[0])
    }
    res.send(formatData({data}))
})

// 获取已经买入
Router.get('/buyedList', async (req, res) => {
    let { id } = req.query;
    let result = await find('user', { id: Number(id) });
    let isBuyed = result[0].isBuyed ? result[0].isBuyed : [];
    let data = [];
    for(let i = 0; i < isBuyed.length; i++) {
        let result1 = await find('goodsDetail', { signId: isBuyed[i] });
        data.push(result1[0])
    }
    res.send(formatData({data}))
})

// 获取分类页列表 -- 商品列表
Router.get('/search', async (req, res) => {
    
    let { title } = req.query;
    
    let result = await find('goodsDetail', {}, { title });
    res.send(result)
})

// 获取分类页列表 -- 商品列表
Router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let { sortType } = req.query;
    let result = await find('goodsDetail');
    for(let i = result.length-1; i >= 0; i--) {
        if(result[i].selled == 1 || result[i].selled == 2) {
            result.splice(i,1)
        }
    }
    
    let data = []
    if(sortType == 3) {
        result.map(item => {
            if(item.parentId === id && item.addressCode == 1) {
                data.push(item)
            }
        })
    } else if(sortType == 4) {
        result.map(item => {
            if(item.parentId === id && item.addressCode == 3) {
                data.push(item)
            }
        })
    } else if(sortType == 5) {
        result.map(item => {
            if(item.parentId === id && item.addressCode == 2) {
                data.push(item)
            }
        })
    } else {
        result.map(item => {
            if(item.parentId === id) {
                data.push(item)
            }
        })
    }
    let length = data.length;
    let revres = []
    if(length > 0) {
        for(let i = length - 1; i >= 0; i--) {
            revres.push(data[i])
        }
        
    }
    res.send({ data: revres })
})

// 获取商品详情+收藏状态
Router.get('/goodsDetail/:id', async (req, res) => {
    let { id } = req.params;
    let { personId } = req.query;
    let result = await find('goodsDetail', { signId: id });
    let result2 = await find('user', { id: Number(personId) });
    let flage = false;
    if(result2[0].collect) {
        let arr = result2[0].collect;
        for(let i = arr.length; i>= 0; i--) {
            if(arr[i] == id) {
                flage = true;
            }
        }
    }
    res.send({ data: result, flage })
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


const multiparty = require('multiparty');

//上传商品
Router.post('/addGoods', async (req, res) => {
    let ruleForm = req.body;
    
    // var imgData = req.body.img;
    
    // //过滤data:URL
    // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    // var dataBuffer = Buffer.from(base64Data, 'base64');
    // let imgName = `${new Date().getTime()}image.png`;
    // fs.writeFile( imgName, dataBuffer, async function(err) {
    //     if(err){
    //         res.send(formatData({
    //             status: 0
    //         }));
    //     }else{
            // ruleForm.img = `C:\/Users\/Administrator\/Desktop\/ershoujiaoyi\/secondaryMarket\/src\/database\/${imgName}`
            ruleForm.selled = 0
            ruleForm.sellPeapleId = Number(ruleForm.sellPeapleId)
            let result = await create('goodsDetail', ruleForm)
            if (result.insertedCount > 0) {                
                let id = ruleForm.sellPeapleId
                let result2 = await find('user', { id: Number(id) });
                if (result2.length > 0) {
                    let arr = result2[0].sellNow ? result2[0].sellNow : [];
                    arr.push(ruleForm.signId)
                    let result3 = await update('user', { id: Number(id) }, {sellNow: arr});
                    if(result3.result.ok == 1) {
                        // 写入之后，写入commit数据库
                        let result4 = await find('commit', { title: ruleForm.parentName });
                        if(result4.length > 0) {
                            let arr2 = result4[0].list;
                            arr2.unshift(ruleForm);
                            arr2.pop(arr2[4]);
                            let result5 = await update('commit', { title: ruleForm.parentName }, { list: arr2 });
                            if(result5.result.ok == 1) {
                                
                                res.send(formatData());
                            }
                        }
                    }
                } else {
                    res.send(formatData({
                        status: 0
                    }));
                }
            }
        // }
    // });
    
})

//编辑商品
Router.post('/editGoods', async (req, res) => {
    let ruleForm = req.body;
    let signId = ruleForm.signId;
    let result1 = await update('goodsDetail', { signId }, ruleForm);
    if(result1.result.ok == 1) {
        // 写入之后，写入commit数据库
        res.send(formatData());
    } else {
        res.send(formatData({
            status: 0
        }));
    }  
})

//评论
Router.post('/pingLunCommit', async (req, res) => {
    // 评论之后会写入卖家名下，也会写入商品下面
    let ruleForm = req.body;
    let sellPeapleId = ruleForm.sellPeapleId;
    let id = ruleForm.pingLunId;
    let pingLun1 = ruleForm.pingLun;
    let signId = ruleForm.signId;
    let result = await update('goodsDetail', { signId }, { pingLun: pingLun1 })
    if(result.result.ok == 1) {
        let result1 = await find('personDetail', { sellPeapleId: Number(sellPeapleId) });
        let result2 = await find('personDetail', { sellPeapleId: Number(id) });// 获取卖家名字
        ruleForm.pingLunName = result2[0].sellPeaple;
        let pingLun = result1.pingLun ? result1.pingLun : [];
        pingLun.push(ruleForm)
        let result3 = await update('personDetail', { sellPeapleId: Number(sellPeapleId) }, { pingLun })
        if(result3.result.ok == 1) {
            res.send(formatData());
        } 
    } else {
        res.send(formatData({
            status: 0
        }));
    } 
})


module.exports=Router;