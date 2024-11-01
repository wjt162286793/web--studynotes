while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 省略部分代码

    if(!oldStartVnode){
      //省略
    }
    /** 各种else if */
    else{
        const idxInOld = oldChildren.findIndex(
            node => node.key === newStartVNode.key
        )
        //大于0,说明找到了可复用节点
        if (idxInOld > 0) {
            const vnodeToMove = oldChildren[idxInOld]
            patch(vnodeToMove, newStartVNode, container)
            insert(vnodeToMove.el, container, oldStartVnode.el)
            oldChildren[idxInOld] = undefined
            newStartVNode = newChildren[++newStartIdx]
        } else {
            //没有可复用的节点,将newStartVNode作为新节点挂载到头部,使用当前头部节点oldStartVNode.el作为锚点
            patch(null, newStartVNode, container, oldStartVnode.el)
        }
        newStartVNode = newChildren[++newStartIdx]
    }

}

// 循环结束后检查索引值的情况,
if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
    // 如果满足条件，则说明有新的节点遗留，需要挂载它们
    for (let i = newStartIdx; i <= newEndIdx; i++) {
        patch(null, newChildren[i], container, oldStartVNode.el)
    }
}
