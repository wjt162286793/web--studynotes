//emit用来触发组件的自定义事件

 const MyComponent = {
   name: 'MyComponent',
   setup(props, { emit }) {
     // 发射 change 事件，并传递给事件处理函数两个参数
     emit('change', 1, 2)

     return () => {
       return // ...
     }
   }
 }

//使用该组件时,可以监听由emit函数发射的自定义事件
/**
 *  <MyComponent @change="handler" />
 */

//上面的模板对应的虚拟DOM为

//  const CompVNode = {
//    type: MyComponent,
//    props: {
//       onChange: handler
//    }
//  }

//自定义事件change被编译名字为onChange的属性,并且存储在props数据对象中。这实际上是一种约定。
//在具体的实现上,触发自定义事件的本质就是根据事件名称去props数据对象中寻找对应的事件处理函数并执行,如下

 function mountComponent(vnode, container, anchor) {
   // 省略部分代码

   //组件信息状态集合
   const instance = {
     state,
     props: shallowReactive(props),
     isMounted: false,
     subTree: null
   }

   // 定义 emit 函数，它接收两个参数
   // event: 事件名称
   // payload: 传递给事件处理函数的参数
   function emit(event, ...payload) {
     // 根据约定对事件名称进行处理，例如 change --> onChange
     const eventName = `on${event[0].toUpperCase() + event.slice(1)}`
     // 根据处理后的事件名称去 props 中寻找对应的事件处理函数
     const handler = instance.props[eventName]
     if (handler) {
       // 调用事件处理函数并传递参数
       handler(...payload)
     } else {
       console.error('事件不存在')
     }
   }

   // 将 emit 函数添加到 setupContext 中，用户可以通过 setupContext 取得 emit 函数
   const setupContext = { attrs, emit }

   // 省略部分代码
 }

 //实现一个emit函数,并且将其添加到setupContext对象中,这样用户就可以通过setupContext取得emit函数了。会根据预订对事件名称进行转换,以便能够在props数据对象中找到对应的事件处理函数。
 //最后,调用事件处理函数并透传参数即可。
 //另外需要注意的是,没有任何显示的声明为props的属性都会存储到attrs中,换句话说,任何事件类型的props,即onXXX属性,都不会出现在props中。这导致我们无法根据事件名称在instance.props中找到对应的事件处理函数。
 //为了解决这个问题,需要在解析props数据的时候对事件类型的props做特殊处理,如下

 function resolveProps(options, propsData) {
   const props = {}
   const attrs = {}
   for (const key in propsData) {
     // 以字符串 on 开头的 props，无论是否显式地声明，都将其添加到 props 数据中，而不是添加到 attrs 中
     if (key in options || key.startsWith('on')) {
       props[key] = propsData[key]
     } else {
       attrs[key] = propsData[key]
     }
   }

   return [ props, attrs ]
 }