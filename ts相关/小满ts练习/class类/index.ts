class Person{
    public name:string    //内外部都可以访问,默认就是public
    private age:number    //私有变量,只能在内部访问,不能在外部访问
    protected love:any    //变量私有的只能在内部和继承子类中访问,不能在外部访问
    static classProp:string = '类的属性'  //只有访问类才可以
    constructor(name:string,ages:number,love:any){
        this.name = name
        this.age = ages
        this.love = love
    }
    run(){

    }
    static static1(){   //static定义的可以通过this调用
        return this.static2()
    }
    static static2(){
        return this.static1()
    }
}

class Man extends Person{
    constructor(){
        super('wjt',19,()=>{console.log('打lol')})
    }
    create(){
        console.log(this.love)
    }
}
let wjt = new Person('王惊涛',29,()=>{console.log('写代码')})
let man = new Man()
console.log(wjt,'wjt')
console.log(man,'man')
console.log(Person.classProp,'类的方法')


interface PersonClass1{
    get(type:boolean):boolean
}
interface PersonClass2{
    set():void
    asd:string
}

class A{
    name:string
    constructor(){
        this.name = 'wjt'
    }
}
class PersonClass extends A implements PersonClass1,PersonClass2{
    asd:string
    constructor(){
        super()
        this.asd = 'wjt'
    }
    get(type:boolean){
        return type
    }
    set(){

    }
}
