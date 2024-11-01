 const { effect, ref } = VueReactivity

 const bol = ref(false)

 effect(() => {
   // 创建 vnode
   const vnode = {
     type: 'div',
     props: bol.value ? {
       onClick: () => {
         alert('父元素 clicked')
       }
     } : {},
     children: [
       {
         type: 'p',
         props: {
           onClick: () => {
             bol.value = true
           }
         },
         children: 'text'
       }
     ]
   }
   // 渲染 vnode
   renderer.render(vnode, document.querySelector('#app'))
 })

 //结果:点击p元素时,bol因为是响应式数据的缘故,重新触发了页面的渲染,让新渲染的DOM中,div的onClick事件完成了绑定,alert进行了弹框。
 //p标签是div的子标签,按道理来说,点击了p标签,紧接着div标签也会因为事件冒泡去执行click事件,但是这一过程触发了响应式的数据更改,导致了重新渲染页面。事件冒泡传递到div的时候,div已经是渲染完成后绑定好事件的状态了
 //也就说:为div元素绑定事件处理函数发生在事件冒泡之前

 //这里需要解决的问题就是:让事件绑定晚于事件冒泡

  patchProps = (el, key, prevValue, nextValue)=> {
   if (/^on/.test(key)) {
     const invokers = el._vei || (el._vei = {})
     let invoker = invokers[key]
     const name = key.slice(2).toLowerCase()
     if (nextValue) {
       if (!invoker) {
         invoker = el._vei[key] = (e) => {
           // e.timeStamp 是事件发生的时间
           // 如果事件发生的时间早于事件处理函数绑定的时间，则不执行事件处理函数
           if (e.timeStamp < invoker.attached) return
           if (Array.isArray(invoker.value)) {
             invoker.value.forEach(fn => fn(e))
           } else {
             invoker.value(e)
           }
         }
         invoker.value = nextValue
         // 添加 invoker.attached 属性，存储事件处理函数被绑定的时间
         invoker.attached = performance.now()
         el.addEventListener(name, invoker)
       } else {
         invoker.value = nextValue
       }
     } else if (invoker) {
       el.removeEventListener(name, invoker)
     }
   } else if (key === 'class') {
     // 省略部分代码
   } else if (shouldSetAsProps(el, key, nextValue)) {
     // 省略部分代码
   } else {
     // 省略部分代码
   }
 }


 /*
 performance.now是高精度时间
 */