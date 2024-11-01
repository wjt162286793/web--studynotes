//模拟组件
const myComponent = {
    name:'myComponent',
    data(){
        return{
            foo:'hello world'
        }
    },
    render(){
        return{
            type:'div',
            children:`foo的值是${this.foo}`
        }
    }
}


//挂载组件函数
/**
 * 
function mountComponent(vnode,container,anchor){
  const componentOptions = vnode.type
  const {render,data} = componentOptions

  //调用data函数得到原始数据,调用reactive函数将其包装为响应式数据
  const state = reactive(data())
  //调用render函数时,将this设置为state,所以render函数内部可以通过this访问组件自身状态数据
  const subTree = render.call(state,state)
  patch(null,subTree,container,anchor)
}
 */


//1.执行data函数,对执行结果使用reactive函数进行包装,将组件的data数据变成响应式数据state
//2.调用render函数时,将this指向state


//当组件自身状态发生变化时,需要去触发组件的更新,所以需要调用effect函数
function mountComponent(vnode,container,anchor){
    const componentOptions = vnode.type
    const {render,data} = componentOptions
  
    const state = reactive(data())
    
    //调用effect函数,将函数注册响应式
    effect(()=>{
        const subTree = render.call(state,state)
        patch(null,subTree,container,anchor)
    })

  }

  //一旦自身的响应式数据发生变化,组件就会自动执行渲染函数,从而完成更新。但是,由于effect的执行是同步的,因此当响应式数据发生变化时,与之关联的副作用函数会同步执行。
  //如果多次修改响应式数据的值,将会导致渲染函数多次执行,这是影响性能的。所以需要一个机制,以使得无论对响应式数据进行多少次修改,副作用函数都只会执行一次。
  //实现一个调度器,当副作用函数重新执行时,不会立即执行,而是缓冲到一个微任务队列中,等到执行栈清空后,再将它从微任务队列中取出并执行。有了缓存机制,就可以对任务进行去重,从而避免了多次执行。

  //任务缓存队列,用一个Set数据结构来表示,这样就可以对任务进行去重
  const queue = new Set()
  //一个标志,代表是否正在刷新任务队列
  let isFlushing = false
  //创建一个立即resolve的Promise实例
  const p = Promise.resolve()

  //调度器的主要函数,用来将一个任务添加到缓冲队列中,并开始刷新队列
  function queueJob(job){
   //将job添加到任务队列queue中
   queue.add(obj)
   //如果还没有开始刷新队列,则刷新之
   if(!isFlushing){
    //将该标志设置为true以避免重复刷新
    isFlushing = true
    //在微任务中刷新缓冲队列
    p.then(()=>{
        try{
            //执行队列中的任务
            queue.forEach(job=>job())
        } finally{
            //重置状态
            isFlushing = false
            queue.clear = 0
        }
    })
   }
  }

  //调度器本质上是利用了微任务的异步执行机制,实现了对副作用函数的缓冲。

  //当响应式数据发生变化,副作用函数不会立即同步执行,而是会被queueJob函数调度,最后在一个微任务中执行。
  function mountComponent(vnode,container,anchor){
      const componentOptions = vnode.type
      const {render,data} = componentOptions

      const state = reactive(data())
      effect(()=>{
        const subTree = render.call(state,state)
        patch(null,subTree,container,anchor)
      },{
        //指定该副作用函数的调度器为queueJob即可
        scheduler:queueJob
      })
  }

    //不过上面diamante也有缺陷:在effect函数内调用patch函数完成渲染时,第一个参数总是null。这意味着,每次更新都会进行全新的挂载,而不会打补丁,这是不正确的。正确的做法是:每次更新时,都拿subTree与上一次组件所渲染的subTree进行打补丁。所有需要实现组件实例,用来维护整个组件的生命周期状态,这样渲染器才能在正确的实际执行合适的操作。