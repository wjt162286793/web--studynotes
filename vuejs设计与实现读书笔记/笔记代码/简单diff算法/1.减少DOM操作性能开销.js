
/**
 * 
 * //假如有这样一组新旧节点
 // 旧 vnode
 const oldVNode = {
   type: 'div',
   children: [
     { type: 'p', children: '1' },
     { type: 'p', children: '2' },
     { type: 'p', children: '3' }
   ]
 }

 // 新 vnode
 const newVNode = {
   type: 'div',
   children: [
     { type: 'p', children: '4' },
     { type: 'p', children: '5' },
     { type: 'p', children: '6' }
   ]
 }

 //如果用之前的操作方法,需要先删除三个oldNode,然后新增三个newNode,一共进行了6次操作

 //不过上面的一对节点有这样的特点:
 //1.新旧节点都是p标签
 //2.新旧节点的区别仅是文本内容的不同

 //根据这种情况,可以对patchCchildren进行如下修改

 function patchChildren(n1,n2,container){
    if(typeof n2.children === 'string'){
        //省略部分代码
    }else if(Array.isArray(n2.children)){
        
        const oldChildren = n1.children
        const newChildren = n2.children

        for(let i = 0;i<oldChildren.length;i++){
            patch(oldChildren[i],newChildren[i])
        }
    }else{
        //省略部分代码
    }
 }

//  oldNode1   newNode1   =====>  真实的DOM节点 <p>4</p>
//  oldNode2   newNode2   =====>  真实的DOM节点 <p>5</p>
//  oldNode3   newNode3   =====>  真实的DOM节点 <p>6</p>
 */




//如果是如下情况,
//新节点的类型和原节点相同,但是数量发生变了,比原dom多了一个子标签
 // 旧 vnode
 const oldVNode = {
    type: 'div',
    children: [
      { type: 'p', children: '1' },
      { type: 'p', children: '2' },
      { type: 'p', children: '3' }
    ]
  }
 
  // 新 vnode
  const newVNode = {
    type: 'div',
    children: [
      { type: 'p', children: '4' },
      { type: 'p', children: '5' },
      { type: 'p', children: '6' },
      { type: 'p', children: '7' }
    ]
  }

   //如果旧的子节点多于新的子节点,调用卸载的逻辑;如果新的子节点多于旧的子节点,调用挂载新节点的逻辑
  function patchChildren(n1,n2,container){
    if(typeof n2.children === 'string'){

    }else if(Array.isArray(n2.children)){
        const oldChildren = n1.children
        const newChildren = n2.children

        //旧的一组子节点的长度
        const oldLen = oldChildren.length
        //新的一组子节点的长度
        const newLen = newChildren.length
        //两组子节点的公共长度,选两者中较短的那一组子节点长度
        const commonLength = Math.min(oldLen,newLen)

        //遍历commonLength次
        for(let i = 0;i<commonLength;i++){
            patch(oldChildren[i],newChildren[i],container)
        }

        //如果newLen大于oldLen,说明有新节点需要挂载
        if(newLen > oldLen){
            for(let i = commonLength;i<newLen;i++){
                patch(null,newChildren[i],container)
            }
        }else if(oldLen > newLen){
           //如果oldLen > newLen,说明有旧的子节点需要卸载
           for(let i = commonLength;i<oldLen;i++){
            unmount(oldChildren[i])
           }
        }
    }else{
        //省略部分代码
    }
  }

 