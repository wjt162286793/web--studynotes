//vue中模板写法
/**
<template>
  <div @click="clickHandler">
   我是王惊涛
  </div>   
</template>
<script>
  export default{
  data(){return{}},
  methods:{}
  }
</script>
*/

//通过编译后,最终运行的代码
export default{
    data(){return{}},
    methods:{},
    render(){
        return history('div',{onclick:clickHandler},'我是王惊涛')
    }
}