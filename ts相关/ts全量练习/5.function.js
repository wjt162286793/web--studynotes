//函数定义类型
// function(参数:类型):返回值类型{}
function fun_test_1(num1, num2) {
    return num1 + num2;
}
console.log(fun_test_1(1, 2), 'fun_test_1调用');
function fun_test_2(name, age) {
    console.log("\u6211\u662F".concat(name, ",\u6211\u4ECA\u5E74").concat(age, "\u5C81"));
}
fun_test_2('wjt', 28);
//完整写法
// let 函数名:(参数:类型) => 返回值类型 = 函数体
var fun_test_3 = function (name, age) {
    return { name: name, age: age };
};
console.log(fun_test_3('wjt', 29), 'fun_test_3完整写法调用');
//推断类型
var fun_test_4 = function (num, str) {
    return num + str;
};
console.log(fun_test_4(56, '个民族'), '自动推导返回类型');
//可选参数
//ts中形参必须对应有实参,如果用?,可以让该参数变为可选参数,默认是undefined
// function fun_test_5(name:string,age:number){
//     console.log(name,age)
// }
// fun_test_5('wjt') //error
function fun_test_5(name, age) {
    console.log(name, age, 'fun_test_5函数调用');
}
fun_test_5('wjt');
//默认参数
function fun_test_6(name, age) {
    if (age === void 0) { age = 28; }
    console.log(name, age, 'fun_test_6函数调用');
}
fun_test_6('wjt');
//剩余参数
function fun_test_7(firstParam) {
    var otherParam = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherParam[_i - 1] = arguments[_i];
    }
    console.log(firstParam, '第一个参数');
    console.log(otherParam, '其余参数');
}
fun_test_7('wjt', 28, function () { return 'game'; }, { love: 'study' });
//官方文档点睛之笔:普通函数在顶级的非方法式调用,会将this视为window。箭头函数能保存函数创建时候的值,而不是调用时的值。
function fun_test_8() {
    return function () {
        console.log(this, 'this的值');
    };
}
var this_val_1 = fun_test_8();
this_val_1();
function fun_test_9() {
    return {
        name: 'fun',
        obj_fun: function () {
            console.log(this, 'this的值');
        }
    };
}
var obj_val_1 = fun_test_9();
console.log(obj_val_1, '???');
var fun_val_1 = obj_val_1.obj_fun;
console.log(fun_val_1());
