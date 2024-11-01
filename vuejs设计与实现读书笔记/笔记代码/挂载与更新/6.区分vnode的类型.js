// 假如之前在某个位置的vnode是一个div类型,更新后变成input类型。这就会使标签的一些属性发生变化,比如input会有type属性,而div却没有。
// 所以,替换的时候,需要对比两者的属性。

function patch(oldvnode,newvnode,container){
    if(oldvnode && oldvnode.type !== newvnode.type){
        //如果新旧vnode的类型不同,则直接将旧vnode卸载
        unmount(oldvnode)
        oldvnode = null
    }
    if(!oldvnode){  //创建
       mountElement(newvnode,container)
    }else{
        //更新
    }
}


//不过一个vnode可以用来描述普通标签,也可以描述组件和Frament。对于不同类型的vnode,需要提供不同的挂载或打补丁的处理方式。
//增强版patch

const patch = (oldvnode,newvnode,container)=>{
   if(oldvnode && oldvnode.type !== newvnode.type){
    unmount(oldvnode)
    oldvnode = null
   }
   
   const {type} = newvnode
   if(typeof type ==='string'){  //字符串类型,说明是DOM节点
    if(!oldvnode){
        mountElement(newvnode,container)
    }else{
        patchElement(oldvnode,newvnode)
    }
   }else if(typeof type ==='object'){
    //如果type为object',代表是个组件类型
   }else if(type === 'other-xxx'){
    //代表其他类型
   }

}