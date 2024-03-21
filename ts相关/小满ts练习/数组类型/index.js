//类型
var list1 = [1, 2, 3]; //每个元素都必须是number类型
var list2 = ['wjt', 29, function () {
        'jscoder';
    }];
//数组泛型
var list3 = [1, 2, 3];
var list4 = ['wjt', 29, function () { return 'jscoder'; }];
var list5 = [1, 2, 3, 4]; //只要索引类型是数字,值的类型也必须是数字
//多维数组
var list6 = [[1, 2], [3, 4]];
//arguments类数组   arguments有专门的接口IArguments
function fn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var arr = arguments;
}
fn(1, 2, 3);
//实际上就是
// interface IArguments{
//     [index:number]:any
//     length:number
//     callee:Function
// }
