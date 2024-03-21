//元组
let array_1:[number,string] = [123,'字符串']
let array_2:readonly [number,boolean,string,undefined] = [123,true,'字符串',undefined]

let array_3:[number,string] = [123,'字符串']
// array_3[0].length  //报错
array_3[1].length  //正确

//元组类型支持还可以支持自定义名称和变为可选的
let array_4:[x:number,y?:boolean] = [123]

//越界元素
let array_5:[number,string] = [123,'string']
// array_5.push(true)   //报错

//嵌套元组
let excel:[string,number,boolean][] = [
    ['wjt1',1,true],
    ['wjt2',2,false]
]