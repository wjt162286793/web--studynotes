//字符串类型
var string1 = '123';
var string2 = "".concat(string1, "456");
//数字类型
var number1 = NaN;
var number2 = 123;
var number3 = Infinity; /**无穷大 */
var number4 = 6; /**二进制 */
var number5 = 0xfd; /**十六进制 */
var number6 = 10; /**二进制 */
var number7 = 484; /**八进制 */
//布尔类型
var boolean1 = true;
var boolean2 = false;
var boolean3 = Boolean(1);
// let boolean4 : boolean = new Boolean(false)  //报错,因为这里会返回一个对象
//空值类型
function fn1() {
    console.log('无返回值');
}
var void1 = undefined;
var void2 = null;
/**与void的区别在于,undefined和null是所有类型的子类型。也就是说undefined类型的变量,是可以赋值给string类型的 */
/**下面是会报错的 */
// let test1 : void = undefined
// string1 = test1
/**undefined和null不会报错 */
var test2 = null;
string1 = test2;
var test3 = undefined;
string2 = test3;
