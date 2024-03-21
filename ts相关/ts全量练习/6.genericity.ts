// 泛型函数
function genericity_fun1<T>(name:T):T{
    return name
}

// 写法1
let result_1 =  genericity_fun1<string>('wjt')
//写法2:自动推导类型
let result_2 = genericity_fun1('wjt')

//泛型变量
function genericity_fun2<T>(arr:T[]):T[]{
    console.log(arr.length,'genericity_fun2')
    return arr
}
let result_3 = genericity_fun2<string>(['wjt','mashi'])

//泛型类型
function genericity_fun3<T>(name:T):T{
    return name
}
// let result_4:<T>(name:T)=>T = genericity_fun3
//具体用T还是用什么字母,纯看自己,只要对的上,如下
let result_4:<A>(name:A)=>A = genericity_fun3
//也可以这样写
let result_5:{<A>(name:A):A} = genericity_fun3

//泛型接口
interface genericityInterface1{
    <T>(name:T):T
}
function genericityInterface_1<T>(name:T):T{
    return name
}
let result_6:genericityInterface1 = genericityInterface_1

interface genericityInterface2<T>{
    (arr:T):T
}
function genericityInterface_2<T>(arr:T):T{
   return arr
}
let result_7:genericityInterface2<string> = genericityInterface_2

//泛型类
class Genericity_Class<T>{
    initVal:T
    addFun:(x:T,y:T) => T
}
let number_result_1 = new Genericity_Class<number>()
number_result_1.initVal = 0
number_result_1.addFun = function(x,y){return x+y}
console.log(number_result_1.addFun(1,2),'number_result_1.addFun')
let string_result_1 = new Genericity_Class<string>()
string_result_1.initVal = '初始化字符'
string_result_1.addFun = function(x,y){return x+y}
console.log(string_result_1.addFun('我是','字符串'))

//泛型约束
interface genericity_constraint1{
    length:number
}
function genericity_constraint2<T extends genericity_constraint1>(arr:T):T{
    console.log(arr.length,'genericity_constraint2的length')
    return arr
}
genericity_constraint2(['wjt','mashi'])

