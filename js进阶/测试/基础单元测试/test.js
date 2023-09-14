//功能函数
let addFun = (val1,val2)=>{return val1+val2}
let numberFun = (value)=>{
    return value>0
}
let errorFun = (value)=>{
   try{
    let a = b
    return a
   }catch(err){
    console.log(err)
    return false
   }
}


//测试方法
test('addFun方法测试',()=>{
    expect(addFun(1,2)).toBe(3)
}) 
test('numberFun方法测试',()=>{
    expect(numberFun(10)).toBe(true)
})
test('errorFun方法测试',()=>{
    expect(errorFun(null)).toBe(true)
    // expect(errorFun(null)).toBe(false)
})