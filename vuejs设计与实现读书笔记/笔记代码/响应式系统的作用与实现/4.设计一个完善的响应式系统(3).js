/**
 * 场景
 * const data = {ok:true,text:'我是王惊涛'}
const obj = new Proxy(data,{...})
effect(function effectFn(){
    document.body.innerText = obj.ok?obj.text:'not'
})
 */

//增强
let activeEffect = undefined   
const bucket = new WeakMap() 
function effect(fn){  
    const effectFn = ()=>{
        //清除原有的副作用函数
        cleanup(effectFn)
        activeEffect = effectFn
        fn()
    }
    //添加一个用来存储所有与该副作用函数相关的依赖集合
    effectFn.deps = []
    effectFn()   
}

const data = {ok:true,text:'我是王惊涛'}
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
      activeEffect.deps.push(deps)   //新增
}
function trigger(target,key){
    const depsMap = bucket.get(target)
    if(!depsMap){
      return
    }
    const effects = depsMap.get(key)
    //为了防止刚删除又创建,再删除再创建的无限死循环
    const effectsToRun = new Set(effects)
    effectsToRun.forEach(effectFn => effectFn())
    // effects && effects.forEach(fn => fn())
}
//清除副作用函数的函数
function cleanup(effectFn){
   for(let i = 0;i<effectFn.deps.length;i++){
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
   }
   effectFn.deps.length = 0
}

//测试代码
const fun = ()=>{
   return data_Proxy.ok?data_Proxy.text:'无文本'
}

effect(fun)

console.log(fun(),'第一次执行')
setTimeout(()=>{
    data_Proxy.ok = false
    console.log(fun(),'第二次执行')
},3000)
