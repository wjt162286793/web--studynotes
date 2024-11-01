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


//针对各种情况,对patchElement的实现

/**
 * 更新节点函数
 * @param {*} n1 旧节点
 * @param {*} n2 新节点
 */
function patchElement(n1,n2){
    const el = n2.el =n1.el
    const oldProps = n1.props
    const newProps = n2.props

    //第一步:更新props
    //遍历新节点的props
    for(const key in newProps){
        //如果新节点的props中某个属性和原节点props中的某个属性不同
        if(newProps[key] !== oldProps[key]){
            //替换操作
            patchProps(el,key,oldProps[key],newProps[key])
        }
    }
    //遍历旧节点
    for(const key in oldProps){
        //如果旧节点中一些属性,新节点中不存在
        if(!(key in newProps)){
            //移除操作
            patchProps(el,key,oldProps[key],null)
        }
    }

    //更新children
    patchChildren(n1,n2,el)
}

function patchChildren(n1,n2,container){
    //判断新子节点的类型是否是文本节点
    if(typeof n2.children === 'string'){
        //如果原来的旧节点是数组
        if(Array.isArray(n1.children)){
            //先将每一个节点卸载
            n1.children.forEach(c=>unmount(c))
        }
        //给节点设置新的值
        setElementText(container,n2.children)
    }
    //新的子节点是数组类型
    else if(Array.isArray(n2.children)){
        //旧节点原本也是数组类型
        if(Array.isArray(n1.children)){
            //将旧的一组节点全部卸载
            n1.children.forEach(c=>unmount(c))
            //在将新的一组子节点全部挂载到容器中
            n2.children.forEach(c=>patch(null,c,container))
        }else{
            setElementText(container,'')
            n2.children.forEach(c=>patch(null,c,container))
        }
    }
    //新的子节点压根不存在
    else{
        //旧子节点为数组
      if(Array.isArray(n1.children)){
        n1.children.forEach(c=>unmount(c))
      }else if(typeof n1.children === 'string'){//旧子节点为文本
         setElementText(container,'')
      }
      //如果没有旧子节点,什么都不需要做
    }

}