

//初次挂载
renderer.render(vnode, document.querySelector('#app'))
//更新
renderer.render(newVnode, document.querySelector('#app'))
//卸载
renderer.render(null, document.querySelector('#app'))

//在之前的代码中,卸载清空容器直接为 
container.innerHTML = ''
//这样并不严谨,原因有三点:

//1.容器的内容可能是由某个或多个组件渲染的，当卸载操作发生时，应该正确地调用这些组件的beforeUnmount、unmounted 等生命周期函数。
//2.即使内容不是由组件渲染的，有的元素存在自定义指令，我们应该在卸载操作发生时正确执行对应的指令钩子函数。
//3.使用 innerHTML 清空容器元素内容的另一个缺陷是，它不会移除绑定在 DOM 元素上的事件处理函数。

//所以,不能通过简单的innerHTML完成卸载操作。正确的卸载方式是,根据vnode对象获取与其关联的真实DOM元素,然后使用原生DOM操作方法将该DOM元素移除。为此,需要在vnode和真实DOM元素之间建立联系,修改mountElement函数


const mountElement = (vnode, container) => {
    //让vnode.el引用真实的DOM元素
    const el = vnode.el = createElement(vnode.type)
    if (typeof vnode.children === 'string') {  //文本类型节点
        setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
        vnode.children.forEach(child => {  //遍历子节点,渲染子节点
            patch(null, child, el)
        })
    }

    if (vnode.props) {  //给属性赋值
        for (const key in vnode.props) {
            patchProps(el, key, null, vnode.props[key])
        }
    }
    insert(el, container)

}

//调用createElement函数创建真实的DOM元素时,会把真实的DOM元素赋值给vnode.el属性。这样vnode与真实的DOM元素之间就建立了联系,可以通过vnode.el来获取该虚拟节点对应的真实DOM元素。当卸载操作发生时,只需要根据虚拟节点对象vnode.el取得真实的DOM元素,将其从父元素中移除。

/**
 * 
 * @param {vnode} 新节点
 * @param {container} 旧节点 
 */

const render = (vnode,container)=>{  
     if(vnode){
        patch(container._vnode,vnode,container)  //如果有新节点,进行替换操作
     }else{
        if(container._vnode){  //如果没有新节点,但是具有旧节点,意味着移除节点操作
            const el = container._vnode.el  //获取旧节点中指向的旧vnode
            const parent = el.parentNode  //获取旧vnode的引用父节点
            if(parent){  //有父节点引用这个子节点
                parent.removeChild(el)   //父父节点移除子父节点
            }
        }
     }
     container._vnode = vnode  //给节点设置_vnode属性,方便辨识和查找
}

//可以将卸载操作封装成一个函数,后续其他地方也可以用到

//卸载功能函数
const unmount = ()=>{
    const parent = vnode.el.parentNode
    if(parent){
        parent.removeChild(vnode.el)
    }
}

 function render(vnode, container) {
   if (vnode) {
     patch(container._vnode, vnode, container)
   } else {
     if (container._vnode) {
       // 调用 unmount 函数卸载 vnode
       unmount(container._vnode)
     }
   }
   container._vnode = vnode
 }