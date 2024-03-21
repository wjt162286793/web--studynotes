const child_process = require('child_process')
//                       命令      参数  options配置
const {stdout} = child_process.spawn('netstat',['-an'],{})

//返回的数据用data事件接受
stdout.on('data',(steram)=>{
    console.log(steram.toString())
})
