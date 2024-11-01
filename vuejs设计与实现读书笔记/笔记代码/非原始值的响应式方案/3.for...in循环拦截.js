const obj = { foo: 1 };
const ITERATE_KEY = Symbol(); //唯一标识

// const p = new Proxy(obj,{
//     ownKeys(target){
//         track(target,ITERATE_KEY)
//         return Reflect.ownKeys(target)
//     }
// })

//触发与ITERATE_KEY关联的副作用函数
// function trigger(target,key){
//     const depsMap = bucke.get(target)
//     if(!depsMap) return

//     const effects = depsMap.get(key)
//     //取得与ITERATE_KEY关联的副作用函数
//     const iterateEffects = depsMap.get(ITERATE_KEY)
//     const effectsToRun = new Set()

//     //将ITERATE_KEY关联的副作用函数添加到effectsToRun
//      iterateEffects && iterateEffects.forEach(effectFn=>{
//         if(effectFn !== activeEffect){
//             effectsToRun.add(effectFn)
//         }
//      })

//      effectsToRun.forEach(effectFn=>{
//         if(effectFn.options.scheduler){
//             effectFn.options.scheduler(effectFn)
//         }else{
//             effectFn()
//         }
//      })

// }

//set函数拦截
const p = new Proxy(obj, {
  set(target, key, newVal, receiver) {
    //如果属性不存在,则说明是在添加新属性,否则是设置已有属性
    const type = Object.prototype.hasOwnProperty.call(target, key)
      ? "SET"
      : "ADD";
    //设置属性值
    const res = Reflect.set(target, key, newVal, receiver);
    //将type作为第三个参数传递给trigger函数
    trigger(target, key, type);
    return res;
  },
  
  deleteProperty(target,key){
    //检查被操作属性时候是对象自己的属性
    const hasKey = Object.prototype.hasOwnProperty.call(target,key)
    //使用Reflect.deleteProperty完成属性的删除
    const res = Reflect.deleteProperty(target,key)

    if(res && hasKey){
        //当属性属于对象本身并且被删除是,触发更新
        trigger(target,key,'DELETE')
    }
    return res
  }

});

//添加type后的触发函数
function trigger(target, key, type) {
  const depsMap = bucke.get(target);
  if (!depsMap) return;

  const effects = depsMap.get(key);

  const effectsToRun = new Set();

  //只有操作类型为Add是,才回触发与ITERATE_KEY关联的副作用函数的执行
  if (type === "ADD") {
    //取得与ITERATE_KEY关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach((effectFn) => {   
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
