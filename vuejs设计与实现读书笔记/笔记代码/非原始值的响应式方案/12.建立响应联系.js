//set数据响应式应用场景
const p = reactive(new Set([1,2,3]))
effect(()=>{
    //在副作用函数中访问size属性
    console.log(p.size)
})
//删除值为1的元素,应该触发响应
p.add(1)

//在副作用函数中访问size属性,然后调用p.add函数向集合中添加数据,这个行为会间接改变集合的size属性,所以副作用函数需要去执行。
//方案:访问size的时候调用track函数进行依赖追踪,然后再add方法执行时调用trigger函数触发响应。

//建立依赖联系
function createReactive(obj,isShallow=false,isReadonly=false){
    return new Proxy(obj,{
        get(target,key,receiver){
            if(key === 'size'){
                //调用track函数建立响应联系
                track(target,ITERARE_KEY)
                return Reflect.get(target,key,target)
            }
            return target[key].bind(target)
        }
    })
}


//上面的get方法就需要返回一个新的值
function createReactive(obj,isShallow=false,isReadonly=false){
    return new Proxy(obj,{
        get(target,key,receiver){
            if(key === 'size'){
                //调用track函数建立响应联系
                track(target,ITERARE_KEY)
                return Reflect.get(target,key,target)
            }
            return mutableInstrumentations[key]
        }
    })
}

//定义mutableInstrumentations方法
//mutableInstrumentations将所有的自定义实现的方法都定义到该对象下,例如add方法。然后,在get拦截函数内返回定义在mutableInstrumentations对象中的方法。这样,调用p.add就等于调用mutableInstrumentations.add了
// const mutableInstrumentations = {
//     add(key){
//         //this仍然指向的是代理对象,通过raw属性获取原始数据对象
//         const target = this.raw
//         //通过原始数据对象执行add方法删除具体的值
//         //注意,这里不需要.bind方法了,因为是直接通过target调用并执行的
//         const res = target.add(key)
//         //调用trigger函数触发响应,并指定操作类型为ADD
//         trigger(target,key,'ADD')
//         //返回操作结果
//         return res
//     }
// }

//add函数内的this仍然指向代理对象,所以需要this.raw获取原始对象数据。有了原始数据对象后,就可以通过它调用target.add方法,不需要再通过bind绑定了。代添加操作完成后,调用trigger函数触发响应。这里指定的操作类型为ADD,会取出与ITERATE_KEY相关联的副作用函数执行,这样就可以触发通过访问size属性所收集的副作用函数来执行了。
//如果调用add方法添加的元素已经存在于Set集合中,就不需要再触发响应了,有助于提升性能
//delete方法同理
const mutableInstrumentations = {
    //触发add操作
    add(key){
        const target = this.raw
         //判断值是否已经存在
         const hadKey = target.has(key)
         if(!hadKey){
            const res = target.add(key)
            trigger(target,key,'ADD')
         }
         return res
    },
    //触发delete操作
    delete(key){
        const target = this.raw
         //判断值是否已经存在
         const hadKey = target.has(key)
         if(!hadKey){
            const res = target.delete(key)
            trigger(target,key,'DELETE')
         }
         return res
    }
}
