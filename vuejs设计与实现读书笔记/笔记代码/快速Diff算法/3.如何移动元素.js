//moved变量为true时,需要进行移动操作

if (moved) {
   const seq = lis(sources)

   // s 指向最长递增子序列的最后一个元素
   let s = seq.length - 1
   let i = count - 1
   for (i; i >= 0; i--) {
     if (source[i] === -1) {
       // 省略部分代码
     } else if (i !== seq[s]) {
       // 说明该节点需要移动
       // 该节点在新的一组子节点中的真实位置索引
       const pos = i + newStart
       const newVNode = newChildren[pos]
       // 该节点的下一个节点的位置索引
       const nextPos = pos + 1
       // 锚点
       const anchor = nextPos < newChildren.length
         ? newChildren[nextPos].el
         : null
       // 移动
       insert(newVNode.el, container, anchor)
     } else {
       // 当 i === seq[s] 时，说明该位置的节点不需要移动
       // 并让 s 指向下一个位置
       s--
     }
   }
 }


  function lis(arr) {
   const p = arr.slice()
   const result = [0]
   let i, j, u, v, c
   const len = arr.length
   for (i = 0; i < len; i++) {
     const arrI = arr[i]
     if (arrI !== 0) {
       j = result[result.length - 1]
       if (arr[j] < arrI) {
         p[i] = j
         result.push(i)
         continue
       }
       u = 0
       v = result.length - 1
       while (u < v) {
         c = ((u + v) / 2) | 0
         if (arr[result[c]] < arrI) {
           u = c + 1
         } else {
           v = c
         }
       }
       if (arrI < arr[result[u]]) {
         if (u > 0) {
           p[i] = result[u - 1]
         }
         result[u] = i
       }
     }
   }
   u = result.length
   v = result[u - 1]
   while (u-- > 0) {
     result[u] = v
     v = p[v]
   }
   return result
 }