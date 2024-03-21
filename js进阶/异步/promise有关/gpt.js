const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback(value));
      }
    };

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilledCallback = value => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      };

      const rejectedCallback = reason => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(reason);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              reject(result);
            }
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.status === FULFILLED) {
        fulfilledCallback(this.value);
      } else if (this.status === REJECTED) {
        rejectedCallback(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(fulfilledCallback);
        this.onRejectedCallbacks.push(rejectedCallback);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;

      const processResult = (index, value) => {
        results[index] = value;
        count++;

        if (count === promises.length) {
          resolve(results);
        }
      };

      for (let i = 0; i < promises.length; i++) {
        promises[i].then(value => processResult(i, value), reject);
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  }
}

// 示例
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hello, world!');
//   }, 1000);
// });

// promise
//   .then(value => {
//     console.log(value); // 输出: Hello, world!
//     return 'Chain Example';
//   })
//   .then(value => {
//     console.log(value); // 输出: Chain Example
//     throw new Error('Custom Error');
//   })
//   .catch(error => {
//     console.error(error); // 输出: Custom Error
//   });

// let pro = new MyPromise((res, rej) => {
//     setTimeout(() => {
//         res('成功')
//         // rej('失败')
//     }, 3000)
// })

// setTimeout(()=>{
//     pro.then(res => {
//     console.log(res, '成功后的操作逻辑')
// }, rej => {
//     console.log(rej, '失败后的操作逻辑')
// })
// },5000)


let pro2 = new MyPromise((res,rej)=>{
  setTimeout(()=>{
      res(Promise.resolve('成功'))
  },1000)
})
pro2.then(res=>{
  console.log(res,'当前自定义myPromise的成功值')
})

// let pro = new MyPromise(res=>{
//     setTimeout(()=>{
//       res('初始化成功')
//     })
//   })
//   pro.then(res => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log(res,'第一层链')
//             resolve(res,'第一层返回成功值')
//         }, 2000)

//     })
// }).then(res => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log(res,'第二层链')
//             resolve('第二层返回成功值')
//         }, 2000)

//     })
// }).then(res => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log(res,'第三层链')
//             resolve('第三层返回成功值')
//         }, 2000)

//     })
// }).then(res=>{
//   console.log(res,'最终的值')
// })