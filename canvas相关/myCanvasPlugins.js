/** 生成canvas的类 */
class CanvasPlugin{
    constructor(){
        this.instance = (id,nodeInfo)=>{
             const node =  document.querySelector(id)
             node.setAttribute('width',nodeInfo.width)
             node.setAttribute('height',nodeInfo.height)
             node.draw = this.draw
             return node
        }
    }
    draw(list){
        let useDataList= []
        list.forEach(item=>{
            let node = null
            switch(item.type){
             case 'rect':
               node = new Rect(item.nodeName,item.x,item.y,item.width,item.height,item.styleType,item.strokeStyle,item.fillStyle,item.event)
             break
             case 'arc':
               node = new Arc(item.nodeName,item.x,item.y,item.radius,item.start,item.end,item.direction,item.styleType,item.strokeStyle,item.fillStyle,item.event)
            }
            useDataList.push(node)
        })
        console.log(this,'???this---')
        useDataList.forEach(item=>{
            item.drawFun(this)
        })
    }
}

/** 生成矩形的类 */
class Rect{
    constructor(nodeName,x,y,width,height,styleType,strokeStyle,fillStyle,event) {
        this.type = 'rect'
        this.nodeName = nodeName
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.styleType = styleType
        this.strokeStyle = strokeStyle
        this.fillStyle = fillStyle
        this.event = event
    }
    drawFun(canvasNode){
        const ctx = canvasNode.getContext('2d')
        let eventKeyList = Object.keys(this.event)
        let fn = (ctx,canvasPosition,$event,event)=>{
            ctx.beginPath()
            ctx[this.type](this.x,this.y,this.width,this.height)
            ctx[`${this.styleType}Style`] = this[[`${this.styleType}Style`]]
            ctx[`${this.styleType}`]()
            ctx.closePath()
            if(canvasPosition){
                const isBeTrigger = ctx.isPointInPath(canvasPosition.x, canvasPosition.y)
                if (isBeTrigger === true) {
                    event()
                }
            }
        }
        fn(ctx)
        commonEventHandler(ctx,eventKeyList,canvasNode,fn,this.event)
    }
}

/** 生成圆形的类*/
class Arc{
constructor(nodeName,x,y,radius,start,end,direction,styleType,strokeStyle,fillStyle,event){
         this.type = 'arc'
         this.nodeName = nodeName
         this.x = x
         this.y = y
         this.radius = radius
         this.start = start
         this.end = end
         this.direction = direction
         this.styleType = styleType
         this.strokeStyle = strokeStyle
         this.fillStyle = fillStyle
         this.event = event
    }
    drawFun(canvasNode){
        const ctx = canvasNode.getContext('2d')
        let eventKeyList = Object.keys(this.event)
        let fn = (ctx,canvasPosition,$event,event)=>{
            ctx.beginPath()
            ctx[this.type](this.x,this.y,this.radius,[Math.PI/180]*this.start,[Math.PI/180]*this.end,this.direction)
            ctx[`${this.styleType}Style`] = this[[`${this.styleType}Style`]]
            ctx[`${this.styleType}`]()
            ctx.closePath()
            if(canvasPosition){
                const isBeTrigger = ctx.isPointInPath(canvasPosition.x, canvasPosition.y)
                if (isBeTrigger === true) {
                    event()
                }
            }
        }
        fn(ctx)
        commonEventHandler(ctx,eventKeyList,canvasNode,fn,this.event)
    }
}

/**
 * @function 公共方法
 * @description 给画布添加dom事件监听,并且会绘制该节点。canvas中元素的事件绑定和触发不同于常规的dom
 * @author 王惊涛
 * @param ctx 可操作做的画布实例
 * @param eventKeyList 事件属性列表:例如['click','mouseover']
 * @param canvasNode canvas的dom元素,这里主要用于判定canvas节点的具体位置
 * @param fn 当前节点的绘制函数,定义在类中
 * @param event 用户根据当前目标自定义的事件
*/
function commonEventHandler(ctx,eventKeyList,canvasNode,fn,event){
    eventKeyList.forEach(item=>{
        canvasNode.addEventListener(item,($event)=>{
          let position = canvasNode.getBoundingClientRect()
          let canvasPosition = {
            x: $event.clientX - position.left,
            y: $event.clientY - position.top
          }
          fn(ctx,canvasPosition,$event,event[item])
        })
    })
}