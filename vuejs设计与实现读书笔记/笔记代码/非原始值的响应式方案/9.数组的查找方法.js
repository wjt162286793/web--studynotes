//第一部分
// const arr = reactive([1,2])

// effect(()=>{
//     console.log(arr.includes(1))
// })

// //其实数组查找,会在includes函数(js内置函数)中调用this去对比,不过在之前我们自定义的createReactive函数中如下
// if(typeof res === 'object' && res !== null){
//     return isReadonly?readonly(res):reactive(res)
// }
// //最终this其实是指向了一个新的代理对象,这个对象虽然和数组中的对象属性相同,但是属于不同的内存当中,是两个不同地址的对象

// //解决方案:

// //创建一个Map实例,存储原始对象到代理对象的映射
// const reactiveMap = new Map()
// function reactive(obj){

//     //优先通过原始对象obj,寻找之前创建的代理对象,如果找到了,直接返回已有的代理对象
//     const existionProxy = reactiveMap.get(obj)
//     if(existionProxy){
//         return existionProxy
//     }
//     //否则创建新的代理对象
//     const proxy = createReactive(obj)
//     //存储到Map中,从而帮忙重复创建
//     reactiveMap.set(obj,proxy)
//     return proxy
// }

//第二部分
//不过,还会有如下的情况需要处理
// const obj = {}
// const arr = reactive([obj])
// console.log(arr.includes(arr[0]))  //true
// console.log(arr.includes(obj))  //false
//因为includes内部的this指向的是代理对象arr,并且在获取数组元素时得到的值也是代理对象,所以拿原始对象obj去查找肯定找不到,因此返回false。为此,需要重写数组的includes方法并且实现自定义行为,才能结局这个问题
//重新includes方法
// const originMethod = Array.prototype.includes
// const arrayInstrumentations = {
//     includes:function(...args){
//        //this是代理对象,在代理对象中查找,将结果存储到res中
//        let res = originMethod.apply(this.args)
//        if(res == false){
//         //res为false说明没找到,通过this.raw拿到原始的数组,再去其中查找并更新res值
//           res = originMethod.apply(this.raw,args)
//        }
//        //返回最终结果
//        return res
//     }
    
// }

// function createReactive(obj,inShallow = false,isReadonly = false){
//     return new Proxy(obj,{
//         //拦截读取操作
//         get(target,key,receiver){
//             if(key === 'raw'){
//                 return target
//             }
//             //如果返回的对象是数组,并且key存在于arrayInstrumentations上,那么返回定义在arrayInstrumentations上的值
//             if(Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)){
//                 return Reflect.get(arrayInstrumentations,key,receiver)
//             }
//             if(!isReadonly && typeof key !== 'symbol'){
//                 track(target,key)
//             }
//             const res = Reflect.get(target,key,receiver)
//             if(!isShallow){
//                 return res
//             }
//             if(typeof res === 'object' && res !== null){
//                 return isReadonly ? readonly(res):reactive(res)
//             }
//             return res
//         }
//     })
// }

//第三部分
//重写查找方法的综合函数
const arrayInstrumentations = {}
['includes','indexof','lastIndexOf'].forEach(method=>{
    const originMethod = Array.prototype[method]
    arrayInstrumentations[method] = function(...args){
               //this是代理对象,在代理对象中查找,将结果存储到res中
               let res = originMethod.apply(this.args)
               if(res == false){
                //res为false说明没找到,通过this.raw拿到原始的数组,再去其中查找并更新res值
                  res = originMethod.apply(this.raw,args)
               }
               //返回最终结果
               return res
            }
})