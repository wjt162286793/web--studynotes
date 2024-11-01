//伪代码,effect嵌套

let data = {foo:'foo值',bar:'bar值'}

let activeEffect
const effectStack = []   //effect栈

//注册响应式的函数
let effect = (fn)=>{
    const effectFn = ()=>{
        //将副作用函数赋值给activeEffect
        activeEffect = effectFn
        //调用副作用函数之前将当前副作用函数压入栈中
        effectStack.push(effectFn)
        //执行副作用函数
        fn()
        //当副作用函数执行完毕后,将当前副作用函数弹出栈,并把activeEffect还原为之前的值
        effectStack.pop()
        activeEffect = effectStack[effectStack.length -1]
    }
    //用来存储与该副作用函数相关的依赖集合
    effectFn.deps = []
    effectFn()
}
let temp1,temp2
effect (function effectFn1(){
    console.log('effectFn1执行')
    effect(function effectFn2(){
        console.log('effectFn2执行')
        temp2 = data.bar
    })
    temp1 = data.foo
})