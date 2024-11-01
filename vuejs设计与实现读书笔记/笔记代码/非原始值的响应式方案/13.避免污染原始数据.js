// //Map或Set的响应式代码
// const p = reactive(new Map([['key',1]]))

// //注册依赖
// effect(()=>{
//     console.log(p.get('key'))
// })

// p.set('key',2)  //触发响应

// const mutableInstrumentations = {
//     get(key){
//         //获取原始对象
//         const target = this.raw
//         //判断读取的key是否存在
//         const had = target.had(key)
//         //追踪依赖,建立响应练习
//         track(target,key)
//         //如果存在,则返回结果。这里要注意的是,如果得到的结果res依然是可代理的数据,则要返回使用reactive包装后的响应式数据
//         if(had){
//             const res = target.get(key)
//             return typeof res === 'object'?reactive(res):res
//         }
//     },
//     set(key,value){
//         const target = this.raw
//         const had = target.has(key)
//         //获取旧值
//         const oldValue = target.get(key)
//         //设置新值
//         target.set(key,value)
//         //如果不存在,说明是ADD操作类型
//         if(!had){
//             trigger(target,key,'ADD')
//         }else if(oldValue !== value || (oldValue === oldValue && value === value)){  //修改操作
//             trigger(target,key,'SET')
//         }
//     }
// }



 // 原始 Map 对象 m
 const m = new Map()
 // p1 是 m 的代理对象
 const p1 = reactive(m)
 // p2 是另外一个代理对象
 const p2 = reactive(new Map())
 // 为 p1 设置一个键值对，值是代理对象 p2
 p1.set('p2', p2)

 effect(() => {
   // 注意，这里我们通过原始数据 m 访问 p2
   console.log(m.get('p2').size)
 })
 // 注意，这里我们通过原始数据 m 为 p2 设置一个键值对 foo --> 1
 m.get('p2').set('foo', 1)

 const mutableInstrumentations = {
    set(key,value){
        const target = this.raw
        const had = target.has(key)
        const oldValue = target.get(key)
        //获取原始数据,如果value.raw不存在,那么value就是原始数据
        const rawValue = value.raw || value
        //设给rawValue
        target.set(key,rawValue)
        if(!had){
            trigger(target,key,'ADD')
        }else if(oldValue !== value || (oldValue === oldValue && value === value)){ 
            trigger(target,key,'SET')
        }
    }
}