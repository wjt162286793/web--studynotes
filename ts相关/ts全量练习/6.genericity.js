// 泛型函数
function genericity_fun1(name) {
    return name;
}
// 写法1
var result_1 = genericity_fun1('wjt');
//写法2:自动推导类型
var result_2 = genericity_fun1('wjt');
//泛型变量
function genericity_fun2(arr) {
    console.log(arr.length, 'genericity_fun2');
    return arr;
}
var result_3 = genericity_fun2(['wjt', 'mashi']);
//泛型类型
function genericity_fun3(name) {
    return name;
}
// let result_4:<T>(name:T)=>T = genericity_fun3
//具体用T还是用什么字母,纯看自己,只要对的上,如下
var result_4 = genericity_fun3;
//也可以这样写
var result_5 = genericity_fun3;
function genericityInterface_1(name) {
    return name;
}
var result_6 = genericityInterface_1;
function genericityInterface_2(arr) {
    return arr;
}
var result_7 = genericityInterface_2;
//泛型类
var Genericity_Class = /** @class */ (function () {
    function Genericity_Class() {
    }
    return Genericity_Class;
}());
var number_result_1 = new Genericity_Class();
number_result_1.initVal = 0;
number_result_1.addFun = function (x, y) { return x + y; };
console.log(number_result_1.addFun(1, 2), 'number_result_1.addFun');
var string_result_1 = new Genericity_Class();
string_result_1.initVal = '初始化字符';
string_result_1.addFun = function (x, y) { return x + y; };
console.log(string_result_1.addFun('我是', '字符串'));
function genericity_constraint2(arr) {
    console.log(arr.length, 'genericity_constraint2的length');
    return arr;
}
genericity_constraint2(['wjt', 'mashi']);
