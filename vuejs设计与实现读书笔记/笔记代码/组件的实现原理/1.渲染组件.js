//组件

//从用户角度,是一个描述对象
const myComponent1 = {
    name:'myComponent1',
    data(){
        return {name:'wjt'}
    }
}

//从渲染器角度,是一个特殊的虚拟DOM
const myComponent2 = {
    // type:Fragment,   //描述片段
    type:Text,  //描述节点
    props:{

    }
}


// 在patch函数中定义对应策略

function patch(n1,n2,container,anchor){
    if(n1 && n1.type !== n2.type){
        unmount(n1)
        n1 = null
    }

    const {type} = n2

    if(typeof type === 'string'){

    }else if(type === Text){
       //作为文本元素处理
    }else if(type === Fragment){
       //作为片段处理
    }

    if(!n1){
        //挂载组件
        mountComponent(n2,container,anchor)
    }else{
        //更新组件
        patchComponent(n1,n2,anchor)
    }
}


//模拟一个组件,创建一个用来描述组件的对象,并且使用渲染器进行渲染

//组件
const myComponent = {
    name:'myComponent',
    render(){
        return {
            type:'div',
            children:'我是文本内容'
        }
    }
}

//描述组件的vNode对象,type属性值作为组件的选项对象
const CompVNode = {
    type:myComponent
}
renderer.render(CompVNode,document.querySelector('#app'))

//渲染组件的功能函数
function mountComponent(vnode,container,anchor){
 //通过vnode获取组件的选项对象,即vnode.type
 const componentOptions = vnode.type
 //获取组件的渲染函数render
 const {render} = componentOptions
 //执行渲染函数,获取组件要渲染的内容,即render函数返回的虚拟DOM
 const subTree = render()
 //最后调用patch函数来挂载组件所描述的内容,即subTree
 patch(null,subTree,container,anchor)
}


