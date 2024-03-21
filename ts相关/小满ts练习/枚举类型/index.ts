//增长枚举
enum Types1{
    Red = 0,
    Green = 1,
    Blue = 2
}

//字符串枚举
enum Types2{
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}

//异构枚举
enum Types3{
    No = 'no',
    Yes = 1
}

//接口枚举
enum Types4{
    yyds,
    dddd
}
interface interface1{
    red:Types4.yyds
}
let obj:interface1 = {
       red:Types4.yyds
}

//const枚举
const enum Types5{
    No = 'No',
    Yes = 1
}

enum Enum{
    fall
}
let a = Enum.fall
console.log(a)
let nameOfa = Enum[a]
console.log(nameOfa)  