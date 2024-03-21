let sym1 = Symbol()
let sym2 = Symbol('key')

const sym3 = Symbol()
const sym4 = Symbol()
// console.log(sym3 === sym4)  //false

let sym5 = Symbol()
let obj_01 = {
    [sym5]:"value"
}
console.log(obj_01[sym5])


//symbol属性,不能通过普通遍历拿到的
const sym6 = Symbol('6')
const sym7 = Symbol('7')
const obj_02 = {
    [sym6]:'sym_wjt',
    [sym7]:19,
    name:'wjt',
    age:29
}
//for in 遍历
for(const key in obj_02){
    console.log(key,'属性')
}

//Object.keys遍历
console.log(Object.keys(obj_02),'属性列表')

//获取可枚举属性
console.log(Object.getOwnPropertyNames(obj_02))

//拷贝
console.log(JSON.stringify(obj_02))

//可以拿到的方法
//获取方法1
console.log(Object.getOwnPropertySymbols(obj_02))
//获取方法2
console.log(Reflect.ownKeys(obj_02))