//可以通过key找到可复用的节点,要如何判断一个节点是否需要移动和如何移动
//当新旧两组子节点顺序不变时,就不需要额外的移动

//如果新旧节点的key相同,说明在旧children中找到了可复用的DOM节点。此时用该节点在旧children中的索引j与lastIndex进行比较。如果j>lastIndex,说明当前的oldVnode对应的真实DOM需要移动,否则说明不需要移动。但是此时将变量j的值赋值给变量lastIndex,以保证寻找节点的过程中,变量lastIndex始终存储着当前遇到的最大索引值。

function patchChildren(n1,n2,container){
    if(typeof n2.children === 'string'){
        //省略代码
    }else if(Array.isArray(n2.children)){
        const oldChildren = n1.children
        const newChildren = n2.children

        //用来存储寻找过程中遇到的最大索引值
        let lastIndex = 0
        for(let i = 0;i<newChildren.length;i++){
            const newVnode = newChildren[i]
            for(let i = 0;j<oldChildren.length;j++){
                const oldVnode = oldChildren[j]
                if(newVnode.key === oldVnode.key){
                    patch(oldVnode,newVnode,container)
                    if(j<lastIndex){
                        //如果当前找到的节点在旧children中索引小于最大索引值 lastIndex ,说明该节点对应真实的DOM需要移动
                    }else{
                        //如果当前找到的节点在旧children中的索引不小于最大索引值
                        //则更新lastIndex的值
                        lastIndex = j
                    }
                    break
                }
            }
        }
    }
}