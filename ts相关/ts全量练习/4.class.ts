//public  //公共的
class Class_1{
    public person_name:string
    public constructor(name:string){
        this.person_name = name
    }
    public love(val){
        console.log(`我喜欢${val}`)
    }
}
let class_var_1 = new Class_1('wjt1')
console.log(class_var_1,'class_var_1')
console.log(class_var_1.person_name,'class_var_1的person_name名称')

//private,变量私有
class Class_2{
    private person_name:string
    constructor(name:string){
        this.person_name = name
    }
}
let class_var_2 = new Class_2('wjt2')
console.log(class_var_2,'class_var_2')
// console.log(class_var_2.person_name)  //error

//protected  变量私有
class Class_3{
    protected person_name:string
    constructor(name:string){
        this.person_name = name
    }
}
class Class_4 extends Class_3{
    private self_var:string
    constructor(name:string,self_var:string){
        super(name)
        this.self_var = self_var
    }
    public love(val){
        return '我喜欢'+val
    }
}
let class_var_4 = new Class_4('wjt4','自定义数据')
console.log(class_var_4,'class_var_4')
// console.log(class_var_4.person_name) error
// console.log(class_var_4.self_var)  error
console.log(class_var_4.love('打游戏'))

//readonly 只读
class Class_5{
    readonly person_name:string
    age:number
    constructor(name:string,age:number){
        this.person_name = name
        this.age = age
    }
}
let class_var_5 = new Class_5('wjt5',28)
console.log(class_var_5,'class_var_5')
class_var_5.age = 29
// class_var_5.person_name = 'wjt' //error


//存取器
let person_name_wjt:string = 'wangjingtao'  //匹配上了
// let person_name_wjt:string = 'wjt'  //不匹配
class Class_6{
    private _person_name:string
    get person_name():string{
        return this._person_name
    }
    set person_name(newName:string){
        if(person_name_wjt && person_name_wjt === 'wangjingtao'){
            console.log('匹配上了')
            this._person_name = newName
        }else{
            console.log('不匹配')
        }
    }
}
let class_var_6 = new Class_6()
console.log(class_var_6 ,'class_var_6')  //person_name这个时候还是undefined
class_var_6.person_name = 'wjt'
if(class_var_6.person_name){
    console.log('值存在')
}

//静态属性
interface obj_1{
    name:string
    age:number
    love:string
}
class Class_7{
    static person_info = {love:'game'}
    changeInfo(info:{name:string,age:number}){
        let new_info:obj_1 = {
            name:null,
            age:null,
            love:null
        }
        new_info.name = 'wangjingtao'
        new_info.age = info.age+this.var_age
        new_info.love = Class_7.person_info.love
        return new_info
    }
    constructor(public var_age:number){
        
    }
}
let class_person_1 = new Class_7(1)
let class_person_2 = new Class_7(2)
console.log(class_person_1.changeInfo({name:'wjt',age:28}),class_person_1,'class_person_1')
console.log(class_person_1.changeInfo({name:'wjt',age:29}),class_person_2,'class_person_2')

//抽象类
abstract class Class_8{
    constructor(public name:string,public age:number){
      
    }
    getName(){
        return this.name
    }
    abstract getAge():number
}

class Class_9 extends Class_8{
    constructor(){
        super('wjt',28)
    }
    getInfo():void{
        console.log({name:'哈哈哈',age:this.age})
    }
    getAge(){
        return this.age
    }
}
// let class_8 = new Class_9()  //error
let class_8 : Class_8

let class_9 = new Class_9()
class_9.getName()
class_9.getAge()
class_9.getInfo()


//类当接口使用
class Class_10{
    person_name:string
    age:number
}

interface interfaceWithClass extends Class_10{
  love:Function
}

let person_wjt:interfaceWithClass = {person_name:'wjt',age:28,love:()=>'game'}
console.log(person_wjt,'person_wjt')

