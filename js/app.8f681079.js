(function(e){function t(t){for(var n,i,o=t[0],c=t[1],l=t[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,o=1;o<r.length;o++){var c=r[o];0!==s[c]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},s={app:0},a=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/typewriting/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},1380:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t),r.d(t,"HTTPS",(function(){return O}));r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bg-pan-bottom",attrs:{id:"app"}},[r("TheHeader"),r("MainPage")],1)},a=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header__container"},[r("b-navbar",{attrs:{toggleable:"lg",type:"dark"}},[r("b-navbar-nav",{staticClass:"ml-auto"},[r("b-nav-item",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.bottom",value:"https://github.com/r144yh",expression:"'https://github.com/r144yh'",modifiers:{hover:!0,bottom:!0}}],attrs:{href:"https://github.com/r144yh"}},[e._v("r144yh")])],1),r("b-navbar-toggle",{attrs:{target:"nav-collapse"}})],1)],1)},o=[],c={name:"TheHeader",data:function(){return{sound:!0}}},l=c,u=(r("8ca1"),r("2877")),d=Object(u["a"])(l,i,o,!1,null,"d60618e8",null),p=d.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main-page__container"},[r("section",{staticClass:"score__container"},[r("div",[r("div",[r("b-icon",{attrs:{icon:"lightning","font-scale":"1.2",variant:"Light",animation:"throb","shift-v":".5"}}),r("span",[e._v("Скорость: ")]),r("span",[e._v(e._s(e.speed)+" зн./мин")])],1),r("div",[r("b-icon",{attrs:{icon:"check2-all","font-scale":"1.2",variant:"Light"}}),r("span",[e._v(" Точность: ")]),r("span",[e._v(e._s(e.accuracy)+"%")])],1)]),r("div",[r("div",[r("b-icon",{attrs:{icon:"bug","font-scale":"1.2",variant:"Light"}}),r("span",[e._v(" Количество ошибок: ")]),r("span",[e._v(e._s(e.errorsCounter))])],1),r("div",[r("b-icon",{attrs:{icon:"emoji-sunglasses","font-scale":"1.2",variant:"Light"}}),r("span",[e._v(" Лучший результат: ")]),r("span",[e._v(e._s(e.bestSpeed)+" зн./мин")])],1)])]),r("section",{staticClass:"text__container"},[e._l(e.text,(function(t,n){return r("span",{key:n,class:{nextSymbol:e.nextKey&&n===e.currentIndex,correctSymbol:e.correctAnswer&&n<e.currentIndex,wrongSymbol:e.wrongAnswer&&n===e.currentIndex}},[e._v(e._s(t))])})),r("div",{staticClass:"btn-reset__container"},[r("button",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.bottom",value:"Начать заново",expression:"'Начать заново'",modifiers:{hover:!0,bottom:!0}}],staticClass:"btn-reset",on:{click:e.resetResult}},[r("b-icon",{attrs:{icon:"arrow-clockwise","font-scale":"1.5",variant:"Light"}})],1)])],2),r("div",[r("b-modal",{attrs:{id:"modalLang","content-class":"shadow","hide-header":"","hide-footer":"",centered:""}},[r("p",{staticClass:"my-4"},[e._v("Необходимо сменить раскладку языка")]),r("b-button",{staticClass:"mt-3",attrs:{variant:"outline-success",block:""},on:{click:function(t){return e.$bvModal.hide("modalLang")}}},[e._v("Okay")])],1)],1),r("div",[r("b-modal",{attrs:{id:"modalResult","content-class":"shadow","hide-header":"","hide-footer":"",centered:""}},[r("p",{staticClass:"my-4"},[e._v("Поздравляем!")]),r("p",{staticClass:"my-4"},[e._v("Ваша скорость: "+e._s(e.speed))]),r("p",{staticClass:"my-4"},[e._v("Ваша точность: "+e._s(e.accuracy))]),r("b-button",{staticClass:"mt-3",attrs:{variant:"outline-success",block:""},on:{click:e.resetResult}},[e._v("Thanks")])],1)],1),r("p",{staticClass:"time__container"},[e._v(e._s(e.formattedElapsedTime))])])},b=[],v=(r("c975"),r("a15b"),r("a434"),r("b65f"),r("a9e3"),r("b680"),r("ac1f"),r("466d"),r("1276"),r("96cf"),r("1da1")),f={name:"MainPage",data:function(){return{text:[],currentIndex:0,speed:0,accuracy:100,errorsCounter:0,bestSpeed:0,start:!1,reset:!1,timer:null,speedTimer:null,elapsedTime:0,lastSpeed:0,lastIndex:0,correctAnswer:!1,wrongAnswer:!1,nextKey:!0,errors:[]}},computed:{formattedElapsedTime:function(){var e=new Date(null);e.setSeconds(this.elapsedTime/1e3);var t=e.toUTCString();return t.substr(t.indexOf(":")-2,8)}},methods:{getText:function(){var e=this;return Object(v["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,O.get("/?type=all-meat&paras=1&format=text/");case 3:for(r=t.sent,e.text=r.data.join(),e.text=e.text.split(""),n=0;n<e.text.length;n++)" "===e.text[n]&&" "===e.text[n-1]&&e.text.splice(n,1);t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),e.errors.push(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},checkSymbol:function(e){var t=this,r=e.key.match(/^((?!Enter|Escape|Tab|Delete|Backspace|Insert|PageUp|PageDown|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|End|Home|Shift|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12).)*$/i);if(null!==r){var n=e.key.match(/[а-яё]/gi);null===n?(!1===this.start&&(this.timer=setInterval((function(){t.elapsedTime+=1e3}),1e3),this.start=!0,this.calculateSpeed()),this.currentIndex<this.text.length&&"CapsLock"!==e.key&&(e.key===this.text[this.currentIndex]?(this.correctAnswer=!0,this.currentIndex++,this.nextKey=!0,this.calculateAccuracy(),this.currentIndex===this.text.length&&(Number(this.speed)>Number(this.bestSpeed)&&(this.bestSpeed=this.speed,localStorage.setItem("bestSpeed",this.bestSpeed)),clearInterval(this.timer),clearInterval(this.speedTimer),this.$bvModal.show("modalResult"))):(this.nextKey=!1,this.wrongAnswer=!0,this.errorsCounter++,this.calculateAccuracy()))):this.$bvModal.show("modalLang")}},calculateSpeed:function(){var e=this;this.speedTimer=setInterval((function(){if(e.elapsedTime%6e4===0)return e.lastSpeed=Number(e.speed),void(e.lastIndex=e.currentIndex);Math.trunc(e.elapsedTime/6e4)>0?e.speed=(((e.currentIndex-e.lastIndex)/(e.elapsedTime%6e4)*6e4+e.lastSpeed)/(Math.trunc(e.elapsedTime/6e4)+1)).toFixed(0):e.speed=(e.currentIndex/(e.elapsedTime%6e4)*6e4).toFixed(0)}),1e3)},calculateAccuracy:function(){0!==this.errorsCounter&&(this.accuracy=Math.abs((this.errorsCounter-this.text.length)/this.text.length*100).toFixed(1))},resetResult:function(){this.getText(),this.currentIndex=0,this.speed=0,this.accuracy=100,this.errorsCounter=0,this.start=!1,this.correctAnswer=!1,this.wrongAnswer=!1,this.nextKey=!0,this.elapsedTime=0,clearInterval(this.timer),clearInterval(this.speedTimer),this.$bvModal.hide("modalResult")}},created:function(){document.addEventListener("keydown",this.checkSymbol),this.getText(),this.bestSpeed=localStorage.getItem("bestSpeed"),null===this.bestSpeed&&(this.bestSpeed=0,localStorage.setItem("bestSpeed",this.bestSpeed))}},m=f,g=(r("b606"),Object(u["a"])(m,h,b,!1,null,"4a1045b7",null)),x=g.exports,y={name:"App",components:{TheHeader:p,MainPage:x}},_=y,w=(r("034f"),Object(u["a"])(_,s,a,!1,null,null,null)),S=w.exports,T=r("bc3a"),k=r.n(T),I=r("5f5b"),C=r("b1e0");r("f9e3"),r("2dd8");n["default"].use(I["a"]),n["default"].use(C["a"]),n["default"].config.productionTip=!1;var O=k.a.create({baseURL:"https://baconipsum.com/api/"});new n["default"]({render:function(e){return e(S)}}).$mount("#app")},"85ec":function(e,t,r){},"8ca1":function(e,t,r){"use strict";r("1380")},b606:function(e,t,r){"use strict";r("c9f2")},c9f2:function(e,t,r){}});
//# sourceMappingURL=app.8f681079.js.map