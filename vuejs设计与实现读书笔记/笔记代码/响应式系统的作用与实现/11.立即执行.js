/**附带getter版本  end*/

/**立即执行  start*/
function watch(source, callBack,options) {
    let getter
    if (typeof source === 'function') {
      //如果source为函数类型
      getter = source
    } else {
      //如果是初始对象类型
      getter = () => traverse(source)
    }
    //定义新旧值变量
    let oldValue , newValue
    //提取scheduler调度函数为一个独立的job函数
  const job = ()=>{
    newValue = effectFn()
    callBack(newValue,oldValue)
    oldValue = newValue
  }
  const effectFn = effect(
    ()=>getter(),
    {
        lazy:true,
        scheduler:job  //使用job函数作为调度器函数
    }
  )
  if(options.immediate){
    job()   //当immediate为true时立即执行,从而触发回调执行
  }else{
    oldValue = effectFn()
  }
  }
  /**立即执行  end*/
  
  
  //递归回调函数
  function traverse(value, seen = new Set()) {
    //判断value的类型,正常情况下,value都是监视某一个对象,比如obj,如果递归传递回来的seen中有这个obj,也是不成立的,唯一性
    if (typeof value !== 'object' || value === null || seen.has(value)) {
      return
    }
    //set中添加这个对象作为元素
    seen.add(value)
    //遍历对象
    for (const k in value) {
      //递归回调,将对象的所有属性都遍历一遍
      traverse(value[k], seen)
    }
    //返回的还是这个对象
    return value
  }
  
  
  
  
  //定义一个全局变量,保存副作用函数
  let activeEffect = undefined
  //effect栈
  const effectStack = []
  //桶,用来保存对象=>属性=>依赖之间的连接关系
  const bucket = new WeakMap()
  //注册副作用函数
  function effect(fn, options = {}) {
    //effectFn是经过封装后的副作用函数,响应式数据的依赖其实就是这个经过封装的函数
    const effectFn = () => {
      //清除原有的副作用函数
      cleanup(effectFn)
      activeEffect = effectFn
      //栈末尾压入一个副作用函数
      effectStack.push(effectFn)
      //执行这个函数
      const res = fn()
      //effects栈清除最后一个函数
      effectStack.pop()
      //动态的副作用函数赋值为栈中的最后一位
      activeEffect = effectStack[effectStack.length - 1]
      //res是副作用函数执行完毕的值,保存在res变量中,通过一层层返回,effect返回副作用函数effectFn,effectFn函数被调用返回res的值,最后作为obj中的value值,obj就是最后新生成的数据
      return res
    }
  
    effectFn.options = options
    //创建一个容器,effectFn
    effectFn.deps = []
    //根据lazy属性判断,是否为立即执行副作用函数
    if (!options.lazy) {
      effectFn()
    }
    //返回值就是依赖
    return effectFn
  }
  
  //原始数据
  const data = { foo: 1, bar: 2 }
  //使用元编程Proxy重写和自定义getter和setter
  const data_Proxy = new Proxy(data, {
    //重写getter,收集依赖,返回值
    get(target, key) {
      track(target, key)
      return target[key]
    },
    //重写setter,触发依赖,修改值
    set(target, key, newVal) {
      target[key] = newVal
      trigger(target, key)
    }
  })
  //追踪
  function track(target, key) {
    //activeEffect无效,说明没有注册副作用函数,直接返回对象.属性值
    if (!activeEffect) {
      return target[key]
    }
    //depsMap:桶中第一层数据,键是对象,值是map
    let depsMap = bucket.get(target)
    if (!depsMap) {
      //在bucket,没有找到这个值,就新增一个
      bucket.set(target, (depsMap = new Map()))
    }
    //获取桶中对象=>属性的依赖集合
    let deps = depsMap.get(key)
    if (!deps) {
      //不存在就给赋值一个,Set类型,第二层数据
      depsMap.set(key, (deps = new Set()))
    }
    //将副作用函数加入deps容器中
    deps.add(activeEffect)
    //同时副作用函数的deps容器中加入刚才容器,类似于发布订阅模式,回调函数的相互存储和引用
    activeEffect.deps.push(deps)
  }
  //触发
  function trigger(target, key) {
    //获取桶中对应对象的值
    const depsMap = bucket.get(target)
    if (!depsMap) {
      return
    }
    //获取对应属性的值
    const effects = depsMap.get(key)
    //为了防止刚删除又创建,再删除再创建的无限死循环
    const effectsToRun = new Set(effects)
    effects && effects.forEach(effectFn => {
      if (effects !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
    effectsToRun.forEach(effectFn => {
      //自定义的调度
      if (effectFn.options && effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn)
      } else {
        effectFn()
      }
    })
  }
  //清除副作用函数的函数
  function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
    }
    effectFn.deps.length = 0
  }

  //newValue和oldValue版本
  watch(()=>data_Proxy.foo,(newVal,oldVal)=>{
    console.log(newVal,oldVal,'数据监视')
  },{immediate:true})
  
  data_Proxy.foo = 20
  data_Proxy.foo = 100