class class_1{
    str:string
    constructor(val:string){
        this.str= val
    }
    fun_1(){
        let val_1 = "hello"+this.str
        console.log(val_1,'fun_1函数的返回值')
        return val_1
    }
}
let obj_1_ = new class_1("world")
console.log(obj_1_,'对象1')
obj_1_.fun_1()

class class_2{
    move(size:number = 0){
        console.log(`移动了${size}米`)
    }
}
class person extends class_2{
    work(){
        console.log('coder')
    }
}
const wjt = new person()
wjt.work()
wjt.move(10)
wjt.work()