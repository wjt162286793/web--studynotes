//类型检查
//interface关键字:定义检查格式
interface value1{
    a:string
    b:number
}
function fun1(value:value1){
    console.log(value,'对象参数')
}
let obj_1 = {a:'字符串',b:2}
fun1(obj_1)
//interface不会去检查属性的顺序,只要相应的属性存在类型也对就行
let obj_2 = {b:3,a:'串串'}
fun1(obj_2)
let obj3 = {a:'就一个串'}
// fun1(obj3) //error

//可选属性
interface value2{
    a?:boolean
    b:string
    c?:number
}
function fun2(value:value2){
    console.log(value,'可选对象参数')
}
let obj_4 = {b:'串串'}
fun2(obj_4)
// let obj5 = {a:true,b:'字符串',c:'串串'} //error
let obj5 = {a:true,b:'字符串',c:1}
fun2(obj5) 

//只读类型
interface value3{
    readonly e:number
    f:string
}
let obj_6:value3 = {e:2,f:'串'}
// obj_6.e = 4 //error
obj_6.f = '串串'
console.log(obj_6,'对象6')

//只读数组
let arr_1 :ReadonlyArray<number> = [1,2,3,4]
// arr_1[0] = 5 //error
// arr_1 = [2,3,4,5] //error

//断言重写
arr_1 as number[]
arr_1 = [1,2,3,4]
arr_1 = [2,3,4,5]
console.log(arr_1,'数组1')

//函数类型
//(参数:类型):返回值类型
interface funType1{
    (a1:number,b1:string):string
}
let fun_1 : funType1
fun_1 = function(a1,b1){
    console.log(a1,b1,'arguments???')
    return 'haha'
}
let fun_1value:string =  fun_1(1,'串串')
console.log(fun_1value,'返回值')

//可索引
interface StringArray_1{
    [index:number]:string
}
let arr_2:StringArray_1
arr_2 = ['拿破仑','卡尔大公']
let str_1:string = arr_2[0]
console.log(str_1,'通过索引获取的值')

//类类型
interface class_1{
    time:Date
}
class timer implements class_1{
    time:Date
    constructor(h:number,m:number){}
}
let time_1 = new timer(1,2)
console.log(time_1,'timer的实例')