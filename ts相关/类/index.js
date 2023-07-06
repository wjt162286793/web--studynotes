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
var class_1 = /** @class */ (function () {
    function class_1(val) {
        this.str = val;
    }
    class_1.prototype.fun_1 = function () {
        var val_1 = "hello" + this.str;
        console.log(val_1, 'fun_1函数的返回值');
        return val_1;
    };
    return class_1;
}());
var obj_1_ = new class_1("world");
console.log(obj_1_, '对象1');
obj_1_.fun_1();
var class_2 = /** @class */ (function () {
    function class_2() {
    }
    class_2.prototype.move = function (size) {
        if (size === void 0) { size = 0; }
        console.log("\u79FB\u52A8\u4E86".concat(size, "\u7C73"));
    };
    return class_2;
}());
var person = /** @class */ (function (_super) {
    __extends(person, _super);
    function person() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    person.prototype.work = function () {
        console.log('coder');
    };
    return person;
}(class_2));
var wjt = new person();
wjt.work();
wjt.move(10);
wjt.work();
