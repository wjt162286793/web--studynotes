//集合类型有三个迭代器方法:
//entries  keys  values

//entries迭代
const m = new Map([['key1','value1'],['key2','value2']])

for(const [key,value] of m.entries()){
    console.log(key,value)
}
//输出:  key1  value1         key2  value2

//for...of
for(const [key,value] of m){
    console.log(key,value)
}
//输出:  key1  value1         key2  value2


//Symbol.iterator手动迭代
const itr = m[Symbol.iterator]()
console.log(itr.next())   //{value:['key1','value1'],done:false}
console.log(itr.next())   //{value:['key2','value2'],done:false}
console.log(itr.next())   //{value:undefined,done:true}


console.log(m[Symbol.iterator] === m.entries)   //true


//尝试使用for...of遍历一个代理数据
const p = reactive(new Map([
    ['key1','value1'],['key2','value2']
]))

effect(()=>{
    //这里会报错:p is onot iterable
    for(const [key,value] of p){
        console.log(key,value)
    }
})
p.set('key3','value3')
//原因在于使用for...of循环代理对象时,内部会试图从代理对象身上读取p[Symbol.iterator]属性,这个操作会触发get拦截函数,所以我们可以把Symbol.iterator方法的实现放到mutableInstrumentations中

// const mutableInstrumentations = {
//     [Symbol.iterator](){
//         //获取原始数据对象target
//         const target = this.raw
//         //获取原始迭代器方法
//         const itr = target[Symbol.iterator]()
//         //将itr返回
//         return itr
//     }
// }

//问题:迭代器产生的值不是响应式的数据
//解决方法;返回自定义的迭代器
// const mutableInstrumentations = {
//     [Symbol.iterator](){
//         //获取原始数据对象target
//         const target = this.raw
//         //获取原始迭代器方法
//         const itr = target[Symbol.iterator]()
//         //让不是代理对象变成代理对象
//         const wrap = (val)=>typeof val === 'object' && val !== null ?reactive(val) :val
//         //返回自定义的迭代器
//         return {
//             next(){
//                 //调用原始迭代器的next方法获取value和done
//                 const {value,done} = itr.next()
//                 return {
//                     //如果value不是undefined,则对其进行包裹
//                     value:value?[wrap[value[0]],wrap(value[1])]:value,done
//                 }
//             }
//         }
//     }
// }


//entries和[Symbol.iterator]等价,所以可以抽离公共方法,
//  const mutableInstrumentations = {
//    // 共用 iterationMethod 方法
//    [Symbol.iterator]: iterationMethod,
//    entries: iterationMethod
//  }
//  // 抽离为独立的函数，便于复用
//  function iterationMethod() {
//    const target = this.raw
//    const itr = target[Symbol.iterator]()

//    const wrap = (val) => typeof val === 'object' ? reactive(val) : val

//    track(target, ITERATE_KEY)

//    return {
//      next() {
//        const { value, done } = itr.next()
//        return {
//          value: value ? [wrap(value[0]), wrap(value[1])] : value,
//          done
//        }
//      }
//    }
//  }
    
//问题:当使用for..of进行迭代的时候,会报错,意思为p.entries的返回值不是一个可迭代对象。
//p.entries的返回值是一个对象,这个对象虽然有next方法,但不具备Symbol.iterator方法,所以并不是一个可迭代对象。

//迭代器协议和可迭代协议
const obj = {
    //迭代器协议
    next(){

    },
    //可迭代协议
    [Symbol.iterator](){

    }
}

//添加可迭代协议

// 抽离为独立的函数，便于复用
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
