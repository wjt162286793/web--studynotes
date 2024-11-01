const bucket = new Set()   //一个用于存放副作用函数的桶

let data = {text:'我是王惊涛'}
const data_Proxy = new Proxy(data,{
    get(target,key){   //拦截get方法,只要有人访问data_Proxy中的属性,就会触发这个函数,target代表对象整体,key代表被访问的属性名
        console.log('触发了读取操作')
        bucket.add(fun_rely)  //这里就是解决之前提到的问题,谁用到这个变量了,就会将这个函数保存到存放桶里,修改的时候可以调用这个函数
        return target[key]  //返回该对象的被访问属性值
    },
    set(target,key,newVal){  //拦截set方法,只要有人修改data_Proxy中的属性,就会触发这个函数,newVal代表新的赋值
        console.log('触发了set操作')
        target[key] = newVal  //赋值
        bucket.forEach(fn=>fn())  //调用所有因为修改这个值而被影响的函数
        return true  //代表修改成功,得写
    }
})
let fun_rely = ()=>{  //访问函数
    console.log(data_Proxy.text,'fun_rely函数被调用')
}


fun_rely()  //读
data_Proxy.text = '我还是王惊涛'  //写
