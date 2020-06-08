const jwt = require('jsonwebtoken');
const secretKey = '2020'; // 秘钥

/**
 * @description: 加密
 * @param {object} data 加密的数据 
 * @param {number | string} expiresIn 有效期
 * @return: 返回token 
 */
function create(data, expiresIn = '7d') {
    var token = jwt.sign(
        data,
        secretKey,
        {
            expiresIn
        }
    );
    return token;
}

function verify(token) {
    let result;
    try {
        var decoded = jwt.verify(token, secretKey);
        result = true;
    } catch(err) {
        result = false;
    }
    return result;
}

module.exports = {
    create,
    verify
}
