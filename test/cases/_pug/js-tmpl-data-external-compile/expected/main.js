(()=>{var e={323:e=>{function t(e){var t=""+e,n=r.exec(t);if(!n)return e;var a,i,o,u="";for(a=n.index,i=0;a<t.length;a++){switch(t.charCodeAt(a)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 60:o="&lt;";break;case 62:o="&gt;";break;default:continue}i!==a&&(u+=t.substring(i,a)),i=a+1,u+=o}return i!==a?u+t.substring(i,a):u}var r=/["&<>]/,n={title:{create:e=>`My '${e}' title!`},a:"abc",b:123};e.exports=e=>function(e){var r,n="",i=e||{};return function(e,a,i){n=n+"<h1>Title: "+t(null==(r=i.create("customized"))?"":r)+"</h1><div>Param[a]: "+t(null==(r=e)?"":r)+"</div><div>Param[b]: "+t(null==(r=a)?"":r)+"</div>"}.call(this,"a"in i?i.a:"undefined"!=typeof a?a:void 0,"b"in i?i.b:"undefined"!=typeof b?b:void 0,"title"in i?i.title:"undefined"!=typeof title?title:void 0),n}(Object.assign({},n,e))}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=r(323),t=r.n(e);document.getElementById("root").innerHTML=t()({b:987}),console.log(">> main")})()})();