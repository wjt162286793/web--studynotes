//新增逻辑判断,在旧节点组中,找到和新节点组中头部节点key值相同的节点:idxInOld
function patchKeyedChildren(n1, n2, container) {
    const oldChildren = n1.children
    const newChildren = n2.children

    //四个索引值
    let oldStartIdx = 0
    let oldEndIdx = oldChildren.length - 1
    let newStartIdx = 0
    let newEndIdx = newChildren.length - 1

    //四个索引指向的vnode节点
    let oldStartVnode = oldChildren[oldStartIdx]
    let oldEndVnode = oldChildren[oldEndIdx]
    let newStartVnode = newChildren[newStartIdx]
    let newEndVnode = newChildren[newEndIdx]


    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!oldStartVnode) {
           //旧头遇到undefined
            oldStartVnode = oldChildren[++oldStartIdx]
        } else if (!oldEndVNode) {
            //旧尾遇到undefined
            oldEndVnode = oldChildren[--oldEndIdx]
        }
        else if (oldStartVnode.key === newStartVNode.key) {
            // 省略部分代码
        } else if (oldEndVNode.key === newEndVNode.key) {
            // 省略部分代码
        } else if (oldStartVnode.key === newEndVNode.key) {
            // 省略部分代码
        } else if (oldEndVNode.key === newStartVNode.key) {
            // 省略部分代码
        } else {
            // 遍历旧的一组子节点，试图寻找与 newStartVNode 拥有相同 key 值的节点
            // idxInOld 就是新的一组子节点的头部节点在旧的一组子节点中的索引
            const idxInOld = oldChildren.findIndex(
                node => node.key === newStartVNode.key
            )

            //大于0,说明找到了可复用节点,并且需要将对应的真实DOM移动到头部
            if (idxInOld > 0) {
                //idxInOld位置对应的vnode就是需要移动的节点
                const vnodeToMove = oldChildren[idxInOld]
                //打补丁
                patch(vnodeToMove, newStartVNode, container)
                //将vnodeToMove.el移动到头部节点oldStartVnode.el之前,因此需要使用后者作为锚点
                insert(vnodeToMove.el, container, oldStartVnode.el)
                //由于位置idxInOld处节点对应的真实DOM已经移动到了别处,因此将其设置为undefined
                oldChildren[idxInOld] = undefined
                //最后更新newStartIdx到下一个位置
                newStartVNode = newChildren[++newStartIdx]
            }
        }
    }
}
