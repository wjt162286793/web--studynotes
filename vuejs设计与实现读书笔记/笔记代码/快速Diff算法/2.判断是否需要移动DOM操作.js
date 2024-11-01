//在很多时候,新旧节点组的节点差异很大,有需要新增的,有需要移除的,有需要移动排序的,总之十分复杂

//思路: 构建一个狐族source,它的长度等于新的一组子节点在经过预处理之后剩余未处理节点的数量,并且source中每个元素的初始值都是-1


/**
 * function patchKeyedChildren(n1,n2,container){
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
    }else{
        //构造source数组:将用来存储新的一组子节点中的节点在旧的一组节点中的位置索引。后面会使用它计算出一个最长递增子序列,并用于辅助完成DOM移动的操作
        //新的一组子节点中剩余未处理节点的数量

        const count = newEnd - j + 1
        const source = new Array(count)
        source.fill(-1)

    }
}

 */

//可以通过两层for循环来完成source数组的填充工作,外层循环用于遍历旧的一组子节点,内层循环用于遍历新的一组子节点:

/**
 * function patchKeyedChildren(n1,n2,container){
    const newChildren = n2.children
    const oldChildren = n1.children
    //更新相同的前置节点
    //省略部分代码

    if(j>oldEnd && j<= newEnd){
        //省略部分代码
    }else if(j>newEnd && j<= oldEnd){
        while(j <= oldEnd){
            unmount(oldChildren[j++])
        }
    }else{
        //构造source数组
        const count = newEnd - j + 1
        const source = new Array(count)
        source.fill(-1)
        
        //oldStart和newStart分别为起始索引,即j
        const oldStart = j
        const newStart = j
        //遍历旧的一组子节点
        for(let i = oldStart;i<oldEnd;i++){
            const oldVNode = oldChildren[i]
            for(let k = newStart;k<=newEnd;k++){
                const newVNode = newChildren[k]
                //找到拥有相同key值的可复用节点
                if(oldVNode.key === newVNode.key){
                    //调用patch进行更新
                    patch(oldVNode,newVNode,container)
                    //最后填充source数组
                    source[k-newStart] = i
                }
            }
        }
    }
}
 */


//由于数组source的索引从0开始的,而未处理节点的索引未必从0开始。所以在填充数组时需要使用表达式k-newStart的值作为数组的索引值。外层循环的变量i就是当前节点在旧的一组子节点中的位置索引,因此直接将变量i的值赋给source[k-newStart]即可。

//当新旧节点的数量较多时,两层嵌套的循环往往会带来性能问题,处于优化的目的,可以为新的一组子节点构建一张索引表,用来存储节点的key和节点位置索引之间的映射
//有了索引表,可以快速的填充source数组

/**
 * if(j>oldEnd && j<= newEnd){
    //省略部分代码
}else if(j>newEnd && j<= oldEnd){
   //省略部分代码
}else{
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)

    //oldStart和newStart分别为起始索引,即为j
    const oldStart = j
    const newStart = j
    //构建索引表
    const keyIndex = {}
    for(let i = newStart;i<= newEnd;i++){
        keyIndex[newChildren[i].key] = i
    }
    //遍历旧的一组子节点中剩余未处理的节点
    for(let i = oldStart;i<oldEnd;i++){
        oldVNode = oldChildren[i]
        //通过索引表快速找到新的一组子节点中具有相同key值的节点位置
        const k = keyIndex[oldVNode.key]

        if(typeof k !== 'undefined'){
            newVNode = newChildren[k]
            //调用patch函数完成更新
            patch(oldVNode,newVNode,container)
            //填充source数组
            source[k-newStart] = i
        }else{
            unmount(oldVNode)
        }
    }
}
 */


//使用了两个for循环,不过不再是嵌套关系,所以可以将代码的时间复杂度降至O(n)。
//第一个for循环用来构建索引表,索引表存储的是节点key值与节点在新的一组子节点中位置索引之间的映射。
//第二个循环用来遍历旧的一组子节点,拿旧子节点的key值去索引表keyIndex中查找该节点在新的一组子节点中的位置,并将查找结果存储到变量k中。
//如果k存在,说明该节点是可复用的,调用patch函数打补丁,并且填充source数组。否则说明该节点已经不存在于新的一组子节点中,就需要调用unmount函数卸载

//source数组填充完毕后,就需要判断节点是否需要移动

if(j>oldEnd && j<= newEnd){
    //省略部分代码
}else if(j>newEnd && j<= oldEnd){
   //省略部分代码
}else{
    const count = newEnd - j + 1
    const source = new Array(count)
    source.fill(-1)

    const oldStart = j
    const newStart = j

    //新增两个变量
    let moved = false
    let pos = 0

    const keyIndex = {}
    for(let i = newStart;i<= newEnd;i++){
        keyIndex[newChildren[i].key] = i
    }

    for(let i = oldStart;i<oldEnd;i++){
        oldVNode = oldChildren[i]
        const k = keyIndex[oldVNode.key]

        if(typeof k !== 'undefined'){
            newVNode = newChildren[k]
            patch(oldVNode,newVNode,container)
            source[k-newStart] = i
            //判断节点是否需要移动
            if(k<pos){
                moved = true
            }else{
                pos = k
            }
        }else{
            unmount(oldVNode)
        }
    }
}


// 新增了两个变量moved和pos。
// moved代表是否需要移动节点,pos代表遍历旧的一组子节点的过程中遇到的最大索引值k。
// 如果在遍历过程中,遇到的索引值呈现递增趋势,说明不需要移动节点,反之则需要。所以在第二个for循环内,通过比较变量k与变量pos的值来哦按断是否需要移动节点。


// 此外,还需要一个数量标识,代表已经更新过的节点数量。已更新过的节点数量应该小于新的一组子节点中需要更新的节点数量。一旦前者超过后者,则说明有多余的节点,应该将其卸载。

 if (j > oldEnd && j <= newEnd) {
   // 省略部分代码
 } else if (j > newEnd && j <= oldEnd) {
   // 省略部分代码
 } else {
   // 构造 source 数组
   const count = newEnd - j + 1
   const source = new Array(count)
   source.fill(-1)

   const oldStart = j
   const newStart = j
   let moved = false
   let pos = 0
   const keyIndex = {}
   for(let i = newStart; i <= newEnd; i++) {
     keyIndex[newChildren[i].key] = i
   }
   // 新增 patched 变量，代表更新过的节点数量
   let patched = 0
   for(let i = oldStart; i <= oldEnd; i++) {
     oldVNode = oldChildren[i]
     // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
     if (patched <= count) {
       const k = keyIndex[oldVNode.key]
       if (typeof k !== 'undefined') {
         newVNode = newChildren[k]
         patch(oldVNode, newVNode, container)
         // 每更新一个节点，都将 patched 变量 +1
         patched++
         source[k - newStart] = i
         if (k < pos) {
           moved = true
         } else {
           pos = k
         }
       } else {
         // 没找到
         unmount(oldVNode)
       }
     } else {
       // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
       unmount(oldVNode)
     }
   }
 }


 //增加了patched变量,初始值为0,代表更新过的节点数量。记者,在第二个for循环中增加了判断patched<=count,如果此条件成立,则正常更新,并且每次更新后都能让变量patched自增;否则说明剩余的节点都是多余的,于是调用unmount函数将他们卸载。