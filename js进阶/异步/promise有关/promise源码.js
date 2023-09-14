// // 判断变量否为function
// const isFunction = variable => typeof variable === 'function'
// // 定义Promise的三种状态常量
// const PENDING = 'PENDING'
// const FULFILLED = 'FULFILLED'
// const REJECTED = 'REJECTED'

// class MyPromise {
//   constructor (handle) {
//     console.log(handle,'进入constructor')
//     //handle是一个函数,里面有两个形参,resolve和reject
//     //这两个形参都是两个函数,参数为成功的值和失败的值
//     if (!isFunction(handle)) {
//       throw new Error('MyPromise must accept a function as a parameter')
//     }
//     // 添加状态
//     this._status = PENDING
//     // 添加状态
//     this._value = undefined
//     // 添加成功回调函数队列
//     this._fulfilledQueues = []
//     // 添加失败回调函数队列
//     this._rejectedQueues = []
//     // 执行handle
//     try {
//         console.log(this,'try里面的this')  //MyPromise类
//       handle(this._resolve.bind(this), this._reject.bind(this)) 
//     } catch (err) {
//       this._reject(err)
//     }
//   }
//   // 添加resovle时执行的函数
//   _resolve (val) {
//     console.log(val,'resolve函数的参数')
//     const run = () => {
//       if (this._status !== PENDING) return
//       // 依次执行成功队列中的函数，并清空队列
//       const runFulfilled = (value) => {
//         let cb;
//         console.log(cb = this._fulfilledQueues.shift(),'是什么---')
//         while (cb = this._fulfilledQueues.shift()) {
//           cb(value)
//         }
//       }
//       // 依次执行失败队列中的函数，并清空队列
//       const runRejected = (error) => {
//         let cb;
//         while (cb = this._rejectedQueues.shift()) {
//           cb(error)
//         }
//       }
//       /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
//         当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
//       */
//       if (val instanceof MyPromise) {
//         val.then(value => {
//           this._value = value
//           this._status = FULFILLED
//           runFulfilled(value)
//         }, err => {
//           this._value = err
//           this._status = REJECTED
//           runRejected(err)
//         })
//       } else {
//         this._value = val
//         this._status = FULFILLED
//         runFulfilled(val)
//       }
//     }
//     // 为了支持同步的Promise，这里采用异步调用
//     setTimeout(run, 0)
//   }
//   // 添加reject时执行的函数
//   _reject (err) { 
//     if (this._status !== PENDING) return
//     // 依次执行失败队列中的函数，并清空队列
//     const run = () => {
//       this._status = REJECTED
//       this._value = err
//       let cb;
//       while (cb = this._rejectedQueues.shift()) {
//         cb(err)
//       }
//     }
//     // 为了支持同步的Promise，这里采用异步调用
//     setTimeout(run, 0)
//   }
//   // 添加then方法
//   then (onFulfilled, onRejected) {
//     const { _value, _status } = this
//     // 返回一个新的Promise对象
//     return new MyPromise((onFulfilledNext, onRejectedNext) => {
//       // 封装一个成功时执行的函数
//       let fulfilled = value => {
//         try {
//           if (!isFunction(onFulfilled)) {
//             onFulfilledNext(value)
//           } else {
//             let res =  onFulfilled(value);
//             if (res instanceof MyPromise) {
//               // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
//               res.then(onFulfilledNext, onRejectedNext)
//             } else {
//               //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
//               onFulfilledNext(res)
//             }
//           }
//         } catch (err) {
//           // 如果函数执行出错，新的Promise对象的状态为失败
//           onRejectedNext(err)
//         }
//       }
//       // 封装一个失败时执行的函数
//       let rejected = error => {
//         try {
//           if (!isFunction(onRejected)) {
//             onRejectedNext(error)
//           } else {
//               let res = onRejected(error);
//               if (res instanceof MyPromise) {
//                 // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
//                 res.then(onFulfilledNext, onRejectedNext)
//               } else {
//                 //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
//                 onFulfilledNext(res)
//               }
//           }
//         } catch (err) {
//           // 如果函数执行出错，新的Promise对象的状态为失败
//           onRejectedNext(err)
//         }
//       }
//       switch (_status) {
//         // 当状态为pending时，将then方法回调函数加入执行队列等待执行
//         case PENDING:
//           this._fulfilledQueues.push(fulfilled)
//           this._rejectedQueues.push(rejected)
//           break
//         // 当状态已经改变时，立即执行对应的回调函数
//         case FULFILLED:
//           fulfilled(_value)
//           break
//         case REJECTED:
//           rejected(_value)
//           break
//       }
//     })
//   }
//   // 添加catch方法
//   catch (onRejected) {
//     return this.then(undefined, onRejected)
//   }
//   // 添加静态resolve方法
//   static resolve (value) {
//     // 如果参数是MyPromise实例，直接返回这个实例
//     if (value instanceof MyPromise) return value
//     return new MyPromise(resolve => resolve(value))
//   }
//   // 添加静态reject方法
//   static reject (value) {
//     return new MyPromise((resolve ,reject) => reject(value))
//   }
//   // 添加静态all方法
//   static all (list) {
//     return new MyPromise((resolve, reject) => {
//       /**
//        * 返回值的集合
//        */
//       let values = []
//       let count = 0
//       for (let [i, p] of list.entries()) {
//         // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
//         this.resolve(p).then(res => {
//           values[i] = res
//           count++
//           // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
//           if (count === list.length) resolve(values)
//         }, err => {
//           // 有一个被rejected时返回的MyPromise状态就变成rejected
//           reject(err)
//         })
//       }
//     })
//   }
//   // 添加静态race方法
//   static race (list) {
//     return new MyPromise((resolve, reject) => {
//       for (let p of list) {
//         // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
//         this.resolve(p).then(res => {
//           resolve(res)
//         }, err => {
//           reject(err)
//         })
//       }
//     })
//   }
//   finally (cb) {
//     return this.then(
//       value  => MyPromise.resolve(cb()).then(() => value),
//       reason => MyPromise.resolve(cb()).then(() => { throw reason })
//     );
//   }
// }




