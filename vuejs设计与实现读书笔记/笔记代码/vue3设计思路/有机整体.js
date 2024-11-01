//有这样一个模板
/** 
 <div id="box" :class="className"></div>
*/

// 通过编译器在vue中会生成这样的一个函数
data(){
    return{
  className:null
}
}
render(){
  return {
    tag:'div',
    props:{
        id:'box',  //固定不变的
        class:className  //动态变量
    }
  }
}
