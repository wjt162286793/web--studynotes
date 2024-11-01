//最基础的ref函数
// const ref = (val)=>{
//     //创建一个包裹对象
//     const proxyObj = {
//         value:val
//     }
//     //将这个包裹对象返回出去,作为一个响应式的对象
//     return reactive(proxyObj)
// }


//问题1:区别是否为ref创建
const a1 = ref('wjt')
const a2 = reactive({value:'wjt'})
//从上帝视角看,我们可以分清楚a1和a2谁是ref创建的,但是在reactive函数中,确实无法判断。因为两个值都是{value:'wjt'}
//解决方法:在ref函数中,给定一个标识,让reactive知道这个对象是ref创建出来的
//但是有一点,这个标识是不可以枚举的,也就是只能看不能写的。就好比一个人的性别,你只能去知道,不能去修改。

//给ref增加标识
const ref = (val)=>{
    const proxyObj = {
        value:val
    }
    //给proxyObj对象身上定义一个不可枚举的标识属性isRef,值为true
    Object.defineProperty(proxyObj,'__isRef__',{
        value:true
    })
    return reactive(proxyObj)
}

//vue中有这样的场景
{/* <template>
    <div>{{text}}</div>
</template>
<script>
    export default{
        setup(){
            const text = reactive({value:1})
            setTimeout(() => {
                text.value = 2
            },100);
            return{
                ...text    //导致响应式丢失的原因
            }
        }
       
    }
</script> */}

//return{...text},就返回了一个新的普通对象newObj,而不是响应式对象

//问题:副作用函数内访问的是普通对象,没有响应能力。现在需要做的,就是在副作用函数内,即使通过普通对象来访问newObj,也能够建立联系。

//定义方法toRef,让一个普通对象变成响应式对象
// const toRef = (obj,key)=>{

//     const wrapper = {
//         get value(){   //通过get方法去拦截普通对象的读取操作,指向obj[key]
//            return obj[key]
//         }
//     }
//     return wrapper

// }

// //不过一次只写一个key,对于对象内多个属性就不方便了,可以定义一个toRefs,让所有的属性都可以变成响应式的
// const toRefs = (obj)=>{

//     const ret = {}
//     //使用for...in循环对象,逐个调用toRef方法
//     for(const key in obj){
//         ret[key] = toRef(obj,key)
//     }
//     return ret

// }


//1.为了让reactive方法知道这个对象通过toRef函数调用后已经变成了响应式的数据,需要添加isRef的标识
//2.因为只给toRef定义了get方法,如果进行set操作时,又不具备触发副作用函数的操作,这里还需要再加上set

const toRef = (obj,key)=>{

    const wrapper = {
        get value(){   //通过get方法去拦截普通对象的读取操作,指向obj[key]
           return obj[key]
        },
        set value(val){  //设置set方法
          obj[key] = val
        }
    }
    Object.defineProperty(wrapper,'__isRef',{  //添加isRef的标识
        value:true
    })
    return wrapper

}

//假设一个对象obj是个响应式对象,需要obj.value才能获取值,但是在模板中,我们不需要{{obj.value}},只需要{{obj}}就能获取到值,是因为对ref生成的对象都做了一层处理,让用户不需要.value就可以方便的用

const proxyRefs = (target)=>{
    return new Proxy(target,{
        get(target,key,receiver){
            const value = Reflect.get(target,key,receiver)
            //如果是ref处理的数据,将value.value抛出;如果不是,就是直接抛出value
            return value.__isRef__?value.value:value
        },
        set(target,key,newValue,receiver){
            const value = target[key]
            if(value.__isRef){
                value.value = newValue
                return true
            }
            return Reflect.set(target,key,newValue,receiver)
        }
    })
}

const newObj = proxyRefs({...toRefs(obj)})