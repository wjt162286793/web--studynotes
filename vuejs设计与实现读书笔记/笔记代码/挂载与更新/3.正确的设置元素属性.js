//判断设置的属性是否属于DOM中的原属性
// const mountElement = (vnode,container)=>{
//     const el = createElement(vnode.type)

//     if(vnode.props){
//         for(const key in vnode.props){
//             //用in操作符判断key是否存在对应的DOM Properties
//             if(key in el){
//                 //获取该DOM Properties的类型
//                 const type = typeof el[key]
//                 const value = vnode.props[key]
//                  //如果是布尔类型,并且value是空字符串,则将值矫正为true
//                 if(type === 'boolean' && value === ''){
//                     el[key] = true
//                 }else{
//                     el[key] = value
//                 }
//             }else{
//                 //如果要设置的属性没有对应的DOM Properties,则使用setAttribute函数设置属性
//                 el.setAttribute(key,vnode.props[key])
//             }
//         }
//     }
//     insert(el,container)
// }


//拆分代码,新增一个判断函数
// const shouldSetAsProps = (el,key,value) =>{
//     if(key === 'form' && el.tagName === 'INPUT'){
//         return false
//     }
//     return key in el
// }

// const mountElement = (vnode,container)=>{
//     const el = createElement(vnode.type)

//     if(vnode.props){
//         for(const key in vnode.props){
//             const value = vnode.props[key]
//             if(shouldSetAsProps(el,key,value)){  //在这里判断
//                 const type = typeof el[key]
//                 if(type === 'boolean' && value === ''){
//                     el[key] = true
//                 }else{
//                     el[key] = value
//                 }
//             }else{
//                 el.setAttribute(key,vnode.props[key])
//             }
//         }
//     }
//     insert(el,container)
// }


//全部代码,可以扩展迭代

const renderer = createRenderer({
    createElement(tag) {
        return document.createElement(tag)
    },
    setElementText(el, text) {
        el.textContent = text
    },
    insert(el, parent, anchor = null) {
        parent.insertBefore(el, anchor)
    },
    //将属性设置相关操作封装到patchProps函数中,并作为渲染器选项传递
    patchProps(el, key, prevValue, nextValue) {
        if (shouldSetAsProps(el, key, nextValue)) { 
            const type = typeof el[key]
            if (type === 'boolean' && nextValue === '') {
                el[key] = true
            } else {
                el[key] = nextValue
            }
        } else {
            el.setAttribute(key, vnode.props[key])
        }
    }
})



function createRenderer(options){
    const {
     createElement,
     setElementText,
     insert
    } = options

     function patch(old_vnode,new_vnode,container){
       //
     }
 
     function render(vnode,container){
        //
     }
     function mountElement (vnode,container){
        const el = createElement(vnode.type)
        if(typeof vnode.children === 'string'){
         setElementText(el,vnode.children)
        }else if(Array.isArray(vnode.children)){
           vnode.children.forEach(child =>{
             patch(null,child,el)
           })
        }
     
        if(vnode.props){
         for(const key in vnode.props){
             //调用patchProps函数即可
             patchProps(el,key,null,vnode.props[key])
         }
        }
        insert(el,container)
      }
     return render
 }