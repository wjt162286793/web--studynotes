const wjtComponent = ()=>{   //组件的dom描述
    return {
        tag:'div',
        props:{
            onclick:()=>{console.log('我是王惊涛')}
        },
        children:'click me'
    }
}

const vnode = {  
    tag:wjtComponent  //将组件作为tag的值
}


//渲染器
const renderer = (vnode,container)=>{   //vnode是虚拟dom,container为真实dom节点
    if(typeof vnode.tag === 'string'){  //dom节点
         mountElement(vnode,container)   //去渲染dom节点的函数
    }else if(typeof vnode.tag === 'function'){  //是个函数,那就是组件
       mountComponent(vnode,container)  //去渲染组件的函数
    }
 }

//渲染dom
 const mountElement = (vnode,container)=>{  //这里就是上面我们写的那个渲染dom的函数,原renderer函数
    const el = document.createElement(vnode.tag)    //创建h1标签
     for (const key in vnode.props){
         if(/^on/.test(key)){  //符合以on开头的,说明是事件
           el.addEventListener(
             key.substr(2).toLowerCase(),   //去掉事件名称开头的on,  onclick转化为click
             vnode.props[key]   //事件处理函数,就是打印28岁的那个箭头函数
           )
         }
     }
 
     if(typeof vnode.children === 'string'){   //如果children是个字符串类型的值,就是一个文本元素,直接插入
         el.appendChild(document.createTextNode(vnode.children))
     }else if(Array.isArray(vnode.children)){  //如果是数组类型,将当前的节点作为挂载点,递归添加子节点
         vnode.children.forEach(child => renderer(child,el))
     }
     container.appendChild(el)  //作为子节点挂载到真实dom中
 }

 //渲染组件
 const mountComponent = (vnode,container)=>{
   const subTree = vnode.tag()   //这个函数返回的就是组件描述的dom
   renderer(subTree,container)
 }



 //对象类型的情况
 const wjtObjComponent = {
    render(){
        return {
            tag:'div',
            props:{
                onclick:()=>{console.log('我是王惊涛')}
            },
            children:'click me'
        }
    }
 }

 //在renderer中就需要加一下对象的处理逻辑了
 const renderer_change = ()=>{
    if(typeof vnode.tag === 'string'){  //dom节点
        mountElement(vnode,container)   //去渲染dom节点的函数
   }else if(typeof vnode.tag === 'function'){  //是个函数,那就是组件
      mountComponent(vnode,container)  //去渲染组件的函数
   }else if(typeof vnode.tag === 'object'){
      mountComponent_change(vnode,container)
   }
 }

 //处理对象格式的组件
 const mountComponent_change = (vnode,container)=>{
   const subTree = vnode.tag.render()    //render调用后返回一个虚拟dom
   renderer(subTree,container)
 }