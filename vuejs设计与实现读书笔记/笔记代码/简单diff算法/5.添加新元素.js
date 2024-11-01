//新节点               //旧节点            

//p-3  key:2           //p-1  key:0
//p-1  key:0           //p-2  key:1
//p-4  key:3           //p-3  key:2
//p-2  key:1 

//在新节点的第三个位置,多出一个p-4,key为3。因为这个p-4节点在之前的节点中不存在,所以可以判断这个节点是新增节点,需要进行挂在操作。

//前两步和上面哈不多,到了第三步:尝试在旧的节点中找到可复用的节点,发现没有找到,所以可以理解为这个节点是新增节点,需要创建并挂载的。而且挂载的顺序也是需要按照新节点的循环顺序,排在p-1之后

function patchChildren(n1,n2,container){
    if(typeof n2.children === 'string'){
      //省略
    }else if(Array.isArray(n2.children)){
      const oldChildren = n1.children
      const newChildren = n2.children
      let lastIndex = 0
  
      for(let i = 0;i<newChildren.length;i++){
          const newVnode = newChildren[i]
          //定义一个变量,这个变量代表是否在旧节点中找到可复用的节点,false为没找到,true为找到了
          let find = false
          for(let j = 0;j<oldChildren.lngth;j++){
              const oldVnode = oldChildren[j]
              if(newVnode.key === oldVnode.key){
                //find值设置为true
                find = true
                  patch(oldVnode,newVnode,container)
                  //索引值小于lastIndex,说明需要移动
                  if(j<lastIndex){
                     const prevVnode = newChildren[i-1]
                     if(prevVnode){
                      const anchor = prevVnode.el.nextSibling                    
                      insert(newVnode.el,container,anchor)
                     }
                  }else{
                      lastIndex = j
                  }
                  break
              }
          }
          //如果执行完上面的循环后,find为false,说明没找到可以复用的节点,当前这个节点是一个需要新建并且挂载的节点
          if(!find){
           //为了将节点挂载到正确位置,首先需要获取锚点元素
           const prevVnode = newChildren[i - 1]
           let anchor = null
           if(prevVnode){
            //如果存在,这个就是锚点元素
            const anchor = prevVnode.el.nextSibling 
           }else{
            //如果没有前一个节点,说明即将挂载的新节点是第一个子节点 ,这时候需要使用容器元素的firstChild作为锚点
            anchor = container.firstChild
           }
           //挂载新节点
           patch(null,newVnode,container,anchor)
          }
      }
    }
  }

  function patch(n1,n2,container,anchor){
    if(typeof type === 'string'){
        if(!n1){
        //挂载时将锚点元素作为第三个参数传递给mountElement函数
        mountElement(n2,container,anchor)
        }else{
            patchElement(n1,n2)
        }

    }
  }

  function mountElement(vnode,container,anchor){
    insert(el,container,anchor)
  }