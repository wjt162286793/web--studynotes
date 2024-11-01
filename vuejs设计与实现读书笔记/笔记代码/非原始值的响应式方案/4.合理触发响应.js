const obj = {name:'wjt'}
// const p = new Proxy({
//    set(target,key,newVal,receiver){
//     const oldVal = target[key]
//     const type = Object.prototype.hasOwnProperty.call(target, key)
//       ? "SET"
//       : "ADD";
//     //设置属性值
//     const res = Reflect.set(target, key, newVal, receiver);
//     if(oldVal !== newVal){
//         trigger(target,key,type)
//     }
//     return res
//    }
// })


//NaN的特殊处理
const p = new Proxy({
    set(target,key,newVal,receiver){
     const oldVal = target[key]
     const type = Object.prototype.hasOwnProperty.call(target, key)
       ? "SET"
       : "ADD";
     //设置属性值
     const res = Reflect.set(target, key, newVal, receiver);
     if(oldVal !== newVal && (oldVal === oldVal || newVal === newVal)){
         trigger(target,key,type)
     }
     return res
    }
 })
 
