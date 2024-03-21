setTimeout(()=>{
    console.log('执行1')
    process.exit()
    // process.on('exit',()=>{
    //     console.log('进程被退出')
    // })
},1000)

setTimeout(()=>{
    console.log('执行2')
},4000)