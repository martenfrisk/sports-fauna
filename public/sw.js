if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return t[e]||(r=new Promise((async r=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},r=(r,t)=>{Promise.all(r.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(r)};self.define=(r,s,i)=>{t[r]||(t[r]=Promise.resolve().then((()=>{let t={};const o={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return t;case"module":return o;default:return e(r)}}))).then((e=>{const r=i(...e);return t.default||(t.default=r),t}))})))}}define("./sw.js",["./workbox-258e370a"],(function(e){"use strict";importScripts("worker-development.js"),self.skipWaiting(),e.clientsClaim(),e.registerRoute(/.*/i,new e.NetworkOnly({cacheName:"dev",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.js.map
