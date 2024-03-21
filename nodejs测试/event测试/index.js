const EventEmitter = require('events')
const event = new EventEmitter()
event.setMaxListeners(20) //设置最大派发次数

event.on('event_test1',(data)=>{
    console.log(data,'事件1被触发')
})
event.on('event_test2',(data)=>{
    console.log(data,'事件2被触发')
})
event.once('event_test3',(data)=>{   //只能触发一次
    console.log(data,'事件3被触发,但只能触发一次')
})

event.emit('event_test1','哈哈哈')
setTimeout(()=>{
    event.emit('event_test2','呵呵呵')
},3000)
event.emit('event_test3','仅此一次的触发')
event.off('event_test1',()=>{
    console.log('关闭事件1')
})
event.emit('event_test1','看不到了')