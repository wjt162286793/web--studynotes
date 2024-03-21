//any类型
var any1 = '字符串';
any1 = 0;
any1 = true;
//声明时没有指定类型,就代表是any
var any2;
any2 = '字符串';
any2 = false;
//unknow也是可以定义任意类型
var unknow1 = '字符';
unknow1 = 0;
unknow1 = false;
//区别1:
/**下面会报错,因为unknow只能作为父类型,但是不能作为子类型 */
// let unknow2: unknown = '字符串'
// let nuknow3: string = unknow2
//区别2:  any能调用对象内属性,unknow不行
var any3 = { fn: function () { } };
any3.fn();
// let unknow3: unknown = {fn:()=>{}}
// unknow3.fn()
