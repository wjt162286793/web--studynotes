 //生命周期的应用
 import { onMounted } from 'vue'

 const MyComponent = {
   setup() {
     onMounted(() => {
       console.log('mounted 1')
     })
     // 可以注册多个
     onMounted(() => {
       console.log('mounted 2')
     })

     // ...
   }
 }

 //在setup函数中,调用onMounted函数即可注册mounted钩子函数,并且可以多次调用onMounted函数来注册多个钩子函数,这些函数会在组件被挂载之后再执行。
 //问题在于,在A组件的setup函数中调用onMounted函数会将该钩子函数注册到A组件上;在B组件调用就注册到B组件上
 //方法:实现一个变量currentInstance,用来存储当前的组件实例,每次当初始化组件并执行组件的setup函数之前,先将currentInstance设置为当前组件实例,再执行组件的setup函数,这样就可以通过currentInstance来获取当前正在被初始化的组件实例,从而将那些通过onMounted函数注册的钩子函数与组件实例进行关联。

// 全局变量，存储当前正在被初始化的组件实例
 let currentInstance = null
 // 该方法接收组件实例作为参数，并将该实例设置为 currentInstance
 function setCurrentInstance(instance) {
   currentInstance = instance
 }

 //有了变量和修改变量的方法,就可以修改mountComponent函数了

  function mountComponent(vnode, container, anchor) {
   // 省略部分代码

   const instance = {
     state,
     props: shallowReactive(props),
     isMounted: false,
     subTree: null,
     slots,
     // 在组件实例中添加 mounted 数组，用来存储通过 onMounted 函数注册的生命周期钩子函数
     mounted: []
   }

   // 省略部分代码

   // setup
   const setupContext = { attrs, emit, slots }

   // 在调用 setup 函数之前，设置当前组件实例
   setCurrentInstance(instance)
   // 执行 setup 函数
   const setupResult = setup(shallowReadonly(instance.props), setupContext)
   // 在 setup 函数执行完毕之后，重置当前组件实例
   setCurrentInstance(null)

   // 省略部分代码
 }


 //以onMounted为例,为了存储由onMounted函数注册的生命周期钩子,需要在组件实例对象上添加instance.mounted数组,因为可以多次调用onMounted函数用来注册不同的生命周期函数,这些生命周期函数都会存储在instance.mounted数组中

 //实现onMounted函数
 function onMounted(fn) {
   if (currentInstance) {
     // 将生命周期函数添加到 instance.mounted 数组中
     currentInstance.mounted.push(fn)
   } else {
     console.error('onMounted 函数只能在 setup 中调用')
   }
 }
 
 //通过currentInstance获取当前组件实例,并将生命周期钩子函数添加到当前实例对象的instance.mounted数组中即可。如果当前实例不存在,提示报错。

 //最后,在合适的时机调用这些注册到instance.mounted数组中的生命周期钩子函数

  function mountComponent(vnode, container, anchor) {
     // 省略部分代码

     effect(() => {
       const subTree = render.call(renderContext, renderContext)
       if (!instance.isMounted) {
         // 省略部分代码

         // 遍历 instance.mounted 数组并逐个执行即可
         instance.mounted && instance.mounted.forEach(hook => hook.call(renderContext))
       } else {
         // 省略部分代码
       }
       instance.subTree = subTree
     }, {
       scheduler: queueJob
     })
   }

   //其余生命周期函数如onUpdate等同理