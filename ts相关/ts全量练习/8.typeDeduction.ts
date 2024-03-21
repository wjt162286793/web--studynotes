//定义普通变量时自动推导
let num = 3
let str = 'wjt'
let gender = false
let arr = [1,'wjt',{name:'wjt'},true]

interface Family{
    name:string,
    type:string
}
class Father{
    name = null
    type = null
    constructor(name,type){
       this.name = name
       this.type = type
    }
}
class Mother{
    name = null
    type = null
    constructor(name,type){
       this.name = name
       this.type = type
    }
}
class Kid{
    name = null
    type = null
    constructor(name,type){
       this.name = name
       this.type = type
    }
}
function createFamily():Family[]{
    return [new Father('夏东海','爸爸'),new Mother('刘梅','妈妈'),new Kid('刘星','儿子')]
}