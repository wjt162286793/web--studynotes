/*基础类型*/
/*number,string,boolean,undefind,null*/
let num_1_: number = 1  //数值
let str_1_: string = '1' //字符串
let boo_1_: boolean = true //布尔
let un_1_: undefined = undefined //安迪范的
let nu_1_: null = null //null
console.log(num_1_, str_1_, boo_1_, un_1_, nu_1_, '基础类型')

/*数组类型*/
let arr_1_: string[] = ['1', '2', '3']  //数组语法1
let arr_2_: Array<any> = ['字符', true, 222] //数组语法2
console.log(arr_1_, arr_2_, '数组类型')

/*特殊类型*/
let fun_1_ = function (a: string): void { //void,啥也不是类型
    console.log('void演示函数')
}
let any_1_: any = '任意类型' //任意类型
let error_1 = function (a: string): never { //永不存在类型
    throw new Error(a)
}
let tupleArr: [number, string] = [1, '字符串']  //元组类型,相当于特殊数组 
let unknownVal: unknown = '不确定类型' //unknown类型
console.log(fun_1_, any_1_, error_1, tupleArr, unknownVal, '特殊类型')
/*------------------------------------------------------------------------------------------------------------*/

/*对象类型*/
//大小对象:object,Object
//小object指的是非原始类型,大Object可以覆盖原始类型和引用类型,除了null和undefined
let obj__1: object = { a: 1 }
// obj__1 = '1' //error 

let obj__2: Object = { a: 1 }
obj__2 = 'b'
obj__2 = {}
console.log(obj__1, obj__2, '对象类型')
/*------------------------------------------------------------------------------------------------------------*/

/*类*/
class class_1_ {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    fun(): void {
        console.log('funtion')
    }
}
let classObj_1 = new class_1_('wjt', 28)
console.log(classObj_1, '类构造实例')
/*------------------------------------------------------------------------------------------------------------*/

/*函数*/
//函数声明
let fun_2 = function (val_1: number, val_2: string) {
    return val_1 + val_2
}
//函数表达式
let fun_3 = function (val_1: number, val_2: string): string {
    return val_1 + val_2
}
//可选参数
let fun_4 = function (val_1: number, val_2?: boolean): void {
    console.log(val_1, '可选参数函数的值')
}
console.log(fun_2(2, '号函数'), fun_3(3, '号函数'))
console.log(fun_4(10086))
/*------------------------------------------------------------------------------------------------------------*/


/*接口*/
//接口定义对象
interface api_1 {
    name: string
    age: number
    fun: Function
}
let api_obj_1: api_1
api_obj_1 = { name: 'wjt', age: 28, fun: function () { console.log('学习ts') } }
console.log(api_obj_1, '接口规范的对象')
//接口定义只读
interface api_2 {
    readonly name1: string
    name2: string
}
let api_obj_2: api_2
api_obj_2 = {
    name1: '只可以读',
    name2: '可以修改'
}
// api_obj_2.name1 = '修改' //编译报错
api_obj_2.name2 = '修改成功' //正常
console.log(api_obj_2, '接口只读的对象')
//接口定义函数
interface api_3 {
    (age: number, name: string): string
}
let api_fun_1: api_3 = function (age, name) {
    let val = age + '岁的' + name
    console.log(val, '接口定义函数的返回值')
    return val
}
api_fun_1(28, '王惊涛')
//接口别名
type typename_1 = {
    name: string
    age: number
}
let typeobj_1: typename_1 = {
    name: 'wjt',
    age: 28
}
console.log(typeobj_1, '别名对象')
/*------------------------------------------------------------------------------------------------------------*/

/*类型*/
/*类型推论*/
//不设定类型,会按照值的类型默认推导出来,再次赋值时如果类型不同,编译报错
let val_1 = true
val_1 = false
// val_1 = '错的情况' //error

/*类型断言*/
let typeStr_1: any = 'hello,wolrd'
//语法1
// let typeArr_1: Array<string> = (<string>typeStr_1).split(',')
//语法2
let typeArr_1: Array<string> = (typeStr_1 as string).split(',')
console.log(typeArr_1, typeStr_1, '断言的类型')

//非空断言
let not_null: string | null | undefined
// console.log(not_null.toUpperCase()) //error
// console.log(not_null!.toUpperCase(), '非空断言') //编译通过

//确定赋值断言
//未赋值报错
let send_val_1: number
// console.log(send_val_1) //error
let send_val_2!: number
console.log(send_val_2, '确定赋值断言')

//联合类型
let andVal_1: number | string
andVal_1 = 1
andVal_1 = '哈哈哈'
console.log(andVal_1, '联合类型')

//联合类型别名
type andType_1 = boolean[] | string[]
// andType_1 = [1,2,3] //error
let andtypeVal_1: andType_1 = [true, false]
console.log(andtypeVal_1, '联合类型别名')

//交叉类型
interface cross_1 {
    name: string
    age: number
}
interface cross_2 {
    name: string
    work: string
}
let cross_val_1: cross_1 & cross_2 = {
    name: "王惊涛",
    age: 28,
    work: '前端开发者'
}
console.log(cross_val_1, '交叉类型值')

//类型守卫
interface Inobj_1{
    val_1:number,
    val_2:string
}
interface InObj_2{
    val_1:number,
    val_3:string
}
//in方法
function isIn(arg:Inobj_1 | InObj_2){
    if('val_1' in arg){
        console.log('类型守卫val_1',arg)
    }
    if('val_2' in arg){
        console.log('类型守卫val_2',arg)
    }
}
isIn({val_1:10,val_2:'年'})
isIn({val_1:20,val_3:'年'})
//typeof方法
function isTypefun(arg:string | number){
    if(typeof arg === 'number'){
        console.log(arg,'数字类型')
        return 'number'
    } 
    if(typeof arg === 'string'){
        console.log(arg,'字符类型')
        return 'string'
    } else{
        return '未定义'
    }

}
isTypefun('字符类型')
isTypefun(10)
//instanceof方法
function isInstanceof(arg:boolean | number[]){
  if(arg instanceof Boolean){
    console.log(arg,'布尔类型')
  }else if(arg instanceof Array){
    console.log(arg,'数组类型')
  }
}
isInstanceof(true)
isInstanceof([1,2,3])
/*------------------------------------------------------------------------------------------------------------*/

/*泛型*/
//基础语法
function genericity_1<A>(arg:A):A{
    return arg
}
genericity_1<string>('字符串类型')

//多个参数
function genericity_2<Name,Age>(arg:[Name,Age]):string{
    return '哈哈哈'
}
genericity_2<string,number>(['王惊涛',28])

//泛型接口
interface interGenericity_3<A,B>{
    val_1:A
    val_2:B
}
let interGenericity_3_1:interGenericity_3<string,number> = {
    val_1:'王惊涛',
    val_2:28
}
let interGenericity_3_2:interGenericity_3<number,string> ={
    val_1:29,
    val_2:'马师'
}
console.log(interGenericity_3_1,interGenericity_3_2,'泛型接口定义数据')
