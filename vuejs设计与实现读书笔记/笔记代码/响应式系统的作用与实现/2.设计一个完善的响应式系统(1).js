/*桶的结构
  /.../ 表示数据的类型

  bucket/weakMap结构/ :{
  0:{
       key/object结构/:{text:'我是王惊涛'} 
       value/Map结构/: {
                         key/属性名,字符串结构/:'text',
                         value/函数,副作用函数/:  ()=>{console.log('副作用函数执行') return data.text}
                       }
    }
  }

这就是桶的结构,方便大家去看下面的代码

*/

const data = {text:'我是王惊涛'}


//完善响应式的代码(模拟源码)

let activeEffect = undefined    //用一个全局变量存储副作用函数
const bucket = new WeakMap()    //用来收集依赖的容器
function effect(fn){   //注册副作用函数
    activeEffect = fn  
    fn()   //假定这里的fn就是用户fun函数,通过调用想获取data.text,从而触发了getter操作,进行收集依赖
}


const data_Proxy = new Proxy(data,{
    //读取
    get(target,key){
      if(!activeEffect) {
        //副作用函数没有注册,如果注释掉上面的effect(fun),这里就会是一个普通的对象属性查询,只会return对应的值,然后结束函数的执行
        return target[key]
      }
      //定义一个变量,从桶中获取当前访问对象所对应的值
      let depsMap = bucket.get(target)  
      if(!depsMap){
        //depsMap有效时,在桶中插入值,key为target对象,value是一个map容器
        bucket.set(target,(depsMap = new Map()))  
      }
      //定义deps,map结构中对应属性名称值
      let deps = depsMap.get(key)  
      if(!deps){
        //deps无效时,map容器插入值,key为键,值是一个Set,可用来存放多个副作用函数
        depsMap.set(key,(deps = new Set()))  
      }
      //将副作用函数插入set列表中,从而形成与target[key]的依赖
      deps.add(activeEffect)  
      return target[key]
      /*
      名称             数据类型            具体含义
      target          对象                data
      key             属性名              text
      bucket          weakMap            最外层容器,key为target,value为depsMap
      depsMap         Map                第二层容器,key为key(属性值),value为deps
      deps            Set                最后一层容器,每个元素都是一个副作用函数
      */

    },
    //写入
    set(target,key,newVal){
      //赋上最新的值
      target[key] = newVal
      //根据对象,去查该对象在桶中所对应的值
      const depsMap = bucket.get(target)
      if(!depsMap){
        //没有查找到,说明并没有进行响应式的注册
        return
      }
      //查询key所对应的Set
      const effects = depsMap.get(key)
      //执行和该key有关的所有依赖函数,触发完成所有位置的更新
      effects && effects.forEach(fn => fn())
    }
})


//测试代码
const fun1 = ()=>{
    console.log('副作用函数1执行')
   return data_Proxy.text
}
const fun2 = ()=>{
   console.log('副作用函数2执行')
   return data_Proxy.text + ',哈哈哈'
}
effect(fun1)  //注册fun1
effect(fun2)  //注册fun2
console.log(data_Proxy.text,'读')
data_Proxy.text = '我还是王惊涛'
console.log(data_Proxy.text,'读')
console.log(bucket,'桶结构')



