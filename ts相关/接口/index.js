function fun1(value) {
    console.log(value, '对象参数');
}
var obj_1 = { a: '字符串', b: 2 };
fun1(obj_1);
//interface不会去检查属性的顺序,只要相应的属性存在类型也对就行
var obj_2 = { b: 3, a: '串串' };
fun1(obj_2);
var obj3 = { a: '就一个串' };
function fun2(value) {
    console.log(value, '可选对象参数');
}
var obj_4 = { b: '串串' };
fun2(obj_4);
// let obj5 = {a:true,b:'字符串',c:'串串'} //error
var obj5 = { a: true, b: '字符串', c: 1 };
fun2(obj5);
var obj_6 = { e: 2, f: '串' };
// obj_6.e = 4 //error
obj_6.f = '串串';
console.log(obj_6, '对象6');
//只读数组
var arr_1 = [1, 2, 3, 4];
// arr_1[0] = 5 //error
// arr_1 = [2,3,4,5] //error
//断言重写
arr_1;
arr_1 = [1, 2, 3, 4];
arr_1 = [2, 3, 4, 5];
console.log(arr_1, '数组1');
var fun_1;
fun_1 = function (a1, b1) {
    console.log(a1, b1, 'arguments???');
    return 'haha';
};
var fun_1value = fun_1(1, '串串');
console.log(fun_1value, '返回值');
var arr_2;
arr_2 = ['拿破仑', '卡尔大公'];
var str_1 = arr_2[0];
console.log(str_1, '通过索引获取的值');
var timer = /** @class */ (function () {
    function timer(h, m) {
    }
    return timer;
}());
var time_1 = new timer(1, 2);
console.log(time_1, 'timer的实例');
