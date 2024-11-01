//现在有这样两组新旧节点

const oldVnode = [
    {
        type:'p',
        children:'p-1',
        key:0
    },
    {
        type:'p',
        children:'p-2',
        key:1
    },
    {
        type:'p',
        children:'p-3',
        key:2
    }
]


const newVnode = [
    {
        type:'p',
        children:'p-3',
        key:2
    },
    {
        type:'p',
        children:'p-1',
        key:0
    },
    {
        type:'p',
        children:'p-2',
        key:1
    }
]


//新节点               //旧节点            

//p-3  key:2           //p-1  key:0
//p-1  key:0           //p-2  key:1
//p-2  key:1           //p-3  key:2

//第一步: 新节点中的p-3,key为2。在旧节点中存在,lastIndex为0,索引值j为2。索引值大于lastIndex,所以p-3不需要移动,lastIndex = 2。  当前真实DOM顺序:p-1,p-2,p-3
//第二步: 新节点中的p-1,key为0。在旧节点中存在,lastIndex为2,索引值j为0。索引值小于lastIndex,所以p-1需要移动,移动到p-3节点的后面。  当前真实DOM顺序:p-2,p-3,p-1
//第三步: 新节点中的p-2,key为1。在旧节点中存在,lastIndex为2,索引值j为1。索引值小于lastIndex,所以p-2需要移动,移动到p-1节点的后面。  当前真会DOM顺序:p-3,p-1,p-2

//完成:所以这里我们要做的操作就是,第二步和第三步的,让当前循环到的新节点排在上个节点后面

/**
 * 
 * @param {*} n1  旧节点 
 * @param {*} n2  新节点
 * @param {*} container  容器
 * @description  根据不同类型操作子节点
 */
function patchChildren(n1,n2,container){
  if(typeof n2.children === 'string'){
    //省略
  }else if(Array.isArray(n2.children)){
    const oldChildren = n1.children
    const newChildren = n2.children
    let lastIndex = 0

    for(let i = 0;i<newChildren.length;i++){
        const newVnode = newChildren[i]
        for(let j = 0;j<oldChildren.lngth;j++){
            const oldVnode = oldChildren[j]
            if(newVnode.key === oldVnode.key){
                patch(oldVnode,newVnode,container)
                //索引值小于lastIndex,说明需要移动
                if(j<lastIndex){
                    //获取newVnode的前一个vnode
                   const prevVnode = newChildren[i-1]
                   //如果prevVnode不存在,说明当前就是第一个节点,不需要移动
                   if(prevVnode){
                    //获取prevVnode所对应真实DOM的下一个兄弟节点
                    //在DOM（文档对象模型）中，el.nextSibling 属性返回当前节点（el）的下一个兄弟节点。兄弟节点是指具有相同父节点的节点
                    const anchor = prevVnode.el.nextSibling
                    //调用insert方法将newVnode对应的真实DOM插入到锚点元素前面,也就是prevVnode对应真实DOM的后面
                    insert(newVnode.el,container,anchor)
                   }
                }else{
                    lastIndex = j
                }
                break
            }
        }
    }
  }
}