//创建track和trigger优化之前代码,没有功能上的新增

let activeEffect = undefined   
const bucket = new WeakMap()    
function effect(fn){  
    activeEffect = fn  
    fn()   
}
const data = {text:'我是王惊涛'}
const data_Proxy = new Proxy(data,{
    get(target,key){
      track(target,key)
      return target[key]

    },
    set(target,key,newVal){
      target[key] = newVal
      trigger(target,key)
    }
})

function track(target,key){
    if(!activeEffect) {
        return target[key]
      }
      let depsMap = bucket.get(target)  
      if(!depsMap){
        bucket.set(target,(depsMap = new Map()))  
      }
      let deps = depsMap.get(key)  
      if(!deps){
        depsMap.set(key,(deps = new Set()))  
      }
      deps.add(activeEffect) 
}
function trigger(target,key){
    const depsMap = bucket.get(target)
    if(!depsMap){
      return
    }
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
}