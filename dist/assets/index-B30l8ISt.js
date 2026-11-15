(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function pc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const ge={},ss=[],Gn=()=>{},qh=()=>!1,Qo=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ta=n=>n.startsWith("onUpdate:"),Pe=Object.assign,mc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},ap=Object.prototype.hasOwnProperty,oe=(n,t)=>ap.call(n,t),Ut=Array.isArray,Ri=n=>kr(n)==="[object Map]",hs=n=>kr(n)==="[object Set]",ru=n=>kr(n)==="[object Date]",Xt=n=>typeof n=="function",Ee=n=>typeof n=="string",$n=n=>typeof n=="symbol",he=n=>n!==null&&typeof n=="object",jh=n=>(he(n)||Xt(n))&&Xt(n.then)&&Xt(n.catch),Kh=Object.prototype.toString,kr=n=>Kh.call(n),lp=n=>kr(n).slice(8,-1),Zh=n=>kr(n)==="[object Object]",gc=n=>Ee(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,mr=pc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ea=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},cp=/-\w/g,Ln=ea(n=>n.replace(cp,t=>t.slice(1).toUpperCase())),up=/\B([A-Z])/g,ms=ea(n=>n.replace(up,"-$1").toLowerCase()),Jh=ea(n=>n.charAt(0).toUpperCase()+n.slice(1)),_a=ea(n=>n?`on${Jh(n)}`:""),kn=(n,t)=>!Object.is(n,t),Ao=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},Qh=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Hr=n=>{const t=parseFloat(n);return isNaN(t)?n:t},hp=n=>{const t=Ee(n)?Number(n):NaN;return isNaN(t)?n:t};let ou;const na=()=>ou||(ou=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ar(n){if(Ut(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=Ee(i)?mp(i):Ar(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(Ee(n)||he(n))return n}const fp=/;(?![^(]*\))/g,dp=/:([^]+)/,pp=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function mp(n){const t={};return n.replace(pp,e=>e.startsWith("/*")?"":e).split(fp).forEach(e=>{if(e){const i=e.split(dp);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function We(n){let t="";if(Ee(n))t=n;else if(Ut(n))for(let e=0;e<n.length;e++){const i=We(n[e]);i&&(t+=i+" ")}else if(he(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const gp="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",_p=pc(gp);function tf(n){return!!n||n===""}function vp(n,t,e){if(n.length!==t.length)return!1;let i=!0;for(let s=0;i&&s<n.length;s++)i=Ii(n[s],t[s],e);return i}function au(n,t,e){if(n.size!==t.size)return!1;const i=Array.from(t),s=new Uint8Array(i.length);for(const r of n){let o=-1;for(let a=0;a<i.length;a++)if(!s[a]&&Ii(r,i[a],e)){o=a;break}if(o<0)return!1;s[o]=1}return!0}function xp(n,t,e){let i=Ri(n),s=Ri(t);if(i||s||(i=hs(n),s=hs(t),i||s))return i&&s?au(n,t,e):!1;const r=Object.keys(n).length,o=Object.keys(t).length;if(r!==o)return!1;for(const a in n){const l=n.hasOwnProperty(a),c=t.hasOwnProperty(a);if(l&&!c||!l&&c||!Ii(n[a],t[a],e))return!1}return String(n)===String(t)}function lu(n,t,e,i){e||(e=[new Map,new Map]);const[s,r]=e;if(s.has(n)||r.has(t))return s.get(n)===t&&r.get(t)===n;s.set(n,t),r.set(t,n);const o=i(n,t,e);return s.delete(n),r.delete(t),o}function Ii(n,t,e){if(n===t)return!0;let i=ru(n),s=ru(t);return i||s?i&&s?n.getTime()===t.getTime():!1:(i=$n(n),s=$n(t),i||s?n===t:(i=Ut(n),s=Ut(t),i||s?i&&s?lu(n,t,e,vp):!1:(i=he(n),s=he(t),i||s?!i||!s?!1:lu(n,t,e,xp):String(n)===String(t))))}function Mp(n,t){return n.findIndex(e=>Ii(e,t))}const ef=n=>!!(n&&n.__v_isRef===!0),et=n=>Ee(n)?n:n==null?"":Ut(n)||he(n)&&(n.toString===Kh||!Xt(n.toString))?ef(n)?et(n.value):JSON.stringify(n,nf,2):String(n),nf=(n,t)=>ef(t)?nf(n,t.value):Ri(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[va(i,r)+" =>"]=s,e),{})}:hs(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>va(e))}:$n(t)?va(t):he(t)&&!Ut(t)&&!Zh(t)?String(t):t,va=(n,t="")=>{var e;return $n(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Oe;class Sp{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Oe&&(Oe.active?(this.parent=Oe,this.index=(Oe.scopes||(Oe.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes){const i=this.scopes.slice();for(t=0,e=i.length;t<e;t++)i[t].pause()}for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes){const s=this.scopes.slice();for(t=0,e=s.length;t<e;t++)s[t].resume()}const i=this.effects.slice();for(t=0,e=i.length;t<e;t++)i[t].resume()}}run(t){if(this._active){const e=Oe;try{return Oe=this,t()}finally{Oe=e}}}on(){++this._on===1&&(this.prevScope=Oe,Oe=this)}off(){if(this._on>0&&--this._on===0){if(Oe===this)Oe=this.prevScope;else{let t=Oe;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(e=0,i=s.length;e<i;e++)s[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function yp(){return Oe}let ve;const xa=new WeakSet;class sf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Oe&&(Oe.active?Oe.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,xa.has(this)&&(xa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||of(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,cu(this),af(this);const t=ve,e=In;ve=this,In=!0;try{return this.fn()}finally{lf(this),ve=t,In=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)xc(t);this.deps=this.depsTail=void 0,cu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?xa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ml(this)&&this.run()}get dirty(){return ml(this)}}let rf=0,gr,_r;function of(n,t=!1){if(n.flags|=8,t){n.next=_r,_r=n;return}n.next=gr,gr=n}function _c(){rf++}function vc(){if(--rf>0)return;if(_r){let t=_r;for(_r=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;gr;){let t=gr;for(gr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function af(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function lf(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),xc(i),Ep(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function ml(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(cf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function cf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===wr)||(n.globalVersion=wr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!ml(n))))return;n.flags|=2;const t=n.dep,e=ve,i=In;ve=n,In=!0;try{af(n);const s=n.fn(n._value);(t.version===0||kn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{ve=e,In=i,lf(n),n.flags&=-3}}function xc(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)xc(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Ep(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let In=!0;const uf=[];function Yn(){uf.push(In),In=!1}function qn(){const n=uf.pop();In=n===void 0?!0:n}function cu(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=ve;ve=void 0;try{t()}finally{ve=e}}}let wr=0;class bp{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Mc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ve||!In||ve===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==ve)e=this.activeLink=new bp(ve,this),ve.deps?(e.prevDep=ve.depsTail,ve.depsTail.nextDep=e,ve.depsTail=e):ve.deps=ve.depsTail=e,hf(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=ve.depsTail,e.nextDep=void 0,ve.depsTail.nextDep=e,ve.depsTail=e,ve.deps===e&&(ve.deps=i)}return e}trigger(t){this.version++,wr++,this.notify(t)}notify(t){_c();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{vc()}}}function hf(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)hf(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const gl=new WeakMap,ls=Symbol(""),_l=Symbol(""),Rr=Symbol("");function Ge(n,t,e){if(In&&ve){let i=gl.get(n);i||gl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new Mc),s.map=i,s.key=e),s.track()}}function ui(n,t,e,i,s,r){const o=gl.get(n);if(!o){wr++;return}const a=l=>{l&&l.trigger()};if(_c(),t==="clear")o.forEach(a);else{const l=Ut(n),c=l&&gc(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===Rr||!$n(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(Rr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(ls)),Ri(n)&&a(o.get(_l)));break;case"delete":l||(a(o.get(ls)),Ri(n)&&a(o.get(_l)));break;case"set":Ri(n)&&a(o.get(ls));break}}vc()}function vs(n){const t=re(n);return t===n||(Ge(t,"iterate",Rr),Mn(n))?t:jn(n)?Ci(n)?t.map(e=>Ui(Sn(e))):t.map(Ui):t.map(Sn)}function ia(n){return Ge(n=re(n),"iterate",Rr),n}function Fn(n,t){return jn(n)?Ui(Ci(n)?Sn(t):t):Sn(t)}const Tp={__proto__:null,[Symbol.iterator](){return Ma(this,Symbol.iterator,n=>Fn(this,n))},concat(...n){return vs(this).concat(...n.map(t=>Ut(t)?vs(t):t))},entries(){return Ma(this,"entries",n=>(n[1]=Fn(this,n[1]),n))},every(n,t){return Qn(this,"every",n,t,void 0,arguments)},filter(n,t){return Qn(this,"filter",n,t,e=>e.map(i=>Fn(this,i)),arguments)},find(n,t){return Qn(this,"find",n,t,e=>Fn(this,e),arguments)},findIndex(n,t){return Qn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Qn(this,"findLast",n,t,e=>Fn(this,e),arguments)},findLastIndex(n,t){return Qn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Qn(this,"forEach",n,t,void 0,arguments)},includes(...n){return Sa(this,"includes",n)},indexOf(...n){return Sa(this,"indexOf",n)},join(n){return vs(this).join(n)},lastIndexOf(...n){return Sa(this,"lastIndexOf",n)},map(n,t){return Qn(this,"map",n,t,void 0,arguments)},pop(){return sr(this,"pop")},push(...n){return sr(this,"push",n)},reduce(n,...t){return hu(this,"reduce",n,t)},reduceRight(n,...t){return hu(this,"reduceRight",n,t)},shift(){return sr(this,"shift")},some(n,t){return Qn(this,"some",n,t,void 0,arguments)},splice(...n){return sr(this,"splice",n)},toReversed(){return vs(this).toReversed()},toSorted(n){return vs(this).toSorted(n)},toSpliced(...n){return vs(this).toSpliced(...n)},unshift(...n){return sr(this,"unshift",n)},values(){return Ma(this,"values",n=>Fn(this,n))}};function Ma(n,t,e){const i=ia(n),s=i[t],r=s.call(i);if(i!==n&&!Mn(n)){if(r[Symbol.toStringTag]==="Array Iterator"){const o=Object.create(Object.getPrototypeOf(r));return o.next=()=>uu(r.next(),e),s!==ff[t]&&Object.defineProperties(o,{return:{get(){const a=r.return;return typeof a=="function"?a.bind(r):a}},throw:{get(){const a=r.throw;return typeof a=="function"?a.bind(r):a}}}),o}r._next=r.next,r.next=()=>uu(r._next(),e)}return r}function uu(n,t){return n.done||(n.value=t(n.value)),n}const ff=Array.prototype;function Qn(n,t,e,i,s,r){const o=ia(n),a=o!==n&&!Mn(n),l=o[t];if(l!==ff[t]){const h=l.apply(n,r);return a?Sn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,Fn(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function hu(n,t,e,i){const s=ia(n),r=s!==n&&!Mn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=Fn(n,c)),e.call(this,c,Fn(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?Fn(n,l):l}function Sa(n,t,e){const i=re(n);Ge(i,"iterate",Rr);const s=i[t](...e);return(s===-1||s===!1)&&Ec(e[0])?(e[0]=re(e[0]),i[t](...e)):s}function sr(n,t,e=[]){Yn(),_c();const i=re(n)[t].apply(n,e);return vc(),qn(),i}const Ap=pc("__proto__,__v_isRef,__isVue"),df=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter($n));function wp(n){$n(n)||(n=String(n));const t=re(this);return Ge(t,"has",n),t.hasOwnProperty(n)}class pf{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?Op:vf:r?_f:gf).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Ut(t);if(!s){let l;if(o&&(l=Tp[e]))return l;if(e==="hasOwnProperty")return wp}const a=Reflect.get(t,e,$e(t)?t:i);if(($n(e)?df.has(e):Ap(e))||(s||Ge(t,"get",e),r))return a;if($e(a)){const l=o&&gc(e)?a:a.value;return s&&he(l)?xl(l):l}return he(a)?s?xl(a):Vr(a):a}}class mf extends pf{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Ut(t)&&gc(e);if(!this._isShallow){const c=jn(r);if(!Mn(i)&&!jn(i)&&(r=re(r),i=re(i)),!o&&$e(r)&&!$e(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:oe(t,e),l=Reflect.set(t,e,i,$e(t)?t:s);return t===re(s)&&l&&(a?kn(i,r)&&ui(t,"set",e,i):ui(t,"add",e,i)),l}deleteProperty(t,e){const i=oe(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&ui(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!$n(e)||!df.has(e))&&Ge(t,"has",e),i}ownKeys(t){return Ge(t,"iterate",Ut(t)?"length":ls),Reflect.ownKeys(t)}}class Rp extends pf{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Cp=new mf,Pp=new Rp,Dp=new mf(!0);const vl=n=>n,Zr=n=>Reflect.getPrototypeOf(n);function Lp(n,t,e){return function(...i){const s=this.__v_raw,r=re(s),o=Ri(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?vl:t?Ui:Sn;return!t&&Ge(r,"iterate",l?_l:ls),Pe(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function Jr(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function Ip(n,t){const e={get(s){const r=this.__v_raw,o=re(r),a=re(s);n||(kn(s,a)&&Ge(o,"get",s),Ge(o,"get",a));const{has:l}=Zr(o),c=t?vl:n?Ui:Sn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Ge(re(s),"iterate",ls),s.size},has(s){const r=this.__v_raw,o=re(r),a=re(s);return n||(kn(s,a)&&Ge(o,"has",s),Ge(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=re(a),c=t?vl:n?Ui:Sn;return!n&&Ge(l,"iterate",ls),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Pe(e,n?{add:Jr("add"),set:Jr("set"),delete:Jr("delete"),clear:Jr("clear")}:{add(s){const r=re(this),o=Zr(r),a=re(s),l=!t&&!Mn(s)&&!jn(s)?a:s;return o.has.call(r,l)||kn(s,l)&&o.has.call(r,s)||kn(a,l)&&o.has.call(r,a)||(r.add(l),ui(r,"add",l,l)),this},set(s,r){!t&&!Mn(r)&&!jn(r)&&(r=re(r));const o=re(this),{has:a,get:l}=Zr(o);let c=a.call(o,s);c||(s=re(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?kn(r,u)&&ui(o,"set",s,r):ui(o,"add",s,r),this},delete(s){const r=re(this),{has:o,get:a}=Zr(r);let l=o.call(r,s);l||(s=re(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&ui(r,"delete",s,void 0),c},clear(){const s=re(this),r=s.size!==0,o=s.clear();return r&&ui(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Lp(s,n,t)}),e}function Sc(n,t){const e=Ip(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_isShallow"?t:s==="__v_raw"?i:Reflect.get(oe(e,s)&&s in i?e:i,s,r)}const Up={get:Sc(!1,!1)},Np={get:Sc(!1,!0)},Fp={get:Sc(!0,!1)};const gf=new WeakMap,_f=new WeakMap,vf=new WeakMap,Op=new WeakMap;function Bp(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Vr(n){return jn(n)?n:yc(n,!1,Cp,Up,gf)}function zp(n){return yc(n,!1,Dp,Np,_f)}function xl(n){return yc(n,!0,Pp,Fp,vf)}function yc(n,t,e,i,s){if(!he(n)||n.__v_raw&&!(t&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const o=Bp(lp(n));if(o===0)return n;const a=new Proxy(n,o===2?i:e);return s.set(n,a),a}function Ci(n){return jn(n)?Ci(n.__v_raw):!!(n&&n.__v_isReactive)}function jn(n){return!!(n&&n.__v_isReadonly)}function Mn(n){return!!(n&&n.__v_isShallow)}function Ec(n){return n?!!n.__v_raw:!1}function re(n){const t=n&&n.__v_raw;return t?re(t):n}function kp(n){return!oe(n,"__v_skip")&&Object.isExtensible(n)&&Qh(n,"__v_skip",!0),n}const Sn=n=>he(n)?Vr(n):n,Ui=n=>he(n)?xl(n):n;function $e(n){return n?n.__v_isRef===!0:!1}function Ne(n){return Hp(n,!1)}function Hp(n,t){return $e(n)?n:new Vp(n,t)}class Vp{constructor(t,e){this.dep=new Mc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:re(t),this._value=e?t:Sn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||Mn(t)||jn(t);t=i?t:re(t),kn(t,e)&&(this._rawValue=t,this._value=i?t:Sn(t),this.dep.trigger())}}function ue(n){return $e(n)?n.value:n}const Gp={get:(n,t,e)=>t==="__v_raw"?n:ue(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return $e(s)&&!$e(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function xf(n){return Ci(n)?n:new Proxy(n,Gp)}class Wp{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Mc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=wr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ve!==this)return of(this,!0),!0}get value(){const t=this.dep.track();return cf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Xp(n,t,e=!1){let i,s;return Xt(n)?i=n:(i=n.get,s=n.set),new Wp(i,s,e)}const Qr={},Oo=new WeakMap;let Zi;function $p(n,t=!1,e=Zi){if(e){let i=Oo.get(e);i||Oo.set(e,i=[]),i.push(n)}}function Yp(n,t,e=ge){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=x=>s?x:Mn(x)||s===!1||s===0?hi(x,1):hi(x);let u,h,f,d,_=!1,v=!1;if($e(n)?(h=()=>n.value,_=Mn(n)):Ci(n)?(h=()=>c(n),_=!0):Ut(n)?(v=!0,_=n.some(x=>Ci(x)||Mn(x)),h=()=>n.map(x=>{if($e(x))return x.value;if(Ci(x))return c(x);if(Xt(x))return l?l(x,2):x()})):Xt(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){Yn();try{f()}finally{qn()}}const x=Zi;Zi=u;try{return l?l(n,3,[d]):n(d)}finally{Zi=x}}:h=Gn,t&&s){const x=h,D=s===!0?1/0:s;h=()=>hi(x(),D)}const m=yp(),p=()=>{u.stop(),m&&m.active&&mc(m.effects,u)};if(r&&t){const x=t;t=(...D)=>{try{return x(...D)}finally{p()}}}let C=v?new Array(n.length).fill(Qr):Qr;const A=x=>{if(!(!(u.flags&1)||!u.dirty&&!x))if(t){const D=u.run();if(x||s||_||(v?D.some((w,R)=>kn(w,C[R])):kn(D,C))){const w=Zi;Yn();try{f&&f(),Zi=u;const R=[D,C===Qr?void 0:v&&C[0]===Qr?[]:C,d];C=D,l?l(t,3,R):t(...R)}finally{Zi=w,qn()}}}else u.run()};return a&&a(A),u=new sf(h),u.scheduler=o?()=>o(A,!1):A,d=x=>$p(x,!1,u),f=u.onStop=()=>{const x=Oo.get(u);if(x){if(l)l(x,4);else for(const D of x)D();Oo.delete(u)}},t?i?A(!0):C=u.run():o?o(A.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function hi(n,t=1/0,e){if(t<=0||!he(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,$e(n))hi(n.value,t,e);else if(Ut(n))for(let i=0;i<n.length;i++)hi(n[i],t,e);else if(hs(n)||Ri(n))n.forEach(i=>{hi(i,t,e)});else if(Zh(n)){for(const i in n)hi(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&hi(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Gr(n,t,e,i){try{return i?n(...i):n()}catch(s){sa(s,t,e)}}function yn(n,t,e,i){if(Xt(n)){const s=Gr(n,t,e,i);return s&&jh(s)&&s.catch(r=>{sa(r,t,e,void 0,!0)}),s}if(Ut(n)){const s=[];for(let r=0;r<n.length;r++)s.push(yn(n[r],t,e,i));return s}}function sa(n,t,e,i=!0,s=!1){const r=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||ge;if(t){let l=t.parent;const c=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${e}`;for(;l;){const h=l.ec;if(h&&!l.isUnmounted&&(!s||l.scope.active)){for(let f=0;f<h.length;f++)if(h[f](n,c,u)===!1)return}l=l.parent}if(o){Yn(),Gr(o,null,10,[n,c,u]),qn();return}}qp(n,e,r,i,a)}function qp(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const tn=[];let Rn=-1;const On=[];let Ti=null,Is=0;const Mf=Promise.resolve();let Bo=null;function Sf(n){const t=Bo||Mf;return n?t.then(this?n.bind(this):n):t}function jp(n){let t=Rn+1,e=tn.length;for(;t<e;){const i=t+e>>>1,s=tn[i],r=Cr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function ra(n){if(!(n.flags&1)){const t=Cr(n),e=tn[tn.length-1];!e||!(n.flags&2)&&t>=Cr(e)?tn.push(n):tn.splice(jp(t),0,n),n.flags|=1,yf()}}function yf(){Bo||(Bo=Mf.then(Tf))}function Kp(n){if(!Ut(n))Ti&&n.id===-1?Ti.splice(Is+1,0,n):n.flags&1||(On.push(n),n.flags|=1);else for(let t=0;t<n.length;t++)On.push(n[t]);yf()}function Ef(n,t,e,i=Rn+1){for(;i<tn.length;i++){const s=tn[i];if(s&&s.flags&2){if(n&&s.id!==n.uid||t!==void 0&&!(s.id>=t))continue;tn.splice(i,1),i=n?i-1:Rn,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function bf(n,t,e=0){if(On.length){let i=On,s=0;if(t){i=[];for(let o=0;o<On.length;o++){const a=On[o];(a.i!==void 0?!a.i||a.i.uid<e:t.has(a))?On[s++]=a:i.push(a)}}const r=[...new Set(i)].sort((o,a)=>Cr(o)-Cr(a));if(On.length=s,Ti){for(let o=0;o<r.length;o++)Ti.push(r[o]);return}for(Ti=r,Is=0;Is<Ti.length;Is++){const o=Ti[Is];o.flags&4&&(o.flags&=-2),o.flags&8||o(),o.flags&=-2}Ti=null,Is=0}}let ya=!1;function Zp(n,t){if(ya){n();return}const e=t===void 0?void 0:new Set(On);n(),ya=!0;try{Ef(void 0,t),bf(void 0,e,t)}finally{ya=!1}}const Cr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Tf(n){try{for(Rn=0;Rn<tn.length;Rn++){const t=tn[Rn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Gr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Rn<tn.length;Rn++){const t=tn[Rn];t&&(t.flags&=-2)}Rn=-1,tn.length=0,bf(),Bo=null,(tn.length||On.length)&&Tf()}}let vn=null,Af=null;function zo(n){const t=vn;return vn=n,Af=n&&n.type.__scopeId||null,t}function wf(n,t=vn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&Go(-1);const r=zo(t),o=us.length;let a;try{a=n(...s)}finally{for(let l=us.length;l>o;l--)Qf();zo(r),i._d&&Go(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function de(n,t){if(vn===null)return n;const e=ha(vn),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=ge]=t[s];r&&(Xt(r)&&(r={mounted:r,updated:r}),r.deep&&hi(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Hi(n,t,e,i){let s=n;if(i==="beforeMount")n._mount=n;else if(i==="beforeUpdate"){const a=t&&t._mount;a&&(a._latest=n,n._mount=a)}else if(i==="mounted"){const a=n._latest;n._mount=n._latest=void 0,a&&(s=a,a._mount=void 0)}const r=s.dirs,o=t&&t.dirs;for(let a=0;a<r.length;a++){let l=r[a];o?l.oldValue=o[a].value:i==="mounted"&&l.oldValue!==void 0&&(l=Pe({},l,{oldValue:void 0}));let c=l.dir[i];c&&(Yn(),yn(c,e,8,[n.el,l,s,t]),qn())}}function Jp(n,t){if(en){let e=en.provides;const i=en.parent&&en.parent.provides;i===e&&(e=en.provides=Object.create(i)),e[n]=t}}function wo(n,t,e=!1){const i=id();if(i||zs){let s=zs?zs._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Xt(t)?t.call(i&&i.proxy):t}}const Qp=Symbol.for("v-scx"),tm=()=>wo(Qp);function Wn(n,t,e){return Rf(n,t,e)}function Rf(n,t,e=ge){const{immediate:i,deep:s,flush:r,once:o}=e,a=Pe({},e),l=t&&i||!t&&r!=="post";let c;if(Nr){if(r==="sync"){const d=tm();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=Gn,d.resume=Gn,d.pause=Gn,d}}const u=en;a.call=(d,_,v)=>yn(d,u,_,v);let h=!1;r==="post"?a.scheduler=d=>{d.i=u,Je(d,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(d,_)=>{_?d():ra(d)}),a.augmentJob=d=>{t&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=Yp(n,t,a);return Nr&&(c?c.push(f):l&&f()),f}function em(n,t,e){const i=this.proxy,s=Ee(n)?n.includes(".")?Cf(i,n):()=>i[n]:n.bind(i,i);let r;Xt(t)?r=t:(r=t.handler,e=t);const o=Wr(this),a=Rf(s,r.bind(i),e);return o(),a}function Cf(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const nm=Symbol("_vte"),oa=n=>n.__isTeleport,mn=Symbol("_leaveCb"),rr=Symbol("_enterCb");function im(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return la(()=>{n.isMounted=!0}),bc(()=>{n.isUnmounting=!0}),n}const dn=[Function,Array],Pf={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:dn,onEnter:dn,onAfterEnter:dn,onEnterCancelled:dn,onBeforeLeave:dn,onLeave:dn,onAfterLeave:dn,onLeaveCancelled:dn,onBeforeAppear:dn,onAppear:dn,onAfterAppear:dn,onAppearCancelled:dn},sm={name:"BaseTransition",props:Pf,setup(n,{slots:t}){const e=id(),i=im();return()=>{const s=t.default&&If(t.default(),!0),r=s&&s.length?Df(s):e.subTree?ne():void 0;if(!r)return;const o=re(n),{mode:a}=o;if(i.isLeaving)return Ea(r);const l=ko(r);if(!l)return Ea(r);const c=Ml(l,o,i,e);l.type!==Xe&&cs(l,c);let u=e.subTree&&ko(e.subTree);if(u&&u.type!==Xe&&!ts(u,l)&&Pr(e.subTree)){let h=Ml(u,o,i,e);if(cs(u,h),a==="out-in"&&l.type!==Xe)return i.isLeaving=!0,h.afterLeave=()=>{if(i.isLeaving=!1,!(e.job.flags&8))if(e.effect.flags&2){const f=()=>{e.job.flags&8||e.update()};f.i=e,ra(f)}else e.update();delete h.afterLeave,u=void 0},Ea(r);a==="in-out"&&l.type!==Xe?h.delayLeave=(f,d,_)=>{const v=Lf(i,u);v[String(u.key)]=u,f[mn]=()=>{d(),f[mn]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{_(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return r}}};function Df(n){let t=n[0];if(n.length>1){for(const e of n)if(e.type!==Xe){t=e;break}}return t}const rm=sm;function Lf(n,t){const{leavingVNodes:e}=n;let i=e.get(t.type);return i||(i=Object.create(null),e.set(t.type,i)),i}function Ml(n,t,e,i){const{appear:s,mode:r,persisted:o=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:h,onLeave:f,onAfterLeave:d,onLeaveCancelled:_,onBeforeAppear:v,onAppear:m,onAfterAppear:p,onAppearCancelled:C}=t,A=String(n.key),x=Lf(e,n),D=(I,b)=>{I&&yn(I,i,9,b)},w=(I,b)=>{const M=b[1];D(I,b),Ut(I)?I.every(U=>U.length<=1)&&M():I.length<=1&&M()},R={mode:r,persisted:o,beforeEnter(I){let b=a;if(!e.isMounted)if(s)b=v||a;else return;I[mn]&&I[mn](!0);const M=x[A];if(M&&ts(n,M)){let U=M.el[mn];if(!U){const O=Pr(M);U=O&&O.el[mn]}U&&U()}D(b,[I])},enter(I){if(x[A]===n)return;let b=l,M=c,U=u;if(!e.isMounted)if(s)b=m||l,M=p||c,U=C||u;else return;let O=!1;I[rr]=Q=>{O||(O=!0,Q?D(U,[I]):D(M,[I]),R.delayedLeave&&R.delayedLeave(),I[rr]=void 0)};const H=I[rr].bind(null,!1);b?w(b,[I,H]):H()},leave(I,b){const M=String(n.key);if(I[rr]&&I[rr](!0),e.isUnmounting)return b();D(h,[I]);let U=!1;I[mn]=H=>{U||(U=!0,b(),H?D(_,[I]):D(d,[I]),I[mn]=void 0,x[M]===n&&delete x[M])};const O=I[mn].bind(null,!1);x[M]=n,f?w(f,[I,O]):O()},clone(I){const b=Ml(I,t,e,i);return b.afterLeave=()=>{R.afterLeave&&R.afterLeave()},b.delayLeave=(M,U,O)=>{R.delayLeave?R.delayLeave(M,U,O):O()},b.delayedLeave=()=>{R.delayedLeave&&R.delayedLeave()},b}};return R}function Ea(n){if(aa(n))return n=Ni(n),n.children=null,n}function ko(n){if(!aa(n))return oa(n.type)&&n.children?Df(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:t,children:e}=n;if(e){if(t&16)return e[0];if(t&32&&Xt(e.default))return e.default()}}function cs(n,t){if(n.shapeFlag&6&&n.component){n.transition=t;const e=n.component.subTree;cs(oa(e.type)&&ko(e)||e,t)}else if(n.shapeFlag&128){const e=n.suspense;if(e){const i=e.isHydrating?e.pendingBranch:e.activeBranch;i&&cs(i,t.clone(i))}else n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)}else if(n.transition=t,n.type===Qt&&Ut(n.children)){const e=kf(n.children,!1);e&&cs(e,t)}}function If(n,t=!1,e){let i=[],s=0;for(let r=0;r<n.length;r++){let o=n[r];const a=e==null?o.key:String(e)+String(o.key!=null?o.key:r);o.type===Qt?(o.patchFlag&128&&s++,i=i.concat(If(o.children,t,a))):(t||o.type!==Xe)&&i.push(a!=null?Ni(o,{key:a}):o)}if(s>1)for(let r=0;r<i.length;r++)i[r].patchFlag=-2;return i}function Pr(n){if(n.component)return Pr(n.component.subTree);if(n.type===Qt){const t=Ut(n.children)&&kf(n.children,!1);return t?Pr(t):void 0}if(n.type!==Xe)return n}function Uf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function fu(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const Ho=new WeakMap;function vr(n,t,e,i,s=!1){if(Ut(n)){n.forEach((v,m)=>vr(v,t&&(Ut(t)?t[m]:t),e,i,s));return}if(xr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&vr(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?ha(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===ge?a.refs={}:a.refs,h=a.setupState,f=re(h),d=h===ge?qh:v=>fu(u,v)?!1:oe(f,v),_=(v,m)=>!(m&&fu(u,m));if(c!=null&&c!==l){if(du(t),Ee(c))u[c]=null,d(c)&&(h[c]=null);else if($e(c)){const v=t;_(c,v.k)&&(c.value=null),v.k&&(u[v.k]=null)}}if(Xt(l))Gr(l,a,12,[o,u]);else{const v=Ee(l),m=$e(l);if(v||m){const p=()=>{if(n.f){const C=v?d(l)?h[l]:u[l]:_()||!n.k?l.value:u[n.k];if(s)Ut(C)&&mc(C,r);else if(Ut(C))C.includes(r)||C.push(r);else if(v)u[l]=[r],d(l)&&(h[l]=u[l]);else{const A=[r];_(l,n.k)&&(l.value=A),n.k&&(u[n.k]=A)}}else v?(u[l]=o,d(l)&&(h[l]=o)):m&&(_(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const C=()=>{p(),Ho.delete(n)};C.id=-1,Ho.set(n,C),Je(C,e)}else du(n),p()}}}function du(n){const t=Ho.get(n);t&&(t.flags|=8,Ho.delete(n))}na().requestIdleCallback;na().cancelIdleCallback;const xr=n=>!!n.type.__asyncLoader,aa=n=>n.type.__isKeepAlive;function om(n,t){Nf(n,"a",t)}function am(n,t){Nf(n,"da",t)}function Nf(n,t,e=en){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Dr(t,i,e),e){let s=e.parent;for(;s&&s.parent;)aa(s.parent.vnode)&&lm(i,t,e,s),s=s.parent}}function lm(n,t,e,i){const s=Dr(t,n,i,!0),r=Dr("um",()=>mc(i[t],s),e);r.flags=16}function Dr(n,t,e=en,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{Yn();const a=Wr(e),l=yn(t,e,n,o);return a(),qn(),l});return i?s.unshift(r):s.push(r),r}}const gi=n=>(t,e=en)=>{(!Nr||n==="sp")&&Dr(n,(...i)=>t(...i),e)},cm=gi("bm"),la=gi("m"),um=gi("bu"),hm=gi("u"),bc=gi("bum"),fm=gi("um"),dm=gi("sp"),pm=gi("rtg"),mm=gi("rtc");function gm(n,t=en){Dr("ec",n,t)}const _m=Symbol.for("v-ndc");function we(n,t,e,i){let s;const r=e,o=Ut(n);if(o||Ee(n)){const a=o&&Ci(n);let l=!1,c=!1;a&&(l=!Mn(n),c=jn(n),n=ia(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Ui(Sn(n[u])):Sn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number")if(!Number.isInteger(n)||n<0)s=[];else{s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(he(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Sl=n=>n?sd(n)?ha(n):Sl(n.parent):null,Mr=Pe(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Sl(n.parent),$root:n=>Sl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Of(n),$forceUpdate:n=>n.f||(n.f=()=>{ra(n.update)}),$nextTick:n=>n.n||(n.n=Sf.bind(n.proxy)),$watch:n=>em.bind(n)}),ba=(n,t)=>n!==ge&&!n.__isScriptSetup&&oe(n,t),vm={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(ba(i,t))return o[t]=1,i[t];if(s!==ge&&oe(s,t))return o[t]=2,s[t];if(oe(r,t))return o[t]=3,r[t];if(e!==ge&&oe(e,t))return o[t]=4,e[t];yl&&(o[t]=0)}}const c=Mr[t];let u,h;if(c)return t==="$attrs"&&Ge(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==ge&&oe(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,oe(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return ba(s,t)?(s[t]=e,!0):i!==ge&&oe(i,t)?(i[t]=e,!0):oe(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==ge&&a[0]!=="$"&&oe(n,a)||ba(t,a)||oe(r,a)||oe(i,a)||oe(Mr,a)||oe(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:oe(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function pu(n){return Ut(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let yl=!0;function xm(n){const t=Of(n),e=n.proxy,i=n.ctx;yl=!1,t.beforeCreate&&mu(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:_,activated:v,deactivated:m,beforeDestroy:p,beforeUnmount:C,destroyed:A,unmounted:x,render:D,renderTracked:w,renderTriggered:R,errorCaptured:I,serverPrefetch:b,expose:M,inheritAttrs:U,components:O,directives:H,filters:Q}=t;if(c&&Mm(c,i,null),o)for(const it in o){const W=o[it];Xt(W)&&(i[it]=W.bind(e))}if(s){const it=s.call(e,e);he(it)&&(n.data=Vr(it))}if(yl=!0,r)for(const it in r){const W=r[it],_t=Xt(W)?W.bind(e,e):Xt(W.get)?W.get.bind(e,e):Gn,Tt=!Xt(W)&&Xt(W.set)?W.set.bind(e):Gn,Ct=Se({get:_t,set:Tt});Object.defineProperty(i,it,{enumerable:!0,configurable:!0,get:()=>Ct.value,set:zt=>Ct.value=zt})}if(a)for(const it in a)Ff(a[it],i,e,it);if(l){const it=Xt(l)?l.call(e):l;Reflect.ownKeys(it).forEach(W=>{Jp(W,it[W])})}u&&mu(u,n,"c");function Z(it,W){Ut(W)?W.forEach(_t=>it(_t.bind(e))):W&&it(W.bind(e))}if(Z(cm,h),Z(la,f),Z(um,d),Z(hm,_),Z(om,v),Z(am,m),Z(gm,I),Z(mm,w),Z(pm,R),Z(bc,C),Z(fm,x),Z(dm,b),Ut(M))if(M.length){const it=n.exposed||(n.exposed={});M.forEach(W=>{Object.defineProperty(it,W,{get:()=>e[W],set:_t=>e[W]=_t,enumerable:!0})})}else n.exposed||(n.exposed={});D&&n.render===Gn&&(n.render=D),U!=null&&(n.inheritAttrs=U),O&&(n.components=O),H&&(n.directives=H),b&&Uf(n)}function Mm(n,t,e=Gn){Ut(n)&&(n=El(n));for(const i in n){const s=n[i];let r;he(s)?"default"in s?r=wo(s.from||i,s.default,!0):r=wo(s.from||i):r=wo(s),$e(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function mu(n,t,e){yn(Ut(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Ff(n,t,e,i){let s=i.includes(".")?Cf(e,i):()=>e[i];if(Ee(n)){const r=t[n];Xt(r)&&Wn(s,r)}else if(Xt(n))Wn(s,n.bind(e));else if(he(n))if(Ut(n))n.forEach(r=>Ff(r,t,e,i));else{const r=Xt(n.handler)?n.handler.bind(e):t[n.handler];Xt(r)&&Wn(s,r,n)}}function Of(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>Vo(l,c,o,!0)),Vo(l,t,o)),he(t)&&r.set(t,l),l}function Vo(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&Vo(n,r,e,!0),s&&s.forEach(o=>Vo(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=Sm[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const Sm={data:gu,props:_u,emits:_u,methods:hr,computed:hr,beforeCreate:Ke,created:Ke,beforeMount:Ke,mounted:Ke,beforeUpdate:Ke,updated:Ke,beforeDestroy:Ke,beforeUnmount:Ke,destroyed:Ke,unmounted:Ke,activated:Ke,deactivated:Ke,errorCaptured:Ke,serverPrefetch:Ke,components:hr,directives:hr,watch:Em,provide:gu,inject:ym};function gu(n,t){return t?n?function(){return Pe(Xt(n)?n.call(this,this):n,Xt(t)?t.call(this,this):t)}:t:n}function ym(n,t){return hr(El(n),El(t))}function El(n){if(Ut(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Ke(n,t){return n?[...new Set([].concat(n,t))]:t}function hr(n,t){return n?Pe(Object.create(null),n,t):t}function _u(n,t){return n?Ut(n)&&Ut(t)?[...new Set([...n,...t])]:Pe(Object.create(null),pu(n),pu(t??{})):t}function Em(n,t){if(!n)return t;if(!t)return n;const e=Pe(Object.create(null),n);for(const i in t)e[i]=Ke(n[i],t[i]);return e}function Bf(){return{app:null,config:{isNativeTag:qh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let bm=0;function Tm(n,t){return function(i,s=null){Xt(i)||(i=Pe({},i)),s!=null&&!he(s)&&(s=null);const r=Bf(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:bm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:ig,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Xt(u.install)?(o.add(u),u.install(c,...h)):Xt(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||ze(i,s);return d.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(d,u,f),l=!0,c._container=u,u.__vue_app__=c,ha(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(yn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=zs;zs=c;try{return u()}finally{zs=h}}};return c}}let zs=null;const Am=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Ln(t)}Modifiers`]||n[`${ms(t)}Modifiers`];function wm(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||ge;let s=e;const r=t.startsWith("update:"),o=r&&Am(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>Ee(u)?u.trim():u)),o.number&&(s=s.map(Hr)));let a,l=i[a=_a(t)]||i[a=_a(Ln(t))];!l&&r&&(l=i[a=_a(ms(t))]),l&&yn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,yn(c,n,6,s)}}const Rm=new WeakMap;function zf(n,t,e=!1){const i=e?Rm:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Xt(n)){const l=c=>{const u=zf(c,t,!0);u&&(a=!0,Pe(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(he(n)&&i.set(n,null),null):(Ut(r)?r.forEach(l=>o[l]=null):Pe(o,r),he(n)&&i.set(n,o),o)}function ca(n,t){return!n||!Qo(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),oe(n,t[0].toLowerCase()+t.slice(1))||oe(n,ms(t))||oe(n,t))}function vu(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:_,inheritAttrs:v}=n,m=zo(n);let p,C;try{if(e.shapeFlag&4){const x=s||i,D=x;p=Bn(c.call(D,x,u,h,d,f,_)),C=a}else{const x=t;p=Bn(x.length>1?x(h,{attrs:a,slots:o,emit:l}):x(h,null)),C=t.props?a:Cm(a)}}catch(x){us.length=0,sa(x,n,1),p=ze(Xe)}let A=p;if(C&&v!==!1){const x=Object.keys(C),{shapeFlag:D}=A;x.length&&D&7&&(r&&x.some(ta)&&(C=Pm(C,r)),A=Ni(A,C,!1,!0))}if(e.dirs&&(A=Ni(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(e.dirs):e.dirs),e.transition){const x=oa(A.type)&&ko(A)||A;cs(x,e.transition)}return p=A,zo(m),p}function kf(n,t=!0){let e;for(let i=0;i<n.length;i++){const s=n[i];if(Ir(s)){if(s.type!==Xe||s.children==="v-if"){if(e)return;e=s}}else return}return e}const Cm=n=>{let t;for(const e in n)(e==="class"||e==="style"||Qo(e))&&((t||(t={}))[e]=n[e]);return t},Pm=(n,t)=>{const e={};for(const i in n)(!ta(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function Dm(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?xu(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(Hf(o,i,f)&&!ca(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?xu(i,o,c):!0:!!o;return!1}function xu(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(!oe(n,r)||Hf(t,n,r)&&!ca(e,r))return!0}return!1}function Hf(n,t,e){const i=n[e],s=t[e];return e==="style"&&he(i)&&he(s)?!Ii(i,s):i!==s}function Lm({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const Vf={},Gf=()=>Object.create(Vf),Wf=n=>Object.getPrototypeOf(n)===Vf;function Im(n,t,e,i=!1){const s={},r=Gf();n.propsDefaults=Object.create(null),Xf(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:zp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Um(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=re(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(ca(n.emitsOptions,f))continue;const d=t[f];if(l)if(oe(r,f))d!==r[f]&&(r[f]=d,c=!0);else{const _=Ln(f);s[_]=bl(l,a,_,d,n,!1)}else d!==r[f]&&(r[f]=d,c=!0)}}}else{Xf(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!oe(t,h)&&((u=ms(h))===h||!oe(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=bl(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!oe(t,h))&&(delete r[h],c=!0)}c&&ui(n.attrs,"set","")}function Xf(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(mr(l))continue;const c=t[l];let u;s&&oe(s,u=Ln(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:ca(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=re(e),c=a||ge;for(let u=0;u<r.length;u++){const h=r[u];e[h]=bl(s,l,h,c[h],n,!oe(c,h))}}return o}function bl(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=oe(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Xt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Wr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ms(e))&&(i=!0))}return i}const Nm=new WeakMap;function $f(n,t,e=!1){const i=e?Nm:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Xt(n)){const u=h=>{l=!0;const[f,d]=$f(h,t,!0);Pe(o,f),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return he(n)&&i.set(n,ss),ss;if(Ut(r))for(let u=0;u<r.length;u++){const h=Ln(r[u]);Mu(h)&&(o[h]=ge)}else if(r)for(const u in r){const h=Ln(u);if(Mu(h)){const f=r[u],d=o[h]=Ut(f)||Xt(f)?{type:f}:Pe({},f),_=d.type;let v=!1,m=!0;if(Ut(_))for(let p=0;p<_.length;++p){const C=_[p],A=Xt(C)&&C.name;if(A==="Boolean"){v=!0;break}else A==="String"&&(m=!1)}else v=Xt(_)&&_.name==="Boolean";d[0]=v,d[1]=m,(v||oe(d,"default"))&&a.push(h)}}const c=[o,a];return he(n)&&i.set(n,c),c}function Mu(n){return n[0]!=="$"&&!mr(n)}const Tc=n=>n==="_"||n==="_ctx"||n==="$stable",Ac=n=>Ut(n)?n.map(Bn):[Bn(n)],Fm=(n,t,e)=>{if(t._n)return t;const i=wf((...s)=>Ac(t(...s)),e);return i._c=!1,i},Yf=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Tc(s))continue;const r=n[s];if(Xt(r))t[s]=Fm(s,r,i);else if(r!=null){const o=Ac(r);t[s]=()=>o}}},qf=(n,t)=>{const e=Ac(t);n.slots.default=()=>e},jf=(n,t,e)=>{for(const i in t)(e||!Tc(i))&&(n[i]=t[i])},Om=(n,t,e)=>{const i=n.slots=Gf();if(n.vnode.shapeFlag&32){const s=t._;s?(jf(i,t,e),e&&Qh(i,"_",s,!0)):Yf(t,i)}else t&&qf(n,t)},Bm=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=ge;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:jf(s,t,e):(r=!t.$stable,Yf(t,s)),o=t}else t&&(qf(n,t),o={default:1});if(r)for(const a in s)!Tc(a)&&o[a]==null&&delete s[a]},Je=Wm;function zm(n){return km(n)}function km(n,t){const e=na();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=Gn,insertStaticContent:_}=n,v=(P,L,X,T=null,nt=null,j=null,rt=void 0,K=null,at=!!L.dynamicChildren)=>{if(P===L)return;P&&!ts(P,L)&&(T=vt(P),zt(P,nt,j,!0),P=null),L.patchFlag===-2&&(at=!1,L.dynamicChildren=null),L.dynamicChildren&&P&&P.dynamicChildren&&P.dynamicChildren.hasOnce&&(L.dynamicChildren===ss&&(L.dynamicChildren=[]),L.dynamicChildren.hasOnce=!0);const{type:V,ref:y,shapeFlag:g}=L;switch(V){case ua:m(P,L,X,T);break;case Xe:p(P,L,X,T);break;case Aa:P==null&&C(L,X,T,rt);break;case Qt:O(P,L,X,T,nt,j,rt,K,at);break;default:g&1?D(P,L,X,T,nt,j,rt,K,at):g&6?H(P,L,X,T,nt,j,rt,K,at):(g&64||g&128)&&V.process(P,L,X,T,nt,j,rt,K,at,kt)}y!=null&&nt?vr(y,P&&P.ref,j,L||P,!L):y==null&&P&&P.ref!=null&&vr(P.ref,null,j,P,!0)},m=(P,L,X,T)=>{if(P==null)i(L.el=a(L.children),X,T);else{const nt=L.el=P.el;L.children!==P.children&&c(nt,L.children)}},p=(P,L,X,T)=>{P==null?i(L.el=l(L.children||""),X,T):L.el=P.el},C=(P,L,X,T)=>{[P.el,P.anchor]=_(P.children,L,X,T,P.el,P.anchor)},A=({el:P,anchor:L},X,T)=>{let nt;for(;P&&P!==L;)nt=f(P),i(P,X,T),P=nt;i(L,X,T)},x=({el:P,anchor:L})=>{let X;for(;P&&P!==L;)X=f(P),s(P),P=X;s(L)},D=(P,L,X,T,nt,j,rt,K,at)=>{if(L.type==="svg"?rt="svg":L.type==="math"&&(rt="mathml"),P==null)w(L,X,T,nt,j,rt,K,at);else{const V=P.el&&P.el._isVueCE?P.el:null;try{V&&V._beginPatch(),b(P,L,nt,j,rt,K,at)}finally{V&&V._endPatch()}}},w=(P,L,X,T,nt,j,rt,K)=>{let at,V;const{props:y,shapeFlag:g,transition:N,dirs:G}=P;if(at=P.el=o(P.type,j,y&&y.is,y),g&8?u(at,P.children):g&16&&I(P.children,at,null,T,nt,Ta(P,j),rt,K),G&&Hi(P,null,T,"created"),R(at,P,P.scopeId,rt,T),y){for(const q in y)q!=="value"&&!mr(q)&&r(at,q,null,y[q],j,T);"value"in y&&r(at,"value",null,y.value,j),(V=y.onVnodeBeforeMount)&&Nn(V,T,P)}G&&Hi(P,null,T,"beforeMount");const J=Hm(nt,N);J?N.beforeEnter(at):N&&!N.persisted&&(at[Gm]=!0),i(at,L,X),((V=y&&y.onVnodeMounted)||J||G)&&Je(()=>{try{V&&Nn(V,T,P),J&&N.enter(at),G&&Hi(P,null,T,"mounted")}finally{}},nt)},R=(P,L,X,T,nt)=>{if(X&&d(P,X),T)for(let j=0;j<T.length;j++)d(P,T[j]);if(nt){let j=nt.subTree;if(L===j||Jf(j.type)&&(j.ssContent===L||j.ssFallback===L)){const rt=nt.vnode;R(P,rt,rt.scopeId,rt.slotScopeIds,nt.parent)}}},I=(P,L,X,T,nt,j,rt,K,at=0)=>{for(let V=at;V<P.length;V++){const y=P[V]=K?li(P[V]):Bn(P[V]);v(null,y,L,X,T,nt,j,rt,K)}},b=(P,L,X,T,nt,j,rt)=>{const K=L.el=P.el;let{patchFlag:at,dynamicChildren:V,dirs:y}=L;at|=P.patchFlag&16;const g=P.props||ge,N=L.props||ge;let G;if(X&&Vi(X,!1),(G=N.onVnodeBeforeUpdate)&&Nn(G,X,L,P),y&&Hi(L,P,X,"beforeUpdate"),X&&Vi(X,!0),V&&(!P.dynamicChildren||P.dynamicChildren.length!==V.length)&&(at=0,rt=!1,V=null),(g.innerHTML&&N.innerHTML==null||g.textContent&&N.textContent==null)&&u(K,""),V?M(P.dynamicChildren,V,K,X,T,Ta(L,nt),j):rt||W(P,L,K,null,X,T,Ta(L,nt),j,!1),at>0){if(at&16)U(K,g,N,X,nt);else if(at&2&&g.class!==N.class&&r(K,"class",null,N.class,nt),at&4&&r(K,"style",g.style,N.style,nt),at&8){const J=L.dynamicProps;for(let q=0;q<J.length;q++){const mt=J[q],ht=g[mt],gt=N[mt];(gt!==ht||mt==="value")&&r(K,mt,ht,gt,nt,X)}}at&1&&P.children!==L.children&&u(K,L.children)}else!rt&&V==null&&U(K,g,N,X,nt);((G=N.onVnodeUpdated)||y)&&Je(()=>{G&&Nn(G,X,L,P),y&&Hi(L,P,X,"updated")},T)},M=(P,L,X,T,nt,j,rt)=>{for(let K=0;K<L.length;K++){const at=P[K],V=L[K],y=at.el||Sr(at),g=y&&(at.type===Qt||!ts(at,V)||at.shapeFlag&198)?h(y):X;v(at,V,g,null,T,nt,j,rt,!0)}},U=(P,L,X,T,nt)=>{if(L!==X){if(L!==ge)for(const j in L)!mr(j)&&!(j in X)&&r(P,j,L[j],null,nt,T);for(const j in X){if(mr(j))continue;const rt=X[j],K=L[j];rt!==K&&j!=="value"&&r(P,j,K,rt,nt,T)}"value"in X&&r(P,"value",L.value,X.value,nt)}},O=(P,L,X,T,nt,j,rt,K,at)=>{const V=L.el=P?P.el:a(""),y=L.anchor=P?P.anchor:a("");let{patchFlag:g,dynamicChildren:N,slotScopeIds:G}=L;G&&(K=K?K.concat(G):G),P==null?(i(V,X,T),i(y,X,T),I(L.children||[],X,y,nt,j,rt,K,at)):g>0&&g&64&&N&&P.dynamicChildren&&P.dynamicChildren.length===N.length?(M(P.dynamicChildren,N,X,nt,j,rt,K),(L.key!=null||nt&&L===nt.subTree)&&Kf(P,L,!0)):W(P,L,X,y,nt,j,rt,K,at)},H=(P,L,X,T,nt,j,rt,K,at)=>{L.slotScopeIds=K,P==null?L.shapeFlag&512?nt.ctx.activate(L,X,T,rt,at):Q(L,X,T,nt,j,rt,at):ot(P,L,at)},Q=(P,L,X,T,nt,j,rt)=>{const K=P.component=Km(P,T,nt);if(aa(P)&&(K.ctx.renderer=kt),Zm(K,!1,rt),K.asyncDep){if(nt&&nt.registerDep(K,Z,rt,j),!P.el){const at=K.subTree=ze(Xe);p(null,at,L,X),P.placeholder=at.el}}else Z(K,P,L,X,nt,j,rt)},ot=(P,L,X)=>{const T=L.component=P.component;if(Dm(P,L,X))if(T.asyncDep&&!T.asyncResolved){L.el=P.el,L.placeholder=P.placeholder,it(T,L,X);return}else T.next=L,T.update();else L.el=P.el,L.placeholder=P.placeholder,T.vnode=L},Z=(P,L,X,T,nt,j,rt)=>{const K=()=>{if(P.isMounted){let{next:g,bu:N,u:G,parent:J,vnode:q}=P;{const ct=Zf(P);if(ct){g&&(g.el=q.el,it(P,g,rt)),ct.asyncDep.then(()=>{const St=()=>{P.job.flags&8||(nt&&nt.pendingBranch?Je(St,nt):V())};St.flags=48,Je(St,nt)});return}}let mt=g,ht;Vi(P,!1),g?(g.el=q.el,it(P,g,rt)):g=q,N&&Ao(N),(ht=g.props&&g.props.onVnodeBeforeUpdate)&&Nn(ht,J,g,q),Vi(P,!0);const gt=vu(P),Ht=P.subTree;P.subTree=gt,v(Ht,gt,h(Ht.el||Sr(Ht)),vt(Ht),P,nt,j),g.el=gt.el,mt===null&&Lm(P,gt.el),G&&Je(G,nt),(ht=g.props&&g.props.onVnodeUpdated)&&Je(()=>Nn(ht,J,g,q),nt)}else{let g;const{el:N,props:G}=L,{bm:J,m:q,parent:mt,root:ht,type:gt}=P,Ht=xr(L);Vi(P,!1),J&&Ao(J),!Ht&&(g=G&&G.onVnodeBeforeMount)&&Nn(g,mt,L),Vi(P,!0);{ht.ce&&ht.ce._hasShadowRoot()&&ht.ce._injectChildStyle(gt,P.parent?P.parent.type:void 0);const ct=P.subTree=vu(P);v(null,ct,X,T,P,nt,j),L.el=ct.el}if(q&&Je(q,nt),!Ht&&(g=G&&G.onVnodeMounted)){const ct=L;Je(()=>Nn(g,mt,ct),nt)}(L.shapeFlag&256||mt&&xr(mt.vnode)&&mt.vnode.shapeFlag&256)&&P.a&&Je(P.a,nt),P.isMounted=!0,L=X=T=null}};P.scope.on();const at=P.effect=new sf(K);P.scope.off();const V=P.update=at.run.bind(at),y=P.job=at.runIfDirty.bind(at);y.i=P,y.id=P.uid,at.scheduler=()=>ra(y),Vi(P,!0),V()},it=(P,L,X)=>{L.component=P;const T=P.vnode.props;P.vnode=L,P.next=null,Um(P,L.props,T,X),Bm(P,L.children,X),Yn(),Ef(P),qn()},W=(P,L,X,T,nt,j,rt,K,at=!1)=>{const V=P&&P.children,y=P?P.shapeFlag:0,g=L.children,{patchFlag:N,shapeFlag:G}=L;if(N>0){if(N&128){Tt(V,g,X,T,nt,j,rt,K,at);return}else if(N&256){_t(V,g,X,T,nt,j,rt,K,at);return}}G&8?(y&16&&Rt(V,nt,j),g!==V&&u(X,g)):y&16?G&16?Tt(V,g,X,T,nt,j,rt,K,at):Rt(V,nt,j,!0):(y&8&&u(X,""),G&16&&I(g,X,T,nt,j,rt,K,at))},_t=(P,L,X,T,nt,j,rt,K,at)=>{P=P||ss,L=L||ss;const V=P.length,y=L.length,g=Math.min(V,y);let N;for(N=0;N<g;N++){const G=L[N]=at?li(L[N]):Bn(L[N]);v(P[N],G,X,null,nt,j,rt,K,at)}V>y?Rt(P,nt,j,!0,!1,g):I(L,X,T,nt,j,rt,K,at,g)},Tt=(P,L,X,T,nt,j,rt,K,at)=>{let V=0;const y=L.length;let g=P.length-1,N=y-1;for(;V<=g&&V<=N;){const G=P[V],J=L[V]=at?li(L[V]):Bn(L[V]);if(ts(G,J))v(G,J,X,null,nt,j,rt,K,at);else break;V++}for(;V<=g&&V<=N;){const G=P[g],J=L[N]=at?li(L[N]):Bn(L[N]);if(ts(G,J))v(G,J,X,null,nt,j,rt,K,at);else break;g--,N--}if(V>g){if(V<=N){const G=N+1,J=G<y?L[G].el:T;for(;V<=N;)v(null,L[V]=at?li(L[V]):Bn(L[V]),X,J,nt,j,rt,K,at),V++}}else if(V>N)for(;V<=g;)zt(P[V],nt,j,!0),V++;else{const G=V,J=V,q=new Map;for(V=J;V<=N;V++){const It=L[V]=at?li(L[V]):Bn(L[V]);It.key!=null&&q.set(It.key,V)}let mt,ht=0;const gt=N-J+1;let Ht=!1,ct=0;const St=new Array(gt);for(V=0;V<gt;V++)St[V]=0;for(V=G;V<=g;V++){const It=P[V];if(ht>=gt){zt(It,nt,j,!0);continue}let Mt;if(It.key!=null)Mt=q.get(It.key);else for(mt=J;mt<=N;mt++)if(St[mt-J]===0&&ts(It,L[mt])){Mt=mt;break}Mt===void 0?zt(It,nt,j,!0):(St[Mt-J]=V+1,Mt>=ct?ct=Mt:Ht=!0,v(It,L[Mt],X,null,nt,j,rt,K,at),ht++)}const Nt=Ht?Vm(St):ss;for(mt=Nt.length-1,V=gt-1;V>=0;V--){const It=J+V,Mt=L[It],Jt=L[It+1],Wt=It+1<y?Jt.el||Sr(Jt):T;St[V]===0?v(null,Mt,X,Wt,nt,j,rt,K,at):Ht&&(mt<0||V!==Nt[mt]?Ct(Mt,X,Wt,2):mt--)}}},Ct=(P,L,X,T,nt=null)=>{const{el:j,type:rt,transition:K,children:at,shapeFlag:V}=P;if(V&6){Ct(P.component.subTree,L,X,T);return}if(V&128){P.suspense.move(L,X,T);return}if(V&64){rt.move(P,L,X,kt);return}if(rt===Qt){i(j,L,X);for(let g=0;g<at.length;g++)Ct(at[g],L,X,T);i(P.anchor,L,X);return}if(rt===Aa){A(P,L,X);return}if(T!==2&&V&1&&K)if(T===0)K.persisted&&!j[mn]?i(j,L,X):(K.beforeEnter(j),i(j,L,X),Je(()=>K.enter(j),nt));else{const{leave:g,delayLeave:N,afterLeave:G}=K,J=()=>{P.ctx.isUnmounted?s(j):i(j,L,X)},q=()=>{const mt=j._isLeaving||!!j[mn];j._isLeaving&&j[mn](!0),K.persisted&&!mt?J():g(j,()=>{J(),G&&G()})};N?N(j,J,q):q()}else i(j,L,X)},zt=(P,L,X,T=!1,nt=!1)=>{const{type:j,props:rt,ref:K,children:at,dynamicChildren:V,shapeFlag:y,patchFlag:g,dirs:N,cacheIndex:G,memo:J}=P;if((g===-2||V&&V.hasOnce)&&(nt=!1),K!=null&&(Yn(),vr(K,null,X,P,!0),qn()),G!=null&&(!P.ctx||P.ctx===L)&&(L.renderCache[G]=void 0),y&256&&L.ctx.deactivate(P))return;const q=y&1&&N,mt=!xr(P);let ht;if(mt&&(ht=rt&&rt.onVnodeBeforeUnmount)&&Nn(ht,L,P),y&6)pt(P.component,X,T);else{if(y&128){P.suspense.unmount(X,T);return}q&&Hi(P,null,L,"beforeUnmount"),y&64?P.type.remove(P,L,X,kt,T):V&&!V.hasOnce&&(j!==Qt||g>0&&g&64)?Rt(V,L,X,!1,!0):(j===Qt&&g&384||!nt&&y&16)&&Rt(at,L,X),T&&ae(P)}const gt=J!=null&&G==null;(mt&&(ht=rt&&rt.onVnodeUnmounted)||q||gt)&&Je(()=>{ht&&Nn(ht,L,P),q&&Hi(P,null,L,"unmounted"),gt&&(P.el=null)},X)},ae=P=>{const{type:L,el:X,anchor:T,transition:nt}=P,j=L===Qt;if(j&&!nt){st(X,T);return}if(L===Aa){x(P),nt&&!nt.persisted&&nt.afterLeave&&nt.afterLeave();return}const rt=j?Pr(P):P,K=()=>{j?h(X)&&st(X,T):s(X),nt&&!nt.persisted&&nt.afterLeave&&nt.afterLeave()};if(rt&&rt.shapeFlag&1&&nt&&!nt.persisted){const{leave:at,delayLeave:V}=nt,y=rt.el,g=()=>at(y,K);V?V(y,K,g):g()}else K()},st=(P,L)=>{let X;for(;P!==L;)X=f(P),s(P),P=X;s(L)},pt=(P,L,X)=>{const{bum:T,scope:nt,job:j,subTree:rt,um:K,m:at,a:V}=P;Su(at),Su(V),T&&Ao(T),nt.stop(),j?(j.flags|=8,zt(rt,P,L,X)):rt&&(rt.transition=P.vnode.transition,zt(rt,P,L,X)),K&&Je(K,L);const y=()=>{P.isUnmounted=!0};y.flags=16,Je(y,L)},Rt=(P,L,X,T=!1,nt=!1,j=0)=>{for(let rt=j;rt<P.length;rt++)zt(P[rt],L,X,T,nt)},vt=P=>{if(P.shapeFlag&6)return vt(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const L=f(P.anchor||P.el),X=L&&L[nm];return X?f(X):L},Bt=(P,L,X)=>{const T=P&&L._vnode?void 0:P&&P.component?P.component.uid:jm();Zp(()=>{P==null?L._vnode&&zt(L._vnode,null,null,!0):v(L._vnode||null,P,L,null,null,null,X),L._vnode=P},T)},kt={p:v,um:zt,m:Ct,r:ae,mt:Q,mc:I,pc:W,pbc:M,n:vt,o:n};return{render:Bt,hydrate:void 0,createApp:Tm(Bt)}}function Ta({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Vi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function Hm(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Kf(n,t,e=!1){const i=n.children,s=t.children;if(Ut(i)&&Ut(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=li(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&Kf(o,a)),a.type===ua&&(a.patchFlag===-1&&(a=s[r]=li(a)),a.el=o.el),a.type===Xe&&!a.el&&(a.el=o.el)}}function Vm(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function Zf(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Zf(t)}function Su(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function Sr(n){if(n.placeholder)return n.placeholder;const t=n.component;if(t)return Sr(t.subTree);const e=n.suspense;return e&&e.activeBranch?Sr(e.activeBranch):null}const Jf=n=>n.__isSuspense,Gm=Symbol("_deferredEnter");function Wm(n,t){t&&t.pendingBranch?Ut(n)?t.effects.push(...n):t.effects.push(n):Kp(n)}const Qt=Symbol.for("v-fgt"),ua=Symbol.for("v-txt"),Xe=Symbol.for("v-cmt"),Aa=Symbol.for("v-stc"),us=[];let un=null;function ut(n=!1){us.push(un=n?null:[])}function Qf(){us.pop(),un=us[us.length-1]||null}let Lr=1;function Go(n,t=!1){Lr+=n,n<0&&un&&t&&(un.hasOnce=!0)}function td(n){return n.dynamicChildren=Lr>0?un||ss:null,Qf(),Lr>0&&un&&un.push(n),n}function dt(n,t,e,i,s,r){return td(E(n,t,e,i,s,r,!0))}function Ji(n,t,e,i,s){return td(ze(n,t,e,i,s,!0))}function Ir(n){return n?n.__v_isVNode===!0:!1}function ts(n,t){return n.type===t.type&&n.key===t.key}const ed=({key:n})=>n??null,Ro=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?Ee(n)||$e(n)||Xt(n)?{i:vn,r:n,k:t,f:!!e}:n:null);function E(n,t=null,e=null,i=0,s=null,r=n===Qt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&ed(t),ref:t&&Ro(t),scopeId:Af,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:vn};return a?(Wo(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=Ee(e)?8:16),Lr>0&&!o&&un&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&un.push(l),l}const ze=Xm;function Xm(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===_m)&&(n=Xe),Ir(n)){const a=Ni(n,t,!0);return e&&Wo(a,e),Lr>0&&!r&&un&&(a.shapeFlag&6?un[un.indexOf(n)]=a:un.push(a)),a.patchFlag=-2,a}if(eg(n)&&(n=n.__vccOpts),t){t=$m(t);let{class:a,style:l}=t;a&&!Ee(a)&&(t.class=We(a)),he(l)&&(Ec(l)&&!Ut(l)&&(l=Pe({},l)),t.style=Ar(l))}const o=Ee(n)?1:Jf(n)?128:oa(n)?64:he(n)?4:Xt(n)?2:0;return E(n,t,e,i,s,o,r,!0)}function $m(n){return n?Ec(n)?Pe({},n):Wf(n)?Pe({},n[od]||n):n:null}function Ni(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?Ym(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&ed(c),ref:t&&t.ref?e&&r?Ut(r)?r.concat(Ro(t)):[r,Ro(t)]:Ro(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Qt?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ni(n.ssContent),ssFallback:n.ssFallback&&Ni(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce,cacheIndex:n.cacheIndex};return l&&i&&cs(u,l.clone(u)),u}function qt(n=" ",t=0){return ze(ua,null,n,t)}function ne(n="",t=!1){return t?(ut(),Ji(Xe,null,n)):ze(Xe,null,n)}function Bn(n){return n==null||typeof n=="boolean"?ze(Xe):Ut(n)?ze(Qt,null,n.slice()):Ir(n)?li(n):ze(ua,null,String(n))}function li(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ni(n)}function Wo(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Ut(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Wo(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!Wf(t)?t._ctx=vn:s===3&&vn&&(vn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else if(Xt(t)){if(i&65){Wo(n,{default:t});return}t={default:t,_ctx:vn},e=32}else t=String(t),i&64?(e=16,t=[qt(t)]):e=8;n.children=t,n.shapeFlag|=e}function Ym(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=We([t.class,i.class]));else if(s==="style")t.style=Ar([t.style,i.style]);else if(Qo(s)){const r=t[s],o=i[s];o&&r!==o&&!(Ut(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ta(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Nn(n,t,e,i=null){yn(n,t,7,[e,i])}const qm=Bf();let nd=0;function jm(){return nd}function Km(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||qm,r={uid:nd++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Sp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$f(i,s),emitsOptions:zf(i,s),emit:null,emitted:null,propsDefaults:ge,inheritAttrs:i.inheritAttrs,ctx:ge,data:ge,props:ge,attrs:ge,slots:ge,refs:ge,setupState:ge,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=wm.bind(null,r),n.ce&&n.ce(r),r}let en=null;const id=()=>en||vn;let Xo,Ur;{const n=na(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};Xo=t("__VUE_INSTANCE_SETTERS__",e=>en=e),Ur=t("__VUE_SSR_SETTERS__",e=>Nr=e)}const Wr=n=>{const t=en;return Xo(n),n.scope.on(),()=>{n.scope.off(),Xo(t)}},yu=()=>{en&&en.scope.off(),Xo(null)};function sd(n){return n.vnode.shapeFlag&4}let Nr=!1;function Zm(n,t=!1,e=!1){t&&Ur(t);const{props:i,children:s}=n.vnode,r=sd(n);Im(n,i,r,t),Om(n,s,e||t);const o=r?Jm(n,t):void 0;return t&&Ur(!1),o}function Jm(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,vm);const{setup:i}=e;if(i){Yn();const s=n.setupContext=i.length>1?tg(n):null,r=Wr(n),o=Gr(i,n,0,[n.props,s]),a=jh(o);if(qn(),r(),(a||n.sp)&&!xr(n)&&Uf(n),a){if(o.then(yu,yu),t)return o.then(l=>{Ur(!0);try{Eu(n,l,t)}finally{Ur(!1)}}).catch(l=>{sa(l,n,0,void 0,!0),n.ssrRender=(c,u)=>u("<!---->")});n.asyncDep=o}else Eu(n,o)}else rd(n)}function Eu(n,t,e){Xt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:he(t)&&(n.setupState=xf(t)),rd(n)}function rd(n,t,e){const i=n.type;n.render||(n.render=i.render||Gn);{const s=Wr(n);Yn();try{xm(n)}finally{qn(),s()}}}const od=Symbol(),Qm={get(n,t){return Ge(n,"get",""),t===od?n:n[t]}};function tg(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,Qm),slots:n.slots,emit:n.emit,expose:t}}function ha(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(xf(kp(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Mr)return Mr[e](n)},has(t,e){return e in t||e in Mr}})):n.proxy}function eg(n){return Xt(n)&&"__vccOpts"in n}const Se=(n,t)=>Xp(n,t,Nr);function ng(n,t,e){try{Go(-1);const i=arguments.length;return i===2?he(t)&&!Ut(t)?Ir(t)?ze(n,null,[t]):ze(n,t):ze(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&Ir(e)&&(e=[e]),ze(n,t,e))}finally{Go(1)}}const ig="3.5.45";/**
* @vue/runtime-dom v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Tl;const bu=typeof window<"u"&&window.trustedTypes;if(bu)try{Tl=bu.createPolicy("vue",{createHTML:n=>n})}catch{}const ad=Tl?n=>Tl.createHTML(n):n=>n,sg="http://www.w3.org/2000/svg",rg="http://www.w3.org/1998/Math/MathML",ai=typeof document<"u"?document:null,Tu=ai&&ai.createElement("template"),og={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?ai.createElementNS(sg,n):t==="mathml"?ai.createElementNS(rg,n):e?ai.createElement(n,{is:e}):ai.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ai.createTextNode(n),createComment:n=>ai.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ai.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{Tu.innerHTML=ad(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Tu.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},vi="transition",or="animation",Fr=Symbol("_vtc"),ld={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},ag=Pe({},Pf,ld),lg=n=>(n.displayName="Transition",n.props=ag,n),cg=lg((n,{slots:t})=>ng(rm,ug(n),t)),Gi=(n,t=[])=>{Ut(n)?n.forEach(e=>e(...t)):n&&n(...t)},Au=n=>n?Ut(n)?n.some(t=>t.length>1):n.length>1:!1;function ug(n){const t={};for(const O in n)O in ld||(t[O]=n[O]);if(n.css===!1)return t;const{name:e="v",type:i,duration:s,enterFromClass:r=`${e}-enter-from`,enterActiveClass:o=`${e}-enter-active`,enterToClass:a=`${e}-enter-to`,appearFromClass:l=r,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:h=`${e}-leave-from`,leaveActiveClass:f=`${e}-leave-active`,leaveToClass:d=`${e}-leave-to`}=n,_=hg(s),v=_&&_[0],m=_&&_[1],{onBeforeEnter:p,onEnter:C,onEnterCancelled:A,onLeave:x,onLeaveCancelled:D,onBeforeAppear:w=p,onAppear:R=C,onAppearCancelled:I=A}=t,b=(O,H,Q,ot)=>{O._enterCancelled=ot,Wi(O,H?u:a),Wi(O,H?c:o),Q&&Q()},M=(O,H)=>{O._isLeaving=!1,Wi(O,h),Wi(O,d),Wi(O,f),H&&H()},U=O=>(H,Q)=>{const ot=O?R:C,Z=()=>b(H,O,Q);Gi(ot,[H,Z]),wu(()=>{Wi(H,O?l:r),ti(H,O?u:a),Au(ot)||Ru(H,i,v,Z)})};return Pe(t,{onBeforeEnter(O){Gi(p,[O]),ti(O,r),ti(O,o)},onBeforeAppear(O){Gi(w,[O]),ti(O,l),ti(O,c)},onEnter:U(!1),onAppear:U(!0),onLeave(O,H){O._isLeaving=!0;const Q=()=>M(O,H);ti(O,h),O._enterCancelled?(ti(O,f),Du(O)):(Du(O),ti(O,f)),wu(()=>{O._isLeaving&&(Wi(O,h),ti(O,d),Au(x)||Ru(O,i,m,Q))}),Gi(x,[O,Q])},onEnterCancelled(O){b(O,!1,void 0,!0),Gi(A,[O])},onAppearCancelled(O){b(O,!0,void 0,!0),Gi(I,[O])},onLeaveCancelled(O){M(O),Gi(D,[O])}})}function hg(n){if(n==null)return null;if(he(n))return[wa(n.enter),wa(n.leave)];{const t=wa(n);return[t,t]}}function wa(n){return hp(n)}function ti(n,t){t.split(/\s+/).forEach(e=>e&&n.classList.add(e)),(n[Fr]||(n[Fr]=new Set)).add(t)}function Wi(n,t){t.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const e=n[Fr];e&&(e.delete(t),e.size||(n[Fr]=void 0))}function wu(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let fg=0;function Ru(n,t,e,i){const s=n._endId=++fg,r=()=>{s===n._endId&&i()};if(e!=null)return setTimeout(r,e);const{type:o,timeout:a,propCount:l}=dg(n,t);if(!o)return i();const c=o+"end";let u=0;const h=()=>{n.removeEventListener(c,f),r()},f=d=>{d.target===n&&++u>=l&&h()};setTimeout(()=>{u<l&&h()},a+1),n.addEventListener(c,f)}function dg(n,t){const e=window.getComputedStyle(n),i=_=>(e[_]||"").split(", "),s=i(`${vi}Delay`),r=i(`${vi}Duration`),o=Cu(s,r),a=i(`${or}Delay`),l=i(`${or}Duration`),c=Cu(a,l);let u=null,h=0,f=0;t===vi?o>0&&(u=vi,h=o,f=r.length):t===or?c>0&&(u=or,h=c,f=l.length):(h=Math.max(o,c),u=h>0?o>c?vi:or:null,f=u?u===vi?r.length:l.length:0);const d=u===vi&&/\b(?:transform|all)(?:,|$)/.test(i(`${vi}Property`).toString());return{type:u,timeout:h,propCount:f,hasTransform:d}}function Cu(n,t){for(;n.length<t.length;)n=n.concat(n);return Math.max(...t.map((e,i)=>Pu(e)+Pu(n[i])))}function Pu(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function Du(n){return(n?n.ownerDocument:document).body.offsetHeight}function pg(n,t,e){const i=n[Fr];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const Lu=Symbol("_vod"),mg=Symbol("_vsh"),gg=Symbol(""),_g=/(?:^|;)\s*display\s*:/;function vg(n,t,e){const i=n.style,s=Ee(e);let r=!1;if(e&&!s){if(t)if(Ee(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&fr(i,a,"")}else for(const o in t)e[o]==null&&fr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?Mg(n,o,!Ee(t)&&t?t[o]:void 0,a)||fr(i,o,a):fr(i,o,"")}}else if(s){if(t!==e){const o=i[gg];o&&(e+=";"+o),i.cssText=e,r=_g.test(e)}}else t&&n.removeAttribute("style");Lu in n&&((!s||t!==e)&&(n[Lu]=r?i.display:""),n[mg]&&(i.display="none"))}const to=/\s*!important$/;function fr(n,t,e){if(Ut(e))e.forEach(i=>fr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))to.test(e)?n.setProperty(t,e.replace(to,""),"important"):n.setProperty(t,e);else{const i=xg(n,t);to.test(e)?n.setProperty(ms(i),e.replace(to,""),"important"):n[i]=e}}const Iu=["Webkit","Moz","ms"],Ra={};function xg(n,t){const e=Ra[t];if(e)return e;let i=Ln(t);if(i!=="filter"&&i in n)return Ra[t]=i;i=Jh(i);for(let s=0;s<Iu.length;s++){const r=Iu[s]+i;if(r in n)return Ra[t]=r}return t}function Mg(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&Ee(i)&&e===i}const Uu="http://www.w3.org/1999/xlink";function Nu(n,t,e,i,s,r=_p(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Uu,t.slice(6,t.length)):n.setAttributeNS(Uu,t,e):e==null||r&&!tf(e)?n.removeAttribute(t):n.setAttribute(t,r?"":$n(e)?String(e):e)}function Fu(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?ad(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=tf(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function es(n,t,e,i){n.addEventListener(t,e,i)}function Sg(n,t,e,i){n.removeEventListener(t,e,i)}const Ou=Symbol("_vei");function yg(n,t,e,i,s=null){const r=n[Ou]||(n[Ou]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=Tg(t);if(i){const c=r[t]=Rg(i,s);es(n,a,c,l)}else o&&(Sg(n,a,o,l),r[t]=void 0)}}const Eg=/(Once|Passive|Capture)$/,bg=/^on:?(?:Once|Passive|Capture)$/;function Tg(n){let t,e;for(;(e=n.match(Eg))&&!bg.test(n);)t||(t={}),n=n.slice(0,n.length-e[1].length),t[e[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):ms(n.slice(2)),t]}let Ca=0;const Ag=Promise.resolve(),wg=()=>Ca||(Ag.then(()=>Ca=0),Ca=Date.now());function Rg(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;const s=e.value;if(Ut(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const o=s.slice(),a=[i];for(let l=0;l<o.length&&!i._stopped;l++){const c=o[l];c&&yn(c,t,5,a)}}else yn(s,t,5,[i])};return e.value=n,e.attached=wg(),e}const Bu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Cg=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?pg(n,i,o):t==="style"?vg(n,e,i):Qo(t)?ta(t)||yg(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Pg(n,t,i,o))?(Fu(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Nu(n,t,i,o,r,t!=="value")):n._isVueCE&&(Dg(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!Ee(i)))?Fu(n,Ln(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Nu(n,t,i,o))};function Pg(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&Bu(t)&&Xt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Bu(t)&&Ee(e)?!1:t in n}function Dg(n,t){const e=n._def.props;if(!e)return!1;const i=Ln(t);return Array.isArray(e)?e.some(s=>Ln(s)===i):Object.keys(e).some(s=>Ln(s)===i)}const $o=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Ut(t)?e=>Ao(t,e):t};function Lg(n){n.target.composing=!0}function zu(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const rs=Symbol("_assign"),eo=Symbol("_initialValue");function Pa(n,t,e){return t&&(n=n.trim()),e&&(n=Hr(n)),n}const Be={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n.parentNode&&(n.type==="text"?n[eo]=n.defaultValue.replace(/[\r\n]/g,""):n.type==="textarea"&&(n[eo]=n.defaultValue.replace(/\r\n?/g,`
`))),n[rs]=$o(s);const r=i||s.props&&s.props.type==="number";es(n,t?"change":"input",o=>{o.target.composing||n[rs](Pa(n.value,e,r))}),(e||r)&&es(n,"change",()=>{n.value=Pa(n.value,e,r)}),t||(es(n,"compositionstart",Lg),es(n,"compositionend",zu),es(n,"change",zu))},mounted(n,{value:t,modifiers:{trim:e,number:i}}){const s=t??"",r=n[eo];delete n[eo],r!==void 0&&(n.type==="text"||n.type==="textarea")&&n.value!==r?n[rs](Pa(n.value,e,i)):n.value=s},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[rs]=$o(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?Hr(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},xn={deep:!0,created(n,{value:t,modifiers:{number:e}},i){n._modelValue=t,es(n,"change",()=>{const s=Array.prototype.filter.call(n.options,l=>l.selected).map(l=>e?Hr(Yo(l)):Yo(l)),r=n.multiple,o=r?hs(n._modelValue)?new Set(s):s:s[0],a=n._pendingValue=[r,r?Ut(o)?s.slice():s:o];try{n[rs](o)}finally{Sf(()=>{n._pendingValue===a&&(n._pendingValue=void 0)})}}),n[rs]=$o(i)},mounted(n,{value:t,modifiers:{number:e}}){ku(n,t,e)},beforeUpdate(n,{value:t},e){n._modelValue=t,n[rs]=$o(e)},updated(n,{value:t,modifiers:{number:e}}){const i=n._pendingValue;n._pendingValue=void 0,(!i||i[0]!==n.multiple||!Ig(t,i[1],i[0]))&&ku(n,t,e)}};function Ig(n,t,e){if(!e||Ut(n))return Ii(n,t);if(hs(n)){if(n.size!==t.length)return!1;for(const i of t)if(!n.has(i))return!1;return!0}return!1}function ku(n,t,e=!1){const i=n.multiple,s=Ut(t);if(!(i&&!s&&!hs(t))){for(let r=0,o=n.options.length;r<o;r++){const a=n.options[r],l=Yo(a);if(i)if(s){const c=typeof l;c==="string"||c==="number"?a.selected=t.some(u=>String(u)===String(l)):a.selected=Mp(t,l)>-1}else a.selected=t.has(l)||e&&typeof l=="string"&&t.has(Hr(l));else if(Ii(Yo(a),t)){n.selectedIndex!==r&&(n.selectedIndex=r);return}}!i&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function Yo(n){return"_value"in n?n._value:n.value}const Ug=["ctrl","shift","alt","meta"],Ng={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>Ug.some(e=>n[`${e}Key`]&&!t.includes(e))},fa=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=((s,...r)=>{for(let o=0;o<t.length;o++){const a=Ng[t[o]];if(a&&a(s,t))return}return n(s,...r)}))},Fg=Pe({patchProp:Cg},og);let Hu;function Og(){return Hu||(Hu=zm(Fg))}const Bg=((...n)=>{const t=Og().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=kg(i);if(!s)return;const r=t._component;!Xt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,zg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function zg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function kg(n){return Ee(n)?document.querySelector(n):n}const Hg="spine-planner",Fi="images";function wc(){return new Promise((n,t)=>{const e=indexedDB.open(Hg,1);e.onupgradeneeded=()=>{e.result.objectStoreNames.contains(Fi)||e.result.createObjectStore(Fi)},e.onsuccess=()=>n(e.result),e.onerror=()=>t(e.error)})}async function cd(n,t){const e=await wc();return new Promise((i,s)=>{const r=e.transaction(Fi,"readwrite");r.objectStore(Fi).put(t,n),r.oncomplete=()=>i(),r.onerror=()=>s(r.error)})}async function ud(n){const t=await wc();return new Promise((e,i)=>{const s=t.transaction(Fi,"readonly").objectStore(Fi).get(n);s.onsuccess=()=>e(s.result||null),s.onerror=()=>i(s.error)})}async function hd(n){const t=await wc();return new Promise((e,i)=>{const s=t.transaction(Fi,"readwrite");s.objectStore(Fi).delete(n),s.oncomplete=()=>e(),s.onerror=()=>i(s.error)})}function Vg(n){return new Promise((t,e)=>{const i=new FileReader;i.onload=()=>t(i.result),i.onerror=()=>e(i.error),i.readAsDataURL(n)})}function Gg(n){const[t,e]=n.split(","),i=(t.match(/data:(.*?);/)||[])[1]||"image/png",s=atob(e),r=new Uint8Array(s.length);for(let o=0;o<s.length;o++)r[o]=s.charCodeAt(o);return new Blob([r],{type:i})}const Rc={physician:"接诊医师",tech:"介入技师",chief:"主任医师"},Co=[{name:"王医生",role:"physician"},{name:"李医生",role:"physician"},{name:"张技师",role:"tech"},{name:"赵技师",role:"tech"},{name:"刘主任",role:"chief"}],Cc=["L1-L2","L2-L3","L3-L4","L4-L5","L5-S1"],Wg=["L2","L3","L4","L5","S1"],fd=["左","右"],Xg=["后外侧入路","椎间孔内入路","椎板间入路","骶管入路"],Al={planning:"待规划",pending:"待审签",approved:"已通过",rejected:"已退回"},Vu=["安全距离不足","进针角度不合理","影像资料不全","解剖标记错误","模板选择不当","其他"],Da=3,ks={cases:"spine.cases",templates:"spine.templates",user:"spine.user"};function La(n,t){try{const e=localStorage.getItem(n);return e?JSON.parse(e):t}catch{return t}}function $g(){return[{segment:"L3-L4",approach:"后外侧入路",az:40,el:8,advance:0,side:"左"},{segment:"L4-L5",approach:"后外侧入路",az:45,el:10,advance:0,side:"左"},{segment:"L5-S1",approach:"后外侧入路",az:40,el:18,advance:0,side:"左"},{segment:"L4-L5",approach:"椎板间入路",az:12,el:5,advance:0,side:"左"}].map((t,e)=>({id:"T"+(e+1),name:`${t.segment} ${t.approach}标准模板`,segment:t.segment,approach:t.approach,side:t.side,az:t.az,el:t.el,advance:t.advance,note:"",updatedBy:"系统",updatedAt:new Date().toISOString()}))}function Yg(){const n=new Date().toISOString();return{id:"P0001",patientName:"示例患者",patientId:"ZY20260001",sex:"男",age:58,segment:"L4-L5",root:"L5",side:"左",surgeryHistory:"2019年腰椎间盘摘除术(L4-L5)",coag:{PT:12.1,APTT:32.5,INR:1.02,PLT:186},status:"planning",images:[],marks:{vertebra:"",foramen:"",nerveRoot:""},needle:{az:45,el:10,advance:0},templateId:"",screenshot:"",distances:null,createdBy:"王医生",createdAt:n,updatedAt:n,log:[{t:n,user:"王医生",role:"physician",action:"新建病例",detail:"示例病例"}]}}const Lt=Vr({user:La(ks.user,null)||Co[0],cases:La(ks.cases,null)||[Yg()],templates:La(ks.templates,null)||$g(),view:"cases",activeCaseId:null});Wn(()=>Lt.cases,n=>localStorage.setItem(ks.cases,JSON.stringify(n)),{deep:!0});Wn(()=>Lt.templates,n=>localStorage.setItem(ks.templates,JSON.stringify(n)),{deep:!0});Wn(()=>Lt.user,n=>localStorage.setItem(ks.user,JSON.stringify(n)),{deep:!0});function Xs(n){if(!n)return"";const t=new Date(n),e=i=>String(i).padStart(2,"0");return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())} ${e(t.getHours())}:${e(t.getMinutes())}`}function Or(n){return Lt.cases.find(t=>t.id===n)}function dd(n){n.updatedAt=new Date().toISOString()}function Qs(n,t,e=""){n.log.push({t:new Date().toISOString(),user:Lt.user.name,role:Lt.user.role,action:t,detail:e}),dd(n)}function qg(n){const t=Lt.cases.reduce((s,r)=>Math.max(s,parseInt(r.id.slice(1))||0),0)+1,e=new Date().toISOString(),i={id:"P"+String(t).padStart(4,"0"),patientName:n.patientName,patientId:n.patientId,sex:n.sex,age:n.age,segment:n.segment,root:n.root,side:n.side,surgeryHistory:n.surgeryHistory||"无",coag:{...n.coag},status:"planning",images:[],marks:{vertebra:"",foramen:"",nerveRoot:""},needle:{az:45,el:10,advance:0},templateId:"",screenshot:"",distances:null,createdBy:Lt.user.name,createdAt:e,updatedAt:e,log:[{t:e,user:Lt.user.name,role:Lt.user.role,action:"新建病例",detail:`${n.segment} / ${n.side}${n.root}`}]};return Lt.cases.unshift(i),i}function jg(n){const t=Or(n);if(t)for(const e of t.images)hd(e.id).catch(()=>{});Lt.cases=Lt.cases.filter(e=>e.id!==n)}async function Kg(n,t,e){for(const i of t){const s="img_"+Math.random().toString(36).slice(2,10);await cd(s,i),n.images.push({id:s,name:i.name,kind:e})}Qs(n,"导入影像",`${e} × ${t.length}`)}async function Zg(n,t){await hd(t.id).catch(()=>{}),n.images=n.images.filter(e=>e.id!==t.id)}function Jg(n,t){n.marks={...n.marks,...t},Qs(n,"标记解剖",`椎体:${t.vertebra||n.marks.vertebra||"-"} 椎间孔:${t.foramen||n.marks.foramen||"-"} 神经根:${t.nerveRoot||n.marks.nerveRoot||"-"}`)}function Qg(n,t){n.needle={...n.needle,...t},dd(n)}function t_(n,t){const e=Lt.templates.find(i=>i.id===t);e&&(n.templateId=e.id,n.needle={az:e.az,el:e.el,advance:e.advance},Qs(n,"应用模板",e.name))}function e_(n,t){const e=[];return n.images.length||e.push("尚未导入CT/透视影像"),(!n.marks.vertebra||!n.marks.foramen||!n.marks.nerveRoot)&&e.push("解剖标记不完整(椎体/椎间孔/神经根)"),t&&(t.root<Da||t.dural<Da)&&e.push(`安全距离不足(神经根 ${t.root.toFixed(1)}mm / 硬膜囊 ${t.dural.toFixed(1)}mm,需 ≥ ${Da}mm)`),e}function n_(n,t,e){n.distances={root:t.root,rootName:t.rootName,dural:t.dural},n.screenshot=e||"",n.status="pending",Qs(n,"提交审签",`外展角${n.needle.az.toFixed(1)}° 头倾角${n.needle.el.toFixed(1)}° 针尖过靶点${n.needle.advance.toFixed(1)}mm`)}function i_(n){n.status="approved",Qs(n,"审签通过")}function s_(n,t,e){n.status="rejected",Qs(n,"退回",e?`${t}:${e}`:t)}function r_(n){const t=n.log.findIndex(e=>e.action==="审签通过");return t<0?!1:!n.log.slice(0,t).some(e=>e.action==="退回")}function o_(n){const t=new Date().toISOString();if(n.id){const e=Lt.templates.findIndex(i=>i.id===n.id);e>=0&&(Lt.templates[e]={...n,updatedBy:Lt.user.name,updatedAt:t})}else{const e=Lt.templates.reduce((i,s)=>Math.max(i,parseInt(s.id.slice(1))||0),0)+1;Lt.templates.push({...n,id:"T"+e,updatedBy:Lt.user.name,updatedAt:t})}}function a_(n){Lt.templates=Lt.templates.filter(t=>t.id!==n)}async function pd(n=null){const t=n?Lt.cases.filter(i=>n.includes(i.id)):Lt.cases,e=[];for(const i of t){const s=[];for(const r of i.images){const o=await ud(r.id);s.push({...r,data:o?await Vg(o):null})}e.push({...i,images:s})}return{app:"spine-puncture-planner",version:1,exportedAt:new Date().toISOString(),exportedBy:Lt.user.name,cases:e,templates:n?[]:Lt.templates}}async function l_(n){if(n.app!=="spine-puncture-planner")throw new Error("文件格式不正确");let t=0;for(const e of n.cases||[]){const i=[];for(const o of e.images||[])o.data&&await cd(o.id,Gg(o.data)),i.push({id:o.id,name:o.name,kind:o.kind});const s={...e,images:i},r=Lt.cases.findIndex(o=>o.id===s.id);r>=0?Lt.cases[r]=s:Lt.cases.unshift(s),t++}for(const e of n.templates||[]){const i=Lt.templates.findIndex(s=>s.id===e.id);i>=0?Lt.templates[i]=e:Lt.templates.push(e)}return t}function md(n,t){const e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(e),i.download=t,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3)}const c_={class:"panel"},u_={class:"panel-head"},h_={class:"head-actions"},f_=["value"],d_={class:"table"},p_={class:"ops"},m_=["onClick"],g_=["onClick"],__=["onClick"],v_=["onClick"],x_=["onClick"],M_={key:0},S_={__name:"CaseList",emits:["new-case","open-planner","open-review","open-briefing"],setup(n,{emit:t}){const e=Ne(""),i=Se(()=>Lt.user.role==="physician"),s=Se(()=>Lt.user.role==="chief"),r=Se(()=>Lt.cases.filter(c=>!e.value||c.status===e.value));function o(c){return i.value&&(c.status==="planning"||c.status==="rejected")}async function a(c){const u=await pd([c.id]);md(u,`病例_${c.id}_${c.patientName}.json`)}function l(c){confirm(`确认删除病例 ${c.id}(${c.patientName})?`)&&jg(c.id)}return(c,u)=>(ut(),dt("div",c_,[E("div",u_,[u[3]||(u[3]=E("h2",null,"病例列表",-1)),E("div",h_,[de(E("select",{"onUpdate:modelValue":u[0]||(u[0]=h=>e.value=h),class:"input slim"},[u[2]||(u[2]=E("option",{value:""},"全部状态",-1)),(ut(!0),dt(Qt,null,we(ue(Al),(h,f)=>(ut(),dt("option",{key:f,value:f},et(h),9,f_))),128))],512),[[xn,e.value]]),i.value?(ut(),dt("button",{key:0,class:"btn primary",onClick:u[1]||(u[1]=h=>c.$emit("new-case"))},"+ 新建病例")):ne("",!0)])]),E("table",d_,[u[5]||(u[5]=E("thead",null,[E("tr",null,[E("th",null,"病例号"),E("th",null,"患者"),E("th",null,"疼痛节段"),E("th",null,"责任神经根"),E("th",null,"状态"),E("th",null,"创建人"),E("th",null,"更新时间"),E("th",null,"操作")])],-1)),E("tbody",null,[(ut(!0),dt(Qt,null,we(r.value,h=>(ut(),dt("tr",{key:h.id},[E("td",null,et(h.id),1),E("td",null,et(h.patientName)+"("+et(h.sex)+"/"+et(h.age)+"岁)",1),E("td",null,et(h.segment),1),E("td",null,et(h.side)+et(h.root),1),E("td",null,[E("span",{class:We(["tag","st-"+h.status])},et(ue(Al)[h.status]),3)]),E("td",null,et(h.createdBy),1),E("td",null,et(ue(Xs)(h.updatedAt)),1),E("td",p_,[o(h)?(ut(),dt("button",{key:0,class:"btn slim",onClick:f=>c.$emit("open-planner",h.id)},"规划",8,m_)):ne("",!0),h.status==="pending"&&s.value?(ut(),dt("button",{key:1,class:"btn slim warn",onClick:f=>c.$emit("open-review",h.id)},"审签",8,g_)):ne("",!0),h.status==="approved"?(ut(),dt("button",{key:2,class:"btn slim ok",onClick:f=>c.$emit("open-briefing",h.id)},"交底单",8,__)):ne("",!0),E("button",{class:"btn slim ghost",onClick:f=>a(h)},"导出",8,v_),i.value&&h.status==="planning"?(ut(),dt("button",{key:3,class:"btn slim danger",onClick:f=>l(h)},"删除",8,x_)):ne("",!0)])]))),128)),r.value.length?ne("",!0):(ut(),dt("tr",M_,[...u[4]||(u[4]=[E("td",{colspan:"8",class:"empty"},"暂无病例",-1)])]))])])]))}},y_={class:"modal"},E_={class:"form-grid"},b_={class:"row"},T_={class:"span2"},A_={class:"coag"},w_={key:0,class:"warn-text"},R_={class:"modal-actions"},C_=["disabled"],P_={__name:"CaseForm",emits:["close","created"],setup(n,{emit:t}){const e=t,i=Vr({patientName:"",patientId:"",sex:"男",age:50,segment:"L4-L5",root:"L5",side:"左",surgeryHistory:"",coag:{PT:12,APTT:32,INR:1,PLT:180}}),s=Se(()=>i.patientName&&i.patientId&&i.age>0),r=Se(()=>i.coag.INR>1.5||i.coag.PLT<80||i.coag.PT>14.5||i.coag.APTT>40);function o(){const a=qg(i);e("created",a.id),e("close")}return(a,l)=>(ut(),dt("div",{class:"modal-mask",onClick:l[13]||(l[13]=fa(c=>a.$emit("close"),["self"]))},[E("div",y_,[l[27]||(l[27]=E("h3",null,"新建病例",-1)),E("div",E_,[E("label",null,[l[14]||(l[14]=qt("患者姓名",-1)),de(E("input",{"onUpdate:modelValue":l[0]||(l[0]=c=>i.patientName=c),class:"input",placeholder:"姓名"},null,512),[[Be,i.patientName,void 0,{trim:!0}]])]),E("label",null,[l[15]||(l[15]=qt("住院/门诊号",-1)),de(E("input",{"onUpdate:modelValue":l[1]||(l[1]=c=>i.patientId=c),class:"input",placeholder:"编号"},null,512),[[Be,i.patientId,void 0,{trim:!0}]])]),E("label",null,[l[17]||(l[17]=qt("性别 ",-1)),de(E("select",{"onUpdate:modelValue":l[2]||(l[2]=c=>i.sex=c),class:"input"},[...l[16]||(l[16]=[E("option",null,"男",-1),E("option",null,"女",-1)])],512),[[xn,i.sex]])]),E("label",null,[l[18]||(l[18]=qt("年龄",-1)),de(E("input",{"onUpdate:modelValue":l[3]||(l[3]=c=>i.age=c),type:"number",min:"1",max:"120",class:"input"},null,512),[[Be,i.age,void 0,{number:!0}]])]),E("label",null,[l[19]||(l[19]=qt("疼痛节段 ",-1)),de(E("select",{"onUpdate:modelValue":l[4]||(l[4]=c=>i.segment=c),class:"input"},[(ut(!0),dt(Qt,null,we(ue(Cc),c=>(ut(),dt("option",{key:c},et(c),1))),128))],512),[[xn,i.segment]])]),E("label",null,[l[20]||(l[20]=qt("责任神经根 ",-1)),E("span",b_,[de(E("select",{"onUpdate:modelValue":l[5]||(l[5]=c=>i.side=c),class:"input"},[(ut(!0),dt(Qt,null,we(ue(fd),c=>(ut(),dt("option",{key:c},et(c),1))),128))],512),[[xn,i.side]]),de(E("select",{"onUpdate:modelValue":l[6]||(l[6]=c=>i.root=c),class:"input"},[(ut(!0),dt(Qt,null,we(ue(Wg),c=>(ut(),dt("option",{key:c},et(c),1))),128))],512),[[xn,i.root]])])]),E("label",T_,[l[21]||(l[21]=qt("既往手术史 ",-1)),de(E("textarea",{"onUpdate:modelValue":l[7]||(l[7]=c=>i.surgeryHistory=c),class:"input",rows:"2",placeholder:"无则留空"},null,512),[[Be,i.surgeryHistory,void 0,{trim:!0}]])])]),E("fieldset",A_,[l[26]||(l[26]=E("legend",null,"凝血指标",-1)),E("label",null,[l[22]||(l[22]=qt("PT (s)",-1)),de(E("input",{"onUpdate:modelValue":l[8]||(l[8]=c=>i.coag.PT=c),type:"number",step:"0.1",class:We(["input",{warn:i.coag.PT>14.5}])},null,2),[[Be,i.coag.PT,void 0,{number:!0}]])]),E("label",null,[l[23]||(l[23]=qt("APTT (s)",-1)),de(E("input",{"onUpdate:modelValue":l[9]||(l[9]=c=>i.coag.APTT=c),type:"number",step:"0.1",class:We(["input",{warn:i.coag.APTT>40}])},null,2),[[Be,i.coag.APTT,void 0,{number:!0}]])]),E("label",null,[l[24]||(l[24]=qt("INR",-1)),de(E("input",{"onUpdate:modelValue":l[10]||(l[10]=c=>i.coag.INR=c),type:"number",step:"0.01",class:We(["input",{warn:i.coag.INR>1.5}])},null,2),[[Be,i.coag.INR,void 0,{number:!0}]])]),E("label",null,[l[25]||(l[25]=qt("PLT (10⁹/L)",-1)),de(E("input",{"onUpdate:modelValue":l[11]||(l[11]=c=>i.coag.PLT=c),type:"number",class:We(["input",{warn:i.coag.PLT<80}])},null,2),[[Be,i.coag.PLT,void 0,{number:!0}]])])]),r.value?(ut(),dt("p",w_,"⚠ 凝血指标异常,请注意穿刺出血风险")):ne("",!0),E("div",R_,[E("button",{class:"btn ghost",onClick:l[12]||(l[12]=c=>a.$emit("close"))},"取消"),E("button",{class:"btn primary",disabled:!s.value,onClick:o},"创建",8,C_)])])]))}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pc="171",Hs={ROTATE:0,DOLLY:1,PAN:2},Fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},D_=0,Gu=1,L_=2,gd=1,I_=2,oi=3,Oi=0,rn=1,Hn=2,Pi=0,Vs=1,Wu=2,Xu=3,$u=4,U_=5,ns=100,N_=101,F_=102,O_=103,B_=104,z_=200,k_=201,H_=202,V_=203,wl=204,Rl=205,G_=206,W_=207,X_=208,$_=209,Y_=210,q_=211,j_=212,K_=213,Z_=214,Cl=0,Pl=1,Dl=2,$s=3,Ll=4,Il=5,Ul=6,Nl=7,_d=0,J_=1,Q_=2,Di=0,tv=1,ev=2,nv=3,iv=4,sv=5,rv=6,ov=7,vd=300,Ys=301,qs=302,Fl=303,Ol=304,da=306,Bl=1e3,os=1001,zl=1002,Un=1003,av=1004,no=1005,Vn=1006,Ia=1007,as=1008,mi=1009,xd=1010,Md=1011,Br=1012,Dc=1013,fs=1014,fi=1015,Xr=1016,Lc=1017,Ic=1018,js=1020,Sd=35902,yd=1021,Ed=1022,Dn=1023,bd=1024,Td=1025,Gs=1026,Ks=1027,Ad=1028,Uc=1029,wd=1030,Nc=1031,Fc=1033,Po=33776,Do=33777,Lo=33778,Io=33779,kl=35840,Hl=35841,Vl=35842,Gl=35843,Wl=36196,Xl=37492,$l=37496,Yl=37808,ql=37809,jl=37810,Kl=37811,Zl=37812,Jl=37813,Ql=37814,tc=37815,ec=37816,nc=37817,ic=37818,sc=37819,rc=37820,oc=37821,Uo=36492,ac=36494,lc=36495,Rd=36283,cc=36284,uc=36285,hc=36286,lv=3200,cv=3201,Cd=0,uv=1,wi="",gn="srgb",Zs="srgb-linear",qo="linear",pe="srgb",xs=7680,Yu=519,hv=512,fv=513,dv=514,Pd=515,pv=516,mv=517,gv=518,_v=519,qu=35044,ju="300 es",di=2e3,jo=2001;class gs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ku=1234567;const yr=Math.PI/180,zr=180/Math.PI;function tr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]).toLowerCase()}function Kt(n,t,e){return Math.max(t,Math.min(e,n))}function Oc(n,t){return(n%t+t)%t}function vv(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function xv(n,t,e){return n!==t?(e-n)/(t-n):0}function Er(n,t,e){return(1-e)*n+e*t}function Mv(n,t,e,i){return Er(n,t,1-Math.exp(-e*i))}function Sv(n,t=1){return t-Math.abs(Oc(n,t*2)-t)}function yv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Ev(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function bv(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Tv(n,t){return n+Math.random()*(t-n)}function Av(n){return n*(.5-Math.random())}function wv(n){n!==void 0&&(Ku=n);let t=Ku+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Rv(n){return n*yr}function Cv(n){return n*zr}function Pv(n){return(n&n-1)===0&&n!==0}function Dv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Lv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Iv(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),h=r((t-i)/2),f=o((t-i)/2),d=r((i-t)/2),_=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*_,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*_,a*c);break;case"ZYZ":n.set(l*_,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Us(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ze(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const dr={DEG2RAD:yr,RAD2DEG:zr,generateUUID:tr,clamp:Kt,euclideanModulo:Oc,mapLinear:vv,inverseLerp:xv,lerp:Er,damp:Mv,pingpong:Sv,smoothstep:yv,smootherstep:Ev,randInt:bv,randFloat:Tv,randFloatSpread:Av,seededRandom:wv,degToRad:Rv,radToDeg:Cv,isPowerOfTwo:Pv,ceilPowerOfTwo:Dv,floorPowerOfTwo:Lv,setQuaternionFromProperEuler:Iv,normalize:Ze,denormalize:Us};class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,i,s,r,o,a,l,c){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],_=i[8],v=s[0],m=s[3],p=s[6],C=s[1],A=s[4],x=s[7],D=s[2],w=s[5],R=s[8];return r[0]=o*v+a*C+l*D,r[3]=o*m+a*A+l*w,r[6]=o*p+a*x+l*R,r[1]=c*v+u*C+h*D,r[4]=c*m+u*A+h*w,r[7]=c*p+u*x+h*R,r[2]=f*v+d*C+_*D,r[5]=f*m+d*A+_*w,r[8]=f*p+d*x+_*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,_=e*h+i*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return t[0]=h*v,t[1]=(s*c-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ua.makeScale(t,e)),this}rotate(t){return this.premultiply(Ua.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ua.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ua=new Yt;function Dd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ko(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Uv(){const n=Ko("canvas");return n.style.display="block",n}const Zu={};function Ns(n){n in Zu||(Zu[n]=!0,console.warn(n))}function Nv(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Fv(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ov(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ju=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qu=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bv(){const n={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pe&&(s.r=pi(s.r),s.g=pi(s.g),s.b=pi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pe&&(s.r=Ws(s.r),s.g=Ws(s.g),s.b=Ws(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wi?qo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Zs]:{primaries:t,whitePoint:i,transfer:qo,toXYZ:Ju,fromXYZ:Qu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:gn},outputColorSpaceConfig:{drawingBufferColorSpace:gn}},[gn]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:Ju,fromXYZ:Qu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:gn}}}),n}const se=Bv();function pi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ws(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ms;class zv{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ms===void 0&&(Ms=Ko("canvas")),Ms.width=t.width,Ms.height=t.height;const i=Ms.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Ms}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ko("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=pi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(pi(e[i]/255)*255):e[i]=pi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let kv=0;class Ld{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kv++}),this.uuid=tr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Na(s[o].image)):r.push(Na(s[o]))}else r=Na(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Na(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hv=0;class on extends gs{constructor(t=on.DEFAULT_IMAGE,e=on.DEFAULT_MAPPING,i=os,s=os,r=Vn,o=as,a=Dn,l=mi,c=on.DEFAULT_ANISOTROPY,u=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hv++}),this.uuid=tr(),this.name="",this.source=new Ld(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bl:t.x=t.x-Math.floor(t.x);break;case os:t.x=t.x<0?0:1;break;case zl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bl:t.y=t.y-Math.floor(t.y);break;case os:t.y=t.y<0?0:1;break;case zl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=vd;on.DEFAULT_ANISOTROPY=1;class Ae{constructor(t=0,e=0,i=0,s=1){Ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],_=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(c+1)/2,x=(d+1)/2,D=(p+1)/2,w=(u+f)/4,R=(h+v)/4,I=(_+m)/4;return A>x&&A>D?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=w/i,r=R/i):x>D?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=w/s,r=I/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=R/r,s=I/r),this.set(i,s,r,e),this}let C=Math.sqrt((m-_)*(m-_)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(C)<.001&&(C=1),this.x=(m-_)/C,this.y=(h-v)/C,this.z=(f-u)/C,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this.w=Kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this.w=Kt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vv extends gs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new on(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ld(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ds extends Vv{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Id extends on{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Un,this.minFilter=Un,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gv extends on{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Un,this.minFilter=Un,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ps{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],d=r[o+1],_=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=_,t[e+3]=v;return}if(h!==v||l!==f||c!==d||u!==_){let m=1-a;const p=l*f+c*d+u*_+h*v,C=p>=0?1:-1,A=1-p*p;if(A>Number.EPSILON){const D=Math.sqrt(A),w=Math.atan2(D,p*C);m=Math.sin(m*w)/D,a=Math.sin(a*w)/D}const x=a*C;if(l=l*m+f*x,c=c*m+d*x,u=u*m+_*x,h=h*m+v*x,m===1-a){const D=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=D,c*=D,u*=D,h*=D}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],_=r[o+3];return t[e]=a*_+u*h+l*d-c*f,t[e+1]=l*_+u*f+c*h-a*d,t[e+2]=c*_+u*d+a*f-l*h,t[e+3]=u*_-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),d=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h+f*d*_;break;case"YZX":this._x=f*u*h+c*d*_,this._y=c*d*h+f*u*_,this._z=c*u*_-f*d*h,this._w=c*u*h-f*d*_;break;case"XZY":this._x=f*u*h-c*d*_,this._y=c*d*h-f*u*_,this._z=c*u*_+f*d*h,this._w=c*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,i=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(th.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Fa.copy(this).projectOnVector(t),this.sub(Fa)}reflect(t){return this.sub(Fa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fa=new F,th=new ps;class $r{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),io.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),io.copy(i.boundingBox)),io.applyMatrix4(t.matrixWorld),this.union(io)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ar),so.subVectors(this.max,ar),Ss.subVectors(t.a,ar),ys.subVectors(t.b,ar),Es.subVectors(t.c,ar),xi.subVectors(ys,Ss),Mi.subVectors(Es,ys),Xi.subVectors(Ss,Es);let e=[0,-xi.z,xi.y,0,-Mi.z,Mi.y,0,-Xi.z,Xi.y,xi.z,0,-xi.x,Mi.z,0,-Mi.x,Xi.z,0,-Xi.x,-xi.y,xi.x,0,-Mi.y,Mi.x,0,-Xi.y,Xi.x,0];return!Oa(e,Ss,ys,Es,so)||(e=[1,0,0,0,1,0,0,0,1],!Oa(e,Ss,ys,Es,so))?!1:(ro.crossVectors(xi,Mi),e=[ro.x,ro.y,ro.z],Oa(e,Ss,ys,Es,so))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ei=[new F,new F,new F,new F,new F,new F,new F,new F],Tn=new F,io=new $r,Ss=new F,ys=new F,Es=new F,xi=new F,Mi=new F,Xi=new F,ar=new F,so=new F,ro=new F,$i=new F;function Oa(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){$i.fromArray(n,r);const a=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),l=t.dot($i),c=e.dot($i),u=i.dot($i);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Wv=new $r,lr=new F,Ba=new F;class Bc{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Wv.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;lr.subVectors(t,this.center);const e=lr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(lr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ba.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(lr.copy(t.center).add(Ba)),this.expandByPoint(lr.copy(t.center).sub(Ba))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ni=new F,za=new F,oo=new F,Si=new F,ka=new F,ao=new F,Ha=new F;class zc{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ni)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ni.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ni.copy(this.origin).addScaledVector(this.direction,e),ni.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){za.copy(t).add(e).multiplyScalar(.5),oo.copy(e).sub(t).normalize(),Si.copy(this.origin).sub(za);const r=t.distanceTo(e)*.5,o=-this.direction.dot(oo),a=Si.dot(this.direction),l=-Si.dot(oo),c=Si.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*l-a,f=o*a-l,_=r*u,h>=0)if(f>=-_)if(f<=_){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(za).addScaledVector(oo,f),d}intersectSphere(t,e){ni.subVectors(t.center,this.origin);const i=ni.dot(this.direction),s=ni.dot(ni)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ni)!==null}intersectTriangle(t,e,i,s,r){ka.subVectors(e,t),ao.subVectors(i,t),Ha.crossVectors(ka,ao);let o=this.direction.dot(Ha),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Si.subVectors(this.origin,t);const l=a*this.direction.dot(ao.crossVectors(Si,ao));if(l<0)return null;const c=a*this.direction.dot(ka.cross(Si));if(c<0||l+c>o)return null;const u=-a*Si.dot(Ha);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ye{constructor(t,e,i,s,r,o,a,l,c,u,h,f,d,_,v,m){ye.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,d,_,v,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,d,_,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ye().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/bs.setFromMatrixColumn(t,0).length(),r=1/bs.setFromMatrixColumn(t,1).length(),o=1/bs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,_=a*u,v=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+_*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=_+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,_=c*u,v=c*h;e[0]=f+v*a,e[4]=_*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-_,e[6]=v+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,_=c*u,v=c*h;e[0]=f-v*a,e[4]=-o*h,e[8]=_+d*a,e[1]=d+_*a,e[5]=o*u,e[9]=v-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,_=a*u,v=a*h;e[0]=l*u,e[4]=_*c-d,e[8]=f*c+v,e[1]=l*h,e[5]=v*c+f,e[9]=d*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,_=a*l,v=a*c;e[0]=l*u,e[4]=v-f*h,e[8]=_*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+_,e[10]=f-v*h}else if(t.order==="XZY"){const f=o*l,d=o*c,_=a*l,v=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+v,e[5]=o*u,e[9]=d*h-_,e[2]=_*h-d,e[6]=a*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xv,t,$v)}lookAt(t,e,i){const s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),yi.crossVectors(i,ln),yi.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),yi.crossVectors(i,ln)),yi.normalize(),lo.crossVectors(ln,yi),s[0]=yi.x,s[4]=lo.x,s[8]=ln.x,s[1]=yi.y,s[5]=lo.y,s[9]=ln.y,s[2]=yi.z,s[6]=lo.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],_=i[2],v=i[6],m=i[10],p=i[14],C=i[3],A=i[7],x=i[11],D=i[15],w=s[0],R=s[4],I=s[8],b=s[12],M=s[1],U=s[5],O=s[9],H=s[13],Q=s[2],ot=s[6],Z=s[10],it=s[14],W=s[3],_t=s[7],Tt=s[11],Ct=s[15];return r[0]=o*w+a*M+l*Q+c*W,r[4]=o*R+a*U+l*ot+c*_t,r[8]=o*I+a*O+l*Z+c*Tt,r[12]=o*b+a*H+l*it+c*Ct,r[1]=u*w+h*M+f*Q+d*W,r[5]=u*R+h*U+f*ot+d*_t,r[9]=u*I+h*O+f*Z+d*Tt,r[13]=u*b+h*H+f*it+d*Ct,r[2]=_*w+v*M+m*Q+p*W,r[6]=_*R+v*U+m*ot+p*_t,r[10]=_*I+v*O+m*Z+p*Tt,r[14]=_*b+v*H+m*it+p*Ct,r[3]=C*w+A*M+x*Q+D*W,r[7]=C*R+A*U+x*ot+D*_t,r[11]=C*I+A*O+x*Z+D*Tt,r[15]=C*b+A*H+x*it+D*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],_=t[3],v=t[7],m=t[11],p=t[15];return _*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*d-i*l*d)+v*(+e*l*d-e*c*f+r*o*f-s*o*d+s*c*u-r*l*u)+m*(+e*c*h-e*a*d-r*o*h+i*o*d+r*a*u-i*c*u)+p*(-s*a*u-e*l*h+e*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],_=t[12],v=t[13],m=t[14],p=t[15],C=h*m*c-v*f*c+v*l*d-a*m*d-h*l*p+a*f*p,A=_*f*c-u*m*c-_*l*d+o*m*d+u*l*p-o*f*p,x=u*v*c-_*h*c+_*a*d-o*v*d-u*a*p+o*h*p,D=_*h*l-u*v*l-_*a*f+o*v*f+u*a*m-o*h*m,w=e*C+i*A+s*x+r*D;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return t[0]=C*R,t[1]=(v*f*r-h*m*r-v*s*d+i*m*d+h*s*p-i*f*p)*R,t[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*p+i*l*p)*R,t[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*d-i*l*d)*R,t[4]=A*R,t[5]=(u*m*r-_*f*r+_*s*d-e*m*d-u*s*p+e*f*p)*R,t[6]=(_*l*r-o*m*r-_*s*c+e*m*c+o*s*p-e*l*p)*R,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*d+e*l*d)*R,t[8]=x*R,t[9]=(_*h*r-u*v*r-_*i*d+e*v*d+u*i*p-e*h*p)*R,t[10]=(o*v*r-_*a*r+_*i*c-e*v*c-o*i*p+e*a*p)*R,t[11]=(u*a*r-o*h*r-u*i*c+e*h*c+o*i*d-e*a*d)*R,t[12]=D*R,t[13]=(u*v*s-_*h*s+_*i*f-e*v*f-u*i*m+e*h*m)*R,t[14]=(_*a*s-o*v*s-_*i*l+e*v*l+o*i*m-e*a*m)*R,t[15]=(o*h*s-u*a*s+u*i*l-e*h*l-o*i*f+e*a*f)*R,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,_=r*h,v=o*u,m=o*h,p=a*h,C=l*c,A=l*u,x=l*h,D=i.x,w=i.y,R=i.z;return s[0]=(1-(v+p))*D,s[1]=(d+x)*D,s[2]=(_-A)*D,s[3]=0,s[4]=(d-x)*w,s[5]=(1-(f+p))*w,s[6]=(m+C)*w,s[7]=0,s[8]=(_+A)*R,s[9]=(m-C)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=bs.set(s[0],s[1],s[2]).length();const o=bs.set(s[4],s[5],s[6]).length(),a=bs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],An.copy(this);const c=1/r,u=1/o,h=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=u,An.elements[5]*=u,An.elements[6]*=u,An.elements[8]*=h,An.elements[9]*=h,An.elements[10]*=h,e.setFromRotationMatrix(An),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=di){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s);let d,_;if(a===di)d=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===jo)d=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=di){const l=this.elements,c=1/(e-t),u=1/(i-s),h=1/(o-r),f=(e+t)*c,d=(i+s)*u;let _,v;if(a===di)_=(o+r)*h,v=-2*h;else if(a===jo)_=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const bs=new F,An=new ye,Xv=new F(0,0,0),$v=new F(1,1,1),yi=new F,lo=new F,ln=new F,eh=new ye,nh=new ps;class Kn{constructor(t=0,e=0,i=0,s=Kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Kt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return eh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(eh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return nh.setFromEuler(this),this.setFromQuaternion(nh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kn.DEFAULT_ORDER="XYZ";class kc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yv=0;const ih=new F,Ts=new ps,ii=new ye,co=new F,cr=new F,qv=new F,jv=new ps,sh=new F(1,0,0),rh=new F(0,1,0),oh=new F(0,0,1),ah={type:"added"},Kv={type:"removed"},As={type:"childadded",child:null},Va={type:"childremoved",child:null};class Ye extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yv++}),this.uuid=tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ye.DEFAULT_UP.clone();const t=new F,e=new Kn,i=new ps,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new Yt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=Ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ts.setFromAxisAngle(t,e),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(t,e){return Ts.setFromAxisAngle(t,e),this.quaternion.premultiply(Ts),this}rotateX(t){return this.rotateOnAxis(sh,t)}rotateY(t){return this.rotateOnAxis(rh,t)}rotateZ(t){return this.rotateOnAxis(oh,t)}translateOnAxis(t,e){return ih.copy(t).applyQuaternion(this.quaternion),this.position.add(ih.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sh,t)}translateY(t){return this.translateOnAxis(rh,t)}translateZ(t){return this.translateOnAxis(oh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?co.copy(t):co.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(cr,co,this.up):ii.lookAt(co,cr,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),Ts.setFromRotationMatrix(ii),this.quaternion.premultiply(Ts.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ah),As.child=t,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kv),Va.child=t,this.dispatchEvent(Va),Va.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ah),As.child=t,this.dispatchEvent(As),As.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,t,qv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,jv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ye.DEFAULT_UP=new F(0,1,0);Ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const wn=new F,si=new F,Ga=new F,ri=new F,ws=new F,Rs=new F,lh=new F,Wa=new F,Xa=new F,$a=new F,Ya=new Ae,qa=new Ae,ja=new Ae;class Cn{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),wn.subVectors(t,e),s.cross(wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){wn.subVectors(s,e),si.subVectors(i,e),Ga.subVectors(t,e);const o=wn.dot(wn),a=wn.dot(si),l=wn.dot(Ga),c=si.dot(si),u=si.dot(Ga),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,_=(o*u-a*l)*f;return r.set(1-d-_,_,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ri.x),l.addScaledVector(o,ri.y),l.addScaledVector(a,ri.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Ya.setScalar(0),qa.setScalar(0),ja.setScalar(0),Ya.fromBufferAttribute(t,e),qa.fromBufferAttribute(t,i),ja.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ya,r.x),o.addScaledVector(qa,r.y),o.addScaledVector(ja,r.z),o}static isFrontFacing(t,e,i,s){return wn.subVectors(i,e),si.subVectors(t,e),wn.cross(si).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),wn.cross(si).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Cn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ws.subVectors(s,i),Rs.subVectors(r,i),Wa.subVectors(t,i);const l=ws.dot(Wa),c=Rs.dot(Wa);if(l<=0&&c<=0)return e.copy(i);Xa.subVectors(t,s);const u=ws.dot(Xa),h=Rs.dot(Xa);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(ws,o);$a.subVectors(t,r);const d=ws.dot($a),_=Rs.dot($a);if(_>=0&&d<=_)return e.copy(r);const v=d*c-l*_;if(v<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(i).addScaledVector(Rs,a);const m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return lh.subVectors(r,s),a=(h-u)/(h-u+(d-_)),e.copy(s).addScaledVector(lh,a);const p=1/(m+v+f);return o=v*p,a=f*p,e.copy(i).addScaledVector(ws,o).addScaledVector(Rs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ud={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},uo={h:0,s:0,l:0};function Ka(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class te{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=gn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=i,se.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=se.workingColorSpace){if(t=Oc(t,1),e=Kt(e,0,1),i=Kt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Ka(o,r,t+1/3),this.g=Ka(o,r,t),this.b=Ka(o,r,t-1/3)}return se.toWorkingColorSpace(this,s),this}setStyle(t,e=gn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=gn){const i=Ud[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pi(t.r),this.g=pi(t.g),this.b=pi(t.b),this}copyLinearToSRGB(t){return this.r=Ws(t.r),this.g=Ws(t.g),this.b=Ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=gn){return se.fromWorkingColorSpace(Ve.copy(this),t),Math.round(Kt(Ve.r*255,0,255))*65536+Math.round(Kt(Ve.g*255,0,255))*256+Math.round(Kt(Ve.b*255,0,255))}getHexString(t=gn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(Ve.copy(this),e);const i=Ve.r,s=Ve.g,r=Ve.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(Ve.copy(this),e),t.r=Ve.r,t.g=Ve.g,t.b=Ve.b,t}getStyle(t=gn){se.fromWorkingColorSpace(Ve.copy(this),t);const e=Ve.r,i=Ve.g,s=Ve.b;return t!==gn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ei),this.setHSL(Ei.h+t,Ei.s+e,Ei.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ei),t.getHSL(uo);const i=Er(Ei.h,uo.h,e),s=Er(Ei.s,uo.s,e),r=Er(Ei.l,uo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ve=new te;te.NAMES=Ud;let Zv=0;class Yr extends gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zv++}),this.uuid=tr(),this.name="",this.type="Material",this.blending=Vs,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wl,this.blendDst=Rl,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(i.blending=this.blending),this.side!==Oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==wl&&(i.blendSrc=this.blendSrc),this.blendDst!==Rl&&(i.blendDst=this.blendDst),this.blendEquation!==ns&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Hc extends Yr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=_d,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ce=new F,ho=new Dt;class Xn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=qu,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ho.fromBufferAttribute(this,e),ho.applyMatrix3(t),this.setXY(e,ho.x,ho.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix3(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Us(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ze(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Us(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Us(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Us(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Us(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array),s=Ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array),s=Ze(s,this.array),r=Ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==qu&&(t.usage=this.usage),t}}class Nd extends Xn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Fd extends Xn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class qe extends Xn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Jv=0;const pn=new ye,Za=new Ye,Cs=new F,cn=new $r,ur=new $r,Ue=new F;class Zn extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jv++}),this.uuid=tr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dd(t)?Fd:Nd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Yt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,i){return pn.makeTranslation(t,e,i),this.applyMatrix4(pn),this}scale(t,e,i){return pn.makeScale(t,e,i),this.applyMatrix4(pn),this}lookAt(t){return Za.lookAt(t),Za.updateMatrix(),this.applyMatrix4(Za.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qe(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $r);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bc);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ur.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(cn.min,ur.min),cn.expandByPoint(Ue),Ue.addVectors(cn.max,ur.max),cn.expandByPoint(Ue)):(cn.expandByPoint(ur.min),cn.expandByPoint(ur.max))}cn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ue));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ue.fromBufferAttribute(a,c),l&&(Cs.fromBufferAttribute(t,c),Ue.add(Cs)),s=Math.max(s,i.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new F,l[I]=new F;const c=new F,u=new F,h=new F,f=new Dt,d=new Dt,_=new Dt,v=new F,m=new F;function p(I,b,M){c.fromBufferAttribute(i,I),u.fromBufferAttribute(i,b),h.fromBufferAttribute(i,M),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,b),_.fromBufferAttribute(r,M),u.sub(c),h.sub(c),d.sub(f),_.sub(f);const U=1/(d.x*_.y-_.x*d.y);isFinite(U)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(U),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(U),a[I].add(v),a[b].add(v),a[M].add(v),l[I].add(m),l[b].add(m),l[M].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.count}]);for(let I=0,b=C.length;I<b;++I){const M=C[I],U=M.start,O=M.count;for(let H=U,Q=U+O;H<Q;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const A=new F,x=new F,D=new F,w=new F;function R(I){D.fromBufferAttribute(s,I),w.copy(D);const b=a[I];A.copy(b),A.sub(D.multiplyScalar(D.dot(b))).normalize(),x.crossVectors(w,b);const U=x.dot(l[I])<0?-1:1;o.setXYZW(I,A.x,A.y,A.z,U)}for(let I=0,b=C.length;I<b;++I){const M=C[I],U=M.start,O=M.count;for(let H=U,Q=U+O;H<Q;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Xn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new F,r=new F,o=new F,a=new F,l=new F,c=new F,u=new F,h=new F;if(t)for(let f=0,d=t.count;f<d;f+=3){const _=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,_=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*u;for(let p=0;p<u;p++)f[_++]=c[d++]}return new Xn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Zn,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ch=new ye,Yi=new zc,fo=new Bc,uh=new F,po=new F,mo=new F,go=new F,Ja=new F,_o=new F,hh=new F,vo=new F;class xe extends Ye{constructor(t=new Zn,e=new Hc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){_o.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Ja.fromBufferAttribute(h,t),o?_o.addScaledVector(Ja,u):_o.addScaledVector(Ja.sub(e),u))}e.add(_o)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fo.copy(i.boundingSphere),fo.applyMatrix4(r),Yi.copy(t.ray).recast(t.near),!(fo.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(fo,uh)===null||Yi.origin.distanceToSquared(uh)>(t.far-t.near)**2))&&(ch.copy(r).invert(),Yi.copy(t.ray).applyMatrix4(ch),!(i.boundingBox!==null&&Yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Yi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=o[m.materialIndex],C=Math.max(m.start,d.start),A=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=C,D=A;x<D;x+=3){const w=a.getX(x),R=a.getX(x+1),I=a.getX(x+2);s=xo(this,p,t,i,c,u,h,w,R,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=_,p=v;m<p;m+=3){const C=a.getX(m),A=a.getX(m+1),x=a.getX(m+2);s=xo(this,o,t,i,c,u,h,C,A,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=o[m.materialIndex],C=Math.max(m.start,d.start),A=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=C,D=A;x<D;x+=3){const w=x,R=x+1,I=x+2;s=xo(this,p,t,i,c,u,h,w,R,I),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=_,p=v;m<p;m+=3){const C=m,A=m+1,x=m+2;s=xo(this,o,t,i,c,u,h,C,A,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Qv(n,t,e,i,s,r,o,a){let l;if(t.side===rn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Oi,a),l===null)return null;vo.copy(a),vo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(vo);return c<e.near||c>e.far?null:{distance:c,point:vo.clone(),object:n}}function xo(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,po),n.getVertexPosition(l,mo),n.getVertexPosition(c,go);const u=Qv(n,t,e,i,po,mo,go,hh);if(u){const h=new F;Cn.getBarycoord(hh,po,mo,go,h),s&&(u.uv=Cn.getInterpolatedAttribute(s,a,l,c,h,new Dt)),r&&(u.uv1=Cn.getInterpolatedAttribute(r,a,l,c,h,new Dt)),o&&(u.normal=Cn.getInterpolatedAttribute(o,a,l,c,h,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new F,materialIndex:0};Cn.getNormal(po,mo,go,f.normal),u.face=f,u.barycoord=h}return u}class Pn extends Zn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new qe(c,3)),this.setAttribute("normal",new qe(u,3)),this.setAttribute("uv",new qe(h,2));function _(v,m,p,C,A,x,D,w,R,I,b){const M=x/R,U=D/I,O=x/2,H=D/2,Q=w/2,ot=R+1,Z=I+1;let it=0,W=0;const _t=new F;for(let Tt=0;Tt<Z;Tt++){const Ct=Tt*U-H;for(let zt=0;zt<ot;zt++){const ae=zt*M-O;_t[v]=ae*C,_t[m]=Ct*A,_t[p]=Q,c.push(_t.x,_t.y,_t.z),_t[v]=0,_t[m]=0,_t[p]=w>0?1:-1,u.push(_t.x,_t.y,_t.z),h.push(zt/R),h.push(1-Tt/I),it+=1}}for(let Tt=0;Tt<I;Tt++)for(let Ct=0;Ct<R;Ct++){const zt=f+Ct+ot*Tt,ae=f+Ct+ot*(Tt+1),st=f+(Ct+1)+ot*(Tt+1),pt=f+(Ct+1)+ot*Tt;l.push(zt,ae,pt),l.push(ae,st,pt),W+=6}a.addGroup(d,W,b),d+=W,f+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Js(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Qe(n){const t={};for(let e=0;e<n.length;e++){const i=Js(n[e]);for(const s in i)t[s]=i[s]}return t}function t0(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Od(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const e0={clone:Js,merge:Qe};var n0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,i0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bi extends Yr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=n0,this.fragmentShader=i0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Js(t.uniforms),this.uniformsGroups=t0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Bd extends Ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=di}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bi=new F,fh=new Dt,dh=new Dt;class _n extends Bd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(yr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,fh,dh),e.subVectors(dh,fh)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(yr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ps=-90,Ds=1;class s0 extends Ye{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new _n(Ps,Ds,t,e);s.layers=this.layers,this.add(s);const r=new _n(Ps,Ds,t,e);r.layers=this.layers,this.add(r);const o=new _n(Ps,Ds,t,e);o.layers=this.layers,this.add(o);const a=new _n(Ps,Ds,t,e);a.layers=this.layers,this.add(a);const l=new _n(Ps,Ds,t,e);l.layers=this.layers,this.add(l);const c=new _n(Ps,Ds,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===di)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===jo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class zd extends on{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Ys,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class r0 extends ds{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new zd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Pn(5,5,5),r=new Bi({name:"CubemapFromEquirect",uniforms:Js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:Pi});r.uniforms.tEquirect.value=e;const o=new xe(s,r),a=e.minFilter;return e.minFilter===as&&(e.minFilter=Vn),new s0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}class Vc{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new te(t),this.near=e,this.far=i}clone(){return new Vc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class o0 extends Ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Qa=new F,a0=new F,l0=new Yt;class Ai{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Qa.subVectors(i,e).cross(a0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Qa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||l0.getNormalMatrix(t),s=this.coplanarPoint(Qa).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qi=new Bc,Mo=new F;class Gc{constructor(t=new Ai,e=new Ai,i=new Ai,s=new Ai,r=new Ai,o=new Ai){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=di){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],d=s[8],_=s[9],v=s[10],m=s[11],p=s[12],C=s[13],A=s[14],x=s[15];if(i[0].setComponents(l-r,f-c,m-d,x-p).normalize(),i[1].setComponents(l+r,f+c,m+d,x+p).normalize(),i[2].setComponents(l+o,f+u,m+_,x+C).normalize(),i[3].setComponents(l-o,f-u,m-_,x-C).normalize(),i[4].setComponents(l-a,f-h,m-v,x-A).normalize(),e===di)i[5].setComponents(l+a,f+h,m+v,x+A).normalize();else if(e===jo)i[5].setComponents(a,h,v,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(t){return qi.center.set(0,0,0),qi.radius=.7071067811865476,qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Mo.x=s.normal.x>0?t.max.x:t.min.x,Mo.y=s.normal.y>0?t.max.y:t.min.y,Mo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Mo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Os extends Ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}class kd extends on{constructor(t,e,i,s,r,o,a,l,c,u=Gs){if(u!==Gs&&u!==Ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Gs&&(i=fs),i===void 0&&u===Ks&&(i=js),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Un,this.minFilter=l!==void 0?l:Un,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class _i{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],f=i[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Dt:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new F,s=[],r=[],o=[],a=new F,l=new ye;for(let d=0;d<=t;d++){const _=d/t;s[d]=this.getTangentAt(_,new F)}r[0]=new F,o[0]=new F;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Kt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,_))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Kt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let _=1;_<=t;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],d*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Hd extends _i{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Dt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class c0 extends Hd{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Wc(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const So=new F,tl=new Wc,el=new Wc,nl=new Wc;class Vd extends _i{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new F){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(So.subVectors(s[0],s[1]).add(s[0]),c=So);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(So.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=So),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),_<1e-4&&(_=v),m<1e-4&&(m=v),tl.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,_,v,m),el.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,_,v,m),nl.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,_,v,m)}else this.curveType==="catmullrom"&&(tl.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),el.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),nl.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(tl.calc(l),el.calc(l),nl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ph(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function u0(n,t){const e=1-n;return e*e*t}function h0(n,t){return 2*(1-n)*n*t}function f0(n,t){return n*n*t}function br(n,t,e,i){return u0(n,t)+h0(n,e)+f0(n,i)}function d0(n,t){const e=1-n;return e*e*e*t}function p0(n,t){const e=1-n;return 3*e*e*n*t}function m0(n,t){return 3*(1-n)*n*n*t}function g0(n,t){return n*n*n*t}function Tr(n,t,e,i,s){return d0(n,t)+p0(n,e)+m0(n,i)+g0(n,s)}class _0 extends _i{constructor(t=new Dt,e=new Dt,i=new Dt,s=new Dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Dt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Tr(t,s.x,r.x,o.x,a.x),Tr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class v0 extends _i{constructor(t=new F,e=new F,i=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new F){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Tr(t,s.x,r.x,o.x,a.x),Tr(t,s.y,r.y,o.y,a.y),Tr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class x0 extends _i{constructor(t=new Dt,e=new Dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Dt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class M0 extends _i{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class S0 extends _i{constructor(t=new Dt,e=new Dt,i=new Dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Dt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(br(t,s.x,r.x,o.x),br(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gd extends _i{constructor(t=new F,e=new F,i=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new F){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(br(t,s.x,r.x,o.x),br(t,s.y,r.y,o.y),br(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class y0 extends _i{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Dt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(ph(a,l.x,c.x,u.x,h.x),ph(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Dt().fromArray(s))}return this}}var E0=Object.freeze({__proto__:null,ArcCurve:c0,CatmullRomCurve3:Vd,CubicBezierCurve:_0,CubicBezierCurve3:v0,EllipseCurve:Hd,LineCurve:x0,LineCurve3:M0,QuadraticBezierCurve:S0,QuadraticBezierCurve3:Gd,SplineCurve:y0});class Li extends Zn{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let _=0;const v=[],m=i/2;let p=0;C(),o===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new qe(h,3)),this.setAttribute("normal",new qe(f,3)),this.setAttribute("uv",new qe(d,2));function C(){const x=new F,D=new F;let w=0;const R=(e-t)/i;for(let I=0;I<=r;I++){const b=[],M=I/r,U=M*(e-t)+t;for(let O=0;O<=s;O++){const H=O/s,Q=H*l+a,ot=Math.sin(Q),Z=Math.cos(Q);D.x=U*ot,D.y=-M*i+m,D.z=U*Z,h.push(D.x,D.y,D.z),x.set(ot,R,Z).normalize(),f.push(x.x,x.y,x.z),d.push(H,1-M),b.push(_++)}v.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){const M=v[b][I],U=v[b+1][I],O=v[b+1][I+1],H=v[b][I+1];(t>0||b!==0)&&(u.push(M,U,H),w+=3),(e>0||b!==r-1)&&(u.push(U,O,H),w+=3)}c.addGroup(p,w,0),p+=w}function A(x){const D=_,w=new Dt,R=new F;let I=0;const b=x===!0?t:e,M=x===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),_++;const U=_;for(let O=0;O<=s;O++){const Q=O/s*l+a,ot=Math.cos(Q),Z=Math.sin(Q);R.x=b*Z,R.y=m*M,R.z=b*ot,h.push(R.x,R.y,R.z),f.push(0,M,0),w.x=ot*.5+.5,w.y=Z*.5*M+.5,d.push(w.x,w.y),_++}for(let O=0;O<s;O++){const H=D+O,Q=U+O;x===!0?u.push(Q,Q+1,H):u.push(Q+1,Q,H),I+=3}c.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xc extends Li{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Xc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qr extends Zn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,d=[],_=[],v=[],m=[];for(let p=0;p<u;p++){const C=p*f-o;for(let A=0;A<c;A++){const x=A*h-r;_.push(x,-C,0),v.push(0,0,1),m.push(A/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let C=0;C<a;C++){const A=C+c*p,x=C+c*(p+1),D=C+1+c*(p+1),w=C+1+c*p;d.push(A,x,w),d.push(x,D,w)}this.setIndex(d),this.setAttribute("position",new qe(_,3)),this.setAttribute("normal",new qe(v,3)),this.setAttribute("uv",new qe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qr(t.width,t.height,t.widthSegments,t.heightSegments)}}class Zo extends Zn{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new F,f=new F,d=[],_=[],v=[],m=[];for(let p=0;p<=i;p++){const C=[],A=p/i;let x=0;p===0&&o===0?x=.5/e:p===i&&l===Math.PI&&(x=-.5/e);for(let D=0;D<=e;D++){const w=D/e;h.x=-t*Math.cos(s+w*r)*Math.sin(o+A*a),h.y=t*Math.cos(o+A*a),h.z=t*Math.sin(s+w*r)*Math.sin(o+A*a),_.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(w+x,1-A),C.push(c++)}u.push(C)}for(let p=0;p<i;p++)for(let C=0;C<e;C++){const A=u[p][C+1],x=u[p][C],D=u[p+1][C],w=u[p+1][C+1];(p!==0||o>0)&&d.push(A,x,w),(p!==i-1||l<Math.PI)&&d.push(x,D,w)}this.setIndex(d),this.setAttribute("position",new qe(_,3)),this.setAttribute("normal",new qe(v,3)),this.setAttribute("uv",new qe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class $c extends Zn{constructor(t=new Gd(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new F,l=new F,c=new Dt;let u=new F;const h=[],f=[],d=[],_=[];v(),this.setIndex(_),this.setAttribute("position",new qe(h,3)),this.setAttribute("normal",new qe(f,3)),this.setAttribute("uv",new qe(d,2));function v(){for(let A=0;A<e;A++)m(A);m(r===!1?e:0),C(),p()}function m(A){u=t.getPointAt(A/e,u);const x=o.normals[A],D=o.binormals[A];for(let w=0;w<=s;w++){const R=w/s*Math.PI*2,I=Math.sin(R),b=-Math.cos(R);l.x=b*x.x+I*D.x,l.y=b*x.y+I*D.y,l.z=b*x.z+I*D.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,h.push(a.x,a.y,a.z)}}function p(){for(let A=1;A<=e;A++)for(let x=1;x<=s;x++){const D=(s+1)*(A-1)+(x-1),w=(s+1)*A+(x-1),R=(s+1)*A+x,I=(s+1)*(A-1)+x;_.push(D,w,I),_.push(w,R,I)}}function C(){for(let A=0;A<=e;A++)for(let x=0;x<=s;x++)c.x=A/e,c.y=x/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new $c(new E0[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class ci extends Yr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cd,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class b0 extends Yr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class T0 extends Yr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Wd extends Ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const il=new ye,mh=new F,gh=new F;class A0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gc,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new Ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;mh.setFromMatrixPosition(t.matrixWorld),e.position.copy(mh),gh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(gh),e.updateMatrixWorld(),il.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(il),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(il)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Xd extends Bd{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class w0 extends A0{constructor(){super(new Xd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _h extends Wd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.target=new Ye,this.shadow=new w0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class R0 extends Wd{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class C0 extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}const vh=new ye;class P0{constructor(t,e,i=0,s=1/0){this.ray=new zc(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new kc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return vh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vh),this}intersectObject(t,e=!0,i=[]){return fc(t,this,i,e),i.sort(xh),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)fc(t[s],this,i,e);return i.sort(xh),i}}function xh(n,t){return n.distance-t.distance}function fc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)fc(r[o],t,e,!0)}}class Mh{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class D0 extends gs{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Sh(n,t,e,i){const s=L0(i);switch(e){case yd:return n*t;case bd:return n*t;case Td:return n*t*2;case Ad:return n*t/s.components*s.byteLength;case Uc:return n*t/s.components*s.byteLength;case wd:return n*t*2/s.components*s.byteLength;case Nc:return n*t*2/s.components*s.byteLength;case Ed:return n*t*3/s.components*s.byteLength;case Dn:return n*t*4/s.components*s.byteLength;case Fc:return n*t*4/s.components*s.byteLength;case Po:case Do:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Lo:case Io:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Hl:case Gl:return Math.max(n,16)*Math.max(t,8)/4;case kl:case Vl:return Math.max(n,8)*Math.max(t,8)/2;case Wl:case Xl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case $l:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Yl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ql:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case jl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Kl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Zl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Jl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ql:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case tc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ec:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case nc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ic:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case sc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case rc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case oc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Uo:case ac:case lc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Rd:case cc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case uc:case hc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function L0(n){switch(n){case mi:case xd:return{byteLength:1,components:1};case Br:case Md:case Xr:return{byteLength:2,components:1};case Lc:case Ic:return{byteLength:2,components:4};case fs:case Dc:case fi:return{byteLength:4,components:1};case Sd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pc);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $d(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function I0(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){const _=h[f],v=h[d];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){const v=h[d];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var U0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N0=`#ifdef USE_ALPHAHASH
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
#endif`,F0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,O0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,z0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,k0=`#ifdef USE_AOMAP
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
#endif`,H0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,V0=`#ifdef USE_BATCHING
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
#endif`,G0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,W0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,X0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Y0=`#ifdef USE_IRIDESCENCE
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
#endif`,q0=`#ifdef USE_BUMPMAP
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
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ex=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ix=`#define PI 3.141592653589793
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
} // validated`,sx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rx=`vec3 transformedNormal = objectNormal;
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
#endif`,ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ux="gl_FragColor = linearToOutputTexel( gl_FragColor );",hx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fx=`#ifdef USE_ENVMAP
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
#endif`,dx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,px=`#ifdef USE_ENVMAP
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
#endif`,mx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
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
#endif`,_x=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sx=`#ifdef USE_GRADIENTMAP
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
}`,yx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ex=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tx=`uniform bool receiveShadow;
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
#endif`,Ax=`#ifdef USE_ENVMAP
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
#endif`,wx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dx=`PhysicalMaterial material;
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
#endif`,Lx=`struct PhysicalMaterial {
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
}`,Ix=`
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
#endif`,Ux=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ox=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gx=`#if defined( USE_POINTS_UV )
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
#endif`,Wx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$x=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jx=`#ifdef USE_MORPHTARGETS
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
#endif`,Kx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nM=`#ifdef USE_NORMALMAP
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
#endif`,iM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_M=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vM=`float getShadowMask() {
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
}`,xM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MM=`#ifdef USE_SKINNING
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
#endif`,SM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yM=`#ifdef USE_SKINNING
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
#endif`,EM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,TM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wM=`#ifdef USE_TRANSMISSION
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
#endif`,RM=`#ifdef USE_TRANSMISSION
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
#endif`,CM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,PM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,DM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,LM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const IM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,UM=`uniform sampler2D t2D;
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
}`,NM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,OM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zM=`#include <common>
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
}`,kM=`#if DEPTH_PACKING == 3200
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
}`,HM=`#define DISTANCE
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
}`,VM=`#define DISTANCE
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
}`,GM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XM=`uniform float scale;
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
}`,$M=`uniform vec3 diffuse;
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
}`,YM=`#include <common>
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
}`,qM=`uniform vec3 diffuse;
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
}`,jM=`#define LAMBERT
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
}`,KM=`#define LAMBERT
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
}`,ZM=`#define MATCAP
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
}`,JM=`#define MATCAP
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
}`,QM=`#define NORMAL
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
}`,tS=`#define NORMAL
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
}`,eS=`#define PHONG
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
}`,nS=`#define PHONG
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
}`,iS=`#define STANDARD
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
}`,sS=`#define STANDARD
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
}`,rS=`#define TOON
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
}`,oS=`#define TOON
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
}`,aS=`uniform float size;
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
}`,lS=`uniform vec3 diffuse;
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
}`,cS=`#include <common>
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
}`,uS=`uniform vec3 color;
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
}`,hS=`uniform float rotation;
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
}`,fS=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:U0,alphahash_pars_fragment:N0,alphamap_fragment:F0,alphamap_pars_fragment:O0,alphatest_fragment:B0,alphatest_pars_fragment:z0,aomap_fragment:k0,aomap_pars_fragment:H0,batching_pars_vertex:V0,batching_vertex:G0,begin_vertex:W0,beginnormal_vertex:X0,bsdfs:$0,iridescence_fragment:Y0,bumpmap_pars_fragment:q0,clipping_planes_fragment:j0,clipping_planes_pars_fragment:K0,clipping_planes_pars_vertex:Z0,clipping_planes_vertex:J0,color_fragment:Q0,color_pars_fragment:tx,color_pars_vertex:ex,color_vertex:nx,common:ix,cube_uv_reflection_fragment:sx,defaultnormal_vertex:rx,displacementmap_pars_vertex:ox,displacementmap_vertex:ax,emissivemap_fragment:lx,emissivemap_pars_fragment:cx,colorspace_fragment:ux,colorspace_pars_fragment:hx,envmap_fragment:fx,envmap_common_pars_fragment:dx,envmap_pars_fragment:px,envmap_pars_vertex:mx,envmap_physical_pars_fragment:Ax,envmap_vertex:gx,fog_vertex:_x,fog_pars_vertex:vx,fog_fragment:xx,fog_pars_fragment:Mx,gradientmap_pars_fragment:Sx,lightmap_pars_fragment:yx,lights_lambert_fragment:Ex,lights_lambert_pars_fragment:bx,lights_pars_begin:Tx,lights_toon_fragment:wx,lights_toon_pars_fragment:Rx,lights_phong_fragment:Cx,lights_phong_pars_fragment:Px,lights_physical_fragment:Dx,lights_physical_pars_fragment:Lx,lights_fragment_begin:Ix,lights_fragment_maps:Ux,lights_fragment_end:Nx,logdepthbuf_fragment:Fx,logdepthbuf_pars_fragment:Ox,logdepthbuf_pars_vertex:Bx,logdepthbuf_vertex:zx,map_fragment:kx,map_pars_fragment:Hx,map_particle_fragment:Vx,map_particle_pars_fragment:Gx,metalnessmap_fragment:Wx,metalnessmap_pars_fragment:Xx,morphinstance_vertex:$x,morphcolor_vertex:Yx,morphnormal_vertex:qx,morphtarget_pars_vertex:jx,morphtarget_vertex:Kx,normal_fragment_begin:Zx,normal_fragment_maps:Jx,normal_pars_fragment:Qx,normal_pars_vertex:tM,normal_vertex:eM,normalmap_pars_fragment:nM,clearcoat_normal_fragment_begin:iM,clearcoat_normal_fragment_maps:sM,clearcoat_pars_fragment:rM,iridescence_pars_fragment:oM,opaque_fragment:aM,packing:lM,premultiplied_alpha_fragment:cM,project_vertex:uM,dithering_fragment:hM,dithering_pars_fragment:fM,roughnessmap_fragment:dM,roughnessmap_pars_fragment:pM,shadowmap_pars_fragment:mM,shadowmap_pars_vertex:gM,shadowmap_vertex:_M,shadowmask_pars_fragment:vM,skinbase_vertex:xM,skinning_pars_vertex:MM,skinning_vertex:SM,skinnormal_vertex:yM,specularmap_fragment:EM,specularmap_pars_fragment:bM,tonemapping_fragment:TM,tonemapping_pars_fragment:AM,transmission_fragment:wM,transmission_pars_fragment:RM,uv_pars_fragment:CM,uv_pars_vertex:PM,uv_vertex:DM,worldpos_vertex:LM,background_vert:IM,background_frag:UM,backgroundCube_vert:NM,backgroundCube_frag:FM,cube_vert:OM,cube_frag:BM,depth_vert:zM,depth_frag:kM,distanceRGBA_vert:HM,distanceRGBA_frag:VM,equirect_vert:GM,equirect_frag:WM,linedashed_vert:XM,linedashed_frag:$M,meshbasic_vert:YM,meshbasic_frag:qM,meshlambert_vert:jM,meshlambert_frag:KM,meshmatcap_vert:ZM,meshmatcap_frag:JM,meshnormal_vert:QM,meshnormal_frag:tS,meshphong_vert:eS,meshphong_frag:nS,meshphysical_vert:iS,meshphysical_frag:sS,meshtoon_vert:rS,meshtoon_frag:oS,points_vert:aS,points_frag:lS,shadow_vert:cS,shadow_frag:uS,sprite_vert:hS,sprite_frag:fS},xt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},zn={basic:{uniforms:Qe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Qe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new te(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Qe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Qe([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Qe([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new te(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Qe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Qe([xt.points,xt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Qe([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Qe([xt.common,xt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Qe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Qe([xt.sprite,xt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:Qe([xt.common,xt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:Qe([xt.lights,xt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};zn.physical={uniforms:Qe([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const yo={r:0,b:0,g:0},ji=new Kn,dS=new ye;function pS(n,t,e,i,s,r,o){const a=new te(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function _(A){let x=A.isScene===!0?A.background:null;return x&&x.isTexture&&(x=(A.backgroundBlurriness>0?e:t).get(x)),x}function v(A){let x=!1;const D=_(A);D===null?p(a,l):D&&D.isColor&&(p(D,1),x=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(A,x){const D=_(x);D&&(D.isCubeTexture||D.mapping===da)?(u===void 0&&(u=new xe(new Pn(1,1,1),new Bi({name:"BackgroundCubeMaterial",uniforms:Js(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ji.copy(x.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),u.material.uniforms.envMap.value=D,u.material.uniforms.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(dS.makeRotationFromEuler(ji)),u.material.toneMapped=se.getTransfer(D.colorSpace)!==pe,(h!==D||f!==D.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=D,f=D.version,d=n.toneMapping),u.layers.enableAll(),A.unshift(u,u.geometry,u.material,0,0,null)):D&&D.isTexture&&(c===void 0&&(c=new xe(new qr(2,2),new Bi({name:"BackgroundMaterial",uniforms:Js(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=D,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=se.getTransfer(D.colorSpace)!==pe,D.matrixAutoUpdate===!0&&D.updateMatrix(),c.material.uniforms.uvTransform.value.copy(D.matrix),(h!==D||f!==D.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=D,f=D.version,d=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function p(A,x){A.getRGB(yo,Od(n)),i.buffers.color.setClear(yo.r,yo.g,yo.b,x,o)}function C(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(A,x=1){a.set(A),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,p(a,l)},render:v,addToRenderList:m,dispose:C}}function mS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(M,U,O,H,Q){let ot=!1;const Z=h(H,O,U);r!==Z&&(r=Z,c(r.object)),ot=d(M,H,O,Q),ot&&_(M,H,O,Q),Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(ot||o)&&(o=!1,x(M,U,O,H),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function h(M,U,O){const H=O.wireframe===!0;let Q=i[M.id];Q===void 0&&(Q={},i[M.id]=Q);let ot=Q[U.id];ot===void 0&&(ot={},Q[U.id]=ot);let Z=ot[H];return Z===void 0&&(Z=f(l()),ot[H]=Z),Z}function f(M){const U=[],O=[],H=[];for(let Q=0;Q<e;Q++)U[Q]=0,O[Q]=0,H[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:O,attributeDivisors:H,object:M,attributes:{},index:null}}function d(M,U,O,H){const Q=r.attributes,ot=U.attributes;let Z=0;const it=O.getAttributes();for(const W in it)if(it[W].location>=0){const Tt=Q[W];let Ct=ot[W];if(Ct===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Ct=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Ct=M.instanceColor)),Tt===void 0||Tt.attribute!==Ct||Ct&&Tt.data!==Ct.data)return!0;Z++}return r.attributesNum!==Z||r.index!==H}function _(M,U,O,H){const Q={},ot=U.attributes;let Z=0;const it=O.getAttributes();for(const W in it)if(it[W].location>=0){let Tt=ot[W];Tt===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Tt=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Tt=M.instanceColor));const Ct={};Ct.attribute=Tt,Tt&&Tt.data&&(Ct.data=Tt.data),Q[W]=Ct,Z++}r.attributes=Q,r.attributesNum=Z,r.index=H}function v(){const M=r.newAttributes;for(let U=0,O=M.length;U<O;U++)M[U]=0}function m(M){p(M,0)}function p(M,U){const O=r.newAttributes,H=r.enabledAttributes,Q=r.attributeDivisors;O[M]=1,H[M]===0&&(n.enableVertexAttribArray(M),H[M]=1),Q[M]!==U&&(n.vertexAttribDivisor(M,U),Q[M]=U)}function C(){const M=r.newAttributes,U=r.enabledAttributes;for(let O=0,H=U.length;O<H;O++)U[O]!==M[O]&&(n.disableVertexAttribArray(O),U[O]=0)}function A(M,U,O,H,Q,ot,Z){Z===!0?n.vertexAttribIPointer(M,U,O,Q,ot):n.vertexAttribPointer(M,U,O,H,Q,ot)}function x(M,U,O,H){v();const Q=H.attributes,ot=O.getAttributes(),Z=U.defaultAttributeValues;for(const it in ot){const W=ot[it];if(W.location>=0){let _t=Q[it];if(_t===void 0&&(it==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),it==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor)),_t!==void 0){const Tt=_t.normalized,Ct=_t.itemSize,zt=t.get(_t);if(zt===void 0)continue;const ae=zt.buffer,st=zt.type,pt=zt.bytesPerElement,Rt=st===n.INT||st===n.UNSIGNED_INT||_t.gpuType===Dc;if(_t.isInterleavedBufferAttribute){const vt=_t.data,Bt=vt.stride,kt=_t.offset;if(vt.isInstancedInterleavedBuffer){for(let Zt=0;Zt<W.locationSize;Zt++)p(W.location+Zt,vt.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Zt=0;Zt<W.locationSize;Zt++)m(W.location+Zt);n.bindBuffer(n.ARRAY_BUFFER,ae);for(let Zt=0;Zt<W.locationSize;Zt++)A(W.location+Zt,Ct/W.locationSize,st,Tt,Bt*pt,(kt+Ct/W.locationSize*Zt)*pt,Rt)}else{if(_t.isInstancedBufferAttribute){for(let vt=0;vt<W.locationSize;vt++)p(W.location+vt,_t.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let vt=0;vt<W.locationSize;vt++)m(W.location+vt);n.bindBuffer(n.ARRAY_BUFFER,ae);for(let vt=0;vt<W.locationSize;vt++)A(W.location+vt,Ct/W.locationSize,st,Tt,Ct*pt,Ct/W.locationSize*vt*pt,Rt)}}else if(Z!==void 0){const Tt=Z[it];if(Tt!==void 0)switch(Tt.length){case 2:n.vertexAttrib2fv(W.location,Tt);break;case 3:n.vertexAttrib3fv(W.location,Tt);break;case 4:n.vertexAttrib4fv(W.location,Tt);break;default:n.vertexAttrib1fv(W.location,Tt)}}}}C()}function D(){I();for(const M in i){const U=i[M];for(const O in U){const H=U[O];for(const Q in H)u(H[Q].object),delete H[Q];delete U[O]}delete i[M]}}function w(M){if(i[M.id]===void 0)return;const U=i[M.id];for(const O in U){const H=U[O];for(const Q in H)u(H[Q].object),delete H[Q];delete U[O]}delete i[M.id]}function R(M){for(const U in i){const O=i[U];if(O[M.id]===void 0)continue;const H=O[M.id];for(const Q in H)u(H[Q].object),delete H[Q];delete O[M.id]}}function I(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:b,dispose:D,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:C}}function gS(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let _=0;_<h;_++)d+=u[_];e.update(d,i,1)}function l(c,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let _=0;for(let v=0;v<h;v++)_+=u[v]*f[v];e.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _S(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Dn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const I=R===Xr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==mi&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==fi&&!I)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=_>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:C,maxVaryings:A,maxFragmentUniforms:x,vertexTextures:D,maxSamples:w}}function vS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Ai,a=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{const C=r?0:i,A=C*4;let x=p.clippingState||null;l.value=x,x=u(_,f,A,d);for(let D=0;D!==A;++D)x[D]=e[D];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,_){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const p=d+v*4,C=f.matrixWorldInverse;a.getNormalMatrix(C),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,x=d;A!==v;++A,x+=4)o.copy(h[A]).applyMatrix4(C,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function xS(n){let t=new WeakMap;function e(o,a){return a===Fl?o.mapping=Ys:a===Ol&&(o.mapping=qs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Fl||a===Ol)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new r0(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const Bs=4,yh=[.125,.215,.35,.446,.526,.582],is=20,sl=new Xd,Eh=new te;let rl=null,ol=0,al=0,ll=!1;const Qi=(1+Math.sqrt(5))/2,Ls=1/Qi,bh=[new F(-Qi,Ls,0),new F(Qi,Ls,0),new F(-Ls,0,Qi),new F(Ls,0,Qi),new F(0,Qi,-Ls),new F(0,Qi,Ls),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Th{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){rl=this._renderer.getRenderTarget(),ol=this._renderer.getActiveCubeFace(),al=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(rl,ol,al),this._renderer.xr.enabled=ll,t.scissorTest=!1,Eo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ys||t.mapping===qs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rl=this._renderer.getRenderTarget(),ol=this._renderer.getActiveCubeFace(),al=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:Xr,format:Dn,colorSpace:Zs,depthBuffer:!1},s=Ah(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=MS(r)),this._blurMaterial=SS(r,t,e)}return s}_compileMaterial(t){const e=new xe(this._lodPlanes[0],t);this._renderer.compile(e,sl)}_sceneToCubeUV(t,e,i,s){const a=new _n(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Eh),u.toneMapping=Di,u.autoClear=!1;const d=new Hc({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),_=new xe(new Pn,d);let v=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(Eh),v=!0);for(let p=0;p<6;p++){const C=p%3;C===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):C===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const A=this._cubeSize;Eo(s,C*A,p>2?A:0,A,A),u.setRenderTarget(s),v&&u.render(_,a),u.render(t,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ys||t.mapping===qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new xe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Eo(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,sl)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=bh[(s-r-1)%bh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new xe(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*is-1),v=r/_,m=isFinite(r)?1+Math.floor(u*v):is;m>is&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${is}`);const p=[];let C=0;for(let R=0;R<is;++R){const I=R/v,b=Math.exp(-I*I/2);p.push(b),R===0?C+=b:R<m&&(C+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/C;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:A}=this;f.dTheta.value=_,f.mipInt.value=A-i;const x=this._sizeLods[s],D=3*x*(s>A-Bs?s-A+Bs:0),w=4*(this._cubeSize-x);Eo(e,D,w,3*x,2*x),l.setRenderTarget(e),l.render(h,sl)}}function MS(n){const t=[],e=[],i=[];let s=n;const r=n-Bs+1+yh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Bs?l=yh[o-n+Bs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,v=3,m=2,p=1,C=new Float32Array(v*_*d),A=new Float32Array(m*_*d),x=new Float32Array(p*_*d);for(let w=0;w<d;w++){const R=w%3*2/3-1,I=w>2?0:-1,b=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];C.set(b,v*_*w),A.set(f,m*_*w);const M=[w,w,w,w,w,w];x.set(M,p*_*w)}const D=new Zn;D.setAttribute("position",new Xn(C,v)),D.setAttribute("uv",new Xn(A,m)),D.setAttribute("faceIndex",new Xn(x,p)),t.push(D),s>Bs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ah(n,t,e){const i=new ds(n,t,e);return i.texture.mapping=da,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Eo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function SS(n,t,e){const i=new Float32Array(is),s=new F(0,1,0);return new Bi({name:"SphericalGaussianBlur",defines:{n:is,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Yc(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function wh(){return new Bi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yc(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Rh(){return new Bi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Yc(){return`

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
	`}function yS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Fl||l===Ol,u=l===Ys||l===qs;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Th(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(e===null&&(e=new Th(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function ES(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Ns("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function bS(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,_=h.attributes.position;let v=0;if(d!==null){const C=d.array;v=d.version;for(let A=0,x=C.length;A<x;A+=3){const D=C[A+0],w=C[A+1],R=C[A+2];f.push(D,w,w,R,R,D)}}else if(_!==void 0){const C=_.array;v=_.version;for(let A=0,x=C.length/3-1;A<x;A+=3){const D=A+0,w=A+1,R=A+2;f.push(D,w,w,R,R,D)}}else return;const m=new(Dd(f)?Fd:Nd)(f,1);m.version=v;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function TS(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function c(f,d,_){_!==0&&(n.drawElementsInstanced(i,d,r,f*o,_),e.update(d,i,_))}function u(f,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];e.update(m,i,1)}function h(f,d,_,v){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,v,0,_);let p=0;for(let C=0;C<_;C++)p+=d[C]*v[C];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function AS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function wS(n,t,e){const i=new WeakMap,s=new Ae;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let M=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],C=a.morphAttributes.normal||[],A=a.morphAttributes.color||[];let x=0;_===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let D=a.attributes.position.count*x,w=1;D>t.maxTextureSize&&(w=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const R=new Float32Array(D*w*4*h),I=new Id(R,D,w,h);I.type=fi,I.needsUpdate=!0;const b=x*4;for(let U=0;U<h;U++){const O=p[U],H=C[U],Q=A[U],ot=D*w*4*U;for(let Z=0;Z<O.count;Z++){const it=Z*b;_===!0&&(s.fromBufferAttribute(O,Z),R[ot+it+0]=s.x,R[ot+it+1]=s.y,R[ot+it+2]=s.z,R[ot+it+3]=0),v===!0&&(s.fromBufferAttribute(H,Z),R[ot+it+4]=s.x,R[ot+it+5]=s.y,R[ot+it+6]=s.z,R[ot+it+7]=0),m===!0&&(s.fromBufferAttribute(Q,Z),R[ot+it+8]=s.x,R[ot+it+9]=s.y,R[ot+it+10]=s.z,R[ot+it+11]=Q.itemSize===4?s.w:1)}}f={count:h,texture:I,size:new Dt(D,w)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const v=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function RS(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Yd=new on,Ch=new kd(1,1),qd=new Id,jd=new Gv,Kd=new zd,Ph=[],Dh=[],Lh=new Float32Array(16),Ih=new Float32Array(9),Uh=new Float32Array(4);function er(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Ph[s];if(r===void 0&&(r=new Float32Array(s),Ph[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Le(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ie(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function pa(n,t){let e=Dh[t];e===void 0&&(e=new Int32Array(t),Dh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function CS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function PS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2fv(this.addr,t),Ie(e,t)}}function DS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;n.uniform3fv(this.addr,t),Ie(e,t)}}function LS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4fv(this.addr,t),Ie(e,t)}}function IS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,i))return;Uh.set(i),n.uniformMatrix2fv(this.addr,!1,Uh),Ie(e,i)}}function US(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,i))return;Ih.set(i),n.uniformMatrix3fv(this.addr,!1,Ih),Ie(e,i)}}function NS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,i))return;Lh.set(i),n.uniformMatrix4fv(this.addr,!1,Lh),Ie(e,i)}}function FS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function OS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2iv(this.addr,t),Ie(e,t)}}function BS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3iv(this.addr,t),Ie(e,t)}}function zS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4iv(this.addr,t),Ie(e,t)}}function kS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function HS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2uiv(this.addr,t),Ie(e,t)}}function VS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3uiv(this.addr,t),Ie(e,t)}}function GS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4uiv(this.addr,t),Ie(e,t)}}function WS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ch.compareFunction=Pd,r=Ch):r=Yd,e.setTexture2D(t||r,s)}function XS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||jd,s)}function $S(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Kd,s)}function YS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||qd,s)}function qS(n){switch(n){case 5126:return CS;case 35664:return PS;case 35665:return DS;case 35666:return LS;case 35674:return IS;case 35675:return US;case 35676:return NS;case 5124:case 35670:return FS;case 35667:case 35671:return OS;case 35668:case 35672:return BS;case 35669:case 35673:return zS;case 5125:return kS;case 36294:return HS;case 36295:return VS;case 36296:return GS;case 35678:case 36198:case 36298:case 36306:case 35682:return WS;case 35679:case 36299:case 36307:return XS;case 35680:case 36300:case 36308:case 36293:return $S;case 36289:case 36303:case 36311:case 36292:return YS}}function jS(n,t){n.uniform1fv(this.addr,t)}function KS(n,t){const e=er(t,this.size,2);n.uniform2fv(this.addr,e)}function ZS(n,t){const e=er(t,this.size,3);n.uniform3fv(this.addr,e)}function JS(n,t){const e=er(t,this.size,4);n.uniform4fv(this.addr,e)}function QS(n,t){const e=er(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function ty(n,t){const e=er(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function ey(n,t){const e=er(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ny(n,t){n.uniform1iv(this.addr,t)}function iy(n,t){n.uniform2iv(this.addr,t)}function sy(n,t){n.uniform3iv(this.addr,t)}function ry(n,t){n.uniform4iv(this.addr,t)}function oy(n,t){n.uniform1uiv(this.addr,t)}function ay(n,t){n.uniform2uiv(this.addr,t)}function ly(n,t){n.uniform3uiv(this.addr,t)}function cy(n,t){n.uniform4uiv(this.addr,t)}function uy(n,t,e){const i=this.cache,s=t.length,r=pa(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Yd,r[o])}function hy(n,t,e){const i=this.cache,s=t.length,r=pa(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||jd,r[o])}function fy(n,t,e){const i=this.cache,s=t.length,r=pa(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Kd,r[o])}function dy(n,t,e){const i=this.cache,s=t.length,r=pa(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||qd,r[o])}function py(n){switch(n){case 5126:return jS;case 35664:return KS;case 35665:return ZS;case 35666:return JS;case 35674:return QS;case 35675:return ty;case 35676:return ey;case 5124:case 35670:return ny;case 35667:case 35671:return iy;case 35668:case 35672:return sy;case 35669:case 35673:return ry;case 5125:return oy;case 36294:return ay;case 36295:return ly;case 36296:return cy;case 35678:case 36198:case 36298:case 36306:case 35682:return uy;case 35679:case 36299:case 36307:return hy;case 35680:case 36300:case 36308:case 36293:return fy;case 36289:case 36303:case 36311:case 36292:return dy}}class my{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=qS(e.type)}}class gy{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=py(e.type)}}class _y{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const cl=/(\w+)(\])?(\[|\.)?/g;function Nh(n,t){n.seq.push(t),n.map[t.id]=t}function vy(n,t,e){const i=n.name,s=i.length;for(cl.lastIndex=0;;){const r=cl.exec(i),o=cl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Nh(e,c===void 0?new my(a,n,t):new gy(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new _y(a),Nh(e,h)),e=h}}}class No{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);vy(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Fh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const xy=37297;let My=0;function Sy(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Oh=new Yt;function yy(n){se._getMatrix(Oh,se.workingColorSpace,n);const t=`mat3( ${Oh.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(n)){case qo:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Bh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Sy(n.getShaderSource(t),o)}else return s}function Ey(n,t){const e=yy(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function by(n,t){let e;switch(t){case tv:e="Linear";break;case ev:e="Reinhard";break;case nv:e="Cineon";break;case iv:e="ACESFilmic";break;case rv:e="AgX";break;case ov:e="Neutral";break;case sv:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const bo=new F;function Ty(){se.getLuminanceCoefficients(bo);const n=bo.x.toFixed(4),t=bo.y.toFixed(4),e=bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ay(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function wy(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ry(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function pr(n){return n!==""}function zh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cy=/^[ \t]*#include +<([\w\d./]+)>/gm;function dc(n){return n.replace(Cy,Dy)}const Py=new Map;function Dy(n,t){let e=jt[t];if(e===void 0){const i=Py.get(t);if(i!==void 0)e=jt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return dc(e)}const Ly=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hh(n){return n.replace(Ly,Iy)}function Iy(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Uy(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===gd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===I_?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===oi&&(t="SHADOWMAP_TYPE_VSM"),t}function Ny(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ys:case qs:t="ENVMAP_TYPE_CUBE";break;case da:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Fy(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case qs:t="ENVMAP_MODE_REFRACTION";break}return t}function Oy(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case _d:t="ENVMAP_BLENDING_MULTIPLY";break;case J_:t="ENVMAP_BLENDING_MIX";break;case Q_:t="ENVMAP_BLENDING_ADD";break}return t}function By(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function zy(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Uy(e),c=Ny(e),u=Fy(e),h=Oy(e),f=By(e),d=Ay(e),_=wy(r),v=s.createProgram();let m,p,C=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(pr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(pr).join(`
`),p.length>0&&(p+=`
`)):(m=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),p=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Di?"#define TONE_MAPPING":"",e.toneMapping!==Di?jt.tonemapping_pars_fragment:"",e.toneMapping!==Di?by("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,Ey("linearToOutputTexel",e.outputColorSpace),Ty(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(pr).join(`
`)),o=dc(o),o=zh(o,e),o=kh(o,e),a=dc(a),a=zh(a,e),a=kh(a,e),o=Hh(o),a=Hh(a),e.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ju?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ju?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=C+m+o,x=C+p+a,D=Fh(s,s.VERTEX_SHADER,A),w=Fh(s,s.FRAGMENT_SHADER,x);s.attachShader(v,D),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(U){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(v).trim(),H=s.getShaderInfoLog(D).trim(),Q=s.getShaderInfoLog(w).trim();let ot=!0,Z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(ot=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,D,w);else{const it=Bh(s,D,"vertex"),W=Bh(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+O+`
`+it+`
`+W)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(H===""||Q==="")&&(Z=!1);Z&&(U.diagnostics={runnable:ot,programLog:O,vertexShader:{log:H,prefix:m},fragmentShader:{log:Q,prefix:p}})}s.deleteShader(D),s.deleteShader(w),I=new No(s,v),b=Ry(s,v)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,xy)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=My++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=D,this.fragmentShader=w,this}let ky=0;class Hy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Vy(t),e.set(t,i)),i}}class Vy{constructor(t){this.id=ky++,this.code=t,this.usedTimes=0}}function Gy(n,t,e,i,s,r,o){const a=new kc,l=new Hy,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,U,O,H){const Q=O.fog,ot=H.geometry,Z=b.isMeshStandardMaterial?O.environment:null,it=(b.isMeshStandardMaterial?e:t).get(b.envMap||Z),W=it&&it.mapping===da?it.image.height:null,_t=_[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const Tt=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Ct=Tt!==void 0?Tt.length:0;let zt=0;ot.morphAttributes.position!==void 0&&(zt=1),ot.morphAttributes.normal!==void 0&&(zt=2),ot.morphAttributes.color!==void 0&&(zt=3);let ae,st,pt,Rt;if(_t){const fe=zn[_t];ae=fe.vertexShader,st=fe.fragmentShader}else ae=b.vertexShader,st=b.fragmentShader,l.update(b),pt=l.getVertexShaderID(b),Rt=l.getFragmentShaderID(b);const vt=n.getRenderTarget(),Bt=n.state.buffers.depth.getReversed(),kt=H.isInstancedMesh===!0,Zt=H.isBatchedMesh===!0,P=!!b.map,L=!!b.matcap,X=!!it,T=!!b.aoMap,nt=!!b.lightMap,j=!!b.bumpMap,rt=!!b.normalMap,K=!!b.displacementMap,at=!!b.emissiveMap,V=!!b.metalnessMap,y=!!b.roughnessMap,g=b.anisotropy>0,N=b.clearcoat>0,G=b.dispersion>0,J=b.iridescence>0,q=b.sheen>0,mt=b.transmission>0,ht=g&&!!b.anisotropyMap,gt=N&&!!b.clearcoatMap,Ht=N&&!!b.clearcoatNormalMap,ct=N&&!!b.clearcoatRoughnessMap,St=J&&!!b.iridescenceMap,Nt=J&&!!b.iridescenceThicknessMap,It=q&&!!b.sheenColorMap,Mt=q&&!!b.sheenRoughnessMap,Jt=!!b.specularMap,Wt=!!b.specularColorMap,_e=!!b.specularIntensityMap,B=mt&&!!b.transmissionMap,yt=mt&&!!b.thicknessMap,tt=!!b.gradientMap,lt=!!b.alphaMap,At=b.alphaTest>0,bt=!!b.alphaHash,$t=!!b.extensions;let be=Di;b.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(be=n.toneMapping);const ke={shaderID:_t,shaderType:b.type,shaderName:b.name,vertexShader:ae,fragmentShader:st,defines:b.defines,customVertexShaderID:pt,customFragmentShaderID:Rt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Zt,batchingColor:Zt&&H._colorsTexture!==null,instancing:kt,instancingColor:kt&&H.instanceColor!==null,instancingMorph:kt&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:vt===null?n.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Zs,alphaToCoverage:!!b.alphaToCoverage,map:P,matcap:L,envMap:X,envMapMode:X&&it.mapping,envMapCubeUVHeight:W,aoMap:T,lightMap:nt,bumpMap:j,normalMap:rt,displacementMap:f&&K,emissiveMap:at,normalMapObjectSpace:rt&&b.normalMapType===uv,normalMapTangentSpace:rt&&b.normalMapType===Cd,metalnessMap:V,roughnessMap:y,anisotropy:g,anisotropyMap:ht,clearcoat:N,clearcoatMap:gt,clearcoatNormalMap:Ht,clearcoatRoughnessMap:ct,dispersion:G,iridescence:J,iridescenceMap:St,iridescenceThicknessMap:Nt,sheen:q,sheenColorMap:It,sheenRoughnessMap:Mt,specularMap:Jt,specularColorMap:Wt,specularIntensityMap:_e,transmission:mt,transmissionMap:B,thicknessMap:yt,gradientMap:tt,opaque:b.transparent===!1&&b.blending===Vs&&b.alphaToCoverage===!1,alphaMap:lt,alphaTest:At,alphaHash:bt,combine:b.combine,mapUv:P&&v(b.map.channel),aoMapUv:T&&v(b.aoMap.channel),lightMapUv:nt&&v(b.lightMap.channel),bumpMapUv:j&&v(b.bumpMap.channel),normalMapUv:rt&&v(b.normalMap.channel),displacementMapUv:K&&v(b.displacementMap.channel),emissiveMapUv:at&&v(b.emissiveMap.channel),metalnessMapUv:V&&v(b.metalnessMap.channel),roughnessMapUv:y&&v(b.roughnessMap.channel),anisotropyMapUv:ht&&v(b.anisotropyMap.channel),clearcoatMapUv:gt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Ht&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:It&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&v(b.sheenRoughnessMap.channel),specularMapUv:Jt&&v(b.specularMap.channel),specularColorMapUv:Wt&&v(b.specularColorMap.channel),specularIntensityMapUv:_e&&v(b.specularIntensityMap.channel),transmissionMapUv:B&&v(b.transmissionMap.channel),thicknessMapUv:yt&&v(b.thicknessMap.channel),alphaMapUv:lt&&v(b.alphaMap.channel),vertexTangents:!!ot.attributes.tangent&&(rt||g),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!ot.attributes.uv&&(P||lt),fog:!!Q,useFog:b.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Bt,skinning:H.isSkinnedMesh===!0,morphTargets:ot.morphAttributes.position!==void 0,morphNormals:ot.morphAttributes.normal!==void 0,morphColors:ot.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:zt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:be,decodeVideoTexture:P&&b.map.isVideoTexture===!0&&se.getTransfer(b.map.colorSpace)===pe,decodeVideoTextureEmissive:at&&b.emissiveMap.isVideoTexture===!0&&se.getTransfer(b.emissiveMap.colorSpace)===pe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Hn,flipSided:b.side===rn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:$t&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&b.extensions.multiDraw===!0||Zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const U in b.defines)M.push(U),M.push(b.defines[U]);return b.isRawShaderMaterial===!1&&(C(M,b),A(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function C(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function A(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const M=_[b.type];let U;if(M){const O=zn[M];U=e0.clone(O.uniforms)}else U=b.uniforms;return U}function D(b,M){let U;for(let O=0,H=u.length;O<H;O++){const Q=u[O];if(Q.cacheKey===M){U=Q,++U.usedTimes;break}}return U===void 0&&(U=new zy(n,M,b,r),u.push(U)),U}function w(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function R(b){l.remove(b)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:D,releaseProgram:w,releaseShaderCache:R,programs:u,dispose:I}}function Wy(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Xy(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Gh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Wh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h,f,d,_,v,m){let p=n[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:v,group:m},n[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=v,p.group=m),t++,p}function a(h,f,d,_,v,m){const p=o(h,f,d,_,v,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(h,f,d,_,v,m){const p=o(h,f,d,_,v,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(h,f){e.length>1&&e.sort(h||Xy),i.length>1&&i.sort(f||Gh),s.length>1&&s.sort(f||Gh)}function u(){for(let h=t,f=n.length;h<f;h++){const d=n[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function $y(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Wh,n.set(i,[o])):s>=r.length?(o=new Wh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Yy(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new te};break;case"SpotLight":e={position:new F,direction:new F,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function qy(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let jy=0;function Ky(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Zy(n){const t=new Yy,e=qy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const s=new F,r=new ye,o=new ye;function a(c){let u=0,h=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,_=0,v=0,m=0,p=0,C=0,A=0,x=0,D=0,w=0,R=0;c.sort(Ky);for(let b=0,M=c.length;b<M;b++){const U=c[b],O=U.color,H=U.intensity,Q=U.distance,ot=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=O.r*H,h+=O.g*H,f+=O.b*H;else if(U.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(U.sh.coefficients[Z],H);R++}else if(U.isDirectionalLight){const Z=t.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const it=U.shadow,W=e.get(U);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,i.directionalShadow[d]=W,i.directionalShadowMap[d]=ot,i.directionalShadowMatrix[d]=U.shadow.matrix,C++}i.directional[d]=Z,d++}else if(U.isSpotLight){const Z=t.get(U);Z.position.setFromMatrixPosition(U.matrixWorld),Z.color.copy(O).multiplyScalar(H),Z.distance=Q,Z.coneCos=Math.cos(U.angle),Z.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Z.decay=U.decay,i.spot[v]=Z;const it=U.shadow;if(U.map&&(i.spotLightMap[D]=U.map,D++,it.updateMatrices(U),U.castShadow&&w++),i.spotLightMatrix[v]=it.matrix,U.castShadow){const W=e.get(U);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,i.spotShadow[v]=W,i.spotShadowMap[v]=ot,x++}v++}else if(U.isRectAreaLight){const Z=t.get(U);Z.color.copy(O).multiplyScalar(H),Z.halfWidth.set(U.width*.5,0,0),Z.halfHeight.set(0,U.height*.5,0),i.rectArea[m]=Z,m++}else if(U.isPointLight){const Z=t.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),Z.distance=U.distance,Z.decay=U.decay,U.castShadow){const it=U.shadow,W=e.get(U);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,W.shadowCameraNear=it.camera.near,W.shadowCameraFar=it.camera.far,i.pointShadow[_]=W,i.pointShadowMap[_]=ot,i.pointShadowMatrix[_]=U.shadow.matrix,A++}i.point[_]=Z,_++}else if(U.isHemisphereLight){const Z=t.get(U);Z.skyColor.copy(U.color).multiplyScalar(H),Z.groundColor.copy(U.groundColor).multiplyScalar(H),i.hemi[p]=Z,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_FLOAT_1,i.rectAreaLTC2=xt.LTC_FLOAT_2):(i.rectAreaLTC1=xt.LTC_HALF_1,i.rectAreaLTC2=xt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const I=i.hash;(I.directionalLength!==d||I.pointLength!==_||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==C||I.numPointShadows!==A||I.numSpotShadows!==x||I.numSpotMaps!==D||I.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=x+D-w,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,I.directionalLength=d,I.pointLength=_,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=C,I.numPointShadows=A,I.numSpotShadows=x,I.numSpotMaps=D,I.numLightProbes=R,i.version=jy++)}function l(c,u){let h=0,f=0,d=0,_=0,v=0;const m=u.matrixWorldInverse;for(let p=0,C=c.length;p<C;p++){const A=c[p];if(A.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),h++}else if(A.isSpotLight){const x=i.spot[d];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(A.isRectAreaLight){const x=i.rectArea[_];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(A.width*.5,0,0),x.halfHeight.set(0,A.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),_++}else if(A.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(A.matrixWorld),x.position.applyMatrix4(m),f++}else if(A.isHemisphereLight){const x=i.hemi[v];x.direction.setFromMatrixPosition(A.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function Xh(n){const t=new Zy(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Jy(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Xh(n),t.set(s,[a])):r>=o.length?(a=new Xh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const Qy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tE=`uniform sampler2D shadow_pass;
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
}`;function eE(n,t,e){let i=new Gc;const s=new Dt,r=new Dt,o=new Ae,a=new b0({depthPacking:cv}),l=new T0,c={},u=e.maxTextureSize,h={[Oi]:rn,[rn]:Oi,[Hn]:Hn},f=new Bi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:Qy,fragmentShader:tE}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Zn;_.setAttribute("position",new Xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new xe(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gd;let p=this.type;this.render=function(w,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const b=n.getRenderTarget(),M=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Pi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=p!==oi&&this.type===oi,Q=p===oi&&this.type!==oi;for(let ot=0,Z=w.length;ot<Z;ot++){const it=w[ot],W=it.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const _t=W.getFrameExtents();if(s.multiply(_t),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/_t.x),s.x=r.x*_t.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/_t.y),s.y=r.y*_t.y,W.mapSize.y=r.y)),W.map===null||H===!0||Q===!0){const Ct=this.type!==oi?{minFilter:Un,magFilter:Un}:{};W.map!==null&&W.map.dispose(),W.map=new ds(s.x,s.y,Ct),W.map.texture.name=it.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();const Tt=W.getViewportCount();for(let Ct=0;Ct<Tt;Ct++){const zt=W.getViewport(Ct);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),O.viewport(o),W.updateMatrices(it,Ct),i=W.getFrustum(),x(R,I,W.camera,it,this.type)}W.isPointLightShadow!==!0&&this.type===oi&&C(W,I),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,M,U)};function C(w,R){const I=t.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ds(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,I,f,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,I,d,v,null)}function A(w,R,I,b){let M=null;const U=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)M=U;else if(M=I.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const O=M.uuid,H=R.uuid;let Q=c[O];Q===void 0&&(Q={},c[O]=Q);let ot=Q[H];ot===void 0&&(ot=M.clone(),Q[H]=ot,R.addEventListener("dispose",D)),M=ot}if(M.visible=R.visible,M.wireframe=R.wireframe,b===oi?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=n.properties.get(M);O.light=I}return M}function x(w,R,I,b,M){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===oi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const H=t.update(w),Q=w.material;if(Array.isArray(Q)){const ot=H.groups;for(let Z=0,it=ot.length;Z<it;Z++){const W=ot[Z],_t=Q[W.materialIndex];if(_t&&_t.visible){const Tt=A(w,_t,b,M);w.onBeforeShadow(n,w,R,I,H,Tt,W),n.renderBufferDirect(I,null,H,Tt,w,W),w.onAfterShadow(n,w,R,I,H,Tt,W)}}}else if(Q.visible){const ot=A(w,Q,b,M);w.onBeforeShadow(n,w,R,I,H,ot,null),n.renderBufferDirect(I,null,H,ot,w,null),w.onAfterShadow(n,w,R,I,H,ot,null)}}const O=w.children;for(let H=0,Q=O.length;H<Q;H++)x(O[H],R,I,b,M)}function D(w){w.target.removeEventListener("dispose",D);for(const I in c){const b=c[I],M=w.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const nE={[Cl]:Pl,[Dl]:Ul,[Ll]:Nl,[$s]:Il,[Pl]:Cl,[Ul]:Dl,[Nl]:Ll,[Il]:$s};function iE(n,t){function e(){let B=!1;const yt=new Ae;let tt=null;const lt=new Ae(0,0,0,0);return{setMask:function(At){tt!==At&&!B&&(n.colorMask(At,At,At,At),tt=At)},setLocked:function(At){B=At},setClear:function(At,bt,$t,be,ke){ke===!0&&(At*=be,bt*=be,$t*=be),yt.set(At,bt,$t,be),lt.equals(yt)===!1&&(n.clearColor(At,bt,$t,be),lt.copy(yt))},reset:function(){B=!1,tt=null,lt.set(-1,0,0,0)}}}function i(){let B=!1,yt=!1,tt=null,lt=null,At=null;return{setReversed:function(bt){if(yt!==bt){const $t=t.get("EXT_clip_control");yt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const be=At;At=null,this.setClear(be)}yt=bt},getReversed:function(){return yt},setTest:function(bt){bt?vt(n.DEPTH_TEST):Bt(n.DEPTH_TEST)},setMask:function(bt){tt!==bt&&!B&&(n.depthMask(bt),tt=bt)},setFunc:function(bt){if(yt&&(bt=nE[bt]),lt!==bt){switch(bt){case Cl:n.depthFunc(n.NEVER);break;case Pl:n.depthFunc(n.ALWAYS);break;case Dl:n.depthFunc(n.LESS);break;case $s:n.depthFunc(n.LEQUAL);break;case Ll:n.depthFunc(n.EQUAL);break;case Il:n.depthFunc(n.GEQUAL);break;case Ul:n.depthFunc(n.GREATER);break;case Nl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}lt=bt}},setLocked:function(bt){B=bt},setClear:function(bt){At!==bt&&(yt&&(bt=1-bt),n.clearDepth(bt),At=bt)},reset:function(){B=!1,tt=null,lt=null,At=null,yt=!1}}}function s(){let B=!1,yt=null,tt=null,lt=null,At=null,bt=null,$t=null,be=null,ke=null;return{setTest:function(fe){B||(fe?vt(n.STENCIL_TEST):Bt(n.STENCIL_TEST))},setMask:function(fe){yt!==fe&&!B&&(n.stencilMask(fe),yt=fe)},setFunc:function(fe,En,Jn){(tt!==fe||lt!==En||At!==Jn)&&(n.stencilFunc(fe,En,Jn),tt=fe,lt=En,At=Jn)},setOp:function(fe,En,Jn){(bt!==fe||$t!==En||be!==Jn)&&(n.stencilOp(fe,En,Jn),bt=fe,$t=En,be=Jn)},setLocked:function(fe){B=fe},setClear:function(fe){ke!==fe&&(n.clearStencil(fe),ke=fe)},reset:function(){B=!1,yt=null,tt=null,lt=null,At=null,bt=null,$t=null,be=null,ke=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],_=null,v=!1,m=null,p=null,C=null,A=null,x=null,D=null,w=null,R=new te(0,0,0),I=0,b=!1,M=null,U=null,O=null,H=null,Q=null;const ot=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,it=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(W)[1]),Z=it>=1):W.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Z=it>=2);let _t=null,Tt={};const Ct=n.getParameter(n.SCISSOR_BOX),zt=n.getParameter(n.VIEWPORT),ae=new Ae().fromArray(Ct),st=new Ae().fromArray(zt);function pt(B,yt,tt,lt){const At=new Uint8Array(4),bt=n.createTexture();n.bindTexture(B,bt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let $t=0;$t<tt;$t++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(yt,0,n.RGBA,1,1,lt,0,n.RGBA,n.UNSIGNED_BYTE,At):n.texImage2D(yt+$t,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,At);return bt}const Rt={};Rt[n.TEXTURE_2D]=pt(n.TEXTURE_2D,n.TEXTURE_2D,1),Rt[n.TEXTURE_CUBE_MAP]=pt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Rt[n.TEXTURE_2D_ARRAY]=pt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Rt[n.TEXTURE_3D]=pt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),vt(n.DEPTH_TEST),o.setFunc($s),j(!1),rt(Gu),vt(n.CULL_FACE),T(Pi);function vt(B){u[B]!==!0&&(n.enable(B),u[B]=!0)}function Bt(B){u[B]!==!1&&(n.disable(B),u[B]=!1)}function kt(B,yt){return h[B]!==yt?(n.bindFramebuffer(B,yt),h[B]=yt,B===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=yt),B===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=yt),!0):!1}function Zt(B,yt){let tt=d,lt=!1;if(B){tt=f.get(yt),tt===void 0&&(tt=[],f.set(yt,tt));const At=B.textures;if(tt.length!==At.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let bt=0,$t=At.length;bt<$t;bt++)tt[bt]=n.COLOR_ATTACHMENT0+bt;tt.length=At.length,lt=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,lt=!0);lt&&n.drawBuffers(tt)}function P(B){return _!==B?(n.useProgram(B),_=B,!0):!1}const L={[ns]:n.FUNC_ADD,[N_]:n.FUNC_SUBTRACT,[F_]:n.FUNC_REVERSE_SUBTRACT};L[O_]=n.MIN,L[B_]=n.MAX;const X={[z_]:n.ZERO,[k_]:n.ONE,[H_]:n.SRC_COLOR,[wl]:n.SRC_ALPHA,[Y_]:n.SRC_ALPHA_SATURATE,[X_]:n.DST_COLOR,[G_]:n.DST_ALPHA,[V_]:n.ONE_MINUS_SRC_COLOR,[Rl]:n.ONE_MINUS_SRC_ALPHA,[$_]:n.ONE_MINUS_DST_COLOR,[W_]:n.ONE_MINUS_DST_ALPHA,[q_]:n.CONSTANT_COLOR,[j_]:n.ONE_MINUS_CONSTANT_COLOR,[K_]:n.CONSTANT_ALPHA,[Z_]:n.ONE_MINUS_CONSTANT_ALPHA};function T(B,yt,tt,lt,At,bt,$t,be,ke,fe){if(B===Pi){v===!0&&(Bt(n.BLEND),v=!1);return}if(v===!1&&(vt(n.BLEND),v=!0),B!==U_){if(B!==m||fe!==b){if((p!==ns||x!==ns)&&(n.blendEquation(n.FUNC_ADD),p=ns,x=ns),fe)switch(B){case Vs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wu:n.blendFunc(n.ONE,n.ONE);break;case Xu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $u:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Vs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wu:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Xu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $u:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}C=null,A=null,D=null,w=null,R.set(0,0,0),I=0,m=B,b=fe}return}At=At||yt,bt=bt||tt,$t=$t||lt,(yt!==p||At!==x)&&(n.blendEquationSeparate(L[yt],L[At]),p=yt,x=At),(tt!==C||lt!==A||bt!==D||$t!==w)&&(n.blendFuncSeparate(X[tt],X[lt],X[bt],X[$t]),C=tt,A=lt,D=bt,w=$t),(be.equals(R)===!1||ke!==I)&&(n.blendColor(be.r,be.g,be.b,ke),R.copy(be),I=ke),m=B,b=!1}function nt(B,yt){B.side===Hn?Bt(n.CULL_FACE):vt(n.CULL_FACE);let tt=B.side===rn;yt&&(tt=!tt),j(tt),B.blending===Vs&&B.transparent===!1?T(Pi):T(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const lt=B.stencilWrite;a.setTest(lt),lt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),at(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?vt(n.SAMPLE_ALPHA_TO_COVERAGE):Bt(n.SAMPLE_ALPHA_TO_COVERAGE)}function j(B){M!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),M=B)}function rt(B){B!==D_?(vt(n.CULL_FACE),B!==U&&(B===Gu?n.cullFace(n.BACK):B===L_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Bt(n.CULL_FACE),U=B}function K(B){B!==O&&(Z&&n.lineWidth(B),O=B)}function at(B,yt,tt){B?(vt(n.POLYGON_OFFSET_FILL),(H!==yt||Q!==tt)&&(n.polygonOffset(yt,tt),H=yt,Q=tt)):Bt(n.POLYGON_OFFSET_FILL)}function V(B){B?vt(n.SCISSOR_TEST):Bt(n.SCISSOR_TEST)}function y(B){B===void 0&&(B=n.TEXTURE0+ot-1),_t!==B&&(n.activeTexture(B),_t=B)}function g(B,yt,tt){tt===void 0&&(_t===null?tt=n.TEXTURE0+ot-1:tt=_t);let lt=Tt[tt];lt===void 0&&(lt={type:void 0,texture:void 0},Tt[tt]=lt),(lt.type!==B||lt.texture!==yt)&&(_t!==tt&&(n.activeTexture(tt),_t=tt),n.bindTexture(B,yt||Rt[B]),lt.type=B,lt.texture=yt)}function N(){const B=Tt[_t];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function G(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function mt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ht(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function gt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ht(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function St(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Nt(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function It(B){ae.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),ae.copy(B))}function Mt(B){st.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),st.copy(B))}function Jt(B,yt){let tt=c.get(yt);tt===void 0&&(tt=new WeakMap,c.set(yt,tt));let lt=tt.get(B);lt===void 0&&(lt=n.getUniformBlockIndex(yt,B.name),tt.set(B,lt))}function Wt(B,yt){const lt=c.get(yt).get(B);l.get(yt)!==lt&&(n.uniformBlockBinding(yt,lt,B.__bindingPointIndex),l.set(yt,lt))}function _e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},_t=null,Tt={},h={},f=new WeakMap,d=[],_=null,v=!1,m=null,p=null,C=null,A=null,x=null,D=null,w=null,R=new te(0,0,0),I=0,b=!1,M=null,U=null,O=null,H=null,Q=null,ae.set(0,0,n.canvas.width,n.canvas.height),st.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:vt,disable:Bt,bindFramebuffer:kt,drawBuffers:Zt,useProgram:P,setBlending:T,setMaterial:nt,setFlipSided:j,setCullFace:rt,setLineWidth:K,setPolygonOffset:at,setScissorTest:V,activeTexture:y,bindTexture:g,unbindTexture:N,compressedTexImage2D:G,compressedTexImage3D:J,texImage2D:St,texImage3D:Nt,updateUBOMapping:Jt,uniformBlockBinding:Wt,texStorage2D:Ht,texStorage3D:ct,texSubImage2D:q,texSubImage3D:mt,compressedTexSubImage2D:ht,compressedTexSubImage3D:gt,scissor:It,viewport:Mt,reset:_e}}function sE(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Dt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(y,g){return d?new OffscreenCanvas(y,g):Ko("canvas")}function v(y,g,N){let G=1;const J=V(y);if((J.width>N||J.height>N)&&(G=N/Math.max(J.width,J.height)),G<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const q=Math.floor(G*J.width),mt=Math.floor(G*J.height);h===void 0&&(h=_(q,mt));const ht=g?_(q,mt):h;return ht.width=q,ht.height=mt,ht.getContext("2d").drawImage(y,0,0,q,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+mt+")."),ht}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),y;return y}function m(y){return y.generateMipmaps}function p(y){n.generateMipmap(y)}function C(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(y,g,N,G,J=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let q=g;if(g===n.RED&&(N===n.FLOAT&&(q=n.R32F),N===n.HALF_FLOAT&&(q=n.R16F),N===n.UNSIGNED_BYTE&&(q=n.R8)),g===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.R8UI),N===n.UNSIGNED_SHORT&&(q=n.R16UI),N===n.UNSIGNED_INT&&(q=n.R32UI),N===n.BYTE&&(q=n.R8I),N===n.SHORT&&(q=n.R16I),N===n.INT&&(q=n.R32I)),g===n.RG&&(N===n.FLOAT&&(q=n.RG32F),N===n.HALF_FLOAT&&(q=n.RG16F),N===n.UNSIGNED_BYTE&&(q=n.RG8)),g===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RG8UI),N===n.UNSIGNED_SHORT&&(q=n.RG16UI),N===n.UNSIGNED_INT&&(q=n.RG32UI),N===n.BYTE&&(q=n.RG8I),N===n.SHORT&&(q=n.RG16I),N===n.INT&&(q=n.RG32I)),g===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGB8UI),N===n.UNSIGNED_SHORT&&(q=n.RGB16UI),N===n.UNSIGNED_INT&&(q=n.RGB32UI),N===n.BYTE&&(q=n.RGB8I),N===n.SHORT&&(q=n.RGB16I),N===n.INT&&(q=n.RGB32I)),g===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),N===n.UNSIGNED_INT&&(q=n.RGBA32UI),N===n.BYTE&&(q=n.RGBA8I),N===n.SHORT&&(q=n.RGBA16I),N===n.INT&&(q=n.RGBA32I)),g===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),g===n.RGBA){const mt=J?qo:se.getTransfer(G);N===n.FLOAT&&(q=n.RGBA32F),N===n.HALF_FLOAT&&(q=n.RGBA16F),N===n.UNSIGNED_BYTE&&(q=mt===pe?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(y,g){let N;return y?g===null||g===fs||g===js?N=n.DEPTH24_STENCIL8:g===fi?N=n.DEPTH32F_STENCIL8:g===Br&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===fs||g===js?N=n.DEPTH_COMPONENT24:g===fi?N=n.DEPTH_COMPONENT32F:g===Br&&(N=n.DEPTH_COMPONENT16),N}function D(y,g){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==Un&&y.minFilter!==Vn?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function w(y){const g=y.target;g.removeEventListener("dispose",w),I(g),g.isVideoTexture&&u.delete(g)}function R(y){const g=y.target;g.removeEventListener("dispose",R),M(g)}function I(y){const g=i.get(y);if(g.__webglInit===void 0)return;const N=y.source,G=f.get(N);if(G){const J=G[g.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(y),Object.keys(G).length===0&&f.delete(N)}i.remove(y)}function b(y){const g=i.get(y);n.deleteTexture(g.__webglTexture);const N=y.source,G=f.get(N);delete G[g.__cacheKey],o.memory.textures--}function M(y){const g=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(g.__webglFramebuffer[G]))for(let J=0;J<g.__webglFramebuffer[G].length;J++)n.deleteFramebuffer(g.__webglFramebuffer[G][J]);else n.deleteFramebuffer(g.__webglFramebuffer[G]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[G])}else{if(Array.isArray(g.__webglFramebuffer))for(let G=0;G<g.__webglFramebuffer.length;G++)n.deleteFramebuffer(g.__webglFramebuffer[G]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let G=0;G<g.__webglColorRenderbuffer.length;G++)g.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[G]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=y.textures;for(let G=0,J=N.length;G<J;G++){const q=i.get(N[G]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(N[G])}i.remove(y)}let U=0;function O(){U=0}function H(){const y=U;return y>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),U+=1,y}function Q(y){const g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function ot(y,g){const N=i.get(y);if(y.isVideoTexture&&K(y),y.isRenderTargetTexture===!1&&y.version>0&&N.__version!==y.version){const G=y.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{st(N,y,g);return}}e.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+g)}function Z(y,g){const N=i.get(y);if(y.version>0&&N.__version!==y.version){st(N,y,g);return}e.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+g)}function it(y,g){const N=i.get(y);if(y.version>0&&N.__version!==y.version){st(N,y,g);return}e.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+g)}function W(y,g){const N=i.get(y);if(y.version>0&&N.__version!==y.version){pt(N,y,g);return}e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+g)}const _t={[Bl]:n.REPEAT,[os]:n.CLAMP_TO_EDGE,[zl]:n.MIRRORED_REPEAT},Tt={[Un]:n.NEAREST,[av]:n.NEAREST_MIPMAP_NEAREST,[no]:n.NEAREST_MIPMAP_LINEAR,[Vn]:n.LINEAR,[Ia]:n.LINEAR_MIPMAP_NEAREST,[as]:n.LINEAR_MIPMAP_LINEAR},Ct={[hv]:n.NEVER,[_v]:n.ALWAYS,[fv]:n.LESS,[Pd]:n.LEQUAL,[dv]:n.EQUAL,[gv]:n.GEQUAL,[pv]:n.GREATER,[mv]:n.NOTEQUAL};function zt(y,g){if(g.type===fi&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Vn||g.magFilter===Ia||g.magFilter===no||g.magFilter===as||g.minFilter===Vn||g.minFilter===Ia||g.minFilter===no||g.minFilter===as)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,_t[g.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,_t[g.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,_t[g.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,Tt[g.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,Tt[g.minFilter]),g.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,Ct[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Un||g.minFilter!==no&&g.minFilter!==as||g.type===fi&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");n.texParameterf(y,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function ae(y,g){let N=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",w));const G=g.source;let J=f.get(G);J===void 0&&(J={},f.set(G,J));const q=Q(g);if(q!==y.__cacheKey){J[q]===void 0&&(J[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),J[q].usedTimes++;const mt=J[y.__cacheKey];mt!==void 0&&(J[y.__cacheKey].usedTimes--,mt.usedTimes===0&&b(g)),y.__cacheKey=q,y.__webglTexture=J[q].texture}return N}function st(y,g,N){let G=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(G=n.TEXTURE_3D);const J=ae(y,g),q=g.source;e.bindTexture(G,y.__webglTexture,n.TEXTURE0+N);const mt=i.get(q);if(q.version!==mt.__version||J===!0){e.activeTexture(n.TEXTURE0+N);const ht=se.getPrimaries(se.workingColorSpace),gt=g.colorSpace===wi?null:se.getPrimaries(g.colorSpace),Ht=g.colorSpace===wi||ht===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht);let ct=v(g.image,!1,s.maxTextureSize);ct=at(g,ct);const St=r.convert(g.format,g.colorSpace),Nt=r.convert(g.type);let It=A(g.internalFormat,St,Nt,g.colorSpace,g.isVideoTexture);zt(G,g);let Mt;const Jt=g.mipmaps,Wt=g.isVideoTexture!==!0,_e=mt.__version===void 0||J===!0,B=q.dataReady,yt=D(g,ct);if(g.isDepthTexture)It=x(g.format===Ks,g.type),_e&&(Wt?e.texStorage2D(n.TEXTURE_2D,1,It,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,It,ct.width,ct.height,0,St,Nt,null));else if(g.isDataTexture)if(Jt.length>0){Wt&&_e&&e.texStorage2D(n.TEXTURE_2D,yt,It,Jt[0].width,Jt[0].height);for(let tt=0,lt=Jt.length;tt<lt;tt++)Mt=Jt[tt],Wt?B&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,Mt.width,Mt.height,St,Nt,Mt.data):e.texImage2D(n.TEXTURE_2D,tt,It,Mt.width,Mt.height,0,St,Nt,Mt.data);g.generateMipmaps=!1}else Wt?(_e&&e.texStorage2D(n.TEXTURE_2D,yt,It,ct.width,ct.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,St,Nt,ct.data)):e.texImage2D(n.TEXTURE_2D,0,It,ct.width,ct.height,0,St,Nt,ct.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Wt&&_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,It,Jt[0].width,Jt[0].height,ct.depth);for(let tt=0,lt=Jt.length;tt<lt;tt++)if(Mt=Jt[tt],g.format!==Dn)if(St!==null)if(Wt){if(B)if(g.layerUpdates.size>0){const At=Sh(Mt.width,Mt.height,g.format,g.type);for(const bt of g.layerUpdates){const $t=Mt.data.subarray(bt*At/Mt.data.BYTES_PER_ELEMENT,(bt+1)*At/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,bt,Mt.width,Mt.height,1,St,$t)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,Mt.width,Mt.height,ct.depth,St,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,It,Mt.width,Mt.height,ct.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,Mt.width,Mt.height,ct.depth,St,Nt,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,It,Mt.width,Mt.height,ct.depth,0,St,Nt,Mt.data)}else{Wt&&_e&&e.texStorage2D(n.TEXTURE_2D,yt,It,Jt[0].width,Jt[0].height);for(let tt=0,lt=Jt.length;tt<lt;tt++)Mt=Jt[tt],g.format!==Dn?St!==null?Wt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,Mt.width,Mt.height,St,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,It,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?B&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,Mt.width,Mt.height,St,Nt,Mt.data):e.texImage2D(n.TEXTURE_2D,tt,It,Mt.width,Mt.height,0,St,Nt,Mt.data)}else if(g.isDataArrayTexture)if(Wt){if(_e&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,It,ct.width,ct.height,ct.depth),B)if(g.layerUpdates.size>0){const tt=Sh(ct.width,ct.height,g.format,g.type);for(const lt of g.layerUpdates){const At=ct.data.subarray(lt*tt/ct.data.BYTES_PER_ELEMENT,(lt+1)*tt/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,lt,ct.width,ct.height,1,St,Nt,At)}g.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,St,Nt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,It,ct.width,ct.height,ct.depth,0,St,Nt,ct.data);else if(g.isData3DTexture)Wt?(_e&&e.texStorage3D(n.TEXTURE_3D,yt,It,ct.width,ct.height,ct.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,St,Nt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,It,ct.width,ct.height,ct.depth,0,St,Nt,ct.data);else if(g.isFramebufferTexture){if(_e)if(Wt)e.texStorage2D(n.TEXTURE_2D,yt,It,ct.width,ct.height);else{let tt=ct.width,lt=ct.height;for(let At=0;At<yt;At++)e.texImage2D(n.TEXTURE_2D,At,It,tt,lt,0,St,Nt,null),tt>>=1,lt>>=1}}else if(Jt.length>0){if(Wt&&_e){const tt=V(Jt[0]);e.texStorage2D(n.TEXTURE_2D,yt,It,tt.width,tt.height)}for(let tt=0,lt=Jt.length;tt<lt;tt++)Mt=Jt[tt],Wt?B&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,St,Nt,Mt):e.texImage2D(n.TEXTURE_2D,tt,It,St,Nt,Mt);g.generateMipmaps=!1}else if(Wt){if(_e){const tt=V(ct);e.texStorage2D(n.TEXTURE_2D,yt,It,tt.width,tt.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,St,Nt,ct)}else e.texImage2D(n.TEXTURE_2D,0,It,St,Nt,ct);m(g)&&p(G),mt.__version=q.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function pt(y,g,N){if(g.image.length!==6)return;const G=ae(y,g),J=g.source;e.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+N);const q=i.get(J);if(J.version!==q.__version||G===!0){e.activeTexture(n.TEXTURE0+N);const mt=se.getPrimaries(se.workingColorSpace),ht=g.colorSpace===wi?null:se.getPrimaries(g.colorSpace),gt=g.colorSpace===wi||mt===ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Ht=g.isCompressedTexture||g.image[0].isCompressedTexture,ct=g.image[0]&&g.image[0].isDataTexture,St=[];for(let lt=0;lt<6;lt++)!Ht&&!ct?St[lt]=v(g.image[lt],!0,s.maxCubemapSize):St[lt]=ct?g.image[lt].image:g.image[lt],St[lt]=at(g,St[lt]);const Nt=St[0],It=r.convert(g.format,g.colorSpace),Mt=r.convert(g.type),Jt=A(g.internalFormat,It,Mt,g.colorSpace),Wt=g.isVideoTexture!==!0,_e=q.__version===void 0||G===!0,B=J.dataReady;let yt=D(g,Nt);zt(n.TEXTURE_CUBE_MAP,g);let tt;if(Ht){Wt&&_e&&e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Jt,Nt.width,Nt.height);for(let lt=0;lt<6;lt++){tt=St[lt].mipmaps;for(let At=0;At<tt.length;At++){const bt=tt[At];g.format!==Dn?It!==null?Wt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At,0,0,bt.width,bt.height,It,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At,Jt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At,0,0,bt.width,bt.height,It,Mt,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At,Jt,bt.width,bt.height,0,It,Mt,bt.data)}}}else{if(tt=g.mipmaps,Wt&&_e){tt.length>0&&yt++;const lt=V(St[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Jt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(ct){Wt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,St[lt].width,St[lt].height,It,Mt,St[lt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Jt,St[lt].width,St[lt].height,0,It,Mt,St[lt].data);for(let At=0;At<tt.length;At++){const $t=tt[At].image[lt].image;Wt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At+1,0,0,$t.width,$t.height,It,Mt,$t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At+1,Jt,$t.width,$t.height,0,It,Mt,$t.data)}}else{Wt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,It,Mt,St[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Jt,It,Mt,St[lt]);for(let At=0;At<tt.length;At++){const bt=tt[At];Wt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At+1,0,0,It,Mt,bt.image[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,At+1,Jt,It,Mt,bt.image[lt])}}}m(g)&&p(n.TEXTURE_CUBE_MAP),q.__version=J.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function Rt(y,g,N,G,J,q){const mt=r.convert(N.format,N.colorSpace),ht=r.convert(N.type),gt=A(N.internalFormat,mt,ht,N.colorSpace),Ht=i.get(g),ct=i.get(N);if(ct.__renderTarget=g,!Ht.__hasExternalTextures){const St=Math.max(1,g.width>>q),Nt=Math.max(1,g.height>>q);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,q,gt,St,Nt,g.depth,0,mt,ht,null):e.texImage2D(J,q,gt,St,Nt,0,mt,ht,null)}e.bindFramebuffer(n.FRAMEBUFFER,y),rt(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,J,ct.__webglTexture,0,j(g)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,J,ct.__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function vt(y,g,N){if(n.bindRenderbuffer(n.RENDERBUFFER,y),g.depthBuffer){const G=g.depthTexture,J=G&&G.isDepthTexture?G.type:null,q=x(g.stencilBuffer,J),mt=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=j(g);rt(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ht,q,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,ht,q,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,q,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,mt,n.RENDERBUFFER,y)}else{const G=g.textures;for(let J=0;J<G.length;J++){const q=G[J],mt=r.convert(q.format,q.colorSpace),ht=r.convert(q.type),gt=A(q.internalFormat,mt,ht,q.colorSpace),Ht=j(g);N&&rt(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ht,gt,g.width,g.height):rt(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ht,gt,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,gt,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Bt(y,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=i.get(g.depthTexture);G.__renderTarget=g,(!G.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),ot(g.depthTexture,0);const J=G.__webglTexture,q=j(g);if(g.depthTexture.format===Gs)rt(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(g.depthTexture.format===Ks)rt(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function kt(y){const g=i.get(y),N=y.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==y.depthTexture){const G=y.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),G){const J=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,G.removeEventListener("dispose",J)};G.addEventListener("dispose",J),g.__depthDisposeCallback=J}g.__boundDepthTexture=G}if(y.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Bt(g.__webglFramebuffer,y)}else if(N){g.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[G]),g.__webglDepthbuffer[G]===void 0)g.__webglDepthbuffer[G]=n.createRenderbuffer(),vt(g.__webglDepthbuffer[G],y,!1);else{const J=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=g.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),vt(g.__webglDepthbuffer,y,!1);else{const G=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,J)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Zt(y,g,N){const G=i.get(y);g!==void 0&&Rt(G.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&kt(y)}function P(y){const g=y.texture,N=i.get(y),G=i.get(g);y.addEventListener("dispose",R);const J=y.textures,q=y.isWebGLCubeRenderTarget===!0,mt=J.length>1;if(mt||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=g.version,o.memory.textures++),q){N.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[ht]=[];for(let gt=0;gt<g.mipmaps.length;gt++)N.__webglFramebuffer[ht][gt]=n.createFramebuffer()}else N.__webglFramebuffer[ht]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let ht=0;ht<g.mipmaps.length;ht++)N.__webglFramebuffer[ht]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(mt)for(let ht=0,gt=J.length;ht<gt;ht++){const Ht=i.get(J[ht]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=n.createTexture(),o.memory.textures++)}if(y.samples>0&&rt(y)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ht=0;ht<J.length;ht++){const gt=J[ht];N.__webglColorRenderbuffer[ht]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[ht]);const Ht=r.convert(gt.format,gt.colorSpace),ct=r.convert(gt.type),St=A(gt.internalFormat,Ht,ct,gt.colorSpace,y.isXRRenderTarget===!0),Nt=j(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,Nt,St,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,N.__webglColorRenderbuffer[ht])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),vt(N.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),zt(n.TEXTURE_CUBE_MAP,g);for(let ht=0;ht<6;ht++)if(g.mipmaps&&g.mipmaps.length>0)for(let gt=0;gt<g.mipmaps.length;gt++)Rt(N.__webglFramebuffer[ht][gt],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,gt);else Rt(N.__webglFramebuffer[ht],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(g)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(mt){for(let ht=0,gt=J.length;ht<gt;ht++){const Ht=J[ht],ct=i.get(Ht);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),zt(n.TEXTURE_2D,Ht),Rt(N.__webglFramebuffer,y,Ht,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,0),m(Ht)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let ht=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ht=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ht,G.__webglTexture),zt(ht,g),g.mipmaps&&g.mipmaps.length>0)for(let gt=0;gt<g.mipmaps.length;gt++)Rt(N.__webglFramebuffer[gt],y,g,n.COLOR_ATTACHMENT0,ht,gt);else Rt(N.__webglFramebuffer,y,g,n.COLOR_ATTACHMENT0,ht,0);m(g)&&p(ht),e.unbindTexture()}y.depthBuffer&&kt(y)}function L(y){const g=y.textures;for(let N=0,G=g.length;N<G;N++){const J=g[N];if(m(J)){const q=C(y),mt=i.get(J).__webglTexture;e.bindTexture(q,mt),p(q),e.unbindTexture()}}}const X=[],T=[];function nt(y){if(y.samples>0){if(rt(y)===!1){const g=y.textures,N=y.width,G=y.height;let J=n.COLOR_BUFFER_BIT;const q=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=i.get(y),ht=g.length>1;if(ht)for(let gt=0;gt<g.length;gt++)e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let gt=0;gt<g.length;gt++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ht){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,mt.__webglColorRenderbuffer[gt]);const Ht=i.get(g[gt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ht,0)}n.blitFramebuffer(0,0,N,G,0,0,N,G,J,n.NEAREST),l===!0&&(X.length=0,T.length=0,X.push(n.COLOR_ATTACHMENT0+gt),y.depthBuffer&&y.resolveDepthBuffer===!1&&(X.push(q),T.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,T)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,X))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ht)for(let gt=0;gt<g.length;gt++){e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,mt.__webglColorRenderbuffer[gt]);const Ht=i.get(g[gt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,Ht,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const g=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function j(y){return Math.min(s.maxSamples,y.samples)}function rt(y){const g=i.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function K(y){const g=o.render.frame;u.get(y)!==g&&(u.set(y,g),y.update())}function at(y,g){const N=y.colorSpace,G=y.format,J=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||N!==Zs&&N!==wi&&(se.getTransfer(N)===pe?(G!==Dn||J!==mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function V(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.setTexture2D=ot,this.setTexture2DArray=Z,this.setTexture3D=it,this.setTextureCube=W,this.rebindTextures=Zt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=rt}function rE(n,t){function e(i,s=wi){let r;const o=se.getTransfer(s);if(i===mi)return n.UNSIGNED_BYTE;if(i===Lc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ic)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Sd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===xd)return n.BYTE;if(i===Md)return n.SHORT;if(i===Br)return n.UNSIGNED_SHORT;if(i===Dc)return n.INT;if(i===fs)return n.UNSIGNED_INT;if(i===fi)return n.FLOAT;if(i===Xr)return n.HALF_FLOAT;if(i===yd)return n.ALPHA;if(i===Ed)return n.RGB;if(i===Dn)return n.RGBA;if(i===bd)return n.LUMINANCE;if(i===Td)return n.LUMINANCE_ALPHA;if(i===Gs)return n.DEPTH_COMPONENT;if(i===Ks)return n.DEPTH_STENCIL;if(i===Ad)return n.RED;if(i===Uc)return n.RED_INTEGER;if(i===wd)return n.RG;if(i===Nc)return n.RG_INTEGER;if(i===Fc)return n.RGBA_INTEGER;if(i===Po||i===Do||i===Lo||i===Io)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Do)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Do)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Lo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Io)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===kl||i===Hl||i===Vl||i===Gl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===kl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Hl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Wl||i===Xl||i===$l)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Wl||i===Xl)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===$l)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Yl||i===ql||i===jl||i===Kl||i===Zl||i===Jl||i===Ql||i===tc||i===ec||i===nc||i===ic||i===sc||i===rc||i===oc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Yl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ql)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===jl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Zl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Jl)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ql)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===tc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ec)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ic)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===sc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===rc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===oc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uo||i===ac||i===lc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Uo)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ac)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rd||i===cc||i===uc||i===hc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Uo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===uc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===js?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const oE={type:"move"};class ul{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(oE)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Os;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const aE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lE=`
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

}`;class cE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new on,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Bi({vertexShader:aE,fragmentShader:lE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xe(new qr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uE extends gs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,_=null;const v=new cE,m=e.getContextAttributes();let p=null,C=null;const A=[],x=[],D=new Dt;let w=null;const R=new _n;R.viewport=new Ae;const I=new _n;I.viewport=new Ae;const b=[R,I],M=new C0;let U=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let pt=A[st];return pt===void 0&&(pt=new ul,A[st]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(st){let pt=A[st];return pt===void 0&&(pt=new ul,A[st]=pt),pt.getGripSpace()},this.getHand=function(st){let pt=A[st];return pt===void 0&&(pt=new ul,A[st]=pt),pt.getHandSpace()};function H(st){const pt=x.indexOf(st.inputSource);if(pt===-1)return;const Rt=A[pt];Rt!==void 0&&(Rt.update(st.inputSource,st.frame,c||o),Rt.dispatchEvent({type:st.type,data:st.inputSource}))}function Q(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",ot);for(let st=0;st<A.length;st++){const pt=x[st];pt!==null&&(x[st]=null,A[st].disconnect(pt))}U=null,O=null,v.reset(),t.setRenderTarget(p),d=null,f=null,h=null,s=null,C=null,ae.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){r=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){a=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(st){c=st},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(st){if(s=st,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",ot),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(D),s.renderState.layers===void 0){const pt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),C=new ds(d.framebufferWidth,d.framebufferHeight,{format:Dn,type:mi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let pt=null,Rt=null,vt=null;m.depth&&(vt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=m.stencil?Ks:Gs,Rt=m.stencil?js:fs);const Bt={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:r};h=new XRWebGLBinding(s,e),f=h.createProjectionLayer(Bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),C=new ds(f.textureWidth,f.textureHeight,{format:Dn,type:mi,depthTexture:new kd(f.textureWidth,f.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ae.setContext(s),ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function ot(st){for(let pt=0;pt<st.removed.length;pt++){const Rt=st.removed[pt],vt=x.indexOf(Rt);vt>=0&&(x[vt]=null,A[vt].disconnect(Rt))}for(let pt=0;pt<st.added.length;pt++){const Rt=st.added[pt];let vt=x.indexOf(Rt);if(vt===-1){for(let kt=0;kt<A.length;kt++)if(kt>=x.length){x.push(Rt),vt=kt;break}else if(x[kt]===null){x[kt]=Rt,vt=kt;break}if(vt===-1)break}const Bt=A[vt];Bt&&Bt.connect(Rt)}}const Z=new F,it=new F;function W(st,pt,Rt){Z.setFromMatrixPosition(pt.matrixWorld),it.setFromMatrixPosition(Rt.matrixWorld);const vt=Z.distanceTo(it),Bt=pt.projectionMatrix.elements,kt=Rt.projectionMatrix.elements,Zt=Bt[14]/(Bt[10]-1),P=Bt[14]/(Bt[10]+1),L=(Bt[9]+1)/Bt[5],X=(Bt[9]-1)/Bt[5],T=(Bt[8]-1)/Bt[0],nt=(kt[8]+1)/kt[0],j=Zt*T,rt=Zt*nt,K=vt/(-T+nt),at=K*-T;if(pt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(at),st.translateZ(K),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),Bt[10]===-1)st.projectionMatrix.copy(pt.projectionMatrix),st.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const V=Zt+K,y=P+K,g=j-at,N=rt+(vt-at),G=L*P/y*V,J=X*P/y*V;st.projectionMatrix.makePerspective(g,N,G,J,V,y),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function _t(st,pt){pt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(pt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(s===null)return;let pt=st.near,Rt=st.far;v.texture!==null&&(v.depthNear>0&&(pt=v.depthNear),v.depthFar>0&&(Rt=v.depthFar)),M.near=I.near=R.near=pt,M.far=I.far=R.far=Rt,(U!==M.near||O!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),U=M.near,O=M.far),R.layers.mask=st.layers.mask|2,I.layers.mask=st.layers.mask|4,M.layers.mask=R.layers.mask|I.layers.mask;const vt=st.parent,Bt=M.cameras;_t(M,vt);for(let kt=0;kt<Bt.length;kt++)_t(Bt[kt],vt);Bt.length===2?W(M,R,I):M.projectionMatrix.copy(R.projectionMatrix),Tt(st,M,vt)};function Tt(st,pt,Rt){Rt===null?st.matrix.copy(pt.matrixWorld):(st.matrix.copy(Rt.matrixWorld),st.matrix.invert(),st.matrix.multiply(pt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(pt.projectionMatrix),st.projectionMatrixInverse.copy(pt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=zr*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(st){l=st,f!==null&&(f.fixedFoveation=st),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=st)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Ct=null;function zt(st,pt){if(u=pt.getViewerPose(c||o),_=pt,u!==null){const Rt=u.views;d!==null&&(t.setRenderTargetFramebuffer(C,d.framebuffer),t.setRenderTarget(C));let vt=!1;Rt.length!==M.cameras.length&&(M.cameras.length=0,vt=!0);for(let kt=0;kt<Rt.length;kt++){const Zt=Rt[kt];let P=null;if(d!==null)P=d.getViewport(Zt);else{const X=h.getViewSubImage(f,Zt);P=X.viewport,kt===0&&(t.setRenderTargetTextures(C,X.colorTexture,f.ignoreDepthValues?void 0:X.depthStencilTexture),t.setRenderTarget(C))}let L=b[kt];L===void 0&&(L=new _n,L.layers.enable(kt),L.viewport=new Ae,b[kt]=L),L.matrix.fromArray(Zt.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(Zt.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(P.x,P.y,P.width,P.height),kt===0&&(M.matrix.copy(L.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),vt===!0&&M.cameras.push(L)}const Bt=s.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")){const kt=h.getDepthInformation(Rt[0]);kt&&kt.isValid&&kt.texture&&v.init(t,kt,s.renderState)}}for(let Rt=0;Rt<A.length;Rt++){const vt=x[Rt],Bt=A[Rt];vt!==null&&Bt!==void 0&&Bt.update(vt,pt,c||o)}Ct&&Ct(st,pt),pt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pt}),_=null}const ae=new $d;ae.setAnimationLoop(zt),this.setAnimationLoop=function(st){Ct=st},this.dispose=function(){}}}const Ki=new Kn,hE=new ye;function fE(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Od(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,C,A,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,C,A):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const C=t.get(p),A=C.envMap,x=C.envMapRotation;A&&(m.envMap.value=A,Ki.copy(x),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(hE.makeRotationFromEuler(Ki)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,C,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*C,m.scale.value=A*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,C){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=C.texture,m.transmissionSamplerSize.value.set(C.width,C.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const C=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(C.matrixWorld),m.nearDistance.value=C.shadow.camera.near,m.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function dE(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(C,A){const x=A.program;i.uniformBlockBinding(C,x)}function c(C,A){let x=s[C.id];x===void 0&&(_(C),x=u(C),s[C.id]=x,C.addEventListener("dispose",m));const D=A.program;i.updateUBOMapping(C,D);const w=t.render.frame;r[C.id]!==w&&(f(C),r[C.id]=w)}function u(C){const A=h();C.__bindingPointIndex=A;const x=n.createBuffer(),D=C.__size,w=C.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,D,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,x),x}function h(){for(let C=0;C<a;C++)if(o.indexOf(C)===-1)return o.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(C){const A=s[C.id],x=C.uniforms,D=C.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let w=0,R=x.length;w<R;w++){const I=Array.isArray(x[w])?x[w]:[x[w]];for(let b=0,M=I.length;b<M;b++){const U=I[b];if(d(U,w,b,D)===!0){const O=U.__offset,H=Array.isArray(U.value)?U.value:[U.value];let Q=0;for(let ot=0;ot<H.length;ot++){const Z=H[ot],it=v(Z);typeof Z=="number"||typeof Z=="boolean"?(U.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,O+Q,U.__data)):Z.isMatrix3?(U.__data[0]=Z.elements[0],U.__data[1]=Z.elements[1],U.__data[2]=Z.elements[2],U.__data[3]=0,U.__data[4]=Z.elements[3],U.__data[5]=Z.elements[4],U.__data[6]=Z.elements[5],U.__data[7]=0,U.__data[8]=Z.elements[6],U.__data[9]=Z.elements[7],U.__data[10]=Z.elements[8],U.__data[11]=0):(Z.toArray(U.__data,Q),Q+=it.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(C,A,x,D){const w=C.value,R=A+"_"+x;if(D[R]===void 0)return typeof w=="number"||typeof w=="boolean"?D[R]=w:D[R]=w.clone(),!0;{const I=D[R];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return D[R]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function _(C){const A=C.uniforms;let x=0;const D=16;for(let R=0,I=A.length;R<I;R++){const b=Array.isArray(A[R])?A[R]:[A[R]];for(let M=0,U=b.length;M<U;M++){const O=b[M],H=Array.isArray(O.value)?O.value:[O.value];for(let Q=0,ot=H.length;Q<ot;Q++){const Z=H[Q],it=v(Z),W=x%D,_t=W%it.boundary,Tt=W+_t;x+=_t,Tt!==0&&D-Tt<it.storage&&(x+=D-Tt),O.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=it.storage}}}const w=x%D;return w>0&&(x+=D-w),C.__size=x,C.__cache={},this}function v(C){const A={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(A.boundary=4,A.storage=4):C.isVector2?(A.boundary=8,A.storage=8):C.isVector3||C.isColor?(A.boundary=16,A.storage=12):C.isVector4?(A.boundary=16,A.storage=16):C.isMatrix3?(A.boundary=48,A.storage=48):C.isMatrix4?(A.boundary=64,A.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),A}function m(C){const A=C.target;A.removeEventListener("dispose",m);const x=o.indexOf(A.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function p(){for(const C in s)n.deleteBuffer(s[C]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class pE{constructor(t={}){const{canvas:e=Uv(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const C=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gn,this.toneMapping=Di,this.toneMappingExposure=1;const x=this;let D=!1,w=0,R=0,I=null,b=-1,M=null;const U=new Ae,O=new Ae;let H=null;const Q=new te(0);let ot=0,Z=e.width,it=e.height,W=1,_t=null,Tt=null;const Ct=new Ae(0,0,Z,it),zt=new Ae(0,0,Z,it);let ae=!1;const st=new Gc;let pt=!1,Rt=!1;const vt=new ye,Bt=new ye,kt=new F,Zt=new Ae,P={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let L=!1;function X(){return I===null?W:1}let T=i;function nt(S,z){return e.getContext(S,z)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Pc}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",bt,!1),T===null){const z="webgl2";if(T=nt(z,S),T===null)throw nt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let j,rt,K,at,V,y,g,N,G,J,q,mt,ht,gt,Ht,ct,St,Nt,It,Mt,Jt,Wt,_e,B;function yt(){j=new ES(T),j.init(),Wt=new rE(T,j),rt=new _S(T,j,t,Wt),K=new iE(T,j),rt.reverseDepthBuffer&&f&&K.buffers.depth.setReversed(!0),at=new AS(T),V=new Wy,y=new sE(T,j,K,V,rt,Wt,at),g=new xS(x),N=new yS(x),G=new I0(T),_e=new mS(T,G),J=new bS(T,G,at,_e),q=new RS(T,J,G,at),It=new wS(T,rt,y),ct=new vS(V),mt=new Gy(x,g,N,j,rt,_e,ct),ht=new fE(x,V),gt=new $y,Ht=new Jy(j),Nt=new pS(x,g,N,K,q,d,l),St=new eE(x,q,rt),B=new dE(T,at,rt,K),Mt=new gS(T,j,at),Jt=new TS(T,j,at),at.programs=mt.programs,x.capabilities=rt,x.extensions=j,x.properties=V,x.renderLists=gt,x.shadowMap=St,x.state=K,x.info=at}yt();const tt=new uE(x,T);this.xr=tt,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const S=j.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=j.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(Z,it,!1))},this.getSize=function(S){return S.set(Z,it)},this.setSize=function(S,z,$=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,it=z,e.width=Math.floor(S*W),e.height=Math.floor(z*W),$===!0&&(e.style.width=S+"px",e.style.height=z+"px"),this.setViewport(0,0,S,z)},this.getDrawingBufferSize=function(S){return S.set(Z*W,it*W).floor()},this.setDrawingBufferSize=function(S,z,$){Z=S,it=z,W=$,e.width=Math.floor(S*$),e.height=Math.floor(z*$),this.setViewport(0,0,S,z)},this.getCurrentViewport=function(S){return S.copy(U)},this.getViewport=function(S){return S.copy(Ct)},this.setViewport=function(S,z,$,Y){S.isVector4?Ct.set(S.x,S.y,S.z,S.w):Ct.set(S,z,$,Y),K.viewport(U.copy(Ct).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(zt)},this.setScissor=function(S,z,$,Y){S.isVector4?zt.set(S.x,S.y,S.z,S.w):zt.set(S,z,$,Y),K.scissor(O.copy(zt).multiplyScalar(W).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(S){K.setScissorTest(ae=S)},this.setOpaqueSort=function(S){_t=S},this.setTransparentSort=function(S){Tt=S},this.getClearColor=function(S){return S.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(S=!0,z=!0,$=!0){let Y=0;if(S){let k=!1;if(I!==null){const ft=I.texture.format;k=ft===Fc||ft===Nc||ft===Uc}if(k){const ft=I.texture.type,Et=ft===mi||ft===fs||ft===Br||ft===js||ft===Lc||ft===Ic,wt=Nt.getClearColor(),Pt=Nt.getClearAlpha(),Vt=wt.r,Gt=wt.g,Ft=wt.b;Et?(_[0]=Vt,_[1]=Gt,_[2]=Ft,_[3]=Pt,T.clearBufferuiv(T.COLOR,0,_)):(v[0]=Vt,v[1]=Gt,v[2]=Ft,v[3]=Pt,T.clearBufferiv(T.COLOR,0,v))}else Y|=T.COLOR_BUFFER_BIT}z&&(Y|=T.DEPTH_BUFFER_BIT),$&&(Y|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Nt.dispose(),gt.dispose(),Ht.dispose(),V.dispose(),g.dispose(),N.dispose(),q.dispose(),_e.dispose(),B.dispose(),mt.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Jc),tt.removeEventListener("sessionend",Qc),zi.stop()};function lt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const S=at.autoReset,z=St.enabled,$=St.autoUpdate,Y=St.needsUpdate,k=St.type;yt(),at.autoReset=S,St.enabled=z,St.autoUpdate=$,St.needsUpdate=Y,St.type=k}function bt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function $t(S){const z=S.target;z.removeEventListener("dispose",$t),be(z)}function be(S){ke(S),V.remove(S)}function ke(S){const z=V.get(S).programs;z!==void 0&&(z.forEach(function($){mt.releaseProgram($)}),S.isShaderMaterial&&mt.releaseShaderCache(S))}this.renderBufferDirect=function(S,z,$,Y,k,ft){z===null&&(z=P);const Et=k.isMesh&&k.matrixWorld.determinant()<0,wt=np(S,z,$,Y,k);K.setMaterial(Y,Et);let Pt=$.index,Vt=1;if(Y.wireframe===!0){if(Pt=J.getWireframeAttribute($),Pt===void 0)return;Vt=2}const Gt=$.drawRange,Ft=$.attributes.position;let ee=Gt.start*Vt,le=(Gt.start+Gt.count)*Vt;ft!==null&&(ee=Math.max(ee,ft.start*Vt),le=Math.min(le,(ft.start+ft.count)*Vt)),Pt!==null?(ee=Math.max(ee,0),le=Math.min(le,Pt.count)):Ft!=null&&(ee=Math.max(ee,0),le=Math.min(le,Ft.count));const Re=le-ee;if(Re<0||Re===1/0)return;_e.setup(k,Y,wt,$,Pt);let Te,ie=Mt;if(Pt!==null&&(Te=G.get(Pt),ie=Jt,ie.setIndex(Te)),k.isMesh)Y.wireframe===!0?(K.setLineWidth(Y.wireframeLinewidth*X()),ie.setMode(T.LINES)):ie.setMode(T.TRIANGLES);else if(k.isLine){let Ot=Y.linewidth;Ot===void 0&&(Ot=1),K.setLineWidth(Ot*X()),k.isLineSegments?ie.setMode(T.LINES):k.isLineLoop?ie.setMode(T.LINE_LOOP):ie.setMode(T.LINE_STRIP)}else k.isPoints?ie.setMode(T.POINTS):k.isSprite&&ie.setMode(T.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ie.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))ie.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ot=k._multiDrawStarts,Fe=k._multiDrawCounts,ce=k._multiDrawCount,bn=Pt?G.get(Pt).bytesPerElement:1,_s=V.get(Y).currentProgram.getUniforms();for(let an=0;an<ce;an++)_s.setValue(T,"_gl_DrawID",an),ie.render(Ot[an]/bn,Fe[an])}else if(k.isInstancedMesh)ie.renderInstances(ee,Re,k.count);else if($.isInstancedBufferGeometry){const Ot=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Fe=Math.min($.instanceCount,Ot);ie.renderInstances(ee,Re,Fe)}else ie.render(ee,Re)};function fe(S,z,$){S.transparent===!0&&S.side===Hn&&S.forceSinglePass===!1?(S.side=rn,S.needsUpdate=!0,Kr(S,z,$),S.side=Oi,S.needsUpdate=!0,Kr(S,z,$),S.side=Hn):Kr(S,z,$)}this.compile=function(S,z,$=null){$===null&&($=S),p=Ht.get($),p.init(z),A.push(p),$.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==$&&S.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const Y=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ft=k.material;if(ft)if(Array.isArray(ft))for(let Et=0;Et<ft.length;Et++){const wt=ft[Et];fe(wt,$,k),Y.add(wt)}else fe(ft,$,k),Y.add(ft)}),A.pop(),p=null,Y},this.compileAsync=function(S,z,$=null){const Y=this.compile(S,z,$);return new Promise(k=>{function ft(){if(Y.forEach(function(Et){V.get(Et).currentProgram.isReady()&&Y.delete(Et)}),Y.size===0){k(S);return}setTimeout(ft,10)}j.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let En=null;function Jn(S){En&&En(S)}function Jc(){zi.stop()}function Qc(){zi.start()}const zi=new $d;zi.setAnimationLoop(Jn),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(S){En=S,tt.setAnimationLoop(S),S===null?zi.stop():zi.start()},tt.addEventListener("sessionstart",Jc),tt.addEventListener("sessionend",Qc),this.render=function(S,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(z),z=tt.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,z,I),p=Ht.get(S,A.length),p.init(z),A.push(p),Bt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),st.setFromProjectionMatrix(Bt),Rt=this.localClippingEnabled,pt=ct.init(this.clippingPlanes,Rt),m=gt.get(S,C.length),m.init(),C.push(m),tt.enabled===!0&&tt.isPresenting===!0){const ft=x.xr.getDepthSensingMesh();ft!==null&&ma(ft,z,-1/0,x.sortObjects)}ma(S,z,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(_t,Tt),L=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,L&&Nt.addToRenderList(m,S),this.info.render.frame++,pt===!0&&ct.beginShadows();const $=p.state.shadowsArray;St.render($,S,z),pt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,k=m.transmissive;if(p.setupLights(),z.isArrayCamera){const ft=z.cameras;if(k.length>0)for(let Et=0,wt=ft.length;Et<wt;Et++){const Pt=ft[Et];eu(Y,k,S,Pt)}L&&Nt.render(S);for(let Et=0,wt=ft.length;Et<wt;Et++){const Pt=ft[Et];tu(m,S,Pt,Pt.viewport)}}else k.length>0&&eu(Y,k,S,z),L&&Nt.render(S),tu(m,S,z);I!==null&&(y.updateMultisampleRenderTarget(I),y.updateRenderTargetMipmap(I)),S.isScene===!0&&S.onAfterRender(x,S,z),_e.resetDefaultState(),b=-1,M=null,A.pop(),A.length>0?(p=A[A.length-1],pt===!0&&ct.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,C.pop(),C.length>0?m=C[C.length-1]:m=null};function ma(S,z,$,Y){if(S.visible===!1)return;if(S.layers.test(z.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(z);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||st.intersectsSprite(S)){Y&&Zt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Bt);const Et=q.update(S),wt=S.material;wt.visible&&m.push(S,Et,wt,$,Zt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||st.intersectsObject(S))){const Et=q.update(S),wt=S.material;if(Y&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Zt.copy(S.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Zt.copy(Et.boundingSphere.center)),Zt.applyMatrix4(S.matrixWorld).applyMatrix4(Bt)),Array.isArray(wt)){const Pt=Et.groups;for(let Vt=0,Gt=Pt.length;Vt<Gt;Vt++){const Ft=Pt[Vt],ee=wt[Ft.materialIndex];ee&&ee.visible&&m.push(S,Et,ee,$,Zt.z,Ft)}}else wt.visible&&m.push(S,Et,wt,$,Zt.z,null)}}const ft=S.children;for(let Et=0,wt=ft.length;Et<wt;Et++)ma(ft[Et],z,$,Y)}function tu(S,z,$,Y){const k=S.opaque,ft=S.transmissive,Et=S.transparent;p.setupLightsView($),pt===!0&&ct.setGlobalState(x.clippingPlanes,$),Y&&K.viewport(U.copy(Y)),k.length>0&&jr(k,z,$),ft.length>0&&jr(ft,z,$),Et.length>0&&jr(Et,z,$),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function eu(S,z,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new ds(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?Xr:mi,minFilter:as,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const ft=p.state.transmissionRenderTarget[Y.id],Et=Y.viewport||U;ft.setSize(Et.z,Et.w);const wt=x.getRenderTarget();x.setRenderTarget(ft),x.getClearColor(Q),ot=x.getClearAlpha(),ot<1&&x.setClearColor(16777215,.5),x.clear(),L&&Nt.render($);const Pt=x.toneMapping;x.toneMapping=Di;const Vt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),pt===!0&&ct.setGlobalState(x.clippingPlanes,Y),jr(S,$,Y),y.updateMultisampleRenderTarget(ft),y.updateRenderTargetMipmap(ft),j.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let Ft=0,ee=z.length;Ft<ee;Ft++){const le=z[Ft],Re=le.object,Te=le.geometry,ie=le.material,Ot=le.group;if(ie.side===Hn&&Re.layers.test(Y.layers)){const Fe=ie.side;ie.side=rn,ie.needsUpdate=!0,nu(Re,$,Y,Te,ie,Ot),ie.side=Fe,ie.needsUpdate=!0,Gt=!0}}Gt===!0&&(y.updateMultisampleRenderTarget(ft),y.updateRenderTargetMipmap(ft))}x.setRenderTarget(wt),x.setClearColor(Q,ot),Vt!==void 0&&(Y.viewport=Vt),x.toneMapping=Pt}function jr(S,z,$){const Y=z.isScene===!0?z.overrideMaterial:null;for(let k=0,ft=S.length;k<ft;k++){const Et=S[k],wt=Et.object,Pt=Et.geometry,Vt=Y===null?Et.material:Y,Gt=Et.group;wt.layers.test($.layers)&&nu(wt,z,$,Pt,Vt,Gt)}}function nu(S,z,$,Y,k,ft){S.onBeforeRender(x,z,$,Y,k,ft),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(x,z,$,Y,S,ft),k.transparent===!0&&k.side===Hn&&k.forceSinglePass===!1?(k.side=rn,k.needsUpdate=!0,x.renderBufferDirect($,z,Y,k,S,ft),k.side=Oi,k.needsUpdate=!0,x.renderBufferDirect($,z,Y,k,S,ft),k.side=Hn):x.renderBufferDirect($,z,Y,k,S,ft),S.onAfterRender(x,z,$,Y,k,ft)}function Kr(S,z,$){z.isScene!==!0&&(z=P);const Y=V.get(S),k=p.state.lights,ft=p.state.shadowsArray,Et=k.state.version,wt=mt.getParameters(S,k.state,ft,z,$),Pt=mt.getProgramCacheKey(wt);let Vt=Y.programs;Y.environment=S.isMeshStandardMaterial?z.environment:null,Y.fog=z.fog,Y.envMap=(S.isMeshStandardMaterial?N:g).get(S.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&S.envMap===null?z.environmentRotation:S.envMapRotation,Vt===void 0&&(S.addEventListener("dispose",$t),Vt=new Map,Y.programs=Vt);let Gt=Vt.get(Pt);if(Gt!==void 0){if(Y.currentProgram===Gt&&Y.lightsStateVersion===Et)return su(S,wt),Gt}else wt.uniforms=mt.getUniforms(S),S.onBeforeCompile(wt,x),Gt=mt.acquireProgram(wt,Pt),Vt.set(Pt,Gt),Y.uniforms=wt.uniforms;const Ft=Y.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ft.clippingPlanes=ct.uniform),su(S,wt),Y.needsLights=sp(S),Y.lightsStateVersion=Et,Y.needsLights&&(Ft.ambientLightColor.value=k.state.ambient,Ft.lightProbe.value=k.state.probe,Ft.directionalLights.value=k.state.directional,Ft.directionalLightShadows.value=k.state.directionalShadow,Ft.spotLights.value=k.state.spot,Ft.spotLightShadows.value=k.state.spotShadow,Ft.rectAreaLights.value=k.state.rectArea,Ft.ltc_1.value=k.state.rectAreaLTC1,Ft.ltc_2.value=k.state.rectAreaLTC2,Ft.pointLights.value=k.state.point,Ft.pointLightShadows.value=k.state.pointShadow,Ft.hemisphereLights.value=k.state.hemi,Ft.directionalShadowMap.value=k.state.directionalShadowMap,Ft.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ft.spotShadowMap.value=k.state.spotShadowMap,Ft.spotLightMatrix.value=k.state.spotLightMatrix,Ft.spotLightMap.value=k.state.spotLightMap,Ft.pointShadowMap.value=k.state.pointShadowMap,Ft.pointShadowMatrix.value=k.state.pointShadowMatrix),Y.currentProgram=Gt,Y.uniformsList=null,Gt}function iu(S){if(S.uniformsList===null){const z=S.currentProgram.getUniforms();S.uniformsList=No.seqWithValue(z.seq,S.uniforms)}return S.uniformsList}function su(S,z){const $=V.get(S);$.outputColorSpace=z.outputColorSpace,$.batching=z.batching,$.batchingColor=z.batchingColor,$.instancing=z.instancing,$.instancingColor=z.instancingColor,$.instancingMorph=z.instancingMorph,$.skinning=z.skinning,$.morphTargets=z.morphTargets,$.morphNormals=z.morphNormals,$.morphColors=z.morphColors,$.morphTargetsCount=z.morphTargetsCount,$.numClippingPlanes=z.numClippingPlanes,$.numIntersection=z.numClipIntersection,$.vertexAlphas=z.vertexAlphas,$.vertexTangents=z.vertexTangents,$.toneMapping=z.toneMapping}function np(S,z,$,Y,k){z.isScene!==!0&&(z=P),y.resetTextureUnits();const ft=z.fog,Et=Y.isMeshStandardMaterial?z.environment:null,wt=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Zs,Pt=(Y.isMeshStandardMaterial?N:g).get(Y.envMap||Et),Vt=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Gt=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ft=!!$.morphAttributes.position,ee=!!$.morphAttributes.normal,le=!!$.morphAttributes.color;let Re=Di;Y.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Re=x.toneMapping);const Te=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ie=Te!==void 0?Te.length:0,Ot=V.get(Y),Fe=p.state.lights;if(pt===!0&&(Rt===!0||S!==M)){const je=S===M&&Y.id===b;ct.setState(Y,S,je)}let ce=!1;Y.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==Fe.state.version||Ot.outputColorSpace!==wt||k.isBatchedMesh&&Ot.batching===!1||!k.isBatchedMesh&&Ot.batching===!0||k.isBatchedMesh&&Ot.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ot.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ot.instancing===!1||!k.isInstancedMesh&&Ot.instancing===!0||k.isSkinnedMesh&&Ot.skinning===!1||!k.isSkinnedMesh&&Ot.skinning===!0||k.isInstancedMesh&&Ot.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ot.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ot.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ot.instancingMorph===!1&&k.morphTexture!==null||Ot.envMap!==Pt||Y.fog===!0&&Ot.fog!==ft||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==ct.numPlanes||Ot.numIntersection!==ct.numIntersection)||Ot.vertexAlphas!==Vt||Ot.vertexTangents!==Gt||Ot.morphTargets!==Ft||Ot.morphNormals!==ee||Ot.morphColors!==le||Ot.toneMapping!==Re||Ot.morphTargetsCount!==ie)&&(ce=!0):(ce=!0,Ot.__version=Y.version);let bn=Ot.currentProgram;ce===!0&&(bn=Kr(Y,z,k));let _s=!1,an=!1,ir=!1;const Me=bn.getUniforms(),hn=Ot.uniforms;if(K.useProgram(bn.program)&&(_s=!0,an=!0,ir=!0),Y.id!==b&&(b=Y.id,an=!0),_s||M!==S){K.buffers.depth.getReversed()?(vt.copy(S.projectionMatrix),Fv(vt),Ov(vt),Me.setValue(T,"projectionMatrix",vt)):Me.setValue(T,"projectionMatrix",S.projectionMatrix),Me.setValue(T,"viewMatrix",S.matrixWorldInverse);const nn=Me.map.cameraPosition;nn!==void 0&&nn.setValue(T,kt.setFromMatrixPosition(S.matrixWorld)),rt.logarithmicDepthBuffer&&Me.setValue(T,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Me.setValue(T,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,an=!0,ir=!0)}if(k.isSkinnedMesh){Me.setOptional(T,k,"bindMatrix"),Me.setOptional(T,k,"bindMatrixInverse");const je=k.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),Me.setValue(T,"boneTexture",je.boneTexture,y))}k.isBatchedMesh&&(Me.setOptional(T,k,"batchingTexture"),Me.setValue(T,"batchingTexture",k._matricesTexture,y),Me.setOptional(T,k,"batchingIdTexture"),Me.setValue(T,"batchingIdTexture",k._indirectTexture,y),Me.setOptional(T,k,"batchingColorTexture"),k._colorsTexture!==null&&Me.setValue(T,"batchingColorTexture",k._colorsTexture,y));const fn=$.morphAttributes;if((fn.position!==void 0||fn.normal!==void 0||fn.color!==void 0)&&It.update(k,$,bn),(an||Ot.receiveShadow!==k.receiveShadow)&&(Ot.receiveShadow=k.receiveShadow,Me.setValue(T,"receiveShadow",k.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(hn.envMap.value=Pt,hn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&z.environment!==null&&(hn.envMapIntensity.value=z.environmentIntensity),an&&(Me.setValue(T,"toneMappingExposure",x.toneMappingExposure),Ot.needsLights&&ip(hn,ir),ft&&Y.fog===!0&&ht.refreshFogUniforms(hn,ft),ht.refreshMaterialUniforms(hn,Y,W,it,p.state.transmissionRenderTarget[S.id]),No.upload(T,iu(Ot),hn,y)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(No.upload(T,iu(Ot),hn,y),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Me.setValue(T,"center",k.center),Me.setValue(T,"modelViewMatrix",k.modelViewMatrix),Me.setValue(T,"normalMatrix",k.normalMatrix),Me.setValue(T,"modelMatrix",k.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const je=Y.uniformsGroups;for(let nn=0,ga=je.length;nn<ga;nn++){const ki=je[nn];B.update(ki,bn),B.bind(ki,bn)}}return bn}function ip(S,z){S.ambientLightColor.needsUpdate=z,S.lightProbe.needsUpdate=z,S.directionalLights.needsUpdate=z,S.directionalLightShadows.needsUpdate=z,S.pointLights.needsUpdate=z,S.pointLightShadows.needsUpdate=z,S.spotLights.needsUpdate=z,S.spotLightShadows.needsUpdate=z,S.rectAreaLights.needsUpdate=z,S.hemisphereLights.needsUpdate=z}function sp(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(S,z,$){V.get(S.texture).__webglTexture=z,V.get(S.depthTexture).__webglTexture=$;const Y=V.get(S);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=$===void 0,Y.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,z){const $=V.get(S);$.__webglFramebuffer=z,$.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(S,z=0,$=0){I=S,w=z,R=$;let Y=!0,k=null,ft=!1,Et=!1;if(S){const Pt=V.get(S);if(Pt.__useDefaultFramebuffer!==void 0)K.bindFramebuffer(T.FRAMEBUFFER,null),Y=!1;else if(Pt.__webglFramebuffer===void 0)y.setupRenderTarget(S);else if(Pt.__hasExternalTextures)y.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ft=S.depthTexture;if(Pt.__boundDepthTexture!==Ft){if(Ft!==null&&V.has(Ft)&&(S.width!==Ft.image.width||S.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");y.setupDepthRenderbuffer(S)}}const Vt=S.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Et=!0);const Gt=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Gt[z])?k=Gt[z][$]:k=Gt[z],ft=!0):S.samples>0&&y.useMultisampledRTT(S)===!1?k=V.get(S).__webglMultisampledFramebuffer:Array.isArray(Gt)?k=Gt[$]:k=Gt,U.copy(S.viewport),O.copy(S.scissor),H=S.scissorTest}else U.copy(Ct).multiplyScalar(W).floor(),O.copy(zt).multiplyScalar(W).floor(),H=ae;if(K.bindFramebuffer(T.FRAMEBUFFER,k)&&Y&&K.drawBuffers(S,k),K.viewport(U),K.scissor(O),K.setScissorTest(H),ft){const Pt=V.get(S.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+z,Pt.__webglTexture,$)}else if(Et){const Pt=V.get(S.texture),Vt=z||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Pt.__webglTexture,$||0,Vt)}b=-1},this.readRenderTargetPixels=function(S,z,$,Y,k,ft,Et){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(wt=wt[Et]),wt){K.bindFramebuffer(T.FRAMEBUFFER,wt);try{const Pt=S.texture,Vt=Pt.format,Gt=Pt.type;if(!rt.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=S.width-Y&&$>=0&&$<=S.height-k&&T.readPixels(z,$,Y,k,Wt.convert(Vt),Wt.convert(Gt),ft)}finally{const Pt=I!==null?V.get(I).__webglFramebuffer:null;K.bindFramebuffer(T.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(S,z,$,Y,k,ft,Et){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(wt=wt[Et]),wt){const Pt=S.texture,Vt=Pt.format,Gt=Pt.type;if(!rt.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=S.width-Y&&$>=0&&$<=S.height-k){K.bindFramebuffer(T.FRAMEBUFFER,wt);const Ft=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Ft),T.bufferData(T.PIXEL_PACK_BUFFER,ft.byteLength,T.STREAM_READ),T.readPixels(z,$,Y,k,Wt.convert(Vt),Wt.convert(Gt),0);const ee=I!==null?V.get(I).__webglFramebuffer:null;K.bindFramebuffer(T.FRAMEBUFFER,ee);const le=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Nv(T,le,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Ft),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,ft),T.deleteBuffer(Ft),T.deleteSync(le),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,z=null,$=0){S.isTexture!==!0&&(Ns("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,S=arguments[1]);const Y=Math.pow(2,-$),k=Math.floor(S.image.width*Y),ft=Math.floor(S.image.height*Y),Et=z!==null?z.x:0,wt=z!==null?z.y:0;y.setTexture2D(S,0),T.copyTexSubImage2D(T.TEXTURE_2D,$,0,0,Et,wt,k,ft),K.unbindTexture()};const rp=T.createFramebuffer(),op=T.createFramebuffer();this.copyTextureToTexture=function(S,z,$=null,Y=null,k=0,ft=null){S.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,S=arguments[1],z=arguments[2],ft=arguments[3]||0,$=null),ft===null&&(k!==0?(Ns("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=k,k=0):ft=0);let Et,wt,Pt,Vt,Gt,Ft,ee,le,Re;const Te=S.isCompressedTexture?S.mipmaps[ft]:S.image;if($!==null)Et=$.max.x-$.min.x,wt=$.max.y-$.min.y,Pt=$.isBox3?$.max.z-$.min.z:1,Vt=$.min.x,Gt=$.min.y,Ft=$.isBox3?$.min.z:0;else{const fn=Math.pow(2,-k);Et=Math.floor(Te.width*fn),wt=Math.floor(Te.height*fn),S.isDataArrayTexture?Pt=Te.depth:S.isData3DTexture?Pt=Math.floor(Te.depth*fn):Pt=1,Vt=0,Gt=0,Ft=0}Y!==null?(ee=Y.x,le=Y.y,Re=Y.z):(ee=0,le=0,Re=0);const ie=Wt.convert(z.format),Ot=Wt.convert(z.type);let Fe;z.isData3DTexture?(y.setTexture3D(z,0),Fe=T.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(y.setTexture2DArray(z,0),Fe=T.TEXTURE_2D_ARRAY):(y.setTexture2D(z,0),Fe=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,z.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,z.unpackAlignment);const ce=T.getParameter(T.UNPACK_ROW_LENGTH),bn=T.getParameter(T.UNPACK_IMAGE_HEIGHT),_s=T.getParameter(T.UNPACK_SKIP_PIXELS),an=T.getParameter(T.UNPACK_SKIP_ROWS),ir=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,Te.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Te.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Vt),T.pixelStorei(T.UNPACK_SKIP_ROWS,Gt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ft);const Me=S.isDataArrayTexture||S.isData3DTexture,hn=z.isDataArrayTexture||z.isData3DTexture;if(S.isDepthTexture){const fn=V.get(S),je=V.get(z),nn=V.get(fn.__renderTarget),ga=V.get(je.__renderTarget);K.bindFramebuffer(T.READ_FRAMEBUFFER,nn.__webglFramebuffer),K.bindFramebuffer(T.DRAW_FRAMEBUFFER,ga.__webglFramebuffer);for(let ki=0;ki<Pt;ki++)Me&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,V.get(S).__webglTexture,k,Ft+ki),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,V.get(z).__webglTexture,ft,Re+ki)),T.blitFramebuffer(Vt,Gt,Et,wt,ee,le,Et,wt,T.DEPTH_BUFFER_BIT,T.NEAREST);K.bindFramebuffer(T.READ_FRAMEBUFFER,null),K.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||V.has(S)){const fn=V.get(S),je=V.get(z);K.bindFramebuffer(T.READ_FRAMEBUFFER,rp),K.bindFramebuffer(T.DRAW_FRAMEBUFFER,op);for(let nn=0;nn<Pt;nn++)Me?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,fn.__webglTexture,k,Ft+nn):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,fn.__webglTexture,k),hn?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,je.__webglTexture,ft,Re+nn):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,je.__webglTexture,ft),k!==0?T.blitFramebuffer(Vt,Gt,Et,wt,ee,le,Et,wt,T.COLOR_BUFFER_BIT,T.NEAREST):hn?T.copyTexSubImage3D(Fe,ft,ee,le,Re+nn,Vt,Gt,Et,wt):T.copyTexSubImage2D(Fe,ft,ee,le,Vt,Gt,Et,wt);K.bindFramebuffer(T.READ_FRAMEBUFFER,null),K.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else hn?S.isDataTexture||S.isData3DTexture?T.texSubImage3D(Fe,ft,ee,le,Re,Et,wt,Pt,ie,Ot,Te.data):z.isCompressedArrayTexture?T.compressedTexSubImage3D(Fe,ft,ee,le,Re,Et,wt,Pt,ie,Te.data):T.texSubImage3D(Fe,ft,ee,le,Re,Et,wt,Pt,ie,Ot,Te):S.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,ft,ee,le,Et,wt,ie,Ot,Te.data):S.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,ft,ee,le,Te.width,Te.height,ie,Te.data):T.texSubImage2D(T.TEXTURE_2D,ft,ee,le,Et,wt,ie,Ot,Te);T.pixelStorei(T.UNPACK_ROW_LENGTH,ce),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,bn),T.pixelStorei(T.UNPACK_SKIP_PIXELS,_s),T.pixelStorei(T.UNPACK_SKIP_ROWS,an),T.pixelStorei(T.UNPACK_SKIP_IMAGES,ir),ft===0&&z.generateMipmaps&&T.generateMipmap(Fe),K.unbindTexture()},this.copyTextureToTexture3D=function(S,z,$=null,Y=null,k=0){return S.isTexture!==!0&&(Ns("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,Y=arguments[1]||null,S=arguments[2],z=arguments[3],k=arguments[4]||0),Ns('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,z,$,Y,k)},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&y.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?y.setTextureCube(S,0):S.isData3DTexture?y.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?y.setTexture2DArray(S,0):y.setTexture2D(S,0),K.unbindTexture()},this.resetState=function(){w=0,R=0,I=null,K.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}const $h={type:"change"},qc={type:"start"},Zd={type:"end"},To=new zc,Yh=new Ai,mE=Math.cos(70*dr.DEG2RAD),De=new F,sn=2*Math.PI,me={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},hl=1e-6;class gE extends D0{constructor(t,e=null){super(t,e),this.state=me.NONE,this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hs.ROTATE,MIDDLE:Hs.DOLLY,RIGHT:Hs.PAN},this.touches={ONE:Fs.ROTATE,TWO:Fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new ps,this._lastTargetPosition=new F,this._quat=new ps().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mh,this._sphericalDelta=new Mh,this._scale=1,this._panOffset=new F,this._rotateStart=new Dt,this._rotateEnd=new Dt,this._rotateDelta=new Dt,this._panStart=new Dt,this._panEnd=new Dt,this._panDelta=new Dt,this._dollyStart=new Dt,this._dollyEnd=new Dt,this._dollyDelta=new Dt,this._dollyDirection=new F,this._mouse=new Dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vE.bind(this),this._onPointerDown=_E.bind(this),this._onPointerUp=xE.bind(this),this._onContextMenu=AE.bind(this),this._onMouseWheel=yE.bind(this),this._onKeyDown=EE.bind(this),this._onTouchStart=bE.bind(this),this._onTouchMove=TE.bind(this),this._onMouseDown=ME.bind(this),this._onMouseMove=SE.bind(this),this._interceptControlDown=wE.bind(this),this._interceptControlUp=RE.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($h),this.update(),this.state=me.NONE}update(t=null){const e=this.object.position;De.copy(e).sub(this.target),De.applyQuaternion(this._quat),this._spherical.setFromVector3(De),this.autoRotate&&this.state===me.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(De.setFromSpherical(this._spherical),De.applyQuaternion(this._quatInverse),e.copy(this.target).add(De),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=De.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=De.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(To.origin.copy(this.object.position),To.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(To.direction))<mE?this.object.lookAt(this.target):(Yh.setFromNormalAndCoplanarPoint(this.object.up,this.target),To.intersectPlane(Yh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>hl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>hl||this._lastTargetPosition.distanceToSquared(this.target)>hl?(this.dispatchEvent($h),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){De.setFromMatrixColumn(e,0),De.multiplyScalar(-t),this._panOffset.add(De)}_panUp(t,e){this.screenSpacePanning===!0?De.setFromMatrixColumn(e,1):(De.setFromMatrixColumn(e,0),De.crossVectors(this.object.up,De)),De.multiplyScalar(t),this._panOffset.add(De)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;De.copy(s).sub(this.target);let r=De.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(sn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Dt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function _E(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function vE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function xE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Zd),this.state=me.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function ME(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=me.DOLLY;break;case Hs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=me.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=me.ROTATE}break;case Hs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=me.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=me.PAN}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(qc)}function SE(n){switch(this.state){case me.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case me.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function yE(n){this.enabled===!1||this.enableZoom===!1||this.state!==me.NONE||(n.preventDefault(),this.dispatchEvent(qc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Zd))}function EE(n){this.enabled!==!1&&this._handleKeyDown(n)}function bE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=me.TOUCH_ROTATE;break;case Fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=me.TOUCH_PAN;break;default:this.state=me.NONE}break;case 2:switch(this.touches.TWO){case Fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=me.TOUCH_DOLLY_PAN;break;case Fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=me.TOUCH_DOLLY_ROTATE;break;default:this.state=me.NONE}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(qc)}function TE(n){switch(this._trackPointer(n),this.state){case me.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case me.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case me.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case me.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=me.NONE}}function AE(n){this.enabled!==!1&&n.preventDefault()}function wE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function RE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Jd=["L1","L2","L3","L4","L5"],jc=26,Kc=10,Zc=jc+Kc,Fo=["L1-L2","L2-L3","L3-L4","L4-L5","L5-S1"],fl=new F(0,24,-17),dl=new F(0,-186,-17),pl=8,Qd=n=>-n*Zc,Jo=n=>-n*Zc-jc/2-Kc/2;function tp(){return new ci({color:15129544,roughness:.75,metalness:.05})}function CE(n){const t=new Os,e=Jd[n],i=tp(),s=new xe(new Li(21,23,jc,28),i);s.scale.z=.72,s.userData={kind:"vertebra",label:e},t.add(s);const r=new Pn(6,10,12);for(const u of[-1,1]){const h=new xe(r,i);h.position.set(u*9,0,-19),h.userData={kind:"vertebra",label:e},t.add(h)}const o=new xe(new Pn(16,15,4),i);o.position.set(0,0,-29),o.userData={kind:"vertebra",label:e},t.add(o);const a=new xe(new Pn(5,13,18),i);a.position.set(0,-3,-38),a.userData={kind:"vertebra",label:e},t.add(a);const l=new Pn(15,4,5);for(const u of[-1,1]){const h=new xe(l,i);h.position.set(u*20,4,-17),h.userData={kind:"vertebra",label:e},t.add(h)}const c=new Pn(6,10,7);for(const u of[-1,1]){const h=new xe(c,i);h.position.set(u*11,-3,-26),h.userData={kind:"vertebra",label:e},t.add(h)}return t.position.y=Qd(n),t}function PE(n){const t=new Li(20,20,Kc,28),e=new ci({color:9414840,roughness:.6,transparent:!0,opacity:.85}),i=new xe(t,e);return i.scale.z=.72,i.position.y=Jo(n),i.userData={kind:"disc",label:Fo[n]+" 椎间盘"},i}function DE(n,t){const e=t,i=Jo(n),s=[new F(e*4,i+34,-17),new F(e*7,i+15,-17),new F(e*13,i+6,-16),new F(e*20,i+1,-14),new F(e*28,i-4,-10),new F(e*35,i-8,-4)],r=new Vd(s),o=Jd[n],a=e<0?"左":"右",l=new ci({color:14206058,roughness:.5,emissive:0}),c=new xe(new $c(r,40,2.2,8,!1),l);return c.userData={kind:"nerveRoot",label:`${a}${o}神经根`,root:o,side:a,segIdx:n},{tube:c,curve:r,samples:r.getSpacedPoints(80),name:`${a}${o}`,segIdx:n}}function LE(n,t,e){const i=new F().subVectors(e,t),s=Math.max(0,Math.min(1,new F().subVectors(n,t).dot(i)/i.lengthSq()));return n.distanceTo(new F().copy(t).addScaledVector(i,s))}class IE{constructor(t,e={}){this.opts=e,this.container=t,this.segment=e.segment||"L4-L5",this.side=e.side==="右"?1:-1,this.needle={az:45,el:10,advance:0},this.marks={vertebra:"",foramen:"",nerveRoot:""},this.alert=!1,this._disposed=!1;const i=t.clientWidth||800,s=t.clientHeight||600;this.renderer=new pE({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setSize(i,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.appendChild(this.renderer.domElement),this.scene=new o0,this.scene.background=new te(1053980),this.scene.fog=new Vc(1053980,400,900),this.camera=new _n(45,i/s,1,2e3),this.camera.position.set(-150,-50,-190),this.controls=new gE(this.camera,this.renderer.domElement),this.controls.target.set(0,-85,-12),this.controls.enableDamping=!0,this.scene.add(new R0(16777215,.55));const r=new _h(16777215,1.4);r.position.set(-120,120,-80),this.scene.add(r);const o=new _h(8956671,.4);o.position.set(150,-40,120),this.scene.add(o),this.pickables=[],this.vertebraMeshes=[];for(let m=0;m<5;m++){const p=CE(m);this.scene.add(p),p.traverse(C=>{C.isMesh&&(this.pickables.push(C),this.vertebraMeshes.push(C))}),m<5&&this.scene.add(PE(m))}const a=new xe(new Pn(46,30,26),tp());a.position.set(0,Qd(4)-Zc+2,-6),a.userData={kind:"vertebra",label:"S1"},this.scene.add(a),this.pickables.push(a);const l=fl.distanceTo(dl);this.dural=new xe(new Li(pl,pl*.7,l,20),new ci({color:15787680,transparent:!0,opacity:.32,roughness:.4})),this.dural.position.copy(new F().addVectors(fl,dl).multiplyScalar(.5)),this.dural.userData={kind:"dural",label:"硬膜囊"},this.scene.add(this.dural),this.pickables.push(this.dural),this.roots=[];for(let m=0;m<5;m++)for(const p of[-1,1]){const C=DE(m,p);this.roots.push(C),this.scene.add(C.tube),this.pickables.push(C.tube)}this.foramina=[];const c=new Zo(5,16,16);for(let m=0;m<5;m++)for(const p of[-1,1]){const C=new xe(c,new ci({color:5032432,transparent:!0,opacity:.35,emissive:666170}));C.position.set(p*23,Jo(m),-14),C.userData={kind:"foramen",label:`${Fo[m]}${p<0?"左":"右"}椎间孔`,segIdx:m,side:p<0?"左":"右"},this.scene.add(C),this.foramina.push(C),this.pickables.push(C)}this.targetMarker=new xe(new Zo(2,16,16),new Hc({color:16729156})),this.scene.add(this.targetMarker),this.needleGroup=new Os,this.needleMat=new ci({color:13685976,metalness:.85,roughness:.3}),this.tipMat=new ci({color:16740419,metalness:.4,roughness:.4,emissive:3346437});const u=150,h=new xe(new Li(.7,.7,u,12),this.needleMat);h.geometry.rotateX(Math.PI/2),h.position.z=-u/2;const f=new xe(new Xc(.9,5,12),this.tipMat);f.geometry.rotateX(Math.PI/2),f.position.z=2.5;const d=new xe(new Li(3.2,3.2,14,12),new ci({color:3829416,roughness:.5}));d.geometry.rotateX(Math.PI/2),d.position.z=-u-7,this.needleGroup.add(h,f,d),this.needleGroup.userData={kind:"needle"},this.needleGroup.traverse(m=>{m.userData.kind="needle"}),this.scene.add(this.needleGroup),this.needlePick=[h,f,d];const _=new xe(new qr(320,320),new ci({color:13214089,transparent:!0,opacity:.12,side:Hn}));_.position.set(0,-85,-60),this.scene.add(_),this.raycaster=new P0,this.pointer=new Dt,this._dragNeedle=!1,this._downPos=null;const v=this.renderer.domElement;this._onPointerDown=m=>{if(this._downPos={x:m.clientX,y:m.clientY},!this.opts.editable)return;this._raycast(m,this.needlePick)&&(this._dragNeedle=!0,this.controls.enabled=!1,v.setPointerCapture(m.pointerId))},this._onPointerMove=m=>{var p,C,A,x;if(this._dragNeedle)this.needle.az=dr.clamp(this.needle.az+m.movementX*.2,0,80),this.needle.el=dr.clamp(this.needle.el-m.movementY*.2,-30,45),this._updateNeedle(),(C=(p=this.opts).onNeedleChange)==null||C.call(p,{...this.needle});else{const D=this._raycast(m,this.pickables.concat(this.needlePick));(x=(A=this.opts).onHover)==null||x.call(A,D?D.object.userData.kind==="needle"?"穿刺针(拖拽调整角度)":D.object.userData.label:"")}},this._onPointerUp=m=>{var C,A;const p=this._dragNeedle;if(this._dragNeedle=!1,this.controls.enabled=!0,!(!this.opts.editable||p)){if(this._downPos&&Math.hypot(m.clientX-this._downPos.x,m.clientY-this._downPos.y)<5){const x=this._raycast(m,this.pickables);x&&["vertebra","foramen","nerveRoot"].includes(x.object.userData.kind)&&((A=(C=this.opts).onMark)==null||A.call(C,{kind:x.object.userData.kind,label:x.object.userData.label}))}this._downPos=null}},v.addEventListener("pointerdown",this._onPointerDown),v.addEventListener("pointermove",this._onPointerMove),v.addEventListener("pointerup",this._onPointerUp),this._resizeObs=new ResizeObserver(()=>this.resize()),this._resizeObs.observe(t),this.setSegment(this.segment,this.opts.side||"左"),this.setNeedle(e.needle||{}),this._animate()}_raycast(t,e){const i=this.renderer.domElement.getBoundingClientRect();return this.pointer.set((t.clientX-i.left)/i.width*2-1,-((t.clientY-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.intersectObjects(e,!1)[0]||null}_targetPos(){const t=Fo.indexOf(this.segment);return new F(this.side*23,Jo(Math.max(0,t)),-14)}_needleDir(){const t=dr.degToRad(this.needle.az),e=dr.degToRad(this.needle.el),i=this.side;return new F(-i*Math.sin(t)*Math.cos(e),Math.sin(e),Math.cos(t)*Math.cos(e)).normalize()}_updateNeedle(){const t=this._targetPos(),e=this._needleDir();this.needleGroup.position.copy(t).addScaledVector(e,this.needle.advance),this.needleGroup.quaternion.setFromUnitVectors(new F(0,0,1),e),this.targetMarker.position.copy(t),this._reportDistances()}tipWorld(){return this.needleGroup.position.clone()}computeDistances(){const t=this.tipWorld();let e=1/0,i="";for(const r of this.roots)for(const o of r.samples){const a=t.distanceTo(o)-2.2;a<e&&(e=a,i=r.name)}const s=LE(t,fl,dl)-pl;return{root:Math.max(0,e),rootName:i,dural:Math.max(0,s),tip:t.toArray().map(r=>+r.toFixed(1))}}_reportDistances(){var i,s;const t=this.computeDistances(),e=t.root<3||t.dural<3;e!==this.alert&&(this.alert=e,this.tipMat.color.set(e?16720418:16740419),this.tipMat.emissive.set(e?8917265:3346437)),(s=(i=this.opts).onDistances)==null||s.call(i,t)}setSegment(t,e){this.segment=t,this.side=e==="右"?1:-1;const i=Fo.indexOf(t);for(const s of this.roots){const r=s.segIdx===i;s.tube.material.color.set(r?16756768:14206058),s.tube.material.emissive.set(r?5583616:0)}for(const s of this.foramina){const r=s.userData.segIdx===i&&s.userData.side===e;s.material.opacity=r?.75:.25}this._updateNeedle()}setNeedle(t){Object.assign(this.needle,t),this._updateNeedle()}setMarks(t){this.marks={...t};const e=3526783;for(const i of this.vertebraMeshes)i.material=i.material.clone(),i.material.emissive=new te(i.userData.label===t.vertebra?e:0),i.material.emissiveIntensity=i.userData.label===t.vertebra?.35:0;for(const i of this.foramina){const s=t.foramen&&i.userData.label.includes(t.foramen.replace("椎间孔",""));i.material.color.set(s?e:5032432)}for(const i of this.roots)t.nerveRoot&&i.tube.userData.label===t.nerveRoot&&(i.tube.material.color.set(e),i.tube.material.emissive.set(672806))}screenshot(){return this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}resize(){const t=this.container.clientWidth,e=this.container.clientHeight;!t||!e||(this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e))}_animate(){if(this._disposed)return;this._raf=requestAnimationFrame(()=>this._animate()),this.controls.update();const t=performance.now()/1e3;this.targetMarker.scale.setScalar(1+.25*Math.sin(t*4)),this.renderer.render(this.scene,this.camera)}dispose(){var e;this._disposed=!0,cancelAnimationFrame(this._raf),this._resizeObs.disconnect();const t=this.renderer.domElement;t.removeEventListener("pointerdown",this._onPointerDown),t.removeEventListener("pointermove",this._onPointerMove),t.removeEventListener("pointerup",this._onPointerUp),this.controls.dispose(),this.renderer.dispose(),(e=t.parentNode)==null||e.removeChild(t)}}const nr=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},UE={class:"needle-view"},NE={key:0,class:"alert-flash"},FE={key:0,class:"alert-border"},OE={key:1,class:"hover-tip"},BE={key:2,class:"dist-panel"},zE={__name:"NeedleView",props:{segment:{type:String,default:"L4-L5"},side:{type:String,default:"左"},needle:{type:Object,default:()=>({az:45,el:10,advance:0})},marks:{type:Object,default:()=>({})},editable:{type:Boolean,default:!1}},emits:["update:needle","mark","distances"],setup(n,{expose:t,emit:e}){const i=n,s=e,r=Ne(null),o=Ne(""),a=Ne(null);let l=null;const c=Se(()=>a.value&&(a.value.root<3||a.value.dural<3)),u=Se(()=>a.value?a.value.root<3&&a.value.dural<3?"神经根与硬膜囊":a.value.root<3?`神经根(${a.value.rootName})`:"硬膜囊":"");la(()=>{l=new IE(r.value,{editable:i.editable,segment:i.segment,side:i.side,needle:i.needle,onHover:f=>o.value=f,onMark:f=>s("mark",f),onNeedleChange:f=>s("update:needle",f),onDistances:f=>{a.value=f,s("distances",f)}}),i.marks&&l.setMarks(i.marks)}),Wn(()=>[i.segment,i.side],()=>l==null?void 0:l.setSegment(i.segment,i.side)),Wn(()=>i.needle,f=>{f&&l&&l.setNeedle(f)},{deep:!0}),Wn(()=>i.marks,f=>{f&&l&&l.setMarks(f)},{deep:!0});function h(){return(l==null?void 0:l.screenshot())||""}return t({screenshot:h}),bc(()=>{l==null||l.dispose(),l=null}),(f,d)=>(ut(),dt("div",UE,[E("div",{ref_key:"el",ref:r,class:"viewport"},null,512),ze(cg,{name:"flash"},{default:wf(()=>[c.value?(ut(),dt("div",NE," ⚠ 危险:针尖距"+et(u.value)+"小于 3mm,请调整路径 ",1)):ne("",!0)]),_:1}),c.value?(ut(),dt("div",FE)):ne("",!0),o.value?(ut(),dt("div",OE,et(o.value),1)):ne("",!0),a.value?(ut(),dt("div",BE,[E("div",{class:We(["dist-row",{bad:a.value.root<3}])},[E("span",null,"针尖-神经根("+et(a.value.rootName)+")",1),E("b",null,et(a.value.root.toFixed(1))+" mm",1)],2),E("div",{class:We(["dist-row",{bad:a.value.dural<3}])},[d[0]||(d[0]=E("span",null,"针尖-硬膜囊",-1)),E("b",null,et(a.value.dural.toFixed(1))+" mm",1)],2)])):ne("",!0)]))}},kE=nr(zE,[["__scopeId","data-v-822fb608"]]),HE={key:0,class:"planner"},VE={class:"planner-left"},GE={key:0,class:"hint"},WE={key:1,class:"hint"},XE={class:"planner-right"},$E={class:"card"},YE={class:"kv"},qE={class:"kv"},jE={class:"kv"},KE={class:"kv"},ZE={class:"kv"},JE={class:"kv"},QE={key:0,class:"card"},tb={class:"row"},eb={class:"img-list"},nb=["src","alt","onClick"],ib=["onClick"],sb={key:0,class:"empty"},rb={key:1,class:"card"},ob={class:"img-list"},ab=["src","alt","onClick"],lb={key:0,class:"empty"},cb={class:"card"},ub={class:"kv"},hb={class:"kv"},fb={class:"kv"},db={key:2,class:"card"},pb={class:"row"},mb=["value"],gb=["disabled"],_b={class:"card"},vb={class:"slider"},xb=["disabled"],Mb={class:"slider"},Sb=["disabled"],yb={class:"slider"},Eb=["disabled"],bb={key:3,class:"card"},Tb={key:0,class:"err-list"},Ab={key:1,class:"ok-text"},wb=["disabled"],Rb={class:"card"},Cb={class:"log"},Pb={class:"log-t"},Db={class:"log-u"},Lb=["src"],Ib={__name:"PlannerView",props:{caseId:{type:String,required:!0}},emits:["back"],setup(n,{emit:t}){const e=n,i=t,s=Se(()=>Or(e.caseId)),r=Se(()=>Lt.user.role==="physician"&&s.value&&["planning","rejected"].includes(s.value.status)),o=Ne(null),a=Ne(null),l=Ne("CT"),c=Ne(""),u=Ne(""),h=Ne({}),f=Se(()=>Lt.templates.filter(D=>{var w;return D.segment===((w=s.value)==null?void 0:w.segment)}));async function d(){if(s.value){for(const D of s.value.images)if(!h.value[D.id]){const w=await ud(D.id);w&&(h.value[D.id]=URL.createObjectURL(w))}}}la(d),Wn(()=>{var D;return(D=s.value)==null?void 0:D.images.length},d);function _(D){Qg(s.value,D)}function v(D){if(!r.value)return;const w={};D.kind==="vertebra"&&(w.vertebra=D.label),D.kind==="foramen"&&(w.foramen=D.label),D.kind==="nerveRoot"&&(w.nerveRoot=D.label),Jg(s.value,w)}async function m(D){const w=[...D.target.files];w.length&&await Kg(s.value,w,l.value),D.target.value="",d()}async function p(D){await Zg(s.value,D),delete h.value[D.id]}function C(){t_(s.value,c.value),c.value=""}const A=Se(()=>s.value?e_(s.value,a.value):[]);function x(){var w;if(A.value.length)return;const D=((w=o.value)==null?void 0:w.screenshot())||"";n_(s.value,a.value,D),i("back")}return(D,w)=>s.value?(ut(),dt("div",HE,[E("div",VE,[ze(kE,{ref_key:"nv",ref:o,segment:s.value.segment,side:s.value.side,needle:s.value.needle,marks:s.value.marks,editable:r.value,"onUpdate:needle":_,onMark:v,onDistances:w[0]||(w[0]=R=>a.value=R)},null,8,["segment","side","needle","marks","editable"]),r.value?(ut(),dt("div",GE," 点击模型标记椎体 / 椎间孔 / 神经根 · 拖拽穿刺针调整角度 · 红色球为靶点("+et(s.value.segment)+et(s.value.side)+"椎间孔) ",1)):(ut(),dt("div",WE,"审签视图(只读)· 可旋转缩放查看三维路径"))]),E("div",XE,[E("section",$E,[E("h4",null,[w[7]||(w[7]=qt("病例信息 ",-1)),E("span",{class:We(["tag","st-"+s.value.status])},et(ue(Al)[s.value.status]),3)]),E("div",YE,[w[8]||(w[8]=E("span",null,"病例号",-1)),qt(et(s.value.id),1)]),E("div",qE,[w[9]||(w[9]=E("span",null,"患者",-1)),qt(et(s.value.patientName)+"("+et(s.value.sex)+"/"+et(s.value.age)+"岁) "+et(s.value.patientId),1)]),E("div",jE,[w[10]||(w[10]=E("span",null,"疼痛节段",-1)),qt(et(s.value.segment),1)]),E("div",KE,[w[11]||(w[11]=E("span",null,"责任神经根",-1)),qt(et(s.value.side)+et(s.value.root),1)]),E("div",ZE,[w[12]||(w[12]=E("span",null,"既往手术史",-1)),qt(et(s.value.surgeryHistory),1)]),E("div",JE,[w[13]||(w[13]=E("span",null,"凝血",-1)),qt(" PT "+et(s.value.coag.PT)+"s · APTT "+et(s.value.coag.APTT)+"s · INR "+et(s.value.coag.INR)+" · PLT "+et(s.value.coag.PLT),1)])]),r.value?(ut(),dt("section",QE,[w[15]||(w[15]=E("h4",null,"影像导入",-1)),E("div",tb,[de(E("select",{"onUpdate:modelValue":w[1]||(w[1]=R=>l.value=R),class:"input slim"},[...w[14]||(w[14]=[E("option",null,"CT",-1),E("option",null,"透视",-1)])],512),[[xn,l.value]]),E("input",{type:"file",accept:"image/*",multiple:"",onChange:m,class:"file-input"},null,32)]),E("div",eb,[(ut(!0),dt(Qt,null,we(s.value.images,R=>(ut(),dt("figure",{key:R.id},[E("img",{src:h.value[R.id],alt:R.name,onClick:I=>u.value=h.value[R.id]},null,8,nb),E("figcaption",null,[qt(et(R.kind)+" · "+et(R.name)+" ",1),E("button",{class:"btn slim danger",onClick:I=>p(R)},"删",8,ib)])]))),128)),s.value.images.length?ne("",!0):(ut(),dt("p",sb,"尚未导入影像"))])])):(ut(),dt("section",rb,[w[16]||(w[16]=E("h4",null,"影像切层比对",-1)),E("div",ob,[(ut(!0),dt(Qt,null,we(s.value.images,R=>(ut(),dt("figure",{key:R.id},[E("img",{src:h.value[R.id],alt:R.name,onClick:I=>u.value=h.value[R.id]},null,8,ab),E("figcaption",null,et(R.kind)+" · "+et(R.name),1)]))),128)),s.value.images.length?ne("",!0):(ut(),dt("p",lb,"无影像"))])])),E("section",cb,[w[20]||(w[20]=E("h4",null,"解剖标记",-1)),E("div",ub,[w[17]||(w[17]=E("span",null,"椎体",-1)),E("b",{class:We({miss:!s.value.marks.vertebra})},et(s.value.marks.vertebra||"未标记"),3)]),E("div",hb,[w[18]||(w[18]=E("span",null,"椎间孔",-1)),E("b",{class:We({miss:!s.value.marks.foramen})},et(s.value.marks.foramen||"未标记"),3)]),E("div",fb,[w[19]||(w[19]=E("span",null,"神经根",-1)),E("b",{class:We({miss:!s.value.marks.nerveRoot})},et(s.value.marks.nerveRoot||"未标记"),3)])]),r.value?(ut(),dt("section",db,[w[22]||(w[22]=E("h4",null,"穿刺模板(技师维护)",-1)),E("div",pb,[de(E("select",{"onUpdate:modelValue":w[2]||(w[2]=R=>c.value=R),class:"input"},[w[21]||(w[21]=E("option",{value:""},"选择模板…",-1)),(ut(!0),dt(Qt,null,we(f.value,R=>(ut(),dt("option",{key:R.id,value:R.id},et(R.name)+"("+et(R.approach)+" 外展"+et(R.az)+"° 头倾"+et(R.el)+"°) ",9,mb))),128))],512),[[xn,c.value]]),E("button",{class:"btn slim",disabled:!c.value,onClick:C},"应用",8,gb)])])):ne("",!0),E("section",_b,[w[23]||(w[23]=E("h4",null,"进针参数",-1)),E("label",vb,[qt("外展角 "+et(s.value.needle.az.toFixed(1))+"° ",1),de(E("input",{type:"range",min:"0",max:"80",step:"0.5","onUpdate:modelValue":w[3]||(w[3]=R=>s.value.needle.az=R),disabled:!r.value},null,8,xb),[[Be,s.value.needle.az,void 0,{number:!0}]])]),E("label",Mb,[qt("头倾角 "+et(s.value.needle.el.toFixed(1))+"° ",1),de(E("input",{type:"range",min:"-30",max:"45",step:"0.5","onUpdate:modelValue":w[4]||(w[4]=R=>s.value.needle.el=R),disabled:!r.value},null,8,Sb),[[Be,s.value.needle.el,void 0,{number:!0}]])]),E("label",yb,[qt("针尖过靶点 "+et(s.value.needle.advance.toFixed(1))+" mm ",1),de(E("input",{type:"range",min:"-30",max:"30",step:"0.5","onUpdate:modelValue":w[5]||(w[5]=R=>s.value.needle.advance=R),disabled:!r.value},null,8,Eb),[[Be,s.value.needle.advance,void 0,{number:!0}]])])]),r.value?(ut(),dt("section",bb,[w[24]||(w[24]=E("h4",null,"提交审签",-1)),A.value.length?(ut(),dt("ul",Tb,[(ut(!0),dt(Qt,null,we(A.value,R=>(ut(),dt("li",{key:R},"✗ "+et(R),1))),128))])):(ut(),dt("p",Ab,"✓ 校验通过,可提交")),E("button",{class:"btn primary block",disabled:!!A.value.length,onClick:x},et(s.value.status==="rejected"?"重新提交审签":"提交审签"),9,wb)])):ne("",!0),E("section",Rb,[w[25]||(w[25]=E("h4",null,"操作记录",-1)),E("ul",Cb,[(ut(!0),dt(Qt,null,we([...s.value.log].reverse(),(R,I)=>(ut(),dt("li",{key:I},[E("span",Pb,et(ue(Xs)(R.t)),1),E("b",null,et(R.action),1),qt(" "+et(R.detail)+" ",1),E("span",Db,et(R.user)+"("+et(ue(Rc)[R.role])+")",1)]))),128))])])]),u.value?(ut(),dt("div",{key:0,class:"img-preview",onClick:w[6]||(w[6]=R=>u.value="")},[E("img",{src:u.value},null,8,Lb)])):ne("",!0)])):ne("",!0)}},ep=nr(Ib,[["__scopeId","data-v-07ba61df"]]),Ub={class:"panel"},Nb={class:"panel-head"},Fb={key:0,class:"hint"},Ob={class:"table"},Bb={key:0},zb={class:"tag approach"},kb={class:"note"},Hb={key:0,class:"ops"},Vb=["onClick"],Gb=["onClick"],Wb={class:"modal"},Xb={class:"form-grid"},$b={class:"span2"},Yb={class:"span2"},qb={class:"modal-actions"},jb=["disabled"],Kb={__name:"TemplatesView",setup(n){const t=Se(()=>Lt.user.role==="tech"),e=Ne(null);function i(){return{id:"",name:"",segment:"L4-L5",approach:"后外侧入路",side:"左",az:45,el:10,advance:0,note:""}}function s(a){e.value=a}function r(){o_(e.value),e.value=null}function o(a){confirm(`删除模板「${a.name}」?`)&&a_(a.id)}return(a,l)=>(ut(),dt("div",Ub,[E("div",Nb,[l[11]||(l[11]=E("h2",null,"穿刺模板与入路偏好维护",-1)),t.value?(ut(),dt("button",{key:0,class:"btn primary",onClick:l[0]||(l[0]=c=>s(i()))},"+ 新建模板")):ne("",!0)]),t.value?ne("",!0):(ut(),dt("p",Fb,"仅介入技师可编辑模板,当前为只读查看。")),E("table",Ob,[E("thead",null,[E("tr",null,[l[12]||(l[12]=E("th",null,"名称",-1)),l[13]||(l[13]=E("th",null,"节段",-1)),l[14]||(l[14]=E("th",null,"入路",-1)),l[15]||(l[15]=E("th",null,"侧别",-1)),l[16]||(l[16]=E("th",null,"外展角",-1)),l[17]||(l[17]=E("th",null,"头倾角",-1)),l[18]||(l[18]=E("th",null,"过靶点",-1)),l[19]||(l[19]=E("th",null,"备注",-1)),l[20]||(l[20]=E("th",null,"维护人",-1)),l[21]||(l[21]=E("th",null,"更新时间",-1)),t.value?(ut(),dt("th",Bb,"操作")):ne("",!0)])]),E("tbody",null,[(ut(!0),dt(Qt,null,we(ue(Lt).templates,c=>(ut(),dt("tr",{key:c.id},[E("td",null,et(c.name),1),E("td",null,et(c.segment),1),E("td",null,[E("span",zb,et(c.approach),1)]),E("td",null,et(c.side),1),E("td",null,et(c.az)+"°",1),E("td",null,et(c.el)+"°",1),E("td",null,et(c.advance)+"mm",1),E("td",kb,et(c.note),1),E("td",null,et(c.updatedBy),1),E("td",null,et(ue(Xs)(c.updatedAt)),1),t.value?(ut(),dt("td",Hb,[E("button",{class:"btn slim",onClick:u=>s({...c})},"编辑",8,Vb),E("button",{class:"btn slim danger",onClick:u=>o(c)},"删除",8,Gb)])):ne("",!0)]))),128))])]),e.value?(ut(),dt("div",{key:1,class:"modal-mask",onClick:l[10]||(l[10]=fa(c=>e.value=null,["self"]))},[E("div",Wb,[E("h3",null,et(e.value.id?"编辑模板":"新建模板"),1),E("div",Xb,[E("label",$b,[l[22]||(l[22]=qt("模板名称",-1)),de(E("input",{"onUpdate:modelValue":l[1]||(l[1]=c=>e.value.name=c),class:"input"},null,512),[[Be,e.value.name,void 0,{trim:!0}]])]),E("label",null,[l[23]||(l[23]=qt("节段 ",-1)),de(E("select",{"onUpdate:modelValue":l[2]||(l[2]=c=>e.value.segment=c),class:"input"},[(ut(!0),dt(Qt,null,we(ue(Cc),c=>(ut(),dt("option",{key:c},et(c),1))),128))],512),[[xn,e.value.segment]])]),E("label",null,[l[24]||(l[24]=qt("入路 ",-1)),de(E("select",{"onUpdate:modelValue":l[3]||(l[3]=c=>e.value.approach=c),class:"input"},[(ut(!0),dt(Qt,null,we(ue(Xg),c=>(ut(),dt("option",{key:c},et(c),1))),128))],512),[[xn,e.value.approach]])]),E("label",null,[l[25]||(l[25]=qt("偏好侧别 ",-1)),de(E("select",{"onUpdate:modelValue":l[4]||(l[4]=c=>e.value.side=c),class:"input"},[(ut(!0),dt(Qt,null,we(ue(fd),c=>(ut(),dt("option",{key:c},et(c),1))),128))],512),[[xn,e.value.side]])]),E("label",null,[l[26]||(l[26]=qt("外展角 (°)",-1)),de(E("input",{"onUpdate:modelValue":l[5]||(l[5]=c=>e.value.az=c),type:"number",min:"0",max:"80",class:"input"},null,512),[[Be,e.value.az,void 0,{number:!0}]])]),E("label",null,[l[27]||(l[27]=qt("头倾角 (°)",-1)),de(E("input",{"onUpdate:modelValue":l[6]||(l[6]=c=>e.value.el=c),type:"number",min:"-30",max:"45",class:"input"},null,512),[[Be,e.value.el,void 0,{number:!0}]])]),E("label",null,[l[28]||(l[28]=qt("针尖过靶点 (mm)",-1)),de(E("input",{"onUpdate:modelValue":l[7]||(l[7]=c=>e.value.advance=c),type:"number",min:"-30",max:"30",class:"input"},null,512),[[Be,e.value.advance,void 0,{number:!0}]])]),E("label",Yb,[l[29]||(l[29]=qt("备注",-1)),de(E("textarea",{"onUpdate:modelValue":l[8]||(l[8]=c=>e.value.note=c),class:"input",rows:"2"},null,512),[[Be,e.value.note,void 0,{trim:!0}]])])]),E("div",qb,[E("button",{class:"btn ghost",onClick:l[9]||(l[9]=c=>e.value=null)},"取消"),E("button",{class:"btn primary",disabled:!e.value.name,onClick:r},"保存",8,jb)])])])):ne("",!0)]))}},Zb=nr(Kb,[["__scopeId","data-v-64b04a0a"]]),Jb={key:0,class:"panel"},Qb={class:"table"},tT=["onClick"],eT={key:0},nT={key:1},iT={class:"review-bar"},sT={class:"modal"},rT={class:"block-label"},oT={class:"block-label"},aT={class:"modal-actions"},lT={__name:"ReviewView",setup(n,{expose:t}){const e=Ne("");t({activeId:e});const i=Ne(!1),s=Ne(Vu[0]),r=Ne(""),o=Se(()=>Lt.user.role==="chief"),a=Se(()=>Lt.cases.filter(h=>h.status==="pending"));function l(h){return[...h.log].reverse().find(f=>f.action==="提交审签")}function c(){const h=Or(e.value);h&&confirm(`确认通过病例 ${h.id}(${h.patientName})的穿刺路径?`)&&(i_(h),e.value="")}function u(){const h=Or(e.value);h&&(s_(h,s.value,r.value),i.value=!1,r.value="",e.value="")}return(h,f)=>(ut(),dt("div",null,[e.value?(ut(),dt("div",nT,[E("div",iT,[E("button",{class:"btn ghost",onClick:f[0]||(f[0]=d=>e.value="")},"← 返回列表"),f[10]||(f[10]=E("span",{class:"spacer"},null,-1)),o.value?(ut(),dt(Qt,{key:0},[E("button",{class:"btn danger",onClick:f[1]||(f[1]=d=>i.value=!0)},"退回"),E("button",{class:"btn ok",onClick:c},"审签通过")],64)):ne("",!0)]),ze(ep,{"case-id":e.value,onBack:f[2]||(f[2]=d=>e.value="")},null,8,["case-id"]),i.value?(ut(),dt("div",{key:0,class:"modal-mask",onClick:f[6]||(f[6]=fa(d=>i.value=!1,["self"]))},[E("div",sT,[E("h3",null,"退回病例 "+et(e.value),1),E("label",rT,[f[11]||(f[11]=qt("退回原因 ",-1)),de(E("select",{"onUpdate:modelValue":f[3]||(f[3]=d=>s.value=d),class:"input"},[(ut(!0),dt(Qt,null,we(ue(Vu),d=>(ut(),dt("option",{key:d},et(d),1))),128))],512),[[xn,s.value]])]),E("label",oT,[f[12]||(f[12]=qt("补充说明 ",-1)),de(E("textarea",{"onUpdate:modelValue":f[4]||(f[4]=d=>r.value=d),class:"input",rows:"3",placeholder:"具体说明需要修改的内容"},null,512),[[Be,r.value,void 0,{trim:!0}]])]),E("div",aT,[E("button",{class:"btn ghost",onClick:f[5]||(f[5]=d=>i.value=!1)},"取消"),E("button",{class:"btn danger",onClick:u},"确认退回")])])])):ne("",!0)])):(ut(),dt("div",Jb,[f[9]||(f[9]=E("div",{class:"panel-head"},[E("h2",null,"待审签列表")],-1)),E("table",Qb,[f[8]||(f[8]=E("thead",null,[E("tr",null,[E("th",null,"病例号"),E("th",null,"患者"),E("th",null,"节段"),E("th",null,"责任神经根"),E("th",null,"提交人"),E("th",null,"提交时间"),E("th",null,"操作")])],-1)),E("tbody",null,[(ut(!0),dt(Qt,null,we(a.value,d=>{var _,v;return ut(),dt("tr",{key:d.id},[E("td",null,et(d.id),1),E("td",null,et(d.patientName)+"("+et(d.sex)+"/"+et(d.age)+"岁)",1),E("td",null,et(d.segment),1),E("td",null,et(d.side)+et(d.root),1),E("td",null,et((_=l(d))==null?void 0:_.user),1),E("td",null,et(ue(Xs)((v=l(d))==null?void 0:v.t)),1),E("td",null,[E("button",{class:"btn slim warn",onClick:m=>e.value=d.id},"进入审签",8,tT)])])}),128)),a.value.length?ne("",!0):(ut(),dt("tr",eT,[...f[7]||(f[7]=[E("td",{colspan:"7",class:"empty"},"暂无待审病例",-1)])]))])])]))]))}},cT=nr(lT,[["__scopeId","data-v-724cf351"]]),uT={class:"panel"},hT={class:"table"},fT={class:"bar-cell"},dT={key:0,class:"bar"},pT={key:0,class:"reason-list"},mT={class:"reason-label"},gT={class:"bar reason-bar"},_T={key:1,class:"empty"},vT={__name:"StatsView",setup(n){const t=Se(()=>Cc.map(s=>{const r=Lt.cases.filter(u=>u.segment===s),o=r.reduce((u,h)=>u+h.log.filter(f=>f.action==="提交审签").length,0),a=r.reduce((u,h)=>u+h.log.filter(f=>f.action==="退回").length,0),l=r.filter(u=>u.log.some(h=>h.action==="审签通过")),c=l.filter(r_).length;return{segment:s,total:r.length,submits:o,rejects:a,approved:l.length,rate:l.length?c/l.length:0}})),e=Se(()=>{const s={};for(const r of Lt.cases)for(const o of r.log){if(o.action!=="退回")continue;const a=(o.detail||"其他").split(":")[0]||"其他";s[a]=(s[a]||0)+1}return Object.entries(s).map(([r,o])=>({reason:r,count:o})).sort((r,o)=>o.count-r.count)}),i=Se(()=>Math.max(1,...e.value.map(s=>s.count)));return(s,r)=>(ut(),dt("div",uT,[r[1]||(r[1]=E("div",{class:"panel-head"},[E("h2",null,"统计分析(按疼痛节段)")],-1)),E("table",hT,[r[0]||(r[0]=E("thead",null,[E("tr",null,[E("th",null,"节段"),E("th",null,"病例数"),E("th",null,"送审次数"),E("th",null,"通过数"),E("th",null,"退回次数"),E("th",null,"一次通过率"),E("th")])],-1)),E("tbody",null,[(ut(!0),dt(Qt,null,we(t.value,o=>(ut(),dt("tr",{key:o.segment},[E("td",null,et(o.segment),1),E("td",null,et(o.total),1),E("td",null,et(o.submits),1),E("td",null,et(o.approved),1),E("td",null,et(o.rejects),1),E("td",null,et(o.total?Math.round(o.rate*100)+"%":"-"),1),E("td",fT,[o.total?(ut(),dt("div",dT,[E("div",{class:"bar-fill",style:Ar({width:o.rate*100+"%"})},null,4)])):ne("",!0)])]))),128))])]),r[2]||(r[2]=E("div",{class:"panel-head",style:{"margin-top":"26px"}},[E("h2",null,"退回原因分布")],-1)),e.value.length?(ut(),dt("div",pT,[(ut(!0),dt(Qt,null,we(e.value,o=>(ut(),dt("div",{key:o.reason,class:"reason-row"},[E("span",mT,et(o.reason),1),E("div",gT,[E("div",{class:"bar-fill warn-fill",style:Ar({width:o.count/i.value*100+"%"})},null,4)]),E("b",null,et(o.count),1)]))),128))])):(ut(),dt("p",_T,"暂无退回记录"))]))}},xT=nr(vT,[["__scopeId","data-v-6cbe1a57"]]),MT={key:0,class:"sheet"},ST={class:"sheet-actions no-print"},yT={class:"sheet-body",id:"briefing-sheet"},ET={class:"sub"},bT={class:"sheet-table"},TT={colspan:"3"},AT={colspan:"3"},wT={colspan:"3"},RT={colspan:"3"},CT={colspan:"3"},PT={colspan:"3"},DT={class:"shot-row"},LT={key:0},IT=["src"],UT={class:"sheet-table"},NT={__name:"BriefingSheet",props:{caseId:{type:String,required:!0}},emits:["close"],setup(n){const t=n,e=Se(()=>Or(t.caseId)),i=Xs(new Date().toISOString()),s=Se(()=>{const l=Lt.templates.find(c=>{var u;return c.id===((u=e.value)==null?void 0:u.templateId)});return l?`${l.name}(${l.approach})`:"自定义路径"}),r=Se(()=>{var l;return(((l=e.value)==null?void 0:l.log)||[]).filter(c=>["新建病例","提交审签","审签通过","退回"].includes(c.action))});function o(l){return Rc[l]||l}function a(){window.print()}return(l,c)=>{var u;return ut(),dt("div",{class:"modal-mask",onClick:c[1]||(c[1]=fa(h=>l.$emit("close"),["self"]))},[e.value?(ut(),dt("div",MT,[E("div",ST,[E("button",{class:"btn primary",onClick:a},"打印"),E("button",{class:"btn ghost",onClick:c[0]||(c[0]=h=>l.$emit("close"))},"关闭")]),E("div",yT,[c[17]||(c[17]=E("h2",null,"疼痛科脊柱介入穿刺术前交底单",-1)),E("p",ET,"病例号:"+et(e.value.id)+" · 生成时间:"+et(ue(i)),1),E("table",bT,[E("tbody",null,[E("tr",null,[c[2]||(c[2]=E("th",null,"患者",-1)),E("td",null,et(e.value.patientName)+"("+et(e.value.sex)+"/"+et(e.value.age)+"岁)",1),c[3]||(c[3]=E("th",null,"编号",-1)),E("td",null,et(e.value.patientId),1)]),E("tr",null,[c[4]||(c[4]=E("th",null,"疼痛节段",-1)),E("td",null,et(e.value.segment),1),c[5]||(c[5]=E("th",null,"责任神经根",-1)),E("td",null,et(e.value.side)+et(e.value.root),1)]),E("tr",null,[c[6]||(c[6]=E("th",null,"既往手术史",-1)),E("td",TT,et(e.value.surgeryHistory),1)]),E("tr",null,[c[7]||(c[7]=E("th",null,"凝血指标",-1)),E("td",AT," PT "+et(e.value.coag.PT)+"s · APTT "+et(e.value.coag.APTT)+"s · INR "+et(e.value.coag.INR)+" · PLT "+et(e.value.coag.PLT)+"×10⁹/L ",1)]),E("tr",null,[c[8]||(c[8]=E("th",null,"入路/模板",-1)),E("td",wT,et(s.value),1)]),E("tr",null,[c[12]||(c[12]=E("th",null,"进针参数",-1)),E("td",RT,[c[9]||(c[9]=qt(" 外展角 ",-1)),E("b",null,et(e.value.needle.az.toFixed(1))+"°",1),c[10]||(c[10]=qt(" · 头倾角 ",-1)),E("b",null,et(e.value.needle.el.toFixed(1))+"°",1),c[11]||(c[11]=qt(" · 针尖过靶点 ",-1)),E("b",null,et(e.value.needle.advance.toFixed(1))+" mm",1)])]),E("tr",null,[c[14]||(c[14]=E("th",null,"安全距离",-1)),E("td",CT,[qt(" 针尖-神经根("+et(((u=e.value.distances)==null?void 0:u.rootName)||"-")+"): ",1),E("b",null,et(e.value.distances?e.value.distances.root.toFixed(1):"-")+" mm",1),c[13]||(c[13]=qt(" · 针尖-硬膜囊: ",-1)),E("b",null,et(e.value.distances?e.value.distances.dural.toFixed(1):"-")+" mm",1)])]),E("tr",null,[c[15]||(c[15]=E("th",null,"解剖标记",-1)),E("td",PT," 椎体 "+et(e.value.marks.vertebra||"-")+" · "+et(e.value.marks.foramen||"-")+" · "+et(e.value.marks.nerveRoot||"-"),1)])])]),E("div",DT,[e.value.screenshot?(ut(),dt("figure",LT,[E("img",{src:e.value.screenshot,alt:"三维路径截图"},null,8,IT),c[16]||(c[16]=E("figcaption",null,"三维规划路径(提交时截图)",-1))])):ne("",!0)]),E("table",UT,[E("tbody",null,[(ut(!0),dt(Qt,null,we(r.value,(h,f)=>(ut(),dt("tr",{key:f},[E("th",null,et(h.action),1),E("td",null,et(ue(Xs)(h.t))+" · "+et(h.user)+"("+et(o(h.role))+") "+et(h.detail),1)]))),128))])]),c[18]||(c[18]=E("div",{class:"sign-row"},[E("span",null,"接诊医师:____________"),E("span",null,"介入技师:____________"),E("span",null,"主任医师:____________"),E("span",null,"患者/家属:____________")],-1))])])):ne("",!0)])}}},FT=nr(NT,[["__scopeId","data-v-50bdc57b"]]),OT={class:"app"},BT={class:"topbar no-print"},zT=["onClick"],kT={key:0,class:"badge"},HT={class:"user-box"},VT=["value"],GT={class:"btn slim ghost"},WT={key:1},XT={__name:"App",setup(n){const t=Ne(!1),e=Ne(""),i=Ne(null),s=Se(()=>[{key:"cases",label:"病例列表"},{key:"templates",label:"模板维护"},{key:"review",label:"审签台"},{key:"stats",label:"统计分析"}]),r=Se(()=>Lt.cases.filter(f=>f.status==="pending").length),o=Se({get:()=>Lt.user.name,set:f=>{Lt.user=Co.find(d=>d.name===f)||Co[0]}});function a(f){Lt.view=f}function l(f){Lt.activeCaseId=f,Lt.view="planner"}function c(f){Lt.view="review",setTimeout(()=>{i.value&&(i.value.activeId=f)},0)}async function u(){const f=await pd();md(f,`疼痛科穿刺规划导出_${new Date().toISOString().slice(0,10)}.json`)}async function h(f){const d=f.target.files[0];if(f.target.value="",!!d)try{const _=JSON.parse(await d.text()),v=await l_(_);alert(`导入完成: ${v} 个病例`)}catch(_){alert("导入失败: "+_.message)}}return(f,d)=>(ut(),dt("div",OT,[E("header",BT,[d[8]||(d[8]=E("h1",null,"疼痛科脊柱介入穿刺路径三维规划与审签系统",-1)),E("nav",null,[(ut(!0),dt(Qt,null,we(s.value,_=>(ut(),dt("button",{key:_.key,class:We(["tab",{on:ue(Lt).view===_.key}]),onClick:v=>a(_.key)},[qt(et(_.label)+" ",1),_.key==="review"&&r.value?(ut(),dt("span",kT,et(r.value),1)):ne("",!0)],10,zT))),128))]),E("div",HT,[de(E("select",{"onUpdate:modelValue":d[0]||(d[0]=_=>o.value=_),class:"input slim",title:"切换身份"},[(ut(!0),dt(Qt,null,we(ue(Co),_=>(ut(),dt("option",{key:_.name,value:_.name},et(_.name)+" · "+et(ue(Rc)[_.role]),9,VT))),128))],512),[[xn,o.value]]),E("button",{class:"btn slim ghost",onClick:u},"导出全部"),E("label",GT,[d[7]||(d[7]=qt(" 导入",-1)),E("input",{type:"file",accept:".json",hidden:"",onChange:h},null,32)])])]),E("main",{class:We({"no-print":e.value})},[ue(Lt).view==="cases"?(ut(),Ji(S_,{key:0,onNewCase:d[1]||(d[1]=_=>t.value=!0),onOpenPlanner:l,onOpenReview:c,onOpenBriefing:d[2]||(d[2]=_=>e.value=_)})):ue(Lt).view==="planner"?(ut(),dt("div",WT,[E("button",{class:"btn ghost back no-print",onClick:d[3]||(d[3]=_=>ue(Lt).view="cases")},"← 返回病例列表"),ze(ep,{"case-id":ue(Lt).activeCaseId,onBack:d[4]||(d[4]=_=>ue(Lt).view="cases")},null,8,["case-id"])])):ue(Lt).view==="templates"?(ut(),Ji(Zb,{key:2})):ue(Lt).view==="review"?(ut(),Ji(cT,{key:3,ref_key:"reviewRef",ref:i},null,512)):ue(Lt).view==="stats"?(ut(),Ji(xT,{key:4})):ne("",!0)],2),t.value?(ut(),Ji(P_,{key:0,onClose:d[5]||(d[5]=_=>t.value=!1),onCreated:l})):ne("",!0),e.value?(ut(),Ji(FT,{key:1,"case-id":e.value,onClose:d[6]||(d[6]=_=>e.value="")},null,8,["case-id"])):ne("",!0)]))}};Bg(XT).mount("#app");
