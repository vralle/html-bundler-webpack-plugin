(()=>{"use strict";var e={480:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const{round:r,floor:n,max:i}=Math,l=e=>{let[,t]=/([a-f\d]{3,6})/i.exec(e)||[],r=t?t.length:0;if(3===r)t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2];else if(6!==r)return[0,0,0];let n=parseInt(t,16);return[n>>16&255,n>>8&255,255&n]},o=(e,t,n)=>e===t&&t===n?e<8?16:e>248?231:r((e-8)/247*24)+232:16+36*r(e/51)+6*r(t/51)+r(n/51),g=e=>{let t,l,o,g,s,a;return e<8?30+e:e<16?e-8+90:(e>=232?t=l=o=(10*(e-232)+8)/255:(a=(e-=16)%36,t=n(e/36)/5,l=n(a/6)/5,o=a%6/5),g=2*i(t,l,o),0===g?30:(s=30+(r(o)<<2|r(l)<<1|r(t)),2===g?s+60:s))},s=(e,t,r)=>g(o(e,t,r)),a=(()=>{const e=e=>!!g.find((t=>e.test(t))),t=globalThis,r=t.Deno,n=null!=r,i=t.process||r||{},l=i.stdout,o="win32"===(n?r.build.os:i.platform),g=i.argv||i.args||[];let s=i.env||{},a=-1;if(n)try{s=s.toObject()}catch(e){a=0}const b="FORCE_COLOR",c=s[b],u=parseInt(c),d="false"===c?0:isNaN(u)?3:u,h="NO_COLOR"in s||0===d||e(/^-{1,2}(no-color|color=(false|never))$/),p=b in s&&d||e(/^-{1,2}color=?(true|always)?$/),f=(s.NEXT_RUNTIME||"").indexOf("edge")>-1||"PM2_HOME"in s&&"pm_id"in s||(n?r.isatty(1):l&&"isTTY"in l);return h?0:(a<0&&(a=((e,t,r)=>{const{TERM:n,COLORTERM:i}=e;return"TF_BUILD"in e?1:"TEAMCITY_VERSION"in e?2:"CI"in e?["GITHUB_ACTIONS","GITEA_ACTIONS"].some((t=>t in e))?3:1:!t||/-mono|dumb/i.test(n)?0:r||"truecolor"===i||"24bit"===i||"xterm-kitty"===n?3:/-256(colou?r)?$/i.test(n)?2:/^screen|^tmux|^xterm|^vt[1-5][0-9]([0-9])?|^ansi|color|cygwin|linux|mintty|rxvt/i.test(n)?1:3})(s,f,o)),p&&0===a?3:a)})(),b=a>0,c={open:"",close:""},u=b?(e,t)=>({open:`[${e}m`,close:`[${t}m`}):()=>c,d=39,h=49,p=e=>(t,r,n)=>e(o(t,r,n)),f=e=>t=>{let[r,n,i]=l(t);return e(r,n,i)};let y=e=>u(`38;5;${e}`,d),B=e=>u(`48;5;${e}`,h),_=(e,t,r)=>u(`38;2;${e};${t};${r}`,d),x=(e,t,r)=>u(`48;2;${e};${t};${r}`,h);1===a?(y=e=>u(g(e),d),B=e=>u(g(e)+10,h),_=(e,t,r)=>u(s(e,t,r),d),x=(e,t,r)=>u(s(e,t,r)+10,h)):2===a&&(_=p(y),x=p(B));let O,m,v={ansi256:y,bgAnsi256:B,fg:y,bg:B,rgb:_,bgRgb:x,hex:f(_),bgHex:f(x),visible:c,reset:u(0,0),inverse:u(7,27),hidden:u(8,28),bold:u(1,22),dim:u(2,22),italic:u(3,23),underline:u(4,24),strikethrough:u(9,29),strike:u(9,29),grey:u(90,d),gray:u(90,d),bgGrey:u(100,h),bgGray:u(100,h)},w=["black","red","green","yellow","blue","magenta","cyan","white"],T="Bright",$=30;for(O of w)m="bg"+O[0].toUpperCase()+O.slice(1),v[O]=u($,d),v[O+T]=u($+60,d),v[m]=u($+10,h),v[m+T]=u($+70,h),$++;const{defineProperty:R,defineProperties:C,setPrototypeOf:I}=Object,k=/[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,M=/(\r?\n)/g,E={},A=({_p:e},{open:t,close:r})=>{const n=(e,...t)=>{if(!e)return"";let r=n._p,{_a:i,_b:l}=r,o=e.raw?String.raw(e,...t):""+e;if(o.includes(""))for(;r;){let e,t,n=r.close,i=r.open,l=n.length,g="";if(l){for(e=0;~(t=o.indexOf(n,e));e=t+l)g+=o.slice(e,t)+i;e&&(o=g+o.slice(e))}r=r._p}return o.includes("\n")&&(o=o.replace(M,l+"$1"+i)),i+o+l};let i=t,l=r;return e&&(i=e._a+t,l=r+e._b),I(n,N),n._p={open:t,close:r,_a:i,_b:l,_p:e},n.open=i,n.close=l,n},G=function(){const e=e=>""+e;return e.isSupported=()=>b,e.strip=e=>e.replace(k,""),e.extend=t=>{for(let e in t){let r=t[e],n=typeof r,i="string"===n?_(...l(r)):r;E[e]="function"===n?{get(){return(...e)=>A(this,r(...e))}}:{get(){let t=A(this,i);return R(this,e,{value:t}),t}}}N=C({},E),I(e,N)},e.extend(v),e};let N;const P=new G;e.exports=P,e.exports.Ansis=G}},t={},r=function r(n){var i=t[n];if(void 0!==i)return i.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,r),l.exports}(480);const{ansi256:n,fg:i,bgAnsi256:l,bg:o,rgb:g,bgRgb:s,hex:a,bgHex:b,reset:c,inverse:u,hidden:d,visible:h,bold:p,dim:f,italic:y,underline:B,strikethrough:_,strike:x,black:O,red:m,green:v,yellow:w,blue:T,magenta:$,cyan:R,white:C,grey:I,gray:k,blackBright:M,redBright:E,greenBright:A,yellowBright:G,blueBright:N,magentaBright:P,cyanBright:S,whiteBright:H,bgBlack:L,bgRed:U,bgGreen:Y,bgYellow:j,bgBlue:D,bgMagenta:F,bgCyan:W,bgWhite:q,bgGrey:V,bgGray:X,bgBlackBright:Z,bgRedBright:z,bgGreenBright:J,bgYellowBright:K,bgBlueBright:Q,bgMagentaBright:ee,bgCyanBright:te,bgWhiteBright:re}=r;console.log("cli: ",m.bold.underline`red bold underline`)})();