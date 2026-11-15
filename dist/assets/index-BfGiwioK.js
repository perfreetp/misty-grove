var bh=Object.defineProperty;var Th=(i,t,e)=>t in i?bh(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Wr=(i,t,e)=>Th(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function _e(){}function Dc(i){return i()}function zo(){return Object.create(null)}function vn(i){i.forEach(Dc)}function vo(i){return typeof i=="function"}function ri(i,t){return i!=i?t==t:i!==t||i&&typeof i=="object"||typeof i=="function"}function Ah(i){return Object.keys(i).length===0}function Mo(i,...t){if(i==null){for(const n of t)n(void 0);return _e}const e=i.subscribe(...t);return e.unsubscribe?()=>e.unsubscribe():e}function Ei(i){let t;return Mo(i,e=>t=e)(),t}function Le(i,t,e){i.$$.on_destroy.push(Mo(t,e))}function A(i,t){i.appendChild(t)}function qt(i,t,e){i.insertBefore(t,e||null)}function Xt(i){i.parentNode&&i.parentNode.removeChild(i)}function dn(i,t){for(let e=0;e<i.length;e+=1)i[e]&&i[e].d(t)}function V(i){return document.createElement(i)}function Ns(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function st(i){return document.createTextNode(i)}function ct(){return st(" ")}function Uc(){return st("")}function Me(i,t,e,n){return i.addEventListener(t,e,n),()=>i.removeEventListener(t,e,n)}function Ic(i){return function(t){return t.stopPropagation(),i.call(this,t)}}function B(i,t,e){e==null?i.removeAttribute(t):i.getAttribute(t)!==e&&i.setAttribute(t,e)}function wh(i){return Array.from(i.childNodes)}function Ct(i,t){t=""+t,i.data!==t&&(i.data=t)}function Pr(i,t){i.value=t??""}function Os(i,t,e,n){e==null?i.style.removeProperty(t):i.style.setProperty(t,e,"")}function $s(i,t,e){for(let n=0;n<i.options.length;n+=1){const s=i.options[n];if(s.__value===t){s.selected=!0;return}}i.selectedIndex=-1}function Fe(i,t,e){i.classList.toggle(t,!!e)}let Bs;function Fs(i){Bs=i}function Nc(){if(!Bs)throw new Error("Function called outside component initialization");return Bs}function Rh(i){Nc().$$.on_mount.push(i)}function Ch(i){Nc().$$.on_destroy.push(i)}function ko(i,t){const e=i.$$.callbacks[t.type];e&&e.slice().forEach(n=>n.call(this,t))}const Qi=[],Lr=[];let ss=[];const Ho=[],Ph=Promise.resolve();let Ta=!1;function Lh(){Ta||(Ta=!0,Ph.then(Fc))}function Aa(i){ss.push(i)}const Xr=new Set;let Ui=0;function Fc(){if(Ui!==0)return;const i=Bs;do{try{for(;Ui<Qi.length;){const t=Qi[Ui];Ui++,Fs(t),Dh(t.$$)}}catch(t){throw Qi.length=0,Ui=0,t}for(Fs(null),Qi.length=0,Ui=0;Lr.length;)Lr.pop()();for(let t=0;t<ss.length;t+=1){const e=ss[t];Xr.has(e)||(Xr.add(e),e())}ss.length=0}while(Qi.length);for(;Ho.length;)Ho.pop()();Ta=!1,Xr.clear(),Fs(i)}function Dh(i){if(i.fragment!==null){i.update(),vn(i.before_update);const t=i.dirty;i.dirty=[-1],i.fragment&&i.fragment.p(i.ctx,t),i.after_update.forEach(Aa)}}function Uh(i){const t=[],e=[];ss.forEach(n=>i.indexOf(n)===-1?t.push(n):e.push(n)),e.forEach(n=>n()),ss=t}const Sr=new Set;let Mi;function Ih(){Mi={r:0,c:[],p:Mi}}function Nh(){Mi.r||vn(Mi.c),Mi=Mi.p}function En(i,t){i&&i.i&&(Sr.delete(i),i.i(t))}function Jn(i,t,e,n){if(i&&i.o){if(Sr.has(i))return;Sr.add(i),Mi.c.push(()=>{Sr.delete(i),n&&(e&&i.d(1),n())}),i.o(t)}else n&&n()}function me(i){return(i==null?void 0:i.length)!==void 0?i:Array.from(i)}function Oc(i,t){i.d(1),t.delete(i.key)}function Bc(i,t,e,n,s,r,a,o,l,c,u,d){let p=i.length,m=r.length,_=p;const v={};for(;_--;)v[i[_].key]=_;const h=[],f=new Map,T=new Map,M=[];for(_=m;_--;){const E=d(s,r,_),C=e(E);let j=a.get(C);j?M.push(()=>j.p(E,t)):(j=c(C,E),j.c()),f.set(C,h[_]=j),C in v&&T.set(C,Math.abs(_-v[C]))}const y=new Set,P=new Set;function R(E){En(E,1),E.m(o,u),a.set(E.key,E),u=E.first,m--}for(;p&&m;){const E=h[m-1],C=i[p-1],j=E.key,g=C.key;E===C?(u=E.first,p--,m--):f.has(g)?!a.has(j)||y.has(j)?R(E):P.has(g)?p--:T.get(j)>T.get(g)?(P.add(j),R(E)):(y.add(g),p--):(l(C,a),p--)}for(;p--;){const E=i[p];f.has(E.key)||l(E,a)}for(;m;)R(h[m-1]);return vn(M),h}function cs(i){i&&i.c()}function yi(i,t,e){const{fragment:n,after_update:s}=i.$$;n&&n.m(t,e),Aa(()=>{const r=i.$$.on_mount.map(Dc).filter(vo);i.$$.on_destroy?i.$$.on_destroy.push(...r):vn(r),i.$$.on_mount=[]}),s.forEach(Aa)}function bi(i,t){const e=i.$$;e.fragment!==null&&(Uh(e.after_update),vn(e.on_destroy),e.fragment&&e.fragment.d(t),e.on_destroy=e.fragment=null,e.ctx=[])}function Fh(i,t){i.$$.dirty[0]===-1&&(Qi.push(i),Lh(),i.$$.dirty.fill(0)),i.$$.dirty[t/31|0]|=1<<t%31}function Ri(i,t,e,n,s,r,a=null,o=[-1]){const l=Bs;Fs(i);const c=i.$$={fragment:null,ctx:[],props:r,update:_e,not_equal:s,bound:zo(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:zo(),dirty:o,skip_bound:!1,root:t.target||l.$$.root};a&&a(c.root);let u=!1;if(c.ctx=e?e(i,t.props||{},(d,p,...m)=>{const _=m.length?m[0]:p;return c.ctx&&s(c.ctx[d],c.ctx[d]=_)&&(!c.skip_bound&&c.bound[d]&&c.bound[d](_),u&&Fh(i,d)),p}):[],c.update(),u=!0,vn(c.before_update),c.fragment=n?n(c.ctx):!1,t.target){if(t.hydrate){const d=wh(t.target);c.fragment&&c.fragment.l(d),d.forEach(Xt)}else c.fragment&&c.fragment.c();t.intro&&En(i.$$.fragment),yi(i,t.target,t.anchor),Fc()}Fs(l)}class Ci{constructor(){Wr(this,"$$");Wr(this,"$$set")}$destroy(){bi(this,1),this.$destroy=_e}$on(t,e){if(!vo(e))return _e;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}$set(t){this.$$set&&!Ah(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Oh="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Oh);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xo="169",rs={ROTATE:0,DOLLY:1,PAN:2},es={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bh=0,Go=1,zh=2,zc=1,kh=2,Dn=3,ni=0,Ze=1,Un=2,Qn=0,as=1,Vo=2,Wo=3,Xo=4,Hh=5,gi=100,Gh=101,Vh=102,Wh=103,Xh=104,qh=200,Yh=201,$h=202,jh=203,wa=204,Ra=205,Kh=206,Zh=207,Jh=208,Qh=209,tu=210,eu=211,nu=212,iu=213,su=214,Ca=0,Pa=1,La=2,hs=3,Da=4,Ua=5,Ia=6,Na=7,kc=0,ru=1,au=2,ti=0,ou=1,lu=2,cu=3,hu=4,uu=5,fu=6,du=7,Hc=300,us=301,fs=302,Fa=303,Oa=304,kr=306,Ba=1e3,xi=1001,za=1002,on=1003,pu=1004,js=1005,fn=1006,qr=1007,Si=1008,On=1009,Gc=1010,Vc=1011,zs=1012,So=1013,Ti=1014,Nn=1015,Gs=1016,Eo=1017,yo=1018,ds=1020,Wc=35902,Xc=1021,qc=1022,pn=1023,Yc=1024,$c=1025,os=1026,ps=1027,jc=1028,bo=1029,Kc=1030,To=1031,Ao=1033,Er=33776,yr=33777,br=33778,Tr=33779,ka=35840,Ha=35841,Ga=35842,Va=35843,Wa=36196,Xa=37492,qa=37496,Ya=37808,$a=37809,ja=37810,Ka=37811,Za=37812,Ja=37813,Qa=37814,to=37815,eo=37816,no=37817,io=37818,so=37819,ro=37820,ao=37821,Ar=36492,oo=36494,lo=36495,Zc=36283,co=36284,ho=36285,uo=36286,mu=3200,_u=3201,Jc=0,gu=1,Zn="",Mn="srgb",ai="srgb-linear",wo="display-p3",Hr="display-p3-linear",Dr="linear",ve="srgb",Ur="rec709",Ir="p3",Ii=7680,qo=519,vu=512,Mu=513,xu=514,Qc=515,Su=516,Eu=517,yu=518,bu=519,fo=35044,Yo="300 es",Fn=2e3,Nr=2001;class Pi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wr=Math.PI/180,po=180/Math.PI;function ei(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function Ye(i,t,e){return Math.max(t,Math.min(e,i))}function Tu(i,t){return(i%t+t)%t}function Yr(i,t,e){return(1-e)*i+e*t}function Sn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function de(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Au={DEG2RAD:wr};class kt{constructor(t=0,e=0){kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jt{constructor(t,e,n,s,r,a,o,l,c){jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],p=n[2],m=n[5],_=n[8],v=s[0],h=s[3],f=s[6],T=s[1],M=s[4],y=s[7],P=s[2],R=s[5],E=s[8];return r[0]=a*v+o*T+l*P,r[3]=a*h+o*M+l*R,r[6]=a*f+o*y+l*E,r[1]=c*v+u*T+d*P,r[4]=c*h+u*M+d*R,r[7]=c*f+u*y+d*E,r[2]=p*v+m*T+_*P,r[5]=p*h+m*M+_*R,r[8]=p*f+m*y+_*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,p=o*l-u*r,m=c*r-a*l,_=e*d+n*p+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return t[0]=d*v,t[1]=(s*c-u*n)*v,t[2]=(o*n-s*a)*v,t[3]=p*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=m*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply($r.makeScale(t,e)),this}rotate(t){return this.premultiply($r.makeRotation(-t)),this}translate(t,e){return this.premultiply($r.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new jt;function th(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wu(){const i=Fr("canvas");return i.style.display="block",i}const $o={};function Rr(i){i in $o||($o[i]=!0,console.warn(i))}function Ru(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Cu(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Pu(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jo=new jt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ko=new jt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ts={[ai]:{transfer:Dr,primaries:Ur,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Mn]:{transfer:ve,primaries:Ur,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Hr]:{transfer:Dr,primaries:Ir,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Ko),fromReference:i=>i.applyMatrix3(jo)},[wo]:{transfer:ve,primaries:Ir,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ko),fromReference:i=>i.applyMatrix3(jo).convertLinearToSRGB()}},Lu=new Set([ai,Hr]),le={enabled:!0,_workingColorSpace:ai,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Lu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ts[t].toReference,s=Ts[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ts[i].primaries},getTransfer:function(i){return i===Zn?Dr:Ts[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Ts[t].luminanceCoefficients)}};function ls(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function jr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ni;class Du{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ni===void 0&&(Ni=Fr("canvas")),Ni.width=t.width,Ni.height=t.height;const n=Ni.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ni}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Fr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ls(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ls(e[n]/255)*255):e[n]=ls(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Uu=0;class eh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=ei(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Kr(s[a].image)):r.push(Kr(s[a]))}else r=Kr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Kr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Du.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Iu=0;class $e extends Pi{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=xi,s=xi,r=fn,a=Si,o=pn,l=On,c=$e.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=ei(),this.name="",this.source=new eh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ba:t.x=t.x-Math.floor(t.x);break;case xi:t.x=t.x<0?0:1;break;case za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ba:t.y=t.y-Math.floor(t.y);break;case xi:t.y=t.y<0?0:1;break;case za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=Hc;$e.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,n=0,s=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],d=l[8],p=l[1],m=l[5],_=l[9],v=l[2],h=l[6],f=l[10];if(Math.abs(u-p)<.01&&Math.abs(d-v)<.01&&Math.abs(_-h)<.01){if(Math.abs(u+p)<.1&&Math.abs(d+v)<.1&&Math.abs(_+h)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,y=(m+1)/2,P=(f+1)/2,R=(u+p)/4,E=(d+v)/4,C=(_+h)/4;return M>y&&M>P?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=R/n,r=E/n):y>P?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=R/s,r=C/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=E/r,s=C/r),this.set(n,s,r,e),this}let T=Math.sqrt((h-_)*(h-_)+(d-v)*(d-v)+(p-u)*(p-u));return Math.abs(T)<.001&&(T=1),this.x=(h-_)/T,this.y=(d-v)/T,this.z=(p-u)/T,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nu extends Pi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new $e(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new eh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends Nu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class nh extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fu extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const p=r[a+0],m=r[a+1],_=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=_,t[e+3]=v;return}if(d!==v||l!==p||c!==m||u!==_){let h=1-o;const f=l*p+c*m+u*_+d*v,T=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const P=Math.sqrt(M),R=Math.atan2(P,f*T);h=Math.sin(h*R)/P,o=Math.sin(o*R)/P}const y=o*T;if(l=l*h+p*y,c=c*h+m*y,u=u*h+_*y,d=d*h+v*y,h===1-o){const P=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=P,c*=P,u*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[a],p=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+u*d+l*m-c*p,t[e+1]=l*_+u*p+c*d-o*m,t[e+2]=c*_+u*m+o*p-l*d,t[e+3]=u*_-o*d-l*p-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),d=o(r/2),p=l(n/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=p*u*d+c*m*_,this._y=c*m*d-p*u*_,this._z=c*u*_+p*m*d,this._w=c*u*d-p*m*_;break;case"YXZ":this._x=p*u*d+c*m*_,this._y=c*m*d-p*u*_,this._z=c*u*_-p*m*d,this._w=c*u*d+p*m*_;break;case"ZXY":this._x=p*u*d-c*m*_,this._y=c*m*d+p*u*_,this._z=c*u*_+p*m*d,this._w=c*u*d-p*m*_;break;case"ZYX":this._x=p*u*d-c*m*_,this._y=c*m*d+p*u*_,this._z=c*u*_-p*m*d,this._w=c*u*d+p*m*_;break;case"YZX":this._x=p*u*d+c*m*_,this._y=c*m*d+p*u*_,this._z=c*u*_-p*m*d,this._w=c*u*d-p*m*_;break;case"XZY":this._x=p*u*d-c*m*_,this._y=c*m*d-p*u*_,this._z=c*u*_+p*m*d,this._w=c*u*d+p*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],p=n+o+d;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-e)*u)/c,p=Math.sin(e*u)/c;return this._w=a*d+this._w*p,this._x=n*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(t=0,e=0,n=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),u=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*u,this.y=n+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Zr.copy(this).projectOnVector(t),this.sub(Zr)}reflect(t){return this.sub(Zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zr=new H,Zo=new wi;class Vs{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,cn):cn.fromBufferAttribute(r,a),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(t.matrixWorld),this.union(Ks)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),Zs.subVectors(this.max,As),Fi.subVectors(t.a,As),Oi.subVectors(t.b,As),Bi.subVectors(t.c,As),Vn.subVectors(Oi,Fi),Wn.subVectors(Bi,Oi),ci.subVectors(Fi,Bi);let e=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-ci.z,ci.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,ci.z,0,-ci.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-ci.y,ci.x,0];return!Jr(e,Fi,Oi,Bi,Zs)||(e=[1,0,0,0,1,0,0,0,1],!Jr(e,Fi,Oi,Bi,Zs))?!1:(Js.crossVectors(Vn,Wn),e=[Js.x,Js.y,Js.z],Jr(e,Fi,Oi,Bi,Zs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const wn=[new H,new H,new H,new H,new H,new H,new H,new H],cn=new H,Ks=new Vs,Fi=new H,Oi=new H,Bi=new H,Vn=new H,Wn=new H,ci=new H,As=new H,Zs=new H,Js=new H,hi=new H;function Jr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){hi.fromArray(i,r);const o=s.x*Math.abs(hi.x)+s.y*Math.abs(hi.y)+s.z*Math.abs(hi.z),l=t.dot(hi),c=e.dot(hi),u=n.dot(hi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ou=new Vs,ws=new H,Qr=new H;class Ro{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ou.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ws.subVectors(t,this.center);const e=ws.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ws,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ws.copy(t.center).add(Qr)),this.expandByPoint(ws.copy(t.center).sub(Qr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new H,ta=new H,Qs=new H,Xn=new H,ea=new H,tr=new H,na=new H;class Co{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Rn.copy(this.origin).addScaledVector(this.direction,e),Rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ta.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(ta);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Qs),o=Xn.dot(this.direction),l=-Xn.dot(Qs),c=Xn.lengthSq(),u=Math.abs(1-a*a);let d,p,m,_;if(u>0)if(d=a*l-o,p=a*o-l,_=r*u,d>=0)if(p>=-_)if(p<=_){const v=1/u;d*=v,p*=v,m=d*(d+a*p+2*o)+p*(a*d+p+2*l)+c}else p=r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;else p=-r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;else p<=-_?(d=Math.max(0,-(-a*r+o)),p=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+p*(p+2*l)+c):p<=_?(d=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+c):(d=Math.max(0,-(a*r+o)),p=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+p*(p+2*l)+c);else p=a>0?-r:r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ta).addScaledVector(Qs,p),m}intersectSphere(t,e){Rn.subVectors(t.center,this.origin);const n=Rn.dot(this.direction),s=Rn.dot(Rn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),u>=0?(r=(t.min.y-p.y)*u,a=(t.max.y-p.y)*u):(r=(t.max.y-p.y)*u,a=(t.min.y-p.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-p.z)*d,l=(t.max.z-p.z)*d):(o=(t.max.z-p.z)*d,l=(t.min.z-p.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Rn)!==null}intersectTriangle(t,e,n,s,r){ea.subVectors(e,t),tr.subVectors(n,t),na.crossVectors(ea,tr);let a=this.direction.dot(na),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xn.subVectors(this.origin,t);const l=o*this.direction.dot(tr.crossVectors(Xn,tr));if(l<0)return null;const c=o*this.direction.dot(ea.cross(Xn));if(c<0||l+c>a)return null;const u=-o*Xn.dot(na);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xe{constructor(t,e,n,s,r,a,o,l,c,u,d,p,m,_,v,h){xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,u,d,p,m,_,v,h)}set(t,e,n,s,r,a,o,l,c,u,d,p,m,_,v,h){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=p,f[3]=m,f[7]=_,f[11]=v,f[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/zi.setFromMatrixColumn(t,0).length(),r=1/zi.setFromMatrixColumn(t,1).length(),a=1/zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const p=a*u,m=a*d,_=o*u,v=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=m+_*c,e[5]=p-v*c,e[9]=-o*l,e[2]=v-p*c,e[6]=_+m*c,e[10]=a*l}else if(t.order==="YXZ"){const p=l*u,m=l*d,_=c*u,v=c*d;e[0]=p+v*o,e[4]=_*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=m*o-_,e[6]=v+p*o,e[10]=a*l}else if(t.order==="ZXY"){const p=l*u,m=l*d,_=c*u,v=c*d;e[0]=p-v*o,e[4]=-a*d,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*u,e[9]=v-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const p=a*u,m=a*d,_=o*u,v=o*d;e[0]=l*u,e[4]=_*c-m,e[8]=p*c+v,e[1]=l*d,e[5]=v*c+p,e[9]=m*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const p=a*l,m=a*c,_=o*l,v=o*c;e[0]=l*u,e[4]=v-p*d,e[8]=_*d+m,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=m*d+_,e[10]=p-v*d}else if(t.order==="XZY"){const p=a*l,m=a*c,_=o*l,v=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=p*d+v,e[5]=a*u,e[9]=m*d-_,e[2]=_*d-m,e[6]=o*u,e[10]=v*d+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bu,t,zu)}lookAt(t,e,n){const s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),qn.crossVectors(n,Qe),qn.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),qn.crossVectors(n,Qe)),qn.normalize(),er.crossVectors(Qe,qn),s[0]=qn.x,s[4]=er.x,s[8]=Qe.x,s[1]=qn.y,s[5]=er.y,s[9]=Qe.y,s[2]=qn.z,s[6]=er.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],p=n[9],m=n[13],_=n[2],v=n[6],h=n[10],f=n[14],T=n[3],M=n[7],y=n[11],P=n[15],R=s[0],E=s[4],C=s[8],j=s[12],g=s[1],S=s[5],F=s[9],z=s[13],W=s[2],J=s[6],k=s[10],U=s[14],D=s[3],$=s[7],Q=s[11],K=s[15];return r[0]=a*R+o*g+l*W+c*D,r[4]=a*E+o*S+l*J+c*$,r[8]=a*C+o*F+l*k+c*Q,r[12]=a*j+o*z+l*U+c*K,r[1]=u*R+d*g+p*W+m*D,r[5]=u*E+d*S+p*J+m*$,r[9]=u*C+d*F+p*k+m*Q,r[13]=u*j+d*z+p*U+m*K,r[2]=_*R+v*g+h*W+f*D,r[6]=_*E+v*S+h*J+f*$,r[10]=_*C+v*F+h*k+f*Q,r[14]=_*j+v*z+h*U+f*K,r[3]=T*R+M*g+y*W+P*D,r[7]=T*E+M*S+y*J+P*$,r[11]=T*C+M*F+y*k+P*Q,r[15]=T*j+M*z+y*U+P*K,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],p=t[10],m=t[14],_=t[3],v=t[7],h=t[11],f=t[15];return _*(+r*l*d-s*c*d-r*o*p+n*c*p+s*o*m-n*l*m)+v*(+e*l*m-e*c*p+r*a*p-s*a*m+s*c*u-r*l*u)+h*(+e*c*d-e*o*m-r*a*d+n*a*m+r*o*u-n*c*u)+f*(-s*o*u-e*l*d+e*o*p+s*a*d-n*a*p+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],p=t[10],m=t[11],_=t[12],v=t[13],h=t[14],f=t[15],T=d*h*c-v*p*c+v*l*m-o*h*m-d*l*f+o*p*f,M=_*p*c-u*h*c-_*l*m+a*h*m+u*l*f-a*p*f,y=u*v*c-_*d*c+_*o*m-a*v*m-u*o*f+a*d*f,P=_*d*l-u*v*l-_*o*p+a*v*p+u*o*h-a*d*h,R=e*T+n*M+s*y+r*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/R;return t[0]=T*E,t[1]=(v*p*r-d*h*r-v*s*m+n*h*m+d*s*f-n*p*f)*E,t[2]=(o*h*r-v*l*r+v*s*c-n*h*c-o*s*f+n*l*f)*E,t[3]=(d*l*r-o*p*r-d*s*c+n*p*c+o*s*m-n*l*m)*E,t[4]=M*E,t[5]=(u*h*r-_*p*r+_*s*m-e*h*m-u*s*f+e*p*f)*E,t[6]=(_*l*r-a*h*r-_*s*c+e*h*c+a*s*f-e*l*f)*E,t[7]=(a*p*r-u*l*r+u*s*c-e*p*c-a*s*m+e*l*m)*E,t[8]=y*E,t[9]=(_*d*r-u*v*r-_*n*m+e*v*m+u*n*f-e*d*f)*E,t[10]=(a*v*r-_*o*r+_*n*c-e*v*c-a*n*f+e*o*f)*E,t[11]=(u*o*r-a*d*r-u*n*c+e*d*c+a*n*m-e*o*m)*E,t[12]=P*E,t[13]=(u*v*s-_*d*s+_*n*p-e*v*p-u*n*h+e*d*h)*E,t[14]=(_*o*s-a*v*s-_*n*l+e*v*l+a*n*h-e*o*h)*E,t[15]=(a*d*s-u*o*s+u*n*l-e*d*l-a*n*p+e*o*p)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,p=r*c,m=r*u,_=r*d,v=a*u,h=a*d,f=o*d,T=l*c,M=l*u,y=l*d,P=n.x,R=n.y,E=n.z;return s[0]=(1-(v+f))*P,s[1]=(m+y)*P,s[2]=(_-M)*P,s[3]=0,s[4]=(m-y)*R,s[5]=(1-(p+f))*R,s[6]=(h+T)*R,s[7]=0,s[8]=(_+M)*E,s[9]=(h-T)*E,s[10]=(1-(p+v))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=zi.set(s[0],s[1],s[2]).length();const a=zi.set(s[4],s[5],s[6]).length(),o=zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const c=1/r,u=1/a,d=1/o;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,e.setFromRotationMatrix(hn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Fn){const l=this.elements,c=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),p=(n+s)/(n-s);let m,_;if(o===Fn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Nr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Fn){const l=this.elements,c=1/(e-t),u=1/(n-s),d=1/(a-r),p=(e+t)*c,m=(n+s)*u;let _,v;if(o===Fn)_=(a+r)*d,v=-2*d;else if(o===Nr)_=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const zi=new H,hn=new xe,Bu=new H(0,0,0),zu=new H(1,1,1),qn=new H,er=new H,Qe=new H,Jo=new xe,Qo=new wi;class yn{constructor(t=0,e=0,n=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Jo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qo.setFromEuler(this),this.setFromQuaternion(Qo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class Po{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ku=0;const tl=new H,ki=new wi,Cn=new xe,nr=new H,Rs=new H,Hu=new H,Gu=new wi,el=new H(1,0,0),nl=new H(0,1,0),il=new H(0,0,1),sl={type:"added"},Vu={type:"removed"},Hi={type:"childadded",child:null},ia={type:"childremoved",child:null};class Oe extends Pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Oe.DEFAULT_UP.clone();const t=new H,e=new yn,n=new wi,s=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new jt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=Oe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Po,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.multiply(ki),this}rotateOnWorldAxis(t,e){return ki.setFromAxisAngle(t,e),this.quaternion.premultiply(ki),this}rotateX(t){return this.rotateOnAxis(el,t)}rotateY(t){return this.rotateOnAxis(nl,t)}rotateZ(t){return this.rotateOnAxis(il,t)}translateOnAxis(t,e){return tl.copy(t).applyQuaternion(this.quaternion),this.position.add(tl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(el,t)}translateY(t){return this.translateOnAxis(nl,t)}translateZ(t){return this.translateOnAxis(il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?nr.copy(t):nr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(Rs,nr,this.up):Cn.lookAt(nr,Rs,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),ki.setFromRotationMatrix(Cn),this.quaternion.premultiply(ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sl),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Vu),ia.child=t,this.dispatchEvent(ia),ia.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sl),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,t,Hu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,Gu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),p=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Oe.DEFAULT_UP=new H(0,1,0);Oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new H,Pn=new H,sa=new H,Ln=new H,Gi=new H,Vi=new H,rl=new H,ra=new H,aa=new H,oa=new H,la=new Se,ca=new Se,ha=new Se;class an{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),un.subVectors(t,e),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){un.subVectors(s,e),Pn.subVectors(n,e),sa.subVectors(t,e);const a=un.dot(un),o=un.dot(Pn),l=un.dot(sa),c=Pn.dot(Pn),u=Pn.dot(sa),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const p=1/d,m=(c*l-o*u)*p,_=(a*u-o*l)*p;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ln.x),l.addScaledVector(a,Ln.y),l.addScaledVector(o,Ln.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return la.setScalar(0),ca.setScalar(0),ha.setScalar(0),la.fromBufferAttribute(t,e),ca.fromBufferAttribute(t,n),ha.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(la,r.x),a.addScaledVector(ca,r.y),a.addScaledVector(ha,r.z),a}static isFrontFacing(t,e,n,s){return un.subVectors(n,e),Pn.subVectors(t,e),un.cross(Pn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),un.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return an.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return an.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return an.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return an.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return an.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Gi.subVectors(s,n),Vi.subVectors(r,n),ra.subVectors(t,n);const l=Gi.dot(ra),c=Vi.dot(ra);if(l<=0&&c<=0)return e.copy(n);aa.subVectors(t,s);const u=Gi.dot(aa),d=Vi.dot(aa);if(u>=0&&d<=u)return e.copy(s);const p=l*d-u*c;if(p<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Gi,a);oa.subVectors(t,r);const m=Gi.dot(oa),_=Vi.dot(oa);if(_>=0&&m<=_)return e.copy(r);const v=m*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(n).addScaledVector(Vi,o);const h=u*_-m*d;if(h<=0&&d-u>=0&&m-_>=0)return rl.subVectors(r,s),o=(d-u)/(d-u+(m-_)),e.copy(s).addScaledVector(rl,o);const f=1/(h+v+p);return a=v*f,o=p*f,e.copy(n).addScaledVector(Gi,a).addScaledVector(Vi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ih={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},ir={h:0,s:0,l:0};function ua(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Mn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=le.workingColorSpace){if(t=Tu(t,1),e=Ye(e,0,1),n=Ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ua(a,r,t+1/3),this.g=ua(a,r,t),this.b=ua(a,r,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=Mn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Mn){const n=ih[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}copyLinearToSRGB(t){return this.r=jr(t.r),this.g=jr(t.g),this.b=jr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Mn){return le.fromWorkingColorSpace(He.copy(this),t),Math.round(Ye(He.r*255,0,255))*65536+Math.round(Ye(He.g*255,0,255))*256+Math.round(Ye(He.b*255,0,255))}getHexString(t=Mn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(He.copy(this),e);const n=He.r,s=He.g,r=He.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=Mn){le.fromWorkingColorSpace(He.copy(this),t);const e=He.r,n=He.g,s=He.b;return t!==Mn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(ir);const n=Yr(Yn.h,ir.h,e),s=Yr(Yn.s,ir.s,e),r=Yr(Yn.l,ir.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new ee;ee.NAMES=ih;let Wu=0;class _s extends Pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=as,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wa,this.blendDst=Ra,this.blendEquation=gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==as&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ra&&(n.blendDst=this.blendDst),this.blendEquation!==gi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class sh extends _s{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new H,sr=new kt;class mn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fo,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)sr.fromBufferAttribute(this,e),sr.applyMatrix3(t),this.setXY(e,sr.x,sr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Sn(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Sn(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Sn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Sn(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fo&&(t.usage=this.usage),t}}class rh extends mn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ah extends mn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _n extends mn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Xu=0;const sn=new xe,fa=new Oe,Wi=new H,tn=new Vs,Cs=new Vs,Ne=new H;class bn extends Pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(th(t)?ah:rh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return fa.lookAt(t),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new _n(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ro);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ne.addVectors(tn.min,Cs.min),tn.expandByPoint(Ne),Ne.addVectors(tn.max,Cs.max),tn.expandByPoint(Ne)):(tn.expandByPoint(Cs.min),tn.expandByPoint(Cs.max))}tn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ne.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ne));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ne.fromBufferAttribute(o,c),l&&(Wi.fromBufferAttribute(t,c),Ne.add(Wi)),s=Math.max(s,n.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new H,l[C]=new H;const c=new H,u=new H,d=new H,p=new kt,m=new kt,_=new kt,v=new H,h=new H;function f(C,j,g){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,j),d.fromBufferAttribute(n,g),p.fromBufferAttribute(r,C),m.fromBufferAttribute(r,j),_.fromBufferAttribute(r,g),u.sub(c),d.sub(c),m.sub(p),_.sub(p);const S=1/(m.x*_.y-_.x*m.y);isFinite(S)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(d,-m.y).multiplyScalar(S),h.copy(d).multiplyScalar(m.x).addScaledVector(u,-_.x).multiplyScalar(S),o[C].add(v),o[j].add(v),o[g].add(v),l[C].add(h),l[j].add(h),l[g].add(h))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let C=0,j=T.length;C<j;++C){const g=T[C],S=g.start,F=g.count;for(let z=S,W=S+F;z<W;z+=3)f(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new H,y=new H,P=new H,R=new H;function E(C){P.fromBufferAttribute(s,C),R.copy(P);const j=o[C];M.copy(j),M.sub(P.multiplyScalar(P.dot(j))).normalize(),y.crossVectors(R,j);const S=y.dot(l[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,S)}for(let C=0,j=T.length;C<j;++C){const g=T[C],S=g.start,F=g.count;for(let z=S,W=S+F;z<W;z+=3)E(t.getX(z+0)),E(t.getX(z+1)),E(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new H,r=new H,a=new H,o=new H,l=new H,c=new H,u=new H,d=new H;if(t)for(let p=0,m=t.count;p<m;p+=3){const _=t.getX(p+0),v=t.getX(p+1),h=t.getX(p+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,h),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,h),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(h,c.x,c.y,c.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,d=o.normalized,p=new c.constructor(l.length*u);let m=0,_=0;for(let v=0,h=l.length;v<h;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*u;for(let f=0;f<u;f++)p[_++]=c[m++]}return new mn(p,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new bn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const p=c[u],m=t(p,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,p=c.length;d<p;d++){const m=c[d];u.push(m.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],d=r[c];for(let p=0,m=d.length;p<m;p++)u.push(d[p].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const al=new xe,ui=new Co,rr=new Ro,ol=new H,ar=new H,or=new H,lr=new H,da=new H,cr=new H,ll=new H,hr=new H;class en extends Oe{constructor(t=new bn,e=new sh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(da.fromBufferAttribute(d,t),a?cr.addScaledVector(da,u):cr.addScaledVector(da.sub(e),u))}e.add(cr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(r),ui.copy(t.ray).recast(t.near),!(rr.containsPoint(ui.origin)===!1&&(ui.intersectSphere(rr,ol)===null||ui.origin.distanceToSquared(ol)>(t.far-t.near)**2))&&(al.copy(r).invert(),ui.copy(t.ray).applyMatrix4(al),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=p.length;_<v;_++){const h=p[_],f=a[h.materialIndex],T=Math.max(h.start,m.start),M=Math.min(o.count,Math.min(h.start+h.count,m.start+m.count));for(let y=T,P=M;y<P;y+=3){const R=o.getX(y),E=o.getX(y+1),C=o.getX(y+2);s=ur(this,f,t,n,c,u,d,R,E,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=h.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let h=_,f=v;h<f;h+=3){const T=o.getX(h),M=o.getX(h+1),y=o.getX(h+2);s=ur(this,a,t,n,c,u,d,T,M,y),s&&(s.faceIndex=Math.floor(h/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=p.length;_<v;_++){const h=p[_],f=a[h.materialIndex],T=Math.max(h.start,m.start),M=Math.min(l.count,Math.min(h.start+h.count,m.start+m.count));for(let y=T,P=M;y<P;y+=3){const R=y,E=y+1,C=y+2;s=ur(this,f,t,n,c,u,d,R,E,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=h.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let h=_,f=v;h<f;h+=3){const T=h,M=h+1,y=h+2;s=ur(this,a,t,n,c,u,d,T,M,y),s&&(s.faceIndex=Math.floor(h/3),e.push(s))}}}}function qu(i,t,e,n,s,r,a,o){let l;if(t.side===Ze?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ni,o),l===null)return null;hr.copy(o),hr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(hr);return c<e.near||c>e.far?null:{distance:c,point:hr.clone(),object:i}}function ur(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,ar),i.getVertexPosition(l,or),i.getVertexPosition(c,lr);const u=qu(i,t,e,n,ar,or,lr,ll);if(u){const d=new H;an.getBarycoord(ll,ar,or,lr,d),s&&(u.uv=an.getInterpolatedAttribute(s,o,l,c,d,new kt)),r&&(u.uv1=an.getInterpolatedAttribute(r,o,l,c,d,new kt)),a&&(u.normal=an.getInterpolatedAttribute(a,o,l,c,d,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new H,materialIndex:0};an.getNormal(ar,or,lr,p.normal),u.face=p,u.barycoord=d}return u}class gs extends bn{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let p=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new _n(c,3)),this.setAttribute("normal",new _n(u,3)),this.setAttribute("uv",new _n(d,2));function _(v,h,f,T,M,y,P,R,E,C,j){const g=y/E,S=P/C,F=y/2,z=P/2,W=R/2,J=E+1,k=C+1;let U=0,D=0;const $=new H;for(let Q=0;Q<k;Q++){const K=Q*S-z;for(let at=0;at<J;at++){const ft=at*g-F;$[v]=ft*T,$[h]=K*M,$[f]=W,c.push($.x,$.y,$.z),$[v]=0,$[h]=0,$[f]=R>0?1:-1,u.push($.x,$.y,$.z),d.push(at/E),d.push(1-Q/C),U+=1}}for(let Q=0;Q<C;Q++)for(let K=0;K<E;K++){const at=p+K+J*Q,ft=p+K+J*(Q+1),X=p+(K+1)+J*(Q+1),nt=p+(K+1)+J*Q;l.push(at,ft,nt),l.push(ft,X,nt),D+=6}o.addGroup(m,D,j),m+=D,p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ms(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function qe(i){const t={};for(let e=0;e<i.length;e++){const n=ms(i[e]);for(const s in n)t[s]=n[s]}return t}function Yu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function oh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}const $u={clone:ms,merge:qe};var ju=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ku=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends _s{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ju,this.fragmentShader=Ku,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ms(t.uniforms),this.uniformsGroups=Yu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class lh extends Oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new H,cl=new kt,hl=new kt;class rn extends lh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=po*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return po*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,cl,hl),e.subVectors(hl,cl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(wr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Xi=-90,qi=1;class Zu extends Oe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(Xi,qi,t,e);s.layers=this.layers,this.add(s);const r=new rn(Xi,qi,t,e);r.layers=this.layers,this.add(r);const a=new rn(Xi,qi,t,e);a.layers=this.layers,this.add(a);const o=new rn(Xi,qi,t,e);o.layers=this.layers,this.add(o);const l=new rn(Xi,qi,t,e);l.layers=this.layers,this.add(l);const c=new rn(Xi,qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,p,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class ch extends $e{constructor(t,e,n,s,r,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:us,super(t,e,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ju extends Ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ch(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gs(5,5,5),r=new ii({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:Qn});r.uniforms.tEquirect.value=e;const a=new en(s,r),o=e.minFilter;return e.minFilter===Si&&(e.minFilter=fn),new Zu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const pa=new H,Qu=new H,tf=new jt;class Kn{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=pa.subVectors(n,e).cross(Qu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(pa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||tf.getNormalMatrix(t),s=this.coplanarPoint(pa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new Ro,fr=new H;class Lo{constructor(t=new Kn,e=new Kn,n=new Kn,s=new Kn,r=new Kn,a=new Kn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Fn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],d=s[6],p=s[7],m=s[8],_=s[9],v=s[10],h=s[11],f=s[12],T=s[13],M=s[14],y=s[15];if(n[0].setComponents(l-r,p-c,h-m,y-f).normalize(),n[1].setComponents(l+r,p+c,h+m,y+f).normalize(),n[2].setComponents(l+a,p+u,h+_,y+T).normalize(),n[3].setComponents(l-a,p-u,h-_,y-T).normalize(),n[4].setComponents(l-o,p-d,h-v,y-M).normalize(),e===Fn)n[5].setComponents(l+o,p+d,h+v,y+M).normalize();else if(e===Nr)n[5].setComponents(o,d,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){return fi.center.set(0,0,0),fi.radius=.7071067811865476,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(fr.x=s.normal.x>0?t.max.x:t.min.x,fr.y=s.normal.y>0?t.max.y:t.min.y,fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ef(i){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,d=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((m,_)=>m.start-_.start);let p=0;for(let m=1;m<d.length;m++){const _=d[p],v=d[m];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++p,d[p]=v)}d.length=p+1;for(let m=0,_=d.length;m<_;m++){const v=d[m];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Ws extends bn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,d=t/o,p=e/l,m=[],_=[],v=[],h=[];for(let f=0;f<u;f++){const T=f*p-a;for(let M=0;M<c;M++){const y=M*d-r;_.push(y,-T,0),v.push(0,0,1),h.push(M/o),h.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<o;T++){const M=T+c*f,y=T+c*(f+1),P=T+1+c*(f+1),R=T+1+c*f;m.push(M,y,R),m.push(y,P,R)}this.setIndex(m),this.setAttribute("position",new _n(_,3)),this.setAttribute("normal",new _n(v,3)),this.setAttribute("uv",new _n(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.width,t.height,t.widthSegments,t.heightSegments)}}var nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,af=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,of=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_f=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Af=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Df=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uf="gl_FragColor = linearToOutputTexel( gl_FragColor );",If=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Of=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Bf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$f=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,jf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Kf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,td=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ed=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,id=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ad=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,od=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ld=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,md=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_d=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Md=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Td=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ad=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ld=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Dd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ud=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Id=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Od=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,zd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$d=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const np=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ip=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,up=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_p=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Sp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ep=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ap=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,wp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Up=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ip=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:nf,alphahash_pars_fragment:sf,alphamap_fragment:rf,alphamap_pars_fragment:af,alphatest_fragment:of,alphatest_pars_fragment:lf,aomap_fragment:cf,aomap_pars_fragment:hf,batching_pars_vertex:uf,batching_vertex:ff,begin_vertex:df,beginnormal_vertex:pf,bsdfs:mf,iridescence_fragment:_f,bumpmap_pars_fragment:gf,clipping_planes_fragment:vf,clipping_planes_pars_fragment:Mf,clipping_planes_pars_vertex:xf,clipping_planes_vertex:Sf,color_fragment:Ef,color_pars_fragment:yf,color_pars_vertex:bf,color_vertex:Tf,common:Af,cube_uv_reflection_fragment:wf,defaultnormal_vertex:Rf,displacementmap_pars_vertex:Cf,displacementmap_vertex:Pf,emissivemap_fragment:Lf,emissivemap_pars_fragment:Df,colorspace_fragment:Uf,colorspace_pars_fragment:If,envmap_fragment:Nf,envmap_common_pars_fragment:Ff,envmap_pars_fragment:Of,envmap_pars_vertex:Bf,envmap_physical_pars_fragment:jf,envmap_vertex:zf,fog_vertex:kf,fog_pars_vertex:Hf,fog_fragment:Gf,fog_pars_fragment:Vf,gradientmap_pars_fragment:Wf,lightmap_pars_fragment:Xf,lights_lambert_fragment:qf,lights_lambert_pars_fragment:Yf,lights_pars_begin:$f,lights_toon_fragment:Kf,lights_toon_pars_fragment:Zf,lights_phong_fragment:Jf,lights_phong_pars_fragment:Qf,lights_physical_fragment:td,lights_physical_pars_fragment:ed,lights_fragment_begin:nd,lights_fragment_maps:id,lights_fragment_end:sd,logdepthbuf_fragment:rd,logdepthbuf_pars_fragment:ad,logdepthbuf_pars_vertex:od,logdepthbuf_vertex:ld,map_fragment:cd,map_pars_fragment:hd,map_particle_fragment:ud,map_particle_pars_fragment:fd,metalnessmap_fragment:dd,metalnessmap_pars_fragment:pd,morphinstance_vertex:md,morphcolor_vertex:_d,morphnormal_vertex:gd,morphtarget_pars_vertex:vd,morphtarget_vertex:Md,normal_fragment_begin:xd,normal_fragment_maps:Sd,normal_pars_fragment:Ed,normal_pars_vertex:yd,normal_vertex:bd,normalmap_pars_fragment:Td,clearcoat_normal_fragment_begin:Ad,clearcoat_normal_fragment_maps:wd,clearcoat_pars_fragment:Rd,iridescence_pars_fragment:Cd,opaque_fragment:Pd,packing:Ld,premultiplied_alpha_fragment:Dd,project_vertex:Ud,dithering_fragment:Id,dithering_pars_fragment:Nd,roughnessmap_fragment:Fd,roughnessmap_pars_fragment:Od,shadowmap_pars_fragment:Bd,shadowmap_pars_vertex:zd,shadowmap_vertex:kd,shadowmask_pars_fragment:Hd,skinbase_vertex:Gd,skinning_pars_vertex:Vd,skinning_vertex:Wd,skinnormal_vertex:Xd,specularmap_fragment:qd,specularmap_pars_fragment:Yd,tonemapping_fragment:$d,tonemapping_pars_fragment:jd,transmission_fragment:Kd,transmission_pars_fragment:Zd,uv_pars_fragment:Jd,uv_pars_vertex:Qd,uv_vertex:tp,worldpos_vertex:ep,background_vert:np,background_frag:ip,backgroundCube_vert:sp,backgroundCube_frag:rp,cube_vert:ap,cube_frag:op,depth_vert:lp,depth_frag:cp,distanceRGBA_vert:hp,distanceRGBA_frag:up,equirect_vert:fp,equirect_frag:dp,linedashed_vert:pp,linedashed_frag:mp,meshbasic_vert:_p,meshbasic_frag:gp,meshlambert_vert:vp,meshlambert_frag:Mp,meshmatcap_vert:xp,meshmatcap_frag:Sp,meshnormal_vert:Ep,meshnormal_frag:yp,meshphong_vert:bp,meshphong_frag:Tp,meshphysical_vert:Ap,meshphysical_frag:wp,meshtoon_vert:Rp,meshtoon_frag:Cp,points_vert:Pp,points_frag:Lp,shadow_vert:Dp,shadow_frag:Up,sprite_vert:Ip,sprite_frag:Np},pt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},xn={basic:{uniforms:qe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:qe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new ee(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:qe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:qe([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:qe([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new ee(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:qe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:qe([pt.points,pt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:qe([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:qe([pt.common,pt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:qe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:qe([pt.sprite,pt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:qe([pt.common,pt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:qe([pt.lights,pt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};xn.physical={uniforms:qe([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const dr={r:0,b:0,g:0},di=new yn,Fp=new xe;function Op(i,t,e,n,s,r,a){const o=new ee(0);let l=r===!0?0:1,c,u,d=null,p=0,m=null;function _(T){let M=T.isScene===!0?T.background:null;return M&&M.isTexture&&(M=(T.backgroundBlurriness>0?e:t).get(M)),M}function v(T){let M=!1;const y=_(T);y===null?f(o,l):y&&y.isColor&&(f(y,1),M=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function h(T,M){const y=_(M);y&&(y.isCubeTexture||y.mapping===kr)?(u===void 0&&(u=new en(new gs(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:ms(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,R,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),di.copy(M.backgroundRotation),di.x*=-1,di.y*=-1,di.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fp.makeRotationFromEuler(di)),u.material.toneMapped=le.getTransfer(y.colorSpace)!==ve,(d!==y||p!==y.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,d=y,p=y.version,m=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new en(new Ws(2,2),new ii({name:"BackgroundMaterial",uniforms:ms(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=le.getTransfer(y.colorSpace)!==ve,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||p!==y.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,p=y.version,m=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function f(T,M){T.getRGB(dr,oh(i)),n.buffers.color.setClear(dr.r,dr.g,dr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(T,M=1){o.set(T),l=M,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,f(o,l)},render:v,addToRenderList:h}}function Bp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(g,S,F,z,W){let J=!1;const k=d(z,F,S);r!==k&&(r=k,c(r.object)),J=m(g,z,F,W),J&&_(g,z,F,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,y(g,S,F,z),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return i.createVertexArray()}function c(g){return i.bindVertexArray(g)}function u(g){return i.deleteVertexArray(g)}function d(g,S,F){const z=F.wireframe===!0;let W=n[g.id];W===void 0&&(W={},n[g.id]=W);let J=W[S.id];J===void 0&&(J={},W[S.id]=J);let k=J[z];return k===void 0&&(k=p(l()),J[z]=k),k}function p(g){const S=[],F=[],z=[];for(let W=0;W<e;W++)S[W]=0,F[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:F,attributeDivisors:z,object:g,attributes:{},index:null}}function m(g,S,F,z){const W=r.attributes,J=S.attributes;let k=0;const U=F.getAttributes();for(const D in U)if(U[D].location>=0){const Q=W[D];let K=J[D];if(K===void 0&&(D==="instanceMatrix"&&g.instanceMatrix&&(K=g.instanceMatrix),D==="instanceColor"&&g.instanceColor&&(K=g.instanceColor)),Q===void 0||Q.attribute!==K||K&&Q.data!==K.data)return!0;k++}return r.attributesNum!==k||r.index!==z}function _(g,S,F,z){const W={},J=S.attributes;let k=0;const U=F.getAttributes();for(const D in U)if(U[D].location>=0){let Q=J[D];Q===void 0&&(D==="instanceMatrix"&&g.instanceMatrix&&(Q=g.instanceMatrix),D==="instanceColor"&&g.instanceColor&&(Q=g.instanceColor));const K={};K.attribute=Q,Q&&Q.data&&(K.data=Q.data),W[D]=K,k++}r.attributes=W,r.attributesNum=k,r.index=z}function v(){const g=r.newAttributes;for(let S=0,F=g.length;S<F;S++)g[S]=0}function h(g){f(g,0)}function f(g,S){const F=r.newAttributes,z=r.enabledAttributes,W=r.attributeDivisors;F[g]=1,z[g]===0&&(i.enableVertexAttribArray(g),z[g]=1),W[g]!==S&&(i.vertexAttribDivisor(g,S),W[g]=S)}function T(){const g=r.newAttributes,S=r.enabledAttributes;for(let F=0,z=S.length;F<z;F++)S[F]!==g[F]&&(i.disableVertexAttribArray(F),S[F]=0)}function M(g,S,F,z,W,J,k){k===!0?i.vertexAttribIPointer(g,S,F,W,J):i.vertexAttribPointer(g,S,F,z,W,J)}function y(g,S,F,z){v();const W=z.attributes,J=F.getAttributes(),k=S.defaultAttributeValues;for(const U in J){const D=J[U];if(D.location>=0){let $=W[U];if($===void 0&&(U==="instanceMatrix"&&g.instanceMatrix&&($=g.instanceMatrix),U==="instanceColor"&&g.instanceColor&&($=g.instanceColor)),$!==void 0){const Q=$.normalized,K=$.itemSize,at=t.get($);if(at===void 0)continue;const ft=at.buffer,X=at.type,nt=at.bytesPerElement,ut=X===i.INT||X===i.UNSIGNED_INT||$.gpuType===So;if($.isInterleavedBufferAttribute){const ht=$.data,Dt=ht.stride,wt=$.offset;if(ht.isInstancedInterleavedBuffer){for(let Ht=0;Ht<D.locationSize;Ht++)f(D.location+Ht,ht.meshPerAttribute);g.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Ht=0;Ht<D.locationSize;Ht++)h(D.location+Ht);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Ht=0;Ht<D.locationSize;Ht++)M(D.location+Ht,K/D.locationSize,X,Q,Dt*nt,(wt+K/D.locationSize*Ht)*nt,ut)}else{if($.isInstancedBufferAttribute){for(let ht=0;ht<D.locationSize;ht++)f(D.location+ht,$.meshPerAttribute);g.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ht=0;ht<D.locationSize;ht++)h(D.location+ht);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let ht=0;ht<D.locationSize;ht++)M(D.location+ht,K/D.locationSize,X,Q,K*nt,K/D.locationSize*ht*nt,ut)}}else if(k!==void 0){const Q=k[U];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(D.location,Q);break;case 3:i.vertexAttrib3fv(D.location,Q);break;case 4:i.vertexAttrib4fv(D.location,Q);break;default:i.vertexAttrib1fv(D.location,Q)}}}}T()}function P(){C();for(const g in n){const S=n[g];for(const F in S){const z=S[F];for(const W in z)u(z[W].object),delete z[W];delete S[F]}delete n[g]}}function R(g){if(n[g.id]===void 0)return;const S=n[g.id];for(const F in S){const z=S[F];for(const W in z)u(z[W].object),delete z[W];delete S[F]}delete n[g.id]}function E(g){for(const S in n){const F=n[S];if(F[g.id]===void 0)continue;const z=F[g.id];for(const W in z)u(z[W].object),delete z[W];delete F[g.id]}}function C(){j(),a=!0,r!==s&&(r=s,c(r.object))}function j(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:j,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:h,disableUnusedAttributes:T}}function zp(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function a(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),e.update(u,n,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let m=0;for(let _=0;_<d;_++)m+=u[_];e.update(m,n,1)}function l(c,u,d,p){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<c.length;_++)a(c[_],u[_],p[_]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,u,0,p,0,d);let _=0;for(let v=0;v<d;v++)_+=u[v];for(let v=0;v<p.length;v++)e.update(_,n,p[v])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function kp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==pn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const C=E===Gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==On&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Nn&&!C)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(p===!0){const E=t.get("EXT_clip_control");E.clipControlEXT(E.LOWER_LEFT_EXT,E.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=_>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:h,maxAttributes:f,maxVertexUniforms:T,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:P,maxSamples:R}}function Hp(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Kn,o=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const m=d.length!==0||p||n!==0||s;return s=p,n=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){e=u(d,p,0)},this.setState=function(d,p,m){const _=d.clippingPlanes,v=d.clipIntersection,h=d.clipShadows,f=i.get(d);if(!s||_===null||_.length===0||r&&!h)r?u(null):c();else{const T=r?0:n,M=T*4;let y=f.clippingState||null;l.value=y,y=u(_,p,M,m);for(let P=0;P!==M;++P)y[P]=e[P];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,p,m,_){const v=d!==null?d.length:0;let h=null;if(v!==0){if(h=l.value,_!==!0||h===null){const f=m+v*4,T=p.matrixWorldInverse;o.getNormalMatrix(T),(h===null||h.length<f)&&(h=new Float32Array(f));for(let M=0,y=m;M!==v;++M,y+=4)a.copy(d[M]).applyMatrix4(T,o),a.normal.toArray(h,y),h[y+3]=a.constant}l.value=h,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,h}}function Gp(i){let t=new WeakMap;function e(a,o){return o===Fa?a.mapping=us:o===Oa&&(a.mapping=fs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Fa||o===Oa)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ju(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class uh extends lh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ns=4,ul=[.125,.215,.35,.446,.526,.582],vi=20,ma=new uh,fl=new ee;let _a=null,ga=0,va=0,Ma=!1;const _i=(1+Math.sqrt(5))/2,Yi=1/_i,dl=[new H(-_i,Yi,0),new H(_i,Yi,0),new H(-Yi,0,_i),new H(Yi,0,_i),new H(0,_i,-Yi),new H(0,_i,Yi),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class pl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){_a=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_l(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_a,ga,va),this._renderer.xr.enabled=Ma,t.scissorTest=!1,pr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===us||t.mapping===fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_a=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Gs,format:pn,colorSpace:ai,depthBuffer:!1},s=ml(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ml(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vp(r)),this._blurMaterial=Wp(r,t,e)}return s}_compileMaterial(t){const e=new en(this._lodPlanes[0],t);this._renderer.compile(e,ma)}_sceneToCubeUV(t,e,n,s){const o=new rn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(fl),u.toneMapping=ti,u.autoClear=!1;const m=new sh({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),_=new en(new gs,m);let v=!1;const h=t.background;h?h.isColor&&(m.color.copy(h),t.background=null,v=!0):(m.color.copy(fl),v=!0);for(let f=0;f<6;f++){const T=f%3;T===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):T===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const M=this._cubeSize;pr(s,T*M,f>2?M:0,M,M),u.setRenderTarget(s),v&&u.render(_,o),u.render(t,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=h}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===us||t.mapping===fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_l());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new en(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;pr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ma)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=dl[(s-r-1)%dl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new en(this._lodPlanes[s],c),p=c.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*vi-1),v=r/_,h=isFinite(r)?1+Math.floor(u*v):vi;h>vi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${vi}`);const f=[];let T=0;for(let E=0;E<vi;++E){const C=E/v,j=Math.exp(-C*C/2);f.push(j),E===0?T+=j:E<h&&(T+=2*j)}for(let E=0;E<f.length;E++)f[E]=f[E]/T;p.envMap.value=t.texture,p.samples.value=h,p.weights.value=f,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:M}=this;p.dTheta.value=_,p.mipInt.value=M-n;const y=this._sizeLods[s],P=3*y*(s>M-ns?s-M+ns:0),R=4*(this._cubeSize-y);pr(e,P,R,3*y,2*y),l.setRenderTarget(e),l.render(d,ma)}}function Vp(i){const t=[],e=[],n=[];let s=i;const r=i-ns+1+ul.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ns?l=ul[a-i+ns-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,d=1+c,p=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,_=6,v=3,h=2,f=1,T=new Float32Array(v*_*m),M=new Float32Array(h*_*m),y=new Float32Array(f*_*m);for(let R=0;R<m;R++){const E=R%3*2/3-1,C=R>2?0:-1,j=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];T.set(j,v*_*R),M.set(p,h*_*R);const g=[R,R,R,R,R,R];y.set(g,f*_*R)}const P=new bn;P.setAttribute("position",new mn(T,v)),P.setAttribute("uv",new mn(M,h)),P.setAttribute("faceIndex",new mn(y,f)),t.push(P),s>ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ml(i,t,e){const n=new Ai(i,t,e);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Wp(i,t,e){const n=new Float32Array(vi),s=new H(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function _l(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function gl(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Do(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Xp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Fa||l===Oa,u=l===us||l===fs;if(c||u){let d=t.get(o);const p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new pl(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return c&&m&&m.height>0||u&&m&&s(m)?(e===null&&(e=new pl(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function qp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Yp(i,t,e,n){const s={},r=new WeakMap;function a(d){const p=d.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);for(const _ in p.morphAttributes){const v=p.morphAttributes[_];for(let h=0,f=v.length;h<f;h++)t.remove(v[h])}p.removeEventListener("dispose",a),delete s[p.id];const m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(d,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function l(d){const p=d.attributes;for(const _ in p)t.update(p[_],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const _ in m){const v=m[_];for(let h=0,f=v.length;h<f;h++)t.update(v[h],i.ARRAY_BUFFER)}}function c(d){const p=[],m=d.index,_=d.attributes.position;let v=0;if(m!==null){const T=m.array;v=m.version;for(let M=0,y=T.length;M<y;M+=3){const P=T[M+0],R=T[M+1],E=T[M+2];p.push(P,R,R,E,E,P)}}else if(_!==void 0){const T=_.array;v=_.version;for(let M=0,y=T.length/3-1;M<y;M+=3){const P=M+0,R=M+1,E=M+2;p.push(P,R,R,E,E,P)}}else return;const h=new(th(p)?ah:rh)(p,1);h.version=v;const f=r.get(d);f&&t.remove(f),r.set(d,h)}function u(d){const p=r.get(d);if(p){const m=d.index;m!==null&&p.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function $p(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,m){i.drawElements(n,m,r,p*a),e.update(m,n,1)}function c(p,m,_){_!==0&&(i.drawElementsInstanced(n,m,r,p*a,_),e.update(m,n,_))}function u(p,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,_);let h=0;for(let f=0;f<_;f++)h+=m[f];e.update(h,n,1)}function d(p,m,_,v){if(_===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let f=0;f<p.length;f++)c(p[f]/a,m[f],v[f]);else{h.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,v,0,_);let f=0;for(let T=0;T<_;T++)f+=m[T];for(let T=0;T<v.length;T++)e.update(f,n,v[T])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function jp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Kp(i,t,e){const n=new WeakMap,s=new Se;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let p=n.get(o);if(p===void 0||p.count!==d){let g=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",g)};var m=g;p!==void 0&&p.texture.dispose();const _=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,h=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),v===!0&&(y=2),h===!0&&(y=3);let P=o.attributes.position.count*y,R=1;P>t.maxTextureSize&&(R=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const E=new Float32Array(P*R*4*d),C=new nh(E,P,R,d);C.type=Nn,C.needsUpdate=!0;const j=y*4;for(let S=0;S<d;S++){const F=f[S],z=T[S],W=M[S],J=P*R*4*S;for(let k=0;k<F.count;k++){const U=k*j;_===!0&&(s.fromBufferAttribute(F,k),E[J+U+0]=s.x,E[J+U+1]=s.y,E[J+U+2]=s.z,E[J+U+3]=0),v===!0&&(s.fromBufferAttribute(z,k),E[J+U+4]=s.x,E[J+U+5]=s.y,E[J+U+6]=s.z,E[J+U+7]=0),h===!0&&(s.fromBufferAttribute(W,k),E[J+U+8]=s.x,E[J+U+9]=s.y,E[J+U+10]=s.z,E[J+U+11]=W.itemSize===4?s.w:1)}}p={count:d,texture:C,size:new kt(P,R)},n.set(o,p),o.addEventListener("dispose",g)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let _=0;for(let h=0;h<c.length;h++)_+=c[h];const v=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Zp(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class fh extends $e{constructor(t,e,n,s,r,a,o,l,c,u=os){if(u!==os&&u!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===os&&(n=Ti),n===void 0&&u===ps&&(n=ds),super(null,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:on,this.minFilter=l!==void 0?l:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const dh=new $e,vl=new fh(1,1),ph=new nh,mh=new Fu,_h=new ch,Ml=[],xl=[],Sl=new Float32Array(16),El=new Float32Array(9),yl=new Float32Array(4);function vs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ml[s];if(r===void 0&&(r=new Float32Array(s),Ml[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function De(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ue(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Gr(i,t){let e=xl[t];e===void 0&&(e=new Int32Array(t),xl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Jp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2fv(this.addr,t),Ue(e,t)}}function tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;i.uniform3fv(this.addr,t),Ue(e,t)}}function em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4fv(this.addr,t),Ue(e,t)}}function nm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,n))return;yl.set(n),i.uniformMatrix2fv(this.addr,!1,yl),Ue(e,n)}}function im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,n))return;El.set(n),i.uniformMatrix3fv(this.addr,!1,El),Ue(e,n)}}function sm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(De(e,n))return;Sl.set(n),i.uniformMatrix4fv(this.addr,!1,Sl),Ue(e,n)}}function rm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2iv(this.addr,t),Ue(e,t)}}function om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3iv(this.addr,t),Ue(e,t)}}function lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4iv(this.addr,t),Ue(e,t)}}function cm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2uiv(this.addr,t),Ue(e,t)}}function um(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3uiv(this.addr,t),Ue(e,t)}}function fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4uiv(this.addr,t),Ue(e,t)}}function dm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(vl.compareFunction=Qc,r=vl):r=dh,e.setTexture2D(t||r,s)}function pm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||mh,s)}function mm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||_h,s)}function _m(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ph,s)}function gm(i){switch(i){case 5126:return Jp;case 35664:return Qp;case 35665:return tm;case 35666:return em;case 35674:return nm;case 35675:return im;case 35676:return sm;case 5124:case 35670:return rm;case 35667:case 35671:return am;case 35668:case 35672:return om;case 35669:case 35673:return lm;case 5125:return cm;case 36294:return hm;case 36295:return um;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return dm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return _m}}function vm(i,t){i.uniform1fv(this.addr,t)}function Mm(i,t){const e=vs(t,this.size,2);i.uniform2fv(this.addr,e)}function xm(i,t){const e=vs(t,this.size,3);i.uniform3fv(this.addr,e)}function Sm(i,t){const e=vs(t,this.size,4);i.uniform4fv(this.addr,e)}function Em(i,t){const e=vs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ym(i,t){const e=vs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function bm(i,t){const e=vs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Tm(i,t){i.uniform1iv(this.addr,t)}function Am(i,t){i.uniform2iv(this.addr,t)}function wm(i,t){i.uniform3iv(this.addr,t)}function Rm(i,t){i.uniform4iv(this.addr,t)}function Cm(i,t){i.uniform1uiv(this.addr,t)}function Pm(i,t){i.uniform2uiv(this.addr,t)}function Lm(i,t){i.uniform3uiv(this.addr,t)}function Dm(i,t){i.uniform4uiv(this.addr,t)}function Um(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||dh,r[a])}function Im(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||mh,r[a])}function Nm(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||_h,r[a])}function Fm(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ph,r[a])}function Om(i){switch(i){case 5126:return vm;case 35664:return Mm;case 35665:return xm;case 35666:return Sm;case 35674:return Em;case 35675:return ym;case 35676:return bm;case 5124:case 35670:return Tm;case 35667:case 35671:return Am;case 35668:case 35672:return wm;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Lm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Im;case 35680:case 36300:case 36308:case 36293:return Nm;case 36289:case 36303:case 36311:case 36292:return Fm}}class Bm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gm(e.type)}}class zm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Om(e.type)}}class km{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const xa=/(\w+)(\])?(\[|\.)?/g;function bl(i,t){i.seq.push(t),i.map[t.id]=t}function Hm(i,t,e){const n=i.name,s=n.length;for(xa.lastIndex=0;;){const r=xa.exec(n),a=xa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){bl(e,c===void 0?new Bm(o,i,t):new zm(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new km(o),bl(e,d)),e=d}}}class Cr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Hm(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Tl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Gm=37297;let Vm=0;function Wm(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Xm(i){const t=le.getPrimaries(le.workingColorSpace),e=le.getPrimaries(i);let n;switch(t===e?n="":t===Ir&&e===Ur?n="LinearDisplayP3ToLinearSRGB":t===Ur&&e===Ir&&(n="LinearSRGBToLinearDisplayP3"),i){case ai:case Hr:return[n,"LinearTransferOETF"];case Mn:case wo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Al(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Wm(i.getShaderSource(t),a)}else return s}function qm(i,t){const e=Xm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ym(i,t){let e;switch(t){case ou:e="Linear";break;case lu:e="Reinhard";break;case cu:e="Cineon";break;case hu:e="ACESFilmic";break;case fu:e="AgX";break;case du:e="Neutral";break;case uu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const mr=new H;function $m(){le.getLuminanceCoefficients(mr);const i=mr.x.toFixed(4),t=mr.y.toFixed(4),e=mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Is).join(`
`)}function Km(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Is(i){return i!==""}function wl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Jm=/^[ \t]*#include +<([\w\d./]+)>/gm;function mo(i){return i.replace(Jm,t_)}const Qm=new Map;function t_(i,t){let e=$t[t];if(e===void 0){const n=Qm.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return mo(e)}const e_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cl(i){return i.replace(e_,n_)}function n_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function i_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===zc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===kh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Dn&&(t="SHADOWMAP_TYPE_VSM"),t}function s_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case us:case fs:t="ENVMAP_TYPE_CUBE";break;case kr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function r_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case fs:t="ENVMAP_MODE_REFRACTION";break}return t}function a_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case kc:t="ENVMAP_BLENDING_MULTIPLY";break;case ru:t="ENVMAP_BLENDING_MIX";break;case au:t="ENVMAP_BLENDING_ADD";break}return t}function o_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function l_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=i_(e),c=s_(e),u=r_(e),d=a_(e),p=o_(e),m=jm(e),_=Km(r),v=s.createProgram();let h,f,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Is).join(`
`),h.length>0&&(h+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Is).join(`
`),f.length>0&&(f+=`
`)):(h=[Pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Is).join(`
`),f=[Pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ti?"#define TONE_MAPPING":"",e.toneMapping!==ti?$t.tonemapping_pars_fragment:"",e.toneMapping!==ti?Ym("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),$m(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Is).join(`
`)),a=mo(a),a=wl(a,e),a=Rl(a,e),o=mo(o),o=wl(o,e),o=Rl(o,e),a=Cl(a),o=Cl(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,h=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,f=["#define varying in",e.glslVersion===Yo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=T+h+a,y=T+f+o,P=Tl(s,s.VERTEX_SHADER,M),R=Tl(s,s.FRAGMENT_SHADER,y);s.attachShader(v,P),s.attachShader(v,R),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(S){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v).trim(),z=s.getShaderInfoLog(P).trim(),W=s.getShaderInfoLog(R).trim();let J=!0,k=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,P,R);else{const U=Al(s,P,"vertex"),D=Al(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+F+`
`+U+`
`+D)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(z===""||W==="")&&(k=!1);k&&(S.diagnostics={runnable:J,programLog:F,vertexShader:{log:z,prefix:h},fragmentShader:{log:W,prefix:f}})}s.deleteShader(P),s.deleteShader(R),C=new Cr(s,v),j=Zm(s,v)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let j;this.getAttributes=function(){return j===void 0&&E(this),j};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(v,Gm)),g},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=R,this}let c_=0;class h_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new u_(t),e.set(t,n)),n}}class u_{constructor(t){this.id=c_++,this.code=t,this.usedTimes=0}}function f_(i,t,e,n,s,r,a){const o=new Po,l=new h_,c=new Set,u=[],d=s.logarithmicDepthBuffer,p=s.reverseDepthBuffer,m=s.vertexTextures;let _=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(g){return c.add(g),g===0?"uv":`uv${g}`}function f(g,S,F,z,W){const J=z.fog,k=W.geometry,U=g.isMeshStandardMaterial?z.environment:null,D=(g.isMeshStandardMaterial?e:t).get(g.envMap||U),$=D&&D.mapping===kr?D.image.height:null,Q=v[g.type];g.precision!==null&&(_=s.getMaxPrecision(g.precision),_!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",_,"instead."));const K=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,at=K!==void 0?K.length:0;let ft=0;k.morphAttributes.position!==void 0&&(ft=1),k.morphAttributes.normal!==void 0&&(ft=2),k.morphAttributes.color!==void 0&&(ft=3);let X,nt,ut,ht;if(Q){const Ie=xn[Q];X=Ie.vertexShader,nt=Ie.fragmentShader}else X=g.vertexShader,nt=g.fragmentShader,l.update(g),ut=l.getVertexShaderID(g),ht=l.getFragmentShaderID(g);const Dt=i.getRenderTarget(),wt=W.isInstancedMesh===!0,Ht=W.isBatchedMesh===!0,Pt=!!g.map,Ut=!!g.matcap,L=!!D,te=!!g.aoMap,Gt=!!g.lightMap,Wt=!!g.bumpMap,Nt=!!g.normalMap,ne=!!g.displacementMap,It=!!g.emissiveMap,w=!!g.metalnessMap,x=!!g.roughnessMap,G=g.anisotropy>0,tt=g.clearcoat>0,rt=g.dispersion>0,et=g.iridescence>0,Rt=g.sheen>0,dt=g.transmission>0,Mt=G&&!!g.anisotropyMap,Kt=tt&&!!g.clearcoatMap,ot=tt&&!!g.clearcoatNormalMap,yt=tt&&!!g.clearcoatRoughnessMap,Vt=et&&!!g.iridescenceMap,Ft=et&&!!g.iridescenceThicknessMap,Et=Rt&&!!g.sheenColorMap,Zt=Rt&&!!g.sheenRoughnessMap,Bt=!!g.specularMap,ce=!!g.specularColorMap,I=!!g.specularIntensityMap,gt=dt&&!!g.transmissionMap,Z=dt&&!!g.thicknessMap,it=!!g.gradientMap,mt=!!g.alphaMap,xt=g.alphaTest>0,Yt=!!g.alphaHash,ge=!!g.extensions;let Te=ti;g.toneMapped&&(Dt===null||Dt.isXRRenderTarget===!0)&&(Te=i.toneMapping);const Jt={shaderID:Q,shaderType:g.type,shaderName:g.name,vertexShader:X,fragmentShader:nt,defines:g.defines,customVertexShaderID:ut,customFragmentShaderID:ht,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:_,batching:Ht,batchingColor:Ht&&W._colorsTexture!==null,instancing:wt,instancingColor:wt&&W.instanceColor!==null,instancingMorph:wt&&W.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Dt===null?i.outputColorSpace:Dt.isXRRenderTarget===!0?Dt.texture.colorSpace:ai,alphaToCoverage:!!g.alphaToCoverage,map:Pt,matcap:Ut,envMap:L,envMapMode:L&&D.mapping,envMapCubeUVHeight:$,aoMap:te,lightMap:Gt,bumpMap:Wt,normalMap:Nt,displacementMap:m&&ne,emissiveMap:It,normalMapObjectSpace:Nt&&g.normalMapType===gu,normalMapTangentSpace:Nt&&g.normalMapType===Jc,metalnessMap:w,roughnessMap:x,anisotropy:G,anisotropyMap:Mt,clearcoat:tt,clearcoatMap:Kt,clearcoatNormalMap:ot,clearcoatRoughnessMap:yt,dispersion:rt,iridescence:et,iridescenceMap:Vt,iridescenceThicknessMap:Ft,sheen:Rt,sheenColorMap:Et,sheenRoughnessMap:Zt,specularMap:Bt,specularColorMap:ce,specularIntensityMap:I,transmission:dt,transmissionMap:gt,thicknessMap:Z,gradientMap:it,opaque:g.transparent===!1&&g.blending===as&&g.alphaToCoverage===!1,alphaMap:mt,alphaTest:xt,alphaHash:Yt,combine:g.combine,mapUv:Pt&&h(g.map.channel),aoMapUv:te&&h(g.aoMap.channel),lightMapUv:Gt&&h(g.lightMap.channel),bumpMapUv:Wt&&h(g.bumpMap.channel),normalMapUv:Nt&&h(g.normalMap.channel),displacementMapUv:ne&&h(g.displacementMap.channel),emissiveMapUv:It&&h(g.emissiveMap.channel),metalnessMapUv:w&&h(g.metalnessMap.channel),roughnessMapUv:x&&h(g.roughnessMap.channel),anisotropyMapUv:Mt&&h(g.anisotropyMap.channel),clearcoatMapUv:Kt&&h(g.clearcoatMap.channel),clearcoatNormalMapUv:ot&&h(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&h(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Vt&&h(g.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&h(g.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&h(g.sheenColorMap.channel),sheenRoughnessMapUv:Zt&&h(g.sheenRoughnessMap.channel),specularMapUv:Bt&&h(g.specularMap.channel),specularColorMapUv:ce&&h(g.specularColorMap.channel),specularIntensityMapUv:I&&h(g.specularIntensityMap.channel),transmissionMapUv:gt&&h(g.transmissionMap.channel),thicknessMapUv:Z&&h(g.thicknessMap.channel),alphaMapUv:mt&&h(g.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Nt||G),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!k.attributes.uv&&(Pt||mt),fog:!!J,useFog:g.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:p,skinning:W.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:ft,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:Te,decodeVideoTexture:Pt&&g.map.isVideoTexture===!0&&le.getTransfer(g.map.colorSpace)===ve,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Un,flipSided:g.side===Ze,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ge&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&g.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Jt.vertexUv1s=c.has(1),Jt.vertexUv2s=c.has(2),Jt.vertexUv3s=c.has(3),c.clear(),Jt}function T(g){const S=[];if(g.shaderID?S.push(g.shaderID):(S.push(g.customVertexShaderID),S.push(g.customFragmentShaderID)),g.defines!==void 0)for(const F in g.defines)S.push(F),S.push(g.defines[F]);return g.isRawShaderMaterial===!1&&(M(S,g),y(S,g),S.push(i.outputColorSpace)),S.push(g.customProgramCacheKey),S.join()}function M(g,S){g.push(S.precision),g.push(S.outputColorSpace),g.push(S.envMapMode),g.push(S.envMapCubeUVHeight),g.push(S.mapUv),g.push(S.alphaMapUv),g.push(S.lightMapUv),g.push(S.aoMapUv),g.push(S.bumpMapUv),g.push(S.normalMapUv),g.push(S.displacementMapUv),g.push(S.emissiveMapUv),g.push(S.metalnessMapUv),g.push(S.roughnessMapUv),g.push(S.anisotropyMapUv),g.push(S.clearcoatMapUv),g.push(S.clearcoatNormalMapUv),g.push(S.clearcoatRoughnessMapUv),g.push(S.iridescenceMapUv),g.push(S.iridescenceThicknessMapUv),g.push(S.sheenColorMapUv),g.push(S.sheenRoughnessMapUv),g.push(S.specularMapUv),g.push(S.specularColorMapUv),g.push(S.specularIntensityMapUv),g.push(S.transmissionMapUv),g.push(S.thicknessMapUv),g.push(S.combine),g.push(S.fogExp2),g.push(S.sizeAttenuation),g.push(S.morphTargetsCount),g.push(S.morphAttributeCount),g.push(S.numDirLights),g.push(S.numPointLights),g.push(S.numSpotLights),g.push(S.numSpotLightMaps),g.push(S.numHemiLights),g.push(S.numRectAreaLights),g.push(S.numDirLightShadows),g.push(S.numPointLightShadows),g.push(S.numSpotLightShadows),g.push(S.numSpotLightShadowsWithMaps),g.push(S.numLightProbes),g.push(S.shadowMapType),g.push(S.toneMapping),g.push(S.numClippingPlanes),g.push(S.numClipIntersection),g.push(S.depthPacking)}function y(g,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),g.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),g.push(o.mask)}function P(g){const S=v[g.type];let F;if(S){const z=xn[S];F=$u.clone(z.uniforms)}else F=g.uniforms;return F}function R(g,S){let F;for(let z=0,W=u.length;z<W;z++){const J=u[z];if(J.cacheKey===S){F=J,++F.usedTimes;break}}return F===void 0&&(F=new l_(i,S,g,r),u.push(F)),F}function E(g){if(--g.usedTimes===0){const S=u.indexOf(g);u[S]=u[u.length-1],u.pop(),g.destroy()}}function C(g){l.remove(g)}function j(){l.dispose()}return{getParameters:f,getProgramCacheKey:T,getUniforms:P,acquireProgram:R,releaseProgram:E,releaseShaderCache:C,programs:u,dispose:j}}function d_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function p_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ll(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Dl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,p,m,_,v,h){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:p,material:m,groupOrder:_,renderOrder:d.renderOrder,z:v,group:h},i[t]=f):(f.id=d.id,f.object=d,f.geometry=p,f.material=m,f.groupOrder=_,f.renderOrder=d.renderOrder,f.z=v,f.group=h),t++,f}function o(d,p,m,_,v,h){const f=a(d,p,m,_,v,h);m.transmission>0?n.push(f):m.transparent===!0?s.push(f):e.push(f)}function l(d,p,m,_,v,h){const f=a(d,p,m,_,v,h);m.transmission>0?n.unshift(f):m.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,p){e.length>1&&e.sort(d||p_),n.length>1&&n.sort(p||Ll),s.length>1&&s.sort(p||Ll)}function u(){for(let d=t,p=i.length;d<p;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function m_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Dl,i.set(n,[a])):s>=r.length?(a=new Dl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function __(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new ee};break;case"SpotLight":e={position:new H,direction:new H,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function g_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let v_=0;function M_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function x_(i){const t=new __,e=g_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const s=new H,r=new xe,a=new xe;function o(c){let u=0,d=0,p=0;for(let j=0;j<9;j++)n.probe[j].set(0,0,0);let m=0,_=0,v=0,h=0,f=0,T=0,M=0,y=0,P=0,R=0,E=0;c.sort(M_);for(let j=0,g=c.length;j<g;j++){const S=c[j],F=S.color,z=S.intensity,W=S.distance,J=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)u+=F.r*z,d+=F.g*z,p+=F.b*z;else if(S.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(S.sh.coefficients[k],z);E++}else if(S.isDirectionalLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const U=S.shadow,D=e.get(S);D.shadowIntensity=U.intensity,D.shadowBias=U.bias,D.shadowNormalBias=U.normalBias,D.shadowRadius=U.radius,D.shadowMapSize=U.mapSize,n.directionalShadow[m]=D,n.directionalShadowMap[m]=J,n.directionalShadowMatrix[m]=S.shadow.matrix,T++}n.directional[m]=k,m++}else if(S.isSpotLight){const k=t.get(S);k.position.setFromMatrixPosition(S.matrixWorld),k.color.copy(F).multiplyScalar(z),k.distance=W,k.coneCos=Math.cos(S.angle),k.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),k.decay=S.decay,n.spot[v]=k;const U=S.shadow;if(S.map&&(n.spotLightMap[P]=S.map,P++,U.updateMatrices(S),S.castShadow&&R++),n.spotLightMatrix[v]=U.matrix,S.castShadow){const D=e.get(S);D.shadowIntensity=U.intensity,D.shadowBias=U.bias,D.shadowNormalBias=U.normalBias,D.shadowRadius=U.radius,D.shadowMapSize=U.mapSize,n.spotShadow[v]=D,n.spotShadowMap[v]=J,y++}v++}else if(S.isRectAreaLight){const k=t.get(S);k.color.copy(F).multiplyScalar(z),k.halfWidth.set(S.width*.5,0,0),k.halfHeight.set(0,S.height*.5,0),n.rectArea[h]=k,h++}else if(S.isPointLight){const k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),k.distance=S.distance,k.decay=S.decay,S.castShadow){const U=S.shadow,D=e.get(S);D.shadowIntensity=U.intensity,D.shadowBias=U.bias,D.shadowNormalBias=U.normalBias,D.shadowRadius=U.radius,D.shadowMapSize=U.mapSize,D.shadowCameraNear=U.camera.near,D.shadowCameraFar=U.camera.far,n.pointShadow[_]=D,n.pointShadowMap[_]=J,n.pointShadowMatrix[_]=S.shadow.matrix,M++}n.point[_]=k,_++}else if(S.isHemisphereLight){const k=t.get(S);k.skyColor.copy(S.color).multiplyScalar(z),k.groundColor.copy(S.groundColor).multiplyScalar(z),n.hemi[f]=k,f++}}h>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=p;const C=n.hash;(C.directionalLength!==m||C.pointLength!==_||C.spotLength!==v||C.rectAreaLength!==h||C.hemiLength!==f||C.numDirectionalShadows!==T||C.numPointShadows!==M||C.numSpotShadows!==y||C.numSpotMaps!==P||C.numLightProbes!==E)&&(n.directional.length=m,n.spot.length=v,n.rectArea.length=h,n.point.length=_,n.hemi.length=f,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+P-R,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=E,C.directionalLength=m,C.pointLength=_,C.spotLength=v,C.rectAreaLength=h,C.hemiLength=f,C.numDirectionalShadows=T,C.numPointShadows=M,C.numSpotShadows=y,C.numSpotMaps=P,C.numLightProbes=E,n.version=v_++)}function l(c,u){let d=0,p=0,m=0,_=0,v=0;const h=u.matrixWorldInverse;for(let f=0,T=c.length;f<T;f++){const M=c[f];if(M.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(h),d++}else if(M.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(h),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(h),m++}else if(M.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(h),a.identity(),r.copy(M.matrixWorld),r.premultiply(h),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(h),p++}else if(M.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(h),v++}}}return{setup:o,setupView:l,state:n}}function Ul(i){const t=new x_(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function S_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Ul(i),t.set(s,[o])):r>=a.length?(o=new Ul(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class E_ extends _s{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class y_ extends _s{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const b_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function A_(i,t,e){let n=new Lo;const s=new kt,r=new kt,a=new Se,o=new E_({depthPacking:_u}),l=new y_,c={},u=e.maxTextureSize,d={[ni]:Ze,[Ze]:ni,[Un]:Un},p=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:b_,fragmentShader:T_}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const _=new bn;_.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new en(_,p),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zc;let f=this.type;this.render=function(R,E,C){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||R.length===0)return;const j=i.getRenderTarget(),g=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Qn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=f!==Dn&&this.type===Dn,W=f===Dn&&this.type!==Dn;for(let J=0,k=R.length;J<k;J++){const U=R[J],D=U.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const $=D.getFrameExtents();if(s.multiply($),r.copy(D.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/$.x),s.x=r.x*$.x,D.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/$.y),s.y=r.y*$.y,D.mapSize.y=r.y)),D.map===null||z===!0||W===!0){const K=this.type!==Dn?{minFilter:on,magFilter:on}:{};D.map!==null&&D.map.dispose(),D.map=new Ai(s.x,s.y,K),D.map.texture.name=U.name+".shadowMap",D.camera.updateProjectionMatrix()}i.setRenderTarget(D.map),i.clear();const Q=D.getViewportCount();for(let K=0;K<Q;K++){const at=D.getViewport(K);a.set(r.x*at.x,r.y*at.y,r.x*at.z,r.y*at.w),F.viewport(a),D.updateMatrices(U,K),n=D.getFrustum(),y(E,C,D.camera,U,this.type)}D.isPointLightShadow!==!0&&this.type===Dn&&T(D,C),D.needsUpdate=!1}f=this.type,h.needsUpdate=!1,i.setRenderTarget(j,g,S)};function T(R,E){const C=t.update(v);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ai(s.x,s.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(E,null,C,p,v,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(E,null,C,m,v,null)}function M(R,E,C,j){let g=null;const S=C.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(S!==void 0)g=S;else if(g=C.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const F=g.uuid,z=E.uuid;let W=c[F];W===void 0&&(W={},c[F]=W);let J=W[z];J===void 0&&(J=g.clone(),W[z]=J,E.addEventListener("dispose",P)),g=J}if(g.visible=E.visible,g.wireframe=E.wireframe,j===Dn?g.side=E.shadowSide!==null?E.shadowSide:E.side:g.side=E.shadowSide!==null?E.shadowSide:d[E.side],g.alphaMap=E.alphaMap,g.alphaTest=E.alphaTest,g.map=E.map,g.clipShadows=E.clipShadows,g.clippingPlanes=E.clippingPlanes,g.clipIntersection=E.clipIntersection,g.displacementMap=E.displacementMap,g.displacementScale=E.displacementScale,g.displacementBias=E.displacementBias,g.wireframeLinewidth=E.wireframeLinewidth,g.linewidth=E.linewidth,C.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const F=i.properties.get(g);F.light=C}return g}function y(R,E,C,j,g){if(R.visible===!1)return;if(R.layers.test(E.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&g===Dn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,R.matrixWorld);const z=t.update(R),W=R.material;if(Array.isArray(W)){const J=z.groups;for(let k=0,U=J.length;k<U;k++){const D=J[k],$=W[D.materialIndex];if($&&$.visible){const Q=M(R,$,j,g);R.onBeforeShadow(i,R,E,C,z,Q,D),i.renderBufferDirect(C,null,z,Q,R,D),R.onAfterShadow(i,R,E,C,z,Q,D)}}}else if(W.visible){const J=M(R,W,j,g);R.onBeforeShadow(i,R,E,C,z,J,null),i.renderBufferDirect(C,null,z,J,R,null),R.onAfterShadow(i,R,E,C,z,J,null)}}const F=R.children;for(let z=0,W=F.length;z<W;z++)y(F[z],E,C,j,g)}function P(R){R.target.removeEventListener("dispose",P);for(const C in c){const j=c[C],g=R.target.uuid;g in j&&(j[g].dispose(),delete j[g])}}}const w_={[Ca]:Pa,[La]:Ia,[Da]:Na,[hs]:Ua,[Pa]:Ca,[Ia]:La,[Na]:Da,[Ua]:hs};function R_(i){function t(){let I=!1;const gt=new Se;let Z=null;const it=new Se(0,0,0,0);return{setMask:function(mt){Z!==mt&&!I&&(i.colorMask(mt,mt,mt,mt),Z=mt)},setLocked:function(mt){I=mt},setClear:function(mt,xt,Yt,ge,Te){Te===!0&&(mt*=ge,xt*=ge,Yt*=ge),gt.set(mt,xt,Yt,ge),it.equals(gt)===!1&&(i.clearColor(mt,xt,Yt,ge),it.copy(gt))},reset:function(){I=!1,Z=null,it.set(-1,0,0,0)}}}function e(){let I=!1,gt=!1,Z=null,it=null,mt=null;return{setReversed:function(xt){gt=xt},setTest:function(xt){xt?ut(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(xt){Z!==xt&&!I&&(i.depthMask(xt),Z=xt)},setFunc:function(xt){if(gt&&(xt=w_[xt]),it!==xt){switch(xt){case Ca:i.depthFunc(i.NEVER);break;case Pa:i.depthFunc(i.ALWAYS);break;case La:i.depthFunc(i.LESS);break;case hs:i.depthFunc(i.LEQUAL);break;case Da:i.depthFunc(i.EQUAL);break;case Ua:i.depthFunc(i.GEQUAL);break;case Ia:i.depthFunc(i.GREATER);break;case Na:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}it=xt}},setLocked:function(xt){I=xt},setClear:function(xt){mt!==xt&&(i.clearDepth(xt),mt=xt)},reset:function(){I=!1,Z=null,it=null,mt=null}}}function n(){let I=!1,gt=null,Z=null,it=null,mt=null,xt=null,Yt=null,ge=null,Te=null;return{setTest:function(Jt){I||(Jt?ut(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(Jt){gt!==Jt&&!I&&(i.stencilMask(Jt),gt=Jt)},setFunc:function(Jt,Ie,nn){(Z!==Jt||it!==Ie||mt!==nn)&&(i.stencilFunc(Jt,Ie,nn),Z=Jt,it=Ie,mt=nn)},setOp:function(Jt,Ie,nn){(xt!==Jt||Yt!==Ie||ge!==nn)&&(i.stencilOp(Jt,Ie,nn),xt=Jt,Yt=Ie,ge=nn)},setLocked:function(Jt){I=Jt},setClear:function(Jt){Te!==Jt&&(i.clearStencil(Jt),Te=Jt)},reset:function(){I=!1,gt=null,Z=null,it=null,mt=null,xt=null,Yt=null,ge=null,Te=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},u={},d=new WeakMap,p=[],m=null,_=!1,v=null,h=null,f=null,T=null,M=null,y=null,P=null,R=new ee(0,0,0),E=0,C=!1,j=null,g=null,S=null,F=null,z=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,k=0;const U=i.getParameter(i.VERSION);U.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(U)[1]),J=k>=1):U.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),J=k>=2);let D=null,$={};const Q=i.getParameter(i.SCISSOR_BOX),K=i.getParameter(i.VIEWPORT),at=new Se().fromArray(Q),ft=new Se().fromArray(K);function X(I,gt,Z,it){const mt=new Uint8Array(4),xt=i.createTexture();i.bindTexture(I,xt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Yt=0;Yt<Z;Yt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(gt,0,i.RGBA,1,1,it,0,i.RGBA,i.UNSIGNED_BYTE,mt):i.texImage2D(gt+Yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,mt);return xt}const nt={};nt[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),nt[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),nt[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ut(i.DEPTH_TEST),r.setFunc(hs),Gt(!1),Wt(Go),ut(i.CULL_FACE),L(Qn);function ut(I){c[I]!==!0&&(i.enable(I),c[I]=!0)}function ht(I){c[I]!==!1&&(i.disable(I),c[I]=!1)}function Dt(I,gt){return u[I]!==gt?(i.bindFramebuffer(I,gt),u[I]=gt,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=gt),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=gt),!0):!1}function wt(I,gt){let Z=p,it=!1;if(I){Z=d.get(gt),Z===void 0&&(Z=[],d.set(gt,Z));const mt=I.textures;if(Z.length!==mt.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let xt=0,Yt=mt.length;xt<Yt;xt++)Z[xt]=i.COLOR_ATTACHMENT0+xt;Z.length=mt.length,it=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,it=!0);it&&i.drawBuffers(Z)}function Ht(I){return m!==I?(i.useProgram(I),m=I,!0):!1}const Pt={[gi]:i.FUNC_ADD,[Gh]:i.FUNC_SUBTRACT,[Vh]:i.FUNC_REVERSE_SUBTRACT};Pt[Wh]=i.MIN,Pt[Xh]=i.MAX;const Ut={[qh]:i.ZERO,[Yh]:i.ONE,[$h]:i.SRC_COLOR,[wa]:i.SRC_ALPHA,[tu]:i.SRC_ALPHA_SATURATE,[Jh]:i.DST_COLOR,[Kh]:i.DST_ALPHA,[jh]:i.ONE_MINUS_SRC_COLOR,[Ra]:i.ONE_MINUS_SRC_ALPHA,[Qh]:i.ONE_MINUS_DST_COLOR,[Zh]:i.ONE_MINUS_DST_ALPHA,[eu]:i.CONSTANT_COLOR,[nu]:i.ONE_MINUS_CONSTANT_COLOR,[iu]:i.CONSTANT_ALPHA,[su]:i.ONE_MINUS_CONSTANT_ALPHA};function L(I,gt,Z,it,mt,xt,Yt,ge,Te,Jt){if(I===Qn){_===!0&&(ht(i.BLEND),_=!1);return}if(_===!1&&(ut(i.BLEND),_=!0),I!==Hh){if(I!==v||Jt!==C){if((h!==gi||M!==gi)&&(i.blendEquation(i.FUNC_ADD),h=gi,M=gi),Jt)switch(I){case as:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vo:i.blendFunc(i.ONE,i.ONE);break;case Wo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case as:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}f=null,T=null,y=null,P=null,R.set(0,0,0),E=0,v=I,C=Jt}return}mt=mt||gt,xt=xt||Z,Yt=Yt||it,(gt!==h||mt!==M)&&(i.blendEquationSeparate(Pt[gt],Pt[mt]),h=gt,M=mt),(Z!==f||it!==T||xt!==y||Yt!==P)&&(i.blendFuncSeparate(Ut[Z],Ut[it],Ut[xt],Ut[Yt]),f=Z,T=it,y=xt,P=Yt),(ge.equals(R)===!1||Te!==E)&&(i.blendColor(ge.r,ge.g,ge.b,Te),R.copy(ge),E=Te),v=I,C=!1}function te(I,gt){I.side===Un?ht(i.CULL_FACE):ut(i.CULL_FACE);let Z=I.side===Ze;gt&&(Z=!Z),Gt(Z),I.blending===as&&I.transparent===!1?L(Qn):L(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),r.setFunc(I.depthFunc),r.setTest(I.depthTest),r.setMask(I.depthWrite),s.setMask(I.colorWrite);const it=I.stencilWrite;a.setTest(it),it&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ne(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ut(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(I){j!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),j=I)}function Wt(I){I!==Bh?(ut(i.CULL_FACE),I!==g&&(I===Go?i.cullFace(i.BACK):I===zh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),g=I}function Nt(I){I!==S&&(J&&i.lineWidth(I),S=I)}function ne(I,gt,Z){I?(ut(i.POLYGON_OFFSET_FILL),(F!==gt||z!==Z)&&(i.polygonOffset(gt,Z),F=gt,z=Z)):ht(i.POLYGON_OFFSET_FILL)}function It(I){I?ut(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function w(I){I===void 0&&(I=i.TEXTURE0+W-1),D!==I&&(i.activeTexture(I),D=I)}function x(I,gt,Z){Z===void 0&&(D===null?Z=i.TEXTURE0+W-1:Z=D);let it=$[Z];it===void 0&&(it={type:void 0,texture:void 0},$[Z]=it),(it.type!==I||it.texture!==gt)&&(D!==Z&&(i.activeTexture(Z),D=Z),i.bindTexture(I,gt||nt[I]),it.type=I,it.texture=gt)}function G(){const I=$[D];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function tt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function rt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Rt(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function dt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Kt(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ot(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Vt(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ft(I){at.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),at.copy(I))}function Et(I){ft.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),ft.copy(I))}function Zt(I,gt){let Z=l.get(gt);Z===void 0&&(Z=new WeakMap,l.set(gt,Z));let it=Z.get(I);it===void 0&&(it=i.getUniformBlockIndex(gt,I.name),Z.set(I,it))}function Bt(I,gt){const it=l.get(gt).get(I);o.get(gt)!==it&&(i.uniformBlockBinding(gt,it,I.__bindingPointIndex),o.set(gt,it))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},D=null,$={},u={},d=new WeakMap,p=[],m=null,_=!1,v=null,h=null,f=null,T=null,M=null,y=null,P=null,R=new ee(0,0,0),E=0,C=!1,j=null,g=null,S=null,F=null,z=null,at.set(0,0,i.canvas.width,i.canvas.height),ft.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:ut,disable:ht,bindFramebuffer:Dt,drawBuffers:wt,useProgram:Ht,setBlending:L,setMaterial:te,setFlipSided:Gt,setCullFace:Wt,setLineWidth:Nt,setPolygonOffset:ne,setScissorTest:It,activeTexture:w,bindTexture:x,unbindTexture:G,compressedTexImage2D:tt,compressedTexImage3D:rt,texImage2D:yt,texImage3D:Vt,updateUBOMapping:Zt,uniformBlockBinding:Bt,texStorage2D:Kt,texStorage3D:ot,texSubImage2D:et,texSubImage3D:Rt,compressedTexSubImage2D:dt,compressedTexSubImage3D:Mt,scissor:Ft,viewport:Et,reset:ce}}function Il(i,t,e,n){const s=C_(n);switch(e){case Xc:return i*t;case Yc:return i*t;case $c:return i*t*2;case jc:return i*t/s.components*s.byteLength;case bo:return i*t/s.components*s.byteLength;case Kc:return i*t*2/s.components*s.byteLength;case To:return i*t*2/s.components*s.byteLength;case qc:return i*t*3/s.components*s.byteLength;case pn:return i*t*4/s.components*s.byteLength;case Ao:return i*t*4/s.components*s.byteLength;case Er:case yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case br:case Tr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:case Va:return Math.max(i,16)*Math.max(t,8)/4;case ka:case Ga:return Math.max(i,8)*Math.max(t,8)/2;case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $a:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ja:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case to:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case eo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case no:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case io:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case so:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ro:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ao:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ar:case oo:case lo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Zc:case co:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ho:case uo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function C_(i){switch(i){case On:case Gc:return{byteLength:1,components:1};case zs:case Vc:case Gs:return{byteLength:2,components:1};case Eo:case yo:return{byteLength:2,components:4};case Ti:case So:case Nn:return{byteLength:4,components:1};case Wc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function P_(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new kt,u=new WeakMap;let d;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,x){return m?new OffscreenCanvas(w,x):Fr("canvas")}function v(w,x,G){let tt=1;const rt=It(w);if((rt.width>G||rt.height>G)&&(tt=G/Math.max(rt.width,rt.height)),tt<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const et=Math.floor(tt*rt.width),Rt=Math.floor(tt*rt.height);d===void 0&&(d=_(et,Rt));const dt=x?_(et,Rt):d;return dt.width=et,dt.height=Rt,dt.getContext("2d").drawImage(w,0,0,et,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+et+"x"+Rt+")."),dt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),w;return w}function h(w){return w.generateMipmaps&&w.minFilter!==on&&w.minFilter!==fn}function f(w){i.generateMipmap(w)}function T(w,x,G,tt,rt=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let et=x;if(x===i.RED&&(G===i.FLOAT&&(et=i.R32F),G===i.HALF_FLOAT&&(et=i.R16F),G===i.UNSIGNED_BYTE&&(et=i.R8)),x===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(et=i.R8UI),G===i.UNSIGNED_SHORT&&(et=i.R16UI),G===i.UNSIGNED_INT&&(et=i.R32UI),G===i.BYTE&&(et=i.R8I),G===i.SHORT&&(et=i.R16I),G===i.INT&&(et=i.R32I)),x===i.RG&&(G===i.FLOAT&&(et=i.RG32F),G===i.HALF_FLOAT&&(et=i.RG16F),G===i.UNSIGNED_BYTE&&(et=i.RG8)),x===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(et=i.RG8UI),G===i.UNSIGNED_SHORT&&(et=i.RG16UI),G===i.UNSIGNED_INT&&(et=i.RG32UI),G===i.BYTE&&(et=i.RG8I),G===i.SHORT&&(et=i.RG16I),G===i.INT&&(et=i.RG32I)),x===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(et=i.RGB8UI),G===i.UNSIGNED_SHORT&&(et=i.RGB16UI),G===i.UNSIGNED_INT&&(et=i.RGB32UI),G===i.BYTE&&(et=i.RGB8I),G===i.SHORT&&(et=i.RGB16I),G===i.INT&&(et=i.RGB32I)),x===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(et=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(et=i.RGBA16UI),G===i.UNSIGNED_INT&&(et=i.RGBA32UI),G===i.BYTE&&(et=i.RGBA8I),G===i.SHORT&&(et=i.RGBA16I),G===i.INT&&(et=i.RGBA32I)),x===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),x===i.RGBA){const Rt=rt?Dr:le.getTransfer(tt);G===i.FLOAT&&(et=i.RGBA32F),G===i.HALF_FLOAT&&(et=i.RGBA16F),G===i.UNSIGNED_BYTE&&(et=Rt===ve?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function M(w,x){let G;return w?x===null||x===Ti||x===ds?G=i.DEPTH24_STENCIL8:x===Nn?G=i.DEPTH32F_STENCIL8:x===zs&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ti||x===ds?G=i.DEPTH_COMPONENT24:x===Nn?G=i.DEPTH_COMPONENT32F:x===zs&&(G=i.DEPTH_COMPONENT16),G}function y(w,x){return h(w)===!0||w.isFramebufferTexture&&w.minFilter!==on&&w.minFilter!==fn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function P(w){const x=w.target;x.removeEventListener("dispose",P),E(x),x.isVideoTexture&&u.delete(x)}function R(w){const x=w.target;x.removeEventListener("dispose",R),j(x)}function E(w){const x=n.get(w);if(x.__webglInit===void 0)return;const G=w.source,tt=p.get(G);if(tt){const rt=tt[x.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&C(w),Object.keys(tt).length===0&&p.delete(G)}n.remove(w)}function C(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const G=w.source,tt=p.get(G);delete tt[x.__cacheKey],a.memory.textures--}function j(w){const x=n.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(x.__webglFramebuffer[tt]))for(let rt=0;rt<x.__webglFramebuffer[tt].length;rt++)i.deleteFramebuffer(x.__webglFramebuffer[tt][rt]);else i.deleteFramebuffer(x.__webglFramebuffer[tt]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[tt])}else{if(Array.isArray(x.__webglFramebuffer))for(let tt=0;tt<x.__webglFramebuffer.length;tt++)i.deleteFramebuffer(x.__webglFramebuffer[tt]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let tt=0;tt<x.__webglColorRenderbuffer.length;tt++)x.__webglColorRenderbuffer[tt]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[tt]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const G=w.textures;for(let tt=0,rt=G.length;tt<rt;tt++){const et=n.get(G[tt]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),a.memory.textures--),n.remove(G[tt])}n.remove(w)}let g=0;function S(){g=0}function F(){const w=g;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),g+=1,w}function z(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function W(w,x){const G=n.get(w);if(w.isVideoTexture&&Nt(w),w.isRenderTargetTexture===!1&&w.version>0&&G.__version!==w.version){const tt=w.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ft(G,w,x);return}}e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+x)}function J(w,x){const G=n.get(w);if(w.version>0&&G.__version!==w.version){ft(G,w,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+x)}function k(w,x){const G=n.get(w);if(w.version>0&&G.__version!==w.version){ft(G,w,x);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+x)}function U(w,x){const G=n.get(w);if(w.version>0&&G.__version!==w.version){X(G,w,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+x)}const D={[Ba]:i.REPEAT,[xi]:i.CLAMP_TO_EDGE,[za]:i.MIRRORED_REPEAT},$={[on]:i.NEAREST,[pu]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[Si]:i.LINEAR_MIPMAP_LINEAR},Q={[vu]:i.NEVER,[bu]:i.ALWAYS,[Mu]:i.LESS,[Qc]:i.LEQUAL,[xu]:i.EQUAL,[yu]:i.GEQUAL,[Su]:i.GREATER,[Eu]:i.NOTEQUAL};function K(w,x){if(x.type===Nn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===fn||x.magFilter===qr||x.magFilter===js||x.magFilter===Si||x.minFilter===fn||x.minFilter===qr||x.minFilter===js||x.minFilter===Si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,D[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,D[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,D[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,$[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,$[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Q[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===on||x.minFilter!==js&&x.minFilter!==Si||x.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function at(w,x){let G=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",P));const tt=x.source;let rt=p.get(tt);rt===void 0&&(rt={},p.set(tt,rt));const et=z(x);if(et!==w.__cacheKey){rt[et]===void 0&&(rt[et]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),rt[et].usedTimes++;const Rt=rt[w.__cacheKey];Rt!==void 0&&(rt[w.__cacheKey].usedTimes--,Rt.usedTimes===0&&C(x)),w.__cacheKey=et,w.__webglTexture=rt[et].texture}return G}function ft(w,x,G){let tt=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(tt=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(tt=i.TEXTURE_3D);const rt=at(w,x),et=x.source;e.bindTexture(tt,w.__webglTexture,i.TEXTURE0+G);const Rt=n.get(et);if(et.version!==Rt.__version||rt===!0){e.activeTexture(i.TEXTURE0+G);const dt=le.getPrimaries(le.workingColorSpace),Mt=x.colorSpace===Zn?null:le.getPrimaries(x.colorSpace),Kt=x.colorSpace===Zn||dt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let ot=v(x.image,!1,s.maxTextureSize);ot=ne(x,ot);const yt=r.convert(x.format,x.colorSpace),Vt=r.convert(x.type);let Ft=T(x.internalFormat,yt,Vt,x.colorSpace,x.isVideoTexture);K(tt,x);let Et;const Zt=x.mipmaps,Bt=x.isVideoTexture!==!0,ce=Rt.__version===void 0||rt===!0,I=et.dataReady,gt=y(x,ot);if(x.isDepthTexture)Ft=M(x.format===ps,x.type),ce&&(Bt?e.texStorage2D(i.TEXTURE_2D,1,Ft,ot.width,ot.height):e.texImage2D(i.TEXTURE_2D,0,Ft,ot.width,ot.height,0,yt,Vt,null));else if(x.isDataTexture)if(Zt.length>0){Bt&&ce&&e.texStorage2D(i.TEXTURE_2D,gt,Ft,Zt[0].width,Zt[0].height);for(let Z=0,it=Zt.length;Z<it;Z++)Et=Zt[Z],Bt?I&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Et.width,Et.height,yt,Vt,Et.data):e.texImage2D(i.TEXTURE_2D,Z,Ft,Et.width,Et.height,0,yt,Vt,Et.data);x.generateMipmaps=!1}else Bt?(ce&&e.texStorage2D(i.TEXTURE_2D,gt,Ft,ot.width,ot.height),I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ot.width,ot.height,yt,Vt,ot.data)):e.texImage2D(i.TEXTURE_2D,0,Ft,ot.width,ot.height,0,yt,Vt,ot.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Bt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Ft,Zt[0].width,Zt[0].height,ot.depth);for(let Z=0,it=Zt.length;Z<it;Z++)if(Et=Zt[Z],x.format!==pn)if(yt!==null)if(Bt){if(I)if(x.layerUpdates.size>0){const mt=Il(Et.width,Et.height,x.format,x.type);for(const xt of x.layerUpdates){const Yt=Et.data.subarray(xt*mt/Et.data.BYTES_PER_ELEMENT,(xt+1)*mt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,xt,Et.width,Et.height,1,yt,Yt,0,0)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Et.width,Et.height,ot.depth,yt,Et.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,Ft,Et.width,Et.height,ot.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,Et.width,Et.height,ot.depth,yt,Vt,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,Ft,Et.width,Et.height,ot.depth,0,yt,Vt,Et.data)}else{Bt&&ce&&e.texStorage2D(i.TEXTURE_2D,gt,Ft,Zt[0].width,Zt[0].height);for(let Z=0,it=Zt.length;Z<it;Z++)Et=Zt[Z],x.format!==pn?yt!==null?Bt?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,Et.width,Et.height,yt,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,Ft,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?I&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,Et.width,Et.height,yt,Vt,Et.data):e.texImage2D(i.TEXTURE_2D,Z,Ft,Et.width,Et.height,0,yt,Vt,Et.data)}else if(x.isDataArrayTexture)if(Bt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Ft,ot.width,ot.height,ot.depth),I)if(x.layerUpdates.size>0){const Z=Il(ot.width,ot.height,x.format,x.type);for(const it of x.layerUpdates){const mt=ot.data.subarray(it*Z/ot.data.BYTES_PER_ELEMENT,(it+1)*Z/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,it,ot.width,ot.height,1,yt,Vt,mt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,yt,Vt,ot.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ft,ot.width,ot.height,ot.depth,0,yt,Vt,ot.data);else if(x.isData3DTexture)Bt?(ce&&e.texStorage3D(i.TEXTURE_3D,gt,Ft,ot.width,ot.height,ot.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,yt,Vt,ot.data)):e.texImage3D(i.TEXTURE_3D,0,Ft,ot.width,ot.height,ot.depth,0,yt,Vt,ot.data);else if(x.isFramebufferTexture){if(ce)if(Bt)e.texStorage2D(i.TEXTURE_2D,gt,Ft,ot.width,ot.height);else{let Z=ot.width,it=ot.height;for(let mt=0;mt<gt;mt++)e.texImage2D(i.TEXTURE_2D,mt,Ft,Z,it,0,yt,Vt,null),Z>>=1,it>>=1}}else if(Zt.length>0){if(Bt&&ce){const Z=It(Zt[0]);e.texStorage2D(i.TEXTURE_2D,gt,Ft,Z.width,Z.height)}for(let Z=0,it=Zt.length;Z<it;Z++)Et=Zt[Z],Bt?I&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,yt,Vt,Et):e.texImage2D(i.TEXTURE_2D,Z,Ft,yt,Vt,Et);x.generateMipmaps=!1}else if(Bt){if(ce){const Z=It(ot);e.texStorage2D(i.TEXTURE_2D,gt,Ft,Z.width,Z.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,yt,Vt,ot)}else e.texImage2D(i.TEXTURE_2D,0,Ft,yt,Vt,ot);h(x)&&f(tt),Rt.__version=et.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function X(w,x,G){if(x.image.length!==6)return;const tt=at(w,x),rt=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+G);const et=n.get(rt);if(rt.version!==et.__version||tt===!0){e.activeTexture(i.TEXTURE0+G);const Rt=le.getPrimaries(le.workingColorSpace),dt=x.colorSpace===Zn?null:le.getPrimaries(x.colorSpace),Mt=x.colorSpace===Zn||Rt===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Kt=x.isCompressedTexture||x.image[0].isCompressedTexture,ot=x.image[0]&&x.image[0].isDataTexture,yt=[];for(let it=0;it<6;it++)!Kt&&!ot?yt[it]=v(x.image[it],!0,s.maxCubemapSize):yt[it]=ot?x.image[it].image:x.image[it],yt[it]=ne(x,yt[it]);const Vt=yt[0],Ft=r.convert(x.format,x.colorSpace),Et=r.convert(x.type),Zt=T(x.internalFormat,Ft,Et,x.colorSpace),Bt=x.isVideoTexture!==!0,ce=et.__version===void 0||tt===!0,I=rt.dataReady;let gt=y(x,Vt);K(i.TEXTURE_CUBE_MAP,x);let Z;if(Kt){Bt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Zt,Vt.width,Vt.height);for(let it=0;it<6;it++){Z=yt[it].mipmaps;for(let mt=0;mt<Z.length;mt++){const xt=Z[mt];x.format!==pn?Ft!==null?Bt?I&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt,0,0,xt.width,xt.height,Ft,xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt,Zt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt,0,0,xt.width,xt.height,Ft,Et,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt,Zt,xt.width,xt.height,0,Ft,Et,xt.data)}}}else{if(Z=x.mipmaps,Bt&&ce){Z.length>0&&gt++;const it=It(yt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Zt,it.width,it.height)}for(let it=0;it<6;it++)if(ot){Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,yt[it].width,yt[it].height,Ft,Et,yt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Zt,yt[it].width,yt[it].height,0,Ft,Et,yt[it].data);for(let mt=0;mt<Z.length;mt++){const Yt=Z[mt].image[it].image;Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt+1,0,0,Yt.width,Yt.height,Ft,Et,Yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt+1,Zt,Yt.width,Yt.height,0,Ft,Et,Yt.data)}}else{Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Ft,Et,yt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Zt,Ft,Et,yt[it]);for(let mt=0;mt<Z.length;mt++){const xt=Z[mt];Bt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt+1,0,0,Ft,Et,xt.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,mt+1,Zt,Ft,Et,xt.image[it])}}}h(x)&&f(i.TEXTURE_CUBE_MAP),et.__version=rt.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function nt(w,x,G,tt,rt,et){const Rt=r.convert(G.format,G.colorSpace),dt=r.convert(G.type),Mt=T(G.internalFormat,Rt,dt,G.colorSpace);if(!n.get(x).__hasExternalTextures){const ot=Math.max(1,x.width>>et),yt=Math.max(1,x.height>>et);rt===i.TEXTURE_3D||rt===i.TEXTURE_2D_ARRAY?e.texImage3D(rt,et,Mt,ot,yt,x.depth,0,Rt,dt,null):e.texImage2D(rt,et,Mt,ot,yt,0,Rt,dt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),Wt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,rt,n.get(G).__webglTexture,0,Gt(x)):(rt===i.TEXTURE_2D||rt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,tt,rt,n.get(G).__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(w,x,G){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const tt=x.depthTexture,rt=tt&&tt.isDepthTexture?tt.type:null,et=M(x.stencilBuffer,rt),Rt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=Gt(x);Wt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,et,x.width,x.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,et,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,et,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,w)}else{const tt=x.textures;for(let rt=0;rt<tt.length;rt++){const et=tt[rt],Rt=r.convert(et.format,et.colorSpace),dt=r.convert(et.type),Mt=T(et.internalFormat,Rt,dt,et.colorSpace),Kt=Gt(x);G&&Wt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Kt,Mt,x.width,x.height):Wt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Kt,Mt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ht(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W(x.depthTexture,0);const tt=n.get(x.depthTexture).__webglTexture,rt=Gt(x);if(x.depthTexture.format===os)Wt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(x.depthTexture.format===ps)Wt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Dt(w){const x=n.get(w),G=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const tt=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),tt){const rt=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,tt.removeEventListener("dispose",rt)};tt.addEventListener("dispose",rt),x.__depthDisposeCallback=rt}x.__boundDepthTexture=tt}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ht(x.__webglFramebuffer,w)}else if(G){x.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[tt]),x.__webglDepthbuffer[tt]===void 0)x.__webglDepthbuffer[tt]=i.createRenderbuffer(),ut(x.__webglDepthbuffer[tt],w,!1);else{const rt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=x.__webglDepthbuffer[tt];i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,et)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ut(x.__webglDepthbuffer,w,!1);else{const tt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,rt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(w,x,G){const tt=n.get(w);x!==void 0&&nt(tt.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Dt(w)}function Ht(w){const x=w.texture,G=n.get(w),tt=n.get(x);w.addEventListener("dispose",R);const rt=w.textures,et=w.isWebGLCubeRenderTarget===!0,Rt=rt.length>1;if(Rt||(tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture()),tt.__version=x.version,a.memory.textures++),et){G.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer[dt]=[];for(let Mt=0;Mt<x.mipmaps.length;Mt++)G.__webglFramebuffer[dt][Mt]=i.createFramebuffer()}else G.__webglFramebuffer[dt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer=[];for(let dt=0;dt<x.mipmaps.length;dt++)G.__webglFramebuffer[dt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let dt=0,Mt=rt.length;dt<Mt;dt++){const Kt=n.get(rt[dt]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Wt(w)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let dt=0;dt<rt.length;dt++){const Mt=rt[dt];G.__webglColorRenderbuffer[dt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[dt]);const Kt=r.convert(Mt.format,Mt.colorSpace),ot=r.convert(Mt.type),yt=T(Mt.internalFormat,Kt,ot,Mt.colorSpace,w.isXRRenderTarget===!0),Vt=Gt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,yt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,G.__webglColorRenderbuffer[dt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),ut(G.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),K(i.TEXTURE_CUBE_MAP,x);for(let dt=0;dt<6;dt++)if(x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)nt(G.__webglFramebuffer[dt][Mt],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt);else nt(G.__webglFramebuffer[dt],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);h(x)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let dt=0,Mt=rt.length;dt<Mt;dt++){const Kt=rt[dt],ot=n.get(Kt);e.bindTexture(i.TEXTURE_2D,ot.__webglTexture),K(i.TEXTURE_2D,Kt),nt(G.__webglFramebuffer,w,Kt,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,0),h(Kt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let dt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(dt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,tt.__webglTexture),K(dt,x),x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)nt(G.__webglFramebuffer[Mt],w,x,i.COLOR_ATTACHMENT0,dt,Mt);else nt(G.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,dt,0);h(x)&&f(dt),e.unbindTexture()}w.depthBuffer&&Dt(w)}function Pt(w){const x=w.textures;for(let G=0,tt=x.length;G<tt;G++){const rt=x[G];if(h(rt)){const et=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Rt=n.get(rt).__webglTexture;e.bindTexture(et,Rt),f(et),e.unbindTexture()}}}const Ut=[],L=[];function te(w){if(w.samples>0){if(Wt(w)===!1){const x=w.textures,G=w.width,tt=w.height;let rt=i.COLOR_BUFFER_BIT;const et=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(w),dt=x.length>1;if(dt)for(let Mt=0;Mt<x.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let Mt=0;Mt<x.length;Mt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(rt|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(rt|=i.STENCIL_BUFFER_BIT)),dt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Mt]);const Kt=n.get(x[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Kt,0)}i.blitFramebuffer(0,0,G,tt,0,0,G,tt,rt,i.NEAREST),l===!0&&(Ut.length=0,L.length=0,Ut.push(i.COLOR_ATTACHMENT0+Mt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ut.push(et),L.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),dt)for(let Mt=0;Mt<x.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Mt]);const Kt=n.get(x[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,Kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Gt(w){return Math.min(s.maxSamples,w.samples)}function Wt(w){const x=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Nt(w){const x=a.render.frame;u.get(w)!==x&&(u.set(w,x),w.update())}function ne(w,x){const G=w.colorSpace,tt=w.format,rt=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||G!==ai&&G!==Zn&&(le.getTransfer(G)===ve?(tt!==pn||rt!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),x}function It(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=S,this.setTexture2D=W,this.setTexture2DArray=J,this.setTexture3D=k,this.setTextureCube=U,this.rebindTextures=wt,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=Pt,this.updateMultisampleRenderTarget=te,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=Wt}function L_(i,t){function e(n,s=Zn){let r;const a=le.getTransfer(s);if(n===On)return i.UNSIGNED_BYTE;if(n===Eo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gc)return i.BYTE;if(n===Vc)return i.SHORT;if(n===zs)return i.UNSIGNED_SHORT;if(n===So)return i.INT;if(n===Ti)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===Gs)return i.HALF_FLOAT;if(n===Xc)return i.ALPHA;if(n===qc)return i.RGB;if(n===pn)return i.RGBA;if(n===Yc)return i.LUMINANCE;if(n===$c)return i.LUMINANCE_ALPHA;if(n===os)return i.DEPTH_COMPONENT;if(n===ps)return i.DEPTH_STENCIL;if(n===jc)return i.RED;if(n===bo)return i.RED_INTEGER;if(n===Kc)return i.RG;if(n===To)return i.RG_INTEGER;if(n===Ao)return i.RGBA_INTEGER;if(n===Er||n===yr||n===br||n===Tr)if(a===ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===Ha||n===Ga||n===Va)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wa||n===Xa||n===qa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wa||n===Xa)return a===ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qa)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ya||n===$a||n===ja||n===Ka||n===Za||n===Ja||n===Qa||n===to||n===eo||n===no||n===io||n===so||n===ro||n===ao)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ya)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$a)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ja)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ka)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ja)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qa)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===to)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===eo)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===no)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===io)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===so)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ro)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ao)return a===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ar||n===oo||n===lo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ar)return a===ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===oo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===lo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zc||n===co||n===ho||n===uo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ar)return r.COMPRESSED_RED_RGTC1_EXT;if(n===co)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class D_ extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class is extends Oe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const U_={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new is,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new is,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new is,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const h=e.getJointPose(v,n),f=this._getHandJoint(c,v);h!==null&&(f.matrix.fromArray(h.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=h.radius),f.visible=h!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=u.position.distanceTo(d.position),m=.02,_=.005;c.inputState.pinching&&p>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(U_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new is;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const I_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,N_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class F_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new $e,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ii({vertexShader:I_,fragmentShader:N_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new en(new Ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class O_ extends Pi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,p=null,m=null,_=null;const v=new F_,h=e.getContextAttributes();let f=null,T=null;const M=[],y=[],P=new kt;let R=null;const E=new rn;E.layers.enable(1),E.viewport=new Se;const C=new rn;C.layers.enable(2),C.viewport=new Se;const j=[E,C],g=new D_;g.layers.enable(1),g.layers.enable(2);let S=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let nt=M[X];return nt===void 0&&(nt=new Sa,M[X]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(X){let nt=M[X];return nt===void 0&&(nt=new Sa,M[X]=nt),nt.getGripSpace()},this.getHand=function(X){let nt=M[X];return nt===void 0&&(nt=new Sa,M[X]=nt),nt.getHandSpace()};function z(X){const nt=y.indexOf(X.inputSource);if(nt===-1)return;const ut=M[nt];ut!==void 0&&(ut.update(X.inputSource,X.frame,c||a),ut.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",J);for(let X=0;X<M.length;X++){const nt=y[X];nt!==null&&(y[X]=null,M[X].disconnect(nt))}S=null,F=null,v.reset(),t.setRenderTarget(f),m=null,p=null,d=null,s=null,T=null,ft.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",W),s.addEventListener("inputsourceschange",J),h.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){const nt={antialias:h.antialias,alpha:!0,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new Ai(m.framebufferWidth,m.framebufferHeight,{format:pn,type:On,colorSpace:t.outputColorSpace,stencilBuffer:h.stencil})}else{let nt=null,ut=null,ht=null;h.depth&&(ht=h.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=h.stencil?ps:os,ut=h.stencil?ds:Ti);const Dt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};d=new XRWebGLBinding(s,e),p=d.createProjectionLayer(Dt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),T=new Ai(p.textureWidth,p.textureHeight,{format:pn,type:On,depthTexture:new fh(p.textureWidth,p.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:h.stencil,colorSpace:t.outputColorSpace,samples:h.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ft.setContext(s),ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function J(X){for(let nt=0;nt<X.removed.length;nt++){const ut=X.removed[nt],ht=y.indexOf(ut);ht>=0&&(y[ht]=null,M[ht].disconnect(ut))}for(let nt=0;nt<X.added.length;nt++){const ut=X.added[nt];let ht=y.indexOf(ut);if(ht===-1){for(let wt=0;wt<M.length;wt++)if(wt>=y.length){y.push(ut),ht=wt;break}else if(y[wt]===null){y[wt]=ut,ht=wt;break}if(ht===-1)break}const Dt=M[ht];Dt&&Dt.connect(ut)}}const k=new H,U=new H;function D(X,nt,ut){k.setFromMatrixPosition(nt.matrixWorld),U.setFromMatrixPosition(ut.matrixWorld);const ht=k.distanceTo(U),Dt=nt.projectionMatrix.elements,wt=ut.projectionMatrix.elements,Ht=Dt[14]/(Dt[10]-1),Pt=Dt[14]/(Dt[10]+1),Ut=(Dt[9]+1)/Dt[5],L=(Dt[9]-1)/Dt[5],te=(Dt[8]-1)/Dt[0],Gt=(wt[8]+1)/wt[0],Wt=Ht*te,Nt=Ht*Gt,ne=ht/(-te+Gt),It=ne*-te;if(nt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(It),X.translateZ(ne),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Dt[10]===-1)X.projectionMatrix.copy(nt.projectionMatrix),X.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const w=Ht+ne,x=Pt+ne,G=Wt-It,tt=Nt+(ht-It),rt=Ut*Pt/x*w,et=L*Pt/x*w;X.projectionMatrix.makePerspective(G,tt,rt,et,w,x),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function $(X,nt){nt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(nt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let nt=X.near,ut=X.far;v.texture!==null&&(v.depthNear>0&&(nt=v.depthNear),v.depthFar>0&&(ut=v.depthFar)),g.near=C.near=E.near=nt,g.far=C.far=E.far=ut,(S!==g.near||F!==g.far)&&(s.updateRenderState({depthNear:g.near,depthFar:g.far}),S=g.near,F=g.far);const ht=X.parent,Dt=g.cameras;$(g,ht);for(let wt=0;wt<Dt.length;wt++)$(Dt[wt],ht);Dt.length===2?D(g,E,C):g.projectionMatrix.copy(E.projectionMatrix),Q(X,g,ht)};function Q(X,nt,ut){ut===null?X.matrix.copy(nt.matrixWorld):(X.matrix.copy(ut.matrixWorld),X.matrix.invert(),X.matrix.multiply(nt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(nt.projectionMatrix),X.projectionMatrixInverse.copy(nt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=po*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(X){l=X,p!==null&&(p.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(g)};let K=null;function at(X,nt){if(u=nt.getViewerPose(c||a),_=nt,u!==null){const ut=u.views;m!==null&&(t.setRenderTargetFramebuffer(T,m.framebuffer),t.setRenderTarget(T));let ht=!1;ut.length!==g.cameras.length&&(g.cameras.length=0,ht=!0);for(let wt=0;wt<ut.length;wt++){const Ht=ut[wt];let Pt=null;if(m!==null)Pt=m.getViewport(Ht);else{const L=d.getViewSubImage(p,Ht);Pt=L.viewport,wt===0&&(t.setRenderTargetTextures(T,L.colorTexture,p.ignoreDepthValues?void 0:L.depthStencilTexture),t.setRenderTarget(T))}let Ut=j[wt];Ut===void 0&&(Ut=new rn,Ut.layers.enable(wt),Ut.viewport=new Se,j[wt]=Ut),Ut.matrix.fromArray(Ht.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(Ht.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),wt===0&&(g.matrix.copy(Ut.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),ht===!0&&g.cameras.push(Ut)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const wt=d.getDepthInformation(ut[0]);wt&&wt.isValid&&wt.texture&&v.init(t,wt,s.renderState)}}for(let ut=0;ut<M.length;ut++){const ht=y[ut],Dt=M[ut];ht!==null&&Dt!==void 0&&Dt.update(ht,nt,c||a)}K&&K(X,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),_=null}const ft=new hh;ft.setAnimationLoop(at),this.setAnimationLoop=function(X){K=X},this.dispose=function(){}}}const pi=new yn,B_=new xe;function z_(i,t){function e(h,f){h.matrixAutoUpdate===!0&&h.updateMatrix(),f.value.copy(h.matrix)}function n(h,f){f.color.getRGB(h.fogColor.value,oh(i)),f.isFog?(h.fogNear.value=f.near,h.fogFar.value=f.far):f.isFogExp2&&(h.fogDensity.value=f.density)}function s(h,f,T,M,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(h,f):f.isMeshToonMaterial?(r(h,f),d(h,f)):f.isMeshPhongMaterial?(r(h,f),u(h,f)):f.isMeshStandardMaterial?(r(h,f),p(h,f),f.isMeshPhysicalMaterial&&m(h,f,y)):f.isMeshMatcapMaterial?(r(h,f),_(h,f)):f.isMeshDepthMaterial?r(h,f):f.isMeshDistanceMaterial?(r(h,f),v(h,f)):f.isMeshNormalMaterial?r(h,f):f.isLineBasicMaterial?(a(h,f),f.isLineDashedMaterial&&o(h,f)):f.isPointsMaterial?l(h,f,T,M):f.isSpriteMaterial?c(h,f):f.isShadowMaterial?(h.color.value.copy(f.color),h.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(h,f){h.opacity.value=f.opacity,f.color&&h.diffuse.value.copy(f.color),f.emissive&&h.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(h.map.value=f.map,e(f.map,h.mapTransform)),f.alphaMap&&(h.alphaMap.value=f.alphaMap,e(f.alphaMap,h.alphaMapTransform)),f.bumpMap&&(h.bumpMap.value=f.bumpMap,e(f.bumpMap,h.bumpMapTransform),h.bumpScale.value=f.bumpScale,f.side===Ze&&(h.bumpScale.value*=-1)),f.normalMap&&(h.normalMap.value=f.normalMap,e(f.normalMap,h.normalMapTransform),h.normalScale.value.copy(f.normalScale),f.side===Ze&&h.normalScale.value.negate()),f.displacementMap&&(h.displacementMap.value=f.displacementMap,e(f.displacementMap,h.displacementMapTransform),h.displacementScale.value=f.displacementScale,h.displacementBias.value=f.displacementBias),f.emissiveMap&&(h.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,h.emissiveMapTransform)),f.specularMap&&(h.specularMap.value=f.specularMap,e(f.specularMap,h.specularMapTransform)),f.alphaTest>0&&(h.alphaTest.value=f.alphaTest);const T=t.get(f),M=T.envMap,y=T.envMapRotation;M&&(h.envMap.value=M,pi.copy(y),pi.x*=-1,pi.y*=-1,pi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.envMapRotation.value.setFromMatrix4(B_.makeRotationFromEuler(pi)),h.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.reflectivity.value=f.reflectivity,h.ior.value=f.ior,h.refractionRatio.value=f.refractionRatio),f.lightMap&&(h.lightMap.value=f.lightMap,h.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,h.lightMapTransform)),f.aoMap&&(h.aoMap.value=f.aoMap,h.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,h.aoMapTransform))}function a(h,f){h.diffuse.value.copy(f.color),h.opacity.value=f.opacity,f.map&&(h.map.value=f.map,e(f.map,h.mapTransform))}function o(h,f){h.dashSize.value=f.dashSize,h.totalSize.value=f.dashSize+f.gapSize,h.scale.value=f.scale}function l(h,f,T,M){h.diffuse.value.copy(f.color),h.opacity.value=f.opacity,h.size.value=f.size*T,h.scale.value=M*.5,f.map&&(h.map.value=f.map,e(f.map,h.uvTransform)),f.alphaMap&&(h.alphaMap.value=f.alphaMap,e(f.alphaMap,h.alphaMapTransform)),f.alphaTest>0&&(h.alphaTest.value=f.alphaTest)}function c(h,f){h.diffuse.value.copy(f.color),h.opacity.value=f.opacity,h.rotation.value=f.rotation,f.map&&(h.map.value=f.map,e(f.map,h.mapTransform)),f.alphaMap&&(h.alphaMap.value=f.alphaMap,e(f.alphaMap,h.alphaMapTransform)),f.alphaTest>0&&(h.alphaTest.value=f.alphaTest)}function u(h,f){h.specular.value.copy(f.specular),h.shininess.value=Math.max(f.shininess,1e-4)}function d(h,f){f.gradientMap&&(h.gradientMap.value=f.gradientMap)}function p(h,f){h.metalness.value=f.metalness,f.metalnessMap&&(h.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,h.metalnessMapTransform)),h.roughness.value=f.roughness,f.roughnessMap&&(h.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,h.roughnessMapTransform)),f.envMap&&(h.envMapIntensity.value=f.envMapIntensity)}function m(h,f,T){h.ior.value=f.ior,f.sheen>0&&(h.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),h.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(h.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,h.sheenColorMapTransform)),f.sheenRoughnessMap&&(h.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,h.sheenRoughnessMapTransform))),f.clearcoat>0&&(h.clearcoat.value=f.clearcoat,h.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(h.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,h.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(h.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ze&&h.clearcoatNormalScale.value.negate())),f.dispersion>0&&(h.dispersion.value=f.dispersion),f.iridescence>0&&(h.iridescence.value=f.iridescence,h.iridescenceIOR.value=f.iridescenceIOR,h.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(h.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,h.iridescenceMapTransform)),f.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),f.transmission>0&&(h.transmission.value=f.transmission,h.transmissionSamplerMap.value=T.texture,h.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(h.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,h.transmissionMapTransform)),h.thickness.value=f.thickness,f.thicknessMap&&(h.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=f.attenuationDistance,h.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(h.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(h.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=f.specularIntensity,h.specularColor.value.copy(f.specularColor),f.specularColorMap&&(h.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,h.specularColorMapTransform)),f.specularIntensityMap&&(h.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,h.specularIntensityMapTransform))}function _(h,f){f.matcap&&(h.matcap.value=f.matcap)}function v(h,f){const T=t.get(f).light;h.referencePosition.value.setFromMatrixPosition(T.matrixWorld),h.nearDistance.value=T.shadow.camera.near,h.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function k_(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,M){const y=M.program;n.uniformBlockBinding(T,y)}function c(T,M){let y=s[T.id];y===void 0&&(_(T),y=u(T),s[T.id]=y,T.addEventListener("dispose",h));const P=M.program;n.updateUBOMapping(T,P);const R=t.render.frame;r[T.id]!==R&&(p(T),r[T.id]=R)}function u(T){const M=d();T.__bindingPointIndex=M;const y=i.createBuffer(),P=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,P,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(T){const M=s[T.id],y=T.uniforms,P=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let R=0,E=y.length;R<E;R++){const C=Array.isArray(y[R])?y[R]:[y[R]];for(let j=0,g=C.length;j<g;j++){const S=C[j];if(m(S,R,j,P)===!0){const F=S.__offset,z=Array.isArray(S.value)?S.value:[S.value];let W=0;for(let J=0;J<z.length;J++){const k=z[J],U=v(k);typeof k=="number"||typeof k=="boolean"?(S.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,F+W,S.__data)):k.isMatrix3?(S.__data[0]=k.elements[0],S.__data[1]=k.elements[1],S.__data[2]=k.elements[2],S.__data[3]=0,S.__data[4]=k.elements[3],S.__data[5]=k.elements[4],S.__data[6]=k.elements[5],S.__data[7]=0,S.__data[8]=k.elements[6],S.__data[9]=k.elements[7],S.__data[10]=k.elements[8],S.__data[11]=0):(k.toArray(S.__data,W),W+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,M,y,P){const R=T.value,E=M+"_"+y;if(P[E]===void 0)return typeof R=="number"||typeof R=="boolean"?P[E]=R:P[E]=R.clone(),!0;{const C=P[E];if(typeof R=="number"||typeof R=="boolean"){if(C!==R)return P[E]=R,!0}else if(C.equals(R)===!1)return C.copy(R),!0}return!1}function _(T){const M=T.uniforms;let y=0;const P=16;for(let E=0,C=M.length;E<C;E++){const j=Array.isArray(M[E])?M[E]:[M[E]];for(let g=0,S=j.length;g<S;g++){const F=j[g],z=Array.isArray(F.value)?F.value:[F.value];for(let W=0,J=z.length;W<J;W++){const k=z[W],U=v(k),D=y%P,$=D%U.boundary,Q=D+$;y+=$,Q!==0&&P-Q<U.storage&&(y+=P-Q),F.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=U.storage}}}const R=y%P;return R>0&&(y+=P-R),T.__size=y,T.__cache={},this}function v(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),M}function h(T){const M=T.target;M.removeEventListener("dispose",h);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}class H_{constructor(t={}){const{canvas:e=wu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),_=new Int32Array(4);let v=null,h=null;const f=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mn,this.toneMapping=ti,this.toneMappingExposure=1;const M=this;let y=!1,P=0,R=0,E=null,C=-1,j=null;const g=new Se,S=new Se;let F=null;const z=new ee(0);let W=0,J=e.width,k=e.height,U=1,D=null,$=null;const Q=new Se(0,0,J,k),K=new Se(0,0,J,k);let at=!1;const ft=new Lo;let X=!1,nt=!1;const ut=new xe,ht=new xe,Dt=new H,wt=new Se,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Pt=!1;function Ut(){return E===null?U:1}let L=n;function te(b,N){return e.getContext(b,N)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xo}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),L===null){const N="webgl2";if(L=te(N,b),L===null)throw te(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Gt,Wt,Nt,ne,It,w,x,G,tt,rt,et,Rt,dt,Mt,Kt,ot,yt,Vt,Ft,Et,Zt,Bt,ce,I;function gt(){Gt=new qp(L),Gt.init(),Bt=new L_(L,Gt),Wt=new kp(L,Gt,t,Bt),Nt=new R_(L),Wt.reverseDepthBuffer&&Nt.buffers.depth.setReversed(!0),ne=new jp(L),It=new d_,w=new P_(L,Gt,Nt,It,Wt,Bt,ne),x=new Gp(M),G=new Xp(M),tt=new ef(L),ce=new Bp(L,tt),rt=new Yp(L,tt,ne,ce),et=new Zp(L,rt,tt,ne),Ft=new Kp(L,Wt,w),ot=new Hp(It),Rt=new f_(M,x,G,Gt,Wt,ce,ot),dt=new z_(M,It),Mt=new m_,Kt=new S_(Gt),Vt=new Op(M,x,G,Nt,et,p,l),yt=new A_(M,et,Wt),I=new k_(L,ne,Wt,Nt),Et=new zp(L,Gt,ne),Zt=new $p(L,Gt,ne),ne.programs=Rt.programs,M.capabilities=Wt,M.extensions=Gt,M.properties=It,M.renderLists=Mt,M.shadowMap=yt,M.state=Nt,M.info=ne}gt();const Z=new O_(M,L);this.xr=Z,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const b=Gt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Gt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(b){b!==void 0&&(U=b,this.setSize(J,k,!1))},this.getSize=function(b){return b.set(J,k)},this.setSize=function(b,N,q=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=b,k=N,e.width=Math.floor(b*U),e.height=Math.floor(N*U),q===!0&&(e.style.width=b+"px",e.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(J*U,k*U).floor()},this.setDrawingBufferSize=function(b,N,q){J=b,k=N,U=q,e.width=Math.floor(b*q),e.height=Math.floor(N*q),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(g)},this.getViewport=function(b){return b.copy(Q)},this.setViewport=function(b,N,q,Y){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,N,q,Y),Nt.viewport(g.copy(Q).multiplyScalar(U).round())},this.getScissor=function(b){return b.copy(K)},this.setScissor=function(b,N,q,Y){b.isVector4?K.set(b.x,b.y,b.z,b.w):K.set(b,N,q,Y),Nt.scissor(S.copy(K).multiplyScalar(U).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(b){Nt.setScissorTest(at=b)},this.setOpaqueSort=function(b){D=b},this.setTransparentSort=function(b){$=b},this.getClearColor=function(b){return b.copy(Vt.getClearColor())},this.setClearColor=function(){Vt.setClearColor.apply(Vt,arguments)},this.getClearAlpha=function(){return Vt.getClearAlpha()},this.setClearAlpha=function(){Vt.setClearAlpha.apply(Vt,arguments)},this.clear=function(b=!0,N=!0,q=!0){let Y=0;if(b){let O=!1;if(E!==null){const lt=E.texture.format;O=lt===Ao||lt===To||lt===bo}if(O){const lt=E.texture.type,_t=lt===On||lt===Ti||lt===zs||lt===ds||lt===Eo||lt===yo,bt=Vt.getClearColor(),St=Vt.getClearAlpha(),Ot=bt.r,zt=bt.g,Tt=bt.b;_t?(m[0]=Ot,m[1]=zt,m[2]=Tt,m[3]=St,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=Ot,_[1]=zt,_[2]=Tt,_[3]=St,L.clearBufferiv(L.COLOR,0,_))}else Y|=L.COLOR_BUFFER_BIT}N&&(Y|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),q&&(Y|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Mt.dispose(),Kt.dispose(),It.dispose(),x.dispose(),G.dispose(),et.dispose(),ce.dispose(),I.dispose(),Rt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",xs),Z.removeEventListener("sessionend",Li),je.stop()};function it(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const b=ne.autoReset,N=yt.enabled,q=yt.autoUpdate,Y=yt.needsUpdate,O=yt.type;gt(),ne.autoReset=b,yt.enabled=N,yt.autoUpdate=q,yt.needsUpdate=Y,yt.type=O}function xt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Yt(b){const N=b.target;N.removeEventListener("dispose",Yt),ge(N)}function ge(b){Te(b),It.remove(b)}function Te(b){const N=It.get(b).programs;N!==void 0&&(N.forEach(function(q){Rt.releaseProgram(q)}),b.isShaderMaterial&&Rt.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,q,Y,O,lt){N===null&&(N=Ht);const _t=O.isMesh&&O.matrixWorld.determinant()<0,bt=Di(b,N,q,Y,O);Nt.setMaterial(Y,_t);let St=q.index,Ot=1;if(Y.wireframe===!0){if(St=rt.getWireframeAttribute(q),St===void 0)return;Ot=2}const zt=q.drawRange,Tt=q.attributes.position;let ie=zt.start*Ot,fe=(zt.start+zt.count)*Ot;lt!==null&&(ie=Math.max(ie,lt.start*Ot),fe=Math.min(fe,(lt.start+lt.count)*Ot)),St!==null?(ie=Math.max(ie,0),fe=Math.min(fe,St.count)):Tt!=null&&(ie=Math.max(ie,0),fe=Math.min(fe,Tt.count));const he=fe-ie;if(he<0||he===1/0)return;ce.setup(O,Y,bt,q,St);let ue,ae=Et;if(St!==null&&(ue=tt.get(St),ae=Zt,ae.setIndex(ue)),O.isMesh)Y.wireframe===!0?(Nt.setLineWidth(Y.wireframeLinewidth*Ut()),ae.setMode(L.LINES)):ae.setMode(L.TRIANGLES);else if(O.isLine){let At=Y.linewidth;At===void 0&&(At=1),Nt.setLineWidth(At*Ut()),O.isLineSegments?ae.setMode(L.LINES):O.isLineLoop?ae.setMode(L.LINE_LOOP):ae.setMode(L.LINE_STRIP)}else O.isPoints?ae.setMode(L.POINTS):O.isSprite&&ae.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ae.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Gt.get("WEBGL_multi_draw"))ae.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const At=O._multiDrawStarts,se=O._multiDrawCounts,oe=O._multiDrawCount,Je=St?tt.get(St).bytesPerElement:1,Gn=It.get(Y).currentProgram.getUniforms();for(let Ve=0;Ve<oe;Ve++)Gn.setValue(L,"_gl_DrawID",Ve),ae.render(At[Ve]/Je,se[Ve])}else if(O.isInstancedMesh)ae.renderInstances(ie,he,O.count);else if(q.isInstancedBufferGeometry){const At=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,se=Math.min(q.instanceCount,At);ae.renderInstances(ie,he,se)}else ae.render(ie,he)};function Jt(b,N,q){b.transparent===!0&&b.side===Un&&b.forceSinglePass===!1?(b.side=Ze,b.needsUpdate=!0,An(b,N,q),b.side=ni,b.needsUpdate=!0,An(b,N,q),b.side=Un):An(b,N,q)}this.compile=function(b,N,q=null){q===null&&(q=b),h=Kt.get(q),h.init(N),T.push(h),q.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),b!==q&&b.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),h.setupLights();const Y=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const lt=O.material;if(lt)if(Array.isArray(lt))for(let _t=0;_t<lt.length;_t++){const bt=lt[_t];Jt(bt,q,O),Y.add(bt)}else Jt(lt,q,O),Y.add(lt)}),T.pop(),h=null,Y},this.compileAsync=function(b,N,q=null){const Y=this.compile(b,N,q);return new Promise(O=>{function lt(){if(Y.forEach(function(_t){It.get(_t).currentProgram.isReady()&&Y.delete(_t)}),Y.size===0){O(b);return}setTimeout(lt,10)}Gt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let Ie=null;function nn(b){Ie&&Ie(b)}function xs(){je.stop()}function Li(){je.start()}const je=new hh;je.setAnimationLoop(nn),typeof self<"u"&&je.setContext(self),this.setAnimationLoop=function(b){Ie=b,Z.setAnimationLoop(b),b===null?je.stop():je.start()},Z.addEventListener("sessionstart",xs),Z.addEventListener("sessionend",Li),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(N),N=Z.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,N,E),h=Kt.get(b,T.length),h.init(N),T.push(h),ht.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),ft.setFromProjectionMatrix(ht),nt=this.localClippingEnabled,X=ot.init(this.clippingPlanes,nt),v=Mt.get(b,f.length),v.init(),f.push(v),Z.enabled===!0&&Z.isPresenting===!0){const lt=M.xr.getDepthSensingMesh();lt!==null&&kn(lt,N,-1/0,M.sortObjects)}kn(b,N,0,M.sortObjects),v.finish(),M.sortObjects===!0&&v.sort(D,$),Pt=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Pt&&Vt.addToRenderList(v,b),this.info.render.frame++,X===!0&&ot.beginShadows();const q=h.state.shadowsArray;yt.render(q,b,N),X===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=v.opaque,O=v.transmissive;if(h.setupLights(),N.isArrayCamera){const lt=N.cameras;if(O.length>0)for(let _t=0,bt=lt.length;_t<bt;_t++){const St=lt[_t];Hn(Y,O,b,St)}Pt&&Vt.render(b);for(let _t=0,bt=lt.length;_t<bt;_t++){const St=lt[_t];Ss(v,b,St,St.viewport)}}else O.length>0&&Hn(Y,O,b,N),Pt&&Vt.render(b),Ss(v,b,N);E!==null&&(w.updateMultisampleRenderTarget(E),w.updateRenderTargetMipmap(E)),b.isScene===!0&&b.onAfterRender(M,b,N),ce.resetDefaultState(),C=-1,j=null,T.pop(),T.length>0?(h=T[T.length-1],X===!0&&ot.setGlobalState(M.clippingPlanes,h.state.camera)):h=null,f.pop(),f.length>0?v=f[f.length-1]:v=null};function kn(b,N,q,Y){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)h.pushLight(b),b.castShadow&&h.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||ft.intersectsSprite(b)){Y&&wt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ht);const _t=et.update(b),bt=b.material;bt.visible&&v.push(b,_t,bt,q,wt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||ft.intersectsObject(b))){const _t=et.update(b),bt=b.material;if(Y&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),wt.copy(b.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),wt.copy(_t.boundingSphere.center)),wt.applyMatrix4(b.matrixWorld).applyMatrix4(ht)),Array.isArray(bt)){const St=_t.groups;for(let Ot=0,zt=St.length;Ot<zt;Ot++){const Tt=St[Ot],ie=bt[Tt.materialIndex];ie&&ie.visible&&v.push(b,_t,ie,q,wt.z,Tt)}}else bt.visible&&v.push(b,_t,bt,q,wt.z,null)}}const lt=b.children;for(let _t=0,bt=lt.length;_t<bt;_t++)kn(lt[_t],N,q,Y)}function Ss(b,N,q,Y){const O=b.opaque,lt=b.transmissive,_t=b.transparent;h.setupLightsView(q),X===!0&&ot.setGlobalState(M.clippingPlanes,q),Y&&Nt.viewport(g.copy(Y)),O.length>0&&oi(O,N,q),lt.length>0&&oi(lt,N,q),_t.length>0&&oi(_t,N,q),Nt.buffers.depth.setTest(!0),Nt.buffers.depth.setMask(!0),Nt.buffers.color.setMask(!0),Nt.setPolygonOffset(!1)}function Hn(b,N,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[Y.id]===void 0&&(h.state.transmissionRenderTarget[Y.id]=new Ai(1,1,{generateMipmaps:!0,type:Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float")?Gs:On,minFilter:Si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:le.workingColorSpace}));const lt=h.state.transmissionRenderTarget[Y.id],_t=Y.viewport||g;lt.setSize(_t.z,_t.w);const bt=M.getRenderTarget();M.setRenderTarget(lt),M.getClearColor(z),W=M.getClearAlpha(),W<1&&M.setClearColor(16777215,.5),M.clear(),Pt&&Vt.render(q);const St=M.toneMapping;M.toneMapping=ti;const Ot=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),h.setupLightsView(Y),X===!0&&ot.setGlobalState(M.clippingPlanes,Y),oi(b,q,Y),w.updateMultisampleRenderTarget(lt),w.updateRenderTargetMipmap(lt),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let Tt=0,ie=N.length;Tt<ie;Tt++){const fe=N[Tt],he=fe.object,ue=fe.geometry,ae=fe.material,At=fe.group;if(ae.side===Un&&he.layers.test(Y.layers)){const se=ae.side;ae.side=Ze,ae.needsUpdate=!0,Tn(he,q,Y,ue,ae,At),ae.side=se,ae.needsUpdate=!0,zt=!0}}zt===!0&&(w.updateMultisampleRenderTarget(lt),w.updateRenderTargetMipmap(lt))}M.setRenderTarget(bt),M.setClearColor(z,W),Ot!==void 0&&(Y.viewport=Ot),M.toneMapping=St}function oi(b,N,q){const Y=N.isScene===!0?N.overrideMaterial:null;for(let O=0,lt=b.length;O<lt;O++){const _t=b[O],bt=_t.object,St=_t.geometry,Ot=Y===null?_t.material:Y,zt=_t.group;bt.layers.test(q.layers)&&Tn(bt,N,q,St,Ot,zt)}}function Tn(b,N,q,Y,O,lt){b.onBeforeRender(M,N,q,Y,O,lt),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(M,N,q,Y,b,lt),O.transparent===!0&&O.side===Un&&O.forceSinglePass===!1?(O.side=Ze,O.needsUpdate=!0,M.renderBufferDirect(q,N,Y,O,b,lt),O.side=ni,O.needsUpdate=!0,M.renderBufferDirect(q,N,Y,O,b,lt),O.side=Un):M.renderBufferDirect(q,N,Y,O,b,lt),b.onAfterRender(M,N,q,Y,O,lt)}function An(b,N,q){N.isScene!==!0&&(N=Ht);const Y=It.get(b),O=h.state.lights,lt=h.state.shadowsArray,_t=O.state.version,bt=Rt.getParameters(b,O.state,lt,N,q),St=Rt.getProgramCacheKey(bt);let Ot=Y.programs;Y.environment=b.isMeshStandardMaterial?N.environment:null,Y.fog=N.fog,Y.envMap=(b.isMeshStandardMaterial?G:x).get(b.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ot===void 0&&(b.addEventListener("dispose",Yt),Ot=new Map,Y.programs=Ot);let zt=Ot.get(St);if(zt!==void 0){if(Y.currentProgram===zt&&Y.lightsStateVersion===_t)return li(b,bt),zt}else bt.uniforms=Rt.getUniforms(b),b.onBeforeCompile(bt,M),zt=Rt.acquireProgram(bt,St),Ot.set(St,zt),Y.uniforms=bt.uniforms;const Tt=Y.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Tt.clippingPlanes=ot.uniform),li(b,bt),Y.needsLights=Ys(b),Y.lightsStateVersion=_t,Y.needsLights&&(Tt.ambientLightColor.value=O.state.ambient,Tt.lightProbe.value=O.state.probe,Tt.directionalLights.value=O.state.directional,Tt.directionalLightShadows.value=O.state.directionalShadow,Tt.spotLights.value=O.state.spot,Tt.spotLightShadows.value=O.state.spotShadow,Tt.rectAreaLights.value=O.state.rectArea,Tt.ltc_1.value=O.state.rectAreaLTC1,Tt.ltc_2.value=O.state.rectAreaLTC2,Tt.pointLights.value=O.state.point,Tt.pointLightShadows.value=O.state.pointShadow,Tt.hemisphereLights.value=O.state.hemi,Tt.directionalShadowMap.value=O.state.directionalShadowMap,Tt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Tt.spotShadowMap.value=O.state.spotShadowMap,Tt.spotLightMatrix.value=O.state.spotLightMatrix,Tt.spotLightMap.value=O.state.spotLightMap,Tt.pointShadowMap.value=O.state.pointShadowMap,Tt.pointShadowMatrix.value=O.state.pointShadowMatrix),Y.currentProgram=zt,Y.uniformsList=null,zt}function Es(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Cr.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function li(b,N){const q=It.get(b);q.outputColorSpace=N.outputColorSpace,q.batching=N.batching,q.batchingColor=N.batchingColor,q.instancing=N.instancing,q.instancingColor=N.instancingColor,q.instancingMorph=N.instancingMorph,q.skinning=N.skinning,q.morphTargets=N.morphTargets,q.morphNormals=N.morphNormals,q.morphColors=N.morphColors,q.morphTargetsCount=N.morphTargetsCount,q.numClippingPlanes=N.numClippingPlanes,q.numIntersection=N.numClipIntersection,q.vertexAlphas=N.vertexAlphas,q.vertexTangents=N.vertexTangents,q.toneMapping=N.toneMapping}function Di(b,N,q,Y,O){N.isScene!==!0&&(N=Ht),w.resetTextureUnits();const lt=N.fog,_t=Y.isMeshStandardMaterial?N.environment:null,bt=E===null?M.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ai,St=(Y.isMeshStandardMaterial?G:x).get(Y.envMap||_t),Ot=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,zt=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Tt=!!q.morphAttributes.position,ie=!!q.morphAttributes.normal,fe=!!q.morphAttributes.color;let he=ti;Y.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(he=M.toneMapping);const ue=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ae=ue!==void 0?ue.length:0,At=It.get(Y),se=h.state.lights;if(X===!0&&(nt===!0||b!==j)){const Re=b===j&&Y.id===C;ot.setState(Y,b,Re)}let oe=!1;Y.version===At.__version?(At.needsLights&&At.lightsStateVersion!==se.state.version||At.outputColorSpace!==bt||O.isBatchedMesh&&At.batching===!1||!O.isBatchedMesh&&At.batching===!0||O.isBatchedMesh&&At.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&At.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&At.instancing===!1||!O.isInstancedMesh&&At.instancing===!0||O.isSkinnedMesh&&At.skinning===!1||!O.isSkinnedMesh&&At.skinning===!0||O.isInstancedMesh&&At.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&At.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&At.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&At.instancingMorph===!1&&O.morphTexture!==null||At.envMap!==St||Y.fog===!0&&At.fog!==lt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==ot.numPlanes||At.numIntersection!==ot.numIntersection)||At.vertexAlphas!==Ot||At.vertexTangents!==zt||At.morphTargets!==Tt||At.morphNormals!==ie||At.morphColors!==fe||At.toneMapping!==he||At.morphTargetsCount!==ae)&&(oe=!0):(oe=!0,At.__version=Y.version);let Je=At.currentProgram;oe===!0&&(Je=An(Y,N,O));let Gn=!1,Ve=!1,bs=!1;const Qt=Je.getUniforms(),We=At.uniforms;if(Nt.useProgram(Je.program)&&(Gn=!0,Ve=!0,bs=!0),Y.id!==C&&(C=Y.id,Ve=!0),Gn||j!==b){Wt.reverseDepthBuffer?(ut.copy(b.projectionMatrix),Cu(ut),Pu(ut),Qt.setValue(L,"projectionMatrix",ut)):Qt.setValue(L,"projectionMatrix",b.projectionMatrix),Qt.setValue(L,"viewMatrix",b.matrixWorldInverse);const Re=Qt.map.cameraPosition;Re!==void 0&&Re.setValue(L,Dt.setFromMatrixPosition(b.matrixWorld)),Wt.logarithmicDepthBuffer&&Qt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Qt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),j!==b&&(j=b,Ve=!0,bs=!0)}if(O.isSkinnedMesh){Qt.setOptional(L,O,"bindMatrix"),Qt.setOptional(L,O,"bindMatrixInverse");const Re=O.skeleton;Re&&(Re.boneTexture===null&&Re.computeBoneTexture(),Qt.setValue(L,"boneTexture",Re.boneTexture,w))}O.isBatchedMesh&&(Qt.setOptional(L,O,"batchingTexture"),Qt.setValue(L,"batchingTexture",O._matricesTexture,w),Qt.setOptional(L,O,"batchingIdTexture"),Qt.setValue(L,"batchingIdTexture",O._indirectTexture,w),Qt.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&Qt.setValue(L,"batchingColorTexture",O._colorsTexture,w));const we=q.morphAttributes;if((we.position!==void 0||we.normal!==void 0||we.color!==void 0)&&Ft.update(O,q,Je),(Ve||At.receiveShadow!==O.receiveShadow)&&(At.receiveShadow=O.receiveShadow,Qt.setValue(L,"receiveShadow",O.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(We.envMap.value=St,We.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&N.environment!==null&&(We.envMapIntensity.value=N.environmentIntensity),Ve&&(Qt.setValue(L,"toneMappingExposure",M.toneMappingExposure),At.needsLights&&ys(We,bs),lt&&Y.fog===!0&&dt.refreshFogUniforms(We,lt),dt.refreshMaterialUniforms(We,Y,U,k,h.state.transmissionRenderTarget[b.id]),Cr.upload(L,Es(At),We,w)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Cr.upload(L,Es(At),We,w),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Qt.setValue(L,"center",O.center),Qt.setValue(L,"modelViewMatrix",O.modelViewMatrix),Qt.setValue(L,"normalMatrix",O.normalMatrix),Qt.setValue(L,"modelMatrix",O.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Re=Y.uniformsGroups;for(let Ce=0,ze=Re.length;Ce<ze;Ce++){const Be=Re[Ce];I.update(Be,Je),I.bind(Be,Je)}}return Je}function ys(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function Ys(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(b,N,q){It.get(b.texture).__webglTexture=N,It.get(b.depthTexture).__webglTexture=q;const Y=It.get(b);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||Gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,N){const q=It.get(b);q.__webglFramebuffer=N,q.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,q=0){E=b,P=N,R=q;let Y=!0,O=null,lt=!1,_t=!1;if(b){const St=It.get(b);if(St.__useDefaultFramebuffer!==void 0)Nt.bindFramebuffer(L.FRAMEBUFFER,null),Y=!1;else if(St.__webglFramebuffer===void 0)w.setupRenderTarget(b);else if(St.__hasExternalTextures)w.rebindTextures(b,It.get(b.texture).__webglTexture,It.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Tt=b.depthTexture;if(St.__boundDepthTexture!==Tt){if(Tt!==null&&It.has(Tt)&&(b.width!==Tt.image.width||b.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(b)}}const Ot=b.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(_t=!0);const zt=It.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(zt[N])?O=zt[N][q]:O=zt[N],lt=!0):b.samples>0&&w.useMultisampledRTT(b)===!1?O=It.get(b).__webglMultisampledFramebuffer:Array.isArray(zt)?O=zt[q]:O=zt,g.copy(b.viewport),S.copy(b.scissor),F=b.scissorTest}else g.copy(Q).multiplyScalar(U).floor(),S.copy(K).multiplyScalar(U).floor(),F=at;if(Nt.bindFramebuffer(L.FRAMEBUFFER,O)&&Y&&Nt.drawBuffers(b,O),Nt.viewport(g),Nt.scissor(S),Nt.setScissorTest(F),lt){const St=It.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,St.__webglTexture,q)}else if(_t){const St=It.get(b.texture),Ot=N||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,St.__webglTexture,q||0,Ot)}C=-1},this.readRenderTargetPixels=function(b,N,q,Y,O,lt,_t){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=It.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt){Nt.bindFramebuffer(L.FRAMEBUFFER,bt);try{const St=b.texture,Ot=St.format,zt=St.type;if(!Wt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-Y&&q>=0&&q<=b.height-O&&L.readPixels(N,q,Y,O,Bt.convert(Ot),Bt.convert(zt),lt)}finally{const St=E!==null?It.get(E).__webglFramebuffer:null;Nt.bindFramebuffer(L.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(b,N,q,Y,O,lt,_t){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=It.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt){const St=b.texture,Ot=St.format,zt=St.type;if(!Wt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=b.width-Y&&q>=0&&q<=b.height-O){Nt.bindFramebuffer(L.FRAMEBUFFER,bt);const Tt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Tt),L.bufferData(L.PIXEL_PACK_BUFFER,lt.byteLength,L.STREAM_READ),L.readPixels(N,q,Y,O,Bt.convert(Ot),Bt.convert(zt),0);const ie=E!==null?It.get(E).__webglFramebuffer:null;Nt.bindFramebuffer(L.FRAMEBUFFER,ie);const fe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Ru(L,fe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Tt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,lt),L.deleteBuffer(Tt),L.deleteSync(fe),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,N=null,q=0){b.isTexture!==!0&&(Rr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,b=arguments[1]);const Y=Math.pow(2,-q),O=Math.floor(b.image.width*Y),lt=Math.floor(b.image.height*Y),_t=N!==null?N.x:0,bt=N!==null?N.y:0;w.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,q,0,0,_t,bt,O,lt),Nt.unbindTexture()},this.copyTextureToTexture=function(b,N,q=null,Y=null,O=0){b.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,b=arguments[1],N=arguments[2],O=arguments[3]||0,q=null);let lt,_t,bt,St,Ot,zt;q!==null?(lt=q.max.x-q.min.x,_t=q.max.y-q.min.y,bt=q.min.x,St=q.min.y):(lt=b.image.width,_t=b.image.height,bt=0,St=0),Y!==null?(Ot=Y.x,zt=Y.y):(Ot=0,zt=0);const Tt=Bt.convert(N.format),ie=Bt.convert(N.type);w.setTexture2D(N,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const fe=L.getParameter(L.UNPACK_ROW_LENGTH),he=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ue=L.getParameter(L.UNPACK_SKIP_PIXELS),ae=L.getParameter(L.UNPACK_SKIP_ROWS),At=L.getParameter(L.UNPACK_SKIP_IMAGES),se=b.isCompressedTexture?b.mipmaps[O]:b.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,se.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,se.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,bt),L.pixelStorei(L.UNPACK_SKIP_ROWS,St),b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,O,Ot,zt,lt,_t,Tt,ie,se.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,O,Ot,zt,se.width,se.height,Tt,se.data):L.texSubImage2D(L.TEXTURE_2D,O,Ot,zt,lt,_t,Tt,ie,se),L.pixelStorei(L.UNPACK_ROW_LENGTH,fe),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,he),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ue),L.pixelStorei(L.UNPACK_SKIP_ROWS,ae),L.pixelStorei(L.UNPACK_SKIP_IMAGES,At),O===0&&N.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),Nt.unbindTexture()},this.copyTextureToTexture3D=function(b,N,q=null,Y=null,O=0){b.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Y=arguments[1]||null,b=arguments[2],N=arguments[3],O=arguments[4]||0);let lt,_t,bt,St,Ot,zt,Tt,ie,fe;const he=b.isCompressedTexture?b.mipmaps[O]:b.image;q!==null?(lt=q.max.x-q.min.x,_t=q.max.y-q.min.y,bt=q.max.z-q.min.z,St=q.min.x,Ot=q.min.y,zt=q.min.z):(lt=he.width,_t=he.height,bt=he.depth,St=0,Ot=0,zt=0),Y!==null?(Tt=Y.x,ie=Y.y,fe=Y.z):(Tt=0,ie=0,fe=0);const ue=Bt.convert(N.format),ae=Bt.convert(N.type);let At;if(N.isData3DTexture)w.setTexture3D(N,0),At=L.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)w.setTexture2DArray(N,0),At=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const se=L.getParameter(L.UNPACK_ROW_LENGTH),oe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Je=L.getParameter(L.UNPACK_SKIP_PIXELS),Gn=L.getParameter(L.UNPACK_SKIP_ROWS),Ve=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,he.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,he.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,St),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ot),L.pixelStorei(L.UNPACK_SKIP_IMAGES,zt),b.isDataTexture||b.isData3DTexture?L.texSubImage3D(At,O,Tt,ie,fe,lt,_t,bt,ue,ae,he.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(At,O,Tt,ie,fe,lt,_t,bt,ue,he.data):L.texSubImage3D(At,O,Tt,ie,fe,lt,_t,bt,ue,ae,he),L.pixelStorei(L.UNPACK_ROW_LENGTH,se),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Je),L.pixelStorei(L.UNPACK_SKIP_ROWS,Gn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ve),O===0&&N.generateMipmaps&&L.generateMipmap(At),Nt.unbindTexture()},this.initRenderTarget=function(b){It.get(b).__webglFramebuffer===void 0&&w.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?w.setTextureCube(b,0):b.isData3DTexture?w.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?w.setTexture2DArray(b,0):w.setTexture2D(b,0),Nt.unbindTexture()},this.resetState=function(){P=0,R=0,E=null,Nt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===wo?"display-p3":"srgb",e.unpackColorSpace=le.workingColorSpace===Hr?"display-p3":"srgb"}}class Uo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ee(t),this.near=e,this.far=n}clone(){return new Uo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class G_ extends Oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class V_{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=fo,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xe=new H;class Or{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Sn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Sn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Sn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Sn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new mn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Or(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class gh extends _s{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let $i;const Ps=new H,ji=new H,Ki=new H,Zi=new kt,Ls=new kt,vh=new xe,_r=new H,Ds=new H,gr=new H,Nl=new kt,Ea=new kt,Fl=new kt;class W_ extends Oe{constructor(t=new gh){if(super(),this.isSprite=!0,this.type="Sprite",$i===void 0){$i=new bn;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new V_(e,5);$i.setIndex([0,1,2,0,2,3]),$i.setAttribute("position",new Or(n,3,0,!1)),$i.setAttribute("uv",new Or(n,2,3,!1))}this.geometry=$i,this.material=t,this.center=new kt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ji.setFromMatrixScale(this.matrixWorld),vh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ki.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ji.multiplyScalar(-Ki.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;vr(_r.set(-.5,-.5,0),Ki,a,ji,s,r),vr(Ds.set(.5,-.5,0),Ki,a,ji,s,r),vr(gr.set(.5,.5,0),Ki,a,ji,s,r),Nl.set(0,0),Ea.set(1,0),Fl.set(1,1);let o=t.ray.intersectTriangle(_r,Ds,gr,!1,Ps);if(o===null&&(vr(Ds.set(-.5,.5,0),Ki,a,ji,s,r),Ea.set(0,1),o=t.ray.intersectTriangle(_r,gr,Ds,!1,Ps),o===null))return;const l=t.ray.origin.distanceTo(Ps);l<t.near||l>t.far||e.push({distance:l,point:Ps.clone(),uv:an.getInterpolation(Ps,_r,Ds,gr,Nl,Ea,Fl,new kt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function vr(i,t,e,n,s,r){Zi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ls.x=r*Zi.x-s*Zi.y,Ls.y=s*Zi.x+r*Zi.y):Ls.copy(Zi),i.copy(t),i.x+=Ls.x,i.y+=Ls.y,i.applyMatrix4(vh)}class X_ extends $e{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Io extends bn{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],p=[],m=[];let _=0;const v=[],h=n/2;let f=0;T(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new _n(d,3)),this.setAttribute("normal",new _n(p,3)),this.setAttribute("uv",new _n(m,2));function T(){const y=new H,P=new H;let R=0;const E=(e-t)/n;for(let C=0;C<=r;C++){const j=[],g=C/r,S=g*(e-t)+t;for(let F=0;F<=s;F++){const z=F/s,W=z*l+o,J=Math.sin(W),k=Math.cos(W);P.x=S*J,P.y=-g*n+h,P.z=S*k,d.push(P.x,P.y,P.z),y.set(J,E,k).normalize(),p.push(y.x,y.y,y.z),m.push(z,1-g),j.push(_++)}v.push(j)}for(let C=0;C<s;C++)for(let j=0;j<r;j++){const g=v[j][C],S=v[j+1][C],F=v[j+1][C+1],z=v[j][C+1];t>0&&(u.push(g,S,z),R+=3),e>0&&(u.push(S,F,z),R+=3)}c.addGroup(f,R,0),f+=R}function M(y){const P=_,R=new kt,E=new H;let C=0;const j=y===!0?t:e,g=y===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,h*g,0),p.push(0,g,0),m.push(.5,.5),_++;const S=_;for(let F=0;F<=s;F++){const W=F/s*l+o,J=Math.cos(W),k=Math.sin(W);E.x=j*k,E.y=h*g,E.z=j*J,d.push(E.x,E.y,E.z),p.push(0,g,0),R.x=J*.5+.5,R.y=k*.5*g+.5,m.push(R.x,R.y),_++}for(let F=0;F<s;F++){const z=P+F,W=S+F;y===!0?u.push(W,W+1,z):u.push(W+1,W,z),C+=3}c.addGroup(f,C,y===!0?1:2),f+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Io(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class No extends Io{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new No(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Us extends _s{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jc,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Mh extends Oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class q_ extends Mh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ya=new xe,Ol=new H,Bl=new H;class Y_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lo,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ol.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ol),Bl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Bl),e.updateMatrixWorld(),ya.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ya),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ya)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class $_ extends Y_{constructor(){super(new uh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class j_ extends Mh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.shadow=new $_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const zl=new xe;class K_{constructor(t,e,n=0,s=1/0){this.ray=new Co(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Po,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return zl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zl),this}intersectObject(t,e=!0,n=[]){return _o(t,this,n,e),n.sort(kl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)_o(t[s],this,n,e);return n.sort(kl),n}}function kl(i,t){return i.distance-t.distance}function _o(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)_o(r[a],t,e,!0)}}class Hl{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Z_ extends Pi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xo);const Gl={type:"change"},Fo={type:"start"},xh={type:"end"},Mr=new Co,Vl=new Kn,J_=Math.cos(70*Au.DEG2RAD),Pe=new H,Ke=2*Math.PI,pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ba=1e-6;class Q_ extends Z_{constructor(t,e=null){super(t,e),this.state=pe.NONE,this.enabled=!0,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:rs.ROTATE,MIDDLE:rs.DOLLY,RIGHT:rs.PAN},this.touches={ONE:es.ROTATE,TWO:es.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new wi,this._lastTargetPosition=new H,this._quat=new wi().setFromUnitVectors(t.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hl,this._sphericalDelta=new Hl,this._scale=1,this._panOffset=new H,this._rotateStart=new kt,this._rotateEnd=new kt,this._rotateDelta=new kt,this._panStart=new kt,this._panEnd=new kt,this._panDelta=new kt,this._dollyStart=new kt,this._dollyEnd=new kt,this._dollyDelta=new kt,this._dollyDirection=new H,this._mouse=new kt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=eg.bind(this),this._onPointerDown=tg.bind(this),this._onPointerUp=ng.bind(this),this._onContextMenu=cg.bind(this),this._onMouseWheel=rg.bind(this),this._onKeyDown=ag.bind(this),this._onTouchStart=og.bind(this),this._onTouchMove=lg.bind(this),this._onMouseDown=ig.bind(this),this._onMouseMove=sg.bind(this),this._interceptControlDown=hg.bind(this),this._interceptControlUp=ug.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Gl),this.update(),this.state=pe.NONE}update(t=null){const e=this.object.position;Pe.copy(e).sub(this.target),Pe.applyQuaternion(this._quat),this._spherical.setFromVector3(Pe),this.autoRotate&&this.state===pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ke:n>Math.PI&&(n-=Ke),s<-Math.PI?s+=Ke:s>Math.PI&&(s-=Ke),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Pe.setFromSpherical(this._spherical),Pe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Pe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Pe.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new H(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new H(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Pe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Mr.origin.copy(this.object.position),Mr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Mr.direction))<J_?this.object.lookAt(this.target):(Vl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Mr.intersectPlane(Vl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ba||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ba||this._lastTargetPosition.distanceToSquared(this.target)>ba?(this.dispatchEvent(Gl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ke/60*this.autoRotateSpeed*t:Ke/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Pe.setFromMatrixColumn(e,0),Pe.multiplyScalar(-t),this._panOffset.add(Pe)}_panUp(t,e){this.screenSpacePanning===!0?Pe.setFromMatrixColumn(e,1):(Pe.setFromMatrixColumn(e,0),Pe.crossVectors(this.object.up,Pe)),Pe.multiplyScalar(t),this._panOffset.add(Pe)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pe.copy(s).sub(this.target);let r=Pe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ke*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ke*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ke*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ke*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ke*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ke*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new kt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function tg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function eg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ng(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(xh),this.state=pe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function ig(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case rs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=pe.DOLLY;break;case rs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=pe.ROTATE}break;case rs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=pe.PAN}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Fo)}function sg(i){switch(this.state){case pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function rg(i){this.enabled===!1||this.enableZoom===!1||this.state!==pe.NONE||(i.preventDefault(),this.dispatchEvent(Fo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(xh))}function ag(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function og(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case es.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=pe.TOUCH_ROTATE;break;case es.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=pe.TOUCH_PAN;break;default:this.state=pe.NONE}break;case 2:switch(this.touches.TWO){case es.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=pe.TOUCH_DOLLY_PAN;break;case es.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=pe.TOUCH_DOLLY_ROTATE;break;default:this.state=pe.NONE}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Fo)}function lg(i){switch(this._trackPointer(i),this.state){case pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=pe.NONE}}function cg(i){this.enabled!==!1&&i.preventDefault()}function hg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ug(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ji=[];function fg(i,t){return{subscribe:Ms(i,t).subscribe}}function Ms(i,t=_e){let e;const n=new Set;function s(o){if(ri(i,o)&&(i=o,e)){const l=!Ji.length;for(const c of n)c[1](),Ji.push(c,i);if(l){for(let c=0;c<Ji.length;c+=2)Ji[c][0](Ji[c+1]);Ji.length=0}}}function r(o){s(o(i))}function a(o,l=_e){const c=[o,l];return n.add(c),n.size===1&&(e=t(s,r)||_e),o(i),()=>{n.delete(c),n.size===0&&e&&(e(),e=null)}}return{set:s,update:r,subscribe:a}}function Vr(i,t,e){const n=!Array.isArray(i),s=n?[i]:i;if(!s.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const r=t.length<2;return fg(e,(a,o)=>{let l=!1;const c=[];let u=0,d=_e;const p=()=>{if(u)return;d();const _=t(n?c[0]:c,a,o);r?a(_):d=vo(_)?_:_e},m=s.map((_,v)=>Mo(_,h=>{c[v]=h,u&=~(1<<v),l&&p()},()=>{u|=1<<v}));return l=!0,p(),function(){vn(m),d(),l=!1}})}const Ge={uphill:{name:"上坡式",fric:.1,grade:10,desc:"利用上坡坡度与滚动阻力减速,地形条件允许时优先采用"},sand:{name:"砂床式",fric:.25,grade:3,desc:"松散砂砾集料制动床,滚动阻力大,长度较短"},net:{name:"网索式",fric:.45,grade:2,desc:"网索(拦截网)系统,受地形限制小、所需长度最短"}},Bn={heavyTruck:{name:"重型货车",load:49,v0:100,width:8},medTruck:{name:"中型货车",load:18,v0:90,width:6},bus:{name:"大型客车",load:15,v0:95,width:6}},Ee={draft:{name:"拟定",color:"#f59e0b",next:"review",nextLabel:"提交养护科/交警联审"},review:{name:"联审中",color:"#3b82f6",next:"approved",nextLabel:"联审通过,批复"},approved:{name:"已批复",color:"#22c55e",next:"built",nextLabel:"确认建成"},built:{name:"已建成",color:"#9ca3af",next:null,nextLabel:null}},In=120,dg=450;function ye(i){const t=Math.round(i);return"K"+Math.floor(t/1e3)+"+"+String(t%1e3).padStart(3,"0")}function pg(i){const t=String(i).trim().match(/^[Kk]?(\d+)(?:\+(\d+(?:\.\d+)?))?$/);return t?parseInt(t[1],10)*1e3+(t[2]?parseFloat(t[2]):0):NaN}function mg(i,t=20){var l;const e=[];let n=0,s=0,r=0,a=1e3,o=i.length?i[0].stakeM:0;e.push({stakeM:o,x:n,y:a,z:s,grade:((l=i[0])==null?void 0:l.grade)??0,radius:0,heading:r});for(const c of i){const u=Math.max(1,Math.round(c.length/t)),d=c.length/u;for(let p=0;p<u;p++){const m=c.radius||0,_=m!==0?d/m:0;r+=_/2,n+=Math.sin(r)*d,s+=Math.cos(r)*d,a+=c.grade/100*d,r+=_/2,o+=d,e.push({stakeM:o,x:n,y:a,z:s,grade:c.grade,radius:m,heading:r})}}return e}function _g(i,t){if(!i.length)return 0;for(const e of i)if(t>=e.stakeM&&t<=e.stakeM+e.length)return e.grade;return t<i[0].stakeM?i[0].grade:i[i.length-1].grade}function gg(i,t,e){const n=254*(t+e/100);return n<=0?1/0:i*i/n}function vg(i,t){const s=Math.abs(t)/100,r=254*Math.max(.05,.29-s);return i/3.6*2.5+i*i/r}function Mg(i,t,e,n){const s=vg(e,n);let r=null;for(let a=i.length-1;a>=0;a--){const o=i[a];if(o.stakeM>t)continue;if(t-o.stakeM>s)break;const l=Math.abs(o.radius||0);if(l>0&&l<dg){r=o;break}}return{required:s,blocked:!!r,blockerStake:r?r.stakeM:null,blockerRadius:r?Math.abs(r.radius):null}}function xg(i,t,e,n){const s=i.length?i[i.length-1].stakeM+i[i.length-1].length:t;let r=Math.min(s-t,600);for(const a of i)if(!(a.stakeM+a.length<=t)&&a.grade>=-1){r=Math.min(r,Math.max(0,a.stakeM-t));break}for(const a of e)a.id!==n&&a.stakeM>t&&(r=Math.min(r,a.stakeM-t));return Math.max(0,Math.round(r))}function Sh(i,t,e,n){const s=Ge[i.type],r=Bn[i.vehicle],a=i.fric??s.fric,o=i.bedGrade??s.grade,l=i.v0,c=_g(t,i.stakeM),u=gg(l,a,o),d=Math.ceil(u/5)*5,p=Math.max(In,d),m=r.width+(i.loadT>40?1:0),_=Mg(e,i.stakeM,l,c),v=xg(t,i.stakeM,n,i.id),h=[];d<In&&v<In?h.push(`制动床长度不足 ${In}m(场地仅 ${v}m),请挪动位置或改用网索式`):v<p&&h.push(`场地可用长度 ${v}m 小于设计长度 ${p}m,请挪动位置或更换型式`),_.blocked&&h.push(`入口视距被 ${ye(_.blockerStake)} 处 R=${_.blockerRadius}m 弯道遮挡(需要 ${Math.ceil(_.required)}m),请挪动位置`);const f={};i.type==="sand"?(f.砂砾集料=Math.round(p*m*.6)+" m³",f.路床挖方=Math.round(p*m*1)+" m³"):i.type==="uphill"?(f.路基填方=Math.round(p*m*1.5)+" m³",f.制动床铺面=Math.round(p*m)+" m²"):(f.网索拦截系统="1 套",f.混凝土基础=Math.round(m*2.2)+" m³"),f.波形护栏=Math.round(2*(p+20))+" m",f.标志标线="1 项";const T=`L=V²/(254(f+i))=${l}²/(254×(${a}+${(o/100).toFixed(2)}))=${u.toFixed(1)}m,取整${d}m,按≥${In}m控制取${p}m;宽${m}m(${r.name}${i.loadT}t);主线坡度${c}%,视距要求${Math.ceil(_.required)}m${_.blocked?",被弯道遮挡":",满足"}`;return{mainGrade:c,fric:a,bedGrade:o,L_req:u,L_calc:d,L_design:p,width:m,sight:_,available:v,errors:h,quantities:f,basis:T}}function Sg(i,t,e,n){const s=[...i].sort((c,u)=>c.stakeM-u.stakeM),r=e.length?e[0].stakeM:0,a=e.length?e[e.length-1].stakeM+e[e.length-1].length:0;let o={};const l=s.map((c,u)=>{const d=u>0?s[u-1].stakeM:r,p=u<s.length-1?s[u+1].stakeM:a,m=u>0?(d+c.stakeM)/2:r,_=u<s.length-1?(c.stakeM+p)/2:a,v=Math.max(0,_-m)/1e3,h=v*n,f=t[c.id];if(f)for(const[T,M]of Object.entries(f.quantities)){const y=parseFloat(M);isNaN(y)||(o[T]=(o[T]||0)+y)}return{ramp:c,spacing:u>0?c.stakeM-d:null,zoneKm:v,covered:h,res:f}});return{rows:l,totalQ:o,totalCovered:l.reduce((c,u)=>c+u.covered,0)}}const Br=[{stakeM:0,grade:-2.5,length:800,radius:0},{stakeM:800,grade:-4.8,length:1500,radius:600},{stakeM:2300,grade:-5.5,length:2e3,radius:0},{stakeM:4300,grade:-6,length:1800,radius:-450},{stakeM:6100,grade:-5.2,length:2200,radius:800},{stakeM:8300,grade:-6.5,length:1600,radius:0},{stakeM:9900,grade:-4,length:1400,radius:380},{stakeM:11300,grade:-3,length:1200,radius:0},{stakeM:12500,grade:-1,length:800,radius:0}];function Oo(i,t){try{const e=localStorage.getItem(i);if(e)return JSON.parse(e)}catch{}return t}function Bo(i,t){i.subscribe(e=>{try{localStorage.setItem(t,JSON.stringify(e))}catch{}})}const zn=Ms(Oo("er_profile",Br)),be=Ms(Oo("er_ramps",[])),zr=Ms(Oo("er_settings",{runawayRate:.8})),gn=Ms(null),ks=Ms(!1);Bo(zn,"er_profile");Bo(be,"er_ramps");Bo(zr,"er_settings");const Hs=Vr(zn,i=>mg(i)),si=Vr([be,zn,Hs],([i,t,e])=>{const n={};for(const s of i)n[s.id]=Sh(s,t,e,i);return n}),Eh=Vr([be,si,zn,zr],([i,t,e,n])=>Sg(i,t,e,n.runawayRate)),Eg=Vr(be,i=>i.flatMap(t=>(t.revisions||[]).map(e=>({...e,rampName:t.name,rampId:t.id}))).sort((t,e)=>e.time.localeCompare(t.time)));function Xs(){return new Date().toLocaleString("zh-CN",{hour12:!1})}function qs(i){return Sh(i,Ei(zn),Ei(Hs),Ei(be)).basis}function yg(i){const t="R"+Date.now().toString(36),e=Ei(be).length+1,n={id:t,name:`避险车道${e}号`,stakeM:Math.round(i),type:"sand",vehicle:"heavyTruck",v0:Bn.heavyTruck.v0,loadT:Bn.heavyTruck.load,status:"draft",revisions:[]};return n.revisions.push({time:Xs(),action:"创建",detail:`于 ${ye(n.stakeM)} 拟定 ${Ge[n.type].name},状态:拟定`,basis:qs(n)}),be.update(s=>[...s,n]),gn.set(t),ks.set(!1),t}function bg(i,t){be.update(e=>e.map(n=>n.id===i?{...n,stakeM:Math.round(t)}:n))}function Tg(i,t){be.update(e=>e.map(n=>{if(n.id!==i||Math.round(t)===n.stakeM)return n;const s={time:Xs(),action:"调整位置",detail:`引道口由 ${ye(t)} 移至 ${ye(n.stakeM)}`,basis:qs(n)};return{...n,revisions:[...n.revisions,s]}}))}function mi(i,t,e){be.update(n=>n.map(s=>{if(s.id!==i)return s;const r={...s,...t},a=[];if(t.type&&t.type!==s.type&&a.push(`型式 ${Ge[s.type].name}→${Ge[t.type].name}`),t.vehicle&&t.vehicle!==s.vehicle&&a.push(`车型 ${Bn[s.vehicle].name}→${Bn[t.vehicle].name}`),t.v0!==void 0&&t.v0!==s.v0&&a.push(`初速度 ${s.v0}→${t.v0} km/h`),t.loadT!==void 0&&t.loadT!==s.loadT&&a.push(`载重 ${s.loadT}→${t.loadT} t`),t.bedGrade!==void 0&&t.bedGrade!==(s.bedGrade??Ge[s.type].grade)&&a.push(`制动床纵坡→${t.bedGrade}%`),t.fric!==void 0&&t.fric!==(s.fric??Ge[s.type].fric)&&a.push(`滚动阻力系数→${t.fric}`),t.name&&t.name!==s.name&&a.push(`更名 ${s.name}→${t.name}`),a.length===0)return r;const o={time:Xs(),action:e||"修改参数",detail:a.join(";"),basis:qs(r)};return{...r,revisions:[...r.revisions,o]}}))}function Ag(i){const t=Ei(be).find(r=>r.id===i);if(!t)return{ok:!1,msg:"未找到该避险车道"};const e=Ee[t.status];if(!e.next)return{ok:!1,msg:"已建成,流程结束"};const n=Ei(si)[i];if(t.status==="draft"&&n&&n.errors.length>0)return{ok:!1,msg:"存在标红问题(长度不足或视距遮挡),请先挪位置或换型式再提交联审"};const s=e.next;return be.update(r=>r.map(a=>a.id===i?{...a,status:s,revisions:[...a.revisions,{time:Xs(),action:"状态流转",detail:`${e.name} → ${Ee[s].name}`,basis:qs(a)}]}:a)),{ok:!0}}function wg(i){const t=["draft","review","approved","built"];be.update(e=>e.map(n=>{if(n.id!==i)return n;const s=t.indexOf(n.status);if(s<=0)return n;const r=t[s-1];return{...n,status:r,revisions:[...n.revisions,{time:Xs(),action:"状态回退",detail:`${Ee[n.status].name} → ${Ee[r].name}(退回修改)`,basis:qs(n)}]}}))}function Rg(i){be.update(t=>t.filter(e=>e.id!==i)),Ei(gn)===i&&gn.set(null)}function Wl(i){zn.set(i)}function Cg(){be.set([]),zn.set(Br),gn.set(null)}function Pg(i){let t;return{c(){t=V("div"),B(t,"class","viewport svelte-ql19iq")},m(e,n){qt(e,t,n),i[1](t)},p:_e,i:_e,o:_e,d(e){e&&Xt(t),i[1](null)}}}function Lg(i,t){let e=0,n=i.length-1;for(;e<n;){const s=e+n>>1;i[s].stakeM<t?e=s+1:n=s}return e}function Xl(i){var t;(t=i.traverse)==null||t.call(i,e=>{var n,s,r,a;(s=(n=e.geometry)==null?void 0:n.dispose)==null||s.call(n),(a=(r=e.material)==null?void 0:r.dispose)==null||a.call(r)})}function Dg(i,t,e){let n,s,r,a,o,l,c=null,u=null,d,p,m=null,_=0;const v=[];Rh(()=>{r=new G_,r.background=new ee(857376),r.fog=new Uo(857376,3e3,14e3),a=new rn(55,1,1,4e4),s=new H_({antialias:!0}),s.setPixelRatio(Math.min(devicePixelRatio,2)),n.appendChild(s.domElement),o=new Q_(a,s.domElement),o.enableDamping=!0,o.maxPolarAngle=Math.PI*.49,r.add(new q_(12571903,2760984,.9));const U=new j_(16773853,1.4);U.position.set(3e3,5e3,2e3),r.add(U),d=new is,p=new is,r.add(d,p),l=new K_,new ResizeObserver(h).observe(n),h(),s.domElement.addEventListener("pointerdown",z),s.domElement.addEventListener("pointermove",W),s.domElement.addEventListener("pointerup",J),v.push(Hs.subscribe($=>{f($),M()})),v.push(be.subscribe(()=>M())),v.push(si.subscribe(()=>M())),v.push(gn.subscribe(()=>M())),s.setAnimationLoop(()=>{o.update(),s.render(r,a)})}),Ch(()=>{v.forEach(U=>U()),s==null||s.setAnimationLoop(null),s==null||s.dispose()});function h(){if(!s||!n)return;const U=n.clientWidth||1,D=n.clientHeight||1;a.aspect=U/D,a.updateProjectionMatrix(),s.setSize(U,D)}function f(U){if(!U||U.length<2)return;c&&(r.remove(c),Xl(c),c=null),u&&(r.remove(u),Xl(u),u=null),p.clear();let D=1e9,$=-1e9,Q=1e9,K=-1e9;for(const Pt of U)D=Math.min(D,Pt.x),$=Math.max($,Pt.x),Q=Math.min(Q,Pt.z),K=Math.max(K,Pt.z);const at=500;D-=at,$+=at,Q-=at,K+=at;const ft=140,X=140,nt=new Ws($-D,K-Q,ft,X);nt.rotateX(-Math.PI/2),nt.translate((D+$)/2,0,(Q+K)/2);const ut=nt.attributes.position;for(let Pt=0;Pt<ut.count;Pt++){const Ut=ut.getX(Pt),L=ut.getZ(Pt);let te=null,Gt=1/0;for(const x of U){const G=(x.x-Ut)**2+(x.z-L)**2;G<Gt&&(Gt=G,te=x)}const Wt=Math.sqrt(Gt),Nt=Math.sign(Math.cos(te.heading)*(Ut-te.x)-Math.sin(te.heading)*(L-te.z))||1,ne=10*Math.sin(Ut*.008)*Math.cos(L*.011)+5*Math.sin(Ut*.025+L*.02),It=Math.min(1,Wt/80),w=te.y+It*(Nt>0?Wt*.85:-Wt*1.1)+It*ne;ut.setY(Pt,w)}nt.computeVertexNormals(),c=new en(nt,new Us({color:4020794,roughness:1})),r.add(c),u=T(U,12,.4,new Us({color:2830134,roughness:.9})),r.add(u);for(let Pt=0;Pt<U.length;Pt+=Math.round(1e3/(U[1].stakeM-U[0].stakeM||20))){const Ut=U[Pt],L=y(ye(Ut.stakeM),"#cfe3ff");L.position.set(Ut.x,Ut.y+18,Ut.z),p.add(L)}const ht=(D+$)/2,Dt=(Q+K)/2,wt=U[Math.floor(U.length/2)].y,Ht=Math.max($-D,K-Q);o.target.set(ht,wt,Dt),a.position.set(ht+Ht*.45,wt+Ht*.5,Dt+Ht*.45)}function T(U,D,$,Q,K=0){const at=[],ft=[];let X=0;for(let ut=0;ut<U.length;ut++){const ht=U[ut],Dt=U[Math.min(ut+1,U.length-1)],wt=Dt.x-ht.x,Ht=Dt.z-ht.z,Pt=Math.hypot(wt,Ht)||1,Ut=-Ht/Pt,L=wt/Pt;if(ut>0&&(X+=K/100*Math.hypot(ht.x-U[ut-1].x,ht.z-U[ut-1].z)),at.push(ht.x+Ut*D/2,ht.y+$+X,ht.z+L*D/2),at.push(ht.x-Ut*D/2,ht.y+$+X,ht.z-L*D/2),ut>0){const te=(ut-1)*2;ft.push(te,te+1,te+2,te+1,te+3,te+2)}}const nt=new bn;return nt.setAttribute("position",new _n(at,3)),nt.setIndex(ft),nt.computeVertexNormals(),new en(nt,Q)}function M(){if(!d)return;const U=P;if(d.clear(),!U||U.length<2)return;const D=R,$=E;for(const Q of D){const K=$[Q.id];if(!K)continue;const at=Lg(U,Q.stakeM),ft=U[at],X=ft.heading-.6,nt={x:Math.sin(X),z:Math.cos(X)},ut=10,ht=Math.max(2,Math.ceil(K.L_design/ut)),Dt=[];for(let Nt=0;Nt<=ht;Nt++){const ne=Math.min(Nt*ut,K.L_design);Dt.push({x:ft.x+nt.x*ne,z:ft.z+nt.z*ne,y:ft.y+K.bedGrade/100*ne})}const wt=K.errors.length>0,Ht=wt?15680580:parseInt(Ee[Q.status].color.slice(1),16),Pt=T(Dt,K.width,.5,new Us({color:Ht,roughness:.8,transparent:!0,opacity:.92}));Pt.userData.rampId=Q.id,d.add(Pt);const Ut=Dt[Dt.length-1],L=new en(new gs(K.width,4,1.5),new Us({color:9080728}));L.position.set(Ut.x,Ut.y+2,Ut.z),L.rotation.y=X,d.add(L);const te=Q.id===C,Gt=new en(new No(te?7:5,te?16:12,12),new Us({color:te?16777215:Ht,emissive:te?6710886:0}));Gt.position.set(ft.x,ft.y+10,ft.z),Gt.userData.rampId=Q.id,Gt.userData.marker=!0,d.add(Gt);const Wt=y(`${Q.name} ${ye(Q.stakeM)}
${wt?"⚠ "+K.errors.length+"项问题":"L="+K.L_design+"m"}`,wt?"#ff9a9a":"#d7f5d7");Wt.position.set(ft.x,ft.y+34,ft.z),Wt.userData.rampId=Q.id,d.add(Wt)}}function y(U,D="#ffffff"){const $=U.split(`
`),Q=document.createElement("canvas");Q.width=512,Q.height=64*$.length;const K=Q.getContext("2d");K.fillStyle="rgba(10,16,24,0.72)",K.fillRect(0,0,Q.width,Q.height),K.font='bold 40px "Microsoft YaHei", sans-serif',K.fillStyle=D,K.textAlign="center",$.forEach((X,nt)=>K.fillText(X,256,48+nt*64));const at=new X_(Q),ft=new W_(new gh({map:at,depthTest:!1}));return ft.scale.set(150,30*$.length,1),ft}let P=[],R=[],E={},C=null,j=!1;g();function g(){v.push(Hs.subscribe(U=>{P=U})),v.push(be.subscribe(U=>{R=U})),v.push(si.subscribe(U=>{E=U})),v.push(gn.subscribe(U=>{C=U})),v.push(ks.subscribe(U=>{j=U}))}function S(U){const D=s.domElement.getBoundingClientRect();return new kt((U.clientX-D.left)/D.width*2-1,-((U.clientY-D.top)/D.height)*2+1)}function F(U){let D=1/0,$=0;for(const Q of P){const K=(Q.x-U.x)**2+(Q.z-U.z)**2;K<D&&(D=K,$=Q.stakeM)}return $}function z(U){var Q,K;if(U.button!==0)return;l.setFromCamera(S(U),a);const $=l.intersectObjects(d.children,!0).find(at=>{var X;let ft=at.object;for(;ft;){if((X=ft.userData)!=null&&X.rampId)return!0;ft=ft.parent}return!1});if($){let at=$.object;for(;at&&!((Q=at.userData)!=null&&Q.rampId);)at=at.parent;const ft=at.userData.rampId;gn.set(ft),(at.userData.marker||$.object.userData.marker)&&(m=ft,_=((K=R.find(X=>X.id===ft))==null?void 0:K.stakeM)??0,o.enabled=!1);return}if(j){const at=[u,c].filter(Boolean),ft=l.intersectObjects(at,!1)[0];ft&&yg(F(ft.point))}}function W(U){if(!m)return;l.setFromCamera(S(U),a);const D=[u,c].filter(Boolean),$=l.intersectObjects(D,!1)[0];$&&bg(m,F($.point))}function J(){m&&(Tg(m,_),m=null,o.enabled=!0)}function k(U){Lr[U?"unshift":"push"](()=>{n=U,e(0,n)})}return[n,k]}class Ug extends Ci{constructor(t){super(),Ri(this,t,Dg,Pg,ri,{})}}function ql(i,t,e){const n=i.slice();return n[13]=t[e],n}function Yl(i){let t,e;return{c(){t=V("p"),e=st(i[2]),B(t,"class","msg svelte-1nqze34")},m(n,s){qt(n,t,s),A(t,e)},p(n,s){s&4&&Ct(e,n[2])},d(n){n&&Xt(t)}}}function $l(i){let t,e,n=ye(i[13].stakeM)+"",s,r,a=i[13].grade+"",o,l,c=i[13].length+"",u,d,p=(i[13].radius||"直线")+"",m,_;return{c(){t=V("tr"),e=V("td"),s=st(n),r=V("td"),o=st(a),l=V("td"),u=st(c),d=V("td"),m=st(p),_=ct(),B(e,"class","svelte-1nqze34"),B(r,"class","svelte-1nqze34"),B(l,"class","svelte-1nqze34"),B(d,"class","svelte-1nqze34"),B(t,"class","svelte-1nqze34"),Fe(t,"steep",i[13].grade<=-5)},m(v,h){qt(v,t,h),A(t,e),A(e,s),A(t,r),A(r,o),A(t,l),A(l,u),A(t,d),A(d,m),A(t,_)},p(v,h){h&1&&n!==(n=ye(v[13].stakeM)+"")&&Ct(s,n),h&1&&a!==(a=v[13].grade+"")&&Ct(o,a),h&1&&c!==(c=v[13].length+"")&&Ct(u,c),h&1&&p!==(p=(v[13].radius||"直线")+"")&&Ct(m,p),h&1&&Fe(t,"steep",v[13].grade<=-5)},d(v){v&&Xt(t)}}}function Ig(i){let t,e,n,s,r,a,o,l,c,u,d,p,m,_,v,h,f,T,M,y,P,R=(i[5]/1e3).toFixed(2)+"",E,C,j=Math.abs(i[4]).toFixed(0)+"",g,S,F,z,W,J,k,U,D,$=i[2]&&Yl(i),Q=me(i[0]),K=[];for(let at=0;at<Q.length;at+=1)K[at]=$l(ql(i,Q,at));return{c(){t=V("div"),e=V("h3"),e.textContent="纵断面导入",n=ct(),s=V("p"),s.innerHTML=`每行一段: <code>桩号,坡度(%),坡长(m)[,平曲线半径(m)]</code><br/>
    桩号支持 K12+500 或 12500;半径 0 为直线,符号表示转向。`,r=ct(),a=V("textarea"),o=ct(),l=V("div"),c=V("button"),c.textContent="导入并渲染",u=ct(),d=V("button"),d.textContent="载入示例",p=ct(),m=V("button"),m.textContent="选择CSV文件",_=ct(),v=V("input"),h=ct(),$&&$.c(),f=ct(),T=V("h3"),T.textContent="当前纵断面",M=ct(),y=V("p"),P=st("连续下坡 "),E=st(R),C=st(" km,累计落差 "),g=st(j),S=st(" m"),F=ct(),z=V("table"),W=V("thead"),W.innerHTML='<tr><th class="svelte-1nqze34">起点桩号</th><th class="svelte-1nqze34">坡度%</th><th class="svelte-1nqze34">坡长m</th><th class="svelte-1nqze34">半径m</th></tr>',J=ct(),k=V("tbody");for(let at=0;at<K.length;at+=1)K[at].c();B(e,"class","svelte-1nqze34"),B(s,"class","hint svelte-1nqze34"),B(a,"rows","9"),B(a,"placeholder","K0+000,-2.5,800,0 K0+800,-4.8,1500,600 ..."),B(a,"class","svelte-1nqze34"),B(c,"class","svelte-1nqze34"),B(d,"class","sec svelte-1nqze34"),B(m,"class","sec svelte-1nqze34"),B(v,"type","file"),B(v,"accept",".csv,.txt"),v.hidden=!0,B(l,"class","row svelte-1nqze34"),B(T,"class","svelte-1nqze34"),B(y,"class","hint svelte-1nqze34"),B(z,"class","svelte-1nqze34"),B(t,"class","pane svelte-1nqze34")},m(at,ft){qt(at,t,ft),A(t,e),A(t,n),A(t,s),A(t,r),A(t,a),Pr(a,i[1]),A(t,o),A(t,l),A(l,c),A(l,u),A(l,d),A(l,p),A(l,m),A(l,_),A(l,v),i[11](v),A(t,h),$&&$.m(t,null),A(t,f),A(t,T),A(t,M),A(t,y),A(y,P),A(y,E),A(y,C),A(y,g),A(y,S),A(t,F),A(t,z),A(z,W),A(z,J),A(z,k);for(let X=0;X<K.length;X+=1)K[X]&&K[X].m(k,null);U||(D=[Me(a,"input",i[9]),Me(c,"click",i[6]),Me(d,"click",i[7]),Me(m,"click",i[10]),Me(v,"change",i[8])],U=!0)},p(at,[ft]){if(ft&2&&Pr(a,at[1]),at[2]?$?$.p(at,ft):($=Yl(at),$.c(),$.m(t,f)):$&&($.d(1),$=null),ft&32&&R!==(R=(at[5]/1e3).toFixed(2)+"")&&Ct(E,R),ft&16&&j!==(j=Math.abs(at[4]).toFixed(0)+"")&&Ct(g,j),ft&1){Q=me(at[0]);let X;for(X=0;X<Q.length;X+=1){const nt=ql(at,Q,X);K[X]?K[X].p(nt,ft):(K[X]=$l(nt),K[X].c(),K[X].m(k,null))}for(;X<K.length;X+=1)K[X].d(1);K.length=Q.length}},i:_e,o:_e,d(at){at&&Xt(t),i[11](null),$&&$.d(),dn(K,at),U=!1,vn(D)}}}function Ng(i,t,e){let n,s,r;Le(i,zn,h=>e(0,r=h));let a="",o="",l;function c(h){const f=[],T=h.split(/\r?\n/);for(let M=0;M<T.length;M++){const y=T[M].trim();if(!y||y.startsWith("#")||y.startsWith("//"))continue;const P=y.split(/[,，\t\s]+/).filter(Boolean);if(P.length<3)throw new Error(`第 ${M+1} 行格式错误: 需要 桩号,坡度,坡长`);const R=pg(P[0]),E=parseFloat(P[1]),C=parseFloat(P[2]),j=P[3]?parseFloat(P[3]):0;if(isNaN(R))throw new Error(`第 ${M+1} 行桩号无法识别: ${P[0]}`);if(isNaN(E)||isNaN(C)||C<=0)throw new Error(`第 ${M+1} 行坡度/坡长无效`);f.push({stakeM:R,grade:E,length:C,radius:j})}if(f.length<1)throw new Error("未解析到任何纵断面段");return f.sort((M,y)=>M.stakeM-y.stakeM),f}function u(){try{const h=c(a);Wl(h),e(2,o=`已导入 ${h.length} 个纵断面段,共 ${(h.reduce((f,T)=>f+T.length,0)/1e3).toFixed(1)} km`)}catch(h){e(2,o="导入失败: "+h.message)}}function d(){e(1,a=Br.map(h=>`${ye(h.stakeM)},${h.grade},${h.length},${h.radius}`).join(`
`)),Wl(Br.map(h=>({...h}))),e(2,o="已载入示例长下坡纵断面(13.3km 连续下坡)")}function p(h){const f=h.target.files[0];if(!f)return;const T=new FileReader;T.onload=()=>{e(1,a=String(T.result))},T.readAsText(f,"utf-8")}function m(){a=this.value,e(1,a)}const _=()=>l.click();function v(h){Lr[h?"unshift":"push"](()=>{l=h,e(3,l)})}return i.$$.update=()=>{i.$$.dirty&1&&e(5,n=r.reduce((h,f)=>h+f.length,0)),i.$$.dirty&1&&e(4,s=r.reduce((h,f)=>h+f.grade*f.length/100,0))},[r,a,o,l,s,n,u,d,p,m,_,v]}class Fg extends Ci{constructor(t){super(),Ri(this,t,Ng,Ig,ri,{})}}function jl(i,t,e){const n=i.slice();n[23]=t[e];const s=n[3][n[23].id];return n[24]=s,n}function Kl(i,t,e){const n=i.slice();return n[27]=t[e],n}function Zl(i,t,e){const n=i.slice();return n[30]=t[e][0],n[27]=t[e][1],n}function Jl(i,t,e){const n=i.slice();return n[33]=t[e],n}function Ql(i,t,e){const n=i.slice();return n[30]=t[e][0],n[27]=t[e][1],n}function tc(i,t,e){const n=i.slice();return n[30]=t[e][0],n[38]=t[e][1],n}function ec(i){let t,e;return{c(){t=V("p"),e=st(i[0]),B(t,"class","flash svelte-h9fcba")},m(n,s){qt(n,t,s),A(t,e)},p(n,s){s[0]&1&&Ct(e,n[0])},d(n){n&&Xt(t)}}}function nc(i){let t;return{c(){t=V("p"),t.textContent='点击"沿主线布设"后,在三维地形的主线上点击放置;拖动引道口锥标可调整位置。',B(t,"class","hint svelte-h9fcba")},m(e,n){qt(e,t,n)},d(e){e&&Xt(t)}}}function ic(i){let t,e,n,s,r,a,o,l=Ge[i[23].type].desc+"",c,u,d,p,m,_,v,h,f,T,M,y,P,R,E,C,j,g,S,F,z,W,J,k,U,D,$,Q,K,at,ft,X,nt=i[24].mainGrade+"",ut,ht,Dt,wt,Ht,Pt,Ut=i[24].L_req.toFixed(1)+"",L,te,Gt=i[24].L_calc+"",Wt,Nt,ne,It,w,x,G=i[24].L_design+"",tt,rt,et,Rt,dt,Mt,Kt=i[24].width+"",ot,yt,Vt,Ft,Et,Zt,Bt,ce,I=Math.ceil(i[24].sight.required)+"",gt,Z,it=i[24].sight.blocked?`被 ${ye(i[24].sight.blockerStake)} R=${i[24].sight.blockerRadius}m 弯道遮挡`:"满足",mt,xt,Yt,ge,Te,Jt=i[24].available+"",Ie,nn,xs,Li,je,kn,Ss,Hn,oi,Tn,An,Es,li,Di=i[24].basis+"",ys,Ys,b,N,q,Y=i[23].revisions.length+"",O,lt,_t,bt,St,Ot,zt,Tt,ie,fe,he=me(Object.entries(Ge)),ue=[];for(let Lt=0;Lt<he.length;Lt+=1)ue[Lt]=sc(tc(i,he,Lt));function ae(...Lt){return i[13](i[23],...Lt)}let At=me(Object.entries(Bn)),se=[];for(let Lt=0;Lt<At.length;Lt+=1)se[Lt]=rc(Ql(i,At,Lt));function oe(...Lt){return i[14](i[23],...Lt)}function Je(...Lt){return i[15](i[23],...Lt)}function Gn(...Lt){return i[16](i[23],...Lt)}function Ve(...Lt){return i[17](i[23],i[24],...Lt)}function bs(...Lt){return i[18](i[23],i[24],...Lt)}let Qt=i[24].errors.length&&ac(i),We=me(Object.entries(i[24].quantities)),we=[];for(let Lt=0;Lt<We.length;Lt+=1)we[Lt]=lc(Zl(i,We,Lt));let Re=me([...i[23].revisions].reverse()),Ce=[];for(let Lt=0;Lt<Re.length;Lt+=1)Ce[Lt]=cc(Kl(i,Re,Lt));let ze=Ee[i[23].status].next&&hc(i),Be=i[23].status!=="draft"&&uc(i);function yh(){return i[21](i[23])}return{c(){t=V("div"),e=V("label"),n=st(`型式
            `),s=V("select");for(let Lt=0;Lt<ue.length;Lt+=1)ue[Lt].c();a=ct(),o=V("p"),c=st(l),u=ct(),d=V("label"),p=st(`设计车型
            `),m=V("select");for(let Lt=0;Lt<se.length;Lt+=1)se[Lt].c();v=ct(),h=V("div"),f=V("label"),T=st("失效初速度 km/h"),M=V("input"),P=ct(),R=V("label"),E=st("载重 t"),C=V("input"),g=ct(),S=V("label"),F=st("制动床纵坡 %"),z=V("input"),J=ct(),k=V("label"),U=st("滚动阻力系数"),D=V("input"),Q=ct(),K=V("table"),at=V("tr"),ft=V("td"),ft.textContent="主线坡度",X=V("td"),ut=st(nt),ht=st("%"),Dt=ct(),wt=V("tr"),Ht=V("td"),Ht.textContent="计算长度 L=V²/(254(f+i))",Pt=V("td"),L=st(Ut),te=st(" m → 取整 "),Wt=st(Gt),Nt=st(" m"),ne=ct(),It=V("tr"),w=V("td"),w.textContent=`设计长度(≥${In}m控制)`,x=V("td"),tt=st(G),rt=st(" m"),et=ct(),Rt=V("tr"),dt=V("td"),dt.textContent="设计宽度",Mt=V("td"),ot=st(Kt),yt=st(" m"),Vt=ct(),Ft=V("tr"),Et=V("td"),Et.textContent="入口视距",Zt=ct(),Bt=V("td"),ce=st("需要 "),gt=st(I),Z=st(` m,
                `),mt=st(it),xt=ct(),Yt=V("tr"),ge=V("td"),ge.textContent="场地可用长度",Te=V("td"),Ie=st(Jt),nn=st(" m"),xs=ct(),Qt&&Qt.c(),Li=ct(),je=V("details"),kn=V("summary"),kn.textContent="工程量估算",Ss=ct(),Hn=V("table");for(let Lt=0;Lt<we.length;Lt+=1)we[Lt].c();oi=ct(),Tn=V("details"),An=V("summary"),An.textContent="计算依据",Es=ct(),li=V("p"),ys=st(Di),Ys=ct(),b=V("details"),N=V("summary"),q=st("修订记录("),O=st(Y),lt=st(")"),_t=ct();for(let Lt=0;Lt<Ce.length;Lt+=1)Ce[Lt].c();bt=ct(),St=V("div"),ze&&ze.c(),Ot=ct(),Be&&Be.c(),zt=ct(),Tt=V("button"),Tt.textContent="删除",B(s,"class","svelte-h9fcba"),B(e,"class","svelte-h9fcba"),B(o,"class","desc svelte-h9fcba"),B(m,"class","svelte-h9fcba"),B(d,"class","svelte-h9fcba"),B(M,"type","number"),M.value=y=i[23].v0,B(M,"min","40"),B(M,"max","130"),B(M,"class","svelte-h9fcba"),B(f,"class","svelte-h9fcba"),B(C,"type","number"),C.value=j=i[23].loadT,B(C,"min","1"),B(C,"max","100"),B(C,"class","svelte-h9fcba"),B(R,"class","svelte-h9fcba"),B(z,"type","number"),B(z,"step","0.5"),z.value=W=i[24].bedGrade,B(z,"class","svelte-h9fcba"),B(S,"class","svelte-h9fcba"),B(D,"type","number"),B(D,"step","0.01"),D.value=$=i[24].fric,B(D,"class","svelte-h9fcba"),B(k,"class","svelte-h9fcba"),B(h,"class","grid svelte-h9fcba"),B(ft,"class","svelte-h9fcba"),B(X,"class","svelte-h9fcba"),B(Ht,"class","svelte-h9fcba"),B(Pt,"class","svelte-h9fcba"),B(w,"class","svelte-h9fcba"),B(x,"class","svelte-h9fcba"),B(It,"class","svelte-h9fcba"),Fe(It,"err",i[24].L_calc<In),B(dt,"class","svelte-h9fcba"),B(Mt,"class","svelte-h9fcba"),B(Et,"class","svelte-h9fcba"),B(Bt,"class","svelte-h9fcba"),B(Ft,"class","svelte-h9fcba"),Fe(Ft,"err",i[24].sight.blocked),B(ge,"class","svelte-h9fcba"),B(Te,"class","svelte-h9fcba"),B(Yt,"class","svelte-h9fcba"),Fe(Yt,"err",i[24].available<i[24].L_design),B(K,"class","calc svelte-h9fcba"),B(kn,"class","svelte-h9fcba"),B(Hn,"class","calc svelte-h9fcba"),B(je,"class","svelte-h9fcba"),B(An,"class","svelte-h9fcba"),B(li,"class","basis svelte-h9fcba"),B(Tn,"class","svelte-h9fcba"),B(N,"class","svelte-h9fcba"),B(b,"class","svelte-h9fcba"),B(Tt,"class","danger svelte-h9fcba"),B(St,"class","ops svelte-h9fcba"),B(t,"class","body svelte-h9fcba")},m(Lt,re){qt(Lt,t,re),A(t,e),A(e,n),A(e,s);for(let vt=0;vt<ue.length;vt+=1)ue[vt]&&ue[vt].m(s,null);$s(s,i[23].type),A(t,a),A(t,o),A(o,c),A(t,u),A(t,d),A(d,p),A(d,m);for(let vt=0;vt<se.length;vt+=1)se[vt]&&se[vt].m(m,null);$s(m,i[23].vehicle),A(t,v),A(t,h),A(h,f),A(f,T),A(f,M),A(h,P),A(h,R),A(R,E),A(R,C),A(h,g),A(h,S),A(S,F),A(S,z),A(h,J),A(h,k),A(k,U),A(k,D),A(t,Q),A(t,K),A(K,at),A(at,ft),A(at,X),A(X,ut),A(X,ht),A(K,Dt),A(K,wt),A(wt,Ht),A(wt,Pt),A(Pt,L),A(Pt,te),A(Pt,Wt),A(Pt,Nt),A(K,ne),A(K,It),A(It,w),A(It,x),A(x,tt),A(x,rt),A(K,et),A(K,Rt),A(Rt,dt),A(Rt,Mt),A(Mt,ot),A(Mt,yt),A(K,Vt),A(K,Ft),A(Ft,Et),A(Ft,Zt),A(Ft,Bt),A(Bt,ce),A(Bt,gt),A(Bt,Z),A(Bt,mt),A(K,xt),A(K,Yt),A(Yt,ge),A(Yt,Te),A(Te,Ie),A(Te,nn),A(t,xs),Qt&&Qt.m(t,null),A(t,Li),A(t,je),A(je,kn),A(je,Ss),A(je,Hn);for(let vt=0;vt<we.length;vt+=1)we[vt]&&we[vt].m(Hn,null);A(t,oi),A(t,Tn),A(Tn,An),A(Tn,Es),A(Tn,li),A(li,ys),A(t,Ys),A(t,b),A(b,N),A(N,q),A(N,O),A(N,lt),A(b,_t);for(let vt=0;vt<Ce.length;vt+=1)Ce[vt]&&Ce[vt].m(b,null);A(t,bt),A(t,St),ze&&ze.m(St,null),A(St,Ot),Be&&Be.m(St,null),A(St,zt),A(St,Tt),ie||(fe=[Me(s,"change",ae),Me(m,"change",oe),Me(M,"change",Je),Me(C,"change",Gn),Me(z,"change",Ve),Me(D,"change",bs),Me(Tt,"click",yh),Me(t,"click",Ic(i[9]))],ie=!0)},p(Lt,re){if(i=Lt,re&0){he=me(Object.entries(Ge));let vt;for(vt=0;vt<he.length;vt+=1){const ln=tc(i,he,vt);ue[vt]?ue[vt].p(ln,re):(ue[vt]=sc(ln),ue[vt].c(),ue[vt].m(s,null))}for(;vt<ue.length;vt+=1)ue[vt].d(1);ue.length=he.length}if(re[0]&2&&r!==(r=i[23].type)&&$s(s,i[23].type),re[0]&2&&l!==(l=Ge[i[23].type].desc+"")&&Ct(c,l),re&0){At=me(Object.entries(Bn));let vt;for(vt=0;vt<At.length;vt+=1){const ln=Ql(i,At,vt);se[vt]?se[vt].p(ln,re):(se[vt]=rc(ln),se[vt].c(),se[vt].m(m,null))}for(;vt<se.length;vt+=1)se[vt].d(1);se.length=At.length}if(re[0]&2&&_!==(_=i[23].vehicle)&&$s(m,i[23].vehicle),re[0]&2&&y!==(y=i[23].v0)&&M.value!==y&&(M.value=y),re[0]&2&&j!==(j=i[23].loadT)&&C.value!==j&&(C.value=j),re[0]&10&&W!==(W=i[24].bedGrade)&&z.value!==W&&(z.value=W),re[0]&10&&$!==($=i[24].fric)&&D.value!==$&&(D.value=$),re[0]&10&&nt!==(nt=i[24].mainGrade+"")&&Ct(ut,nt),re[0]&10&&Ut!==(Ut=i[24].L_req.toFixed(1)+"")&&Ct(L,Ut),re[0]&10&&Gt!==(Gt=i[24].L_calc+"")&&Ct(Wt,Gt),re[0]&10&&G!==(G=i[24].L_design+"")&&Ct(tt,G),re[0]&10&&Fe(It,"err",i[24].L_calc<In),re[0]&10&&Kt!==(Kt=i[24].width+"")&&Ct(ot,Kt),re[0]&10&&I!==(I=Math.ceil(i[24].sight.required)+"")&&Ct(gt,I),re[0]&10&&it!==(it=i[24].sight.blocked?`被 ${ye(i[24].sight.blockerStake)} R=${i[24].sight.blockerRadius}m 弯道遮挡`:"满足")&&Ct(mt,it),re[0]&10&&Fe(Ft,"err",i[24].sight.blocked),re[0]&10&&Jt!==(Jt=i[24].available+"")&&Ct(Ie,Jt),re[0]&10&&Fe(Yt,"err",i[24].available<i[24].L_design),i[24].errors.length?Qt?Qt.p(i,re):(Qt=ac(i),Qt.c(),Qt.m(t,Li)):Qt&&(Qt.d(1),Qt=null),re[0]&10){We=me(Object.entries(i[24].quantities));let vt;for(vt=0;vt<We.length;vt+=1){const ln=Zl(i,We,vt);we[vt]?we[vt].p(ln,re):(we[vt]=lc(ln),we[vt].c(),we[vt].m(Hn,null))}for(;vt<we.length;vt+=1)we[vt].d(1);we.length=We.length}if(re[0]&10&&Di!==(Di=i[24].basis+"")&&Ct(ys,Di),re[0]&2&&Y!==(Y=i[23].revisions.length+"")&&Ct(O,Y),re[0]&2){Re=me([...i[23].revisions].reverse());let vt;for(vt=0;vt<Re.length;vt+=1){const ln=Kl(i,Re,vt);Ce[vt]?Ce[vt].p(ln,re):(Ce[vt]=cc(ln),Ce[vt].c(),Ce[vt].m(b,null))}for(;vt<Ce.length;vt+=1)Ce[vt].d(1);Ce.length=Re.length}Ee[i[23].status].next?ze?ze.p(i,re):(ze=hc(i),ze.c(),ze.m(St,Ot)):ze&&(ze.d(1),ze=null),i[23].status!=="draft"?Be?Be.p(i,re):(Be=uc(i),Be.c(),Be.m(St,zt)):Be&&(Be.d(1),Be=null)},d(Lt){Lt&&Xt(t),dn(ue,Lt),dn(se,Lt),Qt&&Qt.d(),dn(we,Lt),dn(Ce,Lt),ze&&ze.d(),Be&&Be.d(),ie=!1,vn(fe)}}}function sc(i){let t,e=i[38].name+"",n;return{c(){t=V("option"),n=st(e),t.__value=i[30],Pr(t,t.__value)},m(s,r){qt(s,t,r),A(t,n)},p:_e,d(s){s&&Xt(t)}}}function rc(i){let t,e=i[27].name+"",n,s,r=i[27].load+"",a,o;return{c(){t=V("option"),n=st(e),s=st("("),a=st(r),o=st("t)"),t.__value=i[30],Pr(t,t.__value)},m(l,c){qt(l,t,c),A(t,n),A(t,s),A(t,a),A(t,o)},p:_e,d(l){l&&Xt(t)}}}function ac(i){let t,e=me(i[24].errors),n=[];for(let s=0;s<e.length;s+=1)n[s]=oc(Jl(i,e,s));return{c(){t=V("div");for(let s=0;s<n.length;s+=1)n[s].c();B(t,"class","errors svelte-h9fcba")},m(s,r){qt(s,t,r);for(let a=0;a<n.length;a+=1)n[a]&&n[a].m(t,null)},p(s,r){if(r[0]&10){e=me(s[24].errors);let a;for(a=0;a<e.length;a+=1){const o=Jl(s,e,a);n[a]?n[a].p(o,r):(n[a]=oc(o),n[a].c(),n[a].m(t,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=e.length}},d(s){s&&Xt(t),dn(n,s)}}}function oc(i){let t,e,n=i[33]+"",s;return{c(){t=V("p"),e=st("⚠ "),s=st(n),B(t,"class","svelte-h9fcba")},m(r,a){qt(r,t,a),A(t,e),A(t,s)},p(r,a){a[0]&10&&n!==(n=r[33]+"")&&Ct(s,n)},d(r){r&&Xt(t)}}}function lc(i){let t,e,n=i[30]+"",s,r,a=i[27]+"",o;return{c(){t=V("tr"),e=V("td"),s=st(n),r=V("td"),o=st(a),B(e,"class","svelte-h9fcba"),B(r,"class","svelte-h9fcba")},m(l,c){qt(l,t,c),A(t,e),A(e,s),A(t,r),A(r,o)},p(l,c){c[0]&10&&n!==(n=l[30]+"")&&Ct(s,n),c[0]&10&&a!==(a=l[27]+"")&&Ct(o,a)},d(l){l&&Xt(t)}}}function cc(i){let t,e,n=i[27].time+"",s,r,a=i[27].action+"",o,l,c=i[27].detail+"",u,d,p,m=i[27].basis+"",_;return{c(){t=V("p"),e=V("b"),s=st(n),r=st(" ["),o=st(a),l=st("] "),u=st(c),d=V("br"),p=V("span"),_=st(m),B(p,"class","svelte-h9fcba"),B(t,"class","rev svelte-h9fcba")},m(v,h){qt(v,t,h),A(t,e),A(e,s),A(t,r),A(t,o),A(t,l),A(t,u),A(t,d),A(t,p),A(p,_)},p(v,h){h[0]&2&&n!==(n=v[27].time+"")&&Ct(s,n),h[0]&2&&a!==(a=v[27].action+"")&&Ct(o,a),h[0]&2&&c!==(c=v[27].detail+"")&&Ct(u,c),h[0]&2&&m!==(m=v[27].basis+"")&&Ct(_,m)},d(v){v&&Xt(t)}}}function hc(i){let t,e=Ee[i[23].status].nextLabel+"",n,s,r;function a(){return i[19](i[23])}return{c(){t=V("button"),n=st(e),B(t,"class","svelte-h9fcba")},m(o,l){qt(o,t,l),A(t,n),s||(r=Me(t,"click",a),s=!0)},p(o,l){i=o,l[0]&2&&e!==(e=Ee[i[23].status].nextLabel+"")&&Ct(n,e)},d(o){o&&Xt(t),s=!1,r()}}}function uc(i){let t,e,n;function s(){return i[20](i[23])}return{c(){t=V("button"),t.textContent="退回修改",B(t,"class","sec svelte-h9fcba")},m(r,a){qt(r,t,a),e||(n=Me(t,"click",s),e=!0)},p(r,a){i=r},d(r){r&&Xt(t),e=!1,n()}}}function fc(i,t){let e,n,s,r,a,o,l=ye(t[23].stakeM)+"",c,u,d,p=Ee[t[23].status].name+"",m,_,v,h,f;function T(...P){return t[12](t[23],...P)}let M=t[4]===t[23].id&&t[24]&&ic(t);function y(){return t[22](t[23])}return{key:i,first:null,c(){e=V("div"),n=V("div"),s=V("input"),a=ct(),o=V("span"),c=st(l),u=ct(),d=V("span"),m=st(p),_=ct(),M&&M.c(),v=ct(),B(s,"class","name svelte-h9fcba"),s.value=r=t[23].name,B(o,"class","stake svelte-h9fcba"),B(d,"class","badge svelte-h9fcba"),Os(d,"background",Ee[t[23].status].color),B(n,"class","head svelte-h9fcba"),B(e,"class","card svelte-h9fcba"),Fe(e,"sel",t[4]===t[23].id),Fe(e,"bad",t[24]&&t[24].errors.length),this.first=e},m(P,R){qt(P,e,R),A(e,n),A(n,s),A(n,a),A(n,o),A(o,c),A(n,u),A(n,d),A(d,m),A(e,_),M&&M.m(e,null),A(e,v),h||(f=[Me(s,"click",Ic(t[10])),Me(s,"change",T),Me(e,"click",y)],h=!0)},p(P,R){t=P,R[0]&2&&r!==(r=t[23].name)&&s.value!==r&&(s.value=r),R[0]&2&&l!==(l=ye(t[23].stakeM)+"")&&Ct(c,l),R[0]&2&&p!==(p=Ee[t[23].status].name+"")&&Ct(m,p),R[0]&2&&Os(d,"background",Ee[t[23].status].color),t[4]===t[23].id&&t[24]?M?M.p(t,R):(M=ic(t),M.c(),M.m(e,v)):M&&(M.d(1),M=null),R[0]&18&&Fe(e,"sel",t[4]===t[23].id),R[0]&10&&Fe(e,"bad",t[24]&&t[24].errors.length)},d(P){P&&Xt(e),M&&M.d(),h=!1,vn(f)}}}function Og(i){let t,e,n,s,r=i[1].length+"",a,o,l,c,u=i[2]?"点击主线布设中…(取消)":"＋ 沿主线布设",d,p,m,_,v=[],h=new Map,f,T,M=i[0]&&ec(i),y=i[1].length===0&&nc(),P=me(i[1]);const R=E=>E[23].id;for(let E=0;E<P.length;E+=1){let C=jl(i,P,E),j=R(C);h.set(j,v[E]=fc(j,C))}return{c(){t=V("div"),e=V("div"),n=V("h3"),s=st("避险车道("),a=st(r),o=st(")"),l=ct(),c=V("button"),d=st(u),p=ct(),M&&M.c(),m=ct(),y&&y.c(),_=ct();for(let E=0;E<v.length;E+=1)v[E].c();B(n,"class","svelte-h9fcba"),B(c,"class","svelte-h9fcba"),Fe(c,"on",i[2]),B(e,"class","bar svelte-h9fcba"),B(t,"class","pane svelte-h9fcba")},m(E,C){qt(E,t,C),A(t,e),A(e,n),A(n,s),A(n,a),A(n,o),A(e,l),A(e,c),A(c,d),A(t,p),M&&M.m(t,null),A(t,m),y&&y.m(t,null),A(t,_);for(let j=0;j<v.length;j+=1)v[j]&&v[j].m(t,null);f||(T=Me(c,"click",i[11]),f=!0)},p(E,C){C[0]&2&&r!==(r=E[1].length+"")&&Ct(a,r),C[0]&4&&u!==(u=E[2]?"点击主线布设中…(取消)":"＋ 沿主线布设")&&Ct(d,u),C[0]&4&&Fe(c,"on",E[2]),E[0]?M?M.p(E,C):(M=ec(E),M.c(),M.m(t,m)):M&&(M.d(1),M=null),E[1].length===0?y||(y=nc(),y.c(),y.m(t,_)):y&&(y.d(1),y=null),C[0]&250&&(P=me(E[1]),v=Bc(v,C,R,1,E,P,h,t,Oc,fc,null,jl))},i:_e,o:_e,d(E){E&&Xt(t),M&&M.d(),y&&y.d();for(let C=0;C<v.length;C+=1)v[C].d();f=!1,T()}}}function xr(i,t){const e=parseFloat(i.target.value);return isNaN(e)?t:e}function Bg(i,t,e){let n,s,r,a,o;Le(i,be,g=>e(8,s=g)),Le(i,ks,g=>e(2,r=g)),Le(i,si,g=>e(3,a=g)),Le(i,gn,g=>e(4,o=g));let l="";function c(g,S){const F=Ge[S];mi(g.id,{type:S,fric:F.fric,bedGrade:F.grade},"更换型式")}function u(g,S){const F=Bn[S];mi(g.id,{vehicle:S,v0:F.v0,loadT:F.load},"变更设计车型")}function d(g){const S=Ag(g);e(0,l=S.ok?"":S.msg),l&&setTimeout(()=>e(0,l=""),4e3)}function p(g){ko.call(this,i,g)}function m(g){ko.call(this,i,g)}const _=()=>ks.update(g=>!g),v=(g,S)=>mi(g.id,{name:S.target.value},"更名"),h=(g,S)=>c(g,S.target.value),f=(g,S)=>u(g,S.target.value),T=(g,S)=>mi(g.id,{v0:xr(S,g.v0)},"修改参数"),M=(g,S)=>mi(g.id,{loadT:xr(S,g.loadT)},"修改参数"),y=(g,S,F)=>mi(g.id,{bedGrade:xr(F,S.bedGrade)},"修改参数"),P=(g,S,F)=>mi(g.id,{fric:xr(F,S.fric)},"修改参数"),R=g=>d(g.id),E=g=>wg(g.id),C=g=>Rg(g.id),j=g=>gn.set(g.id);return i.$$.update=()=>{i.$$.dirty[0]&256&&e(1,n=[...s].sort((g,S)=>g.stakeM-S.stakeM))},[l,n,r,a,o,c,u,d,s,p,m,_,v,h,f,T,M,y,P,R,E,C,j]}class zg extends Ci{constructor(t){super(),Ri(this,t,Bg,Og,ri,{},null,[-1,-1])}}function dc(i,t,e){const n=i.slice();return n[4]=t[e],n}function pc(i,t,e){const n=i.slice();return n[7]=t[e][0],n[4]=t[e][1],n}function mc(i,t,e){const n=i.slice();return n[10]=t[e],n}function kg(i){let t,e,n,s,r,a,o,l,c,u,d,p,m,_=i[1].totalCovered.toFixed(1)+"",v,h,f=me(i[1].rows),T=[];for(let P=0;P<f.length;P+=1)T[P]=_c(mc(i,f,P));let M=me(Object.entries(i[1].totalQ)),y=[];for(let P=0;P<M.length;P+=1)y[P]=gc(pc(i,M,P));return{c(){t=V("table"),e=V("thead"),e.innerHTML='<tr><th class="svelte-uremdy">名称</th><th class="svelte-uremdy">桩号</th><th class="svelte-uremdy">型式</th><th class="svelte-uremdy">与上游间距</th><th class="svelte-uremdy">覆盖里程</th><th class="svelte-uremdy">覆盖失控车辆</th><th class="svelte-uremdy">状态</th></tr>',n=ct(),s=V("tbody");for(let P=0;P<T.length;P+=1)T[P].c();r=ct(),a=V("h3"),a.textContent="工程量汇总",o=ct(),l=V("table"),c=V("tbody");for(let P=0;P<y.length;P+=1)y[P].c();u=ct(),d=V("tr"),p=V("td"),p.textContent="覆盖失控车辆合计",m=V("td"),v=st(_),h=st(" 辆"),B(t,"class","svelte-uremdy"),B(a,"class","svelte-uremdy"),B(p,"class","svelte-uremdy"),B(m,"class","svelte-uremdy"),B(d,"class","total svelte-uremdy"),B(l,"class","svelte-uremdy")},m(P,R){qt(P,t,R),A(t,e),A(t,n),A(t,s);for(let E=0;E<T.length;E+=1)T[E]&&T[E].m(s,null);qt(P,r,R),qt(P,a,R),qt(P,o,R),qt(P,l,R),A(l,c);for(let E=0;E<y.length;E+=1)y[E]&&y[E].m(c,null);A(c,u),A(c,d),A(d,p),A(d,m),A(m,v),A(m,h)},p(P,R){if(R&2){f=me(P[1].rows);let E;for(E=0;E<f.length;E+=1){const C=mc(P,f,E);T[E]?T[E].p(C,R):(T[E]=_c(C),T[E].c(),T[E].m(s,null))}for(;E<T.length;E+=1)T[E].d(1);T.length=f.length}if(R&2){M=me(Object.entries(P[1].totalQ));let E;for(E=0;E<M.length;E+=1){const C=pc(P,M,E);y[E]?y[E].p(C,R):(y[E]=gc(C),y[E].c(),y[E].m(c,u))}for(;E<y.length;E+=1)y[E].d(1);y.length=M.length}R&2&&_!==(_=P[1].totalCovered.toFixed(1)+"")&&Ct(v,_)},d(P){P&&(Xt(t),Xt(r),Xt(a),Xt(o),Xt(l)),dn(T,P),dn(y,P)}}}function Hg(i){let t;return{c(){t=V("p"),t.textContent="尚未布设避险车道。",B(t,"class","hint svelte-uremdy")},m(e,n){qt(e,t,n)},p:_e,d(e){e&&Xt(t)}}}function _c(i){let t,e,n=i[10].ramp.name+"",s,r,a,o=ye(i[10].ramp.stakeM)+"",l,c,u,d=Ge[i[10].ramp.type].name+"",p,m,_,v=i[10].spacing===null?"—":(i[10].spacing/1e3).toFixed(2)+" km",h,f,T,M=i[10].zoneKm.toFixed(2)+"",y,P,R,E,C=i[10].covered.toFixed(1)+"",j,g,S,F,z,W=Ee[i[10].ramp.status].name+"",J,k;return{c(){t=V("tr"),e=V("td"),s=st(n),r=ct(),a=V("td"),l=st(o),c=ct(),u=V("td"),p=st(d),m=ct(),_=V("td"),h=st(v),f=ct(),T=V("td"),y=st(M),P=st(" km"),R=ct(),E=V("td"),j=st(C),g=st(" 辆"),S=ct(),F=V("td"),z=V("span"),J=st(W),k=ct(),B(e,"class","svelte-uremdy"),B(a,"class","svelte-uremdy"),B(u,"class","svelte-uremdy"),B(_,"class","svelte-uremdy"),B(T,"class","svelte-uremdy"),B(E,"class","svelte-uremdy"),B(z,"class","badge svelte-uremdy"),Os(z,"background",Ee[i[10].ramp.status].color),B(F,"class","svelte-uremdy")},m(U,D){qt(U,t,D),A(t,e),A(e,s),A(t,r),A(t,a),A(a,l),A(t,c),A(t,u),A(u,p),A(t,m),A(t,_),A(_,h),A(t,f),A(t,T),A(T,y),A(T,P),A(t,R),A(t,E),A(E,j),A(E,g),A(t,S),A(t,F),A(F,z),A(z,J),A(t,k)},p(U,D){D&2&&n!==(n=U[10].ramp.name+"")&&Ct(s,n),D&2&&o!==(o=ye(U[10].ramp.stakeM)+"")&&Ct(l,o),D&2&&d!==(d=Ge[U[10].ramp.type].name+"")&&Ct(p,d),D&2&&v!==(v=U[10].spacing===null?"—":(U[10].spacing/1e3).toFixed(2)+" km")&&Ct(h,v),D&2&&M!==(M=U[10].zoneKm.toFixed(2)+"")&&Ct(y,M),D&2&&C!==(C=U[10].covered.toFixed(1)+"")&&Ct(j,C),D&2&&W!==(W=Ee[U[10].ramp.status].name+"")&&Ct(J,W),D&2&&Os(z,"background",Ee[U[10].ramp.status].color)},d(U){U&&Xt(t)}}}function gc(i){let t,e,n=i[7]+"",s,r,a=Math.round(i[4])+"",o,l,c=i[7].includes("m³")?"m³":i[7].includes("m²")?"m²":i[7].includes("m")?"m":"",u;return{c(){t=V("tr"),e=V("td"),s=st(n),r=V("td"),o=st(a),l=ct(),u=st(c),B(e,"class","svelte-uremdy"),B(r,"class","svelte-uremdy")},m(d,p){qt(d,t,p),A(t,e),A(e,s),A(t,r),A(r,o),A(r,l),A(r,u)},p(d,p){p&2&&n!==(n=d[7]+"")&&Ct(s,n),p&2&&a!==(a=Math.round(d[4])+"")&&Ct(o,a),p&2&&c!==(c=d[7].includes("m³")?"m³":d[7].includes("m²")?"m²":d[7].includes("m")?"m":"")&&Ct(u,c)},d(d){d&&Xt(t)}}}function Gg(i){let t,e=me(i[2]),n=[];for(let s=0;s<e.length;s+=1)n[s]=vc(dc(i,e,s));return{c(){for(let s=0;s<n.length;s+=1)n[s].c();t=Uc()},m(s,r){for(let a=0;a<n.length;a+=1)n[a]&&n[a].m(s,r);qt(s,t,r)},p(s,r){if(r&4){e=me(s[2]);let a;for(a=0;a<e.length;a+=1){const o=dc(s,e,a);n[a]?n[a].p(o,r):(n[a]=vc(o),n[a].c(),n[a].m(t.parentNode,t))}for(;a<n.length;a+=1)n[a].d(1);n.length=e.length}},d(s){s&&Xt(t),dn(n,s)}}}function Vg(i){let t;return{c(){t=V("p"),t.textContent="暂无修订记录。",B(t,"class","hint svelte-uremdy")},m(e,n){qt(e,t,n)},p:_e,d(e){e&&Xt(t)}}}function vc(i){let t,e,n=i[4].time+"",s,r,a=i[4].rampName+"",o,l,c=i[4].action+"",u,d,p,m,_=i[4].detail+"",v,h,f,T,M,y=i[4].basis+"",P,R;return{c(){t=V("div"),e=V("b"),s=st(n),r=st(" · "),o=st(a),l=st(" · ["),u=st(c),d=st("]"),p=V("br"),m=ct(),v=st(_),h=V("br"),f=ct(),T=V("span"),M=st("依据: "),P=st(y),R=ct(),B(T,"class","svelte-uremdy"),B(t,"class","rev svelte-uremdy")},m(E,C){qt(E,t,C),A(t,e),A(e,s),A(t,r),A(t,o),A(t,l),A(t,u),A(t,d),A(t,p),A(t,m),A(t,v),A(t,h),A(t,f),A(t,T),A(T,M),A(T,P),A(t,R)},p(E,C){C&4&&n!==(n=E[4].time+"")&&Ct(s,n),C&4&&a!==(a=E[4].rampName+"")&&Ct(o,a),C&4&&c!==(c=E[4].action+"")&&Ct(u,c),C&4&&_!==(_=E[4].detail+"")&&Ct(v,_),C&4&&y!==(y=E[4].basis+"")&&Ct(P,y)},d(E){E&&Xt(t)}}}function Wg(i){let t,e,n,s,r,a,o,l,c,u,d,p,m;function _(y,P){return y[1].rows.length===0?Hg:kg}let v=_(i),h=v(i);function f(y,P){return y[2].length===0?Vg:Gg}let T=f(i),M=T(i);return{c(){t=V("div"),e=V("h3"),e.textContent="布设统计",n=ct(),s=V("label"),r=st(`失控车辆密度(辆/km,设计年限内)
    `),a=V("input"),l=ct(),h.c(),c=ct(),u=V("h3"),u.textContent="全部修订记录",d=ct(),M.c(),B(e,"class","svelte-uremdy"),B(a,"type","number"),B(a,"step","0.1"),B(a,"min","0"),a.value=o=i[0].runawayRate,B(a,"class","svelte-uremdy"),B(s,"class","rate svelte-uremdy"),B(u,"class","svelte-uremdy"),B(t,"class","pane svelte-uremdy")},m(y,P){qt(y,t,P),A(t,e),A(t,n),A(t,s),A(s,r),A(s,a),A(t,l),h.m(t,null),A(t,c),A(t,u),A(t,d),M.m(t,null),p||(m=Me(a,"change",i[3]),p=!0)},p(y,[P]){P&1&&o!==(o=y[0].runawayRate)&&a.value!==o&&(a.value=o),v===(v=_(y))&&h?h.p(y,P):(h.d(1),h=v(y),h&&(h.c(),h.m(t,c))),T===(T=f(y))&&M?M.p(y,P):(M.d(1),M=T(y),M&&(M.c(),M.m(t,null)))},i:_e,o:_e,d(y){y&&Xt(t),h.d(),M.d(),p=!1,m()}}}function Xg(i,t,e){let n,s,r;return Le(i,zr,o=>e(0,n=o)),Le(i,Eh,o=>e(1,s=o)),Le(i,Eg,o=>e(2,r=o)),[n,s,r,o=>zr.update(l=>({...l,runawayRate:parseFloat(o.target.value)||0}))]}class qg extends Ci{constructor(t){super(),Ri(this,t,Xg,Wg,ri,{})}}function Mc(i,t,e){const n=i.slice();n[7]=t[e];const s=n[1][n[7].id];return n[8]=s,n}function xc(i){let t,e;return{c(){t=V("p"),e=st(i[0]),B(t,"class","msg svelte-ic02vy")},m(n,s){qt(n,t,s),A(t,e)},p(n,s){s&1&&Ct(e,n[0])},d(n){n&&Xt(t)}}}function Sc(i){let t,e,n,s,r,a,o,l=me([...i[2]].sort(bc)),c=[];for(let u=0;u<l.length;u+=1)c[u]=Ec(Mc(i,l,u));return{c(){t=V("h3"),t.textContent="预览",e=ct(),n=V("div"),s=V("table"),r=V("thead"),r.innerHTML='<tr><th class="svelte-ic02vy">桩号</th><th class="svelte-ic02vy">型式</th><th class="svelte-ic02vy">设计长度</th><th class="svelte-ic02vy">宽度</th><th class="svelte-ic02vy">视距</th><th class="svelte-ic02vy">结论</th><th class="svelte-ic02vy">状态</th></tr>',a=ct(),o=V("tbody");for(let u=0;u<c.length;u+=1)c[u].c();B(t,"class","svelte-ic02vy"),B(s,"class","svelte-ic02vy"),B(n,"class","scroll svelte-ic02vy")},m(u,d){qt(u,t,d),qt(u,e,d),qt(u,n,d),A(n,s),A(s,r),A(s,a),A(s,o);for(let p=0;p<c.length;p+=1)c[p]&&c[p].m(o,null)},p(u,d){if(d&6){l=me([...u[2]].sort(bc));let p;for(p=0;p<l.length;p+=1){const m=Mc(u,l,p);c[p]?c[p].p(m,d):(c[p]=Ec(m),c[p].c(),c[p].m(o,null))}for(;p<c.length;p+=1)c[p].d(1);c.length=l.length}},d(u){u&&(Xt(t),Xt(e),Xt(n)),dn(c,u)}}}function Ec(i){let t,e,n=ye(i[7].stakeM)+"",s,r,a,o=Ge[i[7].type].name+"",l,c,u,d=i[8].L_design+"",p,m,_,v,h=i[8].width+"",f,T,M,y,P=i[8].sight.blocked?"遮挡":"满足",R,E,C,j=i[8].errors.length?"不合格":"合格",g,S,F,z=Ee[i[7].status].name+"",W,J;return{c(){t=V("tr"),e=V("td"),s=st(n),r=ct(),a=V("td"),l=st(o),c=ct(),u=V("td"),p=st(d),m=st(" m"),_=ct(),v=V("td"),f=st(h),T=st(" m"),M=ct(),y=V("td"),R=st(P),E=ct(),C=V("td"),g=st(j),S=ct(),F=V("td"),W=st(z),J=ct(),B(e,"class","svelte-ic02vy"),B(a,"class","svelte-ic02vy"),B(u,"class","svelte-ic02vy"),B(v,"class","svelte-ic02vy"),B(y,"class","svelte-ic02vy"),B(C,"class","svelte-ic02vy"),B(F,"class","svelte-ic02vy"),B(t,"class","svelte-ic02vy"),Fe(t,"bad",i[8].errors.length)},m(k,U){qt(k,t,U),A(t,e),A(e,s),A(t,r),A(t,a),A(a,l),A(t,c),A(t,u),A(u,p),A(u,m),A(t,_),A(t,v),A(v,f),A(v,T),A(t,M),A(t,y),A(y,R),A(t,E),A(t,C),A(C,g),A(t,S),A(t,F),A(F,W),A(t,J)},p(k,U){U&4&&n!==(n=ye(k[7].stakeM)+"")&&Ct(s,n),U&4&&o!==(o=Ge[k[7].type].name+"")&&Ct(l,o),U&6&&d!==(d=k[8].L_design+"")&&Ct(p,d),U&6&&h!==(h=k[8].width+"")&&Ct(f,h),U&6&&P!==(P=k[8].sight.blocked?"遮挡":"满足")&&Ct(R,P),U&6&&j!==(j=k[8].errors.length?"不合格":"合格")&&Ct(g,j),U&4&&z!==(z=Ee[k[7].status].name+"")&&Ct(W,z),U&6&&Fe(t,"bad",k[8].errors.length)},d(k){k&&Xt(t)}}}function Yg(i){let t,e,n,s,r,a,o,l,c,u,d,p,m,_=i[0]&&xc(i),v=i[2].length&&Sc(i);return{c(){t=V("div"),e=V("h3"),e.textContent="导出选址论证表",n=ct(),s=V("p"),s.textContent="论证表包含每处避险车道的桩号、型式、设计车型与载重、失效初速度、制动床长度/宽度验算、视距检验、工程量、覆盖统计与计算依据,提交养护科与交警联审使用。",r=ct(),a=V("div"),o=V("button"),o.textContent="导出选址论证表 (CSV)",l=ct(),c=V("button"),c.textContent="导出方案 JSON",u=ct(),_&&_.c(),d=ct(),v&&v.c(),B(e,"class","svelte-ic02vy"),B(s,"class","hint svelte-ic02vy"),B(o,"class","svelte-ic02vy"),B(c,"class","sec svelte-ic02vy"),B(a,"class","row svelte-ic02vy"),B(t,"class","pane svelte-ic02vy")},m(h,f){qt(h,t,f),A(t,e),A(t,n),A(t,s),A(t,r),A(t,a),A(a,o),A(a,l),A(a,c),A(t,u),_&&_.m(t,null),A(t,d),v&&v.m(t,null),p||(m=[Me(o,"click",i[3]),Me(c,"click",i[4])],p=!0)},p(h,[f]){h[0]?_?_.p(h,f):(_=xc(h),_.c(),_.m(t,d)):_&&(_.d(1),_=null),h[2].length?v?v.p(h,f):(v=Sc(h),v.c(),v.m(t,null)):v&&(v.d(1),v=null)},i:_e,o:_e,d(h){h&&Xt(t),_&&_.d(),v&&v.d(),p=!1,vn(m)}}}function $g(i){return i=String(i??""),/[",\n]/.test(i)?'"'+i.replace(/"/g,'""')+'"':i}function yc(i,t,e="text/csv"){const n=new Blob([t],{type:e+";charset=utf-8"}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download=i,s.click(),URL.revokeObjectURL(s.href)}const bc=(i,t)=>i.stakeM-t.stakeM;function jg(i,t,e){let n,s,r,a;Le(i,si,u=>e(1,n=u)),Le(i,be,u=>e(2,s=u)),Le(i,zn,u=>e(5,r=u)),Le(i,Eh,u=>e(6,a=u));let o="";function l(){const u=[...s].sort((_,v)=>_.stakeM-v.stakeM);if(u.length===0){e(0,o="尚无避险车道可导出");return}const d=["序号","名称","引道口桩号","型式","状态","设计车型","载重(t)","制动失效初速度(km/h)","主线坡度(%)","制动床纵坡(%)","滚动阻力系数","计算长度(m)",`设计长度(m,≥${In}控制)`,"设计宽度(m)","入口视距要求(m)","视距检验","场地可用长度(m)","检验结论","与上游间距(km)","覆盖里程(km)","覆盖失控车辆(辆)","工程量","计算依据"],p=u.map((_,v)=>{const h=n[_.id],f=a.rows.find(M=>M.ramp.id===_.id),T=Object.entries(h.quantities).map(([M,y])=>`${M}:${y}`).join(";");return[v+1,_.name,ye(_.stakeM),Ge[_.type].name,Ee[_.status].name,Bn[_.vehicle].name,_.loadT,_.v0,h.mainGrade,h.bedGrade,h.fric,h.L_req.toFixed(1),h.L_design,h.width,Math.ceil(h.sight.required),h.sight.blocked?`被${ye(h.sight.blockerStake)}弯道遮挡`:"满足",h.available,h.errors.length?"不合格:"+h.errors.join("|"):"合格",f&&f.spacing!==null?(f.spacing/1e3).toFixed(2):"—",f?f.zoneKm.toFixed(2):"",f?f.covered.toFixed(1):"",T,h.basis]}),m="\uFEFF"+[d,...p].map(_=>_.map($g).join(",")).join(`\r
`);yc("避险车道选址论证表.csv",m),e(0,o=`已导出 ${p.length} 条选址论证记录`)}function c(){const u={导出时间:new Date().toLocaleString("zh-CN",{hour12:!1}),纵断面:r,避险车道:s.map(d=>({...d,验算:n[d.id]}))};yc("避险车道方案.json",JSON.stringify(u,null,2),"application/json"),e(0,o="已导出方案 JSON(含修订记录与计算依据)")}return[o,n,s,l,c]}class Kg extends Ci{constructor(t){super(),Ri(this,t,jg,Yg,ri,{})}}function Tc(i,t,e){const n=i.slice();n[13]=t[e];const s=n[3][n[13].id];n[14]=s;const r=n[14]&&n[14].errors.length>0;return n[15]=r,n}function Ac(i){let t,e=[],n=new Map,s,r=me(i[2]);const a=o=>o[13].id;for(let o=0;o<r.length;o+=1){let l=Tc(i,r,o),c=a(l);n.set(c,e[o]=wc(c,l))}return{c(){t=Ns("polyline");for(let o=0;o<e.length;o+=1)e[o].c();s=Uc(),B(t,"points",i[1]),B(t,"fill","none"),B(t,"stroke","#5b8dd9"),B(t,"stroke-width","2"),B(t,"vector-effect","non-scaling-stroke")},m(o,l){qt(o,t,l);for(let c=0;c<e.length;c+=1)e[c]&&e[c].m(o,l);qt(o,s,l)},p(o,l){l&2&&B(t,"points",o[1]),l&124&&(r=me(o[2]),e=Bc(e,l,a,1,o,r,n,s.parentNode,Oc,wc,s,Tc))},d(o){o&&(Xt(t),Xt(s));for(let l=0;l<e.length;l+=1)e[l].d(o)}}}function wc(i,t){let e,n,s,r,a,o=t[13].name.replace("避险车道","")+"",l,c=ye(t[13].stakeM)+"",u,d,p,m,_;function v(){return t[12](t[13])}return{key:i,first:null,c(){e=Ns("g"),n=Ns("polygon"),a=Ns("text"),l=st(o),u=st(c),B(n,"points","0,-14 7,0 -7,0"),B(n,"fill",s=t[15]?"#ef4444":Ee[t[13].status].color),B(n,"stroke",r=t[4]===t[13].id?"#fff":"none"),B(n,"stroke-width","2"),B(a,"y","-20"),B(a,"text-anchor","middle"),B(a,"font-size","13"),B(a,"fill",d=t[15]?"#ff9a9a":"#cfe3ff"),B(e,"transform",p="translate("+t[5](t[13].stakeM)+","+t[6](t[13].stakeM)+")"),Os(e,"cursor","pointer"),this.first=e},m(h,f){qt(h,e,f),A(e,n),A(e,a),A(a,l),A(a,u),m||(_=Me(e,"click",v),m=!0)},p(h,f){t=h,f&12&&s!==(s=t[15]?"#ef4444":Ee[t[13].status].color)&&B(n,"fill",s),f&20&&r!==(r=t[4]===t[13].id?"#fff":"none")&&B(n,"stroke",r),f&4&&o!==(o=t[13].name.replace("避险车道","")+"")&&Ct(l,o),f&4&&c!==(c=ye(t[13].stakeM)+"")&&Ct(u,c),f&12&&d!==(d=t[15]?"#ff9a9a":"#cfe3ff")&&B(a,"fill",d),f&4&&p!==(p="translate("+t[5](t[13].stakeM)+","+t[6](t[13].stakeM)+")")&&B(e,"transform",p)},d(h){h&&Xt(e),m=!1,_()}}}function Zg(i){let t,e=i[0].length&&Ac(i);return{c(){t=Ns("svg"),e&&e.c(),B(t,"viewBox","0 0 "+go+" "+ts),B(t,"preserveAspectRatio","none"),B(t,"class","prof svelte-1osmi1h")},m(n,s){qt(n,t,s),e&&e.m(t,null)},p(n,[s]){n[0].length?e?e.p(n,s):(e=Ac(n),e.c(),e.m(t,null)):e&&(e.d(1),e=null)},i:_e,o:_e,d(n){n&&Xt(t),e&&e.d()}}}const go=1e3,ts=110,jn=8;function Jg(i,t,e){let n,s,r,a,o,l,c,u,d,p;Le(i,Hs,h=>e(11,c=h)),Le(i,be,h=>e(2,u=h)),Le(i,si,h=>e(3,d=h)),Le(i,gn,h=>e(4,p=h));function m(h){return jn+(h-s)/(r-s||1)*(go-2*jn)}function _(h){if(!n.length)return ts/2;let f=0,T=n.length-1;for(;f<T;){const y=f+T>>1;n[y].stakeM<h?f=y+1:T=y}const M=n[f];return ts-jn-(M.y-a)/(o-a||1)*(ts-2*jn)}const v=h=>gn.set(h.id);return i.$$.update=()=>{i.$$.dirty&2048&&e(0,n=c),i.$$.dirty&1&&e(9,s=n.length?n[0].stakeM:0),i.$$.dirty&1&&e(10,r=n.length?n[n.length-1].stakeM:1),i.$$.dirty&1&&e(7,a=n.length?Math.min(...n.map(h=>h.y)):0),i.$$.dirty&1&&e(8,o=n.length?Math.max(...n.map(h=>h.y)):1),i.$$.dirty&1921&&e(1,l=n.length?n.filter((h,f)=>f%2===0).map(h=>`${jn+(h.stakeM-s)/(r-s)*(go-2*jn)},${ts-jn-(h.y-a)/(o-a||1)*(ts-2*jn)}`).join(" "):"")},[n,l,u,d,p,m,_,a,o,s,r,c,v]}class Qg extends Ci{constructor(t){super(),Ri(this,t,Jg,Zg,ri,{})}}function Rc(i,t,e){const n=i.slice();return n[8]=t[e],n}function Cc(i){let t,e,n,s;return{c(){t=V("span"),e=st("⚠ "),n=st(i[1]),s=st(" 处标红待处理"),B(t,"class","warn svelte-1i5568l")},m(r,a){qt(r,t,a),A(t,e),A(t,n),A(t,s)},p(r,a){a&2&&Ct(n,r[1])},d(r){r&&Xt(t)}}}function Pc(i){let t,e,n;function s(){return i[7](i[8])}return{c(){t=V("button"),t.textContent=`${i[8].t}`,B(t,"class","svelte-1i5568l"),Fe(t,"on",i[0]===i[8].k)},m(r,a){qt(r,t,a),e||(n=Me(t,"click",s),e=!0)},p(r,a){i=r,a&9&&Fe(t,"on",i[0]===i[8].k)},d(r){r&&Xt(t),e=!1,n()}}}function t0(i){let t,e;return t=new Kg({}),{c(){cs(t.$$.fragment)},m(n,s){yi(t,n,s),e=!0},i(n){e||(En(t.$$.fragment,n),e=!0)},o(n){Jn(t.$$.fragment,n),e=!1},d(n){bi(t,n)}}}function e0(i){let t,e;return t=new qg({}),{c(){cs(t.$$.fragment)},m(n,s){yi(t,n,s),e=!0},i(n){e||(En(t.$$.fragment,n),e=!0)},o(n){Jn(t.$$.fragment,n),e=!1},d(n){bi(t,n)}}}function n0(i){let t,e;return t=new zg({}),{c(){cs(t.$$.fragment)},m(n,s){yi(t,n,s),e=!0},i(n){e||(En(t.$$.fragment,n),e=!0)},o(n){Jn(t.$$.fragment,n),e=!1},d(n){bi(t,n)}}}function i0(i){let t,e;return t=new Fg({}),{c(){cs(t.$$.fragment)},m(n,s){yi(t,n,s),e=!0},i(n){e||(En(t.$$.fragment,n),e=!0)},o(n){Jn(t.$$.fragment,n),e=!1},d(n){bi(t,n)}}}function Lc(i){let t;return{c(){t=V("div"),t.textContent="布设模式: 在主线上点击放置避险车道引道口",B(t,"class","tip svelte-1i5568l")},m(e,n){qt(e,t,n)},d(e){e&&Xt(t)}}}function s0(i){let t,e,n,s,r,a,o,l,c,u,d,p,m,_,v,h,f,T,M,y,P,R,E,C,j,g,S,F=i[1]&&Cc(i),z=me(i[3]),W=[];for(let $=0;$<z.length;$+=1)W[$]=Pc(Rc(i,z,$));const J=[i0,n0,e0,t0],k=[];function U($,Q){return $[0]==="profile"?0:$[0]==="ramps"?1:$[0]==="stats"?2:3}_=U(i),v=k[_]=J[_](i),M=new Ug({});let D=i[2]&&Lc();return C=new Qg({}),{c(){t=V("div"),e=V("header"),n=V("h1"),n.textContent="山区高速公路长下坡避险车道选址与制动床验算系统",s=ct(),r=V("div"),F&&F.c(),a=ct(),o=V("button"),o.textContent="重置",l=ct(),c=V("div"),u=V("aside"),d=V("nav");for(let $=0;$<W.length;$+=1)W[$].c();p=ct(),m=V("div"),v.c(),h=ct(),f=V("section"),T=V("div"),cs(M.$$.fragment),y=ct(),D&&D.c(),P=ct(),R=V("div"),R.innerHTML='<span><i style="background:#f59e0b" class="svelte-1i5568l"></i>拟定</span> <span><i style="background:#3b82f6" class="svelte-1i5568l"></i>联审中</span> <span><i style="background:#22c55e" class="svelte-1i5568l"></i>已批复</span> <span><i style="background:#9ca3af" class="svelte-1i5568l"></i>已建成</span> <span><i style="background:#ef4444" class="svelte-1i5568l"></i>验算不合格</span>',E=ct(),cs(C.$$.fragment),B(n,"class","svelte-1i5568l"),B(o,"class","reset svelte-1i5568l"),B(r,"class","meta svelte-1i5568l"),B(e,"class","svelte-1i5568l"),B(d,"class","svelte-1i5568l"),B(m,"class","panel svelte-1i5568l"),B(u,"class","svelte-1i5568l"),B(R,"class","legend svelte-1i5568l"),B(T,"class","canvas-wrap svelte-1i5568l"),B(f,"class","view svelte-1i5568l"),B(c,"class","main svelte-1i5568l"),B(t,"class","app svelte-1i5568l")},m($,Q){qt($,t,Q),A(t,e),A(e,n),A(e,s),A(e,r),F&&F.m(r,null),A(r,a),A(r,o),A(t,l),A(t,c),A(c,u),A(u,d);for(let K=0;K<W.length;K+=1)W[K]&&W[K].m(d,null);A(u,p),A(u,m),k[_].m(m,null),A(c,h),A(c,f),A(f,T),yi(M,T,null),A(T,y),D&&D.m(T,null),A(T,P),A(T,R),A(f,E),yi(C,f,null),j=!0,g||(S=Me(o,"click",i[6]),g=!0)},p($,[Q]){if($[1]?F?F.p($,Q):(F=Cc($),F.c(),F.m(r,a)):F&&(F.d(1),F=null),Q&9){z=me($[3]);let at;for(at=0;at<z.length;at+=1){const ft=Rc($,z,at);W[at]?W[at].p(ft,Q):(W[at]=Pc(ft),W[at].c(),W[at].m(d,null))}for(;at<W.length;at+=1)W[at].d(1);W.length=z.length}let K=_;_=U($),_!==K&&(Ih(),Jn(k[K],1,1,()=>{k[K]=null}),Nh(),v=k[_],v||(v=k[_]=J[_]($),v.c()),En(v,1),v.m(m,null)),$[2]?D||(D=Lc(),D.c(),D.m(T,P)):D&&(D.d(1),D=null)},i($){j||(En(v),En(M.$$.fragment,$),En(C.$$.fragment,$),j=!0)},o($){Jn(v),Jn(M.$$.fragment,$),Jn(C.$$.fragment,$),j=!1},d($){$&&Xt(t),F&&F.d(),dn(W,$),k[_].d(),bi(M),D&&D.d(),bi(C),g=!1,S()}}}function r0(i,t,e){let n,s,r,a;Le(i,si,d=>e(4,s=d)),Le(i,be,d=>e(5,r=d)),Le(i,ks,d=>e(2,a=d));let o="ramps";const l=[{k:"profile",t:"纵断面"},{k:"ramps",t:"避险车道"},{k:"stats",t:"统计与修订"},{k:"export",t:"导出论证表"}],c=()=>confirm("清空全部方案并恢复示例纵断面?")&&Cg(),u=d=>e(0,o=d.k);return i.$$.update=()=>{i.$$.dirty&48&&e(1,n=r.filter(d=>{var p;return(((p=s[d.id])==null?void 0:p.errors.length)||0)>0}).length)},[o,n,a,l,s,r,c,u]}class a0 extends Ci{constructor(t){super(),Ri(this,t,r0,s0,ri,{})}}new a0({target:document.getElementById("app")});
