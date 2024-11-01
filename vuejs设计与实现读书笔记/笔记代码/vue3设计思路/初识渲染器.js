//虚拟dom
const vnode = {
    tagName:'h1',
    text:'我是王惊涛',
    props:{
        onclick:()=>{console.log('今年28岁')}
    },
    children:[]
}

//渲染器
const renderer = (vnode,container)=>{   //vnode是虚拟dom,container为真实dom节点
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

//生成的真实dom
<h1 onclick="clickHandler">我是王惊涛</h1>
const clickHandler = ()=>{console.log('今年28岁')}

