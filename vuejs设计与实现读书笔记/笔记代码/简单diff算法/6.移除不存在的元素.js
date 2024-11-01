//新节点              //原节点
// p-3  key:2         // p-1  key:0          
// p-1  key:0         // p-2  key:1  
                      // p-3  key:2


function patchChildren(n1,n2,container){
    if(typeof n2.children === 'string'){
        //省略部分代码
    }else if(Array.isArray(n2.children)){
        const oldChildren = n1.children
        const newChildren = n2.children

        let lastIndex = 0
        for(let i = 0;i<newChildren.length;i++){
            //省略部分代码
        }

        //上一步的更新操作完成后,遍历旧的一组子节点
        for(let i = 0;i<oldChildren.length;i++){
            const oldVnode = oldChildren[i]
            //拿旧子节点oldVnode去新的一组子节点中寻找具有相同key值的节点
            const has = newChildren.find(vnode => vnode.key === oldVnode.key)
            if(!has){
                //如果没有找到具有相同key值的节点,则说明需要删除该节点
                //调用unmount进行卸载
                unmount(oldVnode)
            }
        }
    }else{
        //省略部分代码
    }
}