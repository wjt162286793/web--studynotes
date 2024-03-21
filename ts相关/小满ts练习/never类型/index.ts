//never类型是用来标识不应该存在的状态
function error(message:string):never{
    throw new Error(message)
}

//因为死循环,所以loop将不会有返回值
function loop():never{
    while(true){

    }
}

//never和void的差异
//void没有返回值,但是不会出错
function Void():void{
    console.log('打印')
}

//只会抛出异常,没有返回值
function Never():never{
    throw new Error('aaa')
}

//never被移除
type type1 = void | number | never

//never使用场景
type type2 = '布吕歇尔' | '威灵顿' | '维特根斯坦' 
 
function isXiaoMan(value:type2) {
   switch (value) {
       case "布吕歇尔":
           break 
       case "威灵顿":
          break 
       case "维特根斯坦":
          break 
       default:
          //是用于场景兜底逻辑
          const error:never = value;
          return error
   }
}