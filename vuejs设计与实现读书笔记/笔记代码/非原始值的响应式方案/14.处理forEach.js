// //集合的forEach使用场景
//  const m = new Map([
//    [{ key: 1 }, { value: 1 }]
//  ])
//   const effect =(fn)=>{
//      fn()
//   }
//  effect(() => {
//    m.forEach(function (value, key, m) {
//      console.log(value) // { value: 1 }
//      console.log(key) // { key: 1 }
//    })
//  })


//  const mutableInstrumenttations = {
//     forEach(callBack){
//         //获取原始数据对象
//         const target = this.raw
//         //与ITERATE_KEY建立响应联系
//         track(target,ITERATE_KEY)
//         //通过原始数据对象调用forEach方法,并把callback传递过去
//         target.forEach(callBack)
//     }
//  }
 

//问题场景1
//  const key = { key: 1 }
//  const value = new Set([1, 2, 3])
//  const p = reactive(new Map([
//    [key, value]
//  ]))

//  effect(() => {
//    p.forEach(function (value, key) {
//      console.log(value.size) // 3
//    })
//  })

//  p.get(key).delete(1)  //当进行删除时,没能触发副作用函数的执行。
//  //原因:因为传递给callback回调函数的参数是非响应数据,当value.size时,value是原始数据对象,即new Set([1,2,3]),并不是响应式对象,因此无法建立响应联系。
//  //解决方案:将callback函数的参数转化为响应式的。并且将参数进行数据类型校验,让值都是深响应。

//   const mutableInstrumenttations = {
//     forEach(callBack){
//        //wrap函数用来把可代理的值转化为响应式数据
//        const wrap = (val)=>typeof val === 'object' ? reactive(val):val
//        const target = this.raw
//        track(target,ITERATE_KEY)
//        //通过target调用原始forEach方法进行遍历
//        target.forEach((v,k)=>{
//         //手动调用callback,用wrap函数包裹value和key后再传给callback,就这样实现了深响应
//         callBack(wrap(v),wrap(k),this)
//        })
//     }
//  }
 
 
// 问题场景2:
//for...in循环和forEach循环,响应联系本身都是建立在ITERATE_KEY与副作用函数之间的。然而,使用for...in来遍历对象与适应forEach遍历集合之间存在本质的不同。具体体现在for...in循环遍历对象时,只关心对象的键,不关心对象的值
  effect(() => {
     for (const key in obj) {
       console.log(key)
     }
   })
//只有当新增,删除对象的key时,才需要重新执行副作用函数。所以在trigger函数内判断操作类型是否为ADD或DELETE,从而知道是否需要触发与ITERARE_KEY相关联的副作用函数重新执行。对于SET类型来说,因为它不会改变一个对象键的数量,所以当SET类型的操作发生时,不需要触发副作用函数重新执行。

//但是这个规则不适应于Map类型的forEach遍历
const p = reactive(new Map([
  ['key',1]
]))

effect(()=>{
  p.forEach((value,key) => {
    console.log(value)   //循环不仅关心集合的键,还关心集合的值
  })
})
p.set('key',2)
//当使用forEach遍历Map类型时,既关心键,又关心值。意味着当p.set('key',2)修改值的时候,也应该触发副作用函数重新执行,即使操作类型时SET。
//解决方法: 在trigger中判断数据类型是否为Map,做对应的处理
//如果操作的目标是Map类型,则SET操作也应该触发那些与ITERARE_KEY相关联的副作用函数重新执行
const trigger = (target,key,type,newVal) =>{
  const depsMap = bucket.get(target)
  if(!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn=>{
    if(effectFn !== activeEffect){
      effectsToRun.add(effectFn)
    }
  })
  if(type === 'ADD' || type === 'DELETE' || 
    (type === 'SET' && Object.prototype.toString.call(target) === '[object Map]')
    //如果操作类型是SET,并且目标对象是Map类型的数据,也应该触发那些与ITERARE_KEY相关联的副作用函数重新执行
  ){   
    const iterateEffects = depsMap.get(ITERATE_KEY)
    iterateEffects && iterateEffects.forEach(effectFn=>{
      if(effectFn !== activeEffect){
        effectsToRun.add(effectFn)
      }
    })
  }

  effectsToRun.forEach(effectFn=>{
    if(effectFn.options.scheduler){
      effectFn.options.scheduler(effectFn)
    }else{
      effectFn()
    }
  })

}