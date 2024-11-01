const obj = {
    wjt:{
        name:'wjt',
        age:29
    }
}

//访问obj.wjt返回普通对象
// function reactive(obj){
//     return new Proxy(obj,{
//         get (target,key,receiver){
//             if(key === 'raw'){
//                 return target
//             }
//             track(target,key)
//             return Reflect.get(target,key,receiver)
//         }
    
//     })

// }


//对Relfect.get的结果进行一个包装
// function reactive(obj){
//     return new Proxy(obj,{
//         get (target,key,receiver){
//             if(key === 'raw'){
//                 return target
//             }
//             track(target,key)
//             const res =  Reflect.get(target,key,receiver)
//             if(typeof res === 'object' && res !== null){
//                 //通过递归,如果结果为对象类型,将结果包装成响应式数据
//                 return reactive(res)
//             }
//             return res
//         }
    
//     })

// }


//封装浅响应
function createReactive(obj,isShallow = false){
    return new Proxy(obj,{
        get(target,key,receiver){
            if(key === 'raw'){
                return target
            }
            const res = Reflect.get(target,key,receiver)
            track(target,key)

            //如果是浅响应,直接返回原始值
            if(isShallow){
                return res
            }
            if(typeof res === 'object' && res !== null){
                return reactive(res)
            }
            return res
        }
        //其余拦截方法
    })
}

//深响应
function reactive(obj){
    return createReactive(obj)
}

//浅响应
function shallowReactive(obj){
    return createReactive(obj,true)
}