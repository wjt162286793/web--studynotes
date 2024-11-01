//使用vnode描述一个简单的dom元素
// const vnode = {
//     type:'h1',
//     children:'hello'
// }

//渲染器
// const createRenderer = ()=>{
    
//     //更新替换节点操作的函数
//     function patch(old_vnode,new_vnode,container){
//           if(!old_vnode){   //没有旧节点,意味着这里是挂载
//             //节点挂载函数
//             mountElement(new_vnode,container)
//           }else{
//             //有旧节点,这里是更新
//           }
//     }

//     function render(vnode,container){
//         //container:真实的容器,container._vnode:旧node,vnode:新vnode
//         if(vnode){
//             //如果出现了新的vnode,将新vnode和旧vnode传递狗patch函数,进行更新操作
//             patch(container._vnode,vnode,container)
//         }else{
//             //旧vnode存在,但是新vnode不存在,就等于这里已经没有了
//             if(container._vnode){
//                 //清空vnode
//                 container.innerHTML = ''
//             }
//         }
//         //把vnode存储到container上,下次在被调用就是oldvnode
//         container._vnode = vnode
//     }
//     return render
// }

//定义节点挂载函数
// const mountElement = (vnode,container)=>{
//    //创建DOM元素
//    const el = document.createElement(vnode.type)
//    //处理子节点,如果子节点是字符串,代表元素具有文本节点
//    if(typeof vnode.children === 'string'){
//     //文本节点的元素直接将文本赋值给元素内容
//     el.textContent = vnode.children
//    }
//    //添加到容器节点
//    container.appendChild(el)
// }


// 问题:设计该渲染器的时候,是希望可以跨平台使用,而不是仅仅在浏览器平台
// 解决方案:我们可以将DOM的api作为一个整体的options配置项传给渲染器函数,渲染器函数在将这些配置项解构就可以

//创建renderer时传入配置
const renderer = createRenderer({
    //DOM创建节点的方法
    createElement:(tag)=>{
        return document.createElement(tag)
    },
    //给元素设置文本内容的方法
    setElementText:(el,text)=>{
        el.textContent = text
    },
    //用于在给定的parent下添加指定元素
    insert:(el,parent,anchor = null)=>{
     parent.insertBefore(el,anchor)
    }
})

//根据配置项修改createRenderer函数
function createRenderer(options){
   const {
    createElement,
    setElementText,
    insert
   } = options

    //更新替换节点操作的函数
    function patch(old_vnode,new_vnode,container){
      //
    }

    function render(vnode,container){
       //
    }
    function mountElement (vnode,container){
        const el = document.createElement(vnode.type)
        if(typeof vnode.children === 'string'){
        //用options传进来的setElementText方法取代之前的el.textContent
         setElementText(el,vnode.children)
        }
       //用insert代替container.appendChild
       insert(el,container)  
     }
    return render
}




