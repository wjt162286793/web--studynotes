const Fragment = Symbol()

//Fragment的vnode节点描述
const vnode = {
    type:Fragment,
    children:[
        {
            type:'div',children:'1',
            type:'div',children:'2'
        }
    ]
}

//渲染节点
function patch(n1,n2,container){
    if(n1 && n1.type !== n2.type){
        unmount(n1)
        n1 = null
    }

    const {type} = n2

    if(typeof type === 'string'){

    }else if(type === Text){

    }
    //处理Fragment类型
    else if(type === Fragment){
        //如果vnode不存在,把Fragment类型的children逐个挂载
        if(!n1){
            n2.children.forEach(c=>patch(null,c,container))
        }else{
            //如果存在,只需要更新替换
            patchChildren(n1,n2,container)
        }
    }
}


//卸载节点
function unmount(vnode){
    //在卸载时,如果卸载的vnode类型为Fragment,则需要卸载children
    if(vnode.type ===Fragment){
        vnode.children.forEach(c=>unmount(c))
        return
    }
    const parent = vnode.el.parentNode
    if(parent){
        parent.removeChildren(vnode.el)
    }
}