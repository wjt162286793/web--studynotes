//函数泛型
function fun1(str, num) {
    return [str, "".concat(num)];
}
//泛型优化
function fun2(str1, str2) {
    return [str1, str2];
}
fun2('字符串1', '字符串2');
function fun3(a, b) {
    return [a, b];
}
fun3(1, 2);
fun3('1', '2');
function fun4(a, b) {
    var params = [a, b];
    return params;
}
fun4(false, 1);
function fun5(arg) {
    return arg;
}
var result1 = fun5;
result1(123);
var result2 = fun5;
result2('wjt');
//对象字面量泛型
var obj1;
obj1 = function (arg) {
    return arg;
};
obj1(123);
function getLength(arg) {
    return arg.length;
}
getLength('123');
//使用keyof约束对象
function prop(obj, key) {
    return obj[key];
}
var o = { a: 1, b: 2, c: 3 };
prop(o, 'a');
//泛型类
var Sub = /** @class */ (function () {
    function Sub() {
        this.attr = [];
    }
    Sub.prototype.add = function (a) {
        return [a];
    };
    return Sub;
}());
var sub1 = new Sub();
sub1.attr = [1, 2, 3];
sub1.add(123);
var sub2 = new Sub();
sub2.attr = ['1', '2', '3'];
sub2.add('123');
