//字符串类型
let string1: string = '123'
let string2: string = `${string1}456`

//数字类型
let number1 : number = NaN
let number2 : number = 123
let number3 : number = Infinity  /**无穷大 */
let number4 : number = 6  /**二进制 */
let number5 : number = 0xfd /**十六进制 */
let number6 : number = 0b1010 /**二进制 */
let number7 : number = 0o744 /**八进制 */

//布尔类型
let boolean1 : boolean = true
let boolean2 : boolean = false
let boolean3 : boolean = Boolean(1)
// let boolean4 : boolean = new Boolean(false)  //报错,因为这里会返回一个对象

//空值类型
function fn1():void{
    console.log('无返回值')
}
let void1 : void = undefined
let void2 : void = null
/**与void的区别在于,undefined和null是所有类型的子类型。也就是说undefined类型的变量,是可以赋值给string类型的 */

/**下面是会报错的 */
// let test1 : void = undefined
// string1 = test1

/**undefined和null不会报错 */
let test2 : null = null
string1 = test2

let test3 : undefined = undefined
string2 = test3