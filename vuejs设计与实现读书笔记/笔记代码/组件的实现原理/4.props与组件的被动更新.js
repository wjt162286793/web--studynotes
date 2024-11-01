//在虚拟DOM层面,组件的props与普通HTML标签的属性差别不不大。

// 假设有如下模板
{/* <MyComponent title="A Big Title" :other="val"></MyComponent> */}

//对应的虚拟DOM是
const vnode = {
    type:myComponent,
    props:{
        title:'A big Title',
        other:this.val
    }
}

const MyComponent = {
    name:'MyComponent',
    //组件接受名为title的props,并且该props的类型为String
    props:{
        title:String
    },
    render(){
        return {
            type:div,
            children:`props data`  //访问props数据
        }
    }
}

// 对于一个组件来说,有两部分关于props的内容需要关心
//为组件传递的props数据,即组件的vnode.props对象
//组件选项中定义的props选项,即MyComponent.props对象

function mountComponent(vnode,container,anchor){
    const componentOptions = vnode.type
    //从组件选项对象中取出props定义,即propsOption
    const {render,data,props:propsOption,beforeCreate/*其他属性*/} = componentOptions
    beforeCreate && beforeCreate()
    const state = reactive(data())
    //调用resolveProps函数解析出最终的props数据与attrs数据
    const [props,attrs] = resolveProps(propsOption,vnode.props)

    const instance = {
        state,
        //将解析出的props数据包装为shallowReactive并定义到组件实例上
        props:shallowReactive(props), 
        isMounted:false,
        subTree:null
    }
    vnode.component = instance
    //省略部分代码

}

//resolveProps函数用于解析组件props和attrs数据
function resolveProps(options,propsData){
    const props = {}
    const attrs = {}
    for(const key in propsData){
        if(key in options){
            //如果为组件传递的props数据在组件自身的props选项中有定义,则将其视为合法的props
            props[key] = propsData[key]
        }else{
            //否则将其视为attrs
            attrs[key] = propsData[key]
        }
    }
    //最后返回props与attrs数据
    return [props,attrs]
}


//没有定义在MyComponent.props选项的props数据将存储到attrs对象中

// 处理完props数据后,需要关注props数据变化的问题
//props的值发生变化时,父组件的渲染函数会重新执行,也会产生新的虚拟DOM。
//接下来,组件会进行自更新。在更新过程中,渲染器发现父组件的subTree包含组件类型的虚拟节点,所以会调用patchComponent函数完成子组件的更新

function patch(n1,n2,container,anchor){
    if(n1 && n1.type !== n2.type){
        unmount(n1)
        n1 = null
    }
    const {type} = n2
    if(typeof type === 'string'){
        //文本类型节点
    }else if(type === Fragment){
        //Fragment类型节点
    }else if(typeof type === 'object'){
        //vnode.type的值是选项对象,作为组件来处理
        if(!n1){
            mountComponent(n2,container,anchor)
        }else{
            //更新组件
            patchComponent(n1,n2,anchor)
        }
    }
}

//因为父组件的更新导致子组件的更新称之为子组件的被动更新,当子组件被动更新时,需要做的是:
//1.检测子组件是否真的需要更新,因为子组件的props可能是不变的。
//2.如果需要更新,更新子组件的props及solts等

function patchComponent(n1,n2,anchor){
    //获取组件实例,即n1.component,同时让新的组件虚拟节点n2.component也指向组件实例
    const instance = (n2.component = n1.component)
    //获取当前的props数据
    const {props} = instance
    //调用hasPropsChanged检测为子组件传递的props是否发生变化,如果没有变化,则不需要更新
    if(hasPropsChanged(n1.props,n2.props)){
        //调用resolveProps函数重新获取props数据
        const [nextProps] = resolveProps(n2.type.props,n2.props)
        //更新props
        for(const k in nextProps){
            props[k] = nextProps[k]
        }
        //删除不存在的props
        for(const k in props){
            if(!(k in nextProps)){
                delete props[k]
            }
        }
    }
}

//长度不同或者属性键值对不上,就是发生了变化
function hasPropsChanged(prevProps,nextProps){
  const nextKeys = Object.keys(nextProps)
  //如果新旧props的数量变了,则说明有变化
  if(nextKeys.length !== Object.keys(prevProps.length)){
    return true
  }
  for(let i = 0;i<nextKeys.length;i++){
    const key = nextKeys[i]
    //有不相等的props,则说明有变化
    if(nextProps[key] !== prevProps[key]){
        return true
    }
  }
  return false
}


//由于props数据和组件自身的状态数据都是需要暴露到渲染函数中,并使得渲染函数能够通过this访问,因此需要封装一个渲染上下文对象

function mountComponent(vnode,container,anchor){
    //省略部分代码
    const instance = {
        state,
        props:shallowReactive(props),
        isMounted:false,
        subTree:null
    }

    vnode.component = instance

    //创建渲染上下文对象,本质上是组件实例的代理
    const renderContext = new Proxy(instance,{
        get(t,k,r){
            //取得组件自身状态与props数据
            const {state,props} = t
            //先尝试读取自身状态数据
            if(state && k in state){
                return state[k]
            }else if(k in props){
                //如果自身没有该数据,从props中读取
                return props[k]
            }else{
                console.error('该属性不存在')
            }
        },
        set(t,k,v,r){
            const { state,props} = t
            if(state && k in state){
                state[k] = v
            }else if(k in props){
               console.warn('该属性为只读')
            }else{
                console.error('不存在')
            }
        }
    })
}