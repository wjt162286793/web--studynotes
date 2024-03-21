for (var i = 0;i<10;i++){
    setTimeout(()=>{
        console.log(i,'var定义')
    })
}

for (let i = 0;i<10;i++){
    setTimeout(()=>{
        console.log(i,'let定义')
    })
}

//var的修改全局都会被修改,在全局作用域中都可以被访问
//而let是具有函数作用域,不会被全局所污染