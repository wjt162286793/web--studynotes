let obj = {value:'wjt',get name(){return this.value}}
console.log(obj.name,'直接访问')
console.log(Reflect.get(obj,'name'),'通过Relfect访问')

console.log(Reflect.get(obj,'name',{value:'王惊涛'}),'写入第三个参数receiver---{value:王惊涛}')


//代理
const data = {name:'王惊涛'}
const _data = new Proxy(data,{
    get(target,key,receiver){
        track(target,key)
        return Reflect.get(target,key,receiver)   //使用Reflect.get返回读取到的属性值
    }
})
const track = ()=>{
  /** */
}



