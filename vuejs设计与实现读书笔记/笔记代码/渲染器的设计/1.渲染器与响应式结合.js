//渲染器函数
const renderer = (domString,container) =>{
    container.innerHTML = domString
}
//应用
const user_name = 'wjt'
renderer(`<h1>Hello ${user_name}</h1>`,document.querySelector('#app'))


//@vue/reactivity包地址:  https://unpkg.com/@vue/reactivity@3.0.5/dist/reactivity.global.js

//一段完整的应用代码:
//引入@vue/reactivity,就会得到VueReactivity对象
 const { effect, ref } = VueReactivity

 function renderer(domString, container) {
   container.innerHTML = domString
 }

 const count = ref(1)

 effect(() => {
   renderer(`<h1>${count.value}</h1>`, document.getElementById('app'))
 })

 count.value++

 