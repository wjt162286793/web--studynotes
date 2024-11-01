//setup主要是配合组合式api,用于创建各种组合逻辑,响应式数据,函数,注册生命周期等。只会在挂载的时候执行一次,返回值有两种:

//1.返回一个函数,该函数将作为组件的render函数

//这种方式通常以模板来表达其渲染内容的情况。如果组件以模板来表达渲染内容,那么setup函数不可以再返回函数,否则会与模板编译生成的渲染函数产生冲突

/**
 * const Comp = {
    setup(){
        //setup函数可以返回一个函数,该函数将作为组件的渲染函数
        return (()=>{
            return {type:'div',children:'hello'}
        })
    }
}
 */


//2.返回一个对象,该对象包含的的数据将暴露给模板使用

/**
 * const Comp = {
    setup(){
      const count = ref(0)
      return {
        count
      }
    },
    render(){
        return {type:'div',children:`count is ${this.count}`}
    }
}
 */


//可以看到,setup函数暴露的数据可以在渲染函数中通过this来访问
//另外,setup函数接两个参数。第一个参数是props数据对象,第二个参数也是一个对象

const Comp = {
    props:{
        foo:String
    },
    setup(props,setupContext){
        props.foo  //访问传入props数据
        //setupContext中包含与组件接口有关的重要数据
        const {solts,emit,attrs,expose} = setupContext
        //...
    }
}

//实现setup组件选项
function mountComponent(vnode,container,anchor){
    //从组件的vnode获取对应的配置
    const componentOptions = vnode.type
    //从组件选项中取出setup函数
    let {render,data,setup,/**其他选项*/} = componentOptions
    //执行组件创建前生命周期钩子
    beforeCreate && beforeCreate()
    //state为经过响应式注册的响应式数据
    const state = data?reactive(data()):null
    //获取组件中的props和attrs等属性
    const [props,attrs] = resolveProps(propsOption,vnode.props)

    //一个组件的综合描述对象,包含组件所有的信息和状态
    const instance = {
        state,
        props:shallowReactive(props),
        isMounted:false,
        subTree:null
    }

    //setupContext,因为目前还没涉及到emit和slots,暂时只把attrs放进去
    const setupContext = {attrs}
    //调用setup函数,将只读版本的props作为第一个参数传递,避免用户意外地修改props值
    //将setupContext作为第二个参数传递
    const setupResult = setup(shallowReadonly(instance.props),setupContext)
    //setupState用来存储由setup返回的数据
    let setupState = null
    //如果setup函数的返回值是函数,则将其作为渲染函数
    if(typeof setupResult === 'function'){
        //存在歧义,报告冲突
        if(render){
            console.error('setup返回的是渲染函数,render选项会被忽略')
        }
        render = setupResult
    }else{
        //如果setup的返回值不是函数,则作为数据状态赋值给setupState
        setupState = setupResult
    }
    //将组件的描述信息对象赋值给vnode中component属性
    vnode.component = instance
    //使用proxy使组件各种状态的读取和修改都可以监测到
    //renderContext也就是我们完成的渲染上下文
    const renderContext = new Proxy(instance,{
        get(target,key,result){
            const {state,props} = target
            if(state && key in state){
                return state[key]
            }else if(key in props){
                return props[key]
            }else if(setupState && key in setupState){
                //渲染上下文需要增加对setupState的支持
                return setupState[key]
            }else{
                console.error('不存在')
            }
        },
        set(target,key,value,result){
            const {state,props} = target
            if(state && key in state){
                state[key] = value
            }else if(key in props){
                console.warn('props的属性是只读')
            }else if(setupState && key in setupState){
                //渲染上下文需要增加对setupState的支持
                setupState[key] = value
            }else{
                console.error('不存在')
            }
        }
    })
}

//上面是setup函数的最小实现,需要注意
//1.setupState是一个对象,目前只存在attrs
//2.根据setup函数的返回值类型决定如何处理。如果返回值为函数,直接作为组件的渲染函数。这里为了避免歧义,需要先检查组件选项中是否已经存在render选项,如果存在,需要打印警告信息
//3.渲染上下文renderContext应该正确的处理setupState,因为setup函数返回的数据状态也应该暴露到渲染环境