function fun1(name, age) {
    return { name: name, age: age };
}
fun1('wjt', 29);
//可选参数
function fun2(name, age) {
    return name;
}
fun2('wjt');
//默认值
function fun3(name, age) {
    if (age === void 0) { age = 29; }
    return { name: name, age: age };
}
fun3('wjt');
var fun4 = function (num1, num2) {
    return num1 + num2;
};
fun4(1, 2);
//定义剩余参数
var fun5 = function (array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    return items;
};
var a = [1, 2, 3];
fun5(a, [4, 5, 6]);
function fun6(params1, params2) {
    console.log(params1);
    console.log(params2);
}
fun6(123);
fun6('123', 456);
