for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i, 'var定义');
    });
}
var _loop_1 = function (i_1) {
    setTimeout(function () {
        console.log(i_1, 'let定义');
    });
};
for (var i_1 = 0; i_1 < 10; i_1++) {
    _loop_1(i_1);
}
