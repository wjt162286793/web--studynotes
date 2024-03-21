//布尔值
let bool_1:boolean = false
console.log(bool_1,'bool_1')

//数字
let num_1:number = 6  //十进制
let num_2:number = 0xf00d //十六进制
let num_3:number = 0b1010 //二进制
let num_4:number = 0o744 //八进制
console.log(num_1,num_2,num_3,num_4)

//字符串
let str_1:string = '字符串'
let str_2:string = `模板字符串`
console.log(str_1,str_2)

//数组
let arr_1 : number[] = [1,2,3]
let arr_2 : Array<number> = [2,3,4]
let arr_3 : string[] = ['a','b','c']
let arr_4 : Array<string> = ['b','c','d']
console.log(arr_1,'arr_1')
console.log(arr_2,'arr_2')
console.log(arr_3,'arr_3')
console.log(arr_4,'arr_4')

//元组Tuple
let tuple_1:[string,number,boolean] = ['a',1,true]
// tuple_1 = [1,'a',false]  //error
tuple_1 = ['b',2,false]
console.log(tuple_1,'tuple_1')

//枚举
enum Color{Red="red",Green=2,Blue=3}
let c_1 : Color = Color.Green
console.log(c_1,'c_1')
let colorName : string = Color[2]
console.log(colorName,'colorName')

//任意类型
let any_val1 : any = '任意值'
let any_val2 : any = ['1',2,3]
any_val1 = {name:'any_obj'}
any_val2 = null
console.log(any_val1,any_val2)

//Void类型
function fn_1():void{
    console.log('I`m a funciton')
}
let void_val1:void = null
void_val1 = undefined
// void_val1 = '字符串'  //error

// null和undefined类型
let null_1 : null = null
let undefined_1: undefined = undefined
// null_1 = '哈哈哈' //error

//Never类型
function errorFn_1():never{
    throw new Error('哈哈哈')
    // return '哈哈哈'  error
}
function neverFn_1():never{
    while (true){

    }
}

//object类型
//非原始类型
declare function create(obj:object | null) :void
create({val:111})
create(null)
// create(number) //error

//类型断言
let val_dy : any = '要被断言类型的值'
// let length_1 : number = (<string>val_dy).length
let length_1 : number = (val_dy as string).length
let arr_dy :any[] = ['哈哈哈','呵呵呵',(()=>1+'2')()]
let val_2 : string = (<string>arr_dy[2])


