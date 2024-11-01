//给创建响应式的功能函数上添加第三个参数,判定是否为只读
// function createReactive(obj,isShallow = false,isReadonly = false){
//     return new Proxy(obj,{
//         get(target,key,receiver){
//             if(key === 'raw'){
//                 return target
//             }
//             const res = Reflect.get(target,key,receiver)
//             //非响应数据不需要触发track函数
//             if(!isReadonly){
//                 track(target,key)

//             }
           
//             //如果是浅响应,直接返回原始值
//             if(isShallow){
//                 return res
//             }
//             if(typeof res === 'object' && res !== null){
//                 return reactive(res)
//             }
//             return res
//         },
//         set(target,key,newValue,receiver){
//            //如果是只读属性,则警告信息并返回
//            if(isReadonly){
//             console.warn(`属性${key}是只读的`)
//             return true
//            }
//            /*...*/
//         },
//         deleteProperty(target,key){
//             //如果是只读属性,则警告信息并返回
//             if(isReadonly){
//                 console.warn(`属性${key}是只读的`)
//                 return true
//             }
//         }
      
//     })
// }

//封装只读

// function readonly(obj){
//     return createReactive(obj,false,true)
// }


//第一个参数是数据,第二个参数为是否为深度,true为深度,第三个参数决定是否只读,true为只读
function createReactive(obj,isShallow = false,isReadonly = false){
    return new Proxy(obj,{
        get(target,key,receiver){
            if(key === 'raw'){
                return target
            }
            const res = Reflect.get(target,key,receiver)
            //非响应数据不需要触发track函数
            if(!isReadonly){
                track(target,key)

            }
           
            //如果是浅响应,直接返回原始值
            if(isShallow){
                return res
            }
            if(typeof res === 'object' && res !== null){
                return isReadonly?readonly(res):reactive(res)
            }
            return res
        },
 /*其他拦截方法*/
    })
}


//浅只读
function shallowReadonly(obj){
    return createReactive(obj,true,true)
}

//深只读
function readonly(obj){
    return createReactive(obj,false,true)
}