//加入vnode.children的值是字符串类型的,代表是文本内容。但如果是其余的DOM元素,而且还可以是多个DOM元素。就需要将vnode.children定义为数组。

// const vnode = {
//     type:'div',
//     children:[
//         {
//             type:'p',
//             children:'hello'
//         },
//         {
//             type:'span',
//             children:'wjt'
//         }
//     ]
// }

//挂载节点函数,增加数组类型的判断

// function mountElement(vnode,container){
//     const el = createElement(vnode.type)
//     if(typeof vnode.children === 'string'){
//         setElementText(el,vnode.children)
//     }
//     //如果是数组类型,遍历每一个子节点,调用patch函数将其挂载到新创建的DOM节点el上
//     else if(Array.isArray(vnode.children)){
//        vnode.children.forEach(child=>{
//         patch(null,child,el)
//        })
//     }
//     insert(el,container)
// }

//描述元素的属性
//可以将元素的的属性放在一个对象里,props对象

const vnode = {
    type:'div',
    props:{
        id:'box',
    },
    children:[
        {
            type:'h1',
            props:{
                className:'title'
            },
            children:'hello wjt!'
        }
    ]   
}

//对于props做处理
function mountElement(vnode,container){
    const el = createElement(vnode.type)
    if(typeof vnode.children === 'string'){
        setElementText(el,vnode.children)
    }
    else if(Array.isArray(vnode.children)){
       vnode.children.forEach(child=>{
        patch(null,child,el)
       })
    }

   //处理props属性,如果存在的话
   if(vnode.props){
    //遍历props
    for(const key in vnode.props){
        //使用DOM中给标签附加属性的原生方法setAttribute,给元素赋值props中的键值对,将属性设置到元素上
        el.setAttribute(key,vnode.props[key])
        //或者直接赋值
        // el[key] = vnode.props[key]
    }
   }
    insert(el,container)
}