//新旧节点的数量和类型相同,但是顺序不同

 // 旧的子节点
 const oldChildren = [
   { type: 'p' },
   { type: 'div' },
   { type: 'span' }
 ]

 // 新的子节点
 const newChildren = [
   { type: 'span' },
   { type: 'p' },
   { type: 'div' }
 ]


 //这两组节点的类型相同,但是顺序却不同。相比挂载和卸载节点,这种情况下移动节点顺序是一个性能更好的操作。
 //虽然有type类型,但是这个并不能作为唯一的辨识标志。所以需要引入一个唯一的key这个概念

 // 旧的子节点
 [
   { type: 'p', children: '1', key: 1 },
   { type: 'p', children: '2', key: 2 },
   { type: 'p', children: '3', key: 3 }
 ]

 // 新的子节点
 [
   { type: 'p', children: '4', key: 3 },
   { type: 'p', children: '5', key: 1 },
   { type: 'p', children: '2', key: 2 }
 ]

 //key就是唯一的标识,映射新旧节点之间的关系,根据key,也就能获取到节点的位置信息,从而进行对应的操作。
 //当两个元素拥有相同的key和type值,可以复用原有的元素,只需要进行元素位置移动就可以,不需要进行创建操作,可以节省很多性能消耗。

 function patchChildren(n1,n2,container){
   if(typeof n2.children === 'string'){
    //省略代码
   }else if(Array.isArray(n2.children)){
    const oldChildren = n1.children
    const newChildren = n2.children

    //遍历新的children
    for(let i = 0;i<newChildren.length;i++){
        const newVnode = newChildren[i]
        //遍历旧的children
        for(let j = 0;j<oldChildren.length;j++){
            const oldVnode = oldChildren[j]
            //如果找到了具有相同key值的两个节点,说明可以复用,但仍按需要调用patch函数更新
            if(newVnode.key === oldVnode.key){
                patch(oldVnode,newVnode,container)
                break //
            }
        }
    }
   }else{
    //
   }
 }


