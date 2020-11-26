// const mongodb = require('mongodb);
// const mongodbClient = mongodb.MongoClient;
const { MongoClient, ObjectId } = require('mongodb');

// 连接MongoDB数据库 -- connect
const { dbUrl, dbName } = require('../config.json');

// 执行async函数，得到的返回值是promise对象
async function connect() {
    const client = await MongoClient.connect(dbUrl, {
        useUnifiedTopology: true
    });
    const db = client.db(dbName);
    return {
        client,
        db
    }
}

/**
 * 增--注册
 * @param  {String}        colName   集合名称
 * @param  {Array|Object}  data      插入的数据
 * @return {Object}                  返回写入的结果
 */
async function create(colName, data) {
    
    const { db, client } = await connect();
    let collection = db.collection(colName);
    //判断传入的Data是否为数组
    if (!Array.isArray(data)) {
        data = [data]
    }
    let result = await collection.insertMany(data);
    client.close();
    return result;
}

/**
 * 删除
 * @param {String} colName   集合名称 
 * @param {object} query     查询条件
 */
async function remove(colName, query) {
    const { db, client } = await connect();   
    let collection = db.collection(colName);   
    let result = await collection.deleteMany({ id: Number(query.id) });    
    client.close();
    return result;
}

/**
 * 更新
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 * @param {Object} data     更新字段数据
 */
async function update(colName, query, data) {
    const { db, client } = await connect();
    let collection = db.collection(colName);
    //处理id查询
    // {_id:'xxxxx'} -> {_id:ObjectId('xxxxx')}
    if (query._id && typeof query._id == 'string') {
        query._id = ObjectId(query._id);
    }
    //具体操作查看中文网
    let result = await collection.updateMany(  query, {$set: data})
    return result;
}

/**
 * 查--传参
 * @param {String} colName   集合名称
 * @param {Object} query     查询条件 
 * @param          fields    过滤字段
 */
async function find(colName, query = {}, options = {}) {
    //fields:用于过滤某些字段
    let { fields: attr, skip, limit, sort, title, username, password } = options;
    const { db, client } = await connect();
    //集合或文档操作
    // 获取集合
    let collection = db.collection(colName);

    //处理id查询
    if (query._id && typeof query._id == 'string') {
        query._id = ObjectId(query._id);
    }

    //promise对象--.toArray()才能拿到结果
    let result = await collection.find().toArray();
    if(query) {
        result = await collection.find(query, { attr }).toArray();
    }
    

    // db.user.find({age:{$in:[null],$exists:true}}) //查找age属性存在但值为null的数据
    // 模糊查询
    if(title) {
        result = await collection.find({title:{$regex:title}}).toArray();
    }
    // or查询
    
    // state1=11 and state2=22）
    // db.getCollection('testOrAnd').find(
    //     {$and:[{"state1":11},{"state2":22}]}
    // )
    // db.getCollection('testOrAnd').  find(
    //     { $or:[{"value":{$gte:300}}] }
    // )
    // db.getCollection('testOrAnd').find({$or:
    //     [
    //         {$and:[{"state1":11},{"state2":22}]},{"value":{$gte:300}}
    //     ]
    // })
    if(username) {
        result = await collection.find({ $or:
            [
                {$and:[{"mobile":username},{"password":password}]},
                {$and:[{"xuehao":username},{"password":password}]}
            ]
     }).toArray();
    }
    

    //跳过数量
    if (skip) {
        result = result.skip(skip);
    }

    // 限制数量
    if (limit) {
        result = result.limit(limit * 1);
    }
    //排序1-》升序 -1-》降序
    // sort="price"
    if (sort) {
        // 处理排序规则
        //sort="price" | sort="price,1"
        let arr = sort.split(',');
        let key = arr[0];
        let value = arr[1] ? arr[1] * 1 : -1;
        
        result = result.sort({
            // [sort]:-1
            [key]: value
        });
    }
    client.close();
    
    return result;
}

module.exports = {
    create,
    remove,
    update,
    find
}