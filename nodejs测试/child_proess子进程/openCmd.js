const child_process = require('child_process')
const path = require('path')
child_process.execFile(path.resolve(process.cwd(),'./index.cmd'),null,(err,stdout)=>{
    console.log(stdout.toString())
})
