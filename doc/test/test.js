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

