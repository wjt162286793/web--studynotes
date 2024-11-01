//创建渲染器函数
// const createRenderer = ()=>{
//     //渲染函数
//     function render(vnode,container){
//     }
//     return render
// }

//调用
const vnode = `<p>旧元素</p>`
const new_vnode = `<p>新元素</p>`
const renderer = createRenderer()
//首次渲染
renderer.render(vnode,document.querySelector('#app'))
//再次渲染
renderer.render(new_vnode,document.querySelector('#app'))


//更新节点
const createRenderer = ()=>{
    
    //更新替换节点操作的函数
    function patch(oldvnode,vnode,container){
      
    }

    function render(vnode,container){
        //container:真实的容器,container._vnode:旧node,vnode:新vnode
        if(vnode){
            //如果出现了新的vnode,将新vnode和旧vnode传递狗patch函数,进行更新操作
            patch(container._vnode,vnode,container)
        }else{
            //旧vnode存在,但是新vnode不存在,就等于这里已经没有了
            if(container._vnode){
                //清空vnode
                container.innerHTML = ''
            }
        }
        //把vnode存储到container上,下次在被调用就是oldvnode
        container._vnode = vnode
    }
    return render
}