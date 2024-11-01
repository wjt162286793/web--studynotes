//两段文本
let oldStr = '英雄联盟S13全球总决赛'
let newStr = '英雄联盟S14全球总决赛'
//这两个文本,就一个字不同,我们可以简单的标记为
// oldStr => 3
// newStr => 4
//只是将3换成了4

//快速diff算法也采用了预处理的步骤


// 开启一个while循环,让索引js递增,直至遇到不相同的节点为止

/**
 * 
function patchKeyedChildren(n1,n2,container){
     const newChildren = n2.children
     const oldChildren = n1.children

     //处理相同的前置节点
     //索引j指向新旧两组子节点的开头

     let j = 0
     let oldVNode = oldChildren[j]
     let newVNode = newChildren[j]

     //循环后向后遍历,直至遇到用于不同key值的节点为止
     while(oldVNode.key === newVNode.key){
        //调用patch函数进行更新
        patch(oldVNode,newVNode,container)
        //索引j和对应的节点递增
        j++
        oldVNode = oldChildren[j]
        newVNode = newChildren[j]
     }
}
 */


// 对于上面的示例来说,当j等于1的时候,遇到了p-4节点,终止了内部的while循环。接下来,需要处理相同的后置节点
// 由于新旧两组节点的数量可能会不同,所以需要两个索引值,分别代表两组节点的尾部索引,指向两个节点组的最后一个节点
// 然后再开启一个while循环,从后向前去遍历两组节点,直到遇上key值不同的节点位置

/**
 * 
 function patchKeyedChildren(n1,n2,container){
    const newChildren = n2.children
    const oldChildren = n1.children

    //处理相同的前置节点
    //索引j指向新旧两组子节点的开头

    let j = 0
    let oldVNode = oldChildren[j]
    let newVNode = newChildren[j]

    //循环后向后遍历,直至遇到用于不同key值的节点为止
    while(oldVNode.key === newVNode.key){
       //调用patch函数进行更新
       patch(oldVNode,newVNode,container)
       //索引j和对应的节点递增
       j++
       oldVNode = oldChildren[j]
       newVNode = newChildren[j]
    }

    //更新相同的后置节点
    // 索引oldEnd指向旧的一组子节点的最后一个节点
    let oldEnd = oldChildren.length - 1
    //索引newEnd指向新的一组子节点的最后一个节点
    let newEnd = newChildren.length - 1

    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]

    //while循环从后向前遍历,直到拥有不同key值的节点为止
    while(oldVNode.key === newVNode.key){
        //调用patch函数进行更新
        patch(oldVNode,newVNode,container)
        //递减 oldEnd 和 nextEnd
        oldEnd--
        newEnd--
        oldVNode = oldChildren[oldEnd]
        newVNode = newChildren[newEnd]
    }
}
 */



// 当前置相同节点和后置相同节点循环完毕之后,发现旧节点组中所有的节点都已经处理完毕,在新的节点组中,还有p-4没有被处理。可以得出结论,p-4是一个新增的节点。
//在程序中,可以根据这几个索引值去判断未被处理的节点
//条件1. oldEnd < j : 说明在预处理过程中,所有旧的子节点都处理完毕了。
//条件2.  newEnd >= j ,说明在预处理完毕后,新的节点组中还有未被处理的节点,而这些未被处理遗留的节点就是新增节点
//如果条件1和条件2同时成立,说明在新的一组节点中,存在遗留节点,并且这些节点都是新增节点,需要将这些节点挂载正确的位置。

// 在j和newEnd之间的任何节点都需要作为新的子节点去挂载,这就需要找到正确的锚点元素。在上述案例中,很想然p-2所对应的真实DOM就是锚点元素

//遇到新增节点时的处理
/**
 * 
function patchKeyedChildren(n1,n2,container){
    const newChildren = n2.children
    const oldChildren = n1.children

    //处理相同的前置节点
    //索引j指向新旧两组子节点的开头

    let j = 0
    let oldVNode = oldChildren[j]
    let newVNode = newChildren[j]

    //循环后向后遍历,直至遇到用于不同key值的节点为止
    while(oldVNode.key === newVNode.key){
       //调用patch函数进行更新
       patch(oldVNode,newVNode,container)
       //索引j和对应的节点递增
       j++
       oldVNode = oldChildren[j]
       newVNode = newChildren[j]
    }

    //更新相同的后置节点
    // 索引oldEnd指向旧的一组子节点的最后一个节点
    let oldEnd = oldChildren.length - 1
    //索引newEnd指向新的一组子节点的最后一个节点
    let newEnd = newChildren.length - 1

    oldVNode = oldChildren[oldEnd]
    newVNode = newChildren[newEnd]

    //while循环从后向前遍历,直到拥有不同key值的节点为止
    while(oldVNode.key === newVNode.key){
        //调用patch函数进行更新
        patch(oldVNode,newVNode,container)
        //递减 oldEnd 和 nextEnd
        oldEnd--
        newEnd--
        oldVNode = oldChildren[oldEnd]
        newVNode = newChildren[newEnd]
    }

    //说明找了一些需要新增的元素
    if(j>oldEnd && j<= newEnd){
        //锚点的索引
        const anchorIndex = newEnd + 1
        //锚点元素,也就是新增部分之后的那个元素
        const anchor = anchorIndex < newChildren.length?newChildren[anchorIndex].el:null
        //采用while循环,调用patch函数逐个挂载新增节点
        while(j<=newEnd){
            patch(null,newChildren[j++],container,anchor)
        }
    }
}
 */


//上面是新节点中有需要新增的元素,不过也会存在新节点元素较少,需要删除的元素
function patchKeyedChildren(n1,n2,container){
    const newChildren = n2.children
    const oldChildren = n1.children

    //更新相同的前置节点
    //省略部分代码

    if(j>oldEnd && j<= newEnd){
        //省略部分代码
    }else if(j>newEnd && j<= oldEnd){
        //j -> oldEnd之间的节点应该被卸载
        while(j <= oldEnd){
            unmount(oldChildren[j++])
        }
    }
}




