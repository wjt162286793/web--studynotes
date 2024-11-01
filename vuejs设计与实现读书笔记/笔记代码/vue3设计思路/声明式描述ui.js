//使用js对象描述dom
const title = {
    tag:'h1',
    props:{
        onclick:clickHandler
    },
    children:[
        {
            tag:'span',
            text:'我是'
        },
        {
            tag:'a',
            text:'王惊涛'
        }
    ]
}
//html结构
//<h1 onclick="clickHandler"><span>我是</span><a>王惊涛</a></h1>



//js描述对象
let level = 2
const hTitle = {
    tag:`h${level}`   //h2标签
}
//穷举去匹配
//<h1 v-if="level === 1"></h1>
//<h2 v-else-if="level === 2"></h2>
//...
//<h6 v-else-if="level === 6"></h6>


import {h} from 'vue'
export default {
    render(){
        return h('h1',{onclick:clickHandler})   //虚拟dom
    }
}