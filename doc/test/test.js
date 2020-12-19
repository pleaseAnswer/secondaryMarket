this.list.map(item => {
    let oDate = new Date(1606722038000);
    item = `${oDate.getFullYear()}-${oDate.getMonth()+1}-${oDate.getDate()}`
})


let a = function() {}
a.prototype.num= 90
let b = function(){}
b.prototype = new a
console.log(b.num)
console.log(b.prototype)
b.prototype = a.prototype
a
b
b.num
b.prototype.num
a.num

let a = function() {}
a.prototype = {
    constructor: a,
    f1: function() {
    console.log("f1");
    },
    f2: function() {
    console.log("f2");
    },
    f3: function() {
    console.log("f3");
    },
    type: "测试的类型"
};
let b = function(){}
b.prototype = a.prototype

let dd = new Function()
dd.__proto__.num = 99
dd.prototype.num =100
dd.num


let dd = new Function()
dd.__proto__
Function.prototype

let a = function() {}
a.__proto__.num= 90
let b = function(){}
b.__proto__ = a
console.log(b.num)
console.log(b.prototype)
b.prototype = a.prototype
a
b
b.num
b.prototype.num
a.num
let ao = {
        yac002:"440582199808192661" ,//"45213019740418061X", //身份证号,
        aac003:"440582199808192661" ,//"吴卫平", //姓名,
        aac002:"440582199808192661" ,// "45213019740418061X", //社会保障号码,
        aac058_desc:"440582199808192661" ,// "居民身份证", //证件类型,
        aac004_desc:"440582199808192661" ,// "男", //性别,
        age:"" , //"12", //年龄,
        aac006:"" ,// "1974-04-18", //出生日期,
        aac025:"" ,// "广西钦州", //出生地,
        aac005_desc:"" ,// "回族", //民族,
        aac011_desc:"" ,// "大学本科", //文化程度,
        //aac201:	档案出生日期,
        aac009_desc:"" ,// "农业户口（农村）", //户口性质,
        aae005:"" ,// "17862827309", //联系电话,
        aac033_desc:"" ,// "", //健康状况,
        aac024_desc:"" ,// "", //政治面貌,
        aac186:"" ,// "", //户口登记日期,
        aac017_desc:"" ,// "", //婚姻状况,
        aac010:"" ,// "广西省钦州市钦州港区", //户口行政区划,
        aac010_1:"" ,// "广西省钦州市钦州港区", //户口详细地址,
        aab301:	"" ,// "", //户口行政区划码值,
        aae006:"" ,// "广西省钦州市钦州港区", //常住地址行政区划,
        aae006_1:"" ,// "广西省钦州市钦州港区", //常住地详细地址,
        yac100:"" ,// 常驻行政区划码值,

        yac404_desc:"" ,// 个人状态,
        aac021:"" ,// 就业失业登记证编号,
        bcc05k:"" ,// "Tecsun" // 采集人,
        yae100_desc:"" ,// "Tecsun" //  数据来源cc04,
        //aae017:	数据的经办机构该人查询出来的cc05

        // 家庭成员列表
        yac0d0:"" ,// 与户主关系,
        // aac003:"" ,// 姓名,
        // yac002:"" ,// 身份证号,
        aac016:"" ,// 就失业状态,
        yac903:"" ,// 是否农村劳动力,
        ycc04f:"" ,// 转移就业状态,
        aac012:"" ,// 求职意愿工种,
        // aac005:"" ,// 民族,
        aac009:"" ,// 户口性质,
        aac011:"" ,// 文化程度,
        // aae005:"" ,// 联系电话,
        // aae006:"" ,// 联系地址,

        // 劳动力资源信息
        aac0c9_desc:"" ,// 是否贫困劳动力,
        yae514_desc:"" ,// 贫困劳动力类别,
        ycc06f_desc:"" ,// 脱贫状态,
        zac09f_desc:"" ,// 是否易地搬迁劳动力,
        azc09g:"" ,// 搬迁前住址,
        aac1d5:"" ,// 搬迁后住址,
        zac09r_desc:"" ,// 是否返乡人员,
        yac044_desc:"" ,//  人口资源分类,
        ycc04f_desc:"" ,//  就业(转移)状态,
        yac047:"" ,// 转移就业时间,
        ycc04f_11_desc:"" ,//  就业(转移)状态_rpc修改前的状态值,
        yac047_11:"" ,// （f是否转移）时间_原来的旧时间,
        ycc0ob_11:"" ,// 转移就业地点_原来的地址信息,
        ycc0o4_11:"" ,// 转移就业地点码值_原来的码值信息,
        yac048_11_desc:"" ,//  转移就业方式_原来的信息,
        aab004_11:"" ,// 工作单位名称_原来的信息,
        aac1ae_11:"" ,// 提供职业培训次数,
        aac1ab_11:"" ,// 提供职业指导次数(次),
        aac1an_11:"" ,// 岗位推送次数(次),

        // 务农登记信息
        ycc04u_desc:"" ,// 务农内容,

        //培训情况
        aac015_desc:"", //   训职业资格等级
        ycc04b_desc:"", //   接受过职业培训
        ycc02n_desc:"", //   是否有培训意愿
        ahc056:"", //           参加培训时间
        aac1ae:"", //           提供职业培训次数

        //就业帮扶记录信息
        aac1ak_desc:"", //   帮扶服务内容
        aac1af_desc:"", //     是否享受职业培训补贴
        aac1ag_desc:"", //    是否享受社会保险补贴
        aac1ah_desc:"", //    是否享受岗位补贴
        aac1aj_desc:"", //     是否享受其他政策扶持
        yac045_desc:"", //    技能情况
        ycc04c_desc:"", //     国家职业资格名称
        aac1ab:"", //      提供职业指导次数(次)
        aac1an:""// 岗位推送次数(次)
        "yac002":"440582199808192661" ,//"45213019740418061X", //身份证号,
        "aac003":"440582199808192661" ,//"吴卫平", //姓名,
        "aac002":"440582199808192661" ,// "45213019740418061X", //社会保障号码,
        "aac058_desc":"440582199808192661" ,// "居民身份证", //证件类型,
        "aac004_desc":"440582199808192661" ,// "男", //性别,
        "age":"" , //"12", //年龄,
        "aac006":"" ,// "1974-04-18", //出生日期,
        "aac025":"" ,// "广西钦州", //出生地,
        "aac005_desc":"" ,// "回族", //民族,
        "aac011_desc":"" ,// "大学本科", //文化程度,
        "aac009_desc":"" ,// "农业户口（农村）", //户口性质,
        "aae005":"" ,// "17862827309", //联系电话,
        "aac033_desc":"" ,// "", //健康状况,
        "aac024_desc":"" ,// "", //政治面貌,
        "aac186":"" ,// "", //户口登记日期,
        "aac017_desc":"" ,// "", //婚姻状况,
        "aac010":"" ,// "广西省钦州市钦州港区", //户口行政区划,
        "aac010_1":"" ,// "广西省钦州市钦州港区", //户口详细地址,
        "aab301":	"" ,// "", //户口行政区划码值,
        "aae006":"" ,// "广西省钦州市钦州港区", //常住地址行政区划,
        "aae006_1":"" ,// "广西省钦州市钦州港区", //常住地详细地址,
        "yac100":"" ,// 常驻行政区划码值,

        "yac404_desc":"" ,// 个人状态,
        "aac021":"" ,// 就业失业登记证编号,
        "bcc05k":"" ,// "Tecsun" // 采集人,
        "yae100_desc":"" ,// "Tecsun" //  数据来源cc04,

        // 家庭成员列表
        "yac0d0":"" ,// 与户主关系,
        "aac016":"" ,// 就失业状态,
        "yac903":"" ,// 是否农村劳动力,
        "ycc04f":"" ,// 转移就业状态,
        "aac012":"" ,// 求职意愿工种,
        "aac009":"" ,// 户口性质,
        "aac011":"" ,// 文化程度,

        // 劳动力资源信息
        "aac0c9_desc":"" ,// 是否贫困劳动力,
        "yae514_desc":"" ,// 贫困劳动力类别,
        "ycc06f_desc":"" ,// 脱贫状态,
        "zac09f_desc":"" ,// 是否易地搬迁劳动力,
        "azc09g":"" ,// 搬迁前住址,
        "aac1d5":"" ,// 搬迁后住址,
        "zac09r_desc":"" ,// 是否返乡人员,
        "yac044_desc":"" ,//  人口资源分类,
        "ycc04f_desc":"" ,//  就业(转移)状态,
        "yac047":"" ,// 转移就业时间,
        "ycc04f_11_desc":"" ,//  就业(转移)状态_rpc修改前的状态值,
        "yac047_11":"" ,// （f是否转移）时间_原来的旧时间,
        "ycc0ob_11":"" ,// 转移就业地点_原来的地址信息,
        "ycc0o4_11":"" ,// 转移就业地点码值_原来的码值信息,
        "yac048_11_desc":"" ,//  转移就业方式_原来的信息,
        "aab004_11":"" ,// 工作单位名称_原来的信息,
        "aac1ae_11":"" ,// 提供职业培训次数,
        "aac1ab_11":"" ,// 提供职业指导次数(次),
        "aac1an_11":"" ,// 岗位推送次数(次),

        // 务农登记信息
        "ycc04u_desc":"" ,// 务农内容,

        //培训情况
        "aac015_desc":"", //   训职业资格等级
        "ycc04b_desc":"", //   接受过职业培训
        "ycc02n_desc":"", //   是否有培训意愿
        "ahc056":"", //           参加培训时间
        "aac1ae":"", //           提供职业培训次数

        //就业帮扶记录信息
        "aac1ak_desc":"", //   帮扶服务内容
        "aac1af_desc":"", //     是否享受职业培训补贴
        "aac1ag_desc":"", //    是否享受社会保险补贴
        "aac1ah_desc":"", //    是否享受岗位补贴
        "aac1aj_desc":"", //     是否享受其他政策扶持
        "yac045_desc":"", //    技能情况
        "ycc04c_desc":"", //     国家职业资格名称
        "aac1ab":"", //      提供职业指导次数(次)
        "aac1an":""// 岗位推送次数(次)
}

