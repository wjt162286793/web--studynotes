//函数的拦截
const fn1 = (name) =>{
    console.log('我是',name)
}

const p1 = new Proxy(fn1,{
  apply(target,thisArg,argArray){
    target.call(thisArg,...argArray)
  }
})

p1('王惊涛')   //我是 王惊涛