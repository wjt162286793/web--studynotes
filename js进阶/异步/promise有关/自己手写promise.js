class PromiseFun {
   constructor(executor){
    //初始化状态pending
        this.status = 'pending'
    //初始化成功的值
        this.value = undefined
    //初始化失败的值
        this.error = undefined
    //resFn数组
        this.resFnList = []
    //errFn数组
        this.errFnList = []

    //resolve成功方法
        const resolve = ((value)=>{
             if(this.status === 'pending'){
                this.status = 'fulfilled'
                queueMicrotask(()=>{
                    // this.resFn(value)
                    this.value = value
                    this.resFnList.forEach(fn=>{
                        fn(this.value)
                    })
                })
             }
        })
    //reject失败方法
        const reject = ((error)=>{
            if(this.status === 'pending'){
                this.status = 'rejected'
                queueMicrotask(()=>{
                    // this.errFn(error)
                    this.error = error
                    this.errFnList.forEach(fn=>{
                        fn(this.error)
                    })
                })
             }
        })
        executor(resolve,reject)
   }
   //then方法
   then(resFn,errFn){
    console.log(resFn,errFn,'进入then方法')
    // this.resFn = resFn
    // this.errFn = errFn

    if(this.status === 'fulfilled' && resFn){
        resFn(this.value)
    }
    if(this.status === 'rejected' && errFn){
        errFn(this.error)
    }
    if(this.status === 'pending'){
        this.resFnList.push(resFn)
        this.errFnList.push(errFn)
    }

   }
}