/**
 * 删除
 * @param {String} colName 集合名称
 * @param {Object} query 查询条件
*/
async function remove(colName, query) {
    const {db, client} = await connect();
    let collection = db.collection(colName);
    let result = await collection.deleteMany(query);
    client.close();
    return result;
}
/**
 * 更新
 * @param {String} colName 集合名称
 * @param {Object} query 查询条件
 * @param {Object} data 更新字段数据
*/
async function update(colName, query, data) {
    const {db, client} = await connect();
    let collection = db.collection(colName);
    let result = await collection.updateMany(query, {$set: data});
    client.close();
    return result;
}
/**
 * 查
 * @param {String} colName 集合名称
 * @param {Object} query 查询条件
*/
async function find(colName, query) {
    const {db, client} = await connect();
    let collection = db.collection(colName);
    // promise对象--.toArray()才能拿到结果
    let result = await collection.find(query).toArray();
    client.close();
    return result;
}
/**
 * 查
 * @param {String} colName 集合名称
 * @param {Object} query 查询条件
*/
async function find(colName, query) {
    const {db, client} = await connect();
    let collection = db.collection(colName);

    // 处理id查询 {_id: 'xxx'} -> {_id: ObjectId('xxx')}
    if(query._id && typeof query._id === 'string') {
        query._id = Object(query._id);
    }
    // promise对象--.toArray()才能拿到结果
    let result = await collection.find(query).toArray();
    client.close();
    return result;
}
/**
 * 查
 * @param {String} colName 集合名称
 * @param {Object} query 查询条件
 * @param   fields 过滤字段
*/
async function find(colName, query = {}, {fields} = {}) {
    const {db, client} = await connect();
    let collection = db.collection(colName);

    if(query._id && typeof query._id === 'string') {
        query._id = Object(query._id);
    }
    // promise对象--.toArray()才能拿到结果
    let result = await collection.find(query, {fields}).toArray();
    client.close();
    return result;
}