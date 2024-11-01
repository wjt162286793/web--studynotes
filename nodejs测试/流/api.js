const express = require('express');  
const app = express();  
const port = 8002;  


let strArr = [
    '所有人,都得死!',
    '犯我德邦者,虽远必诛!',
    '吾所成之事,不可逆也!',
    '一点寒芒先到,随后枪出如龙!',
    '我的剑就是你的剑!',
    '刀下生,刀下死!'
]
let setTask = null
  
app.get('/events', (req, res) => {  
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');  
  res.setHeader('Cache-Control', 'no-cache');  
  res.setHeader('Connection', 'keep-alive');  
  let num = 0
  setTask =  setInterval(()=>{
    res.write(`data:${strArr[num]}\n\n`)
    num++
    if(num > 5){
        res.write(`data:end\n\n`)
        res.end()
        // res.closed()
        clearInterval(setTask)
        setTask = null
    }
  },1000)
});  
  
app.listen(port, () => {  
  console.log(`${port}端口已启动`);  
});