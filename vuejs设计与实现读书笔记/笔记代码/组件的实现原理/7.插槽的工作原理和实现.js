//模板中使用插槽

//MyComponent组件
/*
  <template>
   <header><slot name="header" /></header>
   <div>
     <slot name="body" />
   </div>
   <footer><slot name="footer" /></footer>
 </template>
 */

 //父组件使用MyComponent组件

 /**
   <MyComponent>
   <template #header>
     <h1>我是标题</h1>
   </template>
   <template #body>
     <section>我是内容</section>
   </template>
   <template #footer>
     <p>我是注脚</p>
   </template>
 </MyComponent>
  */

 //父组件的模板会被编译成如下的渲染函数

 // 父组件的渲染函数
 function render() {
   return {
     type: MyComponent,
     // 组件的 children 会被编译成一个对象
     children: {
       header() {
         return { type: 'h1', children: '我是标题' }
       },
       body() {
         return { type: 'section', children: '我是内容' }
       },
       footer() {
         return { type: 'p', children: '我是注脚' }
       }
     }
   }
 }

 //组件模板中的插槽内容会被编译成为插槽函数,而插槽函数的返回值就是具体的插槽内容,组件MyComponent的模板会被编译成如下渲染函数

 // MyComponent 组件模板的编译结果
 function render() {
   return [
     {
       type: 'header',
       children: [this.$slots.header()]
     },
     {
       type: 'body',
       children: [this.$slots.body()]
     },
     {
       type: 'footer',
       children: [this.$slots.footer()]
     }
   ]
 }

 //渲染插槽内容的过程,就是调用插槽函数并渲染由其返回的内容的过程
 //在运行时的实现上,插槽则依赖于setupContext中的slots对象

 function mountComponent(vnode, container, anchor) {
  // 省略部分代码

  // 直接使用编译好的 vnode.children 对象作为 slots 对象即可
  const slots = vnode.children || {}
  // 将 slots 对象添加到 setupContext 中
  const setupContext = { attrs, emit, slots }

 }

 //最基本的slots的实现非常简单。只需要将vnode.children作为slots对象,然后将slots对象添加到setupContext对象中。为了在render函数内和生命周期钩子函数内能够通过this.$slots来访问插槽内容,还需要在renderContext中特殊对待slots属性

 function mountComponent(vnode, container, anchor) {
   // 省略部分代码

   const slots = vnode.children || {}

   const instance = {
     state,
     props: shallowReactive(props),
     isMounted: false,
     subTree: null,
     // 将插槽添加到组件实例上
     slots
   }

   // 省略部分代码

   //渲染上下文
   const renderContext = new Proxy(instance, {
     get(target, key, result) {
       const { state, props, slots } = target
       // 当 key 的值为 $slots 时，直接返回组件实例上的 slots
       if (key === '$slots') return slots

       // 省略部分代码
     },
     set (target, key, value, result) {
       // 省略部分代码
     }
   })

   // 省略部分代码
 }

 //对渲染上下文renderContext代理对象的get拦截函数做了特殊处理,当读取的键是$slots时,直接返回组件实例上的slots对象,这样就可以通过this.$slots来访问插槽内容了
