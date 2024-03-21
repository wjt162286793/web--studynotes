//布尔值
var bool_1 = false;
//数字
var num_1 = 6; //十进制
var num_2 = 0xf00d; //十六进制
var num_3 = 10; //二进制
var num_4 = 484; //八进制
//字符串
var str_1 = '字符串';
var str_2 = "\u6A21\u677F\u5B57\u7B26\u4E32";
//数组
var arr_1 = [1, 2, 3];
var arr_2 = [2, 3, 4];
var arr_3 = ['a', 'b', 'c'];
var arr_4 = ['b', 'c', 'd'];
//元组Tuple
var tuple_1 = ['a', 1, true];
// tuple_1 = [1,'a',false]  //error
tuple_1 = ['b', 2, false];
//枚举
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c_1 = Color.Green;
console.log(c_1, 'c_1的值');
var colorName = Color[2];
console.log(colorName, 'colorName的值');
//任意类型
var any_val1 = '任意值';
var any_val2 = ['1', 2, 3];
any_val1 = { name: 'any_obj' };
any_val2 = null;
//Void类型
function fn_1() {
    console.log('I`m a funciton');
}
var void_val1 = null;
void_val1 = undefined;
// void_val1 = '字符串'  //error
// null和undefined类型
var null_1 = null;
var undefined_1 = undefined;
// null_1 = '哈哈哈' //error
//Never类型
function errorFn_1() {
    throw new Error('哈哈哈');
    // return '哈哈哈'  error
}
function neverFn_1() {
    while (true) {
    }
}
create({ val: 111 });
create(null);
// create(number) //error
//类型断言
var val_dy = '要被断言类型的值';
// let length_1 : number = (<string>val_dy).length
var length_1 = val_dy.length;
var arr_dy = ['哈哈哈', '呵呵呵', (function () { return 1 + '2'; })()];
var val_2 = arr_dy[2];
