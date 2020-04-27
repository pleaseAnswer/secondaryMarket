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
 * 查--传参
 * @param {String} colName   集合名称
 * @param {Object} query     查询条件 
 * @param          fields    过滤字段
 */
async function find(colName, query = {}, options = {}) {
    
    //fields:用于过滤某些字段
    let { fields: attr, skip, limit, sort } = options;
    const { db, client } = await connect();


    //集合或文档操作
    // 获取集合
    let collection = db.collection(colName);

    //处理id查询
    if (query._id && typeof query._id == 'string') {
        query._id = ObjectId(query._id);
    }

    //promise对象--.toArray()才能拿到结果

    let result = await collection.find( query, {attr}).toArray();
    console.log(3234,result);
    


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
    find,
    
}