//接口

//完全匹配
interface interface1{
    name:string
    age:number
}

let wangjingtao1:interface1 = {name:'wjt',age:29}
// let wangjingtao2:interface1 = {name:'wjt'}  /**具体属性和接口必须完全对的上 */

//interface3继承interface2接口,重名后面覆盖前面
interface interface2{
    name:string
}
interface interface3 extends interface2{
    age:number
}
let wangjingtao3:interface3 = {name:'wjt',age:29}

//可选 key?:type  ,可写可不写
interface interface4{
    name:string
    age?:number
    love?:()=>void
}

let wangjingtao4:interface4 = {name:'wjt',love:()=>{'js'}}

//其他属性类型
interface interface5{
    name:string
    age:number
    [propName:string]:any
}

let wangjingtao5:interface5 = {name:'wjt',age:29,love:()=>{'js'},sex:true}

//只读 readonly
interface interface6{
   readonly name:string
   age:number
}

let wangjingtao6:interface6 = {name:'wjt',age:29}
wangjingtao6.age += 1
// wangjingtao6.name = 'wangjingtao'  错误


