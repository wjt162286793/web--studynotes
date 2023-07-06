//布尔类型
var booleanVal = true;
console.log(booleanVal, '布尔类型');
//字符串类型
var str1 = '字符串';
str1 = '修改后的字符串';
console.log(str1, '字符串');
//数字类型(支持二,八,十,十六进制)
var num1 = 1;
var num2 = 0xf00d;
var num3 = 10;
var num4 = 484;
console.log(num1, num2, num3, num4, '数字类型');
//数组类型
//格式1,元素[]
var arr1 = [1, 2, 3];
//格式2,泛型
var arr2 = ['1', '2', '三'];
console.log(arr1, arr2, '数组');
//元组
var t1;
t1 = ['字符', 10, true];
//枚举
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 0] = "Red";
    Color1[Color1["Green"] = 1] = "Green";
    Color1[Color1["Blue"] = 2] = "Blue";
})(Color1 || (Color1 = {}));
var c1 = Color1.Green;
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
var c2 = Color2.Red;
console.log(c1, c2, '枚举值');
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 3] = "Blue";
})(Color3 || (Color3 = {}));
var color1 = Color3[2];
console.log(color1, 'color1的枚举名称');
//任意类型
var anyVal1 = '1';
console.log('任意类型修改前', anyVal1);
anyVal1 = true;
console.log('任意类型修改后', anyVal1);
var arr3 = [1, 'true', true];
console.log(arr3, '修改前的数组');
arr3 = ['false', '哈哈哈', false];
console.log('修改后的数组', arr3);
//Void类型
//与any完全相反,表示不属于任何类型
function warnUser() {
    console.log('void');
}
//因为warnUser函数没有返回值,相当于啥也不是
//void类型的变量可以赋值undefined和null类型
var nu1 = null;
var un1 = undefined;
console.log(nu1, un1, 'void的值');
//null和undefined类型
var nu2 = null;
var un2 = undefined;
console.log(nu2, 'null类型');
console.log(un2, 'undefined类型');
//never类型
//never类型表示永远不存在的值类型,例如抛出异常或者无值的函数,箭头函数返回值等
//never类型是任何类型的子类型,可以赋值任何类型.但是没有任何类型是never的子类型可以赋值给never类型.除了never本身.即使是any也不可以赋值给never.
function error1(a) {
    throw new Error(a);
}
//object类型
var obj1 = { a: 1 };
console.log(obj1, '对象类型');
