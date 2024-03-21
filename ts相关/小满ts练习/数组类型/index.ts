//类型
let list1:number[] = [1,2,3]  //每个元素都必须是number类型
let list2:any[] = ['wjt',29,()=>{'jscoder'}]

//数组泛型
let list3:Array<number> = [1,2,3]
let list4:Array<any> = ['wjt',29,()=>'jscoder']

//接口描述数组
interface NumberArray{
    [index:number]:number
}
let list5:NumberArray = [1,2,3,4]  //只要索引类型是数字,值的类型也必须是数字

//多维数组
let list6:number[][] = [[1,2],[3,4]]

//arguments类数组   arguments有专门的接口IArguments
function fn(...args:any){
  let arr:IArguments = arguments
}
fn(1,2,3)

//实际上就是
// interface IArguments{
//     [index:number]:any
//     length:number
//     callee:Function
// }