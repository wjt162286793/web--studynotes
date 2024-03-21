var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//public  //公共的
var Class_1 = /** @class */ (function () {
    function Class_1(name) {
        this.person_name = name;
    }
    Class_1.prototype.love = function (val) {
        console.log("\u6211\u559C\u6B22".concat(val));
    };
    return Class_1;
}());
var class_var_1 = new Class_1('wjt1');
console.log(class_var_1, 'class_var_1');
console.log(class_var_1.person_name, 'class_var_1的person_name名称');
//private,变量私有
var Class_2 = /** @class */ (function () {
    function Class_2(name) {
        this.person_name = name;
    }
    return Class_2;
}());
var class_var_2 = new Class_2('wjt2');
console.log(class_var_2, 'class_var_2');
// console.log(class_var_2.person_name)  //error
//protected  变量私有
var Class_3 = /** @class */ (function () {
    function Class_3(name) {
        this.person_name = name;
    }
    return Class_3;
}());
var Class_4 = /** @class */ (function (_super) {
    __extends(Class_4, _super);
    function Class_4(name, self_var) {
        var _this = _super.call(this, name) || this;
        _this.self_var = self_var;
        return _this;
    }
    Class_4.prototype.love = function (val) {
        return '我喜欢' + val;
    };
    return Class_4;
}(Class_3));
var class_var_4 = new Class_4('wjt4', '自定义数据');
console.log(class_var_4, 'class_var_4');
// console.log(class_var_4.person_name) error
// console.log(class_var_4.self_var)  error
console.log(class_var_4.love('打游戏'));
//readonly 只读
var Class_5 = /** @class */ (function () {
    function Class_5(name, age) {
        this.person_name = name;
        this.age = age;
    }
    return Class_5;
}());
var class_var_5 = new Class_5('wjt5', 28);
console.log(class_var_5, 'class_var_5');
class_var_5.age = 29;
// class_var_5.person_name = 'wjt' //error
//存取器
var person_name_wjt = 'wangjingtao'; //匹配上了
// let person_name_wjt:string = 'wjt'  //不匹配
var Class_6 = /** @class */ (function () {
    function Class_6() {
    }
    Object.defineProperty(Class_6.prototype, "person_name", {
        get: function () {
            return this._person_name;
        },
        set: function (newName) {
            if (person_name_wjt && person_name_wjt === 'wangjingtao') {
                console.log('匹配上了');
                this._person_name = newName;
            }
            else {
                console.log('不匹配');
            }
        },
        enumerable: false,
        configurable: true
    });
    return Class_6;
}());
var class_var_6 = new Class_6();
console.log(class_var_6, 'class_var_6'); //person_name这个时候还是undefined
class_var_6.person_name = 'wjt';
if (class_var_6.person_name) {
    console.log('值存在');
}
var Class_7 = /** @class */ (function () {
    function Class_7(var_age) {
        this.var_age = var_age;
    }
    Class_7.prototype.changeInfo = function (info) {
        var new_info = {
            name: null,
            age: null,
            love: null
        };
        new_info.name = 'wangjingtao';
        new_info.age = info.age + this.var_age;
        new_info.love = Class_7.person_info.love;
        return new_info;
    };
    Class_7.person_info = { love: 'game' };
    return Class_7;
}());
var class_person_1 = new Class_7(1);
var class_person_2 = new Class_7(2);
console.log(class_person_1.changeInfo({ name: 'wjt', age: 28 }), class_person_1, 'class_person_1');
console.log(class_person_1.changeInfo({ name: 'wjt', age: 29 }), class_person_2, 'class_person_2');
//抽象类
var Class_8 = /** @class */ (function () {
    function Class_8(name, age) {
        this.name = name;
        this.age = age;
    }
    Class_8.prototype.getName = function () {
        return this.name;
    };
    return Class_8;
}());
var Class_9 = /** @class */ (function (_super) {
    __extends(Class_9, _super);
    function Class_9() {
        return _super.call(this, 'wjt', 28) || this;
    }
    Class_9.prototype.getInfo = function () {
        console.log({ name: '哈哈哈', age: this.age });
    };
    Class_9.prototype.getAge = function () {
        return this.age;
    };
    return Class_9;
}(Class_8));
// let class_8 = new Class_9()  //error
var class_8;
var class_9 = new Class_9();
class_9.getName();
class_9.getAge();
class_9.getInfo();
//类当接口使用
var Class_10 = /** @class */ (function () {
    function Class_10() {
    }
    return Class_10;
}());
var person_wjt = { person_name: 'wjt', age: 28, love: function () { return 'game'; } };
console.log(person_wjt, 'person_wjt');
