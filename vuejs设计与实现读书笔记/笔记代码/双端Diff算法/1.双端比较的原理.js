//新节点            //原节点
// p-3  key:2       // p-1 key:0
// p-1  key:0       // p-2 key:1
// p-2  key:1       // p-3 key:2


//从上帝视角看,只需要给p-3移动到p-1之前就可以了,不需要再移动p-1和p-2了。
//但对于简单Diff算法,是做不到的。这就需要优化一下算法,实现双端Diff


/**
 *                         
 *                      新子节点                   旧子节点
     newStartIdx  -→    p-4                        p-1          ←- oldStartIdx             
                        p-2                        p-2
                        p-1                        p-3
     newEndIdx    -→    p-3                        p-4          ←- oldEndIdx         
 */


function patchChildren(n1,n2,container){
    if(typeof n2.children === 'string'){
        //省略
    }else if(Array.isArray(n2.children)){
      //封装patchKeyedChildren函数处理两组子节点
      patchKeyedChildren(n1,n2.container)
    }else{
        //省略
    }
}

// function patchKeyedChildren(n1,n2,container){
//     const oldChildren = n1.children
//     const newChildren = n2.children

//     //四个索引值
//     let oldStartIdx = 0
//     let oldEndIdx = oldChildren.length - 1
//     let newStartIdx = 0
//     let newEndIdx = newChildren.length - 1

//     //四个索引指向的vnode节点
//     let oldStartVnode = oldChildren[oldStartIdx]
//     let oldEndVnode = oldChildren[oldEndIdx]
//     let newStartVnode = newChildren[newStartIdx]
//     let newEndVnode = newChildren[newEndIdx]
// }



//根据四个点进行双端比较,过程如下
/**
 * 第一步:比较旧节点组中第一个子节点p-1和新节点组中的第一个子节点p-4,因为两者的key不同,因此节点不同,不可复用,什么也不做。
 * 第二步:比较旧节点组中最后一个子节点p-4和新节点组中的最后一个子节点p-3,因为两者的key不同,因此节点不同,不可复用,什么也不做。
 * 第三步:比较旧节点组中第一个子节点p-1和新节点组中的最后一个子节点p-3,因为两者的key不同,因此节点不同,不可复用,什么也不做。
 * 第四步:比较旧节点组中最后一个子节点p-4和新节点组中的第一个子节点p-4,因为两者的key相同,所以确定为是可复用DOM。
 */

function patchKeyedChildren(n1,n2,container){
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

    
    if(oldStartVnode.key === newStartVnode.key){
     //第一步
    }else if(oldEndVnode.key === newEndVnode.key){
     //第二步
    }else if(oldStartVnode.key === newEndVnode.key){
     //第三步
    }else if(oldEndVnode.key === newStartVnode.key){
     //第四步,可复用
     //调用patch函数
     patch(oldEndVnode,newStartVnode,container)
     //移动DOM
     insert(oldEndVnode.el,container,oldStartVnode.el)
     //移动完DOM后,更新索引值,指向下一个位置
     oldEndVnode = oldChildren[--oldEndIdx]
     newStartVnode = newChildren[++newStartIdx]
    }
}


//可复用节点移动完成后,需要完成一个关键步骤,更新索引值。由于第四步中涉及的两个索引分别是oldEndIdx和newStartIdx,所以需要更新两者的值,让各自朝正确的方向前进一步,指向下一个节点。

//第一次执行完毕之后,p-4作为第一个被复用并且移动值,所以根据p-4的key,推导出新的索引值如下

/**
 *                  新子节点               旧子节点
                     (p-4)                   p-1        ←- oldStartIdx
    newStartIdx  -→   p-2                    p-2
                      p-1                    p-3        ←- oldEndIdx
    newEndIdx    -→   p-3                   (p-4)
 */

//使用while循环,更新key,寻找可复用元素,循环的执行条件为头部索引值要小于尾部索引值


function patchKeyedChildren(n1,n2,container){
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

    
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
        if(oldStartVnode.key === newStartVnode.key){
            //第一步,旧头===新头。更新相关索引,不需要移动
            patch(oldStartVnode,newStartVnode,container)
            oldStartVnode = oldChildren[++oldStartIdx]
            newStartVnode = newChildren[++newStartIdx]
           }else if(oldEndVnode.key === newEndVnode.key){
            //第二步,旧尾===新尾。更新相关索引,不需要移动
            patch(oldEndVnode,newEndVnode,container)
            oldEndVnode = oldChildren[--oldEndIdx]
            newEndVnode = newChildren[--newEndIdx]
           }else if(oldStartVnode.key === newEndVnode.key){
            //第三步,旧头===新尾。更新相关索引,需要移动DOM
            patch(oldStartVnode,newEndVnode,container)
            insert(oldStartVnode.el,container,oldEndVnode.el.nextSibling)
            oldStartVnode = oldChildren[++oldStartIdx]
            newEndVnode = newChildren[--newEndIdx]
           }else if(oldEndVnode.key === newStartVnode.key){
            //第四步,旧尾===新头。更新相关索引,需要移动DOM
            patch(oldEndVnode,newStartVnode,container)
            insert(oldEndVnode.el,container,oldStartVnode.el)
            oldEndVnode = oldChildren[--oldEndIdx]
            newStartVnode = newChildren[++newStartIdx]
           }
    }
}





