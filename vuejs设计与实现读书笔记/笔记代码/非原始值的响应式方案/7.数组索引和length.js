//第一步
// function createReactive(obj,isShallow = false,isReadonly = false){
//     return new Proxy(obj,{
//         set(target,key,newVal,receiver){
//          const oldVal = target[key]
//                      //如果属性不存在,则说明这是一个新增的操作,否则是更改现有的属性
//                      const type = Array.isArray(target)   //首先判断是否为数组
//                      ? Number(key) <target.length ? 'SET' : 'ADD'   //是数组的情况下,如果当前索引的key值小于目标长度,说明是修改操作,否则是新增操作
//                      : Object.prototype.hasOwnProperty.call(target, key) ? "SET": "ADD";  //对象类型的情况下判断修改还是新增

const { If } = require("three/webgpu");


//          //设置属性值
//          const res = Reflect.set(target, key, newVal, receiver);
//          if(oldVal !== newVal && (oldVal === oldVal || newVal === newVal)){
//              trigger(target,key,type)
//          }
//          return res
//         }
//      })
// }


// function trigger(target, key, type) {
//     const depsMap = bucke.get(target);
//     if (!depsMap) return;
  
//     const effects = depsMap.get(key);
  
//     const effectsToRun = new Set();
  
//     //只有操作类型为Add是,才回触发与ITERATE_KEY关联的副作用函数的执行
//     if (type === "ADD") {
//       //如果是数组类型,获取length对应的副作用函数,否则取得与ITERATE_KEY关联的副作用函数
//       const iterateEffects = Array.isArray(target) ? depsMap.get('length') : depsMap.get(ITERATE_KEY);
//       iterateEffects && iterateEffects.forEach((effectFn) => {   
//           if (effectFn !== activeEffect) {
//             effectsToRun.add(effectFn);
//           }
//         });
//     }
  
//     effectsToRun.forEach((effectFn) => {
//       if (effectFn.options.scheduler) {
//         effectFn.options.scheduler(effectFn);
//       } else {
//         effectFn();
//       }
//     });
//   }


//第二步
function createReactive(obj,isShallow = false,isReadonly = false){
    return new Proxy(obj,{
        set(target,key,newVal,receiver){
         const oldVal = target[key]
                  
                     const type = Array.isArray(target)  
                     ? Number(key) <target.length ? 'SET' : 'ADD'   
                     : Object.prototype.hasOwnProperty.call(target, key) ? "SET": "ADD";  


         const res = Reflect.set(target, key, newVal, receiver);
         if(oldVal !== newVal && (oldVal === oldVal || newVal === newVal)){
             trigger(target,key,type,newVal)   //在这里新增一个传参
         }
         return res
        }
     })
}


function trigger(target, key, type,newVal) {
    const depsMap = bucke.get(target);
    if (!depsMap) return;
  
    const effects = depsMap.get(key);
  
    const effectsToRun = new Set();
  
    if (type === "ADD") { 
        if(Array.isArray(target) && key=== "length"){
            const lengthEffects = depsMap.get('length')
            //新增判断条件,对比key和newVal
            if(key > newVal){
                lengthEffects && lengthEffects.forEach((effectFn) => {   
                    if (effectFn !== activeEffect) {
                      effectsToRun.add(effectFn);
                    }
                  });
            }

        }else{
            const iterateEffects = depsMap.get(ITERATE_KEY);
            iterateEffects && iterateEffects.forEach((effectFn) => {   
                if (effectFn !== activeEffect) {
                  effectsToRun.add(effectFn);
                }
              });
        }

    }
  
    effectsToRun.forEach((effectFn) => {
      if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
      } else {
        effectFn();
      }
    });
  }
