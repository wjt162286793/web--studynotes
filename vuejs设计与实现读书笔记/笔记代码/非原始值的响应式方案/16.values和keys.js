 //实现values方法
 
 const mutableInstrumentations = {
   // 共用 iterationMethod 方法
   [Symbol.iterator]: iterationMethod,
   entries: iterationMethod,
   values: valuesIterationMethod
 }

 function iterationMethod() {
    const target = this.raw
    const itr = target[Symbol.iterator]()
  
    const wrap = (val) => typeof val === 'object' ? reactive(val) : val
  
    track(target, ITERATE_KEY)
  
    return {
      next() {
        const { value, done } = itr.next()
        return {
          value: value ? [wrap(value[0]), wrap(value[1])] : value,
          done
        }
      },
      // 实现可迭代协议
      [Symbol.iterator]() {
        return this
      }
    }
  }

 function valuesIterationMethod() {
   // 获取原始数据对象 target
   const target = this.raw
   // 通过 target.values 获取原始迭代器方法
   const itr = target.values()

   const wrap = (val) => typeof val === 'object' ? reactive(val) : val

   track(target, ITERATE_KEY)

   // 将其返回
   return {
     next() {
       const { value, done } = itr.next()
       return {
         // value 是值，而非键值对，所以只需要包裹 value 即可
         value: wrap(value),
         done
       }
     },
     [Symbol.iterator]() {
       return this
     }
   }
 }

 //valuesIterationMethod和iterationMethod的区别:
 //1.iterationMethod通过[Symbol.iterator]获取迭代器对象,valuesIterationMethod通过target.values获取迭代器对象。
 //2.iterationMethod处理的是键值对:[wrap(value[0]),wrap(value[1])],而valuesIterationMethod只处理值,即wrap(value)

 //keys方法和values方法很类似,不同点在于前者处理的是键不是值,所以,只需要将valuesIterationMethod方法中的代码进行一些修改
 //将01 const itr = target.values()  替换为01 const itr = target.keys()

 //问题:
const p = reactive(new Map([
   ['key1', 'value1'],
   ['key2', 'value2']
 ]))

 effect(() => {
   for (const value of p.keys()) {
     console.log(value) // key1 key2
   }
 })

 p.set('key2', 'value3') // 这是一个 SET 类型的操作，它修改了 key2 的值
 
 //按理说,p.set('key2', 'value3')调用了之后,Map的key并没有发生变化,副作用函数不应该执行。但结果是执行了,因为在之前对Map数据做了一些处理。之前的trigger中,SET类型会触发副作用函数重新执行
//这对于values和entries方法是必须的,但是对于keys方法,就不需要了,keys只关注Map的键有没有发生变化,而不关心值是否发生变化


 const MAP_KEY_ITERATE_KEY = Symbol()

 function keysIterationMethod() {
   // 获取原始数据对象 target
   const target = this.raw
   // 获取原始迭代器方法
   const itr = target.keys()

   const wrap = (val) => typeof val === 'object' ? reactive(val) : val

   // 调用 track 函数追踪依赖，在副作用函数与 MAP_KEY_ITERATE_KEY 之间建立响应联系
   track(target, MAP_KEY_ITERATE_KEY)

   // 将其返回
   return {
     next() {
       const { value, done } = itr.next()
       return {
         value: wrap(value),
         done
       }
     },
     [Symbol.iterator]() {
       return this
     }
   }
 }

 //当调用track函数追踪依赖时,使用MAP_KEY_ITERATE_KEY代替了ITERATE_KEY,实现了依赖收集的分离,values和entries仍然依赖ITERATE_KEY,keys依赖MAP_KEY_ITERATE_KEY。
 //SET操作只会触发与ITERATE_KEY相关的副作用函数,忽略与MAP_KEY_ITERATE_KEY关联的副作用函数。
 //但是当ADD和DELETE操作时,这两种都需要触发,因为key会改变。所以修改如下
 
  function trigger(target, key, type, newVal) {
   // 省略其他代码

   if (
     // 操作类型为 ADD 或 DELETE
     (type === 'ADD' || type === 'DELETE') &&
     // 并且是 Map 类型的数据
     Object.prototype.toString.call(target) === '[object Map]'
   ) {
     // 则取出那些与 MAP_KEY_ITERATE_KEY 相关联的副作用函数并执行
     const iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY)
     iterateEffects && iterateEffects.forEach(effectFn => {
       if (effectFn !== activeEffect) {
         effectsToRun.add(effectFn)
       }
     })
   }

 }