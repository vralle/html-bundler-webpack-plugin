(()=>{var e,r,t,o={},n={};function i(e){var r=n[e];if(void 0!==r)return r.exports;var t=n[e]={exports:{}};return o[e](t,t.exports,i),t.exports}i.m=o,i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(t,o){if(1&o&&(t=this(t)),8&o)return t;if("object"==typeof t&&t){if(4&o&&t.__esModule)return t;if(16&o&&"function"==typeof t.then)return t}var n=Object.create(null);i.r(n);var a={};e=e||[null,r({}),r([]),r(r)];for(var c=2&o&&t;"object"==typeof c&&!~e.indexOf(c);c=r(c))Object.getOwnPropertyNames(c).forEach((e=>a[e]=()=>t[e]));return a.default=()=>t,i.d(n,a),n},i.d=(e,r)=>{for(var t in r)i.o(r,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,t)=>(i.f[t](e,r),r)),[])),i.u=e=>e+".js",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t={},i.l=(e,r,o,n)=>{if(t[e])t[e].push(r);else{var a,c;if(void 0!==o)for(var l=document.getElementsByTagName("script"),s=0;s<l.length;s++){var u=l[s];if(u.getAttribute("src")==e){a=u;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.src=e,0!==a.src.indexOf(window.location.origin+"/")&&(a.crossOrigin="anonymous"),a.integrity=i.integrity[n],a.crossOrigin="anonymous"),t[e]=[r];var d=(r,o)=>{a.onerror=a.onload=null,clearTimeout(f);var n=t[e];if(delete t[e],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((e=>e(o))),r)return r(o)},f=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var r=i.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");if(t.length)for(var o=t.length-1;o>-1&&!e;)e=t[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),i.integrity={47:"sha384-IjPFRo6hgCWE5xfqaq/hoyrMvzYM1cVJk/XUJj22VTMN+uEdh9hkuJJ9/noKI5ol",457:"sha384-8hZm5qvvQXkY1YKdyLZe3xFV2X04d9x6ni6SNV3a5AANhIbGB+SNNB7SFCi7A2eJ"},(()=>{var e={179:0};i.f.j=(r,t)=>{var o=i.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else{var n=new Promise(((t,n)=>o=e[r]=[t,n]));t.push(o[2]=n);var a=i.p+i.u(r),c=new Error;i.l(a,(t=>{if(i.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;c.message="Loading chunk "+r+" failed.\n("+n+": "+a+")",c.name="ChunkLoadError",c.type=n,c.request=a,o[1](c)}}),"chunk-"+r,r)}};var r=(r,t)=>{var o,n,[a,c,l]=t,s=0;if(a.some((r=>0!==e[r]))){for(o in c)i.o(c,o)&&(i.m[o]=c[o]);l&&l(i)}for(r&&r(t);s<a.length;s++)n=a[s],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0},t=self.webpackChunk=self.webpackChunk||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();const a=[];new MutationObserver((e=>{for(const{addedNodes:r=[]}of e)for(const e of r)"SCRIPT"===e.nodeName&&e.getAttribute("integrity")&&a.push(e)})).observe(document.querySelector("head"),{childList:!0}),i.e(47).then(i.t.bind(i,47,23)).then((()=>{a.forEach((e=>{const{src:r,integrity:t,crossOrigin:o}=e;let n=r.split("/").pop();const i=document.createElement("p"),a=`Dynamic chunk "${n}" is loaded!`;i.innerHTML=`<h2>${a}</h2><div><b>integrity:</b> ${t}</div><div><b>crossOrigin</b>: ${o}</div>`,document.body.append(i),console.log(`--\x3e ${a}`,e)}))})).catch((e=>{console.log("import chunk error: ",e)})),console.log(">> main")})();