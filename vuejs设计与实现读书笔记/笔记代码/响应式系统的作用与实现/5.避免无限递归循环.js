function trigger (target,key){
    const depsMap = bucket.get(target)
    if(!depsMap) return
    const effects = depsMap.get(key)

    const effectsToRun = new Set()
    effects && effects.forEach(effectFn=>{
        if(effectFn !== activeEffect){  //如果trigger执行的副作用函数与当前执行的副作用函数相同,则不触发执行
            effectsToRun.add(effectFn)
        }
    })
    effectsToRun.forEach(effectFn => effectFn())
}