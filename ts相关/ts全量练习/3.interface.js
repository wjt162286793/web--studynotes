//接口
var interface_test_1 = {
    name: 'wjt',
    age: 29,
    love: function () { return 'game'; },
    // work:'coder'  //error
};
var person_1 = {
    name: 'wjt',
    age: 28,
    love: 'game',
};
var fn_1 = function (person) {
    return person.love;
};
fn_1(person_1);
var wjt_1 = {
    name: 'wjt',
    work: true,
    price: 24000
};
var mashi_1 = {
    name: 'mashi',
    price: 10000
};
var person_2 = { name: 'wjt', age: '28' }; //这里age字符串也没有报错
var getWife = function (person_2) {
    var wife = { name: 'null', age: 0, love: 'wjt' };
    if (person_2.name) {
        wife.name = 'mashi';
    }
    if (person_2.age) {
        wife.age = 29;
    }
    return wife;
};
getWife(person_2);
var readObj_1 = {
    name: 'wjt',
    age: 28
};
// readObj_1.name = 'jt' //error
readObj_1.age = readObj_1.age + 1;
//不可变数组(可整体替换,不可单独修改)
var readArr_1 = [1, 2, 3, 4, 5];
// readArr_1.map(item:number=>item+1) //error
var arr_1 = [1, 2, 3, 4, 5];
var arr_2 = arr_1.map(function (item) { return item + 1; });
console.log(arr_1, '原可变数组');
console.log(arr_2, '变化后数组');
readArr_1 = [3, 4, 5];
console.log(readArr_1, '可以将数组整个替换'); //[3,4,5]
var interface_test_3 = {
    name: 'wjt',
    work: 'coder',
    love: function () { return 'game'; }
};
var fun_obj_1 = {
    name: 'wjt',
    age: 28,
    work: 'js-coder'
};
var interface_fun_1 = function (obj) {
    return Object.assign({ val: 1 }, obj);
};
interface_fun_1(fun_obj_1);
var obj_arr_1 = [
    { name: 'wjt' }, { name: 'xm' }
];
var class_1 = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
var class_shili_1 = new class_1();
var extends_var_1 = { name: 'wjt' };
var extends_var_2 = { name: 'wjt', age: 28 };
var extends_var_3 = { name: 'wjt', age: 28, love: function () { return 'game'; } };
function interface_mix_fun() {
    var obj_fun = function (start) { console.log(start, '传入了值'); };
    obj_fun.person_name = 'wjt';
    obj_fun.age = 28;
    obj_fun.love = function () { console.log('打游戏'); };
    return obj_fun;
}
var obj_fun_1 = interface_mix_fun();
obj_fun_1(1);
console.log(obj_fun_1, '函数对象');
console.log(obj_fun_1.person_name, '函数对象名字');
console.log(obj_fun_1.age, '函数对象年龄');
console.log(obj_fun_1.love, '函数对象调用love方法');
