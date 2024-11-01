//副作用函数互相影响
const arr = reactive([])
effect(()=>{
    arr.push(1)
})
effect(()=>{
    arr.push(2)
})
//上面代码会导致栈溢出的错误(Maximum call stack size exceeded)
//执行过程如下:
//1.第一个副作用函数执行。在该函数内,调用arr.push方法向数组添加了一个元素。调用数组的push方法会间接读取数组的length属性。所以,当第一个副作用函数执行完后,会与length属性建立响应联系。
//2.接着,第二个副作用函数执行。同样,也会和length属性建立响应联系。但是,这个方法不仅会间接读取length属性,还会间接设置length属性的值。
//3.第二个函数内arr.push方法的调用设置了数组的length属性值。于是,响应系统尝试把length属性相关联的副作用函数全部取出执行,其中就包括第一个副作用函数。问题出在这里,第二个副作用函数还没有执行,就要再次执行第一个副作用函数。
//4.第一个副作用函数再次执行。同样,这会间接设置数组的length属性。于是,响应系统又要尝试把所有与length属性相关联的副作用函数取出并执行,其中就会包括第二个副作用函数。
//5.如此反复循环往复,最终导致调用栈溢出。

//重写的数组对象
const arrayInstrumentations = {}
//一个标记变量,代表是否进行追踪。默认值为true,即允许追踪
let shouldTrack = true
['push','pop','shift','unshift','splice'].forEach(method=>{
    //取得原始的操作方法
    const originMethod = Array.prototype[method]
    //重写方法
    arrayInstrumentations[method] = function(...args){
        //在调用原始方法之前,禁止追踪
       shouldTrack = false
       let res = originMethod.apply(this,args)
       //在调用原始方法之后,恢复原来的行为,即允许追踪
       shouldTrack = true
       return res
    }
})

//track方法中需要对shouldTrack进行判断
//当变量标记为false时,即停止追踪状态,track函数会直接返回。这样,当push方法间接读取length属性值时,由于此时是禁止追踪的状态,所以length属性与副作用函数之间不会建立响应联系。
function track(target,key){
    //当禁止追踪时,直接返回
    if(!activeEffect || !shouldTrack) return
    /** */
}