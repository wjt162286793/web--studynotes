/*引入第三方包*/
//npm install highlight.js --save

/*封装指令*/
// highlight.js  代码高亮指令
import Vue from 'vue';
import Hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
 
let Highlight = {};
Highlight.install = function (Vue, options) {
    // 先有数据再绑定，调用highlightA
    Vue.directive('highlightA', {
        inserted: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const item = blocks[i];
                Hljs.highlightBlock(item);
            };
        }
    });
 
    // 先绑定，后面会有数据更新，调用highlightB
    Vue.directive('highlightB', {
        componentUpdated: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                const item = blocks[i];
                Hljs.highlightBlock(item);
            };
        }
    });
 
};
 
export default Highlight;

/*注册指令*/
// highlight.js代码高亮指令
import Highlight from '@/utils/highlight';
 
Vue.use(Highlight)

/*页面应用*/

/* <pre v-highlightA>
 <code class="json">{{watch_data}}</code>
 </pre>
 */


 //文章摘自博客:
 //地址: https://code84.com/758592.html