//never类型是用来标识不应该存在的状态
function error(message) {
    throw new Error(message);
}
//因为死循环,所以loop将不会有返回值
function loop() {
    while (true) {
    }
}
//never和void的差异
//void没有返回值,但是不会出错
function Void() {
    console.log('打印');
}
//只会抛出异常,没有返回值
function Never() {
    throw new Error('aaa');
}
function isXiaoMan(value) {
    switch (value) {
        case "布吕歇尔":
            break;
        case "威灵顿":
            break;
        case "维特根斯坦":
            break;
        default:
            //是用于场景兜底逻辑
            var error_1 = value;
            return error_1;
    }
}
