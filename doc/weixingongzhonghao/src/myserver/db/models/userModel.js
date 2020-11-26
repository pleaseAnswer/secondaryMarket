let mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    user: String,
    pwd: String
})// 表结构对象

var userModel = mongoose.model('userSchema', userSchema);// 操作表结构对象的数据模型

module.exports = userModel;