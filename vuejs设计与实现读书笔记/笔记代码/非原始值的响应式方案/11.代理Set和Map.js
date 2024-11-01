// const s = new Set([1,2,3])
// const p = new Proxy(s,{})
// console.log(p.size)   // TypeError:Method get Set.prototype.size called on incompatible receiver
//代理对象S不存在[[SetData]]这个内部槽,于是会抛出一个错误,就是上面的错误

//解决问题:修正访问器属性的getter函数执行时的this指向
// const s = new Set([1,2,3])
// const p = new Proxy(s,{
//     get(target,key,receiver){
//         if(key === 'size'){
//             //如果读取的是size属性
//             //通过指定第三个参数receiver为原始对象,target从而修复问题
//             return Reflect.get(target,key,target)
//         }
//         //将方法与原始数据对象target绑定后返回
//         return target[key].bind(target)
//     }
// })
// p.delete(1)  

//将new Proxy也封装到createReactive函数中
const reactiveMap = new Map()
function reactive(obj){
  const proxy = createReactive(obj)
  const existionProxy = reactiveMap.get(obj)
  if(existionProxy) return existionProxy
  reactiveMap.set(obj,proxy)
  return proxy
}

//在createReactive里封装用于代理Set/Map类型数据的逻辑
function createReactive(obj,isShallow = false,isReadonly = false){
    return new Proxy(obj,{
         get(target,key,receiver){
            if(key === 'size'){
                return Reflect.get(target,key,target)
            }
            return target[key].bind(target)
         }
    })
}

