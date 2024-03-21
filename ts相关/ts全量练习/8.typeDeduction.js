//定义普通变量时自动推导
var num = 3;
var str = 'wjt';
var gender = false;
var arr = [1, 'wjt', { name: 'wjt' }, true];
var Father = /** @class */ (function () {
    function Father(name, type) {
        this.name = null;
        this.type = null;
        this.name = name;
        this.type = type;
    }
    return Father;
}());
var Mother = /** @class */ (function () {
    function Mother(name, type) {
        this.name = null;
        this.type = null;
        this.name = name;
        this.type = type;
    }
    return Mother;
}());
var Kid = /** @class */ (function () {
    function Kid(name, type) {
        this.name = null;
        this.type = null;
        this.name = name;
        this.type = type;
    }
    return Kid;
}());
function createFamily() {
    return [new Father('夏东海', '爸爸'), new Mother('刘梅', '妈妈'), new Kid('刘星', '儿子')];
}
