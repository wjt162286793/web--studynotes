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
var Person = /** @class */ (function () {
    function Person(name, ages, love) {
        this.name = name;
        this.age = ages;
        this.love = love;
    }
    Person.prototype.run = function () {
    };
    Person.static1 = function () {
        return this.static2();
    };
    Person.static2 = function () {
        return this.static1();
    };
    Person.classProp = '类的属性'; //只有访问类才可以
    return Person;
}());
var Man = /** @class */ (function (_super) {
    __extends(Man, _super);
    function Man() {
        return _super.call(this, 'wjt', 19, function () { console.log('打lol'); }) || this;
    }
    Man.prototype.create = function () {
        console.log(this.love);
    };
    return Man;
}(Person));
var wjt = new Person('王惊涛', 29, function () { console.log('写代码'); });
var man = new Man();
console.log(wjt, 'wjt');
console.log(man, 'man');
console.log(Person.classProp, '类的方法');
var A = /** @class */ (function () {
    function A() {
        this.name = 'wjt';
    }
    return A;
}());
var PersonClass = /** @class */ (function (_super) {
    __extends(PersonClass, _super);
    function PersonClass() {
        var _this = _super.call(this) || this;
        _this.asd = 'wjt';
        return _this;
    }
    PersonClass.prototype.get = function (type) {
        return type;
    };
    PersonClass.prototype.set = function () {
    };
    return PersonClass;
}(A));
