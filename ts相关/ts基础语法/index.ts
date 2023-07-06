//布尔类型
let booleanVal:boolean = true
console.log(booleanVal,'布尔类型')

//字符串类型
let str1:string = '字符串'
str1 = '修改后的字符串'
console.log(str1,'字符串')

//数字类型(支持二,八,十,十六进制)
let num1:number = 1
let num2:number = 0xf00d
let num3:number = 0b1010
let num4:number = 0o744
console.log(num1,num2,num3,num4,'数字类型')

//数组类型
//格式1,元素[]
let arr1:number[] = [1,2,3]
//格式2,泛型
let arr2:Array<string> = ['1','2','三']
console.log(arr1,arr2,'数组')

//元组
let t1:[string,number,boolean]
t1 = ['字符',10,true]

//枚举
enum Color1{Red,Green,Blue}
let c1:Color1 = Color1.Green

enum Color2{Red = 1,Green,Blue}
let c2:Color2 = Color2.Red

console.log(c1,c2,'枚举值')
enum Color3{Red = 1,Green = 2,Blue = 3}
let color1:string = Color3[2]
console.log(color1,'color1的枚举名称')

//任意类型
let anyVal1:any = '1'
console.log('任意类型修改前',anyVal1)
anyVal1 = true
console.log('任意类型修改后',anyVal1)

let arr3:any[] = [1,'true',true]
console.log(arr3,'修改前的数组')
arr3 = ['false','哈哈哈',false]
console.log('修改后的数组',arr3)

//Void类型
//与any完全相反,表示不属于任何类型
function warnUser():void{
    console.log('void')
}
//因为warnUser函数没有返回值,相当于啥也不是
//void类型的变量可以赋值undefined和null类型
let nu1:void = null
let un1:void = undefined
console.log(nu1,un1,'void的值')

//null和undefined类型
let nu2:null = null
let un2:undefined = undefined
console.log(nu2,'null类型')
console.log(un2,'undefined类型') 

//never类型
//never类型表示永远不存在的值类型,例如抛出异常或者无值的函数,箭头函数返回值等
//never类型是任何类型的子类型,可以赋值任何类型.但是没有任何类型是never的子类型可以赋值给never类型.除了never本身.即使是any也不可以赋值给never.
function error1(a:string):never{
    throw new Error(a)
}

//object类型
let obj1:object = {a:1}
console.log(obj1,'对象类型')
