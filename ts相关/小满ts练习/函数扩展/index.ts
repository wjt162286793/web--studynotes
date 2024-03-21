//参数完全匹配
interface interface1{
    name:string
    age:number
}
function fun1 (name:string,age:number):interface1{
    return {name,age}
}
fun1('wjt',29)

//可选参数
function fun2 (name:string,age?:number):string{
    return name
}
fun2('wjt')

//默认值
function fun3(name:string,age:number = 29):interface1{
    return {name,age}
}
fun3('wjt')

//接口定义函数
interface interface2{
    (num1:number,num2:number):number
}
const fun4:interface2 = (num1,num2)=>{
   return num1+num2
}
fun4(1,2)


//定义剩余参数
const fun5 = (array:number[],...items:any[]):any[]=>{
  return items
}
let a:number[] = [1,2,3]
fun5(a,[4,5,6])

//函数重载
function fun6(params:number) :void
function fun6(params1:string,params2:number):void
function fun6(params1:any,params2?:any):void{
    console.log(params1)
    console.log(params2)
}
fun6(123)
fun6('123',456)

