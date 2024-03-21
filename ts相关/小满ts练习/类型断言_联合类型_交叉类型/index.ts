//联合类型  number和string都可以
let phoneCode:number | string = '010-8203222'
phoneCode = 1234567890

//函数联合类型
const function1 = (something:number | boolean):boolean=>{
    return !!something
}


//交叉类型
interface prop1{
    name:string
    age:number
}
interface prop2{
    love:()=>string
}

const function2 = (personInfo:prop1 & prop2)=>{
    console.log(personInfo)
}
function2({name:'wjt',age:29,love:()=>'jscoder'})

//类型断言
interface interface1{
    name:string
}
interface interface2{
    age:number
}
const function3 = (info:interface1|interface2):string=>{
    //  return info.name   //会警告
    return (info as interface1).name   //断言,格式为:(对象 as 接口).属性
}

//使用any临时断言
// window.prop1 = 123  //报错
(window as any).prop1 = 123

//as const
const name1 = 'wjt'
// name1 = 'wangjingtao'  //报错

let name2 = 'wjt' as const
// name2 = 'wangjingtao' //报错

//数组
let array1 = [10,20] as const
// array1.push(30) //报错
const array2 = [10,20]
array2.push(30)

//类型断言是不会产生影响力的
function toBooloean(param:any):boolean{
  return param as boolean
}
toBooloean(1)