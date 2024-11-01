//计算属性函数
function computed(getter){
  let value
  let dirty = true
    //把getter作为副作用函数,创建一个lazy的effect
   const effectFn = effect(getter,{
    lazy:true,
   })
   const obj = {
    get value(){
     return effectFn()
    }
   }
   return obj
}

//定义一个全局变量,保存副作用函数
let activeEffect = undefined   
//effect栈
const effectStack = []
//桶,用来保存对象=>属性=>依赖之间的连接关系
const bucket = new WeakMap() 
//注册副作用函数
function effect(fn,options={}){  
    //effectFn是经过封装后的副作用函数,响应式数据的依赖其实就是这个经过封装的函数
    const effectFn = ()=>{
        //清除原有的副作用函数
        cleanup(effectFn)
        activeEffect = effectFn
        //栈末尾压入一个副作用函数
        effectStack.push(effectFn)
        //执行这个函数
        const res =  fn()
        //effects栈清除最后一个函数
        effectStack.pop()
        //动态的副作用函数赋值为栈中的最后一位
        activeEffect = effectStack[effectStack.length - 1]
        //res是副作用函数执行完毕的值,保存在res变量中,通过一层层返回,effect返回副作用函数effectFn,effectFn函数被调用返回res的值,最后作为obj中的value值,obj就是最后新生成的数据
        return res
    }
    //保存副作用函数的配置
    effectFn.options = options
    //添加一个用来存储所有与该副作用函数相关的依赖集合
    effectFn.deps = []
    //根据lazy属性判断,是否为立即执行副作用函数
    if(!options.lazy){
      effectFn()  
    }
    //返回值就是依赖
    return effectFn
}

//原始数据
const data = {foo:1,bar:2}
//使用元编程Proxy重写和自定义getter和setter
const data_Proxy = new Proxy(data,{
  //重写getter,收集依赖,返回值
    get(target,key){
      track(target,key)
      return target[key]
    },
    //重写setter,触发依赖,修改值
    set(target,key,newVal){
      target[key] = newVal
      trigger(target,key)
    }
})
//追踪
function track(target,key){
     //activeEffect无效,说明没有注册副作用函数,直接返回对象.属性值
    if(!activeEffect) {
        return target[key]
      }
      //depsMap:桶中第一层数据,键是对象,值是map
      let depsMap = bucket.get(target)  
      if(!depsMap){
        //在bucket,没有找到这个值,就新增一个
        bucket.set(target,(depsMap = new Map()))  
      }
      //获取桶中对象=>属性的依赖集合
      let deps = depsMap.get(key)  
      if(!deps){
        //不存在就给赋值一个,Set类型,第二层数据
        depsMap.set(key,(deps = new Set()))  
      }
      //将副作用函数加入deps容器中
      deps.add(activeEffect) 
      //同时副作用函数的deps容器中加入刚才容器,类似于发布订阅模式,回调函数的相互存储和引用
      activeEffect.deps.push(deps)   
}
//触发
function trigger(target,key){
  //获取桶中对应对象的值
    const depsMap = bucket.get(target)
    if(!depsMap){
      return
    }
    //获取对应属性的值
    const effects = depsMap.get(key)
    //为了防止刚删除又创建,再删除再创建的无限死循环
    const effectsToRun = new Set(effects)
    effects && effects.forEach(effectFn=>{
      if(effects !== activeEffect){
        effectsToRun.add(effectFn)
      }
    })
    effectsToRun.forEach(effectFn => {
      //自定义的调度
if(effectFn.options && effectFn.options.scheduler){
  effectFn.options.scheduler(effectFn)
}else{
  effectFn()
}   
    })
}
//清除副作用函数的函数
function cleanup(effectFn){
   for(let i = 0;i<effectFn.deps.length;i++){
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
   }
   effectFn.deps.length = 0
}



//一个需要其他变量计算的值,传参为一个有return值的函数
const sumRes = computed(()=>data_Proxy.foo + data_Proxy.bar)

console.log(sumRes.value,'计算获取的值:第一次')
data_Proxy.bar  = 10
console.log(sumRes.value,'计算获取的值:第二次')