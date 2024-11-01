//引入模块
const WebScoket = require('ws')
 
//创建服务
const wss = new WebScoket.Server({port:8081})
 
//connection为一个函数
wss.on('connection',connection)
 
function connection(ws){
    console.log('连接成功')
 
    //接受消息
    ws.on('message',function incoming(message){
        console.log('监听到了消息',message)
        // console.log(message.toString(),'具体的消息')
        //message会被转化为Buffer,需要用toString转化一下
        // if(message.toString() ==='你好啊,我是王惊涛'){
        //     ws.send('王惊涛你好,我是服务端,收到了你的消息')
        // }else if(message.toString() ==='看到了,看来我们连接成功了'){
        //     ws.send('完成通信,完美的很')
        // }
    })
 
    //关闭监听
    ws.on('close',function(){
        console.log('关闭监听')
    })
    
}
 