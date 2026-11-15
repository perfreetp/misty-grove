(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Cc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const he={},Yi=[],On=()=>{},af=()=>!1,na=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ia=n=>n.startsWith("onUpdate:"),Re=Object.assign,Rc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},xp=Object.prototype.hasOwnProperty,te=(n,t)=>xp.call(n,t),Ft=Array.isArray,yi=n=>Or(n)==="[object Map]",es=n=>Or(n)==="[object Set]",vu=n=>Or(n)==="[object Date]",Xt=n=>typeof n=="function",Se=n=>typeof n=="string",Bn=n=>typeof n=="symbol",ce=n=>n!==null&&typeof n=="object",lf=n=>(ce(n)||Xt(n))&&Xt(n.then)&&Xt(n.catch),cf=Object.prototype.toString,Or=n=>cf.call(n),Mp=n=>Or(n).slice(8,-1),uf=n=>Or(n)==="[object Object]",Pc=n=>Se(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,lr=Cc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),sa=n=>{const t=Object.create(null);return e=>t[e]||(t[e]=n(e))},yp=/-\w/g,bn=sa(n=>n.replace(yp,t=>t.slice(1).toUpperCase())),Sp=/\B([A-Z])/g,as=sa(n=>n.replace(Sp,"-$1").toLowerCase()),hf=sa(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ta=sa(n=>n?`on${hf(n)}`:""),Un=(n,t)=>!Object.is(n,t),wo=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},ff=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Fr=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let xu;const ra=()=>xu||(xu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function oa(n){if(Ft(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=Se(i)?Ap(i):oa(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(Se(n)||ce(n))return n}const Ep=/;(?![^(]*\))/g,bp=/:([^]+)/,Tp=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function Ap(n){const t={};return n.replace(Tp,e=>e.startsWith("/*")?"":e).split(Ep).forEach(e=>{if(e){const i=e.split(bp);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Ue(n){let t="";if(Se(n))t=n;else if(Ft(n))for(let e=0;e<n.length;e++){const i=Ue(n[e]);i&&(t+=i+" ")}else if(ce(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const wp="itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly",Cp=Cc(wp);function df(n){return!!n||n===""}function Rp(n,t,e){if(n.length!==t.length)return!1;let i=!0;for(let s=0;i&&s<n.length;s++)i=Ti(n[s],t[s],e);return i}function Mu(n,t,e){if(n.size!==t.size)return!1;const i=Array.from(t),s=new Uint8Array(i.length);for(const r of n){let o=-1;for(let a=0;a<i.length;a++)if(!s[a]&&Ti(r,i[a],e)){o=a;break}if(o<0)return!1;s[o]=1}return!0}function Pp(n,t,e){let i=yi(n),s=yi(t);if(i||s||(i=es(n),s=es(t),i||s))return i&&s?Mu(n,t,e):!1;const r=Object.keys(n).length,o=Object.keys(t).length;if(r!==o)return!1;for(const a in n){const l=n.hasOwnProperty(a),c=t.hasOwnProperty(a);if(l&&!c||!l&&c||!Ti(n[a],t[a],e))return!1}return String(n)===String(t)}function yu(n,t,e,i){e||(e=[new Map,new Map]);const[s,r]=e;if(s.has(n)||r.has(t))return s.get(n)===t&&r.get(t)===n;s.set(n,t),r.set(t,n);const o=i(n,t,e);return s.delete(n),r.delete(t),o}function Ti(n,t,e){if(n===t)return!0;let i=vu(n),s=vu(t);return i||s?i&&s?n.getTime()===t.getTime():!1:(i=Bn(n),s=Bn(t),i||s?n===t:(i=Ft(n),s=Ft(t),i||s?i&&s?yu(n,t,e,Rp):!1:(i=ce(n),s=ce(t),i||s?!i||!s?!1:yu(n,t,e,Pp):String(n)===String(t))))}function Lp(n,t){return n.findIndex(e=>Ti(e,t))}const pf=n=>!!(n&&n.__v_isRef===!0),ot=n=>Se(n)?n:n==null?"":Ft(n)||ce(n)&&(n.toString===cf||!Xt(n.toString))?pf(n)?ot(n.value):JSON.stringify(n,mf,2):String(n),mf=(n,t)=>pf(t)?mf(n,t.value):yi(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Aa(i,r)+" =>"]=s,e),{})}:es(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Aa(e))}:Bn(t)?Aa(t):ce(t)&&!Ft(t)&&!uf(t)?String(t):t,Aa=(n,t="")=>{var e;return Bn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Oe;class Dp{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Oe&&(Oe.active?(this.parent=Oe,this.index=(Oe.scopes||(Oe.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes){const i=this.scopes.slice();for(t=0,e=i.length;t<e;t++)i[t].pause()}for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes){const s=this.scopes.slice();for(t=0,e=s.length;t<e;t++)s[t].resume()}const i=this.effects.slice();for(t=0,e=i.length;t<e;t++)i[t].resume()}}run(t){if(this._active){const e=Oe;try{return Oe=this,t()}finally{Oe=e}}}on(){++this._on===1&&(this.prevScope=Oe,Oe=this)}off(){if(this._on>0&&--this._on===0){if(Oe===this)Oe=this.prevScope;else{let t=Oe;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(e=0,i=s.length;e<i;e++)s[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ip(){return Oe}let fe;const wa=new WeakSet;class _f{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Oe&&(Oe.active?Oe.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,wa.has(this)&&(wa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||vf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Su(this),xf(this);const t=fe,e=Tn;fe=this,Tn=!0;try{return this.fn()}finally{Mf(this),fe=t,Tn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ic(t);this.deps=this.depsTail=void 0,Su(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?wa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Sl(this)&&this.run()}get dirty(){return Sl(this)}}let gf=0,cr,ur;function vf(n,t=!1){if(n.flags|=8,t){n.next=ur,ur=n;return}n.next=cr,cr=n}function Lc(){gf++}function Dc(){if(--gf>0)return;if(ur){let t=ur;for(ur=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;cr;){let t=cr;for(cr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function xf(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Mf(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),Ic(i),Up(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Sl(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(yf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function yf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Er)||(n.globalVersion=Er,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Sl(n))))return;n.flags|=2;const t=n.dep,e=fe,i=Tn;fe=n,Tn=!0;try{xf(n);const s=n.fn(n._value);(t.version===0||Un(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{fe=e,Tn=i,Mf(n),n.flags&=-3}}function Ic(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)Ic(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Up(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Tn=!0;const Sf=[];function zn(){Sf.push(Tn),Tn=!1}function kn(){const n=Sf.pop();Tn=n===void 0?!0:n}function Su(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=fe;fe=void 0;try{t()}finally{fe=e}}}let Er=0;class Np{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Uc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!fe||!Tn||fe===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==fe)e=this.activeLink=new Np(fe,this),fe.deps?(e.prevDep=fe.depsTail,fe.depsTail.nextDep=e,fe.depsTail=e):fe.deps=fe.depsTail=e,Ef(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=fe.depsTail,e.nextDep=void 0,fe.depsTail.nextDep=e,fe.depsTail=e,fe.deps===e&&(fe.deps=i)}return e}trigger(t){this.version++,Er++,this.notify(t)}notify(t){Lc();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Dc()}}}function Ef(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Ef(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const El=new WeakMap,Qi=Symbol(""),bl=Symbol(""),br=Symbol("");function He(n,t,e){if(Tn&&fe){let i=El.get(n);i||El.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new Uc),s.map=i,s.key=e),s.track()}}function ei(n,t,e,i,s,r){const o=El.get(n);if(!o){Er++;return}const a=l=>{l&&l.trigger()};if(Lc(),t==="clear")o.forEach(a);else{const l=Ft(n),c=l&&Pc(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===br||!Bn(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(br)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Qi)),yi(n)&&a(o.get(bl)));break;case"delete":l||(a(o.get(Qi)),yi(n)&&a(o.get(bl)));break;case"set":yi(n)&&a(o.get(Qi));break}}Dc()}function hs(n){const t=ie(n);return t===n||(He(t,"iterate",br),pn(n))?t:Hn(n)?Si(n)?t.map(e=>Ai(mn(e))):t.map(Ai):t.map(mn)}function aa(n){return He(n=ie(n),"iterate",br),n}function Pn(n,t){return Hn(n)?Ai(Si(n)?mn(t):t):mn(t)}const Op={__proto__:null,[Symbol.iterator](){return Ca(this,Symbol.iterator,n=>Pn(this,n))},concat(...n){return hs(this).concat(...n.map(t=>Ft(t)?hs(t):t))},entries(){return Ca(this,"entries",n=>(n[1]=Pn(this,n[1]),n))},every(n,t){return Xn(this,"every",n,t,void 0,arguments)},filter(n,t){return Xn(this,"filter",n,t,e=>e.map(i=>Pn(this,i)),arguments)},find(n,t){return Xn(this,"find",n,t,e=>Pn(this,e),arguments)},findIndex(n,t){return Xn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Xn(this,"findLast",n,t,e=>Pn(this,e),arguments)},findLastIndex(n,t){return Xn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Xn(this,"forEach",n,t,void 0,arguments)},includes(...n){return Ra(this,"includes",n)},indexOf(...n){return Ra(this,"indexOf",n)},join(n){return hs(this).join(n)},lastIndexOf(...n){return Ra(this,"lastIndexOf",n)},map(n,t){return Xn(this,"map",n,t,void 0,arguments)},pop(){return js(this,"pop")},push(...n){return js(this,"push",n)},reduce(n,...t){return bu(this,"reduce",n,t)},reduceRight(n,...t){return bu(this,"reduceRight",n,t)},shift(){return js(this,"shift")},some(n,t){return Xn(this,"some",n,t,void 0,arguments)},splice(...n){return js(this,"splice",n)},toReversed(){return hs(this).toReversed()},toSorted(n){return hs(this).toSorted(n)},toSpliced(...n){return hs(this).toSpliced(...n)},unshift(...n){return js(this,"unshift",n)},values(){return Ca(this,"values",n=>Pn(this,n))}};function Ca(n,t,e){const i=aa(n),s=i[t],r=s.call(i);if(i!==n&&!pn(n)){if(r[Symbol.toStringTag]==="Array Iterator"){const o=Object.create(Object.getPrototypeOf(r));return o.next=()=>Eu(r.next(),e),s!==bf[t]&&Object.defineProperties(o,{return:{get(){const a=r.return;return typeof a=="function"?a.bind(r):a}},throw:{get(){const a=r.throw;return typeof a=="function"?a.bind(r):a}}}),o}r._next=r.next,r.next=()=>Eu(r._next(),e)}return r}function Eu(n,t){return n.done||(n.value=t(n.value)),n}const bf=Array.prototype;function Xn(n,t,e,i,s,r){const o=aa(n),a=o!==n&&!pn(n),l=o[t];if(l!==bf[t]){const h=l.apply(n,r);return a?mn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,Pn(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function bu(n,t,e,i){const s=aa(n),r=s!==n&&!pn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=Pn(n,c)),e.call(this,c,Pn(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?Pn(n,l):l}function Ra(n,t,e){const i=ie(n);He(i,"iterate",br);const s=i[t](...e);return(s===-1||s===!1)&&Fc(e[0])?(e[0]=ie(e[0]),i[t](...e)):s}function js(n,t,e=[]){zn(),Lc();const i=ie(n)[t].apply(n,e);return Dc(),kn(),i}const Fp=Cc("__proto__,__v_isRef,__isVue"),Tf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Bn));function Bp(n){Bn(n)||(n=String(n));const t=ie(this);return He(t,"has",n),t.hasOwnProperty(n)}class Af{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?qp:Pf:r?Rf:Cf).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Ft(t);if(!s){let l;if(o&&(l=Op[e]))return l;if(e==="hasOwnProperty")return Bp}const a=Reflect.get(t,e,Ve(t)?t:i);if((Bn(e)?Tf.has(e):Fp(e))||(s||He(t,"get",e),r))return a;if(Ve(a)){const l=o&&Pc(e)?a:a.value;return s&&ce(l)?Al(l):l}return ce(a)?s?Al(a):la(a):a}}class wf extends Af{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Ft(t)&&Pc(e);if(!this._isShallow){const c=Hn(r);if(!pn(i)&&!Hn(i)&&(r=ie(r),i=ie(i)),!o&&Ve(r)&&!Ve(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:te(t,e),l=Reflect.set(t,e,i,Ve(t)?t:s);return t===ie(s)&&l&&(a?Un(i,r)&&ei(t,"set",e,i):ei(t,"add",e,i)),l}deleteProperty(t,e){const i=te(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&ei(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!Bn(e)||!Tf.has(e))&&He(t,"has",e),i}ownKeys(t){return He(t,"iterate",Ft(t)?"length":Qi),Reflect.ownKeys(t)}}class zp extends Af{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const kp=new wf,Hp=new zp,Vp=new wf(!0);const Tl=n=>n,Xr=n=>Reflect.getPrototypeOf(n);function Gp(n,t,e){return function(...i){const s=this.__v_raw,r=ie(s),o=yi(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?Tl:t?Ai:mn;return!t&&He(r,"iterate",l?bl:Qi),Re(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function $r(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function Wp(n,t){const e={get(s){const r=this.__v_raw,o=ie(r),a=ie(s);n||(Un(s,a)&&He(o,"get",s),He(o,"get",a));const{has:l}=Xr(o),c=t?Tl:n?Ai:mn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&He(ie(s),"iterate",Qi),s.size},has(s){const r=this.__v_raw,o=ie(r),a=ie(s);return n||(Un(s,a)&&He(o,"has",s),He(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ie(a),c=t?Tl:n?Ai:mn;return!n&&He(l,"iterate",Qi),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Re(e,n?{add:$r("add"),set:$r("set"),delete:$r("delete"),clear:$r("clear")}:{add(s){const r=ie(this),o=Xr(r),a=ie(s),l=!t&&!pn(s)&&!Hn(s)?a:s;return o.has.call(r,l)||Un(s,l)&&o.has.call(r,s)||Un(a,l)&&o.has.call(r,a)||(r.add(l),ei(r,"add",l,l)),this},set(s,r){!t&&!pn(r)&&!Hn(r)&&(r=ie(r));const o=ie(this),{has:a,get:l}=Xr(o);let c=a.call(o,s);c||(s=ie(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?Un(r,u)&&ei(o,"set",s,r):ei(o,"add",s,r),this},delete(s){const r=ie(this),{has:o,get:a}=Xr(r);let l=o.call(r,s);l||(s=ie(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&ei(r,"delete",s,void 0),c},clear(){const s=ie(this),r=s.size!==0,o=s.clear();return r&&ei(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Gp(s,n,t)}),e}function Nc(n,t){const e=Wp(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_isShallow"?t:s==="__v_raw"?i:Reflect.get(te(e,s)&&s in i?e:i,s,r)}const Xp={get:Nc(!1,!1)},$p={get:Nc(!1,!0)},Yp={get:Nc(!0,!1)};const Cf=new WeakMap,Rf=new WeakMap,Pf=new WeakMap,qp=new WeakMap;function Kp(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function la(n){return Hn(n)?n:Oc(n,!1,kp,Xp,Cf)}function jp(n){return Oc(n,!1,Vp,$p,Rf)}function Al(n){return Oc(n,!0,Hp,Yp,Pf)}function Oc(n,t,e,i,s){if(!ce(n)||n.__v_raw&&!(t&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const o=Kp(Mp(n));if(o===0)return n;const a=new Proxy(n,o===2?i:e);return s.set(n,a),a}function Si(n){return Hn(n)?Si(n.__v_raw):!!(n&&n.__v_isReactive)}function Hn(n){return!!(n&&n.__v_isReadonly)}function pn(n){return!!(n&&n.__v_isShallow)}function Fc(n){return n?!!n.__v_raw:!1}function ie(n){const t=n&&n.__v_raw;return t?ie(t):n}function Zp(n){return!te(n,"__v_skip")&&Object.isExtensible(n)&&ff(n,"__v_skip",!0),n}const mn=n=>ce(n)?la(n):n,Ai=n=>ce(n)?Al(n):n;function Ve(n){return n?n.__v_isRef===!0:!1}function ii(n){return Jp(n,!1)}function Jp(n,t){return Ve(n)?n:new Qp(n,t)}class Qp{constructor(t,e){this.dep=new Uc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ie(t),this._value=e?t:mn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||pn(t)||Hn(t);t=i?t:ie(t),Un(t,e)&&(this._rawValue=t,this._value=i?t:mn(t),this.dep.trigger())}}function me(n){return Ve(n)?n.value:n}const tm={get:(n,t,e)=>t==="__v_raw"?n:me(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return Ve(s)&&!Ve(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Lf(n){return Si(n)?n:new Proxy(n,tm)}class em{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Uc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Er-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&fe!==this)return vf(this,!0),!0}get value(){const t=this.dep.track();return yf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function nm(n,t,e=!1){let i,s;return Xt(n)?i=n:(i=n.get,s=n.set),new em(i,s,e)}const Yr={},Fo=new WeakMap;let Vi;function im(n,t=!1,e=Vi){if(e){let i=Fo.get(e);i||Fo.set(e,i=[]),i.push(n)}}function sm(n,t,e=he){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=v=>s?v:pn(v)||s===!1||s===0?ni(v,1):ni(v);let u,h,f,d,g=!1,M=!1;if(Ve(n)?(h=()=>n.value,g=pn(n)):Si(n)?(h=()=>c(n),g=!0):Ft(n)?(M=!0,g=n.some(v=>Si(v)||pn(v)),h=()=>n.map(v=>{if(Ve(v))return v.value;if(Si(v))return c(v);if(Xt(v))return l?l(v,2):v()})):Xt(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){zn();try{f()}finally{kn()}}const v=Vi;Vi=u;try{return l?l(n,3,[d]):n(d)}finally{Vi=v}}:h=On,t&&s){const v=h,I=s===!0?1/0:s;h=()=>ni(v(),I)}const p=Ip(),m=()=>{u.stop(),p&&p.active&&Rc(p.effects,u)};if(r&&t){const v=t;t=(...I)=>{try{return v(...I)}finally{m()}}}let b=M?new Array(n.length).fill(Yr):Yr;const _=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(t){const I=u.run();if(v||s||g||(M?I.some((P,R)=>Un(P,b[R])):Un(I,b))){const P=Vi;zn();try{f&&f(),Vi=u;const R=[I,b===Yr?void 0:M&&b[0]===Yr?[]:b,d];b=I,l?l(t,3,R):t(...R)}finally{Vi=P,kn()}}}else u.run()};return a&&a(_),u=new _f(h),u.scheduler=o?()=>o(_,!1):_,d=v=>im(v,!1,u),f=u.onStop=()=>{const v=Fo.get(u);if(v){if(l)l(v,4);else for(const I of v)I();Fo.delete(u)}},t?i?_(!0):b=u.run():o?o(_.bind(null,!0),!0):u.run(),m.pause=u.pause.bind(u),m.resume=u.resume.bind(u),m.stop=m,m}function ni(n,t=1/0,e){if(t<=0||!ce(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,Ve(n))ni(n.value,t,e);else if(Ft(n))for(let i=0;i<n.length;i++)ni(n[i],t,e);else if(es(n)||yi(n))n.forEach(i=>{ni(i,t,e)});else if(uf(n)){for(const i in n)ni(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ni(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Br(n,t,e,i){try{return i?n(...i):n()}catch(s){ca(s,t,e)}}function An(n,t,e,i){if(Xt(n)){const s=Br(n,t,e,i);return s&&lf(s)&&s.catch(r=>{ca(r,t,e,void 0,!0)}),s}if(Ft(n)){const s=[];for(let r=0;r<n.length;r++)s.push(An(n[r],t,e,i));return s}}function ca(n,t,e,i=!0,s=!1){const r=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||he;if(t){let l=t.parent;const c=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${e}`;for(;l;){const h=l.ec;if(h&&!l.isUnmounted&&(!s||l.scope.active)){for(let f=0;f<h.length;f++)if(h[f](n,c,u)===!1)return}l=l.parent}if(o){zn(),Br(o,null,10,[n,c,u]),kn();return}}rm(n,e,r,i,a)}function rm(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const Ye=[];let Mn=-1;const Ln=[];let vi=null,ws=0;const Df=Promise.resolve();let Bo=null;function If(n){const t=Bo||Df;return n?t.then(this?n.bind(this):n):t}function om(n){let t=Mn+1,e=Ye.length;for(;t<e;){const i=t+e>>>1,s=Ye[i],r=Tr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function Bc(n){if(!(n.flags&1)){const t=Tr(n),e=Ye[Ye.length-1];!e||!(n.flags&2)&&t>=Tr(e)?Ye.push(n):Ye.splice(om(t),0,n),n.flags|=1,Uf()}}function Uf(){Bo||(Bo=Df.then(Ff))}function am(n){if(!Ft(n))vi&&n.id===-1?vi.splice(ws+1,0,n):n.flags&1||(Ln.push(n),n.flags|=1);else for(let t=0;t<n.length;t++)Ln.push(n[t]);Uf()}function Nf(n,t,e,i=Mn+1){for(;i<Ye.length;i++){const s=Ye[i];if(s&&s.flags&2){if(n&&s.id!==n.uid||t!==void 0&&!(s.id>=t))continue;Ye.splice(i,1),i=n?i-1:Mn,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Of(n,t,e=0){if(Ln.length){let i=Ln,s=0;if(t){i=[];for(let o=0;o<Ln.length;o++){const a=Ln[o];(a.i!==void 0?!a.i||a.i.uid<e:t.has(a))?Ln[s++]=a:i.push(a)}}const r=[...new Set(i)].sort((o,a)=>Tr(o)-Tr(a));if(Ln.length=s,vi){for(let o=0;o<r.length;o++)vi.push(r[o]);return}for(vi=r,ws=0;ws<vi.length;ws++){const o=vi[ws];o.flags&4&&(o.flags&=-2),o.flags&8||o(),o.flags&=-2}vi=null,ws=0}}let Pa=!1;function lm(n,t){if(Pa){n();return}const e=t===void 0?void 0:new Set(Ln);n(),Pa=!0;try{Nf(void 0,t),Of(void 0,e,t)}finally{Pa=!1}}const Tr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Ff(n){try{for(Mn=0;Mn<Ye.length;Mn++){const t=Ye[Mn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Br(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Mn<Ye.length;Mn++){const t=Ye[Mn];t&&(t.flags&=-2)}Mn=-1,Ye.length=0,Of(),Bo=null,(Ye.length||Ln.length)&&Ff()}}let fn=null,Bf=null;function zo(n){const t=fn;return fn=n,Bf=n&&n.type.__scopeId||null,t}function cm(n,t=fn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&Nu(-1);const r=zo(t),o=ts.length;let a;try{a=n(...s)}finally{for(let l=ts.length;l>o;l--)cd();zo(r),i._d&&Nu(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function ke(n,t){if(fn===null)return n;const e=da(fn),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=he]=t[s];r&&(Xt(r)&&(r={mounted:r,updated:r}),r.deep&&ni(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Ii(n,t,e,i){let s=n;if(i==="beforeMount")n._mount=n;else if(i==="beforeUpdate"){const a=t&&t._mount;a&&(a._latest=n,n._mount=a)}else if(i==="mounted"){const a=n._latest;n._mount=n._latest=void 0,a&&(s=a,a._mount=void 0)}const r=s.dirs,o=t&&t.dirs;for(let a=0;a<r.length;a++){let l=r[a];o?l.oldValue=o[a].value:i==="mounted"&&l.oldValue!==void 0&&(l=Re({},l,{oldValue:void 0}));let c=l.dir[i];c&&(zn(),An(c,e,8,[n.el,l,s,t]),kn())}}function um(n,t){if(qe){let e=qe.provides;const i=qe.parent&&qe.parent.provides;i===e&&(e=qe.provides=Object.create(i)),e[n]=t}}function Co(n,t,e=!1){const i=a_();if(i||Is){let s=Is?Is._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Xt(t)?t.call(i&&i.proxy):t}}const hm=Symbol.for("v-scx"),fm=()=>Co(hm);function hr(n,t,e){return zf(n,t,e)}function zf(n,t,e=he){const{immediate:i,deep:s,flush:r,once:o}=e,a=Re({},e),l=t&&i||!t&&r!=="post";let c;if(Rr){if(r==="sync"){const d=fm();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=On,d.resume=On,d.pause=On,d}}const u=qe;a.call=(d,g,M)=>An(d,u,g,M);let h=!1;r==="post"?a.scheduler=d=>{d.i=u,Xe(d,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(d,g)=>{g?d():Bc(d)}),a.augmentJob=d=>{t&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=sm(n,t,a);return Rr&&(c?c.push(f):l&&f()),f}function dm(n,t,e){const i=this.proxy,s=Se(n)?n.includes(".")?kf(i,n):()=>i[n]:n.bind(i,i);let r;Xt(t)?r=t:(r=t.handler,e=t);const o=zr(this),a=zf(s,r.bind(i),e);return o(),a}function kf(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const pm=Symbol("_vte"),ua=n=>n.__isTeleport,La=Symbol("_leaveCb");function mm(n){let t=n[0];if(n.length>1){for(const e of n)if(e.type!==wn){t=e;break}}return t}function Hf(n){if(!zc(n))return ua(n.type)&&n.children?mm(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:t,children:e}=n;if(e){if(t&16)return e[0];if(t&32&&Xt(e.default))return e.default()}}function fr(n,t){if(n.shapeFlag&6&&n.component){n.transition=t;const e=n.component.subTree;fr(ua(e.type)&&Hf(e)||e,t)}else if(n.shapeFlag&128){const e=n.suspense;if(e){const i=e.isHydrating?e.pendingBranch:e.activeBranch;i&&fr(i,t.clone(i))}else n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)}else if(n.transition=t,n.type===qt&&Ft(n.children)){const e=jf(n.children,!1);e&&fr(e,t)}}function wl(n){if(n.component)return wl(n.component.subTree);if(n.type===qt){const t=Ft(n.children)&&jf(n.children,!1);return t?wl(t):void 0}if(n.type!==wn)return n}function Ri(n,t){return Xt(n)?Re({name:n.name},t,{setup:n}):n}function Vf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Tu(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const ko=new WeakMap;function dr(n,t,e,i,s=!1){if(Ft(n)){n.forEach((M,p)=>dr(M,t&&(Ft(t)?t[p]:t),e,i,s));return}if(pr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&dr(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?da(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===he?a.refs={}:a.refs,h=a.setupState,f=ie(h),d=h===he?af:M=>Tu(u,M)?!1:te(f,M),g=(M,p)=>!(p&&Tu(u,p));if(c!=null&&c!==l){if(Au(t),Se(c))u[c]=null,d(c)&&(h[c]=null);else if(Ve(c)){const M=t;g(c,M.k)&&(c.value=null),M.k&&(u[M.k]=null)}}if(Xt(l))Br(l,a,12,[o,u]);else{const M=Se(l),p=Ve(l);if(M||p){const m=()=>{if(n.f){const b=M?d(l)?h[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Ft(b)&&Rc(b,r);else if(Ft(b))b.includes(r)||b.push(r);else if(M)u[l]=[r],d(l)&&(h[l]=u[l]);else{const _=[r];g(l,n.k)&&(l.value=_),n.k&&(u[n.k]=_)}}else M?(u[l]=o,d(l)&&(h[l]=o)):p&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const b=()=>{m(),ko.delete(n)};b.id=-1,ko.set(n,b),Xe(b,e)}else Au(n),m()}}}function Au(n){const t=ko.get(n);t&&(t.flags|=8,ko.delete(n))}ra().requestIdleCallback;ra().cancelIdleCallback;const pr=n=>!!n.type.__asyncLoader,zc=n=>n.type.__isKeepAlive;function _m(n,t){Gf(n,"a",t)}function gm(n,t){Gf(n,"da",t)}function Gf(n,t,e=qe){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Ar(t,i,e),e){let s=e.parent;for(;s&&s.parent;)zc(s.parent.vnode)&&vm(i,t,e,s),s=s.parent}}function vm(n,t,e,i){const s=Ar(t,n,i,!0),r=Ar("um",()=>Rc(i[t],s),e);r.flags=16}function Ar(n,t,e=qe,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{zn();const a=zr(e),l=An(t,e,n,o);return a(),kn(),l});return i?s.unshift(r):s.push(r),r}}const li=n=>(t,e=qe)=>{(!Rr||n==="sp")&&Ar(n,(...i)=>t(...i),e)},xm=li("bm"),Wf=li("m"),Mm=li("bu"),ym=li("u"),Xf=li("bum"),Sm=li("um"),Em=li("sp"),bm=li("rtg"),Tm=li("rtc");function Am(n,t=qe){Ar("ec",n,t)}const wm=Symbol.for("v-ndc");function Me(n,t,e,i){let s;const r=e,o=Ft(n);if(o||Se(n)){const a=o&&Si(n);let l=!1,c=!1;a&&(l=!pn(n),c=Hn(n),n=aa(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Ai(mn(n[u])):mn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number")if(!Number.isInteger(n)||n<0)s=[];else{s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(ce(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Cl=n=>n?dd(n)?da(n):Cl(n.parent):null,mr=Re(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Cl(n.parent),$root:n=>Cl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Yf(n),$forceUpdate:n=>n.f||(n.f=()=>{Bc(n.update)}),$nextTick:n=>n.n||(n.n=If.bind(n.proxy)),$watch:n=>dm.bind(n)}),Da=(n,t)=>n!==he&&!n.__isScriptSetup&&te(n,t),Cm={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Da(i,t))return o[t]=1,i[t];if(s!==he&&te(s,t))return o[t]=2,s[t];if(te(r,t))return o[t]=3,r[t];if(e!==he&&te(e,t))return o[t]=4,e[t];Rl&&(o[t]=0)}}const c=mr[t];let u,h;if(c)return t==="$attrs"&&He(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==he&&te(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,te(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Da(s,t)?(s[t]=e,!0):i!==he&&te(i,t)?(i[t]=e,!0):te(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==he&&a[0]!=="$"&&te(n,a)||Da(t,a)||te(r,a)||te(i,a)||te(mr,a)||te(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:te(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function wu(n){return Ft(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Rl=!0;function Rm(n){const t=Yf(n),e=n.proxy,i=n.ctx;Rl=!1,t.beforeCreate&&Cu(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:g,activated:M,deactivated:p,beforeDestroy:m,beforeUnmount:b,destroyed:_,unmounted:v,render:I,renderTracked:P,renderTriggered:R,errorCaptured:B,serverPrefetch:it,expose:y,inheritAttrs:T,components:K,directives:$,filters:Q}=t;if(c&&Pm(c,i,null),o)for(const et in o){const k=o[et];Xt(k)&&(i[et]=k.bind(e))}if(s){const et=s.call(e,e);ce(et)&&(n.data=la(et))}if(Rl=!0,r)for(const et in r){const k=r[et],ft=Xt(k)?k.bind(e,e):Xt(k.get)?k.get.bind(e,e):On,_t=!Xt(k)&&Xt(k.set)?k.set.bind(e):On,xt=se({get:ft,set:_t});Object.defineProperty(i,et,{enumerable:!0,configurable:!0,get:()=>xt.value,set:Bt=>xt.value=Bt})}if(a)for(const et in a)$f(a[et],i,e,et);if(l){const et=Xt(l)?l.call(e):l;Reflect.ownKeys(et).forEach(k=>{um(k,et[k])})}u&&Cu(u,n,"c");function W(et,k){Ft(k)?k.forEach(ft=>et(ft.bind(e))):k&&et(k.bind(e))}if(W(xm,h),W(Wf,f),W(Mm,d),W(ym,g),W(_m,M),W(gm,p),W(Am,B),W(Tm,P),W(bm,R),W(Xf,b),W(Sm,v),W(Em,it),Ft(y))if(y.length){const et=n.exposed||(n.exposed={});y.forEach(k=>{Object.defineProperty(et,k,{get:()=>e[k],set:ft=>e[k]=ft,enumerable:!0})})}else n.exposed||(n.exposed={});I&&n.render===On&&(n.render=I),T!=null&&(n.inheritAttrs=T),K&&(n.components=K),$&&(n.directives=$),it&&Vf(n)}function Pm(n,t,e=On){Ft(n)&&(n=Pl(n));for(const i in n){const s=n[i];let r;ce(s)?"default"in s?r=Co(s.from||i,s.default,!0):r=Co(s.from||i):r=Co(s),Ve(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function Cu(n,t,e){An(Ft(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function $f(n,t,e,i){let s=i.includes(".")?kf(e,i):()=>e[i];if(Se(n)){const r=t[n];Xt(r)&&hr(s,r)}else if(Xt(n))hr(s,n.bind(e));else if(ce(n))if(Ft(n))n.forEach(r=>$f(r,t,e,i));else{const r=Xt(n.handler)?n.handler.bind(e):t[n.handler];Xt(r)&&hr(s,r,n)}}function Yf(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>Ho(l,c,o,!0)),Ho(l,t,o)),ce(t)&&r.set(t,l),l}function Ho(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&Ho(n,r,e,!0),s&&s.forEach(o=>Ho(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=Lm[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const Lm={data:Ru,props:Pu,emits:Pu,methods:sr,computed:sr,beforeCreate:Ge,created:Ge,beforeMount:Ge,mounted:Ge,beforeUpdate:Ge,updated:Ge,beforeDestroy:Ge,beforeUnmount:Ge,destroyed:Ge,unmounted:Ge,activated:Ge,deactivated:Ge,errorCaptured:Ge,serverPrefetch:Ge,components:sr,directives:sr,watch:Im,provide:Ru,inject:Dm};function Ru(n,t){return t?n?function(){return Re(Xt(n)?n.call(this,this):n,Xt(t)?t.call(this,this):t)}:t:n}function Dm(n,t){return sr(Pl(n),Pl(t))}function Pl(n){if(Ft(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Ge(n,t){return n?[...new Set([].concat(n,t))]:t}function sr(n,t){return n?Re(Object.create(null),n,t):t}function Pu(n,t){return n?Ft(n)&&Ft(t)?[...new Set([...n,...t])]:Re(Object.create(null),wu(n),wu(t??{})):t}function Im(n,t){if(!n)return t;if(!t)return n;const e=Re(Object.create(null),n);for(const i in t)e[i]=Ge(n[i],t[i]);return e}function qf(){return{app:null,config:{isNativeTag:af,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Um=0;function Nm(n,t){return function(i,s=null){Xt(i)||(i=Re({},i)),s!=null&&!ce(s)&&(s=null);const r=qf(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Um++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:d_,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Xt(u.install)?(o.add(u),u.install(c,...h)):Xt(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||Je(i,s);return d.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(d,u,f),l=!0,c._container=u,u.__vue_app__=c,da(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(An(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Is;Is=c;try{return u()}finally{Is=h}}};return c}}let Is=null;const Om=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${bn(t)}Modifiers`]||n[`${as(t)}Modifiers`];function Fm(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||he;let s=e;const r=t.startsWith("update:"),o=r&&Om(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>Se(u)?u.trim():u)),o.number&&(s=s.map(Fr)));let a,l=i[a=Ta(t)]||i[a=Ta(bn(t))];!l&&r&&(l=i[a=Ta(as(t))]),l&&An(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,An(c,n,6,s)}}const Bm=new WeakMap;function Kf(n,t,e=!1){const i=e?Bm:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Xt(n)){const l=c=>{const u=Kf(c,t,!0);u&&(a=!0,Re(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ce(n)&&i.set(n,null),null):(Ft(r)?r.forEach(l=>o[l]=null):Re(o,r),ce(n)&&i.set(n,o),o)}function ha(n,t){return!n||!na(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),te(n,t[0].toLowerCase()+t.slice(1))||te(n,as(t))||te(n,t))}function Lu(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:g,inheritAttrs:M}=n,p=zo(n);let m,b;try{if(e.shapeFlag&4){const v=s||i,I=v;m=Dn(c.call(I,v,u,h,d,f,g)),b=a}else{const v=t;m=Dn(v.length>1?v(h,{attrs:a,slots:o,emit:l}):v(h,null)),b=t.props?a:zm(a)}}catch(v){ts.length=0,ca(v,n,1),m=Je(wn)}let _=m;if(b&&M!==!1){const v=Object.keys(b),{shapeFlag:I}=_;v.length&&I&7&&(r&&v.some(ia)&&(b=km(b,r)),_=Bs(_,b,!1,!0))}if(e.dirs&&(_=Bs(_,null,!1,!0),_.dirs=_.dirs?_.dirs.concat(e.dirs):e.dirs),e.transition){const v=ua(_.type)&&Hf(_)||_;fr(v,e.transition)}return m=_,zo(p),m}function jf(n,t=!0){let e;for(let i=0;i<n.length;i++){const s=n[i];if(Vc(s)){if(s.type!==wn||s.children==="v-if"){if(e)return;e=s}}else return}return e}const zm=n=>{let t;for(const e in n)(e==="class"||e==="style"||na(e))&&((t||(t={}))[e]=n[e]);return t},km=(n,t)=>{const e={};for(const i in n)(!ia(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function Hm(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?Du(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(Zf(o,i,f)&&!ha(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Du(i,o,c):!0:!!o;return!1}function Du(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(!te(n,r)||Zf(t,n,r)&&!ha(e,r))return!0}return!1}function Zf(n,t,e){const i=n[e],s=t[e];return e==="style"&&ce(i)&&ce(s)?!Ti(i,s):i!==s}function Vm({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const Jf={},Qf=()=>Object.create(Jf),td=n=>Object.getPrototypeOf(n)===Jf;function Gm(n,t,e,i=!1){const s={},r=Qf();n.propsDefaults=Object.create(null),ed(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:jp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Wm(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ie(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(ha(n.emitsOptions,f))continue;const d=t[f];if(l)if(te(r,f))d!==r[f]&&(r[f]=d,c=!0);else{const g=bn(f);s[g]=Ll(l,a,g,d,n,!1)}else d!==r[f]&&(r[f]=d,c=!0)}}}else{ed(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!te(t,h)&&((u=as(h))===h||!te(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=Ll(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!te(t,h))&&(delete r[h],c=!0)}c&&ei(n.attrs,"set","")}function ed(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(lr(l))continue;const c=t[l];let u;s&&te(s,u=bn(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:ha(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ie(e),c=a||he;for(let u=0;u<r.length;u++){const h=r[u];e[h]=Ll(s,l,h,c[h],n,!te(c,h))}}return o}function Ll(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=te(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Xt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=zr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===as(e))&&(i=!0))}return i}const Xm=new WeakMap;function nd(n,t,e=!1){const i=e?Xm:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Xt(n)){const u=h=>{l=!0;const[f,d]=nd(h,t,!0);Re(o,f),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ce(n)&&i.set(n,Yi),Yi;if(Ft(r))for(let u=0;u<r.length;u++){const h=bn(r[u]);Iu(h)&&(o[h]=he)}else if(r)for(const u in r){const h=bn(u);if(Iu(h)){const f=r[u],d=o[h]=Ft(f)||Xt(f)?{type:f}:Re({},f),g=d.type;let M=!1,p=!0;if(Ft(g))for(let m=0;m<g.length;++m){const b=g[m],_=Xt(b)&&b.name;if(_==="Boolean"){M=!0;break}else _==="String"&&(p=!1)}else M=Xt(g)&&g.name==="Boolean";d[0]=M,d[1]=p,(M||te(d,"default"))&&a.push(h)}}const c=[o,a];return ce(n)&&i.set(n,c),c}function Iu(n){return n[0]!=="$"&&!lr(n)}const kc=n=>n==="_"||n==="_ctx"||n==="$stable",Hc=n=>Ft(n)?n.map(Dn):[Dn(n)],$m=(n,t,e)=>{if(t._n)return t;const i=cm((...s)=>Hc(t(...s)),e);return i._c=!1,i},id=(n,t,e)=>{const i=n._ctx;for(const s in n){if(kc(s))continue;const r=n[s];if(Xt(r))t[s]=$m(s,r,i);else if(r!=null){const o=Hc(r);t[s]=()=>o}}},sd=(n,t)=>{const e=Hc(t);n.slots.default=()=>e},rd=(n,t,e)=>{for(const i in t)(e||!kc(i))&&(n[i]=t[i])},Ym=(n,t,e)=>{const i=n.slots=Qf();if(n.vnode.shapeFlag&32){const s=t._;s?(rd(i,t,e),e&&ff(i,"_",s,!0)):id(t,i)}else t&&sd(n,t)},qm=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=he;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:rd(s,t,e):(r=!t.$stable,id(t,s)),o=t}else t&&(sd(n,t),o={default:1});if(r)for(const a in s)!kc(a)&&o[a]==null&&delete s[a]},Xe=t_;function Km(n){return jm(n)}function jm(n,t){const e=ra();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=On,insertStaticContent:g}=n,M=(C,w,S,H=null,O=null,U=null,X=void 0,tt=null,q=!!w.dynamicChildren)=>{if(C===w)return;C&&!Zs(C,w)&&(H=Mt(C),Bt(C,O,U,!0),C=null),w.patchFlag===-2&&(q=!1,w.dynamicChildren=null),w.dynamicChildren&&C&&C.dynamicChildren&&C.dynamicChildren.hasOnce&&(w.dynamicChildren===Yi&&(w.dynamicChildren=[]),w.dynamicChildren.hasOnce=!0);const{type:E,ref:x,shapeFlag:L}=w;switch(E){case fa:p(C,w,S,H);break;case wn:m(C,w,S,H);break;case Ua:C==null&&b(w,S,H,X);break;case qt:K(C,w,S,H,O,U,X,tt,q);break;default:L&1?I(C,w,S,H,O,U,X,tt,q):L&6?$(C,w,S,H,O,U,X,tt,q):(L&64||L&128)&&E.process(C,w,S,H,O,U,X,tt,q,Ut)}x!=null&&O?dr(x,C&&C.ref,U,w||C,!w):x==null&&C&&C.ref!=null&&dr(C.ref,null,U,C,!0)},p=(C,w,S,H)=>{if(C==null)i(w.el=a(w.children),S,H);else{const O=w.el=C.el;w.children!==C.children&&c(O,w.children)}},m=(C,w,S,H)=>{C==null?i(w.el=l(w.children||""),S,H):w.el=C.el},b=(C,w,S,H)=>{[C.el,C.anchor]=g(C.children,w,S,H,C.el,C.anchor)},_=({el:C,anchor:w},S,H)=>{let O;for(;C&&C!==w;)O=f(C),i(C,S,H),C=O;i(w,S,H)},v=({el:C,anchor:w})=>{let S;for(;C&&C!==w;)S=f(C),s(C),C=S;s(w)},I=(C,w,S,H,O,U,X,tt,q)=>{if(w.type==="svg"?X="svg":w.type==="math"&&(X="mathml"),C==null)P(w,S,H,O,U,X,tt,q);else{const E=C.el&&C.el._isVueCE?C.el:null;try{E&&E._beginPatch(),it(C,w,O,U,X,tt,q)}finally{E&&E._endPatch()}}},P=(C,w,S,H,O,U,X,tt)=>{let q,E;const{props:x,shapeFlag:L,transition:G,dirs:Y}=C;if(q=C.el=o(C.type,U,x&&x.is,x),L&8?u(q,C.children):L&16&&B(C.children,q,null,H,O,Ia(C,U),X,tt),Y&&Ii(C,null,H,"created"),R(q,C,C.scopeId,X,H),x){for(const pt in x)pt!=="value"&&!lr(pt)&&r(q,pt,null,x[pt],U,H);"value"in x&&r(q,"value",null,x.value,U),(E=x.onVnodeBeforeMount)&&Cn(E,H,C)}Y&&Ii(C,null,H,"beforeMount");const j=Zm(O,G);j?G.beforeEnter(q):G&&!G.persisted&&(q[Qm]=!0),i(q,w,S),((E=x&&x.onVnodeMounted)||j||Y)&&Xe(()=>{try{E&&Cn(E,H,C),j&&G.enter(q),Y&&Ii(C,null,H,"mounted")}finally{}},O)},R=(C,w,S,H,O)=>{if(S&&d(C,S),H)for(let U=0;U<H.length;U++)d(C,H[U]);if(O){let U=O.subTree;if(w===U||ld(U.type)&&(U.ssContent===w||U.ssFallback===w)){const X=O.vnode;R(C,X,X.scopeId,X.slotScopeIds,O.parent)}}},B=(C,w,S,H,O,U,X,tt,q=0)=>{for(let E=q;E<C.length;E++){const x=C[E]=tt?ti(C[E]):Dn(C[E]);M(null,x,w,S,H,O,U,X,tt)}},it=(C,w,S,H,O,U,X)=>{const tt=w.el=C.el;let{patchFlag:q,dynamicChildren:E,dirs:x}=w;q|=C.patchFlag&16;const L=C.props||he,G=w.props||he;let Y;if(S&&Ui(S,!1),(Y=G.onVnodeBeforeUpdate)&&Cn(Y,S,w,C),x&&Ii(w,C,S,"beforeUpdate"),S&&Ui(S,!0),E&&(!C.dynamicChildren||C.dynamicChildren.length!==E.length)&&(q=0,X=!1,E=null),(L.innerHTML&&G.innerHTML==null||L.textContent&&G.textContent==null)&&u(tt,""),E?y(C.dynamicChildren,E,tt,S,H,Ia(w,O),U):X||k(C,w,tt,null,S,H,Ia(w,O),U,!1),q>0){if(q&16)T(tt,L,G,S,O);else if(q&2&&L.class!==G.class&&r(tt,"class",null,G.class,O),q&4&&r(tt,"style",L.style,G.style,O),q&8){const j=w.dynamicProps;for(let pt=0;pt<j.length;pt++){const at=j[pt],mt=L[at],Nt=G[at];(Nt!==mt||at==="value")&&r(tt,at,mt,Nt,O,S)}}q&1&&C.children!==w.children&&u(tt,w.children)}else!X&&E==null&&T(tt,L,G,S,O);((Y=G.onVnodeUpdated)||x)&&Xe(()=>{Y&&Cn(Y,S,w,C),x&&Ii(w,C,S,"updated")},H)},y=(C,w,S,H,O,U,X)=>{for(let tt=0;tt<w.length;tt++){const q=C[tt],E=w[tt],x=q.el||_r(q),L=x&&(q.type===qt||!Zs(q,E)||q.shapeFlag&198)?h(x):S;M(q,E,L,null,H,O,U,X,!0)}},T=(C,w,S,H,O)=>{if(w!==S){if(w!==he)for(const U in w)!lr(U)&&!(U in S)&&r(C,U,w[U],null,O,H);for(const U in S){if(lr(U))continue;const X=S[U],tt=w[U];X!==tt&&U!=="value"&&r(C,U,tt,X,O,H)}"value"in S&&r(C,"value",w.value,S.value,O)}},K=(C,w,S,H,O,U,X,tt,q)=>{const E=w.el=C?C.el:a(""),x=w.anchor=C?C.anchor:a("");let{patchFlag:L,dynamicChildren:G,slotScopeIds:Y}=w;Y&&(tt=tt?tt.concat(Y):Y),C==null?(i(E,S,H),i(x,S,H),B(w.children||[],S,x,O,U,X,tt,q)):L>0&&L&64&&G&&C.dynamicChildren&&C.dynamicChildren.length===G.length?(y(C.dynamicChildren,G,S,O,U,X,tt),(w.key!=null||O&&w===O.subTree)&&od(C,w,!0)):k(C,w,S,x,O,U,X,tt,q)},$=(C,w,S,H,O,U,X,tt,q)=>{w.slotScopeIds=tt,C==null?w.shapeFlag&512?O.ctx.activate(w,S,H,X,q):Q(w,S,H,O,U,X,q):rt(C,w,q)},Q=(C,w,S,H,O,U,X)=>{const tt=C.component=o_(C,H,O);if(zc(C)&&(tt.ctx.renderer=Ut),l_(tt,!1,X),tt.asyncDep){if(O&&O.registerDep(tt,W,X,U),!C.el){const q=tt.subTree=Je(wn);m(null,q,w,S),C.placeholder=q.el}}else W(tt,C,w,S,O,U,X)},rt=(C,w,S)=>{const H=w.component=C.component;if(Hm(C,w,S))if(H.asyncDep&&!H.asyncResolved){w.el=C.el,w.placeholder=C.placeholder,et(H,w,S);return}else H.next=w,H.update();else w.el=C.el,w.placeholder=C.placeholder,H.vnode=w},W=(C,w,S,H,O,U,X)=>{const tt=()=>{if(C.isMounted){let{next:L,bu:G,u:Y,parent:j,vnode:pt}=C;{const yt=ad(C);if(yt){L&&(L.el=pt.el,et(C,L,X)),yt.asyncDep.then(()=>{const Dt=()=>{C.job.flags&8||(O&&O.pendingBranch?Xe(Dt,O):E())};Dt.flags=48,Xe(Dt,O)});return}}let at=L,mt;Ui(C,!1),L?(L.el=pt.el,et(C,L,X)):L=pt,G&&wo(G),(mt=L.props&&L.props.onVnodeBeforeUpdate)&&Cn(mt,j,L,pt),Ui(C,!0);const Nt=Lu(C),ut=C.subTree;C.subTree=Nt,M(ut,Nt,h(ut.el||_r(ut)),Mt(ut),C,O,U),L.el=Nt.el,at===null&&Vm(C,Nt.el),Y&&Xe(Y,O),(mt=L.props&&L.props.onVnodeUpdated)&&Xe(()=>Cn(mt,j,L,pt),O)}else{let L;const{el:G,props:Y}=w,{bm:j,m:pt,parent:at,root:mt,type:Nt}=C,ut=pr(w);Ui(C,!1),j&&wo(j),!ut&&(L=Y&&Y.onVnodeBeforeMount)&&Cn(L,at,w),Ui(C,!0);{mt.ce&&mt.ce._hasShadowRoot()&&mt.ce._injectChildStyle(Nt,C.parent?C.parent.type:void 0);const yt=C.subTree=Lu(C);M(null,yt,S,H,C,O,U),w.el=yt.el}if(pt&&Xe(pt,O),!ut&&(L=Y&&Y.onVnodeMounted)){const yt=w;Xe(()=>Cn(L,at,yt),O)}(w.shapeFlag&256||at&&pr(at.vnode)&&at.vnode.shapeFlag&256)&&C.a&&Xe(C.a,O),C.isMounted=!0,w=S=H=null}};C.scope.on();const q=C.effect=new _f(tt);C.scope.off();const E=C.update=q.run.bind(q),x=C.job=q.runIfDirty.bind(q);x.i=C,x.id=C.uid,q.scheduler=()=>Bc(x),Ui(C,!0),E()},et=(C,w,S)=>{w.component=C;const H=C.vnode.props;C.vnode=w,C.next=null,Wm(C,w.props,H,S),qm(C,w.children,S),zn(),Nf(C),kn()},k=(C,w,S,H,O,U,X,tt,q=!1)=>{const E=C&&C.children,x=C?C.shapeFlag:0,L=w.children,{patchFlag:G,shapeFlag:Y}=w;if(G>0){if(G&128){_t(E,L,S,H,O,U,X,tt,q);return}else if(G&256){ft(E,L,S,H,O,U,X,tt,q);return}}Y&8?(x&16&&bt(E,O,U),L!==E&&u(S,L)):x&16?Y&16?_t(E,L,S,H,O,U,X,tt,q):bt(E,O,U,!0):(x&8&&u(S,""),Y&16&&B(L,S,H,O,U,X,tt,q))},ft=(C,w,S,H,O,U,X,tt,q)=>{C=C||Yi,w=w||Yi;const E=C.length,x=w.length,L=Math.min(E,x);let G;for(G=0;G<L;G++){const Y=w[G]=q?ti(w[G]):Dn(w[G]);M(C[G],Y,S,null,O,U,X,tt,q)}E>x?bt(C,O,U,!0,!1,L):B(w,S,H,O,U,X,tt,q,L)},_t=(C,w,S,H,O,U,X,tt,q)=>{let E=0;const x=w.length;let L=C.length-1,G=x-1;for(;E<=L&&E<=G;){const Y=C[E],j=w[E]=q?ti(w[E]):Dn(w[E]);if(Zs(Y,j))M(Y,j,S,null,O,U,X,tt,q);else break;E++}for(;E<=L&&E<=G;){const Y=C[L],j=w[G]=q?ti(w[G]):Dn(w[G]);if(Zs(Y,j))M(Y,j,S,null,O,U,X,tt,q);else break;L--,G--}if(E>L){if(E<=G){const Y=G+1,j=Y<x?w[Y].el:H;for(;E<=G;)M(null,w[E]=q?ti(w[E]):Dn(w[E]),S,j,O,U,X,tt,q),E++}}else if(E>G)for(;E<=L;)Bt(C[E],O,U,!0),E++;else{const Y=E,j=E,pt=new Map;for(E=j;E<=G;E++){const St=w[E]=q?ti(w[E]):Dn(w[E]);St.key!=null&&pt.set(St.key,E)}let at,mt=0;const Nt=G-j+1;let ut=!1,yt=0;const Dt=new Array(Nt);for(E=0;E<Nt;E++)Dt[E]=0;for(E=Y;E<=L;E++){const St=C[E];if(mt>=Nt){Bt(St,O,U,!0);continue}let Vt;if(St.key!=null)Vt=pt.get(St.key);else for(at=j;at<=G;at++)if(Dt[at-j]===0&&Zs(St,w[at])){Vt=at;break}Vt===void 0?Bt(St,O,U,!0):(Dt[Vt-j]=E+1,Vt>=yt?yt=Vt:ut=!0,M(St,w[Vt],S,null,O,U,X,tt,q),mt++)}const zt=ut?Jm(Dt):Yi;for(at=zt.length-1,E=Nt-1;E>=0;E--){const St=j+E,Vt=w[St],Gt=w[St+1],oe=St+1<x?Gt.el||_r(Gt):H;Dt[E]===0?M(null,Vt,S,oe,O,U,X,tt,q):ut&&(at<0||E!==zt[at]?xt(Vt,S,oe,2):at--)}}},xt=(C,w,S,H,O=null)=>{const{el:U,type:X,transition:tt,children:q,shapeFlag:E}=C;if(E&6){xt(C.component.subTree,w,S,H);return}if(E&128){C.suspense.move(w,S,H);return}if(E&64){X.move(C,w,S,Ut);return}if(X===qt){i(U,w,S);for(let L=0;L<q.length;L++)xt(q[L],w,S,H);i(C.anchor,w,S);return}if(X===Ua){_(C,w,S);return}if(H!==2&&E&1&&tt)if(H===0)tt.persisted&&!U[La]?i(U,w,S):(tt.beforeEnter(U),i(U,w,S),Xe(()=>tt.enter(U),O));else{const{leave:L,delayLeave:G,afterLeave:Y}=tt,j=()=>{C.ctx.isUnmounted?s(U):i(U,w,S)},pt=()=>{const at=U._isLeaving||!!U[La];U._isLeaving&&U[La](!0),tt.persisted&&!at?j():L(U,()=>{j(),Y&&Y()})};G?G(U,j,pt):pt()}else i(U,w,S)},Bt=(C,w,S,H=!1,O=!1)=>{const{type:U,props:X,ref:tt,children:q,dynamicChildren:E,shapeFlag:x,patchFlag:L,dirs:G,cacheIndex:Y,memo:j}=C;if((L===-2||E&&E.hasOnce)&&(O=!1),tt!=null&&(zn(),dr(tt,null,S,C,!0),kn()),Y!=null&&(!C.ctx||C.ctx===w)&&(w.renderCache[Y]=void 0),x&256&&w.ctx.deactivate(C))return;const pt=x&1&&G,at=!pr(C);let mt;if(at&&(mt=X&&X.onVnodeBeforeUnmount)&&Cn(mt,w,C),x&6)dt(C.component,S,H);else{if(x&128){C.suspense.unmount(S,H);return}pt&&Ii(C,null,w,"beforeUnmount"),x&64?C.type.remove(C,w,S,Ut,H):E&&!E.hasOnce&&(U!==qt||L>0&&L&64)?bt(E,w,S,!1,!0):(U===qt&&L&384||!O&&x&16)&&bt(q,w,S),H&&jt(C)}const Nt=j!=null&&Y==null;(at&&(mt=X&&X.onVnodeUnmounted)||pt||Nt)&&Xe(()=>{mt&&Cn(mt,w,C),pt&&Ii(C,null,w,"unmounted"),Nt&&(C.el=null)},S)},jt=C=>{const{type:w,el:S,anchor:H,transition:O}=C,U=w===qt;if(U&&!O){st(S,H);return}if(w===Ua){v(C),O&&!O.persisted&&O.afterLeave&&O.afterLeave();return}const X=U?wl(C):C,tt=()=>{U?h(S)&&st(S,H):s(S),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(X&&X.shapeFlag&1&&O&&!O.persisted){const{leave:q,delayLeave:E}=O,x=X.el,L=()=>q(x,tt);E?E(x,tt,L):L()}else tt()},st=(C,w)=>{let S;for(;C!==w;)S=f(C),s(C),C=S;s(w)},dt=(C,w,S)=>{const{bum:H,scope:O,job:U,subTree:X,um:tt,m:q,a:E}=C;Uu(q),Uu(E),H&&wo(H),O.stop(),U?(U.flags|=8,Bt(X,C,w,S)):X&&(X.transition=C.vnode.transition,Bt(X,C,w,S)),tt&&Xe(tt,w);const x=()=>{C.isUnmounted=!0};x.flags=16,Xe(x,w)},bt=(C,w,S,H=!1,O=!1,U=0)=>{for(let X=U;X<C.length;X++)Bt(C[X],w,S,H,O)},Mt=C=>{if(C.shapeFlag&6)return Mt(C.component.subTree);if(C.shapeFlag&128)return C.suspense.next();const w=f(C.anchor||C.el),S=w&&w[pm];return S?f(S):w},Ot=(C,w,S)=>{const H=C&&w._vnode?void 0:C&&C.component?C.component.uid:r_();lm(()=>{C==null?w._vnode&&Bt(w._vnode,null,null,!0):M(w._vnode||null,C,w,null,null,null,S),w._vnode=C},H)},Ut={p:M,um:Bt,m:xt,r:jt,mt:Q,mc:B,pc:k,pbc:y,n:Mt,o:n};return{render:Ot,hydrate:void 0,createApp:Nm(Ot)}}function Ia({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Ui({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function Zm(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function od(n,t,e=!1){const i=n.children,s=t.children;if(Ft(i)&&Ft(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ti(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&od(o,a)),a.type===fa&&(a.patchFlag===-1&&(a=s[r]=ti(a)),a.el=o.el),a.type===wn&&!a.el&&(a.el=o.el)}}function Jm(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function ad(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ad(t)}function Uu(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function _r(n){if(n.placeholder)return n.placeholder;const t=n.component;if(t)return _r(t.subTree);const e=n.suspense;return e&&e.activeBranch?_r(e.activeBranch):null}const ld=n=>n.__isSuspense,Qm=Symbol("_deferredEnter");function t_(n,t){t&&t.pendingBranch?Ft(n)?t.effects.push(...n):t.effects.push(n):am(n)}const qt=Symbol.for("v-fgt"),fa=Symbol.for("v-txt"),wn=Symbol.for("v-cmt"),Ua=Symbol.for("v-stc"),ts=[];let an=null;function ct(n=!1){ts.push(an=n?null:[])}function cd(){ts.pop(),an=ts[ts.length-1]||null}let wr=1;function Nu(n,t=!1){wr+=n,n<0&&an&&t&&(an.hasOnce=!0)}function ud(n){return n.dynamicChildren=wr>0?an||Yi:null,cd(),wr>0&&an&&an.push(n),n}function ht(n,t,e,i,s,r){return ud(D(n,t,e,i,s,r,!0))}function qi(n,t,e,i,s){return ud(Je(n,t,e,i,s,!0))}function Vc(n){return n?n.__v_isVNode===!0:!1}function Zs(n,t){return n.type===t.type&&n.key===t.key}const hd=({key:n})=>n??null,Ro=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?Se(n)||Ve(n)||Xt(n)?{i:fn,r:n,k:t,f:!!e}:n:null);function D(n,t=null,e=null,i=0,s=null,r=n===qt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&hd(t),ref:t&&Ro(t),scopeId:Bf,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:fn};return a?(Vo(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=Se(e)?8:16),wr>0&&!o&&an&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&an.push(l),l}const Je=e_;function e_(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===wm)&&(n=wn),Vc(n)){const a=Bs(n,t,!0);return e&&Vo(a,e),wr>0&&!r&&an&&(a.shapeFlag&6?an[an.indexOf(n)]=a:an.push(a)),a.patchFlag=-2,a}if(f_(n)&&(n=n.__vccOpts),t){t=n_(t);let{class:a,style:l}=t;a&&!Se(a)&&(t.class=Ue(a)),ce(l)&&(Fc(l)&&!Ft(l)&&(l=Re({},l)),t.style=oa(l))}const o=Se(n)?1:ld(n)?128:ua(n)?64:ce(n)?4:Xt(n)?2:0;return D(n,t,e,i,s,o,r,!0)}function n_(n){return n?Fc(n)?Re({},n):td(n)?Re({},n[md]||n):n:null}function Bs(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?i_(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&hd(c),ref:t&&t.ref?e&&r?Ft(r)?r.concat(Ro(t)):[r,Ro(t)]:Ro(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==qt?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Bs(n.ssContent),ssFallback:n.ssFallback&&Bs(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce,cacheIndex:n.cacheIndex};return l&&i&&fr(u,l.clone(u)),u}function ue(n=" ",t=0){return Je(fa,null,n,t)}function _e(n="",t=!1){return t?(ct(),qi(wn,null,n)):Je(wn,null,n)}function Dn(n){return n==null||typeof n=="boolean"?Je(wn):Ft(n)?Je(qt,null,n.slice()):Vc(n)?ti(n):Je(fa,null,String(n))}function ti(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Bs(n)}function Vo(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Ft(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Vo(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!td(t)?t._ctx=fn:s===3&&fn&&(fn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else if(Xt(t)){if(i&65){Vo(n,{default:t});return}t={default:t,_ctx:fn},e=32}else t=String(t),i&64?(e=16,t=[ue(t)]):e=8;n.children=t,n.shapeFlag|=e}function i_(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Ue([t.class,i.class]));else if(s==="style")t.style=oa([t.style,i.style]);else if(na(s)){const r=t[s],o=i[s];o&&r!==o&&!(Ft(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ia(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Cn(n,t,e,i=null){An(n,t,7,[e,i])}const s_=qf();let fd=0;function r_(){return fd}function o_(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||s_,r={uid:fd++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Dp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:nd(i,s),emitsOptions:Kf(i,s),emit:null,emitted:null,propsDefaults:he,inheritAttrs:i.inheritAttrs,ctx:he,data:he,props:he,attrs:he,slots:he,refs:he,setupState:he,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Fm.bind(null,r),n.ce&&n.ce(r),r}let qe=null;const a_=()=>qe||fn;let Go,Cr;{const n=ra(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};Go=t("__VUE_INSTANCE_SETTERS__",e=>qe=e),Cr=t("__VUE_SSR_SETTERS__",e=>Rr=e)}const zr=n=>{const t=qe;return Go(n),n.scope.on(),()=>{n.scope.off(),Go(t)}},Ou=()=>{qe&&qe.scope.off(),Go(null)};function dd(n){return n.vnode.shapeFlag&4}let Rr=!1;function l_(n,t=!1,e=!1){t&&Cr(t);const{props:i,children:s}=n.vnode,r=dd(n);Gm(n,i,r,t),Ym(n,s,e||t);const o=r?c_(n,t):void 0;return t&&Cr(!1),o}function c_(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Cm);const{setup:i}=e;if(i){zn();const s=n.setupContext=i.length>1?h_(n):null,r=zr(n),o=Br(i,n,0,[n.props,s]),a=lf(o);if(kn(),r(),(a||n.sp)&&!pr(n)&&Vf(n),a){if(o.then(Ou,Ou),t)return o.then(l=>{Cr(!0);try{Fu(n,l,t)}finally{Cr(!1)}}).catch(l=>{ca(l,n,0,void 0,!0),n.ssrRender=(c,u)=>u("<!---->")});n.asyncDep=o}else Fu(n,o)}else pd(n)}function Fu(n,t,e){Xt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ce(t)&&(n.setupState=Lf(t)),pd(n)}function pd(n,t,e){const i=n.type;n.render||(n.render=i.render||On);{const s=zr(n);zn();try{Rm(n)}finally{kn(),s()}}}const md=Symbol(),u_={get(n,t){return He(n,"get",""),t===md?n:n[t]}};function h_(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,u_),slots:n.slots,emit:n.emit,expose:t}}function da(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Lf(Zp(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in mr)return mr[e](n)},has(t,e){return e in t||e in mr}})):n.proxy}function f_(n){return Xt(n)&&"__vccOpts"in n}const se=(n,t)=>nm(n,t,Rr),d_="3.5.45";/**
* @vue/runtime-dom v3.5.45
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Dl;const Bu=typeof window<"u"&&window.trustedTypes;if(Bu)try{Dl=Bu.createPolicy("vue",{createHTML:n=>n})}catch{}const _d=Dl?n=>Dl.createHTML(n):n=>n,p_="http://www.w3.org/2000/svg",m_="http://www.w3.org/1998/Math/MathML",Qn=typeof document<"u"?document:null,zu=Qn&&Qn.createElement("template"),__={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?Qn.createElementNS(p_,n):t==="mathml"?Qn.createElementNS(m_,n):e?Qn.createElement(n,{is:e}):Qn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Qn.createTextNode(n),createComment:n=>Qn.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Qn.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{zu.innerHTML=_d(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=zu.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},g_=Symbol("_vtc");function v_(n,t,e){const i=n[g_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const ku=Symbol("_vod"),x_=Symbol("_vsh"),M_=Symbol(""),y_=/(?:^|;)\s*display\s*:/;function S_(n,t,e){const i=n.style,s=Se(e);let r=!1;if(e&&!s){if(t)if(Se(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&rr(i,a,"")}else for(const o in t)e[o]==null&&rr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?b_(n,o,!Se(t)&&t?t[o]:void 0,a)||rr(i,o,a):rr(i,o,"")}}else if(s){if(t!==e){const o=i[M_];o&&(e+=";"+o),i.cssText=e,r=y_.test(e)}}else t&&n.removeAttribute("style");ku in n&&((!s||t!==e)&&(n[ku]=r?i.display:""),n[x_]&&(i.display="none"))}const qr=/\s*!important$/;function rr(n,t,e){if(Ft(e))e.forEach(i=>rr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))qr.test(e)?n.setProperty(t,e.replace(qr,""),"important"):n.setProperty(t,e);else{const i=E_(n,t);qr.test(e)?n.setProperty(as(i),e.replace(qr,""),"important"):n[i]=e}}const Hu=["Webkit","Moz","ms"],Na={};function E_(n,t){const e=Na[t];if(e)return e;let i=bn(t);if(i!=="filter"&&i in n)return Na[t]=i;i=hf(i);for(let s=0;s<Hu.length;s++){const r=Hu[s]+i;if(r in n)return Na[t]=r}return t}function b_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&Se(i)&&e===i}const Vu="http://www.w3.org/1999/xlink";function Gu(n,t,e,i,s,r=Cp(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Vu,t.slice(6,t.length)):n.setAttributeNS(Vu,t,e):e==null||r&&!df(e)?n.removeAttribute(t):n.setAttribute(t,r?"":Bn(e)?String(e):e)}function Wu(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?_d(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=df(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Wi(n,t,e,i){n.addEventListener(t,e,i)}function T_(n,t,e,i){n.removeEventListener(t,e,i)}const Xu=Symbol("_vei");function A_(n,t,e,i,s=null){const r=n[Xu]||(n[Xu]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=R_(t);if(i){const c=r[t]=D_(i,s);Wi(n,a,c,l)}else o&&(T_(n,a,o,l),r[t]=void 0)}}const w_=/(Once|Passive|Capture)$/,C_=/^on:?(?:Once|Passive|Capture)$/;function R_(n){let t,e;for(;(e=n.match(w_))&&!C_.test(n);)t||(t={}),n=n.slice(0,n.length-e[1].length),t[e[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):as(n.slice(2)),t]}let Oa=0;const P_=Promise.resolve(),L_=()=>Oa||(P_.then(()=>Oa=0),Oa=Date.now());function D_(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;const s=e.value;if(Ft(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const o=s.slice(),a=[i];for(let l=0;l<o.length&&!i._stopped;l++){const c=o[l];c&&An(c,t,5,a)}}else An(s,t,5,[i])};return e.value=n,e.attached=L_(),e}const $u=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,I_=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?v_(n,i,o):t==="style"?S_(n,e,i):na(t)?ia(t)||A_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):U_(n,t,i,o))?(Wu(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Gu(n,t,i,o,r,t!=="value")):n._isVueCE&&(N_(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!Se(i)))?Wu(n,bn(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Gu(n,t,i,o))};function U_(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&$u(t)&&Xt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return $u(t)&&Se(e)?!1:t in n}function N_(n,t){const e=n._def.props;if(!e)return!1;const i=bn(t);return Array.isArray(e)?e.some(s=>bn(s)===i):Object.keys(e).some(s=>bn(s)===i)}const Wo=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Ft(t)?e=>wo(t,e):t};function O_(n){n.target.composing=!0}function Yu(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Ki=Symbol("_assign"),Kr=Symbol("_initialValue");function Fa(n,t,e){return t&&(n=n.trim()),e&&(n=Fr(n)),n}const on={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n.parentNode&&(n.type==="text"?n[Kr]=n.defaultValue.replace(/[\r\n]/g,""):n.type==="textarea"&&(n[Kr]=n.defaultValue.replace(/\r\n?/g,`
`))),n[Ki]=Wo(s);const r=i||s.props&&s.props.type==="number";Wi(n,t?"change":"input",o=>{o.target.composing||n[Ki](Fa(n.value,e,r))}),(e||r)&&Wi(n,"change",()=>{n.value=Fa(n.value,e,r)}),t||(Wi(n,"compositionstart",O_),Wi(n,"compositionend",Yu),Wi(n,"change",Yu))},mounted(n,{value:t,modifiers:{trim:e,number:i}}){const s=t??"",r=n[Kr];delete n[Kr],r!==void 0&&(n.type==="text"||n.type==="textarea")&&n.value!==r?n[Ki](Fa(n.value,e,i)):n.value=s},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[Ki]=Wo(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?Fr(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},Il={deep:!0,created(n,{value:t,modifiers:{number:e}},i){n._modelValue=t,Wi(n,"change",()=>{const s=Array.prototype.filter.call(n.options,l=>l.selected).map(l=>e?Fr(Xo(l)):Xo(l)),r=n.multiple,o=r?es(n._modelValue)?new Set(s):s:s[0],a=n._pendingValue=[r,r?Ft(o)?s.slice():s:o];try{n[Ki](o)}finally{If(()=>{n._pendingValue===a&&(n._pendingValue=void 0)})}}),n[Ki]=Wo(i)},mounted(n,{value:t,modifiers:{number:e}}){qu(n,t,e)},beforeUpdate(n,{value:t},e){n._modelValue=t,n[Ki]=Wo(e)},updated(n,{value:t,modifiers:{number:e}}){const i=n._pendingValue;n._pendingValue=void 0,(!i||i[0]!==n.multiple||!F_(t,i[1],i[0]))&&qu(n,t,e)}};function F_(n,t,e){if(!e||Ft(n))return Ti(n,t);if(es(n)){if(n.size!==t.length)return!1;for(const i of t)if(!n.has(i))return!1;return!0}return!1}function qu(n,t,e=!1){const i=n.multiple,s=Ft(t);if(!(i&&!s&&!es(t))){for(let r=0,o=n.options.length;r<o;r++){const a=n.options[r],l=Xo(a);if(i)if(s){const c=typeof l;c==="string"||c==="number"?a.selected=t.some(u=>String(u)===String(l)):a.selected=Lp(t,l)>-1}else a.selected=t.has(l)||e&&typeof l=="string"&&t.has(Fr(l));else if(Ti(Xo(a),t)){n.selectedIndex!==r&&(n.selectedIndex=r);return}}!i&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function Xo(n){return"_value"in n?n._value:n.value}const B_=Re({patchProp:I_},__);let Ku;function z_(){return Ku||(Ku=Km(B_))}const k_=(...n)=>{const t=z_().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=V_(i);if(!s)return;const r=t._component;!Xt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,H_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t};function H_(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function V_(n){return Se(n)?document.querySelector(n):n}const pa={designer:"设计员(隧道专业组)",reviewer:"审核人",manager:"路段管理处"},ns={draft:"草稿",pending:"待审核",returned:"退回",approved:"已通过",delivered:"已交付"},gr=Math.PI/180,ju=180/Math.PI;function G_(n){const t=new Date(n.getFullYear(),0,0);return Math.floor((n.getTime()-t.getTime())/864e5)}function W_(n){return 23.45*Math.sin(gr*(360/365)*(284+n))}function X_(n){const t=gr*.9863013698630136*(n-81);return 9.87*Math.sin(2*t)-7.53*Math.cos(t)-1.5*Math.sin(t)}function $o(n,t,e=120){const i=G_(t),s=W_(i)*gr,r=n*gr,a=t.getHours()*60+t.getMinutes()+X_(i)+4*(e-120),l=gr*(a/4-180),c=Math.sin(r)*Math.sin(s)+Math.cos(r)*Math.cos(s)*Math.cos(l),u=Math.asin(Math.max(-1,Math.min(1,c))),h=(Math.sin(s)-Math.sin(r)*Math.sin(u))/(Math.cos(r)*Math.cos(u)||1e-9);let f=Math.acos(Math.max(-1,Math.min(1,h)));return l>0&&(f=2*Math.PI-f),{altitude:u*ju,azimuth:f*ju}}function Ul(n,t){const[e,i,s]=n.split("-").map(Number),[r,o]=t.split(":").map(Number);return new Date(e,(i||1)-1,s||1,r||0,o||0,0,0)}function gd(n,t){let e=Math.abs(n-t)%360;return e>180&&(e=360-e),e}const Nl=Math.PI/180;function $_(n){if(n<=0)return n>-6?300:5;const t=Math.sin(n*Nl);return Math.round(2500+95e3*Math.pow(t,1.15))}function Y_(n,t,e,i,s){if(n<=.5)return .95;const r=gd(t,e)*Nl,a=Math.min(.35,.3*s)+i*Math.abs(Math.cos(r))/Math.tan(n*Nl);return Math.max(.02,Math.min(.9,a/s))}function Pr(n){var M;const t=Ul(n.simDate,n.simTime),e=$o(n.latitude,t),i=$_(e.altitude),s=Y_(e.altitude,e.azimuth,n.orientation,n.grilleDepth,n.grilleSpacing),r=n.thresholdPct/100,o=n.canopyLength,a=Math.max(.3,n.grilleSpacing),l=Math.max(.25,Math.min(1,o/200)),c=[];for(let p=0;p<=o+1e-6;p+=l){const m=(o-p)/a,b=Math.pow(1-s,m),_=1+.12*s*Math.sin(2*Math.PI*p/a)*(p/o);c.push({x:p,e:i*b*_})}const u=Math.max(1,Math.round(a/l)),h=c.map((p,m)=>{let b=0,_=0;for(let v=Math.max(0,m-u);v<=Math.min(c.length-1,m+u);v++)b+=c[v].e,_++;return b/_}),f=c.map((p,m)=>{const b=p.x>o?i:i*(r+(1-r)*(p.x/o)),_=.06*b,v=Math.abs(p.e-h[m]),I=p.e>b+1e-6,P=p.x<=o-a&&v>_,R=I?p.e-b:P?v-_:0;return{x:Math.round(p.x*100)/100,illuminance:Math.round(p.e),limit:Math.round(b),exceeded:I,steep:P,offset:Math.round(R)}}),d=f.filter(p=>p.exceeded),g=f.filter(p=>p.steep);return{outsideIlluminance:i,solarAltitude:Math.round(e.altitude*10)/10,solarAzimuth:Math.round(e.azimuth*10)/10,shadingPerGrille:Math.round(s*1e3)/1e3,portalIlluminance:((M=f[0])==null?void 0:M.illuminance)??0,jumpLimitPct:6,points:f,exceededCount:d.length,steepCount:g.length,maxOffset:f.reduce((p,m)=>Math.max(p,m.offset),0),pass:d.length===0&&g.length===0,computedAt:new Date().toLocaleString("zh-CN",{hour12:!1})}}function q_(n,t){const e=new Date().getFullYear(),i=[{label:`${e}-11-21`,date:new Date(e,10,21)},{label:`${e}-12-21`,date:new Date(e,11,21)},{label:`${e+1}-01-21`,date:new Date(e+1,0,21)}],s=[];for(const{label:r,date:o}of i){let a=null,l=0;for(let c=360;c<=1080;c+=10){const u=new Date(o);u.setHours(Math.floor(c/60),c%60,0,0);const h=$o(n,u);h.altitude>0&&h.altitude<18&&gd(h.azimuth,t)<40?(a===null&&(a=c),l=Math.max(l,h.altitude)):a!==null&&(s.push({date:r,start:Ba(a),end:Ba(c),maxAltitude:Math.round(l*10)/10}),a=null,l=0)}a!==null&&s.push({date:r,start:Ba(a),end:"18:00",maxAltitude:Math.round(l*10)/10})}return s}function Ba(n){return`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`}function Yo(n){return["北","东北","东","东南","南","西南","西","西北"][Math.round((n%360+360)%360/45)%8]}const vd="tunnel-shading-schemes-v1",xd="tunnel-shading-session-v1";function zs(){return new Date().toLocaleString("zh-CN",{hour12:!1})}function Md(){return Math.random().toString(36).slice(2,10)+Date.now().toString(36)}function Ol(){return{tunnelName:"",portalName:"进口",stake:"K0+000",orientation:90,latitude:30.5,canopyLength:60,grilleSpacing:1.5,grilleDepth:.6,thresholdPct:3,simDate:`${new Date().getFullYear()}-06-21`,simTime:"12:00"}}function Fl(n,t){return{id:Md(),status:"draft",reworkCount:0,locked:!1,current:{version:1,params:n,result:null,submittedAt:"",submittedBy:t},history:[],returns:[],annotations:[],audit:[{action:"新建方案单",operator:t,role:"designer",time:zs()}],createdAt:zs()}}function K_(){let n=[],t={role:"designer",operator:"设计员A"};try{const e=localStorage.getItem(vd);e&&(n=JSON.parse(e))}catch{}try{const e=localStorage.getItem(xd);e&&(t=JSON.parse(e))}catch{}return n.length===0&&(n=j_()),la({schemes:n,session:t})}function j_(){const n=Fl({...Ol(),tunnelName:"青云山隧道",portalName:"进口",stake:"K12+380",orientation:95,latitude:29.8,canopyLength:72,grilleSpacing:1.2,grilleDepth:.7,thresholdPct:3},"设计员A");n.current.result=Pr(n.current.params),Gc(n,"设计员A"),yd(n,"审核人B");const t=Fl({...Ol(),tunnelName:"青云山隧道",portalName:"出口",stake:"K14+105",orientation:268,latitude:29.8,canopyLength:30,grilleSpacing:3,grilleDepth:.4,thresholdPct:4},"设计员A");return t.current.result=Pr(t.current.params),[n,t]}const Kt=K_();hr(()=>[Kt.schemes,Kt.session],()=>{try{localStorage.setItem(vd,JSON.stringify(Kt.schemes)),localStorage.setItem(xd,JSON.stringify(Kt.session))}catch{}},{deep:!0});function Ys(n,t,e){n.audit.push({action:t,operator:Kt.session.operator,role:Kt.session.role,time:zs(),detail:e})}function Z_(){const n=Fl(Ol(),Kt.session.operator);return Kt.schemes.push(n),n}function J_(n){const t=Kt.schemes.findIndex(e=>e.id===n);t>=0&&Kt.schemes[t].status==="draft"&&Kt.schemes.splice(t,1)}function Q_(n){n.current.result=Pr(n.current.params),Ys(n,"运行仿真",`v${n.current.version} 洞外照度 ${n.current.result.outsideIlluminance} lux, ${n.current.result.pass?"通过":"未通过"}`)}function Gc(n,t){n.current.result||(n.current.result=Pr(n.current.params)),n.status==="returned"&&(n.reworkCount+=1);const e=JSON.parse(JSON.stringify({...n.current,submittedAt:zs(),submittedBy:t??Kt.session.operator}));n.history.push(e),n.status="pending",Ys(n,"提交审核",`v${n.current.version} 快照入库`)}function yd(n,t){n.status="approved",n.locked=!0,Ys(n,"审核通过",`审核人 ${t??Kt.session.operator}, 方案锁定`)}function tg(n,t,e){n.status="returned",n.returns.push({reason:t,paramsToFix:e,reviewer:Kt.session.operator,time:zs()}),Ys(n,"退回方案",`原因: ${t}; 需改参数: ${e}`)}function eg(n){n.current.version+=1,n.current.result=Pr(n.current.params),Gc(n)}function ng(n,t){n.annotations.push({id:Md(),text:t,author:Kt.session.operator,time:zs()}),Ys(n,"添加批注",t.slice(0,40))}function ig(n,t){for(const e of t){const i=Kt.schemes.find(s=>s.id===e);i&&i.status==="approved"&&(i.status="delivered",Ys(i,"方案交付",`随「${n}」交付包导出`))}}function sg(){const n=new Map;for(const t of Kt.schemes){const e=t.current.params.tunnelName||"(未命名隧道)";n.has(e)||n.set(e,[]),n.get(e).push(t)}return n}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wc="169",Us={ROTATE:0,DOLLY:1,PAN:2},Ps={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rg=0,Zu=1,og=2,Sd=1,ag=2,Jn=3,wi=0,Qe=1,Nn=2,Ei=0,Ns=1,Ju=2,Qu=3,th=4,lg=5,Xi=100,cg=101,ug=102,hg=103,fg=104,dg=200,pg=201,mg=202,_g=203,Bl=204,zl=205,gg=206,vg=207,xg=208,Mg=209,yg=210,Sg=211,Eg=212,bg=213,Tg=214,kl=0,Hl=1,Vl=2,ks=3,Gl=4,Wl=5,Xl=6,$l=7,Xc=0,Ag=1,wg=2,bi=0,Cg=1,Rg=2,Pg=3,Lg=4,Dg=5,Ig=6,Ug=7,Ed=300,Hs=301,Vs=302,Yl=303,ql=304,ma=306,Kl=1e3,ji=1001,jl=1002,dn=1003,Ng=1004,jr=1005,yn=1006,za=1007,Zi=1008,ai=1009,bd=1010,Td=1011,Lr=1012,$c=1013,is=1014,si=1015,kr=1016,Yc=1017,qc=1018,Gs=1020,Ad=35902,wd=1021,Cd=1022,En=1023,Rd=1024,Pd=1025,Os=1026,Ws=1027,Ld=1028,Kc=1029,Dd=1030,jc=1031,Zc=1033,Po=33776,Lo=33777,Do=33778,Io=33779,Zl=35840,Jl=35841,Ql=35842,tc=35843,ec=36196,nc=37492,ic=37496,sc=37808,rc=37809,oc=37810,ac=37811,lc=37812,cc=37813,uc=37814,hc=37815,fc=37816,dc=37817,pc=37818,mc=37819,_c=37820,gc=37821,Uo=36492,vc=36494,xc=36495,Id=36283,Mc=36284,yc=36285,Sc=36286,Og=3200,Fg=3201,Ud=0,Bg=1,Mi="",Rn="srgb",Pi="srgb-linear",Jc="display-p3",_a="display-p3-linear",qo="linear",pe="srgb",Ko="rec709",jo="p3",fs=7680,eh=519,zg=512,kg=513,Hg=514,Nd=515,Vg=516,Gg=517,Wg=518,Xg=519,nh=35044,ih="300 es",ri=2e3,Zo=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let sh=1234567;const vr=Math.PI/180,Dr=180/Math.PI;function cs(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]).toLowerCase()}function Ie(n,t,e){return Math.max(t,Math.min(e,n))}function Qc(n,t){return(n%t+t)%t}function $g(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Yg(n,t,e){return n!==t?(e-n)/(t-n):0}function xr(n,t,e){return(1-e)*n+e*t}function qg(n,t,e,i){return xr(n,t,1-Math.exp(-e*i))}function Kg(n,t=1){return t-Math.abs(Qc(n,t*2)-t)}function jg(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Zg(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Jg(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Qg(n,t){return n+Math.random()*(t-n)}function tv(n){return n*(.5-Math.random())}function ev(n){n!==void 0&&(sh=n);let t=sh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nv(n){return n*vr}function iv(n){return n*Dr}function sv(n){return(n&n-1)===0&&n!==0}function rv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ov(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function av(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),h=r((t-i)/2),f=o((t-i)/2),d=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Cs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function We(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Rs={DEG2RAD:vr,RAD2DEG:Dr,generateUUID:cs,clamp:Ie,euclideanModulo:Qc,mapLinear:$g,inverseLerp:Yg,lerp:xr,damp:qg,pingpong:Kg,smoothstep:jg,smootherstep:Zg,randInt:Jg,randFloat:Qg,randFloatSpread:tv,seededRandom:ev,degToRad:nv,radToDeg:iv,isPowerOfTwo:sv,ceilPowerOfTwo:rv,floorPowerOfTwo:ov,setQuaternionFromProperEuler:av,normalize:We,denormalize:Cs};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,i,s,r,o,a,l,c){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],g=i[8],M=s[0],p=s[3],m=s[6],b=s[1],_=s[4],v=s[7],I=s[2],P=s[5],R=s[8];return r[0]=o*M+a*b+l*I,r[3]=o*p+a*_+l*P,r[6]=o*m+a*v+l*R,r[1]=c*M+u*b+h*I,r[4]=c*p+u*_+h*P,r[7]=c*m+u*v+h*R,r[2]=f*M+d*b+g*I,r[5]=f*p+d*_+g*P,r[8]=f*m+d*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,d=c*r-o*l,g=e*h+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=h*M,t[1]=(s*c-u*i)*M,t[2]=(a*i-s*o)*M,t[3]=f*M,t[4]=(u*e-s*l)*M,t[5]=(s*r-a*e)*M,t[6]=d*M,t[7]=(i*l-c*e)*M,t[8]=(o*e-i*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ka.makeScale(t,e)),this}rotate(t){return this.premultiply(ka.makeRotation(-t)),this}translate(t,e){return this.premultiply(ka.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ka=new Yt;function Od(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Jo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function lv(){const n=Jo("canvas");return n.style.display="block",n}const rh={};function No(n){n in rh||(rh[n]=!0,console.warn(n))}function cv(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function uv(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function hv(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const oh=new Yt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ah=new Yt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Js={[Pi]:{transfer:qo,primaries:Ko,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Rn]:{transfer:pe,primaries:Ko,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[_a]:{transfer:qo,primaries:jo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(ah),fromReference:n=>n.applyMatrix3(oh)},[Jc]:{transfer:pe,primaries:jo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(ah),fromReference:n=>n.applyMatrix3(oh).convertLinearToSRGB()}},fv=new Set([Pi,_a]),re={enabled:!0,_workingColorSpace:Pi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!fv.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Js[t].toReference,s=Js[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Js[n].primaries},getTransfer:function(n){return n===Mi?qo:Js[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(Js[t].luminanceCoefficients)}};function Fs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ha(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ds;class dv{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ds===void 0&&(ds=Jo("canvas")),ds.width=t.width,ds.height=t.height;const i=ds.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ds}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Jo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fs(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Fs(e[i]/255)*255):e[i]=Fs(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let pv=0;class Fd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pv++}),this.uuid=cs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Va(s[o].image)):r.push(Va(s[o]))}else r=Va(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Va(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?dv.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mv=0;class tn extends ls{constructor(t=tn.DEFAULT_IMAGE,e=tn.DEFAULT_MAPPING,i=ji,s=ji,r=yn,o=Zi,a=En,l=ai,c=tn.DEFAULT_ANISOTROPY,u=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mv++}),this.uuid=cs(),this.name="",this.source=new Fd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ed)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Kl:t.x=t.x-Math.floor(t.x);break;case ji:t.x=t.x<0?0:1;break;case jl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Kl:t.y=t.y-Math.floor(t.y);break;case ji:t.y=t.y<0?0:1;break;case jl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=Ed;tn.DEFAULT_ANISOTROPY=1;class ye{constructor(t=0,e=0,i=0,s=1){ye.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],M=l[2],p=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-M)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+M)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,v=(d+1)/2,I=(m+1)/2,P=(u+f)/4,R=(h+M)/4,B=(g+p)/4;return _>v&&_>I?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=P/i,r=R/i):v>I?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=P/s,r=B/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=R/r,s=B/r),this.set(i,s,r,e),this}let b=Math.sqrt((p-g)*(p-g)+(h-M)*(h-M)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(h-M)/b,this.z=(f-u)/b,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _v extends ls{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new tn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Fd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends _v{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Bd extends tn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class gv extends tn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],M=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=M;return}if(h!==M||l!==f||c!==d||u!==g){let p=1-a;const m=l*f+c*d+u*g+h*M,b=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){const I=Math.sqrt(_),P=Math.atan2(I,m*b);p=Math.sin(p*P)/I,a=Math.sin(a*P)/I}const v=a*b;if(l=l*p+f*v,c=c*p+d*v,u=u*p+g*v,h=h*p+M*v,p===1-a){const I=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=I,c*=I,u*=I,h*=I}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*d-c*f,t[e+1]=l*g+u*f+c*h-a*d,t[e+2]=c*g+u*d+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ie(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,i=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(lh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(lh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ga.copy(this).projectOnVector(t),this.sub(Ga)}reflect(t){return this.sub(Ga.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ie(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ga=new N,lh=new rs;class Hr{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zr.copy(i.boundingBox)),Zr.applyMatrix4(t.matrixWorld),this.union(Zr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qs),Jr.subVectors(this.max,Qs),ps.subVectors(t.a,Qs),ms.subVectors(t.b,Qs),_s.subVectors(t.c,Qs),ui.subVectors(ms,ps),hi.subVectors(_s,ms),Ni.subVectors(ps,_s);let e=[0,-ui.z,ui.y,0,-hi.z,hi.y,0,-Ni.z,Ni.y,ui.z,0,-ui.x,hi.z,0,-hi.x,Ni.z,0,-Ni.x,-ui.y,ui.x,0,-hi.y,hi.x,0,-Ni.y,Ni.x,0];return!Wa(e,ps,ms,_s,Jr)||(e=[1,0,0,0,1,0,0,0,1],!Wa(e,ps,ms,_s,Jr))?!1:(Qr.crossVectors(ui,hi),e=[Qr.x,Qr.y,Qr.z],Wa(e,ps,ms,_s,Jr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints($n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const $n=[new N,new N,new N,new N,new N,new N,new N,new N],gn=new N,Zr=new Hr,ps=new N,ms=new N,_s=new N,ui=new N,hi=new N,Ni=new N,Qs=new N,Jr=new N,Qr=new N,Oi=new N;function Wa(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Oi.fromArray(n,r);const a=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=t.dot(Oi),c=e.dot(Oi),u=i.dot(Oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const vv=new Hr,tr=new N,Xa=new N;class ga{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):vv.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;tr.subVectors(t,this.center);const e=tr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(tr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(tr.copy(t.center).add(Xa)),this.expandByPoint(tr.copy(t.center).sub(Xa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Yn=new N,$a=new N,to=new N,fi=new N,Ya=new N,eo=new N,qa=new N;class tu{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Yn.copy(this.origin).addScaledVector(this.direction,e),Yn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){$a.copy(t).add(e).multiplyScalar(.5),to.copy(e).sub(t).normalize(),fi.copy(this.origin).sub($a);const r=t.distanceTo(e)*.5,o=-this.direction.dot(to),a=fi.dot(this.direction),l=-fi.dot(to),c=fi.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const M=1/u;h*=M,f*=M,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy($a).addScaledVector(to,f),d}intersectSphere(t,e){Yn.subVectors(t.center,this.origin);const i=Yn.dot(this.direction),s=Yn.dot(Yn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Yn)!==null}intersectTriangle(t,e,i,s,r){Ya.subVectors(e,t),eo.subVectors(i,t),qa.crossVectors(Ya,eo);let o=this.direction.dot(qa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;fi.subVectors(this.origin,t);const l=a*this.direction.dot(eo.crossVectors(fi,eo));if(l<0)return null;const c=a*this.direction.dot(Ya.cross(fi));if(c<0||l+c>o)return null;const u=-a*fi.dot(qa);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ge{constructor(t,e,i,s,r,o,a,l,c,u,h,f,d,g,M,p){ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,d,g,M,p)}set(t,e,i,s,r,o,a,l,c,u,h,f,d,g,M,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=M,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ge().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/gs.setFromMatrixColumn(t,0).length(),r=1/gs.setFromMatrixColumn(t,1).length(),o=1/gs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,M=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=f-M*c,e[9]=-a*l,e[2]=M-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,g=c*u,M=c*h;e[0]=f+M*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=M+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,g=c*u,M=c*h;e[0]=f-M*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=M-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,M=a*h;e[0]=l*u,e[4]=g*c-d,e[8]=f*c+M,e[1]=l*h,e[5]=M*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,M=a*c;e[0]=l*u,e[4]=M-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+g,e[10]=f-M*h}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,M=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+M,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=M*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xv,t,Mv)}lookAt(t,e,i){const s=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),di.crossVectors(i,sn),di.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),di.crossVectors(i,sn)),di.normalize(),no.crossVectors(sn,di),s[0]=di.x,s[4]=no.x,s[8]=sn.x,s[1]=di.y,s[5]=no.y,s[9]=sn.y,s[2]=di.z,s[6]=no.z,s[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],g=i[2],M=i[6],p=i[10],m=i[14],b=i[3],_=i[7],v=i[11],I=i[15],P=s[0],R=s[4],B=s[8],it=s[12],y=s[1],T=s[5],K=s[9],$=s[13],Q=s[2],rt=s[6],W=s[10],et=s[14],k=s[3],ft=s[7],_t=s[11],xt=s[15];return r[0]=o*P+a*y+l*Q+c*k,r[4]=o*R+a*T+l*rt+c*ft,r[8]=o*B+a*K+l*W+c*_t,r[12]=o*it+a*$+l*et+c*xt,r[1]=u*P+h*y+f*Q+d*k,r[5]=u*R+h*T+f*rt+d*ft,r[9]=u*B+h*K+f*W+d*_t,r[13]=u*it+h*$+f*et+d*xt,r[2]=g*P+M*y+p*Q+m*k,r[6]=g*R+M*T+p*rt+m*ft,r[10]=g*B+M*K+p*W+m*_t,r[14]=g*it+M*$+p*et+m*xt,r[3]=b*P+_*y+v*Q+I*k,r[7]=b*R+_*T+v*rt+I*ft,r[11]=b*B+_*K+v*W+I*_t,r[15]=b*it+_*$+v*et+I*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],M=t[7],p=t[11],m=t[15];return g*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*d-i*l*d)+M*(+e*l*d-e*c*f+r*o*f-s*o*d+s*c*u-r*l*u)+p*(+e*c*h-e*a*d-r*o*h+i*o*d+r*a*u-i*c*u)+m*(-s*a*u-e*l*h+e*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],M=t[13],p=t[14],m=t[15],b=h*p*c-M*f*c+M*l*d-a*p*d-h*l*m+a*f*m,_=g*f*c-u*p*c-g*l*d+o*p*d+u*l*m-o*f*m,v=u*M*c-g*h*c+g*a*d-o*M*d-u*a*m+o*h*m,I=g*h*l-u*M*l-g*a*f+o*M*f+u*a*p-o*h*p,P=e*b+i*_+s*v+r*I;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/P;return t[0]=b*R,t[1]=(M*f*r-h*p*r-M*s*d+i*p*d+h*s*m-i*f*m)*R,t[2]=(a*p*r-M*l*r+M*s*c-i*p*c-a*s*m+i*l*m)*R,t[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*d-i*l*d)*R,t[4]=_*R,t[5]=(u*p*r-g*f*r+g*s*d-e*p*d-u*s*m+e*f*m)*R,t[6]=(g*l*r-o*p*r-g*s*c+e*p*c+o*s*m-e*l*m)*R,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*d+e*l*d)*R,t[8]=v*R,t[9]=(g*h*r-u*M*r-g*i*d+e*M*d+u*i*m-e*h*m)*R,t[10]=(o*M*r-g*a*r+g*i*c-e*M*c-o*i*m+e*a*m)*R,t[11]=(u*a*r-o*h*r-u*i*c+e*h*c+o*i*d-e*a*d)*R,t[12]=I*R,t[13]=(u*M*s-g*h*s+g*i*f-e*M*f-u*i*p+e*h*p)*R,t[14]=(g*a*s-o*M*s-g*i*l+e*M*l+o*i*p-e*a*p)*R,t[15]=(o*h*s-u*a*s+u*i*l-e*h*l-o*i*f+e*a*f)*R,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,d=r*u,g=r*h,M=o*u,p=o*h,m=a*h,b=l*c,_=l*u,v=l*h,I=i.x,P=i.y,R=i.z;return s[0]=(1-(M+m))*I,s[1]=(d+v)*I,s[2]=(g-_)*I,s[3]=0,s[4]=(d-v)*P,s[5]=(1-(f+m))*P,s[6]=(p+b)*P,s[7]=0,s[8]=(g+_)*R,s[9]=(p-b)*R,s[10]=(1-(f+M))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=gs.set(s[0],s[1],s[2]).length();const o=gs.set(s[4],s[5],s[6]).length(),a=gs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],vn.copy(this);const c=1/r,u=1/o,h=1/a;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=h,vn.elements[9]*=h,vn.elements[10]*=h,e.setFromRotationMatrix(vn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ri){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s);let d,g;if(a===ri)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Zo)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ri){const l=this.elements,c=1/(e-t),u=1/(i-s),h=1/(o-r),f=(e+t)*c,d=(i+s)*u;let g,M;if(a===ri)g=(o+r)*h,M=-2*h;else if(a===Zo)g=r*h,M=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=M,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const gs=new N,vn=new ge,xv=new N(0,0,0),Mv=new N(1,1,1),di=new N,no=new N,sn=new N,ch=new ge,uh=new rs;class Vn{constructor(t=0,e=0,i=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ch.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ch,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return uh.setFromEuler(this),this.setFromQuaternion(uh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class zd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let yv=0;const hh=new N,vs=new rs,qn=new ge,io=new N,er=new N,Sv=new N,Ev=new rs,fh=new N(1,0,0),dh=new N(0,1,0),ph=new N(0,0,1),mh={type:"added"},bv={type:"removed"},xs={type:"childadded",child:null},Ka={type:"childremoved",child:null};class Ce extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yv++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new N,e=new Vn,i=new rs,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new Yt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vs.setFromAxisAngle(t,e),this.quaternion.multiply(vs),this}rotateOnWorldAxis(t,e){return vs.setFromAxisAngle(t,e),this.quaternion.premultiply(vs),this}rotateX(t){return this.rotateOnAxis(fh,t)}rotateY(t){return this.rotateOnAxis(dh,t)}rotateZ(t){return this.rotateOnAxis(ph,t)}translateOnAxis(t,e){return hh.copy(t).applyQuaternion(this.quaternion),this.position.add(hh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fh,t)}translateY(t){return this.translateOnAxis(dh,t)}translateZ(t){return this.translateOnAxis(ph,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?io.copy(t):io.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(er,io,this.up):qn.lookAt(io,er,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),vs.setFromRotationMatrix(qn),this.quaternion.premultiply(vs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mh),xs.child=t,this.dispatchEvent(xs),xs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(bv),Ka.child=t,this.dispatchEvent(Ka),Ka.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mh),xs.child=t,this.dispatchEvent(xs),xs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,t,Sv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,Ev,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ce.DEFAULT_UP=new N(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new N,Kn=new N,ja=new N,jn=new N,Ms=new N,ys=new N,_h=new N,Za=new N,Ja=new N,Qa=new N,tl=new ye,el=new ye,nl=new ye;class Sn{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),xn.subVectors(t,e),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){xn.subVectors(s,e),Kn.subVectors(i,e),ja.subVectors(t,e);const o=xn.dot(xn),a=xn.dot(Kn),l=xn.dot(ja),c=Kn.dot(Kn),u=Kn.dot(ja),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,jn.x),l.addScaledVector(o,jn.y),l.addScaledVector(a,jn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return tl.setScalar(0),el.setScalar(0),nl.setScalar(0),tl.fromBufferAttribute(t,e),el.fromBufferAttribute(t,i),nl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(tl,r.x),o.addScaledVector(el,r.y),o.addScaledVector(nl,r.z),o}static isFrontFacing(t,e,i,s){return xn.subVectors(i,e),Kn.subVectors(t,e),xn.cross(Kn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),xn.cross(Kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Sn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ms.subVectors(s,i),ys.subVectors(r,i),Za.subVectors(t,i);const l=Ms.dot(Za),c=ys.dot(Za);if(l<=0&&c<=0)return e.copy(i);Ja.subVectors(t,s);const u=Ms.dot(Ja),h=ys.dot(Ja);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Ms,o);Qa.subVectors(t,r);const d=Ms.dot(Qa),g=ys.dot(Qa);if(g>=0&&d<=g)return e.copy(r);const M=d*c-l*g;if(M<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(ys,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return _h.subVectors(r,s),a=(h-u)/(h-u+(d-g)),e.copy(s).addScaledVector(_h,a);const m=1/(p+M+f);return o=M*m,a=f*m,e.copy(i).addScaledVector(Ms,o).addScaledVector(ys,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},so={h:0,s:0,l:0};function il(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Zt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=i,re.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=re.workingColorSpace){if(t=Qc(t,1),e=Ie(e,0,1),i=Ie(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=il(o,r,t+1/3),this.g=il(o,r,t),this.b=il(o,r,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=Rn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Rn){const i=kd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}copyLinearToSRGB(t){return this.r=Ha(t.r),this.g=Ha(t.g),this.b=Ha(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Rn){return re.fromWorkingColorSpace(ze.copy(this),t),Math.round(Ie(ze.r*255,0,255))*65536+Math.round(Ie(ze.g*255,0,255))*256+Math.round(Ie(ze.b*255,0,255))}getHexString(t=Rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(ze.copy(this),e);const i=ze.r,s=ze.g,r=ze.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Rn){re.fromWorkingColorSpace(ze.copy(this),t);const e=ze.r,i=ze.g,s=ze.b;return t!==Rn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(pi),this.setHSL(pi.h+t,pi.s+e,pi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(pi),t.getHSL(so);const i=xr(pi.h,so.h,e),s=xr(pi.s,so.s,e),r=xr(pi.l,so.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new Zt;Zt.NAMES=kd;let Tv=0;class qs extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=cs(),this.name="",this.type="Material",this.blending=Ns,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bl,this.blendDst=zl,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ns&&(i.blending=this.blending),this.side!==wi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Bl&&(i.blendSrc=this.blendSrc),this.blendDst!==zl&&(i.blendDst=this.blendDst),this.blendEquation!==Xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==eh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ji extends qs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Xc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new N,ro=new vt;class Fn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=nh,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ro.fromBufferAttribute(this,e),ro.applyMatrix3(t),this.setXY(e,ro.x,ro.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Cs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=We(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Cs(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Cs(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Cs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Cs(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),i=We(i,this.array),s=We(s,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nh&&(t.usage=this.usage),t}}class Hd extends Fn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Vd extends Fn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Fe extends Fn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Av=0;const un=new ge,sl=new Ce,Ss=new N,rn=new Hr,nr=new Hr,De=new N;class ln extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Av++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Od(t)?Vd:Hd)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Yt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return un.makeRotationFromQuaternion(t),this.applyMatrix4(un),this}rotateX(t){return un.makeRotationX(t),this.applyMatrix4(un),this}rotateY(t){return un.makeRotationY(t),this.applyMatrix4(un),this}rotateZ(t){return un.makeRotationZ(t),this.applyMatrix4(un),this}translate(t,e,i){return un.makeTranslation(t,e,i),this.applyMatrix4(un),this}scale(t,e,i){return un.makeScale(t,e,i),this.applyMatrix4(un),this}lookAt(t){return sl.lookAt(t),sl.updateMatrix(),this.applyMatrix4(sl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Fe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ga);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];nr.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(rn.min,nr.min),rn.expandByPoint(De),De.addVectors(rn.max,nr.max),rn.expandByPoint(De)):(rn.expandByPoint(nr.min),rn.expandByPoint(nr.max))}rn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)De.fromBufferAttribute(a,c),l&&(Ss.fromBufferAttribute(t,c),De.add(Ss)),s=Math.max(s,i.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let B=0;B<i.count;B++)a[B]=new N,l[B]=new N;const c=new N,u=new N,h=new N,f=new vt,d=new vt,g=new vt,M=new N,p=new N;function m(B,it,y){c.fromBufferAttribute(i,B),u.fromBufferAttribute(i,it),h.fromBufferAttribute(i,y),f.fromBufferAttribute(r,B),d.fromBufferAttribute(r,it),g.fromBufferAttribute(r,y),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const T=1/(d.x*g.y-g.x*d.y);isFinite(T)&&(M.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(T),p.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(T),a[B].add(M),a[it].add(M),a[y].add(M),l[B].add(p),l[it].add(p),l[y].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let B=0,it=b.length;B<it;++B){const y=b[B],T=y.start,K=y.count;for(let $=T,Q=T+K;$<Q;$+=3)m(t.getX($+0),t.getX($+1),t.getX($+2))}const _=new N,v=new N,I=new N,P=new N;function R(B){I.fromBufferAttribute(s,B),P.copy(I);const it=a[B];_.copy(it),_.sub(I.multiplyScalar(I.dot(it))).normalize(),v.crossVectors(P,it);const T=v.dot(l[B])<0?-1:1;o.setXYZW(B,_.x,_.y,_.z,T)}for(let B=0,it=b.length;B<it;++B){const y=b[B],T=y.start,K=y.count;for(let $=T,Q=T+K;$<Q;$+=3)R(t.getX($+0)),R(t.getX($+1)),R(t.getX($+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Fn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,u=new N,h=new N;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),M=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,p),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let M=0,p=l.length;M<p;M++){a.isInterleavedBufferAttribute?d=l[M]*a.data.stride+a.offset:d=l[M]*u;for(let m=0;m<u;m++)f[g++]=c[d++]}return new Fn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ln,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gh=new ge,Fi=new tu,oo=new ga,vh=new N,ao=new N,lo=new N,co=new N,rl=new N,uo=new N,xh=new N,ho=new N;class Ae extends Ce{constructor(t=new ln,e=new Ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){uo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(rl.fromBufferAttribute(h,t),o?uo.addScaledVector(rl,u):uo.addScaledVector(rl.sub(e),u))}e.add(uo)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),oo.copy(i.boundingSphere),oo.applyMatrix4(r),Fi.copy(t.ray).recast(t.near),!(oo.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(oo,vh)===null||Fi.origin.distanceToSquared(vh)>(t.far-t.near)**2))&&(gh.copy(r).invert(),Fi.copy(t.ray).applyMatrix4(gh),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Fi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const p=f[g],m=o[p.materialIndex],b=Math.max(p.start,d.start),_=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let v=b,I=_;v<I;v+=3){const P=a.getX(v),R=a.getX(v+1),B=a.getX(v+2);s=fo(this,m,t,i,c,u,h,P,R,B),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(a.count,d.start+d.count);for(let p=g,m=M;p<m;p+=3){const b=a.getX(p),_=a.getX(p+1),v=a.getX(p+2);s=fo(this,o,t,i,c,u,h,b,_,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const p=f[g],m=o[p.materialIndex],b=Math.max(p.start,d.start),_=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let v=b,I=_;v<I;v+=3){const P=v,R=v+1,B=v+2;s=fo(this,m,t,i,c,u,h,P,R,B),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(l.count,d.start+d.count);for(let p=g,m=M;p<m;p+=3){const b=p,_=p+1,v=p+2;s=fo(this,o,t,i,c,u,h,b,_,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function wv(n,t,e,i,s,r,o,a){let l;if(t.side===Qe?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===wi,a),l===null)return null;ho.copy(a),ho.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ho);return c<e.near||c>e.far?null:{distance:c,point:ho.clone(),object:n}}function fo(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,ao),n.getVertexPosition(l,lo),n.getVertexPosition(c,co);const u=wv(n,t,e,i,ao,lo,co,xh);if(u){const h=new N;Sn.getBarycoord(xh,ao,lo,co,h),s&&(u.uv=Sn.getInterpolatedAttribute(s,a,l,c,h,new vt)),r&&(u.uv1=Sn.getInterpolatedAttribute(r,a,l,c,h,new vt)),o&&(u.normal=Sn.getInterpolatedAttribute(o,a,l,c,h,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};Sn.getNormal(ao,lo,co,f.normal),u.face=f,u.barycoord=h}return u}class oi extends ln{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Fe(c,3)),this.setAttribute("normal",new Fe(u,3)),this.setAttribute("uv",new Fe(h,2));function g(M,p,m,b,_,v,I,P,R,B,it){const y=v/R,T=I/B,K=v/2,$=I/2,Q=P/2,rt=R+1,W=B+1;let et=0,k=0;const ft=new N;for(let _t=0;_t<W;_t++){const xt=_t*T-$;for(let Bt=0;Bt<rt;Bt++){const jt=Bt*y-K;ft[M]=jt*b,ft[p]=xt*_,ft[m]=Q,c.push(ft.x,ft.y,ft.z),ft[M]=0,ft[p]=0,ft[m]=P>0?1:-1,u.push(ft.x,ft.y,ft.z),h.push(Bt/R),h.push(1-_t/B),et+=1}}for(let _t=0;_t<B;_t++)for(let xt=0;xt<R;xt++){const Bt=f+xt+rt*_t,jt=f+xt+rt*(_t+1),st=f+(xt+1)+rt*(_t+1),dt=f+(xt+1)+rt*_t;l.push(Bt,jt,dt),l.push(jt,st,dt),k+=6}a.addGroup(d,k,it),d+=k,f+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function $e(n){const t={};for(let e=0;e<n.length;e++){const i=Xs(n[e]);for(const s in i)t[s]=i[s]}return t}function Cv(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Gd(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const Rv={clone:Xs,merge:$e};var Pv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends qs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pv,this.fragmentShader=Lv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xs(t.uniforms),this.uniformsGroups=Cv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Wd extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=ri}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const mi=new N,Mh=new vt,yh=new vt;class hn extends Wd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Dr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Dr*2*Math.atan(Math.tan(vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,Mh,yh),e.subVectors(yh,Mh)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Es=-90,bs=1;class Dv extends Ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(Es,bs,t,e);s.layers=this.layers,this.add(s);const r=new hn(Es,bs,t,e);r.layers=this.layers,this.add(r);const o=new hn(Es,bs,t,e);o.layers=this.layers,this.add(o);const a=new hn(Es,bs,t,e);a.layers=this.layers,this.add(a);const l=new hn(Es,bs,t,e);l.layers=this.layers,this.add(l);const c=new hn(Es,bs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ri)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Xd extends tn{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Hs,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Iv extends ss{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Xd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:yn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new oi(5,5,5),r=new Ci({name:"CubemapFromEquirect",uniforms:Xs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qe,blending:Ei});r.uniforms.tEquirect.value=e;const o=new Ae(s,r),a=e.minFilter;return e.minFilter===Zi&&(e.minFilter=yn),new Dv(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const ol=new N,Uv=new N,Nv=new Yt;class xi{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ol.subVectors(i,e).cross(Uv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ol),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Nv.getNormalMatrix(t),s=this.coplanarPoint(ol).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new ga,po=new N;class eu{constructor(t=new xi,e=new xi,i=new xi,s=new xi,r=new xi,o=new xi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ri){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],d=s[8],g=s[9],M=s[10],p=s[11],m=s[12],b=s[13],_=s[14],v=s[15];if(i[0].setComponents(l-r,f-c,p-d,v-m).normalize(),i[1].setComponents(l+r,f+c,p+d,v+m).normalize(),i[2].setComponents(l+o,f+u,p+g,v+b).normalize(),i[3].setComponents(l-o,f-u,p-g,v-b).normalize(),i[4].setComponents(l-a,f-h,p-M,v-_).normalize(),e===ri)i[5].setComponents(l+a,f+h,p+M,v+_).normalize();else if(e===Zo)i[5].setComponents(a,h,M,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(t){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476,Bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(po.x=s.normal.x>0?t.max.x:t.min.x,po.y=s.normal.y>0?t.max.y:t.min.y,po.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(po)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $d(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Ov(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],M=h[d];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++f,h[f]=M)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const M=h[d];n.bufferSubData(c,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Vr extends ln{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,d=[],g=[],M=[],p=[];for(let m=0;m<u;m++){const b=m*f-o;for(let _=0;_<c;_++){const v=_*h-r;g.push(v,-b,0),M.push(0,0,1),p.push(_/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let b=0;b<a;b++){const _=b+c*m,v=b+c*(m+1),I=b+1+c*(m+1),P=b+1+c*m;d.push(_,v,P),d.push(v,I,P)}this.setIndex(d),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(M,3)),this.setAttribute("uv",new Fe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vr(t.width,t.height,t.widthSegments,t.heightSegments)}}var Fv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bv=`#ifdef USE_ALPHAHASH
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
#endif`,zv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gv=`#ifdef USE_AOMAP
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
#endif`,Wv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xv=`#ifdef USE_BATCHING
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
#endif`,$v=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jv=`#ifdef USE_IRIDESCENCE
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
#endif`,Zv=`#ifdef USE_BUMPMAP
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
#endif`,Jv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,o0=`#define PI 3.141592653589793
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
} // validated`,a0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,l0=`vec3 transformedNormal = objectNormal;
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
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,u0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`
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
}`,m0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,g0=`#ifdef USE_ENVMAP
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
#endif`,v0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,x0=`#ifdef USE_ENVMAP
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
#endif`,M0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,y0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,E0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,b0=`#ifdef USE_GRADIENTMAP
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
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,w0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,C0=`uniform bool receiveShadow;
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
#endif`,R0=`#ifdef USE_ENVMAP
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
#endif`,P0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,D0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,U0=`PhysicalMaterial material;
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
#endif`,N0=`struct PhysicalMaterial {
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
}`,O0=`
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
#endif`,F0=`#if defined( RE_IndirectDiffuse )
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
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,k0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,W0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,X0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$0=`#if defined( USE_POINTS_UV )
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
#endif`,Y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,j0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Z0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`#ifdef USE_MORPHTARGETS
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
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ex=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rx=`#ifdef USE_NORMALMAP
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
#endif`,ox=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ax=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ux=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,px=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_x=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yx=`float getShadowMask() {
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
}`,Sx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ex=`#ifdef USE_SKINNING
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
#endif`,bx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tx=`#ifdef USE_SKINNING
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
#endif`,Ax=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Px=`#ifdef USE_TRANSMISSION
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
#endif`,Lx=`#ifdef USE_TRANSMISSION
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
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ox=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fx=`uniform sampler2D t2D;
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
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`#include <common>
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
}`,Gx=`#if DEPTH_PACKING == 3200
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
}`,Wx=`#define DISTANCE
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
}`,Xx=`#define DISTANCE
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
}`,$x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`uniform float scale;
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
}`,Kx=`uniform vec3 diffuse;
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
}`,jx=`#include <common>
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
}`,Zx=`uniform vec3 diffuse;
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
}`,Jx=`#define LAMBERT
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
}`,Qx=`#define LAMBERT
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
}`,tM=`#define MATCAP
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
}`,eM=`#define MATCAP
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
}`,nM=`#define NORMAL
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
}`,iM=`#define NORMAL
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
}`,sM=`#define PHONG
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
}`,rM=`#define PHONG
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
}`,oM=`#define STANDARD
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
}`,aM=`#define STANDARD
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
}`,lM=`#define TOON
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
}`,cM=`#define TOON
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
}`,uM=`uniform float size;
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
}`,hM=`uniform vec3 diffuse;
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
}`,fM=`#include <common>
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
}`,dM=`uniform vec3 color;
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
}`,pM=`uniform float rotation;
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
}`,mM=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:Fv,alphahash_pars_fragment:Bv,alphamap_fragment:zv,alphamap_pars_fragment:kv,alphatest_fragment:Hv,alphatest_pars_fragment:Vv,aomap_fragment:Gv,aomap_pars_fragment:Wv,batching_pars_vertex:Xv,batching_vertex:$v,begin_vertex:Yv,beginnormal_vertex:qv,bsdfs:Kv,iridescence_fragment:jv,bumpmap_pars_fragment:Zv,clipping_planes_fragment:Jv,clipping_planes_pars_fragment:Qv,clipping_planes_pars_vertex:t0,clipping_planes_vertex:e0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:s0,color_vertex:r0,common:o0,cube_uv_reflection_fragment:a0,defaultnormal_vertex:l0,displacementmap_pars_vertex:c0,displacementmap_vertex:u0,emissivemap_fragment:h0,emissivemap_pars_fragment:f0,colorspace_fragment:d0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:_0,envmap_pars_fragment:g0,envmap_pars_vertex:v0,envmap_physical_pars_fragment:R0,envmap_vertex:x0,fog_vertex:M0,fog_pars_vertex:y0,fog_fragment:S0,fog_pars_fragment:E0,gradientmap_pars_fragment:b0,lightmap_pars_fragment:T0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:w0,lights_pars_begin:C0,lights_toon_fragment:P0,lights_toon_pars_fragment:L0,lights_phong_fragment:D0,lights_phong_pars_fragment:I0,lights_physical_fragment:U0,lights_physical_pars_fragment:N0,lights_fragment_begin:O0,lights_fragment_maps:F0,lights_fragment_end:B0,logdepthbuf_fragment:z0,logdepthbuf_pars_fragment:k0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:V0,map_fragment:G0,map_pars_fragment:W0,map_particle_fragment:X0,map_particle_pars_fragment:$0,metalnessmap_fragment:Y0,metalnessmap_pars_fragment:q0,morphinstance_vertex:K0,morphcolor_vertex:j0,morphnormal_vertex:Z0,morphtarget_pars_vertex:J0,morphtarget_vertex:Q0,normal_fragment_begin:tx,normal_fragment_maps:ex,normal_pars_fragment:nx,normal_pars_vertex:ix,normal_vertex:sx,normalmap_pars_fragment:rx,clearcoat_normal_fragment_begin:ox,clearcoat_normal_fragment_maps:ax,clearcoat_pars_fragment:lx,iridescence_pars_fragment:cx,opaque_fragment:ux,packing:hx,premultiplied_alpha_fragment:fx,project_vertex:dx,dithering_fragment:px,dithering_pars_fragment:mx,roughnessmap_fragment:_x,roughnessmap_pars_fragment:gx,shadowmap_pars_fragment:vx,shadowmap_pars_vertex:xx,shadowmap_vertex:Mx,shadowmask_pars_fragment:yx,skinbase_vertex:Sx,skinning_pars_vertex:Ex,skinning_vertex:bx,skinnormal_vertex:Tx,specularmap_fragment:Ax,specularmap_pars_fragment:wx,tonemapping_fragment:Cx,tonemapping_pars_fragment:Rx,transmission_fragment:Px,transmission_pars_fragment:Lx,uv_pars_fragment:Dx,uv_pars_vertex:Ix,uv_vertex:Ux,worldpos_vertex:Nx,background_vert:Ox,background_frag:Fx,backgroundCube_vert:Bx,backgroundCube_frag:zx,cube_vert:kx,cube_frag:Hx,depth_vert:Vx,depth_frag:Gx,distanceRGBA_vert:Wx,distanceRGBA_frag:Xx,equirect_vert:$x,equirect_frag:Yx,linedashed_vert:qx,linedashed_frag:Kx,meshbasic_vert:jx,meshbasic_frag:Zx,meshlambert_vert:Jx,meshlambert_frag:Qx,meshmatcap_vert:tM,meshmatcap_frag:eM,meshnormal_vert:nM,meshnormal_frag:iM,meshphong_vert:sM,meshphong_frag:rM,meshphysical_vert:oM,meshphysical_frag:aM,meshtoon_vert:lM,meshtoon_frag:cM,points_vert:uM,points_frag:hM,shadow_vert:fM,shadow_frag:dM,sprite_vert:pM,sprite_frag:mM},Et={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},In={basic:{uniforms:$e([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:$e([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Zt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:$e([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:$e([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:$e([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Zt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:$e([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:$e([Et.points,Et.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:$e([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:$e([Et.common,Et.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:$e([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:$e([Et.sprite,Et.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:$e([Et.common,Et.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:$e([Et.lights,Et.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};In.physical={uniforms:$e([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const mo={r:0,b:0,g:0},zi=new Vn,_M=new ge;function gM(n,t,e,i,s,r,o){const a=new Zt(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function g(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?e:t).get(_)),_}function M(b){let _=!1;const v=g(b);v===null?m(a,l):v&&v.isColor&&(m(v,1),_=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(b,_){const v=g(_);v&&(v.isCubeTexture||v.mapping===ma)?(u===void 0&&(u=new Ae(new oi(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:Xs(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,P,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),zi.copy(_.backgroundRotation),zi.x*=-1,zi.y*=-1,zi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(_M.makeRotationFromEuler(zi)),u.material.toneMapped=re.getTransfer(v.colorSpace)!==pe,(h!==v||f!==v.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ae(new Vr(2,2),new Ci({name:"BackgroundMaterial",uniforms:Xs(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=re.getTransfer(v.colorSpace)!==pe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,_){b.getRGB(mo,Gd(n)),i.buffers.color.setClear(mo.r,mo.g,mo.b,_,o)}return{getClearColor:function(){return a},setClearColor:function(b,_=1){a.set(b),l=_,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,m(a,l)},render:M,addToRenderList:p}}function vM(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(y,T,K,$,Q){let rt=!1;const W=h($,K,T);r!==W&&(r=W,c(r.object)),rt=d(y,$,K,Q),rt&&g(y,$,K,Q),Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(rt||o)&&(o=!1,v(y,T,K,$),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function h(y,T,K){const $=K.wireframe===!0;let Q=i[y.id];Q===void 0&&(Q={},i[y.id]=Q);let rt=Q[T.id];rt===void 0&&(rt={},Q[T.id]=rt);let W=rt[$];return W===void 0&&(W=f(l()),rt[$]=W),W}function f(y){const T=[],K=[],$=[];for(let Q=0;Q<e;Q++)T[Q]=0,K[Q]=0,$[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:K,attributeDivisors:$,object:y,attributes:{},index:null}}function d(y,T,K,$){const Q=r.attributes,rt=T.attributes;let W=0;const et=K.getAttributes();for(const k in et)if(et[k].location>=0){const _t=Q[k];let xt=rt[k];if(xt===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(xt=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(xt=y.instanceColor)),_t===void 0||_t.attribute!==xt||xt&&_t.data!==xt.data)return!0;W++}return r.attributesNum!==W||r.index!==$}function g(y,T,K,$){const Q={},rt=T.attributes;let W=0;const et=K.getAttributes();for(const k in et)if(et[k].location>=0){let _t=rt[k];_t===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(_t=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(_t=y.instanceColor));const xt={};xt.attribute=_t,_t&&_t.data&&(xt.data=_t.data),Q[k]=xt,W++}r.attributes=Q,r.attributesNum=W,r.index=$}function M(){const y=r.newAttributes;for(let T=0,K=y.length;T<K;T++)y[T]=0}function p(y){m(y,0)}function m(y,T){const K=r.newAttributes,$=r.enabledAttributes,Q=r.attributeDivisors;K[y]=1,$[y]===0&&(n.enableVertexAttribArray(y),$[y]=1),Q[y]!==T&&(n.vertexAttribDivisor(y,T),Q[y]=T)}function b(){const y=r.newAttributes,T=r.enabledAttributes;for(let K=0,$=T.length;K<$;K++)T[K]!==y[K]&&(n.disableVertexAttribArray(K),T[K]=0)}function _(y,T,K,$,Q,rt,W){W===!0?n.vertexAttribIPointer(y,T,K,Q,rt):n.vertexAttribPointer(y,T,K,$,Q,rt)}function v(y,T,K,$){M();const Q=$.attributes,rt=K.getAttributes(),W=T.defaultAttributeValues;for(const et in rt){const k=rt[et];if(k.location>=0){let ft=Q[et];if(ft===void 0&&(et==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),et==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),ft!==void 0){const _t=ft.normalized,xt=ft.itemSize,Bt=t.get(ft);if(Bt===void 0)continue;const jt=Bt.buffer,st=Bt.type,dt=Bt.bytesPerElement,bt=st===n.INT||st===n.UNSIGNED_INT||ft.gpuType===$c;if(ft.isInterleavedBufferAttribute){const Mt=ft.data,Ot=Mt.stride,Ut=ft.offset;if(Mt.isInstancedInterleavedBuffer){for(let Wt=0;Wt<k.locationSize;Wt++)m(k.location+Wt,Mt.meshPerAttribute);y.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Wt=0;Wt<k.locationSize;Wt++)p(k.location+Wt);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let Wt=0;Wt<k.locationSize;Wt++)_(k.location+Wt,xt/k.locationSize,st,_t,Ot*dt,(Ut+xt/k.locationSize*Wt)*dt,bt)}else{if(ft.isInstancedBufferAttribute){for(let Mt=0;Mt<k.locationSize;Mt++)m(k.location+Mt,ft.meshPerAttribute);y.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Mt=0;Mt<k.locationSize;Mt++)p(k.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let Mt=0;Mt<k.locationSize;Mt++)_(k.location+Mt,xt/k.locationSize,st,_t,xt*dt,xt/k.locationSize*Mt*dt,bt)}}else if(W!==void 0){const _t=W[et];if(_t!==void 0)switch(_t.length){case 2:n.vertexAttrib2fv(k.location,_t);break;case 3:n.vertexAttrib3fv(k.location,_t);break;case 4:n.vertexAttrib4fv(k.location,_t);break;default:n.vertexAttrib1fv(k.location,_t)}}}}b()}function I(){B();for(const y in i){const T=i[y];for(const K in T){const $=T[K];for(const Q in $)u($[Q].object),delete $[Q];delete T[K]}delete i[y]}}function P(y){if(i[y.id]===void 0)return;const T=i[y.id];for(const K in T){const $=T[K];for(const Q in $)u($[Q].object),delete $[Q];delete T[K]}delete i[y.id]}function R(y){for(const T in i){const K=i[T];if(K[y.id]===void 0)continue;const $=K[y.id];for(const Q in $)u($[Q].object),delete $[Q];delete K[y.id]}}function B(){it(),o=!0,r!==s&&(r=s,c(r.object))}function it(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:B,resetDefaultState:it,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfProgram:R,initAttributes:M,enableAttribute:p,disableUnusedAttributes:b}}function xM(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,i,1)}function l(c,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let M=0;M<h;M++)g+=u[M];for(let M=0;M<f.length;M++)e.update(g,i,f[M])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function MM(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==En&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const B=R===kr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==ai&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==si&&!B)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const R=t.get("EXT_clip_control");R.clipControlEXT(R.LOWER_LEFT_EXT,R.ZERO_TO_ONE_EXT)}const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:b,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:I,maxSamples:P}}function yM(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new xi,a=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||s;return s=f,i=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,M=h.clipIntersection,p=h.clipShadows,m=n.get(h);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{const b=r?0:i,_=b*4;let v=m.clippingState||null;l.value=v,v=u(g,f,_,d);for(let I=0;I!==_;++I)v[I]=e[I];m.clippingState=v,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,g){const M=h!==null?h.length:0;let p=null;if(M!==0){if(p=l.value,g!==!0||p===null){const m=d+M*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<m)&&(p=new Float32Array(m));for(let _=0,v=d;_!==M;++_,v+=4)o.copy(h[_]).applyMatrix4(b,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,p}}function SM(n){let t=new WeakMap;function e(o,a){return a===Yl?o.mapping=Hs:a===ql&&(o.mapping=Vs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Yl||a===ql)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Iv(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Yd extends Wd{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ls=4,Sh=[.125,.215,.35,.446,.526,.582],$i=20,al=new Yd,Eh=new Zt;let ll=null,cl=0,ul=0,hl=!1;const Gi=(1+Math.sqrt(5))/2,Ts=1/Gi,bh=[new N(-Gi,Ts,0),new N(Gi,Ts,0),new N(-Ts,0,Gi),new N(Ts,0,Gi),new N(0,Gi,-Ts),new N(0,Gi,Ts),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Th{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ll=this._renderer.getRenderTarget(),cl=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel(),hl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ll,cl,ul),this._renderer.xr.enabled=hl,t.scissorTest=!1,_o(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ll=this._renderer.getRenderTarget(),cl=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel(),hl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:kr,format:En,colorSpace:Pi,depthBuffer:!1},s=Ah(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=EM(r)),this._blurMaterial=bM(r,t,e)}return s}_compileMaterial(t){const e=new Ae(this._lodPlanes[0],t);this._renderer.compile(e,al)}_sceneToCubeUV(t,e,i,s){const a=new hn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Eh),u.toneMapping=bi,u.autoClear=!1;const d=new Ji({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1}),g=new Ae(new oi,d);let M=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,M=!0):(d.color.copy(Eh),M=!0);for(let m=0;m<6;m++){const b=m%3;b===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):b===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const _=this._cubeSize;_o(s,b*_,m>2?_:0,_,_),u.setRenderTarget(s),M&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Hs||t.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ae(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;_o(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,al)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=bh[(s-r-1)%bh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ae(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*$i-1),M=r/g,p=isFinite(r)?1+Math.floor(u*M):$i;p>$i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${$i}`);const m=[];let b=0;for(let R=0;R<$i;++R){const B=R/M,it=Math.exp(-B*B/2);m.push(it),R===0?b+=it:R<p&&(b+=2*it)}for(let R=0;R<m.length;R++)m[R]=m[R]/b;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;const v=this._sizeLods[s],I=3*v*(s>_-Ls?s-_+Ls:0),P=4*(this._cubeSize-v);_o(e,I,P,3*v,2*v),l.setRenderTarget(e),l.render(h,al)}}function EM(n){const t=[],e=[],i=[];let s=n;const r=n-Ls+1+Sh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ls?l=Sh[o-n+Ls-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,M=3,p=2,m=1,b=new Float32Array(M*g*d),_=new Float32Array(p*g*d),v=new Float32Array(m*g*d);for(let P=0;P<d;P++){const R=P%3*2/3-1,B=P>2?0:-1,it=[R,B,0,R+2/3,B,0,R+2/3,B+1,0,R,B,0,R+2/3,B+1,0,R,B+1,0];b.set(it,M*g*P),_.set(f,p*g*P);const y=[P,P,P,P,P,P];v.set(y,m*g*P)}const I=new ln;I.setAttribute("position",new Fn(b,M)),I.setAttribute("uv",new Fn(_,p)),I.setAttribute("faceIndex",new Fn(v,m)),t.push(I),s>Ls&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ah(n,t,e){const i=new ss(n,t,e);return i.texture.mapping=ma,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _o(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function bM(n,t,e){const i=new Float32Array($i),s=new N(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:nu(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function wh(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nu(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Ch(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function nu(){return`

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
	`}function TM(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Yl||l===ql,u=l===Hs||l===Vs;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Th(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(e===null&&(e=new Th(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function AM(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&No("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function wM(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const M=f.morphAttributes[g];for(let p=0,m=M.length;p<m;p++)t.remove(M[p])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const M=d[g];for(let p=0,m=M.length;p<m;p++)t.update(M[p],n.ARRAY_BUFFER)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let M=0;if(d!==null){const b=d.array;M=d.version;for(let _=0,v=b.length;_<v;_+=3){const I=b[_+0],P=b[_+1],R=b[_+2];f.push(I,P,P,R,R,I)}}else if(g!==void 0){const b=g.array;M=g.version;for(let _=0,v=b.length/3-1;_<v;_+=3){const I=_+0,P=_+1,R=_+2;f.push(I,P,P,R,R,I)}}else return;const p=new(Od(f)?Vd:Hd)(f,1);p.version=M;const m=r.get(h);m&&t.remove(m),r.set(h,p)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function CM(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,f*o,g),e.update(d,i,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,i,1)}function h(f,d,g,M){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)c(f[m]/o,d[m],M[m]);else{p.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,M,0,g);let m=0;for(let b=0;b<g;b++)m+=d[b];for(let b=0;b<M.length;b++)e.update(m,i,M[b])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function RM(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function PM(n,t,e){const i=new WeakMap,s=new ye;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let y=function(){B.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,M=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),M===!0&&(v=2),p===!0&&(v=3);let I=a.attributes.position.count*v,P=1;I>t.maxTextureSize&&(P=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const R=new Float32Array(I*P*4*h),B=new Bd(R,I,P,h);B.type=si,B.needsUpdate=!0;const it=v*4;for(let T=0;T<h;T++){const K=m[T],$=b[T],Q=_[T],rt=I*P*4*T;for(let W=0;W<K.count;W++){const et=W*it;g===!0&&(s.fromBufferAttribute(K,W),R[rt+et+0]=s.x,R[rt+et+1]=s.y,R[rt+et+2]=s.z,R[rt+et+3]=0),M===!0&&(s.fromBufferAttribute($,W),R[rt+et+4]=s.x,R[rt+et+5]=s.y,R[rt+et+6]=s.z,R[rt+et+7]=0),p===!0&&(s.fromBufferAttribute(Q,W),R[rt+et+8]=s.x,R[rt+et+9]=s.y,R[rt+et+10]=s.z,R[rt+et+11]=Q.itemSize===4?s.w:1)}}f={count:h,texture:B,size:new vt(I,P)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const M=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",M),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function LM(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class qd extends tn{constructor(t,e,i,s,r,o,a,l,c,u=Os){if(u!==Os&&u!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Os&&(i=is),i===void 0&&u===Ws&&(i=Gs),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:dn,this.minFilter=l!==void 0?l:dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Kd=new tn,Rh=new qd(1,1),jd=new Bd,Zd=new gv,Jd=new Xd,Ph=[],Lh=[],Dh=new Float32Array(16),Ih=new Float32Array(9),Uh=new Float32Array(4);function Ks(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Ph[s];if(r===void 0&&(r=new Float32Array(s),Ph[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Le(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function va(n,t){let e=Lh[t];e===void 0&&(e=new Int32Array(t),Lh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function DM(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function IM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2fv(this.addr,t),Le(e,t)}}function UM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;n.uniform3fv(this.addr,t),Le(e,t)}}function NM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4fv(this.addr,t),Le(e,t)}}function OM(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Uh.set(i),n.uniformMatrix2fv(this.addr,!1,Uh),Le(e,i)}}function FM(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Ih.set(i),n.uniformMatrix3fv(this.addr,!1,Ih),Le(e,i)}}function BM(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Dh.set(i),n.uniformMatrix4fv(this.addr,!1,Dh),Le(e,i)}}function zM(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function kM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2iv(this.addr,t),Le(e,t)}}function HM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3iv(this.addr,t),Le(e,t)}}function VM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4iv(this.addr,t),Le(e,t)}}function GM(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function WM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2uiv(this.addr,t),Le(e,t)}}function XM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3uiv(this.addr,t),Le(e,t)}}function $M(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4uiv(this.addr,t),Le(e,t)}}function YM(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Rh.compareFunction=Nd,r=Rh):r=Kd,e.setTexture2D(t||r,s)}function qM(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Zd,s)}function KM(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Jd,s)}function jM(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||jd,s)}function ZM(n){switch(n){case 5126:return DM;case 35664:return IM;case 35665:return UM;case 35666:return NM;case 35674:return OM;case 35675:return FM;case 35676:return BM;case 5124:case 35670:return zM;case 35667:case 35671:return kM;case 35668:case 35672:return HM;case 35669:case 35673:return VM;case 5125:return GM;case 36294:return WM;case 36295:return XM;case 36296:return $M;case 35678:case 36198:case 36298:case 36306:case 35682:return YM;case 35679:case 36299:case 36307:return qM;case 35680:case 36300:case 36308:case 36293:return KM;case 36289:case 36303:case 36311:case 36292:return jM}}function JM(n,t){n.uniform1fv(this.addr,t)}function QM(n,t){const e=Ks(t,this.size,2);n.uniform2fv(this.addr,e)}function ty(n,t){const e=Ks(t,this.size,3);n.uniform3fv(this.addr,e)}function ey(n,t){const e=Ks(t,this.size,4);n.uniform4fv(this.addr,e)}function ny(n,t){const e=Ks(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function iy(n,t){const e=Ks(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function sy(n,t){const e=Ks(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ry(n,t){n.uniform1iv(this.addr,t)}function oy(n,t){n.uniform2iv(this.addr,t)}function ay(n,t){n.uniform3iv(this.addr,t)}function ly(n,t){n.uniform4iv(this.addr,t)}function cy(n,t){n.uniform1uiv(this.addr,t)}function uy(n,t){n.uniform2uiv(this.addr,t)}function hy(n,t){n.uniform3uiv(this.addr,t)}function fy(n,t){n.uniform4uiv(this.addr,t)}function dy(n,t,e){const i=this.cache,s=t.length,r=va(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Kd,r[o])}function py(n,t,e){const i=this.cache,s=t.length,r=va(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Zd,r[o])}function my(n,t,e){const i=this.cache,s=t.length,r=va(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Jd,r[o])}function _y(n,t,e){const i=this.cache,s=t.length,r=va(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||jd,r[o])}function gy(n){switch(n){case 5126:return JM;case 35664:return QM;case 35665:return ty;case 35666:return ey;case 35674:return ny;case 35675:return iy;case 35676:return sy;case 5124:case 35670:return ry;case 35667:case 35671:return oy;case 35668:case 35672:return ay;case 35669:case 35673:return ly;case 5125:return cy;case 36294:return uy;case 36295:return hy;case 36296:return fy;case 35678:case 36198:case 36298:case 36306:case 35682:return dy;case 35679:case 36299:case 36307:return py;case 35680:case 36300:case 36308:case 36293:return my;case 36289:case 36303:case 36311:case 36292:return _y}}class vy{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=ZM(e.type)}}class xy{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=gy(e.type)}}class My{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const fl=/(\w+)(\])?(\[|\.)?/g;function Nh(n,t){n.seq.push(t),n.map[t.id]=t}function yy(n,t,e){const i=n.name,s=i.length;for(fl.lastIndex=0;;){const r=fl.exec(i),o=fl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Nh(e,c===void 0?new vy(a,n,t):new xy(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new My(a),Nh(e,h)),e=h}}}class Oo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);yy(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Oh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Sy=37297;let Ey=0;function by(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function Ty(n){const t=re.getPrimaries(re.workingColorSpace),e=re.getPrimaries(n);let i;switch(t===e?i="":t===jo&&e===Ko?i="LinearDisplayP3ToLinearSRGB":t===Ko&&e===jo&&(i="LinearSRGBToLinearDisplayP3"),n){case Pi:case _a:return[i,"LinearTransferOETF"];case Rn:case Jc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Fh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+by(n.getShaderSource(t),o)}else return s}function Ay(n,t){const e=Ty(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function wy(n,t){let e;switch(t){case Cg:e="Linear";break;case Rg:e="Reinhard";break;case Pg:e="Cineon";break;case Lg:e="ACESFilmic";break;case Ig:e="AgX";break;case Ug:e="Neutral";break;case Dg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const go=new N;function Cy(){re.getLuminanceCoefficients(go);const n=go.x.toFixed(4),t=go.y.toFixed(4),e=go.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ry(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(or).join(`
`)}function Py(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ly(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function or(n){return n!==""}function Bh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Dy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ec(n){return n.replace(Dy,Uy)}const Iy=new Map;function Uy(n,t){let e=$t[t];if(e===void 0){const i=Iy.get(t);if(i!==void 0)e=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ec(e)}const Ny=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kh(n){return n.replace(Ny,Oy)}function Oy(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hh(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Fy(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ag?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(t="SHADOWMAP_TYPE_VSM"),t}function By(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Hs:case Vs:t="ENVMAP_TYPE_CUBE";break;case ma:t="ENVMAP_TYPE_CUBE_UV";break}return t}function zy(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Vs:t="ENVMAP_MODE_REFRACTION";break}return t}function ky(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Xc:t="ENVMAP_BLENDING_MULTIPLY";break;case Ag:t="ENVMAP_BLENDING_MIX";break;case wg:t="ENVMAP_BLENDING_ADD";break}return t}function Hy(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Vy(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Fy(e),c=By(e),u=zy(e),h=ky(e),f=Hy(e),d=Ry(e),g=Py(r),M=s.createProgram();let p,m,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(or).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(or).join(`
`),m.length>0&&(m+=`
`)):(p=[Hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(or).join(`
`),m=[Hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bi?"#define TONE_MAPPING":"",e.toneMapping!==bi?$t.tonemapping_pars_fragment:"",e.toneMapping!==bi?wy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,Ay("linearToOutputTexel",e.outputColorSpace),Cy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(or).join(`
`)),o=Ec(o),o=Bh(o,e),o=zh(o,e),a=Ec(a),a=Bh(a,e),a=zh(a,e),o=kh(o),a=kh(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=b+p+o,v=b+m+a,I=Oh(s,s.VERTEX_SHADER,_),P=Oh(s,s.FRAGMENT_SHADER,v);s.attachShader(M,I),s.attachShader(M,P),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function R(T){if(n.debug.checkShaderErrors){const K=s.getProgramInfoLog(M).trim(),$=s.getShaderInfoLog(I).trim(),Q=s.getShaderInfoLog(P).trim();let rt=!0,W=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(rt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,I,P);else{const et=Fh(s,I,"vertex"),k=Fh(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+K+`
`+et+`
`+k)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):($===""||Q==="")&&(W=!1);W&&(T.diagnostics={runnable:rt,programLog:K,vertexShader:{log:$,prefix:p},fragmentShader:{log:Q,prefix:m}})}s.deleteShader(I),s.deleteShader(P),B=new Oo(s,M),it=Ly(s,M)}let B;this.getUniforms=function(){return B===void 0&&R(this),B};let it;this.getAttributes=function(){return it===void 0&&R(this),it};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(M,Sy)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ey++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=I,this.fragmentShader=P,this}let Gy=0;class Wy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Xy(t),e.set(t,i)),i}}class Xy{constructor(t){this.id=Gy++,this.code=t,this.usedTimes=0}}function $y(n,t,e,i,s,r,o){const a=new zd,l=new Wy,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.reverseDepthBuffer,d=s.vertexTextures;let g=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,T,K,$,Q){const rt=$.fog,W=Q.geometry,et=y.isMeshStandardMaterial?$.environment:null,k=(y.isMeshStandardMaterial?e:t).get(y.envMap||et),ft=k&&k.mapping===ma?k.image.height:null,_t=M[y.type];y.precision!==null&&(g=s.getMaxPrecision(y.precision),g!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",g,"instead."));const xt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Bt=xt!==void 0?xt.length:0;let jt=0;W.morphAttributes.position!==void 0&&(jt=1),W.morphAttributes.normal!==void 0&&(jt=2),W.morphAttributes.color!==void 0&&(jt=3);let st,dt,bt,Mt;if(_t){const je=In[_t];st=je.vertexShader,dt=je.fragmentShader}else st=y.vertexShader,dt=y.fragmentShader,l.update(y),bt=l.getVertexShaderID(y),Mt=l.getFragmentShaderID(y);const Ot=n.getRenderTarget(),Ut=Q.isInstancedMesh===!0,Wt=Q.isBatchedMesh===!0,C=!!y.map,w=!!y.matcap,S=!!k,H=!!y.aoMap,O=!!y.lightMap,U=!!y.bumpMap,X=!!y.normalMap,tt=!!y.displacementMap,q=!!y.emissiveMap,E=!!y.metalnessMap,x=!!y.roughnessMap,L=y.anisotropy>0,G=y.clearcoat>0,Y=y.dispersion>0,j=y.iridescence>0,pt=y.sheen>0,at=y.transmission>0,mt=L&&!!y.anisotropyMap,Nt=G&&!!y.clearcoatMap,ut=G&&!!y.clearcoatNormalMap,yt=G&&!!y.clearcoatRoughnessMap,Dt=j&&!!y.iridescenceMap,zt=j&&!!y.iridescenceThicknessMap,St=pt&&!!y.sheenColorMap,Vt=pt&&!!y.sheenRoughnessMap,Gt=!!y.specularMap,oe=!!y.specularColorMap,F=!!y.specularIntensityMap,wt=at&&!!y.transmissionMap,nt=at&&!!y.thicknessMap,lt=!!y.gradientMap,Tt=!!y.alphaMap,Ct=y.alphaTest>0,Jt=!!y.alphaHash,be=!!y.extensions;let Ke=bi;y.toneMapped&&(Ot===null||Ot.isXRRenderTarget===!0)&&(Ke=n.toneMapping);const Qt={shaderID:_t,shaderType:y.type,shaderName:y.name,vertexShader:st,fragmentShader:dt,defines:y.defines,customVertexShaderID:bt,customFragmentShaderID:Mt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:g,batching:Wt,batchingColor:Wt&&Q._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&Q.instanceColor!==null,instancingMorph:Ut&&Q.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Ot===null?n.outputColorSpace:Ot.isXRRenderTarget===!0?Ot.texture.colorSpace:Pi,alphaToCoverage:!!y.alphaToCoverage,map:C,matcap:w,envMap:S,envMapMode:S&&k.mapping,envMapCubeUVHeight:ft,aoMap:H,lightMap:O,bumpMap:U,normalMap:X,displacementMap:d&&tt,emissiveMap:q,normalMapObjectSpace:X&&y.normalMapType===Bg,normalMapTangentSpace:X&&y.normalMapType===Ud,metalnessMap:E,roughnessMap:x,anisotropy:L,anisotropyMap:mt,clearcoat:G,clearcoatMap:Nt,clearcoatNormalMap:ut,clearcoatRoughnessMap:yt,dispersion:Y,iridescence:j,iridescenceMap:Dt,iridescenceThicknessMap:zt,sheen:pt,sheenColorMap:St,sheenRoughnessMap:Vt,specularMap:Gt,specularColorMap:oe,specularIntensityMap:F,transmission:at,transmissionMap:wt,thicknessMap:nt,gradientMap:lt,opaque:y.transparent===!1&&y.blending===Ns&&y.alphaToCoverage===!1,alphaMap:Tt,alphaTest:Ct,alphaHash:Jt,combine:y.combine,mapUv:C&&p(y.map.channel),aoMapUv:H&&p(y.aoMap.channel),lightMapUv:O&&p(y.lightMap.channel),bumpMapUv:U&&p(y.bumpMap.channel),normalMapUv:X&&p(y.normalMap.channel),displacementMapUv:tt&&p(y.displacementMap.channel),emissiveMapUv:q&&p(y.emissiveMap.channel),metalnessMapUv:E&&p(y.metalnessMap.channel),roughnessMapUv:x&&p(y.roughnessMap.channel),anisotropyMapUv:mt&&p(y.anisotropyMap.channel),clearcoatMapUv:Nt&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ut&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:St&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&p(y.sheenRoughnessMap.channel),specularMapUv:Gt&&p(y.specularMap.channel),specularColorMapUv:oe&&p(y.specularColorMap.channel),specularIntensityMapUv:F&&p(y.specularIntensityMap.channel),transmissionMapUv:wt&&p(y.transmissionMap.channel),thicknessMapUv:nt&&p(y.thicknessMap.channel),alphaMapUv:Tt&&p(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(X||L),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!W.attributes.uv&&(C||Tt),fog:!!rt,useFog:y.fog===!0,fogExp2:!!rt&&rt.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:f,skinning:Q.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Bt,morphTextureStride:jt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&K.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ke,decodeVideoTexture:C&&y.map.isVideoTexture===!0&&re.getTransfer(y.map.colorSpace)===pe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Nn,flipSided:y.side===Qe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:be&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&y.extensions.multiDraw===!0||Wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Qt.vertexUv1s=c.has(1),Qt.vertexUv2s=c.has(2),Qt.vertexUv3s=c.has(3),c.clear(),Qt}function b(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const K in y.defines)T.push(K),T.push(y.defines[K]);return y.isRawShaderMaterial===!1&&(_(T,y),v(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function _(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function v(y,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reverseDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.alphaToCoverage&&a.enable(20),y.push(a.mask)}function I(y){const T=M[y.type];let K;if(T){const $=In[T];K=Rv.clone($.uniforms)}else K=y.uniforms;return K}function P(y,T){let K;for(let $=0,Q=u.length;$<Q;$++){const rt=u[$];if(rt.cacheKey===T){K=rt,++K.usedTimes;break}}return K===void 0&&(K=new Vy(n,T,y,r),u.push(K)),K}function R(y){if(--y.usedTimes===0){const T=u.indexOf(y);u[T]=u[u.length-1],u.pop(),y.destroy()}}function B(y){l.remove(y)}function it(){l.dispose()}return{getParameters:m,getProgramCacheKey:b,getUniforms:I,acquireProgram:P,releaseProgram:R,releaseShaderCache:B,programs:u,dispose:it}}function Yy(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function qy(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Vh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Gh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h,f,d,g,M,p){let m=n[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:M,group:p},n[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=M,m.group=p),t++,m}function a(h,f,d,g,M,p){const m=o(h,f,d,g,M,p);d.transmission>0?i.push(m):d.transparent===!0?s.push(m):e.push(m)}function l(h,f,d,g,M,p){const m=o(h,f,d,g,M,p);d.transmission>0?i.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function c(h,f){e.length>1&&e.sort(h||qy),i.length>1&&i.sort(f||Vh),s.length>1&&s.sort(f||Vh)}function u(){for(let h=t,f=n.length;h<f;h++){const d=n[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function Ky(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Gh,n.set(i,[o])):s>=r.length?(o=new Gh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function jy(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Zt};break;case"SpotLight":e={position:new N,direction:new N,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function Zy(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Jy=0;function Qy(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function tS(n){const t=new jy,e=Zy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const s=new N,r=new ge,o=new ge;function a(c){let u=0,h=0,f=0;for(let it=0;it<9;it++)i.probe[it].set(0,0,0);let d=0,g=0,M=0,p=0,m=0,b=0,_=0,v=0,I=0,P=0,R=0;c.sort(Qy);for(let it=0,y=c.length;it<y;it++){const T=c[it],K=T.color,$=T.intensity,Q=T.distance,rt=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=K.r*$,h+=K.g*$,f+=K.b*$;else if(T.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(T.sh.coefficients[W],$);R++}else if(T.isDirectionalLight){const W=t.get(T);if(W.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const et=T.shadow,k=e.get(T);k.shadowIntensity=et.intensity,k.shadowBias=et.bias,k.shadowNormalBias=et.normalBias,k.shadowRadius=et.radius,k.shadowMapSize=et.mapSize,i.directionalShadow[d]=k,i.directionalShadowMap[d]=rt,i.directionalShadowMatrix[d]=T.shadow.matrix,b++}i.directional[d]=W,d++}else if(T.isSpotLight){const W=t.get(T);W.position.setFromMatrixPosition(T.matrixWorld),W.color.copy(K).multiplyScalar($),W.distance=Q,W.coneCos=Math.cos(T.angle),W.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),W.decay=T.decay,i.spot[M]=W;const et=T.shadow;if(T.map&&(i.spotLightMap[I]=T.map,I++,et.updateMatrices(T),T.castShadow&&P++),i.spotLightMatrix[M]=et.matrix,T.castShadow){const k=e.get(T);k.shadowIntensity=et.intensity,k.shadowBias=et.bias,k.shadowNormalBias=et.normalBias,k.shadowRadius=et.radius,k.shadowMapSize=et.mapSize,i.spotShadow[M]=k,i.spotShadowMap[M]=rt,v++}M++}else if(T.isRectAreaLight){const W=t.get(T);W.color.copy(K).multiplyScalar($),W.halfWidth.set(T.width*.5,0,0),W.halfHeight.set(0,T.height*.5,0),i.rectArea[p]=W,p++}else if(T.isPointLight){const W=t.get(T);if(W.color.copy(T.color).multiplyScalar(T.intensity),W.distance=T.distance,W.decay=T.decay,T.castShadow){const et=T.shadow,k=e.get(T);k.shadowIntensity=et.intensity,k.shadowBias=et.bias,k.shadowNormalBias=et.normalBias,k.shadowRadius=et.radius,k.shadowMapSize=et.mapSize,k.shadowCameraNear=et.camera.near,k.shadowCameraFar=et.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=rt,i.pointShadowMatrix[g]=T.shadow.matrix,_++}i.point[g]=W,g++}else if(T.isHemisphereLight){const W=t.get(T);W.skyColor.copy(T.color).multiplyScalar($),W.groundColor.copy(T.groundColor).multiplyScalar($),i.hemi[m]=W,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Et.LTC_FLOAT_1,i.rectAreaLTC2=Et.LTC_FLOAT_2):(i.rectAreaLTC1=Et.LTC_HALF_1,i.rectAreaLTC2=Et.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const B=i.hash;(B.directionalLength!==d||B.pointLength!==g||B.spotLength!==M||B.rectAreaLength!==p||B.hemiLength!==m||B.numDirectionalShadows!==b||B.numPointShadows!==_||B.numSpotShadows!==v||B.numSpotMaps!==I||B.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=M,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=v+I-P,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=R,B.directionalLength=d,B.pointLength=g,B.spotLength=M,B.rectAreaLength=p,B.hemiLength=m,B.numDirectionalShadows=b,B.numPointShadows=_,B.numSpotShadows=v,B.numSpotMaps=I,B.numLightProbes=R,i.version=Jy++)}function l(c,u){let h=0,f=0,d=0,g=0,M=0;const p=u.matrixWorldInverse;for(let m=0,b=c.length;m<b;m++){const _=c[m];if(_.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),h++}else if(_.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),d++}else if(_.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){const v=i.hemi[M];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(p),M++}}}return{setup:a,setupView:l,state:i}}function Wh(n){const t=new tS(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function eS(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Wh(n),t.set(s,[a])):r>=o.length?(a=new Wh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class nS extends qs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Og,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class iS extends qs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const sS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rS=`uniform sampler2D shadow_pass;
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
}`;function oS(n,t,e){let i=new eu;const s=new vt,r=new vt,o=new ye,a=new nS({depthPacking:Fg}),l=new iS,c={},u=e.maxTextureSize,h={[wi]:Qe,[Qe]:wi,[Nn]:Nn},f=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:sS,fragmentShader:rS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new ln;g.setAttribute("position",new Fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Ae(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd;let m=this.type;this.render=function(P,R,B){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;const it=n.getRenderTarget(),y=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),K=n.state;K.setBlending(Ei),K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const $=m!==Jn&&this.type===Jn,Q=m===Jn&&this.type!==Jn;for(let rt=0,W=P.length;rt<W;rt++){const et=P[rt],k=et.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const ft=k.getFrameExtents();if(s.multiply(ft),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ft.x),s.x=r.x*ft.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ft.y),s.y=r.y*ft.y,k.mapSize.y=r.y)),k.map===null||$===!0||Q===!0){const xt=this.type!==Jn?{minFilter:dn,magFilter:dn}:{};k.map!==null&&k.map.dispose(),k.map=new ss(s.x,s.y,xt),k.map.texture.name=et.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const _t=k.getViewportCount();for(let xt=0;xt<_t;xt++){const Bt=k.getViewport(xt);o.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),K.viewport(o),k.updateMatrices(et,xt),i=k.getFrustum(),v(R,B,k.camera,et,this.type)}k.isPointLightShadow!==!0&&this.type===Jn&&b(k,B),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(it,y,T)};function b(P,R){const B=t.update(M);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,d.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new ss(s.x,s.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(R,null,B,f,M,null),d.uniforms.shadow_pass.value=P.mapPass.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(R,null,B,d,M,null)}function _(P,R,B,it){let y=null;const T=B.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(T!==void 0)y=T;else if(y=B.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const K=y.uuid,$=R.uuid;let Q=c[K];Q===void 0&&(Q={},c[K]=Q);let rt=Q[$];rt===void 0&&(rt=y.clone(),Q[$]=rt,R.addEventListener("dispose",I)),y=rt}if(y.visible=R.visible,y.wireframe=R.wireframe,it===Jn?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:h[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,B.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const K=n.properties.get(y);K.light=B}return y}function v(P,R,B,it,y){if(P.visible===!1)return;if(P.layers.test(R.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&y===Jn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,P.matrixWorld);const $=t.update(P),Q=P.material;if(Array.isArray(Q)){const rt=$.groups;for(let W=0,et=rt.length;W<et;W++){const k=rt[W],ft=Q[k.materialIndex];if(ft&&ft.visible){const _t=_(P,ft,it,y);P.onBeforeShadow(n,P,R,B,$,_t,k),n.renderBufferDirect(B,null,$,_t,P,k),P.onAfterShadow(n,P,R,B,$,_t,k)}}}else if(Q.visible){const rt=_(P,Q,it,y);P.onBeforeShadow(n,P,R,B,$,rt,null),n.renderBufferDirect(B,null,$,rt,P,null),P.onAfterShadow(n,P,R,B,$,rt,null)}}const K=P.children;for(let $=0,Q=K.length;$<Q;$++)v(K[$],R,B,it,y)}function I(P){P.target.removeEventListener("dispose",I);for(const B in c){const it=c[B],y=P.target.uuid;y in it&&(it[y].dispose(),delete it[y])}}}const aS={[kl]:Hl,[Vl]:Xl,[Gl]:$l,[ks]:Wl,[Hl]:kl,[Xl]:Vl,[$l]:Gl,[Wl]:ks};function lS(n){function t(){let F=!1;const wt=new ye;let nt=null;const lt=new ye(0,0,0,0);return{setMask:function(Tt){nt!==Tt&&!F&&(n.colorMask(Tt,Tt,Tt,Tt),nt=Tt)},setLocked:function(Tt){F=Tt},setClear:function(Tt,Ct,Jt,be,Ke){Ke===!0&&(Tt*=be,Ct*=be,Jt*=be),wt.set(Tt,Ct,Jt,be),lt.equals(wt)===!1&&(n.clearColor(Tt,Ct,Jt,be),lt.copy(wt))},reset:function(){F=!1,nt=null,lt.set(-1,0,0,0)}}}function e(){let F=!1,wt=!1,nt=null,lt=null,Tt=null;return{setReversed:function(Ct){wt=Ct},setTest:function(Ct){Ct?bt(n.DEPTH_TEST):Mt(n.DEPTH_TEST)},setMask:function(Ct){nt!==Ct&&!F&&(n.depthMask(Ct),nt=Ct)},setFunc:function(Ct){if(wt&&(Ct=aS[Ct]),lt!==Ct){switch(Ct){case kl:n.depthFunc(n.NEVER);break;case Hl:n.depthFunc(n.ALWAYS);break;case Vl:n.depthFunc(n.LESS);break;case ks:n.depthFunc(n.LEQUAL);break;case Gl:n.depthFunc(n.EQUAL);break;case Wl:n.depthFunc(n.GEQUAL);break;case Xl:n.depthFunc(n.GREATER);break;case $l:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}lt=Ct}},setLocked:function(Ct){F=Ct},setClear:function(Ct){Tt!==Ct&&(n.clearDepth(Ct),Tt=Ct)},reset:function(){F=!1,nt=null,lt=null,Tt=null}}}function i(){let F=!1,wt=null,nt=null,lt=null,Tt=null,Ct=null,Jt=null,be=null,Ke=null;return{setTest:function(Qt){F||(Qt?bt(n.STENCIL_TEST):Mt(n.STENCIL_TEST))},setMask:function(Qt){wt!==Qt&&!F&&(n.stencilMask(Qt),wt=Qt)},setFunc:function(Qt,je,Wn){(nt!==Qt||lt!==je||Tt!==Wn)&&(n.stencilFunc(Qt,je,Wn),nt=Qt,lt=je,Tt=Wn)},setOp:function(Qt,je,Wn){(Ct!==Qt||Jt!==je||be!==Wn)&&(n.stencilOp(Qt,je,Wn),Ct=Qt,Jt=je,be=Wn)},setLocked:function(Qt){F=Qt},setClear:function(Qt){Ke!==Qt&&(n.clearStencil(Qt),Ke=Qt)},reset:function(){F=!1,wt=null,nt=null,lt=null,Tt=null,Ct=null,Jt=null,be=null,Ke=null}}}const s=new t,r=new e,o=new i,a=new WeakMap,l=new WeakMap;let c={},u={},h=new WeakMap,f=[],d=null,g=!1,M=null,p=null,m=null,b=null,_=null,v=null,I=null,P=new Zt(0,0,0),R=0,B=!1,it=null,y=null,T=null,K=null,$=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let rt=!1,W=0;const et=n.getParameter(n.VERSION);et.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(et)[1]),rt=W>=1):et.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),rt=W>=2);let k=null,ft={};const _t=n.getParameter(n.SCISSOR_BOX),xt=n.getParameter(n.VIEWPORT),Bt=new ye().fromArray(_t),jt=new ye().fromArray(xt);function st(F,wt,nt,lt){const Tt=new Uint8Array(4),Ct=n.createTexture();n.bindTexture(F,Ct),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Jt=0;Jt<nt;Jt++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(wt,0,n.RGBA,1,1,lt,0,n.RGBA,n.UNSIGNED_BYTE,Tt):n.texImage2D(wt+Jt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Tt);return Ct}const dt={};dt[n.TEXTURE_2D]=st(n.TEXTURE_2D,n.TEXTURE_2D,1),dt[n.TEXTURE_CUBE_MAP]=st(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[n.TEXTURE_2D_ARRAY]=st(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),dt[n.TEXTURE_3D]=st(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),bt(n.DEPTH_TEST),r.setFunc(ks),O(!1),U(Zu),bt(n.CULL_FACE),S(Ei);function bt(F){c[F]!==!0&&(n.enable(F),c[F]=!0)}function Mt(F){c[F]!==!1&&(n.disable(F),c[F]=!1)}function Ot(F,wt){return u[F]!==wt?(n.bindFramebuffer(F,wt),u[F]=wt,F===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=wt),F===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=wt),!0):!1}function Ut(F,wt){let nt=f,lt=!1;if(F){nt=h.get(wt),nt===void 0&&(nt=[],h.set(wt,nt));const Tt=F.textures;if(nt.length!==Tt.length||nt[0]!==n.COLOR_ATTACHMENT0){for(let Ct=0,Jt=Tt.length;Ct<Jt;Ct++)nt[Ct]=n.COLOR_ATTACHMENT0+Ct;nt.length=Tt.length,lt=!0}}else nt[0]!==n.BACK&&(nt[0]=n.BACK,lt=!0);lt&&n.drawBuffers(nt)}function Wt(F){return d!==F?(n.useProgram(F),d=F,!0):!1}const C={[Xi]:n.FUNC_ADD,[cg]:n.FUNC_SUBTRACT,[ug]:n.FUNC_REVERSE_SUBTRACT};C[hg]=n.MIN,C[fg]=n.MAX;const w={[dg]:n.ZERO,[pg]:n.ONE,[mg]:n.SRC_COLOR,[Bl]:n.SRC_ALPHA,[yg]:n.SRC_ALPHA_SATURATE,[xg]:n.DST_COLOR,[gg]:n.DST_ALPHA,[_g]:n.ONE_MINUS_SRC_COLOR,[zl]:n.ONE_MINUS_SRC_ALPHA,[Mg]:n.ONE_MINUS_DST_COLOR,[vg]:n.ONE_MINUS_DST_ALPHA,[Sg]:n.CONSTANT_COLOR,[Eg]:n.ONE_MINUS_CONSTANT_COLOR,[bg]:n.CONSTANT_ALPHA,[Tg]:n.ONE_MINUS_CONSTANT_ALPHA};function S(F,wt,nt,lt,Tt,Ct,Jt,be,Ke,Qt){if(F===Ei){g===!0&&(Mt(n.BLEND),g=!1);return}if(g===!1&&(bt(n.BLEND),g=!0),F!==lg){if(F!==M||Qt!==B){if((p!==Xi||_!==Xi)&&(n.blendEquation(n.FUNC_ADD),p=Xi,_=Xi),Qt)switch(F){case Ns:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ju:n.blendFunc(n.ONE,n.ONE);break;case Qu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case th:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ns:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ju:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Qu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case th:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}m=null,b=null,v=null,I=null,P.set(0,0,0),R=0,M=F,B=Qt}return}Tt=Tt||wt,Ct=Ct||nt,Jt=Jt||lt,(wt!==p||Tt!==_)&&(n.blendEquationSeparate(C[wt],C[Tt]),p=wt,_=Tt),(nt!==m||lt!==b||Ct!==v||Jt!==I)&&(n.blendFuncSeparate(w[nt],w[lt],w[Ct],w[Jt]),m=nt,b=lt,v=Ct,I=Jt),(be.equals(P)===!1||Ke!==R)&&(n.blendColor(be.r,be.g,be.b,Ke),P.copy(be),R=Ke),M=F,B=!1}function H(F,wt){F.side===Nn?Mt(n.CULL_FACE):bt(n.CULL_FACE);let nt=F.side===Qe;wt&&(nt=!nt),O(nt),F.blending===Ns&&F.transparent===!1?S(Ei):S(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);const lt=F.stencilWrite;o.setTest(lt),lt&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),tt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?bt(n.SAMPLE_ALPHA_TO_COVERAGE):Mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function O(F){it!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),it=F)}function U(F){F!==rg?(bt(n.CULL_FACE),F!==y&&(F===Zu?n.cullFace(n.BACK):F===og?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Mt(n.CULL_FACE),y=F}function X(F){F!==T&&(rt&&n.lineWidth(F),T=F)}function tt(F,wt,nt){F?(bt(n.POLYGON_OFFSET_FILL),(K!==wt||$!==nt)&&(n.polygonOffset(wt,nt),K=wt,$=nt)):Mt(n.POLYGON_OFFSET_FILL)}function q(F){F?bt(n.SCISSOR_TEST):Mt(n.SCISSOR_TEST)}function E(F){F===void 0&&(F=n.TEXTURE0+Q-1),k!==F&&(n.activeTexture(F),k=F)}function x(F,wt,nt){nt===void 0&&(k===null?nt=n.TEXTURE0+Q-1:nt=k);let lt=ft[nt];lt===void 0&&(lt={type:void 0,texture:void 0},ft[nt]=lt),(lt.type!==F||lt.texture!==wt)&&(k!==nt&&(n.activeTexture(nt),k=nt),n.bindTexture(F,wt||dt[F]),lt.type=F,lt.texture=wt)}function L(){const F=ft[k];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function G(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Y(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function at(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function mt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Nt(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ut(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function yt(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Dt(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function zt(F){Bt.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Bt.copy(F))}function St(F){jt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),jt.copy(F))}function Vt(F,wt){let nt=l.get(wt);nt===void 0&&(nt=new WeakMap,l.set(wt,nt));let lt=nt.get(F);lt===void 0&&(lt=n.getUniformBlockIndex(wt,F.name),nt.set(F,lt))}function Gt(F,wt){const lt=l.get(wt).get(F);a.get(wt)!==lt&&(n.uniformBlockBinding(wt,lt,F.__bindingPointIndex),a.set(wt,lt))}function oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},k=null,ft={},u={},h=new WeakMap,f=[],d=null,g=!1,M=null,p=null,m=null,b=null,_=null,v=null,I=null,P=new Zt(0,0,0),R=0,B=!1,it=null,y=null,T=null,K=null,$=null,Bt.set(0,0,n.canvas.width,n.canvas.height),jt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:bt,disable:Mt,bindFramebuffer:Ot,drawBuffers:Ut,useProgram:Wt,setBlending:S,setMaterial:H,setFlipSided:O,setCullFace:U,setLineWidth:X,setPolygonOffset:tt,setScissorTest:q,activeTexture:E,bindTexture:x,unbindTexture:L,compressedTexImage2D:G,compressedTexImage3D:Y,texImage2D:yt,texImage3D:Dt,updateUBOMapping:Vt,uniformBlockBinding:Gt,texStorage2D:Nt,texStorage3D:ut,texSubImage2D:j,texSubImage3D:pt,compressedTexSubImage2D:at,compressedTexSubImage3D:mt,scissor:zt,viewport:St,reset:oe}}function Xh(n,t,e,i){const s=cS(i);switch(e){case wd:return n*t;case Rd:return n*t;case Pd:return n*t*2;case Ld:return n*t/s.components*s.byteLength;case Kc:return n*t/s.components*s.byteLength;case Dd:return n*t*2/s.components*s.byteLength;case jc:return n*t*2/s.components*s.byteLength;case Cd:return n*t*3/s.components*s.byteLength;case En:return n*t*4/s.components*s.byteLength;case Zc:return n*t*4/s.components*s.byteLength;case Po:case Lo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Do:case Io:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Jl:case tc:return Math.max(n,16)*Math.max(t,8)/4;case Zl:case Ql:return Math.max(n,8)*Math.max(t,8)/2;case ec:case nc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ic:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case sc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case rc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case oc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ac:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case lc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case cc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case uc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case hc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case fc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case dc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case pc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case mc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case _c:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case gc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Uo:case vc:case xc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Id:case Mc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case yc:case Sc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function cS(n){switch(n){case ai:case bd:return{byteLength:1,components:1};case Lr:case Td:case kr:return{byteLength:2,components:1};case Yc:case qc:return{byteLength:2,components:4};case is:case $c:case si:return{byteLength:4,components:1};case Ad:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function uS(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new vt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return d?new OffscreenCanvas(E,x):Jo("canvas")}function M(E,x,L){let G=1;const Y=q(E);if((Y.width>L||Y.height>L)&&(G=L/Math.max(Y.width,Y.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const j=Math.floor(G*Y.width),pt=Math.floor(G*Y.height);h===void 0&&(h=g(j,pt));const at=x?g(j,pt):h;return at.width=j,at.height=pt,at.getContext("2d").drawImage(E,0,0,j,pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+j+"x"+pt+")."),at}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function p(E){return E.generateMipmaps&&E.minFilter!==dn&&E.minFilter!==yn}function m(E){n.generateMipmap(E)}function b(E,x,L,G,Y=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let j=x;if(x===n.RED&&(L===n.FLOAT&&(j=n.R32F),L===n.HALF_FLOAT&&(j=n.R16F),L===n.UNSIGNED_BYTE&&(j=n.R8)),x===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.R8UI),L===n.UNSIGNED_SHORT&&(j=n.R16UI),L===n.UNSIGNED_INT&&(j=n.R32UI),L===n.BYTE&&(j=n.R8I),L===n.SHORT&&(j=n.R16I),L===n.INT&&(j=n.R32I)),x===n.RG&&(L===n.FLOAT&&(j=n.RG32F),L===n.HALF_FLOAT&&(j=n.RG16F),L===n.UNSIGNED_BYTE&&(j=n.RG8)),x===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.RG8UI),L===n.UNSIGNED_SHORT&&(j=n.RG16UI),L===n.UNSIGNED_INT&&(j=n.RG32UI),L===n.BYTE&&(j=n.RG8I),L===n.SHORT&&(j=n.RG16I),L===n.INT&&(j=n.RG32I)),x===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.RGB8UI),L===n.UNSIGNED_SHORT&&(j=n.RGB16UI),L===n.UNSIGNED_INT&&(j=n.RGB32UI),L===n.BYTE&&(j=n.RGB8I),L===n.SHORT&&(j=n.RGB16I),L===n.INT&&(j=n.RGB32I)),x===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),L===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),L===n.UNSIGNED_INT&&(j=n.RGBA32UI),L===n.BYTE&&(j=n.RGBA8I),L===n.SHORT&&(j=n.RGBA16I),L===n.INT&&(j=n.RGBA32I)),x===n.RGB&&L===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),x===n.RGBA){const pt=Y?qo:re.getTransfer(G);L===n.FLOAT&&(j=n.RGBA32F),L===n.HALF_FLOAT&&(j=n.RGBA16F),L===n.UNSIGNED_BYTE&&(j=pt===pe?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function _(E,x){let L;return E?x===null||x===is||x===Gs?L=n.DEPTH24_STENCIL8:x===si?L=n.DEPTH32F_STENCIL8:x===Lr&&(L=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===is||x===Gs?L=n.DEPTH_COMPONENT24:x===si?L=n.DEPTH_COMPONENT32F:x===Lr&&(L=n.DEPTH_COMPONENT16),L}function v(E,x){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==dn&&E.minFilter!==yn?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function I(E){const x=E.target;x.removeEventListener("dispose",I),R(x),x.isVideoTexture&&u.delete(x)}function P(E){const x=E.target;x.removeEventListener("dispose",P),it(x)}function R(E){const x=i.get(E);if(x.__webglInit===void 0)return;const L=E.source,G=f.get(L);if(G){const Y=G[x.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&B(E),Object.keys(G).length===0&&f.delete(L)}i.remove(E)}function B(E){const x=i.get(E);n.deleteTexture(x.__webglTexture);const L=E.source,G=f.get(L);delete G[x.__cacheKey],o.memory.textures--}function it(E){const x=i.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let Y=0;Y<x.__webglFramebuffer[G].length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[G][Y]);else n.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)n.deleteFramebuffer(x.__webglFramebuffer[G]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const L=E.textures;for(let G=0,Y=L.length;G<Y;G++){const j=i.get(L[G]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(L[G])}i.remove(E)}let y=0;function T(){y=0}function K(){const E=y;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),y+=1,E}function $(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function Q(E,x){const L=i.get(E);if(E.isVideoTexture&&X(E),E.isRenderTargetTexture===!1&&E.version>0&&L.__version!==E.version){const G=E.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{jt(L,E,x);return}}e.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+x)}function rt(E,x){const L=i.get(E);if(E.version>0&&L.__version!==E.version){jt(L,E,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+x)}function W(E,x){const L=i.get(E);if(E.version>0&&L.__version!==E.version){jt(L,E,x);return}e.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+x)}function et(E,x){const L=i.get(E);if(E.version>0&&L.__version!==E.version){st(L,E,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+x)}const k={[Kl]:n.REPEAT,[ji]:n.CLAMP_TO_EDGE,[jl]:n.MIRRORED_REPEAT},ft={[dn]:n.NEAREST,[Ng]:n.NEAREST_MIPMAP_NEAREST,[jr]:n.NEAREST_MIPMAP_LINEAR,[yn]:n.LINEAR,[za]:n.LINEAR_MIPMAP_NEAREST,[Zi]:n.LINEAR_MIPMAP_LINEAR},_t={[zg]:n.NEVER,[Xg]:n.ALWAYS,[kg]:n.LESS,[Nd]:n.LEQUAL,[Hg]:n.EQUAL,[Wg]:n.GEQUAL,[Vg]:n.GREATER,[Gg]:n.NOTEQUAL};function xt(E,x){if(x.type===si&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===yn||x.magFilter===za||x.magFilter===jr||x.magFilter===Zi||x.minFilter===yn||x.minFilter===za||x.minFilter===jr||x.minFilter===Zi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,k[x.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,k[x.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,k[x.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,ft[x.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,ft[x.minFilter]),x.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,_t[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===dn||x.minFilter!==jr&&x.minFilter!==Zi||x.type===si&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const L=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Bt(E,x){let L=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",I));const G=x.source;let Y=f.get(G);Y===void 0&&(Y={},f.set(G,Y));const j=$(x);if(j!==E.__cacheKey){Y[j]===void 0&&(Y[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,L=!0),Y[j].usedTimes++;const pt=Y[E.__cacheKey];pt!==void 0&&(Y[E.__cacheKey].usedTimes--,pt.usedTimes===0&&B(x)),E.__cacheKey=j,E.__webglTexture=Y[j].texture}return L}function jt(E,x,L){let G=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=n.TEXTURE_3D);const Y=Bt(E,x),j=x.source;e.bindTexture(G,E.__webglTexture,n.TEXTURE0+L);const pt=i.get(j);if(j.version!==pt.__version||Y===!0){e.activeTexture(n.TEXTURE0+L);const at=re.getPrimaries(re.workingColorSpace),mt=x.colorSpace===Mi?null:re.getPrimaries(x.colorSpace),Nt=x.colorSpace===Mi||at===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let ut=M(x.image,!1,s.maxTextureSize);ut=tt(x,ut);const yt=r.convert(x.format,x.colorSpace),Dt=r.convert(x.type);let zt=b(x.internalFormat,yt,Dt,x.colorSpace,x.isVideoTexture);xt(G,x);let St;const Vt=x.mipmaps,Gt=x.isVideoTexture!==!0,oe=pt.__version===void 0||Y===!0,F=j.dataReady,wt=v(x,ut);if(x.isDepthTexture)zt=_(x.format===Ws,x.type),oe&&(Gt?e.texStorage2D(n.TEXTURE_2D,1,zt,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,zt,ut.width,ut.height,0,yt,Dt,null));else if(x.isDataTexture)if(Vt.length>0){Gt&&oe&&e.texStorage2D(n.TEXTURE_2D,wt,zt,Vt[0].width,Vt[0].height);for(let nt=0,lt=Vt.length;nt<lt;nt++)St=Vt[nt],Gt?F&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,St.width,St.height,yt,Dt,St.data):e.texImage2D(n.TEXTURE_2D,nt,zt,St.width,St.height,0,yt,Dt,St.data);x.generateMipmaps=!1}else Gt?(oe&&e.texStorage2D(n.TEXTURE_2D,wt,zt,ut.width,ut.height),F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,yt,Dt,ut.data)):e.texImage2D(n.TEXTURE_2D,0,zt,ut.width,ut.height,0,yt,Dt,ut.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Gt&&oe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,wt,zt,Vt[0].width,Vt[0].height,ut.depth);for(let nt=0,lt=Vt.length;nt<lt;nt++)if(St=Vt[nt],x.format!==En)if(yt!==null)if(Gt){if(F)if(x.layerUpdates.size>0){const Tt=Xh(St.width,St.height,x.format,x.type);for(const Ct of x.layerUpdates){const Jt=St.data.subarray(Ct*Tt/St.data.BYTES_PER_ELEMENT,(Ct+1)*Tt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,Ct,St.width,St.height,1,yt,Jt,0,0)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,St.width,St.height,ut.depth,yt,St.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,nt,zt,St.width,St.height,ut.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,St.width,St.height,ut.depth,yt,Dt,St.data):e.texImage3D(n.TEXTURE_2D_ARRAY,nt,zt,St.width,St.height,ut.depth,0,yt,Dt,St.data)}else{Gt&&oe&&e.texStorage2D(n.TEXTURE_2D,wt,zt,Vt[0].width,Vt[0].height);for(let nt=0,lt=Vt.length;nt<lt;nt++)St=Vt[nt],x.format!==En?yt!==null?Gt?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,nt,0,0,St.width,St.height,yt,St.data):e.compressedTexImage2D(n.TEXTURE_2D,nt,zt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?F&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,St.width,St.height,yt,Dt,St.data):e.texImage2D(n.TEXTURE_2D,nt,zt,St.width,St.height,0,yt,Dt,St.data)}else if(x.isDataArrayTexture)if(Gt){if(oe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,wt,zt,ut.width,ut.height,ut.depth),F)if(x.layerUpdates.size>0){const nt=Xh(ut.width,ut.height,x.format,x.type);for(const lt of x.layerUpdates){const Tt=ut.data.subarray(lt*nt/ut.data.BYTES_PER_ELEMENT,(lt+1)*nt/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,lt,ut.width,ut.height,1,yt,Dt,Tt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,yt,Dt,ut.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,zt,ut.width,ut.height,ut.depth,0,yt,Dt,ut.data);else if(x.isData3DTexture)Gt?(oe&&e.texStorage3D(n.TEXTURE_3D,wt,zt,ut.width,ut.height,ut.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,yt,Dt,ut.data)):e.texImage3D(n.TEXTURE_3D,0,zt,ut.width,ut.height,ut.depth,0,yt,Dt,ut.data);else if(x.isFramebufferTexture){if(oe)if(Gt)e.texStorage2D(n.TEXTURE_2D,wt,zt,ut.width,ut.height);else{let nt=ut.width,lt=ut.height;for(let Tt=0;Tt<wt;Tt++)e.texImage2D(n.TEXTURE_2D,Tt,zt,nt,lt,0,yt,Dt,null),nt>>=1,lt>>=1}}else if(Vt.length>0){if(Gt&&oe){const nt=q(Vt[0]);e.texStorage2D(n.TEXTURE_2D,wt,zt,nt.width,nt.height)}for(let nt=0,lt=Vt.length;nt<lt;nt++)St=Vt[nt],Gt?F&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,yt,Dt,St):e.texImage2D(n.TEXTURE_2D,nt,zt,yt,Dt,St);x.generateMipmaps=!1}else if(Gt){if(oe){const nt=q(ut);e.texStorage2D(n.TEXTURE_2D,wt,zt,nt.width,nt.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,yt,Dt,ut)}else e.texImage2D(n.TEXTURE_2D,0,zt,yt,Dt,ut);p(x)&&m(G),pt.__version=j.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function st(E,x,L){if(x.image.length!==6)return;const G=Bt(E,x),Y=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+L);const j=i.get(Y);if(Y.version!==j.__version||G===!0){e.activeTexture(n.TEXTURE0+L);const pt=re.getPrimaries(re.workingColorSpace),at=x.colorSpace===Mi?null:re.getPrimaries(x.colorSpace),mt=x.colorSpace===Mi||pt===at?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Nt=x.isCompressedTexture||x.image[0].isCompressedTexture,ut=x.image[0]&&x.image[0].isDataTexture,yt=[];for(let lt=0;lt<6;lt++)!Nt&&!ut?yt[lt]=M(x.image[lt],!0,s.maxCubemapSize):yt[lt]=ut?x.image[lt].image:x.image[lt],yt[lt]=tt(x,yt[lt]);const Dt=yt[0],zt=r.convert(x.format,x.colorSpace),St=r.convert(x.type),Vt=b(x.internalFormat,zt,St,x.colorSpace),Gt=x.isVideoTexture!==!0,oe=j.__version===void 0||G===!0,F=Y.dataReady;let wt=v(x,Dt);xt(n.TEXTURE_CUBE_MAP,x);let nt;if(Nt){Gt&&oe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,wt,Vt,Dt.width,Dt.height);for(let lt=0;lt<6;lt++){nt=yt[lt].mipmaps;for(let Tt=0;Tt<nt.length;Tt++){const Ct=nt[Tt];x.format!==En?zt!==null?Gt?F&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt,0,0,Ct.width,Ct.height,zt,Ct.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt,Vt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt,0,0,Ct.width,Ct.height,zt,St,Ct.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt,Vt,Ct.width,Ct.height,0,zt,St,Ct.data)}}}else{if(nt=x.mipmaps,Gt&&oe){nt.length>0&&wt++;const lt=q(yt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,wt,Vt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(ut){Gt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,yt[lt].width,yt[lt].height,zt,St,yt[lt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Vt,yt[lt].width,yt[lt].height,0,zt,St,yt[lt].data);for(let Tt=0;Tt<nt.length;Tt++){const Jt=nt[Tt].image[lt].image;Gt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt+1,0,0,Jt.width,Jt.height,zt,St,Jt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt+1,Vt,Jt.width,Jt.height,0,zt,St,Jt.data)}}else{Gt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,zt,St,yt[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Vt,zt,St,yt[lt]);for(let Tt=0;Tt<nt.length;Tt++){const Ct=nt[Tt];Gt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt+1,0,0,zt,St,Ct.image[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt+1,Vt,zt,St,Ct.image[lt])}}}p(x)&&m(n.TEXTURE_CUBE_MAP),j.__version=Y.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function dt(E,x,L,G,Y,j){const pt=r.convert(L.format,L.colorSpace),at=r.convert(L.type),mt=b(L.internalFormat,pt,at,L.colorSpace);if(!i.get(x).__hasExternalTextures){const ut=Math.max(1,x.width>>j),yt=Math.max(1,x.height>>j);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?e.texImage3D(Y,j,mt,ut,yt,x.depth,0,pt,at,null):e.texImage2D(Y,j,mt,ut,yt,0,pt,at,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),U(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,Y,i.get(L).__webglTexture,0,O(x)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,Y,i.get(L).__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function bt(E,x,L){if(n.bindRenderbuffer(n.RENDERBUFFER,E),x.depthBuffer){const G=x.depthTexture,Y=G&&G.isDepthTexture?G.type:null,j=_(x.stencilBuffer,Y),pt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=O(x);U(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,j,x.width,x.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,at,j,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,j,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pt,n.RENDERBUFFER,E)}else{const G=x.textures;for(let Y=0;Y<G.length;Y++){const j=G[Y],pt=r.convert(j.format,j.colorSpace),at=r.convert(j.type),mt=b(j.internalFormat,pt,at,j.colorSpace),Nt=O(x);L&&U(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Nt,mt,x.width,x.height):U(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Nt,mt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,mt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Mt(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Q(x.depthTexture,0);const G=i.get(x.depthTexture).__webglTexture,Y=O(x);if(x.depthTexture.format===Os)U(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,G,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,G,0);else if(x.depthTexture.format===Ws)U(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,G,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,G,0);else throw new Error("Unknown depthTexture format")}function Ot(E){const x=i.get(E),L=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){const G=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){const Y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",Y)};G.addEventListener("dispose",Y),x.__depthDisposeCallback=Y}x.__boundDepthTexture=G}if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");Mt(x.__webglFramebuffer,E)}else if(L){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=n.createRenderbuffer(),bt(x.__webglDepthbuffer[G],E,!1);else{const Y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,j)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),bt(x.__webglDepthbuffer,E,!1);else{const G=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,G,n.RENDERBUFFER,Y)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ut(E,x,L){const G=i.get(E);x!==void 0&&dt(G.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&Ot(E)}function Wt(E){const x=E.texture,L=i.get(E),G=i.get(x);E.addEventListener("dispose",P);const Y=E.textures,j=E.isWebGLCubeRenderTarget===!0,pt=Y.length>1;if(pt||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=x.version,o.memory.textures++),j){L.__webglFramebuffer=[];for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer[at]=[];for(let mt=0;mt<x.mipmaps.length;mt++)L.__webglFramebuffer[at][mt]=n.createFramebuffer()}else L.__webglFramebuffer[at]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer=[];for(let at=0;at<x.mipmaps.length;at++)L.__webglFramebuffer[at]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(pt)for(let at=0,mt=Y.length;at<mt;at++){const Nt=i.get(Y[at]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&U(E)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let at=0;at<Y.length;at++){const mt=Y[at];L.__webglColorRenderbuffer[at]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[at]);const Nt=r.convert(mt.format,mt.colorSpace),ut=r.convert(mt.type),yt=b(mt.internalFormat,Nt,ut,mt.colorSpace,E.isXRRenderTarget===!0),Dt=O(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,yt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,L.__webglColorRenderbuffer[at])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),bt(L.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),xt(n.TEXTURE_CUBE_MAP,x);for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0)for(let mt=0;mt<x.mipmaps.length;mt++)dt(L.__webglFramebuffer[at][mt],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,mt);else dt(L.__webglFramebuffer[at],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);p(x)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let at=0,mt=Y.length;at<mt;at++){const Nt=Y[at],ut=i.get(Nt);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),xt(n.TEXTURE_2D,Nt),dt(L.__webglFramebuffer,E,Nt,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,0),p(Nt)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let at=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(at=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(at,G.__webglTexture),xt(at,x),x.mipmaps&&x.mipmaps.length>0)for(let mt=0;mt<x.mipmaps.length;mt++)dt(L.__webglFramebuffer[mt],E,x,n.COLOR_ATTACHMENT0,at,mt);else dt(L.__webglFramebuffer,E,x,n.COLOR_ATTACHMENT0,at,0);p(x)&&m(at),e.unbindTexture()}E.depthBuffer&&Ot(E)}function C(E){const x=E.textures;for(let L=0,G=x.length;L<G;L++){const Y=x[L];if(p(Y)){const j=E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,pt=i.get(Y).__webglTexture;e.bindTexture(j,pt),m(j),e.unbindTexture()}}}const w=[],S=[];function H(E){if(E.samples>0){if(U(E)===!1){const x=E.textures,L=E.width,G=E.height;let Y=n.COLOR_BUFFER_BIT;const j=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(E),at=x.length>1;if(at)for(let mt=0;mt<x.length;mt++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let mt=0;mt<x.length;mt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),at){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);const Nt=i.get(x[mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Nt,0)}n.blitFramebuffer(0,0,L,G,0,0,L,G,Y,n.NEAREST),l===!0&&(w.length=0,S.length=0,w.push(n.COLOR_ATTACHMENT0+mt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(w.push(j),S.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,S)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,w))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),at)for(let mt=0;mt<x.length;mt++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);const Nt=i.get(x[mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,Nt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const x=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function O(E){return Math.min(s.maxSamples,E.samples)}function U(E){const x=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function X(E){const x=o.render.frame;u.get(E)!==x&&(u.set(E,x),E.update())}function tt(E,x){const L=E.colorSpace,G=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||L!==Pi&&L!==Mi&&(re.getTransfer(L)===pe?(G!==En||Y!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),x}function q(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=T,this.setTexture2D=Q,this.setTexture2DArray=rt,this.setTexture3D=W,this.setTextureCube=et,this.rebindTextures=Ut,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=C,this.updateMultisampleRenderTarget=H,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=U}function hS(n,t){function e(i,s=Mi){let r;const o=re.getTransfer(s);if(i===ai)return n.UNSIGNED_BYTE;if(i===Yc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===qc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ad)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===bd)return n.BYTE;if(i===Td)return n.SHORT;if(i===Lr)return n.UNSIGNED_SHORT;if(i===$c)return n.INT;if(i===is)return n.UNSIGNED_INT;if(i===si)return n.FLOAT;if(i===kr)return n.HALF_FLOAT;if(i===wd)return n.ALPHA;if(i===Cd)return n.RGB;if(i===En)return n.RGBA;if(i===Rd)return n.LUMINANCE;if(i===Pd)return n.LUMINANCE_ALPHA;if(i===Os)return n.DEPTH_COMPONENT;if(i===Ws)return n.DEPTH_STENCIL;if(i===Ld)return n.RED;if(i===Kc)return n.RED_INTEGER;if(i===Dd)return n.RG;if(i===jc)return n.RG_INTEGER;if(i===Zc)return n.RGBA_INTEGER;if(i===Po||i===Lo||i===Do||i===Io)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Do)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Lo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Do)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Io)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Zl||i===Jl||i===Ql||i===tc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Zl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Jl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ql)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===tc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ec||i===nc||i===ic)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ec||i===nc)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ic)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===sc||i===rc||i===oc||i===ac||i===lc||i===cc||i===uc||i===hc||i===fc||i===dc||i===pc||i===mc||i===_c||i===gc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===sc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===rc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===oc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ac)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===lc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===uc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===dc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===mc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_c)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===gc)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uo||i===vc||i===xc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Uo)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Id||i===Mc||i===yc||i===Sc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Uo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Mc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Gs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class fS extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ar extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dS={type:"move"};class dl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ar,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ar,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ar,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const M of t.hand.values()){const p=e.getJointPose(M,i),m=this._getHandJoint(c,M);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dS)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ar;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const pS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mS=`
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

}`;class _S{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new tn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ci({vertexShader:pS,fragmentShader:mS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ae(new Vr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gS extends ls{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const M=new _S,p=e.getContextAttributes();let m=null,b=null;const _=[],v=[],I=new vt;let P=null;const R=new hn;R.layers.enable(1),R.viewport=new ye;const B=new hn;B.layers.enable(2),B.viewport=new ye;const it=[R,B],y=new fS;y.layers.enable(1),y.layers.enable(2);let T=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let dt=_[st];return dt===void 0&&(dt=new dl,_[st]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(st){let dt=_[st];return dt===void 0&&(dt=new dl,_[st]=dt),dt.getGripSpace()},this.getHand=function(st){let dt=_[st];return dt===void 0&&(dt=new dl,_[st]=dt),dt.getHandSpace()};function $(st){const dt=v.indexOf(st.inputSource);if(dt===-1)return;const bt=_[dt];bt!==void 0&&(bt.update(st.inputSource,st.frame,c||o),bt.dispatchEvent({type:st.type,data:st.inputSource}))}function Q(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",rt);for(let st=0;st<_.length;st++){const dt=v[st];dt!==null&&(v[st]=null,_[st].disconnect(dt))}T=null,K=null,M.reset(),t.setRenderTarget(m),d=null,f=null,h=null,s=null,b=null,jt.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){r=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){a=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(st){c=st},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(st){if(s=st,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",rt),p.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){const dt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,dt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new ss(d.framebufferWidth,d.framebufferHeight,{format:En,type:ai,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let dt=null,bt=null,Mt=null;p.depth&&(Mt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=p.stencil?Ws:Os,bt=p.stencil?Gs:is);const Ot={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};h=new XRWebGLBinding(s,e),f=h.createProjectionLayer(Ot),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new ss(f.textureWidth,f.textureHeight,{format:En,type:ai,depthTexture:new qd(f.textureWidth,f.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),jt.setContext(s),jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function rt(st){for(let dt=0;dt<st.removed.length;dt++){const bt=st.removed[dt],Mt=v.indexOf(bt);Mt>=0&&(v[Mt]=null,_[Mt].disconnect(bt))}for(let dt=0;dt<st.added.length;dt++){const bt=st.added[dt];let Mt=v.indexOf(bt);if(Mt===-1){for(let Ut=0;Ut<_.length;Ut++)if(Ut>=v.length){v.push(bt),Mt=Ut;break}else if(v[Ut]===null){v[Ut]=bt,Mt=Ut;break}if(Mt===-1)break}const Ot=_[Mt];Ot&&Ot.connect(bt)}}const W=new N,et=new N;function k(st,dt,bt){W.setFromMatrixPosition(dt.matrixWorld),et.setFromMatrixPosition(bt.matrixWorld);const Mt=W.distanceTo(et),Ot=dt.projectionMatrix.elements,Ut=bt.projectionMatrix.elements,Wt=Ot[14]/(Ot[10]-1),C=Ot[14]/(Ot[10]+1),w=(Ot[9]+1)/Ot[5],S=(Ot[9]-1)/Ot[5],H=(Ot[8]-1)/Ot[0],O=(Ut[8]+1)/Ut[0],U=Wt*H,X=Wt*O,tt=Mt/(-H+O),q=tt*-H;if(dt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(q),st.translateZ(tt),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),Ot[10]===-1)st.projectionMatrix.copy(dt.projectionMatrix),st.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const E=Wt+tt,x=C+tt,L=U-q,G=X+(Mt-q),Y=w*C/x*E,j=S*C/x*E;st.projectionMatrix.makePerspective(L,G,Y,j,E,x),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function ft(st,dt){dt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(dt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(s===null)return;let dt=st.near,bt=st.far;M.texture!==null&&(M.depthNear>0&&(dt=M.depthNear),M.depthFar>0&&(bt=M.depthFar)),y.near=B.near=R.near=dt,y.far=B.far=R.far=bt,(T!==y.near||K!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),T=y.near,K=y.far);const Mt=st.parent,Ot=y.cameras;ft(y,Mt);for(let Ut=0;Ut<Ot.length;Ut++)ft(Ot[Ut],Mt);Ot.length===2?k(y,R,B):y.projectionMatrix.copy(R.projectionMatrix),_t(st,y,Mt)};function _t(st,dt,bt){bt===null?st.matrix.copy(dt.matrixWorld):(st.matrix.copy(bt.matrixWorld),st.matrix.invert(),st.matrix.multiply(dt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(dt.projectionMatrix),st.projectionMatrixInverse.copy(dt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=Dr*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(st){l=st,f!==null&&(f.fixedFoveation=st),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=st)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(y)};let xt=null;function Bt(st,dt){if(u=dt.getViewerPose(c||o),g=dt,u!==null){const bt=u.views;d!==null&&(t.setRenderTargetFramebuffer(b,d.framebuffer),t.setRenderTarget(b));let Mt=!1;bt.length!==y.cameras.length&&(y.cameras.length=0,Mt=!0);for(let Ut=0;Ut<bt.length;Ut++){const Wt=bt[Ut];let C=null;if(d!==null)C=d.getViewport(Wt);else{const S=h.getViewSubImage(f,Wt);C=S.viewport,Ut===0&&(t.setRenderTargetTextures(b,S.colorTexture,f.ignoreDepthValues?void 0:S.depthStencilTexture),t.setRenderTarget(b))}let w=it[Ut];w===void 0&&(w=new hn,w.layers.enable(Ut),w.viewport=new ye,it[Ut]=w),w.matrix.fromArray(Wt.transform.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale),w.projectionMatrix.fromArray(Wt.projectionMatrix),w.projectionMatrixInverse.copy(w.projectionMatrix).invert(),w.viewport.set(C.x,C.y,C.width,C.height),Ut===0&&(y.matrix.copy(w.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Mt===!0&&y.cameras.push(w)}const Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")){const Ut=h.getDepthInformation(bt[0]);Ut&&Ut.isValid&&Ut.texture&&M.init(t,Ut,s.renderState)}}for(let bt=0;bt<_.length;bt++){const Mt=v[bt],Ot=_[bt];Mt!==null&&Ot!==void 0&&Ot.update(Mt,dt,c||o)}xt&&xt(st,dt),dt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:dt}),g=null}const jt=new $d;jt.setAnimationLoop(Bt),this.setAnimationLoop=function(st){xt=st},this.dispose=function(){}}}const ki=new Vn,vS=new ge;function xS(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Gd(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,b,_,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),h(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),M(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,b,_):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Qe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Qe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const b=t.get(m),_=b.envMap,v=b.envMapRotation;_&&(p.envMap.value=_,ki.copy(v),ki.x*=-1,ki.y*=-1,ki.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),p.envMapRotation.value.setFromMatrix4(vS.makeRotationFromEuler(ki)),p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,b,_){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*b,p.scale.value=_*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,b){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qe&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function M(p,m){const b=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function MS(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,_){const v=_.program;i.uniformBlockBinding(b,v)}function c(b,_){let v=s[b.id];v===void 0&&(g(b),v=u(b),s[b.id]=v,b.addEventListener("dispose",p));const I=_.program;i.updateUBOMapping(b,I);const P=t.render.frame;r[b.id]!==P&&(f(b),r[b.id]=P)}function u(b){const _=h();b.__bindingPointIndex=_;const v=n.createBuffer(),I=b.__size,P=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,I,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,v),v}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const _=s[b.id],v=b.uniforms,I=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let P=0,R=v.length;P<R;P++){const B=Array.isArray(v[P])?v[P]:[v[P]];for(let it=0,y=B.length;it<y;it++){const T=B[it];if(d(T,P,it,I)===!0){const K=T.__offset,$=Array.isArray(T.value)?T.value:[T.value];let Q=0;for(let rt=0;rt<$.length;rt++){const W=$[rt],et=M(W);typeof W=="number"||typeof W=="boolean"?(T.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,K+Q,T.__data)):W.isMatrix3?(T.__data[0]=W.elements[0],T.__data[1]=W.elements[1],T.__data[2]=W.elements[2],T.__data[3]=0,T.__data[4]=W.elements[3],T.__data[5]=W.elements[4],T.__data[6]=W.elements[5],T.__data[7]=0,T.__data[8]=W.elements[6],T.__data[9]=W.elements[7],T.__data[10]=W.elements[8],T.__data[11]=0):(W.toArray(T.__data,Q),Q+=et.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,K,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(b,_,v,I){const P=b.value,R=_+"_"+v;if(I[R]===void 0)return typeof P=="number"||typeof P=="boolean"?I[R]=P:I[R]=P.clone(),!0;{const B=I[R];if(typeof P=="number"||typeof P=="boolean"){if(B!==P)return I[R]=P,!0}else if(B.equals(P)===!1)return B.copy(P),!0}return!1}function g(b){const _=b.uniforms;let v=0;const I=16;for(let R=0,B=_.length;R<B;R++){const it=Array.isArray(_[R])?_[R]:[_[R]];for(let y=0,T=it.length;y<T;y++){const K=it[y],$=Array.isArray(K.value)?K.value:[K.value];for(let Q=0,rt=$.length;Q<rt;Q++){const W=$[Q],et=M(W),k=v%I,ft=k%et.boundary,_t=k+ft;v+=ft,_t!==0&&I-_t<et.storage&&(v+=I-_t),K.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=v,v+=et.storage}}}const P=v%I;return P>0&&(v+=I-P),b.__size=v,b.__cache={},this}function M(b){const _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),_}function p(b){const _=b.target;_.removeEventListener("dispose",p);const v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function m(){for(const b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class yS{constructor(t={}){const{canvas:e=lv(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const d=new Uint32Array(4),g=new Int32Array(4);let M=null,p=null;const m=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rn,this.toneMapping=bi,this.toneMappingExposure=1;const _=this;let v=!1,I=0,P=0,R=null,B=-1,it=null;const y=new ye,T=new ye;let K=null;const $=new Zt(0);let Q=0,rt=e.width,W=e.height,et=1,k=null,ft=null;const _t=new ye(0,0,rt,W),xt=new ye(0,0,rt,W);let Bt=!1;const jt=new eu;let st=!1,dt=!1;const bt=new ge,Mt=new ge,Ot=new N,Ut=new ye,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let C=!1;function w(){return R===null?et:1}let S=i;function H(A,z){return e.getContext(A,z)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Wc}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",Ct,!1),S===null){const z="webgl2";if(S=H(z,A),S===null)throw H(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let O,U,X,tt,q,E,x,L,G,Y,j,pt,at,mt,Nt,ut,yt,Dt,zt,St,Vt,Gt,oe,F;function wt(){O=new AM(S),O.init(),Gt=new hS(S,O),U=new MM(S,O,t,Gt),X=new lS(S),U.reverseDepthBuffer&&X.buffers.depth.setReversed(!0),tt=new RM(S),q=new Yy,E=new uS(S,O,X,q,U,Gt,tt),x=new SM(_),L=new TM(_),G=new Ov(S),oe=new vM(S,G),Y=new wM(S,G,tt,oe),j=new LM(S,Y,G,tt),zt=new PM(S,U,E),ut=new yM(q),pt=new $y(_,x,L,O,U,oe,ut),at=new xS(_,q),mt=new Ky,Nt=new eS(O),Dt=new gM(_,x,L,X,j,f,l),yt=new oS(_,j,U),F=new MS(S,tt,U,X),St=new xM(S,O,tt),Vt=new CM(S,O,tt),tt.programs=pt.programs,_.capabilities=U,_.extensions=O,_.properties=q,_.renderLists=mt,_.shadowMap=yt,_.state=X,_.info=tt}wt();const nt=new gS(_,S);this.xr=nt,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){const A=O.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=O.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(A){A!==void 0&&(et=A,this.setSize(rt,W,!1))},this.getSize=function(A){return A.set(rt,W)},this.setSize=function(A,z,Z=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}rt=A,W=z,e.width=Math.floor(A*et),e.height=Math.floor(z*et),Z===!0&&(e.style.width=A+"px",e.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(rt*et,W*et).floor()},this.setDrawingBufferSize=function(A,z,Z){rt=A,W=z,et=Z,e.width=Math.floor(A*Z),e.height=Math.floor(z*Z),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(y)},this.getViewport=function(A){return A.copy(_t)},this.setViewport=function(A,z,Z,J){A.isVector4?_t.set(A.x,A.y,A.z,A.w):_t.set(A,z,Z,J),X.viewport(y.copy(_t).multiplyScalar(et).round())},this.getScissor=function(A){return A.copy(xt)},this.setScissor=function(A,z,Z,J){A.isVector4?xt.set(A.x,A.y,A.z,A.w):xt.set(A,z,Z,J),X.scissor(T.copy(xt).multiplyScalar(et).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(A){X.setScissorTest(Bt=A)},this.setOpaqueSort=function(A){k=A},this.setTransparentSort=function(A){ft=A},this.getClearColor=function(A){return A.copy(Dt.getClearColor())},this.setClearColor=function(){Dt.setClearColor.apply(Dt,arguments)},this.getClearAlpha=function(){return Dt.getClearAlpha()},this.setClearAlpha=function(){Dt.setClearAlpha.apply(Dt,arguments)},this.clear=function(A=!0,z=!0,Z=!0){let J=0;if(A){let V=!1;if(R!==null){const gt=R.texture.format;V=gt===Zc||gt===jc||gt===Kc}if(V){const gt=R.texture.type,At=gt===ai||gt===is||gt===Lr||gt===Gs||gt===Yc||gt===qc,Rt=Dt.getClearColor(),Pt=Dt.getClearAlpha(),kt=Rt.r,Ht=Rt.g,Lt=Rt.b;At?(d[0]=kt,d[1]=Ht,d[2]=Lt,d[3]=Pt,S.clearBufferuiv(S.COLOR,0,d)):(g[0]=kt,g[1]=Ht,g[2]=Lt,g[3]=Pt,S.clearBufferiv(S.COLOR,0,g))}else J|=S.COLOR_BUFFER_BIT}z&&(J|=S.DEPTH_BUFFER_BIT,S.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Z&&(J|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),mt.dispose(),Nt.dispose(),q.dispose(),x.dispose(),L.dispose(),j.dispose(),oe.dispose(),F.dispose(),pt.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",uu),nt.removeEventListener("sessionend",hu),Di.stop()};function lt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const A=tt.autoReset,z=yt.enabled,Z=yt.autoUpdate,J=yt.needsUpdate,V=yt.type;wt(),tt.autoReset=A,yt.enabled=z,yt.autoUpdate=Z,yt.needsUpdate=J,yt.type=V}function Ct(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Jt(A){const z=A.target;z.removeEventListener("dispose",Jt),be(z)}function be(A){Ke(A),q.remove(A)}function Ke(A){const z=q.get(A).programs;z!==void 0&&(z.forEach(function(Z){pt.releaseProgram(Z)}),A.isShaderMaterial&&pt.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,Z,J,V,gt){z===null&&(z=Wt);const At=V.isMesh&&V.matrixWorld.determinant()<0,Rt=mp(A,z,Z,J,V);X.setMaterial(J,At);let Pt=Z.index,kt=1;if(J.wireframe===!0){if(Pt=Y.getWireframeAttribute(Z),Pt===void 0)return;kt=2}const Ht=Z.drawRange,Lt=Z.attributes.position;let ae=Ht.start*kt,de=(Ht.start+Ht.count)*kt;gt!==null&&(ae=Math.max(ae,gt.start*kt),de=Math.min(de,(gt.start+gt.count)*kt)),Pt!==null?(ae=Math.max(ae,0),de=Math.min(de,Pt.count)):Lt!=null&&(ae=Math.max(ae,0),de=Math.min(de,Lt.count));const xe=de-ae;if(xe<0||xe===1/0)return;oe.setup(V,J,Rt,Z,Pt);let en,ee=St;if(Pt!==null&&(en=G.get(Pt),ee=Vt,ee.setIndex(en)),V.isMesh)J.wireframe===!0?(X.setLineWidth(J.wireframeLinewidth*w()),ee.setMode(S.LINES)):ee.setMode(S.TRIANGLES);else if(V.isLine){let It=J.linewidth;It===void 0&&(It=1),X.setLineWidth(It*w()),V.isLineSegments?ee.setMode(S.LINES):V.isLineLoop?ee.setMode(S.LINE_LOOP):ee.setMode(S.LINE_STRIP)}else V.isPoints?ee.setMode(S.POINTS):V.isSprite&&ee.setMode(S.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)ee.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(O.get("WEBGL_multi_draw"))ee.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const It=V._multiDrawStarts,Ne=V._multiDrawCounts,ne=V._multiDrawCount,_n=Pt?G.get(Pt).bytesPerElement:1,us=q.get(J).currentProgram.getUniforms();for(let nn=0;nn<ne;nn++)us.setValue(S,"_gl_DrawID",nn),ee.render(It[nn]/_n,Ne[nn])}else if(V.isInstancedMesh)ee.renderInstances(ae,xe,V.count);else if(Z.isInstancedBufferGeometry){const It=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ne=Math.min(Z.instanceCount,It);ee.renderInstances(ae,xe,Ne)}else ee.render(ae,xe)};function Qt(A,z,Z){A.transparent===!0&&A.side===Nn&&A.forceSinglePass===!1?(A.side=Qe,A.needsUpdate=!0,Wr(A,z,Z),A.side=wi,A.needsUpdate=!0,Wr(A,z,Z),A.side=Nn):Wr(A,z,Z)}this.compile=function(A,z,Z=null){Z===null&&(Z=A),p=Nt.get(Z),p.init(z),b.push(p),Z.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),A!==Z&&A.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const J=new Set;return A.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const gt=V.material;if(gt)if(Array.isArray(gt))for(let At=0;At<gt.length;At++){const Rt=gt[At];Qt(Rt,Z,V),J.add(Rt)}else Qt(gt,Z,V),J.add(gt)}),b.pop(),p=null,J},this.compileAsync=function(A,z,Z=null){const J=this.compile(A,z,Z);return new Promise(V=>{function gt(){if(J.forEach(function(At){q.get(At).currentProgram.isReady()&&J.delete(At)}),J.size===0){V(A);return}setTimeout(gt,10)}O.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let je=null;function Wn(A){je&&je(A)}function uu(){Di.stop()}function hu(){Di.start()}const Di=new $d;Di.setAnimationLoop(Wn),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(A){je=A,nt.setAnimationLoop(A),A===null?Di.stop():Di.start()},nt.addEventListener("sessionstart",uu),nt.addEventListener("sessionend",hu),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(z),z=nt.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,z,R),p=Nt.get(A,b.length),p.init(z),b.push(p),Mt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),jt.setFromProjectionMatrix(Mt),dt=this.localClippingEnabled,st=ut.init(this.clippingPlanes,dt),M=mt.get(A,m.length),M.init(),m.push(M),nt.enabled===!0&&nt.isPresenting===!0){const gt=_.xr.getDepthSensingMesh();gt!==null&&ya(gt,z,-1/0,_.sortObjects)}ya(A,z,0,_.sortObjects),M.finish(),_.sortObjects===!0&&M.sort(k,ft),C=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,C&&Dt.addToRenderList(M,A),this.info.render.frame++,st===!0&&ut.beginShadows();const Z=p.state.shadowsArray;yt.render(Z,A,z),st===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=M.opaque,V=M.transmissive;if(p.setupLights(),z.isArrayCamera){const gt=z.cameras;if(V.length>0)for(let At=0,Rt=gt.length;At<Rt;At++){const Pt=gt[At];du(J,V,A,Pt)}C&&Dt.render(A);for(let At=0,Rt=gt.length;At<Rt;At++){const Pt=gt[At];fu(M,A,Pt,Pt.viewport)}}else V.length>0&&du(J,V,A,z),C&&Dt.render(A),fu(M,A,z);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(_,A,z),oe.resetDefaultState(),B=-1,it=null,b.pop(),b.length>0?(p=b[b.length-1],st===!0&&ut.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?M=m[m.length-1]:M=null};function ya(A,z,Z,J){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||jt.intersectsSprite(A)){J&&Ut.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Mt);const At=j.update(A),Rt=A.material;Rt.visible&&M.push(A,At,Rt,Z,Ut.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||jt.intersectsObject(A))){const At=j.update(A),Rt=A.material;if(J&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ut.copy(A.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),Ut.copy(At.boundingSphere.center)),Ut.applyMatrix4(A.matrixWorld).applyMatrix4(Mt)),Array.isArray(Rt)){const Pt=At.groups;for(let kt=0,Ht=Pt.length;kt<Ht;kt++){const Lt=Pt[kt],ae=Rt[Lt.materialIndex];ae&&ae.visible&&M.push(A,At,ae,Z,Ut.z,Lt)}}else Rt.visible&&M.push(A,At,Rt,Z,Ut.z,null)}}const gt=A.children;for(let At=0,Rt=gt.length;At<Rt;At++)ya(gt[At],z,Z,J)}function fu(A,z,Z,J){const V=A.opaque,gt=A.transmissive,At=A.transparent;p.setupLightsView(Z),st===!0&&ut.setGlobalState(_.clippingPlanes,Z),J&&X.viewport(y.copy(J)),V.length>0&&Gr(V,z,Z),gt.length>0&&Gr(gt,z,Z),At.length>0&&Gr(At,z,Z),X.buffers.depth.setTest(!0),X.buffers.depth.setMask(!0),X.buffers.color.setMask(!0),X.setPolygonOffset(!1)}function du(A,z,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new ss(1,1,{generateMipmaps:!0,type:O.has("EXT_color_buffer_half_float")||O.has("EXT_color_buffer_float")?kr:ai,minFilter:Zi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const gt=p.state.transmissionRenderTarget[J.id],At=J.viewport||y;gt.setSize(At.z,At.w);const Rt=_.getRenderTarget();_.setRenderTarget(gt),_.getClearColor($),Q=_.getClearAlpha(),Q<1&&_.setClearColor(16777215,.5),_.clear(),C&&Dt.render(Z);const Pt=_.toneMapping;_.toneMapping=bi;const kt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),st===!0&&ut.setGlobalState(_.clippingPlanes,J),Gr(A,Z,J),E.updateMultisampleRenderTarget(gt),E.updateRenderTargetMipmap(gt),O.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Lt=0,ae=z.length;Lt<ae;Lt++){const de=z[Lt],xe=de.object,en=de.geometry,ee=de.material,It=de.group;if(ee.side===Nn&&xe.layers.test(J.layers)){const Ne=ee.side;ee.side=Qe,ee.needsUpdate=!0,pu(xe,Z,J,en,ee,It),ee.side=Ne,ee.needsUpdate=!0,Ht=!0}}Ht===!0&&(E.updateMultisampleRenderTarget(gt),E.updateRenderTargetMipmap(gt))}_.setRenderTarget(Rt),_.setClearColor($,Q),kt!==void 0&&(J.viewport=kt),_.toneMapping=Pt}function Gr(A,z,Z){const J=z.isScene===!0?z.overrideMaterial:null;for(let V=0,gt=A.length;V<gt;V++){const At=A[V],Rt=At.object,Pt=At.geometry,kt=J===null?At.material:J,Ht=At.group;Rt.layers.test(Z.layers)&&pu(Rt,z,Z,Pt,kt,Ht)}}function pu(A,z,Z,J,V,gt){A.onBeforeRender(_,z,Z,J,V,gt),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(_,z,Z,J,A,gt),V.transparent===!0&&V.side===Nn&&V.forceSinglePass===!1?(V.side=Qe,V.needsUpdate=!0,_.renderBufferDirect(Z,z,J,V,A,gt),V.side=wi,V.needsUpdate=!0,_.renderBufferDirect(Z,z,J,V,A,gt),V.side=Nn):_.renderBufferDirect(Z,z,J,V,A,gt),A.onAfterRender(_,z,Z,J,V,gt)}function Wr(A,z,Z){z.isScene!==!0&&(z=Wt);const J=q.get(A),V=p.state.lights,gt=p.state.shadowsArray,At=V.state.version,Rt=pt.getParameters(A,V.state,gt,z,Z),Pt=pt.getProgramCacheKey(Rt);let kt=J.programs;J.environment=A.isMeshStandardMaterial?z.environment:null,J.fog=z.fog,J.envMap=(A.isMeshStandardMaterial?L:x).get(A.envMap||J.environment),J.envMapRotation=J.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,kt===void 0&&(A.addEventListener("dispose",Jt),kt=new Map,J.programs=kt);let Ht=kt.get(Pt);if(Ht!==void 0){if(J.currentProgram===Ht&&J.lightsStateVersion===At)return _u(A,Rt),Ht}else Rt.uniforms=pt.getUniforms(A),A.onBeforeCompile(Rt,_),Ht=pt.acquireProgram(Rt,Pt),kt.set(Pt,Ht),J.uniforms=Rt.uniforms;const Lt=J.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Lt.clippingPlanes=ut.uniform),_u(A,Rt),J.needsLights=gp(A),J.lightsStateVersion=At,J.needsLights&&(Lt.ambientLightColor.value=V.state.ambient,Lt.lightProbe.value=V.state.probe,Lt.directionalLights.value=V.state.directional,Lt.directionalLightShadows.value=V.state.directionalShadow,Lt.spotLights.value=V.state.spot,Lt.spotLightShadows.value=V.state.spotShadow,Lt.rectAreaLights.value=V.state.rectArea,Lt.ltc_1.value=V.state.rectAreaLTC1,Lt.ltc_2.value=V.state.rectAreaLTC2,Lt.pointLights.value=V.state.point,Lt.pointLightShadows.value=V.state.pointShadow,Lt.hemisphereLights.value=V.state.hemi,Lt.directionalShadowMap.value=V.state.directionalShadowMap,Lt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Lt.spotShadowMap.value=V.state.spotShadowMap,Lt.spotLightMatrix.value=V.state.spotLightMatrix,Lt.spotLightMap.value=V.state.spotLightMap,Lt.pointShadowMap.value=V.state.pointShadowMap,Lt.pointShadowMatrix.value=V.state.pointShadowMatrix),J.currentProgram=Ht,J.uniformsList=null,Ht}function mu(A){if(A.uniformsList===null){const z=A.currentProgram.getUniforms();A.uniformsList=Oo.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function _u(A,z){const Z=q.get(A);Z.outputColorSpace=z.outputColorSpace,Z.batching=z.batching,Z.batchingColor=z.batchingColor,Z.instancing=z.instancing,Z.instancingColor=z.instancingColor,Z.instancingMorph=z.instancingMorph,Z.skinning=z.skinning,Z.morphTargets=z.morphTargets,Z.morphNormals=z.morphNormals,Z.morphColors=z.morphColors,Z.morphTargetsCount=z.morphTargetsCount,Z.numClippingPlanes=z.numClippingPlanes,Z.numIntersection=z.numClipIntersection,Z.vertexAlphas=z.vertexAlphas,Z.vertexTangents=z.vertexTangents,Z.toneMapping=z.toneMapping}function mp(A,z,Z,J,V){z.isScene!==!0&&(z=Wt),E.resetTextureUnits();const gt=z.fog,At=J.isMeshStandardMaterial?z.environment:null,Rt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Pi,Pt=(J.isMeshStandardMaterial?L:x).get(J.envMap||At),kt=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ht=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Lt=!!Z.morphAttributes.position,ae=!!Z.morphAttributes.normal,de=!!Z.morphAttributes.color;let xe=bi;J.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(xe=_.toneMapping);const en=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ee=en!==void 0?en.length:0,It=q.get(J),Ne=p.state.lights;if(st===!0&&(dt===!0||A!==it)){const cn=A===it&&J.id===B;ut.setState(J,A,cn)}let ne=!1;J.version===It.__version?(It.needsLights&&It.lightsStateVersion!==Ne.state.version||It.outputColorSpace!==Rt||V.isBatchedMesh&&It.batching===!1||!V.isBatchedMesh&&It.batching===!0||V.isBatchedMesh&&It.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&It.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&It.instancing===!1||!V.isInstancedMesh&&It.instancing===!0||V.isSkinnedMesh&&It.skinning===!1||!V.isSkinnedMesh&&It.skinning===!0||V.isInstancedMesh&&It.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&It.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&It.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&It.instancingMorph===!1&&V.morphTexture!==null||It.envMap!==Pt||J.fog===!0&&It.fog!==gt||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==ut.numPlanes||It.numIntersection!==ut.numIntersection)||It.vertexAlphas!==kt||It.vertexTangents!==Ht||It.morphTargets!==Lt||It.morphNormals!==ae||It.morphColors!==de||It.toneMapping!==xe||It.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,It.__version=J.version);let _n=It.currentProgram;ne===!0&&(_n=Wr(J,z,V));let us=!1,nn=!1,Sa=!1;const Ee=_n.getUniforms(),ci=It.uniforms;if(X.useProgram(_n.program)&&(us=!0,nn=!0,Sa=!0),J.id!==B&&(B=J.id,nn=!0),us||it!==A){U.reverseDepthBuffer?(bt.copy(A.projectionMatrix),uv(bt),hv(bt),Ee.setValue(S,"projectionMatrix",bt)):Ee.setValue(S,"projectionMatrix",A.projectionMatrix),Ee.setValue(S,"viewMatrix",A.matrixWorldInverse);const cn=Ee.map.cameraPosition;cn!==void 0&&cn.setValue(S,Ot.setFromMatrixPosition(A.matrixWorld)),U.logarithmicDepthBuffer&&Ee.setValue(S,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Ee.setValue(S,"isOrthographic",A.isOrthographicCamera===!0),it!==A&&(it=A,nn=!0,Sa=!0)}if(V.isSkinnedMesh){Ee.setOptional(S,V,"bindMatrix"),Ee.setOptional(S,V,"bindMatrixInverse");const cn=V.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Ee.setValue(S,"boneTexture",cn.boneTexture,E))}V.isBatchedMesh&&(Ee.setOptional(S,V,"batchingTexture"),Ee.setValue(S,"batchingTexture",V._matricesTexture,E),Ee.setOptional(S,V,"batchingIdTexture"),Ee.setValue(S,"batchingIdTexture",V._indirectTexture,E),Ee.setOptional(S,V,"batchingColorTexture"),V._colorsTexture!==null&&Ee.setValue(S,"batchingColorTexture",V._colorsTexture,E));const Ea=Z.morphAttributes;if((Ea.position!==void 0||Ea.normal!==void 0||Ea.color!==void 0)&&zt.update(V,Z,_n),(nn||It.receiveShadow!==V.receiveShadow)&&(It.receiveShadow=V.receiveShadow,Ee.setValue(S,"receiveShadow",V.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(ci.envMap.value=Pt,ci.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&z.environment!==null&&(ci.envMapIntensity.value=z.environmentIntensity),nn&&(Ee.setValue(S,"toneMappingExposure",_.toneMappingExposure),It.needsLights&&_p(ci,Sa),gt&&J.fog===!0&&at.refreshFogUniforms(ci,gt),at.refreshMaterialUniforms(ci,J,et,W,p.state.transmissionRenderTarget[A.id]),Oo.upload(S,mu(It),ci,E)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Oo.upload(S,mu(It),ci,E),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Ee.setValue(S,"center",V.center),Ee.setValue(S,"modelViewMatrix",V.modelViewMatrix),Ee.setValue(S,"normalMatrix",V.normalMatrix),Ee.setValue(S,"modelMatrix",V.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const cn=J.uniformsGroups;for(let ba=0,vp=cn.length;ba<vp;ba++){const gu=cn[ba];F.update(gu,_n),F.bind(gu,_n)}}return _n}function _p(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function gp(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,z,Z){q.get(A.texture).__webglTexture=z,q.get(A.depthTexture).__webglTexture=Z;const J=q.get(A);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||O.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,z){const Z=q.get(A);Z.__webglFramebuffer=z,Z.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(A,z=0,Z=0){R=A,I=z,P=Z;let J=!0,V=null,gt=!1,At=!1;if(A){const Pt=q.get(A);if(Pt.__useDefaultFramebuffer!==void 0)X.bindFramebuffer(S.FRAMEBUFFER,null),J=!1;else if(Pt.__webglFramebuffer===void 0)E.setupRenderTarget(A);else if(Pt.__hasExternalTextures)E.rebindTextures(A,q.get(A.texture).__webglTexture,q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Lt=A.depthTexture;if(Pt.__boundDepthTexture!==Lt){if(Lt!==null&&q.has(Lt)&&(A.width!==Lt.image.width||A.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(A)}}const kt=A.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(At=!0);const Ht=q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ht[z])?V=Ht[z][Z]:V=Ht[z],gt=!0):A.samples>0&&E.useMultisampledRTT(A)===!1?V=q.get(A).__webglMultisampledFramebuffer:Array.isArray(Ht)?V=Ht[Z]:V=Ht,y.copy(A.viewport),T.copy(A.scissor),K=A.scissorTest}else y.copy(_t).multiplyScalar(et).floor(),T.copy(xt).multiplyScalar(et).floor(),K=Bt;if(X.bindFramebuffer(S.FRAMEBUFFER,V)&&J&&X.drawBuffers(A,V),X.viewport(y),X.scissor(T),X.setScissorTest(K),gt){const Pt=q.get(A.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+z,Pt.__webglTexture,Z)}else if(At){const Pt=q.get(A.texture),kt=z||0;S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,Pt.__webglTexture,Z||0,kt)}B=-1},this.readRenderTargetPixels=function(A,z,Z,J,V,gt,At){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(Rt=Rt[At]),Rt){X.bindFramebuffer(S.FRAMEBUFFER,Rt);try{const Pt=A.texture,kt=Pt.format,Ht=Pt.type;if(!U.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-J&&Z>=0&&Z<=A.height-V&&S.readPixels(z,Z,J,V,Gt.convert(kt),Gt.convert(Ht),gt)}finally{const Pt=R!==null?q.get(R).__webglFramebuffer:null;X.bindFramebuffer(S.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(A,z,Z,J,V,gt,At){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(Rt=Rt[At]),Rt){const Pt=A.texture,kt=Pt.format,Ht=Pt.type;if(!U.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=A.width-J&&Z>=0&&Z<=A.height-V){X.bindFramebuffer(S.FRAMEBUFFER,Rt);const Lt=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,Lt),S.bufferData(S.PIXEL_PACK_BUFFER,gt.byteLength,S.STREAM_READ),S.readPixels(z,Z,J,V,Gt.convert(kt),Gt.convert(Ht),0);const ae=R!==null?q.get(R).__webglFramebuffer:null;X.bindFramebuffer(S.FRAMEBUFFER,ae);const de=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await cv(S,de,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,Lt),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,gt),S.deleteBuffer(Lt),S.deleteSync(de),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,z=null,Z=0){A.isTexture!==!0&&(No("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,A=arguments[1]);const J=Math.pow(2,-Z),V=Math.floor(A.image.width*J),gt=Math.floor(A.image.height*J),At=z!==null?z.x:0,Rt=z!==null?z.y:0;E.setTexture2D(A,0),S.copyTexSubImage2D(S.TEXTURE_2D,Z,0,0,At,Rt,V,gt),X.unbindTexture()},this.copyTextureToTexture=function(A,z,Z=null,J=null,V=0){A.isTexture!==!0&&(No("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,A=arguments[1],z=arguments[2],V=arguments[3]||0,Z=null);let gt,At,Rt,Pt,kt,Ht;Z!==null?(gt=Z.max.x-Z.min.x,At=Z.max.y-Z.min.y,Rt=Z.min.x,Pt=Z.min.y):(gt=A.image.width,At=A.image.height,Rt=0,Pt=0),J!==null?(kt=J.x,Ht=J.y):(kt=0,Ht=0);const Lt=Gt.convert(z.format),ae=Gt.convert(z.type);E.setTexture2D(z,0),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,z.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,z.unpackAlignment);const de=S.getParameter(S.UNPACK_ROW_LENGTH),xe=S.getParameter(S.UNPACK_IMAGE_HEIGHT),en=S.getParameter(S.UNPACK_SKIP_PIXELS),ee=S.getParameter(S.UNPACK_SKIP_ROWS),It=S.getParameter(S.UNPACK_SKIP_IMAGES),Ne=A.isCompressedTexture?A.mipmaps[V]:A.image;S.pixelStorei(S.UNPACK_ROW_LENGTH,Ne.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Ne.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Rt),S.pixelStorei(S.UNPACK_SKIP_ROWS,Pt),A.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,V,kt,Ht,gt,At,Lt,ae,Ne.data):A.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,V,kt,Ht,Ne.width,Ne.height,Lt,Ne.data):S.texSubImage2D(S.TEXTURE_2D,V,kt,Ht,gt,At,Lt,ae,Ne),S.pixelStorei(S.UNPACK_ROW_LENGTH,de),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,xe),S.pixelStorei(S.UNPACK_SKIP_PIXELS,en),S.pixelStorei(S.UNPACK_SKIP_ROWS,ee),S.pixelStorei(S.UNPACK_SKIP_IMAGES,It),V===0&&z.generateMipmaps&&S.generateMipmap(S.TEXTURE_2D),X.unbindTexture()},this.copyTextureToTexture3D=function(A,z,Z=null,J=null,V=0){A.isTexture!==!0&&(No("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,J=arguments[1]||null,A=arguments[2],z=arguments[3],V=arguments[4]||0);let gt,At,Rt,Pt,kt,Ht,Lt,ae,de;const xe=A.isCompressedTexture?A.mipmaps[V]:A.image;Z!==null?(gt=Z.max.x-Z.min.x,At=Z.max.y-Z.min.y,Rt=Z.max.z-Z.min.z,Pt=Z.min.x,kt=Z.min.y,Ht=Z.min.z):(gt=xe.width,At=xe.height,Rt=xe.depth,Pt=0,kt=0,Ht=0),J!==null?(Lt=J.x,ae=J.y,de=J.z):(Lt=0,ae=0,de=0);const en=Gt.convert(z.format),ee=Gt.convert(z.type);let It;if(z.isData3DTexture)E.setTexture3D(z,0),It=S.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)E.setTexture2DArray(z,0),It=S.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,z.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,z.unpackAlignment);const Ne=S.getParameter(S.UNPACK_ROW_LENGTH),ne=S.getParameter(S.UNPACK_IMAGE_HEIGHT),_n=S.getParameter(S.UNPACK_SKIP_PIXELS),us=S.getParameter(S.UNPACK_SKIP_ROWS),nn=S.getParameter(S.UNPACK_SKIP_IMAGES);S.pixelStorei(S.UNPACK_ROW_LENGTH,xe.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,xe.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Pt),S.pixelStorei(S.UNPACK_SKIP_ROWS,kt),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Ht),A.isDataTexture||A.isData3DTexture?S.texSubImage3D(It,V,Lt,ae,de,gt,At,Rt,en,ee,xe.data):z.isCompressedArrayTexture?S.compressedTexSubImage3D(It,V,Lt,ae,de,gt,At,Rt,en,xe.data):S.texSubImage3D(It,V,Lt,ae,de,gt,At,Rt,en,ee,xe),S.pixelStorei(S.UNPACK_ROW_LENGTH,Ne),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,ne),S.pixelStorei(S.UNPACK_SKIP_PIXELS,_n),S.pixelStorei(S.UNPACK_SKIP_ROWS,us),S.pixelStorei(S.UNPACK_SKIP_IMAGES,nn),V===0&&z.generateMipmaps&&S.generateMipmap(It),X.unbindTexture()},this.initRenderTarget=function(A){q.get(A).__webglFramebuffer===void 0&&E.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?E.setTextureCube(A,0):A.isData3DTexture?E.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?E.setTexture2DArray(A,0):E.setTexture2D(A,0),X.unbindTexture()},this.resetState=function(){I=0,P=0,R=null,X.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Jc?"display-p3":"srgb",e.unpackColorSpace=re.workingColorSpace===_a?"display-p3":"srgb"}}class SS extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class iu extends qs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Qo=new N,ta=new N,$h=new ge,ir=new tu,vo=new ga,pl=new N,Yh=new N;class Qd extends Ce{constructor(t=new ln,e=new iu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Qo.fromBufferAttribute(e,s-1),ta.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Qo.distanceTo(ta);t.setAttribute("lineDistance",new Fe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),vo.copy(i.boundingSphere),vo.applyMatrix4(s),vo.radius+=r,t.ray.intersectsSphere(vo)===!1)return;$h.copy(s).invert(),ir.copy(t.ray).applyMatrix4($h);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let M=d,p=g-1;M<p;M+=c){const m=u.getX(M),b=u.getX(M+1),_=xo(this,t,ir,l,m,b);_&&e.push(_)}if(this.isLineLoop){const M=u.getX(g-1),p=u.getX(d),m=xo(this,t,ir,l,M,p);m&&e.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let M=d,p=g-1;M<p;M+=c){const m=xo(this,t,ir,l,M,M+1);m&&e.push(m)}if(this.isLineLoop){const M=xo(this,t,ir,l,g-1,d);M&&e.push(M)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function xo(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(Qo.fromBufferAttribute(o,s),ta.fromBufferAttribute(o,r),e.distanceSqToSegment(Qo,ta,pl,Yh)>i)return;pl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(pl);if(!(l<t.near||l>t.far))return{distance:l,point:Yh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class Gn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],f=i[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new vt:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new N,s=[],r=[],o=[],a=new N,l=new ge;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ie(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Ie(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class su extends Gn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new vt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ES extends su{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ru(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const Mo=new N,ml=new ru,_l=new ru,gl=new ru;class bS extends Gn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new N){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(Mo.subVectors(s[0],s[1]).add(s[0]),c=Mo);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Mo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Mo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),M=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);M<1e-4&&(M=1),g<1e-4&&(g=M),p<1e-4&&(p=M),ml.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,M,p),_l.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,M,p),gl.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,M,p)}else this.curveType==="catmullrom"&&(ml.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),_l.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),gl.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(ml.calc(l),_l.calc(l),gl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function qh(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function TS(n,t){const e=1-n;return e*e*t}function AS(n,t){return 2*(1-n)*n*t}function wS(n,t){return n*n*t}function Mr(n,t,e,i){return TS(n,t)+AS(n,e)+wS(n,i)}function CS(n,t){const e=1-n;return e*e*e*t}function RS(n,t){const e=1-n;return 3*e*e*n*t}function PS(n,t){return 3*(1-n)*n*n*t}function LS(n,t){return n*n*n*t}function yr(n,t,e,i,s){return CS(n,t)+RS(n,e)+PS(n,i)+LS(n,s)}class tp extends Gn{constructor(t=new vt,e=new vt,i=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new vt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(yr(t,s.x,r.x,o.x,a.x),yr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class DS extends Gn{constructor(t=new N,e=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new N){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(yr(t,s.x,r.x,o.x,a.x),yr(t,s.y,r.y,o.y,a.y),yr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ep extends Gn{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class IS extends Gn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class np extends Gn{constructor(t=new vt,e=new vt,i=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new vt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Mr(t,s.x,r.x,o.x),Mr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class US extends Gn{constructor(t=new N,e=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new N){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Mr(t,s.x,r.x,o.x),Mr(t,s.y,r.y,o.y),Mr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ip extends Gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(qh(a,l.x,c.x,u.x,h.x),qh(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new vt().fromArray(s))}return this}}var bc=Object.freeze({__proto__:null,ArcCurve:ES,CatmullRomCurve3:bS,CubicBezierCurve:tp,CubicBezierCurve3:DS,EllipseCurve:su,LineCurve:ep,LineCurve3:IS,QuadraticBezierCurve:np,QuadraticBezierCurve3:US,SplineCurve:ip});class NS extends Gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new bc[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new bc[s.type]().fromJSON(s))}return this}}class Tc extends NS{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new ep(this.currentPoint.clone(),new vt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new np(this.currentPoint.clone(),new vt(t,e),new vt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new tp(this.currentPoint.clone(),new vt(t,e),new vt(i,s),new vt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new ip(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,o,a,l),this}absellipse(t,e,i,s,r,o,a,l){const c=new su(t,e,i,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class $s extends ln{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const M=[],p=i/2;let m=0;b(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Fe(h,3)),this.setAttribute("normal",new Fe(f,3)),this.setAttribute("uv",new Fe(d,2));function b(){const v=new N,I=new N;let P=0;const R=(e-t)/i;for(let B=0;B<=r;B++){const it=[],y=B/r,T=y*(e-t)+t;for(let K=0;K<=s;K++){const $=K/s,Q=$*l+a,rt=Math.sin(Q),W=Math.cos(Q);I.x=T*rt,I.y=-y*i+p,I.z=T*W,h.push(I.x,I.y,I.z),v.set(rt,R,W).normalize(),f.push(v.x,v.y,v.z),d.push($,1-y),it.push(g++)}M.push(it)}for(let B=0;B<s;B++)for(let it=0;it<r;it++){const y=M[it][B],T=M[it+1][B],K=M[it+1][B+1],$=M[it][B+1];t>0&&(u.push(y,T,$),P+=3),e>0&&(u.push(T,K,$),P+=3)}c.addGroup(m,P,0),m+=P}function _(v){const I=g,P=new vt,R=new N;let B=0;const it=v===!0?t:e,y=v===!0?1:-1;for(let K=1;K<=s;K++)h.push(0,p*y,0),f.push(0,y,0),d.push(.5,.5),g++;const T=g;for(let K=0;K<=s;K++){const Q=K/s*l+a,rt=Math.cos(Q),W=Math.sin(Q);R.x=it*W,R.y=p*y,R.z=it*rt,h.push(R.x,R.y,R.z),f.push(0,y,0),P.x=rt*.5+.5,P.y=W*.5*y+.5,d.push(P.x,P.y),g++}for(let K=0;K<s;K++){const $=I+K,Q=T+K;v===!0?u.push(Q,Q+1,$):u.push(Q+1,Q,$),B+=3}c.addGroup(m,B,v===!0?1:2),m+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ou extends $s{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ou(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sp extends Tc{constructor(t){super(t),this.uuid=cs(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Tc().fromJSON(s))}return this}}const OS={triangulate:function(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=rp(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,u,h,f,d;if(i&&(r=HS(n,t,r,e)),n.length>80*e){a=c=n[0],l=u=n[1];for(let g=e;g<s;g+=e)h=n[g],f=n[g+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return Ir(r,o,e,a,l,d,0),o}};function rp(n,t,e,i,s){let r,o;if(s===JS(n,t,e,i)>0)for(r=t;r<e;r+=i)o=Kh(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=Kh(r,n[r],n[r+1],o);return o&&xa(o,o.next)&&(Nr(o),o=o.next),o}function os(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(xa(e,e.next)||ve(e.prev,e,e.next)===0)){if(Nr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Ir(n,t,e,i,s,r,o){if(!n)return;!o&&r&&$S(n,i,s,r);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,r?BS(n,i,s,r):FS(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),Nr(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=zS(os(n),t,e),Ir(n,t,e,i,s,r,2)):o===2&&kS(n,t,e,i,s,r):Ir(os(n),t,e,i,s,r,1);break}}}function FS(n){const t=n.prev,e=n,i=n.next;if(ve(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=s<r?s<o?s:o:r<o?r:o,h=a<l?a<c?a:c:l<c?l:c,f=s>r?s>o?s:o:r>o?r:o,d=a>l?a>c?a:c:l>c?l:c;let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&Ds(s,a,r,l,o,c,g.x,g.y)&&ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function BS(n,t,e,i){const s=n.prev,r=n,o=n.next;if(ve(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=u<h?u<f?u:f:h<f?h:f,M=a>l?a>c?a:c:l>c?l:c,p=u>h?u>f?u:f:h>f?h:f,m=Ac(d,g,t,e,i),b=Ac(M,p,t,e,i);let _=n.prevZ,v=n.nextZ;for(;_&&_.z>=m&&v&&v.z<=b;){if(_.x>=d&&_.x<=M&&_.y>=g&&_.y<=p&&_!==s&&_!==o&&Ds(a,u,l,h,c,f,_.x,_.y)&&ve(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=d&&v.x<=M&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&Ds(a,u,l,h,c,f,v.x,v.y)&&ve(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=m;){if(_.x>=d&&_.x<=M&&_.y>=g&&_.y<=p&&_!==s&&_!==o&&Ds(a,u,l,h,c,f,_.x,_.y)&&ve(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=b;){if(v.x>=d&&v.x<=M&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&Ds(a,u,l,h,c,f,v.x,v.y)&&ve(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function zS(n,t,e){let i=n;do{const s=i.prev,r=i.next.next;!xa(s,r)&&op(s,i,i.next,r)&&Ur(s,r)&&Ur(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),Nr(i),Nr(i.next),i=n=r),i=i.next}while(i!==n);return os(i)}function kS(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&KS(o,a)){let l=ap(o,a);o=os(o,o.next),l=os(l,l.next),Ir(o,t,e,i,s,r,0),Ir(l,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function HS(n,t,e,i){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*i,l=r<o-1?t[r+1]*i:n.length,c=rp(n,a,l,i,!1),c===c.next&&(c.steiner=!0),s.push(qS(c));for(s.sort(VS),r=0;r<s.length;r++)e=GS(s[r],e);return e}function VS(n,t){return n.x-t.x}function GS(n,t){const e=WS(n,t);if(!e)return t;const i=ap(e,n);return os(i,i.next),os(e,e.next)}function WS(n,t){let e=t,i=-1/0,s;const r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let u=1/0,h;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Ds(o<c?r:i,o,l,c,o<c?i:r,o,e.x,e.y)&&(h=Math.abs(o-e.y)/(r-e.x),Ur(e,n)&&(h<u||h===u&&(e.x>s.x||e.x===s.x&&XS(s,e)))&&(s=e,u=h)),e=e.next;while(e!==a);return s}function XS(n,t){return ve(n.prev,n,t.prev)<0&&ve(t.next,n,n.next)<0}function $S(n,t,e,i){let s=n;do s.z===0&&(s.z=Ac(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,YS(s)}function YS(n){let t,e,i,s,r,o,a,l,c=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<c&&(a++,i=i.nextZ,!!i);t++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,c*=2}while(o>1);return n}function Ac(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function qS(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Ds(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function KS(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!jS(n,t)&&(Ur(n,t)&&Ur(t,n)&&ZS(n,t)&&(ve(n.prev,n,t.prev)||ve(n,t.prev,t))||xa(n,t)&&ve(n.prev,n,n.next)>0&&ve(t.prev,t,t.next)>0)}function ve(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function xa(n,t){return n.x===t.x&&n.y===t.y}function op(n,t,e,i){const s=So(ve(n,t,e)),r=So(ve(n,t,i)),o=So(ve(e,i,n)),a=So(ve(e,i,t));return!!(s!==r&&o!==a||s===0&&yo(n,e,t)||r===0&&yo(n,i,t)||o===0&&yo(e,n,i)||a===0&&yo(e,t,i))}function yo(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function So(n){return n>0?1:n<0?-1:0}function jS(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&op(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ur(n,t){return ve(n.prev,n,n.next)<0?ve(n,t,n.next)>=0&&ve(n,n.prev,t)>=0:ve(n,t,n.prev)<0||ve(n,n.next,t)<0}function ZS(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function ap(n,t){const e=new wc(n.i,n.x,n.y),i=new wc(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Kh(n,t,e,i){const s=new wc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Nr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function wc(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function JS(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class Sr{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return Sr.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];jh(t),Zh(i,t);let o=t.length;e.forEach(jh);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Zh(i,e[l]);const a=OS.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function jh(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Zh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class au extends ln{constructor(t=new sp([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Fe(s,3)),this.setAttribute("uv",new Fe(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:QS;let _,v=!1,I,P,R,B;m&&(_=m.getSpacedPoints(u),v=!0,f=!1,I=m.computeFrenetFrames(u,!1),P=new N,R=new N,B=new N),f||(p=0,d=0,g=0,M=0);const it=a.extractPoints(c);let y=it.shape;const T=it.holes;if(!Sr.isClockWise(y)){y=y.reverse();for(let w=0,S=T.length;w<S;w++){const H=T[w];Sr.isClockWise(H)&&(T[w]=H.reverse())}}const $=Sr.triangulateShape(y,T),Q=y;for(let w=0,S=T.length;w<S;w++){const H=T[w];y=y.concat(H)}function rt(w,S,H){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),w.clone().addScaledVector(S,H)}const W=y.length,et=$.length;function k(w,S,H){let O,U,X;const tt=w.x-S.x,q=w.y-S.y,E=H.x-w.x,x=H.y-w.y,L=tt*tt+q*q,G=tt*x-q*E;if(Math.abs(G)>Number.EPSILON){const Y=Math.sqrt(L),j=Math.sqrt(E*E+x*x),pt=S.x-q/Y,at=S.y+tt/Y,mt=H.x-x/j,Nt=H.y+E/j,ut=((mt-pt)*x-(Nt-at)*E)/(tt*x-q*E);O=pt+tt*ut-w.x,U=at+q*ut-w.y;const yt=O*O+U*U;if(yt<=2)return new vt(O,U);X=Math.sqrt(yt/2)}else{let Y=!1;tt>Number.EPSILON?E>Number.EPSILON&&(Y=!0):tt<-Number.EPSILON?E<-Number.EPSILON&&(Y=!0):Math.sign(q)===Math.sign(x)&&(Y=!0),Y?(O=-q,U=tt,X=Math.sqrt(L)):(O=tt,U=q,X=Math.sqrt(L/2))}return new vt(O/X,U/X)}const ft=[];for(let w=0,S=Q.length,H=S-1,O=w+1;w<S;w++,H++,O++)H===S&&(H=0),O===S&&(O=0),ft[w]=k(Q[w],Q[H],Q[O]);const _t=[];let xt,Bt=ft.concat();for(let w=0,S=T.length;w<S;w++){const H=T[w];xt=[];for(let O=0,U=H.length,X=U-1,tt=O+1;O<U;O++,X++,tt++)X===U&&(X=0),tt===U&&(tt=0),xt[O]=k(H[O],H[X],H[tt]);_t.push(xt),Bt=Bt.concat(xt)}for(let w=0;w<p;w++){const S=w/p,H=d*Math.cos(S*Math.PI/2),O=g*Math.sin(S*Math.PI/2)+M;for(let U=0,X=Q.length;U<X;U++){const tt=rt(Q[U],ft[U],O);Mt(tt.x,tt.y,-H)}for(let U=0,X=T.length;U<X;U++){const tt=T[U];xt=_t[U];for(let q=0,E=tt.length;q<E;q++){const x=rt(tt[q],xt[q],O);Mt(x.x,x.y,-H)}}}const jt=g+M;for(let w=0;w<W;w++){const S=f?rt(y[w],Bt[w],jt):y[w];v?(R.copy(I.normals[0]).multiplyScalar(S.x),P.copy(I.binormals[0]).multiplyScalar(S.y),B.copy(_[0]).add(R).add(P),Mt(B.x,B.y,B.z)):Mt(S.x,S.y,0)}for(let w=1;w<=u;w++)for(let S=0;S<W;S++){const H=f?rt(y[S],Bt[S],jt):y[S];v?(R.copy(I.normals[w]).multiplyScalar(H.x),P.copy(I.binormals[w]).multiplyScalar(H.y),B.copy(_[w]).add(R).add(P),Mt(B.x,B.y,B.z)):Mt(H.x,H.y,h/u*w)}for(let w=p-1;w>=0;w--){const S=w/p,H=d*Math.cos(S*Math.PI/2),O=g*Math.sin(S*Math.PI/2)+M;for(let U=0,X=Q.length;U<X;U++){const tt=rt(Q[U],ft[U],O);Mt(tt.x,tt.y,h+H)}for(let U=0,X=T.length;U<X;U++){const tt=T[U];xt=_t[U];for(let q=0,E=tt.length;q<E;q++){const x=rt(tt[q],xt[q],O);v?Mt(x.x,x.y+_[u-1].y,_[u-1].x+H):Mt(x.x,x.y,h+H)}}}st(),dt();function st(){const w=s.length/3;if(f){let S=0,H=W*S;for(let O=0;O<et;O++){const U=$[O];Ot(U[2]+H,U[1]+H,U[0]+H)}S=u+p*2,H=W*S;for(let O=0;O<et;O++){const U=$[O];Ot(U[0]+H,U[1]+H,U[2]+H)}}else{for(let S=0;S<et;S++){const H=$[S];Ot(H[2],H[1],H[0])}for(let S=0;S<et;S++){const H=$[S];Ot(H[0]+W*u,H[1]+W*u,H[2]+W*u)}}i.addGroup(w,s.length/3-w,0)}function dt(){const w=s.length/3;let S=0;bt(Q,S),S+=Q.length;for(let H=0,O=T.length;H<O;H++){const U=T[H];bt(U,S),S+=U.length}i.addGroup(w,s.length/3-w,1)}function bt(w,S){let H=w.length;for(;--H>=0;){const O=H;let U=H-1;U<0&&(U=w.length-1);for(let X=0,tt=u+p*2;X<tt;X++){const q=W*X,E=W*(X+1),x=S+O+q,L=S+U+q,G=S+U+E,Y=S+O+E;Ut(x,L,G,Y)}}}function Mt(w,S,H){l.push(w),l.push(S),l.push(H)}function Ot(w,S,H){Wt(w),Wt(S),Wt(H);const O=s.length/3,U=b.generateTopUV(i,s,O-3,O-2,O-1);C(U[0]),C(U[1]),C(U[2])}function Ut(w,S,H,O){Wt(w),Wt(S),Wt(O),Wt(S),Wt(H),Wt(O);const U=s.length/3,X=b.generateSideWallUV(i,s,U-6,U-3,U-2,U-1);C(X[0]),C(X[1]),C(X[3]),C(X[1]),C(X[2]),C(X[3])}function Wt(w){s.push(l[w*3+0]),s.push(l[w*3+1]),s.push(l[w*3+2])}function C(w){r.push(w.x),r.push(w.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return tE(e,i,t)}static fromJSON(t,e){const i=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];i.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new bc[s.type]().fromJSON(s)),new au(i,t.options)}}const QS={generateTopUV:function(n,t,e,i,s){const r=t[e*3],o=t[e*3+1],a=t[i*3],l=t[i*3+1],c=t[s*3],u=t[s*3+1];return[new vt(r,o),new vt(a,l),new vt(c,u)]},generateSideWallUV:function(n,t,e,i,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],h=t[i*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],M=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new vt(o,1-l),new vt(c,1-h),new vt(f,1-g),new vt(M,1-m)]:[new vt(a,1-l),new vt(u,1-h),new vt(d,1-g),new vt(p,1-m)]}};function tE(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class lu extends ln{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new N,f=new N,d=[],g=[],M=[],p=[];for(let m=0;m<=i;m++){const b=[],_=m/i;let v=0;m===0&&o===0?v=.5/e:m===i&&l===Math.PI&&(v=-.5/e);for(let I=0;I<=e;I++){const P=I/e;h.x=-t*Math.cos(s+P*r)*Math.sin(o+_*a),h.y=t*Math.cos(o+_*a),h.z=t*Math.sin(s+P*r)*Math.sin(o+_*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),M.push(f.x,f.y,f.z),p.push(P+v,1-_),b.push(c++)}u.push(b)}for(let m=0;m<i;m++)for(let b=0;b<e;b++){const _=u[m][b+1],v=u[m][b],I=u[m+1][b],P=u[m+1][b+1];(m!==0||o>0)&&d.push(_,v,P),(m!==i-1||l<Math.PI)&&d.push(v,I,P)}this.setIndex(d),this.setAttribute("position",new Fe(g,3)),this.setAttribute("normal",new Fe(M,3)),this.setAttribute("uv",new Fe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class As extends qs{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ud,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Xc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class eE extends iu{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class lp extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class nE extends lp{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const vl=new ge,Jh=new N,Qh=new N;class iE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new eu,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Jh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Jh),Qh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Qh),e.updateMatrixWorld(),vl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(vl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class sE extends iE{constructor(){super(new Yd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rE extends lp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new sE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class tf{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ie(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const ef=new N;let Eo,xl;class oE extends Ce{constructor(t=new N(0,0,1),e=new N(0,0,0),i=1,s=16776960,r=i*.2,o=r*.2){super(),this.type="ArrowHelper",Eo===void 0&&(Eo=new ln,Eo.setAttribute("position",new Fe([0,0,0,0,1,0],3)),xl=new $s(0,.5,1,5,1),xl.translate(0,-.5,0)),this.position.copy(e),this.line=new Qd(Eo,new iu({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ae(xl,new Ji({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(i,r,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{ef.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(ef,e)}}setLength(t,e=t*.2,i=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(i,e,i),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class aE extends ls{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wc);const nf={type:"change"},cu={type:"start"},cp={type:"end"},bo=new tu,sf=new xi,lE=Math.cos(70*Rs.DEG2RAD),we=new N,Ze=2*Math.PI,le={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ml=1e-6;class cE extends aE{constructor(t,e=null){super(t,e),this.state=le.NONE,this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Us.ROTATE,MIDDLE:Us.DOLLY,RIGHT:Us.PAN},this.touches={ONE:Ps.ROTATE,TWO:Ps.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new rs,this._lastTargetPosition=new N,this._quat=new rs().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new tf,this._sphericalDelta=new tf,this._scale=1,this._panOffset=new N,this._rotateStart=new vt,this._rotateEnd=new vt,this._rotateDelta=new vt,this._panStart=new vt,this._panEnd=new vt,this._panDelta=new vt,this._dollyStart=new vt,this._dollyEnd=new vt,this._dollyDelta=new vt,this._dollyDirection=new N,this._mouse=new vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hE.bind(this),this._onPointerDown=uE.bind(this),this._onPointerUp=fE.bind(this),this._onContextMenu=xE.bind(this),this._onMouseWheel=mE.bind(this),this._onKeyDown=_E.bind(this),this._onTouchStart=gE.bind(this),this._onTouchMove=vE.bind(this),this._onMouseDown=dE.bind(this),this._onMouseMove=pE.bind(this),this._interceptControlDown=ME.bind(this),this._interceptControlUp=yE.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nf),this.update(),this.state=le.NONE}update(t=null){const e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===le.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ze:i>Math.PI&&(i-=Ze),s<-Math.PI?s+=Ze:s>Math.PI&&(s-=Ze),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=we.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(bo.origin.copy(this.object.position),bo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(bo.direction))<lE?this.object.lookAt(this.target):(sf.setFromNormalAndCoplanarPoint(this.object.up,this.target),bo.intersectPlane(sf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ml||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ml||this._lastTargetPosition.distanceToSquared(this.target)>Ml?(this.dispatchEvent(nf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ze/60*this.autoRotateSpeed*t:Ze/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;we.copy(s).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function uE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function hE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function fE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(cp),this.state=le.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function dE(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=le.DOLLY;break;case Us.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}break;case Us.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=le.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=le.PAN}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(cu)}function pE(n){switch(this.state){case le.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case le.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function mE(n){this.enabled===!1||this.enableZoom===!1||this.state!==le.NONE||(n.preventDefault(),this.dispatchEvent(cu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(cp))}function _E(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function gE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ps.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=le.TOUCH_ROTATE;break;case Ps.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=le.TOUCH_PAN;break;default:this.state=le.NONE}break;case 2:switch(this.touches.TWO){case Ps.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=le.TOUCH_DOLLY_PAN;break;case Ps.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=le.TOUCH_DOLLY_ROTATE;break;default:this.state=le.NONE}break;default:this.state=le.NONE}this.state!==le.NONE&&this.dispatchEvent(cu)}function vE(n){switch(this._trackPointer(n),this.state){case le.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case le.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case le.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case le.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=le.NONE}}function xE(n){this.enabled!==!1&&n.preventDefault()}function ME(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Zn=10.5,rf=7.2,SE=Ri({__name:"PortalScene",props:{params:{},result:{}},setup(n){const t=n,e=ii(null);let i=null,s,r,o,a=null,l=0,c=null;function u(){const d=new ar,g=t.params,M=Math.max(5,g.canopyLength),p=Math.max(.3,g.grilleSpacing),m=new Vr(400,400,48,48),b=m.attributes.position;for(let k=0;k<b.count;k++){const ft=b.getX(k),_t=b.getY(k),xt=26*Math.exp(-Math.pow((_t+45)/45,2))*Math.exp(-Math.pow(ft/90,2));b.setZ(k,xt+Math.sin(ft*.08)*Math.cos(_t*.06)*1.2)}m.computeVertexNormals();const _=new Ae(m,new As({color:7311199}));_.rotation.x=-Math.PI/2,_.rotation.z=Math.PI/2,d.add(_);const v=M+60,I=new Ae(new oi(v,.2,Zn),new As({color:3816770}));I.position.set(M/2+15,.1,0),d.add(I);for(const k of[-Zn/4,Zn/4]){const ft=new Ae(new oi(v,.02,.15),new Ji({color:14211288}));ft.position.set(M/2+15,.22,k),d.add(ft)}const P=new sp,R=16,B=12;P.moveTo(-R/2,0),P.lineTo(R/2,0),P.lineTo(R/2,B),P.lineTo(-R/2,B),P.closePath();const it=new Tc,y=Zn/2,T=rf-y;it.moveTo(-y,0),it.lineTo(-y,T),it.absarc(0,T,y,Math.PI,0,!0),it.lineTo(y,0),it.closePath(),P.holes.push(it);const K=new Ae(new au(P,{depth:1.2,bevelEnabled:!1}),new As({color:10133670}));K.rotation.y=Math.PI/2,K.position.set(-.6,0,0),d.add(K);const $=new Ae(new $s(y+.4,y+.4,14,24,1,!0,0,Math.PI),new As({color:1842722,side:Nn}));$.rotation.z=Math.PI/2,$.rotation.y=Math.PI/2,$.position.set(-7.5,T,0),d.add($);const Q=rf+.8,rt=new As({color:5205903}),W=new As({color:3099235});for(let k=0;k<=M;k+=5)for(const ft of[-Zn/2-.6,Zn/2+.6]){const _t=new Ae(new $s(.18,.18,Q,10),rt);_t.position.set(k,Q/2,ft),d.add(_t)}for(const k of[-Zn/2-.6,Zn/2+.6]){const ft=new Ae(new oi(M,.35,.35),rt);ft.position.set(M/2,Q,k),d.add(ft)}const et=Math.floor(M/p);for(let k=0;k<=et;k++){const ft=new Ae(new oi(Math.min(.25,p*.4),Math.max(.15,g.grilleDepth),Zn+1.6),W);ft.position.set(k*p,Q+Math.max(.15,g.grilleDepth)/2,0),d.add(ft)}if(t.result){const k=new Ji({color:14689316}),ft=new Ji({color:16096779});for(const _t of t.result.points){if(!_t.exceeded&&!_t.steep)continue;const xt=new Ae(new ou(.45,1.4,8),_t.exceeded?k:ft);xt.position.set(_t.x,1,0),xt.rotation.x=Math.PI,d.add(xt)}}return d.rotation.y=Rs.degToRad(90-g.orientation),d}function h(){if(!s)return;s.children.filter(it=>it.userData.sun).forEach(it=>s.remove(it));const g=t.params,M=$o(g.latitude,Ul(g.simDate,g.simTime)),p=Rs.degToRad(Math.max(-5,M.altitude)),m=Rs.degToRad(M.azimuth),b=new N(Math.sin(m)*Math.cos(p),Math.sin(p),-Math.cos(m)*Math.cos(p)),_=new nE(12572650,4871488,M.altitude>0?.9:.25);_.userData.sun=!0,s.add(_);const v=new rE(16773848,M.altitude>0?2.2:.05);v.position.copy(b.clone().multiplyScalar(180)),v.userData.sun=!0,s.add(v);const I=new Ae(new lu(4,16,16),new Ji({color:M.altitude>0?16766814:5592422}));I.position.copy(b.clone().multiplyScalar(220)),I.userData.sun=!0,s.add(I);const P=[],R=Ul(g.simDate,"00:00");for(let it=300;it<=1140;it+=20){const y=new Date(R);y.setHours(Math.floor(it/60),it%60);const T=$o(g.latitude,y);if(T.altitude<-2)continue;const K=Rs.degToRad(T.altitude),$=Rs.degToRad(T.azimuth);P.push(new N(Math.sin($)*Math.cos(K)*210,Math.sin(K)*210,-Math.cos($)*Math.cos(K)*210))}if(P.length>1){const it=new Qd(new ln().setFromPoints(P),new eE({color:16758861,dashSize:4,gapSize:3}));it.computeLineDistances(),it.userData.sun=!0,s.add(it)}const B=new oE(new N(0,0,-1),new N(0,.5,0),25,3900150,4,2);B.userData.sun=!0,s.add(B),s.background=new Zt(M.altitude>0?10470888:1317414)}function f(){s&&(a&&(s.remove(a),a.traverse(d=>{const g=d;g.geometry&&g.geometry.dispose()})),a=u(),s.add(a),h())}return Wf(()=>{const d=e.value;s=new SS,r=new hn(55,d.clientWidth/d.clientHeight,.1,1e3),r.position.set(70,45,70),i=new yS({antialias:!0}),i.setSize(d.clientWidth,d.clientHeight),i.setPixelRatio(Math.min(2,window.devicePixelRatio)),d.appendChild(i.domElement),o=new cE(r,i.domElement),o.target.set(20,4,0),o.enableDamping=!0,f();const g=()=>{l=requestAnimationFrame(g),o.update(),i.render(s,r)};g(),c=new ResizeObserver(()=>{i&&(r.aspect=d.clientWidth/d.clientHeight,r.updateProjectionMatrix(),i.setSize(d.clientWidth,d.clientHeight))}),c.observe(d)}),Xf(()=>{cancelAnimationFrame(l),c==null||c.disconnect(),o==null||o.dispose(),i==null||i.dispose()}),hr(()=>[t.params,t.result],f,{deep:!0}),(d,g)=>(ct(),ht("div",{ref_key:"container",ref:e,class:"scene-container"},null,512))}}),Li=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},EE=Li(SE,[["__scopeId","data-v-c8dccdd1"]]),bE={class:"chart-wrap"},TE={class:"chart-title"},AE=["viewBox"],wE=["x2","y1","y2"],CE=["x1","x2","y2"],RE=["x2","y1","y2"],PE=["y2"],LE=["x","y"],DE=["x","y"],IE=["x","y"],UE=["points"],NE=["points","stroke"],OE={key:1},FE=["cx","cy","fill"],BE={class:"legend"},zE={key:0,class:"lg-item"},kE={key:1,class:"lg-item"},HE={key:2,class:"lg-item"},To=560,_i=260,gi=56,yl=12,Ao=22,Hi=30,VE=Ri({__name:"CurveChart",props:{title:{},series:{},limitPoints:{},markers:{}},setup(n){const t=n,e=se(()=>{const h=t.series.flatMap(f=>f.points);return t.limitPoints&&h.push(...t.limitPoints),h}),i=se(()=>Math.max(1,...e.value.map(h=>h.x))),s=se(()=>Math.max(100,...e.value.map(h=>h.y))*1.08);function r(h){return gi+h/i.value*(To-gi-yl)}function o(h){return _i-Hi-h/s.value*(_i-Ao-Hi)}function a(h){return h.map(f=>`${r(f.x).toFixed(1)},${o(f.y).toFixed(1)}`).join(" ")}const l=se(()=>Array.from({length:7},(f,d)=>Math.round(i.value/6*d))),c=se(()=>Array.from({length:5},(f,d)=>s.value/4*d));function u(h){return h>=1e4?(h/1e3).toFixed(0)+"k":String(Math.round(h))}return(h,f)=>{var d,g;return ct(),ht("div",bE,[D("div",TE,ot(n.title),1),(ct(),ht("svg",{viewBox:`0 0 ${To} ${_i}`,class:"chart"},[(ct(!0),ht(qt,null,Me(c.value,M=>(ct(),ht("line",{key:"y"+M,x1:gi,x2:To-yl,y1:o(M),y2:o(M),class:"grid"},null,8,wE))),128)),(ct(!0),ht(qt,null,Me(l.value,M=>(ct(),ht("line",{key:"x"+M,x1:r(M),x2:r(M),y1:Ao,y2:_i-Hi,class:"grid"},null,8,CE))),128)),D("line",{x1:gi,x2:To-yl,y1:_i-Hi,y2:_i-Hi,class:"axis"},null,8,RE),D("line",{x1:gi,x2:gi,y1:Ao,y2:_i-Hi,class:"axis"},null,8,PE),(ct(!0),ht(qt,null,Me(c.value,M=>(ct(),ht("text",{key:"yl"+M,x:gi-6,y:o(M)+4,class:"tick","text-anchor":"end"},ot(u(M)),9,LE))),128)),(ct(!0),ht(qt,null,Me(l.value,M=>(ct(),ht("text",{key:"xl"+M,x:r(M),y:_i-Hi+16,class:"tick","text-anchor":"middle"},ot(M)+"m",9,DE))),128)),D("text",{x:gi-34,y:Ao-6,class:"tick"},"lux",8,IE),n.limitPoints?(ct(),ht("polyline",{key:0,points:a(n.limitPoints),fill:"none",class:"limit-line"},null,8,UE)):_e("",!0),(ct(!0),ht(qt,null,Me(n.series,(M,p)=>(ct(),ht("polyline",{key:p,points:a(M.points),fill:"none",stroke:M.color,"stroke-width":"2"},null,8,NE))),128)),n.markers?(ct(),ht("g",OE,[(ct(!0),ht(qt,null,Me(n.markers,(M,p)=>(ct(),ht("circle",{key:"m"+p,cx:r(M.x),cy:o(M.y),r:"4",fill:M.kind==="exceeded"?"#e02424":"#f59e0b",stroke:"#fff","stroke-width":"1"},[D("title",null,ot(M.kind==="exceeded"?"超阈值":"陡跳")+" x="+ot(M.x)+"m 偏移 "+ot(M.offset)+" lux",1)],8,FE))),128))])):_e("",!0)],8,AE)),D("div",BE,[(ct(!0),ht(qt,null,Me(n.series,(M,p)=>(ct(),ht("span",{key:"lg"+p,class:"lg-item"},[D("i",{style:oa({background:M.color})},null,4),ue(ot(M.name),1)]))),128)),n.limitPoints?(ct(),ht("span",zE,[...f[0]||(f[0]=[D("i",{class:"lg-limit"},null,-1),ue("限值曲线",-1)])])):_e("",!0),(d=n.markers)!=null&&d.length?(ct(),ht("span",kE,[...f[1]||(f[1]=[D("i",{style:{background:"#e02424","border-radius":"50%"}},null,-1),ue("超阈值",-1)])])):_e("",!0),(g=n.markers)!=null&&g.length?(ct(),ht("span",HE,[...f[2]||(f[2]=[D("i",{style:{background:"#f59e0b","border-radius":"50%"}},null,-1),ue("陡跳",-1)])])):_e("",!0)])])}}}),ea=Li(VE,[["__scopeId","data-v-9e9cbd44"]]),GE={class:"design"},WE={class:"panel list"},XE={class:"list-head"},$E=["onClick"],YE={class:"si-top"},qE={class:"si-sub muted"},KE={key:0},jE={key:0,class:"panel form-panel"},ZE={class:"form-head"},JE={class:"muted"},QE={key:0,class:"return-box"},tb={class:"muted"},eb={class:"grid2"},nb=["disabled"],ib=["disabled"],sb=["disabled"],rb=["disabled"],ob=["disabled"],ab=["disabled"],lb=["disabled"],cb=["disabled"],ub=["disabled"],hb=["disabled"],fb=["disabled"],db={class:"btn-row"},pb=["disabled"],mb={class:"metrics"},_b={class:"metric"},gb={class:"metric"},vb={class:"metric"},xb={class:"metric"},Mb={class:"metric"},yb={class:"metric"},Sb={key:0,class:"panel-inner"},Eb={class:"tag-red"},bb={class:"table-scroll"},Tb={class:"grid-table"},Ab={class:"tag-red"},wb={class:"panel-inner"},Cb={class:"grid-table"},Rb={key:1,class:"muted"},Pb={key:1,class:"panel scene-panel"},Lb=Ri({__name:"DesignView",setup(n){var m;const t=ii(((m=Kt.schemes[0])==null?void 0:m.id)??""),e=se(()=>Kt.schemes.find(b=>b.id===t.value)),i=se(()=>Kt.session.role==="designer"),s=se(()=>{const b=e.value;return!b||!i.value||b.locked?!1:b.status==="draft"||b.status==="returned"}),r=se(()=>e.value.current.params),o=se(()=>{var b;return((b=e.value)==null?void 0:b.current.result)??null}),a=se(()=>{var b;return(b=e.value)==null?void 0:b.returns[e.value.returns.length-1]}),l=se(()=>{var b;return((b=o.value)==null?void 0:b.points.map(_=>({x:_.x,y:_.illuminance})))??[]}),c=se(()=>{var b;return((b=o.value)==null?void 0:b.points.map(_=>({x:_.x,y:_.limit})))??null}),u=se(()=>o.value?o.value.points.filter(b=>b.exceeded||b.steep).map(b=>({x:b.x,y:b.illuminance,offset:b.offset,kind:b.exceeded?"exceeded":"steep"})):null),h=se(()=>{var b;return((b=o.value)==null?void 0:b.points.filter(_=>_.exceeded||_.steep))??[]}),f=se(()=>e.value?q_(r.value.latitude,r.value.orientation):[]);function d(){const b=Z_();t.value=b.id}function g(){e.value&&Q_(e.value)}function M(){const b=e.value;b&&(b.status==="returned"?eg(b):Gc(b))}function p(){var b;e.value&&(J_(e.value.id),t.value=((b=Kt.schemes[0])==null?void 0:b.id)??"")}return(b,_)=>(ct(),ht("div",GE,[D("aside",WE,[D("div",XE,[_[11]||(_[11]=D("h3",null,"洞门方案单",-1)),i.value?(ct(),ht("button",{key:0,onClick:d},"+ 新建")):_e("",!0)]),(ct(!0),ht(qt,null,Me(me(Kt).schemes,v=>{var I;return ct(),ht("div",{key:v.id,class:Ue(["scheme-item",{active:((I=e.value)==null?void 0:I.id)===v.id}]),onClick:P=>t.value=v.id},[D("div",YE,[D("b",null,ot(v.current.params.tunnelName||"(未命名)")+" · "+ot(v.current.params.portalName),1),D("span",{class:Ue(["badge",v.status])},ot(me(ns)[v.status]),3)]),D("div",qE,[ue(ot(v.current.params.stake)+" · v"+ot(v.current.version)+" · 返工 "+ot(v.reworkCount)+" 次 ",1),v.locked?(ct(),ht("span",KE,"· 🔒已锁定")):_e("",!0)])],10,$E)}),128))]),e.value?(ct(),ht("section",jE,[D("div",ZE,[D("h3",null,[_[12]||(_[12]=ue("方案参数 ",-1)),D("span",JE,"v"+ot(e.value.current.version),1)]),D("span",{class:Ue(["badge",e.value.status])},ot(me(ns)[e.value.status]),3)]),e.value.status==="returned"&&a.value?(ct(),ht("div",QE,[_[13]||(_[13]=D("b",null,"审核退回:",-1)),ue(" "+ot(a.value.reason),1),_[14]||(_[14]=D("br",null,null,-1)),_[15]||(_[15]=D("b",null,"需改参数:",-1)),ue(" "+ot(a.value.paramsToFix)+" ",1),D("span",tb,"("+ot(a.value.reviewer)+" · "+ot(a.value.time)+")",1)])):_e("",!0),D("div",eb,[D("label",null,[_[16]||(_[16]=ue("隧道名称 ",-1)),ke(D("input",{"onUpdate:modelValue":_[0]||(_[0]=v=>r.value.tunnelName=v),disabled:!s.value,placeholder:"如: 青云山隧道"},null,8,nb),[[on,r.value.tunnelName]])]),D("label",null,[_[18]||(_[18]=ue("洞口名称 ",-1)),ke(D("select",{"onUpdate:modelValue":_[1]||(_[1]=v=>r.value.portalName=v),disabled:!s.value},[..._[17]||(_[17]=[D("option",null,"进口",-1),D("option",null,"出口",-1)])],8,ib),[[Il,r.value.portalName]])]),D("label",null,[_[19]||(_[19]=ue("桩号 ",-1)),ke(D("input",{"onUpdate:modelValue":_[2]||(_[2]=v=>r.value.stake=v),disabled:!s.value,placeholder:"K12+380"},null,8,sb),[[on,r.value.stake]])]),D("label",null,[ue("洞口朝向(方位角°) "+ot(me(Yo)(r.value.orientation))+" ",1),ke(D("input",{type:"number","onUpdate:modelValue":_[3]||(_[3]=v=>r.value.orientation=v),min:"0",max:"359",disabled:!s.value},null,8,rb),[[on,r.value.orientation,void 0,{number:!0}]])]),D("label",null,[_[20]||(_[20]=ue("所在纬度(°) ",-1)),ke(D("input",{type:"number","onUpdate:modelValue":_[4]||(_[4]=v=>r.value.latitude=v),step:"0.1",min:"0",max:"55",disabled:!s.value},null,8,ob),[[on,r.value.latitude,void 0,{number:!0}]])]),D("label",null,[_[21]||(_[21]=ue("减光棚长度(m) ",-1)),ke(D("input",{type:"number","onUpdate:modelValue":_[5]||(_[5]=v=>r.value.canopyLength=v),min:"10",max:"200",disabled:!s.value},null,8,ab),[[on,r.value.canopyLength,void 0,{number:!0}]])]),D("label",null,[_[22]||(_[22]=ue("格栅间距(m) ",-1)),ke(D("input",{type:"number","onUpdate:modelValue":_[6]||(_[6]=v=>r.value.grilleSpacing=v),step:"0.1",min:"0.3",max:"5",disabled:!s.value},null,8,lb),[[on,r.value.grilleSpacing,void 0,{number:!0}]])]),D("label",null,[_[23]||(_[23]=ue("格栅高度(m) ",-1)),ke(D("input",{type:"number","onUpdate:modelValue":_[7]||(_[7]=v=>r.value.grilleDepth=v),step:"0.1",min:"0.2",max:"2",disabled:!s.value},null,8,cb),[[on,r.value.grilleDepth,void 0,{number:!0}]])]),D("label",null,[_[25]||(_[25]=ue("减光段照度阈值 ",-1)),ke(D("select",{"onUpdate:modelValue":_[8]||(_[8]=v=>r.value.thresholdPct=v),disabled:!s.value},[..._[24]||(_[24]=[D("option",{value:2},"洞外亮度 2%",-1),D("option",{value:3},"洞外亮度 3%",-1),D("option",{value:4},"洞外亮度 4%",-1),D("option",{value:5},"洞外亮度 5%",-1)])],8,ub),[[Il,r.value.thresholdPct,void 0,{number:!0}]])]),D("label",null,[_[26]||(_[26]=ue("仿真日期 ",-1)),ke(D("input",{type:"date","onUpdate:modelValue":_[9]||(_[9]=v=>r.value.simDate=v),disabled:!s.value},null,8,hb),[[on,r.value.simDate]])]),D("label",null,[_[27]||(_[27]=ue("仿真时刻 ",-1)),ke(D("input",{type:"time","onUpdate:modelValue":_[10]||(_[10]=v=>r.value.simTime=v),disabled:!s.value},null,8,fb),[[on,r.value.simTime]])])]),D("div",db,[s.value?(ct(),ht("button",{key:0,onClick:g},"▶ 运行太阳轨迹仿真")):_e("",!0),s.value&&e.value.status!=="pending"?(ct(),ht("button",{key:1,class:"ok",onClick:M,disabled:!e.value.current.result},ot(e.value.status==="returned"?"修改完成, 重新提交":"提交审核"),9,pb)):_e("",!0),i.value&&e.value.status==="draft"?(ct(),ht("button",{key:2,class:"ghost",onClick:p},"删除草稿")):_e("",!0)]),o.value?(ct(),ht(qt,{key:1},[D("div",mb,[D("div",_b,[_[28]||(_[28]=D("span",null,"太阳高度角",-1)),D("b",null,ot(o.value.solarAltitude)+"°",1)]),D("div",gb,[_[29]||(_[29]=D("span",null,"太阳方位角",-1)),D("b",null,ot(o.value.solarAzimuth)+"°",1)]),D("div",vb,[_[30]||(_[30]=D("span",null,"洞外照度",-1)),D("b",null,ot(o.value.outsideIlluminance.toLocaleString())+" lux",1)]),D("div",xb,[_[31]||(_[31]=D("span",null,"单层格栅遮挡率",-1)),D("b",null,ot((o.value.shadingPerGrille*100).toFixed(1))+"%",1)]),D("div",Mb,[_[32]||(_[32]=D("span",null,"洞门处照度",-1)),D("b",null,ot(o.value.portalIlluminance.toLocaleString())+" lux",1)]),D("div",yb,[_[33]||(_[33]=D("span",null,"校核结论",-1)),D("b",{class:Ue(o.value.pass?"tag-ok":"tag-red")},ot(o.value.pass?"通过":`超限${o.value.exceededCount}处 / 陡跳${o.value.steepCount}处`),3)])]),Je(ea,{title:"棚下路面照度明暗过渡曲线(距洞门 x → 棚外端)",series:[{name:"棚下照度",color:"#60a5fa",points:l.value}],"limit-points":c.value,markers:u.value},null,8,["series","limit-points","markers"]),h.value.length?(ct(),ht("div",Sb,[D("h4",Eb,"⚠ 标红位置与偏移量(共 "+ot(h.value.length)+" 处)",1),D("div",bb,[D("table",Tb,[_[34]||(_[34]=D("thead",null,[D("tr",null,[D("th",null,"位置 x(m)"),D("th",null,"照度(lux)"),D("th",null,"限值(lux)"),D("th",null,"类型"),D("th",null,"偏移量(lux)")])],-1)),D("tbody",null,[(ct(!0),ht(qt,null,Me(h.value,(v,I)=>(ct(),ht("tr",{key:I},[D("td",null,ot(v.x),1),D("td",null,ot(v.illuminance.toLocaleString()),1),D("td",null,ot(v.limit.toLocaleString()),1),D("td",{class:Ue(v.exceeded?"tag-red":"")},ot(v.exceeded?"超阈值":"陡跳"),3),D("td",Ab,"+"+ot(v.offset.toLocaleString()),1)]))),128))])])])])):_e("",!0)],64)):_e("",!0),D("div",wb,[D("h4",null,"❄ 冬季低角度眩光时段提示(朝向 "+ot(r.value.orientation)+"° "+ot(me(Yo)(r.value.orientation))+")",1),f.value.length?(ct(),ht(qt,{key:0},[D("table",Cb,[_[35]||(_[35]=D("thead",null,[D("tr",null,[D("th",null,"代表日期"),D("th",null,"眩光时段"),D("th",null,"时段内最大高度角")])],-1)),D("tbody",null,[(ct(!0),ht(qt,null,Me(f.value,(v,I)=>(ct(),ht("tr",{key:I},[D("td",null,ot(v.date),1),D("td",null,ot(v.start)+" ~ "+ot(v.end),1),D("td",null,ot(v.maxAltitude)+"°",1)]))),128))])]),_[36]||(_[36]=D("p",{class:"muted"},"提示: 以上时段太阳低角度直射洞口, 建议加强防眩设施并纳入运管提示。",-1))],64)):(ct(),ht("p",Rb,"该朝向冬季无显著低角度直射眩光时段。"))])])):_e("",!0),e.value?(ct(),ht("section",Pb,[_[37]||(_[37]=D("h3",null,"三维场景(洞门断面 · 地形 · 太阳轨迹)",-1)),Je(EE,{params:r.value,result:e.value.current.result},null,8,["params","result"]),_[38]||(_[38]=D("p",{class:"muted scene-note"}," 蓝色箭头=北向, 黄色虚线=当日太阳轨迹; 红色锥标=超阈值位置, 橙色=陡跳位置。拖拽旋转, 滚轮缩放。 ",-1))])):_e("",!0)]))}}),Db=Li(Lb,[["__scopeId","data-v-c7f3d8ee"]]),Ib={class:"panel-inner audit"},Ub={class:"grid-table"},Nb={class:"muted"},Ob=Ri({__name:"AuditLog",props:{scheme:{}},setup(n){return(t,e)=>(ct(),ht("div",Ib,[e[1]||(e[1]=D("h4",null,"操作记录(操作人 / 时间)",-1)),D("table",Ub,[e[0]||(e[0]=D("thead",null,[D("tr",null,[D("th",null,"时间"),D("th",null,"操作人"),D("th",null,"角色"),D("th",null,"操作"),D("th",null,"详情")])],-1)),D("tbody",null,[(ct(!0),ht(qt,null,Me([...n.scheme.audit].reverse(),(i,s)=>(ct(),ht("tr",{key:s},[D("td",null,ot(i.time),1),D("td",null,ot(i.operator),1),D("td",null,ot(me(pa)[i.role]),1),D("td",null,ot(i.action),1),D("td",Nb,ot(i.detail??""),1)]))),128))])])]))}}),up=Li(Ob,[["__scopeId","data-v-ffe5af66"]]),Fb={class:"review"},Bb={class:"panel list"},zb={key:0,class:"muted"},kb=["onClick"],Hb={class:"si-top"},Vb={class:"muted si-sub"},Gb=["onClick"],Wb={class:"si-top"},Xb={key:0,class:"panel detail"},$b={class:"head"},Yb={class:"muted"},qb={class:"meta muted"},Kb={key:0,class:"compare"},jb={key:1,class:"panel empty-compare muted"},Zb={key:1,class:"panel-inner"},Jb={class:"grid-table"},Qb={class:"tag-red"},tT={key:2,class:"review-actions"},eT={key:0,class:"return-form"},nT=["disabled"],iT={key:1,class:"muted"},sT={key:3,class:"panel-inner"},rT={class:"muted"},oT={key:1,class:"panel muted"},aT=Ri({__name:"ReviewView",setup(n){const t=ii(""),e=ii(!1),i=ii(""),s=ii(""),r=se(()=>Kt.schemes.filter(b=>b.status==="pending")),o=se(()=>Kt.schemes.filter(b=>b.status!=="pending"&&b.history.length>0)),a=se(()=>Kt.schemes.find(b=>b.id===t.value)),l=se(()=>Kt.session.role==="reviewer"),c=se(()=>{var _;const b=(_=a.value)==null?void 0:_.history;return b&&b.length?b[b.length-1]:null}),u=se(()=>{var _;const b=(_=a.value)==null?void 0:_.history;return b&&b.length>1?b[b.length-2]:null});function h(b,_){var v;return[{name:`v${b.version} 棚下照度`,color:_,points:((v=b.result)==null?void 0:v.points.map(I=>({x:I.x,y:I.illuminance})))??[]}]}function f(b){var _;return((_=b.result)==null?void 0:_.points.map(v=>({x:v.x,y:v.limit})))??null}function d(b){var _;return((_=b.result)==null?void 0:_.points.filter(v=>v.exceeded||v.steep).map(v=>({x:v.x,y:v.illuminance,offset:v.offset,kind:v.exceeded?"exceeded":"steep"})))??null}const g={tunnelName:"隧道名称",portalName:"洞口",stake:"桩号",orientation:"朝向(°)",latitude:"纬度(°)",canopyLength:"棚长(m)",grilleSpacing:"格栅间距(m)",grilleDepth:"格栅高度(m)",thresholdPct:"阈值(%)",simDate:"仿真日期",simTime:"仿真时刻"},M=se(()=>{var v,I;const b=(v=u.value)==null?void 0:v.params,_=(I=c.value)==null?void 0:I.params;return!b||!_?[]:Object.keys(g).filter(P=>String(b[P])!==String(_[P])).map(P=>({key:P,label:g[P],prev:String(b[P]),cur:String(_[P])}))});function p(){a.value&&yd(a.value)}function m(){a.value&&(tg(a.value,i.value.trim(),s.value.trim()),e.value=!1,i.value="",s.value="")}return(b,_)=>(ct(),ht("div",Fb,[D("aside",Bb,[D("h3",null,"待审核方案 ("+ot(r.value.length)+")",1),r.value.length?_e("",!0):(ct(),ht("p",zb,"暂无待审核方案。")),(ct(!0),ht(qt,null,Me(r.value,v=>{var I;return ct(),ht("div",{key:v.id,class:Ue(["scheme-item",{active:((I=a.value)==null?void 0:I.id)===v.id}]),onClick:P=>t.value=v.id},[D("div",Hb,[D("b",null,ot(v.current.params.tunnelName)+" · "+ot(v.current.params.portalName),1),_[3]||(_[3]=D("span",{class:"badge pending"},"待审核",-1))]),D("div",Vb,"v"+ot(v.current.version)+" · 返工 "+ot(v.reworkCount)+" 次 · "+ot(v.current.submittedAt),1)],10,kb)}),128)),_[4]||(_[4]=D("h3",{style:{"margin-top":"16px"}},"已审核记录",-1)),(ct(!0),ht(qt,null,Me(o.value,v=>{var I;return ct(),ht("div",{key:"h"+v.id,class:Ue(["scheme-item",{active:((I=a.value)==null?void 0:I.id)===v.id}]),onClick:P=>t.value=v.id},[D("div",Wb,[D("b",null,ot(v.current.params.tunnelName)+" · "+ot(v.current.params.portalName),1),D("span",{class:Ue(["badge",v.status])},ot(me(ns)[v.status]),3)])],10,Gb)}),128))]),a.value?(ct(),ht("section",Xb,[D("div",$b,[D("h3",null,[ue(ot(a.value.current.params.tunnelName)+" · "+ot(a.value.current.params.portalName)+" ",1),D("span",Yb,ot(a.value.current.params.stake),1)]),D("span",{class:Ue(["badge",a.value.status])},ot(me(ns)[a.value.status]),3)]),D("div",qb," 朝向 "+ot(a.value.current.params.orientation)+"° · 纬度 "+ot(a.value.current.params.latitude)+"° · 棚长 "+ot(a.value.current.params.canopyLength)+"m · 格栅间距 "+ot(a.value.current.params.grilleSpacing)+"m · 阈值 "+ot(a.value.current.params.thresholdPct)+"% · 提交人 "+ot(a.value.current.submittedBy),1),c.value?(ct(),ht("div",Kb,[Je(ea,{title:`本次提交 v${c.value.version}(${c.value.submittedAt})`,series:h(c.value,"#60a5fa"),"limit-points":f(c.value),markers:d(c.value)},null,8,["title","series","limit-points","markers"]),u.value?(ct(),qi(ea,{key:0,title:`上一版 v${u.value.version}(${u.value.submittedAt})`,series:h(u.value,"#a78bfa"),"limit-points":f(u.value),markers:d(u.value)},null,8,["title","series","limit-points","markers"])):(ct(),ht("div",jb,"首次提交, 无历史版本可对比"))])):_e("",!0),M.value.length?(ct(),ht("div",Zb,[_[6]||(_[6]=D("h4",null,"与上一版参数差异",-1)),D("table",Jb,[_[5]||(_[5]=D("thead",null,[D("tr",null,[D("th",null,"参数"),D("th",null,"上一版"),D("th",null,"本次")])],-1)),D("tbody",null,[(ct(!0),ht(qt,null,Me(M.value,v=>(ct(),ht("tr",{key:v.key},[D("td",null,ot(v.label),1),D("td",null,ot(v.prev),1),D("td",Qb,ot(v.cur),1)]))),128))])])])):_e("",!0),a.value.status==="pending"?(ct(),ht("div",tT,[l.value?(ct(),ht(qt,{key:0},[D("button",{class:"ok",onClick:p},"✔ 审核通过(锁定方案)"),D("button",{class:"danger",onClick:_[0]||(_[0]=v=>e.value=!e.value)},"✘ 退回"),e.value?(ct(),ht("div",eT,[D("label",null,[_[7]||(_[7]=ue("退回原因",-1)),ke(D("textarea",{"onUpdate:modelValue":_[1]||(_[1]=v=>i.value=v),rows:"2",placeholder:"如: 洞门处照度超阈值, 明暗过渡不满足要求"},null,512),[[on,i.value]])]),D("label",null,[_[8]||(_[8]=ue("需改参数",-1)),ke(D("textarea",{"onUpdate:modelValue":_[2]||(_[2]=v=>s.value=v),rows:"2",placeholder:"如: 减光棚长度加长至80m; 格栅间距加密至1.0m"},null,512),[[on,s.value]])]),D("button",{class:"danger",disabled:!i.value.trim()||!s.value.trim(),onClick:m},"确认退回",8,nT)])):_e("",!0)],64)):(ct(),ht("p",iT,"当前角色为「"+ot(me(pa)[me(Kt).session.role])+"」, 仅审核人可执行通过/退回。",1))])):_e("",!0),a.value.returns.length?(ct(),ht("div",sT,[_[10]||(_[10]=D("h4",null,"退回记录",-1)),(ct(!0),ht(qt,null,Me(a.value.returns,(v,I)=>(ct(),ht("div",{key:I,class:"return-item"},[D("b",null,"#"+ot(I+1),1),ue(" "+ot(v.reason)+";",1),_[9]||(_[9]=D("b",null,"需改:",-1)),ue(ot(v.paramsToFix)+" ",1),D("span",rT,"— "+ot(v.reviewer)+" "+ot(v.time),1)]))),128))])):_e("",!0),Je(up,{scheme:a.value},null,8,["scheme"])])):(ct(),ht("section",oT,"请选择左侧方案。"))]))}}),lT=Li(aT,[["__scopeId","data-v-dda5dd1f"]]),cT={class:"manage"},uT={class:"panel list"},hT=["onClick"],fT={class:"si-top"},dT={class:"muted si-sub"},pT={key:0,class:"panel detail"},mT={class:"head"},_T={class:"muted"},gT={class:"meta muted"},vT={key:1,class:"muted"},xT={class:"panel-inner"},MT={key:0,class:"muted"},yT={class:"anno-text"},ST={class:"muted"},ET={key:1,class:"anno-form"},bT=["disabled"],TT={key:2,class:"muted"},AT={key:1,class:"panel muted"},wT=Ri({__name:"ManageView",setup(n){var c;const t=ii(((c=Kt.schemes[0])==null?void 0:c.id)??""),e=ii(""),i=se(()=>Kt.schemes.find(u=>u.id===t.value)),s=se(()=>Kt.session.role==="manager"),r=se(()=>{var u,h;return((h=(u=i.value)==null?void 0:u.current.result)==null?void 0:h.points.map(f=>({x:f.x,y:f.illuminance})))??[]}),o=se(()=>{var u,h;return((h=(u=i.value)==null?void 0:u.current.result)==null?void 0:h.points.map(f=>({x:f.x,y:f.limit})))??null}),a=se(()=>{var h;const u=(h=i.value)==null?void 0:h.current.result;return u?u.points.filter(f=>f.exceeded||f.steep).map(f=>({x:f.x,y:f.illuminance,offset:f.offset,kind:f.exceeded?"exceeded":"steep"})):null});function l(){!i.value||!e.value.trim()||(ng(i.value,e.value.trim()),e.value="")}return(u,h)=>(ct(),ht("div",cT,[D("aside",uT,[h[1]||(h[1]=D("h3",null,"全部方案(只读)",-1)),(ct(!0),ht(qt,null,Me(me(Kt).schemes,f=>{var d;return ct(),ht("div",{key:f.id,class:Ue(["scheme-item",{active:((d=i.value)==null?void 0:d.id)===f.id}]),onClick:g=>t.value=f.id},[D("div",fT,[D("b",null,ot(f.current.params.tunnelName||"(未命名)")+" · "+ot(f.current.params.portalName),1),D("span",{class:Ue(["badge",f.status])},ot(me(ns)[f.status]),3)]),D("div",dT,ot(f.current.params.stake)+" · v"+ot(f.current.version),1)],10,hT)}),128))]),i.value?(ct(),ht("section",pT,[D("div",mT,[D("h3",null,[ue(ot(i.value.current.params.tunnelName)+" · "+ot(i.value.current.params.portalName)+" ",1),D("span",_T,ot(i.value.current.params.stake),1)]),D("span",{class:Ue(["badge",i.value.status])},ot(me(ns)[i.value.status]),3)]),D("div",gT," 朝向 "+ot(i.value.current.params.orientation)+"° · 纬度 "+ot(i.value.current.params.latitude)+"° · 棚长 "+ot(i.value.current.params.canopyLength)+"m · 格栅间距 "+ot(i.value.current.params.grilleSpacing)+"m · 阈值 "+ot(i.value.current.params.thresholdPct)+"% · 返工 "+ot(i.value.reworkCount)+" 次 ",1),i.value.current.result?(ct(),qi(ea,{key:0,title:"棚下照度明暗过渡曲线",series:[{name:"棚下照度",color:"#60a5fa",points:r.value}],"limit-points":o.value,markers:a.value},null,8,["series","limit-points","markers"])):(ct(),ht("p",vT,"该方案尚未运行仿真。")),D("div",xT,[h[2]||(h[2]=D("h4",null,"管理处批注",-1)),i.value.annotations.length?_e("",!0):(ct(),ht("div",MT,"暂无批注。")),(ct(!0),ht(qt,null,Me(i.value.annotations,f=>(ct(),ht("div",{key:f.id,class:"anno"},[D("span",yT,ot(f.text),1),D("span",ST,"— "+ot(f.author)+" · "+ot(f.time),1)]))),128)),s.value?(ct(),ht("div",ET,[ke(D("textarea",{"onUpdate:modelValue":h[0]||(h[0]=f=>e.value=f),rows:"2",placeholder:"填写运管批注意见, 如: 冬季傍晚西口眩光明显, 建议加密格栅"},null,512),[[on,e.value]]),D("button",{disabled:!e.value.trim(),onClick:l},"提交批注",8,bT)])):(ct(),ht("p",TT,"当前角色为「"+ot(me(pa)[me(Kt).session.role])+"」, 仅路段管理处可添加批注。",1))]),Je(up,{scheme:i.value},null,8,["scheme"])])):(ct(),ht("section",AT,"请选择左侧方案查看。"))]))}}),CT=Li(wT,[["__scopeId","data-v-a8586338"]]);function Ma(n,t,e="text/plain"){const i=new Blob(["\uFEFF"+t],{type:`${e};charset=utf-8`}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=n,r.click(),URL.revokeObjectURL(s)}function hp(n){return n.map(t=>t.map(e=>`"${String(e).replace(/"/g,'""')}"`).join(",")).join(`\r
`)}function fp(n){const t=n.current.params,e=n.current.result,i=e?e.portalIlluminance:0,s=[["入口段Ⅰ",Math.round(i),30],["入口段Ⅱ",Math.round(i*.5),30],["过渡段Ⅰ",Math.round(i*.15),36],["过渡段Ⅱ",Math.round(i*.05),48],["中间段",Math.max(200,Math.round(i*.02)),0]],r=[["段落","设计照度(lux)","段长(m)","灯具型号","单灯功率(W)","布置方式","纵向间距(m)","灯具数量(套)"]];for(const[o,a,l]of s){const c=a>5e3?400:a>1500?250:a>500?150:100,u=a>5e3?1.5:a>1500?2.5:a>500?4:8,h=l>0?Math.ceil(l/u)*2:"按洞身长度";r.push([o,a,l>0?l:"-",`LED隧道灯 ${c}W`,c,"两侧对称",u,h])}r.push([]),r.push(["隧道",t.tunnelName,"洞口",t.portalName,"桩号",t.stake]),r.push(["校核时间",(e==null?void 0:e.computedAt)??"-","洞外照度(lux)",(e==null?void 0:e.outsideIlluminance)??"-"]),Ma(`${t.tunnelName}-${t.portalName}-路灯布置表.csv`,hp(r),"text/csv")}function dp(n){const t=n.current.params,e=10.5,i=Math.floor(t.canopyLength/t.grilleSpacing)+1,s=Math.ceil(t.canopyLength/5)+1,r=e*t.grilleDepth*7.85*12,o=[["序号","材料名称","规格","单位","数量","单重(kg)","总重(kg)","备注"],[1,"格栅横梁",`型钢 ${Math.round(t.grilleDepth*1e3)}mm 高`,"根",i,Math.round(r),Math.round(r*i),`间距 ${t.grilleSpacing}m`],[2,"立柱","Φ299×10 钢管","根",s*2,180,s*2*180,"纵向间距 5m"],[3,"纵向联系梁","HM300×200","m",Math.round(t.canopyLength*2),56,Math.round(t.canopyLength*2*56),"两侧通长"],[4,"柱脚基础","C30 混凝土","m³",Math.round(s*2*1.2*10)/10,"-","-","含预埋件"],[5,"高强螺栓","M20×60 10.9S","套",i*8+s*8,"-","-","含平垫弹垫"],[6,"防腐涂装","热浸镀锌+氟碳面漆","m²",Math.round(i*e*t.grilleDepth*2),"-","-","格栅双面"]];o.push([]),o.push(["减光棚长度(m)",t.canopyLength,"格栅间距(m)",t.grilleSpacing,"格栅高度(m)",t.grilleDepth]),Ma(`${t.tunnelName}-${t.portalName}-格栅材料清单.csv`,hp(o),"text/csv")}function pp(n){const t=n.current.params,e=n.current.result,i=[];if(i.push("隧道洞门遮光棚照度校核报告"),i.push("=".repeat(40)),i.push(`隧道名称: ${t.tunnelName}    洞口: ${t.portalName}    桩号: ${t.stake}`),i.push(`洞口朝向: ${t.orientation}°(${Yo(t.orientation)})    纬度: ${t.latitude}°`),i.push(`减光棚长度: ${t.canopyLength} m    格栅间距: ${t.grilleSpacing} m    格栅高度: ${t.grilleDepth} m`),i.push(`减光段照度阈值: 洞外亮度的 ${t.thresholdPct}%`),i.push(`仿真日期时刻: ${t.simDate} ${t.simTime}`),i.push(""),e){i.push(`太阳高度角: ${e.solarAltitude}°    太阳方位角: ${e.solarAzimuth}°`),i.push(`洞外照度: ${e.outsideIlluminance} lux`),i.push(`单层格栅遮挡率: ${(e.shadingPerGrille*100).toFixed(1)}%`),i.push(`洞门处棚下照度: ${e.portalIlluminance} lux (限值 ${Math.round(e.outsideIlluminance*t.thresholdPct/100)} lux)`),i.push(`陡跳判据: 局部突变 > 限值的 ${e.jumpLimitPct}%`),i.push("");const s=e.points.filter(r=>r.exceeded||r.steep);if(s.length===0)i.push("校核结论: 全段照度及过渡梯度均满足限值要求, 通过。");else{i.push(`校核结论: 不满足。超限 ${e.exceededCount} 处, 陡跳 ${e.steepCount} 处, 最大偏移量 ${e.maxOffset} lux。`),i.push(""),i.push("超限/陡跳位置明细:"),i.push("位置x(m)	照度(lux)	限值(lux)	类型	偏移量(lux)");for(const r of s)i.push(`${r.x}	${r.illuminance}	${r.limit}	${r.exceeded?"超阈值":"陡跳"}	${r.offset}`)}i.push(""),i.push(`计算时间: ${e.computedAt}`)}else i.push("(未运行仿真)");i.push(""),i.push(`方案状态: ${n.status}    返工次数: ${n.reworkCount}    版本: v${n.current.version}`),Ma(`${t.tunnelName}-${t.portalName}-照度校核报告.txt`,i.join(`\r
`))}function of(n,t){const e=[];e.push(`隧道洞门减光棚设计交付包 — ${n}`),e.push("=".repeat(48)),e.push(`交付时间: ${new Date().toLocaleString("zh-CN",{hour12:!1})}`),e.push(`包含洞口方案 ${t.length} 个`),e.push(""),t.forEach((i,s)=>{const r=i.current.params,o=i.current.result;e.push(`--- 方案 ${s+1}: ${r.portalName} (${r.stake}) v${i.current.version} ---`),e.push(`朝向 ${r.orientation}°(${Yo(r.orientation)})  纬度 ${r.latitude}°`),e.push(`棚长 ${r.canopyLength}m  格栅间距 ${r.grilleSpacing}m  格栅高度 ${r.grilleDepth}m  阈值 ${r.thresholdPct}%`),o&&e.push(`仿真 ${r.simDate} ${r.simTime}: 洞外 ${o.outsideIlluminance} lux, 洞门处 ${o.portalIlluminance} lux, ${o.pass?"校核通过":"校核未通过"}`),e.push(`返工次数 ${i.reworkCount}, 提交版本数 ${i.history.length}`),e.push("")}),Ma(`${n}-交付包清单.txt`,e.join(`\r
`));for(const i of t)fp(i),dp(i),pp(i)}const RT={class:"delivery"},PT={class:"pkg-head"},LT={class:"muted"},DT={class:"pkg-actions"},IT=["onClick"],UT=["onClick"],NT={key:2,class:"muted"},OT={class:"grid-table"},FT={class:"flow"},BT={key:0,class:"arrow"},zT={key:1,class:"muted"},kT={class:"exports"},HT=["onClick"],VT=["onClick"],GT=["onClick"],WT={key:1,class:"muted"},XT={key:0,class:"panel muted"},$T=Ri({__name:"DeliveryView",setup(n){const t=se(()=>[...sg().entries()]);function e(o,a){return a.length>0&&a.every(l=>l.status==="approved")}function i(o){const a=["draft"];for(const l of o.audit)l.action==="提交审核"?a.push("pending"):l.action==="退回方案"?a.push("returned"):l.action==="审核通过"?a.push("approved"):l.action==="方案交付"&&a.push("delivered");return a}function s(o,a){ig(o,a.map(l=>l.id)),of(o,Kt.schemes.filter(l=>a.some(c=>c.id===l.id)))}function r(o,a){of(o,a)}return(o,a)=>(ct(),ht("div",RT,[(ct(!0),ht(qt,null,Me(t.value,([l,c])=>(ct(),ht("div",{key:l,class:"panel pkg"},[D("div",PT,[D("h3",null,[ue("🚇 "+ot(l)+" ",1),D("span",LT,"交付包("+ot(c.length)+" 个洞口方案)",1)]),D("div",DT,[e(l,c)?(ct(),ht("button",{key:0,class:"ok",onClick:u=>s(l,c)},"汇总交付(锁定并导出交付包)",8,IT)):c.every(u=>u.status==="delivered")?(ct(),ht("button",{key:1,class:"ghost",onClick:u=>r(l,c)},"重新导出交付包",8,UT)):(ct(),ht("span",NT,"待全部洞口方案审核通过后可交付"))])]),D("table",OT,[a[0]||(a[0]=D("thead",null,[D("tr",null,[D("th",null,"洞口"),D("th",null,"桩号"),D("th",null,"朝向"),D("th",null,"棚长/间距"),D("th",null,"阈值"),D("th",null,"状态流转"),D("th",null,"返工"),D("th",null,"校核"),D("th",null,"导出")])],-1)),D("tbody",null,[(ct(!0),ht(qt,null,Me(c,u=>(ct(),ht("tr",{key:u.id},[D("td",null,ot(u.current.params.portalName),1),D("td",null,ot(u.current.params.stake),1),D("td",null,ot(u.current.params.orientation)+"°",1),D("td",null,ot(u.current.params.canopyLength)+"m / "+ot(u.current.params.grilleSpacing)+"m",1),D("td",null,ot(u.current.params.thresholdPct)+"%",1),D("td",null,[D("div",FT,[(ct(!0),ht(qt,null,Me(i(u),(h,f)=>(ct(),ht(qt,{key:h},[D("span",{class:Ue(["badge",h])},ot(me(ns)[h]),3),f<i(u).length-1?(ct(),ht("span",BT,"→")):_e("",!0)],64))),128))])]),D("td",null,ot(u.reworkCount)+" 次",1),D("td",null,[u.current.result?(ct(),ht("span",{key:0,class:Ue(u.current.result.pass?"tag-ok":"tag-red")},ot(u.current.result.pass?"通过":"未通过"),3)):(ct(),ht("span",zT,"未仿真"))]),D("td",kT,[u.locked?(ct(),ht(qt,{key:0},[D("button",{class:"ghost",onClick:h=>me(fp)(u)},"路灯布置表",8,HT),D("button",{class:"ghost",onClick:h=>me(dp)(u)},"格栅材料清单",8,VT),D("button",{class:"ghost",onClick:h=>me(pp)(u)},"照度校核报告",8,GT)],64)):(ct(),ht("span",WT,"通过后锁定可导出"))])]))),128))])])]))),128)),t.value.length?_e("",!0):(ct(),ht("p",XT,"暂无方案数据。"))]))}}),YT=Li($T,[["__scopeId","data-v-b970a51c"]]),qT={class:"app"},KT={class:"topbar"},jT={class:"session"},ZT=["value"],JT={class:"tabs"},QT=["onClick"],tA={class:"main"},eA=Ri({__name:"App",setup(n){const t=[{key:"design",name:"① 方案设计与仿真"},{key:"review",name:"② 方案审核"},{key:"manage",name:"③ 管理处查看批注"},{key:"delivery",name:"④ 交付与导出"}],e=ii("design");return(i,s)=>(ct(),ht("div",qT,[D("header",KT,[s[4]||(s[4]=D("div",{class:"brand"},[D("span",{class:"logo"},"⛰"),D("div",null,[D("div",{class:"title"},"隧道洞门遮光棚日照减光仿真与方案评审系统"),D("div",{class:"subtitle"},"公路设计院隧道专业组 · 路段管理处")])],-1)),D("div",jT,[s[2]||(s[2]=D("label",null,"当前角色",-1)),ke(D("select",{"onUpdate:modelValue":s[0]||(s[0]=r=>me(Kt).session.role=r)},[(ct(!0),ht(qt,null,Me(me(pa),(r,o)=>(ct(),ht("option",{key:o,value:o},ot(r),9,ZT))),128))],512),[[Il,me(Kt).session.role]]),s[3]||(s[3]=D("label",null,"操作人",-1)),ke(D("input",{"onUpdate:modelValue":s[1]||(s[1]=r=>me(Kt).session.operator=r),style:{width:"110px"}},null,512),[[on,me(Kt).session.operator]])])]),D("nav",JT,[(ct(),ht(qt,null,Me(t,r=>D("button",{key:r.key,class:Ue(["tab",{active:e.value===r.key}]),onClick:o=>e.value=r.key},ot(r.name),11,QT)),64))]),D("main",tA,[e.value==="design"?(ct(),qi(Db,{key:0})):e.value==="review"?(ct(),qi(lT,{key:1})):e.value==="manage"?(ct(),qi(CT,{key:2})):(ct(),qi(YT,{key:3}))])]))}}),nA=Li(eA,[["__scopeId","data-v-7cbd712f"]]);k_(nA).mount("#app");
