//通过设置lazy字段为true,不立即执行
effect(()=>{
    console.log('副作用函数')
},{lazy:true})


// function effect(fn,options={}){
//   const effectFn =()=>{
//     /** */
//   }
//   effectFn.options = options
//   effectFn.deps = []

//   if(!options.lazy){   //立即执行
//     effectFn()
//   }
//   return effectFn
// }

function effect(fn,options = {}){
    const effectFn = ()=>{
        cleanup(effectFn)
        activeEffect = effectFn
        effectStack.push(effectFn)
        //将fn的执行结果存储到res中
        const res = fn()
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
        //将res做为effectFn的返回值
        return res
    }
    effectFn.options = options
    effectFn.deps = []
    //未检出lazy:true,立即执行
    if(!options.lazy){
        effectFn()
    }
    return effectFn
}