// 4. 定义状态常量（成功fulfilled 失败rejected 等待pending），初始化为pending。
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
 
// 1 创建MyPromise类 
class MyPromise {
  // 2 通过构造函数constructor，在执行这个类的时候需要传递一个执行器进去并立即调用
  constructor(executor) {
    // 13 Promise实现捕获错误
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  status = PENDING
  //  6. MyPromise类中定义value和reason，用来储存执行器执行成功和失败的返回值
  value = null
  reason = null
  // 9. 实现then方法多次调用添加多个处理函数 初始化回调为数组依次执行
  successCallback = []
  failCallback = []
  // 3. 定义resolve和reject（定义为箭头函数：避免直接调用时this指向全局window问题）
  resolve = value => {
    // 5. 完成resolve函数的状态改变（注意：需判断当前状态是否可以改变）
    // 判断当前状态是否可改变
    if(this.status !== PENDING) return
    // 改变当前状态
    this.status = FULFILLED
    // 保存返回值
    this.value = value
    // 执行成功回调
    while(this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }
  reject = reason => {
    // 5. 完成reject函数的状态改变（注意：需判断当前状态是否可以改变）
    // 判断当前状态是否可改变
    if(this.status !== PENDING) return
    // 改变当前状态
    this.status = REJECTED
    // 保存返回值
    this.reason = reason
    // 执行失败回调
    while(this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }
  // 7. MyPromise类中添加then方法，成功回调有一个参数 表示成功之后的值；失败回调有一个参数 表示失败后的原因
  then(successCallback, failCallback) {
    // 14 将then方法的参数变为可选参数
    successCallback = successCallback ? successCallback : value => this.value
    failCallback = failCallback ? failCallback : reason => {throw this.reason}
    // 10. 实现then方法链式调用（写一个函数方法专门判断回调的结果是普通值还是promise，then方法返回的仍然是一个promise）
    let promise2 = new MyPromise((resolve, reject) => {
        // 判断当前状态 执行对应回调 异步情况下存储当前回调等待执行
        if(this.status === FULFILLED) {
           // 异步
           setTimeout(() => {
            // 13 then方法捕获错误
            try {
              // 异步获取到promise2
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        } else if(this.status === REJECTED) {
          // 异步
          setTimeout(() => {
            // 13 then方法捕获错误
            try {
              // 异步获取到promise2
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        } else {
          // 8. 处理异步逻辑（pending状态下在then中将回调存起来）
          this.successCallback.push(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
          this.failCallback.push(() => {
            try {
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        }
    })
    return promise2
  }
  // 17. finally方法 不管成功失败都会执行一次
  finally(callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MyPromise.reject(callback()).then(() => { throw reason })
    })
  }
  // 18. catch
  catch(failCallback) {
    return this.then(undefined, failCallback)
  }
  // 15. Promise.all
  static all (array) {
    let result = []
    let index
    return new Promise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        if(index === array.length) {
          resolve(result)
        }
      }
      for(let i = 0; i < array.length; i++) {
        let current = array[i]
        if(current instanceof MyPromise) {
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, array[i])
        }
      }
    })
  }
  // 16. Promise.resolve 返回一个promise
  static resolve(value) {
    if(value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
}
 
// 处理promise返回值各种类型情况（普通值，promise）
function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if(x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}