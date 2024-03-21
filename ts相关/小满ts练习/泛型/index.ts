//函数泛型
function fun1 (str:string,num:number):Array<string>{
    return [str,`${num}`]
}

//泛型优化
function fun2<S>(str1:S,str2:S):Array<S>{
    return [str1,str2]
}
fun2<string>('字符串1','字符串2')

function fun3<T>(a: T, b: T): Array<T>  {
    return [a,b]
}
fun3<number>(1,2)
fun3<string>('1','2')

function fun4<T,U>(a:T,b:U):Array<T|U> {
    const params:Array<T|U> = [a,b]
    return params
}
fun4<Boolean,number>(false,1)

//定义泛型接口
interface Interface1<S>{
    (arg:S):S
}
function fun5<S>(arg:S):S{
    return arg
}
let result1:Interface1<number> = fun5
result1(123)
let result2:Interface1<string> = fun5
result2('wjt')

//对象字面量泛型
let obj1:{<T>(arg:T):T}
obj1 = function<T>(arg:T):T{
    return arg
}
obj1(123)

//泛型约束
interface Len{
    length:number
}
function getLength<T extends Len>(arg:T){
    return arg.length
}
getLength<string>('123')

//使用keyof约束对象
function prop<T,K extends keyof T>(obj:T,key:K){
    return obj[key]
}
let o = {a:1,b:2,c:3}
prop(o,'a')

//泛型类
class Sub<T>{
    attr:T[] = []
    add(a:T) : T[]{
        return [a]
    }
}
let sub1 = new Sub<number>()
sub1.attr = [1,2,3]
sub1.add(123)

let sub2 = new Sub<string>()
sub2.attr = ['1','2','3']
sub2.add('123')