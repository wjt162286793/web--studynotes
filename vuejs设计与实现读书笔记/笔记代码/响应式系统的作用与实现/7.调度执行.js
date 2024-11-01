effect(()=>{
    console.log(obj.foo)
},
//options
{
  scheduler(fn){
     setTimeout(fn)
  }
}
)


function effect(fn,options){
    const effectFn = ()=>{
        /** */
    }
    //将options挂载到effectFn上
    effectFn.options = options
    effectFn.deps = []
    effectFn()
}

function trigger(targrt,key){
    const effectsToRun = new Set()
    effectsToRun.forEach(effectFn=>{
        //如果一个副作用函数存在调度器,则使用该调度器,并将副作用函数作为参数传递
        if(effectFn.options.scheduler){
            effectFn.options.scheduler(effectFn)
        }else{
            effectFn()
        }
    })
}

