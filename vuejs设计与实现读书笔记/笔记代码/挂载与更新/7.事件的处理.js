//在vnode中描述事件

const vnode = {
    type:'p',
    props:{
        onClick:()=>{
            console.log('click p')
        }
    },
    children:'文本'
}

//将事件添加到DOM元素上
/**
 * 
 * @param  el  dom元素 
 * @param  key 属性名
 * @param  preValue  旧值
 * @param  nextValue   新值
 */
function patchProps(el,key,preValue,nextValue){
    if(/^on/.test(key)){
        //截取on获取事件名:onClick->click
        const name = key.slice(2).toLowerCase()  
        //移除上一次绑定的事件处理函数
        preValue && el.removeEventListener(name,preValue)
        //绑定新的事件函数
        el.addEventListener(name,nextValue)
    }else if(key === 'class'){
        //class的处理
    }
    //等等其他属性
}


//虽然上面已经可以完成所需要的功能了,但是作者还是用更优雅的方式去实现了patchProps

 patchProps = (el,key,preValue,nextValue) =>{
    if(/^on/.test(key)){
        //获取为该元素伪造的事件处理函数 invoker
        let invoker = el._vei
        const name = key.slice(2).toLowerCase()  
        if(nextValue){
            if(!invoker){
                //如果没有invoker,则将一个伪造的invoker缓存到el._vei中
                //vei是vue event invoker的首字母缩写
                invoker = el._vei = (e)=>{
                    //当伪造事件处理函数执行时,会执行真正的事件处理函数
                    invoker.value(e)
                }
                //将真正的事件处理函数赋值给invoker.value
                invoker.value = nextValue
                //绑定invoker作为事件处理函数
                el.addEventListener(name,invoker)
            }else{
                //如果invoker存在,意味着更新,并且只需要更新invoker.value的值即可
                invoker.value = nextValue
            }
        }
    }
 }

 //先从 el._vei 中读取对应的 invoker，如果 invoker 不存在，则将伪造的 invoker 作为事件处理函数，并将它缓存到 el._vei 属性中。
 //把真正的事件处理函数赋值给 invoker.value 属性，然后把伪造的 invoker 函数作为事件处理函数绑定到元素上。可以看到，当事件触发时，实际上执行的是伪造的事件处理函数，在其内部间接执行了真正的事件处理函数 invoker.value(e)。



//  更新事件时,由于el._vei已经存在,只需要将invoker.value的值修改为新的事件处理函数即可。这样在更新时间时可以避免调用一次事件的解绑removeEventListener,提升了性能。

// 实际上,伪造函数还可以处理事件冒泡和事件更新相互影响的问题。

// 目前,在el._vei中,一次只能缓存一个事件处理函数,一个元素如果同时绑定了多个事件,比如click和mouseover等,这里就需要对el._vei的格式进行一个修改,将_vei改为一个对象,键是事件名,值是对应的事件处理函数。这样就可以绑定多个事件。

patchProps = (el,key,prevValue,nextValue) =>{
    //事件属性
    if(/^on/.test(key)){
        //不存在就设置为对象属性,存在就赋值
        const invokers = el._vei || (el._vei = {})
        //根据事件名对应键名取值
        let invoker = invokers[key]
        //去除on的事件名,如click
        const name = key.slice(2).toLowerCase()
        if(nextValue){
            if(!invoker){
                //将事件处理函数缓存到el._vei[key]下,避免覆盖
                invoker = el._vei[key] = (e)=>{
                    invoker.value(e)
                }
                invoker.value = nextValue
                el.addEventListener(name,invoker)
            }else{
                invoker.value = nextValue
            }
        }else if(invoker){
            el.removeEventListener(name,invoker)
        }
    }else if(key === 'class'){

    }
    /**其他的else if */
}

//另外,同一个事件操作还可以绑定多个函数,所以在vnode中,props里的对应的事件属性,都应该以数组类型存在

 vnode = {
    type:'p',
    props:{
        onClick:[
            ()=>{console.log('点击事件1')},
            ()=>{console.log('点击事件2')}
        ]
    },
    children:'p标签'
}
rendererReference.render(vnode,document.querySelector('#app'))

//所以,事件数据格式变了,patchProps中也需要改变一下

patchProps = (el,key,prevValue,nextValue) =>{
    //事件属性
    if(/^on/.test(key)){
        const invokers = el._vei || (el._vei = {})
        let invoker = invokers[key]
        const name = key.slice(2).toLowerCase()
        if(nextValue){
            if(!invoker){
                invoker = el._vei[key] = (e)=>{
                    //判断是否为数组
                    if(Array.isArray(invoker.value)){
                        invoker.value.forEach(fn=>fn(e))
                    }else{
                        invoker.value(e)
                    }
                }
                invoker.value = nextValue
                el.addEventListener(name,invoker)
            }else{
                invoker.value = nextValue
            }
        }else if(invoker){
            el.removeEventListener(name,invoker)
        }
    }else if(key === 'class'){

    }
    /**其他的else if */
}
