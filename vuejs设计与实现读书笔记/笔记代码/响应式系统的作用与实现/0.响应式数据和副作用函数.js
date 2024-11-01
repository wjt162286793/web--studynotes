//副作用函数
function effect(){
  document.body.innerText = '我是王惊涛'
}

//一个全局变量
let globalA = 10
//副作用函数
const fun1 = ()=>{
    globalA = 100  //修改了全局变量
}
//引用这一变量的函数
const fun2 = ()=>{
    return globalA+1
}