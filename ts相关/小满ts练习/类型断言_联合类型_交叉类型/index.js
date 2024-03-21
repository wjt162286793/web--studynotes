//联合类型  number和string都可以
var phoneCode = '010-8203222';
phoneCode = 1234567890;
//函数联合类型
var function1 = function (something) {
    return !!something;
};
var function2 = function (personInfo) {
    console.log(personInfo);
};
function2({ name: 'wjt', age: 29, love: function () { return 'jscoder'; } });
var function3 = function (info) {
    //  return info.name   //会警告
    return info.name; //断言,格式为:(对象 as 接口).属性
};
//使用any临时断言
// window.prop1 = 123  //报错
window.prop1 = 123;
//as const
var name1 = 'wjt';
// name1 = 'wangjingtao'  //报错
var name2 = 'wjt';
// name2 = 'wangjingtao' //报错
//数组
var array1 = [10, 20];
// array1.push(30) //报错
var array2 = [10, 20];
array2.push(30);
//类型断言是不会产生影响力的
function toBooloean(param) {
    return param;
}
toBooloean(1);
