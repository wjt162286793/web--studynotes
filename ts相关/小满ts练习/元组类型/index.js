//元组
var array_1 = [123, '字符串'];
var array_2 = [123, true, '字符串', undefined];
var array_3 = [123, '字符串'];
// array_3[0].length  //报错
array_3[1].length; //正确
//元组类型支持还可以支持自定义名称和变为可选的
var array_4 = [123];
//越界元素
var array_5 = [123, 'string'];
// array_5.push(true)   //报错
//嵌套元组
var excel = [
    ['wjt1', 1, true],
    ['wjt2', 2, false]
];
