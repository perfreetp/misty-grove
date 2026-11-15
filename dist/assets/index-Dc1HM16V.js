var Tp=Object.defineProperty;var $u=n=>{throw TypeError(n)};var wp=(n,t,e)=>t in n?Tp(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var dn=(n,t,e)=>wp(n,typeof t!="symbol"?t+"":t,e),pl=(n,t,e)=>t.has(n)||$u("Cannot "+e);var Q=(n,t,e)=>(pl(n,t,"read from private field"),e?e.call(n):t.get(n)),me=(n,t,e)=>t.has(n)?$u("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),he=(n,t,e,i)=>(pl(n,t,"write to private field"),i?i.call(n,e):t.set(n,e),e),ee=(n,t,e)=>(pl(n,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const Ah=!1;var il=Array.isArray,Ap=Array.prototype.indexOf,Ua=Array.prototype.includes,rl=Array.from,Rh=Object.defineProperty,Rs=Object.getOwnPropertyDescriptor,Rp=Object.getOwnPropertyDescriptors,Cp=Object.prototype,Pp=Array.prototype,Ch=Object.getPrototypeOf,Ku=Object.isExtensible;const Lp=()=>{};function Dp(n){for(var t=0;t<n.length;t++)n[t]()}function Ph(){var n,t,e=new Promise((i,r)=>{n=i,t=r});return{promise:e,resolve:n,reject:t}}function Ip(n,t){if(Array.isArray(n))return n;if(!(Symbol.iterator in n))return Array.from(n);const e=[];for(const i of n)if(e.push(i),e.length===t)break;return e}const mn=2,Hs=4,sl=8,Lh=1<<24,ai=16,hi=32,vr=64,ac=128,pu=256,ci=512,Je=1024,Ie=2048,Bn=4096,Sn=8192,on=16384,Qs=32768,Na=1<<25,Vs=65536,Ho=1<<17,Up=1<<18,ta=1<<19,Np=1<<20,yi=1<<25,Vo=1<<21,Cs=1<<22,ur=1<<23,Gr=Symbol("$state"),Dh=Symbol("component"),Fp=Symbol("legacy props"),Op=Symbol(""),Lo=Symbol("attributes"),oc=Symbol("class"),lc=Symbol("style"),_a=Symbol("text"),Do=Symbol("form reset"),Ya=new class extends Error{constructor(){super(...arguments);dn(this,"name","StaleReactionError");dn(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var Eh;const Bp=!!((Eh=globalThis.document)!=null&&Eh.contentType)&&globalThis.document.contentType.includes("xml"),kp=1,zp=2,Ih=4,Hp=8,Vp=16,Gp=1,Wp=4,Xp=8,Yp=16,qp=1,jp=2,Uh={},Ke=Symbol("uninitialized"),Zp="http://www.w3.org/1999/xhtml";function $p(){console.warn("https://svelte.dev/e/derived_inert")}function Kp(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function Jp(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Nh(n){return n===this.v}function Qp(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function Fh(n){return!Qp(n,this.v)}function Oh(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function tm(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function em(n,t,e){throw new Error("https://svelte.dev/e/each_key_duplicate")}function nm(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function im(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function rm(n){throw new Error("https://svelte.dev/e/effect_orphan")}function sm(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function am(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function om(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function lm(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function cm(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function um(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let dm=!1,ln=null;function Gs(n){ln=n}function En(n,t=!1,e){ln={p:ln,i:!1,c:null,e:null,s:n,x:null,r:Ee,l:null}}function Tn(n){var t=ln,e=t.e;if(e!==null){t.e=null;for(var i of e)cf(i)}return t.i=!0,ln=t.p,mu(n)}function mu(n={}){return Rh(n,Dh,{value:!0}),n}function Bh(){return!0}let Ir=[];function kh(){var n=Ir;Ir=[],Dp(n)}function cr(n){if(Ir.length===0&&!Ea){var t=Ir;queueMicrotask(()=>{t===Ir&&kh()})}Ir.push(n)}function hm(){for(;Ir.length>0;)kh()}const fm=-7169;function He(n,t){n.f=n.f&fm|t}function vu(n){(n.f&ci)!==0||n.deps===null?He(n,Je):He(n,Bn)}function zh(n,t){(n.f&Ie)!==0?t.set(n,Ie):(n.f&Bn)!==0&&t.get(n)!==Ie&&t.set(n,Bn),He(n,Je)}let Ju=!1;function pm(){Ju||(Ju=!0,document.addEventListener("reset",n=>{Promise.resolve().then(()=>{var t;if(!n.defaultPrevented)for(const e of n.target.elements)(t=e[Do])==null||t.call(e)})},{capture:!0}))}function qa(n){var t=fe,e=Ee;Zn(null),wi(null);try{return n()}finally{Zn(t),wi(e)}}function Hh(n,t,e,i=e){n.addEventListener(t,()=>qa(e));const r=n[Do];r?n[Do]=()=>{r(),i(!0)}:n[Do]=()=>i(!0),pm()}function mm(n,t,e,i){const r=Fa;var s=n.filter(f=>!f.settled),a=t.map(r);if(e.length===0&&s.length===0){i(a);return}var o=Ee,l=vm(),c=s.length===1?s[0].promise:s.length>1?Promise.all(s.map(f=>f.promise)):null;function u(f){if((o.f&on)===0){l();try{i([...a,...f])}catch(v){xi(v,o)}Go()}}var d=Vh();if(e.length===0){c.then(()=>u([])).finally(d);return}function p(){Promise.all(e.map(f=>_m(f))).then(u).catch(f=>xi(f,o)).finally(d)}c?c.then(()=>{if((o.f&on)!==0){d();return}l(),p(),Go()}):p()}function vm(){var n=Ee,t=fe,e=ln,i=jt;return function(s=!0){wi(n),Zn(t),Gs(e),s&&(n.f&on)===0&&(i==null||i.activate(),i==null||i.apply())}}function Go(n=!0){wi(null),Zn(null),Gs(null),n&&(jt==null||jt.deactivate())}function Vh(){var n=Ee,t=n.b,e=jt,i=!!(t!=null&&t.is_rendered());return t==null||t.update_pending_count(1,e),e.increment(i,n),()=>{t==null||t.update_pending_count(-1,e),e.decrement(i,n)}}function Fa(n){var t=mn|Ie;return Ee!==null&&(Ee.f|=ta),{ctx:ln,deps:null,effects:null,equals:Nh,f:t,fn:n,reactions:null,rv:0,v:Ke,wv:0,parent:Ee,ac:null}}const ga=Symbol("obsolete");function _m(n,t,e){let i=Ee;i===null&&tm();var r=void 0,s=qr(Ke),a=!fe,o=new Set;return Dm(()=>{var f,v;var l=Ee,c=Ph();r=c.promise;try{Promise.resolve(n()).then(c.resolve,_=>{_!==Ya&&c.reject(_)}).finally(Go)}catch(_){c.reject(_),Go()}var u=jt;if(a){if((l.f&Qs)!==0)var d=Vh();if((f=i.b)!=null&&f.is_rendered())(v=u.async_deriveds.get(l))==null||v.reject(ga);else for(const _ of o.values())_.reject(ga);o.add(c),u.async_deriveds.set(l,c)}const p=(_,m=void 0)=>{d==null||d(),o.delete(c),m!==ga&&(u.activate(),m?(s.f|=ur,Ws(s,m)):((s.f&ur)!==0&&(s.f^=ur),Ws(s,_)),u.deactivate())};c.promise.then(p,_=>p(null,_||"unknown"))}),lf(()=>{for(const l of o)l.reject(ga)}),new Promise(l=>{function c(u){function d(){u===r?l(s):c(r)}u.then(d,d)}c(r)})}function ge(n){const t=Fa(n);return mf(t),t}function Gh(n){const t=Fa(n);return t.equals=Fh,t}function gm(n){var t=n.effects;if(t!==null){n.effects=null;for(var e=0;e<t.length;e+=1)Cn(t[e])}}function _u(n){var t,e=Ee,i=n.parent;if(!qi&&i!==null&&n.v!==Ke&&(i.f&(on|Sn))!==0)return $p(),n.v;wi(i);try{gm(n),t=xf(n)}finally{wi(e)}return t}function Wh(n){var t=_u(n);if(!n.equals(t)&&(n.wv=_f(),(!(jt!=null&&jt.is_fork)||n.deps===null)&&(jt!==null?(jt.capture(n,t,!0),dr==null||dr.capture(n,t,!0)):n.v=t,n.deps===null))){He(n,Je);return}qi||(an!==null?(yu()||jt!=null&&jt.is_fork)&&an.set(n,t):vu(n))}function xm(n){var t;if(n.effects!==null)for(const e of n.effects)(e.teardown||e.ac)&&((t=e.teardown)==null||t.call(e),e.ac!==null&&qa(()=>{e.ac.abort(Ya),e.ac=null}),e.fn!==null&&(e.teardown=Lp),Oa(e,0),Su(e))}function Xh(n){if(n.effects!==null)for(const t of n.effects)t.teardown&&t.fn!==null&&Xs(t)}let ml=null,ss=null,jt=null,dr=null,an=null,cc=null,Ea=!1,vl=!1,Ta=null,Io=null;var Qu=0;let ym=1;var Ns,Fs,Os,Bi,Bs,ki,Va,pi,mi,ks,kr,_e,uc,Yh,dc,xa,hc,qh,jh,Zh,Es,Mm,ya;const tl=class tl{constructor(){me(this,_e);dn(this,"id",ym++);dn(this,"started",!1);dn(this,"linked",!0);dn(this,"prev",null);dn(this,"next",null);dn(this,"async_deriveds",new Map);dn(this,"current",new Map);dn(this,"previous",new Map);me(this,Ns,new Set);me(this,Fs,new Set);me(this,Os,0);me(this,Bi,new Map);me(this,Bs,null);me(this,ki,[]);me(this,Va,[]);me(this,pi,new Map);me(this,mi,new Map);me(this,ks,new Set);dn(this,"is_fork",!1);me(this,kr,!1);ss===null?ml=ss=this:(ss.next=this,this.prev=ss),ss=this}skip_effect(t){Q(this,mi).has(t)||Q(this,mi).set(t,{d:[],m:[]}),Q(this,ks).delete(t)}unskip_effect(t,e=i=>this.schedule(i)){var i=Q(this,mi).get(t);if(i){Q(this,mi).delete(t);for(var r of i.d)He(r,Ie),e(r);for(r of i.m)He(r,Bn),e(r)}Q(this,ks).add(t)}capture(t,e,i=!1){t.v!==Ke&&!this.previous.has(t)&&this.previous.set(t,t.v),(t.f&ur)===0&&(this.current.set(t,[e,i]),an==null||an.set(t,e)),this.is_fork||(t.v=e)}activate(){jt=this}deactivate(){jt=null,an=null}flush(){try{vl=!0,jt=this,ee(this,_e,xa).call(this)}finally{Qu=0,cc=null,Ta=null,Io=null,vl=!1,jt=null,an=null,bi.clear()}}discard(){var t;for(const e of Q(this,Fs))e(this);Q(this,Fs).clear();for(const e of this.async_deriveds.values())e.reject(ga);ee(this,_e,ya).call(this),(t=Q(this,Bs))==null||t.resolve()}register_created_effect(t){Q(this,Va).push(t)}increment(t,e){if(he(this,Os,Q(this,Os)+1),t){let i=Q(this,Bi).get(e)??0;Q(this,Bi).set(e,i+1)}}decrement(t,e){if(he(this,Os,Q(this,Os)-1),t){let i=Q(this,Bi).get(e)??0;i===1?Q(this,Bi).delete(e):Q(this,Bi).set(e,i-1)}Q(this,kr)||(he(this,kr,!0),cr(()=>{he(this,kr,!1),this.linked&&this.flush()}))}transfer_reactions(t){for(const[e,i]of t)this.add_dirty_reaction(e,i);t.clear()}add_dirty_reaction(t,e){(e===Ie||Q(this,pi).get(t)!==Ie)&&Q(this,pi).set(t,e)}oncommit(t){Q(this,Ns).add(t)}ondiscard(t){Q(this,Fs).add(t)}settled(){return(Q(this,Bs)??he(this,Bs,Ph())).promise}static ensure(){if(jt===null){const t=jt=new tl;!vl&&!Ea&&cr(()=>{t.started||t.flush()})}return jt}apply(){{an=null;return}}schedule(t){var e;if(cc=t,(e=t.b)!=null&&e.is_pending&&(t.f&(Hs|sl|Lh))!==0&&(t.f&Qs)===0){t.b.defer_effect(t);return}Q(this,ki).push(t)}};Ns=new WeakMap,Fs=new WeakMap,Os=new WeakMap,Bi=new WeakMap,Bs=new WeakMap,ki=new WeakMap,Va=new WeakMap,pi=new WeakMap,mi=new WeakMap,ks=new WeakMap,kr=new WeakMap,_e=new WeakSet,uc=function(){if(this.is_fork)return!0;for(const t of Q(this,Bi).keys())if(!ee(this,_e,Yh).call(this,t))return!0;return!1},Yh=function(t){for(var e=t;e!==null;e=e.parent)if(Q(this,mi).has(e))return!0;return!1},dc=function(){var t=[];for(const s of Q(this,ki))if(!((s.f&on)!==0||(s.f&(Ie|Bn))===0)){for(var e=s,i=!1;e.parent!==null;){e=e.parent;var r=e.f;if((r&(vr|hi))!==0){if((r&Je)===0){i=!0;break}e.f^=Je}}i||t.push(e)}return he(this,ki,[]),t},xa=function(){var o,l,c,u;this.started=!0;for(const[d,p]of Q(this,pi))He(d,p),this.schedule(d);this.apply();for(var t=Ta=[],e=[],i=Io=[];Q(this,ki).length>0;){Qu++>1e3&&(ee(this,_e,ya).call(this),bm());for(const d of ee(this,_e,dc).call(this))try{ee(this,_e,hc).call(this,d,t,e)}catch(p){throw Jh(d),ee(this,_e,uc).call(this)||this.discard(),p}}if(jt=null,i.length>0){var r=tl.ensure();for(const d of i)r.schedule(d)}if(Ta=null,Io=null,ee(this,_e,uc).call(this)){ee(this,_e,Es).call(this,e),ee(this,_e,Es).call(this,t);for(const[d,p]of Q(this,mi))Kh(d,p);i.length>0&&ee(o=jt,_e,xa).call(o);return}const s=ee(this,_e,qh).call(this);if(s){ee(this,_e,Es).call(this,e),ee(this,_e,Es).call(this,t),ee(l=s,_e,Zh).call(l,this);return}Q(this,pi).clear();for(const d of Q(this,Ns))d(this);Q(this,Ns).clear(),dr=this,td(e),td(t),dr=null,(c=Q(this,Bs))==null||c.resolve();var a=jt;Q(this,Os)===0&&(Q(this,ki).length===0||a!==null)&&ee(this,_e,ya).call(this),a!==null&&(bi.clear(),ee(u=a,_e,xa).call(u))},hc=function(t,e,i){t.f^=Je;for(var r=t.first;r!==null;){var s=r.f,a=(s&(hi|vr))!==0,o=a&&(s&Je)!==0,l=o||(s&Sn)!==0||Q(this,mi).has(r);if(!l&&r.fn!==null){a?r.f^=Je:(s&Hs)!==0?e.push(r):Za(r)&&((s&ai)!==0&&this.add_dirty_reaction(r,Bn),Xs(r));var c=r.first;if(c!==null){r=c;continue}}for(;r!==null;){var u=r.next;if(u!==null){r=u;break}r=r.parent}}},qh=function(){for(var t=this.prev;t!==null;t=t.prev)if(!t.is_fork&&ee(this,_e,jh).call(this,t))return t;return null},jh=function(t){for(const[e,[,i]]of this.current)if(!i&&t.current.has(e))return!0;return!1},Zh=function(t){var i;for(const[r,s]of t.current)!this.previous.has(r)&&t.previous.has(r)&&this.previous.set(r,t.previous.get(r)),this.current.set(r,s);for(const[r,s]of t.async_deriveds){const a=this.async_deriveds.get(r);a&&s.promise.then(a.resolve).catch(a.reject)}t.async_deriveds.clear(),this.transfer_reactions(Q(t,pi));const e=r=>{var s=r.reactions;if(s!==null&&!((r.f&mn)!==0&&(r.f&(Ie|Bn))===0))for(const l of s){var a=l.f;if((a&mn)!==0)e(l);else{var o=l;a&(Cs|ai)&&!this.async_deriveds.has(o)&&(Q(this,pi).delete(o),He(o,Ie),this.schedule(o))}}};for(const r of this.current.keys())e(r);this.oncommit(()=>t.discard()),ee(i=t,_e,ya).call(i),jt=this,ee(this,_e,xa).call(this)},Es=function(t){for(var e=0;e<t.length;e+=1)zh(t[e],Q(this,pi))},Mm=function(){var d,p;for(let f=ml;f!==null;f=f.next){var t=f.id<this.id,e=[];for(const[v,[_,m]]of this.current){if(f.current.has(v)){var i=f.current.get(v)[0];if(t&&_!==i)f.current.set(v,[_,m]);else continue}e.push(v)}if(t)for(const[v,_]of this.async_deriveds){const m=f.async_deriveds.get(v);m&&_.promise.then(m.resolve).catch(m.reject)}var r=[...f.current.keys()].filter(v=>!f.current.get(v)[1]);if(!(!f.started||r.length===0)){var s=r.filter(v=>!this.current.has(v));if(s.length===0)t&&f.discard();else if(e.length>0){if(t)for(const v of Q(this,ks))f.unskip_effect(v,_=>{var m;(_.f&(ai|Cs))!==0?f.schedule(_):ee(m=f,_e,Es).call(m,[_])});f.activate();var a=new Set,o=new Map;for(var l of e)$h(l,s,a,o);o=new Map;var c=[...f.current].filter(([v,_])=>{const m=this.current.get(v);return m?m[0]!==_[0]||m[1]!==_[1]:!0}).map(([v])=>v);if(c.length>0)for(const v of Q(this,Va))(v.f&(on|Sn|Ho))===0&&gu(v,c,o)&&((v.f&(Cs|ai))!==0?(He(v,Ie),f.schedule(v)):f.add_dirty_reaction(v,Ie));if(Q(f,ki).length>0&&!Q(f,kr)){f.apply();for(var u of ee(d=f,_e,dc).call(d))ee(p=f,_e,hc).call(p,u,[],[])}f.deactivate()}}}},ya=function(){if(this.linked){var t=this.prev,e=this.next;t===null?ml=e:t.next=e,e===null?ss=t:e.prev=t,this.linked=!1}};let Yr=tl;function Sm(n){var t=Ea,e=dr;dr=null,Ea=!0;try{for(var i;;){if(hm(),jt===null)return i;jt.flush()}}finally{Ea=t,dr=e}}function bm(){try{sm()}catch(n){xi(n,cc)}}let ei=null;function td(n){var t=n.length;if(t!==0){for(var e=0;e<t;){var i=n[e++];if((i.f&(on|Sn))===0&&Za(i)&&(ei=new Set,Xs(i),i.deps===null&&i.first===null&&i.nodes===null&&i.teardown===null&&i.ac===null&&hf(i),(ei==null?void 0:ei.size)>0)){bi.clear();for(const r of ei){if((r.f&(on|Sn))!==0)continue;const s=[r];let a=r.parent;for(;a!==null;)ei.has(a)&&(ei.delete(a),s.push(a)),a=a.parent;for(let o=s.length-1;o>=0;o--){const l=s[o];(l.f&(on|Sn))===0&&Xs(l)}}ei.clear()}}ei=null}}function $h(n,t,e,i){if(!e.has(n)&&(e.add(n),n.reactions!==null))for(const r of n.reactions){const s=r.f;(s&mn)!==0?$h(r,t,e,i):(s&(Cs|ai))!==0&&(s&Ie)===0&&gu(r,t,i)&&(He(r,Ie),xu(r))}}function gu(n,t,e){const i=e.get(n);if(i!==void 0)return i;if(n.deps!==null)for(const r of n.deps){if(Ua.call(t,r))return!0;if((r.f&mn)!==0&&gu(r,t,e))return e.set(r,!0),!0}return e.set(n,!1),!1}function xu(n){jt.schedule(n)}function Kh(n,t){if(!((n.f&hi)!==0&&(n.f&Je)!==0)){(n.f&Ie)!==0?t.d.push(n):(n.f&Bn)!==0&&t.m.push(n),He(n,Je);for(var e=n.first;e!==null;)Kh(e,t),e=e.next}}function Jh(n){He(n,Je);for(var t=n.first;t!==null;)Jh(t),t=t.next}let Wo=new Set;const bi=new Map;let Qh=!1;function qr(n,t){var e={f:0,v:n,reactions:null,equals:Nh,rv:0,wv:0};return e}function ae(n,t){const e=qr(n);return mf(e),e}function Em(n,t=!1,e=!0){const i=qr(n);return t||(i.equals=Fh),i}function St(n,t,e=!1){fe!==null&&(!oi||(fe.f&Ho)!==0)&&Bh()&&(fe.f&(mn|ai|Cs|Ho))!==0&&(Ei===null||!Ei.has(n))&&cm();let i=e?rn(t):t;return Ws(n,i,Io)}var Pr=null,fc=0;function Ws(n,t,e=null){if(!n.equals(t)){qi?bi.set(n,t):bi.has(n)||bi.set(n,n.v);var i=Yr.ensure();if(i.capture(n,t),(n.f&mn)!==0){const r=n;(n.f&Ie)!==0&&_u(r),an===null&&vu(r)}n.wv=_f(),Pr=null,fc=0,tf(n,Ie,e),Pr=null,Ee!==null&&(Ee.f&Je)!==0&&(Ee.f&(hi|vr))===0&&(Gn===null?Nm([n]):Gn.push(n)),!i.is_fork&&Wo.size>0&&!Qh&&Tm()}return t}function Tm(){Qh=!1;for(const n of Wo){(n.f&Je)!==0&&He(n,Bn);let t;try{t=Za(n)}catch{t=!0}t&&Xs(n)}Wo.clear()}function wa(n){St(n,n.v+1)}function tf(n,t,e){var i=n.reactions;if(i!==null){var r=i.length;if(fc+=r,fc>1e5&&Pr===null&&(Pr=new Set),Pr!==null){if(Pr.has(n))return;Pr.add(n)}for(var s=0;s<r;s++){var a=i[s],o=a.f,l=(o&Ie)===0;if(l&&He(a,t),(o&Ho)!==0)Wo.add(a);else if((o&mn)!==0){var c=a;an==null||an.delete(c),tf(c,Bn,e)}else if(l){var u=a;(o&ai)!==0&&ei!==null&&ei.add(u),e!==null?e.push(u):xu(u)}}}}function rn(n){if(typeof n!="object"||n===null||Gr in n||Dh in n)return n;const t=Ch(n);if(t!==Cp&&t!==Pp)return n;var e=new Map,i=il(n),r=ae(0),s=Xr,a=o=>{if(Xr===s)return o();var l=fe,c=Xr;Zn(null),rd(s);var u=o();return Zn(l),rd(c),u};return i&&e.set("length",ae(n.length)),new Proxy(n,{defineProperty(o,l,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&om();var u=e.get(l);return u===void 0?a(()=>{var d=ae(c.value);return e.set(l,d),d}):St(u,c.value,!0),!0},deleteProperty(o,l){var c=e.get(l);if(c===void 0){if(l in o){const u=a(()=>ae(Ke));e.set(l,u),wa(r)}}else St(c,Ke),wa(r);return!0},get(o,l,c){var f;if(l===Gr)return n;var u=e.get(l),d=l in o;if(u===void 0&&(!d||(f=Rs(o,l))!=null&&f.writable)&&(u=a(()=>{var v=rn(d?o[l]:Ke),_=ae(v);return _}),e.set(l,u)),u!==void 0){var p=x(u);return p===Ke?void 0:p}return Reflect.get(o,l,c)},getOwnPropertyDescriptor(o,l){var p;(p=this.has)==null||p.call(this,o,l);var c=Reflect.getOwnPropertyDescriptor(o,l),u=e.get(l);if(u!==void 0){var d=x(u);if(d===Ke)return;if(c&&"value"in c)c.value=d;else return{enumerable:!0,configurable:!0,value:d,writable:!0}}return c},has(o,l){var p;if(l===Gr)return!0;var c=e.get(l),u=c!==void 0&&c.v!==Ke||Reflect.has(o,l);if(c!==void 0||(Ee!==null||fe!==null)&&(!u||(p=Rs(o,l))!=null&&p.writable)){c===void 0&&(c=a(()=>{var f=u?rn(o[l]):Ke,v=ae(f);return v}),e.set(l,c));var d=x(c);if(d===Ke)return!1}return u},set(o,l,c,u){var T;var d=e.get(l),p=l in o;if(i&&l==="length")for(var f=c;f<d.v;f+=1){var v=e.get(f+"");v!==void 0?St(v,Ke):f in o&&(v=a(()=>ae(Ke)),e.set(f+"",v))}if(d===void 0)(!p||(T=Rs(o,l))!=null&&T.writable)&&(d=a(()=>ae(void 0)),St(d,rn(c)),e.set(l,d));else{p=d.v!==Ke;var _=a(()=>rn(c));St(d,_)}var m=Reflect.getOwnPropertyDescriptor(o,l);if(m!=null&&m.set&&m.set.call(u,c),!p){if(i&&typeof l=="string"){var h=e.get("length"),S=Number(l);Number.isInteger(S)&&S>=h.v&&St(h,S+1)}wa(r)}return!0},ownKeys(o){x(r);var l=Reflect.ownKeys(o).filter(d=>{var p=e.get(d);return p===void 0||p.v!==Ke});for(var[c,u]of e)u.v!==Ke&&!(c in o)&&l.push(c);return l},setPrototypeOf(){lm()}})}function ed(n){try{if(n!==null&&typeof n=="object"&&Gr in n)return n[Gr]}catch{}return n}function ef(n,t){return Object.is(ed(n),ed(t))}var nd,nf,rf,sf;function wm(){if(nd===void 0){nd=window,nf=/Firefox/.test(navigator.userAgent);var n=Element.prototype,t=Node.prototype,e=Text.prototype;rf=Rs(t,"firstChild").get,sf=Rs(t,"nextSibling").get,Ku(n)&&(n[oc]=void 0,n[Lo]=null,n[lc]=void 0,n.__e=void 0),Ku(e)&&(e[_a]=void 0)}}function Gi(n=""){return document.createTextNode(n)}function jr(n){return rf.call(n)}function ja(n){return sf.call(n)}function j(n,t){return jr(n)}function Ue(n,t=!1){{var e=jr(n);return e instanceof Comment&&e.data===""?ja(e):e}}function yt(n,t=!1){return jr(n)}function L(n,t=1,e=!1){let i=n;for(;t--;)i=ja(i);return i}function Am(n){n.textContent=""}function af(){return!1}function of(n,t,e){return e?document.createElement(n,{is:e}):document.createElement(n)}function Rm(n){var t=Ee;if(t===null)return fe.f|=ur,n;if((t.f&Qs)===0&&(t.f&Hs)===0)throw n;xi(n,t)}function xi(n,t){if(n===Uh)throw n;if(!(t!==null&&(t.f&on)!==0)){for(;t!==null;){if((t.f&ac)!==0&&(t.f&(on|Na))===0){if((t.f&Qs)===0)throw n;try{t.b.error(n);return}catch(e){n=e}}t=t.parent}throw n}}function Cm(n){Ee===null&&(fe===null&&rm(),im()),qi&&nm()}function Pm(n,t){var e=t.last;e===null?t.last=t.first=n:(e.next=n,n.prev=e,t.last=n)}function Zi(n,t){var e=Ee;e!==null&&(e.f&Sn)!==0&&(n|=Sn);var i={ctx:ln,deps:null,nodes:null,f:n|Ie|ci,first:null,fn:t,last:null,next:null,parent:e,b:e&&e.b,prev:null,teardown:null,wv:0,ac:null};jt==null||jt.register_created_effect(i);var r=i;if((n&Hs)!==0)Ta!==null?Ta.push(i):Yr.ensure().schedule(i);else if(t!==null){try{Xs(i)}catch(a){throw Cn(i),a}r.deps===null&&r.teardown===null&&r.nodes===null&&r.first===r.last&&(r.f&ta)===0&&(r=r.first,(n&ai)!==0&&(n&Vs)!==0&&r!==null&&(r.f|=Vs))}if(r!==null&&(r.parent=e,e!==null&&Pm(r,e),fe!==null&&(fe.f&mn)!==0&&(n&vr)===0)){var s=fe;(s.effects??(s.effects=[])).push(r)}return i}function yu(){return fe!==null&&!oi}function lf(n){const t=Zi(sl,null);return He(t,Je),t.teardown=n,t}function Zr(n){Cm();var t=Ee.f,e=!fe&&(t&hi)!==0&&ln!==null&&!ln.i;if(e){var i=ln;(i.e??(i.e=[])).push(n)}else return cf(n)}function cf(n){return Zi(Hs|Np,n)}function Lm(n){Yr.ensure();const t=Zi(vr|ta,n);return(e={})=>new Promise(i=>{e.outro?Wr(t,()=>{Cn(t),i(void 0)}):(Cn(t),i(void 0))})}function uf(n){return Zi(Hs,n)}function Dm(n){return Zi(Cs|ta,n)}function Mu(n,t=0){return Zi(sl|t,n)}function zt(n,t=[],e=[],i=[]){mm(i,t,e,r=>{Zi(sl,()=>{n(...r.map(x))})})}function al(n,t=0){var e=Zi(ai|t,n);return e}function Yn(n){return Zi(hi|ta,n)}function df(n){var t=n.teardown;if(t!==null){const e=qi,i=fe;id(!0),Zn(null);try{t.call(null)}catch(r){xi(r,n.parent)}finally{id(e),Zn(i)}}}function Su(n,t=!1){var e=n.first;for(n.first=n.last=null;e!==null;){const r=e.ac;r!==null&&qa(()=>{r.abort(Ya)});var i=e.next;(e.f&vr)!==0?e.parent=null:Cn(e,t),e=i}}function Im(n){for(var t=n.first;t!==null;){var e=t.next;(t.f&hi)===0&&Cn(t),t=e}}function Cn(n,t=!0){var e=!1;(t||(n.f&Up)!==0)&&n.nodes!==null&&n.nodes.end!==null&&(Um(n.nodes.start,n.nodes.end),e=!0),n.f|=Na,Su(n,t&&!e),Oa(n,0);var i=n.nodes&&n.nodes.t;if(i!==null)for(const s of i)s.stop();df(n),n.f^=Na,n.f|=on;var r=n.parent;r!==null&&r.first!==null&&hf(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function Um(n,t){for(;n!==null;){var e=n===t?null:ja(n);n.remove(),n=e}}function hf(n){var t=n.parent,e=n.prev,i=n.next;e!==null&&(e.next=i),i!==null&&(i.prev=e),t!==null&&(t.first===n&&(t.first=i),t.last===n&&(t.last=e))}function Wr(n,t,e=!0){var i=[];n.f|=pu,ff(n,i,!0);var r=()=>{e&&Cn(n),t&&t()},s=i.length;if(s>0){var a=()=>--s||r();for(var o of i)o.out(a)}else r()}function ff(n,t,e){if((n.f&Sn)===0){n.f^=Sn;var i=n.nodes&&n.nodes.t;if(i!==null)for(const o of i)(o.is_global||e)&&t.push(o);for(var r=n.first;r!==null;){var s=r.next;if((r.f&vr)===0){var a=(r.f&Vs)!==0||(r.f&hi)!==0&&(n.f&ai)!==0;ff(r,t,a?e:!1)}r=s}}}function Xo(n){n.f&=~pu,pf(n,!0)}function pf(n,t){if((n.f&pu)===0&&(n.f&Sn)!==0){n.f^=Sn,(n.f&Je)===0&&(He(n,Ie),Yr.ensure().schedule(n));for(var e=n.first;e!==null;){var i=e.next,r=(e.f&Vs)!==0||(e.f&hi)!==0;pf(e,r?t:!1),e=i}var s=n.nodes&&n.nodes.t;if(s!==null)for(const a of s)(a.is_global||t)&&a.in()}}function bu(n,t){if(n.nodes)for(var e=n.nodes.start,i=n.nodes.end;e!==null;){var r=e===i?null:ja(e);t.append(e),e=r}}let qi=!1;function id(n){qi=n}let fe=null,oi=!1;function Zn(n){fe=n}let Ee=null;function wi(n){Ee=n}let Ei=null;function mf(n){fe!==null&&((fe.f&Vo)!==0||(fe.f&mn)!==0)&&(Ei??(Ei=new Set)).add(n)}let Rn=null,On=0,Gn=null;function Nm(n){Gn=n}let vf=1,Ur=0,Xr=Ur;function rd(n){Xr=n}function _f(){return++vf}function Za(n){var t=n.f;if((t&Ie)!==0)return!0;if((t&Bn)!==0){for(var e=n.deps,i=e.length,r=0;r<i;r++){var s=e[r];if(Za(s)&&Wh(s),s.wv>n.wv)return!0}(t&ci)!==0&&an===null&&He(n,Je)}return!1}function gf(n,t,e=!0){var i=n.reactions;if(i!==null&&!(Ei!==null&&Ei.has(n)))for(var r=0;r<i.length;r++){var s=i[r];(s.f&mn)!==0?gf(s,t,!1):t===s&&(e?He(s,Ie):(s.f&Je)!==0&&He(s,Bn),xu(s))}}function xf(n){var t=Rn,e=On,i=Gn,r=fe,s=Ei,a=ln,o=oi,l=Xr,c=n.f;Rn=null,On=0,Gn=null,fe=(c&(hi|vr))===0?n:null,Ei=null,Gs(n.ctx),oi=!1,Xr=++Ur,n.ac!==null&&(qa(()=>{n.ac.abort(Ya)}),n.ac=null);try{n.f|=Vo;var u=n.fn,d=u();n.f|=Qs;var p=sd(n);if(Bh()&&Gn!==null&&!oi&&p!==null&&(n.f&(mn|Bn|Ie))===0)for(var f=0;f<Gn.length;f++)gf(Gn[f],n);if(r!==null&&r!==n){if(Ur++,r.deps!==null)for(let v=0;v<e;v+=1)r.deps[v].rv=Ur;if(t!==null)for(const v of t)v.rv=Ur;Gn!==null&&(i===null?i=Gn:i.push(...Gn))}return(n.f&ur)!==0&&(n.f^=ur),d}catch(v){return sd(n),Rm(v)}finally{n.f^=Vo,Rn=t,On=e,Gn=i,fe=r,Ei=s,Gs(a),oi=o,Xr=l}}function sd(n){var r;var t=n.deps,e=jt==null?void 0:jt.is_fork;if(Rn!==null){var i;if(e||Oa(n,On),t!==null&&On>0)for(t.length=On+Rn.length,i=0;i<Rn.length;i++)t[On+i]=Rn[i];else n.deps=t=Rn;if(yu()&&(n.f&ci)!==0)for(i=On;i<t.length;i++)((r=t[i]).reactions??(r.reactions=[])).push(n)}else!e&&t!==null&&On<t.length&&(Oa(n,On),t.length=On);return t}function Fm(n,t){let e=t.reactions;if(e!==null){var i=Ap.call(e,n);if(i!==-1){var r=e.length-1;r===0?e=t.reactions=null:(e[i]=e[r],e.pop())}}if(e===null&&(t.f&mn)!==0&&(Rn===null||!Ua.call(Rn,t))){var s=t;(s.f&ci)!==0&&(s.f^=ci),s.v!==Ke&&vu(s),s.ac!==null&&qa(()=>{s.ac.abort(Ya),s.ac=null,He(s,Ie)}),xm(s),Oa(s,0)}}function Oa(n,t){var e=n.deps;if(e!==null)for(var i=t;i<e.length;i++)Fm(n,e[i])}function Xs(n){var t=n.f;if((t&on)===0){He(n,Je);var e=Ee;Ee=n;try{(t&(ai|Lh))!==0?Im(n):Su(n),df(n);var i=xf(n);n.teardown=typeof i=="function"?i:null,n.wv=vf;var r;Ah&&dm&&(n.f&Ie)!==0&&n.deps}finally{Ee=e}}}async function Om(){await Promise.resolve(),Sm()}function x(n){var t=n.f,e=(t&mn)!==0;if(fe!==null&&!oi){var i=Ee!==null&&(Ee.f&on)!==0;if(!i&&(Ei===null||!Ei.has(n))){var r=fe.deps;if((fe.f&Vo)!==0)n.rv<Ur&&(n.rv=Ur,Rn===null&&r!==null&&r[On]===n?On++:Rn===null?Rn=[n]:Rn.push(n));else{fe.deps??(fe.deps=[]),Ua.call(fe.deps,n)||fe.deps.push(n);var s=n.reactions;s===null?n.reactions=[fe]:Ua.call(s,fe)||s.push(fe)}}}if(qi&&bi.has(n))return bi.get(n);if(e){var a=n;if(qi){var o=a.v;return((a.f&Je)===0&&a.reactions!==null||Mf(a))&&(o=_u(a)),bi.set(a,o),o}var l=(a.f&ci)===0&&!oi&&fe!==null&&(fe.f&ci)!==0,c=(a.f&Qs)===0;Za(a)&&(l&&(a.f|=ci),Wh(a)),l&&!c&&(Xh(a),yf(a))}if(an!=null&&an.has(n))return an.get(n);if((n.f&ur)!==0)throw n.v;return n.v}function yf(n){if(n.f|=ci,n.deps!==null)for(const e of n.deps){var t=e.reactions;t===null?e.reactions=[n]:Ua.call(t,n)||t.push(n),(e.f&mn)!==0&&(e.f&ci)===0&&(Xh(e),yf(e))}}function Mf(n){if(n.v===Ke)return!0;if(n.deps===null)return!1;for(const t of n.deps)if(bi.has(t)||(t.f&mn)!==0&&Mf(t))return!0;return!1}function Qr(n){var t=oi;try{return oi=!0,n()}finally{oi=t}}const Bm=["touchstart","touchmove"];function km(n){return Bm.includes(n)}const Nr=Symbol("events"),Sf=new Set,pc=new Set;function Bt(n,t,e){(t[Nr]??(t[Nr]={}))[n]=e}function $n(n){for(var t=0;t<n.length;t++)Sf.add(n[t]);for(var e of pc)e(n)}let _l=null,gl=!1;function ad(n){var _,m;var t=this,e=t.ownerDocument,i=n.type,r=((_=n.composedPath)==null?void 0:_.call(n))||[],s=r[0]||n.target;_l=n,gl||(gl=!0,setTimeout(()=>{gl=!1,_l=null}));var a=0,o=_l===n&&n[Nr];if(o){var l=r.indexOf(o);if(l!==-1&&(t===document||t===window)){n[Nr]=t;return}var c=r.indexOf(t);if(c===-1)return;l<=c&&(a=l)}if(s=r[a]||n.target,s!==t){Rh(n,"currentTarget",{configurable:!0,get(){return s||e}});var u=fe,d=Ee;Zn(null),wi(null);try{for(var p,f=[];s!==null&&s!==t;){try{var v=(m=s[Nr])==null?void 0:m[i];v!=null&&(!s.disabled||n.target===s)&&v.call(s,n)}catch(h){p?f.push(h):p=h}if(n.cancelBubble)break;a++,s=a<r.length?r[a]:null}if(p){for(let h of f)queueMicrotask(()=>{throw h});throw p}}finally{n[Nr]=t,delete n.currentTarget,Zn(u),wi(d)}}}var Th;const xl=((Th=globalThis==null?void 0:globalThis.window)==null?void 0:Th.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function zm(n){return(xl==null?void 0:xl.createHTML(n))??n}function bf(n){var t=of("template");return t.innerHTML=zm(n.replaceAll("<!>","<!---->")),t.content}function Ba(n,t){var e=Ee;e.nodes===null&&(e.nodes={start:n,end:t,a:null,t:null})}function ht(n,t){var e=(t&qp)!==0,i=(t&jp)!==0,r,s=!n.startsWith("<!>");return()=>{r===void 0&&(r=bf(s?n:"<!>"+n),e||(r=jr(r)));var a=i||nf?document.importNode(r,!0):r.cloneNode(!0);if(e){var o=jr(a),l=a.lastChild;Ba(o,l)}else Ba(a,a);return a}}function Hm(n,t,e="svg"){var i=!n.startsWith("<!>"),r=`<${e}>${i?n:"<!>"+n}</${e}>`,s;return()=>{if(!s){var a=bf(r),o=jr(a);s=jr(o)}var l=s.cloneNode(!0);return Ba(l,l),l}}function Ef(n,t){return Hm(n,t,"svg")}function yl(n=""){{var t=Gi(n+"");return Ba(t,t),t}}function Yo(){var n=document.createDocumentFragment(),t=document.createComment(""),e=Gi();return n.append(t,e),Ba(t,e),n}function at(n,t){n!==null&&n.before(t)}function Vm(n){let t=0,e=qr(0),i;return()=>{yu()&&(x(e),Mu(()=>(t===0&&(i=Qr(()=>n(()=>wa(e)))),t+=1,()=>{cr(()=>{t-=1,t===0&&(i==null||i(),i=void 0,wa(e))})})))}}var Gm=Vs|ta;function Wm(n,t,e,i){new Xm(n,t,e,i)}var Wn,fu,Xn,zr,pn,Un,Mn,Nn,vi,Hr,lr,zs,Ga,zi,el,Se,Ym,qm,mc,sr,jm,vc,Ma,Uo,_c,gc;class Xm{constructor(t,e,i,r){me(this,Se);dn(this,"parent");dn(this,"is_pending",!1);dn(this,"transform_error");me(this,Wn);me(this,fu,null);me(this,Xn);me(this,zr);me(this,pn);me(this,Un,null);me(this,Mn,null);me(this,Nn,null);me(this,vi,null);me(this,Hr,0);me(this,lr,0);me(this,zs,!1);me(this,Ga,new Map);me(this,zi,null);me(this,el,Vm(()=>(he(this,zi,qr(Q(this,Hr))),()=>{he(this,zi,null)})));var s;he(this,Wn,t),he(this,Xn,e),he(this,zr,a=>{var o=Ee;o.b=this,o.f|=ac,i(a)}),this.parent=Ee.b,this.transform_error=r??((s=this.parent)==null?void 0:s.transform_error)??(a=>a),he(this,pn,al(()=>{ee(this,Se,vc).call(this)},Gm))}defer_effect(t){zh(t,Q(this,Ga))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!Q(this,Xn).pending}update_pending_count(t,e){ee(this,Se,_c).call(this,t,e),he(this,Hr,Q(this,Hr)+t),!(!Q(this,zi)||Q(this,zs))&&(he(this,zs,!0),cr(()=>{he(this,zs,!1),Q(this,zi)&&Ws(Q(this,zi),Q(this,Hr))}))}get_effect_pending(){return Q(this,el).call(this),x(Q(this,zi))}error(t){if(t===Uh||!Q(this,Xn).onerror&&!Q(this,Xn).failed)throw t;jt!=null&&jt.is_fork?(Q(this,Un)&&jt.skip_effect(Q(this,Un)),Q(this,Mn)&&jt.skip_effect(Q(this,Mn)),Q(this,Nn)&&jt.skip_effect(Q(this,Nn)),jt.oncommit(()=>{ee(this,Se,sr).call(this)||ee(this,Se,gc).call(this,t)})):ee(this,Se,gc).call(this,t)}}Wn=new WeakMap,fu=new WeakMap,Xn=new WeakMap,zr=new WeakMap,pn=new WeakMap,Un=new WeakMap,Mn=new WeakMap,Nn=new WeakMap,vi=new WeakMap,Hr=new WeakMap,lr=new WeakMap,zs=new WeakMap,Ga=new WeakMap,zi=new WeakMap,el=new WeakMap,Se=new WeakSet,Ym=function(){try{he(this,Un,Yn(()=>Q(this,zr).call(this,Q(this,Wn))))}catch(t){this.error(t)}},qm=function(t){const e=Q(this,Xn).failed,{reset:i,invoke_onerror:r}=ee(this,Se,mc).call(this,t);cr(r),e&&he(this,Nn,Yn(()=>{e(Q(this,Wn),()=>t,()=>i)}))},mc=function(t){var e=!1,i=!1;const r=()=>{if(!ee(this,Se,sr).call(this)){if(e){Jp();return}e=!0,i&&um(),Q(this,Nn)!==null&&Wr(Q(this,Nn),()=>{he(this,Nn,null)}),ee(this,Se,Uo).call(this,()=>{ee(this,Se,vc).call(this)})}};return{reset:r,invoke_onerror:()=>{var a,o;if(!ee(this,Se,sr).call(this))try{i=!0,(o=(a=Q(this,Xn)).onerror)==null||o.call(a,t,r),i=!1}catch(l){xi(l,Q(this,pn)&&Q(this,pn).parent)}}}},sr=function(){return(Q(this,pn).f&(on|Na))!==0},jm=function(){const t=Q(this,Xn).pending;t&&(this.is_pending=!0,he(this,Mn,Yn(()=>t(Q(this,Wn)))),cr(()=>{if(!ee(this,Se,sr).call(this)){var e=he(this,vi,document.createDocumentFragment()),i=Gi(),r=!1;if(e.append(i),he(this,Un,ee(this,Se,Uo).call(this,()=>{try{return Yn(()=>Q(this,zr).call(this,i))}catch(s){try{this.error(s),r=!0}catch(a){xi(a,Q(this,pn).parent)}return null}})),Q(this,Un)===null){he(this,vi,null),r&&ee(this,Se,Ma).call(this,jt);return}Q(this,lr)===0&&(Q(this,Wn).before(e),he(this,vi,null),Wr(Q(this,Mn),()=>{he(this,Mn,null)}),ee(this,Se,Ma).call(this,jt))}}))},vc=function(){try{if(this.is_pending=this.has_pending_snippet(),he(this,lr,0),he(this,Hr,0),he(this,Un,Yn(()=>{Q(this,zr).call(this,Q(this,Wn))})),Q(this,lr)>0){var t=he(this,vi,document.createDocumentFragment());bu(Q(this,Un),t);const e=Q(this,Xn).pending;he(this,Mn,Yn(()=>e(Q(this,Wn))))}else ee(this,Se,Ma).call(this,jt)}catch(e){this.error(e)}},Ma=function(t){this.is_pending=!1,t.transfer_reactions(Q(this,Ga))},Uo=function(t){var e=Ee,i=fe,r=ln;wi(Q(this,pn)),Zn(Q(this,pn)),Gs(Q(this,pn).ctx);try{return Yr.ensure(),t()}finally{wi(e),Zn(i),Gs(r)}},_c=function(t,e){var i;if(!this.has_pending_snippet()){this.parent&&ee(i=this.parent,Se,_c).call(i,t,e);return}he(this,lr,Q(this,lr)+t),Q(this,lr)===0&&(ee(this,Se,Ma).call(this,e),Q(this,Mn)&&Wr(Q(this,Mn),()=>{he(this,Mn,null)}),Q(this,vi)&&(Q(this,Wn).before(Q(this,vi)),he(this,vi,null)))},gc=function(t){Q(this,Un)&&(Cn(Q(this,Un)),he(this,Un,null)),Q(this,Mn)&&(Cn(Q(this,Mn)),he(this,Mn,null)),Q(this,Nn)&&(Cn(Q(this,Nn)),he(this,Nn,null));let e=Q(this,Xn).failed;const i=r=>{if(ee(this,Se,sr).call(this))return;const{reset:s,invoke_onerror:a}=ee(this,Se,mc).call(this,r);a(),e&&!ee(this,Se,sr).call(this)&&he(this,Nn,ee(this,Se,Uo).call(this,()=>{try{return Yn(()=>{var o=Ee;o.b=this,o.f|=ac,e(Q(this,Wn),()=>r,()=>s)})}catch(o){return xi(o,Q(this,pn).parent),null}}))};cr(()=>{if(!ee(this,Se,sr).call(this)){var r;try{r=this.transform_error(t)}catch(s){xi(s,Q(this,pn)&&Q(this,pn).parent);return}r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(i,s=>xi(s,Q(this,pn)&&Q(this,pn).parent)):i(r)}})};function dt(n,t){var e=t==null?"":typeof t=="object"?`${t}`:t;e!==(n[_a]??(n[_a]=n.nodeValue))&&(n[_a]=e,n.nodeValue=`${e}`)}function Zm(n,t){return $m(n,t)}const eo=new Map;function $m(n,{target:t,anchor:e,props:i={},events:r,context:s,intro:a=!0,transformError:o}){wm();var l=void 0,c=Lm(()=>{var u=e??t.appendChild(Gi());Wm(u,{pending:()=>{}},f=>{En({});var v=ln;s&&(v.c=s),r&&(i.$$events=r),l=n(f,i)||mu(),Tn()},o);var d=new Set,p=f=>{for(var v=0;v<f.length;v++){var _=f[v];if(!d.has(_)){d.add(_);var m=km(_);for(const T of[t,document]){var h=eo.get(T);h===void 0&&(h=new Map,eo.set(T,h));var S=h.get(_);S===void 0?(T.addEventListener(_,ad,{passive:m}),h.set(_,1)):h.set(_,S+1)}}}};return p(rl(Sf)),pc.add(p),()=>{var m;for(var f of d)for(const h of[t,document]){var v=eo.get(h),_=v.get(f);--_==0?(h.removeEventListener(f,ad),v.delete(f),v.size===0&&eo.delete(h)):v.set(f,_)}pc.delete(p),u!==e&&((m=u.parentNode)==null||m.removeChild(u))}});return Km.set(l,c),l}let Km=new WeakMap;var ni,_i,Fn,Vr,Wa,Xa,nl;class Tf{constructor(t,e=!0){dn(this,"anchor");me(this,ni,new Map);me(this,_i,new Map);me(this,Fn,new Map);me(this,Vr,new Set);me(this,Wa,!0);me(this,Xa,t=>{if(Q(this,ni).has(t)){var e=Q(this,ni).get(t),i=Q(this,_i).get(e);if(i)Xo(i),Q(this,Vr).delete(e);else{var r=Q(this,Fn).get(e);r&&(Xo(r.effect),Q(this,_i).set(e,r.effect),Q(this,Fn).delete(e),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),i=r.effect)}for(const[s,a]of Q(this,ni)){if(Q(this,ni).delete(s),s===t)break;const o=Q(this,Fn).get(a);o&&(Cn(o.effect),Q(this,Fn).delete(a))}for(const[s,a]of Q(this,_i)){if(s===e||Q(this,Vr).has(s))continue;const o=()=>{if(Array.from(Q(this,ni).values()).includes(s)){var c=document.createDocumentFragment();bu(a,c),c.append(Gi()),Q(this,Fn).set(s,{effect:a,fragment:c})}else Cn(a);Q(this,Vr).delete(s),Q(this,_i).delete(s)};Q(this,Wa)||!i?(Q(this,Vr).add(s),Wr(a,o,!1)):o()}}});me(this,nl,t=>{Q(this,ni).delete(t);const e=Array.from(Q(this,ni).values());for(const[i,r]of Q(this,Fn))e.includes(i)||(Cn(r.effect),Q(this,Fn).delete(i))});this.anchor=t,he(this,Wa,e)}ensure(t,e){var i=jt,r=af();if(e&&!Q(this,_i).has(t)&&!Q(this,Fn).has(t))if(r){var s=document.createDocumentFragment(),a=Gi();s.append(a),Q(this,Fn).set(t,{effect:Yn(()=>e(a)),fragment:s})}else Q(this,_i).set(t,Yn(()=>e(this.anchor)));if(Q(this,ni).set(i,t),r){for(const[o,l]of Q(this,_i))o===t?i.unskip_effect(l):i.skip_effect(l);for(const[o,l]of Q(this,Fn))o===t?i.unskip_effect(l.effect):i.skip_effect(l.effect);i.oncommit(Q(this,Xa)),i.ondiscard(Q(this,nl))}else Q(this,Xa).call(this,i)}}ni=new WeakMap,_i=new WeakMap,Fn=new WeakMap,Vr=new WeakMap,Wa=new WeakMap,Xa=new WeakMap,nl=new WeakMap;function kt(n,t,e=!1){var i=new Tf(n),r=e?Vs:0;function s(a,o){i.ensure(a,o)}al(()=>{var a=!1;t((o,l=0)=>{a=!0,s(l,o)}),a||s(-1,null)},r)}const Jm=Symbol("NaN");function Qm(n,t,e){var i=new Tf(n);al(()=>{var r=t();r!==r&&(r=Jm),i.ensure(r,e)})}function tv(n,t){return t}function ev(n,t,e){for(var i=[],r=t.length,s,a=t.length,o=0;o<r;o++){let d=t[o];Wr(d,()=>{if(s){if(s.pending.delete(d),s.done.add(d),s.pending.size===0){var p=n.outrogroups;xc(n,rl(s.done)),p.delete(s),p.size===0&&(n.outrogroups=null)}}else a-=1},!1)}if(a===0){var l=i.length===0&&e!==null&&n.pending.size===0;if(l){var c=e,u=c.parentNode;Am(u),u.append(c),n.items.clear()}xc(n,t,!l)}else s={pending:new Set(t),done:new Set},(n.outrogroups??(n.outrogroups=new Set)).add(s)}function xc(n,t,e=!0){var i;if(n.pending.size>0){i=new Set;for(const a of n.pending.values())for(const o of a)i.add(n.items.get(o).e)}for(var r=0;r<t.length;r++){var s=t[r];if(i!=null&&i.has(s)){s.f|=yi;const a=document.createDocumentFragment();bu(s,a)}else Cn(t[r],e)}}var od;function Oe(n,t,e,i,r,s=null){var a=n,o=new Map,l=(t&Ih)!==0;if(l){var c=n;a=c.appendChild(Gi())}var u=null,d=Gh(()=>{var S=e();return il(S)?S:S==null?[]:rl(S)}),p=new Map,f=!0;function v(S){if((h.effect.f&on)===0){h.pending.delete(S);var T=x(d);h.fallback=u,nv(h,T,a,t,i),u!==null&&(T.length===0?(u.f&yi)===0?Xo(u):(u.f^=yi,Sa(u,null,a)):Wr(u,()=>{u=null}))}}function _(S){h.pending.delete(S)}var m=al(()=>{for(var S=x(d),T=S.length,M=new Set,I=jt,R=af(),P=0;P<T;P+=1){var F=S[P],b=i(F,P),g=f?null:o.get(b);g?(g.v&&Ws(g.v,F),g.i&&Ws(g.i,P),R&&I.unskip_effect(g.e)):(g=iv(o,f?a:od??(od=Gi()),F,b,P,r,t,e),f||(g.e.f|=yi),o.set(b,g)),M.add(b)}if(T===0&&s&&!u&&(f?u=Yn(()=>s(a)):(u=Yn(()=>s(od??(od=Gi()))),u.f|=yi)),T>M.size&&em(),!f)if(p.set(I,M),R){for(const[U,k]of o)M.has(U)||I.skip_effect(k.e);I.oncommit(v),I.ondiscard(_)}else v(I);x(d)}),h={effect:m,items:o,pending:p,outrogroups:null,fallback:u};f=!1}function la(n){for(;n!==null&&(n.f&hi)===0;)n=n.next;return n}function nv(n,t,e,i,r){var g,U,k,N,A,C,O,z,D;var s=(i&Hp)!==0,a=t.length,o=n.items,l=la(n.effect.first),c,u=null,d,p=[],f=[],v,_,m,h;if(s)for(h=0;h<a;h+=1)v=t[h],_=r(v,h),m=o.get(_).e,(m.f&yi)===0&&((U=(g=m.nodes)==null?void 0:g.a)==null||U.measure(),(d??(d=new Set)).add(m));for(h=0;h<a;h+=1){if(v=t[h],_=r(v,h),m=o.get(_).e,n.outrogroups!==null)for(const X of n.outrogroups)X.pending.delete(m),X.done.delete(m);if((m.f&Sn)!==0&&(Xo(m),s&&((N=(k=m.nodes)==null?void 0:k.a)==null||N.unfix(),(d??(d=new Set)).delete(m))),(m.f&yi)!==0)if(m.f^=yi,m===l)Sa(m,null,e);else{var S=u?u.next:l;m===n.effect.last&&(n.effect.last=m.prev),m.prev&&(m.prev.next=m.next),m.next&&(m.next.prev=m.prev),Ji(n,u,m),Ji(n,m,S),Sa(m,S,e),u=m,p=[],f=[],l=la(u.next);continue}if(m!==l){if(c!==void 0&&c.has(m)){if(p.length<f.length){var T=f[0],M;u=T.prev;var I=p[0],R=p[p.length-1];for(M=0;M<p.length;M+=1)Sa(p[M],T,e);for(M=0;M<f.length;M+=1)c.delete(f[M]);Ji(n,I.prev,R.next),Ji(n,u,I),Ji(n,R,T),l=T,u=R,h-=1,p=[],f=[]}else c.delete(m),Sa(m,l,e),Ji(n,m.prev,m.next),Ji(n,m,u===null?n.effect.first:u.next),Ji(n,u,m),u=m;continue}for(p=[],f=[];l!==null&&l!==m;)(c??(c=new Set)).add(l),f.push(l),l=la(l.next);if(l===null)continue}(m.f&yi)===0&&p.push(m),u=m,l=la(m.next)}if(n.outrogroups!==null){for(const X of n.outrogroups)X.pending.size===0&&(xc(n,rl(X.done)),(A=n.outrogroups)==null||A.delete(X));n.outrogroups.size===0&&(n.outrogroups=null)}if(l!==null||c!==void 0){var P=[];if(c!==void 0)for(m of c)(m.f&Sn)===0&&P.push(m);for(;l!==null;)(l.f&Sn)===0&&l!==n.fallback&&P.push(l),l=la(l.next);var F=P.length;if(F>0){var b=(i&Ih)!==0&&a===0?e:null;if(s){for(h=0;h<F;h+=1)(O=(C=P[h].nodes)==null?void 0:C.a)==null||O.measure();for(h=0;h<F;h+=1)(D=(z=P[h].nodes)==null?void 0:z.a)==null||D.fix()}ev(n,P,b)}}s&&cr(()=>{var X,Z;if(d!==void 0)for(m of d)(Z=(X=m.nodes)==null?void 0:X.a)==null||Z.apply()})}function iv(n,t,e,i,r,s,a,o){var l=(a&kp)!==0?(a&Vp)===0?Em(e,!1,!1):qr(e):null,c=(a&zp)!==0?qr(r):null;return{v:l,i:c,e:Yn(()=>(s(t,l??e,c??r,o),()=>{n.delete(i)}))}}function Sa(n,t,e){if(n.nodes)for(var i=n.nodes.start,r=n.nodes.end,s=t&&(t.f&yi)===0?t.nodes.start:e;i!==null;){var a=ja(i);if(s.before(i),i===r)return;i=a}}function Ji(n,t,e){t===null?n.effect.first=e:t.next=e,e===null?n.effect.last=t:e.prev=t}function rv(n,t,e,i,r){var o,l;if((o=t.$$host)!=null&&o.$$shadowRoot){const c=of("slot");at(n,c);return}var s=(l=t.$$slots)==null?void 0:l[e],a=!1;s===!0&&(s=t.children,a=!0),s===void 0||s(n,a?()=>i:i)}function wf(n){var t,e,i="";if(typeof n=="string"||typeof n=="number")i+=n;else if(typeof n=="object")if(Array.isArray(n)){var r=n.length;for(t=0;t<r;t++)n[t]&&(e=wf(n[t]))&&(i&&(i+=" "),i+=e)}else for(e in n)n[e]&&(i&&(i+=" "),i+=e);return i}function sv(){for(var n,t,e=0,i="",r=arguments.length;e<r;e++)(n=arguments[e])&&(t=wf(n))&&(i&&(i+=" "),i+=t);return i}function av(n){return typeof n=="object"?sv(n):n??""}const ld=[...` 	
\r\f \v\uFEFF`];function ov(n,t,e){var i=n==null?"":""+n;if(t&&(i=i?i+" "+t:t),e){for(var r of Object.keys(e))if(e[r])i=i?i+" "+r:r;else if(i.length)for(var s=r.length,a=0;(a=i.indexOf(r,a))>=0;){var o=a+s;(a===0||ld.includes(i[a-1]))&&(o===i.length||ld.includes(i[o]))?i=(a===0?"":i.substring(0,a))+i.substring(o+1):a=o}}return i===""?null:i}function lv(n,t){return n==null?null:String(n)}function Ve(n,t,e,i,r,s){var a=n[oc];if(a!==e||a===void 0){var o=ov(e,i,s);o==null?n.removeAttribute("class"):n.className=o,n[oc]=e}else if(s&&r!==s)for(var l in s){var c=!!s[l];(r==null||c!==!!r[l])&&n.classList.toggle(l,c)}return s}function Af(n,t,e,i){var r=n[lc];if(r!==t){var s=lv(t);s==null?n.removeAttribute("style"):n.style.cssText=s,n[lc]=t}return i}function Rf(n,t){t?n.hasAttribute("selected")||n.setAttribute("selected",""):n.removeAttribute("selected")}function cv(n,t){var e=n.__defaultValue,i=n.multiple,r=i?e??[]:null;if(!(i&&!il(r))){n.selectedIndex;for(var s of n.options){var a=Ps(s);Rf(s,i?r.includes(a):ef(a,e))}}}function Eu(n,t,e=!1){if(n.multiple){if(t==null)return;if(!il(t))return Kp();for(var i of n.options)i.selected=t.includes(Ps(i));return}for(i of n.options){var r=Ps(i);if(ef(r,t)){i.selected=!0;return}}(!e||t!==void 0)&&(n.selectedIndex=-1)}function Ti(n){var t=new MutationObserver(e=>{e.every(uv)||("__defaultValue"in n&&cv(n),"__value"in n&&Eu(n,n.__value))});t.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),lf(()=>{t.disconnect()})}function Wi(n,t,e=t){var i=new WeakSet,r=!0;Hh(n,"change",s=>{var a=s?"[selected]":":checked",o;if(n.multiple)o=[].map.call(n.querySelectorAll(a),Ps);else{var l=n.querySelector(a)??n.querySelector("option:not([disabled])");o=l&&Ps(l)}e(o),n.__value=o,jt!==null&&i.add(jt)}),uf(()=>{var s=t();if(n===document.activeElement){var a=jt;if(i.has(a))return}if(Eu(n,s,r),r&&s===void 0){var o=n.querySelector(":checked");o!==null&&(s=Ps(o),e(s))}n.__value=s,r=!1})}function Ps(n){return"__value"in n?n.__value:n.value}function uv(n){if(n.target.closest("selectedcontent")!==null)return!0;if(n.type==="childList"){var t=[...n.addedNodes,...n.removedNodes];return t.length>0&&t.every(e=>e.nodeName==="SELECTEDCONTENT")}return!1}const dv=Symbol("is custom element"),hv=Symbol("is html"),fv=Bp?"progress":"PROGRESS";function cd(n,t){var e=Cf(n);e.value===(e.value=t??void 0)||n.value===t&&(t!==0||n.nodeName!==fv)||(n.value=t??"")}function qe(n,t,e,i){var r=Cf(n),s=r[t];s!==(r[t]=e)&&(t==="loading"&&(n[Op]=e),e==null?n.removeAttribute(t):typeof e!="string"&&pv(n).has(t)?n[t]=e:n.setAttribute(t,e))}function Cf(n){return n[Lo]??(n[Lo]={[dv]:n.nodeName.includes("-"),[hv]:n.namespaceURI===Zp})}var ud=new Map;function pv(n){var t=n.getAttribute("is")||n.nodeName,e=ud.get(t);if(e)return e;ud.set(t,e=new Set);for(var i,r=n,s=Element.prototype;s!==r;){i=Rp(r);for(var a in i)i[a].set&&a!=="innerHTML"&&a!=="textContent"&&a!=="innerText"&&e.add(a);r=Ch(r)}return e}function ze(n,t,e=t){var i=new WeakSet;Hh(n,"input",async r=>{var s=r?n.defaultValue:n.value;if(s=Ml(n)?Sl(s):s,e(s),jt!==null&&i.add(jt),await Om(),s!==(s=t())){var a=n.selectionStart,o=n.selectionEnd,l=n.value.length;if(n.value=s??"",o!==null){var c=n.value.length;a===o&&o===l&&c>l?(n.selectionStart=c,n.selectionEnd=c):(n.selectionStart=a,n.selectionEnd=Math.min(o,c))}}}),Qr(t)==null&&n.value&&(e(Ml(n)?Sl(n.value):n.value),jt!==null&&i.add(jt)),Mu(()=>{var r=t();if(n===document.activeElement){var s=jt;if(i.has(s))return}Ml(n)&&r===Sl(n.value)||n.type==="date"&&!r&&!n.value||r!==n.value&&(n.value=r??"")})}function Ml(n){var t=n.type;return t==="number"||t==="range"}function Sl(n){return n===""?null:+n}function bl(n,t){return n===t||(n==null?void 0:n[Gr])===t}function Pf(n=mu(),t,e,i){var r=ln.r,s=Ee;return uf(()=>{var a,o;return Mu(()=>{a=o,o=[],Qr(()=>{bl(e(...o),n)||(t(n,...o),a&&bl(e(...a),n)&&t(null,...a))})}),()=>{let l=s;for(;l!==r&&l.parent!==null&&l.parent.f&Na;)l=l.parent;const c=()=>{o&&bl(e(...o),n)&&t(null,...o)},u=l.teardown;l.teardown=()=>{c(),u==null||u()}}}),n}let no=!1;function mv(n){var t=no;try{return no=!1,[n(),no]}finally{no=t}}function De(n,t,e,i){var M;var r=!0,s=(e&Xp)!==0,a=(e&Yp)!==0,o=i,l=!0,c=void 0,u=()=>a&&r?(c??(c=Fa(i)),x(c)):(l&&(l=!1,o=a?Qr(i):i),o);let d;if(s){var p=Gr in n||Fp in n;d=((M=Rs(n,t))==null?void 0:M.set)??(p&&t in n?I=>n[t]=I:void 0)}var f,v=!1;s?[f,v]=mv(()=>n[t]):f=n[t],f===void 0&&i!==void 0&&(f=u(),d&&(am(),d(f)));var _;if(_=()=>{var I=n[t];return I===void 0?u():(l=!0,I)},(e&Wp)===0)return _;if(d){var m=n.$$legacy;return(function(I,R){return arguments.length>0?((!R||m||v)&&d(R?_():I),I):_()})}var h=!1,S=((e&Gp)!==0?Fa:Gh)(()=>(h=!1,_()));s&&x(S);var T=Ee;return(function(I,R){if(arguments.length>0){const P=R?x(S):s?rn(I):I;return St(S,P),h=!0,o!==void 0&&(o=P),I}return qi&&h||(T.f&on)!==0?S.v:x(S)})}function Tu(n){ln===null&&Oh(),Zr(()=>{const t=Qr(n);if(typeof t=="function")return t})}function wu(n){ln===null&&Oh(),Tu(()=>()=>Qr(n))}const vv="5";var wh;typeof window<"u"&&((wh=window.__svelte??(window.__svelte={})).v??(wh.v=new Set)).add(vv);const _v="molemap3d",gv=1,xv=["meta","patients","visits","moles","findings","tasks","judgments","reviews","zones","angles","logs"];let io=null;function ea(){return io?Promise.resolve(io):new Promise((n,t)=>{const e=indexedDB.open(_v,gv);e.onupgradeneeded=i=>{const r=i.target.result;for(const s of xv)if(!r.objectStoreNames.contains(s)){const a=r.createObjectStore(s,{keyPath:"id"});s==="findings"&&(a.createIndex("visitId","visitId"),a.createIndex("moleId","moleId")),s==="moles"&&a.createIndex("patientId","patientId"),s==="visits"&&a.createIndex("patientId","patientId"),s==="tasks"&&(a.createIndex("patientId","patientId"),a.createIndex("status","status")),s==="judgments"&&(a.createIndex("taskId","taskId"),a.createIndex("moleId","moleId")),s==="reviews"&&a.createIndex("taskId","taskId"),s==="logs"&&a.createIndex("ts","ts")}},e.onsuccess=()=>{io=e.result,n(io)},e.onerror=()=>t(e.error)})}function ol(n,t,e="readonly"){return n.transaction(t,e).objectStore(t)}function ll(n){return new Promise((t,e)=>{n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}function ka(n){if(n===null||typeof n!="object"||typeof Blob<"u"&&n instanceof Blob||typeof File<"u"&&n instanceof File)return n;if(Array.isArray(n))return n.map(ka);if(n instanceof Date)return new Date(n.getTime());const t={};for(const e of Object.keys(n)){const i=n[e];i instanceof Blob||i instanceof File?t[e]=i:i&&typeof i=="object"?t[e]=ka(i):t[e]=i}return t}async function fi(n){const t=await ea();return ll(ol(t,n).getAll())}async function Fe(n,t){const e=await ea();return await ll(ol(e,n,"readwrite").put(ka(t))),t}async function yc(n,t){const e=await ea();return new Promise((i,r)=>{const s=e.transaction(n,"readwrite"),a=s.objectStore(n);for(const o of t)a.put(ka(o));s.oncomplete=()=>i(t),s.onerror=()=>r(s.error)})}async function Mc(n,t=null){const e=await ea(),i=await ll(ol(e,"meta").get(n));return i?i.value:t}async function Au(n,t){const e=await ea();await ll(ol(e,"meta","readwrite").put(ka({id:n,value:t})))}async function Sc(n){const t=`seq:${n}`,e=await Mc(t,0)+1;return await Au(t,e),e}function nn(n=""){return n+(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random().toString(16).slice(2))}const yv=[{id:"HF",name:"前面部",code:"HF",parts:["head"],side:"front",band:null,color:"#f4b6c2",active:!0},{id:"HL",name:"头皮/颅部",code:"HL",parts:["head"],side:"back",band:null,color:"#e8a0b0",active:!0},{id:"NF",name:"颈前区",code:"NF",parts:["neck"],side:"front",band:null,color:"#f8c8d2",active:!0},{id:"NL",name:"颈后区",code:"NL",parts:["neck"],side:"back",band:null,color:"#eeb8c4",active:!0},{id:"CH",name:"胸部",code:"CH",parts:["torso"],side:"front",band:"upper",color:"#b8d8f0",active:!0},{id:"AB",name:"腹部",code:"AB",parts:["torso"],side:"front",band:"lower",color:"#a8c8e8",active:!0},{id:"BK",name:"背部",code:"BK",parts:["torso"],side:"back",band:"upper",color:"#9fc0e0",active:!0},{id:"LP",name:"腰区",code:"LP",parts:["torso"],side:"back",band:"lower",color:"#8fb4d8",active:!0},{id:"SH",name:"肩带区",code:"SH",parts:["shoulderL","shoulderR"],side:"both",band:null,color:"#c8e0b8",active:!0},{id:"PV",name:"骨盆/腹股沟区",code:"PV",parts:["pelvis"],side:"both",band:null,color:"#d8c8a8",active:!0},{id:"UA",name:"上臂",code:"UA",parts:["upperArmL","upperArmR"],side:"both",band:null,color:"#d8e8a8",active:!0},{id:"EL",name:"肘区",code:"EL",parts:["elbowL","elbowR"],side:"both",band:null,color:"#c8d898",active:!0},{id:"FA",name:"前臂",code:"FA",parts:["forearmL","forearmR"],side:"both",band:null,color:"#b8d088",active:!0},{id:"HD",name:"手部",code:"HD",parts:["handL","handR"],side:"both",band:null,color:"#a8c078",active:!0},{id:"TH",name:"大腿",code:"TH",parts:["thighL","thighR"],side:"both",band:null,color:"#e8c8a0",active:!0},{id:"KN",name:"膝区",code:"KN",parts:["kneeL","kneeR"],side:"both",band:null,color:"#d8b890",active:!0},{id:"LG",name:"小腿",code:"LG",parts:["lowerLegL","lowerLegR"],side:"both",band:null,color:"#c8a880",active:!0},{id:"FT",name:"足部",code:"FT",parts:["footL","footR"],side:"both",band:null,color:"#b89870",active:!0}],Mv=[{id:"AN01",name:"全身正位",body:"全身",guidance:"患者直立，双臂外展约30°，镜头距患者2米，居中取景，含头足。",active:!0},{id:"AN02",name:"全身背位",body:"全身",guidance:"患者背向镜头，双脚并拢，镜头距患者2米，完整取景。",active:!0},{id:"AN03",name:"躯干左侧位",body:"躯干",guidance:"左侧45°斜位，取景自肩峰至髂嵴，光源45°斜照。",active:!0},{id:"AN04",name:"躯干右侧位",body:"躯干",guidance:"右侧45°斜位，取景自肩峰至髂嵴，光源45°斜照。",active:!0},{id:"AN05",name:"上肢近摄",body:"上肢",guidance:"皮损置画面中央，皮肤镜垂直皮面，内置比例尺，焦距固定。",active:!0},{id:"AN06",name:"下肢近摄",body:"下肢",guidance:"皮损置画面中央，皮肤镜垂直皮面，内置比例尺，焦距固定。",active:!0},{id:"AN07",name:"头面特写",body:"头面",guidance:"自然光+偏振模式各一张，保持与基线相同机位与放大倍数。",active:!0}],dd=["网状","均匀网状","非典型网状","球状","均质状","条纹状","无结构"],hd=["规则","轻度不规则","明显不规则","伪足/放射纹"],Sv=[{id:"observe",name:"观察"},{id:"biopsy",name:"活检"},{id:"excise",name:"切除"}],Aa=[{id:"pending_capture",name:"待采集"},{id:"pending_read",name:"待判读"},{id:"judged",name:"已判读"},{id:"returned",name:"已退回"}],Lf=[{id:"physician",name:"门诊医师"},{id:"tech",name:"技师"},{id:"director",name:"主任"}],ca={diameterDeltaMm:1,irregularEdges:["明显不规则","伪足/放射纹"],newMole:!0},Ra=[{id:"head",kind:"sphere",size:[.115,.135,.105],pos:[0,1.66,0]},{id:"neck",kind:"cylinder",size:[.045,.05,.09],pos:[0,1.49,0]},{id:"torso",kind:"cylinder",size:[.175,.145,.52],pos:[0,1.19,0]},{id:"shoulderL",kind:"sphere",size:[.062,.062,.062],pos:[-.2,1.4,0]},{id:"shoulderR",kind:"sphere",size:[.062,.062,.062],pos:[.2,1.4,0]},{id:"upperArmL",kind:"capsule",size:[.042,.042,.27],pos:[-.245,1.235,0]},{id:"upperArmR",kind:"capsule",size:[.042,.042,.27],pos:[.245,1.235,0]},{id:"elbowL",kind:"sphere",size:[.04,.04,.04],pos:[-.25,1.085,0]},{id:"elbowR",kind:"sphere",size:[.04,.04,.04],pos:[.25,1.085,0]},{id:"forearmL",kind:"capsule",size:[.036,.036,.24],pos:[-.252,.94,0]},{id:"forearmR",kind:"capsule",size:[.036,.036,.24],pos:[.252,.94,0]},{id:"handL",kind:"sphere",size:[.038,.052,.024],pos:[-.255,.785,0]},{id:"handR",kind:"sphere",size:[.038,.052,.024],pos:[.255,.785,0]},{id:"pelvis",kind:"sphere",size:[.15,.1,.095],pos:[0,.885,0]},{id:"thighL",kind:"capsule",size:[.062,.062,.34],pos:[-.085,.65,0]},{id:"thighR",kind:"capsule",size:[.062,.062,.34],pos:[.085,.65,0]},{id:"kneeL",kind:"sphere",size:[.05,.046,.05],pos:[-.085,.45,0]},{id:"kneeR",kind:"sphere",size:[.05,.046,.05],pos:[.085,.45,0]},{id:"lowerLegL",kind:"capsule",size:[.046,.04,.34],pos:[-.085,.255,0]},{id:"lowerLegR",kind:"capsule",size:[.046,.04,.34],pos:[.085,.255,0]},{id:"footL",kind:"box",size:[.06,.04,.12],pos:[-.085,.045,.028]},{id:"footR",kind:"box",size:[.06,.04,.12],pos:[.085,.045,.028]}],fd={head:{front:{x:[-30,30],y:[14,78]},back:{x:[-30,30],y:[14,78]}},neck:{front:{x:[-18,18],y:[78,104]},back:{x:[-18,18],y:[78,104]}},torso:{front:{x:[-78,78],y:[104,252]},back:{x:[-78,78],y:[104,252]}},shoulderL:{front:{x:[-108,-78],y:[108,142]},back:{x:[-108,-78],y:[108,142]}},shoulderR:{front:{x:[78,108],y:[108,142]},back:{x:[78,108],y:[108,142]}},upperArmL:{front:{x:[-118,-92],y:[142,240]},back:{x:[-118,-92],y:[142,240]}},upperArmR:{front:{x:[92,118],y:[142,240]},back:{x:[92,118],y:[142,240]}},elbowL:{front:{x:[-118,-92],y:[240,262]},back:{x:[-118,-92],y:[240,262]}},elbowR:{front:{x:[92,118],y:[240,262]},back:{x:[92,118],y:[240,262]}},forearmL:{front:{x:[-114,-90],y:[262,346]},back:{x:[-114,-90],y:[262,346]}},forearmR:{front:{x:[90,114],y:[262,346]},back:{x:[90,114],y:[262,346]}},handL:{front:{x:[-116,-88],y:[346,386]},back:{x:[-116,-88],y:[346,386]}},handR:{front:{x:[88,116],y:[346,386]},back:{x:[88,116],y:[346,386]}},pelvis:{front:{x:[-66,66],y:[252,296]},back:{x:[-66,66],y:[252,296]}},thighL:{front:{x:[-58,-14],y:[296,388]},back:{x:[-58,-14],y:[296,388]}},thighR:{front:{x:[14,58],y:[296,388]},back:{x:[14,58],y:[296,388]}},kneeL:{front:{x:[-56,-16],y:[388,410]},back:{x:[-56,-16],y:[388,410]}},kneeR:{front:{x:[16,56],y:[388,410]},back:{x:[16,56],y:[388,410]}},lowerLegL:{front:{x:[-54,-18],y:[410,452]},back:{x:[-54,-18],y:[410,452]}},lowerLegR:{front:{x:[18,54],y:[410,452]},back:{x:[18,54],y:[410,452]}},footL:{front:{x:[-58,-14],y:[452,462]},back:{x:[-58,-14],y:[452,462]}},footR:{front:{x:[14,58],y:[452,462]},back:{x:[14,58],y:[452,462]}}};function hr(n){if(!n)return"—";const t=new Date(n),e=i=>String(i).padStart(2,"0");return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())} ${e(t.getHours())}:${e(t.getMinutes())}`}function Mi(n){if(!n)return"—";const t=new Date(n),e=i=>String(i).padStart(2,"0");return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function qo(n,t){const e=URL.createObjectURL(n),i=document.createElement("a");i.href=e,i.download=t,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(e),4e3)}function bc(n,t){const e=s=>{if(s==null)return"";const a=String(s).replaceAll('"','""');return/[",\n]/.test(a)?`"${a}"`:a},i=t.map(s=>e(s.label)).join(","),r=n.map((s,a)=>t.map(o=>e(typeof o.get=="function"?o.get(s,a):s[o.key])).join(",")).join(`\r
`);return"\uFEFF"+i+`\r
`+r}function Df(n,t){const e=[];let i=!1;if(!n)return i=ca.newMole,i&&e.push("新发痣（基线无记录）"),{flagged:i,reasons:e,deltaMm:null,diameterBase:null,edgeBase:null,networkBase:null};const r=+(t.diameterMm-n.diameterMm).toFixed(2),s=ca.irregularEdges.includes(t.edgeType),a=ca.irregularEdges.includes(n.edgeType);return r>ca.diameterDeltaMm&&(i=!0,e.push(`直径增加 ${r.toFixed(2)}mm（阈值 >${ca.diameterDeltaMm}mm）`)),s&&!a&&(i=!0,e.push(`边缘由「${n.edgeType}」变为「${t.edgeType}」`)),{flagged:i,reasons:e,deltaMm:r,diameterBase:n.diameterMm,edgeBase:n.edgeType,networkBase:n.networkType}}function El(n,t,e,i){const s=document.createElement("canvas");s.width=s.height=320;const a=s.getContext("2d");let o=0;for(const m of String(n))o=o*31+m.charCodeAt(0)>>>0;const l=()=>(o=o*1664525+1013904223>>>0,o/4294967296),c=a.createRadialGradient(320/2,320/2,20,320/2,320/2,320/1.5);c.addColorStop(0,"#f2c9ad"),c.addColorStop(1,"#d9a383"),a.fillStyle=c,a.fillRect(0,0,320,320);const u=320/2+(l()-.5)*14,d=320/2+(l()-.5)*14,p=Math.max(26,Math.min(110,t*14)),f=e.includes("不规则")||e.includes("伪足");a.beginPath();const v=48;for(let m=0;m<=v;m++){const h=m/v*Math.PI*2,S=f?1+(l()-.5)*.32:1+(l()-.5)*.05,T=u+Math.cos(h)*p*S,M=d+Math.sin(h)*p*S*(f?.9+l()*.2:1);m===0?a.moveTo(T,M):a.lineTo(T,M)}a.closePath();const _=a.createRadialGradient(u,d,p*.1,u,d,p);if(_.addColorStop(0,"#5a3826"),_.addColorStop(.7,"#7a4a30"),_.addColorStop(1,"#9a6a48"),a.fillStyle=_,a.fill(),i!=="无结构"&&i!=="均质状"){a.strokeStyle="rgba(40,22,14,0.55)",a.lineWidth=1.2;const m=i.includes("非典型")?26:18;for(let h=0;h<m;h++){a.beginPath();const S=u+(l()-.5)*p*1.4,T=d+(l()-.5)*p*1.4;a.moveTo(S,T),a.bezierCurveTo(S+(l()-.5)*40,T+(l()-.5)*40,S+(l()-.5)*50,T+(l()-.5)*50,S+(l()-.5)*p,T+(l()-.5)*p),a.stroke()}}return a.fillStyle="rgba(255,255,255,0.9)",a.fillRect(234,292,60,5),a.font="12px system-ui",a.fillText("1 mm",240,308),new Promise(m=>s.toBlob(h=>m(h),"image/png"))}const Vt=rn({ready:!1,operator:{name:"张医生",role:"physician"},zones:[],angles:[],patients:[],visits:[],moles:[],findings:[],tasks:[],judgments:[],reviews:[],logs:[],currentPatientId:null,currentVisitId:null,currentTaskId:null});function vn(n,t,e=""){const i={id:nn("log_"),ts:Date.now(),operator:Vt.operator.name,role:Vt.operator.role,action:n,target:t,detail:e};Vt.logs.push(i),Fe("logs",i)}async function bv(){const[n,t,e,i,r,s,a,o,l,c]=await Promise.all([fi("zones"),fi("angles"),fi("patients"),fi("visits"),fi("moles"),fi("findings"),fi("tasks"),fi("judgments"),fi("reviews"),fi("logs")]);Vt.zones=n.sort((u,d)=>u.code.localeCompare(d.code)),Vt.angles=t.sort((u,d)=>u.id.localeCompare(d.id)),Vt.patients=e.sort((u,d)=>u.createdAt<d.createdAt?1:-1),Vt.visits=i,Vt.moles=r,Vt.findings=s,Vt.tasks=a.sort((u,d)=>d.createdAt-u.createdAt),Vt.judgments=o,Vt.reviews=l,Vt.logs=c.sort((u,d)=>d.ts-u.ts)}async function Ev(){await ea(),await Mc("seeded",!1)||(await yc("zones",yv.map(e=>({...e}))),await yc("angles",Mv.map(e=>({...e}))),await Au("seeded",!0));const t=await Mc("operator",null);t&&(Vt.operator=t),await bv(),Vt.ready=!0}function $i(){return Vt}function Tv(n,t){Vt.operator={name:n,role:t},Au("operator",Vt.operator),vn("切换操作人",n,`角色=${t}`)}async function wv(n){const t=Vt.zones.find(i=>i.id===n.id),e={active:!0,...n};await Fe("zones",e),t?Object.assign(t,e):Vt.zones.push(e),Vt.zones.sort((i,r)=>i.code.localeCompare(r.code)),vn(t?"修改分区规则":"新增分区规则",e.id,e.name)}async function Av(n){const t=Vt.zones.find(e=>e.id===n);t.active=!t.active,await Fe("zones",{...t}),vn("启停分区规则",n,`active=${t.active}`)}async function Rv(n){const t=Vt.angles.find(i=>i.id===n.id),e={active:!0,...n};await Fe("angles",e),t?Object.assign(t,e):Vt.angles.push(e),Vt.angles.sort((i,r)=>i.id.localeCompare(r.id)),vn(t?"修改拍摄角度模板":"新增拍摄角度模板",e.id,e.name)}async function Cv(n){const t=Vt.angles.find(e=>e.id===n);t.active=!t.active,await Fe("angles",{...t}),vn("启停角度模板",n,`active=${t.active}`)}async function Pv(n){const t={id:nn("pat_"),name:n.name,gender:n.gender,birthYear:n.birthYear?+n.birthYear:null,medicalNo:n.medicalNo||"",note:n.note||"",createdAt:Date.now(),createdBy:Vt.operator.name};return await Fe("patients",t),Vt.patients.unshift(t),vn("新建患者",t.id,t.name),t}async function If(n,t,e){const i={id:nn("vis_"),patientId:n,type:t,visitDate:e||Date.now(),createdAt:Date.now(),createdBy:Vt.operator.name};return await Fe("visits",i),Vt.visits.push(i),vn(t==="baseline"?"创建基线就诊":"创建复诊就诊",i.id),i}function Lv(n){return n.endsWith("L")?"L":n.endsWith("R")?"R":""}async function Dv(n){const t=Vt.zones.find(a=>a.id===n.zoneId);if(!t)throw new Error("请选择有效解剖分区");const e=await Sc(t.id),i=Lv(n.partId),r=t.code+(i?"-"+i:"")+"-"+String(e).padStart(3,"0"),s={id:nn("mol_"),patientId:n.patientId,code:r,zoneId:t.id,partId:n.partId,laterality:i,u:n.u,v:n.v,side:n.side,removed:!1,createdAt:Date.now(),createdBy:Vt.operator.name};return await Fe("moles",s),Vt.moles.push(s),vn("新增痣并编号",s.id,r),s}async function Iv(n){const t=Vt.moles.find(e=>e.id===n);t.removed=!0,await Fe("moles",{...t}),vn("标记痣已切除/去除",t.id,t.code)}async function Uv(n){const t={id:nn("fin_"),visitId:n.visitId,moleId:n.moleId,diameterMm:+n.diameterMm,edgeType:n.edgeType,networkType:n.networkType,angleId:n.angleId||"",note:n.note||"",photoBlob:n.photoBlob||null,photoName:n.photoName||"",capturedAt:Date.now(),capturedBy:Vt.operator.name};return await Fe("findings",t),Vt.findings.push(t),vn("保存皮肤镜记录",t.id,`痣=${n.moleId}`),t}async function Nv(n,t){const e=Vt.findings.find(r=>r.id===n),i=e.moleId;e.moleId=t,await Fe("findings",{...e}),vn("重新配对",n,`${i} → ${t}`)}async function Fv(n,t,e){const i=await If(n,"followup",e),r={id:nn("tsk_"),patientId:n,baselineVisitId:t,visitId:i.id,status:"pending_capture",dueDate:e||Date.now(),createdAt:Date.now(),createdBy:Vt.operator.name,lastStatusAt:Date.now(),lastStatusBy:Vt.operator.name};return await Fe("tasks",r),Vt.tasks.unshift(r),vn("创建随访任务",r.id,"待采集"),r}async function Ru(n,t,e=""){var a;const i=Vt.tasks.find(o=>o.id===n);if(!i)return;const r=i.status;i.status=t,i.lastStatusAt=Date.now(),i.lastStatusBy=Vt.operator.name,t==="pending_read"&&(i.submittedAt=Date.now()),t==="judged"&&(i.judgedAt=Date.now()),t==="returned"&&(i.returnedAt=Date.now()),await Fe("tasks",{...i});const s=((a=Aa.find(o=>o.id===t))==null?void 0:a.name)||t;vn("任务状态变更",i.id,`${r} → ${s}${e?"；"+e:""}`)}async function Ov(n,t,e,i,r){const s=Vt.judgments.find(o=>o.taskId===n&&o.moleId===t);if(s)return s.decision=i,s.reason=r,s.findingId=e,s.physician=Vt.operator.name,s.ts=Date.now(),await Fe("judgments",{...s}),vn("修改判读",s.id,`${i}`),s;const a={id:nn("jud_"),taskId:n,moleId:t,findingId:e,decision:i,reason:r,physician:Vt.operator.name,ts:Date.now()};return await Fe("judgments",a),Vt.judgments.push(a),vn("提交判读",a.id,i),a}async function Bv(n,t,e){const i={id:nn("rev_"),taskId:n,verdict:t,note:e||"",director:Vt.operator.name,ts:Date.now()};return await Fe("reviews",i),Vt.reviews.push(i),t==="returned"?await Ru(n,"returned",e):vn("审核通过",n,e),i}function Uf(n){return Vt.findings.filter(t=>t.visitId===n)}function Ca(n){return Vt.moles.filter(t=>t.patientId===n)}function Ec(n){return Vt.zones.find(t=>t.id===n.zoneId)}function Nf(n){return Vt.visits.filter(t=>t.patientId===n&&t.type==="baseline").sort((t,e)=>t.visitDate-e.visitDate)[0]}function Cu(n,t){return Vt.findings.find(e=>e.moleId===n&&e.visitId===t)}function Ff(n,t){return Vt.judgments.find(e=>e.taskId===n&&e.moleId===t)}function kv(n){return Vt.reviews.filter(t=>t.taskId===n).sort((t,e)=>t.ts-e.ts)}function ii(n){const t=Vt.tasks.find(r=>r.id===n);if(!t)return[];const e=Ca(t.patientId),i=Uf(t.visitId);return e.map(r=>{const s=i.find(l=>l.moleId===r.id)||null,a=Cu(r.id,t.baselineVisitId),o=s?Df(a,s):null;return{mole:r,zone:Ec(r),baseline:a||null,current:s,diff:o,judgment:Ff(n,r.id)}})}function zv(){return Vt.tasks.filter(n=>n.status==="judged"||n.status==="returned").map(n=>{const t=ii(n.id),e=t.filter(r=>{var s;return(s=r.diff)==null?void 0:s.flagged}),i=Vt.reviews.some(r=>r.taskId===n.id&&r.verdict==="approved");return{task:n,patient:Vt.patients.find(r=>r.id===n.patientId),flagged:e,approved:i,rows:t}}).sort((n,t)=>t.task.lastStatusAt-n.task.lastStatusAt)}function Hv(){const n=new Map;for(const t of Vt.judgments){const e=t.physician;n.has(e)||n.set(e,{physician:e,total:0,observe:0,biopsy:0,excise:0,flaggedTotal:0,flaggedAction:0});const i=n.get(e);i.total++,i[t.decision]++;const r=Vt.tasks.find(s=>s.id===t.taskId);if(r){const s=Cu(t.moleId,r.baselineVisitId),a=Vt.findings.find(o=>o.id===t.findingId);a&&Df(s,a).flagged&&(i.flaggedTotal++,(t.decision==="biopsy"||t.decision==="excise")&&i.flaggedAction++)}}return[...n.values()].map(t=>({...t,flagHitRate:t.flaggedTotal?t.flaggedAction/t.flaggedTotal:null,biopsyRate:t.total?t.biopsy/t.total:null,actionRate:t.total?(t.biopsy+t.excise)/t.total:null}))}const Li=864e5;async function Vv(){const n=$i(),t=Date.now(),e="张医生",i={id:nn("pat_"),name:"示例患者·王某某",gender:"女",birthYear:1986,medicalNo:"DEMO-0001",note:"系统内置演示数据，含直径增大、边缘变不规则及新发痣三类标黄场景。",createdAt:t-180*Li,createdBy:e};await Fe("patients",i),n.patients.unshift(i);const r={id:nn("vis_"),patientId:i.id,type:"baseline",visitDate:t-180*Li,createdAt:t-180*Li,createdBy:e},s={id:nn("vis_"),patientId:i.id,type:"followup",visitDate:t-7*Li,createdAt:t-7*Li,createdBy:e};await yc("visits",[r,s]),n.visits.push(r,s);const a=[["BK","torso",.38,.72,"back",3.2,4.6,"规则","规则","网状","grow"],["BK","torso",.62,.55,"back",2.8,3,"规则","明显不规则","非典型网状","edge"],["UA","upperArmL",.3,.55,"front",2.1,2.2,"规则","规则","均匀网状","stable"],["TH","thighR",.55,.45,"front",4,4.1,"轻度不规则","轻度不规则","球状","stable"],["FA","forearmL",.42,.3,"back",1.6,1.7,"规则","规则","均质状","stable"]];for(const[v,_,m,h,S,T,M,I,R,P,F]of a){const b=n.zones.find(O=>O.id===v),g=await Sc(v),U=_.endsWith("L")?"L":_.endsWith("R")?"R":"",k=b.code+(U?"-"+U+"-":"-")+String(g).padStart(3,"0"),N={id:nn("mol_"),patientId:i.id,code:k,zoneId:v,partId:_,laterality:U,u:m,v:h,side:S,removed:!1,createdAt:r.visitDate,createdBy:e};await Fe("moles",N),n.moles.push(N);const A=await El(k+"b",T,I,P),C={id:nn("fin_"),visitId:r.id,moleId:N.id,diameterMm:T,edgeType:I,networkType:P,angleId:"AN05",note:"基线皮肤镜记录",photoBlob:A,photoName:`baseline_${k}.png`,capturedAt:r.visitDate,capturedBy:e};if(await Fe("findings",C),n.findings.push(C),F!=="new"){const O=await El(k+"c",M,R,F==="edge"?"非典型网状":P),z={id:nn("fin_"),visitId:s.id,moleId:N.id,diameterMm:M,edgeType:R,networkType:F==="edge"?"非典型网状":P,angleId:"AN05",note:F==="grow"?"随访增大":F==="edge"?"边缘形态改变":"随访稳定",photoBlob:O,photoName:`followup_${k}.png`,capturedAt:s.visitDate,capturedBy:e};await Fe("findings",z),n.findings.push(z)}}const o=n.zones.find(v=>v.id==="AB"),l=await Sc("AB"),c={id:nn("mol_"),patientId:i.id,code:`${o.code}-${String(l).padStart(3,"0")}`,zoneId:"AB",partId:"torso",laterality:"",u:.55,v:.32,side:"front",removed:!1,createdAt:s.visitDate,createdBy:e};await Fe("moles",c),n.moles.push(c);const u=await El(c.code+"n",1.9,"规则","无结构"),d={id:nn("fin_"),visitId:s.id,moleId:c.id,diameterMm:1.9,edgeType:"规则",networkType:"无结构",angleId:"AN03",note:"复诊新发现，基线无此痣",photoBlob:u,photoName:`new_${c.code}.png`,capturedAt:s.visitDate,capturedBy:e};await Fe("findings",d),n.findings.push(d);const p={id:nn("tsk_"),patientId:i.id,baselineVisitId:r.id,visitId:s.id,status:"pending_read",dueDate:t-5*Li,createdAt:t-180*Li,createdBy:e,submittedAt:t-7*Li,lastStatusAt:t-7*Li,lastStatusBy:"王技师"};await Fe("tasks",p),n.tasks.unshift(p);const f={id:nn("log_"),ts:t,operator:"系统",role:"tech",action:"生成演示数据",target:i.id,detail:"含 6 颗痣（3 颗将标黄）与待判读随访任务"};return await Fe("logs",f),n.logs.unshift(f),{patient:i,task:p}}var Gv=ht('<div class="modal-mask" role="presentation"><div class="modal"><div class="row" style="justify-content:space-between;margin-bottom:14px"><h3 style="margin:0"> </h3> <button class="sm ghost">✕ 关闭</button></div> <!></div></div>');function fr(n,t){En(t,!0);let e=De(t,"title",3,""),i=De(t,"onclose",3,null),r=De(t,"width",3,"");var s=Gv(),a=j(s),o=j(a),l=j(o),c=yt(l,!0),u=L(l,2),d=L(o,2);rv(d,t,"default",{}),zt(()=>{Af(a,r()?`width:min(${r()},94vw)`:""),dt(c,e())}),Bt("click",s,p=>{var f;return p.target===p.currentTarget&&((f=i())==null?void 0:f())}),Bt("click",u,()=>{var p;return(p=i())==null?void 0:p()}),at(n,s),Tn()}$n(["click"]);var Wv=ht('<tr><td class="mono svelte-1o1u153"> </td><td> </td><td> </td><td> </td><td><span class="badge info"> </span></td><td><span class="badge purple"> </span></td><td class="small muted"> </td><td><button class="sm primary">打开痣图</button></td></tr>'),Xv=ht('<tr><td colspan="8" class="muted" style="text-align:center;padding:30px">暂无患者，可新建或载入演示数据。</td></tr>'),Yv=ht('<div class="grid2"><div class="field"><label>姓名 *</label> <input placeholder="患者姓名"/></div> <div class="field"><label>病案号</label> <input placeholder="门诊病案号"/></div> <div class="field"><label>性别</label> <select><option>女</option><option>男</option><option>其他</option></select></div> <div class="field"><label>出生年份</label> <input type="number" placeholder="如 1986"/></div></div> <div class="field"><label>备注</label> <textarea rows="3" placeholder="既往史、家族史等"></textarea></div> <div class="row" style="justify-content:flex-end;gap:8px"><button>取消</button> <button class="primary">创建并进入痣图</button></div>',1),qv=ht('<div class="head row svelte-1o1u153" style="justify-content:space-between"><div><h2 style="margin:0 0 4px" class="svelte-1o1u153">患者与痣图档案</h2> <div class="muted small"> </div></div> <div class="row"><input placeholder="搜索姓名 / 病案号" style="width:220px"/> <button class="primary">新建患者</button> <button> </button></div></div> <div class="card" style="margin-top:16px"><table><thead><tr><th>病案号</th><th>姓名</th><th>性别</th><th>出生年份</th><th>痣数</th><th>随访任务</th><th>建档时间</th><th></th></tr></thead><tbody><!><!></tbody></table></div> <!>',1);function jv(n,t){En(t,!0);const e=$i();let i=ae(!1),r=ae(!1);const s=rn({name:"",gender:"女",birthYear:"",medicalNo:"",note:""});let a=ae("");const o=ge(()=>e.patients.filter(A=>!x(a)||A.name.includes(x(a))||(A.medicalNo||"").includes(x(a))));async function l(){if(!s.name.trim())return;const A=await Pv({...s});St(i,!1),s.name="",s.birthYear="",s.medicalNo="",s.note="",t.onopen(A.id)}async function c(){St(r,!0);try{const A=await Vv();t.onopen(A.patient.id)}finally{St(r,!1)}}function u(A){return e.moles.filter(C=>C.patientId===A).length}function d(A){return e.tasks.filter(C=>C.patientId===A).length}var p=qv(),f=Ue(p),v=j(f),_=L(j(v),2),m=yt(_),h=L(v,2),S=j(h),T=L(S,2),M=L(T,2),I=yt(M,!0),R=L(f,2),P=j(R),F=L(j(P)),b=j(F);Oe(b,17,()=>x(o),A=>A.id,(A,C)=>{var O=Wv(),z=j(O),D=yt(z,!0),X=L(z),Z=yt(X,!0),J=L(X),ft=yt(J,!0),ut=L(J),G=yt(ut,!0),nt=L(ut),pt=j(nt),st=yt(pt,!0),mt=L(nt),lt=j(mt),vt=yt(lt,!0),wt=L(mt),xt=yt(wt,!0),Zt=L(wt),B=yt(Zt);zt((de,Pt,Gt)=>{dt(D,x(C).medicalNo||"—"),dt(Z,x(C).name),dt(ft,x(C).gender),dt(G,x(C).birthYear||"—"),dt(st,de),dt(vt,Pt),dt(xt,Gt)},[()=>u(x(C).id),()=>d(x(C).id),()=>Mi(x(C).createdAt)]),Bt("click",B,()=>t.onopen(x(C).id)),at(A,O)});var g=L(b);{var U=A=>{var C=Xv();at(A,C)};kt(g,A=>{x(o).length===0&&A(U)})}var k=L(R,2);{var N=A=>{fr(A,{title:"新建患者",onclose:()=>St(i,!1),width:"560px",children:(C,O)=>{var z=Yv(),D=Ue(z),X=j(D),Z=L(j(X),2),J=L(X,2),ft=L(j(J),2),ut=L(J,2),G=L(j(ut),2);Ti(G);var nt=L(ut,2),pt=L(j(nt),2),st=L(D,2),mt=L(j(st),2),lt=L(st,2),vt=j(lt),wt=L(vt,2);zt(xt=>wt.disabled=xt,[()=>!s.name.trim()]),ze(Z,()=>s.name,xt=>s.name=xt),ze(ft,()=>s.medicalNo,xt=>s.medicalNo=xt),Wi(G,()=>s.gender,xt=>s.gender=xt),ze(pt,()=>s.birthYear,xt=>s.birthYear=xt),ze(mt,()=>s.note,xt=>s.note=xt),Bt("click",vt,()=>St(i,!1)),Bt("click",wt,l),at(C,z)},$$slots:{default:!0}})};kt(k,A=>{x(i)&&A(N)})}zt(()=>{dt(m,`照片与痣图全部存储于本浏览器，共 ${e.patients.length??""} 位患者。`),M.disabled=x(r),dt(I,x(r)?"生成中…":"载入演示数据")}),ze(S,()=>x(a),A=>St(a,A)),Bt("click",T,()=>St(i,!0)),Bt("click",M,c),at(n,p),Tn()}$n(["click"]);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pu="172",Ls={ROTATE:0,DOLLY:1,PAN:2},ws={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Zv=0,pd=1,$v=2,Of=1,Kv=2,Oi=3,_r=0,Pn=1,ri=2,pr=0,Ds=1,md=2,vd=3,_d=4,Jv=5,Lr=100,Qv=101,t_=102,e_=103,n_=104,i_=200,r_=201,s_=202,a_=203,Tc=204,wc=205,o_=206,l_=207,c_=208,u_=209,d_=210,h_=211,f_=212,p_=213,m_=214,Ac=0,Rc=1,Cc=2,Ys=3,Pc=4,Lc=5,Dc=6,Ic=7,Bf=0,v_=1,__=2,mr=0,g_=1,x_=2,y_=3,M_=4,S_=5,b_=6,E_=7,kf=300,qs=301,js=302,Uc=303,Nc=304,cl=306,Fc=1e3,Fr=1001,Oc=1002,ui=1003,T_=1004,ro=1005,Si=1006,Tl=1007,Or=1008,ji=1009,zf=1010,Hf=1011,za=1012,Lu=1013,$r=1014,Hi=1015,$a=1016,Du=1017,Iu=1018,Zs=1020,Vf=35902,Gf=1021,Wf=1022,li=1023,Xf=1024,Yf=1025,Is=1026,$s=1027,qf=1028,Uu=1029,jf=1030,Nu=1031,Fu=1033,No=33776,Fo=33777,Oo=33778,Bo=33779,Bc=35840,kc=35841,zc=35842,Hc=35843,Vc=36196,Gc=37492,Wc=37496,Xc=37808,Yc=37809,qc=37810,jc=37811,Zc=37812,$c=37813,Kc=37814,Jc=37815,Qc=37816,tu=37817,eu=37818,nu=37819,iu=37820,ru=37821,ko=36492,su=36494,au=36495,Zf=36283,ou=36284,lu=36285,cu=36286,w_=3200,A_=3201,$f=0,R_=1,or="",An="srgb",Ks="srgb-linear",jo="linear",Ce="srgb",as=7680,gd=519,C_=512,P_=513,L_=514,Kf=515,D_=516,I_=517,U_=518,N_=519,uu=35044,xd="300 es",Vi=2e3,Zo=2001;class ts{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yd=1234567;const Pa=Math.PI/180,Ha=180/Math.PI;function Xi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]+"-"+hn[t&255]+hn[t>>8&255]+"-"+hn[t>>16&15|64]+hn[t>>24&255]+"-"+hn[e&63|128]+hn[e>>8&255]+"-"+hn[e>>16&255]+hn[e>>24&255]+hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]).toLowerCase()}function oe(n,t,e){return Math.max(t,Math.min(e,n))}function Ou(n,t){return(n%t+t)%t}function F_(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function O_(n,t,e){return n!==t?(e-n)/(t-n):0}function La(n,t,e){return(1-e)*n+e*t}function B_(n,t,e,i){return La(n,t,1-Math.exp(-e*i))}function k_(n,t=1){return t-Math.abs(Ou(n,t*2)-t)}function z_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function H_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function V_(n,t){return n+Math.floor(Math.random()*(t-n+1))}function G_(n,t){return n+Math.random()*(t-n)}function W_(n){return n*(.5-Math.random())}function X_(n){n!==void 0&&(yd=n);let t=yd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Y_(n){return n*Pa}function q_(n){return n*Ha}function j_(n){return(n&n-1)===0&&n!==0}function Z_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function $_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function K_(n,t,e,i,r){const s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+i)/2),u=a((t+i)/2),d=s((t-i)/2),p=a((t-i)/2),f=s((i-t)/2),v=a((i-t)/2);switch(r){case"XYX":n.set(o*u,l*d,l*p,o*c);break;case"YZY":n.set(l*p,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*p,o*u,o*c);break;case"XZX":n.set(o*u,l*v,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*v,o*c);break;case"ZYZ":n.set(l*v,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function si(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Rr={DEG2RAD:Pa,RAD2DEG:Ha,generateUUID:Xi,clamp:oe,euclideanModulo:Ou,mapLinear:F_,inverseLerp:O_,lerp:La,damp:B_,pingpong:k_,smoothstep:z_,smootherstep:H_,randInt:V_,randFloat:G_,randFloatSpread:W_,seededRandom:X_,degToRad:Y_,radToDeg:q_,isPowerOfTwo:j_,ceilPowerOfTwo:Z_,floorPowerOfTwo:$_,setQuaternionFromProperEuler:K_,normalize:Re,denormalize:si};class At{constructor(t=0,e=0){At.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(oe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class se{constructor(t,e,i,r,s,a,o,l,c){se.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c)}set(t,e,i,r,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],p=i[2],f=i[5],v=i[8],_=r[0],m=r[3],h=r[6],S=r[1],T=r[4],M=r[7],I=r[2],R=r[5],P=r[8];return s[0]=a*_+o*S+l*I,s[3]=a*m+o*T+l*R,s[6]=a*h+o*M+l*P,s[1]=c*_+u*S+d*I,s[4]=c*m+u*T+d*R,s[7]=c*h+u*M+d*P,s[2]=p*_+f*S+v*I,s[5]=p*m+f*T+v*R,s[8]=p*h+f*M+v*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,p=o*l-u*s,f=c*s-a*l,v=e*d+i*p+r*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return t[0]=d*_,t[1]=(r*c-u*i)*_,t[2]=(o*i-r*a)*_,t[3]=p*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-o*e)*_,t[6]=f*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(wl.makeScale(t,e)),this}rotate(t){return this.premultiply(wl.makeRotation(-t)),this}translate(t,e){return this.premultiply(wl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const wl=new se;function Jf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function $o(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function J_(){const n=$o("canvas");return n.style.display="block",n}const Md={};function Ts(n){n in Md||(Md[n]=!0,console.warn(n))}function Q_(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function tg(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function eg(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Sd=new se().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bd=new se().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ng(){const n={enabled:!0,workingColorSpace:Ks,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ce&&(r.r=Yi(r.r),r.g=Yi(r.g),r.b=Yi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ce&&(r.r=Us(r.r),r.g=Us(r.g),r.b=Us(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===or?jo:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ks]:{primaries:t,whitePoint:i,transfer:jo,toXYZ:Sd,fromXYZ:bd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:An},outputColorSpaceConfig:{drawingBufferColorSpace:An}},[An]:{primaries:t,whitePoint:i,transfer:Ce,toXYZ:Sd,fromXYZ:bd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:An}}}),n}const we=ng();function Yi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Us(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let os;class ig{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{os===void 0&&(os=$o("canvas")),os.width=t.width,os.height=t.height;const i=os.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=os}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=$o("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Yi(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Yi(e[i]/255)*255):e[i]=Yi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rg=0;class Qf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=Xi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Al(r[a].image)):s.push(Al(r[a]))}else s=Al(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Al(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ig.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sg=0;class bn extends ts{constructor(t=bn.DEFAULT_IMAGE,e=bn.DEFAULT_MAPPING,i=Fr,r=Fr,s=Si,a=Or,o=li,l=ji,c=bn.DEFAULT_ANISOTROPY,u=or){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Xi(),this.name="",this.source=new Qf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new se,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==kf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fc:t.x=t.x-Math.floor(t.x);break;case Fr:t.x=t.x<0?0:1;break;case Oc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fc:t.y=t.y-Math.floor(t.y);break;case Fr:t.y=t.y<0?0:1;break;case Oc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}bn.DEFAULT_IMAGE=null;bn.DEFAULT_MAPPING=kf;bn.DEFAULT_ANISOTROPY=1;class Be{constructor(t=0,e=0,i=0,r=1){Be.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],d=l[8],p=l[1],f=l[5],v=l[9],_=l[2],m=l[6],h=l[10];if(Math.abs(u-p)<.01&&Math.abs(d-_)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(d+_)<.1&&Math.abs(v+m)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,M=(f+1)/2,I=(h+1)/2,R=(u+p)/4,P=(d+_)/4,F=(v+m)/4;return T>M&&T>I?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=R/i,s=P/i):M>I?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=R/r,s=F/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=P/s,r=F/s),this.set(i,r,s,e),this}let S=Math.sqrt((m-v)*(m-v)+(d-_)*(d-_)+(p-u)*(p-u));return Math.abs(S)<.001&&(S=1),this.x=(m-v)/S,this.y=(d-_)/S,this.z=(p-u)/S,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ag extends ts{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Be(0,0,t,e),this.scissorTest=!1,this.viewport=new Be(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new bn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const e=Object.assign({},t.texture.image);return this.texture.source=new Qf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kr extends ag{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class tp extends bn{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=ui,this.minFilter=ui,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class og extends bn{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=ui,this.minFilter=ui,this.wrapR=Fr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const p=s[a+0],f=s[a+1],v=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=p,t[e+1]=f,t[e+2]=v,t[e+3]=_;return}if(d!==_||l!==p||c!==f||u!==v){let m=1-o;const h=l*p+c*f+u*v+d*_,S=h>=0?1:-1,T=1-h*h;if(T>Number.EPSILON){const I=Math.sqrt(T),R=Math.atan2(I,h*S);m=Math.sin(m*R)/I,o=Math.sin(o*R)/I}const M=o*S;if(l=l*m+p*M,c=c*m+f*M,u=u*m+v*M,d=d*m+_*M,m===1-o){const I=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=I,c*=I,u*=I,d*=I}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[a],p=s[a+1],f=s[a+2],v=s[a+3];return t[e]=o*v+u*d+l*f-c*p,t[e+1]=l*v+u*p+c*d-o*f,t[e+2]=c*v+u*f+o*p-l*d,t[e+3]=u*v-o*d-l*p-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),d=o(s/2),p=l(i/2),f=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=p*u*d+c*f*v,this._y=c*f*d-p*u*v,this._z=c*u*v+p*f*d,this._w=c*u*d-p*f*v;break;case"YXZ":this._x=p*u*d+c*f*v,this._y=c*f*d-p*u*v,this._z=c*u*v-p*f*d,this._w=c*u*d+p*f*v;break;case"ZXY":this._x=p*u*d-c*f*v,this._y=c*f*d+p*u*v,this._z=c*u*v+p*f*d,this._w=c*u*d-p*f*v;break;case"ZYX":this._x=p*u*d-c*f*v,this._y=c*f*d+p*u*v,this._z=c*u*v-p*f*d,this._w=c*u*d+p*f*v;break;case"YZX":this._x=p*u*d+c*f*v,this._y=c*f*d+p*u*v,this._z=c*u*v-p*f*d,this._w=c*u*d-p*f*v;break;case"XZY":this._x=p*u*d-c*f*v,this._y=c*f*d-p*u*v,this._z=c*u*v+p*f*d,this._w=c*u*d+p*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],p=i+o+d;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-e)*u)/c,p=Math.sin(e*u)/c;return this._w=a*d+this._w*p,this._x=i*d+this._x*p,this._y=r*d+this._y*p,this._z=s*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(t=0,e=0,i=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ed.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ed.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*i),u=2*(o*e-s*r),d=2*(s*i-a*e);return this.x=e+l*c+a*d-o*u,this.y=i+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Rl.copy(this).projectOnVector(t),this.sub(Rl)}reflect(t){return this.sub(Rl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(oe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rl=new H,Ed=new Jr;class Ka{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Jn):Jn.fromBufferAttribute(s,a),Jn.applyMatrix4(t.matrixWorld),this.expandByPoint(Jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),so.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),so.copy(i.boundingBox)),so.applyMatrix4(t.matrixWorld),this.union(so)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Jn),Jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ua),ao.subVectors(this.max,ua),ls.subVectors(t.a,ua),cs.subVectors(t.b,ua),us.subVectors(t.c,ua),Qi.subVectors(cs,ls),tr.subVectors(us,cs),Sr.subVectors(ls,us);let e=[0,-Qi.z,Qi.y,0,-tr.z,tr.y,0,-Sr.z,Sr.y,Qi.z,0,-Qi.x,tr.z,0,-tr.x,Sr.z,0,-Sr.x,-Qi.y,Qi.x,0,-tr.y,tr.x,0,-Sr.y,Sr.x,0];return!Cl(e,ls,cs,us,ao)||(e=[1,0,0,0,1,0,0,0,1],!Cl(e,ls,cs,us,ao))?!1:(oo.crossVectors(Qi,tr),e=[oo.x,oo.y,oo.z],Cl(e,ls,cs,us,ao))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Di=[new H,new H,new H,new H,new H,new H,new H,new H],Jn=new H,so=new Ka,ls=new H,cs=new H,us=new H,Qi=new H,tr=new H,Sr=new H,ua=new H,ao=new H,oo=new H,br=new H;function Cl(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){br.fromArray(n,s);const o=r.x*Math.abs(br.x)+r.y*Math.abs(br.y)+r.z*Math.abs(br.z),l=t.dot(br),c=e.dot(br),u=i.dot(br);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const lg=new Ka,da=new H,Pl=new H;class Bu{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):lg.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;da.subVectors(t,this.center);const e=da.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(da,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(da.copy(t.center).add(Pl)),this.expandByPoint(da.copy(t.center).sub(Pl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ii=new H,Ll=new H,lo=new H,er=new H,Dl=new H,co=new H,Il=new H;class ku{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ii)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ii.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ii.copy(this.origin).addScaledVector(this.direction,e),Ii.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Ll.copy(t).add(e).multiplyScalar(.5),lo.copy(e).sub(t).normalize(),er.copy(this.origin).sub(Ll);const s=t.distanceTo(e)*.5,a=-this.direction.dot(lo),o=er.dot(this.direction),l=-er.dot(lo),c=er.lengthSq(),u=Math.abs(1-a*a);let d,p,f,v;if(u>0)if(d=a*l-o,p=a*o-l,v=s*u,d>=0)if(p>=-v)if(p<=v){const _=1/u;d*=_,p*=_,f=d*(d+a*p+2*o)+p*(a*d+p+2*l)+c}else p=s,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;else p=-s,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;else p<=-v?(d=Math.max(0,-(-a*s+o)),p=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+p*(p+2*l)+c):p<=v?(d=0,p=Math.min(Math.max(-s,-l),s),f=p*(p+2*l)+c):(d=Math.max(0,-(a*s+o)),p=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+p*(p+2*l)+c);else p=a>0?-s:s,d=Math.max(0,-(a*p+o)),f=-d*d+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ll).addScaledVector(lo,p),f}intersectSphere(t,e){Ii.subVectors(t.center,this.origin);const i=Ii.dot(this.direction),r=Ii.dot(Ii)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(i=(t.min.x-p.x)*c,r=(t.max.x-p.x)*c):(i=(t.max.x-p.x)*c,r=(t.min.x-p.x)*c),u>=0?(s=(t.min.y-p.y)*u,a=(t.max.y-p.y)*u):(s=(t.max.y-p.y)*u,a=(t.min.y-p.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(t.min.z-p.z)*d,l=(t.max.z-p.z)*d):(o=(t.max.z-p.z)*d,l=(t.min.z-p.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Ii)!==null}intersectTriangle(t,e,i,r,s){Dl.subVectors(e,t),co.subVectors(i,t),Il.crossVectors(Dl,co);let a=this.direction.dot(Il),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;er.subVectors(this.origin,t);const l=o*this.direction.dot(co.crossVectors(er,co));if(l<0)return null;const c=o*this.direction.dot(Dl.cross(er));if(c<0||l+c>a)return null;const u=-o*er.dot(Il);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ne{constructor(t,e,i,r,s,a,o,l,c,u,d,p,f,v,_,m){Ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c,u,d,p,f,v,_,m)}set(t,e,i,r,s,a,o,l,c,u,d,p,f,v,_,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=i,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=p,h[3]=f,h[7]=v,h[11]=_,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ne().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/ds.setFromMatrixColumn(t,0).length(),s=1/ds.setFromMatrixColumn(t,1).length(),a=1/ds.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const p=a*u,f=a*d,v=o*u,_=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+v*c,e[5]=p-_*c,e[9]=-o*l,e[2]=_-p*c,e[6]=v+f*c,e[10]=a*l}else if(t.order==="YXZ"){const p=l*u,f=l*d,v=c*u,_=c*d;e[0]=p+_*o,e[4]=v*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=f*o-v,e[6]=_+p*o,e[10]=a*l}else if(t.order==="ZXY"){const p=l*u,f=l*d,v=c*u,_=c*d;e[0]=p-_*o,e[4]=-a*d,e[8]=v+f*o,e[1]=f+v*o,e[5]=a*u,e[9]=_-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const p=a*u,f=a*d,v=o*u,_=o*d;e[0]=l*u,e[4]=v*c-f,e[8]=p*c+_,e[1]=l*d,e[5]=_*c+p,e[9]=f*c-v,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const p=a*l,f=a*c,v=o*l,_=o*c;e[0]=l*u,e[4]=_-p*d,e[8]=v*d+f,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*d+v,e[10]=p-_*d}else if(t.order==="XZY"){const p=a*l,f=a*c,v=o*l,_=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=p*d+_,e[5]=a*u,e[9]=f*d-v,e[2]=v*d-f,e[6]=o*u,e[10]=_*d+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cg,t,ug)}lookAt(t,e,i){const r=this.elements;return Dn.subVectors(t,e),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),nr.crossVectors(i,Dn),nr.lengthSq()===0&&(Math.abs(i.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),nr.crossVectors(i,Dn)),nr.normalize(),uo.crossVectors(Dn,nr),r[0]=nr.x,r[4]=uo.x,r[8]=Dn.x,r[1]=nr.y,r[5]=uo.y,r[9]=Dn.y,r[2]=nr.z,r[6]=uo.z,r[10]=Dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],p=i[9],f=i[13],v=i[2],_=i[6],m=i[10],h=i[14],S=i[3],T=i[7],M=i[11],I=i[15],R=r[0],P=r[4],F=r[8],b=r[12],g=r[1],U=r[5],k=r[9],N=r[13],A=r[2],C=r[6],O=r[10],z=r[14],D=r[3],X=r[7],Z=r[11],J=r[15];return s[0]=a*R+o*g+l*A+c*D,s[4]=a*P+o*U+l*C+c*X,s[8]=a*F+o*k+l*O+c*Z,s[12]=a*b+o*N+l*z+c*J,s[1]=u*R+d*g+p*A+f*D,s[5]=u*P+d*U+p*C+f*X,s[9]=u*F+d*k+p*O+f*Z,s[13]=u*b+d*N+p*z+f*J,s[2]=v*R+_*g+m*A+h*D,s[6]=v*P+_*U+m*C+h*X,s[10]=v*F+_*k+m*O+h*Z,s[14]=v*b+_*N+m*z+h*J,s[3]=S*R+T*g+M*A+I*D,s[7]=S*P+T*U+M*C+I*X,s[11]=S*F+T*k+M*O+I*Z,s[15]=S*b+T*N+M*z+I*J,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],p=t[10],f=t[14],v=t[3],_=t[7],m=t[11],h=t[15];return v*(+s*l*d-r*c*d-s*o*p+i*c*p+r*o*f-i*l*f)+_*(+e*l*f-e*c*p+s*a*p-r*a*f+r*c*u-s*l*u)+m*(+e*c*d-e*o*f-s*a*d+i*a*f+s*o*u-i*c*u)+h*(-r*o*u-e*l*d+e*o*p+r*a*d-i*a*p+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],p=t[10],f=t[11],v=t[12],_=t[13],m=t[14],h=t[15],S=d*m*c-_*p*c+_*l*f-o*m*f-d*l*h+o*p*h,T=v*p*c-u*m*c-v*l*f+a*m*f+u*l*h-a*p*h,M=u*_*c-v*d*c+v*o*f-a*_*f-u*o*h+a*d*h,I=v*d*l-u*_*l-v*o*p+a*_*p+u*o*m-a*d*m,R=e*S+i*T+r*M+s*I;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return t[0]=S*P,t[1]=(_*p*s-d*m*s-_*r*f+i*m*f+d*r*h-i*p*h)*P,t[2]=(o*m*s-_*l*s+_*r*c-i*m*c-o*r*h+i*l*h)*P,t[3]=(d*l*s-o*p*s-d*r*c+i*p*c+o*r*f-i*l*f)*P,t[4]=T*P,t[5]=(u*m*s-v*p*s+v*r*f-e*m*f-u*r*h+e*p*h)*P,t[6]=(v*l*s-a*m*s-v*r*c+e*m*c+a*r*h-e*l*h)*P,t[7]=(a*p*s-u*l*s+u*r*c-e*p*c-a*r*f+e*l*f)*P,t[8]=M*P,t[9]=(v*d*s-u*_*s-v*i*f+e*_*f+u*i*h-e*d*h)*P,t[10]=(a*_*s-v*o*s+v*i*c-e*_*c-a*i*h+e*o*h)*P,t[11]=(u*o*s-a*d*s-u*i*c+e*d*c+a*i*f-e*o*f)*P,t[12]=I*P,t[13]=(u*_*r-v*d*r+v*i*p-e*_*p-u*i*m+e*d*m)*P,t[14]=(v*o*r-a*_*r-v*i*l+e*_*l+a*i*m-e*o*m)*P,t[15]=(a*d*r-u*o*r+u*i*l-e*d*l-a*i*p+e*o*p)*P,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,d=o+o,p=s*c,f=s*u,v=s*d,_=a*u,m=a*d,h=o*d,S=l*c,T=l*u,M=l*d,I=i.x,R=i.y,P=i.z;return r[0]=(1-(_+h))*I,r[1]=(f+M)*I,r[2]=(v-T)*I,r[3]=0,r[4]=(f-M)*R,r[5]=(1-(p+h))*R,r[6]=(m+S)*R,r[7]=0,r[8]=(v+T)*P,r[9]=(m-S)*P,r[10]=(1-(p+_))*P,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=ds.set(r[0],r[1],r[2]).length();const a=ds.set(r[4],r[5],r[6]).length(),o=ds.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Qn.copy(this);const c=1/s,u=1/a,d=1/o;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=u,Qn.elements[5]*=u,Qn.elements[6]*=u,Qn.elements[8]*=d,Qn.elements[9]*=d,Qn.elements[10]*=d,e.setFromRotationMatrix(Qn),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,r,s,a,o=Vi){const l=this.elements,c=2*s/(e-t),u=2*s/(i-r),d=(e+t)/(e-t),p=(i+r)/(i-r);let f,v;if(o===Vi)f=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Zo)f=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=Vi){const l=this.elements,c=1/(e-t),u=1/(i-r),d=1/(a-s),p=(e+t)*c,f=(i+r)*u;let v,_;if(o===Vi)v=(a+s)*d,_=-2*d;else if(o===Zo)v=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ds=new H,Qn=new Ne,cg=new H(0,0,0),ug=new H(1,1,1),nr=new H,uo=new H,Dn=new H,Td=new Ne,wd=new Jr;class Ai{constructor(t=0,e=0,i=0,r=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],p=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(oe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-oe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Td.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Td,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return wd.setFromEuler(this),this.setFromQuaternion(wd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class zu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let dg=0;const Ad=new H,hs=new Jr,Ui=new Ne,ho=new H,ha=new H,hg=new H,fg=new Jr,Rd=new H(1,0,0),Cd=new H(0,1,0),Pd=new H(0,0,1),Ld={type:"added"},pg={type:"removed"},fs={type:"childadded",child:null},Ul={type:"childremoved",child:null};class sn extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=Xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DEFAULT_UP.clone();const t=new H,e=new Ai,i=new Jr,r=new H(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ne},normalMatrix:{value:new se}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.multiply(hs),this}rotateOnWorldAxis(t,e){return hs.setFromAxisAngle(t,e),this.quaternion.premultiply(hs),this}rotateX(t){return this.rotateOnAxis(Rd,t)}rotateY(t){return this.rotateOnAxis(Cd,t)}rotateZ(t){return this.rotateOnAxis(Pd,t)}translateOnAxis(t,e){return Ad.copy(t).applyQuaternion(this.quaternion),this.position.add(Ad.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Rd,t)}translateY(t){return this.translateOnAxis(Cd,t)}translateZ(t){return this.translateOnAxis(Pd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ho.copy(t):ho.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(ha,ho,this.up):Ui.lookAt(ho,ha,this.up),this.quaternion.setFromRotationMatrix(Ui),r&&(Ui.extractRotation(r.matrixWorld),hs.setFromRotationMatrix(Ui),this.quaternion.premultiply(hs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ld),fs.child=t,this.dispatchEvent(fs),fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(pg),Ul.child=t,this.dispatchEvent(Ul),Ul.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ui.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ui),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ld),fs.child=t,this.dispatchEvent(fs),fs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,t,hg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ha,fg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),p=a(t.skeletons),f=a(t.animations),v=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),f.length>0&&(i.animations=f),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}sn.DEFAULT_UP=new H(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ti=new H,Ni=new H,Nl=new H,Fi=new H,ps=new H,ms=new H,Dd=new H,Fl=new H,Ol=new H,Bl=new H,kl=new Be,zl=new Be,Hl=new Be;class jn{constructor(t=new H,e=new H,i=new H){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),ti.subVectors(t,e),r.cross(ti);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){ti.subVectors(r,e),Ni.subVectors(i,e),Nl.subVectors(t,e);const a=ti.dot(ti),o=ti.dot(Ni),l=ti.dot(Nl),c=Ni.dot(Ni),u=Ni.dot(Nl),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const p=1/d,f=(c*l-o*u)*p,v=(a*u-o*l)*p;return s.set(1-f-v,v,f)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(t,e,i,r,s,a,o,l){return this.getBarycoord(t,e,i,r,Fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fi.x),l.addScaledVector(a,Fi.y),l.addScaledVector(o,Fi.z),l)}static getInterpolatedAttribute(t,e,i,r,s,a){return kl.setScalar(0),zl.setScalar(0),Hl.setScalar(0),kl.fromBufferAttribute(t,e),zl.fromBufferAttribute(t,i),Hl.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(kl,s.x),a.addScaledVector(zl,s.y),a.addScaledVector(Hl,s.z),a}static isFrontFacing(t,e,i,r){return ti.subVectors(i,e),Ni.subVectors(t,e),ti.cross(Ni).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ti.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),ti.cross(Ni).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return jn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return jn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return jn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return jn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return jn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let a,o;ps.subVectors(r,i),ms.subVectors(s,i),Fl.subVectors(t,i);const l=ps.dot(Fl),c=ms.dot(Fl);if(l<=0&&c<=0)return e.copy(i);Ol.subVectors(t,r);const u=ps.dot(Ol),d=ms.dot(Ol);if(u>=0&&d<=u)return e.copy(r);const p=l*d-u*c;if(p<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(ps,a);Bl.subVectors(t,s);const f=ps.dot(Bl),v=ms.dot(Bl);if(v>=0&&f<=v)return e.copy(s);const _=f*c-l*v;if(_<=0&&c>=0&&v<=0)return o=c/(c-v),e.copy(i).addScaledVector(ms,o);const m=u*v-f*d;if(m<=0&&d-u>=0&&f-v>=0)return Dd.subVectors(s,r),o=(d-u)/(d-u+(f-v)),e.copy(r).addScaledVector(Dd,o);const h=1/(m+_+p);return a=_*h,o=p*h,e.copy(i).addScaledVector(ps,a).addScaledVector(ms,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ep={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},fo={h:0,s:0,l:0};function Vl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ve{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=An){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=we.workingColorSpace){return this.r=t,this.g=e,this.b=i,we.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=we.workingColorSpace){if(t=Ou(t,1),e=oe(e,0,1),i=oe(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=Vl(a,s,t+1/3),this.g=Vl(a,s,t),this.b=Vl(a,s,t-1/3)}return we.toWorkingColorSpace(this,r),this}setStyle(t,e=An){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=An){const i=ep[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yi(t.r),this.g=Yi(t.g),this.b=Yi(t.b),this}copyLinearToSRGB(t){return this.r=Us(t.r),this.g=Us(t.g),this.b=Us(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=An){return we.fromWorkingColorSpace(fn.copy(this),t),Math.round(oe(fn.r*255,0,255))*65536+Math.round(oe(fn.g*255,0,255))*256+Math.round(oe(fn.b*255,0,255))}getHexString(t=An){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=we.workingColorSpace){we.fromWorkingColorSpace(fn.copy(this),e);const i=fn.r,r=fn.g,s=fn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=we.workingColorSpace){return we.fromWorkingColorSpace(fn.copy(this),e),t.r=fn.r,t.g=fn.g,t.b=fn.b,t}getStyle(t=An){we.fromWorkingColorSpace(fn.copy(this),t);const e=fn.r,i=fn.g,r=fn.b;return t!==An?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(ir),this.setHSL(ir.h+t,ir.s+e,ir.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ir),t.getHSL(fo);const i=La(ir.h,fo.h,e),r=La(ir.s,fo.s,e),s=La(ir.l,fo.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const fn=new ve;ve.NAMES=ep;let mg=0;class na extends ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Xi(),this.name="",this.type="Material",this.blending=Ds,this.side=_r,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tc,this.blendDst=wc,this.blendEquation=Lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ve(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(i.blending=this.blending),this.side!==_r&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Tc&&(i.blendSrc=this.blendSrc),this.blendDst!==wc&&(i.blendDst=this.blendDst),this.blendEquation!==Lr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(i.stencilFail=this.stencilFail),this.stencilZFail!==as&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ko extends na{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=Bf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ye=new H,po=new At;class di{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=uu,this.updateRanges=[],this.gpuType=Hi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)po.fromBufferAttribute(this,e),po.applyMatrix3(t),this.setXY(e,po.x,po.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix3(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=si(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=si(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=si(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=si(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=si(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array),s=Re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uu&&(t.usage=this.usage),t}}class np extends di{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class ip extends di{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ke extends di{constructor(t,e,i){super(new Float32Array(t),e,i)}}let vg=0;const Vn=new Ne,Gl=new sn,vs=new H,In=new Ka,fa=new Ka,en=new H;class zn extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Jf(t)?ip:np)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new se().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Vn.makeRotationFromQuaternion(t),this.applyMatrix4(Vn),this}rotateX(t){return Vn.makeRotationX(t),this.applyMatrix4(Vn),this}rotateY(t){return Vn.makeRotationY(t),this.applyMatrix4(Vn),this}rotateZ(t){return Vn.makeRotationZ(t),this.applyMatrix4(Vn),this}translate(t,e,i){return Vn.makeTranslation(t,e,i),this.applyMatrix4(Vn),this}scale(t,e,i){return Vn.makeScale(t,e,i),this.applyMatrix4(Vn),this}lookAt(t){return Gl.lookAt(t),Gl.updateMatrix(),this.applyMatrix4(Gl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vs).negate(),this.translate(vs.x,vs.y,vs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ke(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ka);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];In.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bu);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const i=this.boundingSphere.center;if(In.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];fa.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(In.min,fa.min),In.expandByPoint(en),en.addVectors(In.max,fa.max),In.expandByPoint(en)):(In.expandByPoint(fa.min),In.expandByPoint(fa.max))}In.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)en.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(en));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)en.fromBufferAttribute(o,c),l&&(vs.fromBufferAttribute(t,c),en.add(vs)),r=Math.max(r,i.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new di(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let F=0;F<i.count;F++)o[F]=new H,l[F]=new H;const c=new H,u=new H,d=new H,p=new At,f=new At,v=new At,_=new H,m=new H;function h(F,b,g){c.fromBufferAttribute(i,F),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,g),p.fromBufferAttribute(s,F),f.fromBufferAttribute(s,b),v.fromBufferAttribute(s,g),u.sub(c),d.sub(c),f.sub(p),v.sub(p);const U=1/(f.x*v.y-v.x*f.y);isFinite(U)&&(_.copy(u).multiplyScalar(v.y).addScaledVector(d,-f.y).multiplyScalar(U),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-v.x).multiplyScalar(U),o[F].add(_),o[b].add(_),o[g].add(_),l[F].add(m),l[b].add(m),l[g].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let F=0,b=S.length;F<b;++F){const g=S[F],U=g.start,k=g.count;for(let N=U,A=U+k;N<A;N+=3)h(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const T=new H,M=new H,I=new H,R=new H;function P(F){I.fromBufferAttribute(r,F),R.copy(I);const b=o[F];T.copy(b),T.sub(I.multiplyScalar(I.dot(b))).normalize(),M.crossVectors(R,b);const U=M.dot(l[F])<0?-1:1;a.setXYZW(F,T.x,T.y,T.z,U)}for(let F=0,b=S.length;F<b;++F){const g=S[F],U=g.start,k=g.count;for(let N=U,A=U+k;N<A;N+=3)P(t.getX(N+0)),P(t.getX(N+1)),P(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new di(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let p=0,f=i.count;p<f;p++)i.setXYZ(p,0,0,0);const r=new H,s=new H,a=new H,o=new H,l=new H,c=new H,u=new H,d=new H;if(t)for(let p=0,f=t.count;p<f;p+=3){const v=t.getX(p+0),_=t.getX(p+1),m=t.getX(p+2);r.fromBufferAttribute(e,v),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=e.count;p<f;p+=3)r.fromBufferAttribute(e,p+0),s.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),i.setXYZ(p+0,u.x,u.y,u.z),i.setXYZ(p+1,u.x,u.y,u.z),i.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)en.fromBufferAttribute(t,e),en.normalize(),t.setXYZ(e,en.x,en.y,en.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,d=o.normalized,p=new c.constructor(l.length*u);let f=0,v=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let h=0;h<u;h++)p[v++]=c[f++]}return new di(p,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new zn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,i);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const p=c[u],f=t(p,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,p=c.length;d<p;d++){const f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],d=s[c];for(let p=0,f=d.length;p<f;p++)u.push(d[p].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Id=new Ne,Er=new ku,mo=new Bu,Ud=new H,vo=new H,_o=new H,go=new H,Wl=new H,xo=new H,Nd=new H,yo=new H;class kn extends sn{constructor(t=new zn,e=new Ko){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){xo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Wl.fromBufferAttribute(d,t),a?xo.addScaledVector(Wl,u):xo.addScaledVector(Wl.sub(e),u))}e.add(xo)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),mo.copy(i.boundingSphere),mo.applyMatrix4(s),Er.copy(t.ray).recast(t.near),!(mo.containsPoint(Er.origin)===!1&&(Er.intersectSphere(mo,Ud)===null||Er.origin.distanceToSquared(Ud)>(t.far-t.near)**2))&&(Id.copy(s).invert(),Er.copy(t.ray).applyMatrix4(Id),!(i.boundingBox!==null&&Er.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Er)))}_computeIntersections(t,e,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,p=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,_=p.length;v<_;v++){const m=p[v],h=a[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,I=T;M<I;M+=3){const R=o.getX(M),P=o.getX(M+1),F=o.getX(M+2);r=Mo(this,h,t,i,c,u,d,R,P,F),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const v=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=v,h=_;m<h;m+=3){const S=o.getX(m),T=o.getX(m+1),M=o.getX(m+2);r=Mo(this,a,t,i,c,u,d,S,T,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,_=p.length;v<_;v++){const m=p[v],h=a[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,I=T;M<I;M+=3){const R=M,P=M+1,F=M+2;r=Mo(this,h,t,i,c,u,d,R,P,F),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const v=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=v,h=_;m<h;m+=3){const S=m,T=m+1,M=m+2;r=Mo(this,a,t,i,c,u,d,S,T,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function _g(n,t,e,i,r,s,a,o){let l;if(t.side===Pn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,t.side===_r,o),l===null)return null;yo.copy(o),yo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(yo);return c<e.near||c>e.far?null:{distance:c,point:yo.clone(),object:n}}function Mo(n,t,e,i,r,s,a,o,l,c){n.getVertexPosition(o,vo),n.getVertexPosition(l,_o),n.getVertexPosition(c,go);const u=_g(n,t,e,i,vo,_o,go,Nd);if(u){const d=new H;jn.getBarycoord(Nd,vo,_o,go,d),r&&(u.uv=jn.getInterpolatedAttribute(r,o,l,c,d,new At)),s&&(u.uv1=jn.getInterpolatedAttribute(s,o,l,c,d,new At)),a&&(u.normal=jn.getInterpolatedAttribute(a,o,l,c,d,new H),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new H,materialIndex:0};jn.getNormal(vo,_o,go,p.normal),u.face=p,u.barycoord=d}return u}class ia extends zn{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let p=0,f=0;v("z","y","x",-1,-1,i,e,t,a,s,0),v("z","y","x",1,-1,i,e,-t,a,s,1),v("x","z","y",1,1,t,i,e,r,a,2),v("x","z","y",1,-1,t,i,-e,r,a,3),v("x","y","z",1,-1,t,e,i,r,s,4),v("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ke(c,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(d,2));function v(_,m,h,S,T,M,I,R,P,F,b){const g=M/P,U=I/F,k=M/2,N=I/2,A=R/2,C=P+1,O=F+1;let z=0,D=0;const X=new H;for(let Z=0;Z<O;Z++){const J=Z*U-N;for(let ft=0;ft<C;ft++){const ut=ft*g-k;X[_]=ut*S,X[m]=J*T,X[h]=A,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[h]=R>0?1:-1,u.push(X.x,X.y,X.z),d.push(ft/P),d.push(1-Z/F),z+=1}}for(let Z=0;Z<F;Z++)for(let J=0;J<P;J++){const ft=p+J+C*Z,ut=p+J+C*(Z+1),G=p+(J+1)+C*(Z+1),nt=p+(J+1)+C*Z;l.push(ft,ut,nt),l.push(ut,G,nt),D+=6}o.addGroup(f,D,b),f+=D,p+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ia(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Js(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function yn(n){const t={};for(let e=0;e<n.length;e++){const i=Js(n[e]);for(const r in i)t[r]=i[r]}return t}function gg(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function rp(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const xg={clone:Js,merge:yn};var yg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gr extends na{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yg,this.fragmentShader=Mg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Js(t.uniforms),this.uniformsGroups=gg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class sp extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=Vi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rr=new H,Fd=new At,Od=new At;class qn extends sp{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ha*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Pa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ha*2*Math.atan(Math.tan(Pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(rr.x,rr.y).multiplyScalar(-t/rr.z),rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rr.x,rr.y).multiplyScalar(-t/rr.z)}getViewSize(t,e){return this.getViewBounds(t,Fd,Od),e.subVectors(Od,Fd)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Pa*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _s=-90,gs=1;class Sg extends sn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new qn(_s,gs,t,e);r.layers=this.layers,this.add(r);const s=new qn(_s,gs,t,e);s.layers=this.layers,this.add(s);const a=new qn(_s,gs,t,e);a.layers=this.layers,this.add(a);const o=new qn(_s,gs,t,e);o.layers=this.layers,this.add(o);const l=new qn(_s,gs,t,e);l.layers=this.layers,this.add(l);const c=new qn(_s,gs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===Vi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=t.getRenderTarget(),p=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,a),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(d,p,f),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class ap extends bn{constructor(t,e,i,r,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:qs,super(t,e,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bg extends Kr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new ap(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Si}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ia(5,5,5),s=new gr({name:"CubemapFromEquirect",uniforms:Js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Pn,blending:pr});s.uniforms.tEquirect.value=e;const a=new kn(r,s),o=e.minFilter;return e.minFilter===Or&&(e.minFilter=Si),new Sg(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}}class Eg extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Tg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=uu,this.updateRanges=[],this.version=0,this.uuid=Xi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xn=new H;class Jo{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)xn.fromBufferAttribute(this,e),xn.applyMatrix4(t),this.setXYZ(e,xn.x,xn.y,xn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)xn.fromBufferAttribute(this,e),xn.applyNormalMatrix(t),this.setXYZ(e,xn.x,xn.y,xn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)xn.fromBufferAttribute(this,e),xn.transformDirection(t),this.setXYZ(e,xn.x,xn.y,xn.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=si(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Re(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=si(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=si(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=si(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=si(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),i=Re(i,this.array),r=Re(r,this.array),s=Re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new di(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Jo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class op extends na{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let xs;const pa=new H,ys=new H,Ms=new H,Ss=new At,ma=new At,lp=new Ne,So=new H,va=new H,bo=new H,Bd=new At,Xl=new At,kd=new At;class wg extends sn{constructor(t=new op){if(super(),this.isSprite=!0,this.type="Sprite",xs===void 0){xs=new zn;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Tg(e,5);xs.setIndex([0,1,2,0,2,3]),xs.setAttribute("position",new Jo(i,3,0,!1)),xs.setAttribute("uv",new Jo(i,2,3,!1))}this.geometry=xs,this.material=t,this.center=new At(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ys.setFromMatrixScale(this.matrixWorld),lp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ms.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ys.multiplyScalar(-Ms.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;Eo(So.set(-.5,-.5,0),Ms,a,ys,r,s),Eo(va.set(.5,-.5,0),Ms,a,ys,r,s),Eo(bo.set(.5,.5,0),Ms,a,ys,r,s),Bd.set(0,0),Xl.set(1,0),kd.set(1,1);let o=t.ray.intersectTriangle(So,va,bo,!1,pa);if(o===null&&(Eo(va.set(-.5,.5,0),Ms,a,ys,r,s),Xl.set(0,1),o=t.ray.intersectTriangle(So,bo,va,!1,pa),o===null))return;const l=t.ray.origin.distanceTo(pa);l<t.near||l>t.far||e.push({distance:l,point:pa.clone(),uv:jn.getInterpolation(pa,So,va,bo,Bd,Xl,kd,new At),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Eo(n,t,e,i,r,s){Ss.subVectors(n,e).addScalar(.5).multiply(i),r!==void 0?(ma.x=s*Ss.x-r*Ss.y,ma.y=r*Ss.x+s*Ss.y):ma.copy(Ss),n.copy(t),n.x+=ma.x,n.y+=ma.y,n.applyMatrix4(lp)}const Yl=new H,Ag=new H,Rg=new se;class ar{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=Yl.subVectors(i,e).cross(Ag.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Yl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Rg.getNormalMatrix(t),r=this.coplanarPoint(Yl).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Tr=new Bu,To=new H;class Hu{constructor(t=new ar,e=new ar,i=new ar,r=new ar,s=new ar,a=new ar){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Vi){const i=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],d=r[6],p=r[7],f=r[8],v=r[9],_=r[10],m=r[11],h=r[12],S=r[13],T=r[14],M=r[15];if(i[0].setComponents(l-s,p-c,m-f,M-h).normalize(),i[1].setComponents(l+s,p+c,m+f,M+h).normalize(),i[2].setComponents(l+a,p+u,m+v,M+S).normalize(),i[3].setComponents(l-a,p-u,m-v,M-S).normalize(),i[4].setComponents(l-o,p-d,m-_,M-T).normalize(),e===Vi)i[5].setComponents(l+o,p+d,m+_,M+T).normalize();else if(e===Zo)i[5].setComponents(o,d,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Tr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Tr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Tr)}intersectsSprite(t){return Tr.center.set(0,0,0),Tr.radius=.7071067811865476,Tr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Tr)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(To.x=r.normal.x>0?t.max.x:t.min.x,To.y=r.normal.y>0?t.max.y:t.min.y,To.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(To)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Br extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Cg extends bn{constructor(t,e,i,r,s,a,o,l,c){super(t,e,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class cp extends bn{constructor(t,e,i,r,s,a,o,l,c,u=Is){if(u!==Is&&u!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Is&&(i=$r),i===void 0&&u===$s&&(i=Zs),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ui,this.minFilter=l!==void 0?l:ui,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ri{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let r=0;const s=i.length;let a;e?a=e:a=t*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],p=i[r+1]-u,f=(a-u)/p;return(r+f)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=e||(a.isVector2?new At:new H);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new H,r=[],s=[],a=[],o=new H,l=new Ne;for(let f=0;f<=t;f++){const v=f/t;r[f]=this.getTangentAt(v,new H)}s[0]=new H,a[0]=new H;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),p=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),p<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(oe(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,v))}a[f].crossVectors(r[f],s[f])}if(e===!0){let f=Math.acos(oe(s[0].dot(s[t]),-1,1));f/=t,r[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let v=1;v<=t;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],f*v)),a[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Vu extends Ri{constructor(t=0,e=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new At){const i=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*u-f*d+this.aX,c=p*d+f*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Pg extends Vu{constructor(t,e,i,r,s,a){super(t,e,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Gu(){let n=0,t=0,e=0,i=0;function r(s,a,o,l){n=s,t=o,e=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,d){let p=(a-s)/c-(o-s)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;p*=u,f*=u,r(a,o,p,f)},calc:function(s){const a=s*s,o=a*s;return n+t*s+e*a+i*o}}}const wo=new H,ql=new Gu,jl=new Gu,Zl=new Gu;class Lg extends Ri{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new H){const i=e,r=this.points,s=r.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(wo.subVectors(r[0],r[1]).add(r[0]),c=wo);const d=r[o%s],p=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(wo.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=wo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(u),f);_<1e-4&&(_=1),v<1e-4&&(v=_),m<1e-4&&(m=_),ql.initNonuniformCatmullRom(c.x,d.x,p.x,u.x,v,_,m),jl.initNonuniformCatmullRom(c.y,d.y,p.y,u.y,v,_,m),Zl.initNonuniformCatmullRom(c.z,d.z,p.z,u.z,v,_,m)}else this.curveType==="catmullrom"&&(ql.initCatmullRom(c.x,d.x,p.x,u.x,this.tension),jl.initCatmullRom(c.y,d.y,p.y,u.y,this.tension),Zl.initCatmullRom(c.z,d.z,p.z,u.z,this.tension));return i.set(ql.calc(l),jl.calc(l),Zl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new H().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function zd(n,t,e,i,r){const s=(i-t)*.5,a=(r-e)*.5,o=n*n,l=n*o;return(2*e-2*i+s+a)*l+(-3*e+3*i-2*s-a)*o+s*n+e}function Dg(n,t){const e=1-n;return e*e*t}function Ig(n,t){return 2*(1-n)*n*t}function Ug(n,t){return n*n*t}function Da(n,t,e,i){return Dg(n,t)+Ig(n,e)+Ug(n,i)}function Ng(n,t){const e=1-n;return e*e*e*t}function Fg(n,t){const e=1-n;return 3*e*e*n*t}function Og(n,t){return 3*(1-n)*n*n*t}function Bg(n,t){return n*n*n*t}function Ia(n,t,e,i,r){return Ng(n,t)+Fg(n,e)+Og(n,i)+Bg(n,r)}class up extends Ri{constructor(t=new At,e=new At,i=new At,r=new At){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new At){const i=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Ia(t,r.x,s.x,a.x,o.x),Ia(t,r.y,s.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class kg extends Ri{constructor(t=new H,e=new H,i=new H,r=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new H){const i=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Ia(t,r.x,s.x,a.x,o.x),Ia(t,r.y,s.y,a.y,o.y),Ia(t,r.z,s.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class dp extends Ri{constructor(t=new At,e=new At){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new At){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new At){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zg extends Ri{constructor(t=new H,e=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new H){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new H){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hp extends Ri{constructor(t=new At,e=new At,i=new At){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new At){const i=e,r=this.v0,s=this.v1,a=this.v2;return i.set(Da(t,r.x,s.x,a.x),Da(t,r.y,s.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hg extends Ri{constructor(t=new H,e=new H,i=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new H){const i=e,r=this.v0,s=this.v1,a=this.v2;return i.set(Da(t,r.x,s.x,a.x),Da(t,r.y,s.y,a.y),Da(t,r.z,s.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class fp extends Ri{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new At){const i=e,r=this.points,s=(r.length-1)*t,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return i.set(zd(o,l.x,c.x,u.x,d.x),zd(o,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new At().fromArray(r))}return this}}var Hd=Object.freeze({__proto__:null,ArcCurve:Pg,CatmullRomCurve3:Lg,CubicBezierCurve:up,CubicBezierCurve3:kg,EllipseCurve:Vu,LineCurve:dp,LineCurve3:zg,QuadraticBezierCurve:hp,QuadraticBezierCurve3:Hg,SplineCurve:fp});class Vg extends Ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Hd[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(new Hd[r.type]().fromJSON(r))}return this}}class Gg extends Vg{constructor(t){super(),this.type="Path",this.currentPoint=new At,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new dp(this.currentPoint.clone(),new At(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){const s=new hp(this.currentPoint.clone(),new At(t,e),new At(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,s,a){const o=new up(this.currentPoint.clone(),new At(t,e),new At(i,r),new At(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new fp(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,r,s,a),this}absarc(t,e,i,r,s,a){return this.absellipse(t,e,i,i,r,s,a),this}ellipse(t,e,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,r,s,a,o,l),this}absellipse(t,e,i,r,s,a,o,l){const c=new Vu(t,e,i,r,s,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Wu extends zn{constructor(t=[new At(0,-.5),new At(.5,0),new At(0,.5)],e=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:r},e=Math.floor(e),r=oe(r,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/e,d=new H,p=new At,f=new H,v=new H,_=new H;let m=0,h=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,h=t[S+1].y-t[S].y,f.x=h*1,f.y=-m,f.z=h*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[S+1].x-t[S].x,h=t[S+1].y-t[S].y,f.x=h*1,f.y=-m,f.z=h*0,v.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(v)}for(let S=0;S<=e;S++){const T=i+S*u*r,M=Math.sin(T),I=Math.cos(T);for(let R=0;R<=t.length-1;R++){d.x=t[R].x*M,d.y=t[R].y,d.z=t[R].x*I,a.push(d.x,d.y,d.z),p.x=S/e,p.y=R/(t.length-1),o.push(p.x,p.y);const P=l[3*R+0]*M,F=l[3*R+1],b=l[3*R+0]*I;c.push(P,F,b)}}for(let S=0;S<e;S++)for(let T=0;T<t.length-1;T++){const M=T+S*t.length,I=M,R=M+t.length,P=M+t.length+1,F=M+1;s.push(I,R,F),s.push(P,F,R)}this.setIndex(s),this.setAttribute("position",new ke(a,3)),this.setAttribute("uv",new ke(o,2)),this.setAttribute("normal",new ke(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wu(t.points,t.segments,t.phiStart,t.phiLength)}}class Xu extends Wu{constructor(t=1,e=1,i=4,r=8){const s=new Gg;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:i,radialSegments:r}}static fromJSON(t){return new Xu(t.radius,t.length,t.capSegments,t.radialSegments)}}class ul extends zn{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);const s=[],a=[],o=[],l=[],c=new H,u=new At;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,p=3;d<=e;d++,p+=3){const f=i+d/e*r;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[p]/t+1)/2,u.y=(a[p+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new ke(a,3)),this.setAttribute("normal",new ke(o,3)),this.setAttribute("uv",new ke(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ul(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Yu extends zn{constructor(t=1,e=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],p=[],f=[];let v=0;const _=[],m=i/2;let h=0;S(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(u),this.setAttribute("position",new ke(d,3)),this.setAttribute("normal",new ke(p,3)),this.setAttribute("uv",new ke(f,2));function S(){const M=new H,I=new H;let R=0;const P=(e-t)/i;for(let F=0;F<=s;F++){const b=[],g=F/s,U=g*(e-t)+t;for(let k=0;k<=r;k++){const N=k/r,A=N*l+o,C=Math.sin(A),O=Math.cos(A);I.x=U*C,I.y=-g*i+m,I.z=U*O,d.push(I.x,I.y,I.z),M.set(C,P,O).normalize(),p.push(M.x,M.y,M.z),f.push(N,1-g),b.push(v++)}_.push(b)}for(let F=0;F<r;F++)for(let b=0;b<s;b++){const g=_[b][F],U=_[b+1][F],k=_[b+1][F+1],N=_[b][F+1];(t>0||b!==0)&&(u.push(g,U,N),R+=3),(e>0||b!==s-1)&&(u.push(U,k,N),R+=3)}c.addGroup(h,R,0),h+=R}function T(M){const I=v,R=new At,P=new H;let F=0;const b=M===!0?t:e,g=M===!0?1:-1;for(let k=1;k<=r;k++)d.push(0,m*g,0),p.push(0,g,0),f.push(.5,.5),v++;const U=v;for(let k=0;k<=r;k++){const A=k/r*l+o,C=Math.cos(A),O=Math.sin(A);P.x=b*O,P.y=m*g,P.z=b*C,d.push(P.x,P.y,P.z),p.push(0,g,0),R.x=C*.5+.5,R.y=O*.5*g+.5,f.push(R.x,R.y),v++}for(let k=0;k<r;k++){const N=I+k,A=U+k;M===!0?u.push(A,A+1,N):u.push(A+1,A,N),F+=3}c.addGroup(h,F,M===!0?1:2),h+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yu(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dl extends zn{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,d=t/o,p=e/l,f=[],v=[],_=[],m=[];for(let h=0;h<u;h++){const S=h*p-a;for(let T=0;T<c;T++){const M=T*d-s;v.push(M,-S,0),_.push(0,0,1),m.push(T/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let S=0;S<o;S++){const T=S+c*h,M=S+c*(h+1),I=S+1+c*(h+1),R=S+1+c*h;f.push(T,M,R),f.push(M,I,R)}this.setIndex(f),this.setAttribute("position",new ke(v,3)),this.setAttribute("normal",new ke(_,3)),this.setAttribute("uv",new ke(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dl(t.width,t.height,t.widthSegments,t.heightSegments)}}class qu extends zn{constructor(t=.5,e=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let d=t;const p=(e-t)/r,f=new H,v=new At;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const h=s+m/i*a;f.x=d*Math.cos(h),f.y=d*Math.sin(h),l.push(f.x,f.y,f.z),c.push(0,0,1),v.x=(f.x/e+1)/2,v.y=(f.y/e+1)/2,u.push(v.x,v.y)}d+=p}for(let _=0;_<r;_++){const m=_*(i+1);for(let h=0;h<i;h++){const S=h+m,T=S,M=S+i+1,I=S+i+2,R=S+1;o.push(T,M,R),o.push(M,I,R)}}this.setIndex(o),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(c,3)),this.setAttribute("uv",new ke(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Qo extends zn{constructor(t=1,e=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new H,p=new H,f=[],v=[],_=[],m=[];for(let h=0;h<=i;h++){const S=[],T=h/i;let M=0;h===0&&a===0?M=.5/e:h===i&&l===Math.PI&&(M=-.5/e);for(let I=0;I<=e;I++){const R=I/e;d.x=-t*Math.cos(r+R*s)*Math.sin(a+T*o),d.y=t*Math.cos(a+T*o),d.z=t*Math.sin(r+R*s)*Math.sin(a+T*o),v.push(d.x,d.y,d.z),p.copy(d).normalize(),_.push(p.x,p.y,p.z),m.push(R+M,1-T),S.push(c++)}u.push(S)}for(let h=0;h<i;h++)for(let S=0;S<e;S++){const T=u[h][S+1],M=u[h][S],I=u[h+1][S],R=u[h+1][S+1];(h!==0||a>0)&&f.push(T,M,R),(h!==i-1||l<Math.PI)&&f.push(M,I,R)}this.setIndex(f),this.setAttribute("position",new ke(v,3)),this.setAttribute("normal",new ke(_,3)),this.setAttribute("uv",new ke(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class pp extends na{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$f,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Wg extends na{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=w_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Xg extends na{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class mp extends sn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ve(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Yg extends mp{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ve(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const $l=new Ne,Vd=new H,Gd=new H;class qg{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hu,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new Be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Vd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vd),Gd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gd),e.updateMatrixWorld(),$l.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($l),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply($l)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class vp extends sp{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class jg extends qg{constructor(){super(new vp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wd extends mp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new jg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Zg extends qn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}const Xd=new Ne;class $g{constructor(t,e,i=0,r=1/0){this.ray=new ku(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new zu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Xd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xd),this}intersectObject(t,e=!0,i=[]){return du(t,this,i,e),i.sort(Yd),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)du(t[r],this,i,e);return i.sort(Yd),i}}function Yd(n,t){return n.distance-t.distance}function du(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)du(s[a],t,e,!0)}}class qd{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(oe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Kg extends ts{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function jd(n,t,e,i){const r=Jg(i);switch(e){case Gf:return n*t;case Xf:return n*t;case Yf:return n*t*2;case qf:return n*t/r.components*r.byteLength;case Uu:return n*t/r.components*r.byteLength;case jf:return n*t*2/r.components*r.byteLength;case Nu:return n*t*2/r.components*r.byteLength;case Wf:return n*t*3/r.components*r.byteLength;case li:return n*t*4/r.components*r.byteLength;case Fu:return n*t*4/r.components*r.byteLength;case No:case Fo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Oo:case Bo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case kc:case Hc:return Math.max(n,16)*Math.max(t,8)/4;case Bc:case zc:return Math.max(n,8)*Math.max(t,8)/2;case Vc:case Gc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Wc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Xc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Yc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case qc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case jc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Zc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case $c:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Kc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Jc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Qc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case tu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case eu:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case nu:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case iu:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ru:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ko:case su:case au:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Zf:case ou:return Math.ceil(n/4)*Math.ceil(t/4)*8;case lu:case cu:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jg(n){switch(n){case ji:case zf:return{byteLength:1,components:1};case za:case Hf:case $a:return{byteLength:2,components:1};case Du:case Iu:return{byteLength:2,components:4};case $r:case Lu:case Hi:return{byteLength:4,components:1};case Vf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pu);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function _p(){let n=null,t=!1,e=null,i=null;function r(s,a){e(s,a),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function Qg(n){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,d=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,v)=>f.start-v.start);let p=0;for(let f=1;f<d.length;f++){const v=d[p],_=d[f];_.start<=v.start+v.count+1?v.count=Math.max(v.count,_.start+_.count-v.start):(++p,d[p]=_)}d.length=p+1;for(let f=0,v=d.length;f<v;f++){const _=d[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var t0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,e0=`#ifdef USE_ALPHAHASH
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
#endif`,n0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,i0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,r0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,s0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,a0=`#ifdef USE_AOMAP
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
#endif`,o0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l0=`#ifdef USE_BATCHING
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
#endif`,c0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,u0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,d0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,h0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,f0=`#ifdef USE_IRIDESCENCE
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
#endif`,p0=`#ifdef USE_BUMPMAP
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
#endif`,m0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,x0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,y0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,M0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,S0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,b0=`#define PI 3.141592653589793
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
} // validated`,E0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,T0=`vec3 transformedNormal = objectNormal;
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
#endif`,w0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,A0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,C0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,P0="gl_FragColor = linearToOutputTexel( gl_FragColor );",L0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,D0=`#ifdef USE_ENVMAP
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
#endif`,I0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,U0=`#ifdef USE_ENVMAP
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
#endif`,N0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,F0=`#ifdef USE_ENVMAP
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
#endif`,O0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,B0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,k0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,H0=`#ifdef USE_GRADIENTMAP
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
}`,V0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,G0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,X0=`uniform bool receiveShadow;
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
#endif`,Y0=`#ifdef USE_ENVMAP
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
#endif`,q0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,j0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Z0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,K0=`PhysicalMaterial material;
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
#endif`,J0=`struct PhysicalMaterial {
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
}`,Q0=`
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
#endif`,tx=`#if defined( RE_IndirectDiffuse )
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
#endif`,ex=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ix=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ox=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cx=`#if defined( USE_POINTS_UV )
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
#endif`,ux=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,px=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mx=`#ifdef USE_MORPHTARGETS
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
#endif`,vx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_x=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sx=`#ifdef USE_NORMALMAP
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
#endif`,bx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ex=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ax=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Px=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ix=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ux=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ox=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bx=`float getShadowMask() {
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
}`,kx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zx=`#ifdef USE_SKINNING
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
#endif`,Hx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vx=`#ifdef USE_SKINNING
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
#endif`,Gx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qx=`#ifdef USE_TRANSMISSION
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
#endif`,jx=`#ifdef USE_TRANSMISSION
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
#endif`,Zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ty=`uniform sampler2D t2D;
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
}`,ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ny=`#ifdef ENVMAP_TYPE_CUBE
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
}`,iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ry=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sy=`#include <common>
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
}`,ay=`#if DEPTH_PACKING == 3200
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
}`,oy=`#define DISTANCE
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
}`,ly=`#define DISTANCE
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
}`,cy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dy=`uniform float scale;
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
}`,hy=`uniform vec3 diffuse;
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
}`,fy=`#include <common>
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
}`,py=`uniform vec3 diffuse;
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
}`,my=`#define LAMBERT
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
}`,vy=`#define LAMBERT
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
}`,_y=`#define MATCAP
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
}`,gy=`#define MATCAP
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
}`,xy=`#define NORMAL
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
}`,yy=`#define NORMAL
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
}`,My=`#define PHONG
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
}`,Sy=`#define PHONG
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
}`,by=`#define STANDARD
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
}`,Ey=`#define STANDARD
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
}`,Ty=`#define TOON
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
}`,wy=`#define TOON
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
}`,Ay=`uniform float size;
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
}`,Ry=`uniform vec3 diffuse;
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
}`,Cy=`#include <common>
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
}`,Py=`uniform vec3 color;
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
}`,Ly=`uniform float rotation;
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
}`,Dy=`uniform vec3 diffuse;
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
}`,ce={alphahash_fragment:t0,alphahash_pars_fragment:e0,alphamap_fragment:n0,alphamap_pars_fragment:i0,alphatest_fragment:r0,alphatest_pars_fragment:s0,aomap_fragment:a0,aomap_pars_fragment:o0,batching_pars_vertex:l0,batching_vertex:c0,begin_vertex:u0,beginnormal_vertex:d0,bsdfs:h0,iridescence_fragment:f0,bumpmap_pars_fragment:p0,clipping_planes_fragment:m0,clipping_planes_pars_fragment:v0,clipping_planes_pars_vertex:_0,clipping_planes_vertex:g0,color_fragment:x0,color_pars_fragment:y0,color_pars_vertex:M0,color_vertex:S0,common:b0,cube_uv_reflection_fragment:E0,defaultnormal_vertex:T0,displacementmap_pars_vertex:w0,displacementmap_vertex:A0,emissivemap_fragment:R0,emissivemap_pars_fragment:C0,colorspace_fragment:P0,colorspace_pars_fragment:L0,envmap_fragment:D0,envmap_common_pars_fragment:I0,envmap_pars_fragment:U0,envmap_pars_vertex:N0,envmap_physical_pars_fragment:Y0,envmap_vertex:F0,fog_vertex:O0,fog_pars_vertex:B0,fog_fragment:k0,fog_pars_fragment:z0,gradientmap_pars_fragment:H0,lightmap_pars_fragment:V0,lights_lambert_fragment:G0,lights_lambert_pars_fragment:W0,lights_pars_begin:X0,lights_toon_fragment:q0,lights_toon_pars_fragment:j0,lights_phong_fragment:Z0,lights_phong_pars_fragment:$0,lights_physical_fragment:K0,lights_physical_pars_fragment:J0,lights_fragment_begin:Q0,lights_fragment_maps:tx,lights_fragment_end:ex,logdepthbuf_fragment:nx,logdepthbuf_pars_fragment:ix,logdepthbuf_pars_vertex:rx,logdepthbuf_vertex:sx,map_fragment:ax,map_pars_fragment:ox,map_particle_fragment:lx,map_particle_pars_fragment:cx,metalnessmap_fragment:ux,metalnessmap_pars_fragment:dx,morphinstance_vertex:hx,morphcolor_vertex:fx,morphnormal_vertex:px,morphtarget_pars_vertex:mx,morphtarget_vertex:vx,normal_fragment_begin:_x,normal_fragment_maps:gx,normal_pars_fragment:xx,normal_pars_vertex:yx,normal_vertex:Mx,normalmap_pars_fragment:Sx,clearcoat_normal_fragment_begin:bx,clearcoat_normal_fragment_maps:Ex,clearcoat_pars_fragment:Tx,iridescence_pars_fragment:wx,opaque_fragment:Ax,packing:Rx,premultiplied_alpha_fragment:Cx,project_vertex:Px,dithering_fragment:Lx,dithering_pars_fragment:Dx,roughnessmap_fragment:Ix,roughnessmap_pars_fragment:Ux,shadowmap_pars_fragment:Nx,shadowmap_pars_vertex:Fx,shadowmap_vertex:Ox,shadowmask_pars_fragment:Bx,skinbase_vertex:kx,skinning_pars_vertex:zx,skinning_vertex:Hx,skinnormal_vertex:Vx,specularmap_fragment:Gx,specularmap_pars_fragment:Wx,tonemapping_fragment:Xx,tonemapping_pars_fragment:Yx,transmission_fragment:qx,transmission_pars_fragment:jx,uv_pars_fragment:Zx,uv_pars_vertex:$x,uv_vertex:Kx,worldpos_vertex:Jx,background_vert:Qx,background_frag:ty,backgroundCube_vert:ey,backgroundCube_frag:ny,cube_vert:iy,cube_frag:ry,depth_vert:sy,depth_frag:ay,distanceRGBA_vert:oy,distanceRGBA_frag:ly,equirect_vert:cy,equirect_frag:uy,linedashed_vert:dy,linedashed_frag:hy,meshbasic_vert:fy,meshbasic_frag:py,meshlambert_vert:my,meshlambert_frag:vy,meshmatcap_vert:_y,meshmatcap_frag:gy,meshnormal_vert:xy,meshnormal_frag:yy,meshphong_vert:My,meshphong_frag:Sy,meshphysical_vert:by,meshphysical_frag:Ey,meshtoon_vert:Ty,meshtoon_frag:wy,points_vert:Ay,points_frag:Ry,shadow_vert:Cy,shadow_frag:Py,sprite_vert:Ly,sprite_frag:Dy},It={common:{diffuse:{value:new ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new se}},envmap:{envMap:{value:null},envMapRotation:{value:new se},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new se}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new se}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new se},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new se},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new se},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new se}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new se}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new se}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0},uvTransform:{value:new se}},sprite:{diffuse:{value:new ve(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}}},gi={basic:{uniforms:yn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:yn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new ve(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:yn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new ve(0)},specular:{value:new ve(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:yn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:yn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new ve(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:yn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:yn([It.points,It.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:yn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:yn([It.common,It.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:yn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:yn([It.sprite,It.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new se},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new se}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:yn([It.common,It.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:yn([It.lights,It.fog,{color:{value:new ve(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};gi.physical={uniforms:yn([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new se},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new se},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new se},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new se},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new se},sheen:{value:0},sheenColor:{value:new ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new se},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new se},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new se},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new se},attenuationDistance:{value:0},attenuationColor:{value:new ve(0)},specularColor:{value:new ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new se},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new se},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new se}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};const Ao={r:0,b:0,g:0},wr=new Ai,Iy=new Ne;function Uy(n,t,e,i,r,s,a){const o=new ve(0);let l=s===!0?0:1,c,u,d=null,p=0,f=null;function v(T){let M=T.isScene===!0?T.background:null;return M&&M.isTexture&&(M=(T.backgroundBlurriness>0?e:t).get(M)),M}function _(T){let M=!1;const I=v(T);I===null?h(o,l):I&&I.isColor&&(h(I,1),M=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(T,M){const I=v(M);I&&(I.isCubeTexture||I.mapping===cl)?(u===void 0&&(u=new kn(new ia(1,1,1),new gr({name:"BackgroundCubeMaterial",uniforms:Js(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),wr.copy(M.backgroundRotation),wr.x*=-1,wr.y*=-1,wr.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(wr.y*=-1,wr.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Iy.makeRotationFromEuler(wr)),u.material.toneMapped=we.getTransfer(I.colorSpace)!==Ce,(d!==I||p!==I.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=I,p=I.version,f=n.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(c===void 0&&(c=new kn(new dl(2,2),new gr({name:"BackgroundMaterial",uniforms:Js(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:_r,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=I,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=we.getTransfer(I.colorSpace)!==Ce,I.matrixAutoUpdate===!0&&I.updateMatrix(),c.material.uniforms.uvTransform.value.copy(I.matrix),(d!==I||p!==I.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=I,p=I.version,f=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function h(T,M){T.getRGB(Ao,rp(n)),i.buffers.color.setClear(Ao.r,Ao.g,Ao.b,M,a)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(T,M=1){o.set(T),l=M,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,h(o,l)},render:_,addToRenderList:m,dispose:S}}function Ny(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=p(null);let s=r,a=!1;function o(g,U,k,N,A){let C=!1;const O=d(N,k,U);s!==O&&(s=O,c(s.object)),C=f(g,N,k,A),C&&v(g,N,k,A),A!==null&&t.update(A,n.ELEMENT_ARRAY_BUFFER),(C||a)&&(a=!1,M(g,U,k,N),A!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(A).buffer))}function l(){return n.createVertexArray()}function c(g){return n.bindVertexArray(g)}function u(g){return n.deleteVertexArray(g)}function d(g,U,k){const N=k.wireframe===!0;let A=i[g.id];A===void 0&&(A={},i[g.id]=A);let C=A[U.id];C===void 0&&(C={},A[U.id]=C);let O=C[N];return O===void 0&&(O=p(l()),C[N]=O),O}function p(g){const U=[],k=[],N=[];for(let A=0;A<e;A++)U[A]=0,k[A]=0,N[A]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:N,object:g,attributes:{},index:null}}function f(g,U,k,N){const A=s.attributes,C=U.attributes;let O=0;const z=k.getAttributes();for(const D in z)if(z[D].location>=0){const Z=A[D];let J=C[D];if(J===void 0&&(D==="instanceMatrix"&&g.instanceMatrix&&(J=g.instanceMatrix),D==="instanceColor"&&g.instanceColor&&(J=g.instanceColor)),Z===void 0||Z.attribute!==J||J&&Z.data!==J.data)return!0;O++}return s.attributesNum!==O||s.index!==N}function v(g,U,k,N){const A={},C=U.attributes;let O=0;const z=k.getAttributes();for(const D in z)if(z[D].location>=0){let Z=C[D];Z===void 0&&(D==="instanceMatrix"&&g.instanceMatrix&&(Z=g.instanceMatrix),D==="instanceColor"&&g.instanceColor&&(Z=g.instanceColor));const J={};J.attribute=Z,Z&&Z.data&&(J.data=Z.data),A[D]=J,O++}s.attributes=A,s.attributesNum=O,s.index=N}function _(){const g=s.newAttributes;for(let U=0,k=g.length;U<k;U++)g[U]=0}function m(g){h(g,0)}function h(g,U){const k=s.newAttributes,N=s.enabledAttributes,A=s.attributeDivisors;k[g]=1,N[g]===0&&(n.enableVertexAttribArray(g),N[g]=1),A[g]!==U&&(n.vertexAttribDivisor(g,U),A[g]=U)}function S(){const g=s.newAttributes,U=s.enabledAttributes;for(let k=0,N=U.length;k<N;k++)U[k]!==g[k]&&(n.disableVertexAttribArray(k),U[k]=0)}function T(g,U,k,N,A,C,O){O===!0?n.vertexAttribIPointer(g,U,k,A,C):n.vertexAttribPointer(g,U,k,N,A,C)}function M(g,U,k,N){_();const A=N.attributes,C=k.getAttributes(),O=U.defaultAttributeValues;for(const z in C){const D=C[z];if(D.location>=0){let X=A[z];if(X===void 0&&(z==="instanceMatrix"&&g.instanceMatrix&&(X=g.instanceMatrix),z==="instanceColor"&&g.instanceColor&&(X=g.instanceColor)),X!==void 0){const Z=X.normalized,J=X.itemSize,ft=t.get(X);if(ft===void 0)continue;const ut=ft.buffer,G=ft.type,nt=ft.bytesPerElement,pt=G===n.INT||G===n.UNSIGNED_INT||X.gpuType===Lu;if(X.isInterleavedBufferAttribute){const st=X.data,mt=st.stride,lt=X.offset;if(st.isInstancedInterleavedBuffer){for(let vt=0;vt<D.locationSize;vt++)h(D.location+vt,st.meshPerAttribute);g.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let vt=0;vt<D.locationSize;vt++)m(D.location+vt);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let vt=0;vt<D.locationSize;vt++)T(D.location+vt,J/D.locationSize,G,Z,mt*nt,(lt+J/D.locationSize*vt)*nt,pt)}else{if(X.isInstancedBufferAttribute){for(let st=0;st<D.locationSize;st++)h(D.location+st,X.meshPerAttribute);g.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let st=0;st<D.locationSize;st++)m(D.location+st);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let st=0;st<D.locationSize;st++)T(D.location+st,J/D.locationSize,G,Z,J*nt,J/D.locationSize*st*nt,pt)}}else if(O!==void 0){const Z=O[z];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(D.location,Z);break;case 3:n.vertexAttrib3fv(D.location,Z);break;case 4:n.vertexAttrib4fv(D.location,Z);break;default:n.vertexAttrib1fv(D.location,Z)}}}}S()}function I(){F();for(const g in i){const U=i[g];for(const k in U){const N=U[k];for(const A in N)u(N[A].object),delete N[A];delete U[k]}delete i[g]}}function R(g){if(i[g.id]===void 0)return;const U=i[g.id];for(const k in U){const N=U[k];for(const A in N)u(N[A].object),delete N[A];delete U[k]}delete i[g.id]}function P(g){for(const U in i){const k=i[U];if(k[g.id]===void 0)continue;const N=k[g.id];for(const A in N)u(N[A].object),delete N[A];delete k[g.id]}}function F(){b(),a=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:F,resetDefaultState:b,dispose:I,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Fy(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function a(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),e.update(u,i,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let v=0;v<d;v++)f+=u[v];e.update(f,i,1)}function l(c,u,d,p){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<c.length;v++)a(c[v],u[v],p[v]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,p,0,d);let v=0;for(let _=0;_<d;_++)v+=u[_]*p[_];e.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Oy(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==li&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const F=P===$a&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==ji&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Hi&&!F)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=v>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:f,maxVertexTextures:v,maxTextureSize:_,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:M,vertexTextures:I,maxSamples:R}}function By(n){const t=this;let e=null,i=0,r=!1,s=!1;const a=new ar,o=new se,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const f=d.length!==0||p||i!==0||r;return r=p,i=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,p){e=u(d,p,0)},this.setState=function(d,p,f){const v=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!r||v===null||v.length===0||s&&!m)s?u(null):c();else{const S=s?0:i,T=S*4;let M=h.clippingState||null;l.value=M,M=u(v,p,T,f);for(let I=0;I!==T;++I)M[I]=e[I];h.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,p,f,v){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,v!==!0||m===null){const h=f+_*4,S=p.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<h)&&(m=new Float32Array(h));for(let T=0,M=f;T!==_;++T,M+=4)a.copy(d[T]).applyMatrix4(S,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function ky(n){let t=new WeakMap;function e(a,o){return o===Uc?a.mapping=qs:o===Nc&&(a.mapping=js),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Uc||o===Nc)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new bg(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const As=4,Zd=[.125,.215,.35,.446,.526,.582],Dr=20,Kl=new vp,$d=new ve;let Jl=null,Ql=0,tc=0,ec=!1;const Cr=(1+Math.sqrt(5))/2,bs=1/Cr,Kd=[new H(-Cr,bs,0),new H(Cr,bs,0),new H(-bs,0,Cr),new H(bs,0,Cr),new H(0,Cr,-bs),new H(0,Cr,bs),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class Jd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Jl,Ql,tc),this._renderer.xr.enabled=ec,t.scissorTest=!1,Ro(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qs||t.mapping===js?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jl=this._renderer.getRenderTarget(),Ql=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Si,minFilter:Si,generateMipmaps:!1,type:$a,format:li,colorSpace:Ks,depthBuffer:!1},r=Qd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qd(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zy(s)),this._blurMaterial=Hy(s,t,e)}return r}_compileMaterial(t){const e=new kn(this._lodPlanes[0],t);this._renderer.compile(e,Kl)}_sceneToCubeUV(t,e,i,r){const o=new qn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor($d),u.toneMapping=mr,u.autoClear=!1;const f=new Ko({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),v=new kn(new ia,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy($d),_=!0);for(let h=0;h<6;h++){const S=h%3;S===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):S===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const T=this._cubeSize;Ro(r,S*T,h>2?T:0,T,T),u.setRenderTarget(r),_&&u.render(v,o),u.render(t,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===qs||t.mapping===js;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new kn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Ro(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Kl)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Kd[(r-s-1)%Kd.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new kn(this._lodPlanes[r],c),p=c.uniforms,f=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Dr-1),_=s/v,m=isFinite(s)?1+Math.floor(u*_):Dr;m>Dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Dr}`);const h=[];let S=0;for(let P=0;P<Dr;++P){const F=P/_,b=Math.exp(-F*F/2);h.push(b),P===0?S+=b:P<m&&(S+=2*b)}for(let P=0;P<h.length;P++)h[P]=h[P]/S;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=h,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:T}=this;p.dTheta.value=v,p.mipInt.value=T-i;const M=this._sizeLods[r],I=3*M*(r>T-As?r-T+As:0),R=4*(this._cubeSize-M);Ro(e,I,R,3*M,2*M),l.setRenderTarget(e),l.render(d,Kl)}}function zy(n){const t=[],e=[],i=[];let r=n;const s=n-As+1+Zd.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-As?l=Zd[a-n+As-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,p=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,v=6,_=3,m=2,h=1,S=new Float32Array(_*v*f),T=new Float32Array(m*v*f),M=new Float32Array(h*v*f);for(let R=0;R<f;R++){const P=R%3*2/3-1,F=R>2?0:-1,b=[P,F,0,P+2/3,F,0,P+2/3,F+1,0,P,F,0,P+2/3,F+1,0,P,F+1,0];S.set(b,_*v*R),T.set(p,m*v*R);const g=[R,R,R,R,R,R];M.set(g,h*v*R)}const I=new zn;I.setAttribute("position",new di(S,_)),I.setAttribute("uv",new di(T,m)),I.setAttribute("faceIndex",new di(M,h)),t.push(I),r>As&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Qd(n,t,e){const i=new Kr(n,t,e);return i.texture.mapping=cl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ro(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function Hy(n,t,e){const i=new Float32Array(Dr),r=new H(0,1,0);return new gr({name:"SphericalGaussianBlur",defines:{n:Dr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ju(),fragmentShader:`

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
		`,blending:pr,depthTest:!1,depthWrite:!1})}function th(){return new gr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ju(),fragmentShader:`

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
		`,blending:pr,depthTest:!1,depthWrite:!1})}function eh(){return new gr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function ju(){return`

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
	`}function Vy(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Uc||l===Nc,u=l===qs||l===js;if(c||u){let d=t.get(o);const p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new Jd(n)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&r(f)?(e===null&&(e=new Jd(n)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Gy(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Ts("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Wy(n,t,e,i){const r={},s=new WeakMap;function a(d){const p=d.target;p.index!==null&&t.remove(p.index);for(const v in p.attributes)t.remove(p.attributes[v]);p.removeEventListener("dispose",a),delete r[p.id];const f=s.get(p);f&&(t.remove(f),s.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(d,p){return r[p.id]===!0||(p.addEventListener("dispose",a),r[p.id]=!0,e.memory.geometries++),p}function l(d){const p=d.attributes;for(const f in p)t.update(p[f],n.ARRAY_BUFFER)}function c(d){const p=[],f=d.index,v=d.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let T=0,M=S.length;T<M;T+=3){const I=S[T+0],R=S[T+1],P=S[T+2];p.push(I,R,R,P,P,I)}}else if(v!==void 0){const S=v.array;_=v.version;for(let T=0,M=S.length/3-1;T<M;T+=3){const I=T+0,R=T+1,P=T+2;p.push(I,R,R,P,P,I)}}else return;const m=new(Jf(p)?ip:np)(p,1);m.version=_;const h=s.get(d);h&&t.remove(h),s.set(d,m)}function u(d){const p=s.get(d);if(p){const f=d.index;f!==null&&p.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Xy(n,t,e){let i;function r(p){i=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function l(p,f){n.drawElements(i,f,s,p*a),e.update(f,i,1)}function c(p,f,v){v!==0&&(n.drawElementsInstanced(i,f,s,p*a,v),e.update(f,i,v))}function u(p,f,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,p,0,v);let m=0;for(let h=0;h<v;h++)m+=f[h];e.update(m,i,1)}function d(p,f,v,_){if(v===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<p.length;h++)c(p[h]/a,f[h],_[h]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,p,0,_,0,v);let h=0;for(let S=0;S<v;S++)h+=f[S]*_[S];e.update(h,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Yy(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function qy(n,t,e){const i=new WeakMap,r=new Be;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let p=i.get(o);if(p===void 0||p.count!==d){let g=function(){F.dispose(),i.delete(o),o.removeEventListener("dispose",g)};var f=g;p!==void 0&&p.texture.dispose();const v=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let M=0;v===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let I=o.attributes.position.count*M,R=1;I>t.maxTextureSize&&(R=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const P=new Float32Array(I*R*4*d),F=new tp(P,I,R,d);F.type=Hi,F.needsUpdate=!0;const b=M*4;for(let U=0;U<d;U++){const k=h[U],N=S[U],A=T[U],C=I*R*4*U;for(let O=0;O<k.count;O++){const z=O*b;v===!0&&(r.fromBufferAttribute(k,O),P[C+z+0]=r.x,P[C+z+1]=r.y,P[C+z+2]=r.z,P[C+z+3]=0),_===!0&&(r.fromBufferAttribute(N,O),P[C+z+4]=r.x,P[C+z+5]=r.y,P[C+z+6]=r.z,P[C+z+7]=0),m===!0&&(r.fromBufferAttribute(A,O),P[C+z+8]=r.x,P[C+z+9]=r.y,P[C+z+10]=r.z,P[C+z+11]=A.itemSize===4?r.w:1)}}p={count:d,texture:F,size:new At(I,R)},i.set(o,p),o.addEventListener("dispose",g)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const _=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:s}}function jy(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=t.get(l,u);if(r.get(d)!==c&&(t.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}const gp=new bn,nh=new cp(1,1),xp=new tp,yp=new og,Mp=new ap,ih=[],rh=[],sh=new Float32Array(16),ah=new Float32Array(9),oh=new Float32Array(4);function ra(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=ih[r];if(s===void 0&&(s=new Float32Array(r),ih[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function Qe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function tn(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function hl(n,t){let e=rh[t];e===void 0&&(e=new Int32Array(t),rh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Zy(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function $y(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;n.uniform2fv(this.addr,t),tn(e,t)}}function Ky(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Qe(e,t))return;n.uniform3fv(this.addr,t),tn(e,t)}}function Jy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;n.uniform4fv(this.addr,t),tn(e,t)}}function Qy(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Qe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,i))return;oh.set(i),n.uniformMatrix2fv(this.addr,!1,oh),tn(e,i)}}function tM(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Qe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,i))return;ah.set(i),n.uniformMatrix3fv(this.addr,!1,ah),tn(e,i)}}function eM(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Qe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),tn(e,t)}else{if(Qe(e,i))return;sh.set(i),n.uniformMatrix4fv(this.addr,!1,sh),tn(e,i)}}function nM(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function iM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;n.uniform2iv(this.addr,t),tn(e,t)}}function rM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;n.uniform3iv(this.addr,t),tn(e,t)}}function sM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;n.uniform4iv(this.addr,t),tn(e,t)}}function aM(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function oM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;n.uniform2uiv(this.addr,t),tn(e,t)}}function lM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;n.uniform3uiv(this.addr,t),tn(e,t)}}function cM(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;n.uniform4uiv(this.addr,t),tn(e,t)}}function uM(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(nh.compareFunction=Kf,s=nh):s=gp,e.setTexture2D(t||s,r)}function dM(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||yp,r)}function hM(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Mp,r)}function fM(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||xp,r)}function pM(n){switch(n){case 5126:return Zy;case 35664:return $y;case 35665:return Ky;case 35666:return Jy;case 35674:return Qy;case 35675:return tM;case 35676:return eM;case 5124:case 35670:return nM;case 35667:case 35671:return iM;case 35668:case 35672:return rM;case 35669:case 35673:return sM;case 5125:return aM;case 36294:return oM;case 36295:return lM;case 36296:return cM;case 35678:case 36198:case 36298:case 36306:case 35682:return uM;case 35679:case 36299:case 36307:return dM;case 35680:case 36300:case 36308:case 36293:return hM;case 36289:case 36303:case 36311:case 36292:return fM}}function mM(n,t){n.uniform1fv(this.addr,t)}function vM(n,t){const e=ra(t,this.size,2);n.uniform2fv(this.addr,e)}function _M(n,t){const e=ra(t,this.size,3);n.uniform3fv(this.addr,e)}function gM(n,t){const e=ra(t,this.size,4);n.uniform4fv(this.addr,e)}function xM(n,t){const e=ra(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function yM(n,t){const e=ra(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function MM(n,t){const e=ra(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function SM(n,t){n.uniform1iv(this.addr,t)}function bM(n,t){n.uniform2iv(this.addr,t)}function EM(n,t){n.uniform3iv(this.addr,t)}function TM(n,t){n.uniform4iv(this.addr,t)}function wM(n,t){n.uniform1uiv(this.addr,t)}function AM(n,t){n.uniform2uiv(this.addr,t)}function RM(n,t){n.uniform3uiv(this.addr,t)}function CM(n,t){n.uniform4uiv(this.addr,t)}function PM(n,t,e){const i=this.cache,r=t.length,s=hl(e,r);Qe(i,s)||(n.uniform1iv(this.addr,s),tn(i,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||gp,s[a])}function LM(n,t,e){const i=this.cache,r=t.length,s=hl(e,r);Qe(i,s)||(n.uniform1iv(this.addr,s),tn(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||yp,s[a])}function DM(n,t,e){const i=this.cache,r=t.length,s=hl(e,r);Qe(i,s)||(n.uniform1iv(this.addr,s),tn(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Mp,s[a])}function IM(n,t,e){const i=this.cache,r=t.length,s=hl(e,r);Qe(i,s)||(n.uniform1iv(this.addr,s),tn(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||xp,s[a])}function UM(n){switch(n){case 5126:return mM;case 35664:return vM;case 35665:return _M;case 35666:return gM;case 35674:return xM;case 35675:return yM;case 35676:return MM;case 5124:case 35670:return SM;case 35667:case 35671:return bM;case 35668:case 35672:return EM;case 35669:case 35673:return TM;case 5125:return wM;case 36294:return AM;case 36295:return RM;case 36296:return CM;case 35678:case 36198:case 36298:case 36306:case 35682:return PM;case 35679:case 36299:case 36307:return LM;case 35680:case 36300:case 36308:case 36293:return DM;case 36289:case 36303:case 36311:case 36292:return IM}}class NM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=pM(e.type)}}class FM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=UM(e.type)}}class OM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],i)}}}const nc=/(\w+)(\])?(\[|\.)?/g;function lh(n,t){n.seq.push(t),n.map[t.id]=t}function BM(n,t,e){const i=n.name,r=i.length;for(nc.lastIndex=0;;){const s=nc.exec(i),a=nc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){lh(e,c===void 0?new NM(o,n,t):new FM(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new OM(o),lh(e,d)),e=d}}}class zo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);BM(s,a,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&i.push(a)}return i}}function ch(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const kM=37297;let zM=0;function HM(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const uh=new se;function VM(n){we._getMatrix(uh,we.workingColorSpace,n);const t=`mat3( ${uh.elements.map(e=>e.toFixed(4))} )`;switch(we.getTransfer(n)){case jo:return[t,"LinearTransferOETF"];case Ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function dh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+HM(n.getShaderSource(t),a)}else return r}function GM(n,t){const e=VM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function WM(n,t){let e;switch(t){case g_:e="Linear";break;case x_:e="Reinhard";break;case y_:e="Cineon";break;case M_:e="ACESFilmic";break;case b_:e="AgX";break;case E_:e="Neutral";break;case S_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Co=new H;function XM(){we.getLuminanceCoefficients(Co);const n=Co.x.toFixed(4),t=Co.y.toFixed(4),e=Co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function YM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ba).join(`
`)}function qM(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function jM(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ba(n){return n!==""}function hh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ZM=/^[ \t]*#include +<([\w\d./]+)>/gm;function hu(n){return n.replace(ZM,KM)}const $M=new Map;function KM(n,t){let e=ce[t];if(e===void 0){const i=$M.get(t);if(i!==void 0)e=ce[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return hu(e)}const JM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ph(n){return n.replace(JM,QM)}function QM(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function mh(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function tS(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Of?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Kv?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Oi&&(t="SHADOWMAP_TYPE_VSM"),t}function eS(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case qs:case js:t="ENVMAP_TYPE_CUBE";break;case cl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function nS(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case js:t="ENVMAP_MODE_REFRACTION";break}return t}function iS(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Bf:t="ENVMAP_BLENDING_MULTIPLY";break;case v_:t="ENVMAP_BLENDING_MIX";break;case __:t="ENVMAP_BLENDING_ADD";break}return t}function rS(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function sS(n,t,e,i){const r=n.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=tS(e),c=eS(e),u=nS(e),d=iS(e),p=rS(e),f=YM(e),v=qM(s),_=r.createProgram();let m,h,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ba).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ba).join(`
`),h.length>0&&(h+=`
`)):(m=[mh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ba).join(`
`),h=[mh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==mr?"#define TONE_MAPPING":"",e.toneMapping!==mr?ce.tonemapping_pars_fragment:"",e.toneMapping!==mr?WM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,GM("linearToOutputTexel",e.outputColorSpace),XM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ba).join(`
`)),a=hu(a),a=hh(a,e),a=fh(a,e),o=hu(o),o=hh(o,e),o=fh(o,e),a=ph(a),o=ph(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===xd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const T=S+m+a,M=S+h+o,I=ch(r,r.VERTEX_SHADER,T),R=ch(r,r.FRAGMENT_SHADER,M);r.attachShader(_,I),r.attachShader(_,R),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function P(U){if(n.debug.checkShaderErrors){const k=r.getProgramInfoLog(_).trim(),N=r.getShaderInfoLog(I).trim(),A=r.getShaderInfoLog(R).trim();let C=!0,O=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(C=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,I,R);else{const z=dh(r,I,"vertex"),D=dh(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+k+`
`+z+`
`+D)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(N===""||A==="")&&(O=!1);O&&(U.diagnostics={runnable:C,programLog:k,vertexShader:{log:N,prefix:m},fragmentShader:{log:A,prefix:h}})}r.deleteShader(I),r.deleteShader(R),F=new zo(r,_),b=jM(r,_)}let F;this.getUniforms=function(){return F===void 0&&P(this),F};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=r.getProgramParameter(_,kM)),g},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=zM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=R,this}let aS=0;class oS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new lS(t),e.set(t,i)),i}}class lS{constructor(t){this.id=aS++,this.code=t,this.usedTimes=0}}function cS(n,t,e,i,r,s,a){const o=new zu,l=new oS,c=new Set,u=[],d=r.logarithmicDepthBuffer,p=r.vertexTextures;let f=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,g,U,k,N){const A=k.fog,C=N.geometry,O=b.isMeshStandardMaterial?k.environment:null,z=(b.isMeshStandardMaterial?e:t).get(b.envMap||O),D=z&&z.mapping===cl?z.image.height:null,X=v[b.type];b.precision!==null&&(f=r.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const Z=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,J=Z!==void 0?Z.length:0;let ft=0;C.morphAttributes.position!==void 0&&(ft=1),C.morphAttributes.normal!==void 0&&(ft=2),C.morphAttributes.color!==void 0&&(ft=3);let ut,G,nt,pt;if(X){const be=gi[X];ut=be.vertexShader,G=be.fragmentShader}else ut=b.vertexShader,G=b.fragmentShader,l.update(b),nt=l.getVertexShaderID(b),pt=l.getFragmentShaderID(b);const st=n.getRenderTarget(),mt=n.state.buffers.depth.getReversed(),lt=N.isInstancedMesh===!0,vt=N.isBatchedMesh===!0,wt=!!b.map,xt=!!b.matcap,Zt=!!z,B=!!b.aoMap,de=!!b.lightMap,Pt=!!b.bumpMap,Gt=!!b.normalMap,Ut=!!b.displacementMap,ue=!!b.emissiveMap,it=!!b.metalnessMap,w=!!b.roughnessMap,y=b.anisotropy>0,q=b.clearcoat>0,rt=b.dispersion>0,ct=b.iridescence>0,ot=b.sheen>0,Ht=b.transmission>0,Et=y&&!!b.anisotropyMap,Dt=q&&!!b.clearcoatMap,Jt=q&&!!b.clearcoatNormalMap,_t=q&&!!b.clearcoatRoughnessMap,Nt=ct&&!!b.iridescenceMap,Wt=ct&&!!b.iridescenceThicknessMap,Yt=ot&&!!b.sheenColorMap,Ot=ot&&!!b.sheenRoughnessMap,le=!!b.specularMap,te=!!b.specularColorMap,xe=!!b.specularIntensityMap,V=Ht&&!!b.transmissionMap,bt=Ht&&!!b.thicknessMap,et=!!b.gradientMap,tt=!!b.alphaMap,Mt=b.alphaTest>0,Tt=!!b.alphaHash,Qt=!!b.extensions;let Le=mr;b.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Le=n.toneMapping);const Ge={shaderID:X,shaderType:b.type,shaderName:b.name,vertexShader:ut,fragmentShader:G,defines:b.defines,customVertexShaderID:nt,customFragmentShaderID:pt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:vt,batchingColor:vt&&N._colorsTexture!==null,instancing:lt,instancingColor:lt&&N.instanceColor!==null,instancingMorph:lt&&N.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:st===null?n.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Ks,alphaToCoverage:!!b.alphaToCoverage,map:wt,matcap:xt,envMap:Zt,envMapMode:Zt&&z.mapping,envMapCubeUVHeight:D,aoMap:B,lightMap:de,bumpMap:Pt,normalMap:Gt,displacementMap:p&&Ut,emissiveMap:ue,normalMapObjectSpace:Gt&&b.normalMapType===R_,normalMapTangentSpace:Gt&&b.normalMapType===$f,metalnessMap:it,roughnessMap:w,anisotropy:y,anisotropyMap:Et,clearcoat:q,clearcoatMap:Dt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:_t,dispersion:rt,iridescence:ct,iridescenceMap:Nt,iridescenceThicknessMap:Wt,sheen:ot,sheenColorMap:Yt,sheenRoughnessMap:Ot,specularMap:le,specularColorMap:te,specularIntensityMap:xe,transmission:Ht,transmissionMap:V,thicknessMap:bt,gradientMap:et,opaque:b.transparent===!1&&b.blending===Ds&&b.alphaToCoverage===!1,alphaMap:tt,alphaTest:Mt,alphaHash:Tt,combine:b.combine,mapUv:wt&&_(b.map.channel),aoMapUv:B&&_(b.aoMap.channel),lightMapUv:de&&_(b.lightMap.channel),bumpMapUv:Pt&&_(b.bumpMap.channel),normalMapUv:Gt&&_(b.normalMap.channel),displacementMapUv:Ut&&_(b.displacementMap.channel),emissiveMapUv:ue&&_(b.emissiveMap.channel),metalnessMapUv:it&&_(b.metalnessMap.channel),roughnessMapUv:w&&_(b.roughnessMap.channel),anisotropyMapUv:Et&&_(b.anisotropyMap.channel),clearcoatMapUv:Dt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Wt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&_(b.sheenRoughnessMap.channel),specularMapUv:le&&_(b.specularMap.channel),specularColorMapUv:te&&_(b.specularColorMap.channel),specularIntensityMapUv:xe&&_(b.specularIntensityMap.channel),transmissionMapUv:V&&_(b.transmissionMap.channel),thicknessMapUv:bt&&_(b.thicknessMap.channel),alphaMapUv:tt&&_(b.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(Gt||y),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!C.attributes.uv&&(wt||tt),fog:!!A,useFog:b.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:mt,skinning:N.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ft,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:Le,decodeVideoTexture:wt&&b.map.isVideoTexture===!0&&we.getTransfer(b.map.colorSpace)===Ce,decodeVideoTextureEmissive:ue&&b.emissiveMap.isVideoTexture===!0&&we.getTransfer(b.emissiveMap.colorSpace)===Ce,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ri,flipSided:b.side===Pn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Qt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qt&&b.extensions.multiDraw===!0||vt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ge.vertexUv1s=c.has(1),Ge.vertexUv2s=c.has(2),Ge.vertexUv3s=c.has(3),c.clear(),Ge}function h(b){const g=[];if(b.shaderID?g.push(b.shaderID):(g.push(b.customVertexShaderID),g.push(b.customFragmentShaderID)),b.defines!==void 0)for(const U in b.defines)g.push(U),g.push(b.defines[U]);return b.isRawShaderMaterial===!1&&(S(g,b),T(g,b),g.push(n.outputColorSpace)),g.push(b.customProgramCacheKey),g.join()}function S(b,g){b.push(g.precision),b.push(g.outputColorSpace),b.push(g.envMapMode),b.push(g.envMapCubeUVHeight),b.push(g.mapUv),b.push(g.alphaMapUv),b.push(g.lightMapUv),b.push(g.aoMapUv),b.push(g.bumpMapUv),b.push(g.normalMapUv),b.push(g.displacementMapUv),b.push(g.emissiveMapUv),b.push(g.metalnessMapUv),b.push(g.roughnessMapUv),b.push(g.anisotropyMapUv),b.push(g.clearcoatMapUv),b.push(g.clearcoatNormalMapUv),b.push(g.clearcoatRoughnessMapUv),b.push(g.iridescenceMapUv),b.push(g.iridescenceThicknessMapUv),b.push(g.sheenColorMapUv),b.push(g.sheenRoughnessMapUv),b.push(g.specularMapUv),b.push(g.specularColorMapUv),b.push(g.specularIntensityMapUv),b.push(g.transmissionMapUv),b.push(g.thicknessMapUv),b.push(g.combine),b.push(g.fogExp2),b.push(g.sizeAttenuation),b.push(g.morphTargetsCount),b.push(g.morphAttributeCount),b.push(g.numDirLights),b.push(g.numPointLights),b.push(g.numSpotLights),b.push(g.numSpotLightMaps),b.push(g.numHemiLights),b.push(g.numRectAreaLights),b.push(g.numDirLightShadows),b.push(g.numPointLightShadows),b.push(g.numSpotLightShadows),b.push(g.numSpotLightShadowsWithMaps),b.push(g.numLightProbes),b.push(g.shadowMapType),b.push(g.toneMapping),b.push(g.numClippingPlanes),b.push(g.numClipIntersection),b.push(g.depthPacking)}function T(b,g){o.disableAll(),g.supportsVertexTextures&&o.enable(0),g.instancing&&o.enable(1),g.instancingColor&&o.enable(2),g.instancingMorph&&o.enable(3),g.matcap&&o.enable(4),g.envMap&&o.enable(5),g.normalMapObjectSpace&&o.enable(6),g.normalMapTangentSpace&&o.enable(7),g.clearcoat&&o.enable(8),g.iridescence&&o.enable(9),g.alphaTest&&o.enable(10),g.vertexColors&&o.enable(11),g.vertexAlphas&&o.enable(12),g.vertexUv1s&&o.enable(13),g.vertexUv2s&&o.enable(14),g.vertexUv3s&&o.enable(15),g.vertexTangents&&o.enable(16),g.anisotropy&&o.enable(17),g.alphaHash&&o.enable(18),g.batching&&o.enable(19),g.dispersion&&o.enable(20),g.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),g.fog&&o.enable(0),g.useFog&&o.enable(1),g.flatShading&&o.enable(2),g.logarithmicDepthBuffer&&o.enable(3),g.reverseDepthBuffer&&o.enable(4),g.skinning&&o.enable(5),g.morphTargets&&o.enable(6),g.morphNormals&&o.enable(7),g.morphColors&&o.enable(8),g.premultipliedAlpha&&o.enable(9),g.shadowMapEnabled&&o.enable(10),g.doubleSided&&o.enable(11),g.flipSided&&o.enable(12),g.useDepthPacking&&o.enable(13),g.dithering&&o.enable(14),g.transmission&&o.enable(15),g.sheen&&o.enable(16),g.opaque&&o.enable(17),g.pointsUvs&&o.enable(18),g.decodeVideoTexture&&o.enable(19),g.decodeVideoTextureEmissive&&o.enable(20),g.alphaToCoverage&&o.enable(21),b.push(o.mask)}function M(b){const g=v[b.type];let U;if(g){const k=gi[g];U=xg.clone(k.uniforms)}else U=b.uniforms;return U}function I(b,g){let U;for(let k=0,N=u.length;k<N;k++){const A=u[k];if(A.cacheKey===g){U=A,++U.usedTimes;break}}return U===void 0&&(U=new sS(n,g,b,s),u.push(U)),U}function R(b){if(--b.usedTimes===0){const g=u.indexOf(b);u[g]=u[u.length-1],u.pop(),b.destroy()}}function P(b){l.remove(b)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:M,acquireProgram:I,releaseProgram:R,releaseShaderCache:P,programs:u,dispose:F}}function uS(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function dS(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function vh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function _h(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(d,p,f,v,_,m){let h=n[t];return h===void 0?(h={id:d.id,object:d,geometry:p,material:f,groupOrder:v,renderOrder:d.renderOrder,z:_,group:m},n[t]=h):(h.id=d.id,h.object=d,h.geometry=p,h.material=f,h.groupOrder=v,h.renderOrder=d.renderOrder,h.z=_,h.group=m),t++,h}function o(d,p,f,v,_,m){const h=a(d,p,f,v,_,m);f.transmission>0?i.push(h):f.transparent===!0?r.push(h):e.push(h)}function l(d,p,f,v,_,m){const h=a(d,p,f,v,_,m);f.transmission>0?i.unshift(h):f.transparent===!0?r.unshift(h):e.unshift(h)}function c(d,p){e.length>1&&e.sort(d||dS),i.length>1&&i.sort(p||vh),r.length>1&&r.sort(p||vh)}function u(){for(let d=t,p=n.length;d<p;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function hS(){let n=new WeakMap;function t(i,r){const s=n.get(i);let a;return s===void 0?(a=new _h,n.set(i,[a])):r>=s.length?(a=new _h,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function fS(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new ve};break;case"SpotLight":e={position:new H,direction:new H,color:new ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ve,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ve,groundColor:new ve};break;case"RectAreaLight":e={color:new ve,position:new H,halfWidth:new H,halfHeight:new H};break}return n[t.id]=e,e}}}function pS(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let mS=0;function vS(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function _S(n){const t=new fS,e=pS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);const r=new H,s=new Ne,a=new Ne;function o(c){let u=0,d=0,p=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,v=0,_=0,m=0,h=0,S=0,T=0,M=0,I=0,R=0,P=0;c.sort(vS);for(let b=0,g=c.length;b<g;b++){const U=c[b],k=U.color,N=U.intensity,A=U.distance,C=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=k.r*N,d+=k.g*N,p+=k.b*N;else if(U.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(U.sh.coefficients[O],N);P++}else if(U.isDirectionalLight){const O=t.get(U);if(O.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const z=U.shadow,D=e.get(U);D.shadowIntensity=z.intensity,D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,i.directionalShadow[f]=D,i.directionalShadowMap[f]=C,i.directionalShadowMatrix[f]=U.shadow.matrix,S++}i.directional[f]=O,f++}else if(U.isSpotLight){const O=t.get(U);O.position.setFromMatrixPosition(U.matrixWorld),O.color.copy(k).multiplyScalar(N),O.distance=A,O.coneCos=Math.cos(U.angle),O.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),O.decay=U.decay,i.spot[_]=O;const z=U.shadow;if(U.map&&(i.spotLightMap[I]=U.map,I++,z.updateMatrices(U),U.castShadow&&R++),i.spotLightMatrix[_]=z.matrix,U.castShadow){const D=e.get(U);D.shadowIntensity=z.intensity,D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,i.spotShadow[_]=D,i.spotShadowMap[_]=C,M++}_++}else if(U.isRectAreaLight){const O=t.get(U);O.color.copy(k).multiplyScalar(N),O.halfWidth.set(U.width*.5,0,0),O.halfHeight.set(0,U.height*.5,0),i.rectArea[m]=O,m++}else if(U.isPointLight){const O=t.get(U);if(O.color.copy(U.color).multiplyScalar(U.intensity),O.distance=U.distance,O.decay=U.decay,U.castShadow){const z=U.shadow,D=e.get(U);D.shadowIntensity=z.intensity,D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,D.shadowCameraNear=z.camera.near,D.shadowCameraFar=z.camera.far,i.pointShadow[v]=D,i.pointShadowMap[v]=C,i.pointShadowMatrix[v]=U.shadow.matrix,T++}i.point[v]=O,v++}else if(U.isHemisphereLight){const O=t.get(U);O.skyColor.copy(U.color).multiplyScalar(N),O.groundColor.copy(U.groundColor).multiplyScalar(N),i.hemi[h]=O,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=It.LTC_FLOAT_1,i.rectAreaLTC2=It.LTC_FLOAT_2):(i.rectAreaLTC1=It.LTC_HALF_1,i.rectAreaLTC2=It.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=p;const F=i.hash;(F.directionalLength!==f||F.pointLength!==v||F.spotLength!==_||F.rectAreaLength!==m||F.hemiLength!==h||F.numDirectionalShadows!==S||F.numPointShadows!==T||F.numSpotShadows!==M||F.numSpotMaps!==I||F.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=v,i.hemi.length=h,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=M+I-R,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,F.directionalLength=f,F.pointLength=v,F.spotLength=_,F.rectAreaLength=m,F.hemiLength=h,F.numDirectionalShadows=S,F.numPointShadows=T,F.numSpotShadows=M,F.numSpotMaps=I,F.numLightProbes=P,i.version=mS++)}function l(c,u){let d=0,p=0,f=0,v=0,_=0;const m=u.matrixWorldInverse;for(let h=0,S=c.length;h<S;h++){const T=c[h];if(T.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),d++}else if(T.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),f++}else if(T.isRectAreaLight){const M=i.rectArea[v];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(T.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),v++}else if(T.isPointLight){const M=i.point[p];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),p++}else if(T.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function gh(n){const t=new _S(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function a(u){i.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function gS(n){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new gh(n),t.set(r,[o])):s>=a.length?(o=new gh(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const xS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yS=`uniform sampler2D shadow_pass;
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
}`;function MS(n,t,e){let i=new Hu;const r=new At,s=new At,a=new Be,o=new Wg({depthPacking:A_}),l=new Xg,c={},u=e.maxTextureSize,d={[_r]:Pn,[Pn]:_r,[ri]:ri},p=new gr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:xS,fragmentShader:yS}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const v=new zn;v.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new kn(v,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Of;let h=this.type;this.render=function(R,P,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const b=n.getRenderTarget(),g=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),k=n.state;k.setBlending(pr),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const N=h!==Oi&&this.type===Oi,A=h===Oi&&this.type!==Oi;for(let C=0,O=R.length;C<O;C++){const z=R[C],D=z.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const X=D.getFrameExtents();if(r.multiply(X),s.copy(D.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/X.x),r.x=s.x*X.x,D.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/X.y),r.y=s.y*X.y,D.mapSize.y=s.y)),D.map===null||N===!0||A===!0){const J=this.type!==Oi?{minFilter:ui,magFilter:ui}:{};D.map!==null&&D.map.dispose(),D.map=new Kr(r.x,r.y,J),D.map.texture.name=z.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();const Z=D.getViewportCount();for(let J=0;J<Z;J++){const ft=D.getViewport(J);a.set(s.x*ft.x,s.y*ft.y,s.x*ft.z,s.y*ft.w),k.viewport(a),D.updateMatrices(z,J),i=D.getFrustum(),M(P,F,D.camera,z,this.type)}D.isPointLightShadow!==!0&&this.type===Oi&&S(D,F),D.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(b,g,U)};function S(R,P){const F=t.update(_);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Kr(r.x,r.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,F,p,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,F,f,_,null)}function T(R,P,F,b){let g=null;const U=F.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)g=U;else if(g=F.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const k=g.uuid,N=P.uuid;let A=c[k];A===void 0&&(A={},c[k]=A);let C=A[N];C===void 0&&(C=g.clone(),A[N]=C,P.addEventListener("dispose",I)),g=C}if(g.visible=P.visible,g.wireframe=P.wireframe,b===Oi?g.side=P.shadowSide!==null?P.shadowSide:P.side:g.side=P.shadowSide!==null?P.shadowSide:d[P.side],g.alphaMap=P.alphaMap,g.alphaTest=P.alphaTest,g.map=P.map,g.clipShadows=P.clipShadows,g.clippingPlanes=P.clippingPlanes,g.clipIntersection=P.clipIntersection,g.displacementMap=P.displacementMap,g.displacementScale=P.displacementScale,g.displacementBias=P.displacementBias,g.wireframeLinewidth=P.wireframeLinewidth,g.linewidth=P.linewidth,F.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const k=n.properties.get(g);k.light=F}return g}function M(R,P,F,b,g){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&g===Oi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,R.matrixWorld);const N=t.update(R),A=R.material;if(Array.isArray(A)){const C=N.groups;for(let O=0,z=C.length;O<z;O++){const D=C[O],X=A[D.materialIndex];if(X&&X.visible){const Z=T(R,X,b,g);R.onBeforeShadow(n,R,P,F,N,Z,D),n.renderBufferDirect(F,null,N,Z,R,D),R.onAfterShadow(n,R,P,F,N,Z,D)}}}else if(A.visible){const C=T(R,A,b,g);R.onBeforeShadow(n,R,P,F,N,C,null),n.renderBufferDirect(F,null,N,C,R,null),R.onAfterShadow(n,R,P,F,N,C,null)}}const k=R.children;for(let N=0,A=k.length;N<A;N++)M(k[N],P,F,b,g)}function I(R){R.target.removeEventListener("dispose",I);for(const F in c){const b=c[F],g=R.target.uuid;g in b&&(b[g].dispose(),delete b[g])}}}const SS={[Ac]:Rc,[Cc]:Dc,[Pc]:Ic,[Ys]:Lc,[Rc]:Ac,[Dc]:Cc,[Ic]:Pc,[Lc]:Ys};function bS(n,t){function e(){let V=!1;const bt=new Be;let et=null;const tt=new Be(0,0,0,0);return{setMask:function(Mt){et!==Mt&&!V&&(n.colorMask(Mt,Mt,Mt,Mt),et=Mt)},setLocked:function(Mt){V=Mt},setClear:function(Mt,Tt,Qt,Le,Ge){Ge===!0&&(Mt*=Le,Tt*=Le,Qt*=Le),bt.set(Mt,Tt,Qt,Le),tt.equals(bt)===!1&&(n.clearColor(Mt,Tt,Qt,Le),tt.copy(bt))},reset:function(){V=!1,et=null,tt.set(-1,0,0,0)}}}function i(){let V=!1,bt=!1,et=null,tt=null,Mt=null;return{setReversed:function(Tt){if(bt!==Tt){const Qt=t.get("EXT_clip_control");bt?Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.ZERO_TO_ONE_EXT):Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.NEGATIVE_ONE_TO_ONE_EXT);const Le=Mt;Mt=null,this.setClear(Le)}bt=Tt},getReversed:function(){return bt},setTest:function(Tt){Tt?st(n.DEPTH_TEST):mt(n.DEPTH_TEST)},setMask:function(Tt){et!==Tt&&!V&&(n.depthMask(Tt),et=Tt)},setFunc:function(Tt){if(bt&&(Tt=SS[Tt]),tt!==Tt){switch(Tt){case Ac:n.depthFunc(n.NEVER);break;case Rc:n.depthFunc(n.ALWAYS);break;case Cc:n.depthFunc(n.LESS);break;case Ys:n.depthFunc(n.LEQUAL);break;case Pc:n.depthFunc(n.EQUAL);break;case Lc:n.depthFunc(n.GEQUAL);break;case Dc:n.depthFunc(n.GREATER);break;case Ic:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}tt=Tt}},setLocked:function(Tt){V=Tt},setClear:function(Tt){Mt!==Tt&&(bt&&(Tt=1-Tt),n.clearDepth(Tt),Mt=Tt)},reset:function(){V=!1,et=null,tt=null,Mt=null,bt=!1}}}function r(){let V=!1,bt=null,et=null,tt=null,Mt=null,Tt=null,Qt=null,Le=null,Ge=null;return{setTest:function(be){V||(be?st(n.STENCIL_TEST):mt(n.STENCIL_TEST))},setMask:function(be){bt!==be&&!V&&(n.stencilMask(be),bt=be)},setFunc:function(be,_n,Hn){(et!==be||tt!==_n||Mt!==Hn)&&(n.stencilFunc(be,_n,Hn),et=be,tt=_n,Mt=Hn)},setOp:function(be,_n,Hn){(Tt!==be||Qt!==_n||Le!==Hn)&&(n.stencilOp(be,_n,Hn),Tt=be,Qt=_n,Le=Hn)},setLocked:function(be){V=be},setClear:function(be){Ge!==be&&(n.clearStencil(be),Ge=be)},reset:function(){V=!1,bt=null,et=null,tt=null,Mt=null,Tt=null,Qt=null,Le=null,Ge=null}}}const s=new e,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},d={},p=new WeakMap,f=[],v=null,_=!1,m=null,h=null,S=null,T=null,M=null,I=null,R=null,P=new ve(0,0,0),F=0,b=!1,g=null,U=null,k=null,N=null,A=null;const C=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,z=0;const D=n.getParameter(n.VERSION);D.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(D)[1]),O=z>=1):D.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),O=z>=2);let X=null,Z={};const J=n.getParameter(n.SCISSOR_BOX),ft=n.getParameter(n.VIEWPORT),ut=new Be().fromArray(J),G=new Be().fromArray(ft);function nt(V,bt,et,tt){const Mt=new Uint8Array(4),Tt=n.createTexture();n.bindTexture(V,Tt),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Qt=0;Qt<et;Qt++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(bt,0,n.RGBA,1,1,tt,0,n.RGBA,n.UNSIGNED_BYTE,Mt):n.texImage2D(bt+Qt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Mt);return Tt}const pt={};pt[n.TEXTURE_2D]=nt(n.TEXTURE_2D,n.TEXTURE_2D,1),pt[n.TEXTURE_CUBE_MAP]=nt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[n.TEXTURE_2D_ARRAY]=nt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),pt[n.TEXTURE_3D]=nt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),st(n.DEPTH_TEST),a.setFunc(Ys),Pt(!1),Gt(pd),st(n.CULL_FACE),B(pr);function st(V){u[V]!==!0&&(n.enable(V),u[V]=!0)}function mt(V){u[V]!==!1&&(n.disable(V),u[V]=!1)}function lt(V,bt){return d[V]!==bt?(n.bindFramebuffer(V,bt),d[V]=bt,V===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=bt),V===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=bt),!0):!1}function vt(V,bt){let et=f,tt=!1;if(V){et=p.get(bt),et===void 0&&(et=[],p.set(bt,et));const Mt=V.textures;if(et.length!==Mt.length||et[0]!==n.COLOR_ATTACHMENT0){for(let Tt=0,Qt=Mt.length;Tt<Qt;Tt++)et[Tt]=n.COLOR_ATTACHMENT0+Tt;et.length=Mt.length,tt=!0}}else et[0]!==n.BACK&&(et[0]=n.BACK,tt=!0);tt&&n.drawBuffers(et)}function wt(V){return v!==V?(n.useProgram(V),v=V,!0):!1}const xt={[Lr]:n.FUNC_ADD,[Qv]:n.FUNC_SUBTRACT,[t_]:n.FUNC_REVERSE_SUBTRACT};xt[e_]=n.MIN,xt[n_]=n.MAX;const Zt={[i_]:n.ZERO,[r_]:n.ONE,[s_]:n.SRC_COLOR,[Tc]:n.SRC_ALPHA,[d_]:n.SRC_ALPHA_SATURATE,[c_]:n.DST_COLOR,[o_]:n.DST_ALPHA,[a_]:n.ONE_MINUS_SRC_COLOR,[wc]:n.ONE_MINUS_SRC_ALPHA,[u_]:n.ONE_MINUS_DST_COLOR,[l_]:n.ONE_MINUS_DST_ALPHA,[h_]:n.CONSTANT_COLOR,[f_]:n.ONE_MINUS_CONSTANT_COLOR,[p_]:n.CONSTANT_ALPHA,[m_]:n.ONE_MINUS_CONSTANT_ALPHA};function B(V,bt,et,tt,Mt,Tt,Qt,Le,Ge,be){if(V===pr){_===!0&&(mt(n.BLEND),_=!1);return}if(_===!1&&(st(n.BLEND),_=!0),V!==Jv){if(V!==m||be!==b){if((h!==Lr||M!==Lr)&&(n.blendEquation(n.FUNC_ADD),h=Lr,M=Lr),be)switch(V){case Ds:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case md:n.blendFunc(n.ONE,n.ONE);break;case vd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _d:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Ds:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case md:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case vd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _d:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}S=null,T=null,I=null,R=null,P.set(0,0,0),F=0,m=V,b=be}return}Mt=Mt||bt,Tt=Tt||et,Qt=Qt||tt,(bt!==h||Mt!==M)&&(n.blendEquationSeparate(xt[bt],xt[Mt]),h=bt,M=Mt),(et!==S||tt!==T||Tt!==I||Qt!==R)&&(n.blendFuncSeparate(Zt[et],Zt[tt],Zt[Tt],Zt[Qt]),S=et,T=tt,I=Tt,R=Qt),(Le.equals(P)===!1||Ge!==F)&&(n.blendColor(Le.r,Le.g,Le.b,Ge),P.copy(Le),F=Ge),m=V,b=!1}function de(V,bt){V.side===ri?mt(n.CULL_FACE):st(n.CULL_FACE);let et=V.side===Pn;bt&&(et=!et),Pt(et),V.blending===Ds&&V.transparent===!1?B(pr):B(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),s.setMask(V.colorWrite);const tt=V.stencilWrite;o.setTest(tt),tt&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),ue(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?st(n.SAMPLE_ALPHA_TO_COVERAGE):mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pt(V){g!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),g=V)}function Gt(V){V!==Zv?(st(n.CULL_FACE),V!==U&&(V===pd?n.cullFace(n.BACK):V===$v?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):mt(n.CULL_FACE),U=V}function Ut(V){V!==k&&(O&&n.lineWidth(V),k=V)}function ue(V,bt,et){V?(st(n.POLYGON_OFFSET_FILL),(N!==bt||A!==et)&&(n.polygonOffset(bt,et),N=bt,A=et)):mt(n.POLYGON_OFFSET_FILL)}function it(V){V?st(n.SCISSOR_TEST):mt(n.SCISSOR_TEST)}function w(V){V===void 0&&(V=n.TEXTURE0+C-1),X!==V&&(n.activeTexture(V),X=V)}function y(V,bt,et){et===void 0&&(X===null?et=n.TEXTURE0+C-1:et=X);let tt=Z[et];tt===void 0&&(tt={type:void 0,texture:void 0},Z[et]=tt),(tt.type!==V||tt.texture!==bt)&&(X!==et&&(n.activeTexture(et),X=et),n.bindTexture(V,bt||pt[V]),tt.type=V,tt.texture=bt)}function q(){const V=Z[X];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function rt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ct(){try{n.compressedTexImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ot(){try{n.texSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ht(){try{n.texSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Et(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Jt(){try{n.texStorage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function _t(){try{n.texStorage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Nt(){try{n.texImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Wt(){try{n.texImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Yt(V){ut.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),ut.copy(V))}function Ot(V){G.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),G.copy(V))}function le(V,bt){let et=c.get(bt);et===void 0&&(et=new WeakMap,c.set(bt,et));let tt=et.get(V);tt===void 0&&(tt=n.getUniformBlockIndex(bt,V.name),et.set(V,tt))}function te(V,bt){const tt=c.get(bt).get(V);l.get(bt)!==tt&&(n.uniformBlockBinding(bt,tt,V.__bindingPointIndex),l.set(bt,tt))}function xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},X=null,Z={},d={},p=new WeakMap,f=[],v=null,_=!1,m=null,h=null,S=null,T=null,M=null,I=null,R=null,P=new ve(0,0,0),F=0,b=!1,g=null,U=null,k=null,N=null,A=null,ut.set(0,0,n.canvas.width,n.canvas.height),G.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:st,disable:mt,bindFramebuffer:lt,drawBuffers:vt,useProgram:wt,setBlending:B,setMaterial:de,setFlipSided:Pt,setCullFace:Gt,setLineWidth:Ut,setPolygonOffset:ue,setScissorTest:it,activeTexture:w,bindTexture:y,unbindTexture:q,compressedTexImage2D:rt,compressedTexImage3D:ct,texImage2D:Nt,texImage3D:Wt,updateUBOMapping:le,uniformBlockBinding:te,texStorage2D:Jt,texStorage3D:_t,texSubImage2D:ot,texSubImage3D:Ht,compressedTexSubImage2D:Et,compressedTexSubImage3D:Dt,scissor:Yt,viewport:Ot,reset:xe}}function ES(n,t,e,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new At,u=new WeakMap;let d;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,y){return f?new OffscreenCanvas(w,y):$o("canvas")}function _(w,y,q){let rt=1;const ct=it(w);if((ct.width>q||ct.height>q)&&(rt=q/Math.max(ct.width,ct.height)),rt<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ot=Math.floor(rt*ct.width),Ht=Math.floor(rt*ct.height);d===void 0&&(d=v(ot,Ht));const Et=y?v(ot,Ht):d;return Et.width=ot,Et.height=Ht,Et.getContext("2d").drawImage(w,0,0,ot,Ht),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+ot+"x"+Ht+")."),Et}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),w;return w}function m(w){return w.generateMipmaps}function h(w){n.generateMipmap(w)}function S(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(w,y,q,rt,ct=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ot=y;if(y===n.RED&&(q===n.FLOAT&&(ot=n.R32F),q===n.HALF_FLOAT&&(ot=n.R16F),q===n.UNSIGNED_BYTE&&(ot=n.R8)),y===n.RED_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.R8UI),q===n.UNSIGNED_SHORT&&(ot=n.R16UI),q===n.UNSIGNED_INT&&(ot=n.R32UI),q===n.BYTE&&(ot=n.R8I),q===n.SHORT&&(ot=n.R16I),q===n.INT&&(ot=n.R32I)),y===n.RG&&(q===n.FLOAT&&(ot=n.RG32F),q===n.HALF_FLOAT&&(ot=n.RG16F),q===n.UNSIGNED_BYTE&&(ot=n.RG8)),y===n.RG_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RG8UI),q===n.UNSIGNED_SHORT&&(ot=n.RG16UI),q===n.UNSIGNED_INT&&(ot=n.RG32UI),q===n.BYTE&&(ot=n.RG8I),q===n.SHORT&&(ot=n.RG16I),q===n.INT&&(ot=n.RG32I)),y===n.RGB_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RGB8UI),q===n.UNSIGNED_SHORT&&(ot=n.RGB16UI),q===n.UNSIGNED_INT&&(ot=n.RGB32UI),q===n.BYTE&&(ot=n.RGB8I),q===n.SHORT&&(ot=n.RGB16I),q===n.INT&&(ot=n.RGB32I)),y===n.RGBA_INTEGER&&(q===n.UNSIGNED_BYTE&&(ot=n.RGBA8UI),q===n.UNSIGNED_SHORT&&(ot=n.RGBA16UI),q===n.UNSIGNED_INT&&(ot=n.RGBA32UI),q===n.BYTE&&(ot=n.RGBA8I),q===n.SHORT&&(ot=n.RGBA16I),q===n.INT&&(ot=n.RGBA32I)),y===n.RGB&&q===n.UNSIGNED_INT_5_9_9_9_REV&&(ot=n.RGB9_E5),y===n.RGBA){const Ht=ct?jo:we.getTransfer(rt);q===n.FLOAT&&(ot=n.RGBA32F),q===n.HALF_FLOAT&&(ot=n.RGBA16F),q===n.UNSIGNED_BYTE&&(ot=Ht===Ce?n.SRGB8_ALPHA8:n.RGBA8),q===n.UNSIGNED_SHORT_4_4_4_4&&(ot=n.RGBA4),q===n.UNSIGNED_SHORT_5_5_5_1&&(ot=n.RGB5_A1)}return(ot===n.R16F||ot===n.R32F||ot===n.RG16F||ot===n.RG32F||ot===n.RGBA16F||ot===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function M(w,y){let q;return w?y===null||y===$r||y===Zs?q=n.DEPTH24_STENCIL8:y===Hi?q=n.DEPTH32F_STENCIL8:y===za&&(q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===$r||y===Zs?q=n.DEPTH_COMPONENT24:y===Hi?q=n.DEPTH_COMPONENT32F:y===za&&(q=n.DEPTH_COMPONENT16),q}function I(w,y){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==ui&&w.minFilter!==Si?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function R(w){const y=w.target;y.removeEventListener("dispose",R),F(y),y.isVideoTexture&&u.delete(y)}function P(w){const y=w.target;y.removeEventListener("dispose",P),g(y)}function F(w){const y=i.get(w);if(y.__webglInit===void 0)return;const q=w.source,rt=p.get(q);if(rt){const ct=rt[y.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&b(w),Object.keys(rt).length===0&&p.delete(q)}i.remove(w)}function b(w){const y=i.get(w);n.deleteTexture(y.__webglTexture);const q=w.source,rt=p.get(q);delete rt[y.__cacheKey],a.memory.textures--}function g(w){const y=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(y.__webglFramebuffer[rt]))for(let ct=0;ct<y.__webglFramebuffer[rt].length;ct++)n.deleteFramebuffer(y.__webglFramebuffer[rt][ct]);else n.deleteFramebuffer(y.__webglFramebuffer[rt]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[rt])}else{if(Array.isArray(y.__webglFramebuffer))for(let rt=0;rt<y.__webglFramebuffer.length;rt++)n.deleteFramebuffer(y.__webglFramebuffer[rt]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let rt=0;rt<y.__webglColorRenderbuffer.length;rt++)y.__webglColorRenderbuffer[rt]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[rt]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const q=w.textures;for(let rt=0,ct=q.length;rt<ct;rt++){const ot=i.get(q[rt]);ot.__webglTexture&&(n.deleteTexture(ot.__webglTexture),a.memory.textures--),i.remove(q[rt])}i.remove(w)}let U=0;function k(){U=0}function N(){const w=U;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),U+=1,w}function A(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function C(w,y){const q=i.get(w);if(w.isVideoTexture&&Ut(w),w.isRenderTargetTexture===!1&&w.version>0&&q.__version!==w.version){const rt=w.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(q,w,y);return}}e.bindTexture(n.TEXTURE_2D,q.__webglTexture,n.TEXTURE0+y)}function O(w,y){const q=i.get(w);if(w.version>0&&q.__version!==w.version){G(q,w,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,q.__webglTexture,n.TEXTURE0+y)}function z(w,y){const q=i.get(w);if(w.version>0&&q.__version!==w.version){G(q,w,y);return}e.bindTexture(n.TEXTURE_3D,q.__webglTexture,n.TEXTURE0+y)}function D(w,y){const q=i.get(w);if(w.version>0&&q.__version!==w.version){nt(q,w,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture,n.TEXTURE0+y)}const X={[Fc]:n.REPEAT,[Fr]:n.CLAMP_TO_EDGE,[Oc]:n.MIRRORED_REPEAT},Z={[ui]:n.NEAREST,[T_]:n.NEAREST_MIPMAP_NEAREST,[ro]:n.NEAREST_MIPMAP_LINEAR,[Si]:n.LINEAR,[Tl]:n.LINEAR_MIPMAP_NEAREST,[Or]:n.LINEAR_MIPMAP_LINEAR},J={[C_]:n.NEVER,[N_]:n.ALWAYS,[P_]:n.LESS,[Kf]:n.LEQUAL,[L_]:n.EQUAL,[U_]:n.GEQUAL,[D_]:n.GREATER,[I_]:n.NOTEQUAL};function ft(w,y){if(y.type===Hi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Si||y.magFilter===Tl||y.magFilter===ro||y.magFilter===Or||y.minFilter===Si||y.minFilter===Tl||y.minFilter===ro||y.minFilter===Or)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,X[y.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,X[y.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,X[y.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,Z[y.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,Z[y.minFilter]),y.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,J[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ui||y.minFilter!==ro&&y.minFilter!==Or||y.type===Hi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(w,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ut(w,y){let q=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",R));const rt=y.source;let ct=p.get(rt);ct===void 0&&(ct={},p.set(rt,ct));const ot=A(y);if(ot!==w.__cacheKey){ct[ot]===void 0&&(ct[ot]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ct[ot].usedTimes++;const Ht=ct[w.__cacheKey];Ht!==void 0&&(ct[w.__cacheKey].usedTimes--,Ht.usedTimes===0&&b(y)),w.__cacheKey=ot,w.__webglTexture=ct[ot].texture}return q}function G(w,y,q){let rt=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(rt=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(rt=n.TEXTURE_3D);const ct=ut(w,y),ot=y.source;e.bindTexture(rt,w.__webglTexture,n.TEXTURE0+q);const Ht=i.get(ot);if(ot.version!==Ht.__version||ct===!0){e.activeTexture(n.TEXTURE0+q);const Et=we.getPrimaries(we.workingColorSpace),Dt=y.colorSpace===or?null:we.getPrimaries(y.colorSpace),Jt=y.colorSpace===or||Et===Dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let _t=_(y.image,!1,r.maxTextureSize);_t=ue(y,_t);const Nt=s.convert(y.format,y.colorSpace),Wt=s.convert(y.type);let Yt=T(y.internalFormat,Nt,Wt,y.colorSpace,y.isVideoTexture);ft(rt,y);let Ot;const le=y.mipmaps,te=y.isVideoTexture!==!0,xe=Ht.__version===void 0||ct===!0,V=ot.dataReady,bt=I(y,_t);if(y.isDepthTexture)Yt=M(y.format===$s,y.type),xe&&(te?e.texStorage2D(n.TEXTURE_2D,1,Yt,_t.width,_t.height):e.texImage2D(n.TEXTURE_2D,0,Yt,_t.width,_t.height,0,Nt,Wt,null));else if(y.isDataTexture)if(le.length>0){te&&xe&&e.texStorage2D(n.TEXTURE_2D,bt,Yt,le[0].width,le[0].height);for(let et=0,tt=le.length;et<tt;et++)Ot=le[et],te?V&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,Ot.width,Ot.height,Nt,Wt,Ot.data):e.texImage2D(n.TEXTURE_2D,et,Yt,Ot.width,Ot.height,0,Nt,Wt,Ot.data);y.generateMipmaps=!1}else te?(xe&&e.texStorage2D(n.TEXTURE_2D,bt,Yt,_t.width,_t.height),V&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t.width,_t.height,Nt,Wt,_t.data)):e.texImage2D(n.TEXTURE_2D,0,Yt,_t.width,_t.height,0,Nt,Wt,_t.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){te&&xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Yt,le[0].width,le[0].height,_t.depth);for(let et=0,tt=le.length;et<tt;et++)if(Ot=le[et],y.format!==li)if(Nt!==null)if(te){if(V)if(y.layerUpdates.size>0){const Mt=jd(Ot.width,Ot.height,y.format,y.type);for(const Tt of y.layerUpdates){const Qt=Ot.data.subarray(Tt*Mt/Ot.data.BYTES_PER_ELEMENT,(Tt+1)*Mt/Ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,Tt,Ot.width,Ot.height,1,Nt,Qt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,Ot.width,Ot.height,_t.depth,Nt,Ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,et,Yt,Ot.width,Ot.height,_t.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?V&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,Ot.width,Ot.height,_t.depth,Nt,Wt,Ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,et,Yt,Ot.width,Ot.height,_t.depth,0,Nt,Wt,Ot.data)}else{te&&xe&&e.texStorage2D(n.TEXTURE_2D,bt,Yt,le[0].width,le[0].height);for(let et=0,tt=le.length;et<tt;et++)Ot=le[et],y.format!==li?Nt!==null?te?V&&e.compressedTexSubImage2D(n.TEXTURE_2D,et,0,0,Ot.width,Ot.height,Nt,Ot.data):e.compressedTexImage2D(n.TEXTURE_2D,et,Yt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?V&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,Ot.width,Ot.height,Nt,Wt,Ot.data):e.texImage2D(n.TEXTURE_2D,et,Yt,Ot.width,Ot.height,0,Nt,Wt,Ot.data)}else if(y.isDataArrayTexture)if(te){if(xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Yt,_t.width,_t.height,_t.depth),V)if(y.layerUpdates.size>0){const et=jd(_t.width,_t.height,y.format,y.type);for(const tt of y.layerUpdates){const Mt=_t.data.subarray(tt*et/_t.data.BYTES_PER_ELEMENT,(tt+1)*et/_t.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,tt,_t.width,_t.height,1,Nt,Wt,Mt)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,Nt,Wt,_t.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Yt,_t.width,_t.height,_t.depth,0,Nt,Wt,_t.data);else if(y.isData3DTexture)te?(xe&&e.texStorage3D(n.TEXTURE_3D,bt,Yt,_t.width,_t.height,_t.depth),V&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,Nt,Wt,_t.data)):e.texImage3D(n.TEXTURE_3D,0,Yt,_t.width,_t.height,_t.depth,0,Nt,Wt,_t.data);else if(y.isFramebufferTexture){if(xe)if(te)e.texStorage2D(n.TEXTURE_2D,bt,Yt,_t.width,_t.height);else{let et=_t.width,tt=_t.height;for(let Mt=0;Mt<bt;Mt++)e.texImage2D(n.TEXTURE_2D,Mt,Yt,et,tt,0,Nt,Wt,null),et>>=1,tt>>=1}}else if(le.length>0){if(te&&xe){const et=it(le[0]);e.texStorage2D(n.TEXTURE_2D,bt,Yt,et.width,et.height)}for(let et=0,tt=le.length;et<tt;et++)Ot=le[et],te?V&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,Nt,Wt,Ot):e.texImage2D(n.TEXTURE_2D,et,Yt,Nt,Wt,Ot);y.generateMipmaps=!1}else if(te){if(xe){const et=it(_t);e.texStorage2D(n.TEXTURE_2D,bt,Yt,et.width,et.height)}V&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Nt,Wt,_t)}else e.texImage2D(n.TEXTURE_2D,0,Yt,Nt,Wt,_t);m(y)&&h(rt),Ht.__version=ot.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function nt(w,y,q){if(y.image.length!==6)return;const rt=ut(w,y),ct=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+q);const ot=i.get(ct);if(ct.version!==ot.__version||rt===!0){e.activeTexture(n.TEXTURE0+q);const Ht=we.getPrimaries(we.workingColorSpace),Et=y.colorSpace===or?null:we.getPrimaries(y.colorSpace),Dt=y.colorSpace===or||Ht===Et?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);const Jt=y.isCompressedTexture||y.image[0].isCompressedTexture,_t=y.image[0]&&y.image[0].isDataTexture,Nt=[];for(let tt=0;tt<6;tt++)!Jt&&!_t?Nt[tt]=_(y.image[tt],!0,r.maxCubemapSize):Nt[tt]=_t?y.image[tt].image:y.image[tt],Nt[tt]=ue(y,Nt[tt]);const Wt=Nt[0],Yt=s.convert(y.format,y.colorSpace),Ot=s.convert(y.type),le=T(y.internalFormat,Yt,Ot,y.colorSpace),te=y.isVideoTexture!==!0,xe=ot.__version===void 0||rt===!0,V=ct.dataReady;let bt=I(y,Wt);ft(n.TEXTURE_CUBE_MAP,y);let et;if(Jt){te&&xe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,le,Wt.width,Wt.height);for(let tt=0;tt<6;tt++){et=Nt[tt].mipmaps;for(let Mt=0;Mt<et.length;Mt++){const Tt=et[Mt];y.format!==li?Yt!==null?te?V&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,0,0,Tt.width,Tt.height,Yt,Tt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,le,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,0,0,Tt.width,Tt.height,Yt,Ot,Tt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt,le,Tt.width,Tt.height,0,Yt,Ot,Tt.data)}}}else{if(et=y.mipmaps,te&&xe){et.length>0&&bt++;const tt=it(Nt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,le,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(_t){te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Nt[tt].width,Nt[tt].height,Yt,Ot,Nt[tt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,le,Nt[tt].width,Nt[tt].height,0,Yt,Ot,Nt[tt].data);for(let Mt=0;Mt<et.length;Mt++){const Qt=et[Mt].image[tt].image;te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,0,0,Qt.width,Qt.height,Yt,Ot,Qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,le,Qt.width,Qt.height,0,Yt,Ot,Qt.data)}}else{te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Yt,Ot,Nt[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,le,Yt,Ot,Nt[tt]);for(let Mt=0;Mt<et.length;Mt++){const Tt=et[Mt];te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,0,0,Yt,Ot,Tt.image[tt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Mt+1,le,Yt,Ot,Tt.image[tt])}}}m(y)&&h(n.TEXTURE_CUBE_MAP),ot.__version=ct.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function pt(w,y,q,rt,ct,ot){const Ht=s.convert(q.format,q.colorSpace),Et=s.convert(q.type),Dt=T(q.internalFormat,Ht,Et,q.colorSpace),Jt=i.get(y),_t=i.get(q);if(_t.__renderTarget=y,!Jt.__hasExternalTextures){const Nt=Math.max(1,y.width>>ot),Wt=Math.max(1,y.height>>ot);ct===n.TEXTURE_3D||ct===n.TEXTURE_2D_ARRAY?e.texImage3D(ct,ot,Dt,Nt,Wt,y.depth,0,Ht,Et,null):e.texImage2D(ct,ot,Dt,Nt,Wt,0,Ht,Et,null)}e.bindFramebuffer(n.FRAMEBUFFER,w),Gt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,rt,ct,_t.__webglTexture,0,Pt(y)):(ct===n.TEXTURE_2D||ct>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,rt,ct,_t.__webglTexture,ot),e.bindFramebuffer(n.FRAMEBUFFER,null)}function st(w,y,q){if(n.bindRenderbuffer(n.RENDERBUFFER,w),y.depthBuffer){const rt=y.depthTexture,ct=rt&&rt.isDepthTexture?rt.type:null,ot=M(y.stencilBuffer,ct),Ht=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Et=Pt(y);Gt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Et,ot,y.width,y.height):q?n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,ot,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ot,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ht,n.RENDERBUFFER,w)}else{const rt=y.textures;for(let ct=0;ct<rt.length;ct++){const ot=rt[ct],Ht=s.convert(ot.format,ot.colorSpace),Et=s.convert(ot.type),Dt=T(ot.internalFormat,Ht,Et,ot.colorSpace),Jt=Pt(y);q&&Gt(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Jt,Dt,y.width,y.height):Gt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Jt,Dt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Dt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function mt(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const rt=i.get(y.depthTexture);rt.__renderTarget=y,(!rt.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),C(y.depthTexture,0);const ct=rt.__webglTexture,ot=Pt(y);if(y.depthTexture.format===Is)Gt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0,ot):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0);else if(y.depthTexture.format===$s)Gt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0,ot):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function lt(w){const y=i.get(w),q=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const rt=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),rt){const ct=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,rt.removeEventListener("dispose",ct)};rt.addEventListener("dispose",ct),y.__depthDisposeCallback=ct}y.__boundDepthTexture=rt}if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");mt(y.__webglFramebuffer,w)}else if(q){y.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[rt]),y.__webglDepthbuffer[rt]===void 0)y.__webglDepthbuffer[rt]=n.createRenderbuffer(),st(y.__webglDepthbuffer[rt],w,!1);else{const ct=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=y.__webglDepthbuffer[rt];n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,ot)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),st(y.__webglDepthbuffer,w,!1);else{const rt=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ct),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,ct)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function vt(w,y,q){const rt=i.get(w);y!==void 0&&pt(rt.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),q!==void 0&&lt(w)}function wt(w){const y=w.texture,q=i.get(w),rt=i.get(y);w.addEventListener("dispose",P);const ct=w.textures,ot=w.isWebGLCubeRenderTarget===!0,Ht=ct.length>1;if(Ht||(rt.__webglTexture===void 0&&(rt.__webglTexture=n.createTexture()),rt.__version=y.version,a.memory.textures++),ot){q.__webglFramebuffer=[];for(let Et=0;Et<6;Et++)if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer[Et]=[];for(let Dt=0;Dt<y.mipmaps.length;Dt++)q.__webglFramebuffer[Et][Dt]=n.createFramebuffer()}else q.__webglFramebuffer[Et]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer=[];for(let Et=0;Et<y.mipmaps.length;Et++)q.__webglFramebuffer[Et]=n.createFramebuffer()}else q.__webglFramebuffer=n.createFramebuffer();if(Ht)for(let Et=0,Dt=ct.length;Et<Dt;Et++){const Jt=i.get(ct[Et]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&Gt(w)===!1){q.__webglMultisampledFramebuffer=n.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Et=0;Et<ct.length;Et++){const Dt=ct[Et];q.__webglColorRenderbuffer[Et]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,q.__webglColorRenderbuffer[Et]);const Jt=s.convert(Dt.format,Dt.colorSpace),_t=s.convert(Dt.type),Nt=T(Dt.internalFormat,Jt,_t,Dt.colorSpace,w.isXRRenderTarget===!0),Wt=Pt(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,Nt,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,q.__webglColorRenderbuffer[Et])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(q.__webglDepthRenderbuffer=n.createRenderbuffer(),st(q.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ot){e.bindTexture(n.TEXTURE_CUBE_MAP,rt.__webglTexture),ft(n.TEXTURE_CUBE_MAP,y);for(let Et=0;Et<6;Et++)if(y.mipmaps&&y.mipmaps.length>0)for(let Dt=0;Dt<y.mipmaps.length;Dt++)pt(q.__webglFramebuffer[Et][Dt],w,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Dt);else pt(q.__webglFramebuffer[Et],w,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0);m(y)&&h(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ht){for(let Et=0,Dt=ct.length;Et<Dt;Et++){const Jt=ct[Et],_t=i.get(Jt);e.bindTexture(n.TEXTURE_2D,_t.__webglTexture),ft(n.TEXTURE_2D,Jt),pt(q.__webglFramebuffer,w,Jt,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,0),m(Jt)&&h(n.TEXTURE_2D)}e.unbindTexture()}else{let Et=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Et=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Et,rt.__webglTexture),ft(Et,y),y.mipmaps&&y.mipmaps.length>0)for(let Dt=0;Dt<y.mipmaps.length;Dt++)pt(q.__webglFramebuffer[Dt],w,y,n.COLOR_ATTACHMENT0,Et,Dt);else pt(q.__webglFramebuffer,w,y,n.COLOR_ATTACHMENT0,Et,0);m(y)&&h(Et),e.unbindTexture()}w.depthBuffer&&lt(w)}function xt(w){const y=w.textures;for(let q=0,rt=y.length;q<rt;q++){const ct=y[q];if(m(ct)){const ot=S(w),Ht=i.get(ct).__webglTexture;e.bindTexture(ot,Ht),h(ot),e.unbindTexture()}}}const Zt=[],B=[];function de(w){if(w.samples>0){if(Gt(w)===!1){const y=w.textures,q=w.width,rt=w.height;let ct=n.COLOR_BUFFER_BIT;const ot=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ht=i.get(w),Et=y.length>1;if(Et)for(let Dt=0;Dt<y.length;Dt++)e.bindFramebuffer(n.FRAMEBUFFER,Ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Ht.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ht.__webglFramebuffer);for(let Dt=0;Dt<y.length;Dt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ct|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ct|=n.STENCIL_BUFFER_BIT)),Et){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ht.__webglColorRenderbuffer[Dt]);const Jt=i.get(y[Dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Jt,0)}n.blitFramebuffer(0,0,q,rt,0,0,q,rt,ct,n.NEAREST),l===!0&&(Zt.length=0,B.length=0,Zt.push(n.COLOR_ATTACHMENT0+Dt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Zt.push(ot),B.push(ot),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,B)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Zt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Et)for(let Dt=0;Dt<y.length;Dt++){e.bindFramebuffer(n.FRAMEBUFFER,Ht.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,Ht.__webglColorRenderbuffer[Dt]);const Jt=i.get(y[Dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Ht.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,Jt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ht.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const y=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function Pt(w){return Math.min(r.maxSamples,w.samples)}function Gt(w){const y=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ut(w){const y=a.render.frame;u.get(w)!==y&&(u.set(w,y),w.update())}function ue(w,y){const q=w.colorSpace,rt=w.format,ct=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||q!==Ks&&q!==or&&(we.getTransfer(q)===Ce?(rt!==li||ct!==ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),y}function it(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=k,this.setTexture2D=C,this.setTexture2DArray=O,this.setTexture3D=z,this.setTextureCube=D,this.rebindTextures=vt,this.setupRenderTarget=wt,this.updateRenderTargetMipmap=xt,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=Gt}function TS(n,t){function e(i,r=or){let s;const a=we.getTransfer(r);if(i===ji)return n.UNSIGNED_BYTE;if(i===Du)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Iu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Vf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===zf)return n.BYTE;if(i===Hf)return n.SHORT;if(i===za)return n.UNSIGNED_SHORT;if(i===Lu)return n.INT;if(i===$r)return n.UNSIGNED_INT;if(i===Hi)return n.FLOAT;if(i===$a)return n.HALF_FLOAT;if(i===Gf)return n.ALPHA;if(i===Wf)return n.RGB;if(i===li)return n.RGBA;if(i===Xf)return n.LUMINANCE;if(i===Yf)return n.LUMINANCE_ALPHA;if(i===Is)return n.DEPTH_COMPONENT;if(i===$s)return n.DEPTH_STENCIL;if(i===qf)return n.RED;if(i===Uu)return n.RED_INTEGER;if(i===jf)return n.RG;if(i===Nu)return n.RG_INTEGER;if(i===Fu)return n.RGBA_INTEGER;if(i===No||i===Fo||i===Oo||i===Bo)if(a===Ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===No)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Oo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Bo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===No)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Oo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Bo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bc||i===kc||i===zc||i===Hc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Bc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===kc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===zc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vc||i===Gc||i===Wc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Vc||i===Gc)return a===Ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Wc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Xc||i===Yc||i===qc||i===jc||i===Zc||i===$c||i===Kc||i===Jc||i===Qc||i===tu||i===eu||i===nu||i===iu||i===ru)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Xc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Yc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===jc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Zc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$c)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Kc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Jc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qc)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===tu)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===eu)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===nu)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===iu)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ru)return a===Ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ko||i===su||i===au)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ko)return a===Ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===su)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===au)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zf||i===ou||i===lu||i===cu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===ko)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ou)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===cu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const wS={type:"move"};class ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Br,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Br,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Br,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),h=this._getHandJoint(c,_);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=u.position.distanceTo(d.position),f=.02,v=.005;c.inputState.pinching&&p>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wS)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Br;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const AS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,RS=`
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

}`;class CS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new bn,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new gr({vertexShader:AS,fragmentShader:RS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new kn(new dl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class PS extends ts{constructor(t,e){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,p=null,f=null,v=null;const _=new CS,m=e.getContextAttributes();let h=null,S=null;const T=[],M=[],I=new At;let R=null;const P=new qn;P.viewport=new Be;const F=new qn;F.viewport=new Be;const b=[P,F],g=new Zg;let U=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let nt=T[G];return nt===void 0&&(nt=new ic,T[G]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(G){let nt=T[G];return nt===void 0&&(nt=new ic,T[G]=nt),nt.getGripSpace()},this.getHand=function(G){let nt=T[G];return nt===void 0&&(nt=new ic,T[G]=nt),nt.getHandSpace()};function N(G){const nt=M.indexOf(G.inputSource);if(nt===-1)return;const pt=T[nt];pt!==void 0&&(pt.update(G.inputSource,G.frame,c||a),pt.dispatchEvent({type:G.type,data:G.inputSource}))}function A(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",A),r.removeEventListener("inputsourceschange",C);for(let G=0;G<T.length;G++){const nt=M[G];nt!==null&&(M[G]=null,T[G].disconnect(nt))}U=null,k=null,_.reset(),t.setRenderTarget(h),f=null,p=null,d=null,r=null,S=null,ut.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(h=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",A),r.addEventListener("inputsourceschange",C),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(I),r.enabledFeatures!==void 0&&r.enabledFeatures.includes("layers")){let pt=null,st=null,mt=null;m.depth&&(mt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=m.stencil?$s:Is,st=m.stencil?Zs:$r);const lt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:s};d=new XRWebGLBinding(r,e),p=d.createProjectionLayer(lt),r.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),S=new Kr(p.textureWidth,p.textureHeight,{format:li,type:ji,depthTexture:new cp(p.textureWidth,p.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}else{const pt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,pt),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Kr(f.framebufferWidth,f.framebufferHeight,{format:li,type:ji,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ut.setContext(r),ut.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function C(G){for(let nt=0;nt<G.removed.length;nt++){const pt=G.removed[nt],st=M.indexOf(pt);st>=0&&(M[st]=null,T[st].disconnect(pt))}for(let nt=0;nt<G.added.length;nt++){const pt=G.added[nt];let st=M.indexOf(pt);if(st===-1){for(let lt=0;lt<T.length;lt++)if(lt>=M.length){M.push(pt),st=lt;break}else if(M[lt]===null){M[lt]=pt,st=lt;break}if(st===-1)break}const mt=T[st];mt&&mt.connect(pt)}}const O=new H,z=new H;function D(G,nt,pt){O.setFromMatrixPosition(nt.matrixWorld),z.setFromMatrixPosition(pt.matrixWorld);const st=O.distanceTo(z),mt=nt.projectionMatrix.elements,lt=pt.projectionMatrix.elements,vt=mt[14]/(mt[10]-1),wt=mt[14]/(mt[10]+1),xt=(mt[9]+1)/mt[5],Zt=(mt[9]-1)/mt[5],B=(mt[8]-1)/mt[0],de=(lt[8]+1)/lt[0],Pt=vt*B,Gt=vt*de,Ut=st/(-B+de),ue=Ut*-B;if(nt.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ue),G.translateZ(Ut),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),mt[10]===-1)G.projectionMatrix.copy(nt.projectionMatrix),G.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const it=vt+Ut,w=wt+Ut,y=Pt-ue,q=Gt+(st-ue),rt=xt*wt/w*it,ct=Zt*wt/w*it;G.projectionMatrix.makePerspective(y,q,rt,ct,it,w),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function X(G,nt){nt===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(nt.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let nt=G.near,pt=G.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(pt=_.depthFar)),g.near=F.near=P.near=nt,g.far=F.far=P.far=pt,(U!==g.near||k!==g.far)&&(r.updateRenderState({depthNear:g.near,depthFar:g.far}),U=g.near,k=g.far),P.layers.mask=G.layers.mask|2,F.layers.mask=G.layers.mask|4,g.layers.mask=P.layers.mask|F.layers.mask;const st=G.parent,mt=g.cameras;X(g,st);for(let lt=0;lt<mt.length;lt++)X(mt[lt],st);mt.length===2?D(g,P,F):g.projectionMatrix.copy(P.projectionMatrix),Z(G,g,st)};function Z(G,nt,pt){pt===null?G.matrix.copy(nt.matrixWorld):(G.matrix.copy(pt.matrixWorld),G.matrix.invert(),G.matrix.multiply(nt.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(nt.projectionMatrix),G.projectionMatrixInverse.copy(nt.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Ha*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(G){l=G,p!==null&&(p.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(g)};let J=null;function ft(G,nt){if(u=nt.getViewerPose(c||a),v=nt,u!==null){const pt=u.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let st=!1;pt.length!==g.cameras.length&&(g.cameras.length=0,st=!0);for(let lt=0;lt<pt.length;lt++){const vt=pt[lt];let wt=null;if(f!==null)wt=f.getViewport(vt);else{const Zt=d.getViewSubImage(p,vt);wt=Zt.viewport,lt===0&&(t.setRenderTargetTextures(S,Zt.colorTexture,p.ignoreDepthValues?void 0:Zt.depthStencilTexture),t.setRenderTarget(S))}let xt=b[lt];xt===void 0&&(xt=new qn,xt.layers.enable(lt),xt.viewport=new Be,b[lt]=xt),xt.matrix.fromArray(vt.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(vt.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(wt.x,wt.y,wt.width,wt.height),lt===0&&(g.matrix.copy(xt.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),st===!0&&g.cameras.push(xt)}const mt=r.enabledFeatures;if(mt&&mt.includes("depth-sensing")){const lt=d.getDepthInformation(pt[0]);lt&&lt.isValid&&lt.texture&&_.init(t,lt,r.renderState)}}for(let pt=0;pt<T.length;pt++){const st=M[pt],mt=T[pt];st!==null&&mt!==void 0&&mt.update(st,nt,c||a)}J&&J(G,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),v=null}const ut=new _p;ut.setAnimationLoop(ft),this.setAnimationLoop=function(G){J=G},this.dispose=function(){}}}const Ar=new Ai,LS=new Ne;function DS(n,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,rp(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,S,T,M){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),p(m,h),h.isMeshPhysicalMaterial&&f(m,h,M)):h.isMeshMatcapMaterial?(s(m,h),v(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),_(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,S,T):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Pn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Pn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const S=t.get(h),T=S.envMap,M=S.envMapRotation;T&&(m.envMap.value=T,Ar.copy(M),Ar.x*=-1,Ar.y*=-1,Ar.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ar.y*=-1,Ar.z*=-1),m.envMapRotation.value.setFromMatrix4(LS.makeRotationFromEuler(Ar)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,S,T){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*S,m.scale.value=T*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function p(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function f(m,h,S){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Pn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,h){h.matcap&&(m.matcap.value=h.matcap)}function _(m,h){const S=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function IS(n,t,e,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){const M=T.program;i.uniformBlockBinding(S,M)}function c(S,T){let M=r[S.id];M===void 0&&(v(S),M=u(S),r[S.id]=M,S.addEventListener("dispose",m));const I=T.program;i.updateUBOMapping(S,I);const R=t.render.frame;s[S.id]!==R&&(p(S),s[S.id]=R)}function u(S){const T=d();S.__bindingPointIndex=T;const M=n.createBuffer(),I=S.__size,R=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,I,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,M),M}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const T=r[S.id],M=S.uniforms,I=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let R=0,P=M.length;R<P;R++){const F=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,g=F.length;b<g;b++){const U=F[b];if(f(U,R,b,I)===!0){const k=U.__offset,N=Array.isArray(U.value)?U.value:[U.value];let A=0;for(let C=0;C<N.length;C++){const O=N[C],z=_(O);typeof O=="number"||typeof O=="boolean"?(U.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,k+A,U.__data)):O.isMatrix3?(U.__data[0]=O.elements[0],U.__data[1]=O.elements[1],U.__data[2]=O.elements[2],U.__data[3]=0,U.__data[4]=O.elements[3],U.__data[5]=O.elements[4],U.__data[6]=O.elements[5],U.__data[7]=0,U.__data[8]=O.elements[6],U.__data[9]=O.elements[7],U.__data[10]=O.elements[8],U.__data[11]=0):(O.toArray(U.__data,A),A+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,T,M,I){const R=S.value,P=T+"_"+M;if(I[P]===void 0)return typeof R=="number"||typeof R=="boolean"?I[P]=R:I[P]=R.clone(),!0;{const F=I[P];if(typeof R=="number"||typeof R=="boolean"){if(F!==R)return I[P]=R,!0}else if(F.equals(R)===!1)return F.copy(R),!0}return!1}function v(S){const T=S.uniforms;let M=0;const I=16;for(let P=0,F=T.length;P<F;P++){const b=Array.isArray(T[P])?T[P]:[T[P]];for(let g=0,U=b.length;g<U;g++){const k=b[g],N=Array.isArray(k.value)?k.value:[k.value];for(let A=0,C=N.length;A<C;A++){const O=N[A],z=_(O),D=M%I,X=D%z.boundary,Z=D+X;M+=X,Z!==0&&I-Z<z.storage&&(M+=I-Z),k.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=z.storage}}}const R=M%I;return R>0&&(M+=I-R),S.__size=M,S.__cache={},this}function _(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),T}function m(S){const T=S.target;T.removeEventListener("dispose",m);const M=a.indexOf(T.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function h(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class US{constructor(t={}){const{canvas:e=J_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const v=new Uint32Array(4),_=new Int32Array(4);let m=null,h=null;const S=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=An,this.toneMapping=mr,this.toneMappingExposure=1;const M=this;let I=!1,R=0,P=0,F=null,b=-1,g=null;const U=new Be,k=new Be;let N=null;const A=new ve(0);let C=0,O=e.width,z=e.height,D=1,X=null,Z=null;const J=new Be(0,0,O,z),ft=new Be(0,0,O,z);let ut=!1;const G=new Hu;let nt=!1,pt=!1;this.transmissionResolutionScale=1;const st=new Ne,mt=new Ne,lt=new H,vt=new Be,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xt=!1;function Zt(){return F===null?D:1}let B=i;function de(E,W){return e.getContext(E,W)}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Pu}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Tt,!1),B===null){const W="webgl2";if(B=de(W,E),B===null)throw de(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Pt,Gt,Ut,ue,it,w,y,q,rt,ct,ot,Ht,Et,Dt,Jt,_t,Nt,Wt,Yt,Ot,le,te,xe,V;function bt(){Pt=new Gy(B),Pt.init(),te=new TS(B,Pt),Gt=new Oy(B,Pt,t,te),Ut=new bS(B,Pt),Gt.reverseDepthBuffer&&p&&Ut.buffers.depth.setReversed(!0),ue=new Yy(B),it=new uS,w=new ES(B,Pt,Ut,it,Gt,te,ue),y=new ky(M),q=new Vy(M),rt=new Qg(B),xe=new Ny(B,rt),ct=new Wy(B,rt,ue,xe),ot=new jy(B,ct,rt,ue),Yt=new qy(B,Gt,w),_t=new By(it),Ht=new cS(M,y,q,Pt,Gt,xe,_t),Et=new DS(M,it),Dt=new hS,Jt=new gS(Pt),Wt=new Uy(M,y,q,Ut,ot,f,l),Nt=new MS(M,ot,Gt),V=new IS(B,ue,Gt,Ut),Ot=new Fy(B,Pt,ue),le=new Xy(B,Pt,ue),ue.programs=Ht.programs,M.capabilities=Gt,M.extensions=Pt,M.properties=it,M.renderLists=Dt,M.shadowMap=Nt,M.state=Ut,M.info=ue}bt();const et=new PS(M,B);this.xr=et,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=Pt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Pt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(E){E!==void 0&&(D=E,this.setSize(O,z,!1))},this.getSize=function(E){return E.set(O,z)},this.setSize=function(E,W,$=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=E,z=W,e.width=Math.floor(E*D),e.height=Math.floor(W*D),$===!0&&(e.style.width=E+"px",e.style.height=W+"px"),this.setViewport(0,0,E,W)},this.getDrawingBufferSize=function(E){return E.set(O*D,z*D).floor()},this.setDrawingBufferSize=function(E,W,$){O=E,z=W,D=$,e.width=Math.floor(E*$),e.height=Math.floor(W*$),this.setViewport(0,0,E,W)},this.getCurrentViewport=function(E){return E.copy(U)},this.getViewport=function(E){return E.copy(J)},this.setViewport=function(E,W,$,K){E.isVector4?J.set(E.x,E.y,E.z,E.w):J.set(E,W,$,K),Ut.viewport(U.copy(J).multiplyScalar(D).round())},this.getScissor=function(E){return E.copy(ft)},this.setScissor=function(E,W,$,K){E.isVector4?ft.set(E.x,E.y,E.z,E.w):ft.set(E,W,$,K),Ut.scissor(k.copy(ft).multiplyScalar(D).round())},this.getScissorTest=function(){return ut},this.setScissorTest=function(E){Ut.setScissorTest(ut=E)},this.setOpaqueSort=function(E){X=E},this.setTransparentSort=function(E){Z=E},this.getClearColor=function(E){return E.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor.apply(Wt,arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha.apply(Wt,arguments)},this.clear=function(E=!0,W=!0,$=!0){let K=0;if(E){let Y=!1;if(F!==null){const gt=F.texture.format;Y=gt===Fu||gt===Nu||gt===Uu}if(Y){const gt=F.texture.type,Rt=gt===ji||gt===$r||gt===za||gt===Zs||gt===Du||gt===Iu,Lt=Wt.getClearColor(),Ft=Wt.getClearAlpha(),Xt=Lt.r,$t=Lt.g,Ct=Lt.b;Rt?(v[0]=Xt,v[1]=$t,v[2]=Ct,v[3]=Ft,B.clearBufferuiv(B.COLOR,0,v)):(_[0]=Xt,_[1]=$t,_[2]=Ct,_[3]=Ft,B.clearBufferiv(B.COLOR,0,_))}else K|=B.COLOR_BUFFER_BIT}W&&(K|=B.DEPTH_BUFFER_BIT),$&&(K|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),Wt.dispose(),Dt.dispose(),Jt.dispose(),it.dispose(),y.dispose(),q.dispose(),ot.dispose(),xe.dispose(),V.dispose(),Ht.dispose(),et.dispose(),et.removeEventListener("sessionstart",Ja),et.removeEventListener("sessionend",sa),Ci.stop()};function tt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const E=ue.autoReset,W=Nt.enabled,$=Nt.autoUpdate,K=Nt.needsUpdate,Y=Nt.type;bt(),ue.autoReset=E,Nt.enabled=W,Nt.autoUpdate=$,Nt.needsUpdate=K,Nt.type=Y}function Tt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Qt(E){const W=E.target;W.removeEventListener("dispose",Qt),Le(W)}function Le(E){Ge(E),it.remove(E)}function Ge(E){const W=it.get(E).programs;W!==void 0&&(W.forEach(function($){Ht.releaseProgram($)}),E.isShaderMaterial&&Ht.releaseShaderCache(E))}this.renderBufferDirect=function(E,W,$,K,Y,gt){W===null&&(W=wt);const Rt=Y.isMesh&&Y.matrixWorld.determinant()<0,Lt=es(E,W,$,K,Y);Ut.setMaterial(K,Rt);let Ft=$.index,Xt=1;if(K.wireframe===!0){if(Ft=ct.getWireframeAttribute($),Ft===void 0)return;Xt=2}const $t=$.drawRange,Ct=$.attributes.position;let Kt=$t.start*Xt,ye=($t.start+$t.count)*Xt;gt!==null&&(Kt=Math.max(Kt,gt.start*Xt),ye=Math.min(ye,(gt.start+gt.count)*Xt)),Ft!==null?(Kt=Math.max(Kt,0),ye=Math.min(ye,Ft.count)):Ct!=null&&(Kt=Math.max(Kt,0),ye=Math.min(ye,Ct.count));const Ae=ye-Kt;if(Ae<0||Ae===1/0)return;xe.setup(Y,K,Lt,$,Ft);let Me,re=Ot;if(Ft!==null&&(Me=rt.get(Ft),re=le,re.setIndex(Me)),Y.isMesh)K.wireframe===!0?(Ut.setLineWidth(K.wireframeLinewidth*Zt()),re.setMode(B.LINES)):re.setMode(B.TRIANGLES);else if(Y.isLine){let qt=K.linewidth;qt===void 0&&(qt=1),Ut.setLineWidth(qt*Zt()),Y.isLineSegments?re.setMode(B.LINES):Y.isLineLoop?re.setMode(B.LINE_LOOP):re.setMode(B.LINE_STRIP)}else Y.isPoints?re.setMode(B.POINTS):Y.isSprite&&re.setMode(B.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)re.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(Pt.get("WEBGL_multi_draw"))re.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const qt=Y._multiDrawStarts,We=Y._multiDrawCounts,Te=Y._multiDrawCount,cn=Ft?rt.get(Ft).bytesPerElement:1,Ki=it.get(K).currentProgram.getUniforms();for(let gn=0;gn<Te;gn++)Ki.setValue(B,"_gl_DrawID",gn),re.render(qt[gn]/cn,We[gn])}else if(Y.isInstancedMesh)re.renderInstances(Kt,Ae,Y.count);else if($.isInstancedBufferGeometry){const qt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,We=Math.min($.instanceCount,qt);re.renderInstances(Kt,Ae,We)}else re.render(Kt,Ae)};function be(E,W,$){E.transparent===!0&&E.side===ri&&E.forceSinglePass===!1?(E.side=Pn,E.needsUpdate=!0,Ln(E,W,$),E.side=_r,E.needsUpdate=!0,Ln(E,W,$),E.side=ri):Ln(E,W,$)}this.compile=function(E,W,$=null){$===null&&($=E),h=Jt.get($),h.init(W),T.push(h),$.traverseVisible(function(Y){Y.isLight&&Y.layers.test(W.layers)&&(h.pushLight(Y),Y.castShadow&&h.pushShadow(Y))}),E!==$&&E.traverseVisible(function(Y){Y.isLight&&Y.layers.test(W.layers)&&(h.pushLight(Y),Y.castShadow&&h.pushShadow(Y))}),h.setupLights();const K=new Set;return E.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const gt=Y.material;if(gt)if(Array.isArray(gt))for(let Rt=0;Rt<gt.length;Rt++){const Lt=gt[Rt];be(Lt,$,Y),K.add(Lt)}else be(gt,$,Y),K.add(gt)}),T.pop(),h=null,K},this.compileAsync=function(E,W,$=null){const K=this.compile(E,W,$);return new Promise(Y=>{function gt(){if(K.forEach(function(Rt){it.get(Rt).currentProgram.isReady()&&K.delete(Rt)}),K.size===0){Y(E);return}setTimeout(gt,10)}Pt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let _n=null;function Hn(E){_n&&_n(E)}function Ja(){Ci.stop()}function sa(){Ci.start()}const Ci=new _p;Ci.setAnimationLoop(Hn),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(E){_n=E,et.setAnimationLoop(E),E===null?Ci.stop():Ci.start()},et.addEventListener("sessionstart",Ja),et.addEventListener("sessionend",sa),this.render=function(E,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(W),W=et.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,W,F),h=Jt.get(E,T.length),h.init(W),T.push(h),mt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),G.setFromProjectionMatrix(mt),pt=this.localClippingEnabled,nt=_t.init(this.clippingPlanes,pt),m=Dt.get(E,S.length),m.init(),S.push(m),et.enabled===!0&&et.isPresenting===!0){const gt=M.xr.getDepthSensingMesh();gt!==null&&aa(gt,W,-1/0,M.sortObjects)}aa(E,W,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(X,Z),xt=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,xt&&Wt.addToRenderList(m,E),this.info.render.frame++,nt===!0&&_t.beginShadows();const $=h.state.shadowsArray;Nt.render($,E,W),nt===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,Y=m.transmissive;if(h.setupLights(),W.isArrayCamera){const gt=W.cameras;if(Y.length>0)for(let Rt=0,Lt=gt.length;Rt<Lt;Rt++){const Ft=gt[Rt];to(K,Y,E,Ft)}xt&&Wt.render(E);for(let Rt=0,Lt=gt.length;Rt<Lt;Rt++){const Ft=gt[Rt];Qa(m,E,Ft,Ft.viewport)}}else Y.length>0&&to(K,Y,E,W),xt&&Wt.render(E),Qa(m,E,W);F!==null&&P===0&&(w.updateMultisampleRenderTarget(F),w.updateRenderTargetMipmap(F)),E.isScene===!0&&E.onAfterRender(M,E,W),xe.resetDefaultState(),b=-1,g=null,T.pop(),T.length>0?(h=T[T.length-1],nt===!0&&_t.setGlobalState(M.clippingPlanes,h.state.camera)):h=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function aa(E,W,$,K){if(E.visible===!1)return;if(E.layers.test(W.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(W);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||G.intersectsSprite(E)){K&&vt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(mt);const Rt=ot.update(E),Lt=E.material;Lt.visible&&m.push(E,Rt,Lt,$,vt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||G.intersectsObject(E))){const Rt=ot.update(E),Lt=E.material;if(K&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),vt.copy(E.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),vt.copy(Rt.boundingSphere.center)),vt.applyMatrix4(E.matrixWorld).applyMatrix4(mt)),Array.isArray(Lt)){const Ft=Rt.groups;for(let Xt=0,$t=Ft.length;Xt<$t;Xt++){const Ct=Ft[Xt],Kt=Lt[Ct.materialIndex];Kt&&Kt.visible&&m.push(E,Rt,Kt,$,vt.z,Ct)}}else Lt.visible&&m.push(E,Rt,Lt,$,vt.z,null)}}const gt=E.children;for(let Rt=0,Lt=gt.length;Rt<Lt;Rt++)aa(gt[Rt],W,$,K)}function Qa(E,W,$,K){const Y=E.opaque,gt=E.transmissive,Rt=E.transparent;h.setupLightsView($),nt===!0&&_t.setGlobalState(M.clippingPlanes,$),K&&Ut.viewport(U.copy(K)),Y.length>0&&ne(Y,W,$),gt.length>0&&ne(gt,W,$),Rt.length>0&&ne(Rt,W,$),Ut.buffers.depth.setTest(!0),Ut.buffers.depth.setMask(!0),Ut.buffers.color.setMask(!0),Ut.setPolygonOffset(!1)}function to(E,W,$,K){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[K.id]===void 0&&(h.state.transmissionRenderTarget[K.id]=new Kr(1,1,{generateMipmaps:!0,type:Pt.has("EXT_color_buffer_half_float")||Pt.has("EXT_color_buffer_float")?$a:ji,minFilter:Or,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace}));const gt=h.state.transmissionRenderTarget[K.id],Rt=K.viewport||U;gt.setSize(Rt.z*M.transmissionResolutionScale,Rt.w*M.transmissionResolutionScale);const Lt=M.getRenderTarget();M.setRenderTarget(gt),M.getClearColor(A),C=M.getClearAlpha(),C<1&&M.setClearColor(16777215,.5),M.clear(),xt&&Wt.render($);const Ft=M.toneMapping;M.toneMapping=mr;const Xt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),h.setupLightsView(K),nt===!0&&_t.setGlobalState(M.clippingPlanes,K),ne(E,$,K),w.updateMultisampleRenderTarget(gt),w.updateRenderTargetMipmap(gt),Pt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Ct=0,Kt=W.length;Ct<Kt;Ct++){const ye=W[Ct],Ae=ye.object,Me=ye.geometry,re=ye.material,qt=ye.group;if(re.side===ri&&Ae.layers.test(K.layers)){const We=re.side;re.side=Pn,re.needsUpdate=!0,ie(Ae,$,K,Me,re,qt),re.side=We,re.needsUpdate=!0,$t=!0}}$t===!0&&(w.updateMultisampleRenderTarget(gt),w.updateRenderTargetMipmap(gt))}M.setRenderTarget(Lt),M.setClearColor(A,C),Xt!==void 0&&(K.viewport=Xt),M.toneMapping=Ft}function ne(E,W,$){const K=W.isScene===!0?W.overrideMaterial:null;for(let Y=0,gt=E.length;Y<gt;Y++){const Rt=E[Y],Lt=Rt.object,Ft=Rt.geometry,Xt=K===null?Rt.material:K,$t=Rt.group;Lt.layers.test($.layers)&&ie(Lt,W,$,Ft,Xt,$t)}}function ie(E,W,$,K,Y,gt){E.onBeforeRender(M,W,$,K,Y,gt),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Y.onBeforeRender(M,W,$,K,E,gt),Y.transparent===!0&&Y.side===ri&&Y.forceSinglePass===!1?(Y.side=Pn,Y.needsUpdate=!0,M.renderBufferDirect($,W,K,Y,E,gt),Y.side=_r,Y.needsUpdate=!0,M.renderBufferDirect($,W,K,Y,E,gt),Y.side=ri):M.renderBufferDirect($,W,K,Y,E,gt),E.onAfterRender(M,W,$,K,Y,gt)}function Ln(E,W,$){W.isScene!==!0&&(W=wt);const K=it.get(E),Y=h.state.lights,gt=h.state.shadowsArray,Rt=Y.state.version,Lt=Ht.getParameters(E,Y.state,gt,W,$),Ft=Ht.getProgramCacheKey(Lt);let Xt=K.programs;K.environment=E.isMeshStandardMaterial?W.environment:null,K.fog=W.fog,K.envMap=(E.isMeshStandardMaterial?q:y).get(E.envMap||K.environment),K.envMapRotation=K.environment!==null&&E.envMap===null?W.environmentRotation:E.envMapRotation,Xt===void 0&&(E.addEventListener("dispose",Qt),Xt=new Map,K.programs=Xt);let $t=Xt.get(Ft);if($t!==void 0){if(K.currentProgram===$t&&K.lightsStateVersion===Rt)return Pi(E,Lt),$t}else Lt.uniforms=Ht.getUniforms(E),E.onBeforeCompile(Lt,M),$t=Ht.acquireProgram(Lt,Ft),Xt.set(Ft,$t),K.uniforms=Lt.uniforms;const Ct=K.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ct.clippingPlanes=_t.uniform),Pi(E,Lt),K.needsLights=xr(E),K.lightsStateVersion=Rt,K.needsLights&&(Ct.ambientLightColor.value=Y.state.ambient,Ct.lightProbe.value=Y.state.probe,Ct.directionalLights.value=Y.state.directional,Ct.directionalLightShadows.value=Y.state.directionalShadow,Ct.spotLights.value=Y.state.spot,Ct.spotLightShadows.value=Y.state.spotShadow,Ct.rectAreaLights.value=Y.state.rectArea,Ct.ltc_1.value=Y.state.rectAreaLTC1,Ct.ltc_2.value=Y.state.rectAreaLTC2,Ct.pointLights.value=Y.state.point,Ct.pointLightShadows.value=Y.state.pointShadow,Ct.hemisphereLights.value=Y.state.hemi,Ct.directionalShadowMap.value=Y.state.directionalShadowMap,Ct.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ct.spotShadowMap.value=Y.state.spotShadowMap,Ct.spotLightMatrix.value=Y.state.spotLightMatrix,Ct.spotLightMap.value=Y.state.spotLightMap,Ct.pointShadowMap.value=Y.state.pointShadowMap,Ct.pointShadowMatrix.value=Y.state.pointShadowMatrix),K.currentProgram=$t,K.uniformsList=null,$t}function Kn(E){if(E.uniformsList===null){const W=E.currentProgram.getUniforms();E.uniformsList=zo.seqWithValue(W.seq,E.uniforms)}return E.uniformsList}function Pi(E,W){const $=it.get(E);$.outputColorSpace=W.outputColorSpace,$.batching=W.batching,$.batchingColor=W.batchingColor,$.instancing=W.instancing,$.instancingColor=W.instancingColor,$.instancingMorph=W.instancingMorph,$.skinning=W.skinning,$.morphTargets=W.morphTargets,$.morphNormals=W.morphNormals,$.morphColors=W.morphColors,$.morphTargetsCount=W.morphTargetsCount,$.numClippingPlanes=W.numClippingPlanes,$.numIntersection=W.numClipIntersection,$.vertexAlphas=W.vertexAlphas,$.vertexTangents=W.vertexTangents,$.toneMapping=W.toneMapping}function es(E,W,$,K,Y){W.isScene!==!0&&(W=wt),w.resetTextureUnits();const gt=W.fog,Rt=K.isMeshStandardMaterial?W.environment:null,Lt=F===null?M.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Ks,Ft=(K.isMeshStandardMaterial?q:y).get(K.envMap||Rt),Xt=K.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,$t=!!$.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ct=!!$.morphAttributes.position,Kt=!!$.morphAttributes.normal,ye=!!$.morphAttributes.color;let Ae=mr;K.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Ae=M.toneMapping);const Me=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,re=Me!==void 0?Me.length:0,qt=it.get(K),We=h.state.lights;if(nt===!0&&(pt===!0||E!==g)){const Xe=E===g&&K.id===b;_t.setState(K,E,Xe)}let Te=!1;K.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==We.state.version||qt.outputColorSpace!==Lt||Y.isBatchedMesh&&qt.batching===!1||!Y.isBatchedMesh&&qt.batching===!0||Y.isBatchedMesh&&qt.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&qt.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&qt.instancing===!1||!Y.isInstancedMesh&&qt.instancing===!0||Y.isSkinnedMesh&&qt.skinning===!1||!Y.isSkinnedMesh&&qt.skinning===!0||Y.isInstancedMesh&&qt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&qt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&qt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&qt.instancingMorph===!1&&Y.morphTexture!==null||qt.envMap!==Ft||K.fog===!0&&qt.fog!==gt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==_t.numPlanes||qt.numIntersection!==_t.numIntersection)||qt.vertexAlphas!==Xt||qt.vertexTangents!==$t||qt.morphTargets!==Ct||qt.morphNormals!==Kt||qt.morphColors!==ye||qt.toneMapping!==Ae||qt.morphTargetsCount!==re)&&(Te=!0):(Te=!0,qt.__version=K.version);let cn=qt.currentProgram;Te===!0&&(cn=Ln(K,W,Y));let Ki=!1,gn=!1,yr=!1;const pe=cn.getUniforms(),je=qt.uniforms;if(Ut.useProgram(cn.program)&&(Ki=!0,gn=!0,yr=!0),K.id!==b&&(b=K.id,gn=!0),Ki||g!==E){Ut.buffers.depth.getReversed()?(st.copy(E.projectionMatrix),tg(st),eg(st),pe.setValue(B,"projectionMatrix",st)):pe.setValue(B,"projectionMatrix",E.projectionMatrix),pe.setValue(B,"viewMatrix",E.matrixWorldInverse);const un=pe.map.cameraPosition;un!==void 0&&un.setValue(B,lt.setFromMatrixPosition(E.matrixWorld)),Gt.logarithmicDepthBuffer&&pe.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&pe.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),g!==E&&(g=E,gn=!0,yr=!0)}if(Y.isSkinnedMesh){pe.setOptional(B,Y,"bindMatrix"),pe.setOptional(B,Y,"bindMatrixInverse");const Xe=Y.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),pe.setValue(B,"boneTexture",Xe.boneTexture,w))}Y.isBatchedMesh&&(pe.setOptional(B,Y,"batchingTexture"),pe.setValue(B,"batchingTexture",Y._matricesTexture,w),pe.setOptional(B,Y,"batchingIdTexture"),pe.setValue(B,"batchingIdTexture",Y._indirectTexture,w),pe.setOptional(B,Y,"batchingColorTexture"),Y._colorsTexture!==null&&pe.setValue(B,"batchingColorTexture",Y._colorsTexture,w));const Ze=$.morphAttributes;if((Ze.position!==void 0||Ze.normal!==void 0||Ze.color!==void 0)&&Yt.update(Y,$,cn),(gn||qt.receiveShadow!==Y.receiveShadow)&&(qt.receiveShadow=Y.receiveShadow,pe.setValue(B,"receiveShadow",Y.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(je.envMap.value=Ft,je.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&W.environment!==null&&(je.envMapIntensity.value=W.environmentIntensity),gn&&(pe.setValue(B,"toneMappingExposure",M.toneMappingExposure),qt.needsLights&&ns(je,yr),gt&&K.fog===!0&&Et.refreshFogUniforms(je,gt),Et.refreshMaterialUniforms(je,K,D,z,h.state.transmissionRenderTarget[E.id]),zo.upload(B,Kn(qt),je,w)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(zo.upload(B,Kn(qt),je,w),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&pe.setValue(B,"center",Y.center),pe.setValue(B,"modelViewMatrix",Y.modelViewMatrix),pe.setValue(B,"normalMatrix",Y.normalMatrix),pe.setValue(B,"modelMatrix",Y.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Xe=K.uniformsGroups;for(let un=0,fl=Xe.length;un<fl;un++){const Mr=Xe[un];V.update(Mr,cn),V.bind(Mr,cn)}}return cn}function ns(E,W){E.ambientLightColor.needsUpdate=W,E.lightProbe.needsUpdate=W,E.directionalLights.needsUpdate=W,E.directionalLightShadows.needsUpdate=W,E.pointLights.needsUpdate=W,E.pointLightShadows.needsUpdate=W,E.spotLights.needsUpdate=W,E.spotLightShadows.needsUpdate=W,E.rectAreaLights.needsUpdate=W,E.hemisphereLights.needsUpdate=W}function xr(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(E,W,$){it.get(E.texture).__webglTexture=W,it.get(E.depthTexture).__webglTexture=$;const K=it.get(E);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=$===void 0,K.__autoAllocateDepthBuffer||Pt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,W){const $=it.get(E);$.__webglFramebuffer=W,$.__useDefaultFramebuffer=W===void 0};const is=B.createFramebuffer();this.setRenderTarget=function(E,W=0,$=0){F=E,R=W,P=$;let K=!0,Y=null,gt=!1,Rt=!1;if(E){const Ft=it.get(E);if(Ft.__useDefaultFramebuffer!==void 0)Ut.bindFramebuffer(B.FRAMEBUFFER,null),K=!1;else if(Ft.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(Ft.__hasExternalTextures)w.rebindTextures(E,it.get(E.texture).__webglTexture,it.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ct=E.depthTexture;if(Ft.__boundDepthTexture!==Ct){if(Ct!==null&&it.has(Ct)&&(E.width!==Ct.image.width||E.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}const Xt=E.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(Rt=!0);const $t=it.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray($t[W])?Y=$t[W][$]:Y=$t[W],gt=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?Y=it.get(E).__webglMultisampledFramebuffer:Array.isArray($t)?Y=$t[$]:Y=$t,U.copy(E.viewport),k.copy(E.scissor),N=E.scissorTest}else U.copy(J).multiplyScalar(D).floor(),k.copy(ft).multiplyScalar(D).floor(),N=ut;if($!==0&&(Y=is),Ut.bindFramebuffer(B.FRAMEBUFFER,Y)&&K&&Ut.drawBuffers(E,Y),Ut.viewport(U),Ut.scissor(k),Ut.setScissorTest(N),gt){const Ft=it.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ft.__webglTexture,$)}else if(Rt){const Ft=it.get(E.texture),Xt=W;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ft.__webglTexture,$,Xt)}else if(E!==null&&$!==0){const Ft=it.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ft.__webglTexture,$)}b=-1},this.readRenderTargetPixels=function(E,W,$,K,Y,gt,Rt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=it.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Rt!==void 0&&(Lt=Lt[Rt]),Lt){Ut.bindFramebuffer(B.FRAMEBUFFER,Lt);try{const Ft=E.texture,Xt=Ft.format,$t=Ft.type;if(!Gt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=E.width-K&&$>=0&&$<=E.height-Y&&B.readPixels(W,$,K,Y,te.convert(Xt),te.convert($t),gt)}finally{const Ft=F!==null?it.get(F).__webglFramebuffer:null;Ut.bindFramebuffer(B.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(E,W,$,K,Y,gt,Rt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=it.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Rt!==void 0&&(Lt=Lt[Rt]),Lt){const Ft=E.texture,Xt=Ft.format,$t=Ft.type;if(!Gt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=E.width-K&&$>=0&&$<=E.height-Y){Ut.bindFramebuffer(B.FRAMEBUFFER,Lt);const Ct=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ct),B.bufferData(B.PIXEL_PACK_BUFFER,gt.byteLength,B.STREAM_READ),B.readPixels(W,$,K,Y,te.convert(Xt),te.convert($t),0);const Kt=F!==null?it.get(F).__webglFramebuffer:null;Ut.bindFramebuffer(B.FRAMEBUFFER,Kt);const ye=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Q_(B,ye,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ct),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,gt),B.deleteBuffer(Ct),B.deleteSync(ye),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,W=null,$=0){E.isTexture!==!0&&(Ts("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1]);const K=Math.pow(2,-$),Y=Math.floor(E.image.width*K),gt=Math.floor(E.image.height*K),Rt=W!==null?W.x:0,Lt=W!==null?W.y:0;w.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,$,0,0,Rt,Lt,Y,gt),Ut.unbindTexture()};const oa=B.createFramebuffer(),rs=B.createFramebuffer();this.copyTextureToTexture=function(E,W,$=null,K=null,Y=0,gt=null){E.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,E=arguments[1],W=arguments[2],gt=arguments[3]||0,$=null),gt===null&&(Y!==0?(Ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),gt=Y,Y=0):gt=0);let Rt,Lt,Ft,Xt,$t,Ct,Kt,ye,Ae;const Me=E.isCompressedTexture?E.mipmaps[gt]:E.image;if($!==null)Rt=$.max.x-$.min.x,Lt=$.max.y-$.min.y,Ft=$.isBox3?$.max.z-$.min.z:1,Xt=$.min.x,$t=$.min.y,Ct=$.isBox3?$.min.z:0;else{const Ze=Math.pow(2,-Y);Rt=Math.floor(Me.width*Ze),Lt=Math.floor(Me.height*Ze),E.isDataArrayTexture?Ft=Me.depth:E.isData3DTexture?Ft=Math.floor(Me.depth*Ze):Ft=1,Xt=0,$t=0,Ct=0}K!==null?(Kt=K.x,ye=K.y,Ae=K.z):(Kt=0,ye=0,Ae=0);const re=te.convert(W.format),qt=te.convert(W.type);let We;W.isData3DTexture?(w.setTexture3D(W,0),We=B.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(w.setTexture2DArray(W,0),We=B.TEXTURE_2D_ARRAY):(w.setTexture2D(W,0),We=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,W.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,W.unpackAlignment);const Te=B.getParameter(B.UNPACK_ROW_LENGTH),cn=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ki=B.getParameter(B.UNPACK_SKIP_PIXELS),gn=B.getParameter(B.UNPACK_SKIP_ROWS),yr=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Me.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Me.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Xt),B.pixelStorei(B.UNPACK_SKIP_ROWS,$t),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Ct);const pe=E.isDataArrayTexture||E.isData3DTexture,je=W.isDataArrayTexture||W.isData3DTexture;if(E.isDepthTexture){const Ze=it.get(E),Xe=it.get(W),un=it.get(Ze.__renderTarget),fl=it.get(Xe.__renderTarget);Ut.bindFramebuffer(B.READ_FRAMEBUFFER,un.__webglFramebuffer),Ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,fl.__webglFramebuffer);for(let Mr=0;Mr<Ft;Mr++)pe&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,it.get(E).__webglTexture,Y,Ct+Mr),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,it.get(W).__webglTexture,gt,Ae+Mr)),B.blitFramebuffer(Xt,$t,Rt,Lt,Kt,ye,Rt,Lt,B.DEPTH_BUFFER_BIT,B.NEAREST);Ut.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Y!==0||E.isRenderTargetTexture||it.has(E)){const Ze=it.get(E),Xe=it.get(W);Ut.bindFramebuffer(B.READ_FRAMEBUFFER,oa),Ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,rs);for(let un=0;un<Ft;un++)pe?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ze.__webglTexture,Y,Ct+un):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ze.__webglTexture,Y),je?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Xe.__webglTexture,gt,Ae+un):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Xe.__webglTexture,gt),Y!==0?B.blitFramebuffer(Xt,$t,Rt,Lt,Kt,ye,Rt,Lt,B.COLOR_BUFFER_BIT,B.NEAREST):je?B.copyTexSubImage3D(We,gt,Kt,ye,Ae+un,Xt,$t,Rt,Lt):B.copyTexSubImage2D(We,gt,Kt,ye,Xt,$t,Rt,Lt);Ut.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else je?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(We,gt,Kt,ye,Ae,Rt,Lt,Ft,re,qt,Me.data):W.isCompressedArrayTexture?B.compressedTexSubImage3D(We,gt,Kt,ye,Ae,Rt,Lt,Ft,re,Me.data):B.texSubImage3D(We,gt,Kt,ye,Ae,Rt,Lt,Ft,re,qt,Me):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,gt,Kt,ye,Rt,Lt,re,qt,Me.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,gt,Kt,ye,Me.width,Me.height,re,Me.data):B.texSubImage2D(B.TEXTURE_2D,gt,Kt,ye,Rt,Lt,re,qt,Me);B.pixelStorei(B.UNPACK_ROW_LENGTH,Te),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,cn),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ki),B.pixelStorei(B.UNPACK_SKIP_ROWS,gn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,yr),gt===0&&W.generateMipmaps&&B.generateMipmap(We),Ut.unbindTexture()},this.copyTextureToTexture3D=function(E,W,$=null,K=null,Y=0){return E.isTexture!==!0&&(Ts("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,K=arguments[1]||null,E=arguments[2],W=arguments[3],Y=arguments[4]||0),Ts('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,W,$,K,Y)},this.initRenderTarget=function(E){it.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),Ut.unbindTexture()},this.resetState=function(){R=0,P=0,F=null,Ut.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=we._getDrawingBufferColorSpace(t),e.unpackColorSpace=we._getUnpackColorSpace()}}const xh={type:"change"},Zu={type:"start"},Sp={type:"end"},Po=new ku,yh=new ar,NS=Math.cos(70*Rr.DEG2RAD),$e=new H,wn=2*Math.PI,Pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},rc=1e-6;class FS extends Kg{constructor(t,e=null){super(t,e),this.state=Pe.NONE,this.enabled=!0,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ls.ROTATE,MIDDLE:Ls.DOLLY,RIGHT:Ls.PAN},this.touches={ONE:ws.ROTATE,TWO:ws.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new Jr,this._lastTargetPosition=new H,this._quat=new Jr().setFromUnitVectors(t.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new qd,this._sphericalDelta=new qd,this._scale=1,this._panOffset=new H,this._rotateStart=new At,this._rotateEnd=new At,this._rotateDelta=new At,this._panStart=new At,this._panEnd=new At,this._panDelta=new At,this._dollyStart=new At,this._dollyEnd=new At,this._dollyDelta=new At,this._dollyDirection=new H,this._mouse=new At,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=BS.bind(this),this._onPointerDown=OS.bind(this),this._onPointerUp=kS.bind(this),this._onContextMenu=YS.bind(this),this._onMouseWheel=VS.bind(this),this._onKeyDown=GS.bind(this),this._onTouchStart=WS.bind(this),this._onTouchMove=XS.bind(this),this._onMouseDown=zS.bind(this),this._onMouseMove=HS.bind(this),this._interceptControlDown=qS.bind(this),this._interceptControlUp=jS.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(xh),this.update(),this.state=Pe.NONE}update(t=null){const e=this.object.position;$e.copy(e).sub(this.target),$e.applyQuaternion(this._quat),this._spherical.setFromVector3($e),this.autoRotate&&this.state===Pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=wn:i>Math.PI&&(i-=wn),r<-Math.PI?r+=wn:r>Math.PI&&(r-=wn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if($e.setFromSpherical(this._spherical),$e.applyQuaternion(this._quatInverse),e.copy(this.target).add($e),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=$e.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new H(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new H(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=$e.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Po.origin.copy(this.object.position),Po.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Po.direction))<NS?this.object.lookAt(this.target):(yh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Po.intersectPlane(yh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>rc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>rc||this._lastTargetPosition.distanceToSquared(this.target)>rc?(this.dispatchEvent(xh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?wn/60*this.autoRotateSpeed*t:wn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){$e.setFromMatrixColumn(e,0),$e.multiplyScalar(-t),this._panOffset.add($e)}_panUp(t,e){this.screenSpacePanning===!0?$e.setFromMatrixColumn(e,1):($e.setFromMatrixColumn(e,0),$e.crossVectors(this.object.up,$e)),$e.multiplyScalar(t),this._panOffset.add($e)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;$e.copy(r).sub(this.target);let s=$e.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(wn*this._rotateDelta.x/e.clientHeight),this._rotateUp(wn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(wn*this._rotateDelta.x/e.clientHeight),this._rotateUp(wn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new At,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function OS(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function BS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function kS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Sp),this.state=Pe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function zS(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ls.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Pe.DOLLY;break;case Ls.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Pe.ROTATE}break;case Ls.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Pe.PAN}break;default:this.state=Pe.NONE}this.state!==Pe.NONE&&this.dispatchEvent(Zu)}function HS(n){switch(this.state){case Pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function VS(n){this.enabled===!1||this.enableZoom===!1||this.state!==Pe.NONE||(n.preventDefault(),this.dispatchEvent(Zu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Sp))}function GS(n){this.enabled!==!1&&this._handleKeyDown(n)}function WS(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ws.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Pe.TOUCH_ROTATE;break;case ws.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Pe.TOUCH_PAN;break;default:this.state=Pe.NONE}break;case 2:switch(this.touches.TWO){case ws.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Pe.TOUCH_DOLLY_PAN;break;case ws.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Pe.TOUCH_DOLLY_ROTATE;break;default:this.state=Pe.NONE}break;default:this.state=Pe.NONE}this.state!==Pe.NONE&&this.dispatchEvent(Zu)}function XS(n){switch(this._trackPointer(n),this.state){case Pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Pe.NONE}}function YS(n){this.enabled!==!1&&n.preventDefault()}function qS(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function jS(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ZS=15780016;function $S(n){let t;const[e,i,r]=n.size;switch(n.kind){case"sphere":t=new Qo(1,32,24),t.scale(e,i,r);break;case"cylinder":t=new Yu(e,i,r,32,1);break;case"capsule":t=new Xu(e,Math.max(.01,r-2*e),8,20);break;case"box":t=new ia(e,i,r);break;default:t=new Qo(e,24,18)}const s=new pp({color:ZS,roughness:.82,metalness:0,transparent:!0,opacity:1}),a=new kn(t,s);return a.name=n.id,a.position.set(...n.pos),a}function KS(n){const t=n.clientWidth||800,e=n.clientHeight||600,i=new Eg;i.background=new ve(1909808);const r=new qn(42,t/e,.05,50);r.position.set(0,1,3.1);const s=new US({antialias:!0,preserveDrawingBuffer:!0});s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.setSize(t,e),s.outputColorSpace=An,n.appendChild(s.domElement),i.add(new Yg(16777215,4871528,1.15));const a=new Wd(16777215,1.6);a.position.set(1.6,2.6,2.2),i.add(a);const o=new Wd(12572927,.7);o.position.set(-1.8,1.4,-2),i.add(o);const l=new FS(r,s.domElement);l.target.set(0,.92,0),l.enableDamping=!0,l.dampingFactor=.08,l.minDistance=1.1,l.maxDistance=6,l.update();const c=new Br;i.add(c);const u=new Map;for(const R of Ra){const P=$S(R);P.userData.partId=R.id,u.set(R.id,P),c.add(P)}const d=new kn(new ul(1.1,48),new pp({color:2765634,roughness:1}));d.rotation.x=-Math.PI/2,d.position.y=-.005,i.add(d);const p=new Br;c.add(p);const f=new $g,v=new At;let _=0;function m(){_=requestAnimationFrame(m),l.update(),s.render(i,r)}m();function h(){const R=n.clientWidth,P=n.clientHeight;!R||!P||(r.aspect=R/P,r.updateProjectionMatrix(),s.setSize(R,P))}const S=new ResizeObserver(h);S.observe(n);function T(){cancelAnimationFrame(_),S.disconnect(),l.dispose(),s.dispose(),i.traverse(R=>{R.geometry&&R.geometry.dispose(),R.material&&(Array.isArray(R.material)?R.material:[R.material]).forEach(F=>F.dispose())}),s.domElement.remove()}function M(R,P){const F=s.domElement.getBoundingClientRect();v.x=(R-F.left)/F.width*2-1,v.y=-((P-F.top)/F.height)*2+1,f.setFromCamera(v,r);const b=f.intersectObjects([...u.values()],!1);if(!b.length)return null;const g=b[0],U=g.object.userData.partId,k=g.object.worldToLocal(g.point.clone()),N=Ra.find(Z=>Z.id===U),[A,C,O]=N.size;let z,D;N.kind==="sphere"?(z=Rr.clamp(k.x/(A||1)/2+.5,0,1),D=Rr.clamp(k.y/(C||1)/2+.5,0,1)):N.kind==="box"?(z=Rr.clamp(k.x/(A||1)+.5,0,1),D=Rr.clamp(k.y/(C||1)+.5,0,1)):(z=Rr.clamp((Math.atan2(k.z,k.x)+Math.PI)/(Math.PI*2),0,1),D=Rr.clamp(k.y/(O||1)+.5,0,1));const X=g.face.normal.clone().transformDirection(g.object.matrixWorld);return{partId:U,point:g.point.clone(),normal:X,u:+z.toFixed(4),v:+D.toFixed(4),side:X.z>=0?"front":"back"}}function I(R,P,F){const b=u.get(R);if(!b)return null;const g=Ra.find(D=>D.id===R),[U,k,N]=g.size,A=new H;if(g.kind==="sphere")A.set((P-.5)*2*U,(F-.5)*2*k,N).normalize(),A.set(A.x*U,A.y*k,A.z*N);else if(g.kind==="box")A.set((P-.5)*U,(F-.5)*k,N/2);else{const D=P*Math.PI*2-Math.PI;A.set(Math.cos(D)*U,(F-.5)*N,Math.sin(D)*U)}const C=b.localToWorld(A.clone()),O=new H(0,0,1);g.kind==="sphere"&&O.copy(A.clone().normalize());const z=O.transformDirection(b.matrixWorld);return{point:C,normal:z,side:z.z>=0?"front":"back"}}return{scene:i,camera:r,renderer:s,controls:l,group:c,partMeshes:u,markerLayer:p,pickSurface:M,surfacePoint:I,setOpacity(R){for(const P of u.values())P.material.opacity=R},frame(R){R==="front"?r.position.set(0,1,3.1):R==="back"?r.position.set(0,1,-3.1):R==="left"?r.position.set(-3.1,1,0):R==="right"&&r.position.set(3.1,1,0),l.target.set(0,.92,0),l.update()},exportPNG(){return s.render(i,r),s.domElement.toDataURL("image/png")},resize:h,dispose:T}}function JS(n,t){const e=new Br,i=new kn(new ul(.014,24),new Ko({color:new ve(t),side:ri,depthTest:!1}));i.renderOrder=999,e.add(i);const r=new kn(new qu(.0145,.0175,24),new Ko({color:16777215,side:ri,depthTest:!1,transparent:!0}));r.renderOrder=1e3,e.add(r);const s=document.createElement("canvas");s.width=256,s.height=96;const a=s.getContext("2d");a.fillStyle="rgba(10,16,24,0.85)",QS(a,4,18,248,60,12),a.fill(),a.font="bold 40px system-ui, sans-serif",a.fillStyle="#ffffff",a.textAlign="center",a.textBaseline="middle",a.fillText(n.length>9?"…"+n.slice(-8):n,128,49);const o=new Cg(s);o.colorSpace=An;const l=new wg(new op({map:o,depthTest:!1,transparent:!0}));return l.scale.set(.11,.041,1),l.position.y=.032,l.renderOrder=1001,e.add(l),e.userData.tex=o,e}function QS(n,t,e,i,r,s){n.beginPath(),n.moveTo(t+s,e),n.arcTo(t+i,e,t+i,e+r,s),n.arcTo(t+i,e+r,t,e+r,s),n.arcTo(t,e+r,t,e,s),n.arcTo(t,e,t+i,e,s),n.closePath()}function tb(n){n.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>{i.map&&i.map.dispose(),i.dispose()})})}var eb=ht('<span class="badge info">定位模式：点击模型表面放置新痣</span>'),nb=ht('<div class="viewer-wrap svelte-1rp08of"><div class="toolbar svelte-1rp08of"><button class="sm">正面</button> <button class="sm">背面</button> <button class="sm">左侧</button> <button class="sm">右侧</button> <span class="sep svelte-1rp08of"></span> <label class="inline small muted svelte-1rp08of">模型透明度 <input type="range" min="0.35" max="1" step="0.05" class="svelte-1rp08of"/></label> <span class="sep svelte-1rp08of"></span> <button class="sm">导出痣图 PNG</button> <!> <span class="spacer svelte-1rp08of"></span> <span class="small muted"><span class="dot green"></span>普通</span> <span class="small muted"><span class="dot yellow"></span>标黄</span> <span class="small muted"><span class="dot blue"></span>选中</span> <span class="small muted"><span class="dot gray"></span>已切除</span></div> <div class="canvas-host svelte-1rp08of"></div></div>');function ib(n,t){En(t,!0);let e=ae(null),i=null,r=null,s=[],a=De(t,"moles",19,()=>[]),o=De(t,"findings",19,()=>[]),l=De(t,"flaggedIds",27,()=>rn([])),c=De(t,"selectedId",15,null),u=De(t,"pickMode",3,!1),d=De(t,"opacity",7,1),p=De(t,"onpick",3,null);const f={flag:15774761,selected:5213439,normal:3650156,removed:7044245};function v(A){return A.removed?f.removed:A.id===c()?f.selected:l().includes(A.id)?f.flag:f.normal}function _(){if(i){for(const A of s)i.markerLayer.remove(A.group),tb(A.group);s=[];for(const A of a()){const C=i.surfacePoint(A.partId,A.u,A.v);if(!C)continue;const O=JS(A.code,"#"+new ve(v(A)).getHexString());O.position.copy(C.point).addScaledVector(C.normal,.004),O.quaternion.setFromUnitVectors(new H(0,0,1),C.normal),O.userData.moleId=A.id,i.markerLayer.add(O),s.push({group:O,moleId:A.id})}}}Zr(()=>{a(),o(),l(),c(),_()}),Zr(()=>{i==null||i.setOpacity(d())}),Tu(()=>{i=KS(x(e)),_();const A=i.renderer.domElement;A.addEventListener("pointerdown",C=>{r={x:C.clientX,y:C.clientY}}),A.addEventListener("pointerup",C=>{if(!r)return;const O=Math.hypot(C.clientX-r.x,C.clientY-r.y);if(r=null,O>6)return;const z=i.pickSurface(C.clientX,C.clientY);if(z)if(u()&&p())p()(z);else{const D=s.find(X=>X.group.position.distanceTo(z.point)<.03);D&&c(D.moleId)}})}),wu(()=>{i==null||i.dispose(),i=null});function m(A){i.frame(A)}function h(){const A=i.exportPNG();fetch(A).then(C=>C.blob()).then(C=>qo(C,`三维痣图_${new Date().toISOString().slice(0,10)}.png`))}var S=nb(),T=j(S),M=j(T),I=L(M,2),R=L(I,2),P=L(R,2),F=L(P,4),b=L(j(F)),g=L(F,4),U=L(g,2);{var k=A=>{var C=eb();at(A,C)};kt(U,A=>{u()&&A(k)})}var N=L(T,2);Pf(N,A=>St(e,A),()=>x(e)),Bt("click",M,()=>m("front")),Bt("click",I,()=>m("back")),Bt("click",R,()=>m("left")),Bt("click",P,()=>m("right")),ze(b,d),Bt("click",g,h),at(n,S),Tn()}$n(["click"]);var rb=Ef('<rect rx="6" stroke-opacity="0.55" stroke-dasharray="4 3"><title> </title></rect>'),sb=Ef('<g class="mole-g svelte-1fp4den" role="button"><circle stroke="#0f1622" stroke-width="1.5"></circle><text class="mole-label svelte-1fp4den"> </text><title> </title></g>'),ab=ht('<div class="small muted">提示：在三维模型上点击表面完成精确定位，平面图同步显示。</div>'),ob=ht('<div class="flat-map card"><div class="row" style="justify-content:space-between"><h3 style="margin:0"> </h3> <div class="pill-tabs" style="margin:0"><button>前位</button> <button>后位</button></div></div> <svg class="map-svg svelte-1fp4den"><ellipse cy="46" rx="34" ry="34" fill="#22304a" stroke="#3a4d6e"></ellipse><rect y="78" width="32" height="24" rx="8" fill="#22304a" stroke="#3a4d6e"></rect><path fill="#1b2740" stroke="#3a4d6e" stroke-width="1.5"></path><!><!></svg> <!></div>');function lb(n,t){En(t,!0);let e=De(t,"moles",19,()=>[]),i=De(t,"zones",19,()=>[]),r=De(t,"flaggedIds",19,()=>[]),s=De(t,"selectedId",15,null),a=De(t,"onpick",3,null),o=ae("front");const c=480/2;function u(D){var mt;const X=(mt=fd[D.partId])==null?void 0:mt[x(o)];if(!X)return null;const[Z,J]=X.x,[ft,ut]=X.y,G=Ra.find(lt=>lt.id===D.partId);let nt;G.kind==="cylinder"||G.kind==="capsule"?(nt=D.partId.endsWith("L")||J<0?.78-D.u*.5:.22+D.u*.5,nt=Math.min(.95,Math.max(.05,nt))):nt=D.u;const pt=Z+(J-Z)*nt+c,st=ut-(ut-ft)*D.v;return{x:pt,y:st}}const d=[{zone:"HF",sides:["front"],x:[-26,26],y:[18,70]},{zone:"HL",sides:["back"],x:[-26,26],y:[18,70]},{zone:"NF",sides:["front"],x:[-15,15],y:[80,100]},{zone:"NL",sides:["back"],x:[-15,15],y:[80,100]},{zone:"SH",sides:["front","back"],x:[-104,104],y:[104,138]},{zone:"CH",sides:["front"],x:[-72,72],y:[106,178]},{zone:"AB",sides:["front"],x:[-68,68],y:[178,246]},{zone:"BK",sides:["back"],x:[-72,72],y:[106,190]},{zone:"LP",sides:["back"],x:[-68,68],y:[190,246]},{zone:"PV",sides:["front","back"],x:[-60,60],y:[248,290]},{zone:"UA",sides:["front","back"],x:null,parts:[["upperArmL",-1],["upperArmR",1]]},{zone:"EL",sides:["front","back"],x:null,parts:[["elbowL",-1],["elbowR",1]]},{zone:"FA",sides:["front","back"],x:null,parts:[["forearmL",-1],["forearmR",1]]},{zone:"HD",sides:["front","back"],x:null,parts:[["handL",-1],["handR",1]]},{zone:"TH",sides:["front","back"],x:null,parts:[["thighL",-1],["thighR",1]]},{zone:"KN",sides:["front","back"],x:null,parts:[["kneeL",-1],["kneeR",1]]},{zone:"LG",sides:["front","back"],x:null,parts:[["lowerLegL",-1],["lowerLegR",1]]},{zone:"FT",sides:["front","back"],x:null,parts:[["footL",-1],["footR",1]]}];function p(D){const X=d.find(Z=>Z.zone===D);return!X||!X.sides.includes(x(o))?[]:X.x?[{x:X.x.map(Z=>Z+c),y:X.y}]:X.parts.map(([Z])=>{const J=fd[Z][x(o)];return{x:[J.x[0]+c,J.x[1]+c],y:J.y}})}function f(D){var X;return((X=i().find(Z=>Z.id===D))==null?void 0:X.color)||"#33445c"}function v(D){var X;return((X=i().find(Z=>Z.id===D))==null?void 0:X.name)||D}function _(D){return r().includes(D)}function m(){return e().map(D=>({m:D,pos:u(D)})).filter(D=>D.pos)}var h=ob(),S=j(h),T=j(S),M=yt(T),I=L(T,2),R=j(I);let P;var F=L(R,2);let b;var g=L(S,2);qe(g,"viewBox","0 0 480 470");var U=j(g);qe(U,"cx",c);var k=L(U);qe(k,"x",c-16);var N=L(k);qe(N,"d",`M ${c-76} 104
          Q ${c-96} 112 ${c-104} 138
          L ${c-116} 372 Q ${c-114} 386 ${c-100} 388
          L ${c-90} 388 Q ${c-86} 386 ${c-86} 372
          L ${c-78} 150
          L ${c-62} 296 L ${c-60} 452 L ${c-16} 452
          L ${c-12} 296 L {CX + 12} 296 L {CX + 16} 452
          L {CX + 60} 452 L {CX + 62} 296 L {CX + 78} 150
          L {CX + 86} 372 Q {CX + 86} 386 ${c+90} 388
          L {CX + 100} 388 Q ${c+114} 386 ${c+116} 372
          L {CX + 104} 138 Q ${c+96} 112 ${c+76} 104 Z`);var A=L(N);Oe(A,17,()=>d,D=>D.zone,(D,X)=>{var Z=Yo(),J=Ue(Z);Oe(J,19,()=>p(x(X).zone),(ft,ut)=>x(X).zone+ut,(ft,ut)=>{const G=ge(()=>i().find(mt=>mt.id===x(X).zone));var nt=rb(),pt=j(nt),st=yt(pt);zt((mt,lt,vt)=>{var wt;qe(nt,"x",x(ut).x[0]),qe(nt,"y",x(ut).y[0]),qe(nt,"width",x(ut).x[1]-x(ut).x[0]),qe(nt,"height",x(ut).y[1]-x(ut).y[0]),qe(nt,"fill",mt),qe(nt,"fill-opacity",((wt=x(G))==null?void 0:wt.active)===!1?.06:.16),qe(nt,"stroke",lt),dt(st,`${vt??""}（${x(X).zone??""}）`)},[()=>f(x(X).zone),()=>f(x(X).zone),()=>v(x(X).zone)]),at(ft,nt)}),at(D,Z)});var C=L(A);Oe(C,17,m,({m:D,pos:X})=>D.id,(D,X)=>{let Z=()=>x(X).m,J=()=>x(X).pos;var ft=sb(),ut=j(ft),G=L(ut),nt=yt(G,!0),pt=L(G),st=yt(pt);zt((mt,lt)=>{qe(ut,"cx",J().x),qe(ut,"cy",J().y),qe(ut,"r",Z().id===s()?7:5),qe(ut,"fill",mt),qe(G,"x",J().x+8),qe(G,"y",J().y+3.5),dt(nt,Z().code),dt(st,`${Z().code??""}${lt??""}`)},[()=>Z().removed?"#6b7c95":_(Z().id)?"#f0b429":"#37b26c",()=>_(Z().id)?"（标黄）":""]),Bt("click",ft,()=>s(Z().id)),at(D,ft)});var O=L(g,2);{var z=D=>{var X=ab();at(D,X)};kt(O,D=>{a()&&D(z)})}zt(()=>{dt(M,`平面展开痣图（${x(o)==="front"?"前位":"后位"}）`),P=Ve(R,1,"sm",null,P,{active:x(o)==="front"}),b=Ve(F,1,"sm",null,b,{active:x(o)==="back"})}),Bt("click",R,()=>St(o,"front")),Bt("click",F,()=>St(o,"back")),at(n,h),Tn()}$n(["click"]);var cb=ht('<img alt="皮肤镜照片" class="thumb lg"/>'),ub=ht('<div class="placeholder thumb lg svelte-3mto48">未上传</div>'),db=ht('<button class="sm danger">移除照片</button> <div class="small muted break svelte-3mto48"> </div>',1),hb=ht('<div class="field"><label> </label> <div class="photo-box svelte-3mto48"><!> <div class="photo-actions svelte-3mto48"><input type="file" accept="image/*" capture="environment"/> <!> <div class="small muted">照片仅以 Blob 形式存入本浏览器 IndexedDB。</div></div></div></div>');function fb(n,t){En(t,!0);let e=De(t,"blob",15,null),i=De(t,"name",15,""),r=De(t,"label",3,"皮肤镜照片"),s=ae(null),a=ae(null),o=null;Zr(()=>{o&&URL.revokeObjectURL(o),o=e()?URL.createObjectURL(e()):null,St(s,o,!0)}),wu(()=>{o&&URL.revokeObjectURL(o)});function l(I){var P;const R=(P=I.target.files)==null?void 0:P[0];R&&(e(R),i(R.name))}function c(){e(null),i(""),x(a)&&(x(a).value="")}var u=hb(),d=j(u),p=yt(d,!0),f=L(d,2),v=j(f);{var _=I=>{var R=cb();zt(()=>qe(R,"src",x(s))),at(I,R)},m=I=>{var R=ub();at(I,R)};kt(v,I=>{x(s)?I(_):I(m,-1)})}var h=L(v,2),S=j(h);Pf(S,I=>St(a,I),()=>x(a));var T=L(S,2);{var M=I=>{var R=db(),P=Ue(R),F=L(P,2),b=yt(F,!0);zt(()=>dt(b,i())),Bt("click",P,c),at(I,R)};kt(T,I=>{e()&&I(M)})}zt(()=>dt(p,r())),Bt("change",S,l),at(n,u),Tn()}$n(["change","click"]);var sc=ht("<option> </option>"),pb=ht("<button>取消</button>"),mb=ht('<div class="grid2"><div class="field"><label>直径 (mm) *</label> <input type="number" step="0.1" min="0.1" placeholder="如 3.5"/></div> <div class="field"><label>拍摄角度模板</label> <select><option>— 未选择 —</option><!></select></div> <div class="field"><label>边缘形态</label> <select></select></div> <div class="field"><label>色素网络形态</label> <select></select></div></div> <div class="field"><label>记录备注</label> <textarea rows="2" placeholder="皮损描述、症状等"></textarea></div> <!> <div class="row" style="justify-content:flex-end;gap:8px;margin-top:8px"><!> <button class="primary"> </button></div>',1);function vb(n,t){var U;En(t,!0);let e=De(t,"initial",19,()=>({})),i=De(t,"angles",19,()=>[]),r=De(t,"submitLabel",3,"保存测量记录");const s=rn({diameterMm:e().diameterMm??"",edgeType:e().edgeType??hd[0],networkType:e().networkType??dd[0],angleId:e().angleId??(((U=i().find(k=>k.active))==null?void 0:U.id)||""),note:e().note??"",photoBlob:e().photoBlob??null,photoName:e().photoName??""});function a(){s.diameterMm===""||+s.diameterMm<=0||t.onsubmit({...s,diameterMm:+s.diameterMm})}var o=mb(),l=Ue(o),c=j(l),u=L(j(c),2),d=L(c,2),p=L(j(d),2),f=j(p);f.value=f.__value="";var v=L(f);Oe(v,17,()=>i().filter(k=>k.active),k=>k.id,(k,N)=>{var A=sc(),C=yt(A,!0),O={};zt(()=>{dt(C,x(N).name),O!==(O=x(N).id)&&(A.value=(A.__value=O)??"")}),at(k,A)}),Ti(p);var _=L(d,2),m=L(j(_),2);Oe(m,20,()=>hd,k=>k,(k,N)=>{var A=sc(),C=yt(A,!0),O={};zt(()=>{dt(C,N),O!==(O=N)&&(A.__value=O)}),at(k,A)}),Ti(m);var h=L(_,2),S=L(j(h),2);Oe(S,20,()=>dd,k=>k,(k,N)=>{var A=sc(),C=yt(A,!0),O={};zt(()=>{dt(C,N),O!==(O=N)&&(A.__value=O)}),at(k,A)}),Ti(S);var T=L(l,2),M=L(j(T),2),I=L(T,2);fb(I,{get blob(){return s.photoBlob},set blob(k){s.photoBlob=k},get name(){return s.photoName},set name(k){s.photoName=k}});var R=L(I,2),P=j(R);{var F=k=>{var N=pb();Bt("click",N,function(...A){var C;(C=t.oncancel)==null||C.apply(this,A)}),at(k,N)};kt(P,k=>{t.oncancel&&k(F)})}var b=L(P,2),g=yt(b,!0);zt(()=>{b.disabled=s.diameterMm===""||+s.diameterMm<=0,dt(g,r())}),ze(u,()=>s.diameterMm,k=>s.diameterMm=k),Wi(p,()=>s.angleId,k=>s.angleId=k),Wi(m,()=>s.edgeType,k=>s.edgeType=k),Wi(S,()=>s.networkType,k=>s.networkType=k),ze(M,()=>s.note,k=>s.note=k),Bt("click",b,a),at(n,o),Tn()}$n(["click"]);var _b=ht('<div class="flag-banner svelte-ml3c6p"> </div>'),gb=ht('<div class="ok-banner svelte-ml3c6p">✓ 与基线比较未见触发标黄的变化（阈值：直径增加 &gt;1mm 或新发边缘不规则）</div>'),xb=ht('<div class="muted small">本次复诊尚未拍摄该部位。</div>'),yb=ht('<img class="cmp-img svelte-ml3c6p" alt="基线皮肤镜照片"/>'),Mb=ht('<div class="cmp-img empty svelte-ml3c6p">无基线照片</div>'),Sb=ht('<dl class="metrics svelte-ml3c6p"><div class="svelte-ml3c6p"><dt class="svelte-ml3c6p">直径</dt><dd class="svelte-ml3c6p"> </dd></div> <div class="svelte-ml3c6p"><dt class="svelte-ml3c6p">边缘</dt><dd class="svelte-ml3c6p"> </dd></div> <div class="svelte-ml3c6p"><dt class="svelte-ml3c6p">色素网络</dt><dd class="svelte-ml3c6p"> </dd></div></dl>'),bb=ht('<img class="cmp-img svelte-ml3c6p" alt="复诊皮肤镜照片"/>'),Eb=ht('<div class="cmp-img empty svelte-ml3c6p">待采集</div>'),Tb=ht('<span class="small"> </span>'),wb=ht('<dl class="metrics svelte-ml3c6p"><div class="svelte-ml3c6p"><dt class="svelte-ml3c6p">直径</dt> <dd> <!></dd></div> <div class="svelte-ml3c6p"><dt class="svelte-ml3c6p">边缘</dt><dd> </dd></div> <div class="svelte-ml3c6p"><dt class="svelte-ml3c6p">色素网络</dt><dd class="svelte-ml3c6p"> </dd></div></dl>'),Ab=ht('<div class="small muted"> </div>'),Rb=ht('<div class="judged small svelte-ml3c6p">判读：<strong> </strong> <br/> </div>'),Cb=ht('<div class="compare svelte-ml3c6p"><!> <div class="photo-grid svelte-ml3c6p"><figure class="svelte-ml3c6p"><figcaption class="small muted svelte-ml3c6p"> </figcaption> <!> <!></figure> <figure class="svelte-ml3c6p"><figcaption class="small muted svelte-ml3c6p"> </figcaption> <!> <!></figure></div> <!> <!></div>');function bp(n,t){En(t,!0);let e=ae(rn({base:null,cur:null}));const i={base:null,cur:null};Zr(()=>{var O,z,D,X;const A=((z=(O=t.row)==null?void 0:O.baseline)==null?void 0:z.photoBlob)||null,C=((X=(D=t.row)==null?void 0:D.current)==null?void 0:X.photoBlob)||null;i.base&&i.base!==A&&URL.revokeObjectURL(i.base),i.cur&&i.cur!==C&&URL.revokeObjectURL(i.cur),i.base=A?URL.createObjectURL(A):null,i.cur=C?URL.createObjectURL(C):null,St(e,{base:i.base,cur:i.cur},!0)}),wu(()=>{i.base&&URL.revokeObjectURL(i.base),i.cur&&URL.revokeObjectURL(i.cur)});var r=Cb(),s=j(r);{var a=A=>{var C=_b(),O=yt(C);zt(z=>dt(O,`⚠ 自动标黄：${z??""}`),[()=>t.row.diff.reasons.join("；")]),at(A,C)},o=A=>{var C=gb();at(A,C)},l=A=>{var C=xb();at(A,C)};kt(s,A=>{var C;(C=t.row.diff)!=null&&C.flagged?A(a):t.row.current?A(o,1):A(l,-1)})}var c=L(s,2),u=j(c),d=j(u),p=yt(d),f=L(d,2);{var v=A=>{var C=yb();zt(()=>qe(C,"src",x(e).base)),at(A,C)},_=A=>{var C=Mb();at(A,C)};kt(f,A=>{x(e).base?A(v):A(_,-1)})}var m=L(f,2);{var h=A=>{var C=Sb(),O=j(C),z=L(j(O)),D=yt(z),X=L(O,2),Z=L(j(X)),J=yt(Z,!0),ft=L(X,2),ut=L(j(ft)),G=yt(ut,!0);zt(()=>{dt(D,`${t.row.baseline.diameterMm??""} mm`),dt(J,t.row.baseline.edgeType),dt(G,t.row.baseline.networkType)}),at(A,C)};kt(m,A=>{t.row.baseline&&A(h)})}var S=L(u,2),T=j(S),M=yt(T),I=L(T,2);{var R=A=>{var C=bb();zt(()=>qe(C,"src",x(e).cur)),at(A,C)},P=A=>{var C=Eb();at(A,C)};kt(I,A=>{x(e).cur?A(R):A(P,-1)})}var F=L(I,2);{var b=A=>{var C=wb(),O=j(C),z=L(j(O),2);let D;var X=j(z),Z=L(X);{var J=lt=>{var vt=Tb(),wt=yt(vt);zt(xt=>dt(wt,`（${t.row.diff.deltaMm>=0?"+":""}${xt??""}）`),[()=>t.row.diff.deltaMm.toFixed(2)]),at(lt,vt)};kt(Z,lt=>{var vt,wt;((vt=t.row.diff)==null?void 0:vt.deltaMm)!==null&&((wt=t.row.diff)==null?void 0:wt.deltaMm)!==void 0&&lt(J)})}var ft=L(O,2),ut=L(j(ft));let G;var nt=yt(ut,!0),pt=L(ft,2),st=L(j(pt)),mt=yt(st,!0);zt(lt=>{D=Ve(z,1,"svelte-ml3c6p",null,D,{grow:t.row.diff&&t.row.diff.deltaMm>1}),dt(X,`${t.row.current.diameterMm??""} mm `),G=Ve(ut,1,"svelte-ml3c6p",null,G,{grow:lt}),dt(nt,t.row.current.edgeType),dt(mt,t.row.current.networkType)},[()=>{var lt;return(lt=t.row.diff)==null?void 0:lt.reasons.some(vt=>vt.startsWith("边缘"))}]),at(A,C)};kt(F,A=>{t.row.current&&A(b)})}var g=L(c,2);{var U=A=>{var C=Ab(),O=yt(C);zt(()=>dt(O,`复诊备注：${t.row.current.note??""}`)),at(A,C)};kt(g,A=>{var C;(C=t.row.current)!=null&&C.note&&A(U)})}var k=L(g,2);{var N=A=>{var C=Rb(),O=L(j(C)),z=yt(O,!0),D=L(O),X=L(D,2);zt(Z=>{dt(z,{observe:"观察",biopsy:"活检",excise:"切除"}[t.row.judgment.decision]),dt(D,` · ${t.row.judgment.physician??""} · ${Z??""}`),dt(X,` 理由：${t.row.judgment.reason??""}`)},[()=>Mi(t.row.judgment.ts)]),at(A,C)};kt(k,A=>{t.row.judgment&&A(N)})}zt((A,C)=>{dt(p,`基线${A??""}`),dt(M,`本次复诊${C??""}`)},[()=>t.row.baseline?` · ${Mi(t.row.baseline.capturedAt)}`:"",()=>t.row.current?` · ${Mi(t.row.current.capturedAt)}`:""]),at(n,r),Tn()}var Pb=ht('<div class="muted">患者不存在。</div>'),Lb=ht('<span class="badge purple" style="margin-left:8px"> </span>'),Db=ht('<button class="primary">＋ 在体表定位新痣</button>'),Ib=ht('<button class="primary">完成判读并提交主任审核</button>'),Ub=ht('<span class="badge">已切除</span>'),Nb=ht('<span class="badge warn">标黄</span>'),Fb=ht('<span class="badge ok">已记录</span>'),Ob=ht('<span class="badge">待拍</span>'),Bb=ht('<button><div class="row" style="justify-content:space-between;gap:6px"><strong class="mono svelte-1dj0p5k"> </strong> <span class="row" style="gap:4px"><!> <!> <!></span></div> <div class="small muted"> <!></div></button>'),kb=ht('<div class="muted small" style="padding:14px 4px">尚无痣记录，点击「在体表定位新痣」开始建档。</div>'),zb=ht('<button class="sm danger">标记切除</button>'),Hb=ht('<div class="badge ok" style="margin-top:10px">该部位已完成复诊拍摄配对</div>'),Vb=ht('<button class="primary" style="margin-top:10px;width:100%"> </button>'),Gb=ht('<!> <button class="sm" style="margin-top:8px;width:100%">配对有误？重新配对</button>',1),Wb=ht('<div class="badge">该痣本次复诊无记录</div>'),Xb=ht("<button> </button>"),Yb=ht('<div class="small muted" style="margin-top:8px"> </div>'),qb=ht('<div class="field"><label>处置决定</label> <div class="decision-row svelte-1dj0p5k"></div></div> <div class="field"><label>判读理由 *</label> <textarea rows="3" placeholder="结合直径变化、边缘与色素网络给出理由"></textarea></div> <button class="primary"> </button> <!>',1),jb=ht('<div class="judge-box svelte-1dj0p5k"><h4 style="margin:12px 0 8px">医师判读</h4> <!></div>'),Zb=ht("<!> <!> <!>",1),$b=ht('<div class="badge ok" style="margin-top:10px"> </div>'),Kb=ht('<button class="primary" style="margin-top:10px;width:100%">录入皮肤镜记录</button>'),Jb=ht('<div class="card"><h3 class="row" style="justify-content:space-between"><span class="mono svelte-1dj0p5k"> </span> <!></h3> <div class="small muted" style="line-height:1.9"> <br/> </div> <!></div>'),Qb=ht('<div class="ws-head row svelte-1dj0p5k" style="justify-content:space-between"><div><h2 style="margin:0 0 4px"> <!></h2> <div class="small muted"><!> <!></div></div> <div class="row"><!> <!></div></div> <div class="ws-grid svelte-1dj0p5k"><div class="viewer-col svelte-1dj0p5k"><div class="pill-tabs"><button>三维体表模型</button> <button>平面展开图</button></div> <!></div> <div class="side-col scroll svelte-1dj0p5k"><div class="card"><h3>痣编号清单（按解剖分区编码）</h3> <div class="mole-list scroll svelte-1dj0p5k"><!> <!></div></div> <!></div></div>',1),Mh=ht("<option> </option>"),tE=ht('<div class="field"><label>解剖分区 *（决定编号前缀）</label> <select><option>— 选择分区 —</option><!></select></div> <div class="grid2"><div class="field"><label>命中部件</label> <input readonly=""/></div> <div class="field"><label>朝向</label> <input readonly=""/></div> <div class="field"><label>局部 u</label><input type="number" step="0.001"/></div> <div class="field"><label>局部 v</label><input type="number" step="0.001"/></div></div> <div class="small muted" style="margin-bottom:12px">保存后按「分区码-左右侧-流水号」自动生成永久编号，复诊凭编号配对。</div> <div class="row" style="justify-content:flex-end;gap:8px"><button>取消</button> <button class="primary">生成编号并继续录入照片</button></div>',1),eE=ht('<div class="small muted" style="margin-bottom:10px">将当前复诊照片与测量改挂到另一颗编号的痣上（用于主任退回后的修正）。</div> <select><option>— 选择目标痣编号 —</option><!></select> <div class="row" style="justify-content:flex-end;gap:8px;margin-top:14px"><button>取消</button> <button class="primary">确认重新配对</button></div>',1),nE=ht("<!> <!> <!> <!>",1);function Ep(n,t){En(t,!0);let e=De(t,"mode",3,"baseline"),i=De(t,"visitId",3,null),r=De(t,"taskId",3,null),s=De(t,"onchanged",3,null);const a=$i();let o=ae("3d"),l=ae(!1),c=ae(null),u=ae(!1),d=ae(!1),p=ae(!1),f=ae(1),v=ae(null),_=ae(rn(i()));const m=new Set;Zr(()=>{const it=t.patientId,w=i(),y=e();Qr(()=>{if(y!=="baseline"||!it||w||m.has(it))return;m.add(it);const q=Nf(it);q?St(_,q.id,!0):If(it,"baseline",Date.now()).then(rt=>{St(_,rt.id,!0)})})});const h=ge(()=>a.patients.find(it=>it.id===t.patientId)),S=ge(()=>Ca(t.patientId)),T=ge(()=>a.visits.find(it=>it.id===x(_))),M=ge(()=>r()?a.tasks.find(it=>it.id===r()):null),I=ge(()=>x(_)?Uf(x(_)):[]),R=rn({zoneId:"",u:.5,v:.5,partId:"",side:"front"}),P=ge(()=>r()?ii(r()).filter(it=>{var w;return(w=it.diff)==null?void 0:w.flagged}).map(it=>it.mole.id):[]),F=ge(()=>x(S).find(it=>it.id===x(c))||null),b=ge(()=>x(c)&&x(_)?Cu(x(c),x(_)):null),g=ge(()=>r()?ii(r()).find(it=>it.mole.id===x(c)):null),U=ge(()=>r()&&x(c)?Ff(r(),x(c)):null),k=ge(()=>e()==="baseline"||x(M)&&x(M).status!=="judged"),N=e()==="read",A=e()==="capture";function C(it){if(R.u=it.u,R.v=it.v,R.partId=it.partId,R.side=it.side,!R.zoneId){const w=a.zones.find(y=>y.parts.includes(it.partId)&&y.active);w&&(R.zoneId=w.id)}St(v,it,!0),St(u,!0),St(l,!1)}async function O(){var w;if(!R.zoneId||!R.partId)return;const it=await Dv({patientId:t.patientId,...R});St(u,!1),St(c,it.id,!0),St(d,!0),(w=s())==null||w()}async function z(it){var w;await Uv({visitId:x(_),moleId:x(c),...it}),St(d,!1),(w=s())==null||w()}async function D(){!x(F)||!confirm(`确认将 ${x(F).code} 标记为已切除/去除？`)||await Iv(x(c))}const X=rn({decision:"observe",reason:""});Zr(()=>{x(U)?(X.decision=x(U).decision,X.reason=x(U).reason):(X.decision="observe",X.reason="")});async function Z(){var it;if(!((it=x(g))!=null&&it.current)){alert("该痣尚无复诊记录，无法判读。");return}await Ov(r(),x(c),x(g).current.id,X.decision,X.reason)}const J=ge(()=>r()?ii(r()).filter(it=>it.judgment).length:0),ft=ge(()=>r()?ii(r()).length:0);async function ut(){var y;if(!x(M))return;const w=ii(r()).filter(q=>q.current&&!q.judgment);w.length&&!confirm(`还有 ${w.length} 颗有复诊记录的痣未判读，确认提交判读？`)||(await Ru(x(M).id,"judged"),(y=s())==null||y())}let G=ae("");function nt(){St(G,""),St(p,!0)}async function pt(){var it,w;!((it=x(g))!=null&&it.current)||!x(G)||(await Nv(x(g).current.id,x(G)),St(p,!1),St(c,x(G),!0),(w=s())==null||w())}function st(it){var w;return((w=Ec({zoneId:it}))==null?void 0:w.name)||it}function mt(it){var w;return((w=Aa.find(y=>y.id===it))==null?void 0:w.name)||it}function lt(it){return x(I).find(w=>w.moleId===it)}var vt=nE(),wt=Ue(vt);{var xt=it=>{var w=Pb();at(it,w)},Zt=it=>{var w=Qb(),y=Ue(w),q=j(y),rt=j(q),ct=j(rt),ot=L(ct);{var Ht=ne=>{var ie=Lb(),Ln=yt(ie,!0);zt(Kn=>dt(Ln,Kn),[()=>mt(x(M).status)]),at(ne,ie)};kt(ot,ne=>{x(M)&&ne(Ht)})}var Et=L(rt,2),Dt=j(Et);{var Jt=ne=>{var ie=yl();zt(Ln=>dt(ie,`就诊日期 ${Ln??""} · ${x(T).type==="baseline"?"基线建档":"复诊"} ·`),[()=>Mi(x(T).visitDate)]),at(ne,ie)};kt(Dt,ne=>{x(T)&&ne(Jt)})}var _t=L(Dt),Nt=L(_t);{var Wt=ne=>{var ie=yl();zt(()=>dt(ie,`· 已判读 ${x(J)??""}/${x(ft)??""}`)),at(ne,ie)};kt(Nt,ne=>{r()&&ne(Wt)})}var Yt=L(q,2),Ot=j(Yt);{var le=ne=>{var ie=Db();Bt("click",ie,()=>St(l,!0)),at(ne,ie)};kt(Ot,ne=>{x(k)&&x(_)&&ne(le)})}var te=L(Ot,2);{var xe=ne=>{var ie=Ib();Bt("click",ie,ut),at(ne,ie)};kt(te,ne=>{var ie;N&&((ie=x(M))==null?void 0:ie.status)==="pending_read"&&ne(xe)})}var V=L(y,2),bt=j(V),et=j(bt),tt=j(et);let Mt;var Tt=L(tt,2);let Qt;var Le=L(et,2);{var Ge=ne=>{ib(ne,{get moles(){return x(S)},get flaggedIds(){return x(P)},get pickMode(){return x(l)},onpick:C,get selectedId(){return x(c)},set selectedId(ie){St(c,ie,!0)},get opacity(){return x(f)},set opacity(ie){St(f,ie,!0)}})},be=ne=>{lb(ne,{get moles(){return x(S)},get zones(){return a.zones},get flaggedIds(){return x(P)},get selectedId(){return x(c)},set selectedId(ie){St(c,ie,!0)}})};kt(Le,ne=>{x(o)==="3d"?ne(Ge):ne(be,-1)})}var _n=L(bt,2),Hn=j(_n),Ja=L(j(Hn),2),sa=j(Ja);Oe(sa,17,()=>x(S),ne=>ne.id,(ne,ie)=>{const Ln=ge(()=>Ec(x(ie))),Kn=ge(()=>x(_)?lt(x(ie).id):null);var Pi=Bb();let es;var ns=j(Pi),xr=j(ns),is=yt(xr,!0),oa=L(xr,2),rs=j(oa);{var E=Ct=>{var Kt=Ub();at(Ct,Kt)};kt(rs,Ct=>{x(ie).removed&&Ct(E)})}var W=L(rs,2);{var $=Ct=>{var Kt=Nb();at(Ct,Kt)},K=ge(()=>x(P).includes(x(ie).id));kt(W,Ct=>{x(K)&&Ct($)})}var Y=L(W,2);{var gt=Ct=>{var Kt=Fb();at(Ct,Kt)},Rt=Ct=>{var Kt=Ob();at(Ct,Kt)};kt(Y,Ct=>{x(Kn)?Ct(gt):x(_)&&Ct(Rt,1)})}var Lt=L(ns,2),Ft=j(Lt),Xt=L(Ft);{var $t=Ct=>{var Kt=yl();zt(()=>dt(Kt,`· ⌀${x(Kn).diameterMm??""}mm`)),at(Ct,Kt)};kt(Xt,Ct=>{x(Kn)&&Ct($t)})}zt(Ct=>{var Kt;es=Ve(Pi,1,"mole-item svelte-1dj0p5k",null,es,{sel:x(ie).id===x(c),flag:Ct}),dt(is,x(ie).code),dt(Ft,`${((Kt=x(Ln))==null?void 0:Kt.name)??""} · ${x(ie).side==="front"?"前侧":"后侧"}`)},[()=>x(P).includes(x(ie).id)]),Bt("click",Pi,()=>St(c,x(ie).id,!0)),at(ne,Pi)});var Ci=L(sa,2);{var aa=ne=>{var ie=kb();at(ne,ie)};kt(Ci,ne=>{x(S).length===0&&ne(aa)})}var Qa=L(Hn,2);{var to=ne=>{var ie=Jb(),Ln=j(ie),Kn=j(Ln),Pi=yt(Kn,!0),es=L(Kn,2);{var ns=$=>{var K=zb();Bt("click",K,D),at($,K)};kt(es,$=>{x(k)&&!x(F).removed&&$(ns)})}var xr=L(Ln,2),is=j(xr),oa=L(is,2),rs=L(xr,2);{var E=$=>{var K=Zb(),Y=Ue(K);bp(Y,{get row(){return x(g)}});var gt=L(Y,2);{var Rt=Xt=>{var $t=Gb(),Ct=Ue($t);{var Kt=Me=>{var re=Hb();at(Me,re)},ye=Me=>{var re=Vb(),qt=yt(re);zt(()=>dt(qt,`拍同部位并挂接（编号 ${x(F).code??""}）`)),Bt("click",re,()=>St(d,!0)),at(Me,re)};kt(Ct,Me=>{x(g).current?Me(Kt):Me(ye,-1)})}var Ae=L(Ct,2);Bt("click",Ae,nt),at(Xt,$t)};kt(gt,Xt=>{A&&x(k)&&Xt(Rt)})}var Lt=L(gt,2);{var Ft=Xt=>{var $t=jb(),Ct=L(j($t),2);{var Kt=Ae=>{var Me=Wb();at(Ae,Me)},ye=Ae=>{var Me=qb(),re=Ue(Me),qt=L(j(re),2);Oe(qt,21,()=>Sv,pe=>pe.id,(pe,je)=>{var Ze=Xb();let Xe;var un=yt(Ze,!0);zt(()=>{Xe=Ve(Ze,1,"sm svelte-1dj0p5k",null,Xe,{primary:X.decision===x(je).id}),dt(un,x(je).name)}),Bt("click",Ze,()=>X.decision=x(je).id),at(pe,Ze)});var We=L(re,2),Te=L(j(We),2),cn=L(We,2),Ki=yt(cn,!0),gn=L(cn,2);{var yr=pe=>{var je=Yb(),Ze=yt(je);zt(Xe=>dt(Ze,`上次判读：${x(U).physician??""} · ${Xe??""}`),[()=>hr(x(U).ts)]),at(pe,je)};kt(gn,pe=>{x(U)&&pe(yr)})}zt(pe=>{cn.disabled=pe,dt(Ki,x(U)?"更新判读":"保存判读")},[()=>!X.reason.trim()]),ze(Te,()=>X.reason,pe=>X.reason=pe),Bt("click",cn,Z),at(Ae,Me)};kt(Ct,Ae=>{x(g).current?Ae(ye,-1):Ae(Kt)})}at(Xt,$t)};kt(Lt,Xt=>{N&&Xt(Ft)})}at($,K)},W=$=>{var K=Yo(),Y=Ue(K);{var gt=Lt=>{var Ft=$b(),Xt=yt(Ft);zt(()=>dt(Xt,`基线已记录 ⌀${x(b).diameterMm??""}mm`)),at(Lt,Ft)},Rt=Lt=>{var Ft=Kb();Bt("click",Ft,()=>St(d,!0)),at(Lt,Ft)};kt(Y,Lt=>{x(b)?Lt(gt):x(k)&&Lt(Rt,1)})}at($,K)};kt(rs,$=>{x(M)?$(E):e()==="baseline"&&$(W,1)})}zt($=>{dt(Pi,x(F).code),dt(is,`分区：${$??""}`),dt(oa,` 部件：${x(F).partId??""} · ${x(F).side==="front"?"前侧":"后侧"} ·
            局部坐标 u=${x(F).u??""} / v=${x(F).v??""}`)},[()=>st(x(F).zoneId)]),at(ne,ie)};kt(Qa,ne=>{x(F)&&ne(to)})}zt(()=>{dt(ct,`${x(h).name??""} 的三维痣图 `),dt(_t,` 共 ${x(S).length??""} 颗痣`),Mt=Ve(tt,1,"sm",null,Mt,{active:x(o)==="3d"}),Qt=Ve(Tt,1,"sm",null,Qt,{active:x(o)==="flat"})}),Bt("click",tt,()=>St(o,"3d")),Bt("click",Tt,()=>St(o,"flat")),at(it,w)};kt(wt,it=>{x(h)?it(Zt,-1):it(xt)})}var B=L(wt,2);{var de=it=>{fr(it,{title:"体表定位与分区编码",onclose:()=>St(u,!1),width:"560px",children:(w,y)=>{var q=tE(),rt=Ue(q),ct=L(j(rt),2),ot=j(ct);ot.value=ot.__value="";var Ht=L(ot);Oe(Ht,17,()=>a.zones.filter(bt=>bt.active),bt=>bt.id,(bt,et)=>{var tt=Mh(),Mt=yt(tt),Tt={};zt(()=>{dt(Mt,`${x(et).name??""}（${x(et).code??""}）`),Tt!==(Tt=x(et).id)&&(tt.value=(tt.__value=Tt)??"")}),at(bt,tt)}),Ti(ct);var Et=L(rt,2),Dt=j(Et),Jt=L(j(Dt),2),_t=L(Dt,2),Nt=L(j(_t),2),Wt=L(_t,2),Yt=L(j(Wt)),Ot=L(Wt,2),le=L(j(Ot)),te=L(Et,4),xe=j(te),V=L(xe,2);zt(()=>{cd(Jt,R.partId||"—"),cd(Nt,R.side==="front"?"前侧":"后侧"),V.disabled=!R.zoneId||!R.partId}),Wi(ct,()=>R.zoneId,bt=>R.zoneId=bt),ze(Yt,()=>R.u,bt=>R.u=bt),ze(le,()=>R.v,bt=>R.v=bt),Bt("click",xe,()=>St(u,!1)),Bt("click",V,O),at(w,q)},$$slots:{default:!0}})};kt(B,it=>{x(u)&&it(de)})}var Pt=L(B,2);{var Gt=it=>{{let w=ge(()=>`皮肤镜记录 · ${x(F).code}`);fr(it,{get title(){return x(w)},onclose:()=>St(d,!1),width:"640px",children:(y,q)=>{{let rt=ge(()=>{var ct;return((ct=x(g))==null?void 0:ct.current)||x(b)||{}});vb(y,{get angles(){return a.angles},get initial(){return x(rt)},onsubmit:z,oncancel:()=>St(d,!1)})}},$$slots:{default:!0}})}};kt(Pt,it=>{x(d)&&x(F)&&it(Gt)})}var Ut=L(Pt,2);{var ue=it=>{fr(it,{title:"重新配对复诊记录",onclose:()=>St(p,!1),width:"520px",children:(w,y)=>{var q=eE(),rt=L(Ue(q),2),ct=j(rt);ct.value=ct.__value="";var ot=L(ct);Oe(ot,17,()=>x(S).filter(Jt=>Jt.id!==x(c)),Jt=>Jt.id,(Jt,_t)=>{var Nt=Mh(),Wt=yt(Nt),Yt={};zt(Ot=>{dt(Wt,`${x(_t).code??""}（${Ot??""}）`),Yt!==(Yt=x(_t).id)&&(Nt.value=(Nt.__value=Yt)??"")},[()=>st(x(_t).zoneId)]),at(Jt,Nt)}),Ti(rt);var Ht=L(rt,2),Et=j(Ht),Dt=L(Et,2);zt(()=>Dt.disabled=!x(G)),Wi(rt,()=>x(G),Jt=>St(G,Jt)),Bt("click",Et,()=>St(p,!1)),Bt("click",Dt,pt),at(w,q)},$$slots:{default:!0}})};kt(Ut,it=>{x(p)&&it(ue)})}at(n,vt),Tn()}$n(["click"]);var iE=ht('<button class="primary">采集完成，提交判读</button>'),rE=ht('<button>导出差异清单</button> <button class="primary">导出活检建议单</button>',1),sE=ht('<div><div class="row" style="justify-content:space-between;margin-bottom:12px"><button class="sm">← 返回任务列表</button> <div class="row"><div class="pill-tabs" style="margin:0"><button>采集视图</button> <button>判读视图</button></div> <!> <!></div></div> <!></div>'),aE=ht('<button><div class="num svelte-1va0wk1"> </div> <div class="small muted"> </div></button>'),oE=ht('<span class="badge warn"> </span>'),lE=ht('<span class="muted small">0</span>'),cE=ht('<button class="sm primary">去采集</button>'),uE=ht('<button class="sm">查看/判读</button>'),dE=ht('<button class="sm danger">重新配对处理</button>'),hE=ht('<button class="sm">差异清单</button>'),fE=ht('<tr><td> </td><td class="small mono svelte-1va0wk1"> </td><td> </td><td><span> </span></td><td class="small"> </td><td><!></td><td class="small muted"> <br/> </td><td><div class="row" style="gap:6px;flex-wrap:wrap"><!> <!> <!></div></td></tr>'),pE=ht('<tr><td colspan="8" class="muted" style="text-align:center;padding:30px">该状态下暂无任务。</td></tr>'),mE=ht('<div class="row" style="justify-content:space-between"><div><h2 style="margin:0 0 4px" class="svelte-1va0wk1">随访任务</h2> <div class="small muted">待采集 → 待判读 → 已判读（主任审核可退回）→ 已退回</div></div> <button class="primary">＋ 新建随访任务</button></div> <div class="stat-row svelte-1va0wk1"><!> <button><div class="num svelte-1va0wk1"> </div> <div class="small muted">全部</div></button></div> <div class="card" style="margin-top:14px"><table><thead><tr><th>患者</th><th>病案号</th><th>计划复诊</th><th>状态</th><th>采集/痣数</th><th>标黄</th><th>最后变更</th><th>操作</th></tr></thead><tbody><!><!></tbody></table></div>',1),vE=ht("<option> </option>"),_E=ht('<div class="field"><label>选择患者（须已有基线痣图）</label> <select></select></div> <div class="field"><label>计划复诊日期</label> <input type="date"/></div> <div class="small muted" style="margin-bottom:12px">任务创建后自动生成复诊就诊单，初始状态为「待采集」。</div> <div class="row" style="justify-content:flex-end;gap:8px"><button>取消</button> <button class="primary">创建并进入采集</button></div>',1),gE=ht("<!> <!>",1);function xE(n,t){En(t,!0);let e=De(t,"focusTaskId",3,null);const i=$i();let r=ae("all"),s=ae(!1),a=ae(rn(e())),o=ae("capture");const l=rn({patientId:"",due:""}),c=ge(()=>Object.fromEntries(Aa.map(C=>[C.id,i.tasks.filter(O=>O.status===C.id).length]))),u=ge(()=>i.tasks.filter(C=>x(r)==="all"||C.status===x(r)));function d(C){var O;return((O=i.patients.find(z=>z.id===C))==null?void 0:O.name)||"—"}function p(C){var O;return((O=i.patients.find(z=>z.id===C))==null?void 0:O.medicalNo)||""}function f(C){return{pending_capture:"info",pending_read:"purple",judged:"ok",returned:"danger"}[C]||""}function v(C){return ii(C).filter(O=>{var z;return(z=O.diff)==null?void 0:z.flagged}).length}function _(C){const O=i.tasks.find(z=>z.id===C);return ii(C).filter(z=>z.current).length+(O?i.findings.filter(z=>z.visitId===O.visitId&&!Ca(O.patientId).some(D=>D.id===z.moleId)).length:0)}async function m(){var C;l.patientId=((C=i.patients[0])==null?void 0:C.id)||"",l.due=new Date(Date.now()+180*864e5).toISOString().slice(0,10),St(s,!0)}async function h(){if(!l.patientId||!l.due)return;const C=Nf(l.patientId);if(!C){alert("该患者尚无基线就诊，无法建立随访任务。");return}const O=await Fv(l.patientId,C.id,new Date(l.due).getTime());St(s,!1),St(a,O.id,!0),St(o,"capture")}const S=ge(()=>i.tasks.find(C=>C.id===x(a))||null);async function T(C){await Ru(C,"pending_read"),St(o,"read")}function M(C){St(a,C,!0),St(o,"capture")}function I(C){St(a,C,!0),St(o,"read")}function R(){var C;St(a,null),(C=t.clearFocus)==null||C.call(t)}function P(C){const O=i.tasks.find(Z=>Z.id===C),z=ii(C),X=bc(z,[{label:"痣编号",get:Z=>Z.mole.code},{label:"解剖分区",get:Z=>{var J;return((J=Z.zone)==null?void 0:J.name)||""}},{label:"基线直径mm",get:Z=>{var J;return((J=Z.baseline)==null?void 0:J.diameterMm)??""}},{label:"复诊直径mm",get:Z=>{var J;return((J=Z.current)==null?void 0:J.diameterMm)??"未采集"}},{label:"直径变化mm",get:Z=>{var J;return((J=Z.diff)==null?void 0:J.deltaMm)??""}},{label:"基线边缘",get:Z=>{var J;return((J=Z.baseline)==null?void 0:J.edgeType)??""}},{label:"复诊边缘",get:Z=>{var J;return((J=Z.current)==null?void 0:J.edgeType)??""}},{label:"色素网络",get:Z=>{var J;return((J=Z.current)==null?void 0:J.networkType)??""}},{label:"是否标黄",get:Z=>{var J;return(J=Z.diff)!=null&&J.flagged?"是":"否"}},{label:"标黄原因",get:Z=>{var J;return((J=Z.diff)==null?void 0:J.reasons.join("；"))||""}},{label:"判读决定",get:Z=>{var J;return{observe:"观察",biopsy:"活检",excise:"切除"}[(J=Z.judgment)==null?void 0:J.decision]||""}},{label:"判读医师",get:Z=>{var J;return((J=Z.judgment)==null?void 0:J.physician)||""}},{label:"判读理由",get:Z=>{var J;return((J=Z.judgment)==null?void 0:J.reason)||""}}]);qo(new Blob([X],{type:"text/csv;charset=utf-8"}),`随访差异清单_${d(O.patientId)}_${Mi(O.lastStatusAt)}.csv`)}function F(C){var ft;const O=i.tasks.find(ut=>ut.id===C),z=ii(C).filter(ut=>{var G,nt;return((G=ut.judgment)==null?void 0:G.decision)==="biopsy"||((nt=ut.judgment)==null?void 0:nt.decision)==="excise"});if(!z.length){alert("当前没有「活检」或「切除」判读，无可导出的建议单。");return}const X=bc(z,[{label:"建议序号",get:(ut,G)=>G+1},{label:"痣编号",get:ut=>ut.mole.code},{label:"解剖分区",get:ut=>{var G;return((G=ut.zone)==null?void 0:G.name)||""}},{label:"建议处置",get:ut=>ut.judgment.decision==="biopsy"?"活检":"切除"},{label:"当前直径mm",get:ut=>{var G;return((G=ut.current)==null?void 0:G.diameterMm)??""}},{label:"边缘形态",get:ut=>{var G;return((G=ut.current)==null?void 0:G.edgeType)??""}},{label:"色素网络",get:ut=>{var G;return((G=ut.current)==null?void 0:G.networkType)??""}},{label:"标黄原因",get:ut=>{var G;return((G=ut.diff)==null?void 0:G.reasons.join("；"))||""}},{label:"判读理由",get:ut=>ut.judgment.reason},{label:"判读医师",get:ut=>ut.judgment.physician},{label:"判读时间",get:ut=>hr(ut.judgment.ts)}]),Z=i.patients.find(ut=>ut.id===O.patientId),J=`\uFEFF活检/切除建议单\r
患者,${Z.name}\r
病案号,${Z.medicalNo||"—"}\r
基线就诊,${Mi(O.baselineVisitId&&((ft=i.visits.find(ut=>ut.id===O.baselineVisitId))==null?void 0:ft.visitDate))}\r
生成时间,${hr(Date.now())}\r
\r
`;qo(new Blob([J+X.slice(1)],{type:"text/csv;charset=utf-8"}),`活检建议单_${Z.name}_${Mi(Date.now())}.csv`)}var b=gE(),g=Ue(b);{var U=C=>{var O=sE(),z=j(O),D=j(z),X=L(D,2),Z=j(X),J=j(Z);let ft;var ut=L(J,2);let G;var nt=L(Z,2);{var pt=vt=>{var wt=iE();Bt("click",wt,()=>T(x(S).id)),at(vt,wt)};kt(nt,vt=>{x(o)==="capture"&&x(S).status==="pending_capture"&&vt(pt)})}var st=L(nt,2);{var mt=vt=>{var wt=rE(),xt=Ue(wt),Zt=L(xt,2);Bt("click",xt,()=>P(x(S).id)),Bt("click",Zt,()=>F(x(S).id)),at(vt,wt)};kt(st,vt=>{(x(S).status==="judged"||x(S).status==="returned")&&vt(mt)})}var lt=L(z,2);{let vt=ge(()=>x(o)==="capture"?"capture":"read");Ep(lt,{get patientId(){return x(S).patientId},get visitId(){return x(S).visitId},get taskId(){return x(S).id},get mode(){return x(vt)},onchanged:()=>{}})}zt(()=>{ft=Ve(J,1,"sm",null,ft,{active:x(o)==="capture"}),G=Ve(ut,1,"sm",null,G,{active:x(o)==="read"})}),Bt("click",D,R),Bt("click",J,()=>St(o,"capture")),Bt("click",ut,()=>St(o,"read")),at(C,O)},k=C=>{var O=mE(),z=Ue(O),D=L(j(z),2),X=L(z,2),Z=j(X);Oe(Z,17,()=>Aa,wt=>wt.id,(wt,xt)=>{var Zt=aE();let B;var de=j(Zt),Pt=yt(de,!0),Gt=L(de,2),Ut=yt(Gt,!0);zt(()=>{B=Ve(Zt,1,"stat-card svelte-1va0wk1",null,B,{on:x(r)===x(xt).id}),dt(Pt,x(c)[x(xt).id]||0),dt(Ut,x(xt).name)}),Bt("click",Zt,()=>St(r,x(xt).id,!0)),at(wt,Zt)});var J=L(Z,2);let ft;var ut=j(J),G=yt(ut,!0),nt=L(X,2),pt=j(nt),st=L(j(pt)),mt=j(st);Oe(mt,17,()=>x(u),wt=>wt.id,(wt,xt)=>{var Zt=fE(),B=j(Zt),de=yt(B,!0),Pt=L(B),Gt=yt(Pt,!0),Ut=L(Pt),ue=yt(Ut,!0),it=L(Ut),w=j(it),y=yt(w,!0),q=L(it),rt=yt(q),ct=L(q),ot=j(ct);{var Ht=tt=>{var Mt=oE(),Tt=yt(Mt,!0);zt(Qt=>dt(Tt,Qt),[()=>v(x(xt).id)]),at(tt,Mt)},Et=ge(()=>v(x(xt).id)>0),Dt=tt=>{var Mt=lE();at(tt,Mt)};kt(ot,tt=>{x(Et)?tt(Ht):tt(Dt,-1)})}var Jt=L(ct),_t=j(Jt),Nt=L(_t,2,!0),Wt=L(Jt),Yt=j(Wt),Ot=j(Yt);{var le=tt=>{var Mt=cE();Bt("click",Mt,()=>M(x(xt).id)),at(tt,Mt)},te=tt=>{var Mt=uE();Bt("click",Mt,()=>I(x(xt).id)),at(tt,Mt)};kt(Ot,tt=>{x(xt).status==="pending_capture"?tt(le):tt(te,-1)})}var xe=L(Ot,2);{var V=tt=>{var Mt=dE();Bt("click",Mt,()=>M(x(xt).id)),at(tt,Mt)};kt(xe,tt=>{x(xt).status==="returned"&&tt(V)})}var bt=L(xe,2);{var et=tt=>{var Mt=hE();Bt("click",Mt,()=>P(x(xt).id)),at(tt,Mt)};kt(bt,tt=>{(x(xt).status==="judged"||x(xt).status==="returned")&&tt(et)})}zt((tt,Mt,Tt,Qt,Le,Ge,be,_n)=>{dt(de,tt),dt(Gt,Mt),dt(ue,Tt),Ve(w,1,`badge ${Qt??""}`,"svelte-1va0wk1"),dt(y,Le),dt(rt,`${Ge??""}/${be??""}`),dt(_t,_n),dt(Nt,x(xt).lastStatusBy)},[()=>d(x(xt).patientId),()=>p(x(xt).patientId)||"—",()=>Mi(x(xt).dueDate),()=>f(x(xt).status),()=>{var tt;return(tt=Aa.find(Mt=>Mt.id===x(xt).status))==null?void 0:tt.name},()=>_(x(xt).id),()=>Ca(x(xt).patientId).length,()=>hr(x(xt).lastStatusAt)]),at(wt,Zt)});var lt=L(mt);{var vt=wt=>{var xt=pE();at(wt,xt)};kt(lt,wt=>{x(u).length===0&&wt(vt)})}zt(()=>{ft=Ve(J,1,"stat-card svelte-1va0wk1",null,ft,{on:x(r)==="all"}),dt(G,i.tasks.length)}),Bt("click",D,m),Bt("click",J,()=>St(r,"all")),at(C,O)};kt(g,C=>{x(S)?C(U):C(k,-1)})}var N=L(g,2);{var A=C=>{fr(C,{title:"新建随访任务",onclose:()=>St(s,!1),width:"480px",children:(O,z)=>{var D=_E(),X=Ue(D),Z=L(j(X),2);Oe(Z,21,()=>i.patients,pt=>pt.id,(pt,st)=>{var mt=vE(),lt=yt(mt),vt={};zt(wt=>{dt(lt,`${x(st).name??""}（${(x(st).medicalNo||"无病案号")??""} · ${wt??""}颗痣）`),vt!==(vt=x(st).id)&&(mt.value=(mt.__value=vt)??"")},[()=>Ca(x(st).id).length]),at(pt,mt)}),Ti(Z);var J=L(X,2),ft=L(j(J),2),ut=L(J,4),G=j(ut),nt=L(G,2);Wi(Z,()=>l.patientId,pt=>l.patientId=pt),ze(ft,()=>l.due,pt=>l.due=pt),Bt("click",G,()=>St(s,!1)),Bt("click",nt,h),at(O,D)},$$slots:{default:!0}})};kt(N,C=>{x(s)&&C(A)})}at(n,b),Tn()}$n(["click"]);var yE=ht('<span class="badge ok">已通过</span>'),ME=ht('<span class="badge danger">已退回</span>'),SE=ht('<span class="badge warn">待审核</span>'),bE=ht('<button><div class="row" style="justify-content:space-between"><strong> </strong> <!></div> <div class="small muted" style="margin:4px 0"> </div> <div class="small muted"> </div></button>'),EE=ht('<div class="muted small" style="padding:16px 4px">暂无待审任务。</div>'),TE=ht('<div class="muted"> </div>'),wE=ht("<div> <!></div>"),AE=ht('<div class="history small svelte-1s4b131"></div>'),RE=ht("<button> </button>"),CE=ht("<span> </span>"),PE=ht('<span class="badge">未判读</span>'),LE=ht('<div class="row" style="justify-content:space-between;margin:10px 0 6px"><strong class="mono svelte-1s4b131"> </strong> <!></div> <!>',1),DE=ht('<div class="card" style="margin-top:14px"><div class="row" style="justify-content:space-between"><h3 style="margin:0"> </h3> <div class="row"><button class="sm">打开采集/判读工作台</button> <button class="sm danger">退回重新配对</button> <button class="sm primary">审核通过</button></div></div> <!> <div class="mole-pills svelte-1s4b131"></div> <!></div>'),IE=ht('<div class="card muted" style="margin-top:14px;display:grid;place-items:center;min-height:200px">选择左侧任务查看标黄痣的前后对比</div>'),UE=ht('<div class="field"><label>审核意见 / 退回原因</label> <textarea rows="4" placeholder="退回时请写明原因，例如：BK-L-001 配对有误，请重新配对后再提交。"></textarea></div> <div class="row" style="justify-content:flex-end;gap:8px"><button>取消</button> <button class="danger">退回（任务回到已退回）</button> <button class="primary">审核通过</button></div>',1),NE=ht('<div><h2 style="margin:0 0 4px" class="svelte-1s4b131">主任待审列表</h2> <div class="small muted">仅列出已判读/已退回任务；重点审核自动标黄痣的前后对比与医师判读意见，可退回要求重新配对。</div> <div class="review-grid svelte-1s4b131"><div class="card" style="margin-top:14px"><h3> </h3> <div class="scroll task-list svelte-1s4b131"><!> <!></div></div> <!></div></div> <!>',1);function FE(n,t){En(t,!0);const e=$i();let i=ae(null),r=ae(!1),s=ae("");const a=ge(zv),o=ge(()=>e.tasks.find(N=>N.id===x(i))||null),l=ge(()=>x(i)?ii(x(i)):[]);let c=ae(null);const u=ge(()=>x(l).find(N=>N.mole.id===x(c))||x(l).find(N=>{var A;return(A=N.diff)==null?void 0:A.flagged})||null),d=ge(()=>x(i)?kv(x(i)):[]);function p(N){var A;return((A=e.patients.find(C=>C.id===N))==null?void 0:A.name)||"—"}async function f(N){if(N==="returned"&&!x(s).trim()){alert("退回时必须填写退回原因（如：编号配对错误，请重新配对）。");return}await Bv(x(i),N,x(s)),St(r,!1),St(s,"")}var v=NE(),_=Ue(v),m=L(j(_),4),h=j(m),S=j(h),T=yt(S),M=L(S,2),I=j(M);Oe(I,17,()=>x(a),N=>N.task.id,(N,A)=>{const C=ge(()=>x(A).task);var O=bE();let z;var D=j(O),X=j(D),Z=yt(X,!0),J=L(X,2);{var ft=lt=>{var vt=yE();at(lt,vt)},ut=lt=>{var vt=ME();at(lt,vt)},G=lt=>{var vt=SE();at(lt,vt)};kt(J,lt=>{x(A).approved?lt(ft):x(C).status==="returned"?lt(ut,1):lt(G,-1)})}var nt=L(D,2),pt=yt(nt),st=L(nt,2),mt=yt(st);zt((lt,vt,wt)=>{z=Ve(O,1,"task-item svelte-1s4b131",null,z,{sel:x(C).id===x(i)}),dt(Z,lt),dt(pt,`复诊 ${vt??""} · 标黄 ${x(A).flagged.length??""} 颗`),dt(mt,`${x(C).lastStatusBy??""} · ${wt??""}`)},[()=>p(x(C).patientId),()=>Mi(x(C).dueDate),()=>hr(x(C).lastStatusAt)]),Bt("click",O,()=>St(i,x(C).id,!0)),at(N,O)});var R=L(I,2);{var P=N=>{var A=EE();at(N,A)};kt(R,N=>{x(a).length===0&&N(P)})}var F=L(h,2);{var b=N=>{var A=DE(),C=j(A),O=j(C),z=yt(O),D=L(O,2),X=j(D),Z=L(X,2),J=L(Z,2),ft=L(C,2);{var ut=st=>{var mt=AE();Oe(mt,21,()=>x(d),lt=>lt.id,(lt,vt)=>{var wt=wE(),xt=j(wt),Zt=L(xt);{var B=de=>{var Pt=TE(),Gt=yt(Pt);zt(()=>dt(Gt,`意见：${x(vt).note??""}`)),at(de,Pt)};kt(Zt,de=>{x(vt).note&&de(B)})}zt(de=>dt(xt,`${x(vt).verdict==="approved"?"✅ 审核通过":"↩ 退回"} · ${x(vt).director??""} · ${de??""} `),[()=>hr(x(vt).ts)]),at(lt,wt)}),at(st,mt)};kt(ft,st=>{x(d).length&&st(ut)})}var G=L(ft,2);Oe(G,21,()=>x(l),st=>st.mole.id,(st,mt)=>{var lt=RE();let vt;var wt=yt(lt);zt(()=>{var xt,Zt,B;vt=Ve(lt,1,"sm mole-pill svelte-1s4b131",null,vt,{flag:(xt=x(mt).diff)==null?void 0:xt.flagged,sel:((Zt=x(u))==null?void 0:Zt.mole.id)===x(mt).mole.id}),dt(wt,`${x(mt).mole.code??""}${(B=x(mt).diff)!=null&&B.flagged?" ⚠":""}`)}),Bt("click",lt,()=>St(c,x(mt).mole.id,!0)),at(st,lt)});var nt=L(G,2);{var pt=st=>{var mt=LE(),lt=Ue(mt),vt=j(lt),wt=yt(vt),xt=L(vt,2);{var Zt=Pt=>{var Gt=CE(),Ut=yt(Gt);zt(()=>{Ve(Gt,1,`badge ${x(u).judgment.decision==="observe"?"info":"purple"}`),dt(Ut,`判读：${{observe:"观察",biopsy:"活检",excise:"切除"}[x(u).judgment.decision]??""}`)}),at(Pt,Gt)},B=Pt=>{var Gt=PE();at(Pt,Gt)};kt(xt,Pt=>{x(u).judgment?Pt(Zt):Pt(B,-1)})}var de=L(lt,2);bp(de,{get row(){return x(u)}}),zt(()=>{var Pt;return dt(wt,`${x(u).mole.code??""} · ${((Pt=x(u).zone)==null?void 0:Pt.name)??""}`)}),at(st,mt)};kt(nt,st=>{x(u)&&st(pt)})}zt(st=>dt(z,`逐颗复核 · ${st??""}`),[()=>p(x(o).patientId)]),Bt("click",X,()=>t.onopenTask(x(o).id)),Bt("click",Z,()=>St(r,!0)),Bt("click",J,()=>St(r,!0)),at(N,A)},g=N=>{var A=IE();at(N,A)};kt(F,N=>{x(o)?N(b):N(g,-1)})}var U=L(_,2);{var k=N=>{fr(N,{title:"主任审核意见",onclose:()=>St(r,!1),width:"520px",children:(A,C)=>{var O=UE(),z=Ue(O),D=L(j(z),2),X=L(z,2),Z=j(X),J=L(Z,2),ft=L(J,2);ze(D,()=>x(s),ut=>St(s,ut)),Bt("click",Z,()=>St(r,!1)),Bt("click",J,()=>f("returned")),Bt("click",ft,()=>f("approved")),at(A,O)},$$slots:{default:!0}})};kt(U,N=>{x(r)&&N(k)})}zt(()=>dt(T,`任务（${x(a).length??""}）`)),at(n,v),Tn()}$n(["click"]);var Sh=ht('<span class="badge ok">启用</span>'),bh=ht('<span class="badge">停用</span>'),OE=ht('<tr><td class="mono svelte-wn6w8w"><strong> </strong></td><td> </td><td class="small muted"> </td><td> </td><td><span class="swatch svelte-wn6w8w"></span></td><td><!></td><td class="row" style="gap:6px"><button class="sm">编辑</button> <button class="sm"> </button></td></tr>'),BE=ht('<div class="card"><div class="row" style="justify-content:space-between;margin-bottom:10px"><h3 style="margin:0"> </h3> <button class="primary sm">＋ 新增分区</button></div> <table><thead><tr><th>编码</th><th>分区名称</th><th>关联三维部件</th><th>朝向</th><th>色标</th><th>状态</th><th></th></tr></thead><tbody></tbody></table></div>'),kE=ht('<tr><td class="mono svelte-wn6w8w"> </td><td> </td><td><span class="badge info"> </span></td><td class="small muted" style="max-width:420px"> </td><td><!></td><td class="row" style="gap:6px"><button class="sm">编辑</button> <button class="sm"> </button></td></tr>'),zE=ht('<div class="card"><div class="row" style="justify-content:space-between;margin-bottom:10px"><h3 style="margin:0"> </h3> <button class="primary sm">＋ 新增模板</button></div> <table><thead><tr><th>模板号</th><th>名称</th><th>适用部位</th><th>拍摄指引</th><th>状态</th><th></th></tr></thead><tbody></tbody></table></div>'),HE=ht('<button type="button"> </button>'),VE=ht('<div class="grid2"><div class="field"><label>分区 ID（字母码）*</label><input placeholder="如 BK"/></div> <div class="field"><label>显示编码 *</label><input placeholder="如 BK"/></div> <div class="field"><label>分区名称 *</label><input/></div> <div class="field"><label>朝向</label> <select><option>仅前侧</option><option>仅后侧</option><option>前后均可</option></select></div> <div class="field"><label>平面图色标</label><input type="color" style="height:38px;padding:3px"/></div></div> <div class="field"><label>关联三维部件 *（可多选，决定点击身体时的默认分区）</label> <div class="part-grid svelte-wn6w8w"></div></div> <div class="row" style="justify-content:flex-end;gap:8px"><button>取消</button> <button class="primary">保存规则</button></div>',1),GE=ht('<div class="grid2"><div class="field"><label>模板号 *</label><input/></div> <div class="field"><label>模板名称 *</label><input/></div></div> <div class="field"><label>适用部位</label> <select><option>全身</option><option>头面</option><option>躯干</option><option>上肢</option><option>下肢</option></select></div> <div class="field"><label>拍摄指引（机位、距离、光源、比例尺等）</label> <textarea rows="4"></textarea></div> <div class="row" style="justify-content:flex-end;gap:8px"><button>取消</button> <button class="primary">保存模板</button></div>',1),WE=ht('<div><h2 style="margin:0 0 4px" class="svelte-wn6w8w">技师维护</h2> <div class="small muted">维护解剖分区编号规则与拍摄角度模板；停用后的规则不能用于新痣编码，历史痣图保留原编码。</div> <div class="pill-tabs" style="margin-top:14px"><button>解剖分区规则</button> <button>拍摄角度模板</button></div> <!></div> <!> <!>',1);function XE(n,t){En(t,!0);const e=$i();let i=ae("zones"),r=ae(!1),s=ae(!1);const a=rn({id:"",name:"",code:"",parts:[],side:"both",band:null,color:"#88aadd",active:!0}),o=rn({id:"",name:"",body:"全身",guidance:"",active:!0});function l(N){Object.assign(a,{band:null,...N,parts:[...N.parts]}),St(r,!0)}function c(){Object.assign(a,{id:"",name:"",code:"",parts:[],side:"both",band:null,color:"#88aadd",active:!0}),St(r,!0)}async function u(){if(!a.id||!a.name||!a.code||!a.parts.length){alert("编号、名称、编码与关联部件均为必填。");return}await wv({...a,parts:[...a.parts]}),St(r,!1)}function d(N){const A=a.parts.indexOf(N);A>=0?a.parts.splice(A,1):a.parts.push(N)}function p(N){Object.assign(o,N),St(s,!0)}function f(){Object.assign(o,{id:"AN"+String(e.angles.length+1).padStart(2,"0"),name:"",body:"全身",guidance:"",active:!0}),St(s,!0)}async function v(){!o.id||!o.name||(await Rv({...o}),St(s,!1))}var _=WE(),m=Ue(_),h=L(j(m),4),S=j(h);let T;var M=L(S,2);let I;var R=L(h,2);{var P=N=>{var A=BE(),C=j(A),O=j(C),z=yt(O),D=L(O,2),X=L(C,2),Z=L(j(X));Oe(Z,21,()=>e.zones,J=>J.id,(J,ft)=>{var ut=OE(),G=j(ut),nt=j(G),pt=yt(nt,!0),st=L(G),mt=yt(st,!0),lt=L(st),vt=yt(lt,!0),wt=L(lt),xt=yt(wt,!0),Zt=L(wt),B=yt(Zt),de=L(Zt),Pt=j(de);{var Gt=q=>{var rt=Sh();at(q,rt)},Ut=q=>{var rt=bh();at(q,rt)};kt(Pt,q=>{x(ft).active?q(Gt):q(Ut,-1)})}var ue=L(de),it=j(ue),w=L(it,2),y=yt(w,!0);zt(q=>{dt(pt,x(ft).code),dt(mt,x(ft).name),dt(vt,q),dt(xt,x(ft).side==="front"?"前侧":x(ft).side==="back"?"后侧":"前后均可"),Af(B,`background:${x(ft).color}`),dt(y,x(ft).active?"停用":"启用")},[()=>x(ft).parts.join("、")]),Bt("click",it,()=>l(x(ft))),Bt("click",w,()=>Av(x(ft).id)),at(J,ut)}),zt(()=>dt(z,`分区编码（${e.zones.length??""}）`)),Bt("click",D,c),at(N,A)},F=N=>{var A=zE(),C=j(A),O=j(C),z=yt(O),D=L(O,2),X=L(C,2),Z=L(j(X));Oe(Z,21,()=>e.angles,J=>J.id,(J,ft)=>{var ut=kE(),G=j(ut),nt=yt(G,!0),pt=L(G),st=yt(pt,!0),mt=L(pt),lt=j(mt),vt=yt(lt,!0),wt=L(mt),xt=yt(wt,!0),Zt=L(wt),B=j(Zt);{var de=w=>{var y=Sh();at(w,y)},Pt=w=>{var y=bh();at(w,y)};kt(B,w=>{x(ft).active?w(de):w(Pt,-1)})}var Gt=L(Zt),Ut=j(Gt),ue=L(Ut,2),it=yt(ue,!0);zt(()=>{dt(nt,x(ft).id),dt(st,x(ft).name),dt(vt,x(ft).body),dt(xt,x(ft).guidance),dt(it,x(ft).active?"停用":"启用")}),Bt("click",Ut,()=>p(x(ft))),Bt("click",ue,()=>Cv(x(ft).id)),at(J,ut)}),zt(()=>dt(z,`拍摄角度模板（${e.angles.length??""}）`)),Bt("click",D,f),at(N,A)};kt(R,N=>{x(i)==="zones"?N(P):N(F,-1)})}var b=L(m,2);{var g=N=>{fr(N,{title:"分区规则",onclose:()=>St(r,!1),width:"640px",children:(A,C)=>{var O=VE(),z=Ue(O),D=j(z),X=L(j(D)),Z=L(D,2),J=L(j(Z)),ft=L(Z,2),ut=L(j(ft)),G=L(ft,2),nt=L(j(G),2),pt=j(nt);pt.value=pt.__value="front";var st=L(pt);st.value=st.__value="back";var mt=L(st);mt.value=mt.__value="both",Ti(nt);var lt=L(G,2),vt=L(j(lt)),wt=L(z,2),xt=L(j(wt),2);Oe(xt,21,()=>Ra,Pt=>Pt.id,(Pt,Gt)=>{var Ut=HE();let ue;var it=yt(Ut,!0);zt(w=>{ue=Ve(Ut,1,"sm part-btn svelte-wn6w8w",null,ue,{on:w}),dt(it,x(Gt).id)},[()=>a.parts.includes(x(Gt).id)]),Bt("click",Ut,()=>d(x(Gt).id)),at(Pt,Ut)});var Zt=L(wt,2),B=j(Zt),de=L(B,2);ze(X,()=>a.id,Pt=>a.id=Pt),ze(J,()=>a.code,Pt=>a.code=Pt),ze(ut,()=>a.name,Pt=>a.name=Pt),Wi(nt,()=>a.side,Pt=>a.side=Pt),ze(vt,()=>a.color,Pt=>a.color=Pt),Bt("click",B,()=>St(r,!1)),Bt("click",de,u),at(A,O)},$$slots:{default:!0}})};kt(b,N=>{x(r)&&N(g)})}var U=L(b,2);{var k=N=>{fr(N,{title:"拍摄角度模板",onclose:()=>St(s,!1),width:"560px",children:(A,C)=>{var O=GE(),z=Ue(O),D=j(z),X=L(j(D)),Z=L(D,2),J=L(j(Z)),ft=L(z,2),ut=L(j(ft),2);Ti(ut);var G=L(ft,2),nt=L(j(G),2),pt=L(G,2),st=j(pt),mt=L(st,2);ze(X,()=>o.id,lt=>o.id=lt),ze(J,()=>o.name,lt=>o.name=lt),Wi(ut,()=>o.body,lt=>o.body=lt),ze(nt,()=>o.guidance,lt=>o.guidance=lt),Bt("click",st,()=>St(s,!1)),Bt("click",mt,v),at(A,O)},$$slots:{default:!0}})};kt(U,N=>{x(s)&&N(k)})}zt(()=>{T=Ve(S,1,"",null,T,{active:x(i)==="zones"}),I=Ve(M,1,"",null,I,{active:x(i)==="angles"})}),Bt("click",S,()=>St(i,"zones")),Bt("click",M,()=>St(i,"angles")),at(n,_),Tn()}$n(["click"]);var YE=ht('<tr><td><strong> </strong></td><td> </td><td> </td><td> </td><td> </td><td><span> </span> <span class="small muted"> </span></td><td> </td><td> </td></tr>'),qE=ht('<tr><td colspan="8" class="muted" style="text-align:center;padding:26px">尚无判读数据。</td></tr>'),jE=ht(`<div><h2 style="margin:0 0 4px" class="svelte-cessb6">统计分析</h2> <div class="small muted">按判读医师统计标黄命中率与活检/切除比例，数据全部来自本地记录。</div> <div class="kpi-row svelte-cessb6"><div class="kpi card svelte-cessb6"><div class="num svelte-cessb6"> </div><div class="muted small">患者</div></div> <div class="kpi card svelte-cessb6"><div class="num svelte-cessb6"> </div><div class="muted small">建档痣数</div></div> <div class="kpi card svelte-cessb6"><div class="num warn svelte-cessb6"> </div><div class="muted small">累计标黄</div></div> <div class="kpi card svelte-cessb6"><div class="num svelte-cessb6"> </div><div class="muted small">判读记录</div></div> <div class="kpi card svelte-cessb6"><div class="num svelte-cessb6"> </div><div class="muted small">已判读任务</div></div></div> <div class="card" style="margin-top:16px"><h3>医师质量指标</h3> <table><thead><tr><th>医师</th><th>判读总数</th><th>观察</th><th>活检</th><th>切除</th><th>标黄命中（活检/切除 ÷ 标黄数）</th><th>活检比例</th><th>有创处置比例</th></tr></thead><tbody><!><!></tbody></table> <div class="small muted" style="margin-top:10px;line-height:1.7">口径说明：标黄命中率 = 标黄痣中判为活检或切除的比例；活检比例 = 活检数 ÷ 该医师全部判读数；
      有创处置比例 =（活检+切除）÷ 全部判读数。</div></div></div>`);function ZE(n,t){En(t,!0);const e=$i(),i=ge(Hv);function r(A){return A===null?"—":(A*100).toFixed(1)+"%"}const s=ge(()=>e.tasks.reduce((A,C)=>A+a(C.id),0));function a(A){const C=e.tasks.find(z=>z.id===A);if(!C)return 0;let O=0;for(const z of e.findings.filter(D=>D.visitId===C.visitId)){const D=e.findings.find(ft=>ft.moleId===z.moleId&&ft.visitId===C.baselineVisitId),X=D==null?void 0:D.diameterMm,Z=["明显不规则","伪足/放射纹"].includes(z.edgeType),J=["明显不规则","伪足/放射纹"].includes(D==null?void 0:D.edgeType);(!D||X!==void 0&&z.diameterMm-X>1||Z&&!J)&&O++}return O}var o=jE(),l=L(j(o),4),c=j(l),u=j(c),d=yt(u,!0),p=L(c,2),f=j(p),v=yt(f,!0),_=L(p,2),m=j(_),h=yt(m,!0),S=L(_,2),T=j(S),M=yt(T,!0),I=L(S,2),R=j(I),P=yt(R,!0),F=L(l,2),b=L(j(F),2),g=L(j(b)),U=j(g);Oe(U,17,()=>x(i),A=>A.physician,(A,C)=>{var O=YE(),z=j(O),D=j(z),X=yt(D,!0),Z=L(z),J=yt(Z,!0),ft=L(Z),ut=yt(ft,!0),G=L(ft),nt=yt(G,!0),pt=L(G),st=yt(pt,!0),mt=L(pt),lt=j(mt),vt=yt(lt,!0),wt=L(lt,2),xt=yt(wt),Zt=L(mt),B=yt(Zt,!0),de=L(Zt),Pt=yt(de,!0);zt((Gt,Ut,ue)=>{dt(X,x(C).physician),dt(J,x(C).total),dt(ut,x(C).observe),dt(nt,x(C).biopsy),dt(st,x(C).excise),Ve(lt,1,av(x(C).flagHitRate!==null&&x(C).flagHitRate>=.5?"good":"warn-txt"),"svelte-cessb6"),dt(vt,Gt),dt(xt,`（${x(C).flaggedAction??""}/${x(C).flaggedTotal??""}）`),dt(B,Ut),dt(Pt,ue)},[()=>r(x(C).flagHitRate),()=>r(x(C).biopsyRate),()=>r(x(C).actionRate)]),at(A,O)});var k=L(U);{var N=A=>{var C=qE();at(A,C)};kt(k,A=>{x(i).length===0&&A(N)})}zt(A=>{dt(d,e.patients.length),dt(v,e.moles.length),dt(h,x(s)),dt(M,e.judgments.length),dt(P,A)},[()=>e.tasks.filter(A=>A.status==="judged").length]),at(n,o),Tn()}var $E=ht('<tr><td class="small"> </td><td> </td><td><span class="badge info"> </span></td><td> </td><td class="small mono svelte-10mzy1i"> </td><td class="small muted"> </td></tr>'),KE=ht('<tr><td colspan="6" class="muted" style="text-align:center;padding:26px">暂无日志。</td></tr>'),JE=ht('<div><div class="row" style="justify-content:space-between"><div><h2 style="margin:0 0 4px" class="svelte-10mzy1i">操作日志</h2> <div class="small muted">所有状态变更、判读、审核与规则维护均记录操作人和时间，不可删除。</div></div> <div class="row"><input placeholder="筛选动作/操作人/对象" style="width:240px"/> <button>导出 CSV</button></div></div> <div class="card" style="margin-top:14px"><table><thead><tr><th style="width:150px">时间</th><th style="width:130px">操作人</th><th style="width:90px">角色</th><th>动作</th><th>对象</th><th>详情</th></tr></thead><tbody><!><!></tbody></table></div></div>');function QE(n,t){En(t,!0);const e=$i();let i=ae("");const r=ge(()=>e.logs.filter(S=>!x(i)||S.action.includes(x(i))||S.operator.includes(x(i))||S.target.includes(x(i))||S.detail.includes(x(i))));function s(S){var T;return((T=Lf.find(M=>M.id===S))==null?void 0:T.name)||S}function a(){const S=bc(x(r),[{label:"时间",get:T=>hr(T.ts)},{label:"操作人",get:T=>T.operator},{label:"角色",get:T=>s(T.role)},{label:"动作",get:T=>T.action},{label:"对象",get:T=>T.target},{label:"详情",get:T=>T.detail}]);qo(new Blob([S],{type:"text/csv;charset=utf-8"}),`操作日志_${Date.now()}.csv`)}var o=JE(),l=j(o),c=L(j(l),2),u=j(c),d=L(u,2),p=L(l,2),f=j(p),v=L(j(f)),_=j(v);Oe(_,17,()=>x(r),S=>S.id,(S,T)=>{var M=$E(),I=j(M),R=yt(I,!0),P=L(I),F=yt(P,!0),b=L(P),g=j(b),U=yt(g,!0),k=L(b),N=yt(k,!0),A=L(k),C=yt(A,!0),O=L(A),z=yt(O,!0);zt((D,X)=>{dt(R,D),dt(F,x(T).operator),dt(U,X),dt(N,x(T).action),dt(C,x(T).target),dt(z,x(T).detail)},[()=>hr(x(T).ts),()=>s(x(T).role)]),at(S,M)});var m=L(_);{var h=S=>{var T=KE();at(S,T)};kt(m,S=>{x(r).length===0&&S(h)})}ze(u,()=>x(i),S=>St(i,S)),Bt("click",d,a),at(n,o),Tn()}$n(["click"]);var tT=ht('<div style="padding:60px;text-align:center" class="muted">正在加载本地数据库…</div>'),eT=ht("<button><span> </span> </button>"),nT=ht("<option> </option>"),iT=ht('<div class="shell svelte-1n46o8q"><aside class="svelte-1n46o8q"><div class="brand svelte-1n46o8q"><div class="logo svelte-1n46o8q">◆</div> <div><div class="brand-name svelte-1n46o8q">三维痣图随访</div> <div class="small muted">MoleMap 3D · 本地版</div></div></div> <nav class="svelte-1n46o8q"></nav> <div class="operator card svelte-1n46o8q"><div class="small muted">当前操作人</div> <select></select> <div class="small muted" style="margin-top:8px;line-height:1.6">数据全部保存在本浏览器 IndexedDB，不上传服务器。</div></div></aside> <main class="svelte-1n46o8q"><!></main></div>');function rT(n,t){En(t,!0);const e=$i();let i=ae("patients"),r=ae(null),s=ae(null);Tu(Ev);const a=[{id:"patients",label:"患者与痣图",icon:"👤"},{id:"tasks",label:"随访任务",icon:"🔁"},{id:"review",label:"主任待审",icon:"✅"},{id:"stats",label:"统计分析",icon:"📊"},{id:"settings",label:"规则维护",icon:"⚙️"},{id:"logs",label:"操作日志",icon:"📝"}];function o(_){St(r,_,!0),St(i,"workspace")}function l(_){St(s,_,!0),St(i,"tasks")}function c(_){const[m,h]=_.target.value.split("|");Tv(h,m)}const u=[["physician","张医生"],["physician","李医生"],["tech","王技师"],["director","陈主任"]];var d=Yo(),p=Ue(d);{var f=_=>{var m=tT();at(_,m)},v=_=>{var m=iT(),h=j(m),S=L(j(h),2);Oe(S,21,()=>a,F=>F.id,(F,b)=>{var g=eT();let U;var k=j(g),N=yt(k,!0),A=L(k,1,!0);zt(()=>{U=Ve(g,1,"nav-item svelte-1n46o8q",null,U,{active:x(i)===x(b).id||x(b).id==="patients"&&x(i)==="workspace"}),dt(N,x(b).icon),dt(A,x(b).label)}),Bt("click",g,()=>St(i,x(b).id,!0)),at(F,g)});var T=L(S,2),M=L(j(T),2);Oe(M,21,()=>u,tv,(F,b)=>{var g=ge(()=>Ip(x(b),2));let U=()=>x(g)[0],k=()=>x(g)[1];var N=nT(),A=yt(N),C={};zt(O=>{Rf(N,e.operator.name===k()&&e.operator.role===U()),dt(A,`${O??""} · ${k()??""}`),C!==(C=`${U()??""}|${k()??""}`)&&(N.value=N.__value=C)},[()=>Lf.find(O=>O.id===U()).name]),at(F,N)});var I;Ti(M);var R=L(h,2),P=j(R);Qm(P,()=>x(i),F=>{var b=Yo(),g=Ue(b);{var U=D=>{jv(D,{onopen:o})},k=D=>{Ep(D,{get patientId(){return x(r)},onback:()=>St(i,"patients"),onopenTask:l})},N=D=>{xE(D,{get focusTaskId(){return x(s)},clearFocus:()=>St(s,null),onopenPatient:o})},A=D=>{FE(D,{onopenTask:l})},C=D=>{XE(D,{})},O=D=>{ZE(D,{})},z=D=>{QE(D,{})};kt(g,D=>{x(i)==="patients"?D(U):x(i)==="workspace"?D(k,1):x(i)==="tasks"?D(N,2):x(i)==="review"?D(A,3):x(i)==="settings"?D(C,4):x(i)==="stats"?D(O,5):x(i)==="logs"&&D(z,6)})}at(F,b)}),zt(()=>{I!==(I=`${e.operator.role??""}|${e.operator.name??""}`)&&(M.value=M.__value=I,Eu(M,I))}),Bt("change",M,c),at(_,m)};kt(p,_=>{e.ready?_(v,-1):_(f)})}at(n,d),Tn()}$n(["click","change"]);Zm(rT,{target:document.getElementById("app")});
