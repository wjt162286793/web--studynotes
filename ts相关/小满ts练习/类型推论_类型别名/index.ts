//自动推断为字符串
let string_1 = '字符串'

//不赋值默认为any
let any_1
any_1 = '字符串'
any_1 = 1
any_1 = true


//类型别名
type str = string
let string_2:str = '字符串' 

//函数别名
type fun = ()=>string
let string_3:fun = ()=>'返回字符串'

//定义联合类型别名
type uniteType = string | number
let uniteVar1:uniteType = '字符串'
let uniteVar2:uniteType = 123

//定义值的别名
type value = boolean | 0 | '123'
let value_1:value = true


//type和interface还是有一些区别的,虽然都可以定义类型
//interface可以继承,type只能通过&交叉类型合并
//type可以定义联合类型和可以使用一些操作符,但是interface不行
//interface遇到重名的会合并,type不会

//type高级用法
type a = 1 extends number ? 1:0 
type b = 1 extends Number ? 1:0
type c = 1 extends Object ? 1:0
type d = 1 extends any ? 1:0
type e = 1 extends unknown ? 1:0
type f = 1 extends never ? 1:0
