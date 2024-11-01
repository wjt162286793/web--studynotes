//创建buffer
let arr1 = [1,2,3]
let buffer1 = Buffer.from(arr1)
console.log(buffer1,'buffer1的值')

let arr2 = [100,101,102]
let buffer2 = Buffer.from(arr2)
console.log(buffer2,'buffer2的值')

let arr3 = ['哈哈','嘿嘿','呵呵']
let buffer3 = Buffer.from('王惊涛',[1])
console.log(buffer3,'buffer3的值')

//读写
console.log(buffer3[0],'0索引')
console.log(buffer3[1],'1索引')
console.log(buffer3.length,'buffer的长度')
console.log(buffer3.toString(),'转化为字符串')

//转换数据
console.log(buffer3.toJSON(),'转化为json对象') 
console.log(buffer3.slice(0,1),'新的buffer')

//检查
console.log(Buffer.isBuffer(buffer1),'判断1')
console.log(Buffer.isBuffer(buffer2),'判断2')
console.log(Buffer.isBuffer({}),'判断3')
console.log(Buffer.concat([buffer1,buffer2]),'新的buffer')