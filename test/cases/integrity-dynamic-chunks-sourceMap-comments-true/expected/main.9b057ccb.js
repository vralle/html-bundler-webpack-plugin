(()=>{var e,r={},t={};function o(e){var n=t[e];if(void 0!==n)return n.exports;var i=t[e]={exports:{}};return r[e](i,i.exports,o),i.exports}o.m=r,o.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return o.d(r,{a:r}),r},o.d=(e,r)=>{for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((r,t)=>(o.f[t](e,r),r)),[])),o.u=e=>e+".js",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},o.l=(r,t,n,i)=>{if(e[r])e[r].push(t);else{var a,c;if(void 0!==n)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var u=s[l];if(u.getAttribute("src")==r){a=u;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.src=r,0!==a.src.indexOf(window.location.origin+"/")&&(a.crossOrigin="anonymous"),a.integrity=o.integrity[i],a.crossOrigin="anonymous"),e[r]=[t];var d=(t,o)=>{a.onerror=a.onload=null,clearTimeout(p);var n=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((e=>e(o))),t)return t(o)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var r=o.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");if(t.length)for(var n=t.length-1;n>-1&&!e;)e=t[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),o.integrity={src_chunk_js:"sha384-6dyxPFEFjzmUB/7pDK4lrlFUR0/ijHN0+4HpchWiGKnE+TpD43UzCt+5sxlMPXBs"},(()=>{var e={main:0};o.f.j=(r,t)=>{var n=o.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else{var i=new Promise(((t,o)=>n=e[r]=[t,o]));t.push(n[2]=i);var a=o.p+o.u(r),c=new Error;o.l(a,(t=>{if(o.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var i=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;c.message="Loading chunk "+r+" failed.\n("+i+": "+a+")",c.name="ChunkLoadError",c.type=i,c.request=a,n[1](c)}}),"chunk-"+r,r)}};var r=(r,t)=>{var n,i,[a,c,s]=t,l=0;if(a.some((r=>0!==e[r]))){for(n in c)o.o(c,n)&&(o.m[n]=c[n]);s&&s(o)}for(r&&r(t);l<a.length;l++)i=a[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0},t=self.webpackChunk=self.webpackChunk||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();const n=[];new MutationObserver((e=>{for(const{addedNodes:r=[]}of e)for(const e of r)"SCRIPT"===e.nodeName&&e.getAttribute("integrity")&&n.push(e)})).observe(document.querySelector("head"),{childList:!0}),o.e("src_chunk_js").then(o.bind(o,457)).then((()=>{n.forEach((e=>{const{src:r,integrity:t,crossOrigin:o}=e;let n=r.split("/").pop();const i=document.createElement("p"),a=`Dynamic chunk "${n}" is loaded!`;i.innerHTML=`<h2>${a}</h2><div><b>integrity:</b> ${t}</div><div><b>crossOrigin</b>: ${o}</div>`,document.body.append(i),console.log(`--\x3e ${a}`,e)}))})).catch((e=>{console.log("import chunk error: ",e)})),console.log(">> main")})();
//# sourceMappingURL=main.9b057ccb.js.map