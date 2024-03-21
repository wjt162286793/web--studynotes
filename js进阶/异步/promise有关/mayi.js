(function(window){ 
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'
 // executor执行器，就是我们new myPromise((resolve,reject)=>) 传过来的函数，它是同步执行的
function myPromise(executor){

    const self=this
    self.status=PENDING
    self.state=undefined
    self.callbackQueues=[]

    function resolve(value){ 
    if(self.status!==PENDING) return
        self.status=FULFILLED
        self.state=value

     if(self.callbackQueues.length>0){
        self.callbackQueues.map(item=>{
           setTimeout(()=>{
                item.onResolved(value)
           })
        })
      }
    }
    function reject (reason) {
    if(self.status!==PENDING) return
        self.status=REJECTED
        self.state=reason

     if(self.callbackQueues.length>0){
        self.callbackQueues.map(item=>{
           setTimeout(()=>{
                item.onRejected(reason)
           })
        })
      }
    }
   try {
    executor(resolve,reject)
   }catch(err){
       reject(err)
   }
 }


 /**
  * then方法指定了成功的和失败的回调函数
  * 返回一个新的myPromise对象，它实现了链式调用
  * 返回的myPromise的结果由onResolved和onRejected决定
  */
 myPromise.prototype.then=function(onResolved,onRejected){
   
    onResolved=typeof onResolved==='function' ? onResolved : value=>value
    onRejected=typeof onRejected==='function'? onRejected : reason=>  {throw reason}
    const seft=this

    return new myPromise((resolve,reject)=>{
        function handle (callback){
            try {
                const result =callback(seft.state)
                if(result instanceof myPromise){
                   result.then(
                    (res)=>{
                        resolve(res)
                    },
                    err=>{reject(err)})
                  
                }else {
                    resolve(result)
                }
            }catch(err){
                reject(err)
            }
        }

        if(seft.status===PENDING){ // 当是myPromise状态为pending时候，将onResolved和onRejeactd存到数组中callbackQueues
            seft.callbackQueues.push({
                onResolved(value){
                   handle(onResolved)
                },
                onRejected(reason) {
                    handle(onRejected)
                }
             })
         }else if(seft.status===FULFILLED){
            setTimeout(()=>{
                handle(onResolved)
            })
         }else {
            setTimeout(()=>{
                handle(onRejected)
            })
         }
    })

 }
 /**
  * 传入失败回调
  * 返回一个新的myPromise
  */
 myPromise.prototype.catch=function(OnRejected){
    return this.then(undefined,OnRejected)
 }
 /**
  * myPromise函数对象的resove方法
  * 返回一个指定结果成功的myPromise
  */
 myPromise.resolve=function(value){
    return new myPromise((resolve,reject)=>{
        if(value instanceof myPromise){
            value.then(resolve,reject)
        }else {
            resolve(value)
        }
     })
 }
 /**
  *  myPromise函数对象的reject方法
  * 返回一个指定reason失败的myPromise
  */
 myPromise.reject=function(reason){
     return new myPromise((resove,reject)=>{
        reject(reason)
     })
}
/**
 * 所有成功才成功，有一个失败就失败
 * 返回一个的myPromise，这个myPromise的结果由传过来的数组决定，一个失败就是失败
 */
myPromise.all=function(myPromises){
return new myPromise((resolve,reject)=>{
    let values=[]
    myPromises.map(item=>{
        if(item instanceof myPromise) {
            item.then(
                (res)=>{
                    values.push(res) 
                }
                ,reject)
        }else {
           setTimeout(()=>{
            values.push(item)
           })
        }
    })
    setTimeout(() => {
        if(values.length===myPromises.length){
            resolve(values)
        }   
    });
})
     
}
/**
 * 第一个成功就成功，如果不成功就失败(就是最先拿到谁的值，就成功)
 * 返回一个Promsie
 */
myPromise.race=function(myPromises){
    return new myPromise((resolve,reject)=>{
        myPromises.map(item=>{
            if(item instanceof myPromise) {
                item.then(
                    resolve
                    ,reject)
            }else {
                resolve(item)
            }
        })
    })  
}
window.myPromise=myPromise
})(window)


