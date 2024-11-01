function extractQuestions(text) {  
    // 使用正则表达式匹配所有[QUESTION]...[/QUESTION]之间的内容  
    // 注意：\[ 和 \] 用于转义 [ 和 ]  
    const regex = /\[QUESTION\](.*?)\[\/QUESTION\]/g;  
    let matches = [];  
    let match;  
  
    // 执行全局搜索  
    while ((match = regex.exec(text)) !== null) {  
        // match[1] 是第一个（也是这里唯一的）捕获组的内容  
        matches.push(match[1]);  
    }  
  
    return matches;  
}  
  
// 示例  
const text = "这是一个示例文本。[QUESTION]这是第一个问题[/QUESTION] 接着是另一个。[QUESTION]这是第二个问题[/QUESTION]";  
const questions = extractQuestions(text);  
console.log(questions); // 输出: ["这是第一个问题", "这是第二个问题"]