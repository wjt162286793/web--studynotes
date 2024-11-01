//组件的实例本质上就是一个状态集合(对象),维护着组件运行过程中的所有信息。

function mountComponent(vnode,container,anchor){
   
    const componentOptions = vnode.type
    const {render,data} = componentOptions

    const state = reactive(data())
    //定义组件实例,一个组件实例本质上就是一个对象,包含了与组件相关的所有状态信息
    const instance = {
        //组件自身的状态数据,即data
        state,
        //表示组件是否被挂载,初始值为false
        isMounted:false,
        //组件所渲染的内容
        subTree:null
    }

    //将组件实例设置到vnode上,用于后续更新
    vnode.component = instance

    effect(()=>{
        //调用组件的渲染函数,获得子树
        const subTree = render.call(state,state)
        //检查组件是否已经被挂载
        if(!instance.isMounted){
            //初次挂载,调用patch函数第一个参数传递null
            patch(null,subTree,container,anchor)
            //终重点:将组件实例的isMounted设置为true,这样当更新发生时就不会再次进行挂载操作,而是会执行更新
            instance.isMounted = true
        }else{
            //当isMounted为true时,说明组件已经被挂载,只需要完成自更新即可
            //所以在调用patch函数时,第一个参数为组件上一次渲染的子树
            //需要使用新的子节点树对上一次渲染的子节点树进行更换补丁
            patch(instance.subTree,subTree,container,anchor)
        }
        //更新组件实例的子树
        instance.subTree = subTree
    },{scheduler:queueJob})
}

//组件实例的instance.isMounted可以区分组件的挂载和更新。所以可以在适当的时机调用组件对应的生命周期钩子

function mountComponent(vnode,container,anchor){
    const componentOptions = vnode.type
    //从组件选项对象中取得组件的生命周期函数
    const { render,data,beforeCreate,created,beforeMount,mounted,beforeUpdate,updated }  = componentOptions

    //调用beforeCreate钩子
    beforeCreate && beforeCreate()

    const state = reactive(data())
    const instance = {
        state,
        isMounted:false,
        subTree:null
    }
    vnode.component = instance
    //在这里调用created钩子
    created && created.call(state)

    effect(()=>{
        const subTree = render.call(state,state)
        if(!instance.isMounted){
            //在这里调用beforeMount钩子
            baforeMount && beforeMount.call(state)
            patch(null,subTree,container,anchor)
            instance.isMounted = true
            //在这里调用mounted钩子
            mounted && mounted.call(state)
        }else{
            //在这里调用beforeUpdate钩子
            beforeUpdate && beforeUpdate.call(state)
            patch(instance.subTree,subTree,container,anchor)
            //在这里调用updated钩子
            updated && updated.call(state)
        }
        instance.subTree = subTree
    },{scheduler:queueJob})
}