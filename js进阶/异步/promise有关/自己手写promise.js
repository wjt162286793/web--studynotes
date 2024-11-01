class myPromise{
    //new myPromise((res,rej)=>{res('成功')})
    //new myPromise((res,rej)=>{rej('失败')})
    constructor(proFun){  
    //这里的proFun就是:(res,rej)=>{res('成功')
    try{
        proFun(this.resolveFun,this.rejectFun)    
    }catch(err){
        this.rejectFun(err)
    }  
    }
    status = 'pengding' //状态
    resolveValue = null  //成功的值
    rejectReason = null  //失败的值
    successCallBackList = []  //成功回调集合
    failCallBackList = []   //失败回调集合
     
     //resolve处理函数
     resolveFun = (value) => {
        if (this.status !== 'pengding') return
        this.status = 'fulfilled'  //改变状态为成功
        this.resolveValue = value  //赋值成功值
        //处理数组为空时报错
        if(this.successCallBackList.length>0){
            this.successCallBackList.shift()(this.resolveValue)
        }
        
    }

    //reject处理函数
    rejectFun = (reason) => {
        if (this.status !== 'pengding') return
        this.status = 'rejected'  //改变状态为成功
        this.rejectReason = reason  //赋值成功值
        //处理数组为空时报错
        if(this.failCallBackList.length>0){
            this.failCallBackList.shift()(this.rejectReason)
        }
        
    }

    //then实例方法
    thenFun = (resolveCallBack, rejectCallBack) => {
        //一般情况下,这里的两个参数都是res和rej的回调函数
        //如then(res=>{console.log(res,'成功值')},rej=>{console.log(rej,'失败值')})
        //如果这里我们没有定义res或者rej,这里就需要默认赋值一个函数,参数一成功回调,参数二失败回调抛出错误
        resolveCallBack = resolveCallBack || (value => this.resolveValue)
        rejectCallBack = rejectCallBack || (reason => {throw this.rejectReason})

        //then方法是需要判断你获取的值究竟是值还是一个新的promise,这里我们用myPromise包装一下
        let newPromise = new myPromise((res,rej)=>{
           //这里就需要判断promise的状态了
           switch(this.status){
            //状态未定
            case 'pengding':
                //当你使用thenFun方法了,并且状态为pengding时,就需要向回调列表中添加任务
                this.successCallBackList.push(()=>{
                    try{
                       this.globalFun(newPromise,resolveCallBack,this.resolveValue,res,rej)
                    }catch(err){
                       rej(err)
                    }
                })
                this.failCallBackList.push(()=>{
                    try{
                        this.globalFun(newPromise,rejectCallBack,this.rejectReason,res,rej)
                    }catch(err){
                       rej(err)
                    }
                })
            break
            //成功
            case 'fulfilled':
             setTimeout(()=>{
                try{
                    this.globalFun(newPromise,resolveCallBack,this.resolveValue,res,rej)
                 }catch(err){
                    rej(err)
                 }
             })
            break
            //失败
            case 'rejected':
                setTimeout(()=>{
                    try{
                        this.globalFun(newPromise,rejectCallBack,this.rejectReason,res,rej)
                    }catch(err){
                       rej(err)
                    }
                 })
            break
           }
        })
        return newPromise
    }

    //公共方法,这里是用来进行逻辑判断的,then方法遇到各种情况,都需要在这个公共方法里处理一下,然后再去执行自己应该做的事情
    /**
     * 
     * @param {*} newPromise new的一个promise,作为thenFun的返回值
     * @param {*} callBack 来自thenFun的定义,或者是resolve函数,或者是reject函数,总之这个参数就是根据状态调用的
     * @param {*} value resolveValue || rejectReason
     * @param {*} resCallBack new promise的成功回调
     * @param {*} rejCallBack new promise的失败回调
     * @returns 
     */
    globalFun(newPromise,callBack,value,resCallBack,rejCallBack){
        //如果callBackValue是一个promise对象,比如如下情况
        //pro.then(res=>{
        //  return new myPromise(resolve=>{
        //     resolve('成功')
        //  })
        //})

        //如果value的值是一个myPromise对象,就必须把它拆开来处理,利用递归在传递给globalFun,让globalFun里面的value是一个常规值
        if(value instanceof myPromise){
            //成功状态
        if(value.status === 'fulfilled'){
        this.globalFun(newPromise,callBack,value.resolveValue,resCallBack,rejCallBack)
        }else if(value.status === 'rejected'){
            //失败状态
        this.globalFun(newPromise,callBack,value.resolveValue,resCallBack,rejCallBack)
        }
        }else{
            //其实获取了具体的异步值,下面这行代码就是将异步值给返回出去了
            let callBackValue = callBack(value)
            //如果已经有值有状态了,就不需要再往下走了
            //这里的场景就是你异步操作又返回了一个promise的值
            if(callBackValue instanceof myPromise){
                //异步值还是promise对象,再返回去拿值去吧
                callBackValue.thenFun(resCallBack,rejCallBack)
             }else{  
                //如果不是promise对象,就使用成功回调
                if(this.resolveValue instanceof myPromise){
                    this.resolveValue.thenFun(res=>{
                        this.resolveValue = res
                        resCallBack(res)
                    },rej=>{
                        rejCallBack(rej)
                    })
                }else{
                    resCallBack(callBackValue)
                }
    
             }
        }

    }
    //catch实例方法
    catchFun = (reason)=>{
        //拿到失败值直接给thenFun就可以了
       return this.thenFun(null,reason)
    }
    
    //promise直接调用resolve方法:myPromise.resolve('成功').thenFun(...)
    static resolve = (value)=>{ 
    //完了需要调用thenFun方法,所以必然是返回一个promise对象,所以需要new myPromise
    if(value instanceof myPromise){
        return value
    }else{
        return new myPromise(resolve=>resolve(value))  
    }
    }
    //promise直接调用reject方法:myPromise.reject('失败').catchFun(...)
    static reject = (reason)=>{
    //和resolve思路一致
        if(reason instanceof myPromise){
            return reason
        }else{
            return new myPromise(reject=>reject(reason))
        }
    }
    //promise直接调用all方法:myPromise.all[pro1,pro2]
    static all = (proList)=>{
        console.log(proList,'liebiao')
       let resultList = []
       let num = 0
       return new myPromise((resolve,reject)=>{
         let pushResult = (key,value)=>{
            resultList[key] = value
            num++
            if(num === proList.length){
                resolve(resultList)
            }
         }
         proList.forEach((item,index)=>{
            if(item instanceof myPromise){
                console.log('是myPromise类型')
                item.thenFun(res =>{
                    console.log(res,'每次执行结果')
                  pushResult(index,res)
                },rej=>{
                    reject(rej)
                })
            }else{
                pushResult(index,item)
            }
         })
       })
    }
}

//测试
let p1 = new myPromise((resolve,reject)=>{
    setTimeout(()=>{
        reject('失败值')
    })
})
p1.thenFun(res=>{
    console.log(res,'走上')
},rej=>{
    console.log(rej,'走下')
})
