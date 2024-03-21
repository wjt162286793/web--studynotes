//接口

//基础使用
interface interface_test_1{
    name:string
    age:number
    love:Function
}
let interface_test_1:interface_test_1 ={   //属性多了对不上
    name:'wjt',
    age:29,
    love:()=>'game',
    // work:'coder'  //error
}

// let interface_test_2:interface_test ={   //error  属性少了对不上
//     name:'mashi',
// }
console.log(interface_test_1,'interface_test_1')

interface person_1 {
    name:string
    age:number
    love:string  
}
let person_1 :object = {
    name:'wjt',
    age:28,
    love:'game',
}
let fn_1:Function = (person:person_1):string=>{
    return person.love
}
console.log(fn_1(person_1))



//可选属性测试
interface interface_test_2{
    name:string
    work?:boolean   //写不写都行
    price:number
}
let wjt_1:interface_test_2 = {
    name:'wjt',
    work:true,
    price:24000
}
let mashi_1:interface_test_2 ={
    name:'mashi',
    price:10000
}
console.log(wjt_1,'wjt_1')
console.log(mashi_1,'mashi_1')

interface person_2{
name?:string
age?:number
}

let person_2:object = {name:'wjt',age:'28'}  //这里age字符串也没有报错
let getWife =(person_2:person_2):{name:string,age:number}=>{
    let wife:person_1= {name:'null',age:0,love:'wjt'}
    if(person_2.name){
      wife.name = 'mashi'
    }
    if(person_2.age){
        wife.age = 29  
    }
    return wife
}
console.log(getWife(person_2))


//只读属性
interface readOnly_1{
    readonly name:string
    age:number
}
let readObj_1 : readOnly_1 = {
    name:'wjt',
    age:28
}
// readObj_1.name = 'jt' //error
readObj_1.age = readObj_1.age+1

//不可变数组(可整体替换,不可单独修改)
let readArr_1 : ReadonlyArray<number> = [1,2,3,4,5]
// readArr_1.map(item:number=>item+1) //error


let arr_1:number[] = [1,2,3,4,5]
let arr_2 =  arr_1.map(item=> item+1)
console.log(arr_1,'原可变数组')
console.log(arr_2,'变化后数组')

readArr_1 = [3,4,5]
console.log(readArr_1,'可以将数组整个替换')  //[3,4,5]
// readArr_1[0] = 2 //error ,但不可以替换单个值


interface interface_test_3{
    name:string,
    age?:number,
    [propName:string]:any  //任意属性名和任意属性值
}
let interface_test_3:interface_test_3= {
    name:'wjt',
    work:'coder',
    love:()=>'game'
}

//函数接口
interface interface_fun_1{
    (obj:object):object
}
interface fun_obj_1{
    name:string
    age:number
    work:string
    // [propName:string]:any
}
let fun_obj_1:fun_obj_1 = {
    name:'wjt',
    age:28,
    work:'js-coder'
} 
let interface_fun_1:interface_fun_1 = (obj)=>{
    return Object.assign({val:1},obj)
}
interface_fun_1(fun_obj_1)

interface interface_obj_arr_1{
    [index:number]:object
    length:number
}
let obj_arr_1 :interface_obj_arr_1 = [
    {name:'wjt'},{name:'xm'}
]
console.log(obj_arr_1,'obj_arr_1')

//类接口
interface interface_class_1{
    class_fun_1:Function
    class_var_1:string
    class_var_2:number
}
class Class_1 implements interface_class_1{
    constructor(){

    }
    class_fun_1 : ()=>{

    }
    class_var_1:'字符串'
    class_var_2:0

}
let class_shili_1 = new Class_1()
console.log(class_shili_1,'class_shili_1')

//继承接口
interface extends_1{
    name:string
}
interface extends_2 extends extends_1{
    age:number
}
interface extends_3 extends extends_1,extends_2{
    love:Function
}
let extends_var_1 : extends_1 = {name:'wjt'}
let extends_var_2 : extends_2 = {name:'wjt',age:28}
let extends_var_3 : extends_3 = {name:'wjt',age:28,love:()=>'game'}

//混合类型(函数对象)
interface interface_mix_1{
    (start:number):string
    person_name:string
    age:number
    love:Function
}
function interface_mix_fun():interface_mix_1{
    let obj_fun = <interface_mix_1>function(start:number){console.log(start,'传入了值')}
    obj_fun.person_name = 'wjt'
    obj_fun.age = 28
    obj_fun.love = ()=>{console.log('打游戏')}
    return obj_fun
}
let obj_fun_1 = interface_mix_fun()
obj_fun_1(1)
console.log(obj_fun_1,'函数对象')
console.log(obj_fun_1.person_name,'函数对象名字')
console.log(obj_fun_1.age,'函数对象年龄')
console.log(obj_fun_1.love,'函数对象调用love方法')
    

//接口继承类
class Class_2{
    name:string
}
interface interfaceAndClass extends Class_2{
    age:number
}
let info:interfaceAndClass = {name:'wjt',age:28}
console.log(info,'info')