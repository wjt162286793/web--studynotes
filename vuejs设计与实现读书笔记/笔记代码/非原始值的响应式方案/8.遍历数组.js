let arr = reactive([1])
//数组作为对象,也可以使用for...in去遍历
//影响数组for..in循环的,有两种方法
arr[10] = 10
arr.length = 0
//其实这两种方法都是通过修改arr的length属性
//但是之前对普通对象遍历进行拦截的ownKeys方法,是通过ITERATE_KEY修改的,这里我们需要添加上'length'的判断条件

function createReactive(obj,isShallow = false,isReadonly = false){
    return new Proxy(obj,{
    ownKeys(target){
        //如果操作目标target是数组,那么使用length属性作为key并建立响应联系
        track(target,Array.isArray(target)?'length':ITERATE_KEY)
        return Reflect.ownKeys(target)
    }
     })
}