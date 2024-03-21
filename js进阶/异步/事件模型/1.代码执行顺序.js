console.log('1'); 
setTimeout(function () {
    console.log('2');  
    process.nextTick(function () { 
        console.log('3'); 
    })
    new Promise(function (resolve) {
        console.log('4');  
        resolve();
    }).then(function () {
        console.log('5')  
    })
})
process.nextTick(function () {  
    console.log('6');   
})
new Promise(function (resolve) {
    console.log('7');  
    resolve();
}).then(function () {
    console.log('8')  
})

setTimeout(function () { 
    console.log('9');  //宏
    process.nextTick(function () {
        console.log('10');  
    })
    new Promise(function (resolve) {
        console.log('11');   
        resolve();
    }).then(function () { 
        console.log('12')
    })
})

//同步:1 promise(17行)  / promise(7行)
//宏队列 第一个定时器(2行) 第二个定时器(24行)  /
//微队列 nextTick(14行) promise的then(17行)  / next(4行) next(10行)

//输出:1 7 6 8 2 4 3 5 9 11 10 12





setTimeout(()=>{
    console.log(1)
    setTimeout(()=>{
        console.log(2)
    },1000)
},2000)

setTimeout(()=>{
    console.log(5)
})

Promise.resolve('哈哈哈').then(res=>{
    console.log(3)
    setTimeout(()=>{
       console.log(4)
    })
})

//3 5 4 1 2
