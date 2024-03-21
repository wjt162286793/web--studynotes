//函数定义类型
// function(参数:类型):返回值类型{}
function fun_test_1(num1:number,num2:number):number{
    return num1+num2
}
console.log(fun_test_1(1,2),'fun_test_1调用')

function fun_test_2(name:string,age:number):void{
    console.log(`我是${name},我今年${age}岁`)
}
fun_test_2('wjt',28)

//完整写法
// let 函数名:(参数:类型) => 返回值类型 = 函数体
let fun_test_3:(name:string,age:number) => object = function(name:string,age:number):object{
    return {name,age}
}
console.log(fun_test_3('wjt',29),'fun_test_3完整写法调用')

//推断类型
let fun_test_4 = (num:number,str:string)=>{
      return num+str
}
console.log(fun_test_4(56,'个民族'),'自动推导返回类型')

//可选参数
//ts中形参必须对应有实参,如果用?,可以让该参数变为可选参数,默认是undefined

// function fun_test_5(name:string,age:number){
//     console.log(name,age)
// }
// fun_test_5('wjt') //error

function fun_test_5(name:string,age?:number){
    console.log(name,age,'fun_test_5函数调用')
}
fun_test_5('wjt')

//默认参数
function fun_test_6(name:string,age = 28){
    console.log(name,age,'fun_test_6函数调用')
}
fun_test_6('wjt')

//剩余参数
function fun_test_7(firstParam:string,...otherParam:any[]){
    console.log(firstParam,'第一个参数')
    console.log(otherParam,'其余参数')
}
fun_test_7('wjt',28,()=>'game',{love:'study'})

//官方文档点睛之笔:普通函数在顶级的非方法式调用,会将this视为window。箭头函数能保存函数创建时候的值,而不是调用时的值。
function fun_test_8():Function{
    return function(){
        console.log(this,'this的值')
    }
}
let this_val_1 =  fun_test_8()
this_val_1()

function fun_test_9():object{
    return {
        name:'fun',
        obj_fun:function(){
            console.log(this,'this的值')
        }
    }
}
interface obj_val_1{
    name:string
    obj_fun:any
}
let obj_val_1:obj_val_1 = fun_test_9()
console.log(obj_val_1,'???')
let fun_val_1 = obj_val_1.obj_fun 
console.log(fun_val_1())
