const child_process = require('child_process')
// child_process.exec('node -v',(err,stdout,stderr)=>{
//     if(err){
//         return  err
//     }
//     console.log(stdout.toString())
//  })
child_process.exec('node ./index2.js',(err,stdout,stderr)=>{
    if(err){
        console.log(err)
        return err
    }
    console.log(stdout.toString(),'成功')
})
