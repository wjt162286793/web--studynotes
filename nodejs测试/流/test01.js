let fs = require('fs')
let data = ''

let readerStream = fs.createReadStream('wenjian.txt')

readerStream.setEncoding('utf-8')
// console.log(readerStream,'组织')

//传输中
readerStream.on('data',(chunk)=>{
    data += chunk
    console.log(chunk)
})

//传输结束
readerStream.on('end',()=>{
    // console.log(data,'数据')
})

//传输错误
readerStream.on('error',(err)=>{
    console.log(err,'错误')
})

console.log('程序执行完毕')